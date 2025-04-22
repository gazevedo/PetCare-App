import { config } from "../config";


// Definindo o tipo do usuário
type Usuario = {
  bairro?: string;
  cidade?: string;
  cpf?: string;
  login?: string;
  loja?: string;
  nome?: string;
  numero?: string;
  rua?: string;
  senha?: string;
  telefone?: string;
  tipo?: string;
};

// Função para criar um novo usuário
export const criarUsuario = async (usuario: Usuario) => {
  const url = `${config.apiBaseUrl}/Usuario/criar_usuario`;

  // Monta o usuário com a loja preenchida automaticamente
  const usuarioCompleto = {
    ...usuario,
    loja: config.storeId,
    tipo: "1"
  };

  // Remove campos vazios ou nulos
  const usuarioLimpo = Object.fromEntries(
    Object.entries(usuarioCompleto).filter(
      ([_, value]) => value != null && value !== ""
    )
  );

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuarioLimpo),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar usuário: " + response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};
