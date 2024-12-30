import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function submitToSheet(data: any) {
	if (!process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || 
		!process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL || 
		!process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY) {
		throw new Error('Missing required environment variables');
	}

	const serviceAccountAuth = new JWT({
		email: process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL,
		key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
		scopes: [
			'https://www.googleapis.com/auth/spreadsheets',
		],
	});

  const doc = new GoogleSpreadsheet(process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID, serviceAccountAuth);
  await doc.loadInfo();
  
  const sheet = doc.sheetsByTitle["Submissions"];
  
  if (!sheet) {
    throw new Error('Submissions sheet not found');
  }

  await sheet.addRow({
    email: data.email || '',
    url: data.url,
    formats: data.formats.join(', '),
    topics: data.topics.join(', '),
    description: data.description || '',
    submitted_at: new Date().toISOString(),
    status: 'pending'
  });

  return true;
}