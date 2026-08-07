/*
 * ForMyChess reference book
 * Compact opening + model-game corpus for the browser AI.
 * Provenance and licensing notes: data/reference/README.md
 */
window.FOR_MY_CHESS_REFERENCE = Object.freeze({
  version: 2,
  source: {
    name: 'ForMyChess mixed reference corpus',
    license: 'mixed; see data/reference/README.md',
    url: 'data/reference/README.md'
  },
  openings: [
    { eco: 'C50', name: 'Italian Game', weight: 10, moves: 'e2e4 e7e5 g1f3 b8c6 f1c4 g8f6 d2d3 f8c5 c2c3 d7d6 e1g1 e8g8' },
    { eco: 'C60', name: 'Ruy Lopez', weight: 10, moves: 'e2e4 e7e5 g1f3 b8c6 f1b5 a7a6 b5a4 g8f6 e1g1 f8e7 f1e1 b7b5 a4b3 d7d6 c2c3 e8g8' },
    { eco: 'C45', name: 'Scotch Game', weight: 7, moves: 'e2e4 e7e5 g1f3 b8c6 d2d4 e5d4 f3d4 g8f6 b1c3 f8b4' },
    { eco: 'B12', name: 'Caro-Kann Defense', weight: 10, moves: 'e2e4 c7c6 d2d4 d7d5 b1c3 d5e4 c3e4 c8f5 e4g3 f5g6' },
    { eco: 'B12', name: 'Caro-Kann Defense: Advance', weight: 8, moves: 'e2e4 c7c6 d2d4 d7d5 e4e5 c8f5 g1f3 e7e6 f1e2 c6c5' },
    { eco: 'C11', name: 'French Defense', weight: 9, moves: 'e2e4 e7e6 d2d4 d7d5 b1c3 g8f6 e4e5 f6d7 g1f3 c7c5' },
    { eco: 'B90', name: 'Sicilian Defense: Najdorf', weight: 11, moves: 'e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 a7a6' },
    { eco: 'B56', name: 'Sicilian Defense: Classical', weight: 8, moves: 'e2e4 c7c5 g1f3 b8c6 d2d4 c5d4 f3d4 g8f6 b1c3 d7d6' },
    { eco: 'B70', name: 'Sicilian Defense: Dragon', weight: 8, moves: 'e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 g7g6' },
    { eco: 'D30', name: "Queen's Gambit Declined", weight: 10, moves: 'd2d4 d7d5 c2c4 e7e6 b1c3 g8f6 c1g5 f8e7 e2e3 e8g8 g1f3 h7h6' },
    { eco: 'D10', name: 'Slav Defense', weight: 9, moves: 'd2d4 d7d5 c2c4 c7c6 g1f3 g8f6 b1c3 d5c4 a2a4 c8f5' },
    { eco: 'E60', name: "King's Indian Defense", weight: 10, moves: 'd2d4 g8f6 c2c4 g7g6 b1c3 f8g7 e2e4 d7d6 g1f3 e8g8' },
    { eco: 'E20', name: 'Nimzo-Indian Defense', weight: 10, moves: 'd2d4 g8f6 c2c4 e7e6 b1c3 f8b4 e2e3 e8g8 f1d3 d7d5 g1f3 c7c5' },
    { eco: 'D80', name: 'Grünfeld Defense', weight: 8, moves: 'd2d4 g8f6 c2c4 g7g6 b1c3 d7d5 c4d5 f6d5 e2e4 d5c3 b2c3 f8g7' },
    { eco: 'A28', name: 'English Opening', weight: 7, moves: 'c2c4 e7e5 b1c3 g8f6 g1f3 b8c6 g2g3 d7d5 c4d5 f6d5 f1g2' },
    { eco: 'A05', name: 'Réti Opening', weight: 6, moves: 'g1f3 d7d5 g2g3 g8f6 f1g2 g7g6 e1g1 f8g7 d2d3 e8g8' },
    { eco: 'D02', name: 'London System', weight: 8, moves: 'd2d4 d7d5 g1f3 g8f6 c1f4 e7e6 e2e3 c7c5 c2c3 b8c6' },
    { eco: 'E00', name: 'Catalan Opening', weight: 8, moves: 'd2d4 g8f6 c2c4 e7e6 g2g3 d7d5 f1g2 f8e7 g1f3 e8g8 e1g1' },

    { eco: 'B44', name: 'MODEL · Karpov–Kasparov 1985 Game 16', weight: 7, moves: 'e2e4 c7c5 g1f3 e7e6 d2d4 c5d4 f3d4 b8c6 d4b5 d7d6 c2c4 g8f6 b1c3 a7a6 b5a3 d6d5 c4d5 e6d5 e4d5 c6b4 f1e2 f8c5 e1g1 e8g8 e2f3 c8f5 c1g5 f8e8 d1d2 b7b5 a1d1 b4d3 a3b1 h7h6 g5h4 b5b4 c3a4 c5d6 h4g3 a8c8 b2b3 g7g5 g3d6 d8d6 g2g3 f6d7 f3g2 d6f6 a2a3 a6a5 a3b4 a5b4 d2a2 f5g6 d5d6 g5g4 a2d2 g8g7 f2f3 f6d6 f3g4 d6d4 g1h1 d7f6 f1f4 f6e4 d2d3 e4f2 f4f2 g6d3 f2d2 d4e3 d2d3 c8c1 a4b2 e3f2 b1d2 c1d1 b2d1 e8e1' },
    { eco: 'D92', name: 'MODEL · Byrne–Fischer 1956', weight: 7, moves: 'g1f3 g8f6 c2c4 g7g6 b1c3 f8g7 d2d4 e8g8 c1f4 d7d5 d1b3 d5c4 b3c4 c7c6 e2e4 b8d7 a1d1 d7b6 c4c5 c8g4 f4g5 b6a4 c5a3 a4c3 b2c3 f6e4 g5e7 d8b6 f1c4 e4c3 e7c5 f8e8 e1f1 g4e6 c5b6 e6c4 f1g1 c3e2 g1f1 e2d4 f1g1 d4e2 g1f1 e2c3 f1g1 a7b6 a3b4 a8a4 b4b6 c3d1 h2h3 a4a2 g1h2 d1f2 h1e1 e8e1 b6d8 g7f8 f3e1 c4d5 e1f3 f2e4 d8b8 b7b5 h3h4 h7h5 f3e5 g8g7 h2g1 f8c5 g1f1 e4g3 f1e1 c5b4 e1d1 d5b3 d1c1 g3e2 c1b1 e2c3 b1c1 a2c2' },
    { eco: 'D33', name: 'MODEL · Marshall–Capablanca 1909 Game 23', weight: 7, moves: 'd2d4 d7d5 c2c4 e7e6 b1c3 c7c5 c4d5 e6d5 g1f3 b8c6 g2g3 c8e6 f1g2 f8e7 e1g1 g8f6 c1g5 f6e4 g5e7 d8e7 f3e5 c6d4 c3e4 d5e4 e2e3 d4f3 e5f3 e4f3 d1f3 e8g8 f1c1 a8b8 f3e4 e7c7 c1c3 b7b5 a2a3 c5c4 g2f3 f8d8 a1d1 d8d1 f3d1 b8d8 d1f3 g7g6 e4c6 c7e5 c6e4 e5e4 f3e4 d8d1 g1g2 a7a5 c3c2 b5b4 a3b4 a5b4 e4f3 d1b1 f3e2 b4b3 c2d2 b1c1 e2d1 c4c3 b2c3 b3b2 d2b2 c1d1 b2c2 e6f5 c2b2 d1c1 b2b3 f5e4 g2h3 c1c2 f2f4 h7h5 g3g4 h5g4 h3g4 c2h2 b3b4 f7f5 g4g3 h2e2 b4c4 e2e3 g3h4 g8g7 c4c7 g7f6 c7d7 e4g2 d7d6 f6g7' }
  ],
  referenceNotes: [
    { label: 'Karpov–Kasparov, World Championship 1985 Game 16', phase: 'middlegame', motif: 'protected knight outpost / restriction', keyMove: '16...Nd3' },
    { label: 'Byrne–Fischer, New York 1956', phase: 'middlegame', motif: 'initiative, development and tactical conversion', keyMove: '17...Be6' },
    { label: 'Marshall–Capablanca, New York 1909 Game 23', phase: 'endgame', motif: 'outside majority / active rook / conversion', result: '0-1' }
  ]
});
