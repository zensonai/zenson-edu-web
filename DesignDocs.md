# 1. Introduction

## 1.1 Purpose

- The Tuition Management System is a web-based multi-tenant application designed to support the management of tuition classes, students, teachers, academic activities, payments, and communication.

- The system is developed using a React-based frontend, NestJS backend, and MongoDB database. The multi-tenant architecture allows multiple tuition organizations to use the same application while keeping their organizational data logically isolated.

## 1.2 Objectives

- The main objectives of the system are to:

- - Provide a centralized platform for managing tuition activities. 
- - Manage students, teachers, classes, and subjects efficiently. 
- - Support attendance, examinations, results, and payment management. 
- - Provide secure authentication and role-based access. 
- - Support multiple tuition organizations through a multi-tenant architecture. 
- - Maintain secure separation of data between different tenants. 
- - Provide a scalable and maintainable software architecture. 

## 1.3 Scope

- The system covers user authentication, tenant management, student and teacher management, class and subject management, attendance, examinations, results, payments, announcements, notifications, and basic reporting.

- The system is intended to support different types of users with different permissions according to their roles.

# 2. System Overview

- The Tuition Management System follows a client-server architecture consisting of a React frontend, NestJS backend, and MongoDB database.

- The frontend provides the user interface through which users interact with the system. The NestJS backend manages business logic, authentication, authorization, validation, and communication with the database. MongoDB stores application and tenant-related data.

- The system follows a multi-tenant architecture, allowing multiple tuition organizations to operate independently within the same application.


## Technology Stack

| Layer        | Technology |
|--------------|------------|
| Frontend     | React |
| Styling      | Tailwind CSS |
| Backend      | NestJS |
| Database     | MongoDB |
| Authentication | JWT |
| Password Security | bcrypt |
| Architecture | Multi-Tenant Client-Server Architecture |

## High-Level System Architecture

```text

                ┌──────────────────────┐
                │      Users           │
                │ Admin / Teacher      │
                │ Student / Parent     │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │    React Frontend    │
                │    Tailwind CSS      │
                └──────────┬───────────┘
                           │ HTTPS / REST API
                           ▼
                ┌──────────────────────┐
                │    NestJS Backend    │
                │                      │
                │ Authentication       │
                │ Authorization        │
                │ Business Logic       │
                │ Tenant Validation    │
                │ API Modules          │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │       MongoDB        │
                │                      │
                │ Tenants              │
                │ Users                │
                │ Students             │
                │ Classes              │
                │ Payments             │
                │ Results              │
                └──────────────────────┘

```

# 3. User Roles

- The system provides different levels of access based on user roles.

| Role         | User Management | Academic Management | Attendance | Results | Payments | Announcements |
|--------------|-----------------|---------------------|------------|---------|----------|---------------|
| Super Admin  | ✓               | —                   | —          | —       | ✓        | ✓             |
| Tenant Admin | ✓               | ✓                   | ✓          | ✓       | ✓        | ✓             |
| Teacher      | Limited         | ✓                   | ✓          | ✓       | —        | ✓             |
| Student      | Own Profile     | View                | View       | View    | View     | View          |
| Parent       | View Children   | View                | View       | View    | View     | View          |

## Super Admin

- The Super Admin manages the overall platform and tenants. Responsibilities include managing tenant organizations and monitoring the overall system.

## Tenant Admin

- The Tenant Admin manages the operations of an individual tuition organization. This includes managing students, teachers, classes, subjects, payments, and other tenant-specific information.

## Teacher

- Teachers can access functionality related to their assigned classes and students, including attendance, academic activities, examinations, and results.

## Student

- Students can access their own academic information, including classes, attendance, examinations, results, and relevant announcements.

## Parent

- Parents can access information related to their children, including attendance, academic results, classes, and relevant notifications.


- Access to system functionality is controlled through role-based authorization.


## Role Hierarchy

```text

                 Super Admin
                      │
                      ▼
                Tenant Admin
                 /    |    \
                /     |     \
               ▼      ▼      ▼
           Teacher  Student  Parent

```

# 4. Main System Modules

## 4.1 Tenant Management

- The tenant management module allows the platform to support multiple independent tuition organizations. Each tenant has its own users and operational data.

### Multi-Tenant Architecture

```text

                    Application
                         │
                 ┌───────┴───────┐
                 │   NestJS API  │
                 └───────┬───────┘
                         │
              Tenant Identification
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
    Tenant A         Tenant B         Tenant C
        │                │                │
   ┌────┴────┐      ┌────┴────┐      ┌────┴────┐
   │ Users   │      │ Users   │      │ Users   │
   │ Classes │      │ Classes │      │ Classes │
   │ Students│      │ Students│      │ Students│
   │ Payments│      │ Payments│      │ Payments│
   └─────────┘      └─────────┘      └─────────┘

```

### Tenant Isolation Example

