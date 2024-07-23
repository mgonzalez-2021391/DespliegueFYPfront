import React, { useState } from 'react';
import './Pet.css';

const pets = [
  {
    id: 1,
    name: 'Max',
    age: '2 years',
    race: 'Golden Retriever',
    gender: 'Male',
    description: 'Friendly and tolerant',
    imgSrc: 'https://as01.epimg.net/diarioas/imagenes/2022/05/29/actualidad/1653826510_995351_1653826595_noticia_normal_recorte1.jpg',
  },
  {
    id: 2,
    name: 'Bella',
    age: '3 years',
    race: 'Siberian Husky',
    gender: 'Female',
    description: 'Outgoing and mischievous',
    imgSrc: 'https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg',
  }
];

const Pet = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const nextPet = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % pets.length);
    setFlipped(false);
  };

  const prevPet = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + pets.length) % pets.length);
    setFlipped(false);
  };

  const toggleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div>
      <h1 className="adopt-title">Adopta a una Mascota</h1>
      <div className="carousel-container">
        <button onClick={prevPet} className="prev-button">Previous</button>
        <div className={`flip-container ${flipped ? 'flipped' : ''}`}>
          <div className="flipper">
            <div className="front">
              <img src={pets[currentIndex].imgSrc} alt={pets[currentIndex].name} className="selected-image" />
              <button className="view-more-button" onClick={toggleFlip}>View More</button>
            </div>
            <div className="back">
              <button className="back-button" onClick={toggleFlip}>Back</button>
              <div className="selected-info">
                <h2>{pets[currentIndex].name}</h2>
                <p><strong>Age:</strong> {pets[currentIndex].age}</p>
                <p><strong>Race:</strong> {pets[currentIndex].race}</p>
                <p><strong>Gender:</strong> {pets[currentIndex].gender}</p>
                <p><strong>Description:</strong> {pets[currentIndex].description}</p>
                <button className="appointment-button">Make an Appointment</button>
              </div>
            </div>
          </div>
        </div>
        <div className="preview-container">
          {pets.map((pet, index) => (
            <div
              key={pet.id}
              className={`preview-item ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                setCurrentIndex(index);
                setFlipped(false);
              }}
            >
              <img src={pet.imgSrc} alt={pet.name} />
            </div>
          ))}
        </div>
        <button onClick={nextPet} className="next-button">Next</button>
      </div>
    </div>
  );
};

export default Pet;
