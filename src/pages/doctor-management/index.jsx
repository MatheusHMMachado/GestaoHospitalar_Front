import React, { useState, useMemo } from 'react';
import Header from '../../components/ui/Header';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import DoctorCard from './components/DoctorCard';
import DoctorTable from './components/DoctorTable';
import DepartmentStats from './components/DepartamentStats';
import AvailabilityWidget from './components/AvailabilityWidget';
import ScheduleConflicts from './components/ScheduleConflicts';
import DoctorProfileModal from './components/DoctorProfileModal';

const DoctorManagement = () => {
  const [viewMode, setViewMode] = useState('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Mock data for doctors
  const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Cardiology",
    department: "Cardiology",
    status: "Available",
    patientLoad: 75,
    phone: "(555) 123-4567",
    email: "sarah.johnson@hospitalcare.com",
    experience: 12,
    certifications: 3,
    avatar: "https://images.unsplash.com/photo-1592041828835-4216e6af4a78",
    avatarAlt: "Professional headshot of Dr. Sarah Johnson, middle-aged woman with brown hair in white medical coat"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Neurology",
    department: "Neurology",
    status: "Busy",
    patientLoad: 90,
    phone: "(555) 234-5678",
    email: "michael.chen@hospitalcare.com",
    experience: 15,
    certifications: 4,
    avatar: "https://images.unsplash.com/photo-1620928269189-dc4ee9d981c0",
    avatarAlt: "Professional headshot of Dr. Michael Chen, Asian man with glasses in white medical coat"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialization: "Pediatrics",
    department: "Pediatrics",
    status: "Available",
    patientLoad: 60,
    phone: "(555) 345-6789",
    email: "emily.rodriguez@hospitalcare.com",
    experience: 8,
    certifications: 2,
    avatar: "https://images.unsplash.com/photo-1734821375517-ca34fbe8089d",
    avatarAlt: "Professional headshot of Dr. Emily Rodriguez, Hispanic woman with dark hair in white medical coat"
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialization: "Orthopedics",
    department: "Orthopedics",
    status: "Off Duty",
    patientLoad: 45,
    phone: "(555) 456-7890",
    email: "james.wilson@hospitalcare.com",
    experience: 20,
    certifications: 5,
    avatar: "https://images.unsplash.com/photo-1729162128021-f37dca3ff30d",
    avatarAlt: "Professional headshot of Dr. James Wilson, middle-aged Caucasian man with gray hair in white medical coat"
  },
  {
    id: 5,
    name: "Dr. Aisha Patel",
    specialization: "Emergency Medicine",
    department: "Emergency",
    status: "Available",
    patientLoad: 85,
    phone: "(555) 567-8901",
    email: "aisha.patel@hospitalcare.com",
    experience: 10,
    certifications: 3,
    avatar: "https://images.unsplash.com/photo-1734821375517-ca34fbe8089d",
    avatarAlt: "Professional headshot of Dr. Aisha Patel, Indian woman with long black hair in white medical coat"
  },
  {
    id: 6,
    name: "Dr. Robert Thompson",
    specialization: "Radiology",
    department: "Radiology",
    status: "Busy",
    patientLoad: 70,
    phone: "(555) 678-9012",
    email: "robert.thompson@hospitalcare.com",
    experience: 18,
    certifications: 4,
    avatar: "https://images.unsplash.com/photo-1666887360313-43de76a966da",
    avatarAlt: "Professional headshot of Dr. Robert Thompson, older Caucasian man with white beard in white medical coat"
  }];


  // Mock data for departments
  const departments = [
  { id: 1, name: "Cardiology", doctorCount: 8, status: "Fully Staffed" },
  { id: 2, name: "Neurology", doctorCount: 6, status: "Understaffed" },
  { id: 3, name: "Pediatrics", doctorCount: 12, status: "Fully Staffed" },
  { id: 4, name: "Emergency", doctorCount: 15, status: "Fully Staffed" },
  { id: 5, name: "Orthopedics", doctorCount: 4, status: "Critical" },
  { id: 6, name: "Radiology", doctorCount: 7, status: "Fully Staffed" }];


  // Mock data for availability
  const availabilityData = {
    overall: 78,
    shifts: [
    { id: 1, name: "Morning Shift", time: "6:00 AM - 2:00 PM", availability: 85, available: 17, total: 20 },
    { id: 2, name: "Afternoon Shift", time: "2:00 PM - 10:00 PM", availability: 75, available: 15, total: 20 },
    { id: 3, name: "Night Shift", time: "10:00 PM - 6:00 AM", availability: 65, available: 13, total: 20 }]

  };

  // Mock data for schedule conflicts
  const scheduleConflicts = [
  {
    id: 1,
    doctor: "Dr. Michael Chen",
    department: "Neurology",
    priority: "High",
    description: "Double-booked appointments with overlapping surgery schedule",
    time: "2:00 PM - 4:00 PM",
    date: "Today",
    affectedPatients: 3,
    suggestion: "Reschedule non-urgent appointments to tomorrow"
  },
  {
    id: 2,
    doctor: "Dr. Sarah Johnson",
    department: "Cardiology",
    priority: "Medium",
    description: "Requested time-off conflicts with scheduled procedures",
    time: "10:00 AM - 12:00 PM",
    date: "Nov 2, 2025",
    affectedPatients: 2,
    suggestion: "Find coverage or reschedule procedures"
  }];


  // Department filter options
  const departmentOptions = [
  { value: '', label: 'All Departments' },
  ...departments?.map((dept) => ({ value: dept?.name, label: dept?.name }))];


  // Filter and sort doctors
  const filteredAndSortedDoctors = useMemo(() => {
    let filtered = doctors?.filter((doctor) => {
      const matchesSearch = doctor?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      doctor?.specialization?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      doctor?.department?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesDepartment = !selectedDepartment || doctor?.department === selectedDepartment;
      return matchesSearch && matchesDepartment;
    });

    return filtered?.sort((a, b) => {
      let aValue = a?.[sortField];
      let bValue = b?.[sortField];

      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [doctors, searchTerm, selectedDepartment, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleViewProfile = (doctor) => {
    setSelectedDoctor(doctor);
    setIsProfileModalOpen(true);
  };

  const handleEditSchedule = (doctor) => {
    console.log('Edit schedule for:', doctor?.name);
    // In real app, this would open schedule management modal
  };

  const handleResolveConflict = (conflictId) => {
    console.log('Resolve conflict:', conflictId);
    // In real app, this would handle conflict resolution
  };

  const handleAddDoctor = () => {
    console.log('Add new doctor');
    // In real app, this would open add doctor modal
  };

  const handleImportData = () => {
    console.log('Import staff data');
    // In real app, this would handle data import
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <BreadcrumbTrail />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Doctor Management</h1>
              <p className="text-muted-foreground">
                Manage medical staff, schedules, and department assignments
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                iconName="Upload"
                iconPosition="left"
                onClick={handleImportData}>

                Import Data
              </Button>
              <Button
                variant="default"
                iconName="UserPlus"
                iconPosition="left"
                onClick={handleAddDoctor}>

                Add Doctor
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="xl:col-span-3 space-y-6">
              {/* Search and Filters */}
              <div className="medical-card p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                  <div className="flex-1 max-w-md">
                    <Input
                      type="search"
                      placeholder="Search doctors by name, specialization, or department..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e?.target?.value)}
                      className="w-full" />

                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Select
                      options={departmentOptions}
                      value={selectedDepartment}
                      onChange={setSelectedDepartment}
                      placeholder="Filter by department"
                      className="w-48" />

                    
                    <div className="flex items-center bg-clinical-gray rounded-lg p-1">
                      <button
                        onClick={() => setViewMode('table')}
                        className={`flex items-center justify-center w-8 h-8 rounded transition-colors ${
                        viewMode === 'table' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`
                        }>

                        <Icon name="Table" size={16} />
                      </button>
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`flex items-center justify-center w-8 h-8 rounded transition-colors ${
                        viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`
                        }>

                        <Icon name="Grid3X3" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Summary */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  Showing {filteredAndSortedDoctors?.length} of {doctors?.length} doctors
                  {selectedDepartment && ` in ${selectedDepartment}`}
                </span>
                <span>
                  {doctors?.filter((d) => d?.status === 'Available')?.length} available now
                </span>
              </div>

              {/* Doctor List */}
              {viewMode === 'table' ?
              <DoctorTable
                doctors={filteredAndSortedDoctors}
                onViewProfile={handleViewProfile}
                onEditSchedule={handleEditSchedule}
                onSort={handleSort}
                sortField={sortField}
                sortDirection={sortDirection} /> :


              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredAndSortedDoctors?.map((doctor) =>
                <DoctorCard
                  key={doctor?.id}
                  doctor={doctor}
                  onViewProfile={handleViewProfile}
                  onEditSchedule={handleEditSchedule} />

                )}
                </div>
              }

              {filteredAndSortedDoctors?.length === 0 &&
              <div className="medical-card p-12 text-center">
                  <Icon name="UserX" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No doctors found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or department filter
                  </p>
                  <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setSelectedDepartment('');
                }}>
                    Clear Filters
                  </Button>
                </div>
              }
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <DepartmentStats departments={departments} />
              <AvailabilityWidget availabilityData={availabilityData} />
              <ScheduleConflicts
                conflicts={scheduleConflicts}
                onResolveConflict={handleResolveConflict} />

            </div>
          </div>
        </div>
      </main>
      {/* Doctor Profile Modal */}
      <DoctorProfileModal
        doctor={selectedDoctor}
        isOpen={isProfileModalOpen}
        onClose={() => {
          setIsProfileModalOpen(false);
          setSelectedDoctor(null);
        }} />

    </div>);

};

export default DoctorManagement;