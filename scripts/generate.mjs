#!/usr/bin/env node
// Builds every client package from src/. Run `node scripts/generate.mjs`; `--check` fails if the
// committed output differs (used by `npm test`). Edit src/, never the output.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");
const product = JSON.parse(read("src/product.json"));

/** Splits the skill source into its front matter description and its body. */
function parseSkill(text) {
  const m = text.match(/^---\ndescription: (.+)\n---\n\n([\s\S]+)$/);
  if (!m) throw new Error("src/ask-dubit.skill.md must start with a one-line description front matter");
  return { description: m[1], body: m[2] };
}

const json = (v) => `${JSON.stringify(v, null, 2)}\n`;

export function build() {
  const skill = parseSkill(read("src/ask-dubit.skill.md"));
  const plugin = "plugins/dubit";
  const files = {
    [`${plugin}/.claude-plugin/plugin.json`]: json({
      name: product.pluginName,
      version: product.version,
      description: product.pluginDescription,
      author: { name: product.author },
    }),
    [`${plugin}/.mcp.json`]: json({
      mcpServers: { [product.mcpServerKey]: { type: "http", url: product.connectorUrl } },
    }),
    [`${plugin}/skills/${product.skillName}/SKILL.md`]:
      `---\nname: ${product.skillName}\ndescription: ${JSON.stringify(skill.description)}\n---\n\n${skill.body}`,
    // ChatGPT has no skills: the connector is added by URL, and the same method text is what the
    // server should carry as its MCP `instructions` (docs/install.md, "What ChatGPT needs").
    "generated/chatgpt/connector.json": json({
      name: product.connectorName,
      description: product.connectorDescription,
      mcp_server_url: product.connectorUrl,
      authentication: "OAuth",
      version: product.version,
    }),
    "generated/chatgpt/instructions.md": `# ${product.productName} method\n\n${skill.body}`,
  };
  return files;
}

function main() {
  const check = process.argv.includes("--check");
  const stale = [];
  for (const [path, content] of Object.entries(build())) {
    const abs = join(root, path);
    if (check) {
      if (!existsSync(abs) || readFileSync(abs, "utf8") !== content) stale.push(path);
    } else {
      mkdirSync(dirname(abs), { recursive: true });
      writeFileSync(abs, content);
    }
  }
  if (stale.length) {
    console.error(`Generated files differ from src/ (run node scripts/generate.mjs):\n  ${stale.join("\n  ")}`);
    process.exit(1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
