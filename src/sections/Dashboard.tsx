import { useProject } from '@/contexts/ProjectContext';
import { ProgressRing } from '@/components/ProgressRing';
import { EditableTable } from '@/components/EditableTable';
import { Checklist } from '@/components/Checklist';
import { ToggleBlock } from '@/components/ToggleBlock';
import type { SectionId } from '@/components/Sidebar';

interface DashboardProps {
  onNavigate: (id: SectionId) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { data, getOverallProgress, getChecklistProgress } = useProject();
  const progress = getOverallProgress();

  const quickLinks = [
    { emoji: '📋', label: 'Especificaciones\nClave', section: 'especificaciones' as SectionId },
    { emoji: '⚡', label: 'Diagrama\nEsquemático', section: 'diseno-circuito' as SectionId },
    { emoji: '💻', label: 'Resultados de\nSimulación', section: 'simulaciones' as SectionId },
    { emoji: '📦', label: 'Lista de\nMateriales', section: 'especificaciones' as SectionId },
    { emoji: '📅', label: 'Control de\nCambios', section: 'control-cambios' as SectionId },
  ];

  const timeline = [
    { label: 'Inicio', status: 'completed' },
    { label: 'Investigación', status: 'completed' },
    { label: 'Diseño', status: 'completed' },
    { label: 'Simulación', status: 'completed' },
    { label: 'Implementación', status: 'in-progress' },
    { label: 'Pruebas y Mediciones', status: 'pending' },
    { label: 'Entrega Final', status: 'pending' },
  ];

  const activityColors = { red: 'bg-destructive', yellow: 'bg-warning', blue: 'bg-info', green: 'bg-success' };

  return (
    <div className="animate-fade-in">
      {/* Top: Progress + Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <ProgressRing percent={progress} />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Progreso del Proyecto</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Diseño y Simulaciones finalizados.<br />Implementación en curso.
              </p>
              <button onClick={() => onNavigate('objetivos')} className="text-sm text-primary hover:text-primary/80 transition-colors">
                Ver Detalles →
              </button>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">☰ Quick Links</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {quickLinks.map((link, i) => (
              <button
                key={i}
                onClick={() => onNavigate(link.section)}
                className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-center"
              >
                <span className="text-2xl">{link.emoji}</span>
                <span className="text-xs text-muted-foreground whitespace-pre-line leading-tight">{link.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Activity + Team */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-3">Recent Activity</h3>
          <ul className="space-y-3">
            {data.activities.slice(0, 5).map(act => (
              <li key={act.id} className="flex items-start gap-3">
                <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${activityColors[act.color]}`} />
                <div>
                  <div className="text-xs text-muted-foreground">{act.time}</div>
                  <div className="text-sm text-foreground/90">{act.text}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-3">Team Collaboration</h3>
          <div className="space-y-2 mb-4">
            {[
              { initials: 'AG', name: 'Alejandro G.', role: 'Diseño y Coordinación', color: 'bg-info', isLeader: true },
              { initials: 'ML', name: 'María L.', role: 'Simulación y Análisis', color: 'bg-warning' },
              { initials: 'CR', name: 'Carlos R.', role: 'Implementación PCB', color: 'bg-success' },
            ].map(m => (
              <div key={m.initials} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${m.color} flex items-center justify-center text-xs font-bold text-foreground`}>
                  {m.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {m.name}
                    {m.isLeader && <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-success/20 text-success">Líder</span>}
                  </div>
                  <div className="text-xs text-muted-foreground">{m.role}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="flex items-center gap-1 overflow-x-auto py-2">
            {timeline.map((step, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center min-w-[60px]">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 ${
                    step.status === 'completed' ? 'border-success bg-success/20 text-success' :
                    step.status === 'in-progress' ? 'border-warning bg-warning/20 text-warning' :
                    'border-border bg-secondary text-muted-foreground'
                  }`}>
                    {step.status === 'completed' ? '✓' : step.status === 'in-progress' ? '⚙' : '○'}
                  </div>
                  <span className="text-[9px] text-muted-foreground mt-1 text-center leading-tight">{step.label}</span>
                </div>
                {i < timeline.length - 1 && <div className="w-4 h-px bg-border flex-shrink-0 mt-[-12px]" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20 mb-6">
        <span className="text-lg">💡</span>
        <p className="text-sm text-foreground/90">
          <strong>Progreso del proyecto:</strong> Diseño y simulaciones terminadas exitosamente. Se cumple con los parámetros objetivo. Actualmente en fase de implementación física del circuito en protoboard. Esquemático finalizado v2.1.
        </p>
      </div>

      {/* Phase Progress Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {data.phases.map(phase => (
          <div key={phase.id} className="bg-card rounded-xl border border-border p-4">
            <div className="text-sm font-medium text-foreground mb-2">{phase.emoji} {phase.name}</div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden mb-1">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${phase.percent}%`,
                  background: phase.percent === 100
                    ? 'hsl(var(--success))'
                    : phase.percent > 0
                    ? 'linear-gradient(90deg, hsl(var(--primary)), hsl(43 100% 49%))'
                    : 'transparent',
                }}
              />
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">{phase.percent}%</span>
              <span className={
                phase.percent === 100 ? 'text-success' :
                phase.percent > 0 ? 'text-primary' : 'text-pending'
              }>{phase.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Spec + Changelog tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-card rounded-xl border border-border p-5">
          <EditableTable tableId="specs-dashboard" title="⚙ Tabla de Especificaciones" />
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <EditableTable tableId="changelog" title="⚙ Control de Cambios (Changelog)" />
        </div>
      </div>

      {/* Checklists */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-semibold text-foreground mb-4">✅ Checklists de Verificación por Etapa</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <ToggleBlock
              title="ETAPA 1: DISEÑO"
              badge={<span className="text-xs px-2 py-0.5 rounded-full bg-success/20 text-success">{getChecklistProgress('etapa-diseno').checked}/{getChecklistProgress('etapa-diseno').total}</span>}
            >
              <Checklist groupId="etapa-diseno" />
            </ToggleBlock>
            <ToggleBlock
              title="ETAPA 2: SIMULACIÓN"
              badge={<span className="text-xs px-2 py-0.5 rounded-full bg-success/20 text-success">{getChecklistProgress('etapa-simulacion').checked}/{getChecklistProgress('etapa-simulacion').total}</span>}
            >
              <Checklist groupId="etapa-simulacion" />
            </ToggleBlock>
          </div>
          <div className="space-y-2">
            <ToggleBlock
              title="ETAPA 3: IMPLEMENTACIÓN"
              badge={<span className="text-xs px-2 py-0.5 rounded-full bg-warning/20 text-warning">{getChecklistProgress('etapa-implementacion').checked}/{getChecklistProgress('etapa-implementacion').total}</span>}
            >
              <Checklist groupId="etapa-implementacion" />
            </ToggleBlock>
            <ToggleBlock
              title="ETAPA 4: PRUEBAS"
              badge={<span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{getChecklistProgress('etapa-pruebas').checked}/{getChecklistProgress('etapa-pruebas').total}</span>}
            >
              <Checklist groupId="etapa-pruebas" />
            </ToggleBlock>
          </div>
        </div>
      </div>
    </div>
  );
}
