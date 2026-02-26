import { useState } from 'react';
import { ProjectProvider } from '@/contexts/ProjectContext';
import { Sidebar, type SectionId } from '@/components/Sidebar';
import { HeaderBanner } from '@/components/HeaderBanner';
import { Dashboard } from '@/sections/Dashboard';
import { Objetivos } from '@/sections/Objetivos';
import { MarcoTeorico } from '@/sections/MarcoTeorico';
import { Especificaciones } from '@/sections/Especificaciones';
import { DisenoCircuito } from '@/sections/DisenoCircuito';
import { Simulaciones } from '@/sections/Simulaciones';
import { Implementacion } from '@/sections/Implementacion';
import { Mediciones } from '@/sections/Mediciones';
import { ProblemasSoluciones } from '@/sections/ProblemasSoluciones';
import { Conclusiones } from '@/sections/Conclusiones';
import { Referencias } from '@/sections/Referencias';
import { ControlCambios } from '@/sections/ControlCambios';

function AppContent() {
  const [activeSection, setActiveSection] = useState<SectionId>('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard': return <Dashboard onNavigate={setActiveSection} />;
      case 'objetivos': return <Objetivos />;
      case 'marco-teorico': return <MarcoTeorico />;
      case 'especificaciones': return <Especificaciones />;
      case 'diseno-circuito': return <DisenoCircuito />;
      case 'simulaciones': return <Simulaciones />;
      case 'implementacion': return <Implementacion />;
      case 'mediciones': return <Mediciones />;
      case 'problemas-soluciones': return <ProblemasSoluciones />;
      case 'conclusiones': return <Conclusiones />;
      case 'referencias': return <Referencias />;
      case 'control-cambios': return <ControlCambios />;
      default: return <Dashboard onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="flex-1 lg:ml-0 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-6">
          <HeaderBanner />
          {renderSection()}
        </div>
      </main>
    </div>
  );
}

const Index = () => (
  <ProjectProvider>
    <AppContent />
  </ProjectProvider>
);

export default Index;
