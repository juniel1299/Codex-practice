# 기본 웹페이지 제작에 필요한 지식

이 문서는 웹 개발을 처음 시작하는 사람을 위한 학습 안내서입니다. HTML, CSS, JavaScript로 간단한 소개 페이지를 만드는 것을 목표로 합니다. 처음에는 프레임워크나 서버 없이 시작해도 충분합니다.

## 1. 웹페이지가 동작하는 방식

웹페이지는 브라우저가 HTML, CSS, JavaScript 등의 파일을 읽고 화면에 표시한 결과입니다.

- **HTML**: 제목, 문단, 이미지, 버튼 등 콘텐츠의 구조와 의미를 정의합니다.
- **CSS**: 색상, 글꼴, 간격, 배치 등 화면의 모양을 정의합니다.
- **JavaScript**: 클릭에 반응하거나 화면 내용을 바꾸는 동작을 구현합니다.

주소로 웹사이트에 접속하면 일반적으로 다음 과정이 일어납니다.

1. 브라우저가 URL에 지정된 서버로 HTTP 요청을 보냅니다.
2. 서버가 HTML 파일 등을 응답합니다.
3. 브라우저가 HTML에 연결된 CSS, JavaScript, 이미지 등을 가져옵니다.
4. 브라우저가 문서 구조와 스타일을 해석하고 화면을 그립니다.

| 용어 | 의미 |
| --- | --- |
| 브라우저 | 웹페이지를 해석하고 실행하는 프로그램 |
| 클라이언트 | 서버에 요청을 보내는 쪽. 웹에서는 주로 브라우저 |
| 서버 | 요청을 받아 파일이나 데이터를 제공하는 프로그램 또는 컴퓨터 |
| URL | 웹상의 자원을 가리키는 주소 |
| 도메인 | 사람이 기억하기 쉬운 사이트 이름 |
| 호스팅 | 웹페이지 파일을 다른 사람이 접속할 수 있는 서버에 올려 제공하는 것 |
| HTTPS | 통신 내용을 암호화하는 HTTP 연결 방식 |

## 2. 준비할 도구와 파일 구조

필수 도구는 코드 편집기와 웹 브라우저입니다. 브라우저의 **개발자 도구**는 화면과 오류를 확인할 때 사용합니다.

처음에는 다음처럼 파일을 구성하면 됩니다.

```text
my-webpage/
├── index.html
├── style.css
├── script.js
└── images/
    └── profile.jpg
```

- `index.html`: 첫 화면의 문서입니다.
- `style.css`: 화면 디자인을 작성합니다.
- `script.js`: 사용자 동작에 반응하는 코드를 작성합니다.
- `images/`: 이미지 파일을 보관합니다. 이미지를 쓰지 않으면 없어도 됩니다.

파일명은 영문 소문자와 하이픈 위주로 정하고, 확장자를 정확히 확인하세요. `index.html.txt`로 저장하면 HTML 문서로 열리지 않을 수 있습니다.

### 경로 이해하기

| 경로 예시 | 의미 |
| --- | --- |
| `./style.css` | 현재 파일과 같은 폴더의 파일 |
| `images/profile.jpg` | 현재 폴더 아래 `images` 폴더의 파일 |
| `../style.css` | 상위 폴더의 파일 |
| `/images/profile.jpg` | 웹사이트 루트 기준 경로 |

HTML의 경로는 보통 HTML 문서 위치를 기준으로 해석합니다. 외부 CSS 파일에 작성한 `url(...)`의 상대 경로는 해당 CSS 파일 위치를 기준으로 합니다. 서버에서는 파일명의 대소문자를 구분하는 경우가 많습니다.

## 3. HTML: 콘텐츠의 구조 만들기

HTML은 **태그**, **요소**, **속성**으로 문서를 표현합니다.

```html
<a href="https://example.com">예시 사이트 방문</a>
```

- `<a>`와 `</a>`: 링크를 나타내는 시작 태그와 종료 태그입니다.
- `href`: 링크의 목적지를 지정하는 속성입니다.
- 태그와 내부 콘텐츠를 합친 것이 요소입니다.

### 먼저 익힐 태그

