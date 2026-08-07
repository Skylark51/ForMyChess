# Reference chess data

ForMyChess keeps **personal games** and **reference chess knowledge** separate.

- `data/games/`: the user's own games; source of truth for weakness analysis.
- `reference-book.js`: a small browser-ready opening book used by the offline AI.
- this directory: provenance and future import notes for larger reference corpora.

## Current source

The opening names and representative opening sequences in `reference-book.js` are curated from the
[`lichess-org/chess-openings`](https://github.com/lichess-org/chess-openings) project.
That project is published under **CC0-1.0** and describes its PGN sequences as well-known/common
sequences based on master games.

Lichess database exports are also available for larger future experiments. Standard game exports,
positions/evaluations and other database material are published from `database.lichess.org`; verify
the license of the specific export type before importing it.

## Why the repository does not vendor a huge PGN dump

ForMyChess is designed to open directly from `index.html`. Shipping millions of games would make the
repository and browser startup unnecessarily heavy. The browser therefore uses a compact reference
book, while larger PGN corpora should be processed offline into a distilled position -> move book or
training catalog.

## AI usage

The browser AI currently combines:

1. reference-book move selection when the current position matches a known opening position;
2. iterative-deepening alpha-beta search with a time budget;
3. quiescence search on tactical leaf positions;
4. positional evaluation (material, center, development, mobility, pawn structure, bishop pair,
   rook files, king safety and endgame king activity).

Reference moves are hints, not hard-coded forced play. Once a player leaves the known book position,
the search engine takes over.
