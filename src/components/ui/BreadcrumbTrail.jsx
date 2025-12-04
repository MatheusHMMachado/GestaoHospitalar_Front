import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbTrail = ({ customBreadcrumbs = null }) => {
  const location = useLocation();

  // Mapeamento padrão de trilha de navegação baseado em rotas
  const routeMapping = {
    '/dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/patient-management': { label: 'Pacientes', icon: 'Users' },
    '/doctor-management': { label: 'Doutores', icon: 'UserCheck' },
    '/appointment-scheduling': { label: 'Agendamentos', icon: 'Calendar' },
    '/login': { label: 'Login', icon: 'LogIn' },
    '/user-registration': { label: 'Registro de usuários', icon: 'UserPlus' },
    '/appointment-history': { label: 'Histórico de Consultas', icon: 'History' },
  };

  // Gerar trilhas de navegação a partir do caminho atual
  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [];

    // Comece sempre com o Painel de Controle como página inicial.
    if (location?.pathname !== '/dashboard') {
      breadcrumbs?.push({
        label: 'Dashboard',
        path: '/dashboard',
        icon: 'LayoutDashboard'
      });
    }

    // Construir trilhas de navegação a partir de segmentos de caminho
    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const routeInfo = routeMapping?.[currentPath];
      
      if (routeInfo) {
        breadcrumbs?.push({
          label: routeInfo?.label,
          path: currentPath,
          icon: routeInfo?.icon,
          isLast: index === pathSegments?.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on login/registration pages or if only one item
  if (location?.pathname === '/login' || 
      location?.pathname === '/user-registration' || 
      breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((breadcrumb, index) => (
          <li key={breadcrumb?.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="mx-2 text-muted-foreground/60" 
              />
            )}
            
            {breadcrumb?.isLast ? (
              // Current page - not clickable
              (<span className="flex items-center space-x-1 text-foreground font-medium">
                <Icon name={breadcrumb?.icon} size={14} />
                <span className="hidden sm:inline">{breadcrumb?.label}</span>
                <span className="sm:hidden">{breadcrumb?.label?.split(' ')?.[0]}</span>
              </span>)
            ) : (
              // Clickable breadcrumb
              (<Link
                to={breadcrumb?.path}
                className="flex items-center space-x-1 hover:text-foreground transition-colors duration-200"
              >
                <Icon name={breadcrumb?.icon} size={14} />
                <span className="hidden sm:inline">{breadcrumb?.label}</span>
                <span className="sm:hidden">{breadcrumb?.label?.split(' ')?.[0]}</span>
              </Link>)
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbTrail;