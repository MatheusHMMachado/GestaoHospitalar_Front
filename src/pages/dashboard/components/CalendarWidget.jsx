import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CalendarWidget = () => {
  const [currentDate] = useState(new Date());
  
  const todayAppointments = [
    {
      id: 1,
      time: "09:00 AM",
      patient: "Julia de padua",
      doctor: "Dra. Gabriela da silva",
      type: "Consulta",
      status: "Confirmado",
      room: "Quarto 101"
    },
    {
      id: 2,
      time: "10:30 AM",
      patient: "Michael Rodriguez",
      doctor: "Dra. Gabriela da silva",
      type: "Seguir",
      status: "Em progresso",
      room: "Quarto 205"
    },
    {
      id: 3,
      time: "02:00 PM",
      patient: "Marcela marques",
      doctor: "Dra. Gabriela da silva",
      type: "Cirurgia",
      status: "Agendado",
      room: "Quarto 450"
    },
    {
      id: 4,
      time: "03:30 PM",
      patient: "Roberto de almeida",
      doctor: "Dr. Maria Garcia",
      type: "Check-up",
      status: "Confirmado",
      room: "Quarto 103"
    },
    {
      id: 5,
      time: "04:45 PM",
      patient: "Jennifer mendes",
      doctor: "Dr. Wellington oliveira",
      type: "Consulta",
      status: "Agendado",
      room: "Quarto 201"
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      Confirmado: "bg-success-green/10 text-success-green border-success-green/20",
      "Em progresso": "bg-caution-amber/10 text-caution-amber border-caution-amber/20",
      Agendado: "bg-medical-blue/10 text-medical-blue border-medical-blue/20",
      Cancelado: "bg-alert-red/10 text-alert-red border-alert-red/20"
    };
    return colors?.[status] || colors?.Agendado;
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
    <div className="medical-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Programação de hoje</h2>
          <p className="text-sm text-muted-foreground">{formatDate(currentDate)}</p>
        </div>
        <Icon name="Calendar" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {todayAppointments?.map((appointment) => (
          <div
            key={appointment?.id}
            className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-200"
          >
            <div className="text-center min-w-0 flex-shrink-0">
              <div className="text-sm font-medium text-foreground">{appointment?.time}</div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-foreground truncate">
                  {appointment?.patient}
                </h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment?.status)}`}>
                  {appointment?.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {appointment?.doctor} • {appointment?.type}
              </p>
              <p className="text-xs text-muted-foreground">
                {appointment?.room}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 font-medium">
          Ver calendário completo
        </button>
      </div>
    </div>
  );
};

export default CalendarWidget;