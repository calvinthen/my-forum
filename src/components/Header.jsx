import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/my-forum.jpg';

const Header = () => {
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
          <Link to="/profile">Profile</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;