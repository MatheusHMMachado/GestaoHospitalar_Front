import React from 'react';
import Icon from '../../../components/AppIcon';

const AvailabilityWidget = ({ availabilityData }) => {
  const getAvailabilityColor = (percentage) => {
    if (percentage >= 80) return 'text-success-green';
    if (percentage >= 60) return 'text-caution-amber';
    return 'text-alert-red';
  };

  const getAvailabilityBg = (percentage) => {
    if (percentage >= 80) return 'bg-success-green';
    if (percentage >= 60) return 'bg-caution-amber';
    return 'bg-alert-red';
  };

  return (
    <div className="medical-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Doctor Availability</h3>
        <Icon name="Clock" size={20} className="text-primary" />
      </div>
      <div className="space-y-4">
        {availabilityData?.shifts?.map((shift) => (
          <div key={shift?.id} className="p-4 bg-clinical-gray rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-foreground">{shift?.name}</p>
                <p className="text-xs text-muted-foreground">{shift?.time}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${getAvailabilityColor(shift?.availability)}`}>
                  {shift?.availability}%
                </p>
                <p className="text-xs text-muted-foreground">
                  {shift?.available}/{shift?.total} doctors
                </p>
              </div>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getAvailabilityBg(shift?.availability)}`}
                style={{ width: `${shift?.availability}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Overall Availability</span>
          <span className={`font-semibold ${getAvailabilityColor(availabilityData?.overall)}`}>
            {availabilityData?.overall}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityWidget;