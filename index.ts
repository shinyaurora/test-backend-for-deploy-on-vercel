import express, { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = 'https://ooyaoybdblsgbkfkonoy.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey)

const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/data', (req: Request, res: Response) => {
    const data = req.body;

    supabase
        .from('test')
        .insert({secret: JSON.stringify(data)})
        .then(response => {
            if(response.error) {
                console.log(response.error);
                return res.status(500).json({error: response.error, success: false});
            }
            return res.status(200).json({data: response.data, success: true})
        })
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});