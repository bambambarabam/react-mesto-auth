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
        <input type="text" value="" placeholder="Ваше имя" className="popup__input" name="name" minlength="2"
          maxlength="40" id="name" required />
        <span className="popup__error" id="name-error"></span>

        <input type="text" value="" placeholder="Ваше занятие" className="popup__input" name="job" required minlength="2"
          maxlength="200" id="job" />
        <span className="popup__error" id="job-error"></span>
      </PopupWithForm>

      <PopupWithForm
        title="Новое место"
        name="add"
        button="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}>
        <input type="text" value="" placeholder="Название" className="popup__input" name="placename" minlength="1"
          maxlength="30" id="placename" required />
        <span className="popup__error" id="placename-error"></span>

        <input type="url" value="" placeholder="Ссылка на картинку" className="popup__input" name="link" id="link"
          required />
        <span className="popup__error" id="link-error"></span>
      </PopupWithForm>

      <PopupWithForm
        title="Обновить аватар"
        name="avatar"
        button="Создать"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>
        <input type="url" className="popup__input" value="" placeholder="Ссылка на картинку" name="link" id="link"
          required />
        <span className="popup__error" id="link-error"></span>
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
