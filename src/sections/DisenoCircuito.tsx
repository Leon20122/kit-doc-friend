import { useState, useCallback } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { ToggleBlock } from '@/components/ToggleBlock';
import { MultiImageGallery } from '@/components/MultiImageGallery';
import { EditableTable } from '@/components/EditableTable';
import { EditableNote } from '@/components/EditableNote';
import { DynamicTableBlock } from '@/components/DynamicTableBlock';
import { Plus, X, Pencil, Check, ChevronUp, ChevronDown } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CalcSection {
  id: string;
  title: string;
  tableId: string;
  noteId?: string;
}

interface VisualBlock {
  id: string;
  label: string;
  icon: string;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_CALC_SECTIONS: CalcSection[] = [
  { id: 'calc-referencia',    title: 'Etapa de Referencia',          tableId: 'diseno-referencia',    noteId: 'diseno-note-referencia' },
  { id: 'calc-espejo',        title: 'Etapa Espejo de Corriente',    tableId: 'diseno-espejo',         noteId: 'diseno-note-espejo' },
  { id: 'calc-par-dif',       title: 'Etapa Par Diferencial',        tableId: 'diseno-par-diferencial', noteId: 'diseno-formula-iee' },
  { id: 'calc-etapa-final',   title: 'Etapa Final',                  tableId: 'diseno-etapa-final',    noteId: 'diseno-note-final' },
];

const DEFAULT_VISUAL_BLOCKS: VisualBlock[] = [
  { id: 'vb-1', label: 'Etapa de Referencia',       icon: '🔋' },
  { id: 'vb-2', label: 'Etapa Espejo de Corriente', icon: '🪞' },
  { id: 'vb-3', label: 'Etapa Par Diferencial',     icon: '🔀' },
  { id: 'vb-4', label: 'Etapa Final',               icon: '🔊' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function DisenoCircuito() {
  const { data, updateNote, createTable } = useProject();

  // ── Persist calc sections in project notes ──
  const SECTIONS_KEY = 'diseno-calc-sections';
  const raw = data.notes[SECTIONS_KEY];
  const calcSections: CalcSection[] = raw ? (JSON.parse(raw) as CalcSection[]) : DEFAULT_CALC_SECTIONS;

  const saveSections = useCallback(
    (sections: CalcSection[]) => updateNote(SECTIONS_KEY, JSON.stringify(sections)),
    [updateNote]
  );

  // ── Visual blocks (local state) ──
  const [visualBlocks, setVisualBlocks] = useState<VisualBlock[]>(DEFAULT_VISUAL_BLOCKS);
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const [blockLabelValue, setBlockLabelValue] = useState<string>('');

  // ── Section title ──
  const [sectionTitle, setSectionTitle] = useState<string>('Etapas de Diseño');
  const [editingSectionTitle, setEditingSectionTitle] = useState<boolean>(false);
  const [sectionTitleDraft, setSectionTitleDraft] = useState<string>('');

  // ── Section description (editable text block) ──
  const [sectionDescription, setSectionDescription] = useState<string>('');

  // ── Calc section title editing ──
  const [editingCalcTitle, setEditingCalcTitle] = useState<string | null>(null);
  const [calcTitleValue, setCalcTitleValue] = useState<string>('');

  // ── Add section UI ──
  const [showAddSection, setShowAddSection] = useState<boolean>(false);
  const [newSectionTitle, setNewSectionTitle] = useState<string>('');

  // ─── Visual block handlers ────────────────────────────────────────────────

  const startEditBlock = (block: VisualBlock) => {
    setEditingBlockId(block.id);
    setBlockLabelValue(block.label);
  };

  const confirmEditBlock = (id: string) => {
    setVisualBlocks(prev =>
      prev.map(b => (b.id === id ? { ...b, label: blockLabelValue } : b))
    );
    setEditingBlockId(null);
  };

  // ─── Calc section handlers ────────────────────────────────────────────────

  const addCalcSection = () => {
    if (!newSectionTitle.trim()) return;
    const id = `calc-${Date.now()}`;
    const tableId = `diseno-dyn-${Date.now()}`;
    const noteId = `diseno-note-${Date.now()}`;
    createTable(tableId, ['Parámetro', 'Valor', 'Notas']);
    saveSections([...calcSections, { id, title: newSectionTitle.trim(), tableId, noteId }]);
    setNewSectionTitle('');
    setShowAddSection(false);
  };

  const removeCalcSection = (sectionId: string) => {
    saveSections(calcSections.filter(s => s.id !== sectionId));
  };

  const startEditCalcTitle = (section: CalcSection) => {
    setEditingCalcTitle(section.id);
    setCalcTitleValue(section.title);
  };

  const confirmEditCalcTitle = (sectionId: string) => {
    saveSections(calcSections.map(s => (s.id === sectionId ? { ...s, title: calcTitleValue } : s)));
    setEditingCalcTitle(null);
  };

  // ─── Move section up/down (sortable) ─────────────────────────────────────

  const moveSectionUp = (idx: number) => {
    if (idx === 0) return;
    const updated = [...calcSections];
    [updated[idx - 1], updated[idx]] = [updated[idx], updated[idx - 1]];
    saveSections(updated);
  };

  const moveSectionDown = (idx: number) => {
    if (idx === calcSections.length - 1) return;
    const updated = [...calcSections];
    [updated[idx], updated[idx + 1]] = [updated[idx + 1], updated[idx]];
    saveSections(updated);
  };

  // ─── Section title editing ────────────────────────────────────────────────

  const startEditSectionTitle = () => {
    setSectionTitleDraft(sectionTitle);
    setEditingSectionTitle(true);
  };

  const confirmEditSectionTitle = () => {
    if (sectionTitleDraft.trim()) setSectionTitle(sectionTitleDraft.trim());
    setEditingSectionTitle(false);
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <span>⚡</span> Diseño del Circuito
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Topología, esquemáticos y cálculos de diseño.
        </p>
      </div>

      {/* Topología */}
      <h2 className="text-lg font-semibold text-foreground mb-3">🏗️ Topología Seleccionada</h2>

      {/* Visual blocks — 4 stages, editable labels */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6 p-4 bg-card rounded-xl border border-border">
        {visualBlocks.map((block, i) => (
          <div key={block.id} className="flex items-center gap-3">
            {i > 0 && <span className="text-primary text-xl">→</span>}
            <div className="group relative bg-secondary rounded-lg px-4 py-3 text-center border border-border min-w-[120px]">
              <div className="text-lg mb-1">{block.icon}</div>

              {editingBlockId === block.id ? (
                <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                  <input
                    value={blockLabelValue}
                    onChange={e => setBlockLabelValue(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') confirmEditBlock(block.id); }}
                    className="text-xs bg-transparent border-b border-primary text-foreground outline-none w-full text-center"
                    autoFocus
                  />
                  <button
                    onClick={() => confirmEditBlock(block.id)}
                    className="text-success"
                  >
                    <Check size={12} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1">
                  <span className="text-xs text-foreground/90 whitespace-pre-line text-center leading-tight">
                    {block.label}
                  </span>
                  <button
                    onClick={() => startEditBlock(block)}
                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity"
                  >
                    <Pencil size={10} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full h-px bg-border my-6" />

      {/* Section title — editable */}
      <div className="flex items-center gap-2 mb-2 group">
        {editingSectionTitle ? (
          <>
            <input
              value={sectionTitleDraft}
              onChange={e => setSectionTitleDraft(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') confirmEditSectionTitle(); }}
              className="text-lg font-semibold bg-transparent border-b border-primary text-foreground outline-none flex-1"
              autoFocus
            />
            <button onClick={confirmEditSectionTitle} className="text-success">
              <Check size={15} />
            </button>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-foreground">🔢 {sectionTitle}</h2>
            <button
              onClick={startEditSectionTitle}
              className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity"
            >
              <Pencil size={13} />
            </button>
          </>
        )}
      </div>

      {/* Editable text block under section title */}
      <textarea
        value={sectionDescription}
        onChange={e => setSectionDescription(e.target.value)}
        placeholder="Descripción general de las etapas de diseño..."
        rows={3}
        className="w-full mb-4 bg-secondary/30 rounded-lg border border-border px-4 py-2 text-sm text-foreground/90 placeholder:text-muted-foreground/50 outline-none resize-y leading-relaxed focus:border-primary transition-colors"
      />

      {/* Calc sections — sortable */}
      {calcSections.map((section, idx) => (
        <div key={section.id} className="flex items-start gap-2 mb-1">
          {/* Sort controls */}
          <div className="flex flex-col gap-0.5 pt-3 shrink-0">
            <button
              onClick={() => moveSectionUp(idx)}
              disabled={idx === 0}
              className="text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"
              title="Mover arriba"
            >
              <ChevronUp size={14} />
            </button>
            <button
              onClick={() => moveSectionDown(idx)}
              disabled={idx === calcSections.length - 1}
              className="text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"
              title="Mover abajo"
            >
              <ChevronDown size={14} />
            </button>
          </div>

          {/* Toggle block */}
          <div className="flex-1">
            <ToggleBlock
              defaultOpen={idx === 0}
              title={
                editingCalcTitle === section.id ? (
                  <div className="flex items-center gap-2 flex-1" onClick={e => e.stopPropagation()}>
                    <input
                      value={calcTitleValue}
                      onChange={e => setCalcTitleValue(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') confirmEditCalcTitle(section.id);
                      }}
                      className="text-sm font-medium bg-transparent border-b border-border text-foreground outline-none flex-1"
                      autoFocus
                    />
                    <button
                      onClick={e => { e.stopPropagation(); confirmEditCalcTitle(section.id); }}
                      className="text-success"
                    >
                      <Check size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 flex-1 group/title">
                    <span>{section.title}</span>
                    <button
                      onClick={e => { e.stopPropagation(); startEditCalcTitle(section); }}
                      className="opacity-0 group-hover/title:opacity-100 text-muted-foreground hover:text-foreground p-0.5 transition-opacity"
                    >
                      <Pencil size={12} />
                    </button>
                    {calcSections.length > 1 && (
                      <button
                        onClick={e => { e.stopPropagation(); removeCalcSection(section.id); }}
                        className="opacity-0 group-hover/title:opacity-100 text-destructive p-0.5 transition-opacity"
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
              <DynamicTableBlock sectionId={`${section.tableId}-extra`} />
            </ToggleBlock>
          </div>
        </div>
      ))}

      {/* Add section */}
      {showAddSection ? (
        <div className="flex items-center gap-2 p-3 mb-4 border border-dashed border-border rounded-lg ml-8">
          <input
            value={newSectionTitle}
            onChange={e => setNewSectionTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addCalcSection()}
            placeholder="Nombre de la nueva etapa..."
            className="flex-1 text-sm bg-transparent border-b border-border text-foreground outline-none placeholder:text-muted-foreground/50"
            autoFocus
          />
          <button
            onClick={addCalcSection}
            className="text-xs text-primary hover:text-primary/80 font-medium"
          >
            Crear
          </button>
          <button
            onClick={() => { setShowAddSection(false); setNewSectionTitle(''); }}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowAddSection(true)}
          className="w-full flex items-center justify-center gap-2 py-2 mb-4 rounded-lg border border-dashed border-border hover:border-primary/50 text-xs text-muted-foreground hover:text-foreground transition-colors ml-0"
        >
          <Plus size={14} /> Añadir nueva etapa de diseño
        </button>
      )}

      <div className="w-full h-px bg-border my-6" />

      {/* Esquemático */}
      <h2 className="text-lg font-semibold text-foreground mb-3">📷 Esquemático Completo</h2>
      <MultiImageGallery
        sectionId="diseno-esquematico"
        columns={1}
        placeholder="Añadir esquemático completo"
        defaultLabel="Esquemático completo"
        showDate
      />

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-foreground mb-2">Esquemáticos por Etapa</h3>
        <MultiImageGallery
          sectionId="diseno-etapas"
          columns={2}
          placeholder="Añadir esquemático de etapa"
          defaultLabel="Esquemático de etapa"
          showDate
        />
      </div>
    </div>
  );
}
