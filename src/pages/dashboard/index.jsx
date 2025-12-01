import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import MetricCard from './components/MetricCard';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import CalendarWidget from './components/CalendarWidget';
import SearchBar from './components/SearchBar';
import DataVisualization from './components/DataVisualization';

const Dashboard = () => {
  const [userRole, setUserRole] = useState('administrator');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const user = {
    name: 'Dr. Luis Felipe',
    role: 'Diretor Médico',
    department: 'Diretoria'
  };

  // Role-specific metrics
  const getMetricsForRole = (role) => {
    const metrics = {
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
          title: 'Doutores Ativos',
          value: '89',
          change: '+3%',
          changeType: 'increase',
          icon: 'UserCheck',
          color: 'success'
        },
        {
          title: 'Consultas de hoje',
          value: '156',
          change: '+8%',
          changeType: 'increase',
          icon: 'Calendar',
          color: 'info'
        },
        {
          title: 'Taxa de ocupação de leitos',
          value: '87%',
          change: '-2%',
          changeType: 'decrease',
          icon: 'Bed',
          color: 'warning'
        }
      ],
      doctor: [
        {
          title: 'Meus pacientes hoje',
          value: '24',
          change: '+2',
          changeType: 'increase',
          icon: 'Users',
          color: 'primary'
        },
        {
          title: 'Agendamentos',
          value: '12',
          change: 'On Schedule',
          changeType: 'increase',
          icon: 'Calendar',
          color: 'success'
        },
        {
          title: 'Relatórios pendentes',
          value: '7',
          change: '-3',
          changeType: 'decrease',
          icon: 'FileText',
          color: 'warning'
        },
        {
          title: 'Fila de espera para cirurgia',
          value: '3',
          change: 'Scheduled',
          changeType: 'increase',
          icon: 'Activity',
          color: 'info'
        }
      ],
      nurse: [
        {
          title: 'Pacientes designados',
          value: '18',
          change: '+1',
          changeType: 'increase',
          icon: 'Heart',
          color: 'primary'
        },
        {
          title: 'Casos Críticos',
          value: '4',
          change: 'Stable',
          changeType: 'increase',
          icon: 'AlertTriangle',
          color: 'error'
        },
        {
          title: 'Medicamentos devidos',
          value: '12',
          change: 'On Time',
          changeType: 'increase',
          icon: 'Pill',
          color: 'success'
        },
        {
          title: 'Horário de trabalho',
          value: '6.5h',
          change: 'Remaining',
          changeType: 'increase',
          icon: 'Clock',
          color: 'info'
        }
      ],
      receptionist: [
        {
          title: 'Check-ins hoje',
          value: '89',
          change: '+15%',
          changeType: 'increase',
          icon: 'CheckCircle',
          color: 'success'
        },
        {
          title: 'Consultas agendadas',
          value: '156',
          change: '+8%',
          changeType: 'increase',
          icon: 'Calendar',
          color: 'primary'
        },
        {
          title: 'Pacientes em espera',
          value: '12',
          change: 'Current',
          changeType: 'increase',
          icon: 'Clock',
          color: 'warning'
        },
        {
          title: 'Ligações telefônicas',
          value: '47',
          change: '+5',
          changeType: 'increase',
          icon: 'Phone',
          color: 'info'
        }
      ]
    };
    
    return metrics?.[role] || metrics?.administrator;
  };

  const metrics = getMetricsForRole(userRole);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('Pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('Pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <BreadcrumbTrail />
          
          {/* Seção de boas vindas */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Bem vindo de volta, {user?.name}
                </h1>
                <p className="text-muted-foreground">
                  {formatDate(currentTime)} • {formatTime(currentTime)}
                </p>
              </div>
            </div>
            
            {/* Barra de pesquisa */}
            <div className="max-w-2xl">
              <SearchBar />
            </div>
          </div>

          {/* Cartões de medida */}
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

          {/* Grade de conteúdo principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/*  Feed de atividades - Ocupa 2 colunas em telas grandes. */}
            <div className="lg:col-span-2">
              <ActivityFeed />
            </div>
            
            {/* Ações rápidas */}
            <div>
              <QuickActions userRole={userRole} />
            </div>
          </div>

          {/* Calendário e visualização de dados */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Widget de calendário  */}
            <div>
              <CalendarWidget />
            </div>
            
            {/* Visualização de dados - Ocupa 2 colunas em telas extragrandes. */}
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