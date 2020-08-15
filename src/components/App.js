import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState();

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(true);
    setIsImagePopupOpen(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        title="Редактировать профиль"
        name="profile"
        button="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}>
        <input
          type="text"
          defaultValue=""
          placeholder="Ваше имя"
          className="popup__input"
          name="name"
          minLength="2"
          maxLength="40" id="name"
          required
        />
        <span
          className="popup__error"
          id="name-error"
        />

        <input
          type="text"
          defaultValue=""
          placeholder="Ваше занятие"
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

      <PopupWithForm
        title="Новое место"
        name="add"
        button="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}>
        <input
          type="text"
          defaultValue=""
          placeholder="Название"
          className="popup__input"
          name="placename"
          minLength="1"
          maxLength="30"
          id="placename"
          required
        />
        <span
          className="popup__error"
          id="placename-error" /
        >

        <input
          type="url"
          defaultValue=""
          placeholder="Ссылка на картинку"
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

      <PopupWithForm
        title="Обновить аватар"
        name="avatar"
        button="Создать"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>
        <input
          type="url"
          className="popup__input"
          defaultValue=""
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

      <PopupWithForm
        title="Вы уверены?"
        name="confirm"
        button="Да"
        onClose={closeAllPopups}
      />

      <ImagePopup
        isOpen={selectedCard}
        card={isImagePopupOpen}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
