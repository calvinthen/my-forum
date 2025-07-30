import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white shadow-md h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">🌙</Link>
        </h1>
        <nav className="md:flex gap-6">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/about" className="hover:text-blue-400">About</Link>
          <Link to="/contact" className="hover:text-blue-400">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
