import { useState, useCallback, useEffect } from 'react';

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

export interface ChecklistGroup {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export interface TableRow {
  id: string;
  cells: string[];
}

export interface EditableTable {
  id: string;
  headers: string[];
  rows: TableRow[];
}

export interface ActivityItem {
  id: string;
  time: string;
  text: string;
  color: 'red' | 'yellow' | 'blue' | 'green';
}

export interface PhaseProgress {
  id: string;
  name: string;
  emoji: string;
  percent: number;
  status: string;
}

export interface TeamMember {
  id: string;
  initials: string;
  name: string;
  role: string;
  color: string;
  isLeader?: boolean;
}

export interface TimelineStep {
  id: string;
  label: string;
  status: 'completed' | 'in-progress' | 'pending';
}

export interface HistoryEntry {
  id: string;
  title: string;
  author: string;
  items: string[];
}

export interface BannerConfig {
  emoji: string;
  title: string;
  subtitle: string;
  version: string;
  statusText: string;
  bgImage: string;
}

export interface ObjetivosSection {
  id: string;
  type: 'callout' | 'checklist' | 'scope' | 'criteria' | 'custom';
  title: string;
  emoji: string;
  content: string;
}

export interface ProjectData {
  checklists: Record<string, ChecklistGroup>;
  tables: Record<string, EditableTable>;
  activities: ActivityItem[];
  phases: PhaseProgress[];
  notes: Record<string, string>;
  images: Record<string, string[]>;
  teamMembers: TeamMember[];
  timeline: TimelineStep[];
  historyEntries: HistoryEntry[];
  banner: BannerConfig;
  objetivosSections: ObjetivosSection[];
}

const defaultData: ProjectData = {
  checklists: {
    'objetivos-especificos': {
      id: 'objetivos-especificos',
      title: 'Objetivos Específicos',
      items: [
        { id: 'oe1', text: 'Comprender la arquitectura interna de un amplificador operacional', checked: true },
        { id: 'oe2', text: 'Diseñar cada etapa del circuito (diferencial, ganancia, salida)', checked: true },
        { id: 'oe3', text: 'Simular el comportamiento en software (LTSpice/Multisim)', checked: true },
        { id: 'oe4', text: 'Construir el prototipo físico en protoboard', checked: false },
        { id: 'oe5', text: 'Caracterizar mediante mediciones experimentales', checked: false },
        { id: 'oe6', text: 'Documentar el proceso con trazabilidad de cambios', checked: false },
      ],
    },
    'etapa-diseno': {
      id: 'etapa-diseno',
      title: 'ETAPA 1: DISEÑO',
      items: [
        { id: 'ed1', text: 'Objetivos definidos', checked: true },
        { id: 'ed2', text: 'Topología seleccionada', checked: true },
        { id: 'ed3', text: 'Etapa diferencial diseñada', checked: true },
        { id: 'ed4', text: 'Etapa de ganancia diseñada', checked: true },
        { id: 'ed5', text: 'Etapa de salida diseñada', checked: true },
        { id: 'ed6', text: 'Compensación calculada', checked: true },
        { id: 'ed7', text: 'Esquemático completo', checked: true },
        { id: 'ed8', text: 'BOM finalizado', checked: true },
        { id: 'ed9', text: 'Revisión por pares', checked: true },
      ],
    },
    'etapa-simulacion': {
      id: 'etapa-simulacion',
      title: 'ETAPA 2: SIMULACIÓN',
      items: [
        { id: 'es1', text: 'Software configurado', checked: true },
        { id: 'es2', text: 'Modelos SPICE verificados', checked: true },
        { id: 'es3', text: 'Análisis DC ejecutado', checked: true },
        { id: 'es4', text: 'Transistores en región activa', checked: true },
        { id: 'es5', text: 'Análisis AC ejecutado', checked: true },
        { id: 'es6', text: 'Ganancia verificada', checked: true },
        { id: 'es7', text: 'BW verificado', checked: true },
        { id: 'es8', text: 'Estabilidad verificada (PM>45°)', checked: true },
        { id: 'es9', text: 'Análisis transitorio ejecutado', checked: true },
        { id: 'es10', text: 'Slew rate medido', checked: true },
        { id: 'es11', text: 'Aplicaciones simuladas (Buffer, Inv, No-Inv)', checked: true },
        { id: 'es12', text: 'Documentación completa', checked: true },
      ],
    },
    'etapa-implementacion': {
      id: 'etapa-implementacion',
      title: 'ETAPA 3: IMPLEMENTACIÓN',
      items: [
        { id: 'ei1', text: 'Materiales adquiridos', checked: true },
        { id: 'ei2', text: 'Componentes verificados', checked: true },
        { id: 'ei3', text: 'Instrumentación lista', checked: true },
        { id: 'ei4', text: 'Etapa diferencial montada y probada', checked: true },
        { id: 'ei5', text: 'Etapa de ganancia montada y probada', checked: true },
        { id: 'ei6', text: 'Etapa de salida montada y probada', checked: false },
        { id: 'ei7', text: 'Integración completa', checked: false },
        { id: 'ei8', text: 'Compensación instalada', checked: false },
        { id: 'ei9', text: 'Desacoplo instalado', checked: false },
        { id: 'ei10', text: 'Verificación final sin cortocircuitos', checked: false },
        { id: 'ei11', text: 'Fotografías tomadas', checked: false },
      ],
    },
    'etapa-pruebas': {
      id: 'etapa-pruebas',
      title: 'ETAPA 4: PRUEBAS',
      items: [
        { id: 'ep1', text: 'Plan de pruebas definido', checked: false },
        { id: 'ep2', text: 'Mediciones DC completadas', checked: false },
        { id: 'ep3', text: 'Ganancia medida a múltiples frecuencias', checked: false },
        { id: 'ep4', text: 'Frecuencia de corte identificada', checked: false },
        { id: 'ep5', text: 'Slew rate medido', checked: false },
        { id: 'ep6', text: 'Buffer probado', checked: false },
        { id: 'ep7', text: 'Inversor probado', checked: false },
        { id: 'ep8', text: 'No Inversor probado', checked: false },
        { id: 'ep9', text: 'Comparación Sim vs Real', checked: false },
        { id: 'ep10', text: 'Capturas de osciloscopio', checked: false },
        { id: 'ep11', text: 'Análisis de discrepancias', checked: false },
        { id: 'ep12', text: 'Documentación completa', checked: false },
      ],
    },
    'materiales': {
      id: 'materiales',
      title: 'Materiales Utilizados',
      items: [
        { id: 'm1', text: 'Protoboard 830 puntos', checked: true },
        { id: 'm2', text: 'Fuente de alimentación ±12V / ±15V', checked: true },
        { id: 'm3', text: 'Multímetro digital', checked: true },
        { id: 'm4', text: 'Osciloscopio (2 canales mín.)', checked: true },
        { id: 'm5', text: 'Generador de funciones', checked: true },
        { id: 'm6', text: 'Transistores NPN (2N2222 × 4)', checked: true },
        { id: 'm7', text: 'Transistores PNP (2N2907 × 3)', checked: true },
        { id: 'm8', text: 'Resistencias (surtido de valores)', checked: true },
        { id: 'm9', text: 'Capacitores cerámicos (33pF, 100nF)', checked: true },
        { id: 'm10', text: 'Cables de conexión', checked: true },
      ],
    },
    'paso1': {
      id: 'paso1',
      title: 'Paso 1: Verificación de Componentes',
      items: [
        { id: 'p1a', text: 'Verificar β (hfe) de cada transistor con multímetro', checked: true },
        { id: 'p1b', text: 'Emparejar Q1/Q2 para el par diferencial (β similar)', checked: true },
        { id: 'p1c', text: 'Medir resistencias con multímetro (±5% tolerancia)', checked: true },
        { id: 'p1d', text: 'Verificar capacitores (sin daño visual)', checked: true },
        { id: 'p1e', text: 'Comprobar fuente de alimentación (±Vcc correctos)', checked: true },
      ],
    },
    'paso2': {
      id: 'paso2',
      title: 'Paso 2: Montaje por Etapas',
      items: [
        { id: 'p2a', text: 'Montar fuente de corriente (Q8 + Ree)', checked: true },
        { id: 'p2b', text: 'Montar par diferencial (Q1, Q2)', checked: true },
        { id: 'p2c', text: 'Montar carga activa (Q3, Q4)', checked: true },
        { id: 'p2d', text: 'Verificar punto de operación DC de etapa 1', checked: true },
        { id: 'p2e', text: 'Montar etapa de ganancia (Q5)', checked: true },
        { id: 'p2f', text: 'Montar etapa de salida push-pull (Q6, Q7)', checked: false },
        { id: 'p2g', text: 'Instalar compensación Miller (Cc = 33pF)', checked: false },
      ],
    },
    'paso3': {
      id: 'paso3',
      title: 'Paso 3: Integración y Verificación',
      items: [
        { id: 'p3a', text: 'Conectar todas las etapas', checked: false },
        { id: 'p3b', text: 'Instalar capacitores de desacoplo (100nF)', checked: false },
        { id: 'p3c', text: 'Verificar que no hay cortocircuitos', checked: false },
        { id: 'p3d', text: 'Energizar gradualmente', checked: false },
        { id: 'p3e', text: 'Medir punto DC de salida (≈ 0V)', checked: false },
        { id: 'p3f', text: 'Aplicar señal de prueba', checked: false },
      ],
    },
  },
  tables: {
    'specs-dashboard': {
      id: 'specs-dashboard',
      headers: ['Parámetro', 'Valor Objetivo', 'Valor Simulado', 'Valor Medido', 'Estado'],
      rows: [
        { id: 'sd1', cells: ['Ganancia de Tensión (Av)', '100 V/V', '105 V/V', 'N/A', '✓'] },
        { id: 'sd2', cells: ['Ancho de Banda (BW)', '1 MHz', '1.2 MHz', 'N/A', '✓'] },
        { id: 'sd3', cells: ['Impedancia Entrada (Zin)', '>100 kΩ', '150 kΩ', 'N/A', '✓'] },
        { id: 'sd4', cells: ['Slew Rate (SR)', '>0.5 V/μs', '0.8 V/μs', 'N/A', '✓'] },
      ],
    },
    'changelog': {
      id: 'changelog',
      headers: ['Versión', 'Fecha', 'Descripción', 'Autor', 'Tipo'],
      rows: [
        { id: 'cl1', cells: ['v2.1', '2023-10-27', 'Ajuste de polarización en etapa de entrada.', 'Alejandro G.', 'Modificación'] },
        { id: 'cl2', cells: ['v2.0', '2023-10-25', 'Rediseño completo del circuito para mejorar la estabilidad.', 'Equipo', 'Mayor'] },
        { id: 'cl3', cells: ['v1.1', '2023-10-20', 'Corrección de valores de resistencia en par diferencial.', 'María L.', 'Corrección'] },
        { id: 'cl4', cells: ['v1.0', '2023-10-15', 'Creación inicial del documento y estructura.', 'Equipo', 'Inicial'] },
      ],
    },
    'info-general': {
      id: 'info-general',
      headers: ['Campo', 'Detalle'],
      rows: [
        { id: 'ig1', cells: ['Institución', '[Nombre de la Universidad]'] },
        { id: 'ig2', cells: ['Curso', 'Electrónica Analógica'] },
        { id: 'ig3', cells: ['Semestre', '[Semestre / Periodo]'] },
        { id: 'ig4', cells: ['Docente', '[Nombre del Docente]'] },
        { id: 'ig5', cells: ['Integrantes', 'Alejandro G., María L., Carlos R.'] },
        { id: 'ig6', cells: ['Fecha de inicio', '[Fecha]'] },
        { id: 'ig7', cells: ['Fecha de entrega', '[Fecha]'] },
      ],
    },
    'specs-target': {
      id: 'specs-target',
      headers: ['Parámetro', 'Símbolo', 'Objetivo', 'Unidad', 'Prioridad'],
      rows: [
        { id: 'st1', cells: ['Ganancia lazo abierto', 'Aol', '> 1,000', 'V/V', 'Media'] },
        { id: 'st2', cells: ['Ancho de banda', 'BW', '> 10', 'kHz', 'Baja'] },
        { id: 'st3', cells: ['Impedancia de entrada', 'Zin', '> 100', 'kΩ', 'Media'] },
        { id: 'st4', cells: ['Impedancia de salida', 'Zout', '< 1', 'kΩ', 'Media'] },
        { id: 'st5', cells: ['Alimentación', 'Vcc', '±12 o ±15', 'V', 'Alta'] },
        { id: 'st6', cells: ['Slew Rate', 'SR', '> 0.5', 'V/μs', 'Baja'] },
        { id: 'st7', cells: ['CMRR', '—', '> 40', 'dB', 'Media'] },
      ],
    },
    'bom': {
      id: 'bom',
      headers: ['Ref', 'Componente', 'Valor', 'Cantidad', 'Notas'],
      rows: [
        { id: 'b1', cells: ['Q1, Q2', 'BJT NPN', '2N2222', '2', 'Par diferencial (emparejar)'] },
        { id: 'b2', cells: ['Q3, Q4', 'BJT PNP', '2N2907', '2', 'Carga activa / Espejo de corriente'] },
        { id: 'b3', cells: ['Q5', 'BJT NPN', '2N2222', '1', 'Etapa de ganancia'] },
        { id: 'b4', cells: ['Q6', 'BJT NPN', '2N2222', '1', 'Salida Push-Pull (NPN)'] },
        { id: 'b5', cells: ['Q7', 'BJT PNP', '2N2907', '1', 'Salida Push-Pull (PNP)'] },
        { id: 'b6', cells: ['Q8', 'BJT NPN', '2N2222', '1', 'Fuente de corriente Iee'] },
        { id: 'b7', cells: ['R1-R12', 'Resistencias', 'Varios', '12', 'Ver esquemático para valores'] },
        { id: 'b8', cells: ['C1', 'Capacitor cerámico', '33 pF', '1', 'Compensación Miller'] },
        { id: 'b9', cells: ['C2, C3', 'Capacitor cerámico', '100 nF', '2', 'Desacoplo alimentación'] },
      ],
    },
    'troubleshooting': {
      id: 'troubleshooting',
      headers: ['ID', 'Fecha', 'Problema', 'Causa', 'Solución', 'Estado'],
      rows: [
        { id: 'ts1', cells: ['#001', '2023-10-18', 'Salida saturada a Vcc+', 'Desbalance en par diferencial', 'Emparejar transistores Q1/Q2', '✅ Resuelto'] },
        { id: 'ts2', cells: ['#002', '2023-10-20', 'Oscilaciones a alta frecuencia', 'Falta de compensación', 'Agregar Cc = 33pF (Miller)', '✅ Resuelto'] },
        { id: 'ts3', cells: ['#003', '2023-10-25', 'Ganancia menor a esperada', 'Resistencia de colector inadecuada', 'Rediseño de valores (v2.0)', '✅ Resuelto'] },
      ],
    },
    'medicion-dc': {
      id: 'medicion-dc',
      headers: ['Nodo', 'Esperado (V)', 'Medido (V)', 'Diferencia'],
      rows: [
        { id: 'md1', cells: ['Vcc+', '+15.0', '[Medir]', '—'] },
        { id: 'md2', cells: ['Vcc-', '-15.0', '[Medir]', '—'] },
        { id: 'md3', cells: ['Colector Q1', '7.2', '[Medir]', '—'] },
        { id: 'md4', cells: ['Colector Q2', '7.2', '[Medir]', '—'] },
        { id: 'md5', cells: ['Colector Q5', '8.3', '[Medir]', '—'] },
        { id: 'md6', cells: ['Salida (Vout)', '≈ 0', '[Medir]', '—'] },
      ],
    },
    'ganancia-frecuencia': {
      id: 'ganancia-frecuencia',
      headers: ['Frecuencia', 'Vin (mV)', 'Vout (V)', 'Ganancia V/V', 'Ganancia dB'],
      rows: [
        { id: 'gf1', cells: ['100 Hz', '[Medir]', '[Medir]', '[Calcular]', '[Calcular]'] },
        { id: 'gf2', cells: ['1 kHz', '[Medir]', '[Medir]', '[Calcular]', '[Calcular]'] },
        { id: 'gf3', cells: ['10 kHz', '[Medir]', '[Medir]', '[Calcular]', '[Calcular]'] },
        { id: 'gf4', cells: ['100 kHz', '[Medir]', '[Medir]', '[Calcular]', '[Calcular]'] },
        { id: 'gf5', cells: ['1 MHz', '[Medir]', '[Medir]', '[Calcular]', '[Calcular]'] },
      ],
    },
    'comparacion-sim-med': {
      id: 'comparacion-sim-med',
      headers: ['Parámetro', 'Simulado', 'Medido', 'Diferencia %', 'Estado'],
      rows: [
        { id: 'csm1', cells: ['Ganancia DC', '95.2 dB', '[Medir]', '[Calcular]', 'Pendiente'] },
        { id: 'csm2', cells: ['BW (-3dB)', '18.5 kHz', '[Medir]', '[Calcular]', 'Pendiente'] },
        { id: 'csm3', cells: ['Slew Rate', '0.8 V/μs', '[Medir]', '[Calcular]', 'Pendiente'] },
        { id: 'csm4', cells: ['Vout offset', '~0 mV', '[Medir]', '[Calcular]', 'Pendiente'] },
      ],
    },
    'versiones': {
      id: 'versiones',
      headers: ['Versión', 'Fecha', 'Autor', 'Descripción', 'Tipo'],
      rows: [
        { id: 'v1', cells: ['v2.1', '2023-10-27', 'Alejandro G.', 'Ajuste de polarización en etapa de entrada', 'Modificación'] },
        { id: 'v2', cells: ['v2.0', '2023-10-25', 'Equipo', 'Rediseño completo del circuito para mejorar la estabilidad', 'Mayor'] },
        { id: 'v3', cells: ['v1.2', '2023-10-22', 'María L.', 'Resultados completos de simulación AC y transitoria', 'Nueva sección'] },
        { id: 'v4', cells: ['v1.1', '2023-10-20', 'María L.', 'Corrección de valores de resistencia en par diferencial', 'Corrección'] },
        { id: 'v5', cells: ['v1.0', '2023-10-15', 'Equipo', 'Creación inicial del documento y estructura completa', 'Inicial'] },
      ],
    },
  },
  activities: [
    { id: 'a1', time: 'Hoy, 10:30 AM', text: 'Diseño del Circuito actualizado por Alejandro G. (Diagrama esquemático finalizado).', color: 'red' },
    { id: 'a2', time: 'Ayer, 4:45 PM', text: 'Simulaciones: Nuevos resultados de análisis de frecuencia añadidos por María L.', color: 'yellow' },
    { id: 'a3', time: 'Ayer, 2:00 PM', text: 'Especificaciones: Tabla de parámetros actualizados por el equipo.', color: 'blue' },
  ],
  phases: [
    { id: 'ph1', name: 'Diseño', emoji: '🟢', percent: 100, status: 'Completado' },
    { id: 'ph2', name: 'Simulación', emoji: '🟢', percent: 100, status: 'Completado' },
    { id: 'ph3', name: 'Implementación', emoji: '🟡', percent: 60, status: 'En Progreso' },
    { id: 'ph4', name: 'Pruebas', emoji: '🔴', percent: 0, status: 'Pendiente' },
  ],
  notes: {},
  images: {},
  teamMembers: [
    { id: 'tm1', initials: 'AG', name: 'Alejandro G.', role: 'Diseño y Coordinación', color: 'bg-info', isLeader: true },
    { id: 'tm2', initials: 'ML', name: 'María L.', role: 'Simulación y Análisis', color: 'bg-warning' },
    { id: 'tm3', initials: 'CR', name: 'Carlos R.', role: 'Implementación PCB', color: 'bg-success' },
  ],
  timeline: [
    { id: 'tl1', label: 'Inicio', status: 'completed' },
    { id: 'tl2', label: 'Investigación', status: 'completed' },
    { id: 'tl3', label: 'Diseño', status: 'completed' },
    { id: 'tl4', label: 'Simulación', status: 'completed' },
    { id: 'tl5', label: 'Implementación', status: 'in-progress' },
    { id: 'tl6', label: 'Pruebas y Mediciones', status: 'pending' },
    { id: 'tl7', label: 'Entrega Final', status: 'pending' },
  ],
  historyEntries: [
    {
      id: 'he1',
      title: 'Versión 2.1 — 2023-10-27',
      author: 'Alejandro G.',
      items: [
        '📝 Ajuste de resistencia Ree de 14.3kΩ a 15kΩ (valor comercial)',
        '📝 Actualización de punto de operación DC',
        '🐛 Corrección de valor Iee en tabla de cálculos',
      ],
    },
    {
      id: 'he2',
      title: 'Versión 2.0 — 2023-10-25',
      author: 'Equipo',
      items: [
        '✨ Rediseño completo de etapa de ganancia',
        '✨ Adición de compensación Miller (Cc = 33pF)',
        '📝 Actualización de esquemático completo',
        '📝 Re-simulación de todos los análisis',
        '🐛 Corrección de inestabilidad (margen de fase)',
      ],
    },
    {
      id: 'he3',
      title: 'Versión 1.0 — 2023-10-15',
      author: 'Equipo',
      items: [
        '✨ Creación de estructura del documento',
        '✨ Definición de objetivos y alcance',
        '✨ Marco teórico inicial',
        '✨ Primer diseño de circuito',
        '✨ Lista de componentes (BOM) v1',
      ],
    },
  ],
  banner: {
    emoji: '⚡',
    title: 'Op-Amp Discreto con BJTs',
    subtitle: 'Documentación del Proyecto',
    version: 'v2.1',
    statusText: 'Implementación en Curso',
    bgImage: '',
  },
  objetivosSections: [],
};

const STORAGE_KEY = 'opamp-project-data';

function loadData(): ProjectData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...defaultData,
        ...parsed,
        images: parsed.images || {},
        teamMembers: parsed.teamMembers || defaultData.teamMembers,
        timeline: parsed.timeline || defaultData.timeline,
        historyEntries: parsed.historyEntries || defaultData.historyEntries,
        banner: parsed.banner || defaultData.banner,
        objetivosSections: parsed.objetivosSections || defaultData.objetivosSections,
      };
    }
  } catch {}
  return defaultData;
}

