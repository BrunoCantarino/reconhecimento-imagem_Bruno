// TaskFlow — app.js
// DB: localStorage keys → tf_users (array), tf_todos (array), currentUser (object)

const DB = {
  getUsers()           { return JSON.parse(localStorage.getItem('tf_users')  || '[]'); },
  saveUsers(u)         { localStorage.setItem('tf_users', JSON.stringify(u)); },
  getTodos()           { return JSON.parse(localStorage.getItem('tf_todos')  || '[]'); },
  saveTodos(t)         { localStorage.setItem('tf_todos', JSON.stringify(t)); },
  getCurrentUser()     { return JSON.parse(localStorage.getItem('currentUser') || 'null'); },
  setCurrentUser(u)    { localStorage.setItem('currentUser', JSON.stringify(u)); },
  clearCurrentUser()   { localStorage.removeItem('currentUser'); }
};

// ── Boot ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const user = DB.getCurrentUser();
  user ? showApp(user) : showAuth();
});

// ── Screen routing ────────────────────────────────────────────────────────────
function showAuth() {
  document.getElementById('auth-screen').classList.remove('hidden');
  document.getElementById('app-screen').classList.add('hidden');
  showTab('login');
}

function showApp(user) {
  document.getElementById('auth-screen').classList.add('hidden');
  document.getElementById('app-screen').classList.remove('hidden');

  const initials = user.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  document.getElementById('header-greeting').textContent = 'Olá, ' + user.name.split(' ')[0] + '!';
  document.getElementById('user-avatar').textContent     = initials;

  renderTodos();
}

// ── Tab switcher ──────────────────────────────────────────────────────────────
function showTab(tab) {
  const isLogin = tab === 'login';
  document.getElementById('login-form').classList.toggle('hidden', !isLogin);
  document.getElementById('register-form').classList.toggle('hidden', isLogin);

  const tl = document.getElementById('tab-login');
  const tr = document.getElementById('tab-register');

  if (isLogin) {
    tl.classList.add('tab-active');    tl.classList.remove('text-slate-400');
    tr.classList.remove('tab-active'); tr.classList.add('text-slate-400');
    document.getElementById('login-error').classList.add('hidden');
  } else {
    tr.classList.add('tab-active');    tr.classList.remove('text-slate-400');
    tl.classList.remove('tab-active'); tl.classList.add('text-slate-400');
    document.getElementById('register-error').classList.add('hidden');
    document.getElementById('register-success').classList.add('hidden');
  }
}

// ── Auth: Login ───────────────────────────────────────────────────────────────
function handleLogin(e) {
  e.preventDefault();
  const errEl  = document.getElementById('login-error');
  const errTxt = document.getElementById('login-error-text');
  errEl.classList.add('hidden');

  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  const fail = (msg) => {
    errTxt.textContent = msg;
    errEl.classList.remove('hidden');
    shake('login-form');
  };

  if (!email || !password) return fail('Preencha o e-mail e a senha.');

  const user = DB.getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user)              return fail('E-mail não cadastrado. Crie uma conta primeiro.');
  if (user.password !== password) return fail('Senha incorreta. Tente novamente.');

  DB.setCurrentUser({ id: user.id, name: user.name, email: user.email });
  document.getElementById('login-email').value    = '';
  document.getElementById('login-password').value = '';
  showApp(DB.getCurrentUser());
}

// ── Auth: Register ────────────────────────────────────────────────────────────
function handleRegister(e) {
  e.preventDefault();
  const errEl  = document.getElementById('register-error');
  const errTxt = document.getElementById('register-error-text');
  const sucEl  = document.getElementById('register-success');
  errEl.classList.add('hidden');
  sucEl.classList.add('hidden');

  const name     = document.getElementById('reg-name').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;

  const fail = (msg) => {
    errTxt.textContent = msg;
    errEl.classList.remove('hidden');
    shake('register-form');
  };

  if (!name || !email || !password)  return fail('Preencha todos os campos.');
  if (!validEmail(email))            return fail('Informe um e-mail válido.');
  if (password.length < 6)          return fail('A senha deve ter pelo menos 6 caracteres.');

  const users = DB.getUsers();
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase()))
    return fail('Este e-mail já está cadastrado.');

  users.push({ id: uid(), name, email, password });
  DB.saveUsers(users);

  document.getElementById('reg-name').value     = '';
  document.getElementById('reg-email').value    = '';
  document.getElementById('reg-password').value = '';
  sucEl.classList.remove('hidden');
  setTimeout(() => showTab('login'), 1800);
}

// ── Auth: Logout ──────────────────────────────────────────────────────────────
function handleLogout() {
  DB.clearCurrentUser();
  showAuth();
}

