import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import MetricCard from './components/MetricCard';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import CalendarWidget from './components/CalendarWidget';
import SearchBar from './components/SearchBar';
import DataVisualization from './components/DataVisualization';

const Dashboard = () => {
  const [userRole, setUserRole] = useState('administrator');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Mock user data - in real app, this would come from auth context
  const user = {
    name: 'Dr. Sarah Johnson',
    role: 'Chief Medical Officer',
    department: 'Administration'
  };

  // Role-specific metrics
  const getMetricsForRole = (role) => {
    const metrics = {
      administrator: [
        {
          title: 'Total Patients',
          value: '1,247',
          change: '+12%',
          changeType: 'increase',
          icon: 'Users',
          color: 'primary'
        },
        {
          title: 'Active Doctors',
          value: '89',
          change: '+3%',
          changeType: 'increase',
          icon: 'UserCheck',
          color: 'success'
        },
        {
          title: 'Today\'s Appointments',
          value: '156',
          change: '+8%',
          changeType: 'increase',
          icon: 'Calendar',
          color: 'info'
        },
        {
          title: 'Bed Occupancy',
          value: '87%',
          change: '-2%',
          changeType: 'decrease',
          icon: 'Bed',
          color: 'warning'
        }
      ],
      doctor: [
        {
          title: 'My Patients Today',
          value: '24',
          change: '+2',
          changeType: 'increase',
          icon: 'Users',
          color: 'primary'
        },
        {
          title: 'Appointments',
          value: '12',
          change: 'On Schedule',
          changeType: 'increase',
          icon: 'Calendar',
          color: 'success'
        },
        {
          title: 'Pending Reports',
          value: '7',
          change: '-3',
          changeType: 'decrease',
          icon: 'FileText',
          color: 'warning'
        },
        {
          title: 'Surgery Queue',
          value: '3',
          change: 'Scheduled',
          changeType: 'increase',
          icon: 'Activity',
          color: 'info'
        }
      ],
      nurse: [
        {
          title: 'Assigned Patients',
          value: '18',
          change: '+1',
          changeType: 'increase',
          icon: 'Heart',
          color: 'primary'
        },
        {
          title: 'Critical Cases',
          value: '4',
          change: 'Stable',
          changeType: 'increase',
          icon: 'AlertTriangle',
          color: 'error'
        },
        {
          title: 'Medications Due',
          value: '12',
          change: 'On Time',
          changeType: 'increase',
          icon: 'Pill',
          color: 'success'
        },
        {
          title: 'Shift Hours',
          value: '6.5h',
          change: 'Remaining',
          changeType: 'increase',
          icon: 'Clock',
          color: 'info'
        }
      ],
      receptionist: [
        {
          title: 'Check-ins Today',
          value: '89',
          change: '+15%',
          changeType: 'increase',
          icon: 'CheckCircle',
          color: 'success'
        },
        {
          title: 'Appointments Booked',
          value: '156',
          change: '+8%',
          changeType: 'increase',
          icon: 'Calendar',
          color: 'primary'
        },
        {
          title: 'Waiting Patients',
          value: '12',
          change: 'Current',
          changeType: 'increase',
          icon: 'Clock',
          color: 'warning'
        },
        {
          title: 'Phone Calls',
          value: '47',
          change: '+5',
          changeType: 'increase',
          icon: 'Phone',
          color: 'info'
        }
      ]
    };
    
    return metrics?.[role] || metrics?.administrator;
  };

  const metrics = getMetricsForRole(userRole);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <BreadcrumbTrail />
          
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Welcome back, {user?.name}
                </h1>
                <p className="text-muted-foreground">
                  {formatDate(currentTime)} • {formatTime(currentTime)}
                </p>
              </div>
              
              {/* Role Selector for Demo */}
              <div className="mt-4 lg:mt-0">
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e?.target?.value)}
                  className="px-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="administrator">Administrator View</option>
                  <option value="doctor">Doctor View</option>
                  <option value="nurse">Nurse View</option>
                  <option value="receptionist">Receptionist View</option>
                </select>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl">
              <SearchBar />
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics?.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Activity Feed - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <ActivityFeed />
            </div>
            
            {/* Quick Actions */}
            <div>
              <QuickActions userRole={userRole} />
            </div>
          </div>

          {/* Calendar and Data Visualization */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Calendar Widget */}
            <div>
              <CalendarWidget />
            </div>
            
            {/* Data Visualization - Takes 2 columns on extra large screens */}
            <div className="xl:col-span-2">
              <DataVisualization />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;