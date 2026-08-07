from pathlib import Path
import re

path = Path('index.html')
s = path.read_text(encoding='utf-8')

if 'id="personal"' in s and 'personalRay:' in s and 'function trainingReply()' in s:
    print('personal training already applied')
    raise SystemExit(0)

css = r'''.personal{min-height:auto;padding-top:86px;padding-bottom:96px;align-items:start}.personalWrap{width:min(1240px,100%);margin:auto}.personalHead{display:grid;grid-template-columns:minmax(0,.85fr) minmax(320px,1.15fr);gap:clamp(26px,6vw,78px);align-items:end;margin-bottom:28px}.personalHead h2{margin:10px 0 14px;font-size:clamp(42px,6vw,76px);line-height:.98;letter-spacing:-.055em}.personalNote{color:var(--muted);line-height:1.75;margin:0}.rhythm{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:12px;border:1px solid var(--line);border-radius:18px;background:rgba(255,255,255,.025)}.rhythmStep{min-height:78px;padding:12px;border-radius:13px;background:rgba(255,255,255,.035);display:flex;flex-direction:column;justify-content:space-between;gap:8px}.rhythmStep b{color:var(--accent);font-size:11px;letter-spacing:.08em}.rhythmStep span{font-size:13px;line-height:1.45;color:#dce7df;font-weight:800}.weakGrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.weakCard{position:relative;overflow:hidden;min-height:310px;padding:20px;border:1px solid var(--line);border-radius:19px;background:linear-gradient(150deg,rgba(255,255,255,.055),rgba(255,255,255,.02));display:flex;flex-direction:column}.weakCard:after{content:attr(data-n);position:absolute;right:10px;top:-17px;color:rgba(255,255,255,.035);font-size:92px;font-weight:900;line-height:1;pointer-events:none}.weakTag{width:max-content;padding:5px 8px;border-radius:999px;background:rgba(255,93,104,.08);color:#ff9aa1;font-size:10px;font-weight:900;letter-spacing:.08em}.weakCard h3{margin:14px 0 8px;font-size:22px;letter-spacing:-.035em}.moment{display:inline-flex;width:max-content;max-width:100%;padding:7px 9px;margin:0 0 13px;border:1px solid rgba(255,199,100,.18);border-radius:9px;color:var(--gold);background:rgba(255,199,100,.055);font:800 12px ui-monospace,SFMono-Regular,Menlo,monospace}.weakCard p{margin:0 0 12px;color:var(--muted);font-size:13px;line-height:1.65}.microRule{margin-top:auto;padding:11px 12px;border-left:3px solid var(--accent2);border-radius:0 10px 10px 0;background:rgba(102,209,180,.055);color:#dbe8e0;font-size:12px;line-height:1.55}.weakCard .btn{width:100%;margin-top:12px}.confidence{display:flex;gap:8px;align-items:center;margin-top:16px;color:var(--muted);font-size:11px}.confidence:before{content:"";width:38px;height:3px;border-radius:99px;background:var(--accent)}@media(max-width:1080px){.weakGrid{grid-template-columns:repeat(2,minmax(0,1fr))}.personalHead{grid-template-columns:1fr}.rhythm{grid-template-columns:repeat(2,1fr)}}@media(max-width:620px){.weakGrid{grid-template-columns:1fr}.rhythm{grid-template-columns:1fr}.weakCard{min-height:0}.personal{padding:66px 14px 74px}}'''
if '</style>' not in s:
    raise RuntimeError('style close not found')
s = s.replace('</style>', css + '</style>', 1)

play_link = '<a class="play" href="#arena">플레이</a>'
if play_link not in s:
    raise RuntimeError('nav play link not found')
s = s.replace(play_link, '<a href="#personal">내 게임</a>' + play_link, 1)

