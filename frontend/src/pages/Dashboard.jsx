import { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';

export default function Dashboard() {
  const { token } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ amount: '', description: '', category_id: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await fetch('http://localhost:5000/expenses/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      setError('Failed to fetch expenses');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/expenses/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      await fetchExpenses();
      setForm({ amount: '', description: '', category_id: '' });
    } catch {
      setError('Failed to add expense');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/expenses/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchExpenses();
    } catch {
      setError('Failed to delete expense');
    }
  };

  return (
    <div className="dashboard">
      <h2>Your Expenses</h2>

      <form onSubmit={handleAdd}>
        <input name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" required />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <input name="category_id" value={form.category_id} onChange={handleChange} placeholder="Category ID" required />
        <button type="submit">Add Expense</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {expenses.map(exp => (
          <li key={exp.id}>
            ${exp.amount} - {exp.description} (Category ID: {exp.category_id}) on {exp.date}
            <button onClick={() => handleDelete(exp.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
