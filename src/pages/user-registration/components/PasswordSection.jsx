import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PasswordSection = ({ formData, errors, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let score = 0;
    if (password?.length >= 8) score++;
    if (/[a-z]/?.test(password)) score++;
    if (/[A-Z]/?.test(password)) score++;
    if (/\d/?.test(password)) score++;
    if (/[^a-zA-Z\d]/?.test(password)) score++;

    const strengthLevels = [
      { strength: 0, label: 'Very Weak', color: 'bg-red-500' },
      { strength: 1, label: 'Weak', color: 'bg-red-400' },
      { strength: 2, label: 'Fair', color: 'bg-yellow-500' },
      { strength: 3, label: 'Good', color: 'bg-blue-500' },
      { strength: 4, label: 'Strong', color: 'bg-green-500' },
      { strength: 5, label: 'Very Strong', color: 'bg-green-600' }
    ];

    return strengthLevels?.[score];
  };

  const passwordStrength = getPasswordStrength(formData?.password);

  const passwordRequirements = [
    { met: formData?.password?.length >= 8, text: 'At least 8 characters' },
    { met: /[a-z]/?.test(formData?.password), text: 'One lowercase letter' },
    { met: /[A-Z]/?.test(formData?.password), text: 'One uppercase letter' },
    { met: /\d/?.test(formData?.password), text: 'One number' },
    { met: /[^a-zA-Z\d]/?.test(formData?.password), text: 'One special character' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Security Credentials
      </h3>
      <div className="space-y-4">
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={onChange}
            error={errors?.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-8 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
          </button>
        </div>

        {formData?.password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Password Strength:</span>
              <span className={`font-medium ${
                passwordStrength?.strength >= 3 ? 'text-green-600' : 
                passwordStrength?.strength >= 2 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {passwordStrength?.label}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${passwordStrength?.color}`}
                style={{ width: `${(passwordStrength?.strength / 5) * 100}%` }}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
              {passwordRequirements?.map((req, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon 
                    name={req?.met ? "Check" : "X"} 
                    size={12} 
                    className={req?.met ? "text-green-600" : "text-red-500"}
                  />
                  <span className={req?.met ? "text-green-600" : "text-muted-foreground"}>
                    {req?.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData?.confirmPassword}
            onChange={onChange}
            error={errors?.confirmPassword}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-8 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordSection;