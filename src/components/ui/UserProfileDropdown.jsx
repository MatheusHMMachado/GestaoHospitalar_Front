import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const user = {
    name: 'Dr. Luis Felipe',
    role: 'Diretor Médico',
    email: 'admin@hospital.com',
    avatar: null,
    initials: 'LF'
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    console.log('Saindo...');
    setIsOpen(false);
  };

  const handleProfileClick = () => {
    console.log('Redirecionando para o Perfil...');
    setIsOpen(false);
  };

  const handleSettingsClick = () => {
    console.log('Redirecionando para configurações...');
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botão do perfil */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200 focus-ring"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Avatar */}
        <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-xs font-semibold">
          {user?.initials}
        </div>
        
        {/* User Info - Oculto no mobile */}
        <div className="hidden lg:block text-left">
          <div className="text-sm font-medium text-foreground">{user?.name}</div>
          <div className="text-xs text-muted-foreground">{user?.role}</div>
        </div>
        
        {/* Seta suspensa */}
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {/* Menu suspenso */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-medical-lg animate-slide-down z-1010">
          {/* Cabeçalho de informações do usuário */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                {user?.initials}
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{user?.name}</div>
                <div className="text-xs text-muted-foreground">{user?.role}</div>
                <div className="text-xs text-muted-foreground">{user?.email}</div>
              </div>
            </div>
          </div>

          {/* Itens do menu */}
          <div className="py-2">
            <button
              onClick={handleProfileClick}
              className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-200"
            >
              <Icon name="User" size={16} />
              <span>Visualizar Perfil</span>
            </button>
            
            <button
              onClick={handleSettingsClick}
              className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-200"
            >
              <Icon name="Configurações" size={16} />
              <span>Configurações</span>
            </button>
            
            <div className="border-t border-border my-2"></div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors duration-200"
            >
              <Icon name="LogOut" size={16} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;