import { useState, useRef } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { supabase } from '@/integrations/supabase/client';
import { Trash2, Plus, Upload, Download, RefreshCw, FileIcon, X } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploadTableProps {
  tableId: string;
  bucketFolder: string; // e.g. "simulacion" or "pcb"
  title?: string;
}

export function FileUploadTable({ tableId, bucketFolder, title }: FileUploadTableProps) {
  const { data, updateTableCell, updateTableHeader, addTableRow, removeTableRow, addTableColumn, removeTableColumn } = useProject();
  const table = data.tables[tableId];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<string | null>(null);
  const [pendingRowId, setPendingRowId] = useState<string | null>(null);
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [editingHeader, setEditingHeader] = useState<number | null>(null);
  const [headerValue, setHeaderValue] = useState('');

  if (!table) return null;

  // Column indices: 0=Nombre, 1=Tipo, 2=Descripción, 3=Estado, last hidden=URL
  const FILE_URL_COL = table.headers.length - 1; // Last column stores the URL (hidden)

  const startEdit = (rowId: string, cellIndex: number, currentValue: string) => {
    setEditingCell(`${rowId}-${cellIndex}`);
    setEditValue(currentValue);
  };

  const commitEdit = (rowId: string, cellIndex: number) => {
    updateTableCell(tableId, rowId, cellIndex, editValue);
    setEditingCell(null);
  };

  const startHeaderEdit = (index: number, currentValue: string) => {
    setEditingHeader(index);
    setHeaderValue(currentValue);
  };

  const commitHeaderEdit = (index: number) => {
    updateTableHeader(tableId, index, headerValue);
    setEditingHeader(null);
  };

  const handleUploadClick = (rowId: string) => {
    setPendingRowId(rowId);
    fileInputRef.current?.click();
  };

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !pendingRowId) return;

    setUploading(pendingRowId);
    const fileName = `${bucketFolder}/${Date.now()}_${file.name}`;

    try {
      const { error } = await supabase.storage
        .from('project-files')
        .upload(fileName, file, { upsert: true });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('project-files')
        .getPublicUrl(fileName);

      // Update row: name, and store URL in last column
      updateTableCell(tableId, pendingRowId, 0, file.name);
      updateTableCell(tableId, pendingRowId, FILE_URL_COL, urlData.publicUrl);

      toast.success(`Archivo "${file.name}" subido correctamente`);
    } catch (err: any) {
      toast.error('Error al subir archivo: ' + (err.message || 'Error desconocido'));
    } finally {
      setUploading(null);
      setPendingRowId(null);
      e.target.value = '';
    }
  };

  const handleReplace = (rowId: string) => {
    handleUploadClick(rowId);
  };

  const handleDownload = (row: { id: string; cells: string[] }) => {
    const url = row.cells[FILE_URL_COL];
    if (url && url.startsWith('http')) {
      window.open(url, '_blank');
    } else {
      toast.error('No hay archivo asociado a este registro');
    }
  };

  const handleDeleteFile = async (row: { id: string; cells: string[] }) => {
    const url = row.cells[FILE_URL_COL];
    if (url && url.startsWith('http')) {
      // Extract path from URL
      const match = url.match(/project-files\/(.+)$/);
      if (match) {
        await supabase.storage.from('project-files').remove([match[1]]);
      }
    }
    removeTableRow(tableId, row.id);
    toast.success('Registro eliminado');
  };

  const hasFileUrl = (row: { cells: string[] }) => {
    const url = row.cells[FILE_URL_COL];
    return url && url.startsWith('http');
  };

  const getBadgeColor = (val: string) => {
    const v = val.toLowerCase();
    if (v.includes('completado') || v.includes('✓') || v.includes('cumple'))
      return 'bg-success/20 text-success';
    if (v.includes('pendiente') || v.includes('en progreso') || v.includes('revisión'))
      return 'bg-warning/20 text-warning';
    if (v.includes('error') || v.includes('fallo'))
      return 'bg-destructive/20 text-destructive';
    return '';
  };

  // Visible columns (exclude the last one which is the hidden URL)
  const visibleHeaders = table.headers.slice(0, -1);

  return (
    <div className="animate-fade-in">
      {title && (
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/50">
              {visibleHeaders.map((h, i) => (
                <th key={i} className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap group/header">
                  {editingHeader === i ? (
                    <input
                      value={headerValue}
                      onChange={e => setHeaderValue(e.target.value)}
                      onBlur={() => commitHeaderEdit(i)}
                      onKeyDown={e => e.key === 'Enter' && commitHeaderEdit(i)}
                      className="w-full bg-input border border-ring rounded px-2 py-0.5 text-xs text-foreground outline-none uppercase"
                      autoFocus
                    />
                  ) : (
                    <div className="flex items-center gap-1">
                      <span
                        className="cursor-pointer hover:text-foreground transition-colors"
                        onClick={() => startHeaderEdit(i, h)}
                      >
                        {h}
                      </span>
                      {visibleHeaders.length > 1 && (
                        <button
                          onClick={() => removeTableColumn(tableId, i)}
                          className="opacity-0 group-hover/header:opacity-100 text-destructive/60 hover:text-destructive p-0.5 transition-opacity"
                        >
                          <X size={10} />
                        </button>
                      )}
                    </div>
                  )}
                </th>
              ))}
              <th className="px-3 py-2.5 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider w-[140px]">
                Archivo
              </th>
              <th className="w-8"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {table.rows.map(row => (
              <tr key={row.id} className="hover:bg-secondary/30 transition-colors group">
                {visibleHeaders.map((_, ci) => (
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
                          table.headers[ci]?.toLowerCase().includes('estado') ? `inline-block text-xs px-2 py-0.5 rounded-full font-medium ${getBadgeColor(row.cells[ci] || '')}` : ''
                        }`}
                        onClick={() => startEdit(row.id, ci, row.cells[ci] || '')}
                      >
                        {row.cells[ci] || <span className="text-muted-foreground italic">vacío</span>}
                      </span>
                    )}
                  </td>
                ))}
                <td className="px-3 py-2 text-center">
                  <div className="flex items-center justify-center gap-1">
                    {uploading === row.id ? (
                      <span className="text-xs text-muted-foreground animate-pulse">Subiendo...</span>
                    ) : hasFileUrl(row) ? (
                      <>
                        <button
                          onClick={() => handleDownload(row)}
                          className="text-primary hover:text-primary/80 p-1 transition-colors"
                          title="Descargar"
                        >
                          <Download size={14} />
                        </button>
                        <button
                          onClick={() => handleReplace(row.id)}
                          className="text-warning hover:text-warning/80 p-1 transition-colors"
                          title="Reemplazar archivo"
                        >
                          <RefreshCw size={14} />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleUploadClick(row.id)}
                        className="text-primary hover:text-primary/80 p-1 flex items-center gap-1 text-xs transition-colors"
                        title="Subir archivo"
                      >
                        <Upload size={14} /> Subir
                      </button>
                    )}
                  </div>
                </td>
                <td className="px-1">
                  <button
                    onClick={() => handleDeleteFile(row)}
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
        <button
          onClick={() => addTableRow(tableId)}
          className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
        >
          <Plus size={14} /> Nuevo archivo
        </button>
        <span className="text-xs text-muted-foreground">Total — {table.rows.length} archivos</span>
      </div>
      <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelected} />
    </div>
  );
}
