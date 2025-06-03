## Practical 1: Designing and Implementing RESTful API Endpoints

### Project Overview
This practical focuses on designing and building a **RESTful API** for a social media platform (similar to Instagram) using **Node.js** and **Express**. Key backend features like proper endpoint design, HTTP methods, content negotiation, and response formatting are applied.

### Resources Managed
- Users
- Posts
- Comments
- Likes
- Followers

### Project Setup

#### Step 1: Initialize Project
```bash
mkdir social-media-api
cd social-media-api
npm init -y
npm install express morgan cors helmet
npm install nodemon --save-dev
```

#### Step 2: Create File Structure
```bash
mkdir -p controllers routes middleware config utils public
touch server.js .env .gitignore
```
.env File
```env
PORT=3000
```
.gitignore
```gitignore
node_modules
.env
.DS_Store
```
package.json Scripts
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### API Design (examples)
| Endpoint     | Method | Description          |
| ------------ | ------ | -------------------- |
| `/users`     | GET    | List all users       |
| `/users/:id` | GET    | Get user by ID       |
| `/users`     | POST   | Create new user      |
| `/users/:id` | PUT    | Update existing user |
| `/users/:id` | DELETE | Delete user          |

Similar CRUD routes created for posts, comments, likes, and followers.

### Key Features Implemented
#### Content Negotiation
Middleware added to check Accept header and serve:
- application/json (default)
- application/xml (optional for extensibility)
#### Mock Data
Used static mock data in utils/mockData.js instead of a database.
#### Middleware
- errorHandler.js for error responses
- async.js for async error handling
- formatResponse.js for content negotiation
#### API Documentation
Simple docs.html page in the public/ folder accessible via /docs route.

### Run the Server
```bash
npm run dev
```
Access API at: http://localhost:3000