import React from "react";
import { useLoja } from "../../context/LojaContext"; // Importando o hook para acessar o contexto da loja

const Home: React.FC = () => {
  const { loja } = useLoja(); // Acessando o contexto da loja

  return (
    <div>
      {/* Verifica se a loja foi carregada, se não, exibe uma mensagem de carregamento */}
      {loja ? (
        <div>
          <h1>{loja.nome}</h1>
          <p>{loja.cidade}</p>
          <p>{loja.rua}, {loja.numero}</p>
          <p>{loja.bairro} - {loja.cep}</p>
          <p>Telefone: {loja.telefone}</p>
          <p>Status: {loja.status === 1 ? 'Ativa' : 'Inativa'}</p>
        </div>
      ) : (
        <p>Carregando a loja...</p> // Mensagem exibida enquanto os dados estão sendo carregados
      )}
    </div>
  );
};

export default Home;
