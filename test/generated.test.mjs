import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "../scripts/generate.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (p) => JSON.parse(readFileSync(join(root, p), "utf8"));
const product = readJson("src/product.json");
const plugin = `plugins/${product.pluginName}`;

test("committed output matches the generator", () => {
  for (const [path, content] of Object.entries(build())) {
    assert.equal(readFileSync(join(root, path), "utf8"), content, `${path} is stale: run node scripts/generate.mjs`);
  }
});

test("the version is semver (it is stamped into the manifest, which the first test covers)", () => {
  assert.match(product.version, /^\d+\.\d+\.\d+(-[0-9A-Za-z.]+)?$/);
});

test("hand-written files name neither the withdrawn pilot host nor a copy of the connector URL", () => {
  const generated = new Set(Object.keys(build()));
  const skip = new Set([".git", "node_modules", "src", "scripts", "test"]);
  const walk = (dir) => readdirSync(dir).flatMap((n) => {
    if (skip.has(n) && dir === root) return [];
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
  for (const f of walk(root).filter((p) => /\.(json|md|mjs|py)$/.test(p))) {
    const rel = f.slice(root.length + 1);
    if (generated.has(rel)) continue;
    const text = readFileSync(f, "utf8");
    assert.ok(!text.includes("trends-server.fly.dev"), `${rel} names the withdrawn pilot host`);
    assert.ok(!text.includes(product.connectorUrl), `${rel} copies the connector URL`);
  }
});

test("public text writes the brand in lowercase; only the registered company name is capitalised", () => {
  const publicFiles = ["README.md", `${plugin}/README.md`, "docs/compatibility.md", ".claude-plugin/marketplace.json",
    `${plugin}/.claude-plugin/plugin.json`, `${plugin}/skills/${product.skillName}/SKILL.md`];
  for (const p of publicFiles) {
    assert.doesNotMatch(readFileSync(join(root, p), "utf8").replaceAll("Dubit Limited", ""), /Dubit/, `${p} capitalises dubit`);
  }
});

test("the skill only activates and defers to the server", () => {
  const skill = readFileSync(join(root, `${plugin}/skills/${product.skillName}/SKILL.md`), "utf8");
  // Naming a tool is the first step to copying the server's method into the skill.
  for (const banned of [/on by default/i, /pilot/i, /beta/i, /fly\.dev/i, /\bask_[a-z_]+/]) assert.doesNotMatch(skill, banned);
});

test("the plugin folder carries what Anthropic's directory requires: a 40-word README and a licence", () => {
  const readme = readFileSync(join(root, `${plugin}/README.md`), "utf8").replace(/```[\s\S]*?```/g, "");
  assert.ok(readme.split(/\s+/).filter(Boolean).length >= 40, "README needs at least 40 words outside code blocks");
  assert.equal(readJson(`${plugin}/.claude-plugin/plugin.json`).license, product.license);
  assert.match(readFileSync(join(root, "LICENSE"), "utf8"), new RegExp(`^${product.license} License\\n`));
});

test("the Claude marketplace lists exactly the generated plugin, by the name its manifest uses", () => {
  const { plugins, renames } = readJson(".claude-plugin/marketplace.json");
  assert.deepEqual(plugins.map((p) => p.name), [product.pluginName]);
  for (const entry of plugins) {
    assert.equal(readJson(join(entry.source, ".claude-plugin/plugin.json")).name, entry.name);
    assert.ok(!(entry.name in renames), `${entry.name} is both listed and retired`);
  }
});

test("the Codex catalogue stays empty: Codex is not supported", () => {
  assert.deepEqual(readJson(".agents/plugins/marketplace.json").plugins, []);
});
