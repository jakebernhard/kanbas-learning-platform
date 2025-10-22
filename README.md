# Kanbas Application

This project is a learning platform inspired by Canvas. It combines a React-based web application with a Node.js server and uses MongoDB as the database.

## Tech Stack

- **Front-end**: Built with React and styled with CSS.
- **Back-end**: Powered by Node.js and Express.
- **Database**: Uses MongoDB for data storage.

## Getting Started

To run the Kanbas application locally, you'll need to start both the client and the server.

### Starting the React App

1. Navigate into the `client` directory.
2. Run:

```bash
npm start
```
This will launch the React front-end on `localhost:3000`.

### Starting the Node Server

1. Navigate into the `server` directory.
2. Run:

```bash
node index.js
```
This will start the Node.js server on `localhost:4000` and connect to MongoDB.

## Core Functionality

- **User Authentication**: Users can log in with their credentials, and depending on their role (Admin, Faculty, or Student), they'll have different permissions.

- **Course Management**: Admins and faculty can create new courses. Each course can have modules, and you can add both assignments and quizzes. Note: while assignments are currently placeholders (not graded), quizzes are fully functional.

- **Class Roster View**: You can view the list of people in each class, which is essentially the user management aspect. This allows you to see who is enrolled in each course.

