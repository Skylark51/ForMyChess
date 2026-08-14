(() => {
  'use strict';

  const PIECES = {K:'♔',Q:'♕',R:'♖',B:'♗',N:'♘',P:'♙',k:'♚',q:'♛',r:'♜',b:'♝',n:'♞',p:'♟'};
  const FILES = 'abcdefgh';
  const STORE_KEY = 'formychess.tactics-review.v1';
  const SERIES = window.FMC_TACTICS || {};

  const boardEl = document.getElementById('tacticsBoard');
  if (!boardEl) return;

  const seriesButtons = [...document.querySelectorAll('[data-tactics-series]')];
  const seriesNameEl = document.getElementById('tacticsSeriesName');
  const seriesDescEl = document.getElementById('tacticsSeriesDesc');
  const titleEl = document.getElementById('tacticsTitle');
  const promptEl = document.getElementById('tacticsPrompt');
  const subEl = document.getElementById('tacticsSub');
  const progressEl = document.getElementById('tacticsProgress');
  const scoreEl = document.getElementById('tacticsScore');
  const feedbackEl = document.getElementById('tacticsFeedback');
  const gradeEl = document.getElementById('tacticsGrade');
  const evalEl = document.getElementById('tacticsEval');
  const moveEl = document.getElementById('tacticsMove');
  const hintBtn = document.getElementById('tacticsHint');
  const answerBtn = document.getElementById('tacticsAnswer');
  const retryBtn = document.getElementById('tacticsRetry');
  const nextBtn = document.getElementById('tacticsNext');
  const prevBtn = document.getElementById('tacticsPrev');
  const shuffleBtn = document.getElementById('tacticsShuffle');

  let activeSeries = 'beginner';
  let order = [];
  let index = 0;
  let board = [];
  let selected = null;
  let lastAttempt = null;
  let solvedCurrent = false;
  let hintShown = false;
  let state = loadState();

  function loadState() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
      return raw && typeof raw === 'object' ? raw : {};
    } catch {
      return {};
    }
  }

  function saveState() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch {}
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

  function currentSeries() {
    return SERIES[activeSeries];
  }

  function currentPuzzle() {
    return currentSeries().puzzles[order[index]];
  }

  function solvedSet(key = activeSeries) {
    const values = state[key]?.solved;
    return new Set(Array.isArray(values) ? values : []);
  }

  function markSolved(id) {
    const set = solvedSet();
    set.add(id);
    state[activeSeries] = {...(state[activeSeries] || {}), solved:[...set]};
    saveState();
  }

  function createOrder() {
    order = currentSeries().puzzles.map((_, i) => i);
  }

  function shuffleOrder() {
    createOrder();
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    index = 0;
    loadPuzzle();
  }

  function gradeClass(grade) {
    return ({best:'best', good:'good', inaccuracy:'inaccuracy', mistake:'mistake', blunder:'blunder'}[grade] || 'neutral');
  }

  function gradeLabel(grade) {
    return ({best:'최선', good:'좋음', inaccuracy:'부정확', mistake:'실수', blunder:'블런더'}[grade] || '리뷰');
  }

  function renderBoard() {
    const puzzle = currentPuzzle();
    boardEl.innerHTML = '';
    for (let i = 0; i < 64; i++) {
      const sqName = squareName(i);
      const sq = document.createElement('button');
      sq.type = 'button';
      sq.className = 'tacticsSq ' + (((Math.floor(i / 8) + i % 8) % 2) ? 'dark' : 'light');
      sq.dataset.square = sqName;

      if (selected === i) sq.classList.add('selected');
      if (lastAttempt && (sqName === lastAttempt.from || sqName === lastAttempt.to)) sq.classList.add(lastAttempt.correct ? 'lastCorrect' : 'lastWrong');
      if (hintShown && puzzle.best.some(move => move.slice(2,4) === sqName)) sq.classList.add('hintTarget');

      const piece = board[i];
      if (piece) {
        const span = document.createElement('span');
        span.className = 'tacticsPiece ' + (isWhite(piece) ? 'whitePiece' : 'blackPiece');
        span.textContent = PIECES[piece];
        sq.appendChild(span);
      }

      if (i % 8 === 0) {
        const rank = document.createElement('span');
        rank.className = 'tacticsCoord rank';
        rank.textContent = String(8 - Math.floor(i / 8));
        sq.appendChild(rank);
      }
      if (Math.floor(i / 8) === 7) {
        const file = document.createElement('span');
        file.className = 'tacticsCoord file';
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
        renderBoard();
      }
      return;
    }

    if (isWhite(piece)) {
      selected = i;
      renderBoard();
      return;
    }

    const from = squareName(selected);
    const to = squareName(i);
    const uci = from + to;
    selected = null;
    evaluateMove(uci, from, to);
  }

  function evaluateMove(uci, from, to) {
    const puzzle = currentPuzzle();
    const correct = puzzle.best.includes(uci);
    lastAttempt = {from, to, correct};

    if (correct) {
      movePiece(uci);
      solvedCurrent = true;
      markSolved(puzzle.id);
      setFeedback({
        grade:'best',
        delta:puzzle.bestEval,
        move:puzzle.bestLabel,
        text:puzzle.success,
        why:puzzle.lesson
      });
      updateMeta();
      renderBoard();
      return;
    }

    const detail = puzzle.wrong?.[uci] || {
      label: humanizeUci(uci),
      grade: activeSeries === 'survival' ? 'blunder' : 'mistake',
      delta: activeSeries === 'survival' ? 'LOSE' : '-0.60',
      text: `${humanizeUci(uci)}는 이 포지션의 핵심 위협을 충분히 해결하지 못합니다.`,
      why: puzzle.lesson
    };

    setFeedback({
      grade:detail.grade,
      delta:detail.delta,
      move:detail.label || humanizeUci(uci),
      text:detail.text,
      why:detail.why
    });
    renderBoard();
  }

  function movePiece(uci) {
    const from = indexOfSquare(uci.slice(0,2));
    const to = indexOfSquare(uci.slice(2,4));
    if (from < 0 || to < 0) return;
    board[to] = board[from];
    board[from] = null;
  }

  function indexOfSquare(name) {
    const file = FILES.indexOf(name[0]);
    const rank = Number(name[1]);
    if (file < 0 || rank < 1 || rank > 8) return -1;
    return (8 - rank) * 8 + file;
  }

  function humanizeUci(uci) {
    return `${uci.slice(0,2)}→${uci.slice(2,4)}`;
  }

  function setFeedback({grade, delta, move, text, why}) {
    const cls = gradeClass(grade);
    feedbackEl.className = `tacticsFeedback ${cls}`;
    gradeEl.className = `reviewGrade ${cls}`;
    gradeEl.textContent = gradeLabel(grade);
    evalEl.textContent = delta;
    moveEl.textContent = move;
    feedbackEl.querySelector('.reviewText').textContent = text;
    feedbackEl.querySelector('.reviewWhy').textContent = why;
  }

  function resetFeedback() {
    feedbackEl.className = 'tacticsFeedback neutral';
    gradeEl.className = 'reviewGrade neutral';
    gradeEl.textContent = '선택 대기';
    evalEl.textContent = '—';
    moveEl.textContent = '백 차례';
    feedbackEl.querySelector('.reviewText').textContent = '수를 두면 선택한 수의 등급과 이유를 바로 설명합니다.';
    feedbackEl.querySelector('.reviewWhy').textContent = '순서: 체크 → 잡기 → 위협 → 공격받는 내 기물 → 상대의 다음 forcing move.';
  }

  function updateMeta() {
    const series = currentSeries();
    const puzzle = currentPuzzle();
    const solved = solvedSet();
    seriesNameEl.textContent = `${series.name} 시리즈`;
    seriesDescEl.textContent = series.description;
    titleEl.textContent = puzzle.title;
    promptEl.textContent = puzzle.prompt;
    subEl.textContent = puzzle.sub;
    progressEl.textContent = `${index + 1} / ${series.puzzles.length}`;
    scoreEl.textContent = `완료 ${solved.size} / ${series.puzzles.length}`;
    seriesButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.tacticsSeries === activeSeries));
  }

  function loadPuzzle(nextIndex = index) {
    const series = currentSeries();
    index = (nextIndex + series.puzzles.length) % series.puzzles.length;
    board = parseFen(currentPuzzle().fen);
    selected = null;
    lastAttempt = null;
    solvedCurrent = false;
    hintShown = false;
    resetFeedback();
    updateMeta();
    renderBoard();
  }

  function showAnswer() {
    const puzzle = currentPuzzle();
    hintShown = true;
    setFeedback({
      grade:'good',
      delta:puzzle.bestEval,
      move:puzzle.bestLabel,
      text:`정답은 ${puzzle.bestLabel}입니다. ${puzzle.success}`,
      why:puzzle.lesson
    });
    renderBoard();
  }

  seriesButtons.forEach(btn => btn.addEventListener('click', () => {
    activeSeries = btn.dataset.tacticsSeries;
    createOrder();
    index = 0;
    loadPuzzle();
  }));

  hintBtn.addEventListener('click', () => {
    hintShown = true;
    const puzzle = currentPuzzle();
    setFeedback({grade:'inaccuracy', delta:'HINT', move:'힌트', text:puzzle.hint, why:'정답 칸이 보드에 표시되었습니다. 수를 직접 두어 마무리하세요.'});
    renderBoard();
  });

  answerBtn.addEventListener('click', showAnswer);
  retryBtn.addEventListener('click', () => loadPuzzle(index));
  nextBtn.addEventListener('click', () => loadPuzzle(index + 1));
  prevBtn.addEventListener('click', () => loadPuzzle(index - 1));
  shuffleBtn.addEventListener('click', shuffleOrder);

  document.addEventListener('keydown', event => {
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
    const key = event.key.toLowerCase();
    if (key === 't') document.getElementById('tactics-training')?.scrollIntoView({behavior:'smooth'});
    if (key === '1') { activeSeries='beginner'; createOrder(); index=0; loadPuzzle(); }
    if (key === '2') { activeSeries='intermediate'; createOrder(); index=0; loadPuzzle(); }
    if (key === '3') { activeSeries='advanced'; createOrder(); index=0; loadPuzzle(); }
    if (key === '4') { activeSeries='survival'; createOrder(); index=0; loadPuzzle(); }
  });

  createOrder();
  loadPuzzle(0);
})();