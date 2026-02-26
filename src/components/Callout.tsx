import type { ReactNode } from 'react';

interface CalloutProps {
  type: 'info' | 'success' | 'error' | 'warning';
  icon?: string;
  children: ReactNode;
}

const styles = {
  info: 'border-info/30 bg-info/5',
  success: 'border-success/30 bg-success/5',
  error: 'border-destructive/30 bg-destructive/5',
  warning: 'border-warning/30 bg-warning/5',
};

export function Callout({ type, icon, children }: CalloutProps) {
  return (
    <div className={`flex gap-3 p-4 rounded-lg border ${styles[type]} mb-4`}>
      {icon && <span className="text-lg flex-shrink-0">{icon}</span>}
      <div className="text-sm text-foreground/90 leading-relaxed">{children}</div>
    </div>
  );
}
