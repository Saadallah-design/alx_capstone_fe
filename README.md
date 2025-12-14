
# 🚗 Car Rental Marketplace Project

## 🚀 Refined Idea and Product Requirements

The application will be a **localized car rental marketplace** focusing on connecting independent rental agencies in Phuket with domestic and international customers.

### Core Product Requirements

| Stakeholder | Requirement | Rationale |
| :--- | :--- | :--- |
| **Agencies (Admin)** | Easy car listing/management. | Small agencies need a simple, low-barrier way to list their inventory. |
| **Customers (User)** | Fast, reliable search/filter. | Essential for a marketplace; tourists/locals need quick access to available cars. |
| **All Users** | Secure authentication system. | Agencies must protect their business data; customers need to manage bookings. |
| **All Users** | Clear, real-time availability. | To prevent double-bookings, which is a common issue for small agencies. |
| **System** | Highly performant (especially search). | Users abandon slow search results quickly. |

---

## 💡 Suggested Features and User Journeys

### User Journeys (Flows)

| User Type | User Journey | Key Steps |
| :--- | :--- | :--- |
| **Customer** | **Search & Book** | 1. **Enter Pickup/Drop-off Location & Dates.** 2. **Browse Search Results.** 3. **Filter** (Price, Type, Agency). 4. **View Car Details.** 5. **Select Extras/Insurance.** 6. **Register/Login.** 7. **Pay/Confirm Booking.** 8. **Receive Confirmation.** |
| **Agency** | **Car Listing** | 1. **Login to Agency Dashboard.** 2. **Add New Car.** 3. **Input Car Details** (Model, Specs, License Plate). 4. **Upload Images.** 5. **Set Pricing** (Daily/Weekly Rates). 6. **Set Availability.** 7. **Publish/Update Listing.** |
| **Agency** | **Booking Management** | 1. **View Incoming/Pending Bookings.** 2. **Accept/Reject Booking.** 3. **Update Status** (Confirmed, Picked Up, Returned, Cancelled). 4. **Communicate** with Customer (Optional, future scope). |

### Missing Features (Phase 1 & 2)

| Phase | Feature Suggestion | Rationale & Benefit |
| :--- | :--- | :--- |
| **Phase 1** (MVP) | **Location Picker** (Google Maps integration). | Phuket is the focus; precise pick-up/drop-off points are crucial for clarity. |
| **Phase 1** (MVP) | **Basic Review/Rating System** (Agency Level). | Builds trust, which is vital for a localized marketplace with smaller vendors. |
| **Phase 2** | **Multi-Rate Pricing** (Daily/Weekly/Monthly). | Cater to different customer needs (short holiday vs. long stay). |
| **Phase 2** | **Agency Performance Metrics** (Dashboard). | Helps agencies track their best-performing cars and revenue. |
| **Phase 2** | **Dynamic Booking Blocking** (Calendar View). | Allows agencies to manually block out dates for maintenance or non-platform rentals. |

---

## 💾 Database Design (Simplified for MVP)

We will use a Relational Database (e.g., PostgreSQL or MySQL). Here's a schema overview for the core entities:

| Entity | Key Fields | Relationships | Notes |
| :--- | :--- | :--- | :--- |
| **User** | `id`, `email`, `password`, `first_name`, `last_name`, `role` (Customer/AgencyAdmin), `is_active` | One-to-One with **Agency** (if AgencyAdmin) | Standard authentication model. |
| **Agency** | `id`, `name`, `license_no`, `phone`, `address`, `user_id` (FK to User) | One-to-Many with **Car**, One-to-Many with **Booking** | Represents the rental company. |
| **Car** | `id`, `agency_id` (FK to Agency), `make`, `model`, `year`, `transmission` (Auto/Manual), `fuel_type`, `seats`, `license_plate`, `daily_rate`, `description`, `status` (Available/Rented/Maintenance) | One-to-Many with **Image**, One-to-Many with **Booking** | The core listing entity. |
| **CarImage** | `id`, `car_id` (FK to Car), `image_url`, `is_main` | Many-to-One with **Car** | For handling multiple photos per car. |
| **Booking** | `id`, `customer_id` (FK to User), `car_id` (FK to Car), `agency_id` (FK to Agency), `start_date`, `end_date`, `pickup_location`, `dropoff_location`, `total_price`, `status` (Pending/Confirmed/Cancelled/Completed), `payment_id` | Many-to-One with **User** (Customer), Many-to-One with **Car** | The transaction entity. |

