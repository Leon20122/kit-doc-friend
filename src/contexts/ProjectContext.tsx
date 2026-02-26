import React, { createContext, useContext } from 'react';
import { useProjectStore } from '@/store/useProjectStore';

type ProjectStoreReturn = ReturnType<typeof useProjectStore>;

const ProjectContext = createContext<ProjectStoreReturn | null>(null);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const store = useProjectStore();
  return <ProjectContext.Provider value={store}>{children}</ProjectContext.Provider>;
}

export function useProject() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error('useProject must be used within ProjectProvider');
  return ctx;
}
