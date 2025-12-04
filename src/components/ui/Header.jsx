import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import UserProfileDropdown from './UserProfileDropdown';
import NotificationBadge from './NotificationBadge';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      isUnderConstruction: false
    },
    {
      label: 'Pacientes',
      path: '/patient-management',
      icon: 'Users',
      isUnderConstruction: false
    },
    {
      label: 'Doutores',
      path: '/doctor-management',
      icon: 'UserCheck',
      isUnderConstruction: true // Bloqueado
    },
    {
      label: 'Agendamentos',
      path: '/appointment-scheduling',
      icon: 'Calendar',
      isUnderConstruction: true // Bloqueado
    },
    {
      label: 'Histórico de Consultas',
      path: '/appointment-history',
      icon: 'History',
      isUnderConstruction: false
    }
  ];

  // Verifica se o caminho atual é igual ao do item OU se estamos na página de construção vindo desse item
  const isActivePath = (item) => {
    if (location.pathname === item.path) return true;
    // Mantem o item ativo visualmente mesmo na página de construção
    if (location.pathname === '/construction' && item.isUnderConstruction && location.state?.from === item.path) return true;
    return false;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Seção para o Logo */}
        <div className="flex items-center">
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <Icon name="Heart" size={24} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-semibold text-gray-900">HospitalCare Pro</h1>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              // Lógica de Redirecionamento: Se estiver em construção, vai para a página de aviso
              to={item.isUnderConstruction ? '/construction' : item.path}
              // Passamos o estado para saber de onde viemos (opcional, para UX)
              state={item.isUnderConstruction ? { from: item.path, label: item.label } : null}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActivePath(item)
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Seleção direita */}
        <div className="flex items-center space-x-4">
          <NotificationBadge />
          <UserProfileDropdown />
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-slide-down">
          <nav className="px-6 py-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                to={item.isUnderConstruction ? '/construction' : item.path}
                state={item.isUnderConstruction ? { from: item.path, label: item.label } : null}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActivePath(item)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;