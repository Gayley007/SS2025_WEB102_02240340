## Practical 2: TikTok REST API Design and Implementation

### Project Overview
In this practical, we developed a **RESTful API** backend for a TikTok-like platform using **Express.js**. The API supports core social media features including user management, videos, comments, likes, and followers. This backend is designed to integrate with a frontend (e.g., Next.js) via API routes.

### Resources Covered
- Videos
- Users
- Comments
- Likes
- Followers / Following

### Project Setup

#### Step 1: Initialize Project
```bash
mkdir -p server
cd server
npm init -y
```

#### Step 2: Install Dependencies
```bash
npm install express cors morgan body-parser dotenv
npm install --save-dev nodemon
```

#### Step 4: Scripts (package.json)
```json
"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js"
}
```

### API Endpoints Overview
| Resource | Endpoint                   | Methods Supported        |
| -------- | -------------------------- | ------------------------ |
| Videos   | `/api/videos`              | GET, POST                |
|          | `/api/videos/:id`          | GET, PUT, DELETE         |
|          | `/api/videos/:id/comments` | GET                      |
|          | `/api/videos/:id/likes`    | GET, POST (like), DELETE |
| Users    | `/api/users`               | GET, POST                |
|          | `/api/users/:id`           | GET, PUT, DELETE         |
|          | `/api/users/:id/videos`    | GET                      |
|          | `/api/users/:id/followers` | GET, POST, DELETE        |
|          | `/api/users/:id/following` | GET                      |
| Comments | `/api/comments`            | GET, POST                |
|          | `/api/comments/:id`        | GET, PUT, DELETE         |
|          | `/api/comments/:id/likes`  | GET, POST (like), DELETE |

### Testing the API
Use tools like Postman or curl. Sample commands:
```bash
curl -X GET http://localhost:3000/api/users
curl -X GET http://localhost:3000/api/videos/1
curl -X GET http://localhost:3000/api/users/1/videos
curl -X GET http://localhost:3000/api/videos/1/comments
```