personal = r'''<section class="personal" id="personal"><div class="personalWrap"><div class="personalHead"><div><div class="kicker">PERSONAL REVIEW · FRITZ GAME · 2026.08.07</div><h2>내 실수에서<br>바로 훈련한다.</h2><p class="personalNote">이 한 판만으로 만든 잠정 진단입니다. 결과보다 반복 가능한 사고 습관에 초점을 맞췄습니다. 핵심은 <strong>내 수를 찾기 전에 상대의 수를 한 번 더 읽는 것</strong>입니다.</p><div class="confidence">한 게임 기반 · 다음 기보가 들어오면 패턴을 누적해 갱신</div></div><div class="rhythm" aria-label="개인 사고 루프"><div class="rhythmStep"><b>01 · STOP</b><span>바로 두지 말고 2초 멈춤</span></div><div class="rhythmStep"><b>02 · CCT</b><span>상대 체크 · 잡기 · 위협</span></div><div class="rhythmStep"><b>03 · LAST MOVE</b><span>방금 상대 수가 바꾼 것</span></div><div class="rhythmStep"><b>04 · LANDING</b><span>내 목적지 칸의 안전</span></div></div></div><div class="weakGrid"><article class="weakCard" data-n="1"><span class="weakTag">PRIORITY · HIGH</span><h3>장거리 라인 스캔</h3><span class="moment">9.Bg5? → ...Qxc3+</span><p>비숍을 움직이는 동안 흑 퀸의 <strong>f6–e5–d4–c3</strong> 대각선이 유지됐고, c3 나이트가 체크와 함께 떨어졌습니다.</p><div class="microRule"><strong>규칙:</strong> 내 기물을 움직이기 전, 상대 퀸·룩·비숍의 직선이 내 느슨한 기물까지 닿는지 먼저 긁어봅니다.</div><button class="btn primary stageBtn" data-stage="personalRay">이 장면 다시 두기</button></article><article class="weakCard" data-n="2"><span class="weakTag">PRIORITY · MEDIUM</span><h3>강제수 우선순위</h3><span class="moment">23.Qxa4? · missed something</span><p>Fritz가 ‘missed something’으로 표시한 장면입니다. 자동으로 퀸을 교환하기 전에 <strong>체크 → 잡기 → 위협</strong> 후보를 먼저 전부 생성합니다.</p><div class="microRule"><strong>규칙:</strong> 눈앞의 교환이 자연스러워 보여도 체크 하나·잡기 하나를 최소한 비교한 뒤 결정합니다.</div><button class="btn primary stageBtn" data-stage="personalCct">후보수 비교 훈련</button></article><article class="weakCard" data-n="3"><span class="weakTag">PRIORITY · HIGH</span><h3>직전 수의 위협</h3><span class="moment">31...Nd5 → 32.Bc4? Nxf4</span><p>31...Nd5가 나온 직후 f4 폰이 공격받았지만, 32.Bc4로 별도 계획을 진행하면서 즉시 <strong>...Nxf4</strong>를 허용했습니다.</p><div class="microRule"><strong>규칙:</strong> 상대가 둔 직후 “새로 공격받은 내 기물/폰은?”에 답하기 전에는 내 계획을 시작하지 않습니다.</div><button class="btn primary stageBtn" data-stage="personalThreat">위협 대응 훈련</button></article><article class="weakCard" data-n="4"><span class="weakTag">PRIORITY · HIGH</span><h3>목적지 칸 안전</h3><span class="moment">33.Ra6? → ...Bb7 → 34.Ra7</span><p>룩을 a6에 올리자 ...Bb7가 템포를 얻으며 룩을 다시 밀어냈습니다. 아이디어보다 <strong>도착한 칸에서 상대가 얻는 강제 템포</strong>를 먼저 확인합니다.</p><div class="microRule"><strong>규칙:</strong> 후보수를 고른 뒤 마지막 질문은 “그 칸에 두면 상대가 내 말을 때리며 전개할 수 있는가?”입니다.</div><button class="btn primary stageBtn" data-stage="personalSquare">목적지 안전 훈련</button></article></div></div></section>'''
arena = '<section class="arena" id="arena">'
if arena not in s:
    raise RuntimeError('arena section not found')
s = s.replace(arena, personal + arena, 1)

