# BudgetBase

**A full-stack budget tracking app built with Flask and React.**  
Track expenses, categorize spending, and improve your financial habits with a simple and secure dashboard.

## Overview

**BudgetBase** helps users:
- Register and log in securely
- Create and manage spending categories
- Log expenses per category
- View monthly totals
- Protect and isolate user data using authentication

## Tech Stack

### Backend – Flask
- Flask
- Flask SQLAlchemy
- Flask JWT Extended
- Flask CORS
- Flask Bcrypt
- PostgreSQL (or SQLite for local development)
- Marshmallow (optional, for serialization)

### Frontend – React
- React (Vite)
- React Router
- Axios (or fetch)
- Context API for auth state
- LocalStorage for token persistence
- Tailwind CSS or plain CSS for styling

## Features

- JWT-based authentication
- Protected API routes using `@jwt_required`
- User-specific data filtering
- CRUD functionality for:
  - Categories
  - Expenses
- Responsive and dynamic frontend
- Conditional rendering based on login status
- Optional stretch goals: Chart visualizations, budget alerts, pagination

## Local Setup Instructions

Clone the repository and navigate into the project:

bash
git clone git@github.com:hazeck/budgetbase.git
cd budgetbase
In one terminal, set up and run the Flask backend:

bash
Copy
Edit
cd backend
python3 -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate
pip install -r requirements.txt
flask db upgrade                # Only if using Flask-Migrate
flask run
The Flask server should start at:
http://localhost:5000

In a second terminal, set up and run the React frontend:

bash
Copy
Edit
cd frontend
npm install
npm run dev
