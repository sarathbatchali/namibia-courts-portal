import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '.env') });

import { getPayload } from 'payload';
import config from './src/payload.config';
import fs from 'fs';
import axios from 'axios';
import https from 'https';

const httpsAgent = new https.Agent({  
  rejectUnauthorized: false
});

const migrate = async () => {
  const payload = await getPayload({ 
    config
  });
  const dataPath = path.resolve(__dirname, 'migration-data.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  console.log(`Starting migration of ${data.length} documents...`);

  for (const item of data) {
    try {
      console.log(`Processing: ${item.title}`);

      // 1. Download file
      const response = await axios({
        method: 'get',
        url: item.url,
        responseType: 'arraybuffer',
        httpsAgent: httpsAgent,
      });

      const fileName = path.basename(decodeURIComponent(item.url));
      const tempPath = path.resolve(__dirname, 'temp', fileName);
      
      if (!fs.existsSync(path.resolve(__dirname, 'temp'))) {
        fs.mkdirSync(path.resolve(__dirname, 'temp'));
      }

      fs.writeFileSync(tempPath, response.data);

      // 2. Extract metadata
      const yearMatch = item.title.match(/\d{4}/);
      const year = yearMatch ? yearMatch[0] : '2025';
      
      let rollType: 'day' | 'continuous' | 'motion' | 'fixed' = 'day';
      if (item.title.toLowerCase().includes('term roll')) rollType = 'continuous';
      if (item.title.toLowerCase().includes('motion')) rollType = 'motion';
      
      const dateStr = item.title.match(/(\d{4})\s+(\w+)\s+(\d{1,2})/) || item.title.match(/(\w+)\s+(\d{1,2}),\s+(\d{4})/);
      let finalDate = new Date(`${year}-01-01`); 
      
      if (dateStr) {
        finalDate = new Date(dateStr[0]);
      }

      // 3. Create Payload Record
      await payload.create({
        collection: 'court-rolls',
        data: {
          title: item.title,
          court: 'supreme',
          division: 'windhoek',
          rollType: rollType,
          rollDate: finalDate.toISOString(),
        },
        file: {
          data: fs.readFileSync(tempPath),
          name: fileName,
          mimetype: response.headers['content-type'] || 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          size: response.data.length,
        },
      });

      console.log(`Successfully migrated: ${item.title}`);
      fs.unlinkSync(tempPath);

    } catch (error: any) {
      console.error(`Failed to migrate ${item.title}:`, error.message);
    }
  }

  console.log('Migration complete!');
  process.exit(0);
};

migrate();
