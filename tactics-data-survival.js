window.FMC_TACTICS = window.FMC_TACTICS || {};
window.FMC_TACTICS.survival = {
  "name": "사활",
  "kicker": "SURVIVAL · ONLY MOVE",
  "description": "한 수만 잘못 두면 메이트, 퀸 손실, 승격을 허용하는 포지션. “상대의 최강수”를 먼저 찾는 강제 훈련입니다.",
  "puzzles": [
    {
      "id": "s-backrank-only",
      "title": "백랭크 메이트를 끊는 한 수",
      "fen": "4r1k1/5ppp/8/2b5/8/8/5PPP/4R1K1 w - - 0 30",
      "prompt": "흑의 ...Re1# 위협이 보입니다. 공격 수를 두면 바로 끝납니다. 메이트 네트를 끊으세요.",
      "sub": "사활에서는 “내가 무엇을 하고 싶은가?”보다 “상대가 다음 수에 무엇을 강제하는가?”가 먼저입니다.",
      "best": ["h2h3"],
      "bestLabel": "h3!",
      "bestEval": "ONLY",
      "hint": "왕에게 h2 탈출 칸을 만들어 주세요.",
      "success": "h3!로 백랭크 메이트 구조를 끊었습니다.",
      "lesson": "메이트 위협이 있으면 다른 모든 계획은 일시 중지입니다.",
      "wrong": {
        "e1e8": {"label":"Rxe8+","grade":"blunder","delta":"MATE","text":"Rxe8+는 블런더입니다. 교환 뒤 왕의 탈출 칸이 없어 백랭크 메이트 계열을 허용합니다.","why":"사활 문제에서는 체크를 두는 것만으로 안전하다고 판단하면 안 됩니다."},
        "f2f3": {"label":"f3","grade":"blunder","delta":"MATE","text":"f3는 메이트 위협을 충분히 끊지 못합니다.","why":"왕이 실제로 이동할 수 있는 탈출 칸을 하나 만들어야 합니다."}
      }
    },
    {
      "id": "s-queen-save",
      "title": "핀 때문에 퀸이 떨어지는 것을 막기",
      "fen": "3q2k1/5ppp/8/4p3/6b1/5N2/6PP/3Q2K1 w - - 0 21",
      "prompt": "f3 나이트가 g4 비숍에 의해 d1 퀸과 같은 대각선에 묶였고 e5 폰이 f4/d4를 장악합니다. 핀을 즉시 해체하세요.",
      "sub": "한 템포 늦으면 ...e4 또는 ...Bxf3 후 퀸 라인이 무너집니다.",
      "best": ["d1a4"],
      "bestLabel": "Qa4",
      "bestEval": "ONLY",
      "hint": "퀸을 g4 비숍의 대각선에서 빼세요.",
      "success": "Qa4로 퀸을 핀 라인에서 분리해 f3 나이트가 다시 움직일 수 있게 했습니다.",
      "lesson": "relative pin의 뒤에 퀸이 있으면, 퀸을 라인에서 빼는 것이 가장 단순한 해법이 될 수 있습니다.",
      "wrong": {
        "f3e5": {"label":"Ne5","grade":"blunder","delta":"-8.00","text":"Ne5는 즉시 퀸을 노출합니다. ...Bxd1로 퀸이 떨어집니다.","why":"핀된 기물은 뒤의 고가치 기물 때문에 사실상 움직이지 못합니다."},
        "h2h3": {"label":"h3","grade":"blunder","delta":"-4.00","text":"h3는 비숍을 묻지만 흑은 먼저 ...Bxf3로 구조와 퀸 라인을 이용할 수 있습니다.","why":"공격자를 쫓는 것보다 핀의 뒤 기물을 안전하게 만드는 것이 급합니다."}
      }
    },
    {
      "id": "s-promotion-stop",
      "title": "승격을 멈추는 유일한 파일",
      "fen": "6k1/8/8/8/8/3p4/8/4R1K1 w - - 0 40",
      "prompt": "흑 d폰이 d2-d1=Q를 노립니다. 체크를 반복할 시간이 없습니다. 룩을 정확한 파일에 두세요.",
      "sub": "사활 엔드게임: 목표는 왕이 아니라 승격 칸입니다.",
      "best": ["e1d1"],
      "bestLabel": "Rd1!",
      "bestEval": "ONLY",
      "hint": "d1 승격 칸을 룩으로 점유하세요.",
      "success": "Rd1!로 승격 칸을 직접 막았습니다.",
      "lesson": "패스폰이 2랭크/7랭크에 오면 체크보다 승격 칸 통제가 우선입니다.",
      "wrong": {
        "e1e8": {"label":"Re8+","grade":"blunder","delta":"-6.00","text":"Re8+는 체크지만 ...d2-d1=Q가 다음에 들어옵니다.","why":"체크가 목표를 늦추지 못하면 무의미합니다."}
      }
    },
    {
      "id": "s-knight-royal-fork",
      "title": "로열 포크를 없애는 한 수",
      "fen": "r3r1k1/pppq1ppp/2p2n2/3p4/3P1n2/2P1PN2/PP3PPP/R1Q2RK1 w - - 0 16",
      "prompt": "...Ne2+가 오면 왕과 퀸이 동시에 맞습니다. 수비가 아니라 제거가 필요합니다.",
      "sub": "사활 전술: 다음 체크가 재료 손실까지 강제하면 그 체크를 존재하지 않게 만들어야 합니다.",
      "best": ["e3f4"],
      "bestLabel": "exf4!",
      "bestEval": "ONLY",
      "hint": "f4 나이트를 잡으세요.",
      "success": "exf4!로 로열 포크 기물을 제거했습니다.",
      "lesson": "왕+퀸 포크는 단순 체크보다 훨씬 비싸므로 최우선으로 처리합니다.",
      "wrong": {
        "c1d2": {"label":"Qd2","grade":"blunder","delta":"-3.20","text":"Qd2로 퀸을 피하는 것만으로는 f4 나이트가 체크와 다른 포크를 계속 만듭니다.","why":"위협의 근원을 잡을 수 있을 때는 잡는 것이 가장 확실합니다."},
        "h2h3": {"label":"h3","grade":"blunder","delta":"-4.10","text":"h3는 완전히 느립니다. ...Ne2+가 즉시 들어옵니다.","why":"forcing check 위협을 무시했습니다."}
      }
    },
    {
      "id": "s-king-check-block",
      "title": "체크를 막으면서 퀸도 지키기",
      "fen": "4r1k1/8/8/8/8/8/4QPPP/4K3 w - - 0 32",
      "prompt": "e파일 룩이 e1 왕을 향해 압박합니다. 퀸을 이용해 체크 라인을 끊고 교환을 유도하세요.",
      "sub": "사활에서는 한 수가 체크 해결과 기물 보호를 동시에 해야 하는 경우가 많습니다.",
      "best": ["e2e3"],
      "bestLabel": "Qe3!",
      "bestEval": "ONLY",
      "hint": "e파일에서 룩의 선을 퀸으로 막으세요.",
      "success": "Qe3!로 e파일을 차단하고 룩 교환 가능성을 만들었습니다.",
      "lesson": "체크 대응은 왕 이동, 잡기, 막기 세 종류를 모두 검사합니다.",
      "wrong": {
        "e1d2": {"label":"Kd2","grade":"blunder","delta":"-5.00","text":"Kd2는 왕이 노출되고 퀸도 e2에서 느슨하게 남습니다.","why":"왕 이동만 보지 말고 blocking move를 찾으세요."},
        "e2a6": {"label":"Qa6","grade":"blunder","delta":"MATE","text":"퀸을 공격에 보내면 e파일 압박이 그대로 남아 메이트 네트에 들어갑니다.","why":"체크/메이트 위협 중에는 공격 계획을 멈춥니다."}
      }
    },
    {
      "id": "s-rook-fork-separate",
      "title": "나이트 포크 기하에서 룩 빼기",
      "fen": "6k1/5ppp/8/8/7n/8/3R1PPP/6K1 w - - 0 30",
      "prompt": "...Nf3+가 왕과 룩을 동시에 공격합니다. 나이트를 못 잡으니 룩을 유일한 안전 칸으로 빼세요.",
      "sub": "위협을 직접 막을 수 없으면 포크 대상 둘 중 하나를 네트워크 밖으로 이동시킵니다.",
      "best": ["d2d1"],
      "bestLabel": "Rd1!",
      "bestEval": "ONLY",
      "hint": "f3 나이트가 공격하지 않는 d1로 룩을 이동하세요.",
      "success": "Rd1!로 포크 기하를 깨뜨렸습니다.",
      "lesson": "포크는 “공격자”뿐 아니라 “두 대상의 위치 관계”를 바꿔서도 막을 수 있습니다.",
      "wrong": {
        "h2h3": {"label":"h3","grade":"blunder","delta":"-3.00","text":"h3는 나이트를 쫓기 전에 ...Nf3+가 먼저 들어옵니다.","why":"체크가 있는 forcing move는 템포 싸움에서 우선합니다."},
        "f2f3": {"label":"f3","grade":"blunder","delta":"-2.50","text":"f3는 포크 칸을 내 폰으로 점유하지만 나이트는 그 폰을 잡으며 체크할 수 있습니다.","why":"착지 칸에 내 기물이 있다고 안전한 것이 아닙니다."}
      }
    },
    {
      "id": "s-hanging-bishop-only",
      "title": "기물 손실을 막는 즉시 후퇴",
      "fen": "r1bqk2r/pppp1ppp/5n2/n3p1N1/2BP4/8/PPP2PPP/RNBQK2R w KQkq - 3 6",
      "prompt": "c4 비숍이 a5 나이트에게 걸렸습니다. 다른 모든 수는 기물 손실입니다.",
      "sub": "사활식으로 다시 풀면, 초급에서 배운 “공격받은 기물 먼저”를 자동 반응으로 만듭니다.",
      "best": ["c4d3"],
      "bestLabel": "Bd3!",
      "bestEval": "ONLY",
      "hint": "비숍을 안전한 중앙 칸으로 옮기세요.",
      "success": "Bd3!로 기물을 보존했습니다.",
      "lesson": "기물 하나가 공짜로 잡히는 상황에서는 포지셔널 계획이 거의 모두 무효입니다.",
      "wrong": {
        "b2b3": {"label":"b3","grade":"blunder","delta":"-3.00","text":"b3는 바로 ...Nxc4를 허용합니다.","why":"스크린샷과 같은 유형입니다. 공격받은 기물을 무시했습니다."},
        "e1g1": {"label":"O-O","grade":"blunder","delta":"-3.00","text":"O-O도 ...Nxc4를 막지 못합니다.","why":"좋은 원칙 수여도 기물 손실을 막지 못하면 탈락입니다."}
      }
    },
    {
      "id": "s-passed-pawn-protect",
      "title": "캐슬링보다 패스폰 생존",
      "fen": "1r2k3/1Pq5/8/8/8/8/4PPPP/R3K2R w KQ - 0 18",
      "prompt": "b7 폰이 떨어지면 승리 플랜 자체가 사라집니다. 지금은 왕 안전보다 폰을 지키는 한 수가 먼저입니다.",
      "sub": "스크린샷의 O-O 실수를 사활 형식으로 반복합니다.",
      "best": ["a1b1"],
      "bestLabel": "Rb1!",
      "bestEval": "ONLY",
      "hint": "a1 룩을 b파일로 이동하세요.",
      "success": "Rb1!로 패스폰을 뒤에서 지켜 승격 가능성을 유지했습니다.",
      "lesson": "포지션의 핵심 자산이 하나뿐이면, 그 자산을 잃지 않는 수가 우선입니다.",
      "wrong": {
        "e1g1": {"label":"O-O","grade":"blunder","delta":"-1.80","text":"O-O는 왕은 안전하게 하지만 ...Rxb7로 핵심 패스폰을 잃습니다.","why":"원칙 수를 자동으로 두지 말고 포지션의 핵심 자산을 확인하세요."},
        "h2h3": {"label":"h3","grade":"blunder","delta":"-1.60","text":"h3는 너무 느립니다. ...Rxb7가 즉시 가능합니다.","why":"hanging pawn을 먼저 해결해야 합니다."}
      }
    }
  ]
};