function saveData(data: ProjectData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map(w => w[0]?.toUpperCase() || '')
    .slice(0, 2)
    .join('');
}

export function useProjectStore() {
  const [data, setData] = useState<ProjectData>(loadData);

  useEffect(() => {
    saveData(data);
  }, [data]);

  const toggleCheckItem = useCallback((groupId: string, itemId: string) => {
    setData(prev => {
      const group = prev.checklists[groupId];
      if (!group) return prev;
      return {
        ...prev,
        checklists: {
          ...prev.checklists,
          [groupId]: {
            ...group,
            items: group.items.map(item =>
              item.id === itemId ? { ...item, checked: !item.checked } : item
            ),
          },
        },
      };
    });
  }, []);

  const addCheckItem = useCallback((groupId: string, text: string) => {
    setData(prev => {
      const group = prev.checklists[groupId];
      if (!group) return prev;
      const newItem: ChecklistItem = { id: `${groupId}-${Date.now()}`, text, checked: false };
      return {
        ...prev,
        checklists: {
          ...prev.checklists,
          [groupId]: { ...group, items: [...group.items, newItem] },
        },
      };
    });
  }, []);

  const removeCheckItem = useCallback((groupId: string, itemId: string) => {
    setData(prev => {
      const group = prev.checklists[groupId];
      if (!group) return prev;
      return {
        ...prev,
        checklists: {
          ...prev.checklists,
          [groupId]: { ...group, items: group.items.filter(i => i.id !== itemId) },
        },
      };
    });
  }, []);

  const updateCheckItemText = useCallback((groupId: string, itemId: string, text: string) => {
    setData(prev => {
      const group = prev.checklists[groupId];
      if (!group) return prev;
      return {
        ...prev,
        checklists: {
          ...prev.checklists,
          [groupId]: {
            ...group,
            items: group.items.map(item =>
              item.id === itemId ? { ...item, text } : item
            ),
          },
        },
      };
    });
  }, []);

  const updateTableCell = useCallback((tableId: string, rowId: string, cellIndex: number, value: string) => {
    setData(prev => {
      const table = prev.tables[tableId];
      if (!table) return prev;
      return {
        ...prev,
        tables: {
          ...prev.tables,
          [tableId]: {
            ...table,
            rows: table.rows.map(row =>
              row.id === rowId
                ? { ...row, cells: row.cells.map((c, i) => (i === cellIndex ? value : c)) }
                : row
            ),
          },
        },
      };
    });
  }, []);

  const addTableRow = useCallback((tableId: string) => {
    setData(prev => {
      const table = prev.tables[tableId];
      if (!table) return prev;
      const newRow: TableRow = { id: `${tableId}-${Date.now()}`, cells: table.headers.map(() => '') };
      return {
        ...prev,
        tables: {
          ...prev.tables,
          [tableId]: { ...table, rows: [...table.rows, newRow] },
        },
      };
    });
  }, []);

  const removeTableRow = useCallback((tableId: string, rowId: string) => {
    setData(prev => {
      const table = prev.tables[tableId];
      if (!table) return prev;
      return {
        ...prev,
        tables: {
          ...prev.tables,
          [tableId]: { ...table, rows: table.rows.filter(r => r.id !== rowId) },
        },
      };
    });
  }, []);

  const updateNote = useCallback((noteId: string, value: string) => {
    setData(prev => ({ ...prev, notes: { ...prev.notes, [noteId]: value } }));
  }, []);

  const addActivity = useCallback((text: string, color: ActivityItem['color'] = 'green') => {
    setData(prev => ({
      ...prev,
      activities: [
        { id: `act-${Date.now()}`, time: new Date().toLocaleString('es'), text, color },
        ...prev.activities,
      ].slice(0, 20),
    }));
  }, []);

  const updateActivity = useCallback((actId: string, field: 'time' | 'text' | 'color', value: string) => {
    setData(prev => ({
      ...prev,
      activities: prev.activities.map(a =>
        a.id === actId ? { ...a, [field]: value } : a
      ),
    }));
  }, []);

  const removeActivity = useCallback((actId: string) => {
    setData(prev => ({
      ...prev,
      activities: prev.activities.filter(a => a.id !== actId),
    }));
  }, []);

  const updatePhase = useCallback((phaseId: string, percent: number) => {
    setData(prev => ({
      ...prev,
      phases: prev.phases.map(p =>
        p.id === phaseId
          ? {
              ...p,
              percent,
              status: percent === 100 ? 'Completado' : percent > 0 ? 'En Progreso' : 'Pendiente',
              emoji: percent === 100 ? '🟢' : percent > 0 ? '🟡' : '🔴',
            }
          : p
      ),
    }));
  }, []);

  // Image gallery methods
  const addImage = useCallback((galleryId: string, base64: string) => {
    setData(prev => ({
      ...prev,
      images: {
        ...prev.images,
        [galleryId]: [...(prev.images[galleryId] || []), base64],
      },
    }));
  }, []);

  const removeImage = useCallback((galleryId: string, index: number) => {
    setData(prev => ({
      ...prev,
      images: {
        ...prev.images,
        [galleryId]: (prev.images[galleryId] || []).filter((_, i) => i !== index),
      },
    }));
  }, []);

  // Team members - auto-update initials from name
  const updateTeamMember = useCallback((memberId: string, field: keyof TeamMember, value: string | boolean) => {
    setData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map(m => {
        if (m.id !== memberId) return m;
        const updated = { ...m, [field]: value };
        // Auto-update initials when name changes
        if (field === 'name' && typeof value === 'string') {
          updated.initials = getInitials(value);
        }
        return updated;
      }),
    }));
  }, []);

  const addTeamMember = useCallback(() => {
    setData(prev => ({
      ...prev,
      teamMembers: [
        ...prev.teamMembers,
        { id: `tm-${Date.now()}`, initials: 'NN', name: 'Nuevo Miembro', role: 'Rol', color: 'bg-info' },
      ],
    }));
  }, []);

  const removeTeamMember = useCallback((memberId: string) => {
    setData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter(m => m.id !== memberId),
    }));
  }, []);

  // Timeline
  const updateTimelineStep = useCallback((stepId: string, field: keyof TimelineStep, value: string) => {
    setData(prev => ({
      ...prev,
      timeline: prev.timeline.map(s =>
        s.id === stepId ? { ...s, [field]: value } : s
      ),
    }));
  }, []);

  const addTimelineStep = useCallback(() => {
    setData(prev => ({
      ...prev,
      timeline: [...prev.timeline, { id: `tl-${Date.now()}`, label: 'Nueva Etapa', status: 'pending' as const }],
    }));
  }, []);

  const removeTimelineStep = useCallback((stepId: string) => {
    setData(prev => ({
      ...prev,
      timeline: prev.timeline.filter(s => s.id !== stepId),
    }));
  }, []);

  // History entries
  const addHistoryEntry = useCallback(() => {
    setData(prev => ({
      ...prev,
      historyEntries: [
        {
          id: `he-${Date.now()}`,
          title: `Nueva Versión — ${new Date().toISOString().split('T')[0]}`,
          author: '',
          items: ['✨ Nuevo cambio'],
        },
        ...prev.historyEntries,
      ],
    }));
  }, []);

  const updateHistoryEntry = useCallback((entryId: string, field: keyof HistoryEntry, value: string | string[]) => {
    setData(prev => ({
      ...prev,
      historyEntries: prev.historyEntries.map(e =>
        e.id === entryId ? { ...e, [field]: value } : e
      ),
    }));
  }, []);

  const removeHistoryEntry = useCallback((entryId: string) => {
    setData(prev => ({
      ...prev,
      historyEntries: prev.historyEntries.filter(e => e.id !== entryId),
    }));
  }, []);

  // Banner
  const updateBanner = useCallback((field: keyof BannerConfig, value: string) => {
    setData(prev => ({
      ...prev,
      banner: { ...prev.banner, [field]: value },
    }));
  }, []);

  const getOverallProgress = useCallback(() => {
    const stageLists = ['etapa-diseno', 'etapa-simulacion', 'etapa-implementacion', 'etapa-pruebas'];
    let total = 0;
    let checked = 0;
    stageLists.forEach(id => {
      const group = data.checklists[id];
      if (group) {
        total += group.items.length;
        checked += group.items.filter(i => i.checked).length;
      }
    });
    return total > 0 ? Math.round((checked / total) * 100) : 0;
  }, [data.checklists]);

  const getChecklistProgress = useCallback((groupId: string) => {
    const group = data.checklists[groupId];
    if (!group) return { checked: 0, total: 0 };
    return {
      checked: group.items.filter(i => i.checked).length,
      total: group.items.length,
    };
  }, [data.checklists]);

  const resetData = useCallback(() => {
    setData(defaultData);
  }, []);

  return {
    data,
    toggleCheckItem,
    addCheckItem,
    removeCheckItem,
    updateCheckItemText,
    updateTableCell,
    addTableRow,
    removeTableRow,
    updateNote,
    addActivity,
    updateActivity,
    removeActivity,
    updatePhase,
    addImage,
    removeImage,
    updateTeamMember,
    addTeamMember,
    removeTeamMember,
    updateTimelineStep,
    addTimelineStep,
    removeTimelineStep,
    addHistoryEntry,
    updateHistoryEntry,
    removeHistoryEntry,
    updateBanner,
    getOverallProgress,
    getChecklistProgress,
    resetData,
  };
}
