# ☕ Barista Hub

**Barista Hub** is a full-stack web application built using the MERN Stack. It provides a central platform for users to discover, manage, and share coffee recipes and other beverage recipes.

The application includes user authentication and recipe management functionality, allowing registered users to create, edit, and delete recipes.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Business Case](#business-case)
3. [Project Objectives](#project-objectives)
4. [Key Features](#key-features)
5. [Technical Specification](#technical-specification)
6. [System Requirements](#system-requirements)
7. [Installation and Setup](#installation-and-setup)
8. [Environment Configuration](#environment-configuration)
9. [User Documentation](#user-documentation)
10. [API Endpoints](#api-endpoints)
11. [Project Structure](#project-structure)
12. [Troubleshooting](#troubleshooting)
13. [Future Improvements](#future-improvements)
14. [Author](#author)

---

## 1. Project Overview

Barista Hub is a web-based recipe management application designed for coffee enthusiasts, baristas, and people interested in preparing different beverages.

The application uses the MERN Stack:

- **MongoDB** for database storage.
- **Express.js** for backend routing and API development.
- **React.js** for the frontend user interface.
- **Node.js** for the backend runtime environment.

Users can browse available recipes, while registered users can access recipe management features.

The application also includes authentication functionality to distinguish between logged-in users and visitors.

---

## 2. Business Case

### 2.1 Problem Statement

Baristas and beverage enthusiasts may need a convenient way to store, organize, and access recipes.

When recipes are scattered across notebooks, documents, or different online platforms, it can become difficult to organize ingredients, follow preparation instructions, and maintain an accessible collection.

Barista Hub addresses this problem by providing a centralized digital platform for managing beverage recipes.

### 2.2 Proposed Solution

Barista Hub provides a web application where users can view recipes and registered users can manage recipe information.

Each recipe contains information such as:

- Recipe title.
- Recipe category.
- Ingredients.
- Preparation instructions.
- Author information.

The application combines a responsive frontend, a backend API, a database, and authentication functionality to support recipe management.

### 2.3 Target Audience

The intended users include:

- Professional baristas.
- Coffee shop employees.
- Coffee enthusiasts.
- Home beverage makers.
- Hospitality students.
- People interested in discovering and organizing beverage recipes.

### 2.4 Business Value

Barista Hub provides the following potential benefits:

- Centralized storage of recipes.
- Easier access to recipe information.
- Improved organization of ingredients and instructions.
- A convenient platform for managing recipes.
- An application that can be extended with additional hospitality-related features.

### 2.5 Business Objectives

The project aims to:

1. Develop a centralized recipe management platform.
2. Provide user authentication.
3. Allow registered users to create, update, and delete recipes.
4. Store recipe information in a database.
5. Demonstrate the practical implementation of full-stack web development technologies.

---

## 3. Project Objectives

The main objectives of Barista Hub are to:

- Implement a full-stack web application using the MERN Stack.
- Develop a React-based user interface.
- Create backend API endpoints using Node.js and Express.js.
- Store application data using MongoDB.
- Implement user registration and login.
- Manage authentication using cookies.
- Implement recipe creation, editing, retrieval, and deletion.
- Provide clear feedback for successful operations and errors.

---

## 4. Key Features

### 4.1 Recipe Dashboard

The dashboard displays available recipes and their information.

Each recipe can display:

- Title.
- Category.
- Ingredients.
- Preparation instructions.
- Author's username.

### 4.2 User Registration

New users can create an account by providing the information requested on the registration page.

### 4.3 User Login

Registered users can log in using their account credentials.

### 4.4 Authentication

The application communicates with the backend to verify the current user's authentication status.

Authentication requests use credentials so that the browser can send the relevant cookies to the backend.

### 4.5 Recipe Management

Authenticated users can access recipe management functionality.

Depending on the implemented backend authorization rules, users can create recipes, edit existing recipes, and delete recipes.

### 4.6 Notifications and Error Handling

The application uses React Toastify to display notifications and errors to users.

### 4.7 Navigation

The application provides navigation between the dashboard, login page, signup page, and recipe management pages.

Unauthenticated visitors who click a recipe card are redirected to the login page.

The login page provides a link to the signup page.

---

## 5. Technical Specification

### 5.1 Technology Stack

| Technology | Purpose |
|---|---|
| MongoDB | Database for storing application information |
| Express.js | Backend web framework and API routing |
| React.js | Frontend user interface |
| Node.js | JavaScript runtime for the backend |
| Axios | HTTP requests between the frontend and backend |
| React Router | Frontend routing and navigation |
| React Toastify | User notifications |
| React Cookie | Cookie-related functionality in the frontend |
| Nodemon | Automatically restarts the backend during development |
| CSS | Application styling |

### 5.2 Application Architecture

Barista Hub follows a client-server architecture.

**Frontend: React.js**

The frontend provides the user interface, including the dashboard, authentication forms, and recipe management pages.

It sends HTTP requests to the backend using Axios.

**Backend: Node.js and Express.js**

The backend handles incoming requests, authentication operations, and recipe-related API requests.

It communicates with MongoDB to retrieve and manage application data.

**Database: MongoDB**

MongoDB stores application data, including recipe information and user-related records.

### 5.3 Data Flow

The application follows this general process:

1. A user opens the React application in a browser.
2. React displays the appropriate page.
3. Axios sends an HTTP request to the backend API.
4. Express.js processes the request.
5. The backend communicates with MongoDB when database access is required.
6. The backend returns a response.
7. React updates the interface based on the response.

### 5.4 Authentication and Security

The application includes user registration, login, logout, and authentication verification functionality.

Authentication requests are handled through the backend API.

The frontend uses Axios with `withCredentials: true` to support cookie-based authentication requests.

Security considerations include:

- Validating user input on the backend.
- Protecting recipe management endpoints against unauthorized requests.
- Hashing passwords before storing them.
- Using secure cookie settings appropriate to the deployment environment.
- Keeping database credentials and authentication secrets out of source control.
- Configuring CORS appropriately when the frontend and backend use different origins.

The exact security measures depend on the backend implementation and configuration.

### 5.5 Main Application Routes

The frontend includes the following routes:

| Route | Purpose |
|---|---|
| `/` | Recipe dashboard |
| `/login` | User login |
| `/signup` | User registration |
| `/add` | Add a recipe |
| `/edit/:id` | Edit a recipe identified by its ID |

The add and edit pages are wrapped in a protected route component.

The backend must also enforce authorization; frontend route protection alone is not sufficient to secure API operations.

---

## 6. System Requirements

Before installing Barista Hub, ensure the following are available:

- Node.js.
- npm, which is included with Node.js.
- MongoDB database access.
- A code editor such as Visual Studio Code.
- A modern web browser.
- Git, if cloning the project from GitHub.

You can verify your Node.js and npm installations by running:

```bash
node --version
npm --version
```

---

## 7. Installation and Setup

### 7.1 Obtain the Project

If you already have the project on your computer, navigate to the project directory.

If cloning the repository, use:

```bash
git clone https://github.com/asb01-er/Mern-Stack.git
```

Navigate to the Barista Hub project directory:

```bash
cd Mern-Stack/barista_project
```

### 7.2 Install Backend Dependencies

Navigate to the server directory:

```bash
cd server
npm install
```

### 7.3 Configure Backend Environment Variables

Create a `.env` file inside the `server` directory.

Configure the variables required by your backend.

For example:

```env
PORT=4000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

**Important:** These variable names are examples based on the project's expected configuration. Check the backend source code to confirm the exact names it reads before running the application.

Replace the example values with your actual configuration.

Do not commit your `.env` file or expose database credentials and authentication secrets publicly.

### 7.4 Start the Backend

From the `server` directory, run:

```bash
npm start
```

The backend should connect to MongoDB and start listening on the configured port.

The current development configuration uses port `4000`.

Keep the backend terminal running.

### 7.5 Install Frontend Dependencies

Open a second terminal.

Navigate to the React application directory:

```bash
cd "D:\Code College\MERN Stack\Classwork\barista_project\client\client"
```

Install the dependencies:

```bash
npm install
```

### 7.6 Start the Frontend

Run:

```bash
npm start
```

The React development server should start.

Open the application in your browser:

http://localhost:3000

**Important:** Keep both the backend and frontend terminals open while testing the application.

---

## 8. Environment Configuration

The frontend currently sends API requests to:

```text
http://localhost:4000
```

The backend must be running and accessible at that address for the frontend to communicate with it.

For deployment, configure the frontend and backend URLs appropriately.

Environment variables should be used for sensitive configuration values rather than hard-coding secrets into application code.

The frontend and backend must also be configured to support credentialed requests when cookie-based authentication is used.

---

## 9. User Documentation

### 9.1 Accessing the Application

1. Start the backend server.
2. Start the frontend development server.
3. Open `http://localhost:3000` in your browser.
4. The recipe dashboard should appear.

### 9.2 Browsing Recipes

The dashboard displays available recipes.

Each recipe can contain its title, category, ingredients, preparation instructions, and author information.

### 9.3 Creating an Account

1. Navigate to the signup page.
2. Enter the requested account details.
3. Submit the registration form.
4. Follow the application's response to determine whether registration was successful.

### 9.4 Logging In

1. Open the login page.
2. Enter your registered email address and password.
3. Submit the login form.
4. If authentication succeeds, the application redirects you to the dashboard.

### 9.5 Adding a Recipe

1. Log in.
2. Open the dashboard.
3. Select **Add New Recipe**.
4. Enter the requested recipe information.
5. Submit the form.
6. Confirm that the recipe appears on the dashboard.

### 9.6 Editing a Recipe

1. Log in.
2. Find the recipe you want to update.
3. Select **Edit**.
4. Modify the relevant information.
5. Save the changes.
6. Confirm that the updated recipe is displayed.

### 9.7 Deleting a Recipe

1. Log in.
2. Locate the recipe you want to delete.
3. Select **Delete**.
4. Confirm the deletion when prompted.
5. The application should remove the recipe from the dashboard after a successful response.

Deletion should only succeed when the backend's authorization rules permit the operation.

### 9.8 Logging Out

Use the application's logout control when available.

After logout, the application should clear or invalidate the authentication session according to the backend's implementation.

### 9.9 Troubleshooting

**Problem: The application cannot connect to the backend.**

Possible solutions:

- Confirm that the backend server is running.
- Check that the backend is using the expected port.
- Verify the frontend API URL.
- Check the browser console and backend terminal for errors.

**Problem: MongoDB does not connect.**

Possible solutions:

- Check the MongoDB connection string.
- Confirm that the database is accessible.
- Verify the required environment variables.
- Review the backend terminal for connection errors.

**Problem: Login or signup fails.**

Possible solutions:

- Confirm that the backend is running.
- Check the submitted credentials.
- Inspect the browser console and backend terminal.
- Verify the authentication API routes and environment variables.

**Problem: Recipe creation or editing fails.**

Possible solutions:

- Confirm that you are logged in.
- Check that all required fields have been completed.
- Inspect the response returned by the backend.
- Verify that the backend accepts the submitted data structure.

---

## 10. API Endpoints

The following endpoints correspond to the authentication and recipe requests used by the frontend.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/auth/verify` | Verify the current user's authentication status |
| POST | `/auth/signup` | Register a user |
| POST | `/auth/login` | Authenticate a user |
| POST | `/auth/logout` | Log out a user |
| GET | `/recipes` | Retrieve recipes |
| DELETE | `/recipes/:id` | Delete a recipe by its ID |

The frontend also uses recipe creation and editing functionality.

The exact HTTP methods, endpoint paths, request fields, response formats, and authorization rules for those operations should be confirmed against the backend route definitions.

### Example: Retrieve Recipes

**Request**

```http
GET /recipes
```

**Development URL**

```text
http://localhost:4000/recipes
```

The endpoint is expected to return a response containing the result of the recipe retrieval operation.

The exact response structure depends on the backend implementation.

---

## 11. Project Structure

The main application structure is organized into a backend server and a React frontend.

```text
barista_project/
│
├── server/
│   ├── index.js
│   ├── package.json
│   ├── .env
│   └── ...
│
└── client/
    └── client/
        ├── public/
        ├── src/
        │   ├── components/
        │   │   ├── Header.jsx
        │   │   └── ProtectedRoute.jsx
        │   │
        │   ├── pages/
        │   │   ├── Dashboard.jsx
        │   │   ├── Login.jsx
        │   │   ├── Signup.jsx
        │   │   ├── AddRecipe.jsx
        │   │   └── EditRecipe.jsx
        │   │
        │   ├── App.js
        │   ├── index.js
        │   └── ...
        │
        └── package.json
```

The structure above highlights the main files used by the application. The backend may contain additional route, model, middleware, and configuration files.

### Frontend Responsibilities

- Rendering the user interface.
- Handling navigation.
- Sending API requests.
- Displaying recipes.
- Managing form input and notifications.

### Backend Responsibilities

- Handling API requests.
- Processing authentication operations.
- Communicating with MongoDB.
- Managing recipe-related operations.
- Enforcing authorization and validating incoming requests.

---

## 12. Testing

The following manual tests can be used to verify the application's core functionality.

| Test | Expected Result |
|---|---|
| Open the dashboard | The dashboard loads |
| Retrieve recipes | Available recipes are displayed |
| Register a new user | The application reports the registration result |
| Log in with valid credentials | The user is authenticated |
| Log in with invalid credentials | An error is displayed |
| Click a recipe card while logged out | The user is redirected to the login page |
| Open the signup page | The registration form is displayed |
| Add a recipe while authenticated | The recipe is saved and displayed |
| Edit a recipe | The recipe is updated |
| Delete a recipe | The recipe is removed after successful deletion |
| Log out | The authentication session is ended according to the backend implementation |

These are intended test cases. Actual results should be confirmed by running the application.

---

## 13. Future Improvements

Potential future enhancements include:

- Recipe search functionality.
- Filtering recipes by category.
- Recipe ratings and reviews.
- Uploading recipe images.
- Improved mobile responsiveness.
- More detailed user profiles.
- Pagination for large recipe collections.
- Automated frontend and backend tests.
- Improved accessibility.
- Deployment to a production hosting platform.

These improvements could make Barista Hub more useful to baristas, coffee enthusiasts, and hospitality businesses.

---

## 14. Author

**Ernest Ekelem**

Full-Stack Web Development

Technologies explored in this project include MongoDB, Express.js, React.js, Node.js, and related frontend and backend tools.

GitHub: https://github.com/asb01-er

Portfolio: https://ernest-coding-portfolio.netlify.app/

---

## Conclusion

Barista Hub demonstrates the development of a full-stack web application using the MERN Stack.

The project combines a React frontend, a Node.js and Express.js backend, MongoDB data storage, authentication functionality, and recipe management features.

It provides a foundation for further development into a more comprehensive beverage recipe platform.