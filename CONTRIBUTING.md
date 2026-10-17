# Contributing

Edit `src/` only: `src/product.json` (version, connector URL, names) and `src/ask-dubit.skill.md`
(the activation description only). Then run `npm run generate`; it writes `plugins/dubit/` (Claude Desktop) and
`generated/chatgpt/` (ChatGPT). Never edit generated files. `npm test` fails if they drift.

The skill only says when to use Dubit.Ask and defers to the connector. The method (discover with
`ask_list_sources`, keep request ids, recover with `ask_get_answer`, report limits) lives in the server's MCP
`instructions` and tool descriptions, in trend-api, as the single source.

Validate the Claude package with `claude plugin validate --strict plugins/dubit`.

Do not add anything to `.claude-plugin/marketplace.json` or `.agents/plugins/marketplace.json`
until launch is approved; a test keeps them empty. This repo is public: no tokens, environment
files, client ids, internal hostnames (only `dubit.io`) or test transcripts.
