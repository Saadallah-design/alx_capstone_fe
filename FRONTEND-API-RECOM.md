# 🚀 Frontend Integration Guide: Car Rental API

This document provides the essential endpoints and data structures needed to integrate the backend with the frontend application.

## 🔐 Authentication (JWT)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register/` | POST | Register a new customer. |
| `/api/auth/login/` | POST | Login with `username` or `email`. |
| `/api/auth/token/refresh/` | POST | Get a new access token using a refresh token. |
| `/api/auth/me/` | GET/PATCH | Get or update the current user's profile. |

### 💡 Login Response Data
On success, the login endpoint returns a rich object. **Store the `role` and `agency` in your global state (Redux/Context).**
```json
{
  "access": "jwt_access_token",
  "refresh": "jwt_refresh_token",
  "user": {
    "role": "AGENCY_ADMIN",
    "permissions": { "is_customer": false, "is_agency_admin": true, ... }
  },
  "agency": { "id": 1, "name": "Test Motors", "slug": "test-motors" }
}
```

---

## 🏢 Branch & Inventory Management

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/branches/` | GET | List all branches (pickup/dropoff points). |
| `/api/branches/{slug}/inventory/` | GET | Get all available vehicles at a specific branch. |

---

## 🚗 Vehicle Catalog

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/vehicles/` | GET | List all vehicles. Supports filters. |
| `/api/vehicles/?make=Toyota` | GET | Filter by brand. |
| `/api/vehicles/{id}/` | GET | Detailed vehicle info including specs and images. |

---

## 📅 Booking System

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/bookings/` | POST | Create a new booking. |
| `/api/bookings/` | GET | List bookings for the current user. |
| `/api/bookings/{id}/` | GET | View specific booking details. |

### 💰 Booking Payload Example
```json
{
  "vehicle_id": 5,
  "pickup_location_id": 1,
  "dropoff_location_id": 1,
  "start_date": "2024-05-01T10:00:00Z",
  "end_date": "2024-05-05T10:00:00Z"
}
```

---

## 🛠️ Developer Tools

- **Interactive API Docs (Swagger):** `http://127.0.0.1:8000/api/schema/swagger-ui/`
- **Formal Docs (Redoc):** `http://127.0.0.1:8000/api/schema/redoc/`
- **Base URL:** `http://127.0.0.1:8000` (Update to HTTPS if using SSL)

### 🚨 Important Notes for Frontend:
1. **Authorization Header:** For all protected endpoints, use:
   `Authorization: Bearer <your_access_token>`
2. **Role-Based UI:** Use the `role` field from the login response to toggle between the **Customer Dashboard** and the **Agency Management Panel**.
3. **Data Isolation:** The backend automatically filters data based on the logged-in user. An Agency Admin calling `GET /api/vehicles/` will only see their own cars.
