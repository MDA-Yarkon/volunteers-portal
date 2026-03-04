import type { PortalConfig } from './content.schema';

export const portalConfig: PortalConfig = {
  meta: {
    title: { he: 'פורטל מתנדבים', en: 'Volunteers Portal' },
    subtitle: { he: 'מד"א - מרחב ירקון', en: 'MDA - Yarkon District' },
    defaultLanguage: 'he',
  },
  sections: [
    {
      id: 'training-videos',
      title: { he: 'סרטוני הדרכה', en: 'Training Videos' },
      subtitle: { he: 'סרטוני הדרכה מקצועיים', en: 'Professional training videos' },
      order: 1,
      columns: 6,
      links: [
        {
          id: 'cpr-basics',
          title: { he: 'החייאה בסיסית', en: 'Basic CPR' },
          url: 'https://www.youtube.com/watch?v=example1',
          description: { he: 'סרטון הדרכה להחייאה בסיסית', en: 'Basic CPR training video' },
          type: 'video',
        },
        {
          id: 'first-aid',
          title: { he: 'עזרה ראשונה', en: 'First Aid' },
          url: 'https://www.youtube.com/watch?v=example2',
          description: { he: 'עקרונות עזרה ראשונה', en: 'First aid principles' },
          type: 'video',
        },
      ],
    },
    {
      id: 'protocols',
      title: { he: 'נהלים ופרוטוקולים', en: 'Procedures & Protocols' },
      subtitle: { he: 'מסמכי נהלים רשמיים', en: 'Official procedure documents' },
      order: 2,
      columns: 6,
      links: [
        {
          id: 'emergency-protocol',
          title: { he: 'נוהל חירום', en: 'Emergency Protocol' },
          url: 'https://drive.google.com/drive/folders/1-vu_AfZSfHwivWjxBD65aiWjld5cDWoM?usp=sharing',
          description: { he: 'נוהל הפעלה במצב חירום', en: 'Emergency activation procedure' },
          type: 'procedure',
        },
        {
          id: 'shift-protocol',
          title: { he: 'נוהל משמרת', en: 'Shift Protocol' },
          url: 'https://drive.google.com/drive/folders/1-vu_AfZSfHwivWjxBD65aiWjld5cDWoM?usp=sharing',
          description: { he: 'נוהל ניהול משמרת', en: 'Shift management procedure' },
          type: 'document',
        },
      ],
    },
    {
      id: 'drive-resources',
      title: { he: 'מסמכים משותפים', en: 'Shared Documents' },
      subtitle: { he: 'תיקיות Google Drive משותפות', en: 'Shared Google Drive folders' },
      order: 3,
      columns: 12,
      links: [
        {
          id: 'shared-drive',
          title: { he: 'תיקייה משותפת - מרחב ירקון', en: 'Shared Folder - Yarkon Branch' },
          url: 'https://drive.google.com/drive/folders/1-vu_AfZSfHwivWjxBD65aiWjld5cDWoM?usp=sharing',
          description: { he: 'כל המסמכים המשותפים של המרחב', en: 'All branch shared documents' },
          type: 'drive',
        },
        {
          id: 'forms-folder',
          title: { he: 'טפסים', en: 'Forms' },
          url: 'https://drive.google.com/drive/folders/1-vu_AfZSfHwivWjxBD65aiWjld5cDWoM?usp=sharing',
          description: { he: 'טפסים ומסמכים לדיווח', en: 'Reporting forms and documents' },
          type: 'form',
        },
        {
          id: 'knowledge-base',
          title: { he: 'בסיס ידע מקצועי', en: 'Professional Knowledge Base' },
          url: 'https://drive.google.com/drive/folders/1-vu_AfZSfHwivWjxBD65aiWjld5cDWoM?usp=sharing',
          description: { he: 'חומרי לימוד ועיון מקצועיים', en: 'Professional study and reference materials' },
          type: 'drive',
        },
      ],
    },
  ],
};
