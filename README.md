# HRMS - Human Resource Management System

## Project Overview

HRMS is a comprehensive Human Resource Management System designed to streamline HR operations and employee management. The application provides features for employee information management, attendance tracking, and HR administration through an intuitive web interface.

### Key Features
- Employee management and profiles
- Attendance tracking and history
- Employee statistics and insights
- Dashboard for quick overview
- Responsive web interface

---

## Tech Stack

### Backend
- **Framework**: Django 6.0.1
- **API**: Django REST Framework 3.16.1
- **Database**: PostgreSQL
- **CORS Support**: Django CORS Headers 4.9.0
- **Language**: Python 3.13

### Frontend
- **Framework**: React (with Vite bundler)
- **Build Tool**: Vite
- **Language**: JavaScript (ES6+)
- **Styling**: CSS3

### Development Tools
- Virtual Environment: Python venv
- Package Manager (Backend): pip
- Package Manager (Frontend): npm

---

## Steps to Run the Project Locally

### Prerequisites
- Python 3.13 or higher
- Node.js and npm
- Git (optional, for cloning the repository)

### Backend Setup

#### Step 1: Create a Python Virtual Environment

**What is a Virtual Environment?**
A virtual environment is an isolated Python workspace where you can install project-specific dependencies without affecting your system Python installation.

1. **Navigate to the project root directory** (where the `backend` and `frontend` folders are)
   ```bash
   cd /path/to/HRMS
   ```
   Replace `/path/to/HRMS` with your actual project path.

2. **Create a virtual environment named `env`**
   ```bash
   python3 -m venv env
   ```
   This will create a new folder called `env` containing the isolated Python environment.

3. **Verify the virtual environment was created**
   ```bash
   ls -la env
   ```
   You should see folders like `bin`, `lib`, `include`, and `pyvenv.cfg`.

#### Step 2: Activate the Virtual Environment

**Why activate?** 
Activation ensures that Python commands use the isolated environment instead of your system Python.

**On Linux/Mac:**
```bash
source env/bin/activate
```

**On Windows (Command Prompt):**
```bash
env\Scripts\activate.bat
```

**On Windows (PowerShell):**
```bash
env\Scripts\Activate.ps1
```

You'll know it's activated when you see `(env)` at the beginning of your terminal prompt.

#### Step 3: Upgrade pip (Recommended)

It's a good idea to upgrade pip to the latest version:
```bash
pip install --upgrade pip
```

#### Step 4: Install Project Dependencies

1. **Navigate to the backend directory**
   ```bash
   cd backend
   ```

2. **Install all required Python packages from `requirements.txt`**
   ```bash
   pip install -r requirements.txt
   ```
   This will download and install all necessary packages (Django, Django REST Framework, etc.). This may take a few minutes.

#### Step 5: Configure the Database

1. **Apply database migrations** (creates database tables)
   ```bash
   python manage.py migrate
   ```

2. **Create a superuser account** (optional, for accessing Django admin panel)
   ```bash
   python manage.py createsuperuser
   ```
   Follow the prompts to create a username, email, and password.

#### Step 6: Run the Backend Development Server

```bash
python manage.py runserver
```

You should see output like:
```
Starting development server at http://127.0.0.1:8000/
```

The backend API will be available at `http://localhost:8000`

#### Step 7: Deactivate the Virtual Environment (When Done)

When you're finished working, deactivate the virtual environment:
```bash
deactivate
```
The `(env)` prefix will disappear from your terminal prompt.

### Frontend Setup

**Important:** Keep your backend server running (from Backend Setup Step 6) and open a new terminal for the frontend.

1. **Open a new terminal** (don't close the backend terminal)

2. **Navigate to the frontend directory**
   ```bash
   cd /path/to/HRMS/frontend
   ```
   Replace `/path/to/HRMS` with your actual project path.

3. **Check if Node.js and npm are installed**
   ```bash
   node --version
   npm --version
   ```
   If you don't have Node.js installed, download it from [https://nodejs.org/](https://nodejs.org/)

4. **Install frontend dependencies**
   ```bash
   npm install
   ```
   This will create a `node_modules` folder and install all required packages. This may take a few minutes.

5. **Run the development server**
   ```bash
   npm run dev
   ```
   You should see output like:
   ```
   Local:   http://localhost:5173/
   ```

6. **Open the frontend in your browser**
   Click on the URL (usually `http://localhost:5173/`) or paste it into your browser.

### Access the Application

Once both servers are running, you can access:
- **Frontend Application**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **Django Admin Panel**: http://localhost:8000/admin

---

## Assumptions and Limitations

### Assumptions
- Users will run both backend and frontend servers simultaneously for full functionality
- The database is initialized with Django migrations from the `emp` and `api` apps
- CORS is configured to allow requests between frontend and backend
- Python 3.13 is compatible with the current environment setup
- SQLite3 is sufficient for development and testing purposes

### Limitations
- **Database**: SQLite3 is used, which is suitable for development but not recommended for production environments with concurrent users
- **Scalability**: Current architecture is optimized for small to medium-scale deployments
- **Static Files**: Frontend is served from a development server; production deployment will require additional configuration
- **Authentication**: Basic authentication mechanisms may need enhancement for enterprise use
- **Data Persistence**: SQLite database file (`db.sqlite3`) is stored locally; requires backup strategies for data safety

### Known Considerations
- CORS headers must be properly configured if frontend and backend are on different domains
- Frontend and backend must run on the same machine or be properly configured for cross-origin requests
- No built-in role-based access control (RBAC) is visible in the current structure; implement based on requirements

---

## Project Structure

```
HRMS/
├── backend/                 # Django application
│   ├── hrms/               # Main project configuration
│   ├── api/                # REST API endpoints
│   ├── emp/                # Employee management app
│   ├── manage.py
│   └── db.sqlite3          # SQLite database
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   └── assets/         # Static assets
│   ├── package.json
│   └── vite.config.js      # Vite configuration
├── env/                    # Python virtual environment
└── README.md              # This file
```

---

## Troubleshooting

- **Port already in use**: Change the port using `python manage.py runserver 8001` or `npm run dev -- --port 5174`
- **Module not found errors**: Ensure virtual environment is activated and dependencies are installed
- **CORS errors**: Check Django CORS settings in `backend/hrms/settings.py`
- **Database errors**: Run migrations again with `python manage.py migrate`

---

## Future Enhancements

- Implement role-based access control (RBAC)
- Add advanced reporting and analytics
- Integrate email notifications
- Add file upload capabilities for documents
- Implement real-time notifications
- Deploy to production environment with PostgreSQL