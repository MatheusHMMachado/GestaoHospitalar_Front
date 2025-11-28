import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustBadges = [
    {
      id: 1,
      name: 'HIPAA Compliant',
      icon: 'Shield',
      description: 'Healthcare data protection certified'
    },
    {
      id: 2,
      name: 'SSL Secured',
      icon: 'Lock',
      description: '256-bit encryption for all data'
    },
    {
      id: 3,
      name: 'SOC 2 Certified',
      icon: 'CheckCircle',
      description: 'Security and availability verified'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="text-center mb-4">
        <p className="text-xs text-muted-foreground font-medium">
          Trusted by healthcare professionals worldwide
        </p>
      </div>
      <div className="flex items-center justify-center space-x-6">
        {trustBadges?.map((badge) => (
          <div
            key={badge?.id}
            className="flex flex-col items-center space-y-1 group"
            title={badge?.description}
          >
            <div className="flex items-center justify-center w-8 h-8 bg-success-green/10 text-success-green rounded-full group-hover:bg-success-green/20 transition-colors duration-200">
              <Icon name={badge?.icon} size={14} />
            </div>
            <span className="text-xs text-muted-foreground font-medium text-center">
              {badge?.name}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Your medical data is protected with enterprise-grade security
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;