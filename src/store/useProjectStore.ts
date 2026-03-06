import { useState, useCallback, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
        { id: 'm3', text: 'Multímetro digital', checked: true },
        { id: 'm4', text: 'Osciloscopio (2 canales mín.)', checked: true },
        { id: 'm5', text: 'Generador de funciones', checked: true },
        { id: 'm8', text: 'Resistencias (surtido de valores)', checked: true },
        { id: 'm10', text: 'Cables de conexión', checked: true },
        { id: 'materiales-1772831205123', text: 'Capacitores ceramicos (1nF -20nF)', checked: true },
        { id: 'materiales-1772831214252', text: 'Fuente de +9V', checked: true },
      ],
    },
    'paso1': {
      id: 'paso1',
      title: 'Paso 1: Verificación de Componentes',
      items: [
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
        { id: 'ig1', cells: ['Institución', 'Universidad del Norte'] },
        { id: 'ig2', cells: ['Curso', 'Electrónica 3'] },
        { id: 'ig3', cells: ['Semestre', 'Semestre VII / 2026-10'] },
        { id: 'ig4', cells: ['Docente', 'Mauricio Pardo'] },
        { id: 'ig5', cells: ['Integrantes', 'Sebastián Pupo, Alejandro Rovira, José Villa, Adrián Silva'] },
        { id: 'ig6', cells: ['Fecha de inicio', 'Miércoles 4 de Febrero'] },
        { id: 'ig7', cells: ['Fecha de entrega', 'Viernes  6 de Marzo'] },
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
        { id: 'b2', cells: ['Q3, Q4', 'BJT PNP', '2N3906', '2', 'Carga activa / Espejo de corriente (Par diferencial)'] },
        { id: 'b3', cells: ['Q5', 'BJT NPN', '2N2222', '1', 'Carga activa (Degeneración de Par diferencial)'] },
        { id: 'b4', cells: ['Q6', 'BJT PNP', '2N3906', '1', 'Emisor común con carga activa (PNP)'] },
        { id: 'b5', cells: ['Q7', 'BJT NPN', '2N2222', '1', 'Emisor común con carga activa (NPN)'] },
        { id: 'b6', cells: ['Q8', 'BJT NPN', '2N2222', '1', 'Fuente de corriente Iee'] },
        { id: 'b7', cells: ['R1-R10', 'Resistencias', 'Varios', '12', 'Ver esquemático para valores'] },
        { id: 'b9', cells: ['C1, C2', 'Capacitor cerámico', '1 nF', '2', 'Compensación Miller'] },
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
        { id: 'md3', cells: ['Colector Q1', '7.2', '[Medir]', '—'] },
        { id: 'md4', cells: ['Colector Q2', '7.2', '[Medir]', '—'] },
        { id: 'md5', cells: ['Colector Q5', '8.3', '[Medir]', '—'] },
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
      headers: ['Versión', 'Fecha', 'Descripción', 'Autor', 'Tipo'],
      rows: [
        { id: 'v1', cells: ['v1.0', '2026-02-04', 'Elección de tipo de transistor (BJT o MOSFET) y headroom del OpAmp', 'Equipo', 'Inicial'] },
        { id: 'v2', cells: ['v1.1', '2026-02-06', 'Elección de valores de resistencia y pruebas en etapa espejo de corriente', 'Equipo', 'Inicial'] },
        { id: 'v3', cells: ['v2.0', '2026-02-09', 'Corrección de error de conexión en espejo de corriente', 'José Villa', 'Corrección'] },
        { id: 'v4', cells: ['v2.1', '2026-02-11', 'Corrección de medidas e implementación de etapa diferencial', 'Equipo', 'Mayor'] },
        { id: 'v5', cells: ['v2.2', '2026-02-13', 'Implementación de ultima etapa (pasiva)', 'Equipo', 'Inicial'] },
        { id: 'v6', cells: ['v2.3', '2026-02-13', 'Ajuste de niveles de polarización de la los BJT para ver comportamiento de swing', 'Equipo', 'Modificación'] },
        { id: 'v7', cells: ['v2.4', '2026-02-13', 'Implementación de Feedback', 'Equipo', 'Inicial'] },
        { id: 'v8', cells: ['v2.5', '2026-02-13', 'Fallo de Feedback', 'Equipo', 'Mayor'] },
        { id: 'v9', cells: ['v3.0', '2026-02-20', 'Corrección de etapa final y Feedback', 'Alejandro Rovira', 'Corrección'] },
        { id: 'v10', cells: ['v3.1', '2026-02-20', 'Implementación de todo el sistema con cargas activas', 'Alejandro Rovira', 'Inicial'] },
        { id: 'v11', cells: ['v3.2', '2026-02-20', 'Prueba de funcionamiento en fisico', 'Equipo', 'Inicial'] },
        { id: 'v12', cells: ['v3.3', '2026-02-20', 'Compensación del sistema', 'Equipo', 'Modificación'] },
        { id: 'v13', cells: ['v3.4', '2026-02-20', 'Funcionamiento exitoso del prototipo', 'Equipo', 'Mayor'] },
        { id: 'v14', cells: ['v4.0', '2026-02-25', 'Diseño y fabricación de PCB', 'Sebastián Pupo', 'Inicial'] },
        { id: 'v15', cells: ['v5.0', '2026-03-04', 'Ensamble de PCB', 'Sebastián Pupo y Alejandro Rovira', 'Inicial'] },
        { id: 'v16', cells: ['v5.1', '2026-03-05', 'Pruebas de Funcionamiento de PCB', 'Sebastián Pupo y Alejandro Rovira', 'Mayor'] },
      ],
    },
    'ref-datasheets': {
      id: 'ref-datasheets',
      headers: ['Componente', 'Fabricante', 'Link'],
      rows: [
        { id: 'rd1', cells: ['2N2222 (NPN)', 'ON Semiconductor', 'https://www.alldatasheet.com/datasheet-pdf/pdf/12591/ONSEMI/P2N2222A.html'] },
        { id: 'rd2', cells: ['2N3906 (PNP)', 'ON Semiconductor', 'https://www.alldatasheet.com/datasheet-pdf/pdf/110693/STMICROELECTRONICS/2N3906.html'] },
        { id: 'rd3', cells: ['LM741 (Referencia)', 'Texas Instruments', 'https://www.alldatasheet.com/datasheet-pdf/pdf/840177/TI1/LM741.html'] },
      ],
    },
    'ref-recursos': {
      id: 'ref-recursos',
      headers: ['Recurso', 'Descripción'],
      rows: [
        { id: 'rr1', cells: ['LTSpice Community', 'Foro y tutoriales de simulación'] },
        { id: 'rr2', cells: ['All About Circuits', 'Tutoriales de electrónica'] },
        { id: 'rr3', cells: ['Electronics Tutorials', 'Teoría de op-amps y BJTs'] },
        { id: 'rr4', cells: ['MIT OCW 6.002', 'Curso de circuitos electrónicos'] },
      ],
    },
    'ref-appnotes': {
      id: 'ref-appnotes',
      headers: ['Código', 'Título', 'Fabricante'],
      rows: [
        { id: 'ra1', cells: ['AN-31', 'Op Amp Circuit Collection', 'Texas Instruments'] },
        { id: 'ra2', cells: ['AN-20', 'An Applications Guide for Op Amps', 'Texas Instruments'] },
        { id: 'ra3', cells: ['AN-4', 'Monolithic Op Amp — The Universal Linear Component', 'Texas Instruments'] },
        { id: 'ra4', cells: ['AND9093', 'Understanding BJT Parameters', 'ON Semiconductor'] },
      ],
    },
    'conclusiones-objetivos': {
      id: 'conclusiones-objetivos',
      headers: ['Objetivo', 'Estado'],
      rows: [
        { id: 'co1', cells: ['Comprender arquitectura interna de op-amp', '✅ Completado'] },
        { id: 'co2', cells: ['Diseñar cada etapa del circuito', '✅ Completado'] },
        { id: 'co3', cells: ['Simular comportamiento en SPICE', '✅ Completado'] },
        { id: 'co4', cells: ['Construir prototipo en protoboard', '🔄 En Progreso'] },
        { id: 'co5', cells: ['Caracterizar con mediciones', '⏳ Pendiente'] },
        { id: 'co6', cells: ['Documentar con trazabilidad', '✅ Completado'] },
      ],
    },
    'conclusiones-mejoras': {
      id: 'conclusiones-mejoras',
      headers: ['Mejora', 'Beneficio', 'Dificultad'],
      rows: [
        { id: 'cm1', cells: ['Espejo de corriente Wilson', 'Mayor CMRR y estabilidad de Iee', 'Media'] },
        { id: 'cm2', cells: ['Darlington en etapa de ganancia', 'Mayor ganancia total', 'Baja'] },
        { id: 'cm3', cells: ['Protección de salida', 'Limitación de corriente', 'Media'] },
        { id: 'cm4', cells: ['Diseño PCB', 'Mejor rendimiento y reproducibilidad', 'Alta'] },
        { id: 'cm5', cells: ['Ajuste de offset', 'Reducir voltaje de offset a la salida', 'Baja'] },
      ],
    },
    'problemas-comunes': {
      id: 'problemas-comunes',
      headers: ['Síntoma', 'Posibles Causas', 'Verificación'],
      rows: [
        { id: 'pc1', cells: ['Salida saturada', 'Offset de entrada, error de cableado, BJT dañado', 'Medir Vout sin entrada, verificar conexiones'] },
        { id: 'pc2', cells: ['Oscilaciones', 'Sin compensación, cables largos, falta de desacoplo', 'Agregar Cc, acortar cables, agregar 100nF'] },
        { id: 'pc3', cells: ['Ganancia baja', 'BJT en saturación, valores incorrectos', 'Verificar punto de operación, medir Vce'] },
        { id: 'pc4', cells: ['Distorsión alta', 'Saturación de etapa, clase B crossover', 'Reducir amplitud, verificar polarización'] },
        { id: 'pc5', cells: ['Ruido excesivo', 'Fuente ruidosa, GND loops, acoplamiento', 'Mejorar desacoplo, verificar ruteo GND'] },
      ],
    },
    'costos': {
      id: 'costos',
      headers: ['Componente', 'Cantidad', 'Precio Unitario', 'Subtotal'],
      rows: [
        { id: 'cost1', cells: ['Transistor 2N2222', '10', '$500', '$5000'] },
        { id: 'cost2', cells: ['Transistor 2N3906', '10', '$500', '$5000'] },
        { id: 'cost3', cells: ['Resistencias (surtido)', '10', '$100', '$1000'] },
        { id: 'cost4', cells: ['Capacitores', '4', '$200', '$800'] },
        { id: 'cost5', cells: ['PCB', '1', '$35000', '$35000'] },
        { id: 'costos-1772824717397', cells: ['Pines (regleta)', '1', '$1500', '$1500'] },
        { id: 'costos-1772824754896', cells: ['Borneras', '4', '$500', '$2000'] },
        { id: 'costos-1772824789130', cells: ['Domicilios', '1', '$12000', '$12000'] },
        { id: 'costos-1772824831581', cells: ['Total', '–', '–', '$62300'] },
      ],
    },
    'consideraciones-practicas': {
      id: 'consideraciones-practicas',
      headers: ['Aspecto', 'Recomendación', 'Aplicado'],
      rows: [
        { id: 'cp1', cells: ['Cables cortos', 'Minimizar inductancias parásitas', '✓ Sí'] },
        { id: 'cp2', cells: ['Desacoplo', '100nF en cada rail de alimentación', 'Pendiente'] },
        { id: 'cp3', cells: ['GND común', 'Tierra estrella / punto único', '✓ Sí'] },
        { id: 'cp4', cells: ['Separación de etapas', 'Mantener espacio entre etapas', '✓ Sí'] },
        { id: 'cp5', cells: ['Par diferencial', 'Q1/Q2 cercanos para matching térmico', '✓ Sí'] },
      ],
    },
    'diseno-par-diferencial': {
      id: 'diseno-par-diferencial',
      headers: ['Parámetro', 'Valor', 'Cálculo'],
      rows: [
        { id: 'dpd1', cells: ['Corriente de cola (Iee)', '1 mA', 'Selección de diseño'] },
        { id: 'dpd2', cells: ['Ic1 = Ic2', '0.5 mA', 'Iee / 2'] },
        { id: 'dpd3', cells: ['Transconductancia (gm)', '19.2 mA/V', 'Ic / VT = 0.5mA / 26mV'] },
        { id: 'dpd4', cells: ['Resistencia colector (Rc)', '10 kΩ', 'Selección de diseño'] },
        { id: 'dpd5', cells: ['Ganancia diferencial (Ad)', '192 V/V', 'gm × Rc = 19.2 × 10k'] },
      ],
    },
    'diseno-etapa-ganancia': {
      id: 'diseno-etapa-ganancia',
      headers: ['Parámetro', 'Valor', 'Notas'],
      rows: [
        { id: 'deg1', cells: ['Configuración', 'Emisor Común', 'Con carga resistiva'] },
        { id: 'deg2', cells: ['Ic (Q5)', '1 mA', 'Punto de operación'] },
        { id: 'deg3', cells: ['gm (Q5)', '38.5 mA/V', 'Ic/VT'] },
        { id: 'deg4', cells: ['Rc (Q5)', '10 kΩ', 'Carga de colector'] },
        { id: 'deg5', cells: ['Av etapa 2', '-385 V/V', '-gm × Rc'] },
      ],
    },
    'diseno-ganancia-total': {
      id: 'diseno-ganancia-total',
      headers: ['Parámetro', 'Valor', 'Notas'],
      rows: [
        { id: 'dgt1', cells: ['Av etapa 1 (Ad)', '192 V/V', 'Par diferencial'] },
        { id: 'dgt2', cells: ['Av etapa 2', '385 V/V', 'Emisor común'] },
        { id: 'dgt3', cells: ['Av etapa 3', '1 V/V', 'Push-Pull (seguidor)'] },
        { id: 'dgt4', cells: ['Av total', '73,920 V/V', 'Ad × Av2 × Av3'] },
        { id: 'dgt5', cells: ['Av total (dB)', '≈ 97.4 dB', '20·log(73920)'] },
      ],
    },
    'sim-software': {
      id: 'sim-software',
      headers: ['Software', 'Versión', 'Propósito'],
      rows: [
        { id: 'ss1', cells: ['LTSpice', 'XVII', 'Simulación principal del circuito'] },
        { id: 'ss2', cells: ['Multisim', '14.x', 'Verificación alternativa'] },
      ],
    },
    'sim-dc-resultados': {
      id: 'sim-dc-resultados',
      headers: ['Transistor', 'Ic (mA)', 'Vce (V)', 'Vbe (V)', 'Región'],
      rows: [
        { id: 'sdr1', cells: ['Q1 (NPN)', '0.50', '7.2', '0.65', 'Activa'] },
        { id: 'sdr2', cells: ['Q2 (NPN)', '0.50', '7.2', '0.65', 'Activa'] },
        { id: 'sdr3', cells: ['Q3 (PNP)', '0.50', '5.8', '-0.66', 'Activa'] },
        { id: 'sdr4', cells: ['Q4 (PNP)', '0.50', '5.8', '-0.66', 'Activa'] },
        { id: 'sdr5', cells: ['Q5 (NPN)', '1.02', '8.3', '0.68', 'Activa'] },
        { id: 'sdr6', cells: ['Q6 (NPN)', '2.1', '12.5', '0.70', 'Activa'] },
        { id: 'sdr7', cells: ['Q7 (PNP)', '2.1', '12.5', '-0.70', 'Activa'] },
      ],
    },
    'sim-ac-resultados': {
      id: 'sim-ac-resultados',
      headers: ['Parámetro', 'Simulado', 'Objetivo', 'Estado'],
      rows: [
        { id: 'sar1', cells: ['Ganancia DC', '95.2 dB', '> 60 dB', '✓ Cumple'] },
        { id: 'sar2', cells: ['Frecuencia de corte (-3dB)', '18.5 kHz', '> 10 kHz', '✓ Cumple'] },
        { id: 'sar3', cells: ['Producto ganancia-ancho banda', '1.05 MHz', '—', 'Info'] },
        { id: 'sar4', cells: ['Margen de fase', '62°', '> 45°', '✓ Cumple'] },
        { id: 'sar5', cells: ['Margen de ganancia', '12 dB', '> 6 dB', '✓ Cumple'] },
      ],
    },
    'sim-app-buffer': {
      id: 'sim-app-buffer',
      headers: ['Parámetro', 'Esperado', 'Simulado', 'Estado'],
      rows: [
        { id: 'sab1', cells: ['Ganancia', '1.000', '0.998', '✓'] },
        { id: 'sab2', cells: ['Impedancia de salida', 'Baja', '~50 Ω', '✓'] },
        { id: 'sab3', cells: ['Distorsión', 'Mínima', '< 0.1%', '✓'] },
      ],
    },
    'sim-app-inversor': {
      id: 'sim-app-inversor',
      headers: ['Parámetro', 'Esperado', 'Simulado', 'Estado'],
      rows: [
        { id: 'sai1', cells: ['Ganancia', '-10.00', '-9.97', '✓'] },
        { id: 'sai2', cells: ['BW (-3dB)', '~100 kHz', '95 kHz', '✓'] },
        { id: 'sai3', cells: ['Fase a 1kHz', '180°', '179.8°', '✓'] },
      ],
    },
    'sim-app-noinversor': {
      id: 'sim-app-noinversor',
      headers: ['Parámetro', 'Esperado', 'Simulado', 'Estado'],
      rows: [
        { id: 'san1', cells: ['Ganancia', '+10.00', '+9.98', '✓'] },
        { id: 'san2', cells: ['BW (-3dB)', '~100 kHz', '98 kHz', '✓'] },
        { id: 'san3', cells: ['Fase a 1kHz', '0°', '-0.2°', '✓'] },
      ],
    },
    'archivos-simulacion': {
      id: 'archivos-simulacion',
      headers: ['Nombre del Archivo', 'Software', 'Descripción', 'Estado', '_url'],
      rows: [
        { id: 'archivos-simulacion-1772826936433', cells: ['OPAMP1.asc', 'LTSpice', 'Esquematico del resultado final', 'Completado', 'https://bvnbyukzogdmjgomyxzc.supabase.co/storage/v1/object/public/project-files/simulacion/1772827010483_OPAMP1.asc'] },
        { id: 'archivos-simulacion-1772826937807', cells: ['OPAMP.asc', 'LTSpice', 'Esquematicos de las pruebas preliminares', 'Completado', 'https://bvnbyukzogdmjgomyxzc.supabase.co/storage/v1/object/public/project-files/simulacion/1772827026745_OPAMP.asc'] },
      ],
    },
    'archivos-pcb': {
      id: 'archivos-pcb',
      headers: ['Nombre del Archivo', 'Software', 'Descripción', 'Estado', '_url'],
      rows: [
        { id: 'archivos-pcb-1772826881141', cells: ['PCB_2.zip', 'KiCad', 'Diseño de la PCB del OpAmp', 'Completado', 'https://bvnbyukzogdmjgomyxzc.supabase.co/storage/v1/object/public/project-files/pcb/1772826888645_PCB_2.zip'] },
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
  notes: {
    'diseno-formula-iee': 'Iee = (Vee - Vbe) / Rc = (9 - 0.7) / 10kΩ = 0.83mA',
    'diseno-ganancia-conclusion': 'La ganancia estimada de ~74,000 V/V supera ampliamente el objetivo de >1,000 V/V.',
    'sim-slew-rate': 'SR = ΔV / Δt = [valor medido] V/μs',
    'sim-eq-buffer': '',
    'sim-eq-inversor': 'Av = -Rf/Ri = -100k/10k = -10',
    'sim-eq-noinversor': 'Av = 1 + Rf/Ri = 1 + 90k/10k = +10',
    'mt-desc-opamp': 'Un op-amp es un circuito integrado analógico de tres terminales principales, dos de entrada y uno de salida, diseñado para operar junto con redes de realimentación externas que determinan su comportamiento dentro de un circuito electrónico.',
    'opamp-ideal-real': '1.Un opamp ideal posee una impedancia de entrada que es infinita, por lo que no circula corriente hacia las entradas, y su impedancia de salida es cero, permitiendo entregar la señal sin caída de voltaje. Tiene CMRR infinito, por lo que amplifica únicamente la diferencia entre las entradas y rechaza completamente las señales comunes. No introduce ruido, su ancho de banda es infinito, por lo que amplifica todas las frecuencias por igual, y su offset de entrada es nulo, de modo que cuando ambas entradas son iguales la salida es exactamente cero.\n\nUn op-amp real es una aproximación a ese comportamiento. Posee una impedancia de entrada muy alta pero finita y una impedancia de salida baja pero no nula. Su CMRR es alto pero finito, por lo que parte de la señal común puede aparecer en la salida. Presenta ruido interno, su ancho de banda es limitado, por lo que la ganancia disminuye a medida que aumenta la frecuencia, y tiene un pequeño voltaje de offset de entrada, lo que provoca que la salida no sea exactamente cero incluso cuando ambas entradas son iguales.',
    'mt-toggle-diferencial-title': '🔀 Etapa Diferencial',
    'mt-toggle-emisor-title': '🔊 Etapa de emisor común con carga activa',
    'mt-toggle-espejo-title': '🪞Etapa Espejo de Corriente',
    'diseno-calc-sections': '[{"id":"calc-par-dif","title":"Fuente de Corriente","tableId":"diseno-par-diferencial","noteId":"diseno-formula-iee"},{"id":"calc-etapa-gan","title":"Etapa Par diferencial (carga pasiva)","tableId":"diseno-etapa-ganancia"},{"id":"calc-ganancia-total","title":"Ganancia Total Estimada","tableId":"diseno-ganancia-total","noteId":"diseno-ganancia-conclusion"}]',
    'gallery-blocks-diseno-esquematico': '[{"id":"diseno-esquematico-default","label":"Esquemático completo","date":"2026-02-20"}]',
    'gallery-blocks-sim-ac': '[{"id":"sim-ac-default","label":"Gráficas AC (Lazo abierto y Lazo cerrado)","date":"2026-02-20"}]',
    'gallery-blocks-mediciones-osciloscopio': '[{"id":"mediciones-osciloscopio-default","label":"Fotos Osciloscopio","date":"2026-02-11"}]',
    'gallery-blocks-diseno-etapas': '[{"id":"diseno-etapas-default","label":"Esquemático de Fuente de corriente y Espejo de corriente","date":"2026-02-06"},{"id":"diseno-etapas-1772828904781","label":"Esquemático de Espejo de corriente + Par diferencial (carga pasiva)","date":"2026-03-11"},{"id":"diseno-etapas-1772828905919","label":"Esquemático de Espejo + Par dif+ Etapa 2 (pseudo final) - Prueba de swing","date":"2026-03-13"},{"id":"diseno-etapas-1772828907460","label":"Esquemático de Espejo + Par dif (carga activa)","date":""},{"id":"diseno-etapas-1772831712017","label":"Esquemático de Espejo + Par dif (carga activa) + Etapa emisor común con carga activa","date":""}]',
    'table-meta-diseno-par-diferencial': '{"name":"","date":"2026-02-06"}',
    'table-meta-diseno-etapa-ganancia': '{"name":"","date":"2026-02-06"}',
    'table-meta-sim-ac-resultados': '{"name":"","date":"2026-03-20"}',
  },
  images: {
    'diseno-esquematico-default': ['https://bvnbyukzogdmjgomyxzc.supabase.co/storage/v1/object/public/project-files/images/diseno-esquematico-default/1772826473716-5n1geq.png'],
    'diseno-esquematico-1772826483111': [
      'https://bvnbyukzogdmjgomyxzc.supabase.co/storage/v1/object/public/project-files/images/diseno-esquematico-1772826483111/1772826511764-xoic81.png',
      'https://bvnbyukzogdmjgomyxzc.supabase.co/storage/v1/object/public/project-files/images/diseno-esquematico-1772826483111/1772826557828-icahig.png',
    ],
    'diseno-esquematico-1772826561857': [
      'https://bvnbyukzogdmjgomyxzc.supabase.co/storage/v1/object/public/project-files/images/diseno-esquematico-1772826561857/1772826583517-3y6dih.png',
      'https://bvnbyukzogdmjgomyxzc.supabase.co/storage/v1/object/public/project-files/images/diseno-esquematico-1772826561857/1772826639324-9vgsrj.png',
    ],
    'diseno-esquematico-1772826653533': ['https://bvnbyukzogdmjgomyxzc.supabase.co/storage/v1/object/public/project-files/images/diseno-esquematico-1772826653533/1772826703157-9jiyyo.png'],
    'diseno-esquematico-1772826726012': ['https://bvnbyukzogdmjgomyxzc.supabase.co/storage/v1/object/public/project-files/images/diseno-esquematico-1772826726012/1772827192956-mzlpw5.png'],
    'sim-ac-default': [
      'https://bvnbyukzogdmjgomyxzc.supabase.co/storage/v1/object/public/project-files/images/sim-ac-default/1772826318824-v8jlma.png',
      'https://bvnbyukzogdmjgomyxzc.supabase.co/storage/v1/object/public/project-files/images/sim-ac-default/1772826345513-inwdxt.png',
      'https://bvnbyukzogdmjgomyxzc.supabase.co/storage/v1/object/public/project-files/images/sim-ac-default/1772826365501-g0hii0.png',
      'https://bvnbyukzogdmjgomyxzc.supabase.co/storage/v1/object/public/project-files/images/sim-ac-default/1772826399020-96mt1c.png',
    ],
    'impl-fotos-default': [
      'https://bvnbyukzogdmjgomyxzc.supabase.co/storage/v1/object/public/project-files/images/impl-fotos-default/1772830385337-xg8yhl.jpeg',
      'https://bvnbyukzogdmjgomyxzc.supabase.co/storage/v1/object/public/project-files/images/impl-fotos-default/1772830403995-30a4u1.jpeg',
      'https://bvnbyukzogdmjgomyxzc.supabase.co/storage/v1/object/public/project-files/images/impl-fotos-default/1772830415643-tng7st.jpeg',
      'https://bvnbyukzogdmjgomyxzc.supabase.co/storage/v1/object/public/project-files/images/impl-fotos-default/1772830568795-xvwh0q.jpeg',
      'https://bvnbyukzogdmjgomyxzc.supabase.co/storage/v1/object/public/project-files/images/impl-fotos-default/1772830579819-n0uzo5.jpeg',
      'https://bvnbyukzogdmjgomyxzc.supabase.co/storage/v1/object/public/project-files/images/impl-fotos-default/1772830608131-ifuuxw.jpeg',
      'https://bvnbyukzogdmjgomyxzc.supabase.co/storage/v1/object/public/project-files/images/impl-fotos-default/1772830620426-lubwy5.jpeg',
      'https://bvnbyukzogdmjgomyxzc.supabase.co/storage/v1/object/public/project-files/images/impl-fotos-default/1772830629497-uflw8c.jpeg',
      'https://bvnbyukzogdmjgomyxzc.supabase.co/storage/v1/object/public/project-files/images/impl-fotos-default/1772830655045-7bajjp.jpeg',
    ],
  },
  teamMembers: [
    { id: 'tm1', initials: 'SP', name: 'Sebastián Pupo', role: 'Diseño y Coordinación', color: 'bg-info', isLeader: true },
    { id: 'tm2', initials: 'AR', name: 'Alejandro Rovira', role: 'Simulación y Análisis', color: 'bg-warning' },
    { id: 'tm3', initials: 'JV', name: 'José Villa', role: 'Documentación', color: 'bg-success' },
    { id: 'tm-1772823724963', initials: 'AS', name: 'Adrián Silva', role: 'Comunicación', color: 'bg-destructive' },
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
      id: 'he-1772829762973',
      title: 'Versión v2.2 — 2026-02-13',
      author: 'Equipo',
      items: [
        '✨El objetivo era añadir una etapa 2 a la salida del Par diferencial para ver el comportamiento del swing que tenia el Q-PNP del  "emisor común con degeneración pasiva" para entender que hacer en caso de que el swing no sea lo suficientemente "fuerte"(se recorta el swing en colector o en emisor si los puntos de operacion no le permiten completar un semiciclo positivo y/o negativo)',
        '📝Con el fin de corregir el problema del swing en dicho transistor , se fueron modificando en el simulador los valores de resistencia y de Vcm hasta lograr visualizar la señal completa en emisor y en colector y que estén desfasadas 180º',
        '📎 Los valores al final teniedo en cuenta los valores comerciales, fueron: 6.8k, 2.2k y Vcm',
      ],
    },
    {
      id: 'he-1772828819657',
      title: 'Versión v2.1 — 2026-02-11',
      author: 'Equipo',
      items: [
        '✨ Una vez corregido el problema de conexión en la fuente de corriente, se actualizaron  los datos tomados el viernes pasado (6 de febrero) y se implemento el Par dif. con carga pasiva',
        '✨Se hicieron pruebas del punto de operación de los transistores usando el generador de  señales de doble canal.',
        '✨Se midió el nivel DC usando Vcm (bateria de 9V + divisor de tensión en el momento)  en la base de Q2 y una señal senoidal con 10mVpp y aproximadamente 5V de offset Luego, midiendo con el osciloscopio y usando el multimetro (Fluke 179) para ver la cantidad de voltaje en las bases nivel de offset que la señal debe lograr para que Vc1 y Vc2 sean iguales (Vc=voltaje de colector)',
        '✨Un vez ajustado el offset, se fue aumentando la amplitud de la señal poco a poco hasta lograr ver una 2 señales seno desfasadas 180º',
      ],
    },
    {
      id: 'he1',
      title: 'Versión v2.0 — 2026-02-09',
      author: 'José Villa',
      items: [
        '🐛 Se corrigió un problema de conexión en la fuente de corriente que hacia  que en el espejo de corriente y en el par diferencial no permitiera el correcto  paso de la corriente, mas si media voltaje. Lo que lo ocasionaba, era que no se conectaron  la base y el colector para forzar activa directa en el transistor. Con esto corregido, las simulaciones  y las mediciones resultaron más coherentes con los valores esperados.',
      ],
    },
    {
      id: 'he2',
      title: 'Versión v1.1 — 2026-02-06',
      author: 'Equipo',
      items: [
        '✨ Elección de valores de resistencia y pruebas en etapa espejo de corriente',
      ],
    },
    {
      id: 'he3',
      title: 'Versión v1.0 — 2026-02-04',
      author: 'Equipo',
      items: [
        '✨ Creación de estructura del documento',
        '✨ Definición de objetivos y alcance',
        '✨ Marco teórico inicial',
        '✨ Elección de tipo de transistor (BJT o MOSFET) y headroom del OpAmp',
      ],
    },
  ],
  banner: {
    emoji: '',
    title: '',
    subtitle: '',
    version: 'v5.1',
    statusText: 'Implementación en Curso',
    bgImage: '',
  },
  objetivosSections: [],
};

const STORAGE_KEY = 'opamp-project-data';

function mergeWithDefaults(parsed: any): ProjectData {
  return {
    ...defaultData,
    ...parsed,
    images: parsed.images || {},
    notes: { ...defaultData.notes, ...(parsed.notes || {}) },
    tables: { ...defaultData.tables, ...(parsed.tables || {}) },
    teamMembers: parsed.teamMembers || defaultData.teamMembers,
    timeline: parsed.timeline || defaultData.timeline,
    historyEntries: parsed.historyEntries || defaultData.historyEntries,
    banner: parsed.banner || defaultData.banner,
    objetivosSections: parsed.objetivosSections || defaultData.objetivosSections,
  };
}

function loadData(): ProjectData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return mergeWithDefaults(JSON.parse(stored));
    }
  } catch {}
  return defaultData;
}

