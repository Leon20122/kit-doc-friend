import { useState } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { Trash2, Plus } from 'lucide-react';

interface EditableTableProps {
  tableId: string;
  title?: string;
  showAddRow?: boolean;
}

export function EditableTable({ tableId, title, showAddRow = true }: EditableTableProps) {
  const { data, updateTableCell, addTableRow, removeTableRow } = useProject();
  const table = data.tables[tableId];
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  if (!table) return null;

  const startEdit = (rowId: string, cellIndex: number, currentValue: string) => {
    setEditingCell(`${rowId}-${cellIndex}`);
    setEditValue(currentValue);
  };

  const commitEdit = (rowId: string, cellIndex: number) => {
    updateTableCell(tableId, rowId, cellIndex, editValue);
    setEditingCell(null);
  };

  const getBadgeColor = (val: string) => {
    const v = val.toLowerCase();
    if (v.includes('✓') || v.includes('resuelto') || v.includes('completado') || v.includes('cumple') || v.includes('inicial') || v.includes('nueva') || v.includes('sí'))
      return 'bg-success/20 text-success';
    if (v.includes('modificación') || v.includes('media') || v.includes('pendiente') || v.includes('revisión') || v.includes('en progreso'))
      return 'bg-warning/20 text-warning';
    if (v.includes('mayor') || v.includes('alta') || v.includes('error'))
      return 'bg-destructive/20 text-destructive';
    if (v.includes('corrección') || v.includes('info'))
      return 'bg-info/20 text-info';
    if (v.includes('baja') || v.includes('pendiente'))
      return 'bg-muted text-muted-foreground';
    return '';
  };

  const isBadgeColumn = (header: string) => {
    const h = header.toLowerCase();
    return h.includes('estado') || h.includes('prioridad') || h.includes('tipo');
  };

  return (
    <div className="animate-fade-in">
      {title && (
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <span className="text-xs text-muted-foreground px-2 py-0.5 bg-secondary rounded">🗄️ Editable</span>
        </div>
      )}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/50">
              {table.headers.map((h, i) => (
                <th key={i} className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
              <th className="w-8"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {table.rows.map(row => (
              <tr key={row.id} className="hover:bg-secondary/30 transition-colors group">
                {row.cells.map((cell, ci) => (
                  <td key={ci} className="px-3 py-2 text-foreground/90">
                    {editingCell === `${row.id}-${ci}` ? (
                      <input
                        className="w-full bg-input border border-ring rounded px-2 py-1 text-sm text-foreground outline-none"
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        onBlur={() => commitEdit(row.id, ci)}
                        onKeyDown={e => e.key === 'Enter' && commitEdit(row.id, ci)}
                        autoFocus
                      />
                    ) : (
                      <span
                        className={`cursor-pointer hover:bg-secondary/50 px-1 py-0.5 rounded transition-colors ${
                          isBadgeColumn(table.headers[ci]) ? `inline-block text-xs px-2 py-0.5 rounded-full font-medium ${getBadgeColor(cell)}` : ''
                        }`}
                        onClick={() => startEdit(row.id, ci, cell)}
                      >
                        {cell || <span className="text-muted-foreground italic">vacío</span>}
                      </span>
                    )}
                  </td>
                ))}
                <td className="px-1">
                  <button
                    onClick={() => removeTableRow(tableId, row.id)}
                    className="opacity-0 group-hover:opacity-100 text-destructive/60 hover:text-destructive transition-opacity p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-2">
        {showAddRow && (
          <button
            onClick={() => addTableRow(tableId)}
            className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
          >
            <Plus size={14} /> Nuevo registro
          </button>
        )}
        <span className="text-xs text-muted-foreground">Total — {table.rows.length} registros</span>
      </div>
    </div>
  );
}