| 태그 | 용도 |
| --- | --- |
| `h1` ~ `h6` | 문서의 제목과 하위 제목 |
| `p` | 문단 |
| `a` | 다른 페이지나 문서 내 위치로 이동하는 링크 |
| `img` | 이미지. `src`로 파일 위치, `alt`로 대체 텍스트 지정 |
| `ul`, `ol`, `li` | 순서 없는 목록과 순서 있는 목록 |
| `header`, `nav`, `main`, `section`, `footer` | 페이지의 의미 있는 영역 |
| `div`, `span` | 별도의 의미 없이 요소를 묶는 컨테이너 |
| `button` | 클릭해서 동작을 실행하는 버튼 |
| `form`, `label`, `input`, `textarea` | 사용자 입력을 받는 양식 |

### 작성 원칙

- 제목은 글자 크기가 아니라 문서의 계층에 맞게 선택합니다.
- 페이지 이동에는 `a`, 동작 실행에는 `button`을 사용합니다.
- 가능한 한 의미에 맞는 태그를 선택합니다. 이를 **시맨틱 HTML**이라고 합니다.
- 의미가 있는 이미지에는 내용을 설명하는 `alt`를 작성합니다. 장식용 이미지는 `alt=""`로 지정할 수 있습니다.
- 입력창에는 `label`을 연결합니다. 안내 문구인 `placeholder`만으로 이름을 대신하지 않습니다.

```html
<label for="email">이메일</label>
<input id="email" name="email" type="email" required>
```

이 코드만으로 이메일이 저장되거나 전송되지는 않습니다. 실제 제출 처리에는 별도의 서버나 서비스 연결이 필요합니다.

## 4. CSS: 모양과 배치 설정하기

CSS는 어떤 요소에 어떤 스타일을 적용할지 선언합니다.

```css
.card {
  color: #222222;
  background-color: #ffffff;
  padding: 24px;
}
```

여기서 `.card`는 선택자이고, `color`는 속성, `#222222`는 값입니다.

### 핵심 개념

| 개념 | 알아야 할 내용 |
| --- | --- |
| 선택자 | `p`는 태그, `.card`는 클래스, `#intro`는 ID를 선택 |
| 박스 모델 | 요소는 콘텐츠, 안쪽 여백(`padding`), 테두리(`border`), 바깥 여백(`margin`)으로 구성 |
| 크기 단위 | `px`는 CSS 픽셀, `%`는 기준 크기에 대한 비율, `rem`은 루트 글꼴 크기를 기준으로 계산 |
| Flexbox | 메뉴나 버튼처럼 주로 한 방향으로 배치할 때 유용 |
| Grid | 카드 목록처럼 행과 열로 배치할 때 유용 |
| 반응형 디자인 | 화면 크기에 맞춰 너비와 배치를 조정 |
| 상속 | 글자 색상 등 일부 속성이 부모에서 자식으로 전달 |
| 캐스케이드 | 여러 스타일 규칙이 충돌할 때 어떤 규칙을 적용할지 결정하는 방식 |

같은 요소에 여러 규칙이 적용되면 규칙의 중요도, 선택자 우선순위 등이 영향을 줍니다. 조건이 같다면 뒤에 작성된 규칙이 우선합니다. 스타일이 예상대로 적용되지 않으면 개발자 도구에서 실제 적용된 값을 확인하세요.

### 자주 쓰는 기본 설정

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
  line-height: 1.6;
}

img {
  max-width: 100%;
  height: auto;
}
```

`border-box`를 사용하면 지정한 너비와 높이에 안쪽 여백과 테두리가 포함되어 크기를 계산하기 편해집니다.

### 반응형 디자인의 기초

- HTML에 viewport 메타 태그를 넣습니다.
- 화면 전체를 고정 너비로 만들기보다 `%`, `max-width` 등을 활용합니다.
- 작은 화면에서도 콘텐츠가 읽히도록 구성하고 필요한 경우 미디어 쿼리로 배치를 바꿉니다.
- 미디어 쿼리의 기준은 특정 기기 이름보다 콘텐츠가 불편해지는 화면 너비로 정합니다.

```css
.cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 700px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

## 5. JavaScript: 사용자 동작에 반응하기

