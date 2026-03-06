import { EditableTable } from '@/components/EditableTable';
import { EditableNote } from '@/components/EditableNote';
import { Callout } from '@/components/Callout';

export function Conclusiones() {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><span>✅</span> Conclusiones</h1>
        <p className="text-sm text-muted-foreground mt-1">Análisis de resultados y lecciones aprendidas.</p>
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-3">🏆 Resultados Alcanzados</h2>
      <h3 className="text-sm font-semibold text-foreground mb-2">Objetivos vs Estado</h3>
      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <EditableTable tableId="conclusiones-objetivos" />
      </div>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">📝 Análisis de Resultados</h2>
      <Callout type="info" icon="💡">Escribe aquí tu análisis detallado:</Callout>
      <EditableNote noteId="analisis-resultados" placeholder="Escribir aquí el análisis detallado de los resultados obtenidos..." />

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">📚 Lecciones Aprendidas</h2>
      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <EditableNote noteId="lecciones-aprendidas" placeholder="Escribe aquí las lecciones aprendidas (técnicas y de proceso)..." />
      </div>
    </div>
  );
}
