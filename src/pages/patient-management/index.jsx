import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

// Configurações da API
const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const PatientManagement = () => {
  const navigate = useNavigate();

  // Estados de Dados
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  
  // Estados de Controle e UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [showStatistics, setShowStatistics] = useState(true);

  // Função auxiliar para calcular idade
  const calculateAge = (dobString) => {
    if (!dobString) return 0;
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Função auxiliar de Mapeamento (Backend -> Frontend)
  const mapPatientData = (data) => {
    return data.map(p => ({
      id: p.id,
      patientId: p.cpf || p.id,
      name: p.nome,
      age: calculateAge(p.dataNascimento),
      gender: p.genero,
      dateOfBirth: p.dataNascimento,
      phone: p.telefone,
      email: p.emailPrincipal || p.email || 'N/A',
      address: p.endereco,
      bloodType: p.tipoSanguineo || 'N/A',
      weight: p.peso || '-', 
      height: p.altura || '-',
      allergies: p.alergia || 'Nenhuma',
      medicalHistory: p.historicoMedico || 'Nenhum',
      insuranceProvider: p.seguradora || 'Particular',
      policyNumber: p.numeroApolice || '-',
      assignedDoctor: 'Não Atribuído',
      specialty: '-',
      lastVisit: '-',
      status: p.situacao ? "Ativo" : "Inativo",
      registrationDate: p.dataCadastro || new Date().toISOString(),
      totalVisits: 0,
      emergencyContact: {
        name: p.contatoEmergencia || '-',
        relationship: p.parentescoContatoEmergencia || '-',
        phone: p.telefoneEmergencia || '-'
      },
      recentAppointments: []
    }));
  };

  // --- 1. BUSCAR TODOS OS DADOS (Carga Inicial) ---
  const fetchPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/pacientes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-TOKEN': API_TOKEN
        }
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('user_token');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Falha ao carregar lista de pacientes');
      }

      const data = await response.json();
      const mappedPatients = mapPatientData(data);

      setPatients(mappedPatients);
      setFilteredPatients(mappedPatients);

    } catch (err) {
      console.error("Erro ao buscar pacientes:", err);
      setError("Não foi possível carregar os dados dos pacientes. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // --- 2. BUSCA AVANÇADA (Search Endpoint) ---
  const handleSearch = async (filters) => {
    setLoading(true);
    setError(null);
    try {
      // Prepara o payload conforme o DTO do Backend
      const payload = {
        termo: filters.searchTerm,
        status: filters.statusFilter,
        dataNascimentoInicio: filters.dateFrom ? new Date(filters.dateFrom).toISOString() : null,
        dataNascimentoFim: filters.dateTo ? new Date(filters.dateTo).toISOString() : null
      };

      const response = await fetch(`${API_URL}/pacientes/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-TOKEN': API_TOKEN
        },
        body: JSON.stringify(payload)
      });

      if (response.status === 401 || response.status === 403) {
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Falha na busca.');
      }

      const data = await response.json();
      const mappedPatients = mapPatientData(data);

      // Atualiza apenas a lista filtrada (mantém 'patients' como cache ou atualiza ambos)
      setFilteredPatients(mappedPatients);
      setCurrentPage(1);

    } catch (err) {
      console.error("Erro na busca:", err);
      setError("Erro ao buscar pacientes.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    fetchPatients(); // Recarrega a lista completa do servidor
    setCurrentPage(1);
  };

  // --- LÓGICA DE PAGINAÇÃO ---
  const totalPages = Math.ceil(filteredPatients?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPatients = filteredPatients?.slice(startIndex, endIndex);

  // --- HANDLERS (Ações) ---

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setIsDetailModalOpen(true);
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setIsDetailModalOpen(true);
  };

  const handleDeletePatient = async (patient) => {
    if (window.confirm(`Para garantir a integridade de dados no sistema, o paciente ${patient?.name} será inativado. Deseja continuar?`)) {
      try {
        const response = await fetch(`${API_URL}/pacientes/${patient.id}`, {
            method: 'DELETE',
            headers: { 'X-API-TOKEN': API_TOKEN }
        });

        if (response.ok) {
            const updatedPatients = patients?.filter(p => p?.id !== patient?.id);
            setPatients(updatedPatients);
            setFilteredPatients(prev => prev.filter(p => p.id !== patient.id));
        } else {
            alert("Erro ao inativar paciente no servidor.");
        }
      } catch (error) {
        console.error("Erro ao inativar:", error);
        alert("Erro de conexão ao tentar inativar.");
      }
    }
  };

  const handleSavePatient = (updatedPatient) => {
    const updatedPatients = patients?.map(p => 
      p?.id === updatedPatient?.id ? updatedPatient : p
    );
    setPatients(updatedPatients);
    
    if (filteredPatients?.some(p => p?.id === updatedPatient?.id)) {
      const updatedFilteredPatients = filteredPatients?.map(p => 
        p?.id === updatedPatient?.id ? updatedPatient : p
      );
      setFilteredPatients(updatedFilteredPatients);
    }
    
    setIsDetailModalOpen(false);
  };

  const handleRegisterPatient = (newPatient) => {
    fetchPatients();
    setIsRegistrationModalOpen(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(filteredPatients, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pacientes_export.json';
    link?.click();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbTrail />
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Gestão de Pacientes</h1>
              <p className="mt-2 text-muted-foreground">
                Gerencie registros, cadastros e histórico médico.
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                iconName="Download"
              >
                <span 
                  onClick={(e) => {
                    e.stopPropagation();
                    alert("Funcionalidade em desenvolvimento");
                  }}
                  className="cursor-pointer w-full h-full flex items-center justify-center"
                >
                  Importar
                </span>
              </Button>

              <Button
                variant="outline"
                iconName="Upload"
                onClick={handleExportData}
              >
                Exportar
              </Button>
              <Button
                variant="default"
                iconName="UserPlus"
                onClick={() => setIsRegistrationModalOpen(true)}
              >
                Novo Paciente
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Conteúdo Principal */}
            <div className="xl:col-span-3 space-y-6">
              
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-3">
                    <Icon name="AlertTriangle" />
                    {error}
                </div>
              )}

              <PatientSearchFilters 
                onSearch={handleSearch}
                onReset={handleResetFilters}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h2 className="text-lg font-semibold text-foreground">
                    Registros ({filteredPatients?.length})
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName={showStatistics ? 'EyeOff' : 'Eye'}
                    onClick={() => setShowStatistics(!showStatistics)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {showStatistics ? 'Ocultar Stats' : 'Ver Stats'}
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Filter" size={16} />
                  <span>Página {currentPage} de {totalPages || 1}</span>
                </div>
              </div>

              {loading ? (
                 <div className="flex justify-center items-center h-64 border rounded-lg bg-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                 </div>
              ) : (
                <>
                  <PatientTable
                    patients={currentPatients}
                    onPatientSelect={handlePatientSelect}
                    onEditPatient={handleEditPatient}
                    onDeletePatient={handleDeletePatient}
                  />

                  <PatientPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filteredPatients?.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                  />
                </>
              )}
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