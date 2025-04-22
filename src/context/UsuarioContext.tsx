// src/context/UsuarioContext.tsx
import React, { createContext, useState, useContext } from "react";

// Defina a interface Usuario aqui
export interface Usuario {
  id: string;
  email: string;
  nome: string;
  telefone: string;
}

interface UsuarioContextType {
  usuario: Usuario | null;
  setUsuario: React.Dispatch<React.SetStateAction<Usuario | null>>;
}

export const UsuarioContext = createContext<UsuarioContextType | undefined>(undefined);

export const useUsuario = () => {
  const context = useContext(UsuarioContext);
  if (!context) {
    throw new Error("useUsuario must be used within a UsuarioProvider");
  }
  return context;
};
