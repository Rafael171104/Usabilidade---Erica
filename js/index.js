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
