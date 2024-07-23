import { useState } from 'react';
import ReactDOM from 'react-dom';
import './ChatBot.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [followUpQuestions, setFollowUpQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(true);

  const questions = [
    { text: '¿Cuál es el horario de atención?', answer: 'Nuestro horario de atención es de 8 AM a 6 PM de lunes a viernes.', followUp: [
        { text: '¿Atienden los fines de semana?', answer: 'Sí, atendemos los fines de semana de 9 AM a 3 PM.' },
        { text: '¿Cuál es el horario de atención entre semana?', answer: 'De lunes a viernes, de 8 AM a 6 PM.' },
        { text: '¿Tienen horario extendido?', answer: 'Sí, ofrecemos horario extendido los jueves hasta las 8 PM.' }
      ] 
    },
    { text: '¿Ofrecen servicios de emergencia?', answer: 'Sí, ofrecemos servicios de emergencia 24/7.', followUp: [
        { text: '¿Cuál es el número de contacto para emergencias?', answer: 'Puede contactarnos al 123-456-7890 en caso de emergencias.' },
        { text: '¿Hay algún costo adicional por emergencias?', answer: 'Sí, las consultas de emergencia tienen un costo adicional de $50.' },
        { text: '¿Tienen veterinarios especializados en emergencias?', answer: 'Sí, contamos con veterinarios especializados en emergencias.' }
      ] 
    },
    { text: '¿Qué tipos de mascotas atienden?', answer: 'Atendemos una variedad de mascotas, incluidos perros, gatos y animales exóticos.', followUp: [
        { text: '¿Atienden animales exóticos?', answer: 'Sí, atendemos una variedad de animales exóticos, incluidos reptiles y aves.' },
        { text: '¿Atienden solo perros y gatos?', answer: 'No, también atendemos otras mascotas pequeñas como conejos y hámsters.' },
        { text: '¿Atienden animales de granja?', answer: 'Sí, ofrecemos atención veterinaria para animales de granja como vacas y caballos.' }
      ] 
    },
    { text: '¿Cuáles son los servicios que ofrecen?', answer: 'Ofrecemos servicios de consulta, vacunación, cirugía, y más.', followUp: [
        { text: '¿Realizan cirugías?', answer: 'Sí, realizamos cirugías tanto de emergencia como programadas.' },
        { text: '¿Ofrecen servicios de vacunación?', answer: 'Sí, contamos con un completo programa de vacunación para todas las mascotas.' },
        { text: '¿Tienen servicio de peluquería?', answer: 'Sí, ofrecemos servicio de peluquería y cuidado estético para mascotas.' }
      ] 
    },
    { text: '¿Cómo puedo agendar una cita?', answer: 'Puede agendar una cita llamando al 123-456-7890 o visitando nuestro sitio web.', followUp: [
        { text: '¿Puedo agendar una cita en línea?', answer: 'Sí, puede agendar citas en línea a través de nuestro sitio web.' },
        { text: '¿Cuánto cuesta agendar una cita?', answer: 'Agendar una cita es gratuito, solo pagará por los servicios que reciba.' },
        { text: '¿Puedo reprogramar mi cita?', answer: 'Sí, puede reprogramar su cita llamándonos con al menos 24 horas de antelación.' }
      ] 
    }
  ];

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = (text = input) => {
    if (text.trim() !== '') {
      const newMessage = { text, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');
      setShowQuestions(false);

      const selectedQuestion = questions.find(q => q.text.toLowerCase() === text.toLowerCase());
      if (selectedQuestion) {
        const botResponse = { text: selectedQuestion.answer, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
        setFollowUpQuestions(selectedQuestion.followUp);
      } else {
        setTimeout(() => {
          const botResponse = { text: 'Lo siento, no tengo una respuesta para esa pregunta.', sender: 'bot' };
          setMessages((prevMessages) => [...prevMessages, botResponse]);
          setShowQuestions(true);
        }, 1000);
      }
    }
  };

  const handleFollowUp = (followUp) => {
    const newMessage = { text: followUp.text, sender: 'user' };
    setMessages([...messages, newMessage]);

    setTimeout(() => {
      const botResponse = { text: followUp.answer, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
      setFollowUpQuestions(followUp.followUp || []);
      if (!followUp.followUp) {
        setShowQuestions(true);
      }
    }, 1000);
  };

  return ReactDOM.createPortal(
    <div className="chatbot-container">
      <button className="chatbot-toggle" onClick={toggleChat}>
        <FontAwesomeIcon icon={faComments} />
      </button>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>ChatBot</h3>
            <button onClick={toggleChat}>&times;</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chatbot-message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {message.text}
              </div>
            ))}
            {showQuestions && followUpQuestions.length === 0 && (
              <div className="chatbot-questions">
                <p style={{color: 'black'}}>Seleccione una pregunta:</p>
                <ul>
                  {questions.map((question, index) => (
                    <li key={index} onClick={() => handleSendMessage(question.text)}>{question.text}</li>
                  ))}
                </ul>
              </div>
            )}
            {followUpQuestions.length > 0 && (
              <div className="chatbot-followup-questions">
                <p style={{color: 'black'}}>Seleccione una pregunta relacionada:</p>
                <ul>
                  {followUpQuestions.map((followUp, index) => (
                    <li key={index} onClick={() => handleFollowUp(followUp)}>{followUp.text}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={input}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={() => handleSendMessage()}>Enviar</button>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};