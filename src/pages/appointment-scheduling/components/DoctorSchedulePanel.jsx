import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const DoctorSchedulePanel = ({ selectedDoctor, onDoctorSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date()?.toISOString()?.split('T')?.[0]);

  // Mock doctor data with schedules
  const doctors = [
  {
    id: 'd1',
    name: 'Dr. James Anderson',
    specialization: 'Cardiology',
    avatar: "https://images.unsplash.com/photo-1729162128021-f37dca3ff30d",
    avatarAlt: 'Professional headshot of middle-aged male doctor with gray hair in white coat',
    schedule: {
      monday: { start: '09:00', end: '17:00', break: '12:00-13:00' },
      tuesday: { start: '09:00', end: '17:00', break: '12:00-13:00' },
      wednesday: { start: '09:00', end: '17:00', break: '12:00-13:00' },
      thursday: { start: '09:00', end: '17:00', break: '12:00-13:00' },
      friday: { start: '09:00', end: '15:00', break: '12:00-13:00' },
      saturday: null,
      sunday: null
    },
    appointments: [
    { time: '09:30', patient: 'John Smith', type: 'consultation', duration: 30 },
    { time: '10:00', patient: 'Sarah Johnson', type: 'follow-up', duration: 30 },
    { time: '14:00', patient: 'Michael Brown', type: 'checkup', duration: 45 },
    { time: '15:30', patient: 'Emily Davis', type: 'consultation', duration: 30 }]

  },
  {
    id: 'd2',
    name: 'Dr. Maria Garcia',
    specialization: 'Pediatrics',
    avatar: "https://images.unsplash.com/photo-1690306816872-91063f6de36b",
    avatarAlt: 'Professional headshot of Hispanic female doctor with dark hair in medical scrubs',
    schedule: {
      monday: { start: '08:00', end: '16:00', break: '12:00-13:00' },
      tuesday: { start: '08:00', end: '16:00', break: '12:00-13:00' },
      wednesday: { start: '08:00', end: '16:00', break: '12:00-13:00' },
      thursday: { start: '08:00', end: '16:00', break: '12:00-13:00' },
      friday: { start: '08:00', end: '16:00', break: '12:00-13:00' },
      saturday: { start: '09:00', end: '13:00', break: null },
      sunday: null
    },
    appointments: [
    { time: '08:30', patient: 'Tommy Wilson', type: 'checkup', duration: 30 },
    { time: '09:00', patient: 'Lisa Chen', type: 'vaccination', duration: 15 },
    { time: '10:30', patient: 'David Martinez', type: 'consultation', duration: 45 }]

  },
  {
    id: 'd3',
    name: 'Dr. David Lee',
    specialization: 'Orthopedics',
    avatar: "https://images.unsplash.com/photo-1659353887488-b3c443982a57",
    avatarAlt: 'Professional headshot of Asian male doctor with black hair in white medical coat',
    schedule: {
      monday: { start: '10:00', end: '18:00', break: '13:00-14:00' },
      tuesday: { start: '10:00', end: '18:00', break: '13:00-14:00' },
      wednesday: { start: '10:00', end: '18:00', break: '13:00-14:00' },
      thursday: null,
      friday: { start: '10:00', end: '18:00', break: '13:00-14:00' },
      saturday: null,
      sunday: null
    },
    appointments: [
    { time: '10:30', patient: 'Robert Johnson', type: 'surgery-consult', duration: 60 },
    { time: '14:30', patient: 'Anna Thompson', type: 'follow-up', duration: 30 },
    { time: '16:00', patient: 'Mark Davis', type: 'consultation', duration: 45 }]

  }];


  const doctorOptions = doctors?.map((doctor) => ({
    value: doctor?.id,
    label: doctor?.name,
    description: doctor?.specialization
  }));

  const selectedDoctorData = doctors?.find((d) => d?.id === selectedDoctor);

  const getDayName = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', { weekday: 'long' })?.toLowerCase();
  };

  const generateTimeSlots = (start, end, breakTime) => {
    const slots = [];
    const startTime = new Date(`2000-01-01 ${start}`);
    const endTime = new Date(`2000-01-01 ${end}`);

    let current = new Date(startTime);

    while (current < endTime) {
      const timeStr = current?.toTimeString()?.slice(0, 5);

      // Check if this time is during break
      let isBreak = false;
      if (breakTime) {
        const [breakStart, breakEnd] = breakTime?.split('-');
        const breakStartTime = new Date(`2000-01-01 ${breakStart}`);
        const breakEndTime = new Date(`2000-01-01 ${breakEnd}`);
        isBreak = current >= breakStartTime && current < breakEndTime;
      }

      slots?.push({
        time: timeStr,
        isBreak,
        isBooked: selectedDoctorData?.appointments?.some((apt) => apt?.time === timeStr)
      });

      current?.setMinutes(current?.getMinutes() + 30);
    }

    return slots;
  };

  const getAvailabilityStatus = () => {
    if (!selectedDoctorData) return null;

    const dayName = getDayName(selectedDate);
    const daySchedule = selectedDoctorData?.schedule?.[dayName];

    if (!daySchedule) {
      return { status: 'unavailable', message: 'Doctor not available on this day' };
    }

    const totalSlots = generateTimeSlots(daySchedule?.start, daySchedule?.end, daySchedule?.break);
    const availableSlots = totalSlots?.filter((slot) => !slot?.isBreak && !slot?.isBooked);

    return {
      status: availableSlots?.length > 0 ? 'available' : 'fully-booked',
      totalSlots: totalSlots?.length,
      availableSlots: availableSlots?.length,
      bookedSlots: totalSlots?.filter((slot) => slot?.isBooked)?.length
    };
  };

  const availability = getAvailabilityStatus();

  return (
    <div className="bg-card border border-border rounded-lg shadow-md">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Doctor Schedule</h3>
        
        {/* Doctor Selection */}
        <Select
          label="Select Doctor"
          placeholder="Choose a doctor to view schedule"
          options={doctorOptions}
          value={selectedDoctor}
          onChange={onDoctorSelect}
          searchable />

        
        {/* Date Selection */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-foreground mb-2">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e?.target?.value)}
            min={new Date()?.toISOString()?.split('T')?.[0]}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />

        </div>
      </div>
      {/* Doctor Info & Schedule */}
      {selectedDoctorData &&
      <div className="p-4">
          {/* Doctor Profile */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
              <img
              src={selectedDoctorData?.avatar}
              alt={selectedDoctorData?.avatarAlt}
              className="w-full h-full object-cover" />

            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground">
                {selectedDoctorData?.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                {selectedDoctorData?.specialization}
              </p>
            </div>
          </div>

          {/* Availability Status */}
          {availability &&
        <div className="mb-6">
              <div className={`p-3 rounded-lg border ${
          availability?.status === 'available' ? 'bg-green-50 border-green-200 text-green-800' :
          availability?.status === 'fully-booked' ? 'bg-orange-50 border-orange-200 text-orange-800' : 'bg-red-50 border-red-200 text-red-800'}`
          }>
                <div className="flex items-center space-x-2 mb-2">
                  <Icon
                name={
                availability?.status === 'available' ? 'CheckCircle' :
                availability?.status === 'fully-booked' ? 'Clock' : 'XCircle'
                }
                size={16} />

                  <span className="font-medium">
                    {availability?.status === 'available' && 'Available'}
                    {availability?.status === 'fully-booked' && 'Fully Booked'}
                    {availability?.status === 'unavailable' && 'Not Available'}
                  </span>
                </div>
                <p className="text-sm">
                  {availability?.message ||
              `${availability?.availableSlots} of ${availability?.totalSlots} slots available`
              }
                </p>
              </div>
            </div>
        }

          {/* Time Slots */}
          {selectedDoctorData?.schedule?.[getDayName(selectedDate)] &&
        <div>
              <h5 className="text-sm font-medium text-foreground mb-3">
                Available Time Slots
              </h5>
              
              <div className="grid grid-cols-3 gap-2">
                {generateTimeSlots(
              selectedDoctorData?.schedule?.[getDayName(selectedDate)]?.start,
              selectedDoctorData?.schedule?.[getDayName(selectedDate)]?.end,
              selectedDoctorData?.schedule?.[getDayName(selectedDate)]?.break
            )?.map((slot, index) =>
            <div
              key={index}
              className={`p-2 text-center text-xs rounded border ${
              slot?.isBreak ?
              'bg-gray-100 text-gray-500 border-gray-200' :
              slot?.isBooked ?
              'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-700 border-green-200 cursor-pointer hover:bg-green-200'}`
              }>

                    {slot?.time}
                    {slot?.isBreak && <div className="text-xs">Break</div>}
                    {slot?.isBooked && <div className="text-xs">Booked</div>}
                  </div>
            )}
              </div>
            </div>
        }

          {/* Today's Appointments */}
          {selectedDoctorData?.appointments?.length > 0 &&
        <div className="mt-6">
              <h5 className="text-sm font-medium text-foreground mb-3">
                Today's Appointments
              </h5>
              
              <div className="space-y-2">
                {selectedDoctorData?.appointments?.map((appointment, index) =>
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-muted rounded-lg">

                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-foreground">
                        {appointment?.time}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {appointment?.patient}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground capitalize">
                        {appointment?.type}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {appointment?.duration}min
                      </span>
                    </div>
                  </div>
            )}
              </div>
            </div>
        }
        </div>
      }
    </div>);

};

export default DoctorSchedulePanel;