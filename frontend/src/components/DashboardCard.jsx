import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import ExpenseItem from '../components/ExpenseItem';

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const res = await fetch('/api/expenses', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setExpenses(data);
    };

    fetchExpenses();
  }, [token]);

  return (
    <div>
      <h2>Your Dashboard</h2>
      {expenses.map(exp => <ExpenseItem key={exp.id} expense={exp} />)}
    </div>
  );
};

export default Dashboard;
