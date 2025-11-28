import React from 'react';
import Input from '../../../components/ui/Input';

const PersonalInfoSection = ({ formData, errors, onChange }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        Personal Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          name="firstName"
          placeholder="Enter first name"
          value={formData?.firstName}
          onChange={onChange}
          error={errors?.firstName}
          required
        />
        
        <Input
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Enter last name"
          value={formData?.lastName}
          onChange={onChange}
          error={errors?.lastName}
          required
        />
        
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter email address"
          value={formData?.email}
          onChange={onChange}
          error={errors?.email}
          description="This will be used for login and notifications"
          required
        />
        
        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          placeholder="Enter phone number"
          value={formData?.phone}
          onChange={onChange}
          error={errors?.phone}
          required
        />
        
        <Input
          label="Employee ID"
          type="text"
          name="employeeId"
          placeholder="Enter employee ID"
          value={formData?.employeeId}
          onChange={onChange}
          error={errors?.employeeId}
          description="Unique identifier for hospital records"
          required
        />
        
        <Input
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
          value={formData?.dateOfBirth}
          onChange={onChange}
          error={errors?.dateOfBirth}
          required
        />
      </div>
    </div>
  );
};

export default PersonalInfoSection;