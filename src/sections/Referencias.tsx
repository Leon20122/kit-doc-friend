import { useState } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { EditableNote } from '@/components/EditableNote';
import { EditableTable } from '@/components/EditableTable';
import { Plus, X, Pencil, Check } from 'lucide-react';

interface EditableListProps {
  noteId: string;
  defaultItems: string[];
}

function EditableRefList({ noteId, defaultItems }: EditableListProps) {
  const { data, updateNote } = useProject();
  const raw = data.notes[noteId];
  const items: string[] = raw ? JSON.parse(raw) : defaultItems;

  const save = (newItems: string[]) => updateNote(noteId, JSON.stringify(newItems));

  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editVal, setEditVal] = useState('');

  return (
    <div className="space-y-2 text-sm text-foreground/80 leading-relaxed">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2 group">
          {editIdx === i ? (
            <div className="flex-1 flex items-center gap-2">
              <input value={editVal} onChange={e => setEditVal(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { const n = [...items]; n[i] = editVal; save(n); setEditIdx(null); } }}
                className="flex-1 bg-transparent border-b border-border text-foreground outline-none text-sm" autoFocus />
              <button onClick={() => { const n = [...items]; n[i] = editVal; save(n); setEditIdx(null); }} className="text-success"><Check size={14} /></button>
            </div>
          ) : (
            <p className="flex-1 cursor-pointer" onClick={() => { setEditIdx(i); setEditVal(item); }} dangerouslySetInnerHTML={{ __html: item }} />
          )}
          <button onClick={() => save(items.filter((_, j) => j !== i))} className="opacity-0 group-hover:opacity-100 text-destructive transition-opacity mt-0.5"><X size={14} /></button>
        </div>
      ))}
      <button onClick={() => save([...items, '[Nueva referencia]'])} className="flex items-center gap-1 text-xs text-primary hover:text-primary/80">
        <Plus size={14} /> Agregar referencia
      </button>
    </div>
  );
}

export function Referencias() {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><span>📚</span> Referencias</h1>
        <p className="text-sm text-muted-foreground mt-1">Bibliografía, datasheets, recursos en línea y application notes.</p>
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-3">📖 Bibliografía</h2>
      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <EditableRefList noteId="ref-bibliografia" defaultItems={[
          '[1] A. S. Sedra y K. C. Smith, <em>"Microelectronic Circuits"</em>, 8th ed. Oxford University Press, 2020.',
          '[2] B. Razavi, <em>"Design of Analog CMOS Integrated Circuits"</em>, 2nd ed. McGraw-Hill, 2017.',
          '[3] P. R. Gray et al., <em>"Analysis and Design of Analog Integrated Circuits"</em>, 5th ed. Wiley, 2009.',
          '[4] P. Horowitz y W. Hill, <em>"The Art of Electronics"</em>, 3rd ed. Cambridge University Press, 2015.',
          '[5] R. C. Jaeger y T. N. Blalock, <em>"Microelectronic Circuit Design"</em>, 5th ed. McGraw-Hill, 2015.',
        ]} />
      </div>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">📄 Datasheets</h2>
      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <EditableTable tableId="ref-datasheets" />
      </div>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">🌐 Recursos en Línea</h2>
      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <EditableTable tableId="ref-recursos" />
      </div>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">📑 Application Notes</h2>
      <div className="bg-card rounded-xl border border-border p-5">
        <EditableTable tableId="ref-appnotes" />
      </div>
    </div>
  );
}
