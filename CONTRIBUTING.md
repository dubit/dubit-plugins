# Contributing

Edit `src/` only: `src/product.json` (version, connector URL, names) and `src/ask-dubit.skill.md`
(the method text). Then run `npm run generate`; it writes `plugins/dubit/` (Claude Desktop) and
`generated/chatgpt/` (ChatGPT). Never edit generated files. `npm test` fails if they drift.

The skill is method only: discover with `list_agents`, keep request ids, recover with
`get_request`, report limits. Which dataset answers what, pilot status and access claims belong to
the server, not here.

Validate the Claude package with `claude plugin validate --strict plugins/dubit`.

Do not add anything to `.claude-plugin/marketplace.json` or `.agents/plugins/marketplace.json`
until launch is approved; a test keeps them empty. This repo is public: no tokens, environment
files, client ids, internal hostnames (only `dubit.io`) or test transcripts.
