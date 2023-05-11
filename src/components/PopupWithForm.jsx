import React from 'react';

function PopupWithForm({ name, title, children, isOpen, onClose, buttonText, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{`${title}`}</h2>
        <form className="popup__form" name={`${name}`} onSubmit={onSubmit}>
          {children}
          <button className="popup__button button popup__profile-btn" type="submit">
            {buttonText}
          </button>
        </form>
        <button className="popup__button-close button" type="button" onClick={onClose} />
      </div>
    </div>
  );
}

export default PopupWithForm;
