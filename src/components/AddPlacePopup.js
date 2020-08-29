import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleName(e) {
    setName(e.target.value);
  }

  function handleLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link
    })
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      button="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      isLoading={props.isLoading}
      onSubmit={handleSubmit}>
      <input
        type="text"
        defaultValue=""
        placeholder="Название"
        onChange={handleName}
        className="popup__input"
        name="placename"
        minLength="1"
        maxLength="30"
        id="placename"
        required
      />
      <span
        className="popup__error"
        id="placename-error"
      />

      <input
        type="url"
        defaultValue=""
        placeholder="Ссылка на картинку"
        onChange={handleLink}
        className="popup__input"
        name="link"
        id="link"
        required
      />
      <span
        className="popup__error"
        id="link-error"
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
