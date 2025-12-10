const fs = require('fs');
const path = require('path');
const File = require('../models/file');
const { UPLOAD_DIR } = require('../middleware/upload');

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname, filename, mimetype, size } = req.file;

    const record = await File.create({
      originalName: originalname,
      storedName: filename,
      mimeType: mimetype,
      size,
    });

    res.status(201).json({
      id: record.id,
      originalName: record.originalName,
      storedName: record.storedName,
      mimeType: record.mimeType,
      size: record.size,
      uploadedAt: record.createdAt,
    });
  } catch (err) {
    if (req.file) {
      const filePath = path.join(UPLOAD_DIR, req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    res.status(400).json({ error: err.message || 'Upload failed' });
  }
};

const listFiles = async (req, res) => {
  const files = await File.findAll({ order: [['createdAt', 'DESC']] });
  res.json(files.map((f) => ({
    id: f.id,
    originalName: f.originalName,
    storedName: f.storedName,
    mimeType: f.mimeType,
    size: f.size,
    uploadedAt: f.createdAt,
  })));
};

const downloadFile = async (req, res) => {
  const file = await File.findByPk(req.params.id);
  if (!file) {
    return res.status(404).json({ error: 'File not found' });
  }

  const filePath = path.join(UPLOAD_DIR, file.storedName);
  if (!fs.existsSync(filePath)) {
    return res.status(410).json({ error: 'File missing on disk' });
  }

  res.download(filePath, file.originalName);
};

const deleteFile = async (req, res) => {
  const file = await File.findByPk(req.params.id);
  if (!file) {
    return res.status(404).json({ error: 'File not found' });
  }

  const filePath = path.join(UPLOAD_DIR, file.storedName);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  await file.destroy();
  res.json({ message: 'File deleted' });
};

module.exports = {
  uploadFile,
  listFiles,
  downloadFile,
  deleteFile,
};
