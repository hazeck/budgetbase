import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h1>404 - Page Not Found</h1>
      <p>Looks like the page you're looking for doesn’t exist.</p>
      <Link to="/">
        <button style={btnStyle}>Go Home</button>
      </Link>
    </div>
  );
};

const btnStyle = {
  padding: '0.7rem 1.5rem',
  fontSize: '1rem',
  borderRadius: '5px',
  backgroundColor: '#b03060',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};

export default NotFound;
