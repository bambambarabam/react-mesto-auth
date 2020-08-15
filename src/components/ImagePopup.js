import React from 'react';

function ImagePopup({ isOpen, onClose, card }) {
  return (
    <section className={`popup popup_preview ${isOpen && "popup_opened"}`}>
      <figure className="popup__figure">
        <button
          className="popup__close popup__close_preview"
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        />
        <img className="popup__image"
          src={card.link}
          alt={`${card.name}`}
        />
        <figcaption className="popup__subtitle">{card.name}</figcaption>
      </figure>
    </section>
  )
}

export default ImagePopup;
