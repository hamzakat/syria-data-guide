const dotenv = require('dotenv');
const { fetchSourcesFromSheet } = require('../src/lib/sheets');
const fs = require('fs/promises');
const path = require('path');

dotenv.config();

async function generateSourcesData() {
  try {
    const sources = await fetchSourcesFromSheet();  
    await fs.mkdir(path.join(process.cwd(), 'src', 'data'), { recursive: true });
    
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