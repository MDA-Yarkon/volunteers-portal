import { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { PortalConfig, SectionConfig, LinkItem } from '../config/content.schema';
import { portalConfig as defaultConfig } from '../config/content';

const STORAGE_KEY = 'mda-portal-config';

export interface ContentContextValue {
  config: PortalConfig;
  updateMeta: (meta: PortalConfig['meta']) => void;
  updateSection: (sectionId: string, updates: Partial<SectionConfig>) => void;
  addSection: (section: SectionConfig) => void;
  removeSection: (sectionId: string) => void;
  reorderSections: (orderedIds: string[]) => void;
  updateLink: (sectionId: string, linkId: string, updates: Partial<LinkItem>) => void;
  addLink: (sectionId: string, link: LinkItem) => void;
  removeLink: (sectionId: string, linkId: string) => void;
  reorderLinks: (sectionId: string, orderedIds: string[]) => void;
  exportConfig: () => string;
  importConfig: (json: string) => boolean;
  resetConfig: () => void;
}

export const ContentContext = createContext<ContentContextValue | null>(null);

function loadConfig(): PortalConfig {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* fall through */ }
  return defaultConfig;
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<PortalConfig>(loadConfig);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const updateMeta = useCallback((meta: PortalConfig['meta']) => {
    setConfig(prev => ({ ...prev, meta }));
  }, []);

  const updateSection = useCallback((sectionId: string, updates: Partial<SectionConfig>) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === sectionId ? { ...s, ...updates } : s),
    }));
  }, []);

  const addSection = useCallback((section: SectionConfig) => {
    setConfig(prev => ({ ...prev, sections: [...prev.sections, section] }));
  }, []);

  const removeSection = useCallback((sectionId: string) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.filter(s => s.id !== sectionId),
    }));
  }, []);

  const reorderSections = useCallback((orderedIds: string[]) => {
    setConfig(prev => ({
      ...prev,
      sections: orderedIds
        .map((id, i) => {
          const section = prev.sections.find(s => s.id === id);
          return section ? { ...section, order: i + 1 } : null;
        })
        .filter((s): s is SectionConfig => s !== null),
    }));
  }, []);

  const updateLink = useCallback((sectionId: string, linkId: string, updates: Partial<LinkItem>) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map(s =>
        s.id === sectionId
          ? { ...s, links: s.links.map(l => l.id === linkId ? { ...l, ...updates } : l) }
          : s
      ),
    }));
  }, []);

  const addLink = useCallback((sectionId: string, link: LinkItem) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map(s =>
        s.id === sectionId ? { ...s, links: [...s.links, link] } : s
      ),
    }));
  }, []);

  const removeLink = useCallback((sectionId: string, linkId: string) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map(s =>
        s.id === sectionId ? { ...s, links: s.links.filter(l => l.id !== linkId) } : s
      ),
    }));
  }, []);

  const reorderLinks = useCallback((sectionId: string, orderedIds: string[]) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map(s => {
        if (s.id !== sectionId) return s;
        const reordered = orderedIds
          .map(id => s.links.find(l => l.id === id))
          .filter((l): l is LinkItem => l !== undefined);
        return { ...s, links: reordered };
      }),
    }));
  }, []);

  const exportConfig = useCallback(() => JSON.stringify(config, null, 2), [config]);

  const importConfig = useCallback((json: string): boolean => {
    try {
      const parsed = JSON.parse(json);
      if (!parsed.meta || !Array.isArray(parsed.sections)) return false;
      setConfig(parsed as PortalConfig);
      return true;
    } catch {
      return false;
    }
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(defaultConfig);
  }, []);

  return (
    <ContentContext.Provider value={{
      config, updateMeta, updateSection, addSection, removeSection, reorderSections,
      updateLink, addLink, removeLink, reorderLinks, exportConfig, importConfig, resetConfig,
    }}>
      {children}
    </ContentContext.Provider>
  );
}
