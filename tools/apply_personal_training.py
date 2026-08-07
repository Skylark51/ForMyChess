from pathlib import Path

path = Path("index.html")
s = path.read_text(encoding="utf-8")

if 'id="personal"' in s and "personalRay:" in s and "function forcedTrainingReply()" in s:
    print("personal training already applied")
    raise SystemExit(0)

css = r'''

    /* Personal game review */
    .personal-training { min-height:auto; padding-top:86px; padding-bottom:96px; align-items:start; }
    .personal-wrap { width:min(1240px,100%); margin:auto; }
    .personal-head { display:grid; grid-template-columns:minmax(0,.85fr) minmax(320px,1.15fr); gap:clamp(26px,6vw,78px); align-items:end; margin-bottom:28px; }
    .personal-head h2 { margin:10px 0 14px; font-size:clamp(42px,6vw,76px); line-height:.98; letter-spacing:-.055em; }
    .personal-note { color:var(--muted); line-height:1.75; margin:0; }
    .rhythm-loop { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; padding:12px; border:1px solid var(--line); border-radius:18px; background:rgba(255,255,255,.025); }
    .rhythm-step { min-height:78px; padding:12px; border-radius:13px; background:rgba(255,255,255,.035); display:flex; flex-direction:column; justify-content:space-between; gap:8px; }
    .rhythm-step b { color:var(--accent); font-size:11px; letter-spacing:.08em; }
    .rhythm-step span { font-size:13px; line-height:1.45; color:#dce7df; font-weight:800; }
    .weakness-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; }
    .weakness-card { position:relative; overflow:hidden; min-height:310px; padding:20px; border:1px solid var(--line); border-radius:19px; background:linear-gradient(150deg,rgba(255,255,255,.055),rgba(255,255,255,.02)); display:flex; flex-direction:column; }
    .weakness-card::after { content:attr(data-n); position:absolute; right:10px; top:-17px; color:rgba(255,255,255,.035); font-size:92px; font-weight:900; line-height:1; pointer-events:none; }
    .weak-tag { width:max-content; padding:5px 8px; border-radius:999px; background:rgba(255,93,104,.08); color:#ff9aa1; font-size:10px; font-weight:900; letter-spacing:.08em; }
    .weakness-card h3 { margin:14px 0 8px; font-size:22px; letter-spacing:-.035em; }
    .game-moment { display:inline-flex; width:max-content; max-width:100%; padding:7px 9px; margin:0 0 13px; border:1px solid rgba(255,199,100,.18); border-radius:9px; color:var(--gold); background:rgba(255,199,100,.055); font:800 12px ui-monospace,SFMono-Regular,Menlo,monospace; }
    .weakness-card p { margin:0 0 12px; color:var(--muted); font-size:13px; line-height:1.65; }
    .micro-rule { margin-top:auto; padding:11px 12px; border-left:3px solid var(--accent-2); border-radius:0 10px 10px 0; background:rgba(102,209,180,.055); color:#dbe8e0; font-size:12px; line-height:1.55; }
    .weakness-card .btn { width:100%; margin-top:12px; }
    .confidence-line { display:flex; gap:8px; align-items:center; margin-top:16px; color:var(--muted); font-size:11px; }
    .confidence-line::before { content:""; width:38px; height:3px; border-radius:99px; background:var(--accent); }
'''

hotkeys = '    .hotkeys { display:flex; flex-wrap:wrap; gap:7px; margin-top:12px; }\n'
if hotkeys not in s:
    raise RuntimeError("CSS insertion anchor not found")
s = s.replace(hotkeys, hotkeys + css, 1)

responsive = r'''

    @media(max-width:1080px){.weakness-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.personal-head{grid-template-columns:1fr}.rhythm-loop{grid-template-columns:repeat(2,1fr)}}
    @media(max-width:620px){.weakness-grid{grid-template-columns:1fr}.rhythm-loop{grid-template-columns:1fr}.weakness-card{min-height:0}.personal-training{padding:66px 14px 74px}}
'''
reduced = '    @media (prefers-reduced-motion: reduce) {'
if reduced not in s:
    raise RuntimeError("responsive insertion anchor not found")
