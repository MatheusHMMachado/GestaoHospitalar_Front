import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MockCredentialsHelper = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mockUsers = [
    {
      role: 'Administrator',
      email: 'admin@hospitalcare.com',
      password: 'admin123',
      description: 'Full system access and management'
    },
    {
      role: 'Doctor',
      email: 'doctor@hospitalcare.com',
      password: 'doctor123',
      description: 'Patient records and medical data'
    },
    {
      role: 'Nurse',
      email: 'nurse@hospitalcare.com',
      password: 'nurse123',
      description: 'Patient care and monitoring'
    },
    {
      role: 'Receptionist',
      email: 'reception@hospitalcare.com',
      password: 'reception123',
      description: 'Appointments and front desk'
    }
  ];

  const copyCredentials = (email, password) => {
    navigator.clipboard?.writeText(`${email}\n${password}`);
  };

  return (
    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={16} className="text-blue-600" />
          <span className="text-sm font-medium text-blue-800">
            Demo Credentials Available
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          iconPosition="right"
        >
          {isExpanded ? 'Hide' : 'Show'}
        </Button>
      </div>
      {isExpanded && (
        <div className="mt-4 space-y-3">
          <p className="text-xs text-blue-700 mb-3">
            Use these test credentials to explore different user roles:
          </p>
          
          {mockUsers?.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-white border border-blue-100 rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-blue-900">
                    {user?.role}
                  </span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {user?.email}
                  </span>
                </div>
                <p className="text-xs text-blue-600">{user?.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Password: <code className="bg-slate-100 px-1 rounded">{user?.password}</code>
                </p>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyCredentials(user?.email, user?.password)}
                iconName="Copy"
                title="Copy credentials"
              >
              </Button>
            </div>
          ))}
          
          <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-700">
            <Icon name="AlertTriangle" size={12} className="inline mr-1" />
            These are demo credentials for testing purposes only.
          </div>
        </div>
      )}
    </div>
  );
};

export default MockCredentialsHelper;