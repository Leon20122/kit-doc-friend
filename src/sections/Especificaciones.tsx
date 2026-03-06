import { useState, useCallback } from 'react';
import { EditableTable } from '@/components/EditableTable';
import { Plus, X, Trash2 } from 'lucide-react';

interface CostRow {
  id: string;
  cells: string[];
}

interface CostTableState {
  headers: string[];
  rows: CostRow[];
}

const DEFAULT_COST_HEADERS: string[] = ['Componente', 'Cantidad', 'Precio Unitario (€)', 'Total (€)'];

const makeEmptyRow = (colCount: number): CostRow => ({
  id: `row-${Date.now()}-${Math.random()}`,
  cells: new Array(colCount).fill(''),
});

export function Especificaciones() {
  const [costTable, setCostTable] = useState<CostTableState>({
    headers: DEFAULT_COST_HEADERS,
    rows: [makeEmptyRow(DEFAULT_COST_HEADERS.length)],
  });

  const updateHeader = useCallback((colIdx: number, value: string) => {
    setCostTable(prev => {
      const headers = [...prev.headers];
      headers[colIdx] = value;
      return { ...prev, headers };
    });
  }, []);

  const updateCell = useCallback((rowId: string, colIdx: number, value: string) => {
    setCostTable(prev => ({
      ...prev,
      rows: prev.rows.map(row =>
        row.id === rowId
          ? { ...row, cells: row.cells.map((c, i) => (i === colIdx ? value : c)) }
          : row
      ),
    }));
  }, []);

  const addRow = useCallback(() => {
    setCostTable(prev => ({
      ...prev,
      rows: [...prev.rows, makeEmptyRow(prev.headers.length)],
    }));
  }, []);

  const removeRow = useCallback((rowId: string) => {
    setCostTable(prev => ({
      ...prev,
      rows: prev.rows.filter(r => r.id !== rowId),
    }));
  }, []);

  const addColumn = useCallback(() => {
    setCostTable(prev => ({
      headers: [...prev.headers, 'Nueva columna'],
      rows: prev.rows.map(row => ({ ...row, cells: [...row.cells, ''] })),
    }));
  }, []);

  const removeColumn = useCallback((colIdx: number) => {
    if (colIdx < 0) return;
    setCostTable(prev => ({
      headers: prev.headers.filter((_, i) => i !== colIdx),
      rows: prev.rows.map(row => ({
        ...row,
        cells: row.cells.filter((_, i) => i !== colIdx),
      })),
    }));
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <span>📐</span> Especificaciones
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Parámetros objetivo, información del proyecto y lista de materiales.
        </p>
      </div>

      {/* Información General */}
      <h2 className="text-lg font-semibold text-foreground mb-3">📋 Información General del Proyecto</h2>
      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <EditableTable tableId="info-general" />
      </div>

      <div className="w-full h-px bg-border my-6" />

      {/* Tabla de Costos dinámica */}
      <h2 className="text-lg font-semibold text-foreground mb-3">💰 Tabla de Costos</h2>
      <div className="bg-card rounded-xl border border-border p-5 mb-6 overflow-x-auto">
        <table className="w-full text-sm border-collapse min-w-max">
          <thead>
            <tr className="bg-secondary/50">
              {costTable.headers.map((header, colIdx) => (
                <th
                  key={colIdx}
                  className="px-3 py-2 border border-border text-left group"
                >
                  <div className="flex items-center gap-1 min-w-[100px]">
                    <input
                      value={header}
                      onChange={e => updateHeader(colIdx, e.target.value)}
                      className="w-full bg-transparent text-xs font-semibold text-muted-foreground outline-none border-b border-transparent focus:border-primary transition-colors"
                    />
                    {costTable.headers.length > 1 && (
                      <button
                        onClick={() => removeColumn(colIdx)}
                        className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive/80 shrink-0 transition-opacity"
                        title="Eliminar columna"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                </th>
              ))}
              {/* Columna para botón de eliminar fila + botón añadir columna */}
              <th className="px-2 py-2 border border-border w-8">
                <button
                  onClick={addColumn}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  title="Añadir columna"
                >
                  <Plus size={14} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {costTable.rows.map(row => (
              <tr key={row.id} className="group hover:bg-secondary/20 transition-colors">
                {row.cells.map((cell, colIdx) => (
                  <td key={colIdx} className="px-3 py-1.5 border border-border">
                    <input
                      value={cell}
                      onChange={e => updateCell(row.id, colIdx, e.target.value)}
                      className="w-full bg-transparent text-sm text-foreground/90 outline-none border-b border-transparent focus:border-primary transition-colors"
                    />
                  </td>
                ))}
                <td className="px-2 py-1.5 border border-border w-8 text-center">
                  <button
                    onClick={() => removeRow(row.id)}
                    className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive/80 transition-opacity"
                    title="Eliminar fila"
                  >
                    <Trash2 size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={addRow}
          className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Plus size={13} /> Añadir fila
        </button>
      </div>

      <div className="w-full h-px bg-border my-6" />

      {/* BOM */}
      <h2 className="text-lg font-semibold text-foreground mb-3">📦 Lista de Componentes (BOM)</h2>
      <div className="bg-card rounded-xl border border-border p-5">
        <EditableTable tableId="bom" />
      </div>
    </div>
  );
}
