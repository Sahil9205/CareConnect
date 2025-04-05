import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            CareConnect
          </Link>
          <div className="hidden md:flex space-x-6">
            {token ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                  Dashboard
                </Link>
                <Link to="/health-records" className="text-gray-700 hover:text-blue-600">
                  Health Records
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-blue-600">
                  Profile
                </Link>
                <button onClick={handleLogout} className="text-gray-700 hover:text-blue-600">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link to="/register" className="text-gray-700 hover:text-blue-600">
                  Register
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-blue-600">
                  About
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-blue-600">
                  Contact
                </Link>
              </>
            )}
          </div>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            {token ? (
              <>
                <Link to="/dashboard" className="block text-gray-700 hover:text-blue-600">
                  Dashboard
                </Link>
                <Link to="/health-records" className="block text-gray-700 hover:text-blue-600">
                  Health Records
                </Link>
                <Link to="/profile" className="block text-gray-700 hover:text-blue-600">
                  Profile
                </Link>
                <button onClick={handleLogout} className="block text-gray-700 hover:text-blue-600">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link to="/register" className="block text-gray-700 hover:text-blue-600">
                  Register
                </Link>
                <Link to="/about" className="block text-gray-700 hover:text-blue-600">
                  About
                </Link>
                <Link to="/contact" className="block text-gray-700 hover:text-blue-600">
                  Contact
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
