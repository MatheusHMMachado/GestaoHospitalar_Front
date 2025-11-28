import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: "appointment",
      title: "New Appointment Scheduled",
      description: "Dr. Sarah Johnson - Patient: Michael Rodriguez",
      time: "2 minutes ago",
      icon: "Calendar",
      color: "text-medical-blue"
    },
    {
      id: 2,
      type: "patient",
      title: "Patient Registration Completed",
      description: "Emma Thompson - ID: PT-2024-1031",
      time: "15 minutes ago",
      icon: "UserPlus",
      color: "text-success-green"
    },
    {
      id: 3,
      type: "emergency",
      title: "Emergency Alert",
      description: "Room 302 - Immediate attention required",
      time: "1 hour ago",
      icon: "AlertTriangle",
      color: "text-alert-red"
    },
    {
      id: 4,
      type: "lab",
      title: "Lab Results Available",
      description: "Blood work completed for Patient ID: PT-2024-1029",
      time: "2 hours ago",
      icon: "FileText",
      color: "text-medical-blue"
    },
    {
      id: 5,
      type: "discharge",
      title: "Patient Discharge",
      description: "John Smith - Room 205 discharged successfully",
      time: "3 hours ago",
      icon: "CheckCircle",
      color: "text-success-green"
    }
  ];

  return (
    <div className="medical-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
        <button className="text-sm text-primary hover:text-primary/80 font-medium">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
            <div className={`p-2 rounded-full bg-muted ${activity?.color}`}>
              <Icon name={activity?.icon} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground">{activity?.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{activity?.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity?.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;