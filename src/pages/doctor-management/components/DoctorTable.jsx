import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DoctorTable = ({ doctors, onViewProfile, onEditSchedule, onSort, sortField, sortDirection }) => {
  const [selectedDoctors, setSelectedDoctors] = useState([]);

  const handleSelectAll = (e) => {
    if (e?.target?.checked) {
      setSelectedDoctors(doctors?.map(doctor => doctor?.id));
    } else {
      setSelectedDoctors([]);
    }
  };

  const handleSelectDoctor = (doctorId) => {
    setSelectedDoctors(prev => 
      prev?.includes(doctorId) 
        ? prev?.filter(id => id !== doctorId)
        : [...prev, doctorId]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'status-success';
      case 'Busy':
        return 'status-warning';
      case 'Off Duty':
        return 'status-neutral';
      default:
        return 'status-neutral';
    }
  };

  const getPatientLoadColor = (load) => {
    if (load >= 80) return 'text-alert-red';
    if (load >= 60) return 'text-caution-amber';
    return 'text-success-green';
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return 'ArrowUpDown';
    return sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="medical-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-clinical-gray border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedDoctors?.length === doctors?.length}
                  onChange={handleSelectAll}
                  className="rounded border-border focus:ring-primary"
                />
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Doctor
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:text-primary transition-colors"
                onClick={() => onSort('specialization')}
              >
                <div className="flex items-center space-x-1">
                  <span>Specialization</span>
                  <Icon name={getSortIcon('specialization')} size={14} />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:text-primary transition-colors"
                onClick={() => onSort('department')}
              >
                <div className="flex items-center space-x-1">
                  <span>Department</span>
                  <Icon name={getSortIcon('department')} size={14} />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:text-primary transition-colors"
                onClick={() => onSort('status')}
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  <Icon name={getSortIcon('status')} size={14} />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:text-primary transition-colors"
                onClick={() => onSort('patientLoad')}
              >
                <div className="flex items-center space-x-1">
                  <span>Patient Load</span>
                  <Icon name={getSortIcon('patientLoad')} size={14} />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Contact
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {doctors?.map((doctor) => (
              <tr key={doctor?.id} className="hover:bg-clinical-gray/50 transition-colors">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedDoctors?.includes(doctor?.id)}
                    onChange={() => handleSelectDoctor(doctor?.id)}
                    className="rounded border-border focus:ring-primary"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Image
                        src={doctor?.avatar}
                        alt={doctor?.avatarAlt}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border border-clinical-white ${
                        doctor?.status === 'Available' ? 'bg-success-green' :
                        doctor?.status === 'Busy' ? 'bg-caution-amber' : 'bg-neutral-slate'
                      }`}></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{doctor?.name}</p>
                      <p className="text-xs text-muted-foreground">{doctor?.experience} years exp.</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-primary font-medium">{doctor?.specialization}</p>
                  <p className="text-xs text-muted-foreground">{doctor?.certifications} certifications</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-foreground">{doctor?.department}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`status-indicator ${getStatusColor(doctor?.status)}`}>
                    {doctor?.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      doctor?.patientLoad >= 80 ? 'bg-alert-red' :
                      doctor?.patientLoad >= 60 ? 'bg-caution-amber' : 'bg-success-green'
                    }`}></div>
                    <span className={`text-sm font-medium ${getPatientLoadColor(doctor?.patientLoad)}`}>
                      {doctor?.patientLoad}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-muted-foreground">
                    <p className="flex items-center space-x-1">
                      <Icon name="Phone" size={12} />
                      <span>{doctor?.phone}</span>
                    </p>
                    <p className="flex items-center space-x-1 mt-1">
                      <Icon name="Mail" size={12} />
                      <span className="truncate max-w-32">{doctor?.email}</span>
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onViewProfile(doctor)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Calendar"
                      onClick={() => onEditSchedule(doctor)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MoreHorizontal"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorTable;