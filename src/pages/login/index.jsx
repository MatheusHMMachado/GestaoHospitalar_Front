import React from 'react';
import { Helmet } from 'react-helmet';
import WelcomeHeader from './components/WelcomeHeader';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals.jsx';
import SessionWarning from './components/SessionWarning';
import MockCredentialsHelper from './components/MockCredentialsHelper';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Login - HospitalCare Pro</title>
        <meta name="description" content="Secure login to HospitalCare Pro hospital management system. Access patient records, appointments, and medical data with role-based authentication." />
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

          {/* Demo Helper - Only for development */}
          <MockCredentialsHelper />

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date()?.getFullYear()} HospitalCare Pro. All rights reserved.
            </p>
            <div className="flex items-center justify-center space-x-4 mt-2 text-xs text-muted-foreground">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>Support</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;