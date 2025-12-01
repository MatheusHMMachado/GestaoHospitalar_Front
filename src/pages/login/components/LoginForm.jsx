import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const API_URL = import.meta.env.VITE_API_URL; 
const API_TOKEN = import.meta.env.VITE_API_TOKEN; // O mesmo do Backend

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData?.email)) {
      newErrors.email = 'Por favor, insira um endereço de email válido';
    }

    if (!formData?.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 8 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({}); // Limpa erros antigos

    try {
      // 2. CHAMADA O BACKEND
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-TOKEN': API_TOKEN
        },
        body: JSON.stringify({ 
            email: formData.email, 
            senha: formData.password 
        })
      });

      // 4. TRATAMENTO DE RESPOSTA
      if (response.ok) {
        const data = await response.json();
        
        // Sucesso: Salva o token e dados do usuário
        localStorage.setItem('user_token', data.token);
        localStorage.setItem('user_data', JSON.stringify({
            nome: data.nome,
            perfil: data.perfil,
            email: formData.email
        }));
        
        const origin = location.state?.from?.pathname || '/dashboard';
        navigate(origin);
      } else {
        // Erro: Tenta ler a mensagem de texto enviada pelo Backend (ex: "Senha inválida")
        const errorMessage = await response.text();
        setErrors({
          general: errorMessage || 'Falha ao realizar login. Verifique suas credenciais.'
        });
      }

    } catch (error) {
      console.error("Erro de conexão:", error);
      setErrors({
        general: 'Erro de conexão com o servidor.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('A funcionalidade de recuperação de senha está em desenvolvimento.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email:"
          type="email"
          name="email"
          placeholder="Entre com seu email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
          disabled={isLoading}
        />

        <Input
          label="Senha:"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          required
          disabled={isLoading}
        />

        {errors.general && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <Icon name="AlertCircle" size={16} className="text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{errors.general}</p>
          </div>
        )}

        <div className="text-right">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200"
            disabled={isLoading}
          >
            Esqueceu sua senha?
          </button>
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="LogIn"
          iconPosition="right"
          disabled={isLoading}
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Button>

        <div className="text-center pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Precisa de acesso ao sistema?{' '}
            <button
              type="button"
              onClick={() => navigate('/user-registration')}
              className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
              disabled={isLoading}
            >
              Registrar nova conta
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;