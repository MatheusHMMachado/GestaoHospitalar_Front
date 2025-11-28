import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const AppointmentForm = ({ selectedDate, onSubmit, onCancel, editingAppointment = null }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    duration: '30',
    type: '',
    priority: 'normal',
    notes: '',
    recurring: false,
    recurringType: 'weekly',
    recurringEnd: ''
  });

  const [errors, setErrors] = useState({});
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);

  // Mock data
  const patients = [
    { value: 'p1', label: 'John Smith', description: 'ID: P001 - (555) 123-4567' },
    { value: 'p2', label: 'Sarah Johnson', description: 'ID: P002 - (555) 234-5678' },
    { value: 'p3', label: 'Michael Brown', description: 'ID: P003 - (555) 345-6789' },
    { value: 'p4', label: 'Emily Davis', description: 'ID: P004 - (555) 456-7890' },
    { value: 'p5', label: 'Robert Wilson', description: 'ID: P005 - (555) 567-8901' }
  ];

  const doctors = [
    { value: 'd1', label: 'Dr. James Anderson', description: 'Cardiology - Available Mon-Fri' },
    { value: 'd2', label: 'Dr. Maria Garcia', description: 'Pediatrics - Available Tue-Sat' },
    { value: 'd3', label: 'Dr. David Lee', description: 'Orthopedics - Available Mon-Wed, Fri' },
    { value: 'd4', label: 'Dr. Lisa Chen', description: 'Dermatology - Available Mon-Thu' },
    { value: 'd5', label: 'Dr. Mark Thompson', description: 'General Medicine - Available Daily' }
  ];

  const appointmentTypes = [
    { value: 'consultation', label: 'Consultation' },
    { value: 'checkup', label: 'Regular Check-up' },
    { value: 'follow-up', label: 'Follow-up Visit' },
    { value: 'surgery', label: 'Surgery' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'screening', label: 'Health Screening' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'normal', label: 'Normal Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const durationOptions = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' }
  ];

  const recurringOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  // Initialize form with selected date or editing appointment
  useEffect(() => {
    if (editingAppointment) {
      setFormData({
        ...editingAppointment,
        date: new Date(editingAppointment.date)?.toISOString()?.split('T')?.[0]
      });
    } else if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        date: selectedDate?.toISOString()?.split('T')?.[0]
      }));
    }
  }, [selectedDate, editingAppointment]);

  // Generate available time slots
  useEffect(() => {
    if (formData?.doctorId && formData?.date) {
      setIsCheckingAvailability(true);
      // Simulate API call to check availability
      setTimeout(() => {
        const times = [];
        for (let hour = 9; hour <= 17; hour++) {
          for (let minute = 0; minute < 60; minute += 30) {
            const timeStr = `${hour?.toString()?.padStart(2, '0')}:${minute?.toString()?.padStart(2, '0')}`;
            times?.push({ value: timeStr, label: timeStr });
          }
        }
        setAvailableTimes(times);
        setIsCheckingAvailability(false);
      }, 500);
    }
  }, [formData?.doctorId, formData?.date]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.patientId) newErrors.patientId = 'Please select a patient';
    if (!formData?.doctorId) newErrors.doctorId = 'Please select a doctor';
    if (!formData?.date) newErrors.date = 'Please select a date';
    if (!formData?.time) newErrors.time = 'Please select a time';
    if (!formData?.type) newErrors.type = 'Please select appointment type';
    if (formData?.recurring && !formData?.recurringEnd) {
      newErrors.recurringEnd = 'Please set recurring end date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-md">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">
          {editingAppointment ? 'Edit Appointment' : 'Schedule New Appointment'}
        </h3>
        <button
          onClick={onCancel}
          className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* Patient Selection */}
        <Select
          label="Patient"
          placeholder="Search and select patient"
          options={patients}
          value={formData?.patientId}
          onChange={(value) => handleInputChange('patientId', value)}
          error={errors?.patientId}
          searchable
          required
        />

        {/* Doctor Selection */}
        <Select
          label="Doctor"
          placeholder="Select doctor"
          options={doctors}
          value={formData?.doctorId}
          onChange={(value) => handleInputChange('doctorId', value)}
          error={errors?.doctorId}
          searchable
          required
        />

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Date"
            type="date"
            value={formData?.date}
            onChange={(e) => handleInputChange('date', e?.target?.value)}
            error={errors?.date}
            required
          />

          <Select
            label="Time"
            placeholder={isCheckingAvailability ? "Checking availability..." : "Select time"}
            options={availableTimes}
            value={formData?.time}
            onChange={(value) => handleInputChange('time', value)}
            error={errors?.time}
            disabled={isCheckingAvailability || !formData?.doctorId || !formData?.date}
            required
          />
        </div>

        {/* Appointment Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Appointment Type"
            placeholder="Select type"
            options={appointmentTypes}
            value={formData?.type}
            onChange={(value) => handleInputChange('type', value)}
            error={errors?.type}
            required
          />

          <Select
            label="Duration"
            options={durationOptions}
            value={formData?.duration}
            onChange={(value) => handleInputChange('duration', value)}
          />
        </div>

        {/* Priority */}
        <Select
          label="Priority"
          options={priorityOptions}
          value={formData?.priority}
          onChange={(value) => handleInputChange('priority', value)}
        />

        {/* Recurring Appointment */}
        <div className="space-y-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData?.recurring}
              onChange={(e) => handleInputChange('recurring', e?.target?.checked)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
            <span className="text-sm font-medium text-foreground">Recurring Appointment</span>
          </label>

          {formData?.recurring && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
              <Select
                label="Repeat"
                options={recurringOptions}
                value={formData?.recurringType}
                onChange={(value) => handleInputChange('recurringType', value)}
              />

              <Input
                label="End Date"
                type="date"
                value={formData?.recurringEnd}
                onChange={(e) => handleInputChange('recurringEnd', e?.target?.value)}
                error={errors?.recurringEnd}
              />
            </div>
          )}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Notes (Optional)
          </label>
          <textarea
            value={formData?.notes}
            onChange={(e) => handleInputChange('notes', e?.target?.value)}
            placeholder="Add any additional notes or special instructions..."
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            iconName="Calendar"
            iconPosition="left"
          >
            {editingAppointment ? 'Update Appointment' : 'Schedule Appointment'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;