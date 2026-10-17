import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "../scripts/generate.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const product = JSON.parse(readFileSync(join(root, "src/product.json"), "utf8"));

test("committed output matches the generator", () => {
  for (const [path, content] of Object.entries(build())) {
    assert.equal(readFileSync(join(root, path), "utf8"), content, `${path} is stale: run node scripts/generate.mjs`);
  }
});

test("one version, stamped everywhere it appears", () => {
  const plugin = JSON.parse(readFileSync(join(root, "plugins/dubit/.claude-plugin/plugin.json"), "utf8"));
  const chatgpt = JSON.parse(readFileSync(join(root, "generated/chatgpt/connector.json"), "utf8"));
  assert.equal(plugin.version, product.version);
  assert.equal(chatgpt.version, product.version);
  assert.match(product.version, /^\d+\.\d+\.\d+(-[0-9A-Za-z.]+)?$/);
});

test("no hand-written copy of the connector URL or version outside src and output", () => {
  const skip = new Set([".git", "node_modules", "plugins", "generated"]);
  const walk = (dir) => readdirSync(dir).flatMap((n) => {
    if (skip.has(n) && dir === root) return [];
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
  for (const f of walk(root).filter((p) => /\.(json|md|mjs)$/.test(p))) {
    const rel = f.slice(root.length + 1);
    if (rel.startsWith("src/") || rel.startsWith("test/") || rel.startsWith("scripts/") || rel === "docs/install.md") continue;
    assert.ok(!readFileSync(f, "utf8").includes("trends-server.fly.dev"), `${rel} names the withdrawn pilot host`);
  }
});

test("the skill carries method only", () => {
  const skill = readFileSync(join(root, "plugins/dubit/skills/ask-dubit/SKILL.md"), "utf8");
  for (const banned of [/on by default/i, /pilot/i, /beta/i, /fly\.dev/i]) assert.doesNotMatch(skill, banned);
  for (const tool of ["list_agents", "ask_agent", "ask_dubit", "get_request"]) assert.match(skill, new RegExp(tool));
});

test("catalogues stay empty until launch", () => {
  for (const p of [".claude-plugin/marketplace.json", ".agents/plugins/marketplace.json"]) {
    assert.deepEqual(JSON.parse(readFileSync(join(root, p), "utf8")).plugins, []);
  }
});
