import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PatientSearchFilters = ({ onSearch, onReset }) => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    doctorFilter: '',
    statusFilter: '',
    dateFrom: '',
    dateTo: ''
  });

  const doctorOptions = [
    { value: '', label: 'All Doctors' },
    { value: 'Dr. Sarah Johnson', label: 'Dr. Sarah Johnson' },
    { value: 'Dr. Michael Chen', label: 'Dr. Michael Chen' },
    { value: 'Dr. Emily Rodriguez', label: 'Dr. Emily Rodriguez' },
    { value: 'Dr. James Wilson', label: 'Dr. James Wilson' },
    { value: 'Dr. Lisa Thompson', label: 'Dr. Lisa Thompson' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Discharged', label: 'Discharged' },
    { value: 'Admitted', label: 'Admitted' },
    { value: 'Critical', label: 'Critical' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      searchTerm: '',
      doctorFilter: '',
      statusFilter: '',
      dateFrom: '',
      dateTo: ''
    };
    setFilters(resetFilters);
    onReset();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Search & Filter Patients</h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          onClick={handleReset}
          className="text-muted-foreground hover:text-foreground"
        >
          Reset Filters
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search Term */}
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder="Search by name, ID, or phone..."
            value={filters?.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Doctor Filter */}
        <div>
          <Select
            placeholder="Filter by doctor"
            options={doctorOptions}
            value={filters?.doctorFilter}
            onChange={(value) => handleFilterChange('doctorFilter', value)}
          />
        </div>

        {/* Status Filter */}
        <div>
          <Select
            placeholder="Filter by status"
            options={statusOptions}
            value={filters?.statusFilter}
            onChange={(value) => handleFilterChange('statusFilter', value)}
          />
        </div>

        {/* Date Range */}
        <div className="flex items-center space-x-2">
          <Input
            type="date"
            placeholder="From date"
            value={filters?.dateFrom}
            onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
            className="flex-1"
          />
          <span className="text-muted-foreground">to</span>
          <Input
            type="date"
            placeholder="To date"
            value={filters?.dateTo}
            onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
            className="flex-1"
          />
        </div>
      </div>
      {/* Active Filters Display */}
      {(filters?.searchTerm || filters?.doctorFilter || filters?.statusFilter || filters?.dateFrom || filters?.dateTo) && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">Active filters:</span>
            <div className="flex flex-wrap gap-2">
              {filters?.searchTerm && (
                <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                  Search: "{filters?.searchTerm}"
                  <button
                    onClick={() => handleFilterChange('searchTerm', '')}
                    className="ml-1 hover:text-primary/80"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
              {filters?.doctorFilter && (
                <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                  Doctor: {filters?.doctorFilter}
                  <button
                    onClick={() => handleFilterChange('doctorFilter', '')}
                    className="ml-1 hover:text-primary/80"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
              {filters?.statusFilter && (
                <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                  Status: {filters?.statusFilter}
                  <button
                    onClick={() => handleFilterChange('statusFilter', '')}
                    className="ml-1 hover:text-primary/80"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
              {(filters?.dateFrom || filters?.dateTo) && (
                <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                  Date: {filters?.dateFrom || 'Start'} - {filters?.dateTo || 'End'}
                  <button
                    onClick={() => {
                      handleFilterChange('dateFrom', '');
                      handleFilterChange('dateTo', '');
                    }}
                    className="ml-1 hover:text-primary/80"
                  >
                    <Icon name="X" size={12} />
                  </button>
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