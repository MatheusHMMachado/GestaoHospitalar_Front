import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScheduleConflicts = ({ conflicts, onResolveConflict }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-alert-red';
      case 'Medium':
        return 'text-caution-amber';
      case 'Low':
        return 'text-success-green';
      default:
        return 'text-muted-foreground';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 border-red-200';
      case 'Medium':
        return 'bg-amber-100 border-amber-200';
      case 'Low':
        return 'bg-emerald-100 border-emerald-200';
      default:
        return 'bg-slate-100 border-slate-200';
    }
  };

  return (
    <div className="medical-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-foreground">Schedule Conflicts</h3>
          {conflicts?.length > 0 && (
            <span className="flex items-center justify-center w-6 h-6 bg-alert-red text-white text-xs font-semibold rounded-full">
              {conflicts?.length}
            </span>
          )}
        </div>
        <Icon name="AlertTriangle" size={20} className="text-caution-amber" />
      </div>
      {conflicts?.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="CheckCircle" size={48} className="text-success-green mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No scheduling conflicts detected</p>
        </div>
      ) : (
        <div className="space-y-4">
          {conflicts?.map((conflict) => (
            <div key={conflict?.id} className={`p-4 rounded-lg border ${getPriorityBg(conflict?.priority)}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-sm font-medium text-foreground">{conflict?.doctor}</p>
                    <span className={`text-xs font-semibold ${getPriorityColor(conflict?.priority)}`}>
                      {conflict?.priority} Priority
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{conflict?.department}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Conflict Time</p>
                  <p className="text-sm font-medium text-foreground">{conflict?.time}</p>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-sm text-foreground mb-1">{conflict?.description}</p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>{conflict?.date}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Users" size={12} />
                    <span>{conflict?.affectedPatients} patients affected</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Suggested: {conflict?.suggestion}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="CheckCircle"
                  iconPosition="left"
                  onClick={() => onResolveConflict(conflict?.id)}
                >
                  Resolve
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {conflicts?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <Button
            variant="secondary"
            size="sm"
            iconName="Calendar"
            iconPosition="left"
            fullWidth
          >
            View Full Schedule
          </Button>
        </div>
      )}
    </div>
  );
};

export default ScheduleConflicts;