// src/pages/Home.jsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="landing-page">
      <header className="landing-hero">
        <h1>BudgetBase</h1>
        <p>Track your spending. Control your future.</p>
        <Link to="/login" className="cta-button">Get Started</Link>
      </header>

      <section className="features">
        <div className="feature">
          <h2>💸 Categorize Expenses</h2>
          <p>Group your expenses into custom categories like Rent, Groceries, or Travel.</p>
        </div>
        <div className="feature">
          <h2>📊 Monthly Insights</h2>
          <p>Get a clear picture of your monthly spending and stay on track with your goals.</p>
        </div>
        <div className="feature">
          <h2>🔒 Secure & Private</h2>
          <p>All your data stays safe and visible only to you using secure login access.</p>
        </div>
      </section>

      <footer className="landing-footer">
        <p>Start budgeting smarter today.</p>
        <Link to="/register" className="cta-button">Create an Account</Link>
      </footer>
    </div>
  );
}
