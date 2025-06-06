## PRACTICAL 3: File Upload on the Server Application

### Key Concepts Applied

1. **Multipart Form Handling**
   - Understood how browsers send files using `multipart/form-data`
   - Used `FormData` on the frontend and Multer to parse files on the backend

2. **Multer for File Uploads**
   - Configured disk storage and filename formatting
   - Applied validation for `.pdf` file types and size limits

3. **Error Handling**
   - Implemented custom middleware to handle Multer errors (file type, size)
   - Provided meaningful feedback to frontend

4. **CORS & API Communication**
   - Enabled CORS to allow cross-origin requests between frontend and backend
   - Replaced default Next.js API route with Express server endpoint

5. **Progress Tracking**
   - Tracked file upload progress using `onUploadProgress` in Axios
   - Displayed real-time progress bar during upload


### What I Learned

- How to set up a complete backend flow for handling file uploads securely
- Connecting React frontend with a custom Express backend
- Validating user uploads to prevent incorrect file types or oversized files
- Importance of clean error handling to improve user experience
- Real-world relevance of file upload systems in modern web apps


### Challenges Faced

#### 1. File Not Uploading
**Problem:** API returned 500 error  
**Solution:** Fixed incorrect multer config and ensured file type matched validation

#### 2. CORS Policy Errors
**Problem:** Frontend blocked due to cross-origin restrictions  
**Solution:** Added `cors()` with proper origin and credentials settings

#### 3. File Name Collisions
**Problem:** Uploaded files were overwriting each other  
**Solution:** Added a timestamp-based renaming strategy in Multer config
