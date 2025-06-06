## Practical 5: Implementing Cloud Storage with Supabase

### Project Overview
In this practical, we replaced the local file upload system in our TikTok clone backend with **Supabase Cloud Storage**. This enhances scalability, reliability, and security by storing video and thumbnail files in the cloud and serving them via CDN. Both backend and frontend were updated to support direct file uploads and serve content from Supabase buckets.

### Key Objectives
- Set up and configure Supabase Storage buckets
- Update backend to upload and manage files on Supabase
- Secure bucket access using Supabase policies
- Update Prisma schema to store cloud file paths
- Enable frontend to directly upload files to cloud storage
- Migrate existing local files to cloud

### Setting Up Supabase Storage

#### Step 1: Create Supabase Project
- Go to [supabase.com](https://supabase.com), create an account, and start a new project
- Choose a secure password and nearest region

#### Step 2: Create Buckets
- Create two buckets: `videos` and `thumbnails`
- Set both to **public access**

#### Step 3: Apply Policies
- **Authenticated users** can upload to both buckets
- **All users** (anon and authenticated) can read/download files

### Backend Configuration

#### Step 1: Install Supabase SDK
```bash
cd server
npm install @supabase/supabase-js
```

#### Step 2: Create Supabase Client
`src/lib/supabase.js`:
```js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
module.exports = supabase;
```

#### Step 3: Update Environment Variables (`.env`)
``` env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
SUPABASE_PUBLIC_KEY=your-anon-key
SUPABASE_STORAGE_URL=https://your-project-id.supabase.co/storage/v1
```

#### Step 4: Update Prisma Schema
Add to your `Video` model:
```prisma
videoStoragePath        String?
thumbnailStoragePath    String?
```

#### Step 5: Update Video Controller
- Upload videos/thumbnails to Supabase
- Store file paths and public URLs in the database
- Delete from cloud when video is removed

#### Step 6: Add Migration Script (Optional)
Move local files to cloud:
```bash
node scripts/migrateVideosToSupabase.js
```

### Frontend Configuration
#### Step 1: Install Supabase Client
``` bash
cd tiktok_frontend
npm install @supabase/supabase-js
```

#### Step 2: Supabase Client (`src/lib/supabase.js`)
``` js
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY);
export default supabase;
```

#### Step 3: Update `.env.local`
``` env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLIC_KEY=your-anon-key
```

#### Step 4: Update Upload Logic
- `upload/page.jsx` uploads directly to Supabase
- `uploadService.js` handles path generation and API calls

#### Step 5: Update `VideoCard.jsx`
Use Supabase URLs to fetch video/thumbnail content

Replace local file preview logic with cloud-based `getFullVideoUrl`

### Testing and Clean-up
#### Step 1: Migration (Optional)
```bash
node scripts/migrateVideosToSupabase.js
```
#### Step 2: Clean Local Uploads
- Confirm video streaming from Supabase
- Back up and delete old `/uploads `directory
- Remove old upload logic from backend