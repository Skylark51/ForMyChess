# ForMyChess

브라우저에서 바로 실행하는 개인 체스 학습용 웹게임입니다.

## 현재 구현

- 오프닝 / 미들게임 / 엔드게임 학습 섹션과 전용 시작 포지션
- 스크롤 기반 단일 페이지 학습 흐름
- 클릭 방식 체스 플레이와 거리 기반 부드러운 말 이동 애니메이션
- 합법 수 판정, 체크 / 체크메이트 / 스테일메이트
- 캐슬링, 앙파상, 자동 퀸 승격
- 체크 펄스 및 체크메이트 소형 파티클 이펙트
- 좌표 기보, 포지션 평가 바, 단계별 코치 메시지
- 모바일 반응형 UI와 키보드 단축키
- 백 전용 **나이트 포크 예방 7문제 세트**: c2/f2/e2/e3 포크, d4 중앙 전초기지, 스크린샷형 Nd4+ 사전 차단, 엔드게임 왕·룩 포크를 클릭식으로 반복 훈련

## AI

기존의 단순 1–3 ply 미니맥스보다 한 단계 강화된 오프라인 AI를 사용합니다.

- Lichess `chess-openings` CC0 데이터에서 정리한 마스터 오프닝 북
- Karpov–Kasparov 1985 Game 16, Byrne–Fischer 1956, Marshall–Capablanca 1909 Game 23의 실제 수순을 모델 게임으로 추가
- 포지션 키 기반 북 매칭: 모델 경로가 일치하면 역사적 흑 수를 참조하고, 벗어나면 즉시 탐색 AI로 전환
- 난이도별 2 / 3 / 4 ply 목표의 iterative deepening
- alpha-beta pruning + transposition cache
- capture quiescence search
- material / center / development / mobility / pawn structure / bishop pair / rook activity / king safety / endgame king activity 평가
- 난이도별 시간 예산으로 브라우저가 지나치게 오래 멈추는 것을 제한

큰 Stockfish 바이너리나 온라인 API 없이 `index.html`을 직접 열어도 동작하는 구성을 유지합니다.

## 개인 기보와 세이브파일

AI Arena의 대국은 브라우저에서 매 수 자동 저장됩니다.

- 진행 중: `localStorage` draft로 즉시 보존
- 체크메이트 / 스테일메이트 / 재시작 / 학습 단계 변경: 한 판 단위 기록으로 확정
- `현재 기보 저장`: 현재 게임 JSON 다운로드
- `전체 백업`: 지금까지 누적된 모든 게임을 하나의 JSON bundle로 다운로드
- 각 게임에는 PGN, UCI 수순, 매 ply FEN, 전후 평가값, 오프닝/모델게임 참조 기록이 함께 들어갑니다.

브라우저는 보안상 로컬 Git 저장소에 직접 파일을 쓸 수 없기 때문에, 장기 보관/분석용 원천 데이터는 백업 JSON을 가져와 `data/games/`로 넣습니다.

```bash
python tools/import_browser_save.py ~/Downloads/formychess-save-2026-08-07.json
python tools/validate_game_data.py
python tools/build_training_catalog.py
```

개인 기보의 최종 원천 데이터베이스는 기존 원칙대로 `data/games/<game_id>.json`의 **한 판당 한 파일** 구조를 유지합니다. `data/README.md`를 참고하세요.

## Reference data

표준 오프닝은 `lichess-org/chess-openings`의 CC0 공개 데이터에서 정리했고, 유명 모델 게임은 역사적 기보의 수순을 compact position→move reference로 사용합니다. 출처와 사용 원칙은 `data/reference/README.md`에 기록합니다.

## 실행

`index.html`을 브라우저에서 열면 별도 서버 없이 실행됩니다.

단축키: `O` 오프닝, `M` 미들게임, `E` 엔드게임, `R` 현재 단계 재시작. `N`은 나이트 대비 훈련 세트로 이동합니다.
