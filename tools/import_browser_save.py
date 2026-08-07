#!/usr/bin/env python3
"""Import a ForMyChess browser save or save bundle into data/games/.

Usage:
    python tools/import_browser_save.py path/to/game.json
    python tools/import_browser_save.py path/to/formychess-save-YYYY-MM-DD.json

The importer never overwrites an existing game file unless --force is supplied.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path


def load_games(path: Path) -> list[dict]:
    payload = json.loads(path.read_text(encoding="utf-8"))
    if isinstance(payload, dict) and payload.get("format") == "ForMyChess-save-bundle":
        games = payload.get("games", [])
    elif isinstance(payload, dict) and payload.get("game_id"):
        games = [payload]
    else:
        raise ValueError("Not a ForMyChess single-game save or save bundle")
    if not games:
        raise ValueError("Save contains no games")
    return games


def validate_minimum(game: dict) -> None:
    required = ["schema_version", "game_id", "source", "player", "pgn", "observations", "game_summary"]
    missing = [key for key in required if key not in game]
    if missing:
        raise ValueError(f"{game.get('game_id', '<unknown>')}: missing {', '.join(missing)}")
    if not isinstance(game.get("game_id"), str) or len(game["game_id"]) < 8:
        raise ValueError("game_id must be a non-trivial string")
    if not isinstance(game.get("pgn"), str) or len(game["pgn"]) < 20:
        raise ValueError(f"{game['game_id']}: PGN is missing or too short")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("save", type=Path)
    parser.add_argument("--out-dir", type=Path, default=Path("data/games"))
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    games = load_games(args.save)
    args.out_dir.mkdir(parents=True, exist_ok=True)
    written = 0
    skipped = 0
    for game in games:
        validate_minimum(game)
        target = args.out_dir / f"{game['game_id']}.json"
        if target.exists() and not args.force:
            print(f"SKIP {target} (already exists)")
            skipped += 1
            continue
        target.write_text(json.dumps(game, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"WRITE {target}")
        written += 1
    print(f"Imported {written}; skipped {skipped}; total {len(games)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
