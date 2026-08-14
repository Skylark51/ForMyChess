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
- **전술 리뷰 32문제 세트 (`tactics.html`)**: 초급 / 중급 / 고급 / 사활 4시리즈 × 8문제. 수를 직접 클릭하면 최선·부정확·실수·블런더 등급과 선택한 수의 문제점을 즉시 설명

## 전술 리뷰 32문제

`tactics.html`을 열면 별도 서버 없이 바로 실행됩니다.

- **초급 8문제**: 공격받은 기물, hanging pawn, 나이트 포크, 핀 라인, 재캡처, 백랭크 기본
- **중급 8문제**: 과부하된 수비수, 수비수 제거, 백랭크 수비, zwischenzug, clearance, 핀된 기물 압력, 패스폰, 퀸 교환
- **고급 8문제**: 포크 사전 차단, forcing move 수순, prophylaxis, deflection, line clearance, 포크 대상 분리, 공격자 교환
- **사활 8문제**: 한 수 실수 시 메이트·퀸 손실·승격·로열 포크를 허용하는 ONLY MOVE 훈련

특히 최근 게임 리뷰에서 나온 세 가지 실수 패턴을 반복하도록 구성했습니다.

1. **b3형 실수** — 공격받는 비숍을 무시하고 느린 폰 수를 두어 기물을 잃는 패턴
2. **Nf3형 블런더** — 상대 폰이 공격하고 비숍 핀까지 생기는 칸에 나이트를 개발하는 패턴
3. **O-O형 실수** — 캐슬링을 자동으로 두느라 hanging pawn / 핵심 패스폰을 잃는 패턴

각 문제는 FEN 기반의 합성 훈련 포지션이며, 특정 실수 패턴을 반복 학습하는 데 초점을 둡니다. 정답 여부와 별개로 선택한 수에 대한 즉시 해설을 제공하고, 완료 상태는 `localStorage`에 저장됩니다.

전술 페이지 단축키: `T` 상단으로 이동, `1` 초급, `2` 중급, `3` 고급, `4` 사활.

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

`index.html`을 브라우저에서 열면 별도 서버 없이 실행됩니다. 전술 리뷰는 `tactics.html`에서 실행합니다.

메인 단축키: `O` 오프닝, `M` 미들게임, `E` 엔드게임, `R` 현재 단계 재시작. `N`은 나이트 대비 훈련 세트로 이동합니다.
