# Kanbas Application

This project is a learning platform inspired by Canvas. It combines a React-based web application with a Node.js server and uses MongoDB as the database.

## Tech Stack

- **Front-end**: Built with React and styled with CSS.
- **Back-end**: Powered by Node.js and Express.
- **Database**: Uses MongoDB for data storage.

## Getting Started

To run the Kanbas application locally, you'll need to start both the client and the server.

### Starting the React App

1. Navigate into the `kanbas-react-web-app` directory.
2. Run:

```bash
npm start
```
This will launch the React front-end on `localhost:3000`.

### Starting the Node Server

1. Navigate into the `kanbas-node-server-app` directory.
2. Run:

```bash
node index.js
```
This will start the Node.js server on `localhost:4000` and connect to MongoDB.

## Core Functionality

### 🔐 Login

Users can log in with their credentials to access the platform. Depending on their role — such as Admin, Faculty, or Student — they are directed to the appropriate dashboard with role-specific features and permissions.

### 🧩 Course Management

Faculty and admins can create and edit courses, configure course details, and organize modules within each course.

![Course Management Screenshot](/courses_dashboard.png)

### 📚 Modules

Modules let faculty organize their course content into separate sections, which help structure lessons and materials within a course.

![Modules Screenshot](/modules.png)

### 📝 Assignments

Assignments can be created and organized within courses. Each assignment includes details such as title, description, and due date.

![Assignments Screenshot](/assignments.png)

### ❓ Quizzes

Quizzes can be created and edited, including the ability to add and modify questions. This enables instructors to build and structure quizzes as part of their course content.

![Quizzes Screenshot](/quizzes.png)

### 👥 People (Class Roster)

The People section mirrors the roster view in Canvas, displaying all users enrolled in a specific course such as faculty and students.
