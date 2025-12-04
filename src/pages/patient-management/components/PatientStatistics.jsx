import React from 'react';
import Icon from '../../../components/AppIcon';

const PatientStatistics = ({ patients }) => {
  const totalPatients = patients?.length;
  const activePatients = patients?.filter(p => p?.status === 'Ativo')?.length;
  const admittedPatients = patients?.filter(p => p?.status === 'Admitidos')?.length;
  const criticalPatients = patients?.filter(p => p?.status === 'Criticos')?.length;

  const todayRegistrations = patients?.filter(p => {
    const today = new Date()?.toLocaleDateString();
    return p?.registrationDate === today;
  })?.length;

  const stats = [
    {
      title: 'Total de Pacientes',
      value: totalPatients,
      icon: 'Users',
      color: 'text-medical-blue',
      bgColor: 'bg-medical-blue/10',
      borderColor: 'border-medical-blue/20'
    },
    {
      title: 'Pacientes Ativos',
      value: activePatients,
      icon: 'UserCheck',
      color: 'text-success-green',
      bgColor: 'bg-success-green/10',
      borderColor: 'border-success-green/20'
    },
    {
      title: 'Pacientes Internados',
      value: admittedPatients,
      icon: 'Bed',
      color: 'text-caution-amber',
      bgColor: 'bg-caution-amber/10',
      borderColor: 'border-caution-amber/20'
    },
    {
      title: 'Pacientes Críticos',
      value: criticalPatients,
      icon: 'AlertTriangle',
      color: 'text-alert-red',
      bgColor: 'bg-alert-red/10',
      borderColor: 'border-alert-red/20'
    }
  ];

  const recentRegistrations = patients?.filter(p => p?.registrationDate)?.sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))?.slice(0, 5);

  const AcoesRapidas = () => {
    alert('Funcionalidade em desenvolvimento');
  };
  return (
    <div className="space-y-6">
      {/* Cartões de statísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {stats?.map((stat, index) => (
          <div
            key={index}
            className={`bg-card border ${stat?.borderColor} rounded-lg p-4 ${stat?.bgColor}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground w-20">{stat?.title}</p>
                <p className={`text-2xl font-bold ${stat?.color}`}>{stat?.value}</p>
              </div>
              <div className={`flex items-center justify-center w-15 h-12 rounded-lg ${stat?.bgColor}`}>
                <Icon name={stat?.icon} size={28} className={stat?.color} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Registrados Recentemente */}
      <div className="bg-card border border-border rounded-lg p-1">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-semibold text-foreground">Registrados Recentemente</h2>
          <Icon name="Clock" size={20} className="text-muted-foreground w-9" />
        </div>
        
        {recentRegistrations?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Users" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Sem registrações recentes</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentRegistrations?.map((patient) => (
              <div
                key={patient?.id}
                className="flex items-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-primary">
                    {patient?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{patient?.name}</p>
                  <p className="text-xs text-muted-foreground">ID: {patient?.patientId}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{patient?.registrationDate || 'Today'}</p>
                  <p className="text-xs text-muted-foreground">{patient?.assignedDoctor}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Ações rápidas */}
      <div className="bg-card border border-border rounded-lg p-1">
        <h3 className="text-lg font-semibold text-foreground mb-1">Ações rápidas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button onClick={AcoesRapidas} className="flex items-center space-x-3 p-3 text-left bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
            <Icon name="UserPlus" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Registrar paciente</p>
              <p className="text-xs text-muted-foreground">Adicionar novo paciente ao sistema</p>
            </div>
          </button>
          
          <button onClick={AcoesRapidas} className="flex items-center space-x-3 p-3 text-left bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
            <Icon name="Calendar" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Agendar consultas</p>
              <p className="text-xs text-muted-foreground">Agendar consulta para o paciente</p>
            </div>
          </button>
          
          <button onClick={AcoesRapidas} className="flex items-center space-x-3 p-3 text-left bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
            <Icon name="FileText" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Gerar relatório</p>
              <p className="text-xs text-muted-foreground">Exportar relatório de dados do paciente</p>
            </div>
          </button>
          
          <button onClick={AcoesRapidas} className="flex items-center space-x-3 p-3 text-left bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
            <Icon name="Search" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Pesquisa avançada</p>
              <p className="text-xs text-muted-foreground">Encontrar pacientes por critérios</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientStatistics;