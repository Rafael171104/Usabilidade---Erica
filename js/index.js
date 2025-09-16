function showSection(id) {
    // Oculta todas as seções
    document.querySelectorAll('.section').forEach(function(sec) {
        sec.style.display = 'none';
    });
    // Controle de acesso às seções
    if (isLoggedIn()) {
        // Só permite home, feedback e excluir
        if (id === 'home' || id === 'feedback' || id === 'excluir') {
            document.getElementById(id).style.display = 'block';
        } else {
            document.getElementById('home').style.display = 'block';
        }
    } else {
        // Usuário não logado pode acessar todas
        document.getElementById(id).style.display = 'block';
    }
}
// Controle de autenticação simples
// Multi-usuário
function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

function saveUser(nome, email, senha) {
    const users = getUsers();
    users.push({ nome, email, senha });
    localStorage.setItem('users', JSON.stringify(users));
}

function findUser(email) {
    return getUsers().find(u => u.email === email);
}

function isLoggedIn() {
    return !!localStorage.getItem('loggedInUser');
}

function loginUser(email, senha) {
    const user = findUser(email);
    if (user && user.senha === senha) {
        localStorage.setItem('loggedInUser', email);
        return true;
    }
    return false;
}

function logoutUser() {
    localStorage.removeItem('loggedInUser');
    updateMenuAccess();
    showSection('home');
    alert('Você saiu da sua conta.');
}

function deleteUser() {
    const email = localStorage.getItem('loggedInUser');
    if (!email) return;
    let users = getUsers();
    users = users.filter(u => u.email !== email);
    localStorage.setItem('users', JSON.stringify(users));
    logoutUser();
}

// Exibe/oculta seções do menu conforme login
function updateMenuAccess() {
    const feedback = document.getElementById('feedback');
    const excluir = document.getElementById('excluir');
    const feedbackLink = document.querySelector('a[href="#feedback"]');
    const excluirLink = document.querySelector('a[href="#excluir"]');
    const cadastroLink = document.getElementById('cadastroLink');
    const loginLink = document.getElementById('loginLink');
    const logoutBtn = document.getElementById('logoutBtn');
    if (isLoggedIn()) {
        if (feedbackLink) feedbackLink.style.display = 'inline-block';
        if (excluirLink) excluirLink.style.display = 'inline-block';
        if (logoutBtn) logoutBtn.style.display = 'inline-block';
        if (cadastroLink) cadastroLink.style.display = 'none';
        if (loginLink) loginLink.style.display = 'none';
    } else {
        if (feedbackLink) feedbackLink.style.display = 'none';
        if (excluirLink) excluirLink.style.display = 'none';
        if (feedback) feedback.style.display = 'none';
        if (excluir) excluir.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (cadastroLink) cadastroLink.style.display = 'inline-block';
        if (loginLink) loginLink.style.display = 'inline-block';
    }
// Função de logout
function logoutUser() {
    localStorage.removeItem('loggedIn');
    updateMenuAccess();
    showSection('home');
    alert('Você saiu da sua conta.');
}
}

// Cadastro com validação
document.querySelector('#cadastro form').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = this.querySelector('input[type="text"]').value.trim();
    const email = this.querySelector('input[type="email"]').value.trim();
    const senha = this.querySelector('input[type="password"]').value;
    // Validações
    if (!nome || !email || !senha) {
        alert('Preencha todos os campos.');
        return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert('Digite um e-mail válido.');
        return;
    }
    if (senha.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres.');
        return;
    }
    if (findUser(email)) {
        alert('Este e-mail já está cadastrado.');
        return;
    }
    saveUser(nome, email, senha);
    alert('Cadastro realizado com sucesso! Agora faça login.');
    showSection('login');
});

// Login com validação
document.querySelector('#login form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value.trim();
    const senha = this.querySelector('input[type="password"]').value;
    if (!email || !senha) {
        alert('Preencha todos os campos.');
        return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert('Digite um e-mail válido.');
        return;
    }
    if (loginUser(email, senha)) {
        alert('Login realizado com sucesso!');
        updateMenuAccess();
        showSection('home');
    } else {
        alert('E-mail ou senha incorretos, ou usuário não cadastrado.');
    }
});

// Feedback só pode ser enviado se logado
document.querySelector('#feedback form').addEventListener('submit', function(e) {
    if (!isLoggedIn()) {
        e.preventDefault();
        alert('Você precisa estar logado para enviar um comentário.');
        showSection('login');
    }
});

// Excluir conta
function confirmarExclusao() {
    deleteUser();
    alert('Conta excluída com sucesso!');
    fecharModal();
    updateMenuAccess();
    showSection('home');
}

// Atualiza menu ao carregar
window.addEventListener('DOMContentLoaded', function() {
    updateMenuAccess();
});
const editor = document.getElementById('editor'); // Seleciona o elemento editável
const undoStack = [];// Pilha para armazenar os estados para desfazer
const redoStack = [];// Pilha para armazenar os estados para refazer

editor.addEventListener('input', () => { // Evento disparado quando o conteúdo do editor é alterado
    redoStack.length = 0; // Limpa a pilha de refazer ao fazer uma nova alteração
    undoStack.push(editor.innerHTML);// Adiciona o estado atual à pilha de desfazer
});

function undoAction() { // Função para desfazer a última ação
    if (undoStack.length > 0) {
        redoStack.push(editor.innerHTML);
        const lastState = undoStack.pop();
        editor.innerHTML = lastState;
    }
}

function redoAction() { // Função para refazer a última ação desfeita
    if (redoStack.length > 0) {
        undoStack.push(editor.innerHTML);
        const nextState = redoStack.pop();
        editor.innerHTML = nextState;
    }
}
//Confirmar exclusão de conta
  function abrirModal() {
            document.getElementById("modalConfirmacao").style.display = "flex";
        }
        function fecharModal() {
            document.getElementById("modalConfirmacao").style.display = "none";
        }
        function confirmarExclusao() {
            alert("Conta excluída com sucesso!");
            fecharModal();
        }
