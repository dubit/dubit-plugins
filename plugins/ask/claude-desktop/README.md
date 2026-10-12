# Ask Dubit for Claude Desktop Chat

Bounded research pilot **0.2.0-beta.5**: research is enabled for approved pilot accounts. Native Claude Desktop sign-in and connection have been reported working. Hosted MCP specialist and orchestrator answers, token isolation and original-request recovery have passed operator checks. Full native research, follow-up, recovery, refresh and revocation/reconnect acceptance remain pending.

Install from the public Dubit marketplace in normal Claude Desktop Chat:

1. Open **Customize → Plugins → Add → Add marketplace → Add from a repository** and enter **`dubit/dubit-plugins`**. Find **`ask-dubit-desktop`** and choose **Add**. If the marketplace is already added, choose **Check for updates** first. Do not select the separate `ask-dubit-development` local preview for Desktop Chat.
2. Open Ask Dubit's **Connectors** tab. Add the bundled Ask Dubit connector if it is Not added, then choose **Connect**. If it is already Connected, continue. On Team and Enterprise plans an Owner may need to add the connector before members connect individually.
3. Sign in through the existing Ask Dubit account's Magic Link flow if prompted, then explicitly approve the connection.
4. Return to a fresh Claude chat and ask: **"Use Ask Dubit to run only connection_check. Do not run research."** Proceed only if it reports connected with research enabled. Connecting alone does not run research or use the analysis allowance.
5. Ask: **"Use Ask Dubit to research: How many kids use YouTube in the US?"** Research questions use your account's analysis allowance. The skill checks the connection before dispatching research.

Repository installation does not require downloading a ZIP. The marketplace is publicly readable; service access remains limited to approved pilot accounts. This is a Dubit marketplace, not an Anthropic directory listing. Claude documents installation through the Plugins menu; installation by a plain chat message has not been verified.

Customers do not need a terminal, access token, client secret or manually entered OAuth client ID. The plugin references `https://trends-server.fly.dev/mcp`; its skill becomes usable after the bundled account connector is connected. Installation alone does not sign you in. If Claude asks for OAuth client credentials, this candidate has not met its intended setup gate; do not work around it with manual credentials.

Operator readiness is separate: the backend, controlled Supabase dynamic client registration, consent flow and isolated-token controls are deployed and verified for this pilot. Research activation does not establish full native research, refresh or reconnect acceptance. The hosted callback is exactly `https://claude.ai/api/mcp/auth_callback`. Deployment CLI login and scoped management credentials belong to operators and are never customer installation steps or plugin contents.

Revocation is permanent for the affected Ask Dubit user and OAuth client ID in this pilot. Signing in again, reinstalling the plugin or reconnecting with that same client ID does not restore access. A new connection may require a fresh client UUID and new explicit consent. Automatic fresh-client registration/reconnect remains unproved; if Claude reuses a revoked identity, operator assistance may be required. Never delete or reset a revocation marker to reconnect. This restriction belongs to the service, not the ZIP.

Acceptance requires installing this exact candidate in normal Claude Desktop Chat without a preconfigured Ask Dubit connector, connecting from its Connectors tab without manually entered OAuth credentials, completing Magic Link and explicit consent, and recording the installed plugin version/skill and Connected status. An actual `connection_check({})` must match the authenticated server request. Research acceptance separately requires an authorized question with preserved evidence, follow-up and request recovery; refresh and revocation/reconnect must also be checked. Claude Code, archive validation or a standalone connector check does not prove the installed Desktop plugin. Complete native research, follow-up, recovery, refresh and reconnect acceptance remain pending.

Only this folder belongs in the upload ZIP: `.claude-plugin/plugin.json`, `.mcp.json`, `skills/ask-dubit/SKILL.md`, and this README. ZIP entries are relative to this folder. Never upload the entire marketplace as one plugin.
