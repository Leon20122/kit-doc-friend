import { ToggleBlock } from '@/components/ToggleBlock';
import { MultiImageGallery } from '@/components/MultiImageGallery';
import { EditableTable } from '@/components/EditableTable';
import { DynamicTableBlock } from '@/components/DynamicTableBlock';
import { EditableNote } from '@/components/EditableNote';
import { FileUploadTable } from '@/components/FileUploadTable';

export function Simulaciones() {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><span>💻</span> Simulaciones</h1>
        <p className="text-sm text-muted-foreground mt-1">Configuración, resultados y análisis de simulaciones SPICE.</p>
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-3">🖥️ Software Utilizado</h2>
      <div className="bg-card rounded-xl border border-border p-5 mb-4">
        <EditableTable tableId="sim-software" showAddRow showColumnControls />
      </div>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">📊 Parámetros de Configuración SPICE</h2>

      <ToggleBlock title="Análisis DC - Punto de Operación (.OP)" defaultOpen>
        <h4 className="text-sm font-semibold text-foreground mb-2">Resultados por Transistor</h4>
        <EditableTable tableId="sim-dc-resultados" showAddRow showColumnControls showMeta />
        <DynamicTableBlock sectionId="sim-dc-extra" />
        <h4 className="text-sm font-semibold text-foreground mb-2 mt-4">📷 Gráficas del Análisis DC</h4>
        <MultiImageGallery sectionId="sim-dc" columns={2} placeholder="Añadir gráfica DC" defaultLabel="Gráficas DC" showDate />
      </ToggleBlock>

      <ToggleBlock title="Análisis AC - Respuesta en Frecuencia (.AC)">
        <h4 className="text-sm font-semibold text-foreground mb-2">Resultados del Análisis AC</h4>
        <EditableTable tableId="sim-ac-resultados" showAddRow showColumnControls showMeta />
        <DynamicTableBlock sectionId="sim-ac-extra" />
        <h4 className="text-sm font-semibold text-foreground mb-2 mt-4">📈 Gráficas de Respuesta en Frecuencia (AC)</h4>
        <MultiImageGallery sectionId="sim-ac" columns={1} placeholder="Añadir gráfica AC" defaultLabel="Gráficas AC" showDate />
      </ToggleBlock>

      <ToggleBlock title="Análisis Transitorio (.TRAN)">
        <h4 className="text-sm font-semibold text-foreground mb-2">Medición de Slew Rate</h4>
        <EditableNote
          noteId="sim-slew-rate"
          placeholder="SR = ΔV / Δt = [valor medido] V/μs"
          className="font-mono text-primary bg-secondary/50 min-h-[40px]"
        />
        <DynamicTableBlock sectionId="sim-tran-extra" />
        <h4 className="text-sm font-semibold text-foreground mb-2 mt-3">📉 Formas de Onda Transitorias</h4>
        <MultiImageGallery sectionId="sim-tran" columns={2} placeholder="Añadir gráfica transitoria" defaultLabel="Gráficas Transitorias" showDate />
      </ToggleBlock>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">📁 Archivos de Simulación</h2>
      <div className="bg-card rounded-xl border border-border p-5">
        <FileUploadTable tableId="archivos-simulacion" bucketFolder="simulacion" />
      </div>
    </div>
  );
}
