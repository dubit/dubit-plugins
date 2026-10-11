# Ask Dubit for Claude Desktop Chat

Release candidate **0.2.0-beta.4** only: controlled OAuth registration, hosted activation and actual Desktop acceptance are pending. Do not install this candidate expecting a working hosted account connection yet.

Once the service is ready, the intended customer setup in normal Claude Desktop Chat is:

1. Install the Ask Dubit plugin in Customize → Plugins. For this candidate, use Add → Upload plugin with its single-plugin ZIP.
2. Open Ask Dubit's **Connectors** tab. Add the bundled Ask Dubit connector if it is Not added, then choose **Connect**. If it is already Connected, continue. On Team and Enterprise plans an Owner may need to add the connector before members connect individually.
3. Sign in through the existing Ask Dubit account's Magic Link flow if prompted, then explicitly approve the connection.
4. Return to Claude and check the connection. Ask a research question when ready; connecting alone does not run research or use the analysis allowance.

Customers do not need a terminal, access token, client secret or manually entered OAuth client ID. The plugin references `https://trends-server.fly.dev/mcp`; its skill becomes usable after the bundled account connector is connected. Installation alone does not sign you in. If Claude asks for OAuth client credentials, this candidate has not met its intended setup gate; do not work around it with manual credentials.

Operator readiness is separate: activate and verify the hosted backend, controlled Supabase dynamic client registration, consent flow and token-isolation protections before customer testing. The hosted callback is exactly `https://claude.ai/api/mcp/auth_callback`. Deployment CLI login and scoped management credentials belong to operators and are never customer installation steps or ZIP contents.

Revocation is permanent for the affected Ask Dubit user and OAuth client ID in this pilot. Signing in again, reinstalling the plugin or reconnecting with that same client ID does not restore access. A new connection may require a fresh client UUID and new explicit consent. Automatic fresh-client registration/reconnect remains unproved; if Claude reuses a revoked identity, operator assistance may be required. Never delete or reset a revocation marker to reconnect. This restriction belongs to the service, not the ZIP.

Acceptance requires installing this exact candidate in normal Claude Desktop Chat without a preconfigured Ask Dubit connector, connecting from its Connectors tab without manually entered OAuth credentials, completing Magic Link and explicit consent, and recording the installed plugin version/skill and Connected status. An actual `connection_check({})` must match the authenticated server request. Research acceptance separately requires an authorized question with preserved evidence, follow-up and request recovery; refresh and revocation/reconnect must also be checked. Claude Code, archive validation or a standalone connector check does not prove the installed Desktop plugin. These checks remain pending.

Only this folder belongs in the upload ZIP: `.claude-plugin/plugin.json`, `.mcp.json`, `skills/ask-dubit/SKILL.md`, and this README. ZIP entries are relative to this folder. Never upload the entire marketplace as one plugin.
