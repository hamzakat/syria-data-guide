import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';


export async function fetchSourcesFromSheet() {
  if (!process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || 
      !process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL || 
      !process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY) {
      throw new Error('Missing required environment variables');
  }

  const serviceAccountAuth = new JWT({
      email: process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: [
          'https://www.googleapis.com/auth/spreadsheets.readonly',
          'https://www.googleapis.com/auth/spreadsheets'
      ],
  });

  const doc = new GoogleSpreadsheet(process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID, serviceAccountAuth);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle["Sources"];
  const rows = await sheet.getRows();
  
    return rows.map((row) => {
      // Access properties using get() method
      const formats = row.get('formats')?.split(',').map((format: string) => {
        const [id, en, ar] = format.trim().split('|');
        return { id, en, ar };
      });
  
      const topics = row.get('topics')?.split(',').map((topic: string) => {
        const [id, en, ar] = topic.trim().split('|');
        return { id, en, ar };
      });
  
      return {
        title: {
          en: row.get('title_en'),
          ar: row.get('title_ar'),
        },
        description: {
          en: row.get('description_en'),
          ar: row.get('description_ar'),
        },
        url: row.get('url'),
        logo: row.get('logo') || undefined,
        formats,
        topics,
      };
    });
}