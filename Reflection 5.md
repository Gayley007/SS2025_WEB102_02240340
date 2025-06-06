## PRACTICAL 5: Implementing Cloud Storage with Supabase

### Key Concepts Applied

1. **Cloud Storage Migration**
   - Replaced local file storage with **Supabase Storage** for better scalability and reliability.
   - Created separate public buckets for videos and thumbnails.

2. **Supabase Configuration**
   - Set up a new project on Supabase and configured storage buckets.
   - Generated service keys and public keys to securely access storage services.

3. **Access Control and Policies**
   - Created and applied custom **RLS (Row Level Security)** policies to allow authenticated users to upload files.
   - Set public read access for content to be streamed via CDN.

4. **Backend Integration**
   - Installed Supabase JavaScript SDK and initialized a client in `supabase.js`.
   - Refactored `videoController.js` to upload and delete files from Supabase instead of the local filesystem.
   - Updated Prisma schema to store Supabase `videoStoragePath` and `thumbnailStoragePath`.

5. **Frontend Integration**
   - Installed and configured Supabase in the frontend using `@supabase/supabase-js`.
   - Updated `uploadService.js` and `upload/page.jsx` to support direct client-to-cloud uploads.
   - Modified `VideoCard.jsx` to fetch and render Supabase video URLs.

6. **Migration and Clean-Up**
   - Wrote and executed a migration script to upload existing local video files to Supabase.
   - Verified successful playback from CDN URLs and removed redundant local storage code.


### What I Learned

- How to transition a backend from local storage to a **cloud-based storage system** using Supabase.
- Creating, configuring, and securing cloud buckets with **Supabase policies**.
- Direct client uploads to cloud storage and server-side metadata handling.
- Managing cloud paths and integrating them into a **Prisma-based schema**.
- Benefits of using cloud storage for performance, reliability, and scalability.


### Challenges Faced

#### 1. Supabase Credentials Misconfigured
**Problem:** Supabase client failed to initialize  
**Solution:** Double-checked and corrected `SUPABASE_URL` and keys in `.env`

#### 2. Upload Failures Due to Missing Bucket Permissions  
**Problem:** Video uploads failed with a 403 error  
**Solution:** Updated Supabase policies to allow authenticated users to upload files

#### 3. Video URLs Not Rendering
**Problem:** VideoPlayer component could not find the correct video source  
**Solution:** Added proper handling in `getFullVideoUrl` and ensured URLs used correct base paths

#### 4. Environment Variables Not Loading in Frontend
**Problem:** Supabase client in frontend didn’t read `.env.local` variables  
**Solution:** Ensured variable names were prefixed with `NEXT_PUBLIC_` and restarted the dev server

#### 5. Broken Links After Migration
**Problem:** Video references in the database still pointed to local paths  
**Solution:** Ran a migration script to update all `videoUrl` and `thumbnailUrl` fields with Supabase URLs
