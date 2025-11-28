import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PatientManagement from './pages/patient-management';
import LoginPage from './pages/login';
import DoctorManagement from './pages/doctor-management';
import Dashboard from './pages/dashboard';
import AppointmentScheduling from './pages/appointment-scheduling';
import UserRegistration from './pages/user-registration';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/patient-management" element={<PatientManagement />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/doctor-management" element={<DoctorManagement />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointment-scheduling" element={<AppointmentScheduling />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
