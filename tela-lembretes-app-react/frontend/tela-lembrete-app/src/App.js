import React, { useState } from 'react';
import './App.css';
import LembreteForm from './components/LembreteForm';
import LembreteCard from './components/LembreteCard';

function App() {
  const [lembreteInput, setLembreteInput] = useState('');
  const [lembretes, setLembretes] = useState([]);

  const adicionarLembrete = () => {
    if (!lembreteInput.trim()) return;
    const novoLembrete = {
      id: Date.now(),
      titulo: lembreteInput,
      observacoes: [],
      observacaoInput: ''
    };
    setLembretes([...lembretes, novoLembrete]);
    setLembreteInput('');
  };

  const atualizarObservacaoInput = (id, valor) => {
    setLembretes(lembretes.map(lembrete =>
      lembrete.id === id ? { ...lembrete, observacaoInput: valor } : lembrete
    ));
  };

  const adicionarObservacao = (id) => {
    setLembretes(lembretes.map(lembrete => {
      if (lembrete.id === id && lembrete.observacaoInput.trim()) {
        return {
          ...lembrete,
          observacoes: [...lembrete.observacoes, lembrete.observacaoInput],
          observacaoInput: ''
        };
      }
      return lembrete;
    }));
  };

  return (
    <div className="container">
      <LembreteForm
        value={lembreteInput}
        onChange={e => setLembreteInput(e.target.value)}
        onSubmit={adicionarLembrete}
      />

      <div className="cards">
        {lembretes.map(lembrete => (
          <LembreteCard
            key={lembrete.id}
            lembrete={lembrete}
            onObservacaoChange={atualizarObservacaoInput}
            onObservacaoSubmit={adicionarObservacao}
          />
        ))}
      </div>
    </div>
  );
}

export default App;