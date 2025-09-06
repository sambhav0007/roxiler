Fullstack Ratings Application
This is a full-stack web application that allows users to submit and manage ratings for stores. The application is built with a NestJS backend, a PostgreSQL database, and a ReactJS frontend.

Table of Contents
Features

Tech Stack

Prerequisites

Getting Started

Database Schema

Project Structure

User Roles & Functionalities

Features
User Management: A single login system with distinct roles: System Administrator, Normal User, and Store Owner.

Store Ratings: Normal users can submit and modify ratings (1-5 stars) for approved stores.

Admin Dashboard: A dashboard for system administrators to manage users, stores, and view overall platform statistics.

Store Approval Workflow: Store owners can submit stores for approval, which a system administrator must approve before they become visible to normal users.

File Uploads: Store owners can upload a photo for their store.

Responsive Frontend: A modern, responsive user interface built with React and Bootstrap.

Tech Stack
Backend: NestJS, TypeScript

Database: PostgreSQL

Frontend: ReactJS, Axios, React Router, Formik, Yup

Styling: Bootstrap

Prerequisites
Before you begin, ensure you have the following installed:

Node.js (LTS version)

npm (Node Package Manager)

PostgreSQL server running

A .env file in the backend directory with your database credentials.

Getting Started
Follow these steps to get the application running on your local machine.

1. Backend Setup
Navigate to the fullstack-ratings-backend directory.

Install backend dependencies:

npm install

Create a PostgreSQL database named fullstack_ratings.

Update your src/database/schema.sql file and run it in your PostgreSQL client to create the tables.

Create a .env file in the backend's root directory with your database credentials.

Start the backend server in development mode:

npm run start:dev

The backend will run on http://localhost:3001.

2. Frontend Setup
Open a new terminal and navigate to the fullstack-ratings-frontend directory.

Install frontend dependencies:

npm install

Ensure your package.json file has the following line to proxy API requests:

"proxy": "http://localhost:3001/api",

Start the frontend development server:

npm start

The frontend will run on http://localhost:3000.

Database Schema
The database consists of three main tables: users, stores, and ratings.

users: Contains user details, including name, email, address, password, and role.

stores: Contains store information, including name, email, address, owner_id, photoUrl, and isApproved.

ratings: Links a user_id to a store_id with a rating value.

Project Structure
Backend (NestJS)
fullstack-ratings-backend/
├── src/
│   ├── auth/          (Authentication logic: DTOs, guards, strategies, controllers, services)
│   ├── stores/        (Store management: DTOs, entities, controllers, services)
│   ├── users/         (User management: DTOs, entities, controllers, services)
│   └── ratings/       (Rating functionality: DTOs, entities, controllers, services)
├── .env
├── package.json
└── README.md

Frontend (ReactJS)
fullstack-ratings-frontend/
├── src/
│   ├── components/
│   │   ├── Admin/         (Admin Dashboard, UserList, StoreList)
│   │   ├── Auth/          (Login, Signup)
│   │   ├── Layout/        (Navbar)
│   │   ├── NormalUser/    (NormalUserDashboard)
│   │   └── StoreOwner/    (StoreOwnerDashboard)
│   ├── context/       (AuthContext for global state management)
│   └── App.js
├── public/
├── package.json
└── README.md

User Roles & Functionalities
System Administrator: Can view all users and stores (including unapproved ones), approve new stores, and add new users of any role.

Store Owner: Can submit a store for approval, and once approved, can view ratings and analytics for their store.

Normal User: Can sign up, view all approved stores, and submit/modify a rating for each store.

To get started, you must first manually insert a "System Administrator" user into your PostgreSQL database.