# 🛠️ Task Manager App — Backend (Node.js + Express)

This is the backend for the **Task Manager App**, built with **Node.js**, **Express**, and **MongoDB**. It provides APIs for managing users, authentication, and tasks.

## ✨ Features

- 🔐 JWT-based authentication
- 🔒 Password hashing with bcrypt
- 👤 User registration and login
- 📋 Create, assign, update, delete tasks
- 📁 User-task relationship tracking (created/assigned)
- 🔎 Filtering and searching tasks

## 🧰 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT** – authentication
- **bcrypt** – password hashing
- **dotenv** – environment config
- **cors** – Cross-Origin Resource Sharing

## 🧠 Project Thinking & Development Process

### Backend (Node.js + Express + MongoDB)

**Schema Design**

- Started with defining MongoDB schemas for `User` and `Task`.
- Ensured scalability and covered essential fields such as priority, status, due date, and assigned user.

**API Development**

- Connected backend to MongoDB using Mongoose.
- Implemented authentication routes (`/register`, `/login`) using JWT for secure sessions.
- Developed CRUD routes for tasks: create, read, update, and delete.
- Added routes for search and filter functionality based on title, status, priority, and due date.
- Ensured CORS compatibility with the frontend.

**Deployment**

- Hosted the backend on **Render**.
- Used environment variables (`JWT_SECRET`, `MONGO_URI`, `FRONTEND_URL`) stored securely in Render's dashboard.

---

### 2. Install dependencies
 
```npm install```

### 3. Run the server

```npm start```

