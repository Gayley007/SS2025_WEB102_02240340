
## PRACTICAL 2: TikTok REST API Implementation

### Key Concepts Applied

1. **RESTful API Design**
   - Defined consistent, semantic URIs for TikTok-style functionality
   - Applied proper HTTP verbs and response codes for each operation

2. **Express.js Setup**
   - Built the backend using modular structure (`routes`, `controllers`, `models`)
   - Added logging (Morgan), CORS support, and body parsing

3. **Route & Controller Logic**
   - Created controllers for users, videos, and comments
   - Implemented GET, POST, PUT, DELETE routes with correct logic and mock data

4. **In-Memory Data Management**
   - Used dummy data via `models/index.js` to simulate a database
   - Enabled fast iteration and testing before DB integration

5. **API Testing**
   - Verified endpoints with `curl` and Postman
   - Ensured proper response structure and error handling


### What I Learned

- How to design a full REST API for a real-world app structure
- Applying Express routing and middleware to manage data flow
- How each part of the backend (model, controller, route) contributes to a resource
- Importance of planning and organizing REST resources before implementation


### Challenges Faced

#### 1. Route Overlaps
**Problem:** Incorrect path parameters caused overlapping routes  
**Solution:** Reordered route definitions and used unique slugs (`/users/:id/videos` etc.)

#### 2. JSON Parsing Issues
**Problem:** POST requests failed due to missing body parsing  
**Solution:** Installed and configured `body-parser` middleware

#### 3. Circular Data Access
**Problem:** Accessing nested mock data caused reference errors  
**Solution:** Flattened mock structures and used utility functions to resolve nested resources
