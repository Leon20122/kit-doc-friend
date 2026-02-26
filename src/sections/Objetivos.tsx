import { Checklist } from '@/components/Checklist';
import { Callout } from '@/components/Callout';

export function Objetivos() {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <span>🎯</span> Objetivos
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Definición de metas, alcance y criterios de éxito del proyecto.</p>
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-3">🎯 Objetivo General</h2>
      <Callout type="info" icon="🎯">
        <strong>Diseñar, simular e implementar un amplificador operacional funcional utilizando transistores BJT discretos</strong>, demostrando comprensión de los principios de electrónica analógica.
      </Callout>

      <h2 className="text-lg font-semibold text-foreground mb-3">📋 Objetivos Específicos</h2>
      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <Checklist groupId="objetivos-especificos" />
      </div>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">📐 Alcance del Proyecto</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-success mb-3">✅ Incluye</h3>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li className="flex items-center gap-2"><span className="text-success">✓</span> Diseño con transistores BJT discretos</li>
            <li className="flex items-center gap-2"><span className="text-success">✓</span> Simulación SPICE completa</li>
            <li className="flex items-center gap-2"><span className="text-success">✓</span> Prototipo funcional en protoboard</li>
            <li className="flex items-center gap-2"><span className="text-success">✓</span> Mediciones y caracterización</li>
            <li className="flex items-center gap-2"><span className="text-success">✓</span> Documentación técnica completa</li>
          </ul>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-destructive mb-3">❌ No Incluye</h3>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li>✗ Requisitos estrictos de ganancia industrial</li>
            <li>✗ Fabricación PCB profesional</li>
            <li>✗ Encapsulado final del circuito</li>
            <li>✗ Pruebas ambientales (temperatura, humedad)</li>
            <li>✗ Certificación de componentes</li>
          </ul>
        </div>
      </div>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">🏆 Criterios de Éxito</h2>
      <Callout type="success" icon="✅">
        <strong>El proyecto se considerará exitoso cuando:</strong><br/>
        ✅ El circuito amplifica señales correctamente<br/>
        ✅ Funciona como seguidor de voltaje (Buffer, Av ≈ 1)<br/>
        ✅ Opera como amplificador inversor y no inversor<br/>
        ✅ Los resultados de simulación y medición son consistentes ({'<'} 20% diferencia)<br/>
        ✅ La documentación está completa y con trazabilidad
      </Callout>
    </div>
  );
}
