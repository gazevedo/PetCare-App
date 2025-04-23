import { config } from "../config";

export const login = async (email: string, senha: string) => {
  const url = `${config.apiBaseUrl}/Usuario/auth_usuario`;
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, senha, loja: config.storeId }),
    });

    if (!response.ok) {
      throw new Error("E-mail ou senha inválidos");
    }

    const token = await response.json(); // token direto
    return { token };
  } catch (error) {
    throw error;
  }
};
