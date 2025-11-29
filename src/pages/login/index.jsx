import React from 'react';
import { Helmet } from 'react-helmet';
import WelcomeHeader from './components/WelcomeHeader';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals.jsx';
import SessionWarning from './components/SessionWarning';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Login - HospitalCare Pro</title>
        <meta name="description" content="Login seguro no sistema de gestão hospitalar HospitalCare Pro. Acesse registros de pacientes, agendamentos e dados médicos com autenticação baseada em funções." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Main Login Card */}
          <div className="bg-clinical-white rounded-2xl shadow-xl border border-border p-8">
            <WelcomeHeader />
            <LoginForm />
            <TrustSignals />
            <SessionWarning />
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date()?.getFullYear()} HospitalCare Pro. Todos os diereitos reservados.
            </p>
            <div className="flex items-center justify-center space-x-4 mt-2 text-xs text-muted-foreground">
              <span>Política de privacidade</span>
              <span>•</span>
              <span>Termos de serviço</span>
              <span>•</span>
              <span>Suporte</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;