# LMS Application

Welcome to the LMS Application! This is a Learning Management System built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The application allows educators to create and manage courses, students to enroll in courses, and everyone to track progress and interact through assignments and forums.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Course Management:** Create, update, and delete courses by admin.
- **User Management:** Register, log in, and manage user profiles.
- **Enrollment:** Students can enroll in available courses.
- **Progress Tracking:** Track student progress and grades.
- **Discussion Forums:** Engage in course-related discussions.

## Technologies Used

- **MongoDB:** NoSQL database to store user and course data.
- **Express.js:** Backend framework to build the RESTful API.
- **React.js:** Frontend library to create the user interface.
- **Node.js:** Runtime environment to run JavaScript on the server side.
- **Mongoose:** ODM library to interact with MongoDB.
- **Redux:** State management for the React application.
- **Daisyui/Tailwind CSS:** Styling for the frontend.

## Installation

To get started with the LMS application, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/lms-application.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd lms-application
    ```

3. **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

4. **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

5. **Set up environment variables:**

    - Create a `.env` file in the `backend` directory.
    - Add the following variables:

        ```plaintext
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret_key
        ```

6. **Run the application:**

    - **Start the backend server:**

        ```bash
        cd backend
        npm start
        ```

    - **Start the frontend server:**

        ```bash
        cd ../frontend
        npm start
        ```

## Usage

- **Access the frontend:** Open your browser and go to `http://localhost:3000`.
- **Access the backend API:** The API will be available at `http://localhost:5000/api`.

## API Endpoints

- **User Routes:**
    - `POST /api/v1/user/register` - Register a new user.
    - `POST /api/v1/user/login` - Log in a user.
    - `GET /api/v1/user/logout` - Log out a user.
    - `GET /api/v1/user/me` - Get user details.
    - `POST /api//v1/user/forget-password` - Update user password.
    - `POST /api/v1/user/reset-password` - Reset user password.
    - `POST /api/v1/user/change-password` - change user password.
    - `POST /api/v1/user/update/:id` - Update user details.

- **Course Routes:**
    - `GET /api/v1/courses` - get all courses.
    - `POST /api/v1/createCourse` - create new course.
    - `PUT /api/v1/courses/:id` - Geupdate course details.
    - `DELETE /api/v1/courses/:id` - Delete course.



## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.



