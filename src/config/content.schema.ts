export interface LocalizedString {
  he: string;
  en: string;
}

export type LinkType = 'video' | 'document' | 'drive' | 'external' | 'procedure' | 'form';

export interface LinkItem {
  id: string;
  title: LocalizedString;
  url: string;
  description?: LocalizedString;
  type: LinkType;
  icon?: string;
  tags?: string[];
}

export interface SectionConfig {
  id: string;
  title: LocalizedString;
  subtitle?: LocalizedString;
  order: number;
  columns?: number;
  links: LinkItem[];
}

export interface PortalConfig {
  meta: {
    title: LocalizedString;
    subtitle: LocalizedString;
    defaultLanguage: 'he' | 'en';
  };
  sections: SectionConfig[];
}
