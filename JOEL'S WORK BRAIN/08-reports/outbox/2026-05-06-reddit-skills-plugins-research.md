# Reddit Scan: Skills and Plugins

Date: 2026-05-06

Scope: r/ClaudeCode, r/codex, r/ClaudeAI, r/OpenAI, r/ChatGPT.

## High-Signal Threads

| Signal | Thread | Takeaway |
|---|---|---|
| +1315 | There are 28 official Claude Code plugins most people do not know about | Official plugin marketplace is larger than many users realize; best picks mentioned include Context7, LSPs, Playwright, security guidance, code review, and CLAUDE.md management. Comments strongly say to read the docs and use `/plugin`. |
| +487 | If you are not creating skills for your own project, start now | Skills work best as project memory, guardrails, constraint encoders, API instructions, and repeatable workflow knowledge. |
| +450 | With the right skills, Codex is honestly better than Claude Code for me | Useful Codex skills mentioned: composio connect, webapp-testing, gh-fix-ci, mcp-builder, notion spec to implementation, security threat model, frontend skill, create-plan, cli-creator. |
| +179 | Codex v0.117.0 now supports plugins | Clean mental model: skills are reusable workflows; apps/connectors are service integrations; MCP servers are external tools/context; plugins are installable bundles. |
| +157 | Best Codex plugins? | Strong counter-signal: many users prefer a minimal setup. Superpowers is useful for some, but can be token-heavy. |
| +156 | Is it just me who does not use skills, plugins, and overhead features? | Minimalists argue that extra configuration can become procrastination bait and context bloat. |
| +70 | What skills are you using? | Heavy stacks can get noisy; several commenters moved from big plugin stacks to their own custom skills. |
| +66 | Skills are great, but Claude Code plugins take it further | Plugins matter when skills, MCPs, hooks, and agents need to work together and be distributed/versioned as one unit. |
| +18/+179 variants | Codex plugin explainer posts in r/OpenAI/r/codex | Confirms plugin packaging is now a Codex concept, not only Claude-side vocabulary. |
| +13 | My Top 10 Codex Skills After 3 Weeks | Smaller but detailed r/ChatGPT signal focused on performance/search workflows like WarpGrep. |

## Top Skills and Plugins Mentioned

- Context/current-docs: `context7`, documentation lookup.
- Code intelligence: TypeScript LSP, Pyright, Rust analyzer, other LSP plugins.
- Browser/UI testing: Playwright, webapp-testing.
- Review and quality: code-review, PR review toolkit, gh-fix-ci, security-guidance, security-threat-model.
- Workflow planning: create-plan, feature-dev, superpowers, weekly/planning styles.
- Connectivity: composio/connect-apps, GitHub, Slack, Notion, Gmail, apps/connectors.
- MCP development: mcp-builder, plugin-dev, skill-creator.
- Frontend: frontend-design/frontend-skill, but with mixed reviews.
- Search/performance: WarpGrep, codebase search, greptile/sourcegraph-style tools.

## Top Repos / Tools Mentioned

- `ComposioHQ/awesome-claude-plugins`
- `tddworks/SkillsManager`
- `hashgraph-online/codex-plugin-scanner`
- `hashgraph-online/awesome-codex-plugins`
- `zuharz/ccode-to-codex`
- `thedotmack/claude-mem`
- `blader/humanizer`

## Best Practices

- Start with a small stack: one quality tool, one safety tool, one workflow/tooling helper.
- Add one plugin at a time and watch token/context behavior.
- Write custom project skills for repeated work, local APIs, formatting rules, and "never do this" constraints.
- Use skills for workflow instructions and guardrails.
- Use MCP/apps when the agent needs real external tools or live context.
- Use plugins when a workflow needs skills, MCPs, hooks, agents, and setup packaged together.
- Read the official docs and use built-in plugin management before trusting random lists.
- Prefer negative rules and hard constraints over long preference lists.
- Validate third-party plugins before installing, especially if they run commands.

## Stuff To Avoid

- Installing every plugin because it exists.
- Treating skills as magic instead of training manuals.
- Copying Claude skills into Codex without checking scripts, tools, headers, and platform-specific assumptions.
- Letting stale or low-trust GitHub repos into the workflow.
- Token-heavy plugins that do not repay their context cost.
- Generic skills that duplicate what `AGENTS.md` already handles.
- Confusing plugins with skills: a plugin is a bundle; a skill is one reusable workflow package.

## Sources

- https://www.reddit.com/r/ClaudeAI/comments/1r4tk3u/there_are_28_official_claude_code_plugins_most/
- https://www.reddit.com/r/ClaudeCode/comments/1rerqqd/if_you_arent_creating_skills_for_your_own_project/
- https://www.reddit.com/r/codex/comments/1ssklf5/with_the_right_skills_codex_is_honestly_better/
- https://www.reddit.com/r/codex/comments/1s517gl/codex_v01170_now_supports_plugins_heres_a_simple/
- https://www.reddit.com/r/codex/comments/1sz8id5/best_codex_plugins/
- https://www.reddit.com/r/ClaudeCode/comments/1plrpbq/is_it_just_me_who_doesnt_use_skills_plugins_and/
- https://www.reddit.com/r/ClaudeCode/comments/1rp02ln/what_skills_are_you_using/
- https://www.reddit.com/r/ClaudeAI/comments/1qrlsly/everyones_hyped_on_skills_but_claude_code_plugins/
- https://www.reddit.com/r/OpenAI/comments/1s517l2/codex_v01170_now_supports_plugins_heres_a_simple/
- https://www.reddit.com/r/ChatGPT/comments/1sz0ndu/my_top_10_codex_skills_after_3_weeks_of/
- https://www.reddit.com/r/codex/comments/1sm38zw/skillset_i_built_to_actually_migrate_claude_code/
- https://www.reddit.com/r/OpenAI/comments/1s7ub04/try_the_new_codex_plugin_scanner_how_does_your/
