# Scalable Web App with Authentication & Dashboard

A production-ready full-stack web application built with Next.js, Express, and MongoDB featuring JWT authentication, CRUD operations, and a modern responsive UI.

## 🎯 Assignment Overview

This project fulfills all requirements for building a **Scalable Web App with Authentication & Dashboard** within 3 days.

## ✅ Core Features Implemented

### Frontend (Primary Focus)
- ✅ Built with **Next.js 14** (App Router) + **TypeScript**
- ✅ Responsive design using **TailwindCSS** (Shadcn UI inspired)
- ✅ Forms with validation:
  - **Client-side**: react-hook-form with real-time validation
  - **Server-side**: Mongoose schema validation + custom checks
- ✅ Protected routes (login required for dashboard)
  - AuthContext with automatic redirect
  - Token-based authentication

### Basic Backend (Supportive)
- ✅ Lightweight backend using **Node.js/Express**
- ✅ APIs implemented:
  - **User signup/login** (JWT-based authentication)
  - **Profile fetching/updating** (`GET /api/auth/user`)
  - **CRUD operations** on Items entity (tasks/notes/posts)
    - `GET /api/items` - Get all user items
    - `POST /api/items` - Create new item
    - `PUT /api/items/:id` - Update item
    - `DELETE /api/items/:id` - Delete item
- ✅ Connected to **MongoDB** database
- ✅ Mongoose models for User and Item

### Dashboard Features
- ✅ Display user profile (fetched from backend)
- ✅ Full CRUD operations on Items:
  - Create new items with title & description
  - Read/View all items in card layout
  - Update items (inline editing)
  - Delete items with confirmation
- ✅ Search and filter UI (real-time filtering)
- ✅ Logout flow (clears token, redirects to login)

### Security & Scalability
- ✅ Password hashing using **bcryptjs** (10 salt rounds)
- ✅ JWT authentication middleware (`middleware/auth.js`)
- ✅ Error handling & validation:
  - Try-catch blocks on all async operations
  - User-friendly toast notifications
  - Mongoose schema validation
- ✅ Code structured for easy scaling:
  - Modular route handlers
  - Reusable UI components
  - Centralized API client
  - Context-based state management

## 📁 Project Structure

```
scalable-web-app/
├── client/                    # Next.js Frontend
│   ├── src/
│   │   ├── app/              # App Router pages
│   │   │   ├── (auth)/       # Auth pages (login, register)
│   │   │   ├── dashboard/    # Protected dashboard
│   │   │   ├── layout.tsx    # Root layout with providers
│   │   │   └── page.tsx      # Landing page
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ui/           # Base components (Button, Input, Card)
│   │   │   └── Navbar.tsx    # Navigation component
│   │   ├── context/          # Global state management
│   │   │   └── AuthContext.tsx
│   │   └── lib/              # Utilities
│   │       ├── api.ts        # Axios instance with interceptors
│   │       └── utils.ts      # Helper functions
│   └── package.json
│
├── server/                    # Express Backend
│   ├── models/               # Mongoose schemas
│   │   ├── User.js           # User model
│   │   └── Item.js           # Item model (CRUD entity)
│   ├── routes/               # API endpoints
│   │   ├── auth.js           # Authentication routes
│   │   └── items.js          # CRUD routes
│   ├── middleware/           # Custom middleware
│   │   └── auth.js           # JWT verification
│   ├── index.js              # Server entry point
│   ├── .env                  # Environment variables
│   └── package.json
│
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (running locally on port 27017)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd scalable-web-app
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

**Option 1: Run Both Servers Separately**

1. **Start MongoDB** (if not already running)
   ```bash
   mongod
   ```

2. **Start Backend Server** (Terminal 1)
   ```bash
   cd server
   npm run dev
   ```
   Backend runs on: `http://localhost:5000`

3. **Start Frontend Server** (Terminal 2)
   ```bash
   cd client
   npm run dev
   ```
   Frontend runs on: `http://localhost:3000`

**Option 2: Use the Startup Script (Windows)**
```bash
# Double-click start-all.bat in the root directory
```

## 🧪 Testing the Application

1. **Open Browser**: Navigate to `http://localhost:3000`

2. **Register a New User**:
   - Click "Get Started" or "Register"
   - Fill in username, email, and password
   - Submit the form

3. **Automatic Login**: You'll be redirected to the dashboard

4. **Test CRUD Operations**:
   - **Create**: Add a new item with title and description
   - **Read**: View all your items in the list
   - **Update**: Click the pencil icon to edit an item
   - **Delete**: Click the trash icon to remove an item

5. **Test Search**: Type in the search box to filter items

6. **Logout**: Click the logout button in the navbar

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `GET /api/auth/user` - Get current user (Protected)
  - Headers: `x-auth-token: <jwt-token>`

### Items (CRUD)
- `GET /api/items` - Get all user items (Protected)
- `POST /api/items` - Create new item (Protected)
  ```json
  {
    "title": "My Task",
    "description": "Task description"
  }
  ```
- `PUT /api/items/:id` - Update item (Protected)
- `DELETE /api/items/:id` - Delete item (Protected)

## 🔒 Security Features

1. **Password Security**:
   - Passwords hashed with bcryptjs (10 salt rounds)
   - Never stored in plain text

2. **JWT Authentication**:
   - Tokens expire after 100 hours
   - Stored in cookies (client-side)
   - Validated on every protected route

3. **Authorization**:
   - Users can only access their own items
   - Middleware checks token validity

4. **Input Validation**:
   - Client-side validation with react-hook-form
   - Server-side validation with Mongoose schemas

## 📈 Scalability Strategy

### Frontend Scaling
1. **CDN & Edge Caching**: Deploy to Vercel/AWS CloudFront
2. **Code Splitting**: Automatic with Next.js, lazy load heavy components
3. **State Management**: Upgrade to Redux Toolkit/Zustand for complex state
4. **Testing**: Add E2E tests with Cypress/Playwright

### Backend Scaling
1. **Load Balancing**: Use PM2 or Docker + Kubernetes
2. **Database Optimization**:
   - Index frequently queried fields
   - Implement Redis caching
   - Database sharding for large datasets
3. **Microservices**: Split into Auth Service + Item Service
4. **Rate Limiting**: Add express-rate-limit for DDoS protection

### Production Deployment
1. **Environment Variables**: Use proper secrets management
2. **HTTPS**: Enable SSL/TLS certificates
3. **Monitoring**: Implement Datadog/New Relic/Sentry
4. **CI/CD**: GitHub Actions for automated testing & deployment

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Works on mobile, tablet, and desktop
- **Loading States**: Spinners and disabled states during API calls
- **Error Handling**: User-friendly toast notifications
- **Smooth Animations**: Hover effects and transitions
- **Accessibility**: Semantic HTML and proper ARIA labels

## 📝 Evaluation Criteria Met

| Criteria | Status | Notes |
|----------|--------|-------|
| UI/UX quality & responsiveness | ✅ | TailwindCSS responsive design |
| Frontend-Backend integration | ✅ | Axios API client with interceptors |
| Security practices | ✅ | Hashed passwords, JWT validation |
| Code quality & documentation | ✅ | TypeScript, comments, README |
| Scalability potential | ✅ | Modular structure, see SCALING.md |

## 🛠️ Technologies Used

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- React Hook Form
- Axios
- React Hot Toast
- Lucide React (icons)

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- CORS

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built as part of a scalable web application assignment demonstrating full-stack development skills with modern technologies and best practices.
