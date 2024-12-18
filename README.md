
# Travel Agency Booking System

## Overview

The **Travel Agency Booking System** is a full-stack web application that allows users to browse and book various tour packages. Built using the **MERN stack** (MongoDB, Express, React, Node.js), the system provides a clean, responsive UI developed with **Tailwind CSS** and **ShadCN UI**. It includes functionalities for both users and admins:

- **Booking**: Users can book tour packages by providing their details.
- **Admin Panel**: Admins can manage packages and bookings.
- **Price Calculation**: The total price is dynamically updated based on the number of travelers.
- **PDF Invoice**: A PDF invoice is generated for users after a successful booking.

## Features

- **Tour Packages**: Browse a collection of tour packages.
- **Booking Form**: Users can submit booking requests with their details.
- **Admin Dashboard**: Admins can view and manage bookings and packages.
- **Dynamic Price Calculation**: Automatically updates the total price based on the number of travelers.
- **Form Validation**: Ensures that users provide correct information with real-time validation errors.
- **Invoice Generation**: A PDF invoice is generated after a successful booking.

## Tech Stack

- **Frontend**: 
  - **React.js**: JavaScript library for building the user interface.
  - **Tailwind CSS**: A utility-first CSS framework for styling.
  - **ShadCN UI**: A component library for React to create beautiful UI elements.
  - **Vite**: Fast build tool and development server for React.

- **Backend**:
  - **Node.js**: JavaScript runtime environment.
  - **Express.js**: Web framework to build the REST API.
  - **MongoDB**: NoSQL database for storing data.
  - **Mongoose**: ODM library for MongoDB.

- **Deployment**:
  - **Vercel**: Frontend deployment.
  - **Render**: Backend deployment.

## Installation

### Prerequisites

Before running the application locally, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud instance)

### Steps to Set Up Locally

1. Clone the repository:

```bash
https://github.com/DELTA18/tripplanner

```
2.Install dependencies for the backend:
```
cd backend
npm install
```
Set up your environment variables for backend
```
MONGODB_URI = mongodb://localhost:27017
ADMIN_USERNAME = admin
ADMIN_PASSWORD = password123
```
Start the backend server:

```
node app.js
```
Install dependencies for the frontend:
```
cd frontend
npm install
```
set up environment variables for frontend
```
VITE_BACKEND_URI = your backend url
```
Start the frontend development server:
```
npm run dev
```
Open your browser and navigate to http://localhost:5173 to use the application.
### Usage
## User Guide

### 1. Browse Packages
On the homepage, you can view a list of available tour packages. Each package provides essential details, including destination, price, and a brief description.
Pagination is added for efficient retrival.

### 2. Book a Package
To book a tour package:
- Select a package from the homepage or the search results.
- Enter your details, including name, email, phone number, number of travelers, and any special requests.
- Submit your booking request. The total price will be dynamically calculated based on the number of travelers.

### 3. Admin Login
Admins can log in to manage tour packages and view all bookings. To log in, use the following credentials:

- **Username**: `admin`
- **Password**: `password123`

This login gives you access to the admin panel where you can:
- View, add, update, or delete tour packages.
- View all user bookings.

## API Endpoints

### Backend API Routes

- **GET `/api/packages`**: Retrieves all available tour packages according to pagination.
- **GET `/api/packages/allpackages`**: Retrieves all available tour packages(for admin display).
- **GET `/api/:id`**: Retrieves package details.
- **POST `/api/bookings`**: Submit a new booking request.
- **POST `/api/admin/login`**: Admin login endpoint. Use the credentials provided above to access the admin panel.
- **PUT `/api/admin/packages/:id`**:update package
- **DELETE `/api/admin/packages/:id`**:update package

## Admin Login Details

To log in as an admin, use the following credentials:

- **Username**: `admin`
- **Password**: `password123`

These credentials are hardcoded for development purposes.