| Data       | Tenant A | Tenant B | Tenant C |
|------------|----------|----------|----------|
| Users      | Isolated | Isolated | Isolated |
| Students   | Isolated | Isolated | Isolated |
| Classes    | Isolated | Isolated | Isolated |
| Attendance | Isolated | Isolated | Isolated |
| Payments   | Isolated | Isolated | Isolated |

## 4.2 User Management

- The user management module handles user registration, account information, roles, permissions, and account administration.

## 4.3 Student Management

- This module manages student profiles, enrollment information, assigned classes, academic information, and related records.

## 4.4 Teacher Management

- The teacher module manages teacher profiles, assigned subjects, classes, and teaching-related information.

## 4.5 Class and Subject Management

- Administrators can create and manage classes and subjects and assign teachers and students where applicable.

## 4.6 Attendance Management

- Teachers can record and manage student attendance for their assigned classes. Authorized users can access attendance information according to their permissions.

## 4.7 Examination and Results Management

- The system supports examination-related information and student results. Teachers or authorized administrators can record results, while students and parents can view permitted academic information.

## 4.8 Payment Management

- The payment module manages tuition-related payment records and allows authorized users to track payment information.

## 4.9 Announcements and Notifications

- The system provides communication functionality for sharing important announcements and notifications with relevant users.


## System Module Overview

```text

                 Tuition Management System
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
   User & Tenant      Academic          Financial
   Management         Management        Management
        │                  │                  │
   ┌────┴────┐        ┌────┼────┐        ┌───────┐
   ▼         ▼        ▼    ▼    ▼        ▼
 Tenant    Users    Classes Attendance Payments
   │                  │    │
   ▼                  ▼    ▼
 Students          Exams  Results
 Teachers
 Parents

                 ┌─────────────────────┐
                 │ Communication       │
                 │ Announcements       │
                 │ Notifications       │
                 └─────────────────────┘

```


# 5. System Architecture

- The system uses a layered client-server architecture.

## Frontend Layer

- The React frontend provides the user interface and handles:

- - User interaction 
- - Navigation 
- - Forms 
- - Client-side validation 
- - Authentication state 
- - Role-based interface access 
- - Communication with backend APIs 

## Backend Layer

- NestJS provides the application backend and handles:

- - REST API endpoints 
- - Business logic 
- - Authentication 
- - Authorization 
- - Tenant validation 
- - Data validation 
- - Database operations 
- - Error handling 

- The backend is organized into independent modules to improve maintainability and scalability.

## Database Layer

- MongoDB is used to persist system data. Collections are organized according to the system's functional requirements.

- Tenant-owned data is associated with a tenant identifier, allowing the backend to ensure that users can access only the data belonging to their authorized tenant.

## Authentication and Authorization

### Authentication Flow

```text
        Start
          │
          ▼
    User Login
          │
          ▼
    Validate Input
          │
          ▼
    Find User Account
          │
       ┌──┴───┐
       │      │
      No     Yes
       │      │
       ▼      ▼
   Reject   Verify
   Login    Password
              │
           ┌──┴───┐
           │      │
          No     Yes
           │      │
           ▼      ▼
        Reject   Generate
        Login    JWT
                    │
                    ▼
              Identify Role
                    │
                    ▼
             Identify Tenant
                    │
                    ▼
                Allow API
                 Access

```

- Authentication is implemented using JWT-based authentication. Passwords are securely hashed using bcrypt.

- After authentication, authorization mechanisms determine whether the authenticated user has permission to perform a requested operation.

## Layered Architecture

```text

┌─────────────────────────────────────────────┐
│              Presentation Layer             │
│                                             │
│              React + Tailwind               │
│                                             │
│  Pages │ Components │ Forms │ Navigation    │
└──────────────────────┬──────────────────────┘
                       │
                       │ REST API / HTTPS
                       ▼
┌─────────────────────────────────────────────┐
│                Application Layer            │
│                                             │
│                 NestJS Backend              │
│                                             │
│ Auth │ Users │ Students │ Teachers          │
│ Classes │ Attendance │ Exams │ Payments     │
│ Notifications │ Tenant Management           │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│                 Data Layer                  │
│                                             │
│                   MongoDB                   │
│                                             │
│ Collections + Indexes + Tenant Data         │
└─────────────────────────────────────────────┘

```



## 6. Database Design

### ER / Collection Relationship Diagram

```text

                    ┌─────────────┐
                    │   Tenants   │
                    └──────┬──────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            ▼              ▼              ▼
        ┌───────┐      ┌─────────┐    ┌─────────┐
        │ Users │      │ Classes │    │ Subjects│
        └───┬───┘      └────┬────┘    └────┬────┘
            │               │              │
       ┌────┼────┐          │              │
       ▼    ▼    ▼          ▼              ▼
   Student Teacher Parent  Attendance   Class Subject
       │       │             │
       │       └─────────────┤
       │                     │
       ▼                     ▼
  Examinations ─────────── Results
       │
       ▼
   Payments

             Notifications
                   │
                   ▼
             Users / Tenants

```

- The system uses MongoDB as its primary database.

- The main logical collections include:

- -  Tenants — stores tuition organization information. 
- -  Users — stores user accounts, roles, and authentication-related information. 
- -  Students — stores student-specific information. 
- -  Teachers — stores teacher-specific information. 
- -  Parents — stores parent/guardian information. 
- -  Classes — stores class information. 
- -  Subjects — stores subject information. 
- -  Attendance — stores student attendance records. 
- -  Examinations — stores examination information. 
- -  Results — stores examination results. 
- -  Payments — stores tuition payment records. 
- -  Notifications — stores system notifications and announcements.



# Tenant Data Isolation

## Tenant Authorization Flow

```text

User Request
     │
     ▼
JWT Authentication
     │
     ▼
Extract User Identity
     │
     ▼
Extract User Tenant ID
     │
     ▼
Request Database Operation
     │
     ▼
Apply tenantId Filter
     │
     ▼
Check Tenant Ownership
     │
   ┌─┴───────┐
   │         │
 Valid     Invalid
   │         │
   ▼         ▼
Allow      Reject
Request    Request

```

- Tenant-specific documents contain a tenant identifier such as tenantId.

- For example:

```text

Student
 ├── studentId
 ├── name
 ├── email
 └── tenantId

```
- The backend uses the authenticated user's tenant context when processing tenant-specific requests. This prevents users belonging to one tuition organization from accessing records belonging to another organization.

- Tenant isolation is therefore enforced at the application and authorization levels rather than relying only on the frontend.

# 7. Security Design

- Security is an important part of the system because the application manages user, academic, and payment-related information.
- The system applies the following security mechanisms:
- - JWT Authentication
- - JWT tokens are used to authenticate users when accessing protected backend resources.
- - Password Hashing
- - Passwords are stored using secure bcrypt hashing rather than storing plain-text passwords.
- - Role-Based Access Control
- - Access to system functionality is restricted according to user roles. Users cannot perform operations outside their assigned permissions.
- - Tenant-Level Authorization
- - Tenant-specific requests are validated against the authenticated user's tenant context. This prevents unauthorized cross-tenant access.
- - Input Validation
- - Backend DTOs and validation mechanisms are used to validate incoming data before processing.
- - Protected APIs
- - Sensitive operations are protected using NestJS authentication and authorization mechanisms.

## Security Controls

| Security Mechanism       | Purpose                       | Implementation              |
|--------------------------|-------------------------------|-----------------------------|
| JWT Authentication       | Authenticate users            | NestJS JWT                  |
| bcrypt                   | Protect passwords             | Password hashing            |
| RBAC                     | Restrict functionality        | Roles/Guards                |
| Tenant Authorization     | Prevent cross-tenant access   | `tenantId` validation       |
| DTO Validation           | Validate requests             | NestJS ValidationPipe       |
| Protected APIs           | Protect sensitive resources   | Authentication Guards       |
| Environment Variables    | Protect configuration         | `.env` configuration        |

## Security Request Flow

```text

Client Request
      │
      ▼
 JWT Authentication
      │
      ▼
 Authentication Guard
      │
      ▼
 Role Authorization
      │
      ▼
 Tenant Validation
      │
      ▼
 DTO / Input Validation
      │
      ▼
 Business Logic
      │
      ▼
 Database Operation
      │
      ▼
 Response

```


# 8. Deployment and Conclusion

## 8.1 Deployment

- The application is designed to be deployable as separate frontend, backend, and database components.
- The React frontend communicates with the NestJS backend through secured APIs. The backend communicates with MongoDB for persistent data storage.
- Environment variables are used for configuration and sensitive values rather than hard-coding such information into the application source code.

## 8.2 Scalability

- The modular NestJS architecture allows additional modules and functionality to be added without significantly affecting existing components.
- The multi-tenant architecture also allows additional tuition organizations to be onboarded while maintaining logical separation of their data.

## 8.3 Conclusion
- The proposed Tuition Management System provides a structured and secure platform for managing tuition organization operations.
- The combination of React, NestJS, MongoDB, JWT authentication, role-based authorization, and multi-tenant data isolation provides a maintainable foundation for the system.
- The modular architecture allows the system to be extended with additional functionality in the future while maintaining separation between different tuition organizations and their data.


## Deployment Architecture

```text
                 Internet
                    │
                    ▼
        ┌─────────────────────┐
        │   React Frontend    │
        │   Web Application   │
        └──────────┬──────────┘
                   │ HTTPS
                   ▼
        ┌─────────────────────┐
        │    NestJS Backend   │
        │      REST API       │
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │       MongoDB       │
        │    Database Server  │
        └─────────────────────┘

```

| Requirement         | Supporting Module             |
|---------------------|-------------------------------|
| User Authentication | User Management               |
| Tenant Isolation    | Tenant Management             |
| Student Management  | Student Management            |
| Teacher Management  | Teacher Management             |
| Class Management    | Class & Subject Management    |
| Attendance          | Attendance Management         |
| Examinations        | Examination Management        |
| Academic Results    | Results Management             |
| Tuition Payments    | Payment Management            |
| Communication       | Announcements & Notifications |
| Access Control      | Security / RBAC               |