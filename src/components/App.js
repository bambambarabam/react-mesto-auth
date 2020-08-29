import React from 'react';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import PopupWithConfirm from './PopupWithConfirm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState();
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: '' });
  const [cardDelete, setCardDelete] = React.useState([]);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()
    ])
      .then(([user, initialCards]) => {
        setCurrentUser(user);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    });
  }

  function handleCardDeleteSubmit() {
    api.deleteCard(cardDelete._id)
      .then(() => {
        const newCards = cards.filter((i) => i._id !== cardDelete._id);
        setCards(newCards);
        closeAllPopups();
      })
  }

  function handleUpdateUser(user) {
    setIsLoading(true);
    api.editUserInfo(user)
      .then((res) => {
        setCurrentUser(res);
      })
      .finally(() => {
        closeAllPopups();
        setIsLoading(false)
      })
  }

  function handleUpdateAvatar(user) {
    setIsLoading(true);
    api.editUserAvatar(user)
      .then((res) => {
        setCurrentUser(res);
      })
      .finally(() => {
        closeAllPopups();
        setIsLoading(false)
      })
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api.addNewCard(card)
      .then((res) => {
        setCards([...cards, res]);
      })
      .finally(() => {
        closeAllPopups();
        setIsLoading(false);
      })
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleConfirmPopupClick() {
    setIsConfirmPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(true);
    setIsImagePopupOpen(card);
  }

  function handleCardDelete(card) {
    setCardDelete(card)
    handleConfirmPopupClick();
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <ImagePopup
          isOpen={selectedCard}
          card={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <PopupWithConfirm
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDeleteSubmit}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
