// src/services/authService.ts

export const login = async (email: string, senha: string) => {
    return new Promise<{ token: string }>((resolve, reject) => {
      setTimeout(() => {
        if (true) {
          resolve({ token: "fake-jwt-token" });
        } else {
          reject(new Error("E-mail ou senha inválidos"));
        }
      }, 800); // tempo de simulação
    });
  };
  