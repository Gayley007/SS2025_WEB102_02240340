## Practical 6: Token-Based Authentication with Hono and Prisma

### Project Overview
This practical focused on implementing **email-password authentication** with **JWT (JSON Web Tokens)** in a REST API built using **Hono (a Bun-based web framework)** and **Prisma ORM**. The goal was to secure protected endpoints by verifying JWT tokens and managing user authentication state server-side.


### Key Objectives
- Add user authentication using email and password
- Hash passwords securely using `Bun.password.hash`
- Authenticate users via JWT tokens
- Restrict access to protected API endpoints
- Store user credentials and relationships in PostgreSQL via Prisma


### Project Setup

#### Step 1: Clone & Install
```bash
git clone https://github.com/rubcstswe/web102-hono-auth-jwt-prisma-forked.git
cd web102-hono-auth-jwt-prisma-forked
bun install
```
Prisma Schema (User & Account)
```prisma
model User {
  id           String    @id @default(uuid())
  email        String    @unique
  hashPassword String
  Account      Account[]
}

model Account {
  id      String @id @default(uuid())
  userId  String
  user    User   @relation(fields: [userId], references: [id])
  balance Int    @default(0)
}
```

#### Step 2: Apply Schema
``` bash
bunx prisma db push
bunx prisma generate
```

### Authentication Implementation
1. Registration Endpoint (POST /register)
- Receives email and password
- Hashes password using Bun.password.hash()
- Stores new user and default account with 0 balance<br>
Request
```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```
Response
```json
{
  "message": "User created successfully"
}
```

2. Login Endpoint (POST /login)
- Verifies email and password
- If successful, returns a JWT token in the response<br>
Response
```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN_HERE"
}
```

### JWT Setup
**Token Generation**
```ts
const payload = {
  sub: user.id,
  exp: Math.floor(Date.now() / 1000) + 60 * 60 // expires in 1 hour
};
const token = await sign(payload, secret);
```
**JWT middleware**<br>
Protect routes using Hono's jwt() middleware:
```ts
app.use(
  "/protected/*",
  jwt({
    secret: 'mySecretKey',
  })
);
```

### Protected Endpoint
GET /protected/account/balance
- Requires valid JWT token in Authorization header
- Returns balance(s) for the authenticated user

Request
```vbnet
GET /protected/account/balance
Authorization: Bearer JWT_TOKEN
```
Response
```json
{
  "data": {
    "Account": [
      {
        "balance": 0,
        "id": "75a34064-f8c4-4a7e-90dd-4958c452fbf4"
      }
    ]
  }
}
```

### Testing Flow
- Register a new user via /register
- Login with the same credentials at /login
- Copy the JWT from the response
- Use the JWT token in the Authorization header to call /protected/account/balance
