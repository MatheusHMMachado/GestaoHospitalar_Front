import LoginPage from 'pages/login';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

// Função auxiliar para decodificar o JWT (Payload) sem precisar de bibliotecas externas
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const ProtectedRoute = () => {
  const location = useLocation();
  const token = localStorage.getItem('user_token');

  // 1. Verificação de Existência do token
  if (!token) {
    // Redireciona para login, mas salva onde o usuário tentou ir (state) para voltar lá depois de logar
    return <LoginPage state={{ from: location }} replace />;
  }

  // 2. Verificação de Expiração do token
  const decodedToken = parseJwt(token);
  
  if (decodedToken) {
    const currentTime = Date.now() / 1000; // Converte ms para segundos
    
    if (decodedToken.exp < currentTime) {
      // Token expirou!
      console.warn("Sessão expirada. Redirecionando para login.");
      
      // Limpa o lixo do storage
      localStorage.removeItem('user_token');
      localStorage.removeItem('user_data');
      
      return <LoginPage state={{ from: location }} replace />;
    }
  } else {
    // Token malformado ou inválido
    localStorage.removeItem('user_token');
    return <LoginPage replace />;
  }

  // 3. Sucesso: Renderiza as rotas filhas (Dashboard, Pacientes, etc.)
  return <Outlet />;
};

export default ProtectedRoute;