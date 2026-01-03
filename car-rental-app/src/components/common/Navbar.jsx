import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar({ 
  currentPage = "home"
}) {
  const { user, logout } = useAuth();
  const isAgency = user?.role === 'AGENCY_ADMIN';
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigation links based on user type
  const getNavLinks = () => {
    if (isAgency) {
      return [
        { id: "dashboard", label: "Dashboard", href: "/dashboard" },
        { id: "my-cars", label: "My Fleet", href: "/dashboard/fleet" },
        { id: "bookings", label: "Bookings", href: "/dashboard/bookings" },
        { id: "analytics", label: "Analytics", href: "/dashboard/analytics" },
      ];
    } else {
      return [
        { id: "home", label: "Home", href: "/" },
        { id: "search", label: "Browse Cars", href: "/search" },
        { id: "how-it-works", label: "How It Works", href: "/how-it-works" },
        { id: "about", label: "About", href: "/about" },
      ];
    }
  };

  const navLinks = getNavLinks();

  const handleAvatarClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleAvatarKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setDropdownOpen(!dropdownOpen);
    }
  };

  const handleDropdownItemClick = () => {
    setDropdownOpen(false);
  };

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  // Generate avatar fallback with initials
  const getInitials = (name) => {
    if (!name) return "G";
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const [avatarError, setAvatarError] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between relative shadow-sm">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>
        <span className="font-bold text-lg text-gray-800">Phuket Rentals</span>
      </Link>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.id}
            to={link.href}
            className={`${
              currentPage === link.id
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-600"
            } transition-colors`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* User Menu */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            {/* Logged in user */}
            <div className="relative" ref={dropdownRef}>
              {avatarError || !user.avatar ? (
                <div
                  className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold cursor-pointer border-2 border-gray-200 hover:border-blue-400 transition-colors"
                  onClick={handleAvatarClick}
                  onKeyDown={handleAvatarKeyDown}
                  role="button"
                  aria-label="User menu"
                  aria-expanded={dropdownOpen}
                  tabIndex={0}
                >
                  {getInitials(user.name)}
                </div>
              ) : (
                <img
                  src={user.avatar}
                  alt={`${user.name}'s avatar`}
                  className="h-9 w-9 rounded-full border-2 border-gray-200 cursor-pointer object-cover hover:border-blue-400 transition-colors"
                  onClick={handleAvatarClick}
                  onKeyDown={handleAvatarKeyDown}
                  onError={() => setAvatarError(true)}
                  role="button"
                  aria-label="User menu"
                  aria-expanded={dropdownOpen}
                  tabIndex={0}
                />
              )}
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="font-semibold text-gray-800">{user.name || "User"}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{user.email || "email@example.com"}</div>
                    {isAgency && (
                      <div className="mt-1 inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                        Agency Admin
                      </div>
                    )}
                  </div>
                  
                  <div className="py-1">
                    <Link 
                      to={isAgency ? "/dashboard/profile" : "/profile"} 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors" 
                      onClick={handleDropdownItemClick}
                    >
                      My Profile
                    </Link>
                    {!isAgency && (
                      <Link 
                        to="/my-bookings" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors" 
                        onClick={handleDropdownItemClick}
                      >
                        My Bookings
                      </Link>
                    )}
                    <Link 
                      to="/settings" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors" 
                      onClick={handleDropdownItemClick}
                    >
                      Settings
                    </Link>
                  </div>
                  
                  <div className="border-t border-gray-100">
                    <button 
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors text-red-600 font-medium" 
                      onClick={() => {
                        handleDropdownItemClick();
                        logout();
                      }}
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Guest user - show login/register buttons */}
            <Link 
              to="/login" 
              className="hidden md:block text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Log In
            </Link>
            <Link 
              to="/register" 
              className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Sign Up
            </Link>
          </>
        )}
        
        {/* Hamburger for mobile */}
        <button
          className="md:hidden ml-2 p-1 hover:bg-gray-100 rounded transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-gray-200 md:hidden z-40 shadow-md">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.href}
              className={`block px-4 py-3 border-b border-gray-100 ${
                currentPage === link.id
                  ? "text-blue-600 font-semibold bg-blue-50"
                  : "text-gray-700 hover:bg-gray-50"
              } transition-colors`}
              onClick={handleNavClick}
            >
              {link.label}
            </Link>
          ))}
          
          {user ? (
            <button
              className="block w-full text-left px-4 py-3 text-red-600 font-medium hover:bg-gray-50 transition-colors"
              onClick={() => {
                handleNavClick();
                logout();
              }}
            >
              Log Out
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-4 py-3 border-b border-gray-100 text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={handleNavClick}
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="block px-4 py-3 text-blue-600 font-semibold hover:bg-gray-50 transition-colors"
                onClick={handleNavClick}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}