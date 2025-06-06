## PRACTICAL 6: Token-Based Authentication with Hono and Prisma

### Key Concepts Applied

1. **JWT Authentication Flow**
   - Implemented a secure **email-password authentication system** using hashed passwords and JSON Web Tokens.
   - Used `Bun.password.hash()` to hash passwords on registration and `verify()` to check them on login.
   - Issued a long-lived JWT token (1-hour expiry) after successful login.

2. **Registration and Login Endpoints**
   - `/register`: Stores new users with hashed passwords into the database.
   - `/login`: Verifies user credentials and returns a signed JWT token.

3. **Prisma Schema Update**
   - Added `hashPassword` field to the `User` model.
   - Connected users to accounts using a one-to-many relationship.

4. **JWT Token Handling**
   - Used Hono’s built-in JWT helpers to sign and verify tokens.
   - JWT payload includes the user’s ID (`sub`) and expiry time.
   - Tokens are sent via the `Authorization` header in protected routes.

5. **Middleware Authorization**
   - Applied the `jwt()` middleware to restrict access to all routes prefixed with `/protected/*`.
   - Extracted JWT payload from the context to identify authenticated users.

6. **Protected API Endpoints**
   - Created `/protected/account/balance` endpoint to return a user's bank account balance.
   - Only users with valid JWT tokens can access their own protected data.


### What I Learned

- How to build a **secure authentication system** using **JWT tokens** and **password hashing**.
- The difference between authentication (verifying identity) and authorization (controlling access).
- How to structure protected routes with Hono's JWT middleware.
- How to update and apply Prisma schema changes using `bunx prisma db push`.
- Best practices for securely storing sensitive information like passwords and token secrets.


### Challenges Faced

#### 1. Prisma Unique Constraint Error on Register
**Problem:** Duplicate email caused a crash  
**Solution:** Used `PrismaClientKnownRequestError` to catch `P2002` and return a friendly error message

#### 2. JWT Token Not Passed in Authorization Header
**Problem:** Protected endpoints returned unauthorized errors  
**Solution:** Ensured token was passed in the `Authorization: Bearer <token>` format in Postman or frontend

#### 3. Password Verification Failing
**Problem:** Login always returned "Invalid credentials"  
**Solution:** Fixed hashing algorithm by specifying `"bcrypt"` explicitly in `verify()` call

#### 4. Token Expiry Misconfigured
**Problem:** Tokens expired too quickly  
**Solution:** Adjusted JWT `exp` field to a reasonable duration (`60 * 60` for 1 hour)

#### 5. Middleware Scope Too Broad
**Problem:** All routes became protected accidentally  
**Solution:** Scoped `jwt()` middleware only to `/protected/*` endpoints