---

## 🛠️ System Architecture

The current proposed architecture is a classic **Separated Frontend and Backend (Decoupled Architecture)**. As this is ideal for scalability and developer specialization.

### Backend (Django REST API)

- **Framework:** Django (Stability, ORM, Admin Interface)
- **API:** Django REST Framework (DRF) (Powerful tooling for APIs)
- **Key Responsibilities:**
    - Authentication/Authorization: Handling user registration, login, token management (e.g., JWT).
    - Data Management: CRUD operations for Cars, Agencies, and Bookings.
    - Business Logic: Calculating rental costs, checking car availability/booking conflicts.
    - Search/Filtering: Efficiently querying the database based on date/location/car specs.
- **Deployment:** Can be hosted on a standard PaaS like Heroku, Digital Ocean, or AWS/Google Cloud.

### Frontend (React/Tailwind)

- **Framework:** React (Component-based UI, strong community)
- **Styling:** Tailwind CSS (Utility-first for rapid and responsive development)
- **State Management:** Built-in React Hooks (`useState`, `useContext`) or a simple library like Zustand/Redux Toolkit (if complexity grows).
- **API Interaction:** Using libraries like Axios or the built-in `fetch` API to communicate with the Django REST API.
- **Key Responsibilities:**
    - Presenting the UI (Search forms, car listings, agency dashboard).
    - Handling user input and navigation.
    - Managing local application state.
    - Displaying data fetched from the API.

---

## 🧩 Frontend Component Structure (React)

Organize the React components into logical directories to maintain a clear structure.

| Directory/Component | Description | Example Components |
| :--- | :--- | :--- |
| `src/pages` | Top-level components representing routes/pages. | HomePage, SearchResults, CarDetails, AgencyDashboard, LoginPage |
| `src/components/common` | Reusable, general-purpose components. | Header, Footer, Button, Input, Modal, LoadingSpinner |
| `src/components/customer` | Components for the customer-facing views. | SearchForm, CarCard, FilterSidebar, BookingSummary |
| `src/components/agency` | Components for the agency dashboard. | CarListTable, NewCarForm, BookingCalendar, AgencyMetrics |
| `src/hooks` | Custom hooks for reusable logic. | useAuth, useFetchData, useDebounce |

---

## 🗺️ Development Roadmap (MVP Focus)

Since this is a solo developer project focusing on Phuket, prioritizing the core functions is crucial.
The time-frame is for full product but since this is capstone it will be shorter and focus only on important elements.

### Phase 1: Minimum Viable Product (MVP) - 6-8 Weeks

1. Backend Core (Django/DRF):
    - Set up Django project, database (User, Agency, Car models).
    - Implement User Authentication (Registration/Login for Customer and AgencyAdmin).
    - Develop Car Listing API (CRUD for AgencyAdmin).
    - Develop Public Search API (Filter by location, dates, car type).
2. Frontend Core (React/Tailwind):
    - Set up React project and configure Tailwind CSS.
    - Create Landing Page with the main search form.
    - Develop Search Results Page and the CarCard component.
    - Build Customer Login/Registration screens.
    - Create a basic Agency Dashboard with a simple table of their cars.
3. Deployment: Deploy a basic version to a staging environment (e.g., Vercel for React, Digital Ocean droplet for Django).

