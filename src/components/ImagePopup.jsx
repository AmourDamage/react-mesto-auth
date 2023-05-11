import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup-preview ${card ? 'popup_opened' : ''}`}>
      <figure className="popup__container popup-picture">
        <img
          alt={card ? card.name : null}
          className="popup-picture__img"
          src={card ? card.link : null}
        />
        <figcaption className="popup-picture__caption">{card ? card.name : null}</figcaption>
        <button
          className="popup__button-close popup__button-preview-close button"
          onClick={onClose}
        />
      </figure>
    </div>
  );
}

export default ImagePopup;
