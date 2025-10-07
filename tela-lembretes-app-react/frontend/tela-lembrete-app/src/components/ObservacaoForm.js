import CampoTexto from "./CampoTexto";
import Botao from "./Botao";

function ObservacaoForm({value, onChange, onSubmit}){
return(
    <div>
        <CampoTexto value={value}
        onChange={onChange}
        placeholder={"Adicionar observação"} />
        <Botao texto="Adicionar"
        onClick={onSubmit} />
    </div>
)
}

export default ObservacaoForm;