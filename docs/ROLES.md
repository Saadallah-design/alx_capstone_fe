# 🎭 Platform Roles & Business Actions

This document outlines the permissions and typical business workflows for each user role within the ALX Car Rental Ecosystem.

---

## 👤 1. Customer (End User)
Customers are the primary consumers of the platform. They browse, book, and manage their personal rentals.

### ✅ Actions & Permissions:
- **Search & Filter**: Search for vehicles across all agencies by city, date, type, and technical specs.
- **Book Vehicles**: Create "PENDING" bookings for available vehicles.
- **Payments**: Complete Stripe payments to move bookings from "PENDING" to "CONFIRMED".
- **Self-Service Cancellation**: Cancel their own bookings (only before the start date/specified lead time).
- **Personal Profile**: Update their contact details, password, and view their personal rental history.
- **Apply for Agency**: Submit an application to become a partner agency.

---

## 🛠️ 2. Agency Staff
Staff members are "Hired" by Agency Admins to manage daily operations. They share the same fleet visibility as the Admin but have restricted management powers.

### ✅ Actions & Permissions:
- **Fleet Management**: Add new vehicles, update vehicle details, and manage technical specs.
- **Booking Oversight**: View all bookings associated with their agency's vehicles.
- **Operational Updates**: Update vehicle status (e.g., mark as "MAINTENANCE" or "AVAILABLE").
- **Branch Access**: View branch details where they are assigned.
- **Personal History**: Access their own personal bookings (made as a customer).

### ❌ Restricted Actions:
- **Cannot** manage other staff members.
- **Cannot** edit high-level agency profile settings (Business Name, License, etc.).
- **Cannot** view financial analytics/revenue reports.

---

## 🏛️ 3. Agency Admin (Business Owner)
The Admin is the owner of the agency profile. They have full control over their multi-tenant environment.

### ✅ Actions & Permissions (Everything Staff can do, plus):
- **Staff Management**: Hire (invite by email) and remove staff members. Toggle staff `is_active` status.
- **Agency Settings**: Update the legal business name, address, license number, and contact info.
- **Branch Management**: Create, edit, and delete pick-up/drop-off locations.
- **Financial Analytics**: View revenue reports, booking trends, and fleet performance metrics.
- **Fleet Control**: Full CRUD over the agency's vehicles and branch inventory.

---

## 🛡️ 4. Platform Admin (Superuser)
Platform admins manage the entire ecosystem and provide support.

### ✅ Actions & Permissions:
- **Agency Verification**: Review and approve "Pending" agency applications.
- **System Health**: Monitor all transactions, users, and system logs.
- **Conflict Resolution**: Intervene in bookings or payments when disputes arise.
- **Platform Analytics**: View global performance across all agencies.
