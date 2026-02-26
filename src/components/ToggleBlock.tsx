import { useState, type ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

interface ToggleBlockProps {
  title: string;
  defaultOpen?: boolean;
  badge?: ReactNode;
  children: ReactNode;
}

export function ToggleBlock({ title, defaultOpen = false, badge, children }: ToggleBlockProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-border rounded-lg mb-2 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary/30 transition-colors"
      >
        <ChevronRight
          size={16}
          className={`text-muted-foreground transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
        />
        <span className="flex-1 text-left">{title}</span>
        {badge}
      </button>
      {open && (
        <div className="px-4 pb-4 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}
