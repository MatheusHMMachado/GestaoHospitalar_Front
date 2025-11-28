import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import PersonalInfoSection from './components/PersonalInfoSection';
import RoleSelectionSection from './components/RoleSelectionSection';
import PasswordSection from './components/PasswordSection';
import DocumentUploadSection from './components/DocumentUploadSection';
import RolePreviewPanel from './components/RolePreviewPanel';
import ConfirmationModal from './components/ConfirmationModal';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    employeeId: '',
    dateOfBirth: '',
    role: '',
    department: '',
    specialization: '',
    shiftPreference: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
    licenseExpiry: '',
    documents: []
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Personal Information Validation
    if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
    if (!formData?.employeeId?.trim()) newErrors.employeeId = 'Employee ID is required';
    if (!formData?.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';

    // Role and Department Validation
    if (!formData?.role) newErrors.role = 'Role selection is required';
    if (!formData?.department) newErrors.department = 'Department selection is required';
    
    if (formData?.role === 'doctor' && !formData?.specialization) {
      newErrors.specialization = 'Specialization is required for doctors';
    }
    
    if ((formData?.role === 'nurse' || formData?.role === 'doctor') && !formData?.shiftPreference) {
      newErrors.shiftPreference = 'Shift preference is required';
    }

    // Password Validation
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else {
      if (formData?.password?.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])/?.test(formData?.password)) {
        newErrors.password = 'Password must contain uppercase, lowercase, number, and special character';
      }
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmRegistration = async () => {
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      console.log('User registered successfully:', formData);
      
      // Navigate to login with success message
      navigate('/login', { 
        state: { 
          message: 'Account created successfully! Please check your email for verification instructions.',
          type: 'success'
        }
      });
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
      setShowConfirmModal(false);
    }
  };

  const customBreadcrumbs = [
    { label: 'Authentication', path: '/login', icon: 'Shield' },
    { label: 'User Registration', path: '/user-registration', icon: 'UserPlus', isLast: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <BreadcrumbTrail customBreadcrumbs={customBreadcrumbs} />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
                <Icon name="UserPlus" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">User Registration</h1>
                <p className="text-muted-foreground">Create new user accounts with proper role assignment and credentials</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form Content */}
              <div className="lg:col-span-2 space-y-6">
                <PersonalInfoSection 
                  formData={formData}
                  errors={errors}
                  onChange={handleInputChange}
                />
                
                <RoleSelectionSection 
                  formData={formData}
                  errors={errors}
                  onChange={handleInputChange}
                />
                
                <PasswordSection 
                  formData={formData}
                  errors={errors}
                  onChange={handleInputChange}
                />
                
                <DocumentUploadSection 
                  formData={formData}
                  onChange={handleInputChange}
                />

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-border">
                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    iconName="UserPlus"
                    iconPosition="left"
                    disabled={isLoading}
                    className="sm:flex-1"
                  >
                    Create Account
                  </Button>
                  
                  <Link to="/login" className="sm:flex-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      fullWidth
                      iconName="ArrowLeft"
                      iconPosition="left"
                    >
                      Back to Login
                    </Button>
                  </Link>
                </div>

                {errors?.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertCircle" size={16} className="text-red-600" />
                      <p className="text-sm text-red-700">{errors?.submit}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Role Preview Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <RolePreviewPanel selectedRole={formData?.role} />
                </div>
              </div>
            </div>
          </form>

          {/* Quick Access Links */}
          <div className="mt-12 bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Access</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link 
                to="/login"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
              >
                <Icon name="LogIn" size={20} className="text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Login</p>
                  <p className="text-xs text-muted-foreground">Access existing account</p>
                </div>
              </Link>
              
              <Link 
                to="/dashboard"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
              >
                <Icon name="LayoutDashboard" size={20} className="text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Dashboard</p>
                  <p className="text-xs text-muted-foreground">System overview</p>
                </div>
              </Link>
              
              <Link 
                to="/patient-management"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
              >
                <Icon name="Users" size={20} className="text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Patients</p>
                  <p className="text-xs text-muted-foreground">Manage patient records</p>
                </div>
              </Link>
              
              <Link 
                to="/doctor-management"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
              >
                <Icon name="UserCheck" size={20} className="text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Doctors</p>
                  <p className="text-xs text-muted-foreground">Manage medical staff</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmRegistration}
        formData={formData}
        isLoading={isLoading}
      />
    </div>
  );
};

export default UserRegistration;