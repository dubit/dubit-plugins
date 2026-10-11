# Dubit plugins

The Dubit plugin catalogue for Claude Desktop Chat, Claude Code and Codex. Ask Dubit is the first plugin; Dubit Build is planned but is not available yet.

**Claude Desktop Chat pilot: 0.2.0-beta.5.** The hosted MCP, native OAuth registration and consent website are active for approved pilot accounts. Research is disabled while actual Desktop sign-in and delegated token isolation are verified. This is a connection-test pilot, not an accepted research release. Customers do not set up a CLI, token or OAuth client ID. See the [pilot instructions](plugins/ask/claude-desktop/README.md).

## Install the Claude Desktop pilot from this repository

1. In Claude Desktop's Chat tab, open **Customize → Plugins → Add → Add marketplace → Add from a repository**.
2. Enter **`dubit/dubit-plugins`** (or `https://github.com/dubit/dubit-plugins`).
3. Find **`ask-dubit-desktop`** in that marketplace and choose **Add**.
4. Open the plugin's **Connectors** tab, Add its bundled Ask Dubit connector if needed, then **Connect**. Sign in to your existing Ask Dubit account using Magic Link if prompted and explicitly approve access. On Team and Enterprise plans, an Owner may need to add the connector first.
5. In a fresh chat, ask: **"Use Ask Dubit to run only connection_check. Do not run research."** A successful pilot check should report connected with research disabled.

Only approved pilot accounts can connect. Installing the plugin does not grant account access or sign you in. If the marketplace was added previously, choose **Check for updates** before selecting the Desktop pilot. Do not choose `ask-dubit-development` for Desktop Chat; that separate preview uses a local test service.

This uses Claude's repository marketplace installation; no ZIP download is required. It is not currently an Anthropic directory listing. A plain chat request has not been verified as an installation mechanism; the documented installation route uses the Plugins menu. After installation and connection, ordinary chat requests can invoke the bundled skill.

**Separate local developer preview: 0.2.0-beta.2.** This plugin connects to a local Ask Dubit test service at `http://127.0.0.1:3101/mcp`. It requires an existing, operator-configured local test environment. The backend and its setup are not included in this repository. Publishing a client package does not deploy its backend.

## Install in Claude Code

```sh
claude plugin marketplace add dubit/dubit-plugins
claude plugin install ask-dubit-development@dubit
```

Or, inside Claude Code:

```text
/plugin marketplace add dubit/dubit-plugins
/plugin install ask-dubit-development@dubit
```

Restart Claude Code after installation. With the local test service and its consent website running, use `/mcp` to connect and approve access in the browser. The test environment uses Magic Link login. Invoke `/ask-dubit-development:ask-dubit`, or explicitly ask Claude to use Ask Dubit.

An installation can succeed while the service is unavailable. If you do not already have the configured local test environment, this release cannot answer questions. It does not currently support an ordinary hosted Ask Dubit login in Claude Desktop Chat or Cowork.

## What Ask Dubit does

- Checks the connection without running research.
- Discovers agents available to the connected account.
- Asks the orchestrator to route a research question, or asks an accessible specialist directly.
- Continues plugin conversations and recovers existing requests after a timeout without automatically starting another paid question.

Research questions use the account's analysis allowance. Installation and connection checks do not request research. The skill activates research for an explicit Ask Dubit request or an authorised Dubit workflow; ordinary unrelated questions do not authorise paid Dubit calls.

Website conversation continuation, reports and uploads are outside this preview. Published answers retain their source attribution and data caveats. Output bounds and retention limits can make an answer partial or unavailable later; the plugin reports those limits.

## Compatibility

Claude Code CLI is the tested research client. Codex CLI has connection-proof coverage with explicit callback settings; Codex research and both desktop applications have not passed end-to-end acceptance. See [compatibility and authentication](docs/compatibility.md).

## Repository layout

```text
.claude-plugin/marketplace.json        Claude catalogue
.agents/plugins/marketplace.json      Codex catalogue
plugins/ask/claude/                   Claude plugin and skill
plugins/ask/codex/                    Codex plugin and skill
plugins/ask/claude-desktop/            Desktop Chat hosted candidate
```

The MCP server currently remains in the Ask Dubit backend, where it reuses identity, permissions and research accounting. Shared MCP and runtime code may move here later. This repository contains client packages, not the backend.

## Licence

Copyright Dubit. This repository is publicly readable; no open-source licence is granted at this stage.
