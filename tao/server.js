const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { 
                    "role": "system", 
                    "content": "You are Bao, a friendly and helpful AI assistant. Keep your responses concise and natural, as if having a casual conversation."
                },
                { 
                    "role": "user", 
                    "content": message 
                }
            ],
            max_tokens: 150
        });

        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to get response' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
