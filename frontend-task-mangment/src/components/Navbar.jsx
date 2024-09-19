import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/" style={{textDecoration: 'none', color: 'black', marginRight: '10px'}}>Home</Link>
      {user ? (
        <>
          <Link to="/dashboard" style={{textDecoration: 'none', color: 'black', marginRight: '10px'}}>Dashboard</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{textDecoration: 'none', color: 'black', marginRight: '10px'}}>Login</Link>
          <Link to="/register" style={{textDecoration: 'none', color: 'black'}}>Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
