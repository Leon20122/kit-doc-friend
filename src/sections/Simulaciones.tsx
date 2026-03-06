import { ToggleBlock } from '@/components/ToggleBlock';
import { MultiImageGallery } from '@/components/MultiImageGallery';
import { EditableTable } from '@/components/EditableTable';
import { DynamicTableBlock } from '@/components/DynamicTableBlock';
import { EditableNote } from '@/components/EditableNote';

export function Simulaciones() {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><span>💻</span> Simulaciones</h1>
        <p className="text-sm text-muted-foreground mt-1">Configuración, resultados y análisis de simulaciones SPICE.</p>
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-3">🖥️ Software Utilizado</h2>
      <div className="bg-card rounded-xl border border-border p-5 mb-4">
        <EditableTable tableId="sim-software" showAddRow={true} />
      </div>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">📊 Parámetros de Configuración SPICE</h2>

      <ToggleBlock title="Análisis DC - Punto de Operación (.OP)" defaultOpen>
        <h4 className="text-sm font-semibold text-foreground mb-2">Resultados por Transistor</h4>
        <EditableTable tableId="sim-dc-resultados" showAddRow={true} />
        <DynamicTableBlock sectionId="sim-dc-extra" />
        <h4 className="text-sm font-semibold text-foreground mb-2 mt-4">📷 Gráficas del Análisis DC</h4>
        <MultiImageGallery sectionId="sim-dc" columns={2} placeholder="Añadir gráfica DC" defaultLabel="Gráficas DC" showDate />
      </ToggleBlock>

      <ToggleBlock title="Análisis AC - Respuesta en Frecuencia (.AC)">
        <h4 className="text-sm font-semibold text-foreground mb-2">Resultados del Análisis AC</h4>
        <EditableTable tableId="sim-ac-resultados" showAddRow={true} />
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

      <h2 className="text-lg font-semibold text-foreground mb-3">🔬 Simulación de Aplicaciones</h2>
      
      {[
        { title: 'Buffer (Seguidor de Voltaje, Av = 1)', tableId: 'sim-app-buffer', galleryId: 'sim-buffer', noteId: 'sim-eq-buffer' },
        { title: 'Amplificador Inversor (Av = -10)', tableId: 'sim-app-inversor', galleryId: 'sim-inversor', noteId: 'sim-eq-inversor' },
        { title: 'Amplificador No Inversor (Av = +10)', tableId: 'sim-app-noinversor', galleryId: 'sim-noinversor', noteId: 'sim-eq-noinversor' },
      ].map((app, idx) => (
        <ToggleBlock key={idx} title={app.title}>
          <EditableNote
            noteId={app.noteId}
            placeholder="Ecuación de diseño..."
            className="font-mono text-primary bg-secondary/50 min-h-[40px] mb-3"
          />
          <EditableTable tableId={app.tableId} showAddRow={true} />
          <DynamicTableBlock sectionId={`${app.tableId}-extra`} />
          <h4 className="text-sm font-semibold text-foreground mb-2 mt-3">📷 Capturas de Simulación</h4>
          <MultiImageGallery sectionId={app.galleryId} columns={2} placeholder="Añadir captura" defaultLabel="Capturas" showDate />
        </ToggleBlock>
      ))}
    </div>
  );
}
