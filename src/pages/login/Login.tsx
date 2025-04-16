import React, { useState } from "react";
import "./Login.css";
import logo from '../../assets/logo.jpg';
import { login } from "../../services/authService"; // importa o service
import { useNavigate } from "react-router-dom"; // <-- aqui


const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate(); // <-- hook para redirecionar

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await login(email, senha); 
      console.log("Token recebido:", data.token);
      navigate("/home"); // <-- redireciona para a Home
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
          //onChange={(e) => setEmail(e.target.value)}
          //required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          //onChange={(e) => setSenha(e.target.value)}
          //required
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