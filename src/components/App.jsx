import React from 'react';

import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import SucsessfullRegistrationPopup from './SucsessfullRegistrationPopup';

import Login from './Login';
import Register from './Register';
import ProtectedRouteElement from './ProtectedRouteElement';

import * as checkToken from '../utils/Auth';

import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isSucsessfullPopupOpen, SetIsSucsessfullPopupOpen] = React.useState(false);
  const [isSucsessfull, setIsSucsessfull] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);

  const [cards, setCards] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState({});

  const [loggedIn, setIsLoggedIn] = React.useState(false);

  const [userData, setUserData] = React.useState('');

  const Navigate = useNavigate();

  React.useEffect(() => {
    Api.getUserInfo()
      .then((info) => {
        setCurrentUser(info);
      })
      .catch((err) => {
        console.log(err);
      });
    Api.getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function tokenCheck() {
    if (localStorage.getItem('token')) {
      const jwt = localStorage.getItem('token');

      if (jwt) {
        checkToken.checkToken(jwt).then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setUserData(res.data.email);
            Navigate('/');
          }
        });
      }
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      Api.putLikeOnCard(card._id)
        .then((newCard) => {
          setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Api.removeLikeOnCard(card._id)
        .then((newCard) => {
          setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    Api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    SetIsSucsessfullPopupOpen(false);
    setSelectedCard(null);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateUser({ name, about }) {
    Api.saveUserInfo({ name, about })
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ link }) {
    Api.changeAvatar({ link })
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    Api.addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleSucsessPopupOpen(isTrue) {
    SetIsSucsessfullPopupOpen(isTrue);
  }

  function handleSucsessOfPopup(isSucsessfull) {
    setIsSucsessfull(isSucsessfull);
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header userData={userData}></Header>
        <Routes>
          <Route
            path={'*'}
            element={
              <Login
                handleLogin={handleLogin}
                name="login"
                title="Вход"
                buttonText="Войти"
                isOpen={handleSucsessPopupOpen}
                isSucsessfull={handleSucsessOfPopup}
              />
            }></Route>
          <Route
            path="/sign-up"
            element={
              <Register
                name="register"
                title="Зарегистрироваться"
                buttonText="Зарегистрироваться"
                isOpen={handleSucsessPopupOpen}
                isSucsessfull={handleSucsessOfPopup}
              />
            }></Route>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={setSelectedCard}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                loggedIn={loggedIn}
              />
            }></Route>
          <Route
            path="/"
            element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />}></Route>
        </Routes>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}></EditAvatarPopup>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}></EditProfilePopup>
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}></AddPlacePopup>
        <PopupWithForm name="confirm" title="Вы уверены?" buttonText="Да"></PopupWithForm>
        <SucsessfullRegistrationPopup
          isOpen={isSucsessfullPopupOpen}
          isSucsessful={isSucsessfull}
          name="sucsessfull"
          onClose={closeAllPopups}></SucsessfullRegistrationPopup>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
