import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
Page Header Component
 */
export default function Header({ 
  title, 
  subtitle, 
  breadcrumbs = [] 
}) {
  return (
    <div className="mb-10">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
        <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <i className="fi fi-rr-angle-small-right"></i>
            {crumb.path ? (
               <Link to={crumb.path} className="hover:text-gray-900 transition-colors">{crumb.label}</Link>
            ) : (
                <span className="text-gray-900">{crumb.label}</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase">
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <div className="text-gray-400 text-sm mt-2">
          {subtitle}
        </div>
      )}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.node,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string,
    })
  ),
};
