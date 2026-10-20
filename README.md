# dubit plugins

The **dubit** plugin brings dubit.ask into Claude: ask research questions about children, teens
and families and get answers, with charts, from dubit's own data. You need a dubit account whose company has the dubit connector switched on for use in Claude; to ask for
access, contact dubit at https://dubit.io/contact.

- **Claude Desktop:** open **Customize > Plugins > Add > Add marketplace**, enter `dubit/dubit-plugins`, add
  **dubit**, then choose **Connect** on the plugin's **Connectors** tab and sign in with your
  dubit account. Full steps, including Team and Enterprise plans, and what data it sends:
  [plugins/dubit/README.md](plugins/dubit/README.md).
- **ChatGPT:** coming soon.

**Added this marketplace for the earlier pilot?** Choose **Check for updates** on it in
**Customize > Plugins**, then add **dubit**. The pilot plugins `ask-dubit-desktop` and `ask-dubit-development` no longer
connect; remove them.

[Compatibility](docs/compatibility.md) · [Contributing](CONTRIBUTING.md) · MIT [licence](LICENSE).
The MIT licence covers the files in this repository only. It does not cover the dubit.ask service, its data, or the dubit name and logo.
