#!/usr/bin/env python3
"""Build a derived weakness profile and problem queue from immutable game records.

The output is intentionally derived data. Source-of-truth lives only in data/games/*.json.
"""
from __future__ import annotations

import argparse
import json
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GAMES = ROOT / "data" / "games"
CONF_WEIGHT = {"low": 0.35, "medium": 0.7, "high": 1.0}


def load_games() -> list[dict]:
    return [json.loads(p.read_text(encoding="utf-8")) for p in sorted(GAMES.glob("*.json"))]


def build(games: list[dict]) -> dict:
    tag_scores = Counter()
    tag_games: dict[str, set[str]] = defaultdict(set)
    examples: dict[str, list[dict]] = defaultdict(list)
    strengths = Counter()
    review_queue = []

    for game in games:
        gid = game["game_id"]
        for obs in game.get("observations", []):
            if obs["kind"] == "weakness":
                weight = obs["severity"] * CONF_WEIGHT[obs["confidence"]]
                for tag in obs["tags"]:
                    tag_scores[tag] += weight
                    tag_games[tag].add(gid)
                    examples[tag].append({
                        "game_id": gid,
                        "move": obs["move"],
                        "summary": obs["summary"],
                        "training_rule": obs["training_rule"],
                        "severity": obs["severity"],
                        "confidence": obs["confidence"]
                    })
            elif obs["kind"] == "strength":
                for tag in obs["tags"]:
                    strengths[tag] += obs["severity"] * CONF_WEIGHT[obs["confidence"]]
            else:
                review_queue.append({
                    "game_id": gid,
                    "move": obs["move"],
                    "summary": obs["summary"],
                    "tags": obs["tags"]
                })

    ranked = []
    for tag, score in tag_scores.most_common():
        games_seen = len(tag_games[tag])
        recurrence_bonus = max(0, games_seen - 1) * 2.0
        ranked.append({
            "tag": tag,
            "score": round(score + recurrence_bonus, 2),
            "games_seen": games_seen,
            "examples": sorted(examples[tag], key=lambda x: (-x["severity"], x["game_id"]))[:5]
        })
    ranked.sort(key=lambda x: (-x["score"], -x["games_seen"], x["tag"]))

    problems = []
    for item in ranked:
        for ex in item["examples"][:2]:
            problems.append({
                "type": "habit_prompt",
                "weakness_tag": item["tag"],
                "source_game": ex["game_id"],
                "source_move": ex["move"],
                "prompt": ex["training_rule"],
                "context": ex["summary"],
                "answer_mode": "self_check_rule"
            })

    return {
        "derived": True,
        "source_game_count": len(games),
        "weakness_profile": ranked,
        "strength_profile": [
            {"tag": tag, "score": round(score, 2)} for tag, score in strengths.most_common()
        ],
        "review_queue": review_queue,
        "problem_queue": problems
    }


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", type=Path, help="optional output path; otherwise print JSON")
    args = ap.parse_args()
    result = build(load_games())
    text = json.dumps(result, ensure_ascii=False, indent=2) + "\n"
    if args.out:
        args.out.parent.mkdir(parents=True, exist_ok=True)
        args.out.write_text(text, encoding="utf-8")
    else:
        print(text, end="")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
