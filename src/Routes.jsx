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
import ProtectedRoute from "./ProtectedRoute";
import AppointmentHistory from "pages/appointment-history";
import ConstructionPage from "pages/ConstructionPage";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* --- ROTAS PÚBLICAS --- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        
        {/* Redireciona a raiz para o login ou dashboard */}
        <Route path="/" element={<LoginPage/>} />

        {/* --- ROTAS PRIVADAS (Protegidas pelo Guardião) --- */}
        <Route element={<ProtectedRoute />}>
          {/* Todas as rotas aqui dentro exigem token válido */}
          <Route path="/appointment-history" element={<AppointmentHistory />} />
          <Route path="/patient-management" element={<PatientManagement />} />
          <Route path="/doctor-management" element={<DoctorManagement />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointment-scheduling" element={<AppointmentScheduling />} />
          <Route path="/construction" element={<ConstructionPage />} />
        </Route>

        {/* Rota 404 - Página não encontrada */}
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