단순한 소개 페이지는 HTML과 CSS만으로 만들 수 있습니다. 버튼 클릭, 내용 변경, 입력 처리 등이 필요할 때 JavaScript를 추가합니다.

먼저 다음 개념을 익히세요.

| 개념 | 용도 또는 예시 |
| --- | --- |
| 변수 | 값을 보관. 재할당하지 않으면 `const`, 재할당하면 `let` |
| 자료형 | 문자열, 숫자, 불리언, 배열, 객체 등 |
| 조건문 | `if`로 조건에 따라 다른 동작 실행 |
| 반복문 | `for` 등으로 같은 작업을 반복 |
| 함수 | 여러 번 사용할 동작을 하나로 정의 |
| DOM | 브라우저가 HTML을 객체 구조로 표현한 것 |
| 이벤트 | 클릭, 입력, 제출처럼 브라우저에서 발생하는 사건 |

```javascript
const button = document.querySelector("#hello-button");
const message = document.querySelector("#message");

button.addEventListener("click", () => {
  message.textContent = "반갑습니다!";
});
```

`querySelector`로 요소를 찾고, `addEventListener`로 이벤트에 반응합니다. 위 코드는 해당 ID를 가진 요소가 HTML에 존재하고, 그 요소가 만들어진 뒤 실행되어야 합니다. 외부 스크립트에 `defer`를 지정하면 HTML 파싱이 끝난 뒤 실행됩니다.

텍스트만 표시할 때는 `textContent`를 사용하세요. 사용자 입력을 그대로 `innerHTML`에 넣으면 HTML로 해석되어 보안 문제가 생길 수 있습니다.

## 6. 직접 실행해 보는 최소 예제

같은 폴더에 아래 세 파일을 저장하면 소개 페이지가 완성됩니다. 별도 라이브러리나 이미지 파일은 필요하지 않습니다.

### `index.html`

```html
<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="HTML, CSS, JavaScript로 만든 첫 소개 페이지">
  <title>나의 첫 웹페이지</title>
  <link rel="stylesheet" href="./style.css">
  <script src="./script.js" defer></script>
</head>
<body>
  <header class="container">
    <h1>안녕하세요, 웹 개발을 배우고 있습니다.</h1>
    <p>직접 만든 첫 번째 소개 페이지입니다.</p>
  </header>

  <main class="container">
    <section class="card" aria-labelledby="intro-title">
      <h2 id="intro-title">내 소개</h2>
      <p>HTML로 구조를 만들고, CSS로 꾸미고, JavaScript로 동작을 추가합니다.</p>
      <ul>
        <li>관심 분야: 웹 개발</li>
        <li>이번 목표: 소개 페이지 완성하기</li>
      </ul>
      <button id="hello-button" type="button">인사하기</button>
      <p id="message" role="status"></p>
    </section>
  </main>

  <footer class="container">
    <p>나의 웹 개발 연습장</p>
  </footer>
</body>
</html>
```

`lang="ko"`는 문서의 언어를, `charset`은 문자 인코딩을 지정합니다. `title`은 브라우저 탭에 표시됩니다. `role="status"`는 변경되는 인사말을 보조 기술이 안내할 수 있게 합니다.

### `style.css`

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  color: #1f2937;
  background: #f3f4f6;
}

.container {
  width: 92%;
  max-width: 800px;
  margin: 0 auto;
  padding: 24px 0;
}

h1 {
  font-size: 2rem;
  line-height: 1.3;
  overflow-wrap: anywhere;
}

.card {
  padding: 24px;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 12px;
}

button {
  padding: 12px 20px;
  border: 0;
  border-radius: 8px;
  font: inherit;
  color: #ffffff;
  background: #1d4ed8;
  cursor: pointer;
}

button:hover {
  background: #1e40af;
}

button:focus-visible {
  outline: 3px solid #111827;
  outline-offset: 4px;
}

#message {
  min-height: 1.6em;
}

@media (max-width: 480px) {
  h1 {
    font-size: 1.5rem;
  }

  .card {
    padding: 16px;
  }
}
```

### `script.js`

```javascript
const button = document.querySelector("#hello-button");
const message = document.querySelector("#message");