function saveData(data: ProjectData) {
  try {
    // Images are now URLs (not base64), safe to store
    const serialized = JSON.stringify(data);
    // Only write to localStorage if it fits (< 4MB to be safe)
    if (serialized.length < 4_000_000) {
      localStorage.setItem(STORAGE_KEY, serialized);
    } else {
      // Too large for localStorage, skip — cloud is the source of truth
      console.warn('Data too large for localStorage, relying on cloud only');
    }
  } catch (e) {
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      console.warn('localStorage quota exceeded, relying on cloud only');
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
    }
  }
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map(w => w[0]?.toUpperCase() || '')
    .slice(0, 2)
    .join('');
}

// Debounce helper
function debounce<T extends (...args: any[]) => any>(fn: T, ms: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

async function loadFromCloud(): Promise<ProjectData | null> {
  try {
    const { data, error } = await supabase
      .from('project_data')
      .select('data')
      .eq('id', 'main')
      .maybeSingle();
    if (error) { console.error('Cloud load error:', error); return null; }
    if (data?.data) return mergeWithDefaults(data.data);
  } catch (e) { console.error('Cloud load exception:', e); }
  return null;
}

function isDataMeaningful(projectData: ProjectData): boolean {
  // Check if this data has user content beyond defaults
  const noteCount = Object.keys(projectData.notes).length;
  const imageCount = Object.values(projectData.images).reduce((sum, arr) => sum + arr.length, 0);
  const tableRowCount = Object.values(projectData.tables).reduce((sum, t) => sum + t.rows.length, 0);
  return noteCount > 5 || imageCount > 0 || tableRowCount > 10;
}

async function saveToCloud(projectData: ProjectData) {
  try {
    // Safety: never overwrite meaningful cloud data with empty/default data
    if (!isDataMeaningful(projectData)) {
      // Double-check what's in the cloud first
      const { data: existing } = await supabase
        .from('project_data')
        .select('data')
        .eq('id', 'main')
        .maybeSingle();
      if (existing?.data && isDataMeaningful(mergeWithDefaults(existing.data))) {
        console.warn('Prevented overwriting meaningful cloud data with defaults');
        return;
      }
    }

    const { error } = await supabase
      .from('project_data')
      .upsert({ id: 'main', data: projectData as any }, { onConflict: 'id' });
    if (error) console.error('Cloud save error:', error);
  } catch (e) { console.error('Cloud save exception:', e); }
}

export function useProjectStore() {
  const [data, setData] = useState<ProjectData>(loadData);
  const [cloudLoaded, setCloudLoaded] = useState(false);
  const syncRef = useRef({ lastTimestamp: null as string | null, saving: false, initialLoadDone: false, dirty: false });

  // On mount: load from cloud (takes priority over localStorage)
  useEffect(() => {
    let isActive = true;

    loadFromCloud().then(cloudData => {
      if (!isActive) return;
      if (cloudData) {
        setData(cloudData);
        saveData(cloudData);
      } else {
        saveToCloud(loadData());
      }
      syncRef.current.initialLoadDone = true;
      setCloudLoaded(true);
    });

    // Subscribe to realtime changes from other devices
    const channel = supabase
      .channel('project-sync')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'project_data', filter: 'id=eq.main' },
        (payload) => {
          // Skip if we have unsaved local changes or just saved
          if (syncRef.current.saving || syncRef.current.dirty) {
            if (payload.new?.updated_at) {
              syncRef.current.lastTimestamp = payload.new.updated_at;
            }
            syncRef.current.saving = false;
            return;
          }
          if (payload.new?.data) {
            const merged = mergeWithDefaults(payload.new.data);
            setData(merged);
            saveData(merged);
            if (payload.new?.updated_at) {
              syncRef.current.lastTimestamp = payload.new.updated_at;
            }
          }
        }
      )
      .subscribe();

    // Fallback polling every 30s (increased from 10s to reduce conflicts)
    const pollInterval = setInterval(async () => {
      // Skip if we have unsaved local changes
      if (syncRef.current.saving || syncRef.current.dirty) return;
      try {
        const { data: row } = await supabase
          .from('project_data')
          .select('data, updated_at')
          .eq('id', 'main')
          .maybeSingle();
        if (row?.data && row.updated_at && row.updated_at !== syncRef.current.lastTimestamp) {
          syncRef.current.lastTimestamp = row.updated_at;
          const merged = mergeWithDefaults(row.data);
          setData(merged);
          saveData(merged);
        }
      } catch {}
    }, 30000);

    return () => {
      isActive = false;
      clearInterval(pollInterval);
      supabase.removeChannel(channel);
    };
  }, []);

  // Save to cloud on changes — but ONLY after initial cloud load is done
  const saveToCloudMarked = useRef(debounce(async (d: ProjectData) => {
    syncRef.current.saving = true;
    await saveToCloud(d);
    // Mark as no longer dirty after successful save
    syncRef.current.dirty = false;
    setTimeout(() => { syncRef.current.saving = false; }, 2000);
  }, 1500)).current;

  useEffect(() => {
    if (!syncRef.current.initialLoadDone) return;
    // Mark as dirty immediately when data changes locally
    syncRef.current.dirty = true;
    saveData(data);
    if (cloudLoaded) {
      saveToCloudMarked(data);
    }
  }, [data, cloudLoaded]);

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

  const updateTableHeader = useCallback((tableId: string, headerIndex: number, value: string) => {
    setData(prev => {
      const table = prev.tables[tableId];
      if (!table) return prev;
      return {
        ...prev,
        tables: {
          ...prev.tables,
          [tableId]: {
            ...table,
            headers: table.headers.map((h, i) => (i === headerIndex ? value : h)),
          },
        },
      };
    });
  }, []);

  const addTableColumn = useCallback((tableId: string, headerName: string = 'Nueva') => {
    setData(prev => {
      const table = prev.tables[tableId];
      if (!table) return prev;
      return {
        ...prev,
        tables: {
          ...prev.tables,
          [tableId]: {
            ...table,
            headers: [...table.headers, headerName],
            rows: table.rows.map(row => ({ ...row, cells: [...row.cells, ''] })),
          },
        },
      };
    });
  }, []);

  const removeTableColumn = useCallback((tableId: string, colIndex: number) => {
    setData(prev => {
      const table = prev.tables[tableId];
      if (!table || table.headers.length <= 1) return prev;
      return {
        ...prev,
        tables: {
          ...prev.tables,
          [tableId]: {
            ...table,
            headers: table.headers.filter((_, i) => i !== colIndex),
            rows: table.rows.map(row => ({ ...row, cells: row.cells.filter((_, i) => i !== colIndex) })),
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

  const createTable = useCallback((tableId: string, headers: string[]) => {
    setData(prev => {
      if (prev.tables[tableId]) return prev;
      return {
        ...prev,
        tables: {
          ...prev.tables,
          [tableId]: { id: tableId, headers, rows: [] },
        },
      };
    });
  }, []);

  const removeTable = useCallback((tableId: string) => {
    setData(prev => {
      const { [tableId]: _, ...rest } = prev.tables;
      return { ...prev, tables: rest };
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
    updateTableHeader,
    addTableColumn,
    removeTableColumn,
    addTableRow,
    removeTableRow,
    createTable,
    removeTable,
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
