# 🛠️ Task Manager App — Backend (Node.js + Express)

This is the backend for the **Task Manager App**, built with **Node.js**, **Express**, and **MongoDB**. It provides APIs for user authentication, task creation and management, and user-task tracking.

## 🌐 Live Frontend

🔗 [Task Manager App – Live Demo](https://task-manager-frontend-two-mauve.vercel.app)

## ✨ Features

- 🔐 JWT-based authentication
- 🔒 Secure password hashing using bcrypt
- 👤 User registration and login
- 📋 Task creation, assignment, editing, and deletion
- 🔗 User-task relationship tracking (created vs assigned)
- 🔎 Advanced task filtering and search support

## 🧰 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** – secure token authentication
- **bcryptjs** – password encryption
- **dotenv** – environment variable management
- **cors** – enable CORS for frontend integration

---

## 🧠 Project Thinking & Development Process

### 🧩 Schema Design

- Defined `User` and `Task` schemas using Mongoose with essential fields like `title`, `status`, `priority`, `dueDate`, and `assignedTo`.
- Designed for scalability and clear user-task relationships.

### ⚙️ API Development

- Established a MongoDB connection using Mongoose.
- Created authentication routes (`/register`, `/login`) with secure JWT handling.
- Implemented task management routes for full CRUD operations.
- Added search and filter routes to support queries by title, status, priority, and due date.
- Handled errors using middleware and ensured seamless communication with the frontend using CORS.

### 🚀 Deployment

- Deployed on **Render**.
- Secured credentials like `JWT_SECRET`, `MONGO_URI`, and `FRONTEND_URL` via Render's environment settings.

---

### 2. Install dependencies
 
```npm install```

### 3. Run the server

```npm start```

