import CampoTexto from './CampoTexto';
import Botao from './Botao';

function LembreteForm({value, onChange, onSubmit}){
    return (
        <div>
            <h2>Novo Lembrete</h2>
            <CampoTexto value={value}
            onChange={onChange}
            placeholder="Digite um Lembrete Aqui"
            />
            
            <Botao texto="Criar Card"
            onClick={onSubmit}/>

        </div>
    )
}

export default LembreteForm;