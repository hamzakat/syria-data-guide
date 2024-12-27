import { GoogleSpreadsheet } from 'google-spreadsheet';

export async function fetchSourcesFromSheet() {
    if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_API_KEY) {
        throw new Error('Missing required environment variables: GOOGLE_SHEET_ID or GOOGLE_API_KEY');
    }

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, {
      apiKey: process.env.GOOGLE_API_KEY!
    });
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