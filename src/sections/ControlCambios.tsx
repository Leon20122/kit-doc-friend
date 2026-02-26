import { EditableTable } from '@/components/EditableTable';
import { ToggleBlock } from '@/components/ToggleBlock';

export function ControlCambios() {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><span>📝</span> Control de Cambios</h1>
        <p className="text-sm text-muted-foreground mt-1">Registro de versiones, historial detallado y convenciones.</p>
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-3">📋 Registro de Versiones</h2>
      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <EditableTable tableId="versiones" />
      </div>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">📜 Historial Detallado</h2>

      <ToggleBlock title="Versión 2.1 — 2023-10-27" defaultOpen>
        <p className="text-sm text-foreground/80 mb-2"><strong>Autor:</strong> Alejandro G.</p>
        <ul className="text-sm text-foreground/80 space-y-1 ml-2">
          <li>📝 Ajuste de resistencia Ree de 14.3kΩ a 15kΩ (valor comercial)</li>
          <li>📝 Actualización de punto de operación DC</li>
          <li>🐛 Corrección de valor Iee en tabla de cálculos</li>
        </ul>
      </ToggleBlock>

      <ToggleBlock title="Versión 2.0 — 2023-10-25">
        <p className="text-sm text-foreground/80 mb-2"><strong>Autor:</strong> Equipo</p>
        <ul className="text-sm text-foreground/80 space-y-1 ml-2">
          <li>✨ Rediseño completo de etapa de ganancia</li>
          <li>✨ Adición de compensación Miller (Cc = 33pF)</li>
          <li>📝 Actualización de esquemático completo</li>
          <li>📝 Re-simulación de todos los análisis</li>
          <li>🐛 Corrección de inestabilidad (margen de fase)</li>
        </ul>
      </ToggleBlock>

      <ToggleBlock title="Versión 1.0 — 2023-10-15">
        <p className="text-sm text-foreground/80 mb-2"><strong>Autor:</strong> Equipo</p>
        <ul className="text-sm text-foreground/80 space-y-1 ml-2">
          <li>✨ Creación de estructura del documento</li>
          <li>✨ Definición de objetivos y alcance</li>
          <li>✨ Marco teórico inicial</li>
          <li>✨ Primer diseño de circuito</li>
          <li>✨ Lista de componentes (BOM) v1</li>
        </ul>
      </ToggleBlock>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">🏷️ Convenciones de Versionado</h2>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead><tr className="bg-secondary/50">
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Prefijo</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Significado</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Ejemplo</th>
          </tr></thead>
          <tbody className="divide-y divide-border">
            {[
              ['✨', 'Nueva sección o funcionalidad', 'Agregar sección de simulaciones'],
              ['📝', 'Modificación de contenido existente', 'Actualizar valores de resistencia'],
              ['🐛', 'Corrección de errores', 'Corregir ecuación incorrecta'],
              ['🗑️', 'Eliminación de contenido', 'Remover sección obsoleta'],
              ['📎', 'Adición de archivos/imágenes', 'Agregar capturas de simulación'],
            ].map(([p, s, e], i) => (
              <tr key={i} className="hover:bg-secondary/30">
                <td className="px-3 py-2 text-foreground/90 text-lg">{p}</td>
                <td className="px-3 py-2 text-foreground/90">{s}</td>
                <td className="px-3 py-2 text-foreground/90">{e}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
