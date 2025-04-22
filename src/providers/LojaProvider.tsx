// context/LojaProvider.tsx
import React, { useEffect, useState } from "react";
import { LojaContext, Loja } from "../context/LojaContext"; // Importando o Contexto
import { buscarLojaPorId } from "../services/LojaService"; // Importando o serviço para buscar a loja

interface LojaProviderProps {
  children: React.ReactNode;
}

export const LojaProvider: React.FC<LojaProviderProps> = ({ children }) => {
  const [loja, setLoja] = useState<Loja | null>(null);

  // Função para carregar a loja assim que o componente for montado
  useEffect(() => {
    const carregarLoja = async () => {
      try {
        const lojaEncontrada = await buscarLojaPorId();
        setLoja(lojaEncontrada); // Atualiza o estado com a loja encontrada
      } catch (error) {
        console.error("Erro ao buscar loja:", error);
      }
    };

    carregarLoja();
  }, []);

  return (
    <LojaContext.Provider value={{ loja, setLoja }}>
      {children}
    </LojaContext.Provider>
  );
};
