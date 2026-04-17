"""
TA Brain — Wiki HTML Builder

Scans wiki/**/*.md, parses frontmatter + body + [[wiki-links]], and emits
a single self-contained wiki.html file with an Obsidian-style UI, a
force-directed + pan/zoom/drag graph view, a theme system, and a built-in
help guide.

Themes are defined in two places:
  1. BUILT_IN_THEMES below (Obsidian dark, Apple Light, Apple Dark).
  2. themes/*.json — drop a JSON file shaped like BUILT_IN_THEMES entries
     and it will be auto-included with its filename (sans extension) as ID.

Run from the TA Brain folder:
    python build-wiki.py
"""

from __future__ import annotations
import json
import re
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).parent
WIKI = ROOT / "wiki"
THEMES_DIR = ROOT / "themes"
OUTPUT = ROOT / "wiki.html"

# Password that unlocks the `sources/` folder. Pages in that folder are
# encrypted at build time and cannot be read without this password.
SOURCES_PASSWORD = "Megcaldyl@1840"
LOCKED_FOLDERS = {"sources"}

# Exact sidebar order per user request. _root shows as "Top Level".
# Unlisted folders fall to the end in their default order.
FOLDER_ORDER = [
    "roles", "concepts", "entities", "processes",
    "_root", "glossary", "sources",
    "onboarding", "departments", "analyses",
]
FOLDER_LABELS = {
    "roles": "Roles", "departments": "Departments", "processes": "Processes",
    "onboarding": "Onboarding", "glossary": "Glossary", "entities": "Entities",
    "concepts": "Concepts", "sources": "Sources", "analyses": "Analyses",
    "_root": "Top Level",
}

FRONTMATTER_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n?", re.DOTALL)
WIKILINK_RE = re.compile(r"\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]")


# ============================================================
# THEMES — each theme is a set of CSS custom properties.
# Add new themes here or drop themes/<name>.json.
# ============================================================
BUILT_IN_THEMES = {
    "obsidian": {
        "name": "Obsidian Dark",
        "description": "Inter + Space Grotesk. Charcoal with purple accents.",
        "mode": "dark",
        "font": '"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        "fontDisplay": '"Space Grotesk", "Inter", ui-sans-serif, system-ui, sans-serif',
        "fontMono": '"JetBrains Mono", ui-monospace, Menlo, Consolas, monospace',
        "vars": {
            "--bg": "#1e1e26",
            "--bg-2": "#16161c",
            "--bg-3": "#262633",
            "--panel": "#22222c",
            "--border": "#30303c",
            "--fg": "#dcddde",
            "--fg-dim": "#9a9aa8",
            "--fg-muted": "#6d6d7a",
            "--accent": "#a277ff",
            "--accent-2": "#7aa2f7",
            "--link": "#b891ff",
            "--link-unresolved": "#e5484d",
            "--tag-bg": "#2b2538",
            "--tag-fg": "#c9b3ff",
            "--code-bg": "#111118",
            "--shadow": "0 10px 40px rgba(0,0,0,.35)",
            "--radius": "10px",
            "--title-gradient": "linear-gradient(90deg, #fff, #c9b3ff)",
            "--brand-gradient": "linear-gradient(90deg, #a277ff, #7aa2f7)",
            "--selection": "rgba(162,119,255,.35)",
            "--heading-font-weight": "600",
            "--heading-letter-spacing": "normal",
            "--body-letter-spacing": "normal",
        },
    },
    "apple-dark": {
        "name": "Apple Dark",
        "description": "Pure black backdrop, Apple Blue accent. Cinematic, SF Pro.",
        "mode": "dark",
        "font": '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
        "fontDisplay": '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
        "fontMono": '"SF Mono", "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace',
        "vars": {
            "--bg": "#000000",
            "--bg-2": "#0a0a0b",
            "--bg-3": "#1d1d1f",
            "--panel": "#1d1d1f",
            "--border": "#2a2a2d",
            "--fg": "#ffffff",
            "--fg-dim": "rgba(255,255,255,0.72)",
            "--fg-muted": "rgba(255,255,255,0.48)",
            "--accent": "#2997ff",
            "--accent-2": "#0071e3",
            "--link": "#2997ff",
            "--link-unresolved": "#ff453a",
            "--tag-bg": "rgba(41,151,255,0.12)",
            "--tag-fg": "#2997ff",
            "--code-bg": "#1d1d1f",
            "--shadow": "0 3px 30px rgba(0,0,0,0.4)",
            "--radius": "12px",
            "--title-gradient": "linear-gradient(90deg, #fff, #fff)",
            "--brand-gradient": "linear-gradient(90deg, #2997ff, #fff)",
            "--selection": "rgba(41,151,255,0.35)",
            "--heading-font-weight": "600",
            "--heading-letter-spacing": "-0.022em",
            "--body-letter-spacing": "-0.014em",
        },
    },
    "apple-light": {
        "name": "Apple Light",
        "description": "f5f5f7 canvas, near-black text, Apple Blue. Editorial clarity.",
        "mode": "light",
        "font": '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
        "fontDisplay": '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
        "fontMono": '"SF Mono", "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace',
        "vars": {
            "--bg": "#ffffff",
            "--bg-2": "#f5f5f7",
            "--bg-3": "#fafafc",
            "--panel": "#ffffff",
            "--border": "rgba(0,0,0,0.08)",
            "--fg": "#1d1d1f",
            "--fg-dim": "rgba(0,0,0,0.8)",
            "--fg-muted": "rgba(0,0,0,0.48)",
            "--accent": "#0071e3",
            "--accent-2": "#0066cc",
            "--link": "#0066cc",
            "--link-unresolved": "#ff3b30",
            "--tag-bg": "rgba(0,113,227,0.08)",
            "--tag-fg": "#0066cc",
            "--code-bg": "#f5f5f7",
            "--shadow": "rgba(0,0,0,0.22) 3px 5px 30px 0px",
            "--radius": "12px",
            "--title-gradient": "linear-gradient(90deg, #1d1d1f, #1d1d1f)",
            "--brand-gradient": "linear-gradient(90deg, #0071e3, #1d1d1f)",
            "--selection": "rgba(0,113,227,0.25)",
            "--heading-font-weight": "600",
            "--heading-letter-spacing": "-0.022em",
            "--body-letter-spacing": "-0.014em",
        },
    },
    "vercel": {
        "name": "Vercel",
        "description": "Pure black canvas, geometric sans. Zero decoration.",
        "mode": "dark",
        "font": '"Geist", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        "fontDisplay": '"Geist", "Inter", -apple-system, sans-serif',
        "fontMono": '"Geist Mono", "JetBrains Mono", ui-monospace, Menlo, monospace',
        "vars": {
            "--bg": "#000000",
            "--bg-2": "#0a0a0a",
            "--bg-3": "#111111",
            "--panel": "#0a0a0a",
            "--border": "#1f1f1f",
            "--fg": "#ededed",
            "--fg-dim": "#a1a1a1",
            "--fg-muted": "#666666",
            "--accent": "#ffffff",
            "--accent-2": "#888888",
            "--link": "#ffffff",
            "--link-unresolved": "#ff4444",
            "--tag-bg": "#1a1a1a",
            "--tag-fg": "#ededed",
            "--code-bg": "#0a0a0a",
            "--shadow": "0 0 0 1px rgba(255,255,255,0.06)",
            "--radius": "8px",
            "--title-gradient": "linear-gradient(180deg, #fff 0%, #888 100%)",
            "--brand-gradient": "linear-gradient(90deg, #fff, #666)",
            "--selection": "rgba(255,255,255,0.2)",
            "--heading-font-weight": "600",
            "--heading-letter-spacing": "-0.02em",
            "--body-letter-spacing": "normal",
        },
    },
    "stripe": {
        "name": "Stripe",
        "description": "Indigo on warm white. Gradient-washed, confident, polished.",
        "mode": "light",
        "font": '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        "fontDisplay": '"Sohne", "Inter", -apple-system, sans-serif',
        "fontMono": '"Sohne Mono", "JetBrains Mono", ui-monospace, monospace',
        "vars": {
            "--bg": "#ffffff",
            "--bg-2": "#f6f9fc",
            "--bg-3": "#ffffff",
            "--panel": "#ffffff",
            "--border": "#e3e8ee",
            "--fg": "#0a2540",
            "--fg-dim": "#425466",
            "--fg-muted": "#697386",
            "--accent": "#635bff",
            "--accent-2": "#00d4ff",
            "--link": "#635bff",
            "--link-unresolved": "#e25950",
            "--tag-bg": "rgba(99,91,255,0.08)",
            "--tag-fg": "#635bff",
            "--code-bg": "#f6f9fc",
            "--shadow": "0 50px 100px -20px rgba(50,50,93,0.15), 0 30px 60px -30px rgba(0,0,0,0.2)",
            "--radius": "12px",
            "--title-gradient": "linear-gradient(135deg, #635bff 0%, #00d4ff 100%)",
            "--brand-gradient": "linear-gradient(135deg, #635bff, #00d4ff)",
            "--selection": "rgba(99,91,255,0.2)",
            "--heading-font-weight": "700",
            "--heading-letter-spacing": "-0.02em",
            "--body-letter-spacing": "normal",
        },
    },
    "linear": {
        "name": "Linear",
        "description": "Deep indigo-black, Inter, sunset gradient. Engineered calm.",
        "mode": "dark",
        "font": '"Inter Variable", "Inter", -apple-system, sans-serif',
        "fontDisplay": '"Inter Variable", "Inter", -apple-system, sans-serif',
        "fontMono": '"JetBrains Mono", ui-monospace, monospace',
        "vars": {
            "--bg": "#08090a",
            "--bg-2": "#101113",
            "--bg-3": "#17181c",
            "--panel": "#101113",
            "--border": "#26282d",
            "--fg": "#f7f8f8",
            "--fg-dim": "#8a8f98",
            "--fg-muted": "#62666d",
            "--accent": "#7170ff",
            "--accent-2": "#ff7ab6",
            "--link": "#7170ff",
            "--link-unresolved": "#eb5757",
            "--tag-bg": "rgba(113,112,255,0.12)",
            "--tag-fg": "#a5a5ff",
            "--code-bg": "#17181c",
            "--shadow": "0 16px 70px rgba(0,0,0,0.5)",
            "--radius": "8px",
            "--title-gradient": "linear-gradient(90deg, #fff 0%, #a5a5ff 100%)",
            "--brand-gradient": "linear-gradient(135deg, #7170ff 0%, #ff7ab6 100%)",
            "--selection": "rgba(113,112,255,0.35)",
            "--heading-font-weight": "600",
            "--heading-letter-spacing": "-0.012em",
            "--body-letter-spacing": "normal",
        },
    },
    "notion": {
        "name": "Notion",
        "description": "Warm off-white paper, humanist serif headings. Reading room.",
        "mode": "light",
        "font": '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        "fontDisplay": '"Lyon Text", "Charter", Georgia, "Times New Roman", serif',
        "fontMono": '"iA Writer Mono", "JetBrains Mono", ui-monospace, monospace',
        "vars": {
            "--bg": "#ffffff",
            "--bg-2": "#f7f6f3",
            "--bg-3": "#fbfaf8",
            "--panel": "#ffffff",
            "--border": "rgba(55,53,47,0.12)",
            "--fg": "#37352f",
            "--fg-dim": "rgba(55,53,47,0.75)",
            "--fg-muted": "rgba(55,53,47,0.5)",
            "--accent": "#2383e2",
            "--accent-2": "#e16259",
            "--link": "#2383e2",
            "--link-unresolved": "#e16259",
            "--tag-bg": "rgba(35,131,226,0.1)",
            "--tag-fg": "#2383e2",
            "--code-bg": "#f7f6f3",
            "--shadow": "rgba(15,15,15,0.05) 0px 0px 0px 1px, rgba(15,15,15,0.1) 0px 3px 6px, rgba(15,15,15,0.2) 0px 9px 24px",
            "--radius": "6px",
            "--title-gradient": "linear-gradient(90deg, #37352f, #37352f)",
            "--brand-gradient": "linear-gradient(90deg, #2383e2, #37352f)",
            "--selection": "rgba(35,131,226,0.2)",
            "--heading-font-weight": "700",
            "--heading-letter-spacing": "-0.01em",
            "--body-letter-spacing": "normal",
        },
    },
    "tesla": {
        "name": "Tesla",
        "description": "Obsidian black, precise geometric sans, signal red.",
        "mode": "dark",
        "font": '"Gotham", "Montserrat", "Inter", -apple-system, sans-serif',
        "fontDisplay": '"Gotham", "Montserrat", "Inter", sans-serif',
        "fontMono": '"JetBrains Mono", ui-monospace, monospace',
        "vars": {
            "--bg": "#000000",
            "--bg-2": "#0c0c0c",
            "--bg-3": "#151515",
            "--panel": "#0c0c0c",
            "--border": "#262626",
            "--fg": "#ffffff",
            "--fg-dim": "#b3b3b3",
            "--fg-muted": "#7a7a7a",
            "--accent": "#e31937",
            "--accent-2": "#ffffff",
            "--link": "#ffffff",
            "--link-unresolved": "#e31937",
            "--tag-bg": "rgba(227,25,55,0.12)",
            "--tag-fg": "#ff4858",
            "--code-bg": "#0c0c0c",
            "--shadow": "0 25px 50px -12px rgba(0,0,0,0.85)",
            "--radius": "2px",
            "--title-gradient": "linear-gradient(90deg, #fff, #fff)",
            "--brand-gradient": "linear-gradient(90deg, #e31937, #fff)",
            "--selection": "rgba(227,25,55,0.35)",
            "--heading-font-weight": "500",
            "--heading-letter-spacing": "0.04em",
            "--body-letter-spacing": "0.015em",
        },
    },
    "spotify": {
        "name": "Spotify",
        "description": "Matte black + signature #1DB954 green. Late-night studio.",
        "mode": "dark",
        "font": '"Circular", "Inter", -apple-system, sans-serif',
        "fontDisplay": '"Circular", "Inter", -apple-system, sans-serif',
        "fontMono": '"JetBrains Mono", ui-monospace, monospace',
        "vars": {
            "--bg": "#121212",
            "--bg-2": "#181818",
            "--bg-3": "#242424",
            "--panel": "#181818",
            "--border": "#2a2a2a",
            "--fg": "#ffffff",
            "--fg-dim": "#b3b3b3",
            "--fg-muted": "#727272",
            "--accent": "#1db954",
            "--accent-2": "#1ed760",
            "--link": "#1ed760",
            "--link-unresolved": "#ff5b5b",
            "--tag-bg": "rgba(29,185,84,0.14)",
            "--tag-fg": "#1ed760",
            "--code-bg": "#000000",
            "--shadow": "0 8px 24px rgba(0,0,0,0.5)",
            "--radius": "8px",
            "--title-gradient": "linear-gradient(135deg, #fff 0%, #1db954 100%)",
            "--brand-gradient": "linear-gradient(135deg, #1db954, #1ed760)",
            "--selection": "rgba(29,185,84,0.35)",
            "--heading-font-weight": "700",
            "--heading-letter-spacing": "-0.012em",
            "--body-letter-spacing": "normal",
        },
    },
    "supabase": {
        "name": "Supabase",
        "description": "Graphite dark, electric emerald. Terminal-refined.",
        "mode": "dark",
        "font": '"Inter", "Custom Sans", -apple-system, sans-serif',
        "fontDisplay": '"Inter", -apple-system, sans-serif',
        "fontMono": '"JetBrains Mono", "Source Code Pro", ui-monospace, monospace',
        "vars": {
            "--bg": "#1c1c1c",
            "--bg-2": "#171717",
            "--bg-3": "#232323",
            "--panel": "#1c1c1c",
            "--border": "#2e2e2e",
            "--fg": "#ededed",
            "--fg-dim": "#a0a0a0",
            "--fg-muted": "#707070",
            "--accent": "#3ecf8e",
            "--accent-2": "#249361",
            "--link": "#3ecf8e",
            "--link-unresolved": "#ff6b6b",
            "--tag-bg": "rgba(62,207,142,0.12)",
            "--tag-fg": "#3ecf8e",
            "--code-bg": "#171717",
            "--shadow": "0 10px 30px rgba(0,0,0,0.4)",
            "--radius": "6px",
            "--title-gradient": "linear-gradient(90deg, #fff, #3ecf8e)",
            "--brand-gradient": "linear-gradient(90deg, #3ecf8e, #249361)",
            "--selection": "rgba(62,207,142,0.3)",
            "--heading-font-weight": "600",
            "--heading-letter-spacing": "-0.012em",
            "--body-letter-spacing": "normal",
        },
    },
    "claude": {
        "name": "Claude",
        "description": "Paper cream, burnt orange accent, Copernicus serif. Study notebook.",
        "mode": "light",
        "font": '"Styrene B", "Inter", -apple-system, sans-serif',
        "fontDisplay": '"Copernicus", "Tiempos Text", Georgia, "Times New Roman", serif',
        "fontMono": '"JetBrains Mono", ui-monospace, monospace',
        "vars": {
            "--bg": "#f7f3ee",
            "--bg-2": "#f1ebe1",
            "--bg-3": "#fbf7f1",
            "--panel": "#fbf7f1",
            "--border": "rgba(60,40,20,0.14)",
            "--fg": "#2d1f13",
            "--fg-dim": "rgba(45,31,19,0.75)",
            "--fg-muted": "rgba(45,31,19,0.5)",
            "--accent": "#c96442",
            "--accent-2": "#8a4a2c",
            "--link": "#c96442",
            "--link-unresolved": "#b33a2b",
            "--tag-bg": "rgba(201,100,66,0.12)",
            "--tag-fg": "#8a4a2c",
            "--code-bg": "#f1ebe1",
            "--shadow": "0 4px 20px rgba(60,40,20,0.12)",
            "--radius": "8px",
            "--title-gradient": "linear-gradient(90deg, #2d1f13, #c96442)",
            "--brand-gradient": "linear-gradient(135deg, #c96442, #8a4a2c)",
            "--selection": "rgba(201,100,66,0.2)",
            "--heading-font-weight": "600",
            "--heading-letter-spacing": "-0.005em",
            "--body-letter-spacing": "normal",
        },
    },
    "figma": {
        "name": "Figma",
        "description": "Charcoal canvas with vivid multi-color accents. Tool palette.",
        "mode": "dark",
        "font": '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        "fontDisplay": '"Inter", -apple-system, sans-serif',
        "fontMono": '"JetBrains Mono", ui-monospace, monospace',
        "vars": {
            "--bg": "#1e1e1e",
            "--bg-2": "#2c2c2c",
            "--bg-3": "#383838",
            "--panel": "#2c2c2c",
            "--border": "#444444",
            "--fg": "#ffffff",
            "--fg-dim": "#b3b3b3",
            "--fg-muted": "#858585",
            "--accent": "#a259ff",
            "--accent-2": "#1abcfe",
            "--link": "#1abcfe",
            "--link-unresolved": "#f24e1e",
            "--tag-bg": "rgba(162,89,255,0.16)",
            "--tag-fg": "#c28bff",
            "--code-bg": "#0d0d0d",
            "--shadow": "0 6px 20px rgba(0,0,0,0.5)",
            "--radius": "6px",
            "--title-gradient": "linear-gradient(90deg, #a259ff, #1abcfe)",
            "--brand-gradient": "linear-gradient(90deg, #f24e1e, #a259ff, #1abcfe, #0acf83)",
            "--selection": "rgba(26,188,254,0.3)",
            "--heading-font-weight": "600",
            "--heading-letter-spacing": "-0.012em",
            "--body-letter-spacing": "normal",
        },
    },
    "cursor": {
        "name": "Cursor",
        "description": "Cool dark graphite, electric cyan. IDE-ready.",
        "mode": "dark",
        "font": '"Inter", -apple-system, sans-serif',
        "fontDisplay": '"Inter", -apple-system, sans-serif',
        "fontMono": '"JetBrains Mono", "Fira Code", ui-monospace, monospace',
        "vars": {
            "--bg": "#0f0f10",
            "--bg-2": "#161618",
            "--bg-3": "#1d1d20",
            "--panel": "#161618",
            "--border": "#2a2a2e",
            "--fg": "#e6e6e8",
            "--fg-dim": "#9a9aa0",
            "--fg-muted": "#6b6b71",
            "--accent": "#00d8ff",
            "--accent-2": "#7c3aed",
            "--link": "#00d8ff",
            "--link-unresolved": "#ff4f6a",
            "--tag-bg": "rgba(0,216,255,0.12)",
            "--tag-fg": "#00d8ff",
            "--code-bg": "#0a0a0b",
            "--shadow": "0 10px 40px rgba(0,216,255,0.06), 0 4px 12px rgba(0,0,0,0.5)",
            "--radius": "8px",
            "--title-gradient": "linear-gradient(90deg, #00d8ff, #7c3aed)",
            "--brand-gradient": "linear-gradient(135deg, #00d8ff, #7c3aed)",
            "--selection": "rgba(0,216,255,0.25)",
            "--heading-font-weight": "600",
            "--heading-letter-spacing": "-0.012em",
            "--body-letter-spacing": "normal",
        },
    },
    "raycast": {
        "name": "Raycast",
        "description": "Warm near-black with signal red. Command-bar aesthetic.",
        "mode": "dark",
        "font": '"Inter", -apple-system, sans-serif',
        "fontDisplay": '"Inter", -apple-system, sans-serif',
        "fontMono": '"JetBrains Mono", ui-monospace, monospace',
        "vars": {
            "--bg": "#1a1a1a",
            "--bg-2": "#212121",
            "--bg-3": "#2a2a2a",
            "--panel": "#212121",
            "--border": "#333333",
            "--fg": "#f5f5f5",
            "--fg-dim": "#a0a0a0",
            "--fg-muted": "#707070",
            "--accent": "#ff6363",
            "--accent-2": "#ff9a3d",
            "--link": "#ff6363",
            "--link-unresolved": "#ff3d3d",
            "--tag-bg": "rgba(255,99,99,0.12)",
            "--tag-fg": "#ff9393",
            "--code-bg": "#121212",
            "--shadow": "0 12px 40px rgba(0,0,0,0.55)",
            "--radius": "10px",
            "--title-gradient": "linear-gradient(90deg, #fff, #ff9a3d)",
            "--brand-gradient": "linear-gradient(135deg, #ff6363, #ff9a3d)",
            "--selection": "rgba(255,99,99,0.3)",
            "--heading-font-weight": "600",
            "--heading-letter-spacing": "-0.012em",
            "--body-letter-spacing": "normal",
        },
    },
    "nvidia": {
        "name": "NVIDIA",
        "description": "Carbon black + electric lime. High-performance compute.",
        "mode": "dark",
        "font": '"NVIDIA Sans", "Inter", -apple-system, sans-serif',
        "fontDisplay": '"NVIDIA Sans", "Inter", -apple-system, sans-serif',
        "fontMono": '"JetBrains Mono", ui-monospace, monospace',
        "vars": {
            "--bg": "#0d0d0d",
            "--bg-2": "#141414",
            "--bg-3": "#1c1c1c",
            "--panel": "#141414",
            "--border": "#2a2a2a",
            "--fg": "#eeeeee",
            "--fg-dim": "#9a9a9a",
            "--fg-muted": "#6a6a6a",
            "--accent": "#76b900",
            "--accent-2": "#aef359",
            "--link": "#76b900",
            "--link-unresolved": "#ff3838",
            "--tag-bg": "rgba(118,185,0,0.14)",
            "--tag-fg": "#aef359",
            "--code-bg": "#0a0a0a",
            "--shadow": "0 10px 35px rgba(118,185,0,0.08), 0 4px 15px rgba(0,0,0,0.6)",
            "--radius": "4px",
            "--title-gradient": "linear-gradient(90deg, #fff, #76b900)",
            "--brand-gradient": "linear-gradient(90deg, #76b900, #aef359)",
            "--selection": "rgba(118,185,0,0.3)",
            "--heading-font-weight": "700",
            "--heading-letter-spacing": "0",
            "--body-letter-spacing": "normal",
        },
    },
    "mintlify": {
        "name": "Mintlify",
        "description": "Crisp white with mint accent. Documentation polish.",
        "mode": "light",
        "font": '"Inter", -apple-system, sans-serif',
        "fontDisplay": '"Inter", -apple-system, sans-serif',
        "fontMono": '"JetBrains Mono", ui-monospace, monospace',
        "vars": {
            "--bg": "#ffffff",
            "--bg-2": "#f8faf9",
            "--bg-3": "#ffffff",
            "--panel": "#ffffff",
            "--border": "#e6ebe8",
            "--fg": "#0f172a",
            "--fg-dim": "#475569",
            "--fg-muted": "#94a3b8",
            "--accent": "#10b981",
            "--accent-2": "#059669",
            "--link": "#059669",
            "--link-unresolved": "#ef4444",
            "--tag-bg": "rgba(16,185,129,0.1)",
            "--tag-fg": "#059669",
            "--code-bg": "#f8faf9",
            "--shadow": "0 8px 30px rgba(15,23,42,0.08)",
            "--radius": "10px",
            "--title-gradient": "linear-gradient(90deg, #0f172a, #10b981)",
            "--brand-gradient": "linear-gradient(135deg, #10b981, #34d399)",
            "--selection": "rgba(16,185,129,0.2)",
            "--heading-font-weight": "700",
            "--heading-letter-spacing": "-0.018em",
            "--body-letter-spacing": "normal",
        },
    },
    "ferrari": {
        "name": "Ferrari",
        "description": "Rosso Corsa on noir, giallo flash. Scuderia pace.",
        "mode": "dark",
        "font": '"Formula1", "Inter", -apple-system, sans-serif',
        "fontDisplay": '"Formula1", "Inter", -apple-system, sans-serif',
        "fontMono": '"JetBrains Mono", ui-monospace, monospace',
        "vars": {
            "--bg": "#0a0000",
            "--bg-2": "#120404",
            "--bg-3": "#1a0808",
            "--panel": "#120404",
            "--border": "#2a1010",
            "--fg": "#ffffff",
            "--fg-dim": "#c8c8c8",
            "--fg-muted": "#808080",
            "--accent": "#dc0000",
            "--accent-2": "#ffcc00",
            "--link": "#ffcc00",
            "--link-unresolved": "#ff6060",
            "--tag-bg": "rgba(220,0,0,0.16)",
            "--tag-fg": "#ff4040",
            "--code-bg": "#000000",
            "--shadow": "0 10px 40px rgba(220,0,0,0.12), 0 4px 12px rgba(0,0,0,0.7)",
            "--radius": "3px",
            "--title-gradient": "linear-gradient(90deg, #dc0000, #ffcc00)",
            "--brand-gradient": "linear-gradient(90deg, #dc0000 0%, #ffcc00 100%)",
            "--selection": "rgba(220,0,0,0.35)",
            "--heading-font-weight": "700",
            "--heading-letter-spacing": "0.02em",
            "--body-letter-spacing": "0.01em",
        },
    },
    "lamborghini": {
        "name": "Lamborghini",
        "description": "Carbon fiber + Giallo Orion. Angular, aggressive, alive.",
        "mode": "dark",
        "font": '"Inter", -apple-system, sans-serif',
        "fontDisplay": '"Inter", -apple-system, sans-serif',
        "fontMono": '"JetBrains Mono", ui-monospace, monospace',
        "vars": {
            "--bg": "#0b0b0b",
            "--bg-2": "#141414",
            "--bg-3": "#1c1c1c",
            "--panel": "#141414",
            "--border": "#2c2c2c",
            "--fg": "#f5f5f5",
            "--fg-dim": "#b0b0b0",
            "--fg-muted": "#707070",
            "--accent": "#f2d900",
            "--accent-2": "#ff8a00",
            "--link": "#f2d900",
            "--link-unresolved": "#ff3838",
            "--tag-bg": "rgba(242,217,0,0.14)",
            "--tag-fg": "#f2d900",
            "--code-bg": "#000000",
            "--shadow": "0 14px 40px rgba(0,0,0,0.7)",
            "--radius": "2px",
            "--title-gradient": "linear-gradient(90deg, #f5f5f5, #f2d900)",
            "--brand-gradient": "linear-gradient(135deg, #f2d900 0%, #ff8a00 100%)",
            "--selection": "rgba(242,217,0,0.3)",
            "--heading-font-weight": "700",
            "--heading-letter-spacing": "0.04em",
            "--body-letter-spacing": "0.01em",
        },
    },
    "spacex": {
        "name": "SpaceX",
        "description": "Deep space black, white type, cool blue. Mission control.",
        "mode": "dark",
        "font": '"D-DIN", "Inter", -apple-system, sans-serif',
        "fontDisplay": '"D-DIN", "Inter", -apple-system, sans-serif',
        "fontMono": '"JetBrains Mono", ui-monospace, monospace',
        "vars": {
            "--bg": "#000000",
            "--bg-2": "#0a0e14",
            "--bg-3": "#11161d",
            "--panel": "#0a0e14",
            "--border": "#1f2733",
            "--fg": "#ffffff",
            "--fg-dim": "#b8c2cc",
            "--fg-muted": "#6c7884",
            "--accent": "#005288",
            "--accent-2": "#a7a9ac",
            "--link": "#4aa3df",
            "--link-unresolved": "#ff4a4a",
            "--tag-bg": "rgba(74,163,223,0.12)",
            "--tag-fg": "#4aa3df",
            "--code-bg": "#000000",
            "--shadow": "0 8px 40px rgba(0,82,136,0.18), 0 4px 12px rgba(0,0,0,0.7)",
            "--radius": "2px",
            "--title-gradient": "linear-gradient(90deg, #fff, #4aa3df)",
            "--brand-gradient": "linear-gradient(90deg, #005288, #4aa3df)",
            "--selection": "rgba(74,163,223,0.3)",
            "--heading-font-weight": "500",
            "--heading-letter-spacing": "0.06em",
            "--body-letter-spacing": "0.02em",
        },
    },
}


