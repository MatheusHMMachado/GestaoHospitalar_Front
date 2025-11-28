import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const DataVisualization = () => {
  const patientAdmissionData = [
    { month: 'Jan', admissions: 245, discharges: 230 },
    { month: 'Feb', admissions: 280, discharges: 265 },
    { month: 'Mar', admissions: 320, discharges: 295 },
    { month: 'Apr', admissions: 290, discharges: 310 },
    { month: 'May', admissions: 350, discharges: 325 },
    { month: 'Jun', admissions: 380, discharges: 360 },
    { month: 'Jul', admissions: 420, discharges: 390 },
    { month: 'Aug', admissions: 390, discharges: 410 },
    { month: 'Sep', admissions: 360, discharges: 345 },
    { month: 'Oct', admissions: 410, discharges: 385 }
  ];

  const appointmentTrendData = [
    { day: 'Mon', appointments: 45 },
    { day: 'Tue', appointments: 52 },
    { day: 'Wed', appointments: 48 },
    { day: 'Thu', appointments: 61 },
    { day: 'Fri', appointments: 55 },
    { day: 'Sat', appointments: 35 },
    { day: 'Sun', appointments: 28 }
  ];

  const departmentWorkloadData = [
    { name: 'Emergency', value: 35, color: '#EF4444' },
    { name: 'Cardiology', value: 25, color: '#2563EB' },
    { name: 'Orthopedics', value: 20, color: '#059669' },
    { name: 'Pediatrics', value: 15, color: '#F59E0B' },
    { name: 'Others', value: 5, color: '#64748B' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Patient Admissions vs Discharges */}
      <div className="medical-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Patient Flow Trends</h3>
        <div className="w-full h-64" aria-label="Patient Admissions vs Discharges Bar Chart">
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
              <Bar dataKey="admissions" fill="#2563EB" name="Admissions" radius={[2, 2, 0, 0]} />
              <Bar dataKey="discharges" fill="#059669" name="Discharges" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Weekly Appointment Trends */}
      <div className="medical-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Appointment Trends</h3>
        <div className="w-full h-64" aria-label="Weekly Appointment Trends Line Chart">
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
                dataKey="appointments" 
                stroke="#2563EB" 
                strokeWidth={3}
                dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#2563EB', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Department Workload Distribution */}
      <div className="medical-card p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold text-foreground mb-4">Department Workload Distribution</h3>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 h-64" aria-label="Department Workload Pie Chart">
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
                  formatter={(value) => [`${value}%`, 'Workload']}
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