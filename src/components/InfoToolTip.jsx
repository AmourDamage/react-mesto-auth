import React from 'react';

import sucsessImg from '../images/sucsess.svg';
import notSucsessImg from '../images/notsucsess.svg';

function InfoToolTip({ name, onClose, isSucsessful, isOpen }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <div className="popup-sucsess">
          <img
            src={isSucsessful ? sucsessImg : notSucsessImg}
            alt={isSucsessful ? 'успешно' : 'что-то пошло не так'}></img>
          <h2 className="popup__title popup-sucsess__title">
            {isSucsessful
              ? 'Вы успешно зарегистрировались'
              : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </h2>
          <button className="popup__button-close button" type="button" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}

export default InfoToolTip;
