import express, { NextFunction } from 'express'
import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import  { extractWhoisData } from './helpers/whoisHelpers';

dotenv.config();

// THIS IS NOT SAFE HARDCODING THE EXACT VALUE BUT JUST FOR THE PURPOSE OF THIS TEST SO I CAN BE SURE
// IF ENV FILE DOESNT EXIST WE WILL USE 'ALTERNATIVE' VALUE 
const WHOIS_API_URL = process.env.WHOIS_API_URL || 'https://www.whoisxmlapi.com/whoisserver/WhoisService';
const PORT = process.env.PORT || 9999;
const WHOIS_API_KEY = process.env.WHOIS_API_KEY || 'at_7k9UM3pXHIG2ewjBkKZZiifZpMuzS';

const app = express();

app.use(cors());
app.use(express.json());


app.post('/api/whois', async (req: Request, res: Response): Promise<void> => {
  const { domain, infoType } = req.body;

  if (!domain || !infoType) {
    res.status(400).json({ error: 'DOmain name and info type are required'});
  }

  try {
    const result = await axios.get(WHOIS_API_URL, {
      params: {
        apiKey: WHOIS_API_KEY,
        domainName: domain,
        outputFormat: 'JSON'
      }
    });

    const tempData = result.data;
    const data = extractWhoisData(infoType, tempData);
console.log(data)
    res.json(data);
  } catch (error) {
    console.log(error);
  
    // Handle specific API error
    if (axios.isAxiosError(error)) {
      res.status(500).json({ error: 'Failed to retrieve data from Whois API' });
    }

    // Handle invalid info type error from the helper
    if (error instanceof Error && error.message === 'Invalid Info Type') {
      res.status(400).json({ error: error.message });
    }

    // Generic error handler
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});