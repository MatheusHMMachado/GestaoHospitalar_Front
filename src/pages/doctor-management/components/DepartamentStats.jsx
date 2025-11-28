import React from 'react';
import Icon from '../../../components/AppIcon';

const DepartmentStats = ({ departments }) => {
  return (
    <div className="medical-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Department Overview</h3>
        <Icon name="Building2" size={20} className="text-primary" />
      </div>
      <div className="space-y-4">
        {departments?.map((dept) => (
          <div key={dept?.id} className="flex items-center justify-between p-4 bg-clinical-gray rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${
                dept?.status === 'Fully Staffed' ? 'bg-success-green' :
                dept?.status === 'Understaffed' ? 'bg-caution-amber' : 'bg-alert-red'
              }`}></div>
              <div>
                <p className="text-sm font-medium text-foreground">{dept?.name}</p>
                <p className="text-xs text-muted-foreground">{dept?.status}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">{dept?.doctorCount}</p>
              <p className="text-xs text-muted-foreground">doctors</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {departments?.reduce((sum, dept) => sum + dept?.doctorCount, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Total Doctors</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success-green">
              {departments?.filter(dept => dept?.status === 'Fully Staffed')?.length}
            </p>
            <p className="text-xs text-muted-foreground">Fully Staffed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentStats;