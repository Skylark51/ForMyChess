(() => {
  'use strict';

  const PIECES = {K:'♔',Q:'♕',R:'♖',B:'♗',N:'♘',P:'♙',k:'♚',q:'♛',r:'♜',b:'♝',n:'♞',p:'♟'};
  const FILES = 'abcdefgh';
  const STORE_KEY = 'formychess.knight-defense.v1';

  const DRILLS = [
    {
      id: 'c2-fork',
      title: 'c2 포크를 허용하지 않기',
      fen: 'r1bqk2r/pppp1ppp/5n2/4p3/1nB1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 2 5',
      knight: 'b4',
      landing: 'c2',
      prompt: '흑 나이트 b4가 c2로 들어오면 어떤 문제가 생기는지 먼저 보세요. 백이 지금 예방해야 합니다.',
      sub: 'c2의 나이트는 e1의 왕과 a1의 룩을 동시에 공격합니다.',
      hint: 'b4 나이트를 즉시 쫓아낼 수 있는 a폰의 한 칸 전진을 확인하세요.',
      accepted: ['a2a3'],
      success: '정확합니다. a3가 b4 나이트를 직접 공격해 Nxc2+ 포크가 나오기 전에 제거합니다.',
      rule: '왕이 e1에 남아 있을 때 c2는 대표적인 나이트 포크 착지 칸입니다.'
    },
    {
      id: 'f2-fork',
      title: 'f2의 퀸·룩 포크 차단',
      fen: 'r1bqk2r/pppp1ppp/2n5/4p3/2B1P1n1/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 2 5',
      knight: 'g4',
      landing: 'f2',
      prompt: 'g4 나이트의 다음 착지 칸을 세세요. f2에 들어오면 백의 두 고가치 기물이 동시에 걸립니다.',
      sub: 'Nxf2 이후 d1의 퀸과 h1의 룩이 동시에 공격받습니다.',
      hint: 'h폰을 한 칸 전진하면 g4 나이트를 바로 공격할 수 있습니다.',
      accepted: ['h2h3'],
      success: '좋습니다. h3로 나이트를 쫓아내면서 Nxf2 포크 자체를 삭제했습니다.',
      rule: 'f2/h1/d1 배치는 g4 나이트가 있을 때 항상 포크 경보 대상입니다.'
    },
    {
      id: 'e2-royal-fork',
      title: 'e2 왕·퀸 포크 제거',
      fen: 'r3r1k1/pppq1ppp/2p2n2/3p4/3P1n2/2P1PN2/PP3PPP/R1Q2RK1 w - - 0 16',
      knight: 'f4',
      landing: 'e2',
      prompt: '흑 나이트 f4가 e2에 착지하면 체크와 동시에 퀸까지 공격합니다. 한 수 안에 위협을 없애세요.',
      sub: 'Ne2+는 g1 왕과 c1 퀸을 동시에 공격하는 전형적인 로열 포크입니다.',
      hint: 'e3 폰이 f4 나이트를 지금 바로 잡을 수 있습니다.',
      accepted: ['e3f4'],
      success: '정답입니다. 포크 착지 칸을 막는 것보다 더 강한 방법은 위협 나이트를 즉시 제거하는 것입니다.',
      rule: '나이트가 왕과 퀸을 동시에 칠 수 있는 착지 칸이 보이면 우선순위가 최상위입니다.'
    },
    {
      id: 'e3-capture-fork',
      title: '잡으면서 들어오는 포크 읽기',
      fen: 'r2q1rk1/pp3ppp/2p1b3/3p4/2nP4/1PP1PN2/P1Q2PKP/R1B2R2 w - - 0 15',
      knight: 'c4',
      landing: 'e3',
      prompt: '이번에는 빈칸 착지가 아닙니다. c4 나이트가 e3의 폰을 잡으며 들어오는 순간을 계산하세요.',
      sub: 'Nxe3+ 후 g2 왕, c2 퀸, f1 룩이 한 번에 공격받습니다.',
      hint: 'b3 폰은 c4의 나이트를 지금 직접 잡을 수 있습니다.',
      accepted: ['b3c4'],
      success: '정확합니다. bxc4로 포크를 만드는 기물 자체를 없앴습니다. “잡으면서 포크”도 같은 방식으로 사전에 차단합니다.',
      rule: '착지 칸에 내 폰이 있다고 안전한 것이 아닙니다. 나이트는 캡처와 포크를 동시에 만들 수 있습니다.'
    },
    {
      id: 'd4-outpost',
      title: 'd4 중앙 나이트 즉시 도전',
      fen: 'r1bq1rk1/ppp2ppp/3p1n2/4p3/2BnP3/1PN2P2/P1PP2PP/R1BQ1RK1 w - - 0 9',
      knight: 'd4',
      landing: 'd4',
      prompt: '이미 d4에 들어온 나이트가 b3·c2·f3를 동시에 건드립니다. 이 칸을 영구 전초기지로 내주지 마세요.',
      sub: '첨부 장면과 같은 “중앙 나이트가 여러 약점을 동시에 건드리는” 형태를 직접 끊는 훈련입니다.',
      hint: 'c2 폰을 한 칸 전진하면 c3 폰이 d4를 직접 공격합니다.',
      accepted: ['c2c3'],
      success: '좋습니다. c3로 d4 전초기지를 폰으로 공격합니다. 중앙 나이트는 들어온 뒤보다 들어오기 전에 통제하는 것이 더 쉽습니다.',
      rule: 'd4/e4 같은 중앙 나이트는 공격 칸이 8개라서 주변 약점을 급격히 늘립니다.'
    },
    {
      id: 'prefork-d4',
      title: '스크린샷형 d4 포크 한 수 전에 제거',
      fen: 'r2q1rk1/ppp2ppp/2npb3/5n2/2B1P3/1PNP1P2/P1P1K1PP/R1BQ3R w - - 0 10',
      knight: 'f5',
      landing: 'd4',
      prompt: '백 왕이 e2에 있고 b3·c2·f3가 같은 나이트 공격망에 들어갈 수 있습니다. 흑이 Nd4+를 두기 전에 끊으세요.',
      sub: 'Nd4+가 나오면 체크와 함께 b3·c2·f3가 동시에 걸립니다. 이번 세트의 핵심 장면입니다.',
      hint: 'e4 폰이 f5 나이트를 바로 잡을 수 있습니다.',
      accepted: ['e4f5'],
      success: '정확합니다. exf5로 Nd4+의 출발점 자체를 제거했습니다. 이런 포크는 “당한 뒤 대응”보다 한 수 전 제거가 핵심입니다.',
      rule: '왕이 중앙에 남아 있고 주변에 느슨한 기물이 많을수록 상대 나이트의 중앙 착지 칸을 먼저 계산합니다.'
    },
    {
      id: 'endgame-f3',
      title: '엔드게임 왕·룩 포크 피하기',
      fen: '6k1/5ppp/8/8/7n/8/3R1PPP/6K1 w - - 0 30',
      knight: 'h4',
      landing: 'f3',
      prompt: '기물이 적어도 나이트 포크는 더 치명적입니다. 흑 Nh4-f3+가 왕과 룩을 동시에 치지 못하게 만드세요.',
      sub: 'Nf3+는 g1 왕과 d2 룩을 동시에 공격합니다.',
      hint: '룩을 d1로 한 칸 내리면 f3 나이트의 공격망에서 빠집니다.',
      accepted: ['d2d1'],
      success: '정답입니다. Rd1로 포크 대상 둘을 같은 나이트 공격망에서 분리했습니다.',
      rule: '나이트를 잡거나 착지 칸을 막을 수 없다면 고가치 기물 둘을 포크 기하에서 분리합니다.'
    }
  ];

  const boardEl = document.getElementById('knightBoard');
  if (!boardEl) return;

  const progressEl = document.getElementById('knightProgress');
  const solvedEl = document.getElementById('knightSolved');
  const titleEl = document.getElementById('knightTitle');
  const promptEl = document.getElementById('knightPrompt');
  const subEl = document.getElementById('knightSub');
  const feedbackEl = document.getElementById('knightFeedback');
  const hintBtn = document.getElementById('knightHint');
  const nextBtn = document.getElementById('knightNext');
  const prevBtn = document.getElementById('knightPrev');
  const resetBtn = document.getElementById('knightReset');

  let index = 0;
  let board = [];
  let selected = null;
  let solvedCurrent = false;
  let hintShown = false;
  let misses = 0;
  let solved = loadSolved();

  function loadSolved() {
    try {
      const value = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
      return new Set(Array.isArray(value) ? value : []);
    } catch {
      return new Set();
    }
  }

  function saveSolved() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify([...solved]));
    } catch {}
  }

  function parseFen(fen) {
    const position = fen.split(' ')[0];
    const out = Array(64).fill(null);
    let i = 0;
    for (const ch of position) {
      if (ch === '/') continue;
      if (/\d/.test(ch)) i += Number(ch);
      else out[i++] = ch;
    }
    return out;
  }

  function squareName(i) {
    return FILES[i % 8] + (8 - Math.floor(i / 8));
  }

  function isWhite(piece) {
    return piece && piece === piece.toUpperCase();
  }

  function render() {
    const drill = DRILLS[index];
    boardEl.innerHTML = '';
    for (let i = 0; i < 64; i++) {
      const sq = document.createElement('button');
      sq.type = 'button';
      sq.className = 'knightSq ' + (((Math.floor(i / 8) + (i % 8)) % 2) ? 'dark' : 'light');
      sq.dataset.square = String(i);
      sq.dataset.alg = squareName(i);

      if (i === selected) sq.classList.add('selected');
      if (squareName(i) === drill.knight) sq.classList.add('dangerKnight');
      if (hintShown && squareName(i) === drill.landing) sq.classList.add('dangerLanding');
      if (solvedCurrent && drill.accepted.some(move => move.slice(2, 4) === squareName(i))) sq.classList.add('correctLanding');

      const piece = board[i];
      if (piece) {
        const span = document.createElement('span');
        span.className = 'knightPiece ' + (isWhite(piece) ? 'whitePiece' : 'blackPiece');
        span.textContent = PIECES[piece];
        sq.appendChild(span);
      }

      if (i % 8 === 0) {
        const rank = document.createElement('span');
        rank.className = 'knightCoord rank';
        rank.textContent = String(8 - Math.floor(i / 8));
        sq.appendChild(rank);
      }
      if (Math.floor(i / 8) === 7) {
        const file = document.createElement('span');
        file.className = 'knightCoord file';
        file.textContent = FILES[i % 8];
        sq.appendChild(file);
      }

      sq.addEventListener('click', () => handleSquare(i));
      boardEl.appendChild(sq);
    }
  }

  function handleSquare(i) {
    if (solvedCurrent) return;
    const piece = board[i];

    if (selected === null) {
      if (isWhite(piece)) {
        selected = i;
        render();
      }
      return;
    }

    if (isWhite(piece)) {
      selected = i;
      render();
      return;
    }

    const uci = squareName(selected) + squareName(i);
    const drill = DRILLS[index];

    if (drill.accepted.includes(uci)) {
      board[i] = board[selected];
      board[selected] = null;
      selected = null;
      solvedCurrent = true;
      solved.add(drill.id);
      saveSolved();
      feedbackEl.className = 'knightFeedback success';
      feedbackEl.innerHTML = `<strong>정답.</strong> ${drill.success}<span>${drill.rule}</span>`;
      updateMeta();
      render();
      return;
    }

    misses += 1;
    selected = null;
    feedbackEl.className = 'knightFeedback wrong';
    feedbackEl.innerHTML = misses >= 2
      ? `<strong>다시 계산.</strong> ${drill.hint}`
      : '<strong>아직 아닙니다.</strong> 흑 나이트의 다음 착지 칸에서 왕·퀸·룩이 몇 개 동시에 공격받는지 먼저 세세요.';
    render();
  }

  function updateMeta() {
    const drill = DRILLS[index];
    progressEl.textContent = `SET ${index + 1} / ${DRILLS.length}`;
    solvedEl.textContent = `완료 ${solved.size} / ${DRILLS.length}`;
    titleEl.textContent = drill.title;
    promptEl.textContent = drill.prompt;
    subEl.textContent = drill.sub;
  }

  function loadDrill(nextIndex) {
    index = (nextIndex + DRILLS.length) % DRILLS.length;
    board = parseFen(DRILLS[index].fen);
    selected = null;
    solvedCurrent = false;
    hintShown = false;
    misses = 0;
    feedbackEl.className = 'knightFeedback';
    feedbackEl.innerHTML = '<strong>백 차례.</strong> 예방 수 한 수를 찾아보세요.<span>순서: 나이트 위치 → 다음 착지 칸 → 포크 대상 → 제거/통제/분리.</span>';
    updateMeta();
    render();
  }

  hintBtn.addEventListener('click', () => {
    hintShown = true;
    feedbackEl.className = 'knightFeedback hint';
    feedbackEl.innerHTML = `<strong>힌트.</strong> 위험 착지 칸은 ${DRILLS[index].landing}입니다.<span>${DRILLS[index].hint}</span>`;
    render();
  });

  nextBtn.addEventListener('click', () => loadDrill(index + 1));
  prevBtn.addEventListener('click', () => loadDrill(index - 1));
  resetBtn.addEventListener('click', () => loadDrill(index));

  document.addEventListener('keydown', event => {
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
    if (event.key.toLowerCase() === 'n') {
      document.getElementById('knight-training')?.scrollIntoView({behavior: 'smooth'});
    }
  });

  loadDrill(0);
})();