### Phase 2: Booking & Payment Integration - 4 Weeks

1. Backend:
    - Implement Booking Model and logic to check for double-booking conflicts.
    - Develop Booking API (Creation, Status Update).
    - Integrate a Payment Gateway (e.g., Stripe, or a local provider like PromptPay/local bank transfer support for Thailand).
2. Frontend:
    - Develop the Car Details Page and the Booking Checkout Flow.
    - Implement Booking Confirmation Page and My Bookings section for customers.

### Phase 3: Agency Tools & Refinement

1. Backend:
    - Add Image Upload (S3/Cloudinary integration).
    - Refine search logic for better performance.
2. Frontend:
    - Build the full Agency Car Creation Form (with image upload).
    - Implement a Review/Rating System.

---

## 📝 Technical Documentation (Local Focus)

For now, the technical documentation should live in a README.md alongside a Doc directory (gitignored) file at the root of the project, with separate sections for the frontend and backend.

### Documentation Structure

#### Project Overview
- Goal, Target Market (Phuket Agencies/Tourists), Tech Stack.

#### Local Setup Guide
- Backend (Django):
    - Prerequisites: Python, PostgreSQL/SQLite.
    - `git clone ...`
    - `pip install -r requirements.txt`
    - `python manage.py migrate`
    * `python manage.py runserver`
    * **Environment Variables** (e.g., `SECRET_KEY`, `DB_NAME`, `DB_USER`).
* **Frontend (React):**
    * Prerequisites: Node.js, npm/yarn.
    * `cd frontend`
    * `npm install`
    * `npm start`

#### **3. API Endpoints (Core)**
| Endpoint | Method | Description | Authentication |
| :--- | :--- | :--- | :--- |
| `/api/v1/auth/register/` | POST | Customer/Agency registration. | None |
| `/api/v1/cars/` | GET | Search for available cars. | None |
| `/api/v1/agency/cars/` | POST | Create a new car listing. | AgencyAdmin |
| `/api/v1/bookings/` | POST | Create a new booking. | Customer |

#### **4. Database Schema**
* Brief description of the main models (`User`, `Agency`, `Car`, `Booking`).

## 🎯 Refined Project Focus: Phuket MVP (Using AI for Recommendations)


By focusing on a **Minimum Viable Product (MVP)** for a single geographic area (Phuket), we can launch quickly and gather feedback, which is crucial for a solo developer.

| Refinement Area | MVP Strategy (Phuket Focus) |
| :--- | :--- |
| **Authentication** | **Simple Dual-Role Setup:** Use Django's built-in User model with a boolean field (e.g., `is_agency_admin`) or roles/groups to clearly separate Customer and Agency access. |
| **Location** | **Start Simple:** Use a `CharField` for `pickup_location` (e.g., "Phuket Airport," "Patong Beach," "Agency Address") instead of complex Geo-fencing in Phase 1. |
| **Payment** | **Two-Step Booking:** Implement the booking engine first. For payment, start with **"Reservation Request"** (Agency manually approves) or **Payment Gateway Integration** (e.g., Stripe, which is globally accessible, for credit card payments) to handle deposits. |
| **Scaling** | **Monolith-First:** Keep the backend as a single Django application for simplicity and rapid development, delaying a complex microservices structure until you gain traction. |

## 📦 Database Design Validation & Refinement

The proposed database schema is solid. Here are some refinements and suggested fields to support key marketplace features:

### Core Models Refinements

