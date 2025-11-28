import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, formData, isLoading }) => {
  if (!isOpen) return null;

  const getRoleDisplayName = (role) => {
    const roleNames = {
      administrator: 'Administrator',
      doctor: 'Doctor',
      nurse: 'Nurse',
      receptionist: 'Receptionist'
    };
    return roleNames?.[role] || role;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-xl max-w-md w-full animate-fade-in">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
              <Icon name="UserPlus" size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Confirm Account Creation</h3>
              <p className="text-sm text-muted-foreground">Review the details before creating the account</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-muted-foreground">Name:</span>
                <span className="text-sm text-foreground">{formData?.firstName} {formData?.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-muted-foreground">Email:</span>
                <span className="text-sm text-foreground">{formData?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-muted-foreground">Role:</span>
                <span className="text-sm text-foreground">{getRoleDisplayName(formData?.role)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-muted-foreground">Department:</span>
                <span className="text-sm text-foreground capitalize">{formData?.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-muted-foreground">Employee ID:</span>
                <span className="text-sm text-foreground">{formData?.employeeId}</span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-900">Important Notes</p>
                  <ul className="text-xs text-amber-700 mt-1 space-y-1">
                    <li>• A verification email will be sent to the provided email address</li>
                    <li>• The user will need to verify their email before first login</li>
                    <li>• Account permissions are based on the selected role</li>
                    <li>• This action cannot be undone without administrator intervention</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={onConfirm}
              loading={isLoading}
              iconName="Check"
              iconPosition="left"
              className="flex-1"
            >
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;