def parse_frontmatter(text: str):
    m = FRONTMATTER_RE.match(text)
    if not m:
        return {}, text
    fm_raw = m.group(1)
    body = text[m.end():]
    fm = {}
    for line in fm_raw.splitlines():
        if ":" not in line:
            continue
        key, _, val = line.partition(":")
        key = key.strip()
        val = val.strip()
        if val.startswith("[") and val.endswith("]"):
            inner = val[1:-1].strip()
            fm[key] = [x.strip().strip('"').strip("'") for x in inner.split(",") if x.strip()]
        else:
            fm[key] = val.strip('"').strip("'")
    return fm, body


def extract_links(body: str):
    out = []
    for m in WIKILINK_RE.finditer(body):
        target = m.group(1).strip()
        if "/" in target:
            target = target.split("/")[-1]
        display = m.group(2).strip() if m.group(2) else target
        out.append((target.lower(), display))
    return out


def load_themes():
    themes = dict(BUILT_IN_THEMES)
    if THEMES_DIR.exists():
        for f in sorted(THEMES_DIR.glob("*.json")):
            try:
                obj = json.loads(f.read_text(encoding="utf-8"))
                themes[f.stem] = obj
            except Exception as e:
                print(f"WARN: failed to load theme {f.name}: {e}", file=sys.stderr)
    return themes


def encrypt_pages(pages_to_lock: dict, password: str):
    """
    Encrypt a dict of pages using PBKDF2-SHA256 + SHA-256 counter-mode keystream.
    Returns dict with base64 salt, iterations, ciphertext, plus a list of
    locked slugs so the UI can render a placeholder tree row.

    Decryption is done in-browser via Web Crypto API.
    """
    import hashlib, base64, secrets
    if not pages_to_lock:
        return None
    plaintext_obj = {
        "magic": "TABRAIN-V1",
        "pages": pages_to_lock,
    }
    plaintext = json.dumps(plaintext_obj, ensure_ascii=False).encode("utf-8")
    salt = secrets.token_bytes(16)
    iterations = 200_000

    # PBKDF2 → 64-byte master secret (expensive, done once).
    master = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, iterations, dklen=64)

    # Expand to keystream with SHA-256(master || counter_be32).
    keystream = bytearray()
    counter = 0
    while len(keystream) < len(plaintext):
        keystream.extend(hashlib.sha256(master + counter.to_bytes(4, "big")).digest())
        counter += 1
    keystream = bytes(keystream[: len(plaintext)])

    ciphertext = bytes(p ^ k for p, k in zip(plaintext, keystream))
    return {
        "salt": base64.b64encode(salt).decode(),
        "iterations": iterations,
        "ciphertext": base64.b64encode(ciphertext).decode(),
        "lockedSlugs": sorted(pages_to_lock.keys()),
        "lockedMeta": [
            {"slug": s, "title": p["title"], "type": p["type"], "folder": p["folder"]}
            for s, p in sorted(pages_to_lock.items())
        ],
    }


def main():
    if not WIKI.exists():
        print(f"ERROR: {WIKI} does not exist.")
        sys.exit(1)

    pages = {}
    all_tags = {}

    for md in sorted(WIKI.rglob("*.md")):
        text = md.read_text(encoding="utf-8")
        fm, body = parse_frontmatter(text)
        slug = md.stem.lower()
        rel = md.relative_to(WIKI)
        folder = rel.parts[0] if len(rel.parts) > 1 else "_root"

        title = fm.get("title") or slug.replace("-", " ").title()
        ptype = fm.get("type") or ("index" if slug == "index" else ("log" if slug == "log" else folder))
        tags = fm.get("tags") or []
        if isinstance(tags, str):
            tags = [tags]
        for t in tags:
            all_tags[t] = all_tags.get(t, 0) + 1

        outgoing = []
        seen = set()
        for target, _d in extract_links(body):
            if target == slug or target in seen:
                continue
            seen.add(target)
            outgoing.append(target)

        pages[slug] = {
            "slug": slug, "title": title, "type": ptype, "folder": folder,
            "tags": tags, "created": fm.get("created", ""), "updated": fm.get("updated", ""),
            "sources": fm.get("sources", ""), "body": body, "outgoing": outgoing,
        }

    for slug in pages:
        pages[slug]["backlinks"] = []
    for slug, p in pages.items():
        for t in p["outgoing"]:
            if t in pages and slug != t and slug not in pages[t]["backlinks"]:
                pages[t]["backlinks"].append(slug)

    # Split out locked pages BEFORE emitting the tree / public pages.
    locked_pages = {s: p for s, p in pages.items() if p["folder"] in LOCKED_FOLDERS}
    public_pages = {s: p for s, p in pages.items() if p["folder"] not in LOCKED_FOLDERS}
    encrypted = encrypt_pages(locked_pages, SOURCES_PASSWORD) if locked_pages else None

    # Tree with custom ordering; append any unlisted folders at the end.
    seen_folders = set(FOLDER_ORDER)
    extra_folders = [p["folder"] for p in pages.values() if p["folder"] not in seen_folders]
    ordered = list(FOLDER_ORDER) + [f for f in dict.fromkeys(extra_folders)]

    tree = []
    for folder in ordered:
        if folder in LOCKED_FOLDERS:
            # placeholder for locked folder — count shown, pages hidden until unlock
            locked_here = [p for p in pages.values() if p["folder"] == folder]
            if not locked_here:
                continue
            tree.append({
                "folder": folder,
                "label": FOLDER_LABELS.get(folder, folder.title()),
                "locked": True,
                "lockedCount": len(locked_here),
                "pages": [],
            })
            continue
        items = [p for p in public_pages.values() if p["folder"] == folder]
        if not items:
            continue
        items.sort(key=lambda p: p["title"].lower())
        tree.append({
            "folder": folder,
            "label": FOLDER_LABELS.get(folder, folder.title()),
            "locked": False,
            "pages": [{"slug": p["slug"], "title": p["title"], "type": p["type"]} for p in items],
        })

    themes = load_themes()

    data = {
        "generated": datetime.now().isoformat(timespec="seconds"),
        "pageCount": len(pages),
        "publicPageCount": len(public_pages),
        "lockedPageCount": len(locked_pages),
        "tagCount": len(all_tags),
        "tags": sorted(all_tags.items(), key=lambda x: (-x[1], x[0])),
        "tree": tree,
        "pages": public_pages,
        "encryptedSources": encrypted,
        "lockedFolders": sorted(LOCKED_FOLDERS),
        "folderOrder": ordered,
        "folderLabels": FOLDER_LABELS,
        "themes": themes,
        "defaultTheme": "obsidian",
    }

    html = TEMPLATE.replace("__WIKI_DATA__", json.dumps(data, ensure_ascii=False))
    OUTPUT.write_text(html, encoding="utf-8")
    print(f"Built {OUTPUT}")
    print(f"  {len(pages)} pages across {len(tree)} folders ({len(locked_pages)} locked)")
    print(f"  {len(all_tags)} unique tags")
    print(f"  {sum(len(p['outgoing']) for p in pages.values())} outgoing wiki-links parsed")
    print(f"  {len(themes)} themes: {', '.join(themes.keys())}")
    if encrypted:
        print(f"  sources encrypted with PBKDF2 ({encrypted['iterations']} iters)")