// ── Todos: Add ────────────────────────────────────────────────────────────────
function handleAddTodo(e) {
  e.preventDefault();
  const errEl = document.getElementById('todo-error');
  errEl.classList.add('hidden');

  const title = document.getElementById('todo-title').value.trim();
  const type  = document.getElementById('todo-type').value;
  const desc  = document.getElementById('todo-desc').value.trim();

  if (!title) {
    errEl.classList.remove('hidden');
    setTimeout(() => errEl.classList.add('hidden'), 2500);
    return;
  }

  const user  = DB.getCurrentUser();
  const todos = DB.getTodos();
  todos.push({
    id:          Date.now(),
    userId:      user.email,
    title,
    type,
    description: desc,
    done:        false
  });
  DB.saveTodos(todos);

  document.getElementById('todo-title').value = '';
  document.getElementById('todo-desc').value  = '';
  renderTodos();
}

// ── Todos: Toggle done ────────────────────────────────────────────────────────
function toggleTodo(id) {
  const todos = DB.getTodos();
  const t     = todos.find(t => t.id === id);
  if (t) t.done = !t.done;
  DB.saveTodos(todos);
  renderTodos();
}

// ── Todos: Delete ─────────────────────────────────────────────────────────────
function deleteTodo(id) {
  DB.saveTodos(DB.getTodos().filter(t => t.id !== id));
  renderTodos();
}

// ── Todos: Render ─────────────────────────────────────────────────────────────
function renderTodos() {
  const user   = DB.getCurrentUser();
  if (!user) return;

  // Filter by userId (email) — each user sees only their own
  let myTodos = DB.getTodos().filter(t => t.userId === user.email);

  // Pending first, then done
  myTodos.sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    return b.id - a.id;
  });

  const listEl  = document.getElementById('todo-list');
  const emptyEl = document.getElementById('empty-state');

  if (myTodos.length === 0) {
    listEl.innerHTML = '';
    emptyEl.classList.remove('hidden');
  } else {
    emptyEl.classList.add('hidden');
    listEl.innerHTML = myTodos.map(buildCard).join('');
  }

  updateStats(myTodos);
}

// ── Card builder ──────────────────────────────────────────────────────────────
const TYPE_META = {
  work:     { label: 'Trabalho', cls: 'badge-work'     },
  personal: { label: 'Pessoal',  cls: 'badge-personal' },
  study:    { label: 'Estudos',  cls: 'badge-study'    }
};

function buildCard(t) {
  const meta      = TYPE_META[t.type] || TYPE_META.work;
  const doneClass = t.done ? 'todo-done' : '';
  const btnLabel  = t.done ? 'Desfazer' : 'Concluir';
  const btnIcon   = t.done
    ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4l16 16m0-16L4 20"/>`
    : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>`;

  return `
    <div class="todo-card glass rounded-xl px-5 py-4 ${doneClass}">
      <div class="flex items-start gap-3">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap mb-1">
            <span class="todo-title text-sm font-semibold text-slate-100 break-words">${esc(t.title)}</span>
            <span class="text-xs px-2 py-0.5 rounded-full font-medium ${meta.cls}">${meta.label}</span>
          </div>
          ${t.description ? `<p class="text-xs text-slate-500 leading-relaxed mt-1">${esc(t.description)}</p>` : ''}
        </div>
        <div class="flex items-center gap-2 flex-shrink-0 ml-2">
          <button onclick="toggleTodo(${t.id})"
            class="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all
            ${t.done
              ? 'text-slate-500 border-slate-700 hover:text-slate-300'
              : 'text-emerald-400 border-emerald-400/30 hover:bg-emerald-400/10'}">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">${btnIcon}</svg>
            ${btnLabel}
          </button>
          <button onclick="deleteTodo(${t.id})"
            class="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-400/10 transition-all border border-transparent hover:border-red-400/20"
            aria-label="Excluir tarefa">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
      </div>
    </div>`;
}

// ── Stats ─────────────────────────────────────────────────────────────────────
function updateStats(todos) {
  const total   = todos.length;
  const done    = todos.filter(t => t.done).length;
  const pct     = total > 0 ? Math.round((done / total) * 100) : 0;

  document.getElementById('stat-total').textContent   = total;
  document.getElementById('stat-done').textContent    = done;
  document.getElementById('stat-pending').textContent = total - done;
  document.getElementById('progress-pct').textContent = pct + '%';
  document.getElementById('progress-bar').style.width = pct + '%';
}

// ── Utilities ─────────────────────────────────────────────────────────────────
function togglePwd(id) {
  const el = document.getElementById(id);
  el.type  = el.type === 'password' ? 'text' : 'password';
}

function shake(id) {
  const el = document.getElementById(id);
  el.classList.remove('shake');
  void el.offsetWidth;
  el.classList.add('shake');
}

function validEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
function uid()         { return Date.now().toString(36) + Math.random().toString(36).slice(2); }
function esc(s)        { const d = document.createElement('div'); d.appendChild(document.createTextNode(s)); return d.innerHTML; }
