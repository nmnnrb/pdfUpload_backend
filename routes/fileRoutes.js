const express = require('express');
const { upload } = require('../middleware/upload');
const {
  uploadFile,
  listFiles,
  downloadFile,
  deleteFile,
} = require('../controllers/fileController');

const router = express.Router();

router.post('/', upload.single('file'), uploadFile);
router.post('/upload', upload.single('file'), uploadFile);
router.get('/', listFiles);
router.get('/:id/download', downloadFile);
router.delete('/:id', deleteFile);

module.exports = router;
