# Contributing

Keep the Claude and Codex host manifests separate. Keep both copies of the Ask skill identical until shared source generation is introduced. Preserve registered plugin and MCP identities unless the matching OAuth clients and install behaviour have been migrated and tested.

To validate a change with Claude Code installed:

```sh
claude plugin validate --strict .
claude plugin validate --strict plugins/ask/claude
```

Validate actual catalogue installation in a disposable Claude configuration before claiming distribution works. Connecting to a service and running research are separate acceptance checks.

Never commit account fixtures, tokens, environment files, provider credentials, machine-specific runtime paths or internal test transcripts. The current public OAuth client IDs are intentional. Keep the README and compatibility table aligned with what has actually been tested.

Dubit Build is not implemented. Add it as an independent plugin when it is ready; do not register an empty marketplace entry.
