# dubit

Ask dubit.ask research questions about children, teens and families without leaving Claude. dubit.ask
answers from dubit's own research data, and Claude shows each answer with an answer card of charts.

## Who can use it

You need {{eligibility}}. If your company does not have it, the connector refuses and says so. To ask
for access, contact dubit at https://dubit.io/contact.

## Install

1. In Claude Desktop, open **Customize > Plugins > Add > Add marketplace** and enter `{{repository}}`.
2. Find **{{displayName}}** and choose **Add**.
3. Open the plugin's **Connectors** tab and choose **Connect** (or **Add**, then **Connect**).
4. Sign in with your dubit account and approve the connection.

On Team and Enterprise plans, an Owner may need to allow adding marketplaces, and to add the connector
first.

## Use it

Ask in plain words, for example "How many kids use YouTube in the US?" or "What do UK teens think of
brands advertising inside Roblox games?". Claude asks dubit.ask and shows the answer with its answer
card. Some questions take a few minutes; Claude keeps checking until the answer arrives. To see what you
can ask about, ask "Which dubit sources can I use?"

## What data it sends

- The plugin installs no programs: it's a skill and the connector's address. Answers can appear in an
  answer card that dubit's server supplies and Claude shows in its own sandbox. The plugin stores
  nothing itself.
- When you ask, Claude sends your question to dubit at `{{connectorUrl}}`, under your dubit account,
  and dubit sends the answer back. Anthropic, which runs Claude, receives both under its own privacy
  policy.
- dubit stores each question and its answer with your account, as it does for questions asked on
  dubit.io, and dubit staff can read them to support you and to check the quality of the answers. The
  record that lets Claude fetch an answer again is deleted after {{retentionDays}} days.
- Disconnect from the plugin's **Connectors** tab. To stop access at dubit's end, disconnect it at
  https://dubit.io/ask/account/connections.

dubit's privacy policy has the full details: https://dubit.io/privacy.

## Licence

MIT. See [LICENSE](LICENSE). {{licenceScope}}
