#!/usr/bin/env python3
"""Trigger eval for the dubit-ask skill description (skill-creator method, adapted).

For each query in evals/dubit-ask-triggers.json, runs `claude -p` N times in a throwaway project
that holds only this skill, and records whether Claude's first tool call loads it. Adapted from
skill-creator's run_eval.py because that script registers the description as a slash command,
which current Claude Code no longer lists as a skill (every query scored 0), and because a
user-level install of the withdrawn pilot skill would otherwise win the race. The throwaway
project uses `--setting-sources project,local` so the user's plugins are not loaded.

Usage: python3 evals/run_triggers.py [--description "..."] [--runs 3] [--workers 10]
           [--model claude-opus-5-5] [--out results.json]
"""
import argparse, json, os, re, subprocess, sys, tempfile, uuid
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def source_description():
    text = (ROOT / "src/dubit-ask.skill.md").read_text()
    return re.match(r"^---\ndescription: (.+)\n---\n", text).group(1)


def run_one(query, description, model, timeout):
    name = f"dubit-ask-{uuid.uuid4().hex[:8]}"
    with tempfile.TemporaryDirectory() as tmp:
        skill = Path(tmp, ".claude/skills", name)
        skill.mkdir(parents=True)
        skill.joinpath("SKILL.md").write_text(
            f"---\nname: {name}\ndescription: {json.dumps(description)}\n---\n\nFollow the dubit connector's instructions.\n")
        cmd = ["claude", "-p", query, "--output-format", "stream-json", "--verbose", "--max-turns", "1",
               "--setting-sources", "project,local"]
        if model:
            cmd += ["--model", model]
        env = {k: v for k, v in os.environ.items() if k != "CLAUDECODE"}
        try:
            out = subprocess.run(cmd, cwd=tmp, env=env, stdin=subprocess.DEVNULL, capture_output=True,
                                 text=True, timeout=timeout).stdout
        except subprocess.TimeoutExpired as e:
            out = (e.stdout or b"").decode() if isinstance(e.stdout, bytes) else (e.stdout or "")
        for line in out.splitlines():
            try:
                ev = json.loads(line)
            except json.JSONDecodeError:
                continue
            if ev.get("type") != "assistant":
                continue
            for c in ev["message"]["content"]:
                if c.get("type") == "tool_use":
                    return name in json.dumps(c.get("input", {}))
        return False


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--description", default=None)
    p.add_argument("--eval-set", default=str(ROOT / "evals/dubit-ask-triggers.json"))
    p.add_argument("--runs", type=int, default=3)
    p.add_argument("--workers", type=int, default=10)
    p.add_argument("--timeout", type=int, default=180)
    p.add_argument("--model", default="claude-opus-5-5")
    p.add_argument("--out", default=None)
    a = p.parse_args()
    desc = a.description or source_description()
    items = json.loads(Path(a.eval_set).read_text())
    jobs = [(i, it) for it in items for i in range(a.runs)]
    with ThreadPoolExecutor(a.workers) as ex:
        hits = list(ex.map(lambda j: run_one(j[1]["query"], desc, a.model, a.timeout), jobs))
    results = []
    for it in items:
        n = sum(h for (i, j), h in zip(jobs, hits) if j is it)
        rate = n / a.runs
        ok = rate >= 0.5 if it["should_trigger"] else rate < 0.5
        results.append({**it, "triggers": n, "runs": a.runs, "pass": ok})
    passed = sum(r["pass"] for r in results)
    print(f"Description: {desc}\nPassed {passed}/{len(results)}", file=sys.stderr)
    for r in results:
        print(f"  [{'PASS' if r['pass'] else 'FAIL'}] {r['triggers']}/{r['runs']} "
              f"expect={'yes' if r['should_trigger'] else 'no '}  {r['query'][:80]}", file=sys.stderr)
    report = {"description": desc, "passed": passed, "total": len(results), "results": results}
    if a.out:
        Path(a.out).write_text(json.dumps(report, indent=2) + "\n")
    sys.exit(0 if passed == len(results) else 1)


if __name__ == "__main__":
    main()
