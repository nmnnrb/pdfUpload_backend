# File Upload API (MVC)

Express + SQLite API with MVC layout to upload, list, download, and delete PDF files.

## Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/nmnnrb/pdfUpload_backend.git
   cd pdfUpload_backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start server:
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```
   The server runs on `PORT` env var or defaults to 3000.

## Endpoints
- `POST /files` (multipart, field `file`, PDF only) → create/upload (alias: `POST /upload`)
- `GET /files` → list metadata for all uploads
- `GET /files/:id/download` → download by record id
- `DELETE /files/:id` → remove metadata and disk file

## Structure
- `index.js` → bootstrap server and DB sync
- `app.js` → Express app, health check, route mounting
- `config/database.js` → Sequelize SQLite setup
- `models/file.js` → File metadata model
- `middleware/upload.js` → multer config + uploads dir
- `controllers/fileController.js` → upload/list/download/delete handlers
- `routes/fileRoutes.js` → REST routes for files
- `uploads/` → stored files (created automatically)

## Notes
- SQLite file at `data.sqlite` (auto-created).
- Only PDFs accepted; non-PDF uploads return `Only PDF files are allowed`.
