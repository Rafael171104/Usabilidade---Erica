function ObservacaoList({observacoes}){
    return(
        <ul>
        {observacoes.map((obs, idx) =>(
            <li key={idx}>{obs}</li>
     ))}
     </ul>
    );
}

export default ObservacaoList;