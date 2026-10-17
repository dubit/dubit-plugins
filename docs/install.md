# Installing the Dubit connector (Dubit.Ask today) (not published until launch)

The Dubit connector (one connection for all Dubit services; Dubit.Ask today) is at `https://dubit.io/mcp`. You need a Dubit account whose company has
Dubit.Ask switched on. Installing never signs you in or runs a question.

## Claude Desktop

1. Open **Customize > Plugins > Add > Add marketplace > Add from a repository** and enter `dubit/dubit-plugins`.
2. Find **dubit** and choose **Add**. (Until launch the catalogue is empty; to test a build, use a local checkout of this repo's `plugins/dubit` folder.)
3. Open the plugin's **Connectors** tab, choose **Connect**, sign in with your Dubit magic link and approve the connection. On Team and Enterprise plans an Owner may need to add the connector first.
4. In a fresh chat ask: "Which Dubit sources can I use?" It should call `ask_list_sources` and list them.
5. Ask a research question, for example "How many kids use YouTube in the US?"

## ChatGPT desktop

ChatGPT adds a remote MCP server as an app in developer mode. There is no plugin to install and no
skill; the guidance comes from the connector's own instructions and tool descriptions.

1. In ChatGPT open **Settings > Apps > Advanced settings** and turn on **Developer mode**. (OpenAI lists it for Pro, Plus, Business, Enterprise and Education. On Business and Enterprise a workspace admin may need to allow it.)
2. Back in **Settings > Apps** choose **Create app**.
3. Name: `Dubit`. MCP server URL: `https://dubit.io/mcp`. Authentication: OAuth. Leave client credentials empty; ChatGPT registers itself and fills in its callback.
4. Choose **Create**. A browser window opens: sign in with your Dubit magic link, approve the connection, then **Continue**.
5. In a new chat, add the app from the **+** menu and ask: "Which Dubit sources can I use?"

The values for step 3 are generated into `generated/chatgpt/connector.json`.

### What ChatGPT needs from the server

- Authorisation server metadata with S256 PKCE and either dynamic client registration or Client ID Metadata Documents.
- ChatGPT's callback allowed by the connector (`MCP_CLIENT_CALLBACK_URLS`).
- The access token's audience is the connector URL.
- The method guidance (discover sources, keep request ids, recover with `ask_get_answer`) carried by the server's MCP `instructions`, the single source ChatGPT reads. Nothing is installed client-side for it.

Sources: OpenAI, ChatGPT Developer mode (developers.openai.com/api/docs/guides/developer-mode) and
Apps SDK authentication (developers.openai.com/apps-sdk/build/auth). Whether developer mode is
offered in the desktop app itself, rather than the web, is unconfirmed: check at the first live test.
