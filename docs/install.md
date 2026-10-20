# Installing the dubit connector

The dubit connector is one connection for all dubit services; today it carries dubit.ask. You need a
dubit account whose company has dubit.ask switched on. Installing never signs you in or runs a question.

## Claude Desktop

Install the **dubit** plugin from this repo's marketplace, `dubit/dubit-plugins`, and connect it from
the plugin's **Connectors** tab. The steps are in the plugin's [README](../plugins/dubit/README.md#install),
the copy Claude shows people. Check it with "Which dubit sources can I use?": Claude should call
`ask_list_sources` and list them.

## ChatGPT desktop

ChatGPT adds a remote MCP server as an app in developer mode. There is no plugin to install and no
skill; the guidance comes from the connector's own instructions and tool descriptions.

1. In ChatGPT open **Settings > Apps > Advanced settings** and turn on **Developer mode**. (OpenAI lists it for Pro, Plus, Business, Enterprise and Education. On Business and Enterprise a workspace admin may need to allow it.)
2. Back in **Settings > Apps** choose **Create app**.
3. Name: `dubit`. MCP server URL: `https://dubit.io/mcp`. Authentication: OAuth. Leave client credentials empty; ChatGPT registers itself and fills in its callback.
4. Choose **Create**. A browser window opens: sign in with your dubit account, approve the connection, then **Continue**.
5. In a new chat, add the app from the **+** menu and ask: "Which dubit sources can I use?"

The values for step 3 are generated into `generated/chatgpt/connector.json`.

### What ChatGPT needs from the server

- Authorisation server metadata with S256 PKCE and either dynamic client registration or Client ID Metadata Documents.
- ChatGPT's callback allowed by the connector (`MCP_CLIENT_CALLBACK_URLS`).
- The access token's audience is the connector URL.
- The method guidance (discover sources, keep request ids, check with `ask_check_question`) carried by the server's MCP `instructions`, the single source ChatGPT reads. Nothing is installed client-side for it.

Sources: OpenAI, ChatGPT Developer mode (developers.openai.com/api/docs/guides/developer-mode) and
Apps SDK authentication (developers.openai.com/apps-sdk/build/auth). Whether developer mode is
offered in the desktop app itself, rather than the web, is unconfirmed: check at the first live test.
