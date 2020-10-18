import React from 'react';

function InfoTooltip({ isOpen, onClose, icon, text }) {
  return (
    <section
      className={`popup ${isOpen && "popup_opened"}`}>
      <div
        className="popup__form">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}>
        </button>
        <img
          className="popup__tooltip-img"
          src={icon} alt="Статус."
        />
        <h2
          className="popup__tooltip-text">
          {text}
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
