import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';
import Footer from './Footer';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <>
      <main className="main">
        <section className="person">
          <div className="person__container">
            <button className="person__image-btn" onClick={onEditAvatar}>
              <img src={currentUser.avatar} alt="Жак-Ив Кусто" className="person__image" />
            </button>
            <div className="person__wrap">
              <div className="person__info">
                <h1 className="person__title">{currentUser.name}</h1>
                <button className="person__button button" type="button" onClick={onEditProfile} />
              </div>
              <p className="person__subtitle">{currentUser.about}</p>
            </div>
          </div>
          <button className="person__button-add button" type="button" onClick={onAddPlace} />
        </section>
        <section className="places">
          <ul className="places__container">
            {cards.map((card) => {
              return (
                <Card
                  card={card}
                  key={card._id}
                  onCardClick={onCardClick}
                  name={card.name}
                  link={card.link}
                  likes={card.likes.length}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}></Card>
              );
            })}
          </ul>
        </section>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Main;
