const environments = { app: '앱', ide: 'IDE 확장', cli: '터미널' };
const all = ['app', 'ide', 'cli'];
const commands = [
  { name: '/status', step: 1, title: '현재 상태 확인', text: '컨텍스트 사용량과 세션 상태를 확인해요.', env: all },
  { name: '/model', step: 1, title: '모델 선택', text: '현재 대화에 사용할 모델을 골라요.', env: all },
  { name: '/permissions', step: 1, title: '권한 설정', text: '승인 없이 수행할 작업 범위를 정해요.', env: ['cli'] },
  { name: '/init', step: 2, title: '프로젝트 지침 준비', text: '프로젝트 지침 파일 AGENTS.md의 초안을 만들어요.', env: all },
  { name: '/plan', step: 2, title: '계획부터 세우기', text: '구현 전에 작업 순서를 계획해요.', env: all },
  { name: '/ide-context', step: 2, title: '에디터 맥락 연결', text: 'IDE 맥락 공유를 켜거나 꺼요.', env: ['app', 'ide'] },
  { name: '/diff', step: 3, title: '변경 내용 살펴보기', text: 'Git 변경 내용을 직접 확인해요.', env: ['cli'] },
  { name: '/review', step: 3, title: '코드 검토 요청', text: '코드 변경 사항을 검토해요.', env: all },
  { name: '/compact', step: 4, title: '긴 대화 정리', text: '대화 맥락을 압축해 공간을 확보해요.', env: all },
  { name: '/fork', step: 4, title: '다른 방향 탐색', text: '현재 대화에서 새 대화를 분기해요.', env: all },
  { name: '/resume', step: 4, title: '이전 작업 이어가기', text: '저장된 대화를 선택해 이어가요.', env: ['cli'] },
  { name: '/new', step: 4, title: '새 대화 시작', text: 'CLI 안에서 새 대화를 열어요.', env: ['cli'] }
];
const steps = [
  ['환경 살펴보기', '작업을 시작하기 전, 지금의 설정부터.'],
  ['작업 시작하기', '맥락을 준비하고, 방향을 정해요.'],
  ['결과 검토하기', '완성한 코드에 한 번 더 눈길을.'],
  ['흐름 이어가기', '대화가 길어져도 가볍게 이어가요.']
];
let environment = 'all';
const search = document.querySelector('#search');
const list = document.querySelector('#command-list');
function matchingCommands() {
  const query = search.value.trim().toLowerCase();
  return commands.filter(command => (environment === 'all' || command.env.includes(environment)) &&
    `${command.name} ${command.title} ${command.text}`.toLowerCase().includes(query));
}
function render() {
  const matches = matchingCommands();
  document.querySelector('#result-count').textContent = `${matches.length} / ${commands.length} commands`;
  document.querySelector('#empty').hidden = matches.length !== 0;
  list.innerHTML = steps.map(([title, description], index) => {
    const group = matches.filter(command => command.step === index + 1);
    if (!group.length) return '';
    return `<section class="step" id="step-${index + 1}" aria-labelledby="heading-${index}"><div class="step-heading"><span class="step-number">0${index + 1}</span><h3 id="heading-${index}">${title}</h3><p>${description}</p></div><div class="cards">${group.map(command => `<article class="card"><div class="card-top"><code>${command.name}</code><button class="copy" data-copy="${command.name}" aria-label="${command.name} 복사">복사 ↗</button></div><h4>${command.title}</h4><p>${command.text}</p><div class="badges">${command.env.map(env => `<span class="badge ${env}"><i></i>${environments[env]}</span>`).join('')}</div></article>`).join('')}</div></section>`;
  }).join('');
}
document.querySelector('.filters').addEventListener('click', event => {
  const button = event.target.closest('[data-env]');
  if (!button) return;
  environment = button.dataset.env;
  document.querySelectorAll('[data-env]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  render();
});
search.addEventListener('input', render);
document.querySelector('#reset').addEventListener('click', () => {
  search.value = '';
  document.querySelector('[data-env="all"]').click();
  search.focus();
});
document.querySelectorAll('.roadmap a').forEach(link => link.addEventListener('click', () => {
  search.value = '';
  document.querySelector('[data-env="all"]').click();
}));
document.addEventListener('keydown', event => {
  if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName) && !document.activeElement.isContentEditable) {
    event.preventDefault(); search.focus();
  }
});
let toastTimer;
list.addEventListener('click', async event => {
  const button = event.target.closest('[data-copy]');
  if (!button) return;
  const command = button.dataset.copy;
  const toast = document.querySelector('#toast');
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(command);
    } else {
      const field = document.createElement('textarea');
      field.value = command;
      field.style.position = 'fixed'; field.style.opacity = '0';
      document.body.append(field); field.select();
      try { if (!document.execCommand('copy')) throw new Error('Copy failed'); }
      finally { field.remove(); button.focus(); }
    }
    toast.textContent = `${command} 복사 완료! Codex 입력창에 붙여넣으세요.`;
  } catch {
    toast.textContent = `복사할 수 없어요. ${command} 를 직접 선택해 복사해 주세요.`;
  }
  clearTimeout(toastTimer); toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3500);
});
render();
