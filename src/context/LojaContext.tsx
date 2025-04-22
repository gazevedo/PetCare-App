import React, { createContext, useContext } from "react";

// ✅ Exportando a interface Loja para uso em outros arquivos
export interface Loja {
  _id: string;
  nome: string;
  cidade: string;
  rua: string;
  numero: string;
  bairro: string;
  cep: string;
  telefone: string;
  status: number;
}

// Tipagem do contexto
interface LojaContextType {
  loja: Loja | null;
  setLoja: React.Dispatch<React.SetStateAction<Loja | null>>;
}

// Criação do contexto
export const LojaContext = createContext<LojaContextType | undefined>(undefined);

// Hook customizado para acessar o contexto
export const useLoja = () => {
  const context = useContext(LojaContext);
  if (!context) {
    throw new Error("useLoja must be used within a LojaProvider");
  }
  return context;
};
