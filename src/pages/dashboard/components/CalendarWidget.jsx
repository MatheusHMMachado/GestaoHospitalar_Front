import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CalendarWidget = () => {
  const [currentDate] = useState(new Date());
  
  const todayAppointments = [
    {
      id: 1,
      time: "09:00 AM",
      patient: "Emma Thompson",
      doctor: "Dr. Sarah Johnson",
      type: "Consultation",
      status: "confirmed",
      room: "Room 101"
    },
    {
      id: 2,
      time: "10:30 AM",
      patient: "Michael Rodriguez",
      doctor: "Dr. James Wilson",
      type: "Follow-up",
      status: "in-progress",
      room: "Room 205"
    },
    {
      id: 3,
      time: "02:00 PM",
      patient: "Lisa Chen",
      doctor: "Dr. Sarah Johnson",
      type: "Surgery",
      status: "scheduled",
      room: "OR-1"
    },
    {
      id: 4,
      time: "03:30 PM",
      patient: "Robert Davis",
      doctor: "Dr. Maria Garcia",
      type: "Check-up",
      status: "confirmed",
      room: "Room 103"
    },
    {
      id: 5,
      time: "04:45 PM",
      patient: "Jennifer Wilson",
      doctor: "Dr. James Wilson",
      type: "Consultation",
      status: "scheduled",
      room: "Room 201"
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      confirmed: "bg-success-green/10 text-success-green border-success-green/20",
      "in-progress": "bg-caution-amber/10 text-caution-amber border-caution-amber/20",
      scheduled: "bg-medical-blue/10 text-medical-blue border-medical-blue/20",
      cancelled: "bg-alert-red/10 text-alert-red border-alert-red/20"
    };
    return colors?.[status] || colors?.scheduled;
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
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
          <h2 className="text-lg font-semibold text-foreground">Today's Schedule</h2>
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
          View Full Calendar
        </button>
      </div>
    </div>
  );
};

export default CalendarWidget;