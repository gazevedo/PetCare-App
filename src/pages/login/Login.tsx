import React, { useState, useContext } from "react";
import { login } from "../../services/AuthService";
import { AuthContext } from "../../context/AuthContext"; // Importa o contexto
import { useNavigate } from "react-router-dom"; // Para navegação entre páginas
import "./Login.css";
import logo from '../../assets/logo.jpg';

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const authContext = useContext(AuthContext); // Acessa o contexto
  const navigate = useNavigate(); // Hook para navegação

  // Garantir que authContext não seja undefined
  if (!authContext) {
    throw new Error("AuthContext não foi encontrado! Verifique se o componente está dentro do AuthProvider.");
  }

  const { setToken } = authContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login(email, senha); 
      console.log("Token recebido:", result.token);      
      // Salva o token no contexto
      setToken(result.token);
      
      navigate("/home"); // Redireciona para a Home
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <img src={logo} alt="Logo" />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        <p className="signup-link">
          Não tem uma conta? <a href="/cadastro">Cadastre-se</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
