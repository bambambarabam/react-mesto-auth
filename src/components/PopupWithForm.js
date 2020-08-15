import React from 'react';

function PopupWithForm({name, title, button, children, isOpen, onClose}) {
  return (
    <section className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
      <form className={`popup__form popup__form_${name}`} name={name} noValidate>
        <button className="popup__close" type="button" onClick={onClose} />
        <h2 className="popup__name">{title}</h2>
        {children}
        <button className={`popup__button popup__button_${name}`} type="submit">{button}</button>
      </form>
    </section>
  );
}

export default PopupWithForm;