s = s.replace(reduced, responsive + reduced, 1)

nav_old = '      <a href="#endgame">엔드게임</a>\n      <a class="arena-link" href="#arena">플레이</a>'
nav_new = '      <a href="#endgame">엔드게임</a>\n      <a href="#personal">내 게임</a>\n      <a class="arena-link" href="#arena">플레이</a>'
if nav_old not in s:
    raise RuntimeError("nav anchor not found")
s = s.replace(nav_old, nav_new, 1)

personal = r'''

    <section class="personal-training" id="personal">
      <div class="personal-wrap">
        <div class="personal-head">
          <div>
            <div class="phase-kicker">PERSONAL REVIEW · FRITZ GAME · 2026.08.07</div>
            <h2>내 실수에서<br>바로 훈련한다.</h2>
            <p class="personal-note">이 한 판만으로 만든 잠정 진단입니다. 결과보다 반복 가능한 사고 습관에 초점을 맞췄습니다. 핵심은 <strong>내 수를 찾기 전에 상대의 수를 한 번 더 읽는 것</strong>입니다.</p>
            <div class="confidence-line">한 게임 기반 · 다음 기보가 들어오면 패턴을 누적해 갱신</div>
          </div>
          <div class="rhythm-loop" aria-label="개인 사고 루프">
            <div class="rhythm-step"><b>01 · STOP</b><span>바로 두지 말고 2초 멈춤</span></div>
            <div class="rhythm-step"><b>02 · CCT</b><span>상대 체크 · 잡기 · 위협</span></div>
            <div class="rhythm-step"><b>03 · LAST MOVE</b><span>방금 상대 수가 바꾼 것</span></div>
            <div class="rhythm-step"><b>04 · LANDING</b><span>내 목적지 칸의 안전</span></div>
          </div>
        </div>

        <div class="weakness-grid">
          <article class="weakness-card" data-n="1">
            <span class="weak-tag">PRIORITY · HIGH</span>
            <h3>장거리 라인 스캔</h3>
            <span class="game-moment">9.Bg5? → ...Qxc3+</span>
            <p>비숍을 움직이는 동안 흑 퀸의 <strong>f6–e5–d4–c3</strong> 대각선이 유지됐고, c3 나이트가 체크와 함께 떨어졌습니다.</p>
            <div class="micro-rule"><strong>규칙:</strong> 내 기물을 움직이기 전, 상대 퀸·룩·비숍의 직선이 내 느슨한 기물까지 닿는지 먼저 긁어본다.</div>
            <button class="btn primary stage-btn" data-stage="personalRay">이 장면 다시 두기</button>
          </article>

          <article class="weakness-card" data-n="2">
            <span class="weak-tag">PRIORITY · MEDIUM</span>
            <h3>강제수 우선순위</h3>
            <span class="game-moment">23.Qxa4? · missed something</span>
            <p>Fritz가 ‘missed something’으로 표시한 장면입니다. 자동으로 퀸을 교환하기 전에 <strong>체크 → 잡기 → 위협</strong> 후보를 먼저 전부 생성하는 훈련으로 바꿉니다.</p>
            <div class="micro-rule"><strong>규칙:</strong> 눈앞의 교환이 자연스러워 보여도, 체크 하나·잡기 하나를 최소한 비교한 뒤 결정한다.</div>
            <button class="btn primary stage-btn" data-stage="personalCct">후보수 비교 훈련</button>
          </article>

          <article class="weakness-card" data-n="3">
            <span class="weak-tag">PRIORITY · HIGH</span>
            <h3>직전 수의 위협</h3>
            <span class="game-moment">31...Nd5 → 32.Bc4? Nxf4</span>
            <p>31...Nd5가 나온 직후 f4 폰이 공격받았지만, 32.Bc4로 별도 계획을 진행하면서 즉시 <strong>...Nxf4</strong>를 허용했습니다.</p>
            <div class="micro-rule"><strong>규칙:</strong> 상대가 둔 직후 “새로 공격받은 내 기물/폰은?”을 한 문장으로 답하기 전에는 내 계획을 시작하지 않는다.</div>
            <button class="btn primary stage-btn" data-stage="personalThreat">위협 대응 훈련</button>
          </article>

          <article class="weakness-card" data-n="4">
            <span class="weak-tag">PRIORITY · HIGH</span>
            <h3>목적지 칸 안전</h3>
            <span class="game-moment">33.Ra6? → ...Bb7 → 34.Ra7</span>
            <p>룩을 a6에 올리자 ...Bb7가 템포를 얻으며 룩을 다시 밀어냈습니다. 수의 아이디어보다 <strong>도착한 칸에서 상대가 얻는 강제 템포</strong>를 먼저 확인해야 합니다.</p>
            <div class="micro-rule"><strong>규칙:</strong> 후보수를 고른 뒤 마지막 질문은 “그 칸에 두면 상대가 내 말을 때리며 전개할 수 있는가?”</div>
            <button class="btn primary stage-btn" data-stage="personalSquare">목적지 안전 훈련</button>
          </article>
        </div>
      </div>
    </section>
'''
marker = '\n    <section class="arena" id="arena">'
if marker not in s:
    raise RuntimeError("arena insertion anchor not found")
