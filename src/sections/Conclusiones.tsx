import { EditableTable } from '@/components/EditableTable';
import { EditableNote } from '@/components/EditableNote';
import { Callout } from '@/components/Callout';

export function Conclusiones() {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><span>✅</span> Conclusiones</h1>
        <p className="text-sm text-muted-foreground mt-1">Análisis de resultados, lecciones aprendidas y trabajo futuro.</p>
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-3">🏆 Resultados Alcanzados</h2>

      <h3 className="text-sm font-semibold text-foreground mb-2">Objetivos vs Estado</h3>
      <div className="overflow-x-auto rounded-lg border border-border mb-4">
        <table className="w-full text-sm">
          <thead><tr className="bg-secondary/50">
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Objetivo</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Estado</th>
          </tr></thead>
          <tbody className="divide-y divide-border">
            {[
              ['Comprender arquitectura interna de op-amp', 'success', '✅ Completado'],
              ['Diseñar cada etapa del circuito', 'success', '✅ Completado'],
              ['Simular comportamiento en SPICE', 'success', '✅ Completado'],
              ['Construir prototipo en protoboard', 'warning', '🔄 En Progreso'],
              ['Caracterizar con mediciones', 'pending', '⏳ Pendiente'],
              ['Documentar con trazabilidad', 'success', '✅ Completado'],
            ].map(([obj, type, status], i) => (
              <tr key={i} className="hover:bg-secondary/30">
                <td className="px-3 py-2 text-foreground/90">{obj}</td>
                <td className="px-3 py-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    type === 'success' ? 'bg-success/20 text-success' :
                    type === 'warning' ? 'bg-warning/20 text-warning' :
                    'bg-muted text-muted-foreground'
                  }`}>{status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">📝 Análisis de Resultados</h2>
      <Callout type="info" icon="💡">
        Escribe aquí tu análisis detallado:
      </Callout>
      <EditableNote noteId="analisis-resultados" placeholder="Escribir aquí el análisis detallado de los resultados obtenidos, comparando los valores simulados con los objetivos de diseño..." />

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">📚 Lecciones Aprendidas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-primary mb-3">⚡ Técnicas</h3>
          <EditableNote noteId="lecciones-tecnicas" placeholder="• El matching de transistores es crítico...\n• La compensación Miller es esencial...\n• Los capacitores de desacoplo previenen oscilaciones..." />
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-primary mb-3">📋 De Proceso</h3>
          <EditableNote noteId="lecciones-proceso" placeholder="• Construir y probar por etapas reduce errores...\n• Documentar cada cambio facilita el troubleshooting...\n• El control de versiones es fundamental..." />
        </div>
      </div>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">🚀 Trabajo Futuro / Mejoras</h2>
      <div className="overflow-x-auto rounded-lg border border-border mb-6">
        <table className="w-full text-sm">
          <thead><tr className="bg-secondary/50">
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Mejora</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Beneficio</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Dificultad</th>
          </tr></thead>
          <tbody className="divide-y divide-border">
            {[
              ['Espejo de corriente Wilson', 'Mayor CMRR y estabilidad de Iee', 'warning', 'Media'],
              ['Darlington en etapa de ganancia', 'Mayor ganancia total', 'pending', 'Baja'],
              ['Protección de salida', 'Limitación de corriente', 'warning', 'Media'],
              ['Diseño PCB', 'Mejor rendimiento y reproducibilidad', 'error', 'Alta'],
              ['Ajuste de offset', 'Reducir voltaje de offset a la salida', 'pending', 'Baja'],
            ].map(([m, b, t, d], i) => (
              <tr key={i} className="hover:bg-secondary/30">
                <td className="px-3 py-2 text-foreground/90">{m}</td>
                <td className="px-3 py-2 text-foreground/90">{b}</td>
                <td className="px-3 py-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    t === 'warning' ? 'bg-warning/20 text-warning' :
                    t === 'error' ? 'bg-destructive/20 text-destructive' :
                    'bg-muted text-muted-foreground'
                  }`}>{d}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-3">💭 Reflexión Final</h2>
      <EditableNote noteId="reflexion-final" placeholder="Escribir aquí una reflexión personal/grupal sobre la experiencia de diseñar un amplificador operacional desde transistores discretos..." />
    </div>
  );
}
