# Codex config.toml 주요 설정 가이드

공식 문서 확인일: **2026-09-30**

사용자가 자주 조정하는 옵션을 정리한 참고 문서입니다. 실제 설정 파일을 변경하지 않습니다. 옵션 지원 여부는 설치된 Codex 버전·모델·실행 환경에 따라 달라집니다.

## 1. 설정 위치와 적용 순서

| 위치 | 용도 |
| --- | --- |
| `~/.codex/config.toml` | 사용자 기본 설정 |
| 프로젝트의 `.codex/config.toml` | 해당 프로젝트 설정. 신뢰하는 프로젝트만 로드 |
| `~/.codex/<이름>.config.toml` | CLI에서 선택하는 프로필 |

우선순위는 **CLI 옵션 → 프로젝트 설정 → 선택한 프로필 → 사용자 설정 → 클라우드 관리 기본값 → 시스템 설정 → 내장 기본값**입니다. 조직의 강제 정책은 별도로 적용되므로 사용자 설정으로 해제할 수 없습니다.

값을 생략하면 하위 설정이나 기본값을 따릅니다. “이 파일에 없음”이 곧 “기능 꺼짐”을 뜻하지 않습니다. CLI와 IDE 확장은 설정 계층을 공유하지만, VS Code의 `chatgpt.*` 편집기 설정과는 구분됩니다.