TEMPLATE = r"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>TA Brain — Wiki</title>
<meta name="viewport" content="width=device-width,initial-scale=1" />
<style>
/* Google Fonts — Inter (body), Space Grotesk (display), JetBrains Mono (code). */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  /* defaults — overwritten by applyTheme() at runtime */
  --bg: #1e1e26;
  --bg-2: #16161c;
  --bg-3: #262633;
  --panel: #22222c;
  --border: #30303c;
  --fg: #dcddde;
  --fg-dim: #9a9aa8;
  --fg-muted: #6d6d7a;
  --accent: #a277ff;
  --accent-2: #7aa2f7;
  --link: #b891ff;
  --link-unresolved: #e5484d;
  --tag-bg: #2b2538;
  --tag-fg: #c9b3ff;
  --code-bg: #111118;
  --shadow: 0 10px 40px rgba(0,0,0,.35);
  --radius: 10px;
  --title-gradient: linear-gradient(90deg, #fff, #c9b3ff);
  --brand-gradient: linear-gradient(90deg, #a277ff, #7aa2f7);
  --selection: rgba(162,119,255,.35);
  --font: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-display: "Space Grotesk", "Inter", ui-sans-serif, system-ui, sans-serif;
  --mono: "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace;
  --heading-font-weight: 600;
  --heading-letter-spacing: normal;
  --body-letter-spacing: normal;
  --ease: cubic-bezier(.2,.8,.2,1);
}
* { box-sizing: border-box; }
html, body { height: 100%; margin: 0; }
body {
  background: var(--bg); color: var(--fg);
  font-family: var(--font);
  font-size: 14.5px; line-height: 1.55;
  letter-spacing: var(--body-letter-spacing);
  overflow: hidden;
  transition: background-color .35s var(--ease), color .35s var(--ease);
}
::selection { background: var(--selection); }

.app {
  display: grid;
  grid-template-columns: 280px 1fr 300px;
  grid-template-rows: 48px 1fr;
  height: 100vh; width: 100vw;
}

/* Topbar */
.topbar {
  grid-column: 1 / -1;
  display: flex; align-items: center; gap: 12px;
  padding: 0 16px;
  background: var(--bg-2);
  border-bottom: 1px solid var(--border);
  z-index: 40;
  transition: background-color .35s var(--ease), border-color .35s var(--ease);
}
.topbar .brand {
  font-family: var(--font-display);
  font-weight: 700; letter-spacing: -.01em; font-size: 15.5px;
  background: var(--brand-gradient);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.topbar .meta { color: var(--fg-muted); font-size: 12px; }
.topbar .spacer { flex: 1; }
.topbar button, .dock button, .graph-controls button {
  background: var(--bg-3);
  color: var(--fg);
  border: 1px solid var(--border);
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-family: var(--font);
  letter-spacing: var(--body-letter-spacing);
  transition: background-color .2s var(--ease), border-color .2s var(--ease), color .2s var(--ease), transform .1s;
}
.topbar button:hover, .dock button:hover, .graph-controls button:hover {
  border-color: var(--accent);
  color: var(--accent);
}
.topbar button:active, .dock button:active { transform: scale(.96); }
.topbar button.active, .graph-controls button.active {
  border-color: var(--accent);
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
}

/* Sidebars */
.sidebar {
  background: var(--bg-2);
  border-right: 1px solid var(--border);
  overflow-y: auto;
  padding: 10px 6px 80px 10px;
  transition: background-color .35s var(--ease), border-color .35s var(--ease);
}
.sidebar.right {
  border-right: none;
  border-left: 1px solid var(--border);
  padding: 14px 14px 80px 14px;
}

/* Search */
.search {
  position: sticky; top: 0;
  background: var(--bg-2);
  padding: 4px 4px 10px 4px;
  z-index: 5;
}
.search input {
  width: 100%;
  background: var(--bg-3);
  border: 1px solid var(--border);
  color: var(--fg);
  padding: 10px 14px 10px 34px;
  border-radius: 10px;
  font-size: 13px;
  font-family: var(--font);
  outline: none;
  transition: border-color .2s var(--ease), box-shadow .2s var(--ease), background-color .2s var(--ease);
}
.search input::placeholder { color: var(--fg-muted); }
.search input:focus {
  border-color: var(--accent);
  background: var(--bg);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 20%, transparent);
}
.search::before {
  content: '⌕';
  position: absolute;
  left: 15px; top: 50%;
  transform: translateY(-50%);
  color: var(--fg-muted);
  font-size: 16px;
  pointer-events: none;
  z-index: 2;
}
.search { position: sticky; }

/* Search dropdown */
.search-results {
  position: absolute;
  left: 10px; right: 10px; top: 48px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: var(--shadow);
  max-height: 60vh;
  overflow-y: auto;
  z-index: 50;
  display: none;
}
.search-results.show { display: block; animation: fadeIn .18s var(--ease); }
.search-results .result {
  padding: 8px 12px;
  cursor: pointer;
  border-bottom: 1px solid var(--border);
  transition: background-color .15s var(--ease);
}
.search-results .result:last-child { border-bottom: none; }
.search-results .result:hover, .search-results .result.hl {
  background: color-mix(in srgb, var(--accent) 12%, transparent);
}
.search-results .result .t { font-size: 13px; color: var(--fg); font-weight: 500; }
.search-results .result .s { font-size: 11px; color: var(--fg-muted); margin-top: 2px; }
.search-results .result .tag { display: inline-block; padding: 1px 6px; border-radius: 4px; font-size: 10px; margin-right: 4px; background: var(--tag-bg); color: var(--tag-fg); }
.search-results .empty { padding: 12px; color: var(--fg-muted); font-size: 12px; font-style: italic; text-align: center; }

/* Folder tree — premium sidebar styling */
.folder { margin: 10px 0 4px; }
.folder > .head {
  display: flex; align-items: center; gap: 8px;
  cursor: pointer;
  padding: 8px 10px 8px 8px;
  color: var(--fg-dim);
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  user-select: none;
  border-radius: 8px;
  transition: color .18s var(--ease), background-color .18s var(--ease), transform .12s var(--ease);
  position: relative;
}
.folder > .head:hover {
  color: var(--fg);
  background: color-mix(in srgb, var(--fg) 4%, transparent);
}
.folder > .head .icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 22px; height: 22px; border-radius: 6px;
  background: color-mix(in srgb, var(--folder-color, var(--accent)) 14%, transparent);
  color: var(--folder-color, var(--accent));
  font-size: 12px;
  transition: transform .2s var(--ease), background-color .2s var(--ease);
  flex: 0 0 auto;
}
.folder > .head:hover .icon { transform: scale(1.08); }
.folder > .head .chev {
  transition: transform .22s var(--ease);
  display: inline-block; margin-left: 4px;
  font-size: 9px; opacity: .55;
}
.folder.collapsed > .head .chev { transform: rotate(-90deg); }
.folder > .head .count {
  margin-left: auto;
  font-variant-numeric: tabular-nums;
  color: var(--fg-muted);
  background: color-mix(in srgb, var(--fg) 6%, transparent);
  padding: 1px 8px;
  border-radius: 99px;
  font-size: 10.5px;
  font-weight: 500;
  letter-spacing: 0;
}
.folder > .head .lock-ico {
  margin-left: auto;
  font-size: 12px;
  color: var(--accent);
  opacity: .75;
}
.folder.collapsed > ul { display: none; }
.folder > ul {
  list-style: none;
  margin: 0;
  padding: 4px 0 6px 0;
  position: relative;
}
.folder > ul::before {
  content: '';
  position: absolute;
  left: 18px; top: 2px; bottom: 6px;
  width: 1px;
  background: color-mix(in srgb, var(--fg) 8%, transparent);
}
.folder > ul li {
  position: relative;
  padding: 7px 12px 7px 30px;
  margin: 1px 0;
  border-radius: 8px;
  cursor: pointer;
  color: var(--fg-dim);
  font-size: 13px;
  font-weight: 500;
  display: flex; align-items: center; gap: 8px;
  overflow: hidden;
  transition: background-color .18s var(--ease), color .18s var(--ease), transform .15s var(--ease), padding-left .18s var(--ease);
}
.folder > ul li::before {
  content: '';
  position: absolute;
  left: 0; top: 6px; bottom: 6px; width: 3px;
  border-radius: 3px;
  background: var(--type-color, var(--accent));
  transform: scaleY(0);
  transform-origin: center;
  transition: transform .22s var(--ease), width .22s var(--ease);
}
.folder > ul li::after {
  content: '→';
  margin-left: auto;
  color: var(--type-color, var(--accent));
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity .18s var(--ease), transform .18s var(--ease);
  font-size: 12px;
}
.folder > ul li:hover {
  color: var(--fg);
  background: color-mix(in srgb, var(--type-color, var(--accent)) 10%, transparent);
  transform: translateX(2px);
}
.folder > ul li:hover::before { transform: scaleY(1); }
.folder > ul li:hover::after { opacity: .8; transform: translateX(0); }
.folder > ul li.active {
  background: color-mix(in srgb, var(--type-color, var(--accent)) 18%, transparent);
  color: var(--fg);
  padding-left: 34px;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--type-color, var(--accent)) 28%, transparent);
}
.folder > ul li.active::before {
  transform: scaleY(1);
  width: 3px;
  box-shadow: 0 0 8px var(--type-color, var(--accent));
}
.folder > ul li.active::after { opacity: 1; transform: translateX(0); }
.folder > ul li .dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  flex: 0 0 auto;
  background: var(--type-color, var(--accent));
  box-shadow: 0 0 0 0 color-mix(in srgb, var(--type-color, var(--accent)) 40%, transparent);
  transition: box-shadow .22s var(--ease);
}
.folder > ul li:hover .dot {
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--type-color, var(--accent)) 20%, transparent);
}
.folder.locked > .head {
  background: color-mix(in srgb, var(--accent) 8%, transparent);
  border: 1px dashed color-mix(in srgb, var(--accent) 30%, transparent);
}
.folder.locked > .head:hover {
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  border-color: var(--accent);
}
/* per-type colors used by sidebar li (--type-color), graph nodes, and chips */
.folder > ul li[data-type="role"]       { --type-color: #ff9e64; }
.folder > ul li[data-type="department"] { --type-color: #7aa2f7; }
.folder > ul li[data-type="process"]    { --type-color: #9ece6a; }
.folder > ul li[data-type="onboarding"] { --type-color: #e0af68; }
.folder > ul li[data-type="glossary"]   { --type-color: #bb9af7; }
.folder > ul li[data-type="entity"]     { --type-color: #f7768e; }
.folder > ul li[data-type="concept"]    { --type-color: #7dcfff; }
.folder > ul li[data-type="source"]     { --type-color: #c0caf5; }
.folder > ul li[data-type="analysis"]   { --type-color: #73daca; }
.folder > ul li[data-type="index"],
.folder > ul li[data-type="log"]        { --type-color: #9a9aa8; }

/* per-folder accent colors used by folder icons */
.folder[data-folder="roles"]        { --folder-color: #ff9e64; }
.folder[data-folder="concepts"]     { --folder-color: #7dcfff; }
.folder[data-folder="entities"]     { --folder-color: #f7768e; }
.folder[data-folder="processes"]    { --folder-color: #9ece6a; }
.folder[data-folder="_root"]        { --folder-color: #dcddde; }
.folder[data-folder="glossary"]     { --folder-color: #bb9af7; }
.folder[data-folder="sources"]      { --folder-color: var(--accent); }
.folder[data-folder="onboarding"]   { --folder-color: #e0af68; }
.folder[data-folder="departments"]  { --folder-color: #7aa2f7; }
.folder[data-folder="analyses"]     { --folder-color: #73daca; }

/* =========================================
   Per-theme sidebar style variants
   body[data-sidebar-style="classic|pill|flat|tracked|neon"]
   ========================================= */

/* PILL — rounded chip active, soft hover, no accent bar */
body[data-sidebar-style="pill"] .folder > ul li { border-radius: 999px; padding: 6px 14px 6px 28px; }
body[data-sidebar-style="pill"] .folder > ul li::before { display: none; }
body[data-sidebar-style="pill"] .folder > ul li::after { display: none; }
body[data-sidebar-style="pill"] .folder > ul li:hover { transform: none; background: color-mix(in srgb, var(--fg) 6%, transparent); }
body[data-sidebar-style="pill"] .folder > ul li.active {
  background: color-mix(in srgb, var(--type-color, var(--accent)) 22%, transparent);
  box-shadow: none;
  padding-left: 28px;
}
body[data-sidebar-style="pill"] .folder > .head { border-radius: 999px; }

/* FLAT — sharp corners, inverted active, no bar, no chevron */
body[data-sidebar-style="flat"] .folder > ul li { border-radius: 2px; padding: 6px 10px 6px 26px; }
body[data-sidebar-style="flat"] .folder > ul li::before { display: none; }
body[data-sidebar-style="flat"] .folder > ul li::after { display: none; }
body[data-sidebar-style="flat"] .folder > ul li:hover { transform: none; background: color-mix(in srgb, var(--fg) 8%, transparent); }
body[data-sidebar-style="flat"] .folder > ul li.active {
  background: var(--fg);
  color: var(--bg);
  box-shadow: none;
  padding-left: 26px;
}
body[data-sidebar-style="flat"] .folder > ul li.active .dot { background: var(--bg); }
body[data-sidebar-style="flat"] .folder > .head { border-radius: 2px; }

/* TRACKED — uppercase heads, letter-spacing, block-style active with left border */
body[data-sidebar-style="tracked"] .folder > .head {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 11px;
  border-radius: 0;
  border-bottom: 1px dashed color-mix(in srgb, var(--border) 80%, transparent);
}
body[data-sidebar-style="tracked"] .folder > ul li {
  border-radius: 0;
  border-left: 2px solid transparent;
  padding: 7px 12px 7px 14px;
}
body[data-sidebar-style="tracked"] .folder > ul li::before { display: none; }
body[data-sidebar-style="tracked"] .folder > ul li::after { display: none; }
body[data-sidebar-style="tracked"] .folder > ul li:hover {
  transform: none;
  border-left-color: color-mix(in srgb, var(--type-color, var(--accent)) 50%, transparent);
  background: color-mix(in srgb, var(--type-color, var(--accent)) 6%, transparent);
}
body[data-sidebar-style="tracked"] .folder > ul li.active {
  border-left-color: var(--type-color, var(--accent));
  background: color-mix(in srgb, var(--type-color, var(--accent)) 12%, transparent);
  box-shadow: none;
  padding-left: 14px;
}

/* NEON — glow rings on active/hover */
body[data-sidebar-style="neon"] .folder > ul li.active {
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb, var(--type-color, var(--accent)) 55%, transparent),
    0 0 12px color-mix(in srgb, var(--type-color, var(--accent)) 30%, transparent);
}
body[data-sidebar-style="neon"] .folder > ul li:hover {
  box-shadow: 0 0 8px color-mix(in srgb, var(--type-color, var(--accent)) 22%, transparent);
}
body[data-sidebar-style="neon"] .folder > ul li.active::before {
  box-shadow: 0 0 12px var(--type-color, var(--accent)), 0 0 4px var(--type-color, var(--accent));
}
body[data-sidebar-style="neon"] .folder > .head .icon {
  text-shadow: 0 0 8px color-mix(in srgb, var(--folder-color, var(--accent)) 60%, transparent);
}

/* Main */
.main {
  overflow-y: auto;
  padding: 28px 48px 100px 48px;
  background: var(--bg);
  position: relative;
  transition: background-color .35s var(--ease);
}
.main .crumb {
  color: var(--fg-muted); font-size: 11px; margin-bottom: 10px;
  text-transform: uppercase; letter-spacing: .8px;
}
.main h1.page-title {
  font-family: var(--font-display);
  font-size: clamp(28px, 3.4vw, 46px);
  line-height: 1.08;
  margin: 0 0 10px 0;
  font-weight: var(--heading-font-weight);
  letter-spacing: var(--heading-letter-spacing);
  background: var(--title-gradient);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.chips { display: flex; flex-wrap: wrap; gap: 6px; margin: 6px 0 20px; }
.chip {
  background: var(--tag-bg); color: var(--tag-fg);
  padding: 3px 10px; border-radius: 99px;
  font-size: 11.5px;
  border: 1px solid color-mix(in srgb, var(--accent) 20%, transparent);
  cursor: pointer;
  transition: background-color .15s var(--ease), transform .1s;
}
.chip:hover { transform: translateY(-1px); }
.chip.type { background: transparent; color: var(--fg-dim); border-color: var(--border); }
.chip.meta { background: transparent; color: var(--fg-muted); border-color: var(--border); cursor: default; }
.chip.meta:hover { transform: none; }

article.page { max-width: 820px; }
article.page.fade-in { animation: fadeIn .25s var(--ease); }
article.page h1 { display: none; }
article.page h2, article.page h3, article.page h4 {
  font-family: var(--font-display);
  line-height: 1.22;
  font-weight: var(--heading-font-weight);
  letter-spacing: var(--heading-letter-spacing);
}
article.page h2 {
  margin-top: 28px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 4px;
}
article.page a {
  color: var(--link);
  text-decoration: none;
  border-bottom: 1px dashed color-mix(in srgb, var(--link) 45%, transparent);
  transition: color .15s var(--ease), border-color .15s var(--ease);
}
article.page a:hover { color: var(--fg); border-bottom-color: var(--fg); }
article.page a.wikilink.unresolved { color: var(--link-unresolved); border-bottom-color: color-mix(in srgb, var(--link-unresolved) 45%, transparent); }
article.page code { font-family: var(--mono); background: var(--code-bg); padding: 2px 5px; border-radius: 4px; font-size: 12.5px; }
article.page pre { background: var(--code-bg); padding: 14px; border-radius: 8px; overflow-x: auto; }
article.page pre code { background: transparent; padding: 0; }
article.page table { border-collapse: collapse; margin: 10px 0 18px; }
article.page th, article.page td { border: 1px solid var(--border); padding: 6px 10px; vertical-align: top; }
article.page th { background: var(--bg-2); text-align: left; }
article.page blockquote {
  border-left: 3px solid var(--accent);
  background: color-mix(in srgb, var(--accent) 8%, transparent);
  margin: 10px 0; padding: 6px 14px;
  color: var(--fg-dim);
  border-radius: 4px;
}
article.page blockquote.callout-contradiction {
  border-left-color: var(--link-unresolved);
  background: color-mix(in srgb, var(--link-unresolved) 8%, transparent);
}
article.page hr { border: 0; border-top: 1px solid var(--border); margin: 22px 0; }
article.page ul, article.page ol { padding-left: 22px; }

/* Right panel */
.right h3 {
  font-size: 10.5px; letter-spacing: .9px; text-transform: uppercase;
  color: var(--fg-muted); margin: 18px 0 8px; font-weight: 600;
}
.right h3:first-child { margin-top: 0; }
.right ul { list-style: none; margin: 0; padding: 0; }
.right li {
  padding: 6px 10px; border-radius: 8px; cursor: pointer;
  font-size: 13px; color: var(--fg-dim);
  transition: background-color .15s var(--ease), color .15s var(--ease);
}
.right li:hover { background: var(--bg-3); color: var(--fg); }
.right li .sub { display: block; color: var(--fg-muted); font-size: 11px; }
.empty { color: var(--fg-muted); font-size: 12px; font-style: italic; }

/* Graph view */
.graph-wrap {
  position: fixed; inset: 48px 0 0 0;
  background: var(--bg-2);
  display: none; z-index: 25;
  overflow: hidden;
}
.graph-wrap.show { display: block; animation: fadeIn .25s var(--ease); }
.graph-wrap svg { width: 100%; height: 100%; display: block; cursor: grab; user-select: none; }
.graph-wrap svg.panning { cursor: grabbing; }
.graph-legend {
  position: absolute; top: 14px; left: 14px;
  background: color-mix(in srgb, var(--panel) 85%, transparent);
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 12px;
}
.graph-legend .row { display: flex; align-items: center; gap: 8px; margin: 3px 0; color: var(--fg-dim); }
.graph-legend .swatch { width: 10px; height: 10px; border-radius: 50%; }
.graph-controls {
  position: absolute; top: 14px; right: 14px;
  display: flex; gap: 8px;
}
.graph-hint {
  position: absolute; bottom: 90px; left: 50%; transform: translateX(-50%);
  color: var(--fg-muted); font-size: 11px;
  background: color-mix(in srgb, var(--panel) 85%, transparent);
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  border: 1px solid var(--border);
  padding: 6px 12px;
  border-radius: 99px;
}
.graph-wrap svg {
  background:
    radial-gradient(ellipse at center,
      color-mix(in srgb, var(--panel) 85%, var(--bg)) 0%,
      var(--bg) 78%);
}
.graph-node { cursor: pointer; }
.graph-node circle {
  stroke: color-mix(in srgb, var(--bg) 70%, transparent);
  stroke-width: 1.5;
  transition: stroke-width .18s var(--ease), opacity .22s var(--ease), filter .22s var(--ease);
}
.graph-node:hover circle,
.graph-node.focused circle {
  stroke: var(--fg);
  stroke-width: 2.5;
  filter: drop-shadow(0 0 8px color-mix(in srgb, var(--accent) 55%, transparent));
}
.graph-node.active circle {
  stroke: var(--accent);
  stroke-width: 3;
  filter: drop-shadow(0 0 10px color-mix(in srgb, var(--accent) 70%, transparent));
}
.graph-node.dim { opacity: .16; }
.graph-node.dragging { cursor: grabbing; }
.graph-node.dragging circle { filter: drop-shadow(0 4px 10px rgba(0,0,0,.35)); }
.graph-label {
  font: 600 11px/1 var(--font);
  fill: var(--fg);
  paint-order: stroke fill;
  stroke: var(--bg);
  stroke-width: 3.5px;
  stroke-linejoin: round;
  pointer-events: none;
  transition: opacity .2s var(--ease);
}
.graph-label.hidden { opacity: 0; pointer-events: none; }
.graph-label.dim { opacity: .2; }
.graph-label.strong { fill: var(--accent); }
.graph-link {
  stroke: color-mix(in srgb, var(--fg) 22%, transparent);
  stroke-width: 1;
  fill: none;
  transition: stroke .18s var(--ease), stroke-width .18s var(--ease), stroke-opacity .22s var(--ease);
}
.graph-link.focused { stroke: var(--accent); stroke-width: 1.8; stroke-opacity: .95; }
.graph-link.highlight { stroke: var(--accent); stroke-width: 1.6; stroke-opacity: .8; }
.graph-link.dim { stroke-opacity: .06; }
.graph-legend .row { cursor: pointer; user-select: none; transition: color .15s var(--ease), opacity .15s var(--ease); }
.graph-legend .row:hover { color: var(--fg); }
.graph-legend .row.off { opacity: .35; }
.graph-legend .row.off .swatch { filter: grayscale(.8); }

/* Physics controls panel */
.graph-physics {
  position: absolute;
  top: 60px; right: 14px;
  width: 280px;
  background: color-mix(in srgb, var(--panel) 90%, transparent);
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px 10px 14px;
  font-size: 12px;
  display: none;
  z-index: 6;
  box-shadow: 0 10px 30px color-mix(in srgb, #000 25%, transparent);
}
.graph-physics.show { display: block; }
.graph-physics .gp-head {
  display: flex; align-items: center; justify-content: space-between;
  font-weight: 600; font-size: 12px;
  color: var(--fg);
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
  letter-spacing: 0.02em;
}
.graph-physics .gp-reset {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--fg-dim);
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  cursor: pointer;
  transition: border-color .15s, color .15s;
}
.graph-physics .gp-reset:hover { color: var(--fg); border-color: var(--accent); }
.graph-physics .gp-row {
  display: grid;
  grid-template-columns: 1fr 1fr 44px;
  align-items: center;
  gap: 8px;
  margin: 6px 0;
  color: var(--fg-dim);
}
.graph-physics .gp-label { font-size: 11px; white-space: nowrap; }
.graph-physics .gp-val {
  text-align: right;
  font: 500 11px/1 var(--mono, monospace);
  color: var(--fg);
  font-variant-numeric: tabular-nums;
}
.graph-physics input[type="range"] {
  -webkit-appearance: none; appearance: none;
  width: 100%; height: 4px;
  background: color-mix(in srgb, var(--fg) 15%, transparent);
  border-radius: 99px;
  outline: none;
  cursor: pointer;
}
.graph-physics input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none;
  width: 14px; height: 14px; border-radius: 50%;
  background: var(--accent);
  border: 2px solid var(--panel);
  box-shadow: 0 0 0 1px var(--accent);
  cursor: grab;
  transition: transform .12s var(--ease);
}
.graph-physics input[type="range"]::-webkit-slider-thumb:active { cursor: grabbing; transform: scale(1.15); }
.graph-physics input[type="range"]::-moz-range-thumb {
  width: 14px; height: 14px; border-radius: 50%;
  background: var(--accent);
  border: 2px solid var(--panel);
  box-shadow: 0 0 0 1px var(--accent);
  cursor: grab;
}
.graph-physics .gp-foot {
  display: flex; gap: 6px;
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid var(--border);
}
.graph-physics .gp-btn {
  flex: 1;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--fg-dim);
  padding: 5px 8px;
  border-radius: 7px;
  font-size: 11px;
  cursor: pointer;
  transition: all .15s;
}
.graph-physics .gp-btn:hover { color: var(--fg); border-color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, transparent); }

/* Graph node tooltip */
.graph-tooltip {
  position: absolute;
  left: 0; top: 0;
  transform: translate(-50%, -100%);
  pointer-events: none;
  background: color-mix(in srgb, var(--panel) 96%, transparent);
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 7px 10px 6px 10px;
  font-size: 12px;
  color: var(--fg);
  max-width: 280px;
  box-shadow: 0 8px 24px color-mix(in srgb, #000 30%, transparent);
  opacity: 0;
  transition: opacity .15s var(--ease), transform .15s var(--ease);
  z-index: 10;
  white-space: nowrap;
  visibility: hidden;
}
.graph-tooltip.show {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, calc(-100% - 4px));
  transition: opacity .15s var(--ease), transform .15s var(--ease);
}
.graph-tooltip.hiding {
  opacity: 0;
  transition: opacity .075s var(--ease);
}
.graph-tooltip .gt-title {
  font-weight: 600;
  font-size: 13px;
  line-height: 1.2;
  letter-spacing: -0.01em;
  margin-bottom: 2px;
  color: var(--fg);
  overflow: hidden; text-overflow: ellipsis;
}
.graph-tooltip .gt-meta {
  display: flex; align-items: center; gap: 5px;
  font-size: 10.5px;
  color: var(--fg-muted);
  font-variant-numeric: tabular-nums;
}
.graph-tooltip .gt-type {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--tt-type-color, var(--fg-dim));
  font-weight: 600;
}
.graph-tooltip .gt-dot { opacity: .5; }
/* tooltip arrow */
.graph-tooltip::after {
  content: '';
  position: absolute;
  left: 50%; bottom: -5px;
  transform: translateX(-50%) rotate(45deg);
  width: 8px; height: 8px;
  background: inherit;
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

/* Dock */
.dock {
  position: fixed; bottom: 18px; left: 50%; transform: translateX(-50%);
  display: flex; gap: 6px;
  background: color-mix(in srgb, var(--panel) 85%, transparent);
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 6px;
  box-shadow: var(--shadow);
  z-index: 30;
}

/* Modals (settings, help) */
.modal-backdrop {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
  display: none;
  z-index: 60;
}
.modal-backdrop.show { display: flex; align-items: center; justify-content: center; animation: fadeIn .2s var(--ease); }
.modal {
  background: var(--panel);
  color: var(--fg);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: var(--shadow);
  width: min(760px, 94vw);
  max-height: 86vh;
  overflow: hidden;
  display: flex; flex-direction: column;
  animation: modalIn .25s var(--ease);
}
.modal.wide { width: min(920px, 96vw); }
.modal .head {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; gap: 12px;
}
.modal .head h2 { margin: 0; font-size: 18px; font-weight: var(--heading-font-weight); letter-spacing: var(--heading-letter-spacing); }
.modal .head .x {
  margin-left: auto;
  background: transparent; color: var(--fg-dim); border: none;
  font-size: 20px; cursor: pointer; padding: 0 4px; line-height: 1;
}
.modal .head .x:hover { color: var(--fg); }
.modal .body { padding: 18px 20px; overflow-y: auto; }
.modal .body h3 { margin-top: 20px; font-size: 13px; text-transform: uppercase; letter-spacing: .8px; color: var(--fg-muted); font-weight: 600; }
.modal .body h3:first-child { margin-top: 0; }

/* Theme grid in settings */
.theme-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 10px; }
.theme-card {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
  cursor: pointer;
  position: relative;
  transition: border-color .2s var(--ease), transform .1s;
  background: var(--bg-3);
}
.theme-card:hover { border-color: var(--accent); }
.theme-card.active { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 25%, transparent); }
.theme-card .t-name { font-weight: 600; font-size: 13.5px; margin-bottom: 3px; }
.theme-card .t-desc { color: var(--fg-muted); font-size: 11.5px; line-height: 1.4; }
.theme-card .t-swatches { display: flex; gap: 4px; margin-top: 10px; }
.theme-card .t-swatches span { width: 18px; height: 18px; border-radius: 5px; border: 1px solid rgba(0,0,0,0.15); }

/* Help view (reuses .modal but full-height) */
.modal.help { width: min(960px, 96vw); height: min(86vh, 900px); }
.help-nav { display: flex; gap: 6px; margin-bottom: 14px; flex-wrap: wrap; }
.help-nav button {
  background: var(--bg-3); color: var(--fg-dim);
  border: 1px solid var(--border); border-radius: 99px;
  padding: 4px 12px; cursor: pointer; font-size: 12px;
  transition: all .15s var(--ease);
  font-family: var(--font);
}
.help-nav button:hover { color: var(--fg); border-color: var(--accent); }
.help-nav button.active { background: var(--accent); color: white; border-color: var(--accent); }
.help-section { display: none; }
.help-section.active { display: block; animation: fadeIn .2s var(--ease); }
.help-section h2 { margin: 0 0 10px; font-size: 22px; font-weight: var(--heading-font-weight); letter-spacing: var(--heading-letter-spacing); }
.help-section p { color: var(--fg-dim); margin: 8px 0; }
.help-section ul { color: var(--fg-dim); }
.help-section kbd {
  display: inline-block; padding: 1px 7px; border-radius: 5px;
  background: var(--bg-3); border: 1px solid var(--border);
  font-family: var(--mono); font-size: 11px; color: var(--fg);
  box-shadow: 0 1px 0 var(--border);
}
.help-tiles { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 10px; margin: 14px 0; }
.help-tile { border: 1px solid var(--border); border-radius: 12px; padding: 12px 14px; background: var(--bg-3); }
.help-tile .n { font-weight: 600; color: var(--fg); font-size: 13px; margin-bottom: 4px; }
.help-tile .d { color: var(--fg-muted); font-size: 12px; line-height: 1.45; }
.prompt-wrap { position: relative; margin: 14px 0; }
.prompt-wrap pre {
  max-height: 520px; overflow: auto;
  background: var(--bg-3); border: 1px solid var(--border); border-radius: 12px;
  padding: 16px 18px; font-size: 12.5px; line-height: 1.55;
  font-family: var(--font-mono); color: var(--fg-dim); white-space: pre-wrap;
}
.prompt-wrap .copy-btn {
  position: absolute; top: 10px; right: 10px;
  background: var(--accent); color: var(--accent-fg, #fff);
  border: none; border-radius: 8px; padding: 6px 12px;
  font-size: 12px; font-weight: 600; font-family: var(--font-ui);
  cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,.18);
  transition: transform .15s var(--ease), filter .15s var(--ease);
}
.prompt-wrap .copy-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
.prompt-wrap .copy-btn.ok { background: #22c55e; color: #fff; }
.step-flow { counter-reset: step; display: grid; gap: 8px; margin: 12px 0; }
.step-flow .step {
  position: relative; padding: 10px 14px 10px 44px;
  border: 1px solid var(--border); border-radius: 10px; background: var(--bg-3);
  color: var(--fg-dim); font-size: 13px; line-height: 1.5;
}
.step-flow .step::before {
  counter-increment: step; content: counter(step);
  position: absolute; left: 10px; top: 50%; transform: translateY(-50%);
  width: 24px; height: 24px; border-radius: 50%;
  background: var(--accent); color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700;
}

/* Animations */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes modalIn { from { opacity: 0; transform: translateY(10px) scale(.98); } to { opacity: 1; transform: none; } }
@keyframes pageIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }

/* View transitions on navigate */
.main article.page { animation: pageIn .28s var(--ease); }
.main h1.page-title.changing { animation: pageIn .28s var(--ease); }

/* Scrollbars */
::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 6px; }
::-webkit-scrollbar-thumb:hover { background: color-mix(in srgb, var(--fg) 20%, var(--border)); }

mark { background: color-mix(in srgb, var(--accent) 40%, transparent); color: var(--fg); padding: 0 2px; border-radius: 3px; }

@media (max-width: 1100px) {
  .app { grid-template-columns: 240px 1fr 260px; }
  .main { padding: 24px 28px 100px; }
}
@media (max-width: 820px) {
  .app { grid-template-columns: 1fr; grid-template-rows: 48px 1fr; }
  .sidebar, .sidebar.right { display: none; }
  .sidebar.show, .sidebar.right.show { display: block; position: fixed; top: 48px; bottom: 0; width: 84%; z-index: 45; box-shadow: var(--shadow); }
  .sidebar.right.show { right: 0; left: auto; }
}
</style>
</head>
<body>
<div class="app">
  <div class="topbar">
    <div class="brand">TA Brain</div>
    <div class="meta" id="stats"></div>
    <div class="spacer"></div>
    <button id="btn-help" title="Help (?)">? Help</button>
    <button id="btn-settings" title="Settings">⚙ Settings</button>
    <button id="btn-graph" title="Toggle graph (G)">Graph</button>
    <button id="btn-random" title="Random page (R)">Random</button>
    <button id="btn-home" title="Overview (H)">Overview</button>
  </div>

  <aside class="sidebar left" id="sb-left">
    <div class="search">
      <input id="search" type="text" placeholder="Search pages, tags, content..." autocomplete="off" />
      <div class="search-results" id="search-results"></div>
    </div>
    <div id="tree"></div>
  </aside>

  <main class="main" id="main">
    <div class="crumb" id="crumb"></div>
    <h1 class="page-title" id="title"></h1>
    <div class="chips" id="chips"></div>
    <article class="page" id="content"></article>
  </main>

  <aside class="sidebar right" id="sb-right">
    <h3>On this page</h3>
    <ul id="toc"></ul>
    <h3>Backlinks</h3>
    <ul id="backlinks"></ul>
    <h3>Outgoing Links</h3>
    <ul id="outgoing"></ul>
    <h3>Tags</h3>
    <div class="chips" id="page-tags"></div>
  </aside>
</div>

<!-- Graph -->
<div class="graph-wrap" id="graph-wrap">
  <div class="graph-legend" id="graph-legend"></div>
  <div class="graph-controls">
    <button id="graph-local">Local</button>
    <button id="graph-global" class="active">Global</button>
    <button id="graph-reset">Reset view</button>
    <button id="graph-forces" title="Physics controls">Forces</button>
    <button id="graph-close">Close</button>
  </div>
  <div class="graph-physics" id="graph-physics">
    <div class="gp-head">
      <span>Forces</span>
      <button id="gp-reset" class="gp-reset" title="Restore defaults">Reset</button>
    </div>
    <label class="gp-row">
      <span class="gp-label">Link distance</span>
      <input type="range" id="gp-linkDistance" min="20" max="260" step="1">
      <span class="gp-val" id="gp-linkDistance-val"></span>
    </label>
    <label class="gp-row">
      <span class="gp-label">Link force</span>
      <input type="range" id="gp-linkForce" min="0" max="0.3" step="0.005">
      <span class="gp-val" id="gp-linkForce-val"></span>
    </label>
    <label class="gp-row">
      <span class="gp-label">Repel force</span>
      <input type="range" id="gp-repel" min="0" max="3000" step="25">
      <span class="gp-val" id="gp-repel-val"></span>
    </label>
    <label class="gp-row">
      <span class="gp-label">Gravity (center)</span>
      <input type="range" id="gp-gravity" min="0" max="0.01" step="0.0001">
      <span class="gp-val" id="gp-gravity-val"></span>
    </label>
    <label class="gp-row">
      <span class="gp-label">Cluster (by type)</span>
      <input type="range" id="gp-cluster" min="0" max="0.1" step="0.001">
      <span class="gp-val" id="gp-cluster-val"></span>
    </label>
    <label class="gp-row">
      <span class="gp-label">Friction</span>
      <input type="range" id="gp-friction" min="0.5" max="0.98" step="0.01">
      <span class="gp-val" id="gp-friction-val"></span>
    </label>
    <label class="gp-row">
      <span class="gp-label">Collision pad</span>
      <input type="range" id="gp-collisionPad" min="0" max="40" step="1">
      <span class="gp-val" id="gp-collisionPad-val"></span>
    </label>
    <div class="gp-foot">
      <button id="gp-reheat" class="gp-btn">Reheat</button>
      <button id="gp-freeze" class="gp-btn">Freeze</button>
    </div>
  </div>
  <div class="graph-hint">Scroll to zoom • drag background to pan • drag nodes to reposition • click node to open • hover to focus neighbors • click legend to filter</div>
  <div class="graph-tooltip" id="graph-tooltip" role="tooltip" aria-hidden="true">
    <div class="gt-title" id="gt-title"></div>
    <div class="gt-meta"><span class="gt-type" id="gt-type"></span><span class="gt-dot">·</span><span class="gt-degree" id="gt-degree"></span></div>
  </div>
  <svg id="graph-svg">
    <g id="graph-viewport">
      <g id="graph-links"></g>
      <g id="graph-nodes"></g>
      <g id="graph-labels"></g>
    </g>
  </svg>
</div>

<!-- Dock -->
<div class="dock">
  <button id="dock-prev" title="Back (←)">◀</button>
  <button id="dock-next" title="Forward (→)">▶</button>
  <button id="dock-graph">Graph</button>
  <button id="dock-random">Random</button>
  <button id="dock-help">?</button>
</div>

<!-- Settings modal -->
<div class="modal-backdrop" id="settings-backdrop">
  <div class="modal">
    <div class="head">
      <h2>Settings</h2>
      <button class="x" id="settings-close">×</button>
    </div>
    <div class="body">
      <h3>Theme</h3>
      <p style="color:var(--fg-muted); font-size:12px; margin:0 0 10px;">Switch the whole wiki's appearance. Drop a <code>themes/&lt;name&gt;.json</code> file and rebuild to add your own.</p>
      <div class="theme-grid" id="theme-grid"></div>

      <h3>About this build</h3>
      <div id="about-build" style="color:var(--fg-muted); font-size:12px; line-height:1.6;"></div>
    </div>
  </div>
</div>

<!-- Unlock (password) modal -->
<div class="modal-backdrop" id="unlock-backdrop">
  <div class="modal" style="width:min(440px,94vw)">
    <div class="head">
      <h2>🔒 Unlock Sources</h2>
      <button class="x" id="unlock-close">×</button>
    </div>
    <div class="body">
      <p style="color:var(--fg-dim); font-size:13px; margin:0 0 14px;">
        Sources are encrypted. Enter the password to decrypt and view them.
        Your password is never stored — a session key is cached only until you close this tab.
      </p>
      <input id="unlock-input" type="password" placeholder="Password" autocomplete="off"
        style="width:100%; background:var(--bg-3); color:var(--fg); border:1px solid var(--border); padding:10px 14px; border-radius:10px; font-size:14px; font-family:var(--font); outline:none;" />
      <div id="unlock-err" style="color:var(--link-unresolved); font-size:12px; margin-top:8px; display:none;"></div>
      <div style="display:flex; gap:8px; margin-top:14px;">
        <button id="unlock-submit" style="flex:1; background:var(--accent); color:#fff; border:none; padding:10px 14px; border-radius:10px; font-size:13px; font-weight:600; cursor:pointer; font-family:var(--font);">Unlock</button>
        <button id="unlock-cancel" style="background:var(--bg-3); color:var(--fg); border:1px solid var(--border); padding:10px 14px; border-radius:10px; font-size:13px; cursor:pointer; font-family:var(--font);">Cancel</button>
      </div>
    </div>
  </div>
</div>

<!-- Help modal -->
<div class="modal-backdrop" id="help-backdrop">
  <div class="modal help wide">
    <div class="head">
      <h2>TA Brain — User Guide</h2>
      <button class="x" id="help-close">×</button>
    </div>
    <div class="body">
      <div class="help-nav" id="help-nav"></div>
      <div id="help-body"></div>
    </div>
  </div>
</div>

<script id="wiki-data" type="application/json">__WIKI_DATA__</script>
<script>
// ============================================================
// TA Brain Wiki — Client
// ============================================================
const DATA = JSON.parse(document.getElementById('wiki-data').textContent);
const pages = DATA.pages;  // public pages only; locked pages merged in after unlock
const THEMES = DATA.themes;
const ENCRYPTED = DATA.encryptedSources;  // null if no locked content
const UNLOCKED_SOURCES = { tree: null };   // populated after unlock
function sourcesUnlocked() { return UNLOCKED_SOURCES.tree !== null; }
const typeColor = {
  role: '#ff9e64', department: '#7aa2f7', process: '#9ece6a',
  onboarding: '#e0af68', glossary: '#bb9af7', entity: '#f7768e',
  concept: '#7dcfff', source: '#c0caf5', analysis: '#73daca',
  index: '#9a9aa8', log: '#9a9aa8',
};
const DEFAULT_PHYSICS = {
  linkDistance: 110,  // target edge length (px)
  linkForce: 0.04,    // spring stiffness (0..0.3)
  repel: 1400,        // Coulomb charge (0..3000)
  gravity: 0.0015,    // pull toward center (0..0.01)
  cluster: 0.02,      // pull toward type centroid (0..0.1)
  friction: 0.88,     // velocity damping per tick (0.5..0.98) — higher = more friction
  collisionPad: 6,    // extra spacing beyond node radii (0..30)
};
function loadPhysics() {
  try {
    const saved = JSON.parse(localStorage.getItem('tabrain.physics') || '{}');
    return { ...DEFAULT_PHYSICS, ...saved };
  } catch(_) { return { ...DEFAULT_PHYSICS }; }
}
const state = {
  current: null, history: [], forward: [],
  showGraph: false, graphMode: 'global',
  theme: localStorage.getItem('tabrain.theme') || DATA.defaultTheme || 'obsidian',
  physics: loadPhysics(),
};
function savePhysics() {
  localStorage.setItem('tabrain.physics', JSON.stringify(state.physics));
}

// ============================================================
// THEME SYSTEM
// ============================================================
function applyTheme(name) {
  const theme = THEMES[name] || THEMES[DATA.defaultTheme];
  if (!theme) return;
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  if (theme.font) root.style.setProperty('--font', theme.font);
  if (theme.fontDisplay) root.style.setProperty('--font-display', theme.fontDisplay);
  if (theme.fontMono) root.style.setProperty('--mono', theme.fontMono);
  root.dataset.theme = name;
  root.dataset.mode = theme.mode || 'dark';
  state.theme = name;
  localStorage.setItem('tabrain.theme', name);
  // per-theme sidebar icon set + style variant
  const sbCfg = THEME_SIDEBAR[name] || { icons: 'default', style: 'classic' };
  FOLDER_ICONS = { ...FOLDER_ICON_SETS[sbCfg.icons] || FOLDER_ICON_SETS.default };
  document.body.dataset.sidebarStyle = sbCfg.style;
  if (document.getElementById('tree') && document.getElementById('tree').children.length) buildTree();
  // refresh theme-grid active state
  document.querySelectorAll('.theme-card').forEach(c => c.classList.toggle('active', c.dataset.theme === name));
}

function buildThemeGrid() {
  const grid = document.getElementById('theme-grid');
  grid.innerHTML = Object.entries(THEMES).map(([id, t]) => {
    const v = t.vars || {};
    const sw = [v['--bg'], v['--bg-2'], v['--accent'], v['--fg']].filter(Boolean);
    return `<div class="theme-card${state.theme === id ? ' active' : ''}" data-theme="${id}">
      <div class="t-name">${escapeHtml(t.name || id)}</div>
      <div class="t-desc">${escapeHtml(t.description || '')}</div>
      <div class="t-swatches">${sw.map(c => `<span style="background:${c}"></span>`).join('')}</div>
    </div>`;
  }).join('');
  grid.querySelectorAll('.theme-card').forEach(c =>
    c.addEventListener('click', () => applyTheme(c.dataset.theme))
  );
}

// ============================================================
// MARKDOWN RENDERER (subset sufficient for this wiki)
// ============================================================
function escapeHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function renderInline(s) {
  s = s.replace(/`([^`]+)`/g, (_, c) => `<code>${escapeHtml(c)}</code>`);
  s = s.replace(/\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]/g, (_, t, d) => {
    const target = t.trim().split('/').pop().toLowerCase();
    const display = (d || t.trim()).trim();
    const exists = pages[target] !== undefined;
    return `<a href="#${target}" class="wikilink${exists ? '' : ' unresolved'}" data-slug="${target}">${escapeHtml(display)}</a>`;
  });
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) => `<a href="${escapeHtml(u)}" target="_blank" rel="noopener">${escapeHtml(t)}</a>`);
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  return s;
}
function renderMarkdown(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (/^```/.test(line)) {
      const buf = []; i++;
      while (i < lines.length && !/^```/.test(lines[i])) { buf.push(lines[i]); i++; }
      i++;
      out.push(`<pre><code>${escapeHtml(buf.join('\n'))}</code></pre>`);
      continue;
    }
    const hm = line.match(/^(#{1,6})\s+(.*)$/);
    if (hm) {
      const lvl = hm[1].length;
      const id = hm[2].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g,'');
      out.push(`<h${lvl} id="${id}">${renderInline(escapeHtml(hm[2]))}</h${lvl}>`);
      i++; continue;
    }
    if (/^---+\s*$/.test(line)) { out.push('<hr/>'); i++; continue; }
    if (/^>\s?/.test(line)) {
      const buf = []; let callout = '';
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        let l = lines[i].replace(/^>\s?/, '');
        const cm = l.match(/^\[!(\w+)\]\s*(.*)$/);
        if (cm) { callout = cm[1].toLowerCase(); l = cm[2]; }
        buf.push(l); i++;
      }
      const inner = buf.map(b => b.trim() === '' ? '' : renderInline(escapeHtml(b))).join('<br/>');
      out.push(`<blockquote${callout ? ` class="callout-${callout}"` : ''}>${inner}</blockquote>`);
      continue;
    }
    if (/^\|.*\|\s*$/.test(line) && i+1 < lines.length && /^\|[\s:\-|]+\|\s*$/.test(lines[i+1])) {
      const header = line.trim().slice(1,-1).split('|').map(s => s.trim());
      i += 2;
      const rows = [];
      while (i < lines.length && /^\|.*\|\s*$/.test(lines[i])) {
        rows.push(lines[i].trim().slice(1,-1).split('|').map(s => s.trim())); i++;
      }
      const thead = '<thead><tr>' + header.map(h => `<th>${renderInline(escapeHtml(h))}</th>`).join('') + '</tr></thead>';
      const tbody = '<tbody>' + rows.map(r => '<tr>' + r.map(c => `<td>${renderInline(escapeHtml(c))}</td>`).join('') + '</tr>').join('') + '</tbody>';
      out.push(`<table>${thead}${tbody}</table>`);
      continue;
    }
    if (/^(\s*)([-*+]|\d+\.)\s+/.test(line)) {
      const ordered = /^\s*\d+\./.test(line);
      const buf = [];
      while (i < lines.length && /^(\s*)([-*+]|\d+\.)\s+/.test(lines[i])) {
        buf.push(lines[i].replace(/^(\s*)([-*+]|\d+\.)\s+/, '')); i++;
      }
      const tag = ordered ? 'ol' : 'ul';
      out.push(`<${tag}>` + buf.map(b => `<li>${renderInline(escapeHtml(b))}</li>`).join('') + `</${tag}>`);
      continue;
    }
    if (line.trim() === '') { i++; continue; }
    const buf = [line]; i++;
    while (i < lines.length && lines[i].trim() !== '' && !/^(#{1,6}\s|>\s|```|\|.*\|\s*$|---+\s*$|(\s*)([-*+]|\d+\.)\s+)/.test(lines[i])) {
      buf.push(lines[i]); i++;
    }
    out.push(`<p>${renderInline(escapeHtml(buf.join(' ')))}</p>`);
  }
  return out.join('\n');
}

// ============================================================
// TREE
// ============================================================
const FOLDER_ICON_SETS = {
  default:   { roles:'◆', concepts:'◇', entities:'●', processes:'⟳', _root:'★', glossary:'A',  sources:'🔒', onboarding:'→', departments:'▣', analyses:'≡' },
  minimal:   { roles:'─', concepts:'·', entities:'∙', processes:'→', _root:'☆', glossary:'a',  sources:'🔒', onboarding:'›', departments:'▢', analyses:'⋯' },
  bold:      { roles:'■', concepts:'▪', entities:'●', processes:'➤', _root:'★', glossary:'A',  sources:'⬛', onboarding:'➔', departments:'▶', analyses:'≡' },
  glyph:     { roles:'◉', concepts:'◎', entities:'●', processes:'⟳', _root:'✦', glossary:'Aa', sources:'◈', onboarding:'→', departments:'◧', analyses:'≡' },
  editorial: { roles:'§', concepts:'¶', entities:'●', processes:'↺', _root:'✱', glossary:'Aa', sources:'⎘', onboarding:'→', departments:'❐', analyses:'⋯' },
};
const THEME_SIDEBAR = {
  obsidian:       { icons: 'default',   style: 'classic' },
  'apple-dark':   { icons: 'default',   style: 'classic' },
  'apple-light':  { icons: 'minimal',   style: 'pill' },
  vercel:         { icons: 'minimal',   style: 'flat' },
  stripe:         { icons: 'editorial', style: 'pill' },
  linear:         { icons: 'glyph',     style: 'neon' },
  notion:         { icons: 'editorial', style: 'pill' },
  tesla:          { icons: 'bold',      style: 'tracked' },
  spotify:        { icons: 'glyph',     style: 'neon' },
  supabase:       { icons: 'glyph',     style: 'neon' },
  claude:         { icons: 'editorial', style: 'pill' },
  figma:          { icons: 'glyph',     style: 'neon' },
  cursor:         { icons: 'glyph',     style: 'neon' },
  raycast:        { icons: 'glyph',     style: 'neon' },
  nvidia:         { icons: 'bold',      style: 'tracked' },
  mintlify:       { icons: 'minimal',   style: 'pill' },
  ferrari:        { icons: 'bold',      style: 'tracked' },
  lamborghini:    { icons: 'bold',      style: 'tracked' },
  spacex:         { icons: 'bold',      style: 'tracked' },
};
let FOLDER_ICONS = { ...FOLDER_ICON_SETS.default };
function folderIcon(folder, unlocked) {
  if (folder === 'sources' && unlocked) return '🔓';
  return FOLDER_ICONS[folder] || '○';
}

function buildTree() {
  const wrap = document.getElementById('tree');
  wrap.innerHTML = '';
  DATA.tree.forEach(group => {
    const div = document.createElement('div');
    div.className = 'folder';
    div.dataset.folder = group.folder;
    const label = DATA.folderLabels[group.folder] || group.folder;

    if (group.locked && !sourcesUnlocked()) {
      div.classList.add('locked', 'collapsed');
      div.innerHTML = `
        <div class="head">
          <span class="icon">${folderIcon(group.folder, false)}</span>
          ${escapeHtml(label)}
          <span class="count">${group.lockedCount}</span>
          <span class="lock-ico" title="Locked">🔒</span>
        </div>
        <ul><li class="empty-locked" style="padding-left:14px;color:var(--fg-muted);font-size:12px;font-style:italic;cursor:default;">Click the folder header to unlock.</li></ul>
      `;
      div.querySelector('.head').addEventListener('click', () => openUnlock());
      wrap.appendChild(div);
      return;
    }

    const items = group.locked
      ? (UNLOCKED_SOURCES.tree || [])
      : group.pages;
    div.innerHTML = `
      <div class="head">
        <span class="icon">${folderIcon(group.folder, group.locked)}</span>
        ${escapeHtml(label)}
        <span class="chev">▾</span>
        <span class="count">${items.length}</span>
      </div>
      <ul>${items.map(p => `<li data-slug="${p.slug}" data-type="${p.type}"><span class="dot"></span>${escapeHtml(p.title)}</li>`).join('')}</ul>
    `;
    div.querySelector('.head').addEventListener('click', () => div.classList.toggle('collapsed'));
    div.querySelectorAll('li[data-slug]').forEach(li => li.addEventListener('click', () => navigate(li.dataset.slug)));
    wrap.appendChild(div);
  });
  const keepOpen = ['roles','concepts','entities','processes','_root'];
  document.querySelectorAll('.folder').forEach(f => {
    if (!keepOpen.includes(f.dataset.folder)) f.classList.add('collapsed');
  });
}

// ============================================================
// NAVIGATE + RENDER
// ============================================================
function navigate(slug, push = true) {
  if (!pages[slug]) slug = pages['overview'] ? 'overview' : Object.keys(pages)[0];
  if (push && state.current && state.current !== slug) {
    state.history.push(state.current);
    state.forward = [];
  }
  state.current = slug;
  location.hash = slug;
  render();
}

function render() {
  const p = pages[state.current];
  if (!p) return;

  document.getElementById('crumb').textContent = (DATA.folderLabels[p.folder] || p.folder) + ' › ' + p.title;
  const titleEl = document.getElementById('title');
  titleEl.classList.remove('changing'); void titleEl.offsetWidth;
  titleEl.classList.add('changing');
  scrambleText(titleEl, p.title);

  const chips = [`<span class="chip type">${escapeHtml(p.type)}</span>`];
  if (p.sources) chips.push(`<span class="chip meta">sources: ${escapeHtml(String(p.sources))}</span>`);
  if (p.updated) chips.push(`<span class="chip meta">updated ${escapeHtml(p.updated)}</span>`);
  (p.tags || []).forEach(t => chips.push(`<span class="chip" data-tag="${escapeHtml(t)}">#${escapeHtml(t)}</span>`));
  document.getElementById('chips').innerHTML = chips.join('');
  document.querySelectorAll('#chips .chip[data-tag]').forEach(c => c.addEventListener('click', () => filterByTag(c.dataset.tag)));

  const content = document.getElementById('content');
  content.classList.remove('fade-in'); void content.offsetWidth;
  content.classList.add('fade-in');
  content.innerHTML = renderMarkdown(p.body);
  content.querySelectorAll('a.wikilink').forEach(a => a.addEventListener('click', e => { e.preventDefault(); navigate(a.dataset.slug); }));

  const toc = content.querySelectorAll('h2, h3');
  const tocEl = document.getElementById('toc');
  if (toc.length === 0) tocEl.innerHTML = '<li class="empty">No sections</li>';
  else tocEl.innerHTML = Array.from(toc).map(h =>
    `<li data-id="${h.id}" style="padding-left:${h.tagName === 'H3' ? '16' : '6'}px">${escapeHtml(h.textContent)}</li>`
  ).join('');
  tocEl.querySelectorAll('li[data-id]').forEach(li => li.addEventListener('click', () => {
    const t = document.getElementById(li.dataset.id);
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));

  const bl = document.getElementById('backlinks');
  if (!p.backlinks || p.backlinks.length === 0) bl.innerHTML = '<li class="empty">No backlinks</li>';
  else bl.innerHTML = p.backlinks.sort().map(s => {
    const bp = pages[s]; return bp ? `<li data-slug="${s}">${escapeHtml(bp.title)}<span class="sub">${escapeHtml(bp.type)}</span></li>` : '';
  }).join('');
  bl.querySelectorAll('li[data-slug]').forEach(li => li.addEventListener('click', () => navigate(li.dataset.slug)));

  const og = document.getElementById('outgoing');
  const uniqOut = Array.from(new Set(p.outgoing || []));
  if (uniqOut.length === 0) og.innerHTML = '<li class="empty">No outgoing links</li>';
  else og.innerHTML = uniqOut.map(s => {
    const op = pages[s];
    if (op) return `<li data-slug="${s}">${escapeHtml(op.title)}<span class="sub">${escapeHtml(op.type)}</span></li>`;
    return `<li class="empty">${escapeHtml(s)} (unresolved)</li>`;
  }).join('');
  og.querySelectorAll('li[data-slug]').forEach(li => li.addEventListener('click', () => navigate(li.dataset.slug)));

  const pt = document.getElementById('page-tags');
  pt.innerHTML = (p.tags || []).map(t => `<span class="chip" data-tag="${escapeHtml(t)}">#${escapeHtml(t)}</span>`).join('') || '<span class="empty">No tags</span>';
  pt.querySelectorAll('.chip[data-tag]').forEach(c => c.addEventListener('click', () => filterByTag(c.dataset.tag)));

  document.querySelectorAll('.folder li').forEach(li => li.classList.toggle('active', li.dataset.slug === p.slug));
  if (state.showGraph) updateGraphHighlight();
  document.getElementById('main').scrollTop = 0;
}

function scrambleText(el, final) {
  const chars = '!<>-_\\/[]{}—=+*^?#_TABRAIN';
  let frame = 0;
  const steps = 10;
  const len = final.length;
  function tick() {
    frame++;
    let out = '';
    for (let i = 0; i < len; i++) {
      const progress = frame - i * 0.4;
      if (progress < 0) out += ' ';
      else if (progress >= steps) out += final[i];
      else out += chars[Math.floor(Math.random() * chars.length)];
    }
    el.textContent = out;
    if (frame < steps + len * 0.4) requestAnimationFrame(tick);
    else el.textContent = final;
  }
  tick();
}

// ============================================================
// SEARCH (with live dropdown)
// ============================================================
const searchEl = document.getElementById('search');
const resultsEl = document.getElementById('search-results');
let searchHl = -1;
let lastResults = [];

function runSearch(q) {
  q = q.trim().toLowerCase();
  if (!q) {
    resultsEl.classList.remove('show');
    resultsEl.innerHTML = '';
    // restore tree
    document.querySelectorAll('.folder li').forEach(li => li.style.display = '');
    document.querySelectorAll('.folder').forEach(f => f.style.display = '');
    return;
  }
  // Score pages
  const results = [];
  Object.values(pages).forEach(p => {
    const title = p.title.toLowerCase();
    const tags = (p.tags||[]).join(' ').toLowerCase();
    const body = (p.body||'').toLowerCase();
    let score = 0;
    if (title.includes(q)) score += title.startsWith(q) ? 100 : 60;
    if (tags.includes(q)) score += 40;
    if (p.type.includes(q)) score += 20;
    if (body.includes(q)) score += 10;
    if (score > 0) {
      // snippet
      let snippet = '';
      const idx = body.indexOf(q);
      if (idx >= 0) {
        const start = Math.max(0, idx - 40);
        const end = Math.min(body.length, idx + q.length + 60);
        snippet = (start > 0 ? '…' : '') + p.body.slice(start, end).replace(/\s+/g, ' ') + (end < body.length ? '…' : '');
      } else if ((p.tags||[]).some(t => t.toLowerCase().includes(q))) {
        snippet = '#' + (p.tags||[]).filter(t => t.toLowerCase().includes(q)).join(' #');
      }
      results.push({ page: p, score, snippet });
    }
  });
  results.sort((a, b) => b.score - a.score);
  lastResults = results.slice(0, 40);
  if (lastResults.length === 0) {
    resultsEl.innerHTML = '<div class="empty">No matches</div>';
  } else {
    resultsEl.innerHTML = lastResults.map((r, idx) => {
      const p = r.page;
      const snipHtml = r.snippet
        ? escapeHtml(r.snippet).replace(new RegExp('(' + escapeRegex(q) + ')', 'ig'), '<mark>$1</mark>')
        : '';
      return `<div class="result${idx === searchHl ? ' hl' : ''}" data-slug="${p.slug}">
        <div class="t"><span class="tag">${escapeHtml(p.type)}</span>${escapeHtml(p.title)}</div>
        ${snipHtml ? `<div class="s">${snipHtml}</div>` : ''}
      </div>`;
    }).join('');
    resultsEl.querySelectorAll('.result').forEach(r =>
      r.addEventListener('click', () => { navigate(r.dataset.slug); searchEl.value = ''; runSearch(''); searchEl.blur(); })
    );
  }
  resultsEl.classList.add('show');

  // Also filter tree
  document.querySelectorAll('.folder').forEach(f => {
    let any = false;
    f.querySelectorAll('li').forEach(li => {
      const p = pages[li.dataset.slug]; if (!p) return;
      const hay = [p.title, p.type, (p.tags||[]).join(' ')].join(' ').toLowerCase();
      const match = hay.includes(q);
      li.style.display = match ? '' : 'none';
      if (match) any = true;
    });
    f.style.display = any ? '' : 'none';
  });
}

function escapeRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

searchEl.addEventListener('input', () => { searchHl = -1; runSearch(searchEl.value); });
searchEl.addEventListener('keydown', e => {
  if (!resultsEl.classList.contains('show')) return;
  if (e.key === 'ArrowDown') { e.preventDefault(); searchHl = Math.min(searchHl + 1, lastResults.length - 1); runSearch(searchEl.value); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); searchHl = Math.max(searchHl - 1, 0); runSearch(searchEl.value); }
  else if (e.key === 'Enter') {
    e.preventDefault();
    const pick = lastResults[searchHl >= 0 ? searchHl : 0];
    if (pick) { navigate(pick.page.slug); searchEl.value = ''; runSearch(''); searchEl.blur(); }
  } else if (e.key === 'Escape') { searchEl.value = ''; runSearch(''); searchEl.blur(); }
});
document.addEventListener('click', e => {
  if (!e.target.closest('.search') && !e.target.closest('.search-results')) {
    resultsEl.classList.remove('show');
  }
});
function filterByTag(tag) { searchEl.value = tag; searchEl.focus(); runSearch(tag); }

// ============================================================
// GRAPH (force-directed + zoom/pan/drag)
// ============================================================
const svgNS = 'http://www.w3.org/2000/svg';
let graphState = null;
let graphDrag = null;
let graphFocusId = null;
let graphActiveTypes = null; // null = all active

const sim = { alpha: 0, alphaMin: 0.005, alphaDecay: 0.012, running: false, raf: 0 };
const view = { x: 0, y: 0, k: 1 };

function applyViewport() {
  const g = document.getElementById('graph-viewport');
  g.setAttribute('transform', `translate(${view.x},${view.y}) scale(${view.k})`);
  if (graphState) updateLabelVisibility();
  // pan/zoom invalidates tooltip screen position — hide it
  if (_ttCurrentId) hideTooltip(true);
}

function wakeSim(a) {
  sim.alpha = Math.max(sim.alpha, a == null ? 0.5 : a);
  if (!sim.running) { sim.running = true; sim.raf = requestAnimationFrame(simTick); }
}

function simTick() {
  if (!graphState || !sim.running) { sim.running = false; return; }
  stepPhysics(graphState, sim.alpha);
  renderPositions(graphState);
  sim.alpha *= (1 - sim.alphaDecay);
  if (sim.alpha < sim.alphaMin && !graphDrag) { sim.alpha = 0; sim.running = false; return; }
  sim.raf = requestAnimationFrame(simTick);
}

function buildGraphData(local, focus) {
  let slugs;
  if (local && focus) {
    const neigh = new Set([focus]);
    (pages[focus].outgoing || []).forEach(s => pages[s] && neigh.add(s));
    (pages[focus].backlinks || []).forEach(s => neigh.add(s));
    slugs = Array.from(neigh);
  } else slugs = Object.keys(pages);
  const nodes = slugs.map(s => {
    const p = pages[s];
    const degree = (p.backlinks?.length || 0) + (p.outgoing?.length || 0);
    return {
      id: s, title: p.title, type: p.type,
      r: Math.max(5, Math.min(18, 5 + Math.sqrt(degree) * 1.9)),
      degree,
      x: 0, y: 0, vx: 0, vy: 0,
      fx: null, fy: null, // null = not pinned
    };
  });
  const idx = Object.fromEntries(nodes.map((n,i) => [n.id, i]));
  const links = [];
  slugs.forEach(s => (pages[s].outgoing || []).forEach(t => {
    if (idx[t] !== undefined && s !== t) links.push({ source: idx[s], target: idx[t] });
  }));
  // curvature: multiple links between the same pair fan out; single links stay straight
  const pairKey = (a,b) => a < b ? a+'|'+b : b+'|'+a;
  const pairTotal = {};
  links.forEach(l => { const k = pairKey(l.source, l.target); pairTotal[k] = (pairTotal[k]||0)+1; });
  const pairSeen = {};
  links.forEach(l => {
    const k = pairKey(l.source, l.target);
    const n = pairSeen[k] = (pairSeen[k]||0)+1;
    l.curv = pairTotal[k] > 1 ? (n - (pairTotal[k]+1)/2) * 14 : 0;
  });
  // adjacency for hover highlight
  const adj = new Map(nodes.map(n => [n.id, new Set()]));
  links.forEach(l => {
    adj.get(nodes[l.source].id).add(nodes[l.target].id);
    adj.get(nodes[l.target].id).add(nodes[l.source].id);
  });
  // type anchor positions on a ring — used for both seeding and clustering force
  const types = Array.from(new Set(nodes.map(n => n.type)));
  const R = types.length > 1 ? 280 : 0;
  const typeCenter = {};
  types.forEach((t, i) => {
    const ang = (i / types.length) * Math.PI * 2 - Math.PI/2;
    typeCenter[t] = { x: Math.cos(ang)*R, y: Math.sin(ang)*R };
  });
  return { nodes, links, idx, adj, typeCenter, types };
}

function seedByType(g) {
  const groups = {};
  g.nodes.forEach(n => (groups[n.type] ||= []).push(n));
  Object.entries(groups).forEach(([t, arr]) => {
    const c = g.typeCenter[t] || { x: 0, y: 0 };
    const r = Math.max(30, Math.sqrt(arr.length) * 22);
    arr.forEach((n, j) => {
      const ang = (j / arr.length) * Math.PI * 2;
      n.x = c.x + Math.cos(ang) * r + (Math.random()-0.5)*6;
      n.y = c.y + Math.sin(ang) * r + (Math.random()-0.5)*6;
      n.vx = 0; n.vy = 0;
    });
  });
}

function stepPhysics(g, alpha) {
  const p = state.physics;
  // in local mode, a bit more breathing room
  const modeMul = state.graphMode === 'local' ? 1.2 : 1.0;
  const LINK_DIST = p.linkDistance * modeMul;
  const LINK_K = p.linkForce;
  const CHARGE = p.repel * modeMul;
  const CLUSTER_K = p.cluster;
  const CENTER_K = p.gravity;
  const COLLISION_K = 0.9;
  const COLLISION_PAD = p.collisionPad;
  const DAMP = p.friction;
  const MAX_V = 28;
  const n = g.nodes;

  // repulsion + collision (single O(n²) sweep)
  for (let i = 0; i < n.length; i++) {
    for (let j = i+1; j < n.length; j++) {
      const a = n[i], b = n[j];
      let dx = a.x - b.x, dy = a.y - b.y;
      let d2 = dx*dx + dy*dy;
      const minD = a.r + b.r + COLLISION_PAD;
      const minD2 = minD * minD;
      if (d2 < 0.01) { dx = (Math.random()-0.5)*0.1; dy = (Math.random()-0.5)*0.1; d2 = dx*dx+dy*dy+0.01; }
      const d = Math.sqrt(d2);
      // inverse-square repulsion
      const fRep = CHARGE / Math.max(d2, 9);
      // hard-ish collision: if overlapping, add linear spring push
      const fCol = d < minD ? (minD - d) * COLLISION_K : 0;
      const f = fRep + fCol;
      const fx = (dx/d) * f, fy = (dy/d) * f;
      a.vx += fx * alpha; a.vy += fy * alpha;
      b.vx -= fx * alpha; b.vy -= fy * alpha;
    }
  }

  // link spring (Hookean toward LINK_DIST)
  for (let k = 0; k < g.links.length; k++) {
    const l = g.links[k];
    const a = n[l.source], b = n[l.target];
    const dx = b.x - a.x, dy = b.y - a.y;
    const d = Math.sqrt(dx*dx + dy*dy) + 0.01;
    const f = (d - LINK_DIST) * LINK_K;
    const fx = (dx/d) * f, fy = (dy/d) * f;
    a.vx += fx * alpha; a.vy += fy * alpha;
    b.vx -= fx * alpha; b.vy -= fy * alpha;
  }

  // type clustering + gentle center
  for (let i = 0; i < n.length; i++) {
    const node = n[i];
    const c = g.typeCenter[node.type];
    if (c) {
      node.vx += (c.x - node.x) * CLUSTER_K * alpha;
      node.vy += (c.y - node.y) * CLUSTER_K * alpha;
    }
    node.vx += (0 - node.x) * CENTER_K * alpha;
    node.vy += (0 - node.y) * CENTER_K * alpha;
  }

  // integrate + damping + pin (fx/fy read INSIDE the step so the sim sees the
  // pinned node at its target; link springs pull neighbors through it)
  for (let i = 0; i < n.length; i++) {
    const node = n[i];
    if (node.fx != null) { node.x = node.fx; node.vx = 0; }
    else {
      node.vx *= DAMP;
      if (node.vx > MAX_V) node.vx = MAX_V; else if (node.vx < -MAX_V) node.vx = -MAX_V;
      node.x += node.vx;
    }
    if (node.fy != null) { node.y = node.fy; node.vy = 0; }
    else {
      node.vy *= DAMP;
      if (node.vy > MAX_V) node.vy = MAX_V; else if (node.vy < -MAX_V) node.vy = -MAX_V;
      node.y += node.vy;
    }
  }
}

function renderPositions(g) {
  const nodeEls = g._nodeEls, linkEls = g._linkEls, labelEls = g._labelEls;
  for (let i = 0; i < g.nodes.length; i++) {
    const n = g.nodes[i];
    nodeEls[i].setAttribute('transform', `translate(${n.x},${n.y})`);
    labelEls[i].setAttribute('x', n.x + n.r + 5);
    labelEls[i].setAttribute('y', n.y + 4);
  }
  for (let i = 0; i < g.links.length; i++) {
    const l = g.links[i];
    const a = g.nodes[l.source], b = g.nodes[l.target];
    if (l.curv === 0) {
      linkEls[i].setAttribute('d', `M${a.x},${a.y} L${b.x},${b.y}`);
    } else {
      const mx = (a.x+b.x)/2, my = (a.y+b.y)/2;
      const dx = b.x-a.x, dy = b.y-a.y, L = Math.hypot(dx,dy) || 1;
      const cx = mx + (-dy/L) * l.curv;
      const cy = my + (dx/L) * l.curv;
      linkEls[i].setAttribute('d', `M${a.x},${a.y} Q${cx},${cy} ${b.x},${b.y}`);
    }
  }
}

function renderGraph() {
  const gLinks = document.getElementById('graph-links');
  const gNodes = document.getElementById('graph-nodes');
  const gLabels = document.getElementById('graph-labels');
  gLinks.innerHTML = ''; gNodes.innerHTML = ''; gLabels.innerHTML = '';

  const g = buildGraphData(state.graphMode === 'local', state.current);
  graphState = g;
  seedByType(g);

  g._linkEls = g.links.map(l => {
    const p = document.createElementNS(svgNS, 'path');
    p.setAttribute('class', 'graph-link');
    p.dataset.s = g.nodes[l.source].id;
    p.dataset.t = g.nodes[l.target].id;
    gLinks.appendChild(p);
    return p;
  });
  g._nodeEls = g.nodes.map(n => {
    const gEl = document.createElementNS(svgNS, 'g');
    gEl.setAttribute('class', 'graph-node');
    gEl.dataset.slug = n.id;
    gEl.dataset.type = n.type;
    const c = document.createElementNS(svgNS, 'circle');
    c.setAttribute('r', n.r);
    c.setAttribute('fill', typeColor[n.type] || '#888');
    gEl.appendChild(c);
    attachNodeInteraction(gEl, n);
    gNodes.appendChild(gEl);
    return gEl;
  });
  g._labelEls = g.nodes.map(n => {
    const t = document.createElementNS(svgNS, 'text');
    t.setAttribute('class', 'graph-label');
    t.dataset.slug = n.id;
    t.textContent = n.title.length > 28 ? n.title.slice(0,26)+'…' : n.title;
    gLabels.appendChild(t);
    return t;
  });

  // degree threshold: top ~14 labels always visible when zoomed out
  const sortedDeg = g.nodes.map(n => n.degree).sort((a,b) => b-a);
  g._degreeThresh = sortedDeg[Math.min(13, sortedDeg.length-1)] || 0;

  graphFocusId = null;
  graphActiveTypes = null;
  renderPositions(g);
  updateLabelVisibility();
  updateGraphHighlight();
  renderLegend();
  wakeSim(1.0);
}

function attachNodeInteraction(el, node) {
  el.addEventListener('pointerdown', e => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    e.stopPropagation();
    try { el.setPointerCapture(e.pointerId); } catch(_) {}
    const pt = svgPoint(e.clientX, e.clientY);
    graphDrag = {
      id: node.id,
      offX: node.x - pt.x, offY: node.y - pt.y,
      moved: false,
      startX: e.clientX, startY: e.clientY,
      pointerId: e.pointerId,
    };
    node.fx = node.x; node.fy = node.y;
    el.classList.add('dragging');
    hideTooltip(true);
    wakeSim(0.9);
  });
  el.addEventListener('pointermove', e => {
    if (!graphDrag || graphDrag.id !== node.id) return;
    const pt = svgPoint(e.clientX, e.clientY);
    node.fx = pt.x + graphDrag.offX;
    node.fy = pt.y + graphDrag.offY;
    const dx = e.clientX - graphDrag.startX, dy = e.clientY - graphDrag.startY;
    if (!graphDrag.moved && (dx*dx + dy*dy) > 9) graphDrag.moved = true;
    wakeSim(0.55);
  });
  const release = e => {
    if (!graphDrag || graphDrag.id !== node.id) return;
    try { el.releasePointerCapture(graphDrag.pointerId); } catch(_) {}
    const wasMoved = graphDrag.moved;
    node.fx = null; node.fy = null;
    graphDrag = null;
    el.classList.remove('dragging');
    if (!wasMoved) { hideTooltip(true); navigate(node.id); toggleGraph(false); }
    else wakeSim(0.35);
  };
  el.addEventListener('pointerup', release);
  el.addEventListener('pointercancel', release);

  el.addEventListener('pointerenter', () => {
    if (!graphDrag) { setGraphFocus(node.id); scheduleTooltip(node, el); }
  });
  el.addEventListener('pointerleave', () => {
    if (!graphDrag) { setGraphFocus(null); scheduleTooltipHide(); }
  });
}

// ---------- Tooltip (dwell-delayed, anchored to node) ----------
const TOOLTIP_SHOW_DELAY = 350;
const TOOLTIP_HIDE_DELAY = 80;
let _ttShowTimer = 0;
let _ttHideTimer = 0;
let _ttCurrentId = null;

function scheduleTooltip(node, el) {
  clearTimeout(_ttHideTimer); _ttHideTimer = 0;
  if (_ttCurrentId === node.id) return; // already showing for this node
  clearTimeout(_ttShowTimer);
  // If a tooltip is already visible (from another node), swap quickly
  const tt = document.getElementById('graph-tooltip');
  const alreadyVisible = tt && tt.classList.contains('show');
  _ttShowTimer = setTimeout(() => {
    showTooltip(node, el);
  }, alreadyVisible ? 0 : TOOLTIP_SHOW_DELAY);
}

function scheduleTooltipHide() {
  clearTimeout(_ttShowTimer); _ttShowTimer = 0;
  clearTimeout(_ttHideTimer);
  _ttHideTimer = setTimeout(() => { hideTooltip(false); }, TOOLTIP_HIDE_DELAY);
}

function showTooltip(node, el) {
  const tt = document.getElementById('graph-tooltip');
  if (!tt || !el) return;
  const wrap = document.getElementById('graph-wrap');
  const wrapRect = wrap.getBoundingClientRect();
  const nodeRect = el.getBoundingClientRect();
  const cx = nodeRect.left + nodeRect.width/2 - wrapRect.left;
  const cy = nodeRect.top - wrapRect.top - 6;  // 6px offset above node

  document.getElementById('gt-title').textContent = node.title || node.id;
  const typeEl = document.getElementById('gt-type');
  typeEl.textContent = node.type || '';
  const col = typeColor[node.type] || 'var(--fg-dim)';
  tt.style.setProperty('--tt-type-color', col);
  const deg = (node.degree != null) ? node.degree : 0;
  document.getElementById('gt-degree').textContent = deg + (deg === 1 ? ' link' : ' links');

  tt.style.left = cx + 'px';
  tt.style.top  = cy + 'px';
  tt.classList.remove('hiding');
  tt.classList.add('show');
  tt.setAttribute('aria-hidden', 'false');
  _ttCurrentId = node.id;
}

function hideTooltip(immediate) {
  clearTimeout(_ttShowTimer); _ttShowTimer = 0;
  clearTimeout(_ttHideTimer); _ttHideTimer = 0;
  const tt = document.getElementById('graph-tooltip');
  if (!tt) return;
  _ttCurrentId = null;
  if (immediate) {
    tt.classList.remove('show', 'hiding');
    tt.setAttribute('aria-hidden', 'true');
  } else {
    tt.classList.add('hiding');
    tt.classList.remove('show');
    tt.setAttribute('aria-hidden', 'true');
  }
}

function setGraphFocus(id) {
  if (graphFocusId === id) return;
  graphFocusId = id;
  updateGraphHighlight();
}

function updateGraphHighlight() {
  if (!graphState) return;
  const g = graphState;
  const activeSlug = state.current;
  const hoverId = graphFocusId;
  const hoverKeep = hoverId ? new Set([hoverId, ...(g.adj.get(hoverId) || [])]) : null;
  const typeFilter = graphActiveTypes;
  for (let i = 0; i < g._nodeEls.length; i++) {
    const el = g._nodeEls[i], n = g.nodes[i];
    const typeOff = typeFilter && !typeFilter.has(n.type);
    const hoverOff = hoverKeep && !hoverKeep.has(n.id);
    el.classList.toggle('active', n.id === activeSlug);
    el.classList.toggle('focused', n.id === hoverId);
    el.classList.toggle('dim', !!(typeOff || hoverOff));
  }
  for (let i = 0; i < g._linkEls.length; i++) {
    const el = g._linkEls[i], l = g.links[i];
    const sNode = g.nodes[l.source], tNode = g.nodes[l.target];
    const sId = sNode.id, tId = tNode.id;
    const typeOff = typeFilter && (!typeFilter.has(sNode.type) || !typeFilter.has(tNode.type));
    const onHover = hoverId && (sId === hoverId || tId === hoverId);
    const onActive = sId === activeSlug || tId === activeSlug;
    el.classList.toggle('focused', !!onHover);
    el.classList.toggle('highlight', !hoverId && !!onActive);
    el.classList.toggle('dim', !!(typeOff || (hoverId && !onHover)));
  }
  updateLabelVisibility();
}

function updateLabelVisibility() {
  if (!graphState) return;
  const g = graphState;
  const z = view.k;
  const hoverId = graphFocusId;
  const hoverKeep = hoverId ? new Set([hoverId, ...(g.adj.get(hoverId) || [])]) : null;
  const thresh = g._degreeThresh || 0;
  const typeFilter = graphActiveTypes;
  for (let i = 0; i < g._labelEls.length; i++) {
    const el = g._labelEls[i], n = g.nodes[i];
    const typeOff = typeFilter && !typeFilter.has(n.type);
    const byZoom = z > 1.15;
    const byDegree = n.degree >= thresh;
    const byHover = hoverKeep ? hoverKeep.has(n.id) : false;
    const byActive = n.id === state.current;
    const show = !typeOff && (byZoom || byDegree || byHover || byActive);
    el.classList.toggle('hidden', !show);
    el.classList.toggle('dim', !!(hoverKeep && !byHover));
    el.classList.toggle('strong', n.id === state.current || n.id === hoverId);
  }
}

function renderLegend() {
  const counts = {};
  Object.values(pages).forEach(p => counts[p.type] = (counts[p.type]||0)+1);
  const legend = document.getElementById('graph-legend');
  const typesPresent = Object.keys(typeColor).filter(t => counts[t]);
  legend.innerHTML = typesPresent.map(t => {
    const on = !graphActiveTypes || graphActiveTypes.has(t);
    return `<div class="row${on?'':' off'}" data-type="${t}" title="Click to toggle, shift+click to isolate"><span class="swatch" style="background:${typeColor[t]}"></span>${t} (${counts[t]})</div>`;
  }).join('');
  legend.querySelectorAll('.row').forEach(row => {
    row.addEventListener('click', e => {
      const t = row.dataset.type;
      if (!graphActiveTypes) graphActiveTypes = new Set(typesPresent);
      if (e.shiftKey) graphActiveTypes = new Set([t]);
      else if (graphActiveTypes.has(t)) graphActiveTypes.delete(t);
      else graphActiveTypes.add(t);
      if (graphActiveTypes.size === 0 || graphActiveTypes.size === typesPresent.length) graphActiveTypes = null;
      renderLegend();
      updateGraphHighlight();
      wakeSim(0.3);
    });
  });
}

function svgPoint(cx, cy) {
  const svg = document.getElementById('graph-svg');
  const rect = svg.getBoundingClientRect();
  const x = (cx - rect.left - view.x) / view.k;
  const y = (cy - rect.top - view.y) / view.k;
  return { x, y };
}

function setupGraphPanZoom() {
  const svg = document.getElementById('graph-svg');
  let panning = false, startX = 0, startY = 0, startVX = 0, startVY = 0, panPointerId = null;
  svg.addEventListener('pointerdown', e => {
    if (e.target.closest('.graph-node')) return;
    panning = true; svg.classList.add('panning');
    startX = e.clientX; startY = e.clientY;
    startVX = view.x; startVY = view.y;
    panPointerId = e.pointerId;
    try { svg.setPointerCapture(e.pointerId); } catch(_){}
    setGraphFocus(null);
  });
  svg.addEventListener('pointermove', e => {
    if (!panning) return;
    view.x = startVX + (e.clientX - startX);
    view.y = startVY + (e.clientY - startY);
    applyViewport();
  });
  const endPan = e => {
    if (!panning) return;
    panning = false; svg.classList.remove('panning');
    try { svg.releasePointerCapture(panPointerId); } catch(_){}
    panPointerId = null;
  };
  svg.addEventListener('pointerup', endPan);
  svg.addEventListener('pointercancel', endPan);
  svg.addEventListener('wheel', e => {
    e.preventDefault();
    const rect = svg.getBoundingClientRect();
    const cx = e.clientX - rect.left, cy = e.clientY - rect.top;
    const delta = -Math.sign(e.deltaY) * 0.14;
    const k2 = Math.max(0.25, Math.min(4, view.k * (1 + delta)));
    view.x = cx - (cx - view.x) * (k2 / view.k);
    view.y = cy - (cy - view.y) * (k2 / view.k);
    view.k = k2;
    applyViewport();
  }, { passive: false });
}

function resetView() {
  const svg = document.getElementById('graph-svg');
  const W = svg.clientWidth || 1000, H = svg.clientHeight || 700;
  view.x = W/2; view.y = H/2; view.k = 1;
  applyViewport();
}

function toggleGraph(show) {
  state.showGraph = show === undefined ? !state.showGraph : show;
  document.getElementById('graph-wrap').classList.toggle('show', state.showGraph);
  document.getElementById('btn-graph').classList.toggle('active', state.showGraph);
  if (state.showGraph) setTimeout(() => { resetView(); renderGraph(); }, 60);
  else { sim.running = false; sim.alpha = 0; hideTooltip(true); }
}


// ============================================================
// MODALS (settings + help + unlock)
// ============================================================
function openModal(id) { document.getElementById(id).classList.add('show'); }
function closeModal(id) { document.getElementById(id).classList.remove('show'); }

// ============================================================
// SOURCES UNLOCK — PBKDF2 + SHA-256 counter keystream
// ============================================================
function b64toBytes(b64) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function decryptSources(password) {
  if (!ENCRYPTED) return null;
  const salt = b64toBytes(ENCRYPTED.salt);
  const ciphertext = b64toBytes(ENCRYPTED.ciphertext);
  const iterations = ENCRYPTED.iterations;

  const baseKey = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(password),
    'PBKDF2', false, ['deriveBits']
  );
  const masterBits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    baseKey, 512
  );
  const master = new Uint8Array(masterBits); // 64 bytes

  // Expand keystream: SHA-256(master || counter_be32)
  const keystream = new Uint8Array(ciphertext.length);
  let offset = 0, counter = 0;
  const block = new Uint8Array(master.length + 4);
  block.set(master, 0);
  const view = new DataView(block.buffer);
  while (offset < ciphertext.length) {
    view.setUint32(master.length, counter, false);
    const h = new Uint8Array(await crypto.subtle.digest('SHA-256', block));
    const n = Math.min(h.length, ciphertext.length - offset);
    keystream.set(h.subarray(0, n), offset);
    offset += n;
    counter++;
  }

  const plaintext = new Uint8Array(ciphertext.length);
  for (let i = 0; i < ciphertext.length; i++) plaintext[i] = ciphertext[i] ^ keystream[i];
  const text = new TextDecoder().decode(plaintext);
  try {
    const obj = JSON.parse(text);
    if (obj.magic !== 'TABRAIN-V1') return null;
    return obj.pages;
  } catch { return null; }
}

function mergeUnlockedPages(unlocked) {
  // Merge into `pages` registry + rebuild backlinks for affected pages.
  Object.entries(unlocked).forEach(([slug, p]) => { pages[slug] = p; });
  // Recompute backlinks: for each unlocked page's outgoing, ensure target has backlink back; also check if any public page links to a newly-added slug (backlinks to unlocked).
  Object.entries(pages).forEach(([slug, p]) => {
    (p.outgoing || []).forEach(t => {
      if (pages[t] && !pages[t].backlinks.includes(slug) && slug !== t) {
        pages[t].backlinks = pages[t].backlinks || [];
        pages[t].backlinks.push(slug);
      }
    });
  });

  // Build tree entries for the locked folders now that we have the pages.
  const byFolder = {};
  Object.values(unlocked).forEach(p => {
    (byFolder[p.folder] = byFolder[p.folder] || []).push({ slug: p.slug, title: p.title, type: p.type });
  });
  UNLOCKED_SOURCES.tree = Object.values(byFolder).flat().sort((a,b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
  // Update tree group
  DATA.tree.forEach(g => {
    if (g.locked) {
      g.pages = (byFolder[g.folder] || []).slice().sort((a,b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
      g.locked = false; // keep rendering as a normal folder
    }
  });
}

async function tryUnlock(password) {
  const cached = sessionStorage.getItem('tabrain.sessionKey');
  const pages2 = await decryptSources(password);
  if (!pages2) return false;
  mergeUnlockedPages(pages2);
  sessionStorage.setItem('tabrain.sessionKey', password);
  buildTree();
  render();
  if (state.showGraph) renderGraph();
  return true;
}

function openUnlock() {
  if (!ENCRYPTED) return;
  const inp = document.getElementById('unlock-input');
  const err = document.getElementById('unlock-err');
  inp.value = ''; err.style.display = 'none';
  openModal('unlock-backdrop');
  setTimeout(() => inp.focus(), 50);
}

document.getElementById('unlock-close').addEventListener('click', () => closeModal('unlock-backdrop'));
document.getElementById('unlock-cancel').addEventListener('click', () => closeModal('unlock-backdrop'));
document.getElementById('unlock-submit').addEventListener('click', async () => {
  const inp = document.getElementById('unlock-input');
  const err = document.getElementById('unlock-err');
  const btn = document.getElementById('unlock-submit');
  btn.textContent = 'Unlocking…'; btn.disabled = true;
  const ok = await tryUnlock(inp.value);
  btn.textContent = 'Unlock'; btn.disabled = false;
  if (ok) closeModal('unlock-backdrop');
  else { err.textContent = 'Wrong password.'; err.style.display = 'block'; inp.select(); }
});
document.getElementById('unlock-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('unlock-submit').click();
});

// Auto-unlock if we cached a session key (same tab, already unlocked once)
async function maybeAutoUnlock() {
  if (!ENCRYPTED) return;
  const cached = sessionStorage.getItem('tabrain.sessionKey');
  if (cached) {
    const ok = await tryUnlock(cached);
    if (!ok) sessionStorage.removeItem('tabrain.sessionKey');
  }
}

const HELP_SECTIONS = [
  {
    id: 'overview',
    title: 'Overview',
    html: `
      <h2>What this is</h2>
      <p>This is a browser-based wiki built from the markdown files in your <code>wiki/</code> folder. It reads your frontmatter and your <code>[[wiki-links]]</code> and turns them into a navigable, searchable knowledge base with a relationship graph.</p>
      <div class="help-tiles">
        <div class="help-tile"><div class="n">Three panes</div><div class="d">Left = file tree. Middle = the page. Right = backlinks, outgoing links, tags, table of contents.</div></div>
        <div class="help-tile"><div class="n">Live search</div><div class="d">Top-left box searches titles, tags, and body content with a dropdown of scored results.</div></div>
        <div class="help-tile"><div class="n">Graph view</div><div class="d">Visualize every page and every link. Global or local (just the current page's neighborhood).</div></div>
        <div class="help-tile"><div class="n">Themes</div><div class="d">Switch the entire look via <strong>⚙ Settings</strong>. Add your own by dropping JSON files in <code>themes/</code>.</div></div>
      </div>
      <h2>How to rebuild</h2>
      <p>The wiki is a static HTML file regenerated from your markdown. After you add or edit pages in <code>wiki/</code>, run:</p>
      <pre><code>python build-wiki.py</code></pre>
      <p>Reload this page and your changes appear. No server required — the file works offline.</p>
    `,
  },
  {
    id: 'navigation',
    title: 'Navigation',
    html: `
      <h2>Getting around</h2>
      <ul>
        <li><strong>Click any item</strong> in the left tree to open that page.</li>
        <li><strong>Click any <code>[[wiki-link]]</code></strong> inside a page to jump. Red dashed links are unresolved (target doesn't exist yet).</li>
        <li><strong>Click a backlink</strong> in the right panel to jump to a page that references the current one.</li>
        <li><strong>On this page</strong> (right panel) shows the section outline — click to scroll.</li>
        <li><strong>Tags</strong> anywhere are clickable — they trigger a search for that tag.</li>
      </ul>
      <h2>History</h2>
      <p>Use the <kbd>◀</kbd> and <kbd>▶</kbd> buttons on the floating dock to step backward and forward through pages you've visited.</p>
      <h2>URLs</h2>
      <p>The address bar updates with <code>#slug</code> — bookmark or share any page directly.</p>
    `,
  },
  {
    id: 'search',
    title: 'Search',
    html: `
      <h2>Finding things fast</h2>
      <p>Press <kbd>/</kbd> (or click the search box) to focus. Start typing:</p>
      <ul>
        <li>Matches in <strong>titles</strong> rank highest, especially prefix matches.</li>
        <li>Matches in <strong>tags</strong> rank next.</li>
        <li>Matches in <strong>body content</strong> come last, with a highlighted snippet.</li>
      </ul>
      <h2>Keyboard</h2>
      <ul>
        <li><kbd>↓</kbd> / <kbd>↑</kbd> — move through results</li>
        <li><kbd>Enter</kbd> — open the highlighted (or first) result</li>
        <li><kbd>Esc</kbd> — clear and close</li>
      </ul>
      <p>The tree on the left also filters as you type so you can see matches in context.</p>
    `,
  },
  {
    id: 'graph',
    title: 'Graph View',
    html: `
      <h2>The relationship graph</h2>
      <p>Press <kbd>G</kbd> or click <strong>Graph</strong>. Every node is a page; every edge is a <code>[[wiki-link]]</code>. Node size scales with how connected the page is. Color indicates type (see the legend).</p>
      <h2>Modes</h2>
      <ul>
        <li><strong>Global</strong> — the entire wiki in one view. Good for spotting hubs and outliers.</li>
        <li><strong>Local</strong> — just the current page and its direct neighbors. Good for understanding one page's context.</li>
      </ul>
      <h2>Controls</h2>
      <ul>
        <li><strong>Scroll / pinch</strong> to zoom in and out (zooms toward your cursor).</li>
        <li><strong>Drag the background</strong> to pan.</li>
        <li><strong>Drag a node</strong> to reposition it — the physics pushes neighbors out of the way. The node stays pinned where you drop it.</li>
        <li><strong>Click a node</strong> to navigate to that page.</li>
        <li><strong>Reset view</strong> recenters and unzooms.</li>
        <li><strong>Close</strong> or press <kbd>Esc</kbd> to return to the page view.</li>
      </ul>
    `,
  },
  {
    id: 'themes',
    title: 'Themes',
    html: `
      <h2>Switching appearance</h2>
      <p>Click <strong>⚙ Settings</strong> (top right). You get a grid of available themes with a swatch strip previewing colors. Click any card to apply — your choice is saved in local storage and restored on next visit.</p>
      <h2>Built-in themes</h2>
      <ul>
        <li><strong>Obsidian Dark</strong> — the default; charcoal with purple accents.</li>
        <li><strong>Apple Dark</strong> — pure black canvas, SF Pro typography, Apple Blue accent.</li>
        <li><strong>Apple Light</strong> — <code>#f5f5f7</code> canvas, near-black text; editorial clarity.</li>
      </ul>
      <h2>Adding your own</h2>
      <p>Drop a file into <code>themes/&lt;your-name&gt;.json</code> in the TA Brain folder, shaped like this:</p>
      <pre><code>{
  "name": "Solar",
  "description": "High-contrast sand on ink.",
  "mode": "dark",
  "font": "\"Inter\", system-ui, sans-serif",
  "vars": {
    "--bg": "#0b0b12",
    "--bg-2": "#111118",
    "--fg": "#e8e6d6",
    "--accent": "#ffb86c",
    "...": "..."
  }
}</code></pre>
      <p>Then rebuild (<code>python build-wiki.py</code>) and reload. Your new theme appears in Settings.</p>
      <p>The complete variable list is in <code>build-wiki.py</code> under <code>BUILT_IN_THEMES</code>. Any variable you don't override falls back to the default.</p>
    `,
  },
  {
    id: 'editing',
    title: 'Editing the wiki',
    html: `
      <h2>How pages are built</h2>
      <p>Every page is a markdown file in <code>wiki/&lt;folder&gt;/&lt;slug&gt;.md</code>. The folder determines which section the page lives in (Roles, Departments, Concepts, etc.). The slug becomes the URL-friendly ID used in <code>[[links]]</code>.</p>
      <h2>Frontmatter</h2>
      <p>Each page starts with a YAML-style header:</p>
      <pre><code>---
title: "Large Market Data Consultant"
type: role
tags: [role, data, conversion]
created: 2026-04-14
updated: 2026-04-15
sources: 2
---</code></pre>
      <ul>
        <li><strong>title</strong> — what shows in the header and search results.</li>
        <li><strong>type</strong> — used for coloring in the tree and graph.</li>
        <li><strong>tags</strong> — show as clickable chips and feed the search index.</li>
        <li><strong>sources</strong> — how many raw sources informed the page.</li>
      </ul>
      <h2>Linking</h2>
      <p>Use <code>[[slug]]</code> or <code>[[slug|Display Text]]</code> anywhere in the body. The builder resolves them into clickable links and builds the graph from them automatically.</p>
      <h2>Callouts</h2>
      <p>Use Obsidian-style callouts for flagging special content:</p>
      <pre><code>&gt; [!contradiction] Two sources disagree on X...</code></pre>
    `,
  },
  {
    id: 'adding-content',
    title: 'Adding Content',
    html: `
      <h2>The ingestion loop</h2>
      <p>The wiki grows by <strong>brain dumps</strong>: raw notes, transcripts, or interviews about a role, team, process, or concept get dropped into <code>raw/</code>, then turned into linked wiki pages. The prompt below makes that conversion as mechanical as possible — paste it into Claude, Claude Code, or GitHub CoPilot Chat (with this folder as context) and it will generate the right files in the right places.</p>
      <div class="step-flow">
        <div class="step">Drop any new source (markdown, PDF text, meeting notes, email thread) into the <code>raw/</code> folder. Never edit <code>raw/</code> after it lands.</div>
        <div class="step">Copy the prompt below and paste it at the top of a fresh conversation. Replace the <code>[SOURCE FILENAME]</code> placeholder with the actual file you just added.</div>
        <div class="step">Let the assistant propose a plan, then approve. It will create/update the source page, role/department/process/entity/concept/glossary/onboarding pages, the overview, and the index/log.</div>
        <div class="step">Run <code>python build-wiki.py</code> and reload this page. Your new content is live — searchable, linked, graphed.</div>
      </div>
      <h2>The CoPilot / Claude ingestion prompt</h2>
      <p>This prompt is deliberately long. It encodes the full schema so the assistant doesn't need to re-read <code>CLAUDE.md</code>. Copy it, paste it, change the filename, go.</p>
      <div class="prompt-wrap">
        <button class="copy-btn" id="copy-copilot-prompt">Copy prompt</button>
        <pre id="copilot-prompt"></pre>
      </div>
      <h2>Tips for cleaner ingests</h2>
      <ul>
        <li><strong>Name the role explicitly</strong> in your source doc ("this is a brain dump from a Large Market Data Consultant"). It anchors every downstream page.</li>
        <li><strong>Use proper names for people, teams, and systems.</strong> Consistent names become stable <code>[[slug]]</code> links across dozens of pages.</li>
        <li><strong>Flag contradictions in the source itself</strong> if you know of them. The assistant will preserve both sides with a <code>&gt; [!contradiction]</code> callout instead of silently overwriting.</li>
        <li><strong>One source = one ingest run.</strong> Don't mix three brain dumps into one request. You lose provenance and pages get confused.</li>
        <li><strong>Ask for a plan first.</strong> Before writing, ask the assistant to list exactly which pages it will touch. Approve the list, then let it write.</li>
      </ul>
      <h2>After the ingest</h2>
      <ul>
        <li>Rebuild: <code>python build-wiki.py</code></li>
        <li>Open Graph view (<kbd>G</kbd>) and spot the new cluster — it should visibly connect into the existing web.</li>
        <li>Run a <strong>lint</strong> (ask the assistant to "lint the wiki") every few ingests to catch orphans and missing cross-links.</li>
      </ul>
    `,
  },
  {
    id: 'shortcuts',
    title: 'Keyboard Shortcuts',
    html: `
      <h2>Global</h2>
      <ul>
        <li><kbd>/</kbd> — focus search</li>
        <li><kbd>G</kbd> — toggle graph view</li>
        <li><kbd>R</kbd> — jump to a random page</li>
        <li><kbd>H</kbd> — go to Overview</li>
        <li><kbd>?</kbd> — open this help guide</li>
        <li><kbd>Esc</kbd> — close any open modal or the graph</li>
      </ul>
      <h2>Search box</h2>
      <ul>
        <li><kbd>↓</kbd> / <kbd>↑</kbd> — move selection in results</li>
        <li><kbd>Enter</kbd> — open highlighted result</li>
        <li><kbd>Esc</kbd> — clear and close</li>
      </ul>
    `,
  },
  {
    id: 'rebuilding',
    title: 'Rebuilding & extending',
    html: `
      <h2>Typical workflow</h2>
      <ol>
        <li>Drop a new brain-dump into <code>raw/</code>.</li>
        <li>Ask Claude to "ingest [filename]" — Claude writes/updates markdown in <code>wiki/</code>.</li>
        <li>Run <code>python build-wiki.py</code>.</li>
        <li>Reload this page.</li>
      </ol>
      <h2>What the build script does</h2>
      <ul>
        <li>Scans every <code>wiki/**/*.md</code>.</li>
        <li>Parses the frontmatter, body, and every <code>[[wiki-link]]</code>.</li>
        <li>Builds a graph: nodes = pages, edges = links (in both directions, so backlinks work).</li>
        <li>Loads every theme from <code>themes/*.json</code> and the built-ins.</li>
        <li>Emits a single <code>wiki.html</code> file with all data embedded.</li>
      </ul>
      <h2>Health checks</h2>
      <p>Ask Claude to "lint the wiki" to get a report on orphan pages, broken links, stale claims, and missing cross-references.</p>
    `,
  },
];

const COPILOT_PROMPT = [
  'You are the TA Brain wiki maintainer. This vault is a living, lateral institutional knowledge base for Transamerica retirement-plan recordkeeping. Your job is to convert a raw source document into a fully linked set of wiki pages, following the schema below exactly.',
  '',
  'SOURCE TO INGEST: raw/[SOURCE FILENAME]',
  '',
  '=== NON-NEGOTIABLE RULES ===',
  '1. Never modify anything in raw/. Those files are immutable.',
  '2. Only write files inside wiki/.',
  '3. Every page needs the frontmatter template below. Increment the "sources" count when updating an existing page.',
  '4. Link generously using Obsidian-style [[slug]] or [[slug|Display Text]]. Every page must link to at least one other page.',
  '5. If the new source contradicts an existing claim, DO NOT overwrite. Add a "> [!contradiction]" callout on the affected page, preserving both claims with their source citations.',
  '6. File slugs: lowercase, hyphen-separated. Page titles: Title Case. Tags: lowercase, hyphen-separated.',
  '7. Write in clear, neutral prose. No filler. Be specific and cite source pages inline.',
  '',
  '=== FOLDER LAYOUT ===',
  'wiki/',
  '  index.md          master catalog of every page, grouped by type',
  '  log.md            append-only chronological log of operations',
  '  overview.md       big-picture synthesis across the whole wiki',
  '  roles/            one page per job role (what the job IS)',
  '  departments/      one page per team/business unit',
  '  processes/        cross-team workflows and handoffs',
  '  onboarding/       ordered reading lists per role',
  '  glossary/         short definitions of TA-specific terms/acronyms',
  '  entities/         named people and systems (tools, vendors)',
  '  concepts/         process steps, document types, reusable ideas',
  '  sources/          one structured summary per ingested raw source',
  '  analyses/         queries, comparisons, essays filed back as pages',
  '',
  '=== PAGE FRONTMATTER (required on every page) ===',
  '---',
  'title: "Page Title"',
  'type: role | department | process | onboarding | glossary | entity | concept | source | analysis',
  'tags: [tag1, tag2]',
  'created: YYYY-MM-DD',
  'updated: YYYY-MM-DD',
  'sources: N',
  '---',
  '',
  '=== SECTIONS BY PAGE TYPE ===',
  'role: What This Role Does | Systems They Use | Who They Work With | Key Handoffs (in/out) | What Other Teams Should Know | Open Questions | See Also',
  'department: Mission | Key Contacts | What They Own | Upstream Partners | Downstream Partners | Common Misconceptions | See Also',
  'process: Overview | Trigger | Steps (numbered, with team owner per step) | Handoff Points | Timing / Deadlines | Failure Modes | See Also',
  'onboarding: Who This Is For | Reading Order (numbered [[links]] with one-line why-read-this) | Key People to Meet | First Week Priorities | See Also',
  'glossary: Full Name | Definition | Used By | See Also',
  'entity: Overview | Key Facts | Role in [Domain] | Connections | Timeline (if relevant) | Open Questions | See Also',
  'concept: Definition | Why It Matters | Evidence / Examples | Counterarguments | Related Concepts | See Also',
  'source: Summary | Key Claims | Key Quotes | Entities Mentioned | Concepts Mentioned | Contradictions / Open Questions | See Also',
  'analysis: Question / Goal | Findings | Supporting Evidence | Caveats | See Also',
  '',
  '=== INGEST PROCEDURE — DO ALL OF THESE, IN ORDER ===',
  'Step 1. Read raw/[SOURCE FILENAME] completely.',
  'Step 2. Propose a plan: list every wiki page you will CREATE or UPDATE, grouped by folder. Wait for approval before writing.',
  'Step 3. After approval, write wiki/sources/[slug].md — the structured source summary.',
  'Step 4. Create or update wiki/roles/[role-slug].md for every role featured.',
  'Step 5. Create or update wiki/departments/[team-slug].md for every team featured.',
  'Step 6. Create or update wiki/processes/[process-slug].md for every cross-team workflow described.',
  'Step 7. Create or update wiki/entities/[slug].md for every named person or system.',
  'Step 8. Create or update wiki/concepts/[slug].md for every recurring process step, document type, or distinctive idea.',
  'Step 9. Create or update wiki/glossary/[term].md for every TA-specific term, acronym, or internal nickname.',
  'Step 10. If the source is a brain dump from a specific role, create or update wiki/onboarding/[role-slug].md.',
  'Step 11. Update wiki/overview.md if the big picture has shifted.',
  'Step 12. Update wiki/index.md — add the new source row, update every row whose page changed.',
  'Step 13. Append one entry to wiki/log.md using the exact format: "## [YYYY-MM-DD] ingest | Title" followed by Source / Pages created / Pages updated / Notes lines.',
  '',
  'A normal ingest touches 15–25 pages. That is expected and correct. Do not cut corners to keep the count low.',
  '',
  '=== OUTPUT STYLE ===',
  '- Role pages read like a reliable job description written by someone who does the job.',
  '- Department pages read like the team explaining what they do, not an org-chart entry.',
  '- Process pages are usable as a first-time checklist.',
  '- Entity pages read like a neutral encyclopedia entry.',
  '- Source pages read like a structured book report — not a transcript dump.',
  '- Every concept definition: one tight paragraph, then examples/evidence.',
  '',
  '=== FINAL OUTPUT ===',
  'When finished, print a compact summary: the list of files created, files updated, the log entry text, and any contradictions flagged. Then stop.',
  '',
  'Begin by reading raw/[SOURCE FILENAME] and proposing your plan.'
].join('\n');

function buildHelp() {
  const nav = document.getElementById('help-nav');
  const body = document.getElementById('help-body');
  nav.innerHTML = HELP_SECTIONS.map((s, i) =>
    `<button data-id="${s.id}"${i===0?' class="active"':''}>${escapeHtml(s.title)}</button>`
  ).join('');
  body.innerHTML = HELP_SECTIONS.map((s, i) =>
    `<div class="help-section${i===0?' active':''}" data-id="${s.id}">${s.html}</div>`
  ).join('');
  nav.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
    nav.querySelectorAll('button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    body.querySelectorAll('.help-section').forEach(s => s.classList.toggle('active', s.dataset.id === b.dataset.id));
  }));
  const promptEl = document.getElementById('copilot-prompt');
  if (promptEl) promptEl.textContent = COPILOT_PROMPT;
  const copyBtn = document.getElementById('copy-copilot-prompt');
  if (copyBtn) copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(COPILOT_PROMPT);
      const orig = copyBtn.textContent;
      copyBtn.textContent = 'Copied ✓';
      copyBtn.classList.add('ok');
      setTimeout(() => { copyBtn.textContent = orig; copyBtn.classList.remove('ok'); }, 1600);
    } catch (e) {
      copyBtn.textContent = 'Copy failed';
      setTimeout(() => { copyBtn.textContent = 'Copy prompt'; }, 1600);
    }
  });
}

// ============================================================
// EVENTS
// ============================================================
document.getElementById('btn-graph').addEventListener('click', () => toggleGraph());
document.getElementById('dock-graph').addEventListener('click', () => toggleGraph());
document.getElementById('graph-close').addEventListener('click', () => toggleGraph(false));
document.getElementById('graph-local').addEventListener('click', () => {
  state.graphMode = 'local';
  document.getElementById('graph-local').classList.add('active');
  document.getElementById('graph-global').classList.remove('active');
  resetView(); renderGraph();
});
document.getElementById('graph-global').addEventListener('click', () => {
  state.graphMode = 'global';
  document.getElementById('graph-global').classList.add('active');
  document.getElementById('graph-local').classList.remove('active');
  resetView(); renderGraph();
});
document.getElementById('graph-reset').addEventListener('click', () => { resetView(); });

// ----- Physics controls -----
const PHYS_KEYS = ['linkDistance','linkForce','repel','gravity','cluster','friction','collisionPad'];
const PHYS_FMT = {
  linkDistance: v => Math.round(v),
  linkForce:    v => v.toFixed(3),
  repel:        v => Math.round(v),
  gravity:      v => v.toFixed(4),
  cluster:      v => v.toFixed(3),
  friction:     v => v.toFixed(2),
  collisionPad: v => Math.round(v),
};
function syncPhysicsUI() {
  PHYS_KEYS.forEach(k => {
    const inp = document.getElementById('gp-' + k);
    const val = document.getElementById('gp-' + k + '-val');
    if (inp) inp.value = state.physics[k];
    if (val) val.textContent = PHYS_FMT[k](state.physics[k]);
  });
}
PHYS_KEYS.forEach(k => {
  const inp = document.getElementById('gp-' + k);
  if (!inp) return;
  inp.addEventListener('input', () => {
    state.physics[k] = parseFloat(inp.value);
    document.getElementById('gp-' + k + '-val').textContent = PHYS_FMT[k](state.physics[k]);
    savePhysics();
    if (graphState) wakeSim(0.5);
  });
});
document.getElementById('graph-forces').addEventListener('click', () => {
  const panel = document.getElementById('graph-physics');
  const show = !panel.classList.contains('show');
  panel.classList.toggle('show', show);
  document.getElementById('graph-forces').classList.toggle('active', show);
  if (show) syncPhysicsUI();
});
document.getElementById('gp-reset').addEventListener('click', () => {
  state.physics = { ...DEFAULT_PHYSICS };
  savePhysics();
  syncPhysicsUI();
  if (graphState) wakeSim(0.9);
});
document.getElementById('gp-reheat').addEventListener('click', () => {
  if (graphState) wakeSim(1.0);
});
document.getElementById('gp-freeze').addEventListener('click', () => {
  sim.alpha = 0; sim.running = false;
});
syncPhysicsUI();
document.getElementById('btn-random').addEventListener('click', randomPage);
document.getElementById('dock-random').addEventListener('click', randomPage);
document.getElementById('btn-home').addEventListener('click', () => navigate('overview'));
document.getElementById('dock-prev').addEventListener('click', () => { if (state.history.length) { state.forward.push(state.current); navigate(state.history.pop(), false); }});
document.getElementById('dock-next').addEventListener('click', () => { if (state.forward.length) { state.history.push(state.current); navigate(state.forward.pop(), false); }});

document.getElementById('btn-settings').addEventListener('click', () => openModal('settings-backdrop'));
document.getElementById('settings-close').addEventListener('click', () => closeModal('settings-backdrop'));
document.getElementById('btn-help').addEventListener('click', () => openModal('help-backdrop'));
document.getElementById('dock-help').addEventListener('click', () => openModal('help-backdrop'));
document.getElementById('help-close').addEventListener('click', () => closeModal('help-backdrop'));
document.querySelectorAll('.modal-backdrop').forEach(b => b.addEventListener('click', e => {
  if (e.target === b) b.classList.remove('show');
}));

function randomPage() {
  const keys = Object.keys(pages);
  navigate(keys[Math.floor(Math.random()*keys.length)]);
}

window.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT') return;
  if (e.key === 'g' || e.key === 'G') toggleGraph();
  else if (e.key === 'r' || e.key === 'R') randomPage();
  else if (e.key === 'h' || e.key === 'H') navigate('overview');
  else if (e.key === '?') openModal('help-backdrop');
  else if (e.key === 'Escape') {
    if (state.showGraph) toggleGraph(false);
    document.querySelectorAll('.modal-backdrop.show').forEach(m => m.classList.remove('show'));
  }
  else if (e.key === '/') { e.preventDefault(); searchEl.focus(); }
});

window.addEventListener('hashchange', () => {
  const slug = location.hash.replace(/^#/, '');
  if (slug && pages[slug] && slug !== state.current) navigate(slug, false);
});

// ============================================================
// INIT
// ============================================================
applyTheme(state.theme);
buildTree();
buildThemeGrid();
buildHelp();
setupGraphPanZoom();
maybeAutoUnlock();

document.getElementById('stats').textContent =
  `${DATA.pageCount} pages • ${DATA.tagCount} tags`;
document.getElementById('about-build').innerHTML =
  `Built <strong>${escapeHtml(DATA.generated)}</strong><br/>` +
  `${DATA.pageCount} pages · ${DATA.tagCount} tags · ${Object.keys(THEMES).length} themes available`;

const initial = location.hash.replace(/^#/, '') || 'overview';
navigate(pages[initial] ? initial : Object.keys(pages)[0], false);
</script>
</body>
</html>
"""


if __name__ == "__main__":
    main()
