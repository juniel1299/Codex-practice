# Codex config.toml 주요 설정 가이드

공식 문서 확인일: **2026-09-30**

일상적으로 조정할 만한 옵션과 예제를 정리했습니다. 실제 사용자 설정은 변경하지 않습니다. 설치 버전·모델·실행 환경에 따라 지원 범위가 달라질 수 있습니다.

## 1. 설정 위치와 우선순위

| 위치 | 용도 |
| --- | --- |
| `~/.codex/config.toml` | 사용자 기본값 |
| 프로젝트의 `.codex/config.toml` | 신뢰하는 프로젝트의 재정의 |
| `~/.codex/<이름>.config.toml` | CLI에서 선택할 프로필 |

우선순위는 **CLI 옵션 → 프로젝트 → 선택한 프로필 → 사용자 → 클라우드 관리 기본값 → 시스템 → 내장 기본값**입니다. 조직의 강제 정책은 별도로 적용됩니다. 생략한 항목은 하위 설정이나 기본값을 따르므로, 파일에 없다고 기능이 꺼진 것은 아닙니다.

CLI와 IDE 확장은 설정 계층을 공유합니다. VS Code의 `chatgpt.*` 편집기 설정은 별도입니다.

출처: [설정 기본](https://learn.chatgpt.com/docs/config-file/config-basic), [개발자 설정](https://learn.chatgpt.com/docs/developer-settings)

## 2. 모델과 응답

| 키 | 옵션값 | 의미 |
| --- | --- | --- |
| `model` | 계정에서 사용 가능한 모델 ID 문자열 | 기본 모델 |
| `model_reasoning_effort` | 모델별 문자열. 예: `low`, `medium`, `high`, `xhigh`, `max`, `ultra` | 추론 강도. 지원값은 모델·클라이언트별로 다름 |
| `plan_mode_reasoning_effort` | 선택한 모델이 지원하는 추론 강도 | Plan 모드 전용 |
| `model_reasoning_summary` | `auto`, `concise`, `detailed`, `none` | 요약: 자동·간결·상세·끔 |
| `model_verbosity` | `low`, `medium`, `high` | 응답 분량. 문서는 GPT-5 Responses API용으로 명시 |
| `personality` | `none`, `friendly`, `pragmatic` | 대화 스타일. 지원 모델에 적용 |

출처: [설정 참조](https://learn.chatgpt.com/docs/config-file/config-reference), [공식 설정 예제](https://learn.chatgpt.com/docs/config-file/config-sample)

## 3. 승인과 실행 권한

| 키 | 옵션값 | 의미 |
| --- | --- | --- |
| `approval_policy` | `on-request`, `never`, 세부 정책 테이블 | 필요시 승인 요청 / 요청 없이 허용 범위에서 수행 / 유형별 제어 |
| `approvals_reviewer` | `user`, `auto_review` | 사용자 / 자동 검토기 |
| `sandbox_mode` | `read-only`, `workspace-write`, `danger-full-access` | 읽기 전용 / 작업 영역 쓰기 / 샌드박스 제한 해제 |
| `sandbox_workspace_write.network_access` | `true`, `false` | 명령 네트워크 접근 |
| `sandbox_workspace_write.writable_roots` | 경로 문자열 배열 | 추가 쓰기 경로 |
| `projects.<path>.trust_level` | `trusted`, `untrusted` | 프로젝트 신뢰 여부 |

승인과 실행 범위는 별개입니다. `never`는 전체 권한 부여를 뜻하지 않습니다. 프로젝트 신뢰도 전체 디스크 쓰기 권한을 의미하지 않습니다.

`approval_policy = "untrusted"`는 지원 종료, `on-failure`는 사용 중단 예정입니다. `trust_level = "untrusted"`는 유효합니다.

고급 옵션 `default_permissions`는 `:read-only`, `:workspace`, `:danger-full-access` 또는 사용자 정의 프로필명입니다. `sandbox_mode`·`[sandbox_workspace_write]`와 혼용하지 않습니다.

출처: [설정 참조](https://learn.chatgpt.com/docs/config-file/config-reference)

## 4. 검색·기록·화면

| 키 | 옵션값 | 의미 |
| --- | --- | --- |
| `web_search` | `disabled`, `cached`, `indexed`, `live` | 끔 / 캐시 / 검색 인덱스를 통한 외부 접근 / 최신 웹 접근 |
| `history.persistence` | `save-all`, `none` | 로컬 `history.jsonl` 저장 여부 |
| `history.max_bytes` | 바이트 수 | 기록 최대 크기. 초과 시 오래된 항목 정리 |
| `tui.resume_cwd` | `current`, `session` | 재개 시 현재 / 저장된 작업 디렉터리 |
| `tui.notifications` | `true`, `false`, 이벤트 배열 | 터미널 알림. 예: `["agent-turn-complete"]` |

검색 기본값은 보통 `cached`이며 전체 접근에서는 `live`가 기본일 수 있습니다. 명령 네트워크와 웹 검색은 서로 다른 제어입니다. 로컬 기록 옵션이 전체 서비스의 데이터 보존 정책을 바꾸지는 않습니다.

출처: [공식 설정 예제](https://learn.chatgpt.com/docs/config-file/config-sample), [고급 설정](https://learn.chatgpt.com/docs/config-file/config-advanced)

## 5. MCP·플러그인

MCP는 외부 도구 서버 연결입니다. 다음은 `mcp_servers.<서버이름>.` 아래에 설정합니다.

| 하위 키 | 옵션값 | 용도 |
| --- | --- | --- |
| `command`, `args` | 명령 문자열, 인자 배열 | 로컬 서버 실행 |
| `url` | URL 문자열 | HTTP 서버 연결 |
| `enabled` | `true`, `false` | 활성화 |
| `env` | 문자열 키·값 테이블 | 로컬 서버 환경변수 |
| `bearer_token_env_var` | 환경변수 이름 | HTTP 인증 토큰 참조 |
| `startup_timeout_sec` | 초 단위 숫자, 기본 `10` | 시작 제한 시간 |
| `tool_timeout_sec` | 초 단위 숫자, 기본 `60` | 호출 제한 시간 |
| `enabled_tools`, `disabled_tools` | 도구 이름 배열 | 허용·차단 목록. 차단 우선 |

플러그인은 `[plugins."플러그인@마켓플레이스"]`의 `enabled = true/false`로 제어합니다. 비활성화는 삭제가 아닙니다. 마켓플레이스 `source_type`은 `local` 또는 `git`, `source`는 로컬 절대 경로나 Git 저장소 위치입니다.

출처: [공식 설정 예제](https://learn.chatgpt.com/docs/config-file/config-sample), [설정 참조](https://learn.chatgpt.com/docs/config-file/config-reference)

## 6. 시작용 예제

문서 작성자가 구성한 로컬 개발 예제이며 공식 기본값 전체를 재현한 것은 아닙니다. 모델은 계정에서 선택하도록 생략했습니다.

```toml
#:schema https://developers.openai.com/codex/config-schema.json

approval_policy = "on-request"
sandbox_mode = "workspace-write"
web_search = "cached"

[sandbox_workspace_write]
network_access = false

[history]
persistence = "save-all"

[tui]
resume_cwd = "current"
notifications = true
```

기존 파일에 합칠 때 같은 키·테이블을 중복 선언하지 마세요. `model` 같은 최상위 키는 첫 `[테이블]` 앞에 넣습니다. `[tui]` 아래에 넣으면 최상위 설정이 되지 않습니다. 스키마 주석은 호환 TOML 확장의 자동 완성·진단을 돕습니다.

출처: [공식 설정 예제](https://learn.chatgpt.com/docs/config-file/config-sample), [설정 참조](https://learn.chatgpt.com/docs/config-file/config-reference)

## 7. 프로필과 일회성 변경

검토용으로 `~/.codex/review.config.toml`을 만들 경우:

```toml
approval_policy = "on-request"
sandbox_mode = "read-only"
```

```sh
codex --profile review
codex --config 'web_search="live"'
```

첫 명령은 프로필 선택, 두 번째는 해당 실행의 검색 설정만 변경합니다. 프로필에는 사용자 기본값과 다른 값만 적으면 됩니다.

**Codex 0.134.0 이상**에서는 기존 `[profiles.review]` 및 최상위 `profile = "review"` 방식 대신 별도 프로필 파일을 사용합니다. 오래된 예제를 적용하기 전에 설치 버전을 확인하세요.

출처: [고급 설정](https://learn.chatgpt.com/docs/config-file/config-advanced)

## 8. 현재 파일의 내부 설정과 구분하기

현재 사용자 파일의 `NODE_REPL_*` 경로·해시, 데스크톱 UI 상태, 모델 안내 표시 기록은 일반적인 모델 선택 옵션과 구분해서 보세요. 이 문서는 공개된 사용자 설정을 중심으로 작성했으며, 내부 상태 키의 미확인 옵션값은 포함하지 않았습니다.
