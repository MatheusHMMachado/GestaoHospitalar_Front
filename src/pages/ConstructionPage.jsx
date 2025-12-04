import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';

const ConstructionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Tenta pegar o nome da página que o usuário tentou acessar via state
  // Se não houver state (acesso direto), usa 'Módulo'
  const pageName = location.state?.label || 'Módulo';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-16">
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 max-w-lg w-full text-center">
          <div className="w-24 h-24 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
            <Icon name="Hammer" size={48} />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Em Desenvolvimento
          </h1>
          
          <p className="text-gray-500 mb-8 text-lg leading-relaxed">
            O módulo <strong>{pageName}</strong> está sendo construído e estará disponível em breve nas próximas versões do sistema.
          </p>

          <div className="flex justify-center">
            <Button 
                variant="default"
                onClick={() => navigate('/dashboard')}
                iconName="ArrowLeft"
                iconPosition="left"
            >
                Voltar ao Dashboard
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConstructionPage;