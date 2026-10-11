#!/usr/bin/env python3
"""Build the one-plugin Desktop upload candidate; never include operator files."""
import argparse
import hashlib
import json
from pathlib import Path
from zipfile import ZipFile, ZipInfo, ZIP_DEFLATED

parser = argparse.ArgumentParser()
parser.add_argument("--output", required=True, type=Path)
args = parser.parse_args()
source = Path(__file__).resolve().parent.parent / "plugins/ask/claude-desktop"
entries = [".claude-plugin/plugin.json", ".mcp.json", "README.md", "skills/ask-dubit/SKILL.md"]
manifest = json.loads((source / entries[0]).read_text())
if manifest["name"] != "ask-dubit-desktop":
    raise SystemExit("Unexpected plugin identity")
remote = json.loads((source / ".mcp.json").read_text())
if remote != {"mcpServers": {"ask-dubit": {"type": "http", "url": "https://trends-server.fly.dev/mcp"}}}:
    raise SystemExit("Unexpected Desktop connector configuration")
args.output.mkdir(parents=True, exist_ok=True)
target = args.output / f"ask-dubit-desktop-{manifest['version']}.zip"
checksum = target.with_suffix(".zip.sha256")
if target.exists() or checksum.exists():
    raise SystemExit("Use an unused destination; release artifacts and checksums are not overwritten")
with ZipFile(target, "w", compression=ZIP_DEFLATED) as archive:
    for entry in sorted(entries):
        info = ZipInfo(entry, date_time=(1980, 1, 1, 0, 0, 0))
        info.compress_type = ZIP_DEFLATED
        info.create_system = 3
        info.external_attr = 0o100644 << 16
        archive.writestr(info, (source / entry).read_bytes())
digest = hashlib.sha256(target.read_bytes()).hexdigest()
checksum.write_text(f"{digest}  {target.name}\n")
print(json.dumps({"artifact": str(target), "sha256": digest, "desktopAccepted": False}))
