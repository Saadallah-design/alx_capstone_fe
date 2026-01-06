import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Button Component
 * Supports variants, sizes, loading state, and icons.
 */
export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  isLoading = false,
  icon = null,
  className = '',
  ...props
}) {
  // Base styles
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

  // Variants
  const variants = {
    primary: "bg-gray-900 text-white shadow-lg shadow-gray-200 hover:bg-black hover:scale-[1.02] active:scale-95 focus:ring-gray-900",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
    outline: "bg-transparent border-2 border-gray-200 text-gray-900 hover:border-gray-900 focus:ring-gray-900",
    danger: "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 hover:text-red-700 focus:ring-red-500",
    ghost: "bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50",
    white: "bg-white text-gray-900 shadow-xl shadow-gray-200/50 hover:bg-gray-50 focus:ring-white"
  };

  // Sizes
  const sizes = {
    xs: "px-3 py-1.5 text-[10px] tracking-widest uppercase",
    sm: "px-4 py-2 text-xs tracking-wide",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
    xl: "px-10 py-5 text-lg"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        <>
          {icon && <i className={`${icon} ${children ? 'mr-2' : ''} flex items-center`}></i>}
          {children}
        </>
      )}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger', 'ghost', 'white']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  icon: PropTypes.string,
  className: PropTypes.string,
};
