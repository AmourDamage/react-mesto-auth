import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `places__button ${isLiked && 'places__button_type_active'}`;

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="places__item">
      {isOwn && <button className="places__trash-btn" onClick={handleDeleteClick} />}
      <img className="places__img" alt={props.name} src={props.link} onClick={handleCardClick} />
      <div className="places__content">
        <h2 className="places__title">{props.name}</h2>
        <div className="places__likes-container">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} />
          <p className="places__like">{props.likes}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
