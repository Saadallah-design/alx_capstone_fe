import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar({ 
  currentPage = "home"
}) {
  const { user, logout, isAuthenticated } = useAuth();
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
      const links = [
        { id: "home", label: "Home", href: "/" },
        { id: "search", label: "Browse Cars", href: "/search" },
      ];
      
      // Add My Bookings for authenticated customers
      if (isAuthenticated && !isAgency) {
        links.push({ id: "my-bookings", label: "My Bookings", href: "/my-bookings" });
      }
      
      links.push(
        { id: "how-it-works", label: "How It Works", href: "/how-it-works" },
        { id: "about", label: "About", href: "/about" }
      );
      
      return links;
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
        <div className="h-9 w-9 bg-gray-900 rounded-xl flex items-center justify-center shadow-lg shadow-gray-200">
          <i className="fi fi-br-shield-check text-white text-sm"></i>
        </div>
        <span className="font-black text-xl text-gray-900 tracking-tight">Phuket Rentals</span>
      </Link>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.id}
            to={link.href}
            className={`${
              currentPage === link.id
                ? "text-gray-900 font-bold border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-900"
            } transition-all duration-200 py-1 text-sm font-semibold`}
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
                  className="h-10 w-10 rounded-xl bg-gray-900 text-white flex items-center justify-center text-sm font-bold cursor-pointer border-2 border-gray-100 hover:border-gray-900 transition-all shadow-sm"
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
                      <>
                        <Link 
                          to="/my-bookings" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors" 
                          onClick={handleDropdownItemClick}
                        >
                          My Bookings
                        </Link>
                        {user.is_pending_agency ? (
                          <Link 
                            to="/pending-approval" 
                            className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-50 transition-colors font-bold border-t border-gray-100" 
                            onClick={handleDropdownItemClick}
                          >
                            Application Status
                          </Link>
                        ) : (
                          <Link 
                            to="/apply-agency" 
                            className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-50 transition-colors font-bold border-t border-gray-100" 
                            onClick={handleDropdownItemClick}
                          >
                            Become a Partner
                          </Link>
                        )}
                      </>
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
              className="hidden md:block text-gray-500 hover:text-gray-900 font-bold text-sm transition-colors"
            >
              Log In
            </Link>
            <Link 
              to="/register" 
              className="hidden md:block bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-gray-200"
            >
              Sign Up
            </Link>
          </>
        )}
        
        {/* Hamburger for mobile */}
        <button
          className="md:hidden ml-2 p-2 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <i className={`fi ${menuOpen ? 'fi-rr-cross-small' : 'fi-rr-menu-burger'} text-xl flex items-center text-gray-900`}></i>
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