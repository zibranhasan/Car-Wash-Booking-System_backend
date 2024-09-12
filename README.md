# Car Wash Booking System
## Backend Live Link: https://car-washing-backend-coral.vercel.app 
## Frontend repo Link: https://github.com/zibranhasan/Car-wash-booking-system-frontend/tree/main?tab=readme-ov-file
## Overview
In a small town, Mr. Joe's car wash was renowned for making dreams come true. This system aims to streamline car wash bookings, inspired by the story of Lily, whose dream of becoming an artist was sparked at Mr. Joe's magical car wash.

## Features

- **User Management:**
  - User authentication (signup, login).
  - User roles: admin, user.
  - Secure password hashing.
  - Complete user profiles including name, email, phone, address.

- **Service Management:**
  - CRUD operations for services.
  - Soft delete for services.
  - Service details include name, description, price, duration, and deletion status.

- **Slot Management:**
  - Create slots for services with start and end times.
  - Admin-only access for slot management.
  - Slot status management (available, booked, canceled).

- **Booking Management:**
  - Book services with specific slots.
  - View all bookings (admin).
  - View personal bookings (user).
  - Vehicle details including type, brand, model, year, and registration plate.

- **Error Handling:**
  - Global error handling middleware.
  - Detailed error responses (Validation Error, Cast Error, Duplicate Entry).
  - Not Found handler for unmatched routes.

- **Authentication & Authorization:**
  - Authentication middleware.
  - Authorization checks for admin and user roles.
  - Ensures secure access to respective endpoints.

- **Zod Validation:**
  - Input validation using Zod for data consistency.
  - Detailed error messages on validation failures.

## Technology Stack

- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** MongoDB via Mongoose
- **Validation:** Zod

## API Endpoints

### User Routes

- `POST /api/auth/signup`: User registration.
- `POST /api/auth/login`: User login.
- `GET /api/my-bookings`: Get user's bookings.

### Service Routes

- `POST /api/services`: Create a new service (admin).
- `GET /api/services/:id`: Get a specific service.
- `GET /api/services`: Get all services.
- `PUT /api/services/:id`: Update a service (admin).
- `DELETE /api/services/:id`: Soft delete a service (admin).

### Slot Routes

- `POST /api/services/slots`: Create slots for a service (admin).
- `GET /api/slots/availability`: Get available slots (optional date and serviceId parameters).

### Booking Routes

- `POST /api/bookings`: Book a service (user).
- `GET /api/bookings`: Get all bookings (admin).

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone (https://github.com/zibranhasan/Car-Wash-Booking-System_backend)
   cd car-wash-booking-system
   npm i
   npm run start:dev