end_opt = '<option value="endgame">엔드게임</option>'
if end_opt not in s:
    raise RuntimeError('stage option not found')
extra_opts = '<optgroup label="내 게임 약점 훈련"><option value="personalRay">장거리 라인 스캔</option><option value="personalCct">강제수 후보 비교</option><option value="personalThreat">직전 수의 위협</option><option value="personalSquare">목적지 칸 안전</option></optgroup>'
s = s.replace(end_opt, end_opt + extra_opts, 1)

hotkeys = '<kbd>E 엔드게임</kbd>'
if hotkeys not in s:
    raise RuntimeError('hotkey anchor not found')
s = s.replace(hotkeys, hotkeys + '<kbd>T 내 게임 훈련</kbd>', 1)

stage_props = r''',personalRay:{fen:'rn2kbnr/pp3ppp/2p1bq2/8/1P6/P1NP1N2/2P2PPP/R1BQKB1R w KQkq - 1 9',label:'MY GAME · RAY',status:'개인 훈련 · 상대 장거리 라인을 먼저 스캔',main:'9수째 장면입니다. c3 나이트가 흑 퀸의 대각선 위에 있습니다.',sub:'f6 → e5 → d4 → c3를 눈으로 연결하세요. 이 라인을 끊거나 나이트를 안전하게 만든 뒤 다른 계획을 시작합니다.',personal:true},personalCct:{fen:'rn1r3k/4np2/1p4pp/1R1b4/q7/2P2N2/4BPPP/3Q1RK1 w - - 1 23',label:'MY GAME · CCT',status:'개인 훈련 · 자연스러운 교환 전에 강제수 생성',main:'23수째 장면입니다. Qxa4를 자동으로 두기 전에 후보수를 더 만드세요.',sub:'답을 외우는 훈련이 아닙니다. 체크 → 잡기 → 위협 순서로 최소 3개 후보를 만든 뒤 한 수를 고릅니다.',personal:true},personalThreat:{fen:'8/R4pk1/1pb3pp/3n4/1P3PP1/8/4B2P/6K1 w - - 1 32',label:'MY GAME · THREAT',status:'개인 훈련 · 31...Nd5가 만든 위협을 먼저 해결',main:'흑의 직전 수는 ...Nd5입니다. 새로 공격받은 백의 폰 하나를 먼저 찾으세요.',sub:'32.Bc4?처럼 별도 계획을 시작하면 ...Nxf4가 즉시 들어옵니다. 직전 수가 바꾼 공격 관계부터 갱신하세요.',personal:true},personalSquare:{fen:'8/R4pk1/1pb3pp/8/1PB2nP1/8/7P/6K1 w - - 0 33',label:'MY GAME · LANDING',status:'개인 훈련 · 목적지에서 상대 템포 수를 예측',main:'33수째 장면입니다. Ra6를 두기 전에 흑 비숍이 다음 수에 어디로 갈지 보세요.',sub:'a6에 룩을 두면 ...Bb7가 룩을 공격하며 템포를 얻습니다. 후보수마다 도착 후 상대의 가장 강한 공격을 한 번 계산하세요.',personal:true}'''
m = re.search(r'(const ST=\{.*?)(\};\nconst \$=)', s, re.S)
if not m:
    raise RuntimeError('ST object anchor not found')
s = s[:m.start()] + m.group(1) + stage_props + m.group(2) + s[m.end():]

helper = r'''function findMove(a,z,c='b'){const f=idx(a),t=idx(z);return legal(st,c).find(m=>m.from===f&&m.to===t)||null}
function trainingReply(){if(!ST[cur]?.personal||st.turn!=='b')return null;const w=[...hist].reverse().find(x=>x.side==='w')?.n||'';if(cur==='personalRay'&&w==='Bg5'&&st.board[idx('c3')]==='N')return findMove('f6','c3');if(cur==='personalCct'&&w==='Qxa4')return findMove('a8','a4');if(cur==='personalThreat'&&w==='Bc4'&&st.board[idx('f4')]==='P')return findMove('d5','f4');if(cur==='personalSquare'&&w==='Ra6')return findMove('c6','b7');return null}
'''
ai_anchor = 'function ai(){const ms='
if ai_anchor not in s:
    raise RuntimeError('ai anchor not found')
