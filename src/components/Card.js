import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ onCardClick, card, onCardDelete, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `${isOwn ? 'element__del' : 'element__del_hidden'}`
  );

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`element__fav ${isLiked ? 'element__fav_active' : ''}`);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="element">
      <img
        className="element__img element__img_add element__img_preview"
        src={card.link}
        alt={`${card.name}`}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        aria-label="Удалить"
        type="button"
        onClick={handleDeleteClick}
      />
      <h2 className="element__header element__header_add">{card.name}</h2>
      <div className="element__fav-container">
        <button
          className={cardLikeButtonClassName}
          aria-label="В избранное"
          type="button"
          onClick={handleLikeClick}
        />
        <p className="element__fav-count">{card.likes.length}</p>
      </div>
    </div>
  )
}

export default Card;
