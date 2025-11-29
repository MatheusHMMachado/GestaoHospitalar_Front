import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for different user roles
  const mockCredentials = {
    'admin@hospitalcare.com': { password: 'admin123', role: 'Administrator' },
    'doctor@hospitalcare.com': { password: 'doctor123', role: 'Doctor' },
    'nurse@hospitalcare.com': { password: 'nurse123', role: 'Nurse' },
    'reception@hospitalcare.com': { password: 'reception123', role: 'Receptionist' }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Por favor, insira um endereço de email válido';
    }

    if (!formData?.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
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

    // Simulate API call delay
    setTimeout(() => {
      const user = mockCredentials?.[formData?.email];
      
      if (user && user?.password === formData?.password) {
        // Store user session (in real app, this would be JWT)
        localStorage.setItem('hospitalcare_user', JSON.stringify({
          email: formData?.email,
          role: user?.role,
          loginTime: new Date()?.toISOString()
        }));
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        setErrors({
          general: 'Endereço de email ou senha inválidos. Por favor, tente novamente.'
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    // In real app, this would navigate to forgot password page
    alert('Forgot password functionality would be implemented here');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Entre com seu email:"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          disabled={isLoading}
        />

        {/* Password Input */}
        <Input
          label="Senha"
          type="password"
          name="password"
          placeholder="Digite sua senha:"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          disabled={isLoading}
        />

        {/* General Error Message */}
        {errors?.general && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <Icon name="AlertCircle" size={16} className="text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{errors?.general}</p>
          </div>
        )}

        {/* Forgot Password Link */}
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

        {/* Sign In Button */}
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
          {isLoading ? 'Entrando..' : 'Entrar'}
        </Button>

        {/* Register Link */}
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