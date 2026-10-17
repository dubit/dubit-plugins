# Compatibility

Launch clients: **Claude Desktop** and **ChatGPT desktop**, both through the hosted connector.
Nothing here is published yet; the catalogues are empty until launch is approved.

| Client | Connects through | Status |
| --- | --- | --- |
| Claude Desktop | The `dubit` plugin (connector + `dubit-ask` skill) | Not yet tested end to end |
| ChatGPT desktop | Developer-mode app pointing at the connector URL; no skill | Not yet tested end to end |
| Claude Code, Codex | Not in v1. Loopback plugins were removed from the source tree | Out of scope |

Each launch client needs one real end-to-end connection (connect, `ask_list_sources`, one question,
recover it with `ask_get_answer`) before this table says "Tested". The connector URL and version
live in `src/product.json` only.
