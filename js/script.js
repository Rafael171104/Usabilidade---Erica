function ehPrimo(num)
{
    if(num < 2) return false;
    for(let i=2; i <= Math.sqrt(num); i++)
    {
        if(num % i === 0) return false;
    }
    return true;
}

function gerarPrimos(n, inicio = 2)
{
    const primos=[];
    let num = inicio;
    while (primos.length < n)
    {
        if(ehPrimo(num)) primos.push(num);
        num++;
    }
    return primos;
}

function criarSequenciaComLacunas(n, lacunasQtd)
{
    const primos = gerarPrimos(n + 5);
    const sequencia = primos.slice(0, n);

    const lacunasPosicoes = new Set();
    while (lacunasPosicoes.size < lacunasQtd)
    {
        const pos = Math.floor(Math.random()
                                     * n);
        lacunasPosicoes.add(pos);
    }
    return {sequencia, lacunasPosicoes};
}

function mostrarSequencia() {
  const n = parseInt(document.getElementById('totalNumeros').value) || 10;
  const lacunasQtd = parseInt(document.getElementById('totalLacunas').value) || 3;

  const {sequencia, lacunasPosicoes} = 
        criarSequenciaComLacunas(n, lacunasQtd);
  window.sequenciaOriginal = sequencia;
  window.lacunasPosicoes = lacunasPosicoes;

  const container = document.getElementById('sequencia');
  container.innerHTML = '';

  sequencia.forEach((num, idx) => {
    if (lacunasPosicoes.has(idx)) {
      const input = document.createElement('input');
      input.type = 'number';
      input.className = 'numero-lacuna';
      input.id = 'lacuna-' + idx;
      input.setAttribute('aria-label', 'Preencha o número primo na posição ' + (idx + 1));
      input.min = '2';
      input.max = '10000';
      container.appendChild(input);
    } else {
      const span = document.createElement('span');
      span.textContent = num;
      span.className = 'primo-num';
      container.appendChild(span);
    }
  });

  document.getElementById('resultado').textContent = '';
  document.getElementById('resultado').className = '';
}

function verificarRespostas() {
  const lacunasPosicoes = window.lacunasPosicoes;
  const sequenciaOriginal = window.sequenciaOriginal;
  let corretas = 0;
  const total = lacunasPosicoes.size;

  lacunasPosicoes.forEach(pos => {
    const input = document.getElementById('lacuna-' + pos);
    const valor = parseInt(input.value);
    if (valor === sequenciaOriginal[pos]) {
      corretas++;
      input.style.borderColor = '#00ffcc';
      input.classList.add('correto');
      input.classList.remove('incorreto');
    } else {
      input.style.borderColor = '#ff5252';
      input.classList.add('incorreto');
      input.classList.remove('correto');
    }
  });

  const resultado = document.getElementById('resultado');
  if (corretas === total && total > 0) {
    resultado.textContent = '🎉 Parabéns! Todos os números estão corretos!';
    resultado.className = 'correto';
  } else {
    resultado.textContent = `Ops! ${corretas} de ${total} corretos. Tente novamente! 🚀`;
    resultado.className = 'incorreto';
  }
}