import { config } from "../config";
 

// Função para buscar a loja por ID
export const buscarLojaPorId = async () => {
  const url = `${config.apiBaseUrl}/Loja/busca_por_id/${config.storeId}`; // Monta a URL para buscar a loja

  try {
    const response = await fetch(url, {
      method: "GET", // Método HTTP GET
      headers: {
        accept: "application/json", // Cabeçalho para aceitar resposta em JSON
      },
    });

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error("Erro ao buscar a loja: " + response.statusText);
    }

    const loja = await response.json(); // Converte a resposta para JSON
    return loja;
  } catch (error) {
    console.error("Erro na requisição:", error); // Log de erro caso algo dê errado
    throw error;
  }
};
