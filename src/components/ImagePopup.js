import React from 'react';

function ImagePopup(props) {
    return (
        <section className={`popup popup_preview ${props.isOpen && "popup_opened"}`}>
            <figure className="popup__figure">
                <button className="popup__close popup__close_preview" aria-label="Закрыть" type="button" onClick={props.onClose}></button>
                <img className="popup__image" src={props.card.link} alt={`${props.card.name}`} />
                <figcaption className="popup__subtitle">{props.card.name}</figcaption>
            </figure>
        </section>
    )
}

export default ImagePopup;