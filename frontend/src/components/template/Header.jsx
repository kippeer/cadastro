import './Header.css'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const Header = (props) => {
  const location = useLocation();

  const getIcon = () => {
    switch(location.pathname) {
      case '/':
        return faHome;
      case '/users':
        return faUsers;
      default:
        return faHome;
    }
  }

  return (
    <header className="header">
      <div className="logo">
        <FontAwesomeIcon icon={getIcon()} size="2x" />
                       
        <div>
          <h1>{props.title}</h1>
          <p>{props.subtitle}</p>
          <p><strong>{props.alerta}</strong></p>
        </div>
      </div>
    </header>
  );
};

export default Header;