CREATE DATABASE IF NOT EXISTS student_management;

USE student_management;

CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    course VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO students
(student_id, name, email, phone, course, year, address)
VALUES
('STU001', 'Ravi Kumar', 'ravi@gmail.com', '9876543210', 'MCA', 2, 'Hyderabad'),
('STU002', 'Sita Devi', 'sita@gmail.com', '9876543211', 'MCA', 1, 'Vijayawada');
