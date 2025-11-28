import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AppointmentCalendar = ({ selectedDate, onDateSelect, appointments, onAppointmentClick }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // Get start of week (Monday)
  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d?.getDay();
    const diff = d?.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  // Generate week days
  const getWeekDays = () => {
    const weekStart = getWeekStart(currentWeek);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day?.setDate(weekStart?.getDate() + i);
      days?.push(day);
    }
    return days;
  };

  // Navigate weeks
  const navigateWeek = (direction) => {
    const newWeek = new Date(currentWeek);
    newWeek?.setDate(currentWeek?.getDate() + (direction * 7));
    setCurrentWeek(newWeek);
  };

  // Get appointments for specific date
  const getAppointmentsForDate = (date) => {
    const dateStr = date?.toDateString();
    return appointments?.filter(apt => new Date(apt.date)?.toDateString() === dateStr);
  };

  // Get appointment color by type
  const getAppointmentColor = (type) => {
    const colors = {
      'consultation': 'bg-blue-100 border-blue-300 text-blue-800',
      'surgery': 'bg-red-100 border-red-300 text-red-800',
      'checkup': 'bg-green-100 border-green-300 text-green-800',
      'emergency': 'bg-orange-100 border-orange-300 text-orange-800',
      'follow-up': 'bg-purple-100 border-purple-300 text-purple-800'
    };
    return colors?.[type] || 'bg-gray-100 border-gray-300 text-gray-800';
  };

  const weekDays = getWeekDays();
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-card border border-border rounded-lg shadow-md">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-foreground">Weekly Schedule</h3>
          <span className="text-sm text-muted-foreground">
            {weekDays?.[0]?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateWeek(-1)}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>
          <button
            onClick={() => setCurrentWeek(new Date())}
            className="px-3 py-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
          >
            Today
          </button>
          <button
            onClick={() => navigateWeek(1)}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 border-b border-border">
        {/* Day Headers */}
        {dayNames?.map((dayName, index) => (
          <div key={dayName} className="p-3 text-center border-r border-border last:border-r-0">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {dayName}
            </div>
            <div className={`text-lg font-semibold mt-1 ${
              weekDays?.[index]?.toDateString() === new Date()?.toDateString()
                ? 'text-primary'
                : weekDays?.[index]?.toDateString() === selectedDate?.toDateString()
                ? 'text-accent' :'text-foreground'
            }`}>
              {weekDays?.[index]?.getDate()}
            </div>
          </div>
        ))}
      </div>
      {/* Calendar Body */}
      <div className="grid grid-cols-7 min-h-96">
        {weekDays?.map((day, dayIndex) => {
          const dayAppointments = getAppointmentsForDate(day);
          const isToday = day?.toDateString() === new Date()?.toDateString();
          const isSelected = day?.toDateString() === selectedDate?.toDateString();
          
          return (
            <div
              key={day?.toISOString()}
              className={`p-2 border-r border-border last:border-r-0 cursor-pointer hover:bg-muted/50 transition-colors duration-200 ${
                isSelected ? 'bg-accent/10' : ''
              }`}
              onClick={() => onDateSelect(day)}
            >
              {/* Day indicator */}
              {isToday && (
                <div className="w-2 h-2 bg-primary rounded-full mb-2"></div>
              )}
              {/* Appointments */}
              <div className="space-y-1">
                {dayAppointments?.slice(0, 4)?.map((appointment) => (
                  <div
                    key={appointment?.id}
                    className={`p-1 rounded text-xs border cursor-pointer hover:shadow-sm transition-shadow duration-200 ${getAppointmentColor(appointment?.type)}`}
                    onClick={(e) => {
                      e?.stopPropagation();
                      onAppointmentClick(appointment);
                    }}
                  >
                    <div className="font-medium truncate">
                      {appointment?.time} - {appointment?.patientName}
                    </div>
                    <div className="text-xs opacity-75 truncate">
                      Dr. {appointment?.doctorName}
                    </div>
                  </div>
                ))}
                
                {/* Show more indicator */}
                {dayAppointments?.length > 4 && (
                  <div className="text-xs text-muted-foreground text-center py-1">
                    +{dayAppointments?.length - 4} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Legend */}
      <div className="p-4 border-t border-border">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-foreground">Appointment Types:</span>
          {[
            { type: 'consultation', label: 'Consultation' },
            { type: 'surgery', label: 'Surgery' },
            { type: 'checkup', label: 'Check-up' },
            { type: 'emergency', label: 'Emergency' },
            { type: 'follow-up', label: 'Follow-up' }
          ]?.map(({ type, label }) => (
            <div key={type} className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded border ${getAppointmentColor(type)}`}></div>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;