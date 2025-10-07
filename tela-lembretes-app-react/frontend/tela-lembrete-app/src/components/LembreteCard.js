import ObservacaoForm from './ObservacaoForm';
import ObservacaoList from './ObservacaoList';

function LembreteCard({ lembrete, onObservacaoChange, onObservacaoSubmit }) {
  return (
    <div className="card">
      <h3>{lembrete.titulo}</h3>
      <ObservacaoForm
        value={lembrete.observacaoInput}
        onChange={e => onObservacaoChange(lembrete.id, e.target.value)}
        onSubmit={() => onObservacaoSubmit(lembrete.id)}
      />
      <ObservacaoList observacoes={lembrete.observacoes} />
    </div>
  );
}

export default LembreteCard;