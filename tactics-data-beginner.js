window.FMC_TACTICS = window.FMC_TACTICS || {};
window.FMC_TACTICS.beginner = {
  "name": "초급",
  "kicker": "BASIC · ONE-MOVE HABITS",
  "description": "기물이 잡히는지, 포크가 오는지, 지금 당장 지켜야 할 것이 무엇인지부터 자동화합니다.",
  "puzzles": [
    {
      "id": "b-attacked-bishop",
      "title": "공격받은 비숍부터 처리",
      "fen": "r1bqk2r/pppp1ppp/5n2/n3p1N1/2BP4/8/PPP2PPP/RNBQK2R w KQkq - 3 6",
      "prompt": "흑 나이트 a5가 c4 비숍을 공격하고 있습니다. 느린 폰 수를 두기 전에 비숍을 살리세요.",
      "sub": "스크린샷의 b3 실수와 같은 유형: 공격받는 기물을 무시하면 다음 수에 그냥 잃습니다.",
      "best": ["c4d3"],
      "bestLabel": "Bd3",
      "bestEval": "+0.35",
      "hint": "c4 비숍을 중앙 대각선에 남기면서 안전한 칸으로 옮기세요.",
      "success": "Bd3로 비숍을 살리면서 h7 쪽 대각선과 중앙 영향력을 유지했습니다.",
      "lesson": "매 수 전 첫 질문: ‘내 기물 중 지금 공격받는 것은?’ 공격받는 기물을 해결한 뒤 계획을 세웁니다.",
      "wrong": {
        "b2b3": {"label":"b3","grade":"mistake","delta":"-0.82","text":"b3는 실수입니다. 비숍이 여전히 a5 나이트의 공격을 받고 있어 ...Nxc4로 기물 하나를 잃습니다.","why":"폰 수가 나쁜 것이 아니라, 더 급한 위협을 무시한 것이 문제입니다."},
        "b1c3": {"label":"Nc3","grade":"inaccuracy","delta":"-0.55","text":"Nc3는 자연스러워 보여도 우선순위가 틀렸습니다. c4 비숍이 먼저 걸려 있습니다.","why":"개발보다 hanging piece 처리가 먼저입니다."},
        "e1g1": {"label":"O-O","grade":"mistake","delta":"-0.74","text":"캐슬링 자체는 좋은 수지만 지금은 타이밍이 아닙니다. ...Nxc4가 바로 나옵니다.","why":"좋은 원칙도 즉시 전술보다 우선하지 않습니다."}
      }
    },
    {
      "id": "b-pinned-knight-pawn",
      "title": "핀 + 폰 공격을 동시에 보기",
      "fen": "r2qk2r/ppp2ppp/2n2n2/2bp4/4p1b1/2P1P3/PP1N1PPP/R1BQKBNR w KQkq - 0 7",
      "prompt": "g4 비숍의 대각선과 e4 폰의 공격 칸을 같이 보세요. g1 나이트를 무심코 f3에 두면 어떤 일이 생길까요?",
      "sub": "스크린샷의 Nf3 블런더처럼 ‘핀될 칸 + 폰이 때리는 칸’에 기물을 넣지 않는 훈련입니다.",
      "best": ["d2e4"],
      "bestLabel": "Nxe4",
      "bestEval": "+0.18",
      "hint": "e4 폰을 지금 제거할 수 있는 이미 개발된 나이트가 있습니다.",
      "success": "Nxe4로 f3를 때리던 폰을 제거하면서 중앙에 기물을 세웠습니다.",
      "lesson": "기물을 둘 칸을 볼 때는 상대 폰의 공격 칸과 핀 선을 동시에 확인합니다.",
      "wrong": {
        "g1f3": {"label":"Nf3","grade":"blunder","delta":"-2.07","text":"Nf3는 블런더입니다. e4 폰이 f3를 때리고 있고, g4 비숍 때문에 나이트가 d1 퀸과 같은 대각선에 묶입니다.","why":"상대는 ...exf3로 기물을 이기거나 핀을 이용해 압박을 늘릴 수 있습니다."},
        "a2a3": {"label":"a3","grade":"mistake","delta":"-0.96","text":"a3는 현재 위협과 무관합니다. e4 폰과 g4 비숍의 결합을 먼저 풀어야 합니다.","why":"상대의 즉시 위협이 있는 포지션에서 wing pawn move는 후순위입니다."}
      }
    },
    {
      "id": "b-c2-fork",
      "title": "c2 나이트 포크 사전 차단",
      "fen": "r1bqk2r/pppp1ppp/5n2/4p3/1nB1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 2 5",
      "prompt": "b4 나이트가 c2에 들어오면 체크와 함께 a1 룩까지 동시에 맞습니다. 한 수 전에 끊으세요.",
      "sub": "나이트 포크는 당한 뒤보다 착지하기 전에 쫓아내는 것이 가장 싸게 먹힙니다.",
      "best": ["a2a3"],
      "bestLabel": "a3",
      "bestEval": "+0.12",
      "hint": "a폰으로 b4 나이트를 직접 물을 수 있습니다.",
      "success": "a3로 b4 나이트를 공격해 Nxc2+ 경로를 제거했습니다.",
      "lesson": "왕이 e1에 남아 있을 때 c2/f2 같은 칸은 나이트 포크 경보 칸입니다.",
      "wrong": {
        "d2d3": {"label":"d3","grade":"mistake","delta":"-1.10","text":"d3는 개발 준비지만 ...Nxc2+를 막지 못합니다.","why":"상대의 다음 forcing move를 먼저 막아야 합니다."},
        "e1g1": {"label":"O-O","grade":"inaccuracy","delta":"-0.70","text":"캐슬링하면 왕 포크는 줄지만 a1 룩은 여전히 c2 나이트에 걸리고, 폰도 잃습니다.","why":"위협 기물 자체를 쫓아내는 a3가 더 직접적입니다."}
      }
    },
    {
      "id": "b-castle-hanging-pawn",
      "title": "자동 캐슬링 전에 hanging pawn 확인",
      "fen": "1r2k3/1Pq5/8/8/8/8/4PPPP/R3K2R w KQ - 0 18",
      "prompt": "b7 패스폰은 강하지만 b8 룩에게 바로 잡힐 수 있습니다. 왕부터 숨기기 전에 패스폰의 생존을 해결하세요.",
      "sub": "스크린샷의 O-O 실수처럼 ‘좋은 원칙 수’를 자동으로 두지 않는 훈련입니다.",
      "best": ["a1b1"],
      "bestLabel": "Rb1",
      "bestEval": "+0.82",
      "hint": "a1 룩을 b파일에 두면 b7 폰을 뒤에서 지킬 수 있습니다.",
      "success": "Rb1로 b7 폰을 전술적으로 지켰습니다. ...Rxb7이면 Rxb7로 되받을 수 있습니다.",
      "lesson": "캐슬링 전에도 CCT를 봅니다. 특히 멀리 전진한 패스폰과 느슨한 기물을 먼저 확인하세요.",
      "wrong": {
        "e1g1": {"label":"O-O","grade":"mistake","delta":"+0.82","text":"O-O는 실수입니다. 왕은 안전해지지만 b7 폰이 ...Rxb7로 공짜로 떨어집니다.","why":"포지션 원칙보다 즉시 재료 손실 방지가 먼저입니다."},
        "h2h3": {"label":"h3","grade":"mistake","delta":"-0.65","text":"h3는 아무 위협도 해결하지 못합니다. b7 폰이 지금 매달려 있습니다.","why":"loose piece/pawn scan을 먼저 하세요."}
      }
    },
    {
      "id": "b-f2-fork",
      "title": "f2 퀸·룩 포크 경보",
      "fen": "r1bqk2r/pppp1ppp/2n5/4p3/2B1P1n1/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 2 5",
      "prompt": "g4 나이트가 f2에 들어가면 d1 퀸과 h1 룩을 동시에 공격합니다.",
      "sub": "상대 나이트의 착지 칸을 먼저 세는 습관을 만듭니다.",
      "best": ["h2h3"],
      "bestLabel": "h3",
      "bestEval": "+0.22",
      "hint": "h폰으로 g4 나이트를 직접 쫓아낼 수 있습니다.",
      "success": "h3로 나이트를 쫓아내 Nxf2 포크를 삭제했습니다.",
      "lesson": "나이트가 내 퀸과 룩을 한 번에 칠 수 있는 칸이 있으면 그 착지 칸은 즉시 대응 대상입니다.",
      "wrong": {
        "d2d3": {"label":"d3","grade":"mistake","delta":"-1.40","text":"d3는 자연스럽지만 Nxf2가 그대로 남습니다.","why":"포크 위협은 개발 수보다 우선합니다."},
        "c4b3": {"label":"Bb3","grade":"mistake","delta":"-1.25","text":"Bb3는 비숍을 피하는 수지만 Nxf2 포크를 막지 못합니다.","why":"기물 개선보다 내 고가치 기물 두 개가 동시에 걸리는 문제를 먼저 해결하세요."}
      }
    },
    {
      "id": "b-queen-line",
      "title": "대각선 끝의 퀸을 놓치지 않기",
      "fen": "r3k2r/ppp2ppp/2n5/3p4/6b1/8/PPPN1PPP/R1BQKBNR w KQkq - 0 8",
      "prompt": "g4 비숍의 대각선을 끝까지 따라가 보세요. f3-e2-d1에 무엇이 있나요?",
      "sub": "상대 장거리 기물은 ‘중간 칸’이 아니라 대각선 끝의 고가치 기물까지 확인합니다.",
      "best": ["d1g4"],
      "bestLabel": "Qxg4",
      "bestEval": "+1.20",
      "hint": "d1 퀸과 g4 비숍 사이가 비어 있습니다. 잡을 수 있는지 확인하세요.",
      "success": "Qxg4로 공격 중인 비숍을 그냥 제거했습니다.",
      "lesson": "장거리 기물의 라인을 보자마자 공격자·차단물·끝 기물을 순서대로 확인합니다.",
      "wrong": {
        "g1f3": {"label":"Nf3","grade":"blunder","delta":"-1.80","text":"Nf3는 비숍과 퀸 사이에 나이트를 끼워 넣어 스스로 핀을 만듭니다.","why":"공격 중인 비숍을 직접 잡을 수 있는데 굳이 핀 구조를 만들 필요가 없습니다."},
        "a2a3": {"label":"a3","grade":"mistake","delta":"-1.05","text":"a3는 비숍의 대각선 문제와 무관합니다.","why":"먼저 상대 기물이 내 퀸을 향한 선을 갖고 있는지 봅니다."}
      }
    },
    {
      "id": "b-recapture",
      "title": "잡힌 기물은 즉시 되잡기",
      "fen": "r1bqk2r/pppp1ppp/5n2/4p3/2n1P3/1P3N2/P1PP1PPP/RNBQK2R w KQkq - 0 7",
      "prompt": "흑 나이트가 c4에 들어와 비숍을 잡았습니다. 다른 계획을 시작하기 전에 재료를 복구하세요.",
      "sub": "‘상대가 방금 무엇을 했는가?’를 매 수 확인하는 가장 기초적인 습관입니다.",
      "best": ["b3c4"],
      "bestLabel": "bxc4",
      "bestEval": "+0.05",
      "hint": "b3 폰이 c4의 나이트를 잡을 수 있습니다.",
      "success": "bxc4로 즉시 되잡아 재료 균형을 회복했습니다.",
      "lesson": "상대 수 직후에는 체크 여부, 잡힌 기물, 새로 생긴 공격부터 확인합니다.",
      "wrong": {
        "e1g1": {"label":"O-O","grade":"blunder","delta":"-2.40","text":"O-O를 먼저 하면 c4 나이트를 되잡을 기회를 놓치고 기물 하나가 사라집니다.","why":"recapture는 대개 원칙적 개발보다 우선합니다."},
        "d2d3": {"label":"d3","grade":"blunder","delta":"-2.20","text":"d3는 너무 느립니다. 지금 c4 나이트가 공짜로 잡힙니다.","why":"상대의 마지막 수를 처리하지 않고 새 계획을 시작했습니다."}
      }
    },
    {
      "id": "b-backrank-luft",
      "title": "공짜 폰보다 왕의 숨구멍",
      "fen": "3r2k1/5ppp/8/8/8/6P1/5P1P/3R2K1 w - - 0 24",
      "prompt": "백 왕은 g1에 있고 2랭크 폰들이 탈출 칸을 막고 있습니다. 룩끼리 맞붙기 전에 메이트 네트를 끊으세요.",
      "sub": "초급 단계에서는 ‘내 왕에게 탈출 칸이 있는가?’만 체크해도 백랭크 사고가 크게 줄어듭니다.",
      "best": ["h2h3"],
      "bestLabel": "h3",
      "bestEval": "+0.10",
      "hint": "h폰을 한 칸 움직여 왕의 h2 탈출 칸을 여세요.",
      "success": "h3로 h2 칸을 왕의 탈출 칸으로 만들었습니다.",
      "lesson": "룩과 퀸이 열린 파일에 모이면 백랭크 메이트 가능성을 먼저 봅니다.",
      "wrong": {
        "d1d7": {"label":"Rd7","grade":"blunder","delta":"-3.00","text":"Rd7은 활동적으로 보이지만 ...Rxd7로 룩을 그냥 잃습니다.","why":"상대 룩의 공격선과 내 왕의 escape square를 함께 확인하세요."},
        "f2f3": {"label":"f3","grade":"inaccuracy","delta":"-0.45","text":"f3도 공간을 만들지만 왕의 즉시 탈출 칸을 가장 단순하게 만드는 h3가 더 명확합니다.","why":"왕 옆 폰 하나로 바로 루프트를 만드는 패턴을 익히세요."}
      }
    }
  ]
};