# Training Center Management System

A comprehensive grade management system designed for training centers offering two-year courses across multiple streams, with complete module management, assessment tracking, and automated report generation.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Project Overview

- **Title**: Training Center Management System
- **Authors/Team**: [To be added]
- **Institution/Course**: ISTA NTIC SYBA
- **Version**: 1.0.0
- **Date**: April 1, 2025

### Motivation

This system addresses the need for efficient grade management in training centers that offer structured two-year programs. It provides comprehensive tracking of student progress across multiple streams, modules, and assessment types while generating detailed reports for administrative and academic purposes.

## Features

- **Multi-Stream Support**: Manage multiple training streams simultaneously
- **Two-Year Course Structure**: Organized modules for first and second year
- **Comprehensive Assessment**: Track tests, practical exams, and theoretical exams
- **Automated Reporting**: Generate detailed reports for both academic years
- **User Management**: Role-based access for administrators, instructors, and students
- **Real-time Analytics**: Performance tracking and statistical insights
- **Export Capabilities**: Export reports in various formats (PDF, Excel)

## Tech Stack

### Backend
- **Framework**: Laravel 10.x
- **Database**: MySQL/PostgreSQL
- **Authentication**: Laravel Sanctum
- **API**: RESTful API architecture

### Frontend
- **Framework**: React 18.x
- **Styling**: Tailwind CSS
- **State Management**: React Context API / Redux (if applicable)
- **HTTP Client**: Axios

### Development Tools
- **Version Control**: Git & GitHub
- **API Testing**: Postman
- **Package Manager**: npm/yarn (Frontend), Composer (Backend)
- **Build Tools**: Vite (Frontend), Laravel Mix (Backend)

## Prerequisites

Before running this project, ensure you have the following installed:

- **PHP** >= 8.1
- **Composer** >= 2.0
- **Node.js** >= 16.x
- **npm** or **yarn**
- **MySQL** >= 8.0 or **PostgreSQL** >= 12
- **Git**

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/training-center-management.git
cd training-center-management
```

### 2. Backend Setup (Laravel)

```bash
# Navigate to backend directory
cd backend

# Install PHP dependencies
composer install

# Create environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env file
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=training_center_db
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Run database migrations
php artisan migrate

# Seed the database (optional)
php artisan db:seed

# Create storage link
php artisan storage:link
```

### 3. Frontend Setup (React)

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
# or
yarn install

# Create environment file
cp .env.example .env

# Configure API base URL
REACT_APP_API_URL=http://localhost:8000/api
```

### 4. Environment Configuration

#### Backend (.env)
```env
APP_NAME="Training Center Management"
APP_ENV=local
APP_KEY=base64:your-generated-key
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=training_center_db
DB_USERNAME=your_username
DB_PASSWORD=your_password

SANCTUM_STATEFUL_DOMAINS=localhost:3000
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_APP_NAME="Training Center Management"
```

## Usage

### Running the Application

#### Start Backend Server
```bash
# Navigate to backend directory
cd backend

# Start Laravel development server
php artisan serve
# Server will run on http://localhost:8000
```

#### Start Frontend Development Server
```bash
# Navigate to frontend directory
cd frontend

# Start React development server
npm start
# or
yarn start
# Server will run on http://localhost:3000
```

### Default Login Credentials

After seeding the database, you can use these default credentials:

- **Admin**: admin@example.com / password
- **Instructor**: instructor@example.com / password
- **Student**: student@example.com / password

### Key Features Usage

1. **Stream Management**: Create and manage different training streams
2. **Module Organization**: Add modules for first and second year
3. **Assessment Creation**: Set up tests, practical and theoretical exams
4. **Grade Entry**: Record student performance across all assessments
5. **Report Generation**: Generate comprehensive reports by year, stream, or student
6. **User Management**: Manage user roles and permissions

### API Endpoints

#### Authentication
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `POST /api/register` - User registration

#### Streams
- `GET /api/streams` - Get all streams
- `POST /api/streams` - Create new stream
- `PUT /api/streams/{id}` - Update stream
- `DELETE /api/streams/{id}` - Delete stream

#### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create new student
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student

#### Grades
- `GET /api/grades` - Get all grades
- `POST /api/grades` - Create new grade
- `PUT /api/grades/{id}` - Update grade

#### Reports
- `GET /api/reports/student/{id}` - Get student report
- `GET /api/reports/stream/{id}` - Get stream report
- `GET /api/reports/year/{year}` - Get yearly report

## API Documentation

For detailed API documentation, import the Postman collection:

```bash
# Collection file location
/docs/postman/Training-Center-API.postman_collection.json
```

Or access the auto-generated documentation at:
```
http://localhost:8000/api/documentation
```

## Project Structure

```
training-center-management/
├── backend/                    # Laravel backend
│   ├── app/
│   │   ├── Http/Controllers/
│   │   ├── Models/
│   │   └── Services/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   └── tests/
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── public/
│   └── package.json
├── docs/                       # Documentation
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow PSR-12 coding standards for PHP
- Use ESLint and Prettier for JavaScript/React code
- Write descriptive commit messages
- Include tests for new features
- Update documentation for API changes

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.

## Acknowledgements

- **Institution**: ISTA NTIC SYBA for project support and guidance
- **Laravel Community**: For the excellent framework and documentation
- **React Team**: For the powerful frontend library
- **Tailwind CSS**: For the utility-first CSS framework
- **Open Source Community**: For the various packages and tools used

---

**Note**: This project is developed as part of the academic curriculum at ISTA NTIC SYBA. For any questions or support, please contact the development team.

---

*Last updated: April 1, 2025*
