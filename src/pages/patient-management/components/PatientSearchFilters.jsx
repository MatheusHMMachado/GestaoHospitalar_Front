import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PatientSearchFilters = ({ onSearch, onReset }) => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    statusFilter: '',
    dateFrom: '',
    dateTo: ''
  });

  // Opções de Status baseadas no Banco de Dados
  const statusOptions = [
    { value: '', label: 'Todos os Status' },
    { value: 'Ativo', label: 'Ativo' },
    { value: 'Inativo', label: 'Inativo' },
    { value: 'Critico', label: 'Crítico' }
  ];

  // Atualiza o estado local, mas NÃO dispara a busca ainda
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Dispara a busca apenas quando o usuário clica no botão
  const handleSearchClick = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      searchTerm: '',
      statusFilter: '',
      dateFrom: '',
      dateTo: ''
    };
    setFilters(resetFilters);
    onReset();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Filtrar Pacientes</h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          onClick={handleReset}
          className="text-gray-500 hover:text-gray-900"
        >
          Limpar Filtros
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Termo de Busca */}
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder="Buscar por nome, CPF, email ou telefone..."
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            className="w-full"
          />
        </div>

        {/* Filtro de Status */}
        <div>
          <Select
            placeholder="Filtrar por status"
            options={statusOptions}
            value={filters.statusFilter}
            onChange={(value) => handleFilterChange('statusFilter', value)}
          />
        </div>

        {/* Botão de Busca (Ação Principal) */}
        <div className="flex items-end">
            <Button 
                variant="default" 
                fullWidth 
                iconName="Search"
                onClick={handleSearchClick}
            >
                Buscar
            </Button>
        </div>
      </div>

      {/* Linha Secundária: Datas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 whitespace-nowrap">Nascido entre:</span>
            <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                className="flex-1"
            />
            <span className="text-gray-400">e</span>
            <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                className="flex-1"
            />
        </div>
      </div>

      {/* Display dos Filtros Ativos */}
      {(filters.searchTerm || filters.statusFilter || filters.dateFrom) && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Filter" size={16} className="text-gray-400" />
            <span className="text-gray-500">Filtros ativos:</span>
            <div className="flex flex-wrap gap-2">
              {filters.searchTerm && (
                <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs border border-blue-100">
                  Termo: "{filters.searchTerm}"
                </span>
              )}
              {filters.statusFilter && (
                <span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 rounded-md text-xs border border-green-100">
                  Status: {filters.statusFilter}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientSearchFilters;