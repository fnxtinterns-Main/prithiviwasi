import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MAIN_PAGE_URL } from '../data/freedomFighters';

/**
 * EnterButton component
 * A genuine, fully functional, accessible React navigation button.
 * Resolves the previous inert/image-like behavior with rich micro-interactions.
 */
export default function EnterButton({
  to = MAIN_PAGE_URL,
  onClick,
  className = '',
  label = 'ENTER'
}) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    // If a custom callback is provided, invoke it
    if (onClick) {
      onClick(e);
    }
    // If external URL (http/https), allow default anchor navigation
    if (to && (to.startsWith('http://') || to.startsWith('https://'))) {
      window.location.href = to;
    }
  };

  // If internal route, use React Router Link
  const isExternal = to && (to.startsWith('http://') || to.startsWith('https://'));

  if (isExternal) {
    return (
      <a
        href={to}
        onClick={handleClick}
        className={`enter-access-btn ${className}`}
        aria-label="Enter Prithviwasi website"
      >
        <span className="enter-btn-text">{label}</span>
        <span className="btn-arrow-icon" aria-hidden="true">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </a>
    );
  }

  return (
    <Link
      to={to}
      onClick={handleClick}
      className={`enter-access-btn ${className}`}
      aria-label="Enter Prithviwasi website"
    >
      <span className="enter-btn-text">{label}</span>
      <span className="btn-arrow-icon" aria-hidden="true">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </Link>
  );
}
