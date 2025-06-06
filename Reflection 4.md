## PRACTICAL 4: Connecting TikTok to PostgreSQL with Prisma ORM

### Key Concepts Applied

1. **PostgreSQL Setup**
   - Created and configured a new PostgreSQL database using CLI.
   - Created a dedicated database user for secure access control.

2. **Prisma ORM Integration**
   - Installed and initialized Prisma ORM in the backend project.
   - Defined the Prisma schema to represent entities like users, videos, comments, and their relationships.
   - Generated migrations and applied them to PostgreSQL using `npx prisma migrate dev`.

3. **Authentication with Prisma**
   - Used `bcrypt` to hash user passwords before storing them in the database.
   - Generated secure JWT tokens on login and validated them using custom middleware.
   - Secured protected routes (e.g., video creation) using auth middleware.

4. **Database-Driven API Controllers**
   - Refactored existing controllers to use Prisma Client instead of in-memory data.
   - Implemented relational queries (e.g., fetching videos with author and comments).
   - Used Prisma features like transactions, `count`, and `include` for optimized queries.

5. **Seeding Test Data**
   - Created a `seed.js` script to populate the database with sample users, videos, comments, likes, and follows.
   - Configured a `seed` script in `package.json` and used `npm run seed` to insert data for testing.


### What I Learned

- How to connect a Node.js backend to a PostgreSQL database using Prisma ORM.
- Designing and managing database schema with relationships using Prisma models.
- Writing and applying migrations to version-control database structure.
- Implementing secure authentication with hashed passwords and JWT tokens.
- Refactoring controllers to replace mock data with real database interactions.


### Challenges Faced

#### 1. Database Connection Failed
**Problem:** Initial Prisma migration failed due to incorrect database URL  
**Solution:** Verified and corrected the `DATABASE_URL` in `.env` file

#### 2. Prisma Client Not Working
**Problem:** Prisma client import showed undefined errors in controllers  
**Solution:** Created a separate `prisma.js` file to instantiate and export the Prisma client properly

#### 3. Protected Route Token Errors
**Problem:** Protected routes returned unauthorized even with a token  
**Solution:** Fixed token verification logic and ensured proper headers were sent in Postman

#### 4. Seeding Errors on Unique Constraints
**Problem:** Duplicate user data during seed caused constraint violation  
**Solution:** Used unique fields like email and wrapped inserts in try-catch blocks

#### 5. Relationship Query Mistakes
**Problem:** Forgot to use `include` in Prisma queries to fetch related data  
**Solution:** Used Prisma's `include` and `select` to return nested relational data correctly
