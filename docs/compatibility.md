# Compatibility

Launch clients: **Claude Desktop** and **ChatGPT desktop**, both through the hosted connector.

| Client | Connects through | Status |
| --- | --- | --- |
| Claude Desktop | The `dubit` plugin (connector + `dubit-ask` skill) | Connector tested end to end on 20 Oct 2026, added by hand: questions that ran past 45 s were answered by checking with `ask_check_question`, and the answer card rendered. Installing through the plugin (marketplace, **Add**, **Connectors** tab) not yet tested |
| ChatGPT desktop | Developer-mode app pointing at the connector URL; no skill | Not yet tested |
| Claude Code, Codex | Not in v1. Loopback plugins were removed from the source tree | Out of scope |

Each launch client needs one real end-to-end connection (connect, `ask_list_sources`, one question,
check on it with `ask_check_question`) before this table says "Tested". The connector URL and version
live in `src/product.json` only.
