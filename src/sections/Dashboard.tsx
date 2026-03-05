import { useState } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { ProgressRing } from '@/components/ProgressRing';
import { EditableTable } from '@/components/EditableTable';
import { Checklist } from '@/components/Checklist';
import { ToggleBlock } from '@/components/ToggleBlock';
import { Plus, X, Pencil, Check } from 'lucide-react';
import type { SectionId } from '@/components/Sidebar';

interface DashboardProps {
  onNavigate: (id: SectionId) => void;
}

// Map phase IDs to their corresponding checklist group IDs
const phaseChecklistMap: Record<string, string> = {
  'ph1': 'etapa-diseno',
  'ph2': 'etapa-simulacion',
  'ph3': 'etapa-implementacion',
  'ph4': 'etapa-pruebas',
};

export function Dashboard({ onNavigate }: DashboardProps) {
  const {
    data, getOverallProgress, getChecklistProgress,
    updatePhase, addActivity, updateActivity, removeActivity,
    updateTeamMember, addTeamMember, removeTeamMember,
    updateTimelineStep, addTimelineStep, removeTimelineStep,
  } = useProject();
  const progress = getOverallProgress();

  // Auto-compute phase percentages from checklists
  const computedPhases = data.phases.map(phase => {
    const checklistId = phaseChecklistMap[phase.id];
    if (!checklistId) return phase;
    const { checked, total } = getChecklistProgress(checklistId);
    const percent = total > 0 ? Math.round((checked / total) * 100) : 0;
    return {
      ...phase,
      percent,
      status: percent === 100 ? 'Completado' : percent > 0 ? 'En Progreso' : 'Pendiente',
      emoji: percent === 100 ? '🟢' : percent > 0 ? '🟡' : '🔴',
    };
  });

  const [editingMember, setEditingMember] = useState<string | null>(null);
  const [newActivityText, setNewActivityText] = useState('');

  const quickLinks = [
    { emoji: '📋', label: 'Especificaciones\nClave', section: 'especificaciones' as SectionId },
    { emoji: '⚡', label: 'Diagrama\nEsquemático', section: 'diseno-circuito' as SectionId },
    { emoji: '💻', label: 'Resultados de\nSimulación', section: 'simulaciones' as SectionId },
    { emoji: '📦', label: 'Lista de\nMateriales', section: 'especificaciones' as SectionId },
    { emoji: '📅', label: 'Control de\nCambios', section: 'control-cambios' as SectionId },
    { emoji: '🎯', label: 'Objetivos\ndel Proyecto', section: 'objetivos' as SectionId },
    { emoji: '📐', label: 'Marco\nTeórico', section: 'marco-teorico' as SectionId },
    { emoji: '🔧', label: 'Implementación\ny Montaje', section: 'implementacion' as SectionId },
    { emoji: '📏', label: 'Mediciones\ny Pruebas', section: 'mediciones' as SectionId },
    { emoji: '🔍', label: 'Problemas\ny Soluciones', section: 'problemas-soluciones' as SectionId },
    { emoji: '📚', label: 'Referencias\ny Bibliografía', section: 'referencias' as SectionId },
    { emoji: '✅', label: 'Conclusiones\nFinales', section: 'conclusiones' as SectionId },
  ];

  const activityColors = { red: 'bg-destructive', yellow: 'bg-warning', blue: 'bg-info', green: 'bg-success' };
  const colorOptions: Array<{ value: 'red' | 'yellow' | 'blue' | 'green'; label: string }> = [
    { value: 'red', label: '🔴' }, { value: 'yellow', label: '🟡' },
    { value: 'blue', label: '🔵' }, { value: 'green', label: '🟢' },
  ];

  const statusCycle = { completed: 'in-progress', 'in-progress': 'pending', pending: 'completed' } as const;

  return (
    <div className="animate-fade-in">
      {/* Top: Progress + Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <ProgressRing percent={progress} />
            <div>
              <h3 className="font-semibold text-white mb-1">Progreso del Proyecto</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Basado en checklists de las 4 etapas.
              </p>
              <button onClick={() => onNavigate('objetivos')} className="text-sm text-primary hover:text-primary/80 transition-colors">
                Ver Detalles →
              </button>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">☰ Quick Links</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
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
        {/* Recent Activity - Editable */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-white mb-3">Recent Activity</h3>
          <ul className="space-y-3 mb-3">
            {data.activities.slice(0, 5).map(act => (
              <li key={act.id} className="flex items-start gap-3 group">
                <div className="flex flex-col items-center gap-1 mt-1">
                  {colorOptions.map(c => (
                    <button
                      key={c.value}
                      onClick={() => updateActivity(act.id, 'color', c.value)}
                      className={`w-3 h-3 rounded-full flex-shrink-0 transition-all ${activityColors[c.value]} ${act.color === c.value ? 'ring-2 ring-foreground scale-110' : 'opacity-0 group-hover:opacity-60 scale-75'}`}
                    />
                  ))}
                </div>
                <div className="flex-1 min-w-0">
                  <input
                    value={act.time}
                    onChange={e => updateActivity(act.id, 'time', e.target.value)}
                    className="text-xs text-muted-foreground bg-transparent border-none outline-none w-full hover:bg-secondary/30 rounded px-1 transition-colors"
                    placeholder="Fecha/hora..."
                  />
                  <input
                    value={act.text}
                    onChange={e => updateActivity(act.id, 'text', e.target.value)}
                    className="text-sm text-foreground/90 bg-transparent border-none outline-none w-full hover:bg-secondary/30 rounded px-1 transition-colors"
                    placeholder="Descripción..."
                  />
                </div>
                <button onClick={() => removeActivity(act.id)} className="opacity-0 group-hover:opacity-100 text-destructive transition-opacity">
                  <X size={14} />
                </button>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <input
              value={newActivityText}
              onChange={e => setNewActivityText(e.target.value)}
              placeholder="Nueva actividad..."
              className="flex-1 bg-secondary/30 border border-border rounded-lg px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
              onKeyDown={e => {
                if (e.key === 'Enter' && newActivityText.trim()) {
                  addActivity(newActivityText.trim(), 'green');
                  setNewActivityText('');
                }
              }}
            />
            <button
              onClick={() => { if (newActivityText.trim()) { addActivity(newActivityText.trim(), 'green'); setNewActivityText(''); } }}
              className="bg-primary text-primary-foreground rounded-lg px-3 py-1.5 text-sm"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Team Collaboration - Editable */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-white mb-3">Team Collaboration</h3>
          <div className="space-y-2 mb-4">
            {data.teamMembers.map(m => (
              <div key={m.id} className="flex items-center gap-3 group">
                <div className={`w-8 h-8 rounded-full ${m.color} flex items-center justify-center text-xs font-bold text-foreground flex-shrink-0`}>
                  {m.initials}
                </div>
                <div className="flex-1 min-w-0">
                  {editingMember === m.id ? (
                    <>
                      <input value={m.name} onChange={e => updateTeamMember(m.id, 'name', e.target.value)}
                        className="text-sm font-medium text-foreground bg-transparent border-b border-border outline-none w-full" />
                      <input value={m.role} onChange={e => updateTeamMember(m.id, 'role', e.target.value)}
                        className="text-xs text-muted-foreground bg-transparent border-b border-border outline-none w-full mt-0.5" />
                      <div className="flex gap-1 mt-1">
                        {['bg-info', 'bg-warning', 'bg-success', 'bg-destructive'].map(c => (
                          <button key={c} onClick={() => updateTeamMember(m.id, 'color', c)}
                            className={`w-4 h-4 rounded-full ${c} ${m.color === c ? 'ring-2 ring-foreground' : ''}`} />
                        ))}
                        <label className="text-xs text-muted-foreground ml-2 flex items-center gap-1">
                          <input type="checkbox" checked={!!m.isLeader} onChange={e => updateTeamMember(m.id, 'isLeader', e.target.checked)} />
                          Líder
                        </label>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-sm font-medium text-foreground">
                        {m.name}
                        {m.isLeader && <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-success/20 text-success">Líder</span>}
                      </div>
                      <div className="text-xs text-muted-foreground">{m.role}</div>
                    </>
                  )}
                </div>
                <button onClick={() => setEditingMember(editingMember === m.id ? null : m.id)}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity">
                  {editingMember === m.id ? <Check size={14} /> : <Pencil size={14} />}
                </button>
                <button onClick={() => removeTeamMember(m.id)}
                  className="opacity-0 group-hover:opacity-100 text-destructive transition-opacity">
                  <X size={14} />
                </button>
              </div>
            ))}
            <button onClick={addTeamMember} className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors mt-1">
              <Plus size={14} /> Añadir miembro
            </button>
          </div>

          {/* Timeline - Editable */}
          <div className="flex items-center gap-1 overflow-x-auto py-2">
            {data.timeline.map((step, i) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center min-w-[60px] group relative">
                  <button
                    onClick={() => updateTimelineStep(step.id, 'status', statusCycle[step.status])}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 cursor-pointer ${
                      step.status === 'completed' ? 'border-success bg-success/20 text-success' :
                      step.status === 'in-progress' ? 'border-warning bg-warning/20 text-warning' :
                      'border-border bg-secondary text-muted-foreground'
                    }`}
                  >
                    {step.status === 'completed' ? '✓' : step.status === 'in-progress' ? '⚙' : '○'}
                  </button>
                  <input
                    value={step.label}
                    onChange={e => updateTimelineStep(step.id, 'label', e.target.value)}
                    className="text-[9px] text-muted-foreground mt-1 text-center leading-tight bg-transparent border-none outline-none w-[60px]"
                  />
                  <button
                    onClick={() => removeTimelineStep(step.id)}
                    className="absolute -top-2 -right-1 opacity-0 group-hover:opacity-100 text-destructive transition-opacity"
                  >
                    <X size={10} />
                  </button>
                </div>
                {i < data.timeline.length - 1 && <div className="w-4 h-px bg-border flex-shrink-0 mt-[-12px]" />}
              </div>
            ))}
            <button onClick={addTimelineStep} className="flex-shrink-0 ml-1 w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground">
              <Plus size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20 mb-6">
        <span className="text-lg">💡</span>
        <p className="text-sm text-foreground/90">
          <strong>Progreso del proyecto:</strong> {progress}% completado basado en las checklists de las 4 etapas principales.
        </p>
      </div>

      {/* Phase Progress Cards - Editable */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {computedPhases.map(phase => (
          <div key={phase.id} className="bg-card rounded-xl border border-border p-4">
            <div className="text-sm font-medium text-white mb-2">{phase.emoji} {phase.name}</div>
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
            <div className="flex justify-between items-center text-xs">
              <span className="text-white">{phase.percent}%</span>
              <span className={
                phase.percent === 100 ? 'text-success' :
                phase.percent > 0 ? 'text-primary' : 'text-muted-foreground'
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
        <h3 className="font-semibold text-white mb-4">✅ Checklists de Verificación por Etapa</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <ToggleBlock title="ETAPA 1: DISEÑO"
              badge={<span className="text-xs px-2 py-0.5 rounded-full bg-success/20 text-success">{getChecklistProgress('etapa-diseno').checked}/{getChecklistProgress('etapa-diseno').total}</span>}
            ><Checklist groupId="etapa-diseno" /></ToggleBlock>
            <ToggleBlock title="ETAPA 2: SIMULACIÓN"
              badge={<span className="text-xs px-2 py-0.5 rounded-full bg-success/20 text-success">{getChecklistProgress('etapa-simulacion').checked}/{getChecklistProgress('etapa-simulacion').total}</span>}
            ><Checklist groupId="etapa-simulacion" /></ToggleBlock>
          </div>
          <div className="space-y-2">
            <ToggleBlock title="ETAPA 3: IMPLEMENTACIÓN"
              badge={<span className="text-xs px-2 py-0.5 rounded-full bg-warning/20 text-warning">{getChecklistProgress('etapa-implementacion').checked}/{getChecklistProgress('etapa-implementacion').total}</span>}
            ><Checklist groupId="etapa-implementacion" /></ToggleBlock>
            <ToggleBlock title="ETAPA 4: PRUEBAS"
              badge={<span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{getChecklistProgress('etapa-pruebas').checked}/{getChecklistProgress('etapa-pruebas').total}</span>}
            ><Checklist groupId="etapa-pruebas" /></ToggleBlock>
          </div>
        </div>
      </div>
    </div>
  );
}
