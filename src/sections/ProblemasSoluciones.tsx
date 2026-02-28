import { useState } from 'react';
import { EditableTable } from '@/components/EditableTable';
import { EditableNote } from '@/components/EditableNote';
import { ToggleBlock } from '@/components/ToggleBlock';
import { Callout } from '@/components/Callout';
import { useProject } from '@/contexts/ProjectContext';
import { Plus, X, Pencil, Check } from 'lucide-react';

interface Problem {
  id: string;
  title: string;
  date: string;
  symptom: string;
  diagnosis: string;
  rootCause: string;
  solution: string;
  lesson: string;
}

export function ProblemasSoluciones() {
  const { data, updateNote } = useProject();
  const storageKey = 'problems-list';
  const raw = data.notes[storageKey];
  
  const defaultProblems: Problem[] = [
    { id: 'p1', title: 'Problema #001: Salida Saturada', date: '2023-10-18', symptom: 'La salida del op-amp estaba permanentemente saturada a Vcc+ (~14.3V) sin señal de entrada aplicada.', diagnosis: 'Se midió la tensión en los colectores de Q1 y Q2. Se encontró una diferencia de 1.2V.', rootCause: 'Los transistores Q1 y Q2 tenían β significativamente diferentes (Q1: β=180, Q2: β=240).', solution: 'Se reemplazaron Q1 y Q2 por un par con β más cercano (Q1: β=210, Q2: β=215). El offset se redujo a <5mV.', lesson: 'Siempre emparejar los transistores del par diferencial midiendo β antes del montaje.' },
    { id: 'p2', title: 'Problema #002: Oscilaciones a Alta Frecuencia', date: '2023-10-20', symptom: 'Se observaban oscilaciones de ~5MHz superpuestas a la señal de salida.', diagnosis: '', rootCause: 'Sin compensación de frecuencia, margen de fase insuficiente.', solution: 'Se agregó capacitor de compensación Miller (Cc = 33pF), logrando margen de fase de 62°.', lesson: '' },
  ];

  const problems: Problem[] = raw ? JSON.parse(raw) : defaultProblems;
  const save = (p: Problem[]) => updateNote(storageKey, JSON.stringify(p));

  const [editingId, setEditingId] = useState<string | null>(null);

  const updateProblem = (id: string, field: keyof Problem, value: string) => {
    save(problems.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addProblem = () => {
    save([...problems, { id: `p-${Date.now()}`, title: `Problema #${String(problems.length + 1).padStart(3, '0')}: Nuevo Problema`, date: new Date().toISOString().split('T')[0], symptom: '', diagnosis: '', rootCause: '', solution: '', lesson: '' }]);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><span>🔧</span> Problemas y Soluciones</h1>
        <p className="text-sm text-muted-foreground mt-1">Registro de troubleshooting y lecciones aprendidas.</p>
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-3">📋 Registro de Troubleshooting</h2>
      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <EditableTable tableId="troubleshooting" />
      </div>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">📝 Detalle de Problemas</h2>

      {problems.map((prob) => (
        <ToggleBlock key={prob.id} title={
          editingId === prob.id ? (
            <input value={prob.title} onChange={e => updateProblem(prob.id, 'title', e.target.value)}
              className="bg-transparent border-b border-border text-foreground outline-none w-full text-sm font-semibold"
              onClick={e => e.stopPropagation()} />
          ) : prob.title
        } defaultOpen={prob.id === 'p1'}
          badge={
            <div className="flex items-center gap-1">
              <button onClick={(e) => { e.stopPropagation(); setEditingId(editingId === prob.id ? null : prob.id); }} className="text-muted-foreground hover:text-foreground">
                {editingId === prob.id ? <Check size={14} /> : <Pencil size={14} />}
              </button>
              <button onClick={(e) => { e.stopPropagation(); save(problems.filter(p => p.id !== prob.id)); }} className="text-destructive"><X size={14} /></button>
            </div>
          }
        >
          <div className="space-y-2">
            <p className="text-sm text-foreground/80">📅 <strong>Fecha:</strong>{' '}
              <input value={prob.date} onChange={e => updateProblem(prob.id, 'date', e.target.value)}
                className="bg-transparent border-b border-border text-foreground/80 outline-none text-sm w-32" />
            </p>
            <Callout type="error" icon="🔴">
              <strong>Síntoma:</strong>{' '}
              <input value={prob.symptom} onChange={e => updateProblem(prob.id, 'symptom', e.target.value)}
                className="bg-transparent border-none text-foreground outline-none text-sm w-full" />
            </Callout>
            {(prob.diagnosis || editingId === prob.id) && (
              <p className="text-sm text-foreground/80">🔍 <strong>Diagnóstico:</strong>{' '}
                <input value={prob.diagnosis} onChange={e => updateProblem(prob.id, 'diagnosis', e.target.value)}
                  className="bg-transparent border-b border-border text-foreground/80 outline-none text-sm w-full" />
              </p>
            )}
            <p className="text-sm text-foreground/80">💡 <strong>Causa raíz:</strong>{' '}
              <input value={prob.rootCause} onChange={e => updateProblem(prob.id, 'rootCause', e.target.value)}
                className="bg-transparent border-b border-border text-foreground/80 outline-none text-sm w-full" />
            </p>
            <Callout type="success" icon="✅">
              <strong>Solución:</strong>{' '}
              <input value={prob.solution} onChange={e => updateProblem(prob.id, 'solution', e.target.value)}
                className="bg-transparent border-none text-foreground outline-none text-sm w-full" />
            </Callout>
            {(prob.lesson || editingId === prob.id) && (
              <p className="text-sm text-foreground/80">📝 <strong>Lección:</strong>{' '}
                <input value={prob.lesson} onChange={e => updateProblem(prob.id, 'lesson', e.target.value)}
                  className="bg-transparent border-b border-border text-foreground/80 outline-none text-sm w-full" />
              </p>
            )}
          </div>
        </ToggleBlock>
      ))}

      <button onClick={addProblem} className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 mt-3 mb-6">
        <Plus size={16} /> Añadir nuevo problema
      </button>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">📖 Problemas Comunes en Op-Amps (Referencia)</h2>
      <div className="bg-card rounded-xl border border-border p-5">
        <EditableTable tableId="problemas-comunes" />
      </div>
    </div>
  );
}
