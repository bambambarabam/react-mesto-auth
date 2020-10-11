import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [currentUser]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      button="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}>
      <input
        type="url"
        className="popup__input"
        ref={avatarRef}
        placeholder="Ссылка на картинку"
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

export default EditAvatarPopup;