s = s.replace(marker, personal + marker, 1)

select_old = '              <option value="endgame">엔드게임</option>\n            </select>'
select_new = '''              <option value="endgame">엔드게임</option>
              <optgroup label="내 게임 약점 훈련">
                <option value="personalRay">장거리 라인 스캔</option>
                <option value="personalCct">강제수 후보 비교</option>
                <option value="personalThreat">직전 수의 위협</option>
                <option value="personalSquare">목적지 칸 안전</option>
              </optgroup>
            </select>'''
if select_old not in s:
    raise RuntimeError("stage select anchor not found")
s = s.replace(select_old, select_new, 1)

hotkey_old = '<kbd>E 엔드게임</kbd></div>'
if hotkey_old not in s:
    raise RuntimeError("hotkey anchor not found")
s = s.replace(hotkey_old, '<kbd>E 엔드게임</kbd><kbd>T 내 게임 훈련</kbd></div>', 1)

stage_old = '''        endgame: {
          fen: '8/5pk1/4p1p1/8/3P4/4P1P1/5PK1/3R4 w - - 0 1',
          label: 'ENDGAME',
          status: '엔드게임 · 왕과 패스폰의 거리를 재세요',
          coach: '엔드게임에서는 왕도 공격 기물입니다.',
          sub: '폰을 밀기 전에 왕의 거리와 룩이 패스폰 뒤에 설 수 있는지 먼저 확인하세요.'
        }
      };'''
