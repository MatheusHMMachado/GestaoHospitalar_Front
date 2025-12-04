import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PatientTable = ({ patients, onPatientSelect, onEditPatient, onDeletePatient }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedPatients = React.useMemo(() => {
    if (!sortConfig?.key) return patients;

    return [...patients]?.sort((a, b) => {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];

      if (aValue < bValue) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [patients, sortConfig]);

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Ativo': { bg: 'bg-success-green/10', text: 'text-success-green', border: 'border-success-green/20' },
      'Alta': { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200' },
      'Admitido': { bg: 'bg-medical-blue/10', text: 'text-medical-blue', border: 'border-medical-blue/20' },
      'Critico': { bg: 'bg-alert-red/10', text: 'text-alert-red', border: 'border-alert-red/20' }
    };

    const config = statusConfig?.[status] || statusConfig?.['Active'];
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${config?.bg} ${config?.text} ${config?.border}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-medical-sm overflow-hidden">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('patientId')}
                  className="flex items-center space-x-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
                >
                  <span>ID Paciente</span>
                  {getSortIcon('patientId')}
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
                >
                  <span>Nome</span>
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('age')}
                  className="flex items-center space-x-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
                >
                  <span>Idade</span>
                  {getSortIcon('age')}
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contato</span>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('assignedDoctor')}
                  className="flex items-center space-x-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
                >
                  <span>Médico designado</span>
                  {getSortIcon('assignedDoctor')}
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('lastVisit')}
                  className="flex items-center space-x-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
                >
                  <span>Última visita</span>
                  {getSortIcon('lastVisit')}
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</span>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ações</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedPatients?.map((patient) => (
              <tr 
                key={patient?.id}
                className="hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => onPatientSelect(patient)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-primary">{patient?.patientId}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">
                        {patient?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{patient?.name}</div>
                      <div className="text-xs text-muted-foreground">{patient?.gender}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-foreground">{patient?.age}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">{patient?.phone}</div>
                  <div className="text-xs text-muted-foreground">{patient?.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">{patient?.assignedDoctor}</div>
                  <div className="text-xs text-muted-foreground">{patient?.specialty}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-foreground">{patient?.lastVisit}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(patient?.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onEditPatient(patient);
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Trash2"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onDeletePatient(patient);
                      }}
                      className="text-muted-foreground hover:text-destructive"
                    >
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden divide-y divide-border">
        {sortedPatients?.map((patient) => (
          <div 
            key={patient?.id}
            className="p-4 hover:bg-muted/30 transition-colors cursor-pointer"
            onClick={() => onPatientSelect(patient)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {patient?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{patient?.name}</div>
                  <div className="text-xs text-muted-foreground">ID: {patient?.patientId}</div>
                </div>
              </div>
              {getStatusBadge(patient?.status)}
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-muted-foreground">Idade:</span>
                <span className="ml-1 text-foreground">{patient?.age}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Celular:</span>
                <span className="ml-1 text-foreground">{patient?.phone}</span>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground">Doutor:</span>
                <span className="ml-1 text-foreground">{patient?.assignedDoctor}</span>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground">Última Visita:</span>
                <span className="ml-1 text-foreground">{patient?.lastVisit}</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 mt-3 pt-3 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                iconName="Edit"
                onClick={(e) => {
                  e?.stopPropagation();
                  onEditPatient(patient);
                }}
              >
                Editar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                onClick={(e) => {
                  e?.stopPropagation();
                  onDeletePatient(patient);
                }}
                className="text-destructive hover:text-destructive"
              >
              Deletar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientTable;