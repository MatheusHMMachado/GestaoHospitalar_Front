import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SessionWarning = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show session warning after 3 seconds to simulate real-world scenario
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
      <div className="flex items-start space-x-3">
        <Icon name="Clock" size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="text-sm font-medium text-amber-800 mb-1">
            Session Security Notice
          </h4>
          <p className="text-xs text-amber-700 leading-relaxed">
            For your security, sessions will automatically expire after 30 minutes of inactivity. 
            Please save your work regularly and log out when finished.
          </p>
          <div className="mt-2 flex items-center space-x-4 text-xs text-amber-600">
            <span className="flex items-center space-x-1">
              <Icon name="Shield" size={12} />
              <span>Auto-logout enabled</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="Save" size={12} />
              <span>Save work frequently</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionWarning;