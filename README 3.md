## Practical 3: File Upload on the Server Application

### Project Overview
In this practical, we implemented a complete **file upload system** using **Node.js** and **Express**, with **Multer** middleware for handling multipart form data. The backend was connected to a React/Next.js frontend via API routes, allowing drag-and-drop PDF uploads with validation, progress tracking, and secure storage.

### Backend Setup

#### Step 1: Project Initialization
```bash
mkdir file-upload-server
cd file-upload-server
npm init -y
npm install express cors multer morgan dotenv
```

#### Step 2: Basic Server Structure
- Created `server.js` as the main entry point
- Included middleware: `cors`, `morgan`, `express.json`, and `multer`

### Multer Configuration
Configured Multer to:
- Accept only PDF files
- Store files in the `uploads/` directory
- Enforce a file size limit
- Rename files to avoid collisions
example:
```js
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
```

### Upload API Endpoint
POST `/api/upload`
- Accepts: multipart/form-data
- Response: JSON with success status and filename

Example response:
```json
{
  "success": true,
  "filename": "1686234373827-document.pdf"
}
```

### File Validation & Error Handling
- Allowed only `.pdf` files using `fileFilter`
- Set size limit using `limits`
- Custom error middleware to return meaningful messages

### CORS Configuration
```js
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

###  Frontend Integration
- Updated `onSubmit` in frontend to point to `http://localhost:8000/api/upload`
- Modified Dropzone to accept PDF files only
- Displayed file names instead of previews
- Used `onUploadProgress` in Axios to show progress bar

### Testing
- Started backend: `node server.js`
- Started frontend: `npm run dev` (from React/Next.js app)
- Verified:
  File is validated
  Upload progress is shown
  File is saved in `/uploads`
  Success and error messages are shown correctly
