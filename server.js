const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and serve static files
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/neethu_surprise';

mongoose.connect(MONGODB_URI)
.then(() => console.log('✅ Successfully connected to MongoDB!'))
.catch(err => console.error('❌ Error connecting to MongoDB. Please ensure MongoDB is running Locally:', err));

// Create a schema for logging responses
const responseSchema = new mongoose.Schema({
    name: { type: String, default: 'Neethu' },
    reaction: String,
    timestamp: { type: Date, default: Date.now },
    userAgent: String
});

const ResponseLog = mongoose.model('ResponseLog', responseSchema);

// API endpoint to save the response
app.post('/api/confession', async (req, res) => {
    try {
        const { reaction } = req.body;
        const newLog = new ResponseLog({
            reaction: reaction || 'Secretly a monkey! 🐒',
            userAgent: req.headers['user-agent']
        });
        
        await newLog.save();
        console.log('🎉 Neethu confessed! Log saved to MongoDB.');
        res.status(201).json({ success: true, message: 'Response successfully saved to database!' });
    } catch (error) {
        console.error('Error saving response:', error);
        res.status(500).json({ success: false, error: 'Database error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`\n✨ Server is running!✨ `);
    console.log(`Open http://localhost:${PORT} in your browser to see the site!\n`);
});
