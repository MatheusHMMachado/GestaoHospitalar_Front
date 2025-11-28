import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DoctorCard = ({ doctor, onViewProfile, onEditSchedule }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'status-success';
      case 'Busy':
        return 'status-warning';
      case 'Off Duty':
        return 'status-neutral';
      default:
        return 'status-neutral';
    }
  };

  const getPatientLoadColor = (load) => {
    if (load >= 80) return 'text-alert-red';
    if (load >= 60) return 'text-caution-amber';
    return 'text-success-green';
  };

  return (
    <div className="medical-card p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start space-x-4">
        {/* Doctor Avatar */}
        <div className="flex-shrink-0">
          <div className="relative">
            <Image
              src={doctor?.avatar}
              alt={doctor?.avatarAlt}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-clinical-white ${
              doctor?.status === 'Available' ? 'bg-success-green' :
              doctor?.status === 'Busy' ? 'bg-caution-amber' : 'bg-neutral-slate'
            }`}></div>
          </div>
        </div>

        {/* Doctor Information */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{doctor?.name}</h3>
              <p className="text-sm text-primary font-medium">{doctor?.specialization}</p>
              <p className="text-sm text-muted-foreground">{doctor?.department}</p>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <span className={`status-indicator ${getStatusColor(doctor?.status)}`}>
                {doctor?.status}
              </span>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Patient Load</p>
                <p className={`text-sm font-semibold ${getPatientLoadColor(doctor?.patientLoad)}`}>
                  {doctor?.patientLoad}%
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-3 flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Phone" size={14} />
              <span>{doctor?.phone}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Mail" size={14} />
              <span>{doctor?.email}</span>
            </div>
          </div>

          {/* Experience and Certifications */}
          <div className="mt-3 flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="Calendar" size={14} />
              <span>{doctor?.experience} years exp.</span>
            </div>
            <div className="flex items-center space-x-1 text-success-green">
              <Icon name="Award" size={14} />
              <span>{doctor?.certifications} certifications</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="User"
              iconPosition="left"
              onClick={() => onViewProfile(doctor)}
            >
              View Profile
            </Button>
            <Button
              variant="secondary"
              size="sm"
              iconName="Calendar"
              iconPosition="left"
              onClick={() => onEditSchedule(doctor)}
            >
              Schedule
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;