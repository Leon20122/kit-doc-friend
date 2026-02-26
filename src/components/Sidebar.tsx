import { useState, useMemo } from 'react';
import { Search, Menu, X } from 'lucide-react';

export type SectionId =
  | 'dashboard' | 'objetivos' | 'marco-teorico' | 'especificaciones'
  | 'diseno-circuito' | 'simulaciones' | 'implementacion' | 'mediciones'
  | 'problemas-soluciones' | 'conclusiones' | 'referencias' | 'control-cambios';

interface NavItem {
  id: SectionId;
  label: string;
  emoji: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', emoji: '🏠' },
  { id: 'objetivos', label: 'Objetivos', emoji: '🎯' },
  { id: 'marco-teorico', label: 'Marco Teórico', emoji: '📖' },
  { id: 'especificaciones', label: 'Especificaciones', emoji: '📐' },
  { id: 'diseno-circuito', label: 'Diseño del Circuito', emoji: '⚡' },
  { id: 'simulaciones', label: 'Simulaciones', emoji: '💻' },
  { id: 'implementacion', label: 'Implementación', emoji: '🔨' },
  { id: 'mediciones', label: 'Mediciones', emoji: '📊' },
  { id: 'problemas-soluciones', label: 'Problemas y Soluciones', emoji: '🔧' },
  { id: 'conclusiones', label: 'Conclusiones', emoji: '✅' },
  { id: 'referencias', label: 'Referencias', emoji: '📚' },
  { id: 'control-cambios', label: 'Control de Cambios', emoji: '📝' },
];

const favorites: SectionId[] = ['objetivos', 'marco-teorico', 'especificaciones', 'conclusiones', 'referencias'];

interface SidebarProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}

export function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!search) return navItems;
    return navItems.filter(i => i.label.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const handleNav = (id: SectionId) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <>
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" className="w-5 h-5">
              <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z"/>
              <circle cx="17" cy="17" r="3"/>
            </svg>
          </div>
          <span className="font-semibold text-sidebar-accent-foreground text-sm">Workspace</span>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-sidebar-accent border-none rounded-md pl-8 pr-3 py-1.5 text-xs text-sidebar-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold px-3 py-2">
          Proyecto Académico
        </div>
        {filtered.map(item => (
          <button
            key={item.id}
            onClick={() => handleNav(item.id)}
            className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors mb-0.5 text-left ${
              activeSection === item.id
                ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
            }`}
          >
            <span className="text-base">{item.emoji}</span>
            <span>{item.label}</span>
          </button>
        ))}

        {!search && (
          <>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold px-3 py-2 mt-4">
              Favoritos
            </div>
            {navItems
              .filter(i => favorites.includes(i.id))
              .map(item => (
                <button
                  key={`fav-${item.id}`}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors mb-0.5 text-left ${
                    activeSection === item.id
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                  }`}
                >
                  <span className="text-base">{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              ))}
          </>
        )}
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-3 left-3 z-50 lg:hidden bg-card border border-border rounded-lg p-2 text-foreground shadow-lg"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
