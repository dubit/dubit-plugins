# Contributing

Edit `src/` only: `src/product.json` (version, connector URL, names) and `src/dubit-ask.skill.md`
(the activation description only). Then run `npm run generate`; it writes `plugins/dubit/` (Claude Desktop) and
`generated/chatgpt/` (ChatGPT). Never edit generated files. `npm test` fails if they drift.

The skill only says when to use dubit.ask and defers to the connector. The method (discover with
`ask_list_sources`, keep request ids, recover with `ask_get_answer`, report limits) lives in the server's MCP
`instructions` and tool descriptions, in trend-api, as the single source.

## Changing the activation description

The description decides when Claude loads the skill. `evals/dubit-ask-triggers.json` holds 30 realistic
prompts: 15 that should load it and 15 near misses that should not (parenting advice, homework, gameplay
tips, account help, adult market research, dubit's website or invoices). After editing the description,
rerun them and keep the score at 30/30:

    python3 evals/run_triggers.py              # reads src/dubit-ask.skill.md; 3 runs per prompt
    python3 evals/run_triggers.py --description "candidate text"

It needs the `claude` CLI signed in, makes about 90 short calls, and takes a few minutes. Add a prompt
to the set whenever a real conversation triggers wrongly.

Validate the Claude package with `claude plugin validate --strict plugins/dubit`.

Do not add anything to `.claude-plugin/marketplace.json` or `.agents/plugins/marketplace.json`
until launch is approved; a test keeps them empty. This repo is public: no tokens, environment
files, client ids, internal hostnames (only `dubit.io`) or test transcripts.
