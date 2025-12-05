import React from "react";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-inner">
        {/* Info section */}
        <div className="contact-info">
          <h2 className="contact-title">Contáctanos</h2>

          <div className="contact-card">
            <h3 className="contact-subtitle">
              <i className="fas fa-phone"></i> Teléfono
            </h3>
            <p className="contact-text">+1 (239) 265-7294</p>
          </div>

          <div className="contact-card">
            <h3 className="contact-subtitle">
              <i className="fas fa-envelope"></i> Correo electrónico
            </h3>
            <p className="contact-text">luxurytravelpoint@gmail.com</p>
          </div>

          <div className="contact-card">
            <h3 className="contact-subtitle">
              <i className="fas fa-map-marker-alt"></i> Dirección para retiro
            </h3>
            <p className="contact-text">
              12450 SW 190 St, Miami, Florida 33177, USA
            </p>
          </div>

          <div className="contact-card">
            <h3 className="contact-subtitle">
              <i className="fas fa-clock"></i> Horarios disponibles
            </h3>
            <p className="contact-text">Lunes a Viernes: 9:00 AM – 5:00 PM</p>
            <p className="contact-text">Sábado: 10:00 AM – 2:00 PM</p>
          </div>
        </div>

        {/* Map section */}
        <div className="contact-map">
          <iframe
            title="Ubicación ProPlants"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.6633943884453!2d-80.39768222464184!3d25.595473413379337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9c4d58b3a6b3b%3A0x6a16c59a441d86a3!2s12450%20SW%20190th%20St%2C%20Miami%2C%20FL%2033177%2C%20USA!5e0!3m2!1sen!2sus!4v1718653400000"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
