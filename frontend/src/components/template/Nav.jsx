import './Nav.css'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUsers } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <FontAwesomeIcon icon={faHome} /> Início
            </Link>
            <Link to="/users">
                <FontAwesomeIcon icon={faUsers} /> Usuários
            </Link>
        </nav>
    </aside>