let clickCount = 0;

button.addEventListener("click", () => {
  clickCount += 1;
  message.textContent = `반갑습니다! 인사 버튼을 ${clickCount}번 눌렀습니다.`;
});
```

### 실행하고 확인하기

1. 세 파일을 저장한 뒤 `index.html`을 브라우저로 엽니다.
2. 카드, 제목, 파란 버튼이 보이는지 확인합니다.
3. 버튼을 누를 때마다 인사 횟수가 증가하는지 확인합니다.
4. 브라우저 창을 좁혀 작은 화면에서도 내용이 잘 보이는지 확인합니다.
5. `Tab` 키로 버튼에 이동한 뒤 `Enter` 또는 스페이스 키로 실행해 봅니다.

이 예제는 파일을 직접 열어도 실행됩니다. 이후 JavaScript 모듈이나 `fetch`로 데이터를 불러오는 기능을 사용할 때는 로컬 개발 서버를 사용하는 편이 좋습니다. 파일 주소(`file://`)와 웹 서버 주소(`http://localhost:...`)는 브라우저의 동작 조건이 다를 수 있습니다.

## 7. 개발자 도구와 오류 해결

브라우저 메뉴에서 개발자 도구를 열면 다음 기능을 사용할 수 있습니다.

| 탭 또는 기능 | 확인할 내용 |
| --- | --- |
| Elements / Inspector | HTML 구조와 실제 적용된 CSS |
| Console | JavaScript 오류와 `console.log()` 출력 |
| Network | 파일 요청, 실패한 요청, 응답 상태 |
| 기기 화면 모드 | 다양한 화면 너비에서의 배치 |

### 자주 겪는 문제

| 증상 | 먼저 확인할 것 |
| --- | --- |
| CSS가 적용되지 않음 | `link`의 경로, 파일명, 저장 여부 |
| 이미지가 나오지 않음 | `src` 경로, 실제 파일 존재 여부, 대소문자 |
| 버튼을 눌러도 반응 없음 | 스크립트 경로, Console 오류, HTML ID와 선택자의 일치 여부 |
| 요소가 화면 밖으로 나감 | 고정 너비, 여백, 긴 문자열, 박스 모델 |
| 변경 내용이 안 보임 | 파일 저장 여부, 올바른 파일을 열었는지, 새로고침 및 캐시 |
| 배포 후 일부 파일만 실패 | 상대 경로, 사이트의 하위 경로, 파일명 대소문자 |

한 번에 여러 부분을 바꾸기보다 오류 메시지를 읽고, 원인으로 의심되는 부분을 하나씩 수정하세요. 개발자 도구에서 임시로 바꾼 내용은 보통 원본 파일에 저장되지 않습니다.

## 8. 기본 품질: 접근성, 검색, 성능

### 접근성

- 마우스 없이 키보드로 링크와 버튼을 사용할 수 있어야 합니다.
- 키보드 포커스 표시를 없애지 않습니다.
- 글자와 배경이 충분히 구분되도록 색을 선택합니다.
- 색상만으로 오류나 상태를 전달하지 말고 설명을 함께 표시합니다.
- 이미지 대체 텍스트와 입력창 레이블을 제공합니다.
- 브라우저를 확대해도 주요 콘텐츠를 읽고 조작할 수 있는지 확인합니다.

### 검색과 공유의 기초

- 페이지 내용을 설명하는 `title`과 메타 설명을 작성합니다.
- 제목 구조와 링크 문구가 실제 내용을 설명하도록 합니다.
- 핵심 정보를 이미지 안에만 넣지 말고 텍스트로도 제공합니다.

### 성능

- 작은 영역에 표시할 이미지를 불필요하게 큰 원본으로 제공하지 않습니다.
- 이미지의 `width`, `height`를 지정하면 로딩 중 화면이 밀리는 현상을 줄일 수 있습니다.
- 처음 화면에 보이지 않는 이미지에는 필요에 따라 `loading="lazy"`를 사용합니다.
- 사용하지 않는 라이브러리와 스크립트를 줄입니다.

## 9. 어디까지 서버 없이 만들 수 있을까?

