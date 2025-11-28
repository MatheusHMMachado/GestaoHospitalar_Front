import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PatientDetailModal = ({ patient, isOpen, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState(patient || {});

  if (!isOpen || !patient) return null;

  const handleEdit = () => {
    setIsEditing(true);
    setEditedPatient({ ...patient });
  };

  const handleSave = () => {
    onSave(editedPatient);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedPatient({ ...patient });
  };

  const handleInputChange = (field, value) => {
    setEditedPatient(prev => ({ ...prev, [field]: value }));
  };

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ];

  const bloodTypeOptions = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' }
  ];

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Discharged', label: 'Discharged' },
    { value: 'Admitted', label: 'Admitted' },
    { value: 'Critical', label: 'Critical' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-lg shadow-medical-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-lg font-semibold text-primary">
                {patient?.name?.split(' ')?.map(n => n?.[0])?.join('')}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{patient?.name}</h2>
              <p className="text-sm text-muted-foreground">Patient ID: {patient?.patientId}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <Button
                variant="outline"
                size="sm"
                iconName="Edit"
                onClick={handleEdit}
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Save"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClose}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Personal Information */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={isEditing ? editedPatient?.name : patient?.name}
                    onChange={(e) => handleInputChange('name', e?.target?.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Age"
                    type="number"
                    value={isEditing ? editedPatient?.age : patient?.age}
                    onChange={(e) => handleInputChange('age', e?.target?.value)}
                    disabled={!isEditing}
                  />
                  <Select
                    label="Gender"
                    options={genderOptions}
                    value={isEditing ? editedPatient?.gender : patient?.gender}
                    onChange={(value) => handleInputChange('gender', value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Date of Birth"
                    type="date"
                    value={isEditing ? editedPatient?.dateOfBirth : patient?.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Phone Number"
                    value={isEditing ? editedPatient?.phone : patient?.phone}
                    onChange={(e) => handleInputChange('phone', e?.target?.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={isEditing ? editedPatient?.email : patient?.email}
                    onChange={(e) => handleInputChange('email', e?.target?.value)}
                    disabled={!isEditing}
                  />
                  <div className="md:col-span-2">
                    <Input
                      label="Address"
                      value={isEditing ? editedPatient?.address : patient?.address}
                      onChange={(e) => handleInputChange('address', e?.target?.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Medical Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Blood Type"
                    options={bloodTypeOptions}
                    value={isEditing ? editedPatient?.bloodType : patient?.bloodType}
                    onChange={(value) => handleInputChange('bloodType', value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Weight (kg)"
                    type="number"
                    value={isEditing ? editedPatient?.weight : patient?.weight}
                    onChange={(e) => handleInputChange('weight', e?.target?.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Height (cm)"
                    type="number"
                    value={isEditing ? editedPatient?.height : patient?.height}
                    onChange={(e) => handleInputChange('height', e?.target?.value)}
                    disabled={!isEditing}
                  />
                  <Select
                    label="Status"
                    options={statusOptions}
                    value={isEditing ? editedPatient?.status : patient?.status}
                    onChange={(value) => handleInputChange('status', value)}
                    disabled={!isEditing}
                  />
                  <div className="md:col-span-2">
                    <Input
                      label="Allergies"
                      value={isEditing ? editedPatient?.allergies : patient?.allergies}
                      onChange={(e) => handleInputChange('allergies', e?.target?.value)}
                      disabled={!isEditing}
                      placeholder="List any known allergies..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Input
                      label="Medical History"
                      value={isEditing ? editedPatient?.medicalHistory : patient?.medicalHistory}
                      onChange={(e) => handleInputChange('medicalHistory', e?.target?.value)}
                      disabled={!isEditing}
                      placeholder="Brief medical history..."
                    />
                  </div>
                </div>
              </div>

              {/* Insurance Information */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Insurance Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Insurance Provider"
                    value={isEditing ? editedPatient?.insuranceProvider : patient?.insuranceProvider}
                    onChange={(e) => handleInputChange('insuranceProvider', e?.target?.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Policy Number"
                    value={isEditing ? editedPatient?.policyNumber : patient?.policyNumber}
                    onChange={(e) => handleInputChange('policyNumber', e?.target?.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">Quick Stats</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Visits:</span>
                    <span className="text-sm font-medium text-foreground">{patient?.totalVisits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Visit:</span>
                    <span className="text-sm font-medium text-foreground">{patient?.lastVisit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Assigned Doctor:</span>
                    <span className="text-sm font-medium text-foreground">{patient?.assignedDoctor}</span>
                  </div>
                </div>
              </div>

              {/* Recent Appointments */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">Recent Appointments</h4>
                <div className="space-y-3">
                  {patient?.recentAppointments?.map((appointment, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 bg-card rounded border border-border">
                      <Icon name="Calendar" size={16} className="text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{appointment?.date}</p>
                        <p className="text-xs text-muted-foreground">{appointment?.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">Emergency Contact</h4>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">{patient?.emergencyContact?.name}</p>
                  <p className="text-xs text-muted-foreground">{patient?.emergencyContact?.relationship}</p>
                  <p className="text-xs text-muted-foreground">{patient?.emergencyContact?.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailModal;