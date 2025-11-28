import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import PatientTable from './components/PatientTable';
import PatientSearchFilters from './components/PatientSearchFilters';
import PatientDetailModal from './components/PatientDetailModal';
import PatientRegistrationModal from './components/PatientRegistrantionModal';
import PatientStatistics from './components/PatientStatistics';
import PatientPagination from './components/PatientPagination';

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [showStatistics, setShowStatistics] = useState(true);

  // Mock patient data
  const mockPatients = [
    {
      id: 1,
      patientId: "PAT001234",
      name: "Sarah Johnson",
      age: 34,
      gender: "Female",
      dateOfBirth: "1989-03-15",
      phone: "(555) 123-4567",
      email: "sarah.johnson@email.com",
      address: "123 Main Street, Springfield, IL 62701",
      bloodType: "A+",
      weight: "65",
      height: "165",
      allergies: "Penicillin, Shellfish",
      medicalHistory: "Hypertension, managed with medication. No major surgeries.",
      insuranceProvider: "Blue Cross Blue Shield",
      policyNumber: "BC123456789",
      assignedDoctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      lastVisit: "10/25/2024",
      status: "Active",
      totalVisits: 12,
      registrationDate: "10/31/2024",
      emergencyContact: {
        name: "Michael Johnson",
        relationship: "Spouse",
        phone: "(555) 123-4568"
      },
      recentAppointments: [
        { date: "10/25/2024", type: "Regular Checkup" },
        { date: "09/15/2024", type: "Blood Work" }
      ]
    },
    {
      id: 2,
      patientId: "PAT001235",
      name: "Michael Chen",
      age: 45,
      gender: "Male",
      dateOfBirth: "1978-07-22",
      phone: "(555) 234-5678",
      email: "michael.chen@email.com",
      address: "456 Oak Avenue, Springfield, IL 62702",
      bloodType: "O-",
      weight: "78",
      height: "175",
      allergies: "None known",
      medicalHistory: "Diabetes Type 2, well controlled. Previous appendectomy in 2015.",
      insuranceProvider: "Aetna",
      policyNumber: "AET987654321",
      assignedDoctor: "Dr. Michael Chen",
      specialty: "Neurology",
      lastVisit: "10/28/2024",
      status: "Admitted",
      totalVisits: 8,
      registrationDate: "10/30/2024",
      emergencyContact: {
        name: "Lisa Chen",
        relationship: "Spouse",
        phone: "(555) 234-5679"
      },
      recentAppointments: [
        { date: "10/28/2024", type: "Neurological Assessment" },
        { date: "10/10/2024", type: "Follow-up" }
      ]
    },
    {
      id: 3,
      patientId: "PAT001236",
      name: "Emily Rodriguez",
      age: 28,
      gender: "Female",
      dateOfBirth: "1995-11-08",
      phone: "(555) 345-6789",
      email: "emily.rodriguez@email.com",
      address: "789 Pine Street, Springfield, IL 62703",
      bloodType: "B+",
      weight: "58",
      height: "160",
      allergies: "Latex, Peanuts",
      medicalHistory: "Asthma, well managed with inhaler. No hospitalizations.",
      insuranceProvider: "Cigna",
      policyNumber: "CIG456789123",
      assignedDoctor: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      lastVisit: "10/20/2024",
      status: "Active",
      totalVisits: 15,
      registrationDate: "10/29/2024",
      emergencyContact: {
        name: "Carlos Rodriguez",
        relationship: "Parent",
        phone: "(555) 345-6790"
      },
      recentAppointments: [
        { date: "10/20/2024", type: "Asthma Management" },
        { date: "09/20/2024", type: "Annual Physical" }
      ]
    },
    {
      id: 4,
      patientId: "PAT001237",
      name: "James Wilson",
      age: 67,
      gender: "Male",
      dateOfBirth: "1956-12-03",
      phone: "(555) 456-7890",
      email: "james.wilson@email.com",
      address: "321 Elm Drive, Springfield, IL 62704",
      bloodType: "AB+",
      weight: "85",
      height: "180",
      allergies: "Sulfa drugs",
      medicalHistory: "Coronary artery disease, previous bypass surgery 2020. Arthritis in knees.",
      insuranceProvider: "Medicare",
      policyNumber: "MED789123456",
      assignedDoctor: "Dr. James Wilson",
      specialty: "Orthopedics",
      lastVisit: "10/30/2024",
      status: "Critical",
      totalVisits: 25,
      registrationDate: "10/28/2024",
      emergencyContact: {
        name: "Margaret Wilson",
        relationship: "Spouse",
        phone: "(555) 456-7891"
      },
      recentAppointments: [
        { date: "10/30/2024", type: "Cardiac Monitoring" },
        { date: "10/15/2024", type: "Orthopedic Consultation" }
      ]
    },
    {
      id: 5,
      patientId: "PAT001238",
      name: "Lisa Thompson",
      age: 52,
      gender: "Female",
      dateOfBirth: "1971-04-18",
      phone: "(555) 567-8901",
      email: "lisa.thompson@email.com",
      address: "654 Maple Lane, Springfield, IL 62705",
      bloodType: "A-",
      weight: "70",
      height: "168",
      allergies: "Iodine contrast",
      medicalHistory: "Hypothyroidism, on levothyroxine. History of breast cancer, in remission since 2019.",
      insuranceProvider: "United Healthcare",
      policyNumber: "UHC321654987",
      assignedDoctor: "Dr. Lisa Thompson",
      specialty: "Internal Medicine",
      lastVisit: "10/22/2024",
      status: "Discharged",
      totalVisits: 18,
      registrationDate: "10/27/2024",
      emergencyContact: {
        name: "David Thompson",
        relationship: "Spouse",
        phone: "(555) 567-8902"
      },
      recentAppointments: [
        { date: "10/22/2024", type: "Cancer Screening" },
        { date: "09/22/2024", type: "Thyroid Check" }
      ]
    },
    {
      id: 6,
      patientId: "PAT001239",
      name: "Robert Davis",
      age: 41,
      gender: "Male",
      dateOfBirth: "1982-09-12",
      phone: "(555) 678-9012",
      email: "robert.davis@email.com",
      address: "987 Cedar Court, Springfield, IL 62706",
      bloodType: "O+",
      weight: "82",
      height: "178",
      allergies: "None known",
      medicalHistory: "Seasonal allergies, occasional migraines. No chronic conditions.",
      insuranceProvider: "Humana",
      policyNumber: "HUM654321789",
      assignedDoctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      lastVisit: "10/18/2024",
      status: "Active",
      totalVisits: 6,
      registrationDate: "10/26/2024",
      emergencyContact: {
        name: "Jennifer Davis",
        relationship: "Spouse",
        phone: "(555) 678-9013"
      },
      recentAppointments: [
        { date: "10/18/2024", type: "Preventive Care" },
        { date: "08/18/2024", type: "Allergy Consultation" }
      ]
    }
  ];

  useEffect(() => {
    setPatients(mockPatients);
    setFilteredPatients(mockPatients);
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(filteredPatients?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPatients = filteredPatients?.slice(startIndex, endIndex);

  const handleSearch = (filters) => {
    let filtered = [...patients];

    if (filters?.searchTerm) {
      const searchLower = filters?.searchTerm?.toLowerCase();
      filtered = filtered?.filter(patient => 
        patient?.name?.toLowerCase()?.includes(searchLower) ||
        patient?.patientId?.toLowerCase()?.includes(searchLower) ||
        patient?.phone?.includes(searchLower) ||
        patient?.email?.toLowerCase()?.includes(searchLower)
      );
    }

    if (filters?.doctorFilter) {
      filtered = filtered?.filter(patient => patient?.assignedDoctor === filters?.doctorFilter);
    }

    if (filters?.statusFilter) {
      filtered = filtered?.filter(patient => patient?.status === filters?.statusFilter);
    }

    if (filters?.dateFrom) {
      filtered = filtered?.filter(patient => {
        const patientDate = new Date(patient.lastVisit);
        const filterDate = new Date(filters.dateFrom);
        return patientDate >= filterDate;
      });
    }

    if (filters?.dateTo) {
      filtered = filtered?.filter(patient => {
        const patientDate = new Date(patient.lastVisit);
        const filterDate = new Date(filters.dateTo);
        return patientDate <= filterDate;
      });
    }

    setFilteredPatients(filtered);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilteredPatients(patients);
    setCurrentPage(1);
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setIsDetailModalOpen(true);
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setIsDetailModalOpen(true);
  };

  const handleDeletePatient = (patient) => {
    if (window.confirm(`Are you sure you want to delete patient ${patient?.name}?`)) {
      const updatedPatients = patients?.filter(p => p?.id !== patient?.id);
      setPatients(updatedPatients);
      setFilteredPatients(updatedPatients?.filter(p => 
        filteredPatients?.some(fp => fp?.id === p?.id)
      ));
    }
  };

  const handleSavePatient = (updatedPatient) => {
    const updatedPatients = patients?.map(p => 
      p?.id === updatedPatient?.id ? updatedPatient : p
    );
    setPatients(updatedPatients);
    
    // Update filtered patients if the updated patient is in the current filter
    if (filteredPatients?.some(p => p?.id === updatedPatient?.id)) {
      const updatedFilteredPatients = filteredPatients?.map(p => 
        p?.id === updatedPatient?.id ? updatedPatient : p
      );
      setFilteredPatients(updatedFilteredPatients);
    }
    
    setIsDetailModalOpen(false);
  };

  const handleRegisterPatient = (newPatient) => {
    const updatedPatients = [...patients, newPatient];
    setPatients(updatedPatients);
    setFilteredPatients(updatedPatients);
    setIsRegistrationModalOpen(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleImportData = () => {
    // Mock import functionality
    alert('Import functionality would be implemented here');
  };

  const handleExportData = () => {
    // Mock export functionality
    const dataStr = JSON.stringify(filteredPatients, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'patients_export.json';
    link?.click();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbTrail />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Patient Management</h1>
              <p className="mt-2 text-muted-foreground">
                Manage patient records, registrations, and medical information
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                iconName="Download"
                onClick={handleImportData}
              >
                Import Data
              </Button>
              <Button
                variant="outline"
                iconName="Upload"
                onClick={handleExportData}
              >
                Export Data
              </Button>
              <Button
                variant="default"
                iconName="UserPlus"
                onClick={() => setIsRegistrationModalOpen(true)}
              >
                Register New Patient
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-3 space-y-6">
              {/* Search and Filters */}
              <PatientSearchFilters 
                onSearch={handleSearch}
                onReset={handleResetFilters}
              />

              {/* Results Summary */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h2 className="text-lg font-semibold text-foreground">
                    Patient Records ({filteredPatients?.length})
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName={showStatistics ? 'EyeOff' : 'Eye'}
                    onClick={() => setShowStatistics(!showStatistics)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {showStatistics ? 'Hide Stats' : 'Show Stats'}
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Filter" size={16} />
                  <span>Page {currentPage} of {totalPages}</span>
                </div>
              </div>

              {/* Patient Table */}
              <PatientTable
                patients={currentPatients}
                onPatientSelect={handlePatientSelect}
                onEditPatient={handleEditPatient}
                onDeletePatient={handleDeletePatient}
              />

              {/* Pagination */}
              <PatientPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredPatients?.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1">
              {showStatistics && (
                <PatientStatistics patients={patients} />
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Modals */}
      <PatientDetailModal
        patient={selectedPatient}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onSave={handleSavePatient}
      />
      <PatientRegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        onSave={handleRegisterPatient}
      />
    </div>
  );
};

export default PatientManagement;