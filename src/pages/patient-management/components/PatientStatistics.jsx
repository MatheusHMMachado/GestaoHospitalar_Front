import React from 'react';
import Icon from '../../../components/AppIcon';

const PatientStatistics = ({ patients }) => {
  const totalPatients = patients?.length;
  const activePatients = patients?.filter(p => p?.status === 'Active')?.length;
  const admittedPatients = patients?.filter(p => p?.status === 'Admitted')?.length;
  const criticalPatients = patients?.filter(p => p?.status === 'Critical')?.length;
  const dischargedPatients = patients?.filter(p => p?.status === 'Discharged')?.length;

  const todayRegistrations = patients?.filter(p => {
    const today = new Date()?.toLocaleDateString();
    return p?.registrationDate === today;
  })?.length;

  const stats = [
    {
      title: 'Total Patients',
      value: totalPatients,
      icon: 'Users',
      color: 'text-medical-blue',
      bgColor: 'bg-medical-blue/10',
      borderColor: 'border-medical-blue/20'
    },
    {
      title: 'Active Patients',
      value: activePatients,
      icon: 'UserCheck',
      color: 'text-success-green',
      bgColor: 'bg-success-green/10',
      borderColor: 'border-success-green/20'
    },
    {
      title: 'Admitted Today',
      value: admittedPatients,
      icon: 'Bed',
      color: 'text-caution-amber',
      bgColor: 'bg-caution-amber/10',
      borderColor: 'border-caution-amber/20'
    },
    {
      title: 'Critical Cases',
      value: criticalPatients,
      icon: 'AlertTriangle',
      color: 'text-alert-red',
      bgColor: 'bg-alert-red/10',
      borderColor: 'border-alert-red/20'
    }
  ];

  const recentRegistrations = patients?.filter(p => p?.registrationDate)?.sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))?.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats?.map((stat, index) => (
          <div
            key={index}
            className={`bg-card border ${stat?.borderColor} rounded-lg p-4 ${stat?.bgColor}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat?.title}</p>
                <p className={`text-2xl font-bold ${stat?.color}`}>{stat?.value}</p>
              </div>
              <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${stat?.bgColor}`}>
                <Icon name={stat?.icon} size={24} className={stat?.color} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Recent Registrations */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Registrations</h3>
          <Icon name="Clock" size={20} className="text-muted-foreground" />
        </div>
        
        {recentRegistrations?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Users" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No recent registrations</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentRegistrations?.map((patient) => (
              <div
                key={patient?.id}
                className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
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
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button className="flex items-center space-x-3 p-3 text-left bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
            <Icon name="UserPlus" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Register New Patient</p>
              <p className="text-xs text-muted-foreground">Add a new patient to the system</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-3 text-left bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
            <Icon name="Calendar" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Schedule Appointment</p>
              <p className="text-xs text-muted-foreground">Book appointment for patient</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-3 text-left bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
            <Icon name="FileText" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Generate Report</p>
              <p className="text-xs text-muted-foreground">Export patient data report</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-3 text-left bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
            <Icon name="Search" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Advanced Search</p>
              <p className="text-xs text-muted-foreground">Find patients by criteria</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientStatistics;