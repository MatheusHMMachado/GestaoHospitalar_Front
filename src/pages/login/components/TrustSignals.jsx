import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustBadges = [
    {
      id: 1,
      name: 'HIPAA Compliant',
      icon: 'Shield',
      description: 'Certificado para conformidade com HIPAA para proteção de dados de saúde'
    },
    {
      id: 2,
      name: 'SSL Secured',
      icon: 'Lock',
      description: 'Encriptação de 256 bits ativa para todos os dados'
    },
    {
      id: 3,
      name: 'SOC 2 Certified',
      icon: 'CheckCircle',
      description: 'Segurança e privacidade de dados auditadas'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="text-center mb-4">
        <p className="text-xs text-muted-foreground font-medium">
          Aprovado por profissionais de saúde em todo o mundo.
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
          Seus dados médicos estão protegidos com segurança de nível empresarial.
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;