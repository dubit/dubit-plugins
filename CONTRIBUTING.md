# Contributing

Edit the sources only: `src/product.json` (version, connector URL, names, descriptions, shared
wording), `src/dubit-ask.skill.md` (the activation description and its one-paragraph body),
`src/plugin-readme.md` and `src/readme.md` (the plugin's README and this repo's; `{{key}}` fills in a
`product.json` value) and `LICENSE`. Then run `npm run generate`; it writes `plugins/dubit/` (with its
README and LICENSE), `.claude-plugin/marketplace.json` and `README.md`. Never edit generated files.
`npm test` fails if they drift. `retentionDays` is a copy of the connector's own retention setting:
change it when the connector's does.

Raise `version` in `src/product.json` on every release: installed copies update only when it changes.

The skill only says when to use dubit.ask and defers to the connector; it adds no method. The method
(discover with `ask_list_sources`, keep request ids, keep checking with `ask_check_question` while a
question is still working, report limits) lives in the server's MCP `instructions` and tool
descriptions, in the connector's server, as the single source for every app.

## Changing the activation description

The description decides when Claude loads the skill. `evals/dubit-ask-triggers.json` holds 30 realistic
prompts: 15 that should load it and 15 near misses that should not (parenting advice, homework, gameplay
tips, account help, adult market research, dubit's website or invoices). After editing the description,
rerun them and keep the score at 30/30:

    python3 evals/run_triggers.py              # reads src/dubit-ask.skill.md; 3 runs per prompt
    python3 evals/run_triggers.py --description "candidate text"

It needs the `claude` CLI signed in, makes about 90 short calls, and takes a few minutes. Add a prompt
to the set whenever a real conversation triggers wrongly.

Validate the Claude package with `claude plugin validate --strict plugins/dubit` and the
marketplace with `claude plugin validate .`.

The marketplace lists only `dubit`. The withdrawn pilot plugins are in `retiredPlugins`, which the
marketplace maps to `null` so Claude Code drops them from existing installs; keep that list
append-only. `.agents/plugins/marketplace.json` (Codex) stays empty because Codex is not supported.
This repo is public: no tokens, environment files, client ids, internal hostnames (only `dubit.io`)
or test transcripts.
