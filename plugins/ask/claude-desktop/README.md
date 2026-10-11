# Ask Dubit for Claude Desktop Chat

Release candidate only: hosted activation and actual Desktop acceptance are pending. Do not install this candidate expecting a working hosted account connection yet.

The plugin supplies the Ask Dubit skill and references the fixed HTTPS connector. It does not register an OAuth client or authenticate an account. An operator must first activate the hosted service and supply the registered public OAuth client ID. No client secret is used. The connector must be configured and connected before plugin installation.

The planned connector uses `https://trends-server.fly.dev/mcp`, a manually registered public OAuth client with DCR disabled, and exactly `https://claude.ai/api/mcp/auth_callback`. Once operator readiness is established, the account connector is added first with that client ID and the secret left blank. The ZIP supplies the skill and matching connector URL; it does not replace this account setup.

Revocation is permanent for the affected Ask Dubit user and OAuth client ID in this pilot. Signing in again, reinstalling the plugin or reconnecting with that same client ID does not restore access. An operator must register and supply a fresh public OAuth client for a new connection. Do not delete or reset the revocation marker to reconnect. This restriction belongs to the service, not the ZIP.

Acceptance requires recording the installed plugin version and skill in normal Claude Desktop Chat, the connected account connector, and an actual `connection_check({})` matched to the server request. Research acceptance separately requires an authorized question with preserved evidence, follow-up and request recovery. Claude Code, archive validation or a standalone connector check does not prove the installed Desktop plugin. These checks remain pending.

Only this folder belongs in the upload ZIP: `.claude-plugin/plugin.json`, `.mcp.json`, `skills/ask-dubit/SKILL.md`, and this README. ZIP entries are relative to this folder. Never upload the entire marketplace as one plugin.
