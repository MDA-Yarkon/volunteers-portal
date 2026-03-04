import { useContext } from 'react';
import { ContentContext, type ContentContextValue } from './ContentContext';

export function useContent(): ContentContextValue {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}
