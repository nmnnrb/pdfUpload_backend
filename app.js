const express = require('express');
const cors = require('cors');
const fileRoutes = require('./routes/fileRoutes');
const { upload } = require('./middleware/upload');
const { uploadFile } = require('./controllers/fileController');

const app = express();

app.use(express.json());

app.use(cors(process.env.CLIENT_URL ? { origin: process.env.CLIENT_URL } : {}));
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/upload', upload.single('file'), uploadFile);
app.use('/files', fileRoutes);

module.exports = app;
