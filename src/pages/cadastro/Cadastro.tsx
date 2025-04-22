// src/pages/Cadastro.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarUsuario } from "../../services/UsuarioService"; // ajuste se necessário 
import { useUsuario } from "../../context/UsuarioContext"; // Importando o contexto

const Cadastro: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");

  const navigate = useNavigate();
  const { setUsuario } = useUsuario(); // Desestruturando a função setUsuario do contexto

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const rawUsuario = {
      email,
      senha,
      telefone,
    };

    const usuario = Object.fromEntries(
      Object.entries(rawUsuario).filter(([_, value]) => value !== "")
    );

    try {
      const resposta = await criarUsuario(usuario); 
      navigate("/"); // Redireciona após o cadastro
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao cadastrar. Verifique os dados.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Cadastro</h2>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <input placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
        <button type="submit">Cadastrar</button>
        <p className="signup-link">
          Já tem uma conta? <a href="/">Voltar para login</a>
        </p>
      </form>
    </div>
  );
};

export default Cadastro;
