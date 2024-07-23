import './Navbar.css';
import { faHome, faUser, faDog, faSignOutAlt, faCat, faFileArchive, faSignOut, faCommentAlt, faUpload, faHorse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChatBot } from '../ChatBot/ChatBot'

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/');
  };

  return (
    <nav className="navbar">
      <FontAwesomeIcon icon={faDog} />
      <div className="navbar-title">Find Your Pet</div>
      <ul className="navbar-links">
        <li>
          <a href="/Home">
            <FontAwesomeIcon icon={faHome} />
            <span>Inicio</span>
          </a>
        </li>
        <li>
          <a href="/Vet">
            <FontAwesomeIcon icon={faUser} />
            <span>Veterinarios</span>
          </a>
        </li>
        <li>
          <a href="/PetAdmin">
            <FontAwesomeIcon icon={faDog} />
            <span>Mascotas</span>
          </a>
        </li>
        <li>
          <a href="/Category">
            <FontAwesomeIcon icon={faCat} />
            <span>Categoría</span>
          </a>
        </li>
        <li>
          <a href="/Veterinary">
            <FontAwesomeIcon icon={faHorse} />
            <span>Veterinary</span>
          </a>
        </li>
        <li>
          <a onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOut} />
            <span>Salir</span>
          </a>
        </li>
      </ul>
      <ChatBot />
    </nav>
  );
};
