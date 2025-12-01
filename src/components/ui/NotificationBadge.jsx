import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const NotificationBadge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'critica',
      title: 'Alerta de Emergência',
      message: 'O paciente Johnatan da silva necessita de atenção imediata no quarto 302.',
      time: '2 minutos atrás',
      read: false
    },
    {
      id: 2,
      type: 'atenção',
      title: 'Conflito de Agendamento',
      message: 'O Dr. Smith tem consultas agendadas simultaneamente às 14h.',
      time: '15 minutos atrás',
      read: false
    },
    {
      id: 3,
      type: 'informativo',
      title: 'Resultados de laboratório prontos',
      message: 'Resultados dos exames de sangue disponíveis para o paciente com ID: 12345',
      time: '1 hora atrás',
      read: true
    },
    {
      id: 4,
      type: 'sucesso',
      title: 'Cirurgia concluída',
      message: 'Apendicectomia da paciente Luiz Henrique concluída com sucesso.',
      time: '2 Horas atrás',
      read: true
    }
  ]);

  const dropdownRef = useRef(null);
  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev?.map(notification => 
        notification?.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev?.map(notification => ({ ...notification, read: true }))
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'critica':
        return { name: 'AlertTriangle', color: 'text-alert-red' };
      case 'atenção':
        return { name: 'AlertCircle', color: 'text-caution-amber' };
      case 'sucesso':
        return { name: 'CheckCircle', color: 'text-success-green' };
      default:
        return { name: 'info', color: 'text-medical-blue' };
    }
  };

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'critica':
        return 'border-l-alert-red bg-red-50';
      case 'atenção':
        return 'border-l-caution-amber bg-amber-50';
      case 'sucesso':
        return 'border-l-success-green bg-emerald-50';
      default:
        return 'border-l-medical-blue bg-blue-50';
    }
  };

  // Close dropdown when clicking outside
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
      {/* Notification Button */}
      <button
        onClick={toggleDropdown}
        className="relative flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200 focus-ring"
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
      >
        <Icon name="Bell" size={20} />
        
        {/* Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-alert-red text-white text-xs font-semibold rounded-full">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-medical-lg animate-slide-down z-1010">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Notificações</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-primary hover:text-primary/80 font-medium transition-colors duration-200"
              >
                Marcar todas com lidas
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Icon name="Bell" size={32} className="text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Sem notificações</p>
              </div>
            ) : (
              <div className="py-2">
                {notifications?.map((notification) => {
                  const iconConfig = getNotificationIcon(notification?.type);
                  return (
                    <div
                      key={notification?.id}
                      className={`relative px-4 py-3 border-l-4 ${getNotificationStyle(notification?.type)} ${
                        !notification?.read ? 'bg-opacity-50' : 'bg-opacity-20'
                      } hover:bg-opacity-70 transition-colors duration-200 cursor-pointer`}
                      onClick={() => markAsRead(notification?.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon 
                          name={iconConfig?.name} 
                          size={16} 
                          className={`mt-0.5 ${iconConfig?.color}`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-medium ${!notification?.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {notification?.title}
                            </p>
                            {!notification?.read && (
                              <div className="w-2 h-2 bg-primary rounded-full ml-2 flex-shrink-0"></div>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {notification?.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification?.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications?.length > 0 && (
            <div className="px-4 py-3 border-t border-border">
              <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200">
                Visualizar todas as notificações
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBadge;