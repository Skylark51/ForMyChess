# Personal chess data architecture

`data/games/` is the source-of-truth personal chess database. It is **not** a training-set directory.

## Why one file per game

Each game is stored as an append-only JSON document whose filename equals `game_id`.
This means two games can be added on separate branches at the same time without both writers editing one shared database file. Git usually merges the additions without a content conflict.

Do **not** maintain a hand-edited global `games.json` or weakness counter. Global profiles are derived from the independent game documents.

## Layers

1. **Raw game record** — PGN, metadata, normalization notes.
2. **Observations** — tactical/technical strengths, weaknesses and positions that still need engine verification.
3. **Derived profile** — aggregate recurring weakness tags across all games.
4. **Training queue** — generated from the profile. It is disposable and can always be rebuilt.

The repository therefore separates evidence from pedagogy: a game can contain an observation without pretending that the observation itself is already a finished puzzle.

## Commands

```bash
python tools/validate_game_data.py
python tools/build_training_catalog.py
python tools/build_training_catalog.py --out /tmp/formychess-training.json
```

`build_training_catalog.py` never writes into `data/games/`.

## Confidence rule

- `high`: directly visible tactical/technical fact from the supplied game.
- `medium`: useful inference, but exact best play is not independently engine-verified.
- `low`: engine/Fritz flag retained for later verification; do not generate a tactical answer key from it yet.

Recurring weaknesses become more important automatically because the derived score includes a cross-game recurrence bonus.
