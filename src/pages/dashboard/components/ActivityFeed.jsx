import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: "appointment",
      title: "Novo agendamento de consulta",
      description: "Dra. Gabriela da silva - Paciente: Carlos",
      time: "2 minutes ago",
      icon: "Calendar",
      color: "text-medical-blue"
    },
    {
      id: 2,
      type: "patient",
      title: "Cadastro do paciente concluído",
      description: "Lucas henrique - ID: PT-2024-1031",
      time: "15 minutos atrás",
      icon: "UserPlus",
      color: "text-success-green"
    },
    {
      id: 3,
      type: "emergency",
      title: "Alerta de emergência",
      description: "Quarto 302 - Requer atenção imediata",
      time: "1 hora atrás",
      icon: "AlertTriangle",
      color: "text-alert-red"
    },
    {
      id: 4,
      type: "lab",
      title: "Resultados de laboratório disponíveis",
      description: "Exames de sangue concluídos para o paciente ID: PT-2024-1029",
      time: "2 Horas atrás",
      icon: "FileText",
      color: "text-medical-blue"
    },
    {
      id: 5,
      type: "discharge",
      title: "Alta do paciente",
      description: "Pedro da silva - Quarto 205 recebeu alta com sucesso",
      time: "3 Horas atrás",
      icon: "CheckCircle",
      color: "text-success-green"
    }
  ];

  return (
    <div className="medical-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Atividade Recente</h2>
        <button className="text-sm text-primary hover:text-primary/80 font-medium">
          Ver tudo
        </button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
            <div className={`p-2 rounded-full bg-muted ${activity?.color}`}>
              <Icon name={activity?.icon} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground">{activity?.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{activity?.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity?.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;