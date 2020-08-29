import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({onUpdateUser, isOpen, onClose, isLoading}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleName(e) {
    setName(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      button="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}>

      <input
        type="text"
        placeholder="Ваше имя"
        onChange={handleName}
        value={name}
        className="popup__input"
        name="name"
        minLength="2"
        maxLength="40"
        id="name"
        required
      />
      <span
        className="popup__error"
        id="name-error"
      />

      <input
        type="text"
        placeholder="Ваше занятие"
        value={description}
        onChange={handleDescription}
        className="popup__input"
        name="job"
        required
        minLength="2"
        maxLength="200"
        id="job"
      />
      <span
        className="popup__error"
        id="job-error"
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
