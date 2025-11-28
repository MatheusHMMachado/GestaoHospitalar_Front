import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DoctorProfileModal = ({ doctor, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !doctor) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'schedule', label: 'Schedule', icon: 'Calendar' },
    { id: 'patients', label: 'Patients', icon: 'Users' },
    { id: 'performance', label: 'Performance', icon: 'BarChart3' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="flex items-start space-x-6">
        <Image
          src={doctor?.avatar}
          alt={doctor?.avatarAlt}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-foreground">{doctor?.name}</h2>
          <p className="text-lg text-primary font-medium">{doctor?.specialization}</p>
          <p className="text-muted-foreground">{doctor?.department}</p>
          <div className="mt-3 flex items-center space-x-4">
            <span className={`status-indicator ${
              doctor?.status === 'Available' ? 'status-success' :
              doctor?.status === 'Busy' ? 'status-warning' : 'status-neutral'
            }`}>
              {doctor?.status}
            </span>
            <span className="text-sm text-muted-foreground">{doctor?.experience} years experience</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={16} className="text-muted-foreground" />
              <span className="text-sm">{doctor?.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={16} className="text-muted-foreground" />
              <span className="text-sm">{doctor?.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} className="text-muted-foreground" />
              <span className="text-sm">Room {doctor?.roomNumber || '302'}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Qualifications</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="GraduationCap" size={16} className="text-muted-foreground" />
              <span className="text-sm">MD, Harvard Medical School</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={16} className="text-muted-foreground" />
              <span className="text-sm">{doctor?.certifications} Board Certifications</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} className="text-muted-foreground" />
              <span className="text-sm">4.8/5.0 Patient Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Weekly Schedule</h3>
      <div className="grid grid-cols-1 gap-3">
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']?.map((day) => (
          <div key={day} className="flex items-center justify-between p-3 bg-clinical-gray rounded-lg">
            <span className="font-medium text-foreground">{day}</span>
            <span className="text-sm text-muted-foreground">8:00 AM - 6:00 PM</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPatients = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Assigned Patients</h3>
        <span className="text-sm text-muted-foreground">Current Load: {doctor?.patientLoad}%</span>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {[
          { name: 'John Smith', condition: 'Hypertension', lastVisit: '2 days ago' },
          { name: 'Sarah Johnson', condition: 'Diabetes Type 2', lastVisit: '1 week ago' },
          { name: 'Michael Brown', condition: 'Cardiac Monitoring', lastVisit: '3 days ago' }
        ]?.map((patient, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-clinical-gray rounded-lg">
            <div>
              <p className="font-medium text-foreground">{patient?.name}</p>
              <p className="text-sm text-muted-foreground">{patient?.condition}</p>
            </div>
            <span className="text-xs text-muted-foreground">{patient?.lastVisit}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Performance Metrics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-clinical-gray rounded-lg">
          <p className="text-2xl font-bold text-primary">98%</p>
          <p className="text-sm text-muted-foreground">Patient Satisfaction</p>
        </div>
        <div className="text-center p-4 bg-clinical-gray rounded-lg">
          <p className="text-2xl font-bold text-success-green">15min</p>
          <p className="text-sm text-muted-foreground">Avg. Consultation</p>
        </div>
        <div className="text-center p-4 bg-clinical-gray rounded-lg">
          <p className="text-2xl font-bold text-caution-amber">142</p>
          <p className="text-sm text-muted-foreground">Patients This Month</p>
        </div>
        <div className="text-center p-4 bg-clinical-gray rounded-lg">
          <p className="text-2xl font-bold text-alert-red">3</p>
          <p className="text-sm text-muted-foreground">Emergency Cases</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-clinical-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h1 className="text-xl font-semibold text-foreground">Doctor Profile</h1>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-medical-blue-light' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'schedule' && renderSchedule()}
          {activeTab === 'patients' && renderPatients()}
          {activeTab === 'performance' && renderPerformance()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="default" iconName="Edit" iconPosition="left">
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileModal;