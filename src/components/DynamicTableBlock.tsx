import { useState } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { EditableTable } from './EditableTable';
import { Plus, X, Calendar } from 'lucide-react';

interface DynamicTableBlockProps {
  sectionId: string;
  defaultHeaders?: string[];
}

export function DynamicTableBlock({ sectionId, defaultHeaders = ['Parámetro', 'Valor', 'Unidad'] }: DynamicTableBlockProps) {
  const { data, updateNote, createTable, removeTable } = useProject();
  const storageKey = `dynamic-tables-${sectionId}`;
  const raw = data.notes[storageKey];
  const tableEntries: { id: string; label: string; date: string }[] = raw ? JSON.parse(raw) : [];

  const [newLabel, setNewLabel] = useState('');
  const [showForm, setShowForm] = useState(false);

  const save = (entries: { id: string; label: string; date: string }[]) => {
    updateNote(storageKey, JSON.stringify(entries));
  };

  const addNewTable = () => {
    if (!newLabel.trim()) return;
    const id = `${sectionId}-dyn-${Date.now()}`;
    createTable(id, defaultHeaders);
    save([...tableEntries, { id, label: newLabel.trim(), date: '' }]);
    setNewLabel('');
    setShowForm(false);
  };

  const removeEntry = (id: string) => {
    removeTable(id);
    save(tableEntries.filter(e => e.id !== id));
  };

  const updateDate = (id: string, date: string) => {
    save(tableEntries.map(e => e.id === id ? { ...e, date } : e));
  };

  return (
    <div className="space-y-3 mt-3">
      {tableEntries.map(entry => (
        <div key={entry.id} className="border border-border rounded-lg p-3 bg-card">
          <div className="flex items-center justify-between mb-2 group">
            <h4 className="text-sm font-semibold text-foreground">{entry.label}</h4>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Calendar size={12} className="text-muted-foreground" />
                <input
                  type="date"
                  value={entry.date}
                  onChange={e => updateDate(entry.id, e.target.value)}
                  className="text-xs bg-secondary/50 border border-border rounded px-2 py-0.5 text-muted-foreground outline-none"
                />
              </div>
              <button
                onClick={() => removeEntry(entry.id)}
                className="opacity-0 group-hover:opacity-100 text-destructive/60 hover:text-destructive transition-opacity p-1"
              >
                <X size={14} />
              </button>
            </div>
          </div>
          <EditableTable tableId={entry.id} showAddRow={true} />
        </div>
      ))}

      {showForm ? (
        <div className="flex items-center gap-2 p-3 border border-dashed border-border rounded-lg">
          <input
            value={newLabel}
            onChange={e => setNewLabel(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addNewTable()}
            placeholder="Nombre de la tabla..."
            className="flex-1 text-sm bg-transparent border-b border-border text-foreground outline-none placeholder:text-muted-foreground/50"
            autoFocus
          />
          <button onClick={addNewTable} className="text-xs text-primary hover:text-primary/80 font-medium">Crear</button>
          <button onClick={() => { setShowForm(false); setNewLabel(''); }} className="text-xs text-muted-foreground hover:text-foreground">Cancelar</button>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed border-border hover:border-primary/50 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Plus size={14} /> Añadir nueva tabla
        </button>
      )}
    </div>
  );
}
