import dotenv from 'dotenv';
import { fetchSourcesFromSheet } from '../src/lib/sheets';
import fs from 'fs/promises';
import path from 'path';


dotenv.config();

async function generateSourcesData() {
  try {
    const sources = await fetchSourcesFromSheet();  
    // Create the data directory if it doesn't exist
    await fs.mkdir(path.join(process.cwd(), 'src', 'data'), { recursive: true });
    
    // Write the data to a JSON file
    await fs.writeFile(
      path.join(process.cwd(), 'src', 'data', 'sources.json'),
      JSON.stringify(sources, null, 2)
    );

    console.log('Sources data generated successfully!');
  } catch (error) {
    console.error('Error generating sources data:', error);
    process.exit(1);
  }
}

generateSourcesData();