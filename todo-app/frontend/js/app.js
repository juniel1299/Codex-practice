const storageKey = 'simple-todo-items-v1';
const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');
const inputError = document.querySelector('#input-error');
const storageError = document.querySelector('#storage-error');
const status = document.querySelector('#status');
const filters = document.querySelectorAll('[data-filter]');
const clearButton = document.querySelector('#clear-completed');
let todos = [];
let currentFilter = 'all';
let canSave = true;

try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if (!Array.isArray(saved) || saved.some(item => !item || typeof item.id !== 'string' || typeof item.text !== 'string' || !item.text.trim() || typeof item.completed !== 'boolean') || new Set(saved.map(item => item.id)).size !== saved.length) {
    throw new Error('Invalid saved data');
  }
  todos = saved;
} catch {
  canSave = false;
  storageError.textContent = '저장된 할 일을 불러올 수 없습니다. 기존 데이터 보호를 위해 이번 변경은 저장하지 않습니다.';
}

function save() {
  if (!canSave) return;
  try {
    localStorage.setItem(storageKey, JSON.stringify(todos));
    storageError.textContent = '';
  } catch {
    storageError.textContent = '브라우저에 저장하지 못했습니다. 페이지를 닫으면 변경사항이 사라질 수 있습니다.';
  }
}

function render() {
  list.replaceChildren();
  const visible = todos.filter(todo => currentFilter === 'all' || (currentFilter === 'completed' ? todo.completed : !todo.completed));
  const completedCount = todos.filter(todo => todo.completed).length;
  document.querySelector('#count').textContent = `남은 일 ${todos.length - completedCount}개`;
  document.querySelector('#progress').textContent = `전체 ${todos.length}개 중 ${completedCount}개 완료`;
  clearButton.disabled = completedCount === 0;
  filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === currentFilter)));
  document.querySelector('#empty-state').hidden = visible.length !== 0;
  const emptyMessages = {
    all: ['아직 등록한 일이 없어요', '첫 번째 할 일을 추가해 보세요.'],
    active: ['남은 할 일이 없어요', '잠시 쉬어가도 좋아요.'],
    completed: ['완료한 일이 아직 없어요', '끝낸 일에 체크 표시를 해보세요.']
  };
  document.querySelector('#empty-title').textContent = emptyMessages[currentFilter][0];
  document.querySelector('#empty-description').textContent = emptyMessages[currentFilter][1];
  visible.forEach((todo, index) => {
    const row = document.createElement('li');
    row.className = `todo-item${todo.completed ? ' completed' : ''}`;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `todo-${index}`;
    checkbox.checked = todo.completed;
    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = todo.text;
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'delete-button';
    removeButton.textContent = '삭제';
    removeButton.setAttribute('aria-label', `${todo.text} 삭제`);
    checkbox.addEventListener('change', () => {
      todo.completed = checkbox.checked;
      save();
      render();
      focusRow(index, 'input');
      status.textContent = todo.completed ? '할 일을 완료했습니다.' : '할 일을 진행 중으로 변경했습니다.';
    });
    removeButton.addEventListener('click', () => {
      todos = todos.filter(item => item.id !== todo.id);
      save();
      render();
      focusRow(index, 'button');
      status.textContent = '할 일을 삭제했습니다.';
    });
    row.append(checkbox, label, removeButton);
    list.append(row);
  });
}

function focusRow(index, selector) {
  const rows = list.children;
  const row = rows[Math.min(index, rows.length - 1)];
  if (row) row.querySelector(selector).focus();
  else input.focus();
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) {
    inputError.textContent = '공백 대신 할 일을 입력해 주세요.';
    input.setAttribute('aria-invalid', 'true');
    input.focus();
    return;
  }
  todos.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, text, completed: false });
  input.value = '';
  inputError.textContent = '';
  input.removeAttribute('aria-invalid');
  currentFilter = currentFilter === 'completed' ? 'active' : currentFilter;
  save();
  render();
  input.focus();
  status.textContent = '새로운 할 일을 추가했습니다.';
});

input.addEventListener('input', () => {
  inputError.textContent = '';
  input.removeAttribute('aria-invalid');
});

filters.forEach(button => button.addEventListener('click', () => {
  currentFilter = button.dataset.filter;
  render();
}));

clearButton.addEventListener('click', () => {
  todos = todos.filter(todo => !todo.completed);
  save();
  render();
  input.focus();
  status.textContent = '완료한 할 일을 모두 삭제했습니다.';
});

render();
