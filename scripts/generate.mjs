#!/usr/bin/env node
// Builds every client package and the Claude marketplace from src/ and the root LICENSE. Run
// `node scripts/generate.mjs`; `--check` fails if the committed output differs (used by `npm test`).
// Edit src/, never the output.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");
const product = JSON.parse(read("src/product.json"));

/** Splits the skill source into its front matter description and its body. */
function parseSkill(text) {
  const m = text.match(/^---\ndescription: (.+)\n---\n\n([\s\S]+)$/);
  if (!m) throw new Error("src/dubit-ask.skill.md must start with a one-line description front matter");
  return { description: m[1], body: m[2] };
}

const json = (v) => `${JSON.stringify(v, null, 2)}\n`;

/** Fills `{{key}}` placeholders from src/product.json; an unknown key is an error, not a blank. */
function fill(text, source) {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!(key in product)) throw new Error(`${source} names {{${key}}}, which src/product.json does not have`);
    return product[key];
  });
}

export function build() {
  const skill = parseSkill(read("src/dubit-ask.skill.md"));
  const plugin = `plugins/${product.pluginName}`;
  const repositoryUrl = `https://github.com/${product.repository}`;
  const files = {
    [`${plugin}/.claude-plugin/plugin.json`]: json({
      name: product.pluginName,
      displayName: product.displayName,
      version: product.version,
      description: product.pluginDescription,
      author: { name: product.author, url: product.authorUrl },
      homepage: `${repositoryUrl}/tree/main/${plugin}#readme`,
      repository: repositoryUrl,
      license: product.license,
    }),
    [`${plugin}/.mcp.json`]: json({
      mcpServers: { [product.mcpServerKey]: { type: "http", url: product.connectorUrl } },
    }),
    [`${plugin}/skills/${product.skillName}/SKILL.md`]:
      `---\nname: ${product.skillName}\ndescription: ${JSON.stringify(skill.description)}\n---\n\n${skill.body}`,
    // Installers receive only the plugin folder, so it carries its own README and LICENSE.
    [`${plugin}/README.md`]: fill(read("src/plugin-readme.md"), "src/plugin-readme.md"),
    [`${plugin}/LICENSE`]: read("LICENSE"),
    // The withdrawn pilot plugins map to null, so Claude Code drops them from existing installs.
    ".claude-plugin/marketplace.json": json({
      name: product.marketplaceName,
      owner: { name: product.author, url: product.authorUrl },
      description: product.marketplaceDescription,
      plugins: [{ name: product.pluginName, source: `./${plugin}`, description: product.pluginDescription }],
      renames: Object.fromEntries(product.retiredPlugins.map((name) => [name, null])),
      forceRemoveDeletedPlugins: true,
    }),
    // ChatGPT has no skills: it is given the URL and takes the method from the server's instructions.
    "generated/chatgpt/connector.json": json({
      name: product.connectorName,
      description: product.connectorDescription,
      mcp_server_url: product.connectorUrl,
      authentication: "OAuth",
      version: product.version,
    }),
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
