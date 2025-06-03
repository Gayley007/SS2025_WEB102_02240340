
## PRACTICAL 1: Designing RESTful API Endpoints

### Key Concepts Applied

1. **RESTful API Design Principles**
   - Designed clear and semantic URI endpoints for CRUD operations
   - Used standard HTTP methods and status codes (GET, POST, PUT, DELETE)

2. **Node.js + Express Setup**
   - Built and configured a backend server with Express
   - Applied middlewares like CORS, Helmet, and Morgan for security and logging

3. **Content Negotiation**
   - Implemented middleware to support flexible response formats (JSON/XML)
   - Honored `Accept` headers in client requests

4. **Error Handling**
   - Created centralized error handling middleware (`errorHandler.js`)
   - Used async error wrapper for cleaner controller logic

5. **Mock Data Layer**
   - Used in-memory data (`mockData.js`) to simulate DB operations
   - Returned structured API responses for testing endpoints

6. **API Documentation**
   - Built a simple HTML documentation page for available routes and usage


### What I Learned

- How to structure and implement a complete RESTful API backend
- How content negotiation works and why it improves API flexibility
- Importance of consistent status codes and clean URI designs
- Managing error flows centrally using middleware
- Laying the foundation for scalable backend development


### Challenges Faced

#### 1. Middleware Order Matters
**Problem:** Content negotiation middleware wasn’t working  
**Solution:** Ensured it was placed before the routes in `server.js`

#### 2. POST Requests Not Validating
**Problem:** Incorrect payloads caused crashes  
**Solution:** Added validation checks and content-type headers (`application/json`) in request

#### 3. Route Not Found Handling
**Problem:** Requests to undefined routes crashed the server  
**Solution:** Added a 404 handler middleware at the bottom of the route chain