출처: [설정 기본](https://learn.chatgpt.com/docs/config-file/config-basic), [개발자 설정](https://learn.chatgpt.com/docs/developer-settings)

## 2. 모델과 응답

| 키 | 옵션값 | 의미 |
| --- | --- | --- |
| `model` | 사용 가능한 모델 ID 문자열 | 기본 모델. 계정에서 지원하는 ID 사용 |
| `model_reasoning_effort` | 모델별 문자열. 예: `low`, `medium`, `high`, `xhigh`, `max`, `ultra` | 추론 강도. 모든 모델이 전부 지원하지는 않음 |
| `plan_mode_reasoning_effort` | 모델이 지원하는 추론 강도 | Plan 모드 전용 |
| `model_reasoning_summary` | `auto`, `concise`, `detailed`, `none` | 추론 요약: 자동·간결·상세·끔 |
| `model_verbosity` | `low`, `medium`, `high` | 응답 분량. 공식 문서는 GPT-5 Responses API용으로 명시 |
| `personality` | `none`, `friendly`, `pragmatic` | 대화 스타일. 지원 모델에 적용 |

출처: [설정 참조](https://learn.chatgpt.com/docs/config-file/config-reference), [공식 설정 예제](https://learn.chatgpt.com/docs/config-file/config-sample)

## 3. 승인과 실행 권한

| 키 | 옵션값 | 의미 |
| --- | --- | --- |
| `approval_policy` | `on-request`, `never`, 세부 정책 테이블 | 필요시 승인 요청 / 승인 요청 없이 실행 가능한 범위만 수행 / 유형별 제어 |
| `approvals_reviewer` | `user`, `auto_review` | 사용자 또는 자동 검토기가 승인 검토 |
| `sandbox_mode` | `read-only`, `workspace-write`, `danger-full-access` | 읽기 전용 / 작업 영역 쓰기 / 샌드박스 제한 해제 |
| `sandbox_workspace_write.network_access` | `true`, `false` | 작업 영역 샌드박스의 명령 네트워크 접근 |
| `sandbox_workspace_write.writable_roots` | 경로 문자열 배열 | 추가 쓰기 허용 경로 |
| `projects.<path>.trust_level` | `trusted`, `untrusted` | 프로젝트 신뢰 여부 |

`never`는 모든 권한을 부여하는 옵션이 아닙니다. 승인 여부와 실행 범위는 별개입니다. 프로젝트 신뢰도 역시 전체 디스크 쓰기 권한을 뜻하지 않습니다.

최신 문서에서 `approval_policy = "untrusted"`는 지원 종료, `on-failure`는 사용 중단 예정입니다. 프로젝트의 `trust_level = "untrusted"`는 여전히 지원합니다.

고급 옵션 `default_permissions`는 `:read-only`, `:workspace`, `:danger-full-access` 또는 사용자 정의 프로필명을 받습니다. `sandbox_mode`·`[sandbox_workspace_write]`와 혼용하지 않습니다.

출처: [설정 참조의 승인·샌드박스 옵션](https://learn.chatgpt.com/docs/config-file/config-reference)

## 4. 검색, 기록, 화면

| 키 | 옵션값 | 의미 |
| --- | --- | --- |
| `web_search` | `disabled`, `cached`, `indexed`, `live` | 끔 / 캐시된 검색 / 검색 인덱스를 통한 외부 웹 접근 / 최신 웹 접근 |
| `history.persistence` | `save-all`, `none` | 로컬 `history.jsonl` 기록 저장 여부 |
| `history.max_bytes` | 바이트 수 | 기록 파일 최대 크기 |
| `tui.resume_cwd` | `current`, `session` | 재개 시 현재 디렉터리 / 세션에 저장된 디렉터리 |
| `tui.notifications` | `true`, `false`, 이벤트 문자열 배열 | 터미널 알림 설정 |

검색 기본값은 보통 `cached`이며 전체 접근 설정에서는 `live`가 기본일 수 있습니다. 명령 네트워크 설정과 웹 검색은 서로 다른 제어입니다. `history.persistence`는 로컬 기록 설정이며 전체 서비스의 데이터 보존 정책을 바꾸지 않습니다.

출처: [공식 설정 예제](https://learn.chatgpt.com/docs/config-file/config-sample), [고급 설정](https://learn.chatgpt.com/docs/config-file/config-advanced)

## 5. MCP와 플러그인

MCP는 외부 도구 서버 연결입니다. 아래 `mcp_servers.<이름>.` 키는 서버별로 지정합니다.

| 하위 키 | 옵션값 | 용도 |
| --- | --- | --- |
| `command`, `args` | 실행 명령 문자열, 인자 배열 | 로컬 서버 실행 |
| `url` | URL 문자열 | HTTP 서버 연결 |
| `enabled` | `true`, `false` | 연결 활성화 |
| `env` | 문자열 키·값 테이블 | 로컬 서버 환경변수 |
| `bearer_token_env_var` | 환경변수 이름 | HTTP 인증 토큰 참조 |
| `startup_timeout_sec` | 초 단위 숫자, 기본 `10` | 시작 제한 시간 |
| `tool_timeout_sec` | 초 단위 숫자, 기본 `60` | 도구 호출 제한 시간 |
| `enabled_tools`, `disabled_tools` | 도구 이름 배열 | 허용·차단 목록. 차단 우선 |

플러그인은 `[plugins."플러그인@마켓플레이스"]`의 `enabled = true/false`로 제어합니다. 비활성화와 삭제는 다릅니다. 마켓플레이스의 `source_type`은 `local` 또는 `git`, `source`는 로컬 절대 경로나 Git 저장소 위치입니다.

출처: [공식 설정 예제](https://learn.chatgpt.com/docs/config-file/config-sample), [설정 참조](https://learn.chatgpt.com/docs/config-file/config-reference)

## 6. 시작용 예제와 권장 설정

### 6.1. 일반적인 로컬 개발

아래는 문서 작성자가 구성한 일반적인 로컬 개발 예제입니다. 공식 기본값 전체를 재현한 것은 아닙니다. 모델은 계정에서 선택할 수 있도록 생략했습니다.

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

기존 파일에 합칠 때는 같은 키·테이블을 중복 선언하지 마세요. `model` 같은 최상위 키는 첫 `[테이블]`보다 앞에 넣습니다. 예를 들어 `[tui]` 아래에 `model`을 추가하면 최상위 모델 설정이 되지 않습니다.

위 스키마 주석은 호환 TOML 확장에서 자동 완성·진단을 돕습니다. 실제 실행 환경에서 지원되는지는 별도 확인해야 합니다.

출처: [공식 설정 예제](https://learn.chatgpt.com/docs/config-file/config-sample), [설정 참조](https://learn.chatgpt.com/docs/config-file/config-reference)

### 6.2. 이 저장소의 웹 실습용 권장 설정

HTML·CSS·순수 JavaScript 수정과 학습에는 아래 구성을 시작점으로 권장합니다. 공식 필수 설정이 아니라 이 저장소의 작업 특성에 맞춘 제안입니다. `~/.codex/config.toml`에 필요한 항목만 반영하세요. 6.1 예제와 중복해서 붙이지 않습니다.

```toml
#:schema https://developers.openai.com/codex/config-schema.json

# 모델은 계정에서 사용 가능한 모델을 선택합니다.
# 아래 추론 강도를 지원하는 모델에서 사용하세요.
model_reasoning_effort = "medium"

approval_policy = "on-request"
approvals_reviewer = "user"
sandbox_mode = "workspace-write"
web_search = "cached"

[sandbox_workspace_write]
network_access = false

[tui]
notifications = true
```

| 선택 | 이 저장소에서의 권장 이유 |
| --- | --- |
| 추론 강도 `medium` | 작은 화면 수정과 기능 구현의 시작값으로 사용하고, 결과를 보고 조정 |
| `on-request` + `user` | 추가 승인이 필요한 작업을 사용자가 검토 |
| `workspace-write` | 실습 파일을 수정하고 로컬 검사를 실행하는 작업에 사용 |
| 명령 네트워크 `false` | 패키지 설치나 빌드 의존성이 없는 현재 프로젝트에 적합 |
| 검색 `cached` | 일반적인 개발 참고에 사용. 최신 정보 확인 시에는 `live` 선택 |
| 터미널 알림 `true` | CLI에서 작업 완료나 입력 대기 알림을 받기 위한 설정 |

추론 강도를 지원하지 않는 모델에서는 `model_reasoning_effort` 줄을 생략하세요. 터미널 알림은 IDE 알림 설정과 구분됩니다.

### 6.3. 복잡한 수정·최신 문서 조사용 프로필

여러 파일에 걸친 원인 분석이나 최신 API 문서 조사가 필요할 때 선택할 예제입니다. 다음을 `~/.codex/deep-work.config.toml`에 저장하고 CLI에서 선택하세요. `high`를 지원하는 모델을 전제로 합니다.

```toml
model_reasoning_effort = "high"
approval_policy = "on-request"
approvals_reviewer = "user"
sandbox_mode = "workspace-write"
web_search = "live"

[sandbox_workspace_write]
network_access = false
```

```sh
codex --profile deep-work
```

웹 검색을 `live`로 바꿔도 셸 명령의 네트워크 접근을 허용하는 것은 아닙니다. 프로필보다 프로젝트 설정과 CLI 옵션이 우선하므로, 같은 키가 다른 계층에도 있는지 확인하세요. 프로필 파일 방식의 버전 조건과 일회성 변경은 7절을 참고하세요.

출처: [설정 참조](https://learn.chatgpt.com/docs/config-file/config-reference), [고급 설정의 프로필](https://learn.chatgpt.com/docs/config-file/config-advanced). 권장 예시 확인일: **2026-09-30**.

## 7. 작업별 프로필과 일회성 변경

현재 문서 기준으로 프로필은 별도 파일입니다. 다음 내용을 `~/.codex/review.config.toml`에 저장하면 됩니다.

```toml
approval_policy = "on-request"
sandbox_mode = "read-only"
```

```sh
codex --profile review
codex --config 'web_search="live"'
```

첫 명령은 검토용 프로필을 선택하고, 두 번째는 해당 실행에서만 검색 설정을 바꿉니다. 프로필에는 사용자 기본값과 다른 항목만 적으면 됩니다.

**Codex 0.134.0 이상**에서는 기존 `[profiles.review]`와 최상위 `profile = "review"` 방식을 사용하지 않습니다. 오래된 안내를 적용하기 전에 설치 버전을 확인하세요.

출처: [고급 설정의 프로필·CLI 재정의](https://learn.chatgpt.com/docs/config-file/config-advanced)

## 8. 기존 파일에서 구분해 볼 항목

현재 사용자 파일에는 플러그인, `node_repl` 실행 환경, 데스크톱 UI 상태처럼 앱이 관리하는 값도 포함되어 있습니다. `NODE_REPL_*` 경로·해시, 모델 안내 표시 기록은 일반적인 모델 선택 옵션과 구분해서 보세요.

이 문서는 공개 문서로 확인할 수 있는 사용자 설정을 중심으로 작성했습니다. 내부 상태 키의 미확인 옵션값은 나열하지 않았습니다. 실제 파일 수정 시 필요한 항목만 기존 설정에 반영하세요.
