# File Upload API (MVC)

Express + SQLite API with MVC layout to upload, list, download, and delete PDF files.

## Setup
- Install dependencies: `npm install`
- Start server: `npm start` (uses `PORT` env var or 3000)

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
