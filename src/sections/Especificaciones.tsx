import { EditableTable } from '@/components/EditableTable';

export function Especificaciones() {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><span>📐</span> Especificaciones</h1>
        <p className="text-sm text-muted-foreground mt-1">Parámetros objetivo, información del proyecto y lista de materiales.</p>
      </div>
      <h2 className="text-lg font-semibold text-foreground mb-3">📋 Información General del Proyecto</h2>
      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <EditableTable tableId="info-general" />
      </div>
      <div className="w-full h-px bg-border my-6" />
      <h2 className="text-lg font-semibold text-foreground mb-3">📦 Lista de Componentes (BOM)</h2>
      <div className="bg-card rounded-xl border border-border p-5">
        <EditableTable tableId="bom" />
      </div>
      <div className="w-full h-px bg-border my-6" />
      <h2 className="text-lg font-semibold text-foreground mb-3">💰 Tabla de Costos</h2>
      <div className="bg-card rounded-xl border border-border p-5">
        <EditableTable tableId="costos" />
      </div>
    </div>
  );
}
