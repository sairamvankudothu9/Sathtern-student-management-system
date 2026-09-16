# Student Management System

A full-stack Student Management System developed to manage student records through a simple and user-friendly web application. The system allows users to add, view, search, update, and delete student information.

## Features

* Add new student records
* View all student records
* Search students
* View individual student details
* Update student information
* Delete student records
* MySQL database integration
* Responsive web interface
* REST API-based backend

## Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js
* REST API
* CORS
* dotenv

### Database

* MySQL
* MySQL2

## Project Structure

```text
student-management-system/
├── backend/
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── database/
│   └── student_management.sql
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── .gitignore
└── README.md
```

## Requirements

Make sure the following are installed:

* Node.js
* npm
* MySQL

Check the installed versions:

```bash
node -v
npm -v
mysql --version
```

## Database Setup

Create a MySQL database and import the SQL file provided in:

```text
database/student_management.sql
```

The database connection is configured using environment variables.

Create a `.env` file inside the `backend` folder:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=student_management
PORT=5000
```

Do not upload the `.env` file to GitHub.

## Installation

Open the terminal inside the backend directory:

```bash
cd backend
npm install
```

## Run the Application

Start the server using:

```bash
npm start
```

The application will be available at:

```text
http://localhost:5000
```

## API Endpoints

```text
GET    /api/students
GET    /api/students/:id
POST   /api/students
PUT    /api/students/:id
DELETE /api/students/:id
```

## Student Information

The system manages details such as:

* Student ID
* Name
* Email
* Phone
* Course
* Year
* Address

## Purpose

This project was developed as a practical full-stack application to demonstrate frontend development, backend API development, database connectivity, and CRUD operations using Node.js, Express.js, and MySQL.

## License

This project is licensed under the MIT License.
