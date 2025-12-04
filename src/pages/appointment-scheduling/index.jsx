import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import AppointmentCalendar from './components/AppointmentCalendar';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';
import AppointmentHistory from '../appointment-history';
import DoctorSchedulePanel from './components/DoctorSchedulePanel';
import AppointmentDetailsModal from './components/AppointmentDetailsModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AppointmentScheduling = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [activeView, setActiveView] = useState('calendar'); // calendar, list, schedule

  // Mock appointments data
  const [appointments, setAppointments] = useState([
    {
      id: 'apt1',
      patientId: 'p1',
      patientName: 'John Smith',
      patientAge: 45,
      patientPhone: '(555) 123-4567',
      doctorId: 'd1',
      doctorName: 'James Anderson',
      doctorSpecialization: 'Cardiology',
      date: '2024-10-31',
      time: '09:30',
      duration: '30',
      type: 'consultation',
      priority: 'normal',
      status: 'confirmed',
      room: '302',
      notes: 'Follow-up consultation for chest pain. Patient reports improvement since last visit.',
      recurring: false,
      createdAt: '2024-10-28 14:30:00',
      updatedAt: '2024-10-30 09:15:00'
    },
    {
      id: 'apt2',
      patientId: 'p2',
      patientName: 'Sarah Johnson',
      patientAge: 32,
      patientPhone: '(555) 234-5678',
      doctorId: 'd2',
      doctorName: 'Maria Garcia',
      doctorSpecialization: 'Pediatrics',
      date: '2024-10-31',
      time: '14:00',
      duration: '45',
      type: 'checkup',
      priority: 'normal',
      status: 'scheduled',
      room: '105',
      notes: 'Annual physical examination and vaccination update.',
      recurring: true,
      recurringType: 'yearly',
      recurringEnd: '2027-10-31',
      createdAt: '2024-10-25 11:20:00',
      updatedAt: '2024-10-25 11:20:00'
    },
    {
      id: 'apt3',
      patientId: 'p3',
      patientName: 'Michael Brown',
      patientAge: 58,
      patientPhone: '(555) 345-6789',
      doctorId: 'd3',
      doctorName: 'David Lee',
      doctorSpecialization: 'Orthopedics',
      date: '2024-11-01',
      time: '10:30',
      duration: '60',
      type: 'surgery',
      priority: 'high',
      status: 'confirmed',
      room: 'OR-2',
      notes: 'Knee replacement surgery. Pre-operative instructions provided to patient.',
      recurring: false,
      createdAt: '2024-10-20 16:45:00',
      updatedAt: '2024-10-29 13:30:00'
    },
    {
      id: 'apt4',
      patientId: 'p4',
      patientName: 'Emily Davis',
      patientAge: 28,
      patientPhone: '(555) 456-7890',
      doctorId: 'd1',
      doctorName: 'James Anderson',
      doctorSpecialization: 'Cardiology',
      date: '2024-11-02',
      time: '15:30',
      duration: '30',
      type: 'follow-up',
      priority: 'normal',
      status: 'scheduled',
      room: '302',
      notes: 'Post-procedure follow-up. Check healing progress and discuss next steps.',
      recurring: false,
      createdAt: '2024-10-30 10:15:00',
      updatedAt: '2024-10-30 10:15:00'
    },
    {
      id: 'apt5',
      patientId: 'p5',
      patientName: 'Robert Wilson',
      patientAge: 67,
      patientPhone: '(555) 567-8901',
      doctorId: 'd4',
      doctorName: 'Lisa Chen',
      doctorSpecialization: 'Dermatology',
      date: '2024-10-30',
      time: '11:00',
      duration: '30',
      type: 'consultation',
      priority: 'urgent',
      status: 'completed',
      room: '208',
      notes: 'Skin lesion examination completed. Biopsy results pending.',
      recurring: false,
      createdAt: '2024-10-28 09:30:00',
      updatedAt: '2024-10-30 11:45:00'
    }
  ]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsModal(true);
  };

  const handleNewAppointment = () => {
    setEditingAppointment(null);
    setShowForm(true);
  };

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
    setShowForm(true);
  };

  const handleDeleteAppointment = (appointment) => {
    if (window.confirm(`Are you sure you want to delete the appointment for ${appointment?.patientName}?`)) {
      setAppointments(prev => prev?.filter(apt => apt?.id !== appointment?.id));
    }
  };

  const handleFormSubmit = (formData) => {
    if (editingAppointment) {
      // Update existing appointment
      setAppointments(prev => prev?.map(apt => 
        apt?.id === editingAppointment?.id 
          ? { 
              ...apt, 
              ...formData, 
              updatedAt: new Date()?.toLocaleString()
            }
          : apt
      ));
    } else {
      // Create new appointment
      const newAppointment = {
        ...formData,
        id: `apt${Date.now()}`,
        status: 'scheduled',
        createdAt: new Date()?.toLocaleString(),
        updatedAt: new Date()?.toLocaleString()
      };
      setAppointments(prev => [...prev, newAppointment]);
    }
    
    setShowForm(false);
    setEditingAppointment(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingAppointment(null);
  };

  const handleDoctorSelect = (doctorId) => {
    setSelectedDoctor(doctorId);
  };

  const handleViewDetailsClose = () => {
    setShowDetailsModal(false);
    setSelectedAppointment(null);
  };

  // Filter appointments for selected date (for calendar view)
  const selectedDateAppointments = appointments?.filter(apt => 
    new Date(apt.date)?.toDateString() === selectedDate?.toDateString()
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbTrail />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Appointment Scheduling
              </h1>
              <p className="text-muted-foreground">
                Manage appointments, view schedules, and optimize booking workflows
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              {/* View Toggle */}
              <div className="flex items-center bg-muted rounded-lg p-1">
                <button
                  onClick={() => setActiveView('calendar')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeView === 'calendar' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="Calendar" size={16} />
                  <span className="hidden sm:inline">Calendar</span>
                </button>
                <button
                  onClick={() => setActiveView('list')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeView === 'list' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="List" size={16} />
                  <span className="hidden sm:inline">List</span>
                </button>
                <button
                  onClick={() => setActiveView('schedule')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeView === 'schedule' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="Clock" size={16} />
                  <span className="hidden sm:inline">Schedule</span>
                </button>
              </div>
              
              <Button
                onClick={handleNewAppointment}
                iconName="Plus"
                iconPosition="left"
              >
                New Appointment
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Primary Content Area */}
            <div className="xl:col-span-2 space-y-8">
              {/* Calendar View */}
              {activeView === 'calendar' && (
                <AppointmentCalendar
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  appointments={appointments}
                  onAppointmentClick={handleAppointmentClick}
                />
              )}

              {/* List View */}
              {activeView === 'list' && (
                <AppointmentList
                  appointments={appointments}
                  onEdit={handleEditAppointment}
                  onDelete={handleDeleteAppointment}
                  onViewDetails={handleAppointmentClick}
                />
              )}

              {/* Schedule View */}
              {activeView === 'schedule' && (
                <DoctorSchedulePanel
                  selectedDoctor={selectedDoctor}
                  onDoctorSelect={handleDoctorSelect}
                />
              )}

              {/* Appointment Form */}
              {showForm && (
                <AppointmentForm
                  selectedDate={selectedDate}
                  editingAppointment={editingAppointment}
                  onSubmit={handleFormSubmit}
                  onCancel={handleFormCancel}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-card border border-border rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Today's Overview
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={16} className="text-primary" />
                      <span className="text-sm text-muted-foreground">Total Appointments</span>
                    </div>
                    <span className="text-lg font-semibold text-foreground">
                      {selectedDateAppointments?.length}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success" />
                      <span className="text-sm text-muted-foreground">Confirmed</span>
                    </div>
                    <span className="text-lg font-semibold text-foreground">
                      {selectedDateAppointments?.filter(apt => apt?.status === 'confirmed')?.length}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={16} className="text-warning" />
                      <span className="text-sm text-muted-foreground">Pending</span>
                    </div>
                    <span className="text-lg font-semibold text-foreground">
                      {selectedDateAppointments?.filter(apt => apt?.status === 'scheduled')?.length}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertTriangle" size={16} className="text-error" />
                      <span className="text-sm text-muted-foreground">Urgent</span>
                    </div>
                    <span className="text-lg font-semibold text-foreground">
                      {selectedDateAppointments?.filter(apt => apt?.priority === 'urgent')?.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Doctor Schedule Panel (when not in schedule view) */}
              {activeView !== 'schedule' && (
                <DoctorSchedulePanel
                  selectedDoctor={selectedDoctor}
                  onDoctorSelect={handleDoctorSelect}
                />
              )}

              {/* Recent Activity */}
              <div className="bg-card border border-border rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Recent Activity
                </h3>
                
                <div className="space-y-3">
                  {appointments?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))?.slice(0, 5)?.map((appointment) => (
                      <div key={appointment?.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground">
                            <span className="font-medium">{appointment?.patientName}</span>
                            {' '}appointment {appointment?.status}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(appointment.updatedAt)?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Appointment Details Modal */}
      <AppointmentDetailsModal
        appointment={selectedAppointment}
        isOpen={showDetailsModal}
        onClose={handleViewDetailsClose}
        onEdit={handleEditAppointment}
        onDelete={handleDeleteAppointment}
      />
    </div>
  );
};

export default AppointmentScheduling;