s = s.replace('function ai(){', helper + 'function ai(){const forced=trainingReply();if(forced)return forced;', 1)

personal_coach = r'''function personalCoach(){if(!hist.length)return{main:ST[cur].main,sub:ST[cur].sub};if(st.turn==='b')return{main:'한 수를 뒀습니다. 이제 상대의 가장 직접적인 응수를 확인합니다.',sub:'내 수가 좋아 보이는지보다 상대가 체크·잡기·템포 공격으로 즉시 반박할 수 있는지를 먼저 보세요.'};const ns=hist.map(x=>x.n);if(cur==='personalRay'){if(ns.includes('Qxc3+'))return{main:'패턴 재현: c3 나이트가 체크와 함께 떨어졌습니다.',sub:'다시 시작해서 내 계획보다 먼저 상대 퀸의 f6–e5–d4–c3 직선을 확인하세요.'};return{main:'이번에는 ...Qxc3+의 즉시 전술을 허용하지 않았습니다.',sub:'매 수 상대 퀸·룩·비숍의 새 직선을 다시 그리는 습관을 유지하세요.'}}if(cur==='personalCct'){if(ns.includes('Qxa4')&&ns.includes('Rxa4'))return{main:'원래 게임의 자동 교환 흐름이 재현됐습니다.',sub:'Qxa4가 합법인지가 아니라, 두기 전 체크·잡기·위협 후보를 충분히 생성했는지가 훈련 포인트입니다.'};return{main:'한 수를 두기 전에 강제수 후보를 최소 세 개 만드세요.',sub:'체크 → 잡기 → 위협 → 조용한 수 순서를 고정하면 눈앞의 자연스러운 수에 바로 손이 가는 습관을 줄일 수 있습니다.'}}if(cur==='personalThreat'){if(ns.includes('Nxf4'))return{main:'직전 수의 위협을 놓쳤습니다: ...Nxf4가 들어왔습니다.',sub:'31...Nd5가 나온 순간 “무엇을 새로 공격했나?”의 답은 f4였습니다. 다시 시작해 그 위협부터 처리하세요.'};return{main:'이번에는 f4의 즉시 위협을 넘겼습니다.',sub:'상대 직전 수가 만든 공격·수비·열린 선을 먼저 갱신한 뒤 내 계획으로 넘어가세요.'}}if(cur==='personalSquare'){if(ns.includes('Ra6')&&ns.includes('Bb7'))return{main:'예상해야 할 템포: ...Bb7가 룩을 다시 공격합니다.',sub:'a6에 갈 수는 있지만 상대가 기물을 개선하면서 룩을 때립니다. 목적지 안전 검사를 마지막 단계로 고정하세요.'};return{main:'목적지에서 상대가 얻는 템포를 계속 계산하세요.',sub:'“그 칸에 두면 체크·잡기·공격을 맞는가?”를 후보수마다 한 번 확인하세요.'}}return{main:ST[cur].main,sub:ST[cur].sub}}
'''
coach_anchor = 'function coach(){if(over)'
if coach_anchor not in s:
    raise RuntimeError('coach anchor not found')
s = s.replace('function coach(){', personal_coach + 'function coach(){if(ST[cur]?.personal)return personalCoach();', 1)

key_anchor = "if(k==='e')load('endgame',true)"
if key_anchor not in s:
    raise RuntimeError('keyboard anchor not found')
s = s.replace(key_anchor, key_anchor + ";if(k==='t')load('personalRay',true)", 1)

required = ['id="personal"','personalRay:','personalCct:','personalThreat:','personalSquare:','function trainingReply()','function personalCoach()','T 내 게임 훈련']
missing = [x for x in required if x not in s]
if missing:
    raise RuntimeError(f'post-patch validation failed: {missing}')
path.write_text(s, encoding='utf-8')
print('personal training applied')
