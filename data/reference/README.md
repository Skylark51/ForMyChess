# Reference chess data

ForMyChess keeps **personal games** and **reference chess knowledge** separate.

- `data/games/`: the user's own games; source of truth for weakness analysis.
- `reference-book.js`: a compact browser-ready reference corpus used by the offline AI.
- this directory: provenance and future import notes for larger reference corpora.

## Opening source

The standard opening names and representative sequences in `reference-book.js` are curated from the
[`lichess-org/chess-openings`](https://github.com/lichess-org/chess-openings) project.
That project is published under **CC0-1.0** and describes its PGN sequences as well-known/common
sequences based on master games.

Lichess database exports are also available for larger future experiments. Large PGN corpora should
be processed offline into a distilled position -> move book instead of being shipped directly in the
browser bundle.

## Famous model games

The reference corpus also contains compact move trajectories from three historically famous games in
which Black won. This matters because the current Arena AI plays Black.

1. **Karpov–Kasparov, World Championship 1985 Game 16 (B44, 0-1)**
   - model: protected knight outpost / restriction
   - key moment: `16...Nd3`
   - verification source: https://chesstrapguide.com/learn/karpov-kasparov-1985-game-16-pgn/

2. **Byrne–Fischer, New York 1956 (D92, 0-1)**
   - model: initiative, coordination and tactical conversion
   - key moment: `17...Be6`
   - verification source: https://www.chessworld.net/chessclubs/openingguide/game-of-the-century.asp

3. **Marshall–Capablanca, New York 1909 Game 23 (D33, 0-1)**
   - model: outside majority, active rook and technical conversion
   - verification source: https://www.redhotpawn.com/forum/only-chess/past-great-players.203564

These are stored as move sequences, not copied annotations. When a live game reaches a matching
position through the same reference trajectory, the AI can continue with the historical Black move.
If the player leaves the reference path, normal search immediately takes over.

## AI usage

The browser AI combines:

1. position-key reference move selection from the opening and model-game corpus;
2. iterative-deepening alpha-beta search with a time budget;
3. quiescence search on tactical leaf positions;
4. positional evaluation (material, center, development, mobility, pawn structure, bishop pair,
   rook files, king safety and endgame king activity).

The repository intentionally does not vendor a huge master database. The compact corpus keeps
`index.html` directly runnable while still giving the AI real master-game patterns to follow.
