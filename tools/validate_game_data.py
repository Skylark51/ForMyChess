#!/usr/bin/env python3
"""Dependency-free validation for append-only personal game records."""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GAMES = ROOT / "data" / "games"
REQUIRED_TOP = {"schema_version", "game_id", "source", "player", "pgn", "observations", "game_summary"}
KINDS = {"weakness", "strength", "review"}
CONFIDENCE = {"low", "medium", "high"}


def fail(message: str) -> None:
    raise ValueError(message)


def validate(path: Path) -> None:
    data = json.loads(path.read_text(encoding="utf-8"))
    missing = REQUIRED_TOP - data.keys()
    if missing:
        fail(f"{path}: missing top-level fields: {sorted(missing)}")
    if data["schema_version"] != 1:
        fail(f"{path}: unsupported schema_version {data['schema_version']!r}")
    if path.stem != data["game_id"]:
        fail(f"{path}: filename must match game_id")
    if data["player"].get("color") not in {"white", "black"}:
        fail(f"{path}: player.color must be white or black")
    if not isinstance(data["pgn"], str) or len(data["pgn"].strip()) < 20:
        fail(f"{path}: pgn is empty")
    seen = set()
    for obs in data["observations"]:
        for key in ("id", "kind", "move", "phase", "severity", "confidence", "tags", "summary", "training_rule"):
            if key not in obs:
                fail(f"{path}: observation missing {key}")
        if obs["id"] in seen:
            fail(f"{path}: duplicate observation id {obs['id']}")
        seen.add(obs["id"])
        if obs["kind"] not in KINDS:
            fail(f"{path}: invalid kind {obs['kind']}")
        if obs["confidence"] not in CONFIDENCE:
            fail(f"{path}: invalid confidence {obs['confidence']}")
        if not 1 <= int(obs["severity"]) <= 5:
            fail(f"{path}: severity must be 1..5")
        if not obs["tags"]:
            fail(f"{path}: observation tags must not be empty")


def main() -> int:
    files = sorted(GAMES.glob("*.json"))
    if not files:
        print("No game files found", file=sys.stderr)
        return 1
    for path in files:
        validate(path)
    print(f"Validated {len(files)} game file(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
