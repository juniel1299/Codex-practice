# Codex 슬래시 커맨드 가이드

`index.html`을 브라우저에서 열면 실행됩니다. 빌드나 패키지 설치는 필요 없습니다.

- HTML, CSS, JavaScript로 구성한 한국어 반응형 페이지
- 실용적인 명령 12개를 4단계 학습 순서로 구성
- 앱 / IDE 확장 / 터미널 필터와 키워드 검색
- 명령 복사, 검색 결과 없음 처리, `/` 검색 포커스 단축키
- Google Fonts를 불러오지 못하면 시스템 글꼴 사용

## 내용 기준

2026-09-30 공식 문서를 확인했습니다. 명령의 지원 환경은 슬래시 명령 목록을 기준으로 하며, 동일 기능의 다른 UI 제공 여부를 의미하지 않습니다. 실제 메뉴는 버전과 계정 권한에 따라 달라질 수 있습니다.

- [앱 명령](https://learn.chatgpt.com/docs/reference/slash-commands)
- [IDE 및 CLI 명령](https://learn.chatgpt.com/docs/developer-commands)

앱의 기존 Codex 문서 링크는 현재 ChatGPT 데스크톱 앱 문서로 연결됩니다.

## 확인 사항

JavaScript 문법 검사와 Node VM 기반 렌더링·필터·검색·빈 결과 검사를 통과했습니다. 브라우저의 로컬 파일 접근 정책으로 실제 화면 및 클립보드 동작은 자동 검증하지 못했습니다. 모바일 대응은 600px 및 850px 미디어 쿼리로 구현했습니다.