| Model | Refinement/Key Fields | Rationale |
| :--- | :--- | :--- |
| **Agency** | Add `rating_average` (Float), `total_reviews` (Integer). | Essential for customer trust (validated product requirement). |
| **Car** | Add `is_published` (Boolean), `color`, `transmission` (Choice Field: Auto/Manual), `car_type` (e.g., Sedan, SUV, Scooter - *important for Phuket*). | Allows agencies to unlist cars; adds critical filters. |
| **Booking** | Add `daily_rate_at_booking` (Decimal), `tax_rate_at_booking` (Decimal), `final_deposit_paid` (Decimal). | **Financial integrity:** Locks in the price at the time of booking, preventing discrepancies if the agency changes the car's general `daily_rate` later. |
| **Review** | New Model: `id`, `car_id` (FK), `customer_id` (FK), `rating` (1-5), `comment`, `created_at`. | Required for the trust-building feature. |

### Availability Management Strategy

The biggest challenge in a marketplace is real-time availability. Your Django backend must implement logic to prevent overbooking:

> When a customer searches for a car, the query should filter the **Car** model by checking that **no active (Confirmed/Pending) `Booking` exists** for the desired `car_id` that **overlaps** the customer's `start_date` and `end_date`.

## 🏗️ Backend Architecture (Django REST Framework)

| Component | Technology/Library | Function |
| :--- | :--- | :--- |
| **Routing** | Django URLs | Mapping `/api/v1/cars/` to the correct ViewSet. |
| **Data Access** | Django ORM | Interacting with the PostgreSQL database. |
| **API Layer** | **DRF ViewSets/Serializers** | Defining the API structure and serializing data (e.g., transforming a Car object into a JSON response). |
| **Auth** | **`djangorestframework-simplejwt`** | Provides robust, stateless Token-Based Authentication (JWT) which is standard for decoupled architectures. |
| **Images** | **`django-storages`** | To upload car images to an object storage service like **AWS S3** or **Cloudinary**, preventing file system clutter on your server. |

## 💻 Frontend Component Structure & Data Flow

The React structure is logical. Emphasize **State Management** and **API calls** within your components.

### Component-Data Flow Example

| Component | Responsibility | Data Source (API Endpoint) |
| :--- | :--- | :--- |
| **`SearchForm`** | Collects pickup/drop-off dates, location. | None (Local State) |
| **`SearchResults`** | Displays list of `CarCard` components. | `GET /api/v1/cars/?start_date=...&end_date=...` |
| **`CarDetails`** | Shows one car's full details and booking form. | `GET /api/v1/cars/{id}/` |
| **`BookingCheckout`** | Collects user info, calls booking API. | `POST /api/v1/bookings/` |
| **`AgencyDashboard`** | Main entry for the agency. | `GET /api/v1/agency/cars/` and `GET /api/v1/agency/bookings/` |

**Best Practice:** Use **React Query** (TanStack Query) for fetching, caching, and updating asynchronous data in React, which simplifies API interactions immensely.

## 🧭 Development Roadmap (Detailed MVP Tasks)

Focusing on the shortest path to a shippable product that can generate a reservation:

| Phase | Duration | Core Tasks | Deliverable |
| :--- | :--- | :--- | :--- |
| **Setup & Auth** | 1 Week | Configure Django, DRF, JWT. Create `User`, `Agency` models. Implement Customer/Agency Registration/Login. | Login and Logout functionality working for both user types. |
| **Agency Listing** | 2 Weeks | Build `Car` and `CarImage` models. Implement Agency Dashboard (React). Create API and form for **Agency to Add/Edit a Car Listing** (CRUD). | Agencies can log in and successfully list a car with images. |
| **Customer Search** | 2 Weeks | Implement Public Search API (critical **availability logic**). Build `SearchForm` and `SearchResults` page (React) with basic filtering (Car Type, Price). | Customers can search, filter, and view car details for available dates. |
| **Booking Engine** | 2 Weeks | Build `Booking` model. Implement `POST /api/v1/bookings/` endpoint. Create **Checkout Page** (React) and Confirmation. | Customers can complete a reservation request (Pending status). |
| **Final MVP** | 1 Week | Final UI polish (Tailwind). Configure deployment (simple single server). Basic technical documentation and error handling. | **Live MVP Product** capable of taking reservations in Phuket. |