stage_new = '''        endgame: {
          fen: '8/5pk1/4p1p1/8/3P4/4P1P1/5PK1/3R4 w - - 0 1',
          label: 'ENDGAME',
          status: '엔드게임 · 왕과 패스폰의 거리를 재세요',
          coach: '엔드게임에서는 왕도 공격 기물입니다.',
          sub: '폰을 밀기 전에 왕의 거리와 룩이 패스폰 뒤에 설 수 있는지 먼저 확인하세요.'
        },
        personalRay: {
          fen: 'rn2kbnr/pp3ppp/2p1bq2/8/1P6/P1NP1N2/2P2PPP/R1BQKB1R w KQkq - 1 9',
          label: 'MY GAME · RAY', personal:true,
          status: '개인 훈련 · 상대 장거리 라인을 먼저 스캔',
          coach: '9수째 장면입니다. 지금 c3 나이트가 흑 퀸의 대각선 위에 있습니다.',
          sub: 'f6 → e5 → d4 → c3를 눈으로 연결하세요. 이 라인을 끊거나 나이트를 안전하게 만든 뒤에 다른 계획을 시작합니다.'
        },
        personalCct: {
          fen: 'rn1r3k/4np2/1p4pp/1R1b4/q7/2P2N2/4BPPP/3Q1RK1 w - - 1 23',
          label: 'MY GAME · CCT', personal:true,
          status: '개인 훈련 · 자연스러운 교환 전에 강제수 생성',
          coach: '23수째 장면입니다. Qxa4를 자동으로 두기 전에 후보수를 더 만드세요.',
          sub: '답을 외우는 훈련이 아닙니다. 체크 → 잡기 → 위협 순서로 최소 3개의 후보를 머릿속에 만든 뒤 한 수를 고릅니다.'
        },
        personalThreat: {
          fen: '8/R2n1pk1/1pb3pp/3n4/1P3PP1/8/4B2P/6K1 w - - 1 32',
          label: 'MY GAME · THREAT', personal:true,
          status: '개인 훈련 · 31...Nd5가 만든 위협을 먼저 해결',
          coach: '흑의 직전 수는 ...Nd5입니다. 새로 공격받은 백의 폰 하나를 먼저 찾으세요.',
          sub: '32.Bc4?처럼 별도 계획을 시작하면 ...Nxf4가 즉시 들어옵니다. 직전 수가 바꾼 공격 관계부터 갱신하세요.'
        },
        personalSquare: {
          fen: '8/R2n1pk1/1pb3pp/8/1PB2nP1/8/7P/6K1 w - - 0 33',
          label: 'MY GAME · LANDING', personal:true,
          status: '개인 훈련 · 목적지에서 상대 템포 수를 예측',
          coach: '33수째 장면입니다. Ra6를 두기 전에 흑 비숍이 다음 수에 어디로 갈지 보세요.',
          sub: 'a6에 룩을 두면 ...Bb7가 룩을 공격하며 템포를 얻습니다. 후보수마다 “도착 후 상대의 가장 강한 공격”을 한 번 계산하세요.'
        }
      };'''
if stage_old not in s:
    raise RuntimeError("STAGES anchor not found")
s = s.replace(stage_old, stage_new, 1)

ai_anchor = '      function chooseAIMove() {\n'
ai_helpers = '''      function findLegalMove(fromAlg,toAlg,side=state.turn) {
        const from=algebraicToIndex(fromAlg), to=algebraicToIndex(toAlg);
        return legalMoves(state,side).find(m=>m.from===from && m.to===to) || null;
      }

      function forcedTrainingReply() {
        if(!STAGES[currentStage]?.personal || state.turn!=='b') return null;
        if(currentStage==='personalRay') return findLegalMove('f6','c3','b');
        if(currentStage==='personalThreat') return findLegalMove('d5','f4','b');
        if(currentStage==='personalSquare') {
          const whiteLast=[...moveHistory].reverse().find(x=>x.side==='w');
          if(whiteLast?.notation==='Ra6') return findLegalMove('c6','b7','b');
        }
        if(currentStage==='personalCct') {
          const whiteLast=[...moveHistory].reverse().find(x=>x.side==='w');
          if(whiteLast?.notation==='Qxa4') return findLegalMove('a8','a4','b');
        }
        return null;
      }

'''
if ai_anchor not in s:
    raise RuntimeError("AI insertion anchor not found")
s = s.replace(ai_anchor, ai_helpers + ai_anchor, 1)
s = s.replace("      function chooseAIMove() {\n        const moves=orderedMoves(state,legalMoves(state,'b'));", "      function chooseAIMove() {\n        const forced=forcedTrainingReply();\n        if(forced) return forced;\n        const moves=orderedMoves(state,legalMoves(state,'b'));", 1)

