# API Documentation

## Authentication Routes

### Register Student
```http
POST /api/students/register
```

**Required Fields:**
```json
{
    "name": "Student Name",
    "email": "student@example.com",
    "password": "password123",
    "batch": 2023
}
```

**Success Response:**
```json
{
    "message": "Student registered successfully",
    "user": {
        "id": "uuid",
        "name": "Student Name",
        "email": "student@example.com",
        "batch": 2023,
        "role": "student"
    },
    "token": "jwt_token"
}
```

### Login Routes

#### General Login (All Roles)
```http
POST /api/login
```

#### Admin Login
```http
POST /api/admin/login
```

#### Student Login
```http
POST /api/students/login
```

#### Clerk Login
```http
POST /api/clerk/login
```

**Required Fields for all login routes:**
```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

**Success Response:**
```json
{
    "message": "Login successful",
    "token": "jwt_token",
    "user": {
        "id": "uuid",
        "name": "Student Name",
        "email": "student@example.com",
        "role": "student|clerk|admin"
    }
}
```

## Profile Management

### Update Profile
```http
PUT /api/profile
```

**Headers:**
```
Authorization: Bearer <token>
```

**Optional Fields (can be updated after registration):**
```json
{
    "contact": "1234567890",
    "address": "Student Address",
    "profile_picture": "url_to_picture",
    "skills": ["JavaScript", "Python"],
    "education": [
        {
            "degree": "B.Tech",
            "institution": "University Name",
            "year": 2023
        }
    ]
}
```

**Success Response:**
```json
{
    "message": "Profile updated successfully",
    "user": {
        "id": "uuid",
        "name": "Student Name",
        "email": "student@example.com",
        "batch": 2023,
        "contact": "1234567890",
        "address": "Student Address",
        "profile_picture": "url_to_picture",
        "skills": ["JavaScript", "Python"],
        "education": [{
            "degree": "B.Tech",
            "institution": "University Name",
            "year": 2023
        }],
        "updatedAt": "timestamp"
    }
}
```

## Bulk Upload Students (Admin Only)

```http
POST /api/students/bulk
```

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data
```

**Input:**
- Form data with key 'file' containing either:
  1. A CSV file, or
  2. An Excel file (.xlsx)

**File Format:**
1. CSV format:
```csv
name,email,password,batch
John Doe,john@example.com,password123,2023
Jane Doe,jane@example.com,password123,2023
```

2. Excel format:
- First row should contain column headers: name, email, password, batch
- Subsequent rows should contain student data
- Sheet name doesn't matter, first sheet will be used

**Success Response:**
```json
{
    "message": "Students created successfully",
    "created": 2,
    "failed": 0,
    "students": [
        {
            "id": "uuid1",
            "name": "John Doe",
            "email": "john@example.com",
            "batch": 2023
        },
        {
            "id": "uuid2",
            "name": "Jane Doe",
            "email": "jane@example.com",
            "batch": 2023
        }
    ]
}
```

## Notes
1. Registration only requires essential fields (name, email, password, batch)
2. Additional profile information can be updated after registration through the profile update endpoint
3. All timestamps are in ISO 8601 format
4. Files and documents can be uploaded after registration and Testing Guide

## Base URL
```
http://localhost:3000/api
```

## Default Admin Credentials
```json
{
    "email": "admin@admin.com",
    "password": "admin123",
    "role": "admin"
}
```

## Authentication APIs

### 1. Role Selection
```http
GET /roles

Response 200 OK:
{
    "roles": ["student", "clerk", "admin"]
}
```

### 2. Student Registration
```http
POST /register/student
Content-Type: application/json

Request:
{
    "email": "student@example.com",
    "name": "Student Name",
    "batch": 2023,
    "password": "password123"
}

Response 200 OK:
{
    "token": "jwt_token_here",
    "user": {
        "id": 1,
        "name": "Student Name",
        "email": "student@example.com",
        "batch": 2023,
        "role": "student"
    }
}
```

### 3. Clerk Registration (Admin Only)
```http
POST /register/clerk
Authorization: Bearer <admin_token>
Content-Type: application/json

Request:
{
    "email": "clerk@example.com",
    "name": "Clerk Name",
    "batch": 2023,
    "password": "password123"
}

Response 200 OK:
{
    "token": "jwt_token_here",
    "user": {
        "id": 2,
        "name": "Clerk Name",
        "email": "clerk@example.com",
        "batch": 2023,
        "role": "clerk"
    }
}
```

### 4. Login
```http
POST /login/:role
Content-Type: application/json

Request:
{
    "email": "user@example.com",
    "password": "password123"
}

Response 200 OK:
{
    "token": "jwt_token_here",
    "user": {
        "id": 1,
        "name": "User Name",
        "email": "user@example.com",
        "batch": 2023,
        "role": "student"
    }
}
```

## Student Profile Management

### 1. Get Profile
```http
GET /profile
Authorization: Bearer <token>

Response 200 OK:
{
    "id": 1,
    "name": "Student Name",
    "email": "student@example.com",
    "batch": 2023,
    "role": "student",
    "contact": null,
    "address": null,
    "profile_picture": null,
    "skills": [],
    "education": []
}
```

### 2. Update Profile
```http
PUT /profile
Authorization: Bearer <token>
Content-Type: application/json

Request:
{
    "contact": "1234567890",
    "address": "123 Main St",
    "profile_picture": "profile.jpg",
    "skills": ["JavaScript", "Node.js"],
    "education": [
        {
            "degree": "B.Tech",
            "year": 2023,
            "institution": "Example University",
            "score": 8.5
        }
    ]
}

Response 200 OK:
{
    "message": "Profile updated successfully",
    "user": {
        "id": 1,
        "name": "Student Name",
        "email": "student@example.com",
        "batch": 2023,
        "contact": "1234567890",
        "address": "123 Main St",
        "profile_picture": "profile.jpg",
        "skills": ["JavaScript", "Node.js"],
        "education": [{
            "degree": "B.Tech",
            "year": 2023,
            "institution": "Example University",
            "score": 8.5
        }]
    }
}
```

## Clerk Features

### 1. Bulk Upload Students
```http
POST /bulk-upload
Authorization: Bearer <clerk_token>
Content-Type: multipart/form-data

Request:
file: students.csv

CSV Format:
name,email,batch,password
John Doe,john@example.com,2023,password123
Jane Doe,jane@example.com,2023,password123

Response 200 OK:
{
    "message": "Successfully created 2 students",
    "errors": [] // If any errors occurred during import
}
```

### 2. Get All Students
```http
GET /students
Authorization: Bearer <clerk_token>

Response 200 OK:
{
    "students": [
        {
            "id": 1,
            "name": "Student Name",
            "email": "student@example.com",
            "batch": 2023,
            "role": "student"
        }
    ]
}
```

## Admin Features

### 1. Get All Clerks
```http
GET /clerks
Authorization: Bearer <admin_token>

Response 200 OK:
{
    "clerks": [
        {
            "id": 2,
            "name": "Clerk Name",
            "email": "clerk@example.com",
            "batch": 2023,
            "role": "clerk"
        }
    ]
}
```

## Testing Steps

1. First, ensure the admin account exists:
```http
POST /login/admin
{
    "email": "admin@admin.com",
    "password": "admin123"
}
```

2. Create a clerk account (using admin token):
```http
POST /register/clerk
Authorization: Bearer <admin_token>
{
    "email": "clerk@example.com",
    "name": "Test Clerk",
    "batch": 2023,
    "password": "clerk123"
}
```

3. Create a student account:
```http
POST /register/student
{
    "email": "student@example.com",
    "name": "Test Student",
    "batch": 2023,
    "password": "student123"
}
```

4. Test login for each role:
```http
POST /login/student
POST /login/clerk
POST /login/admin
```

5. Test profile updates:
```http
PUT /profile
Authorization: Bearer <student_token>
{
    "contact": "1234567890",
    "skills": ["JavaScript"]
}
```

6. Test bulk upload (as clerk):
```http
POST /bulk-upload
Authorization: Bearer <clerk_token>
[Form Data with CSV file]
```

7. Test admin features:
```http
GET /clerks
GET /students
Authorization: Bearer <admin_token>
```

## Error Responses

1. Authentication Error (401):
```json
{
    "message": "Authentication required"
}
```

2. Permission Error (403):
```json
{
    "message": "Access denied. Insufficient permissions."
}
```

3. Validation Error (400):
```json
{
    "message": "Validation error",
    "errors": [
        {
            "field": "email",
            "message": "Invalid email format"
        }
    ]
}
```

4. Not Found Error (404):
```json
{
    "message": "Resource not found"
}
```

## Logging

All actions are logged in:
- `logs/combined.log`: All level logs
- `logs/error.log`: Error level logs only

Log format:
```json
{
    "timestamp": "2025-08-25T10:00:00.000Z",
    "level": "info/error",
    "action": "action_name",
    "userId": "user_id",
    "details": {}
}
```
