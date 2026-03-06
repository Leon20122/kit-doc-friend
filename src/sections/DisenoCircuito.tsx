import { useState } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { ToggleBlock } from '@/components/ToggleBlock';
import { Callout } from '@/components/Callout';
import { MultiImageGallery } from '@/components/MultiImageGallery';
import { EditableTable } from '@/components/EditableTable';
import { EditableNote } from '@/components/EditableNote';
import { DynamicTableBlock } from '@/components/DynamicTableBlock';
import { Plus, X, Pencil, Check } from 'lucide-react';

interface CalcSection {
  id: string;
  title: string;
  tableId: string;
  noteId?: string;
}

const DEFAULT_CALC_SECTIONS: CalcSection[] = [
  { id: 'calc-par-dif', title: 'Par Diferencial (Etapa 1)', tableId: 'diseno-par-diferencial', noteId: 'diseno-formula-iee' },
  { id: 'calc-etapa-gan', title: 'Etapa de Ganancia (Etapa 2)', tableId: 'diseno-etapa-ganancia' },
  { id: 'calc-ganancia-total', title: 'Ganancia Total Estimada', tableId: 'diseno-ganancia-total', noteId: 'diseno-ganancia-conclusion' },
];

export function DisenoCircuito() {
  const { data, updateNote, createTable } = useProject();

  const storageKey = 'diseno-calc-sections';
  const raw = data.notes[storageKey];
  const calcSections: CalcSection[] = raw ? JSON.parse(raw) : DEFAULT_CALC_SECTIONS;

  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [titleValue, setTitleValue] = useState('');
  const [showAddSection, setShowAddSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');

  const saveSections = (sections: CalcSection[]) => {
    updateNote(storageKey, JSON.stringify(sections));
  };

  const addCalcSection = () => {
    if (!newSectionTitle.trim()) return;
    const id = `calc-${Date.now()}`;
    const tableId = `diseno-dyn-${Date.now()}`;
    const noteId = `diseno-note-${Date.now()}`;
    createTable(tableId, ['Parámetro', 'Valor', 'Notas']);
    const newSection: CalcSection = { id, title: newSectionTitle.trim(), tableId, noteId };
    saveSections([...calcSections, newSection]);
    setNewSectionTitle('');
    setShowAddSection(false);
  };

  const removeCalcSection = (sectionId: string) => {
    saveSections(calcSections.filter(s => s.id !== sectionId));
  };

  const startEditTitle = (section: CalcSection) => {
    setEditingTitle(section.id);
    setTitleValue(section.title);
  };

  const confirmEditTitle = (sectionId: string) => {
    saveSections(calcSections.map(s => s.id === sectionId ? { ...s, title: titleValue } : s));
    setEditingTitle(null);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><span>⚡</span> Diseño del Circuito</h1>
        <p className="text-sm text-muted-foreground mt-1">Topología, esquemáticos y cálculos de diseño.</p>
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-3">🏗️ Topología Seleccionada</h2>
      <Callout type="info" icon="⚡">
        <strong>Arquitectura de 3 etapas con compensación Miller</strong><br/>
        Se seleccionó esta topología por su balance entre complejidad y rendimiento.
      </Callout>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-6 p-4 bg-card rounded-xl border border-border">
        {[
          'V+ ──┐\nV- ──┘\n🔀 Par Diferencial\n(Q1, Q2, Q3, Q4)',
          '📈 Emisor Común\n(Q5)\n+ Compensación (Cc)',
          '🔊 Push-Pull\n(Q6, Q7)\nClase AB',
        ].map((block, i) => (
          <div key={i} className="flex items-center gap-3">
            {i > 0 && <span className="text-primary text-xl">→</span>}
            <div className="bg-secondary rounded-lg px-4 py-3 text-center text-xs text-foreground/90 whitespace-pre-line border border-border font-mono">
              {block}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">🔢 Cálculos de Diseño</h2>

      {calcSections.map((section, idx) => (
        <ToggleBlock
          key={section.id}
          defaultOpen={idx === 0}
          title={
            editingTitle === section.id ? (
              <div className="flex items-center gap-2 flex-1" onClick={e => e.stopPropagation()}>
                <input
                  value={titleValue}
                  onChange={e => setTitleValue(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') confirmEditTitle(section.id); }}
                  className="text-sm font-medium bg-transparent border-b border-border text-foreground outline-none flex-1"
                  autoFocus
                />
                <button onClick={(e) => { e.stopPropagation(); confirmEditTitle(section.id); }} className="text-success"><Check size={14} /></button>
              </div>
            ) : (
              <div className="flex items-center gap-2 flex-1 group">
                <span>{section.title}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); startEditTitle(section); }}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground p-0.5"
                >
                  <Pencil size={12} />
                </button>
                {calcSections.length > 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); removeCalcSection(section.id); }}
                    className="opacity-0 group-hover:opacity-100 text-destructive p-0.5"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            )
          }
        >
          <EditableTable tableId={section.tableId} showAddRow={true} />
          {section.noteId && (
            <EditableNote
              noteId={section.noteId}
              placeholder="Notas o fórmulas..."
              className="font-mono text-primary bg-secondary/50 min-h-[40px] mt-3"
            />
          )}
          {section.id === 'calc-ganancia-total' && (
            <Callout type="success" icon="✅">
              <EditableNote
                noteId="diseno-ganancia-conclusion"
                placeholder="Conclusión sobre la ganancia estimada..."
                className="bg-transparent border-none min-h-[40px] p-0"
              />
            </Callout>
          )}
          <DynamicTableBlock sectionId={`${section.tableId}-extra`} />
        </ToggleBlock>
      ))}

      {showAddSection ? (
        <div className="flex items-center gap-2 p-3 mb-4 border border-dashed border-border rounded-lg">
          <input
            value={newSectionTitle}
            onChange={e => setNewSectionTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addCalcSection()}
            placeholder="Nombre de la sección..."
            className="flex-1 text-sm bg-transparent border-b border-border text-foreground outline-none placeholder:text-muted-foreground/50"
            autoFocus
          />
          <button onClick={addCalcSection} className="text-xs text-primary hover:text-primary/80 font-medium">Crear</button>
          <button onClick={() => { setShowAddSection(false); setNewSectionTitle(''); }} className="text-xs text-muted-foreground hover:text-foreground">Cancelar</button>
        </div>
      ) : (
        <button
          onClick={() => setShowAddSection(true)}
          className="w-full flex items-center justify-center gap-2 py-2 mb-4 rounded-lg border border-dashed border-border hover:border-primary/50 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Plus size={14} /> Añadir nueva sección de cálculo
        </button>
      )}

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">📷 Esquemático Completo</h2>
      <MultiImageGallery sectionId="diseno-esquematico" columns={1} placeholder="Añadir esquemático completo" defaultLabel="Esquemático completo" showDate />

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-foreground mb-2">Esquemáticos por Etapa</h3>
        <MultiImageGallery sectionId="diseno-etapas" columns={2} placeholder="Añadir esquemático de etapa" defaultLabel="Esquemático de etapa" showDate />
      </div>
    </div>
  );
}
