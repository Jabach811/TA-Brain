"""Crop 11 portraits from the collage.

Approach:
1. Known frame edges (measured from source): 30px outer frame all sides,
   horizontal split at rows 502..518.
2. Estimate even seam positions geometrically, then snap each seam to the
   locally-darkest column within ±18% of a cell width.
3. Treat each seam as fixed ±12px around its center — inset each crop by 12
   from adjacent seams to avoid bleed.
"""
from PIL import Image, ImageDraw
import numpy as np
import os

SRC = r"C:/Users/mabac/Downloads/ChatGPT Image Apr 17, 2026, 10_53_42 PM.png"
OUT = r"C:/Users/mabac/OneDrive/Desktop/TA Brain/.claude/worktrees/thirsty-hertz-35adae/cinematic-site-components/team"

img = Image.open(SRC).convert("RGB")
W, H = img.size
arr = np.asarray(img).astype(np.float32)
lum = arr.mean(axis=2)
print(f"Source: {W}x{H}")

# Measured outer frame (thick dark border all around)
LEFT_EDGE = 30
RIGHT_EDGE = W - 30
# Horizontal splitter between top and bottom rows — a dark band
H_TOP = 502   # end of top row usable area
H_BOT = 518   # start of bottom row usable area
FRAME_TOP = 30
FRAME_BOT = H - 30

# Safety pad added on top of each seam's measured half-width
SEAM_PAD = 5


def row_seam_centers(y0, y1, n_portraits):
    """Two-pass detection:
    1. Use a wide window (±40%) to find ALL candidate seams where column p90 is very dark.
    2. Pick the n_portraits-1 best-matching seams, preferring darker and better-spaced ones.
    """
    usable = RIGHT_EDGE - LEFT_EDGE
    cell_w = usable / n_portraits
    band = lum[y0:y1, LEFT_EDGE:RIGHT_EDGE]
    col_p90 = np.percentile(band, 90, axis=0)
    # A true seam has very low p90 (dark top to bottom)
    threshold = np.percentile(col_p90, 12)
    # Find local minima (centers of dark bands)
    minima = []
    i = 0
    while i < len(col_p90):
        if col_p90[i] < threshold:
            j = i
            while j < len(col_p90) and col_p90[j] < threshold:
                j += 1
            # center of this dark band
            mid = (i + j) // 2 + LEFT_EDGE
            # pick argmin inside band for precision
            argmin = i + int(col_p90[i:j].argmin()) + LEFT_EDGE
            minima.append((argmin, col_p90[i:j].mean()))
            i = j
        else:
            i += 1
    # Expected seam positions
    expected = [LEFT_EDGE + round(cell_w * (i + 1)) for i in range(n_portraits - 1)]
    # For each expected, pick closest minimum within ±45% of cell_w
    window = int(cell_w * 0.45)
    picked = []
    for e in expected:
        candidates = [m for m in minima if abs(m[0] - e) <= window]
        if candidates:
            # prefer darker ones, with small penalty for distance
            best = min(candidates, key=lambda m: m[1] + abs(m[0] - e) * 0.05)
            picked.append(best[0])
        else:
            picked.append(e)
    return picked


def measure_seam_half(y0, y1, center, max_half=30):
    """Expand left and right from seam center while column p90 stays dark."""
    band = lum[y0:y1, :]
    col_p90 = np.percentile(band, 90, axis=0)
    threshold = np.percentile(col_p90, 22)
    L = center
    while L > 0 and col_p90[L - 1] < threshold and center - L < max_half:
        L -= 1
    R = center
    while R < len(col_p90) - 1 and col_p90[R + 1] < threshold and R - center < max_half:
        R += 1
    return max(center - L, R - center)


