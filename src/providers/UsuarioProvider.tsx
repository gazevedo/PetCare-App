// src/context/UsuarioProvider.tsx
import React, { useState, useEffect } from "react";
import { UsuarioContext, Usuario } from "../context/UsuarioContext"; // Importe o contexto e a interface

interface UsuarioProviderProps {
  children: React.ReactNode;
}

export const UsuarioProvider: React.FC<UsuarioProviderProps> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  // Você pode adicionar lógica aqui para carregar o usuário de uma API, se necessário
  useEffect(() => {
    // Exemplo de simulação de carregamento de um usuário
    const usuarioSimulado: Usuario = {
      id: "1",
      email: "usuario@exemplo.com",
      nome: "Usuario Exemplo",
      telefone: "1234567890",
    };
    setUsuario(usuarioSimulado);
  }, []);

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
};
