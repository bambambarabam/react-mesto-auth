import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар."
          />
          <div
            className="profile__avatar-edit"
            onClick={props.onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <div className="profile__name">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__edit"
              onClick={props.onEditProfile}
              aria-label="Редактировать"
              type="button"
            />
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__button"
          onClick={props.onAddPlace}
          aria-label="Добавить"
          type="button">+</button>
      </section>

      <section className="elements">
        {props.cards.map((item) => (
          <Card
            key={item._id}
            card={item}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  )
}

export default Main;
