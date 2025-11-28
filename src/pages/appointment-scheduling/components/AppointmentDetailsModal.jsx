import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AppointmentDetailsModal = ({ appointment, isOpen, onClose, onEdit, onDelete }) => {
  if (!isOpen || !appointment) return null;

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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeStr) => {
    return new Date(`2000-01-01 ${timeStr}`)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-card border border-border rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Calendar" size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              Appointment Details
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status & Priority */}
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(appointment?.status)}`}>
              {appointment?.status?.charAt(0)?.toUpperCase() + appointment?.status?.slice(1)}
            </span>
            <div className="flex items-center space-x-2">
              <Icon 
                name="Flag" 
                size={16} 
                className={getPriorityColor(appointment?.priority)}
              />
              <span className={`text-sm font-medium capitalize ${getPriorityColor(appointment?.priority)}`}>
                {appointment?.priority} Priority
              </span>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Date</span>
              </div>
              <p className="text-lg text-foreground ml-6">
                {formatDate(appointment?.date)}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Time</span>
              </div>
              <p className="text-lg text-foreground ml-6">
                {formatTime(appointment?.time)} ({appointment?.duration} minutes)
              </p>
            </div>
          </div>

          {/* Patient Information */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="User" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Patient</span>
            </div>
            <div className="ml-6 space-y-1">
              <p className="text-lg font-medium text-foreground">
                {appointment?.patientName}
              </p>
              <p className="text-sm text-muted-foreground">
                Patient ID: {appointment?.patientId} • Age: {appointment?.patientAge || 'N/A'}
              </p>
              {appointment?.patientPhone && (
                <p className="text-sm text-muted-foreground">
                  Phone: {appointment?.patientPhone}
                </p>
              )}
            </div>
          </div>

          {/* Doctor Information */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="UserCheck" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Doctor</span>
            </div>
            <div className="ml-6 space-y-1">
              <p className="text-lg font-medium text-foreground">
                Dr. {appointment?.doctorName}
              </p>
              <p className="text-sm text-muted-foreground">
                {appointment?.doctorSpecialization || 'General Medicine'}
              </p>
              {appointment?.room && (
                <p className="text-sm text-muted-foreground">
                  Room: {appointment?.room}
                </p>
              )}
            </div>
          </div>

          {/* Appointment Type */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="FileText" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Appointment Type</span>
            </div>
            <p className="text-lg text-foreground ml-6 capitalize">
              {appointment?.type}
            </p>
          </div>

          {/* Notes */}
          {appointment?.notes && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="MessageSquare" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Notes</span>
              </div>
              <div className="ml-6 p-3 bg-muted rounded-lg">
                <p className="text-sm text-foreground whitespace-pre-wrap">
                  {appointment?.notes}
                </p>
              </div>
            </div>
          )}

          {/* Recurring Information */}
          {appointment?.recurring && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="Repeat" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Recurring Appointment</span>
              </div>
              <div className="ml-6 space-y-1">
                <p className="text-sm text-foreground capitalize">
                  Repeats: {appointment?.recurringType}
                </p>
                {appointment?.recurringEnd && (
                  <p className="text-sm text-muted-foreground">
                    Until: {formatDate(appointment?.recurringEnd)}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Created/Updated Info */}
          <div className="pt-4 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground">
              <div>
                <span className="font-medium">Created:</span> {appointment?.createdAt || 'N/A'}
              </div>
              <div>
                <span className="font-medium">Last Updated:</span> {appointment?.updatedAt || 'N/A'}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/30">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
          
          {appointment?.status !== 'completed' && appointment?.status !== 'cancelled' && (
            <>
              <Button
                variant="outline"
                iconName="Edit"
                iconPosition="left"
                onClick={() => {
                  onEdit(appointment);
                  onClose();
                }}
              >
                Edit
              </Button>
              
              <Button
                variant="destructive"
                iconName="Trash2"
                iconPosition="left"
                onClick={() => {
                  onDelete(appointment);
                  onClose();
                }}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;