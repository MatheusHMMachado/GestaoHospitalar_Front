import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const API_URL = import.meta.env.VITE_API_URL; 
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // --- DADOS DE MOCK PARA TESTE RÁPIDO ---
  const demoAccounts = [
    { label: 'Admin', email: 'dana@hospitalcare.com', pass: 'admin123', role: 'Administrador' },
  ];

  // Função para preencher automaticamente
  const fillCredentials = (email, password) => {
    setFormData({ email, password });
    setErrors({}); // Limpa erros se houver
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData?.email)) {
      newErrors.email = 'Por favor, insira um endereço de email válido';
    }

    if (!formData?.password) {
      newErrors.password = 'Senha é obrigatória';
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
    setErrors({}); 

    try {
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

      if (response.ok) {
        const data = await response.json();
        
        localStorage.setItem('user_token', data.token);
        localStorage.setItem('user_data', JSON.stringify({
            nome: data.nome,
            perfil: data.perfil,
            email: formData.email
        }));
        
        const origin = location.state?.from?.pathname || '/dashboard';
        navigate(origin);
      } else {
        let errorMessage = 'Falha ao realizar login.';
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch (e) {
            errorMessage = await response.text(); 
        }

        setErrors({
          general: errorMessage
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

        <div className="relative">
          <Input
            label="Senha:"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Digite sua senha"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
            disabled={isLoading}
            className="pr-10" 
          />
          
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[41px] text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
          >
            <Icon 
              name={showPassword ? "EyeOff" : "Eye"} 
              size={20} 
            />
          </button>
        </div>

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

        {/* --- SEÇÃO DE CONTAS DE TESTE RÁPIDO --- */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center mb-3 uppercase tracking-wider font-semibold">
            Ambiente de Teste (Clique para preencher)
          </p>
          <div className="grid grid-cols-1 gap-2">
            {demoAccounts.map((acc, index) => (
              <button
                key={index}
                type="button"
                onClick={() => fillCredentials(acc.email, acc.pass)}
                className="flex items-center justify-between p-2 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-primary/50 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${acc.label === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {acc.label.substring(0, 2)}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-primary">{acc.role}</p>
                    <p className="text-xs text-gray-500">{acc.email}</p>
                  </div>
                </div>
                <Icon name="Copy" size={16} className="text-gray-400 group-hover:text-primary" />
              </button>
            ))}
          </div>
        </div>

        <div className="text-center pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Precisa de acesso ao sistema?{' '}
            <button
              type="button"
              className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
              onClick={() => alert('Página de registro em desenvolvimento.')}
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