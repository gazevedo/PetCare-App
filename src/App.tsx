import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importando o Router e as rotas
import { LojaProvider } from "./providers/LojaProvider";  // Certifique-se de que o caminho está correto
import { UsuarioProvider } from "./providers/UsuarioProvider"; // Importe o UsuarioProvider
import { AuthProvider } from "./providers/AuthProvider";
import Home from "./pages/home/Home";  // Certifique-se de que o caminho está correto
import Login from "./pages/login/Login";  // Exemplo de página de Login
import Cadastro from "./pages/cadastro/Cadastro";  // Página de Cadastro

const App: React.FC = () => {
  return (
    <Router> 
      <AuthProvider>
        <UsuarioProvider>  
          <LojaProvider>
            <Routes>
              {/* Defina suas rotas */}
              <Route path="/" element={<Login />} /> 
              <Route path="/home" element={<Home />} />  
              <Route path="/cadastro" element={<Cadastro />} /> 
            </Routes>
          </LojaProvider>
        </UsuarioProvider>
      </AuthProvider>      
    </Router>
  );
};

export default App;