top_centers = row_seam_centers(FRAME_TOP + 4, H_TOP - 4, 5)
bot_centers = row_seam_centers(H_BOT + 4, FRAME_BOT - 4, 6)
top_halves = [measure_seam_half(FRAME_TOP + 4, H_TOP - 4, c) for c in top_centers]
bot_halves = [measure_seam_half(H_BOT + 4, FRAME_BOT - 4, c) for c in bot_centers]
print(f"Top seam centers: {top_centers}  halves: {top_halves}")
print(f"Bot seam centers: {bot_centers}  halves: {bot_halves}")


def boxes_from_centers(centers, halves, n_portraits, outer_half=14):
    """Portrait i: insets from adjacent seams by (seam_half + SEAM_PAD), from
    outer edges by outer_half + SEAM_PAD."""
    left_halves = [outer_half] + halves
    right_halves = halves + [outer_half]
    padded = [LEFT_EDGE] + centers + [RIGHT_EDGE]
    out = []
    for i in range(n_portraits):
        x0 = padded[i] + left_halves[i] + SEAM_PAD
        x1 = padded[i + 1] - right_halves[i] - SEAM_PAD
        out.append((x0, x1))
    return out


top_boxes = boxes_from_centers(top_centers, top_halves, 5)
bot_boxes = boxes_from_centers(bot_centers, bot_halves, 6)
print("Top boxes:", top_boxes, "widths:", [x1 - x0 for x0, x1 in top_boxes])
print("Bot boxes:", bot_boxes, "widths:", [x1 - x0 for x0, x1 in bot_boxes])

TOP_Y0 = FRAME_TOP + 14
TOP_Y1 = H_TOP - 14
BOT_Y0 = H_BOT + 14
BOT_Y1 = FRAME_BOT - 14

names_top = ["nick-lister", "earl-sanford", "stacey-fortune", "scott-vrba", "anita-besler"]
names_bot = ["joel-abacherli", "jessica-j", "julius-m", "amy-jiang", "beth-flores", "selena-cherry"]


def crop_and_save(slug, box):
    x0, y0, x1, y1 = box
    c = img.crop((x0, y0, x1, y1))
    target_w, target_h = 480, 600
    src_w, src_h = c.size
    target_ratio = target_w / target_h
    src_ratio = src_w / src_h
    if src_ratio > target_ratio:
        new_w = int(src_h * target_ratio)
        x_off = (src_w - new_w) // 2
        c = c.crop((x_off, 0, x_off + new_w, src_h))
    else:
        new_h = int(src_w / target_ratio)
        y_off = max(0, (src_h - new_h) // 4)
        c = c.crop((0, y_off, src_w, y_off + new_h))
    c = c.resize((target_w, target_h), Image.LANCZOS)
    c.save(os.path.join(OUT, slug + ".jpg"), "JPEG", quality=88, optimize=True)
    print(f"  {slug}.jpg  src {src_w}x{src_h}  box {(x0, y0, x1, y1)}")


for slug, (x0, x1) in zip(names_top, top_boxes):
    crop_and_save(slug, (x0, TOP_Y0, x1, TOP_Y1))
for slug, (x0, x1) in zip(names_bot, bot_boxes):
    crop_and_save(slug, (x0, BOT_Y0, x1, BOT_Y1))

# Debug overlay
dbg = img.copy()
d = ImageDraw.Draw(dbg)
for c in top_centers:
    d.line([(c, FRAME_TOP), (c, H_TOP)], fill=(255, 0, 0), width=2)
for c in bot_centers:
    d.line([(c, H_BOT), (c, FRAME_BOT)], fill=(255, 0, 0), width=2)
for x0, x1 in top_boxes:
    d.rectangle([x0, TOP_Y0, x1 - 1, TOP_Y1 - 1], outline=(0, 255, 255), width=1)
for x0, x1 in bot_boxes:
    d.rectangle([x0, BOT_Y0, x1 - 1, BOT_Y1 - 1], outline=(0, 255, 255), width=1)
dbg.save(os.path.join(OUT, "_debug_seams.jpg"), quality=70)

print("done")
