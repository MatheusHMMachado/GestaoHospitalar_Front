import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PatientRegistrationModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    address: '',
    bloodType: '',
    weight: '',
    height: '',
    allergies: '',
    medicalHistory: '',
    insuranceProvider: '',
    policyNumber: '',
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: '',
    assignedDoctor: ''
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

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

  const doctorOptions = [
    { value: 'Dr. Sarah Johnson', label: 'Dr. Sarah Johnson - Cardiology' },
    { value: 'Dr. Michael Chen', label: 'Dr. Michael Chen - Neurology' },
    { value: 'Dr. Emily Rodriguez', label: 'Dr. Emily Rodriguez - Pediatrics' },
    { value: 'Dr. James Wilson', label: 'Dr. James Wilson - Orthopedics' },
    { value: 'Dr. Lisa Thompson', label: 'Dr. Lisa Thompson - Internal Medicine' }
  ];

  const relationshipOptions = [
    { value: 'Spouse', label: 'Spouse' },
    { value: 'Parent', label: 'Parent' },
    { value: 'Child', label: 'Child' },
    { value: 'Sibling', label: 'Sibling' },
    { value: 'Friend', label: 'Friend' },
    { value: 'Other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) newErrors.name = 'Name is required';
    if (!formData?.age) newErrors.age = 'Age is required';
    if (!formData?.gender) newErrors.gender = 'Gender is required';
    if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
    if (!formData?.email?.trim()) newErrors.email = 'Email is required';
    if (!formData?.assignedDoctor) newErrors.assignedDoctor = 'Assigned doctor is required';

    // Email validation
    if (formData?.email && !/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (basic)
    if (formData?.phone && !/^\d{10,}$/?.test(formData?.phone?.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Generate patient ID
      const patientId = `PAT${Date.now()?.toString()?.slice(-6)}`;
      
      const newPatient = {
        ...formData,
        id: Date.now(),
        patientId,
        status: 'Active',
        lastVisit: new Date()?.toLocaleDateString(),
        totalVisits: 0,
        emergencyContact: {
          name: formData?.emergencyContactName,
          relationship: formData?.emergencyContactRelationship,
          phone: formData?.emergencyContactPhone
        },
        recentAppointments: []
      };

      onSave(newPatient);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      age: '',
      gender: '',
      dateOfBirth: '',
      phone: '',
      email: '',
      address: '',
      bloodType: '',
      weight: '',
      height: '',
      allergies: '',
      medicalHistory: '',
      insuranceProvider: '',
      policyNumber: '',
      emergencyContactName: '',
      emergencyContactRelationship: '',
      emergencyContactPhone: '',
      assignedDoctor: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-lg shadow-medical-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="UserPlus" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Register New Patient</h2>
              <p className="text-sm text-muted-foreground">Enter patient information to create a new record</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={handleClose}
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  required
                  value={formData?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                  error={errors?.name}
                  placeholder="Enter full name"
                />
                <Input
                  label="Age"
                  type="number"
                  required
                  value={formData?.age}
                  onChange={(e) => handleInputChange('age', e?.target?.value)}
                  error={errors?.age}
                  placeholder="Enter age"
                />
                <Select
                  label="Gender"
                  required
                  options={genderOptions}
                  value={formData?.gender}
                  onChange={(value) => handleInputChange('gender', value)}
                  error={errors?.gender}
                  placeholder="Select gender"
                />
                <Input
                  label="Date of Birth"
                  type="date"
                  value={formData?.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
                />
                <Input
                  label="Phone Number"
                  required
                  value={formData?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                  error={errors?.phone}
                  placeholder="Enter phone number"
                />
                <Input
                  label="Email Address"
                  type="email"
                  required
                  value={formData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                  error={errors?.email}
                  placeholder="Enter email address"
                />
                <div className="md:col-span-2">
                  <Input
                    label="Address"
                    value={formData?.address}
                    onChange={(e) => handleInputChange('address', e?.target?.value)}
                    placeholder="Enter full address"
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
                  value={formData?.bloodType}
                  onChange={(value) => handleInputChange('bloodType', value)}
                  placeholder="Select blood type"
                />
                <Input
                  label="Weight (kg)"
                  type="number"
                  value={formData?.weight}
                  onChange={(e) => handleInputChange('weight', e?.target?.value)}
                  placeholder="Enter weight"
                />
                <Input
                  label="Height (cm)"
                  type="number"
                  value={formData?.height}
                  onChange={(e) => handleInputChange('height', e?.target?.value)}
                  placeholder="Enter height"
                />
                <Select
                  label="Assigned Doctor"
                  required
                  options={doctorOptions}
                  value={formData?.assignedDoctor}
                  onChange={(value) => handleInputChange('assignedDoctor', value)}
                  error={errors?.assignedDoctor}
                  placeholder="Select assigned doctor"
                />
                <div className="md:col-span-2">
                  <Input
                    label="Allergies"
                    value={formData?.allergies}
                    onChange={(e) => handleInputChange('allergies', e?.target?.value)}
                    placeholder="List any known allergies (separate with commas)"
                  />
                </div>
                <div className="md:col-span-2">
                  <Input
                    label="Medical History"
                    value={formData?.medicalHistory}
                    onChange={(e) => handleInputChange('medicalHistory', e?.target?.value)}
                    placeholder="Brief medical history and current conditions"
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
                  value={formData?.insuranceProvider}
                  onChange={(e) => handleInputChange('insuranceProvider', e?.target?.value)}
                  placeholder="Enter insurance provider name"
                />
                <Input
                  label="Policy Number"
                  value={formData?.policyNumber}
                  onChange={(e) => handleInputChange('policyNumber', e?.target?.value)}
                  placeholder="Enter policy number"
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Contact Name"
                  value={formData?.emergencyContactName}
                  onChange={(e) => handleInputChange('emergencyContactName', e?.target?.value)}
                  placeholder="Enter contact name"
                />
                <Select
                  label="Relationship"
                  options={relationshipOptions}
                  value={formData?.emergencyContactRelationship}
                  onChange={(value) => handleInputChange('emergencyContactRelationship', value)}
                  placeholder="Select relationship"
                />
                <Input
                  label="Contact Phone"
                  value={formData?.emergencyContactPhone}
                  onChange={(e) => handleInputChange('emergencyContactPhone', e?.target?.value)}
                  placeholder="Enter contact phone"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/30">
          <Button
            variant="outline"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            iconName="Save"
            onClick={handleSave}
          >
            Register Patient
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistrationModal;