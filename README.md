# Tutor App - <Your Project Name>

![Logo](logo.png) <!-- Optional: Include a logo if you have one -->

## Table of Contents

1. [Project Description](#project-description)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup & Installation](#setup--installation)
5. [Running the App](#running-the-app)
6. [Project Structure](#project-structure)
7. [Usage](#usage)
8. [Screenshots](#screenshots)
9. [Future Improvements](#future-improvements)
10. [Contributing](#contributing)

---

## Project Description

The **Tutor App** is a web-based platform designed to help parents find qualified tutors for their children. It offers functionalities like lesson booking, child account management, progress tracking, and online tutoring through integrated platforms like Zoom or Google Meet.

The app supports multiple roles, including **parents** and **tutors**, with features tailored to each:

- **Parents**: Create/manage child accounts, book lessons, monitor progress.
- **Tutors**: Manage schedules, student profiles, and provide feedback after lessons.

---

## Features

- **Parent Features**:
  - User registration and login.
  - Add, edit, and manage child accounts.
  - Book tutoring lessons.
  - Track child’s progress.

- **Tutor Features**:
  - Manage tutoring schedules.
  - View and manage student profiles.
  - Provide feedback for lessons.

- **Common Features**:
  - Password reset and authentication.
  - User-friendly dashboard for both parents and tutors.
  - Secure authentication system.
  - Integration with Zoom or Google Meet for online tutoring.

---

## Technologies Used

The Tutor App is built using the following technologies:

- **Backend**: Django (Python)
- **Frontend**: Bootstrap 4.5 for responsive design
- **Database**: SQLite (default) or any preferred database (PostgreSQL/MySQL)
- **Authentication**: Django's built-in authentication
- **Deployment**: Gunicorn/Whitenoise for static file management
- **Others**:
  - FontAwesome for icons.
  - jQuery for enhanced form interactions.

---

## Setup & Installation

### Prerequisites

- **Python 3.x** installed on your system.
- **Virtual Environment** (optional but recommended).
- **pip** for installing Python packages.
* * *
### Installation Steps

1. **Clone the Repository**:
 ```
	git clone https://github.com/swervolee/GleenKay.git
	cd GleenKay
```

2. **Create a virtual Environment**
```
	python3 -m venv venv
```
3. **Activate the virtual Environment**
```
	source venv/bin/activate
```
4.**Install dependencies**
```
	pip install -r requirements.txt
```
5.**Setup the Database**
```
	python3 manage.py migrate
```

* * *

### Running the app
- To start eh develpment server, run the following command
```
	python3 manage.py runserver
```
- Visist http://127.0.0.0.1:8000 in your browser to access the application
***
### Usage
Once the app is running
- **parents**:
	- Register and account
	- Add your childrens profile
	- Book lessons with available tutors
- **Tutors**
	- Signup as a tutor
	- Manage you schedule and provide feedback after each lesson
***
### Screenshots
* Parent dashboard
* Tutor profile
***
### Future improvements
* Integration with payment gateways to allow parents to pay for lessons
* In-app messaging between parents and tutors
* A recommendation engine to suggest tuttors based on a child's progress
* Mobile app version using django rest framework and Flutter
***
### Contributing
If anyone wish to contribute to the project, please follow these steps
1. Fork the repository
2. Create a feature branch: ``` git checkout -b feature/YourFeature ```
3. Commit your changes: ``` git commit -m 'Add your Feature ```
4. Push to the branch: ```g it push origin fearture/yourFeature ```
5. Open a pull request

### License
This project is licensed under the MIT LICENSE-see the LICENSE file for details
