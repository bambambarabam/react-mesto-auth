import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupWithConfirm({ isOpen, onClose, onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }
  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      button="Да"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
}

export default PopupWithConfirm;
