import React from 'react';

import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Main from './Main';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import PopupWithConfirm from './PopupWithConfirm';
import ImagePopup from './ImagePopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import * as api from '../utils/api';

import success from '../images/success.svg';
import fail from '../images/fail.svg';

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
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = React.useState({});
  const [token, setToken] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const history = useHistory();

  React.useEffect(() => {
    Promise.all([
      api.getUserInfo(token),
      api.getInitialCards(token)
    ])
      .then(([user, initialCards]) => {
        setCurrentUser(user);
        setCards(initialCards.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  function onInfoTooltip() {
    setIsInfoTooltipOpen(true)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked, token)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
  }

  function handleCardDeleteSubmit() {
    api.deleteCard(cardDelete._id, token)
      .then(() => {
        const newCards = cards.filter((i) => i._id !== cardDelete._id);
        setCards(newCards);
        closeAllPopups();
      })
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.editUserInfo(data, token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .finally(() => {
        setIsLoading(false)
      });
  }

  function handleUpdateAvatar(user) {
    setIsLoading(true);
    api.editUserAvatar(user, token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .finally(() => {
        setIsLoading(false)
      });
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api.addNewCard(card, token)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .finally(() => {
        setIsLoading(false);
      });
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
    setIsInfoTooltipOpen(false);
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setToken(jwt)
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.email)
            history.push('/');
          } else {
            setIsInfoTooltipSuccess({ message: 'Что-то пошло не так! Попробуйте ещё раз.', icon: fail });
            onInfoTooltip();
          }
        })
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, [])

  function onRegister(email, password) {
    auth.register(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setIsInfoTooltipSuccess({ message: 'Вы успешно зарегистрировались!', icon: success });
          history.push('/signin');
        }
      })
      .catch((err) => setIsInfoTooltipSuccess({ message: `Что-то пошло не так! Попробуйте ещё раз.`, icon: fail }))
      .finally(() => {
        onInfoTooltip();
      })
  }

  function onLogin(email, password) {
    auth.authorize(escape(email), escape(password))
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem('jwt', res.token);
          setToken(res.token);
          auth.getContent(res.token);
          setLoggedIn(true);
          setUserEmail(email);
          setIsInfoTooltipSuccess({ message: 'Вы успешно вошли!', icon: success });
          history.push('/');
        }
      })
      .catch((err) => setIsInfoTooltipSuccess({ message: `Что-то пошло не так! Попробуйте ещё раз.`, icon: fail }))
      .finally(() => {
        onInfoTooltip();
      })
  }

  function onSignOut() {
    setLoggedIn(false);
    setUserEmail('');
    localStorage.removeItem('token');
    history.push('/signin');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <ProtectedRoute exact path='/'
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            userEmail={userEmail}
            onSignOut={onSignOut}
          />
          <Route path='/signup'>
            <Register onRegister={onRegister} />
          </Route>
          <Route path='/signin'>
            <Login onLogin={onLogin} />
          </Route>
          <Route>
            {<Redirect to={`${loggedIn ? '/' : '/signin'}`} />}
          </Route>
        </Switch>
      </div>
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
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        icon={isInfoTooltipSuccess.icon}
        text={isInfoTooltipSuccess.message}
      />

    </CurrentUserContext.Provider>
  );
}

export default App;
