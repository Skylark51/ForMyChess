/*
 * ForMyChess reference book
 * Opening names / canonical sequences are derived from the CC0 lichess-org/chess-openings dataset.
 * https://github.com/lichess-org/chess-openings
 */
window.FOR_MY_CHESS_REFERENCE = Object.freeze({
  version: 1,
  source: {
    name: 'lichess-org/chess-openings',
    license: 'CC0-1.0',
    url: 'https://github.com/lichess-org/chess-openings'
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
    { eco: 'E00', name: 'Catalan Opening', weight: 8, moves: 'd2d4 g8f6 c2c4 e7e6 g2g3 d7d5 f1g2 f8e7 g1f3 e8g8 e1g1' }
  ],
  referenceNotes: [
    {
      label: 'Karpov–Kasparov, World Championship 1985 Game 16',
      phase: 'middlegame',
      motif: 'protected knight outpost / restriction',
      keyMove: '16...Nd3',
      fenAfter: 'r2qr1k1/5ppp/p4n2/1pbP1bB1/8/N1Nn1B2/PP1Q1PPP/3R1RK1 w - - 2 17'
    },
    {
      label: 'Byrne–Fischer, New York 1956',
      phase: 'middlegame',
      motif: 'initiative, development and tactical conversion',
      result: '0-1'
    }
  ]
});
