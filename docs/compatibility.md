# Compatibility and authentication

## Current acceptance boundary

| Client | Current evidence |
| --- | --- |
| Claude Code CLI 2.1.293 | Local installation, OAuth, connection check, specialist and orchestrator research, follow-up, recovery and access-withdrawal checks passed. |
| Claude Desktop Code tab | Uses Claude Code plugins; this package has not been tested there. |
| Claude Desktop Chat / Cowork | Not supported by this local HTTP preview. Account remote connectors cannot reach the service on your computer's loopback address. |
| Codex CLI 0.162.1 | Local installation and connection proof passed with the callback settings below. Research acceptance is pending. |
| Codex desktop | Not accepted. |
| Hosted Ask Dubit accounts | Not activated or accepted. |

The existing local research acceptance does not prove desktop or hosted compatibility. Plugin catalogue installation is verified separately from authenticated service use.

## Local OAuth configuration

The manifests contain **public OAuth client identifiers**, not client secrets, tokens or user accounts. They refer to clients registered in the existing local test environment. Copying a manifest does not register the client in another environment.

The MCP resource is exactly `http://127.0.0.1:3101/mcp`. Claude's registered callback is exactly `http://localhost:8765/callback`.

Codex requires temporary process settings:

```sh
codex -c 'mcp_oauth_callback_port=8766' -c 'mcp_oauth_callback_url="http://127.0.0.1:8766/callback"'
```

Its registered callback is exactly `http://127.0.0.1:8766/callback/HARzNIc5wFPg`. The suffix is derived from the MCP resource; changing the resource changes the callback. Do not silently choose a different callback port or URL.

Account login and consent take place in the local test website. Operators must complete the backend's token-isolation preflight before issuing delegated tokens, retain S256 PKCE and the registered-client restrictions, and keep the required local Supabase token-isolation and private Realtime settings in place. These backend controls are not implemented by the plugin package. Local Supabase restarts require rechecking the controls.

## Research and recovery

Tools are `connection_check`, `list_agents`, `ask_dubit`, `ask_agent` and `get_request`. Discovery reflects the connected account's current permissions. The server checks permissions again when research or recovery is requested.

Retain a question's original request ID and inputs after uncertain responses. Use `get_request` to recover the existing outcome; do not create another request ID merely to retry a possibly completed paid question.

The pilot returns at most 64 published blocks, 50 rows per table and 256 KiB, with explicit partial-output markers. Saved answers are readable for seven days. Provider-loop budget enforcement is approximate and can overshoot; accounting uncertainty prevents new paid research. These are current preview limits, not production service guarantees.
