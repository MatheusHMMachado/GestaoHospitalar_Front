import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AppointmentList = ({ appointments, onEdit, onDelete, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'consultation', label: 'Consultation' },
    { value: 'checkup', label: 'Check-up' },
    { value: 'follow-up', label: 'Follow-up' },
    { value: 'surgery', label: 'Surgery' },
    { value: 'emergency', label: 'Emergency' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'no-show', label: 'No Show' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Date & Time' },
    { value: 'patient', label: 'Patient Name' },
    { value: 'doctor', label: 'Doctor Name' },
    { value: 'type', label: 'Appointment Type' },
    { value: 'status', label: 'Status' }
  ];

  // Filter and sort appointments
  const filteredAppointments = appointments?.filter(appointment => {
      const matchesSearch = 
        appointment?.patientName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        appointment?.doctorName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        appointment?.type?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      
      const matchesType = filterType === 'all' || appointment?.type === filterType;
      const matchesStatus = filterStatus === 'all' || appointment?.status === filterStatus;
      
      return matchesSearch && matchesType && matchesStatus;
    })?.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time);
        case 'patient':
          return a?.patientName?.localeCompare(b?.patientName);
        case 'doctor':
          return a?.doctorName?.localeCompare(b?.doctorName);
        case 'type':
          return a?.type?.localeCompare(b?.type);
        case 'status':
          return a?.status?.localeCompare(b?.status);
        default:
          return 0;
      }
    });

  const getStatusColor = (status) => {
    const colors = {
      'scheduled': 'bg-blue-100 text-blue-800 border-blue-200',
      'confirmed': 'bg-green-100 text-green-800 border-green-200',
      'completed': 'bg-gray-100 text-gray-800 border-gray-200',
      'cancelled': 'bg-red-100 text-red-800 border-red-200',
      'no-show': 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors?.[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'low': 'text-gray-500',
      'normal': 'text-blue-500',
      'high': 'text-orange-500',
      'urgent': 'text-red-500'
    };
    return colors?.[priority] || 'text-gray-500';
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr)?.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-md">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <h3 className="text-lg font-semibold text-foreground">
            Appointments ({filteredAppointments?.length})
          </h3>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="search"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full sm:w-64"
            />
            
            <div className="flex gap-2">
              <Select
                options={typeOptions}
                value={filterType}
                onChange={setFilterType}
                className="w-32"
              />
              
              <Select
                options={statusOptions}
                value={filterStatus}
                onChange={setFilterStatus}
                className="w-32"
              />
              
              <Select
                options={sortOptions}
                value={sortBy}
                onChange={setSortBy}
                className="w-32"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Appointments List */}
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {filteredAppointments?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Icon name="Calendar" size={48} className="text-muted-foreground mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No appointments found</h4>
            <p className="text-sm text-muted-foreground">
              {searchTerm || filterType !== 'all' || filterStatus !== 'all' ?'Try adjusting your search or filters' :'No appointments scheduled yet'
              }
            </p>
          </div>
        ) : (
          filteredAppointments?.map((appointment) => (
            <div
              key={appointment?.id}
              className="p-4 hover:bg-muted/50 transition-colors duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  {/* Main Info */}
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name="Clock" 
                        size={16} 
                        className={getPriorityColor(appointment?.priority)}
                      />
                      <span className="text-sm font-medium text-foreground">
                        {appointment?.time}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(appointment?.date)}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment?.status)}`}>
                      {appointment?.status?.charAt(0)?.toUpperCase() + appointment?.status?.slice(1)}
                    </span>
                  </div>

                  {/* Patient & Doctor */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon name="User" size={14} className="text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        {appointment?.patientName}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="UserCheck" size={14} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Dr. {appointment?.doctorName}
                      </span>
                    </div>
                  </div>

                  {/* Type & Duration */}
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="capitalize">{appointment?.type}</span>
                    <span>•</span>
                    <span>{appointment?.duration} minutes</span>
                    {appointment?.room && (
                      <>
                        <span>•</span>
                        <span>Room {appointment?.room}</span>
                      </>
                    )}
                  </div>

                  {/* Notes */}
                  {appointment?.notes && (
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                      {appointment?.notes}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    onClick={() => onViewDetails(appointment)}
                  >
                    View
                  </Button>
                  
                  {appointment?.status !== 'completed' && appointment?.status !== 'cancelled' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      onClick={() => onEdit(appointment)}
                    >
                      Edit
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Trash2"
                    onClick={() => onDelete(appointment)}
                    className="text-destructive hover:text-destructive"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentList;