import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = ({ userRole = "administrator" }) => {
  const navigate = useNavigate();

  const getActionsForRole = (role) => {
    const actions = {
      administrator: [
        {
          label: "Add New Patient",
          icon: "UserPlus",
          variant: "default",
          action: () => navigate('/patient-management')
        },
        {
          label: "Schedule Appointment",
          icon: "Calendar",
          variant: "outline",
          action: () => navigate('/appointment-scheduling')
        },
        {
          label: "Manage Doctors",
          icon: "UserCheck",
          variant: "outline",
          action: () => navigate('/doctor-management')
        },
        {
          label: "Generate Report",
          icon: "FileText",
          variant: "secondary",
          action: () => console.log('Generate report')
        }
      ],
      doctor: [
        {
          label: "View My Patients",
          icon: "Users",
          variant: "default",
          action: () => navigate('/patient-management')
        },
        {
          label: "My Schedule",
          icon: "Calendar",
          variant: "outline",
          action: () => navigate('/appointment-scheduling')
        },
        {
          label: "Add Medical Record",
          icon: "FileText",
          variant: "outline",
          action: () => console.log('Add medical record')
        }
      ],
      nurse: [
        {
          label: "Patient Care List",
          icon: "Heart",
          variant: "default",
          action: () => navigate('/patient-management')
        },
        {
          label: "Update Patient Status",
          icon: "Edit",
          variant: "outline",
          action: () => console.log('Update patient status')
        },
        {
          label: "View Schedules",
          icon: "Calendar",
          variant: "outline",
          action: () => navigate('/appointment-scheduling')
        }
      ],
      receptionist: [
        {
          label: "Register Patient",
          icon: "UserPlus",
          variant: "default",
          action: () => navigate('/patient-management')
        },
        {
          label: "Book Appointment",
          icon: "Calendar",
          variant: "outline",
          action: () => navigate('/appointment-scheduling')
        },
        {
          label: "Check-in Patient",
          icon: "CheckCircle",
          variant: "outline",
          action: () => console.log('Check-in patient')
        }
      ]
    };
    
    return actions?.[role] || actions?.administrator;
  };

  const actions = getActionsForRole(userRole);

  return (
    <div className="medical-card p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h2>
      <div className="space-y-3">
        {actions?.map((action, index) => (
          <Button
            key={index}
            variant={action?.variant}
            iconName={action?.icon}
            iconPosition="left"
            fullWidth
            onClick={action?.action}
            className="justify-start"
          >
            {action?.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;