import React from 'react';

function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_${props.name} ${props.isOpen && "popup_opened"}`}>
      <form
        className={`popup__form popup__form_${props.name}`}
        name={props.name}
        onSubmit={props.onSubmit}
        noValidate>
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        />
        <h2
          className="popup__name">{props.title}
        </h2>
        {props.children}
        <button
          className={`popup__button popup__button_${props.name}`}
          type="submit">{props.isLoading ? 'Сохранение 🕒' : props.button}
        </button>
      </form>
    </section>
  );
}

export default PopupWithForm;
