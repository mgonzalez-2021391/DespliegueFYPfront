import '../Navbar/Navbar.css';
import { faHome, faUser, faDog, faSignOutAlt, faCat, faFileArchive, faSignOut, faCommentAlt, faUpload, faHorse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChatBot } from '../ChatBot/ChatBot'

export const NavbarC = () => {
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
          <a href="/HomeC">
            <FontAwesomeIcon icon={faHome} />
            <span>Inicio</span>
          </a>
        </li>
        <li>
          <a href="/PublicationAdmin">
            <FontAwesomeIcon icon={faUpload} />
            <span>Agregar publicación</span>
          </a>
        </li>
        <li>
          <a href="/Publications">
          <FontAwesomeIcon icon={faCommentAlt} />
          <span>Publicaciones</span>
          </a>
        </li>
        <li>
          <a href="/Report">
          <FontAwesomeIcon icon={faFileArchive} />
          <span>Reporte</span>
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
