import React from 'react';
import './Home.css';
import { Navbar } from '../Navbar/Navbar';
import perro from '../../assets/Perro.jpg';
import veterinario from '../../assets/Veterinario.jpg';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export const Home = () => {
  const [alertList, setAlertList] = React.useState([
    { id: 1, position: [51.505, -0.09], message: 'Alerta: Mascota perdida en esta área' },
    { id: 2, position: [51.515, -0.1], message: 'Alerta: Rescate de emergencia necesario' },
  ]);

  const handleReport = (newAlert) => {
    setAlertList([...alertList, newAlert]);
  };

  const AlertReporter = ({ onReport }) => {
    useMapEvents({
      click(e) {
        const message = prompt("Ingresa la descripción de la alerta:");
        if (message) {
          onReport({ id: alertList.length + 1, position: [e.latlng.lat, e.latlng.lng], message });
        }
      },
    });
    return null;
  };

  return (
    <>
      <Navbar />
      <div className="home-container fade-in">
        <section className="home-title-section">
          <div className="home-title">
            <i className="paw-icon fas fa-paw"></i>
            Bienvenidos a FindYourPet
            <i className="paw-icon fas fa-paw"></i>
            <div className="home-line"></div>
          </div>
        </section>

        <section className="home-content-section">
          <div className="home-content">
            <div className="home-text">
              <h1>De todo para tus mascotas o futuras mascotas ;)</h1>
              <p>Ten acceso a diferentes cosas útiles para los peludos</p>
            </div>
            <img src={perro} alt="Mascotas felices" className="home-image" />
          </div>
        </section>

        <section className="features-section section-highlight">
          <h2 className="section-title">Características</h2>
          <div className="features-container">
            <div className="feature-item">
              <i className="fas fa-stethoscope"></i>
              <h2>Atención Veterinaria</h2>
              <p>Expertos en la salud de tus mascotas.</p>
            </div>
            <div className="feature-item">
              <i className="fas fa-paw"></i>
              <h2>Adopciones</h2>
              <p>Encuentra a tu nuevo mejor amigo.</p>
            </div>
            <div className="feature-item">
              <i className="fas fa-bone"></i>
              <h2>Consejos/Preguntas</h2>
              <p>Todo lo que necesitas saber para tus mascotas.</p>
            </div>
          </div>
        </section>

        <section className="gallery-section">
          <h2 className="gallery-title">Galería de Mascotas</h2>
          <div className="home-line"></div>
          <div className="gallery-container">
            <img src={veterinario} alt="Galería 1" />
            <img src={perro} alt="Galería 2" />
            <img src={veterinario} alt="Galería 3" />
            <img src={perro} alt="Galería 4" />
          </div>
        </section>

        <section className="map-section section-highlight">
          <h2 className="section-title">Mapa de reportes</h2>
          <MapContainer className="map-frame" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {alertList.map(alert => (
              <Marker key={alert.id} position={alert.position}>
                <Popup>{alert.message}</Popup>
              </Marker>
            ))}
            <AlertReporter onReport={handleReport} />
          </MapContainer>
        </section>

        <section className="alert-table-section">
          <h2 className="section-title">Tabla de Alertas</h2>
          <table className="alert-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Descripción</th>
                <th>Latitud</th>
                <th>Longitud</th>
              </tr>
            </thead>
            <tbody>
              {alertList.map(alert => (
                <tr key={alert.id}>
                  <td>{alert.id}</td>
                  <td>{alert.message}</td>
                  <td>{alert.position[0]}</td>
                  <td>{alert.position[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};
