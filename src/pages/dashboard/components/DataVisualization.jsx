import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const DataVisualization = () => {
  const patientAdmissionData = [
    { month: 'Jan', admissões: 245, demissões: 230 },
    { month: 'Fev', admissões: 280, demissões: 265 },
    { month: 'Mar', admissões: 320, demissões: 295 },
    { month: 'Abr', admissões: 290, demissões: 310 },
    { month: 'Mai', admissões: 350, demissões: 325 },
    { month: 'Jun', admissões: 380, demissões: 360 },
    { month: 'Jul', admissões: 420, demissões: 390 },
    { month: 'Ago', admissões: 390, demissões: 410 },
    { month: 'Set', admissões: 360, demissões: 345 },
    { month: 'Out', admissões: 410, demissões: 385 }
  ];

  const appointmentTrendData = [
    { day: 'Dom', agendamentos: 45 },
    { day: 'Seg', agendamentos: 52 },
    { day: 'Ter', agendamentos: 48 },
    { day: 'Qua', agendamentos: 61 },
    { day: 'Qui', agendamentos: 55 },
    { day: 'Sex', agendamentos: 35 },
    { day: 'Sab', agendamentos: 28 }
  ];

  const departmentWorkloadData = [
    { name: 'Emergência', value: 35, color: '#EF4444' },
    { name: 'Cardiologia', value: 25, color: '#2563EB' },
    { name: 'Ortopedia', value: 20, color: '#059669' },
    { name: 'Pediatria', value: 15, color: '#F59E0B' },
    { name: 'Outros', value: 5, color: '#64748B' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Admissões vs altas de pacientes */}
      <div className="medical-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Tendências do fluxo de pacientes</h3>
        <div className="w-full h-64" aria-label="Gráfico de barras: Admissões vs altas de pacientes">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={patientAdmissionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="month" 
                stroke="#64748B"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748B"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="admissões" fill="#2563EB" name="admissões" radius={[2, 2, 0, 0]} />
              <Bar dataKey="demissões" fill="#059669" name="demissões" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Tendências de agendamento semanal */}
      <div className="medical-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Tendências de agendamento semanal</h3>
        <div className="w-full h-64" aria-label="Gráfico de linhas das tendências de agendamento semanal">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={appointmentTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="day" 
                stroke="#64748B"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748B"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="agendamentos" 
                stroke="#2563EB" 
                strokeWidth={3}
                dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#2563EB', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Distribuição da carga de trabalho do departamento */}
      <div className="medical-card p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold text-foreground mb-4">Distribuição da carga de trabalho do departamento</h3>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 h-64" aria-label="Gráfico de pizza da carga de trabalho do departamento">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentWorkloadData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {departmentWorkloadData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value) => [`${value}%`, 'Carga de trabalho']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="w-full lg:w-1/2 lg:pl-6">
            <div className="space-y-3">
              {departmentWorkloadData?.map((department, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: department?.color }}
                    ></div>
                    <span className="text-sm font-medium text-foreground">{department?.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{department?.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;