| 기능 | 필요한 구성 |
| --- | --- |
| 소개, 작품 목록, 안내 페이지 | HTML + CSS |
| 메뉴 열기, 탭 전환, 간단한 계산 | HTML + CSS + JavaScript |
| 같은 브라우저에 간단한 설정 저장 | JavaScript + `localStorage` 등 |
| 여러 사용자 사이에 데이터 공유 | 서버/API 또는 외부 서비스 |
| 회원가입, 로그인, 권한 관리 | 인증과 접근 제어를 처리하는 서버 또는 서비스 |
| 실제 문의 접수, 주문 저장 | 서버/API 또는 해당 기능을 제공하는 서비스 |

브라우저에 전달되는 HTML과 JavaScript는 사용자가 확인할 수 있습니다. 비밀 API 키나 비밀번호를 넣지 마세요. `localStorage`는 해당 브라우저에 저장하는 기능이며, 공유 데이터베이스나 안전한 비밀 저장소가 아닙니다.

## 10. Git과 배포의 기초

**Git**은 파일 변경 이력을 관리하는 도구입니다. 처음부터 필수는 아니지만, 변경 내용을 되돌리거나 작업을 나눠 저장할 때 유용합니다.

- `git status`: 변경된 파일 확인
- `git diff`: 변경 내용 확인
- `git add`: 다음 커밋에 포함할 변경 선택
- `git commit`: 선택한 변경을 기록

완성한 페이지는 정적 파일을 제공하는 호스팅에 배포할 수 있습니다. 기본 흐름은 다음과 같습니다.

1. 로컬에서 화면과 동작을 확인합니다.
2. HTML, CSS, JavaScript와 필요한 이미지를 호스팅에 업로드합니다.
3. 제공된 웹 주소로 접속합니다.
4. 배포된 환경에서도 경로, 버튼, 모바일 화면을 다시 확인합니다.
5. 필요하면 도메인을 연결하고 HTTPS 사용 여부를 확인합니다.

로컬 파일을 열어 보는 것만으로 인터넷에 공개되지는 않습니다. 또한 기본 정적 페이지를 만드는 데 Node.js, 패키지 관리자, React 같은 도구가 반드시 필요한 것은 아닙니다.

## 11. 권장 학습 순서

| 순서 | 학습 내용 | 완료 기준 |
| --- | --- | --- |
| 1 | HTML 기본 구조와 의미 있는 태그 | 제목, 소개 문단, 목록, 링크 작성 |
| 2 | CSS 선택자, 글꼴, 색상, 박스 모델 | 간격과 색상을 직접 조정 |
| 3 | Flexbox, Grid, 반응형 디자인 | 넓은 화면과 작은 화면에서 자연스럽게 배치 |
| 4 | JavaScript 변수, 함수, DOM, 이벤트 | 버튼 클릭으로 내용을 변경 |
| 5 | 개발자 도구와 접근성 | 오류를 찾고 키보드로 화면 조작 |
| 6 | Git과 정적 페이지 배포 | 변경 이력을 저장하고 웹 주소로 공유 |

기본기를 익힌 뒤 필요에 따라 비동기 처리, `fetch`, API, 폼 제출, 서버와 데이터베이스, 프레임워크 순으로 학습 범위를 넓히면 됩니다.

## 12. 완성 전 체크리스트

- [ ] 페이지 제목과 주요 콘텐츠가 명확하다.
- [ ] HTML, CSS, JavaScript가 올바른 경로로 연결되어 있다.
- [ ] 링크와 버튼이 의도한 대로 동작한다.
- [ ] 작은 화면에서 가로 스크롤이나 잘린 콘텐츠가 없다.
- [ ] 키보드로 주요 기능을 사용할 수 있고 포커스가 보인다.
- [ ] 의미 있는 이미지에 대체 텍스트가 있다.
- [ ] 입력창에 레이블이 있다.
- [ ] Console에 해결하지 않은 JavaScript 오류가 없다.
- [ ] 이미지와 코드에 불필요하게 큰 파일이 없다.
- [ ] 공개 파일에 비밀번호나 비밀 키가 들어 있지 않다.
- [ ] 배포했다면 실제 웹 주소에서도 다시 확인했다.
