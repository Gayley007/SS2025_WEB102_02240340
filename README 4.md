## WEB102 – Practical 4: Connecting TikTok to PostgreSQL with Prisma ORM

### Project Overview
This practical focused on integrating a **PostgreSQL database** into the TikTok clone backend using **Prisma ORM**. We replaced in-memory data models with persistent database storage, updated API controllers to use Prisma, and implemented secure **JWT-based authentication** with password hashing.

### Key Objectives
- Set up PostgreSQL and create a database
- Configure Prisma ORM and define schema models
- Apply migrations to initialize the database
- Update controllers to interact with the Prisma Client
- Implement secure user authentication
- Seed the database with test data

### Setup Instructions

#### Step 1: Install Dependencies
```bash
cd server
npm install @prisma/client prisma
npm install bcrypt jsonwebtoken
```

#### Step 2: Initialize Prisma
```bash
npx prisma init
```
This creates:
- `prisma/schema.prisma` file
- `.env` file for database credentials

#### Step 3: Configure Environment Variables
Edit `.env`:
``` ini
DATABASE_URL="postgresql://tiktok_user:your_password@localhost:5432/tiktok_db?schema=public"
PORT=5000
NODE_ENV=development
JWT_SECRET=yourverylongandsecurerandomsecret
JWT_EXPIRE=30d
```

### Prisma Schema & Migrations
Define schema in `prisma/schema.prisma` to include:
- User model (with hashed password)
- Video model (related to User)
- Comment, Like, and Follow models

Run Migration
```bash
npx prisma migrate dev --name init
```

### Authentication
- Used `bcrypt` to hash passwords before saving to the database
- Implemented JWT-based authentication on login
- Created `auth.js` middleware to protect private routes

### Seeding the Database
Created a `seed.js` script to insert mock data:
- 10 users
- 50 videos (5 per user)
- 200 comments
- 300 video likes
- 150 comment likes
- 40 follow relationships

Run Seed Script:
```bash
npm run seed
```

In `package.json`:
```json
"scripts": {
  "seed": "node prisma/seed.js"
}
```

### Testing the Application
Use Postman to test the following:
- User registration & login
- Video upload (protected route)
- Fetching video feed
- Posting comments
- Follow/unfollow users
