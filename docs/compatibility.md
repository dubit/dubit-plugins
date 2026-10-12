# Compatibility and authentication

## Current acceptance boundary

| Client | Current evidence |
| --- | --- |
| Claude Code CLI 2.1.293 | Local installation, OAuth, connection check, specialist and orchestrator research, follow-up, recovery and access-withdrawal checks passed. |
| Claude Desktop Code tab | Uses Claude Code plugins; this package has not been tested there. |
| Claude Desktop Chat / Cowork | The local HTTP preview is unsupported because account remote connectors cannot reach loopback. The separate hosted Desktop Chat candidate has not passed actual Desktop acceptance; Cowork remains unaccepted. |
| Codex CLI 0.162.1 | Local installation and connection proof passed with the callback settings below. Research acceptance is pending. |
| Codex desktop | Not accepted. |
| Hosted Ask Dubit accounts | Bounded research active for approved pilot accounts. Operator token isolation, specialist/orchestrator answers and original-request recovery passed. Complete native Desktop acceptance pending. |

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

## Hosted Desktop candidate

`plugins/ask/claude-desktop/` is bounded research pilot `0.2.0-beta.5`. The target is normal Claude Desktop Chat; other surfaces remain unaccepted. Controlled Supabase dynamic client registration, hosted MCP, consent and bounded research are active for approved pilot accounts. Native sign-in and connection have been reported working. Operator token isolation, specialist/orchestrator answers and original-request recovery passed; complete native research, refresh and reconnect acceptance remain pending. The hosted callback remains exactly `https://claude.ai/api/mcp/auth_callback`.

The intended resource is exactly `https://trends-server.fly.dev/mcp`. Install from **Customize → Plugins → Add → Add marketplace → Add from a repository**, enter **`dubit/dubit-plugins`**, then Add **`ask-dubit-desktop`**. Open its Connectors tab, Add its bundled connector if needed, then Connect. Complete the existing Ask Dubit Magic Link login if prompted, explicitly approve access and return to Claude. Customers do not configure a CLI, token or OAuth client ID. On Team and Enterprise plans an Owner may need to add the connector before members connect individually. The URL-only `.mcp.json` supplies the bundled connector reference; Claude and the hosted OAuth service handle registration and sign-in. In a fresh chat, check the connection, then explicitly ask Ask Dubit a research question. The skill requires `research_enabled: true` before dispatch.

Operators must establish controlled client enrollment and token isolation before enabling DCR: registration alone grants no Ask Dubit access, and only validated authorizations for eligible users may be admitted. Deployment CLI login and scoped management credentials are operator prerequisites, separate from customer setup. Neither belongs in the plugin. Do not publish the candidate as ready merely because its manifest validates or the service is deployed.

The pilot enforces permanent revocation for each affected Ask Dubit user and OAuth client ID. Existing tokens and fresh sign-ins under that same pair remain denied. Reinstallation, refresh, re-consent and connector removal/re-addition do not clear the fence. A new connection may require a fresh client UUID and new explicit consent; retain the original revocation marker permanently. Automatic fresh-client reconnect is unproved and may require operator assistance if Claude reuses the old identity. Do not delete or reset markers or make manual client-ID entry the customer reconnect procedure. Hosted enforcement is still part of the acceptance gate.

The candidate server limits a complete serialized tool result to 120,000 UTF-8 bytes, including text escaping and structured content. Long questions can return a durable pending receipt and continue as an owned server job. Recover with the same request ID; do not run replacement research. These changes are not deployed by publishing client files.

Archive reproducibility and Claude manifest validation establish packaging only. Installed Desktop acceptance requires an account without a preconfigured Ask connector to install this exact candidate and Add/Connect from its bundled Connectors tab without manually entered credentials. Record the actual Desktop version, plugin version, packaged skill, Magic Link continuation, explicit consent and Connected status, then correlate a normal Desktop Chat `connection_check({})` with its authenticated server call. Separately prove an authorized research answer with source attribution, follow-up, durable recovery without duplicate spend, refresh, permission withdrawal and the permanent reconnect fence. Native sign-in and connection have been reported working; the remaining native checks are pending.
