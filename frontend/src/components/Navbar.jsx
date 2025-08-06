import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav>
      <h1>BudgetBase</h1>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
