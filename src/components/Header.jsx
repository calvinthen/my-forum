import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/my-forum.jpg';

const Header = () => {
  const user = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login"; // redirect after logout
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">
          <Link to="/"><img src={logo} alt="My Forum Icon" className='logo-header'/></Link>
        </h1>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          
          {user && <Link to="/profile">Profile</Link>}

          {!user && <Link to="/register">Register</Link>}
          {!user && <Link to="/login">Login</Link>}
          {user && (
            <button className="logout-link" onClick={handleLogout}>
              Logout
            </button>
          )}
          
        </nav>
      </div>
    </header>
  );
};

export default Header;