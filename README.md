# dubit plugins

The **dubit** plugin brings dubit.ask into Claude: ask research questions about children, teens and
families and get answers, with charts, from dubit's own data. You need a dubit account whose company
has dubit.ask switched on; to ask for access, contact dubit at https://dubit.io/contact.

- **Claude Desktop:** open **Customize > Plugins > Add > Add marketplace**, enter `dubit/dubit-plugins`,
  add **dubit**, then choose **Connect** on the plugin's **Connectors** tab and sign in with your dubit
  account. What it does, and what data it sends: [plugins/dubit/README.md](plugins/dubit/README.md).
- **ChatGPT:** add the dubit connector as an app in developer mode. Steps and the URL:
  [docs/install.md](docs/install.md).

**Added this marketplace for the earlier pilot?** Choose **Check for updates** on it in
**Customize > Plugins**, then add **dubit**. The pilot plugin `ask-dubit-desktop` no longer connects;
remove it.

[Compatibility](docs/compatibility.md) · [Contributing](CONTRIBUTING.md) · MIT [licence](LICENSE)
