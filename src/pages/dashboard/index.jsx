import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import MetricCard from './components/MetricCard';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import CalendarWidget from './components/CalendarWidget';
import SearchBar from './components/SearchBar';
import DataVisualization from './components/DataVisualization';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Estado para armazenar os dados do usuário logado
  const [userData, setUserData] = useState({
    name: '',
    role: '',
    department: ''
  });
  const [loading, setLoading] = useState(true);

  // 1. Efeito para carregar dados do usuário e validar sessão
  useEffect(() => {
    try {
      const storedData = localStorage.getItem('user_data');
      
      if (!storedData) {
        // Se não encontra nada na sessão, redireciona para o login
        navigate('/login');
        return;
      }

      const parsedUser = JSON.parse(storedData);
      
      setUserData({
        name: parsedUser.nome || 'Utilizador',
        role: parsedUser.perfil || 'Visitante',
        // Define departamento baseado no perfil (lógica de frontend para exibição)
        department: parsedUser.perfil === 'Admin' ? 'Administração' : 'Corpo Clínico'
      });
      
    } catch (error) {
      console.error("Erro ao carregar sessão:", error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // 2. Relógio
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // 3. Função para traduzir o Perfil do Banco (Ex: "Admin") para a chave de métricas (Ex: "administrator")
  const getRoleKey = (backendRole) => {
    if (!backendRole) return 'administrator';
    
    const role = backendRole.toLowerCase();
    
    if (role.includes('admin')) return 'administrator';
    if (role.includes('medico') || role.includes('doutor')) return 'doutor';
    if (role.includes('enfermeira') || role.includes('enfermeira')) return 'enfermeira';
    if (role.includes('recepcionista') || role.includes('recepcionista')) return 'recepcionista';
    
    return 'administrator'; // Fallback padrão
  };

  // Dados das métricas (Mockados visualmente enquanto o endpoint real está em desenvolvimento)
  const getMetricsForRole = (roleName) => {
    const roleKey = getRoleKey(roleName);

    const metricsMap = {
      administrator: [
        {
          title: 'Total de Pacientes',
          value: '1,247',
          change: '+12%',
          changeType: 'increase',
          icon: 'Users',
          color: 'primary'
        },
        {
          title: 'Médicos Ativos',
          value: '89',
          change: '+3%',
          changeType: 'increase',
          icon: 'UserCheck',
          color: 'success'
        },
        {
          title: 'Consultas Hoje',
          value: '156',
          change: '+8%',
          changeType: 'increase',
          icon: 'Calendar',
          color: 'info'
        },
        {
          title: 'Ocupação de Leitos',
          value: '87%',
          change: '-2%',
          changeType: 'decrease',
          icon: 'Bed',
          color: 'warning'
        }
      ],
      doctor: [
        {
          title: 'Meus Pacientes Hoje',
          value: '24',
          change: '+2',
          changeType: 'increase',
          icon: 'Users',
          color: 'primary'
        },
        {
          title: 'Consultas',
          value: '12',
          change: 'No Horário',
          changeType: 'increase',
          icon: 'Calendar',
          color: 'success'
        },
        {
          title: 'Laudos Pendentes',
          value: '7',
          change: '-3',
          changeType: 'decrease',
          icon: 'FileText',
          color: 'warning'
        },
        {
          title: 'Cirurgias',
          value: '3',
          change: 'Agendadas',
          changeType: 'increase',
          icon: 'Activity',
          color: 'info'
        }
      ],
      nurse: [
        {
          title: 'Pacientes Designados',
          value: '18',
          change: '+1',
          changeType: 'increase',
          icon: 'Heart',
          color: 'primary'
        },
        {
          title: 'Casos Críticos',
          value: '4',
          change: 'Estável',
          changeType: 'increase',
          icon: 'AlertTriangle',
          color: 'error'
        },
        {
          title: 'Medicação Pendente',
          value: '12',
          change: 'No Horário',
          changeType: 'increase',
          icon: 'Pill',
          color: 'success'
        },
        {
          title: 'Plantão Restante',
          value: '6.5h',
          change: '',
          changeType: 'increase',
          icon: 'Clock',
          color: 'info'
        }
      ],
      receptionist: [
        {
          title: 'Check-ins Hoje',
          value: '89',
          change: '+15%',
          changeType: 'increase',
          icon: 'CheckCircle',
          color: 'success'
        },
        {
          title: 'Consultas Agendadas',
          value: '156',
          change: '+8%',
          changeType: 'increase',
          icon: 'Calendar',
          color: 'primary'
        },
        {
          title: 'Pacientes em Espera',
          value: '12',
          change: 'Atual',
          changeType: 'increase',
          icon: 'Clock',
          color: 'warning'
        },
        {
          title: 'Ligações',
          value: '47',
          change: '+5',
          changeType: 'increase',
          icon: 'Phone',
          color: 'info'
        }
      ]
    };
    
    return metricsMap[roleKey] || metricsMap.administrator;
  };

  const metrics = getMetricsForRole(userData.role);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background">Carregando painel...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <BreadcrumbTrail />
          
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Bem-vindo de volta, {userData.name}
                </h1>
                <p className="text-muted-foreground capitalize">
                  {formatDate(currentTime)} • {formatTime(currentTime)}
                </p>
                
                {/* Badge do Cargo */}
                <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  {userData.role} • {userData.department}
                </div>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl">
              <SearchBar />
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics?.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Activity Feed */}
            <div className="lg:col-span-2">
              <ActivityFeed />
            </div>
            
            {/* Quick Actions */}
            <div>
              <QuickActions userRole={getRoleKey(userData.role)} />
            </div>
          </div>

          {/* Calendar and Data Visualization */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Calendar Widget */}
            <div>
              <CalendarWidget />
            </div>
            
            {/* Data Visualization */}
            <div className="xl:col-span-2">
              <DataVisualization />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;