coach_anchor = '      function coachForPosition(last) {\n'
personal_coach = '''      function personalCoach(last) {
        if(!moveHistory.length) return {main:STAGES[currentStage].coach,sub:STAGES[currentStage].sub};
        if(state.turn==='b') return {main:'한 수를 뒀습니다. 이제 상대의 가장 직접적인 응수를 확인합니다.',sub:'내 수가 좋아 보이는지보다 상대가 체크·잡기·템포 공격으로 즉시 반박할 수 있는지를 먼저 보세요.'};
        const notes=moveHistory.map(x=>x.notation);
        if(currentStage==='personalRay') {
          if(notes.includes('Qxc3+')) return {main:'패턴 재현: c3 나이트가 체크와 함께 떨어졌습니다.',sub:'다시 시작해서 내 계획보다 먼저 상대 퀸의 f6–e5–d4–c3 직선을 확인하세요.'};
          return {main:'좋습니다. 지금은 ...Qxc3+가 즉시 나오지 않았습니다.',sub:'한 번 막은 뒤에도 매 수 상대 퀸·룩·비숍의 새 직선을 다시 그리는 습관을 유지하세요.'};
        }
        if(currentStage==='personalThreat') {
          if(notes.includes('Nxf4')) return {main:'직전 수의 위협을 놓쳤습니다: ...Nxf4가 들어왔습니다.',sub:'31...Nd5가 나온 순간 “무엇을 새로 공격했나?”의 답은 f4였습니다. 다시 시작해 그 위협부터 처리하세요.'};
          return {main:'이번에는 f4에 대한 즉시 위협을 넘겼습니다.',sub:'상대의 직전 수가 만든 공격·수비·열린 선을 먼저 갱신한 뒤 내 계획으로 넘어가세요.'};
        }
        if(currentStage==='personalSquare') {
          if(notes.includes('Ra6') && notes.includes('Bb7')) return {main:'예상해야 할 템포: ...Bb7가 룩을 다시 공격합니다.',sub:'목적지 a6 자체는 갈 수 있지만, 상대가 기물을 개선하면서 내 룩을 때리는 수를 허용합니다. 목적지 안전 검사를 마지막 단계로 고정하세요.'};
          return {main:'목적지에서 상대가 얻는 템포를 계속 계산하세요.',sub:'“그 칸에 두면 체크·잡기·공격을 맞는가?”를 후보수마다 한 번만 확인해도 불필요한 왕복이 크게 줄어듭니다.'};
        }
        if(currentStage==='personalCct') {
          if(notes.includes('Qxa4') && notes.includes('Rxa4')) return {main:'원래 게임의 교환 흐름이 재현됐습니다.',sub:'이 장면의 목표는 Qxa4가 합법인지가 아니라, 자동 교환 전에 체크·잡기·위협 후보를 충분히 생성하는 것입니다. 다시 시작해 첫 5초를 후보수 생성에만 쓰세요.'};
          return {main:'한 수를 두기 전에 강제수 후보를 최소 세 개 만드세요.',sub:'체크 → 잡기 → 위협 → 조용한 수의 순서를 지키면 “눈앞의 자연스러운 수”에 바로 손이 가는 습관을 줄일 수 있습니다.'};
        }
        return {main:STAGES[currentStage].coach,sub:STAGES[currentStage].sub};
      }

'''
if coach_anchor not in s:
    raise RuntimeError("coach insertion anchor not found")
s = s.replace(coach_anchor, personal_coach + coach_anchor, 1)
s = s.replace("      function coachForPosition(last) {\n        if(gameOver)", "      function coachForPosition(last) {\n        if(STAGES[currentStage]?.personal) return personalCoach(last);\n        if(gameOver)", 1)

keyboard_old = "        if(k==='e') loadStage('endgame',true);"
if keyboard_old not in s:
    raise RuntimeError("keyboard anchor not found")
s = s.replace(keyboard_old, keyboard_old + "\n        if(k==='t') loadStage('personalRay',true);", 1)

required = [
    'id="personal"', 'data-stage="personalRay"', 'data-stage="personalCct"',
    'data-stage="personalThreat"', 'data-stage="personalSquare"',
    'function forcedTrainingReply()', 'function personalCoach(last)', "if(k==='t')"
]
missing = [item for item in required if item not in s]
if missing:
    raise RuntimeError(f"post-patch validation failed: {missing}")

path.write_text(s, encoding="utf-8")
print("personal training applied")
