# Dubit plugins

The Dubit plugin catalogue for Claude Code and Codex. Ask Dubit is the first plugin; Dubit Build is planned but is not available yet.

**Claude Desktop Chat candidate: 0.2.0-beta.3.** The package is under [`plugins/ask/claude-desktop`](plugins/ask/claude-desktop). Hosted activation and actual Desktop acceptance are pending; it is not a working hosted release yet. It uses a separately configured Ask Dubit custom connector, followed by the plugin skill. It has no Claude Code callback settings. Operator packaging: `python3 scripts/package-claude-desktop.py --output /path/to/empty/artifact-directory`.

**Current release: Ask Dubit local developer preview, 0.2.0-beta.2.** The plugin connects to a local Ask Dubit test service at `http://127.0.0.1:3101/mcp`. Publishing this catalogue does not activate a hosted service or connect production Ask Dubit accounts. This release requires an existing, operator-configured local test environment. The backend and its setup are not included in this repository.

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
