import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MockCredentialsHelper = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mockUsers = [
    {
      role: 'Administrador',
      email: 'dana@hospitalcare.com',
      password: 'admin123',
      description: 'Acesso e gerenciamento completos do sistema'
    }
  ];

  const copyCredentials = (email, password) => {
    navigator.clipboard?.writeText(`${email}\n${password}`);
  };

  return (
    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={16} className="text-blue-600" />
          <span className="text-sm font-medium text-blue-800">
            Credenciais de demonstração disponíveis
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          iconPosition="right"
        >
          {isExpanded ? 'Ocultar' : 'Exibir'} 
        </Button>
      </div>
      {isExpanded && (
        <div className="mt-4 space-y-3">
          <p className="text-xs text-blue-700 mb-3">
          Use estas credenciais de teste para explorar diferentes funções de usuário:          </p>
          
          {mockUsers?.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-white border border-blue-100 rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-blue-900">
                    {user?.role}
                  </span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {user?.email}
                  </span>
                </div>
                <p className="text-xs text-blue-600">{user?.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Senha: <code className="bg-slate-100 px-1 rounded">{user?.password}</code>
                </p>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyCredentials(user?.email, user?.password)}
                iconName="Copy"
                title="Copy credentials"
              >
              </Button>
            </div>
          ))}
          
          <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-700">
            <Icon name="AlertTriangle" size={12} className="inline mr-1" />
            Estas são credenciais de demonstração apenas para fins de teste.
          </div>
        </div>
      )}
    </div>
  );
};

export default MockCredentialsHelper;