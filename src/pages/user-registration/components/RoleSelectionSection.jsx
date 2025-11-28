import React from 'react';
import Icon from '../../../components/AppIcon';

const RolePreviewPanel = ({ selectedRole }) => {
  const rolePermissions = {
    administrator: {
      title: 'Administrator Access',
      description: 'Complete system control and management capabilities',
      permissions: [
        { icon: 'Users', text: 'Manage all user accounts and roles' },
        { icon: 'Settings', text: 'System configuration and settings' },
        { icon: 'BarChart3', text: 'Access to all reports and analytics' },
        { icon: 'Database', text: 'Database management and backups' },
        { icon: 'Shield', text: 'Security and audit trail management' },
        { icon: 'Building', text: 'Hospital-wide operational oversight' }
      ],
      restrictions: []
    },
    doctor: {
      title: 'Doctor Access',
      description: 'Medical practice and patient care management',
      permissions: [
        { icon: 'Users', text: 'View and manage assigned patients' },
        { icon: 'Calendar', text: 'Manage appointment schedules' },
        { icon: 'FileText', text: 'Create and update medical records' },
        { icon: 'Activity', text: 'Order and review lab tests' },
        { icon: 'Pill', text: 'Prescribe medications' },
        { icon: 'Upload', text: 'Upload medical reports and images' }
      ],
      restrictions: [
        { icon: 'X', text: 'Cannot access other doctors\' patients without permission' },
        { icon: 'X', text: 'Limited administrative functions' }
      ]
    },
    nurse: {
      title: 'Nurse Access',
      description: 'Patient care coordination and monitoring',
      permissions: [
        { icon: 'Users', text: 'View assigned patient information' },
        { icon: 'Activity', text: 'Record vital signs and observations' },
        { icon: 'Calendar', text: 'View appointment schedules' },
        { icon: 'FileText', text: 'Update nursing notes and care plans' },
        { icon: 'Bell', text: 'Manage patient alerts and notifications' },
        { icon: 'Clipboard', text: 'Medication administration tracking' }
      ],
      restrictions: [
        { icon: 'X', text: 'Cannot modify medical diagnoses' },
        { icon: 'X', text: 'Limited prescription access' },
        { icon: 'X', text: 'Cannot delete medical records' }
      ]
    },
    receptionist: {
      title: 'Receptionist Access',
      description: 'Patient registration and appointment management',
      permissions: [
        { icon: 'UserPlus', text: 'Register new patients' },
        { icon: 'Calendar', text: 'Schedule and manage appointments' },
        { icon: 'Phone', text: 'Handle patient inquiries' },
        { icon: 'CreditCard', text: 'Process payments and billing' },
        { icon: 'FileText', text: 'Generate appointment reports' },
        { icon: 'Search', text: 'Search patient records (basic info)' }
      ],
      restrictions: [
        { icon: 'X', text: 'Cannot access medical records or diagnoses' },
        { icon: 'X', text: 'Cannot modify patient medical information' },
        { icon: 'X', text: 'Limited to front-desk operations' }
      ]
    }
  };

  const currentRole = rolePermissions?.[selectedRole];

  if (!currentRole) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center py-8">
          <Icon name="UserCheck" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Role Preview</h3>
          <p className="text-muted-foreground">
            Select a role to preview access permissions and restrictions
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">{currentRole?.title}</h3>
        <p className="text-sm text-muted-foreground">{currentRole?.description}</p>
      </div>
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
            <Icon name="Check" size={16} className="text-green-600 mr-2" />
            Permissions Granted
          </h4>
          <div className="space-y-2">
            {currentRole?.permissions?.map((permission, index) => (
              <div key={index} className="flex items-center space-x-3 text-sm">
                <Icon name={permission?.icon} size={14} className="text-green-600" />
                <span className="text-foreground">{permission?.text}</span>
              </div>
            ))}
          </div>
        </div>

        {currentRole?.restrictions?.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
              <Icon name="AlertTriangle" size={16} className="text-amber-600 mr-2" />
              Access Restrictions
            </h4>
            <div className="space-y-2">
              {currentRole?.restrictions?.map((restriction, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm">
                  <Icon name={restriction?.icon} size={14} className="text-amber-600" />
                  <span className="text-muted-foreground">{restriction?.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">Security Note</p>
            <p className="text-xs text-blue-700 mt-1">
              All user activities are logged and monitored for security compliance. 
              Role permissions can be modified by administrators after account creation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolePreviewPanel;