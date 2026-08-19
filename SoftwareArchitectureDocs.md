# Tuition Management System — Software Architecture Document

# 1. Introduction

## 1.1 Purpose

- The Tuition Management System is a web-based multi-tenant application designed to manage tuition organizations, users, students, teachers, classes, academic activities, attendance, examinations, results, payments, announcements, and notifications.

- This Software Architecture Document defines the overall architecture of the system, including its architectural style, major components, communication structure, security architecture, multi-tenant architecture, database architecture, and deployment architecture.

- The system is implemented using React for the frontend, NestJS for the backend, and MongoDB for persistent data storage.

## 1.2 Architectural Goals

| Goal            | Description                                |
|-----------------|--------------------------------------------|
| Security        | Protect users and organizational data       |
| Multi-Tenancy   | Isolate data between tuition organizations  |
| Scalability     | Support increasing tenants and users       |
| Maintainability | Use modular and layered architecture        |
| Extensibility   | Allow future features and services          |

- The architecture of the system is designed to achieve the following objectives:

- - Provide a secure and maintainable software architecture.
- - Support multiple independent tuition organizations.
- - Ensure logical isolation of tenant data.
- - Separate presentation, business logic, and data management.
- - Support role-based access control.
- - Provide scalable backend and database architecture.
- - Allow future expansion of the system without major architectural changes.


# 2.Architectural Style

- The Tuition Management System follows a multi-tenant layered client-server architecture with a modular monolithic backend.

- The system consists of three primary architectural layers:

- - Presentation Layer
- - Application Layer
- - Data Layer

- The frontend is responsible for user interaction and presentation. The backend manages authentication, authorization, business logic, validation, tenant isolation, and API communication. MongoDB provides persistent data storage.

- The backend follows a modular architecture where individual business capabilities are separated into independent NestJS modules.

# 3. High-Level System Architecture

- The high-level architecture of the system is represented below.

```text

                        System Users
                              │
                              ▼
                   ┌────────────────────┐
                   │   React Frontend   │
                   │    Tailwind CSS    │
                   └─────────┬──────────┘
                             │
                        HTTPS / REST
                             │
                             ▼
                   ┌────────────────────┐
                   │   NestJS Backend   │
                   │                    │
                   │ Authentication     │
                   │ Authorization      │
                   │ Business Logic     │
                   │ Tenant Management  │
                   │ Validation         │
                   │ API Modules        │
                   └─────────┬──────────┘
                             │
                             ▼
                   ┌────────────────────┐
                   │      MongoDB       │
                   │                    │
                   │ Tenant Data        │
                   │ User Data          │
                   │ Academic Data      │
                   │ Payment Data       │
                   └────────────────────┘


```

# 4. Application Architecture

## 4.1 Frontend Architecture

- The frontend is developed using React and Tailwind CSS.

- The frontend provides the presentation layer of the system and is responsible for:

- - User interface rendering
- - Navigation
- - Forms
- - Client-side validation
- - Authentication state
- - API communication
- - Role-based interface access
- - User notifications

- The frontend communicates with the backend through RESTful APIs over HTTPS.

- The frontend does not directly communicate with the MongoDB database.

## 4.2 Backend Architecture

- The backend is developed using NestJS and follows a modular monolithic architecture.

- The major backend modules are:

```text

NestJS Backend
│
├── Authentication Module
├── Tenant Management Module
├── User Management Module
├── Student Management Module
├── Teacher Management Module
├── Parent Management Module
├── Class Management Module
├── Subject Management Module
├── Attendance Module
├── Examination Module
├── Results Module
├── Payment Module
└── Notification Module


```

- Each module is responsible for a specific business capability.

- The backend is internally organized into controllers, services, validation components, and database access components.

## 4.3 Data Architecture

- MongoDB is used as the primary database.

- The database stores:

- - Tenant information
- - User accounts
- - Student information
- - Teacher information
- - Parent information
- - Classes
- - Subjects
- - Attendance records
- - Examination records
- - Results
- - Payment records
- - Notifications

# 5. Layered Architecture

- The application follows a layered architecture.

```text

┌──────────────────────────────────────┐
│         Presentation Layer           │
│          React + Tailwind            │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│          Application Layer           │
│       NestJS Controllers/Services    │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│             Data Layer               │
│               MongoDB                │
└──────────────────────────────────────┘

```

- The separation of layers prevents presentation logic, business logic, and database operations from being tightly coupled.


# 6. Multi-Tenant Architecture

- The system supports multiple tuition organizations through a multi-tenant architecture.

- Each tuition organization represents a separate tenant.

- All tenants use the same application infrastructure while their organizational data remains logically isolated.


```text

                         Tuition Platform
                                │
                                ▼
                         NestJS Backend
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
              ▼                 ▼                 ▼
          Tenant A          Tenant B          Tenant C
              │                 │                 │
              ▼                 ▼                 ▼
        Tenant Data       Tenant Data       Tenant Data

```

- Tenant-owned records contain a `tenantId` value.

- For example:

```
Student
├── studentId
├── name
├── email
├── classId
└── tenantId

```

- The backend uses the authenticated user's tenant context when processing tenant-specific requests.

- Tenant isolation is therefore enforced at the backend and database access levels rather than relying on the frontend.


# 7. Authentication and Authorization Architecture

- The system uses JWT-based authentication.

- User passwords are protected using bcrypt hashing.

- Authentication and authorization are separated into two stages.

- Authentication verifies the identity of the user, while authorization determines whether the user has permission to perform a particular operation.

```text

                    User Request
                         │
                         ▼
                  JWT Validation
                         │
                         ▼
                  Identify User
                         │
                         ▼
                   Identify Role
                         │
                         ▼
                 Identify Tenant
                         │
                         ▼
                Permission Check
                    ┌────┴────┐
                    │         │
                 Allowed    Denied
                    │         │
                    ▼         ▼
                Continue    Reject

```

- The system uses role-based access control for the following primary roles:

| Role         | Main Access                         |
|--------------|-------------------------------------|
| Super Admin  | Platform and tenant management      |
| Tenant Admin | Tenant administration               |
| Teacher      | Classes and academic activities     |
| Student      | Personal academic information       |
| Parent       | Child-related information           |


# 8. Database Architecture

- MongoDB is used as the primary persistence layer.

- The major logical collections are:

- - Tenants
- - Users
- - Students
- - Teachers
- - Parents
- - Classes
- - Subjects
- - Attendance
- - Examinations
- - Results
- - Payments
- - Notifications

- The logical relationship between the major collections is represented below.

```text

                         Tenants
                            │
             ┌──────────────┼──────────────┐
             │              │              │
             ▼              ▼              ▼
           Users         Classes        Teachers
             │              │
             ▼              ▼
         Students       Attendance
                            │
                            ▼
                      Examinations
                            │
                            ▼
                         Results
                            │
                            ▼
                         Payments

```

- Tenant-specific collections contain `tenantId` to support data isolation.

- Database indexes are applied to frequently queried fields such as user email, tenant identifiers, student identifiers, class identifiers, and timestamps where appropriate.

# 9. API Architecture

- The frontend and backend communicate through RESTful APIs.

```text

┌───────────────────┐
│   React Frontend  │
└─────────┬─────────┘
          │
          │ HTTPS / REST
          ▼
┌───────────────────┐
│ NestJS Controllers│
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│  Business Services│
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│      MongoDB      │
└───────────────────┘

```

- The major API groups include:


```text

/api/auth
/api/tenants
/api/users
/api/students
/api/teachers
/api/parents
/api/classes
/api/subjects
/api/attendance
/api/examinations
/api/results
/api/payments
/api/notifications

```

# 10. Security Architecture

- Security is implemented at multiple architectural levels.

| Security Area           | Implementation                              |
|-------------------------|----------------------------------------------|
| Authentication          | JWT                                          |
| Password Protection     | bcrypt                                       |
| Authorization           | Role-Based Access Control                    |
| Tenant Isolation        | `tenantId` validation                        |
| Input Validation        | NestJS DTO validation                        |
| API Protection          | Authentication and authorization guards      |
| Communication Security  | HTTPS                                        |
| Configuration Security  | Environment variables                         |

- The backend validates authentication, authorization, tenant ownership, and request data before sensitive database operations are performed.

# 11. Deployment Architecture

- The system is designed to deploy the frontend, backend, and database as separate components.

```text

                         Internet
                            │
                            ▼
                   ┌─────────────────┐
                   │ React Frontend  │
                   │   Web Server    │
                   └────────┬────────┘
                            │
                          HTTPS
                            │
                            ▼
                   ┌─────────────────┐
                   │  NestJS Backend │
                   │    REST API     │
                   └────────┬────────┘
                            │
                            ▼
                   ┌─────────────────┐
                   │     MongoDB     │
                   │     Database    │
                   └─────────────────┘

```

- Environment variables are used to manage environment-specific configuration and sensitive information.

- Typical configuration values include database connection information, JWT secrets, server ports, and allowed frontend origins.

# 12. Scalability Architecture

- The initial implementation uses a modular monolithic backend.

- This approach provides clear module separation while avoiding the operational complexity of deploying multiple microservices.

- The backend can be horizontally scaled by deploying multiple application instances behind a load balancer.

```text
                     Load Balancer
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
          NestJS #1    NestJS #2    NestJS #3
              │            │            │
              └────────────┼────────────┘
                           │
                           ▼
                        MongoDB
```

- Future versions may introduce caching, message queues, background workers, object storage, and independently deployed services when system requirements justify them.

# 13. Architectural Decisions

| Decision        | Selected Technology / Approach              | Reason                                           |
|----------------|---------------------------------------------|--------------------------------------------------|
| Frontend       | React                                       | Component-based and maintainable UI              |
| Styling        | Tailwind CSS                                | Consistent and responsive interface development  |
| Backend        | NestJS                                      | Modular and structured backend architecture      |
| Database       | MongoDB                                     | Flexible document-based data model               |
| Authentication | JWT                                         | Suitable for REST API authentication             |
| Password Security | bcrypt                                   | Secure password hashing                          |
| Authorization  | RBAC                                        | Role-based access control                        |
| Architecture   | Modular Monolith                            | Maintainability with lower operational complexity |
| Multi-Tenancy  | Shared application with logical isolation   | Efficient tenant management                      |
| Communication  | REST API                                    | Clear frontend-backend separation                |

# 14. Quality Attributes

| Quality Attribute | Architectural Support                           |
|-------------------|--------------------------------------------------|
| Security          | JWT, RBAC, tenant validation                     |
| Scalability       | Modular backend and horizontal scaling           |
| Maintainability   | Modular NestJS architecture                      |
| Performance       | Database indexing and optimized queries          |
| Reliability       | Error handling and database backup               |
| Extensibility     | Independent functional modules                   |
| Data Isolation    | Tenant-based authorization                       |
| Testability       | Separation of controllers and services           |


# 15. Conclusion

- The Tuition Management System follows a multi-tenant, layered, and modular software architecture based on React, NestJS, and MongoDB.

- The architecture separates presentation, application logic, and data management while providing centralized authentication, authorization, validation, and tenant-level data isolation.

- The modular monolithic backend provides a practical architecture for the current system and allows future scalability through additional application instances and supporting infrastructure.

- The architecture also provides a clear path for future expansion without requiring significant changes to the fundamental system structure.