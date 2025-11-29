import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-xl shadow-lg">
          <Icon name="Heart" size={32} color="white" />
        </div>
      </div>

      {/* Welcome Text */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-foreground">
          Bem vindo ao HospitalCare Pro
        </h1>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Acesse sua conta para gerenciar registros de pacientes, agendamentos e dados médicos de forma segura.
        </p>
      </div>

      {/* System Status Indicator */}
      <div className="flex items-center justify-center space-x-2 mt-4 bg-success-green/10 rounded-lg">
        <div className="w-2 h-2 bg-success-green rounded-full animate-pulse"></div>
        <span className="text-xs text-success-green font-medium">
          Sistema Online - Todos os serviços funcionando normalmente.
        </span>
      </div>
    </div>
  );
};

export default WelcomeHeader;