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
import InfoToolTip from './InfoToolTip';

import Login from './Login';
import Register from './Register';
import ProtectedRouteElement from './ProtectedRouteElement';

import * as checkToken from '../utils/Auth';

import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const [isLoading, setIsLoading] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isSucsessfullPopupOpen, setIsSucsessfullPopupOpen] = React.useState(false);
  const [isSucsessfull, setIsSucsessfull] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);

  const [cards, setCards] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState({});

  const [loggedIn, setIsLoggedIn] = React.useState(false);

  const [userData, setUserData] = React.useState('');

  const navigate = useNavigate();

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
        checkToken
          .checkToken(jwt)
          .then((res) => {
            if (res) {
              setIsLoggedIn(true);
              setUserData(res.data.email);
              navigate('/');
            }
          })
          .catch((err) => {
            console.log(err);
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
    setIsSucsessfullPopupOpen(false);
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
    setIsLoading(true);
    Api.saveUserInfo({ name, about })
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar({ link }) {
    setIsLoading(true);
    Api.changeAvatar({ link })
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    Api.addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(true);
      });
  }

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleSucsessPopupOpen(isTrue) {
    setIsSucsessfullPopupOpen(isTrue);
  }

  function handleSucsessOfPopup(isSucsessfull) {
    setIsSucsessfull(isSucsessfull);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header userData={userData}></Header>
      <Routes>
        <Route
          path={'*'}
          element={
            <Login
              handleLogin={handleLogin}
              setUserData={setUserData}
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
          element={loggedIn ? <navigate to="/" /> : <navigate to="/sign-in" />}></Route>
      </Routes>

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}></EditAvatarPopup>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}></EditProfilePopup>
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}></AddPlacePopup>
      <PopupWithForm name="confirm" title="Вы уверены?" buttonText="Да"></PopupWithForm>
      <InfoToolTip
        isOpen={isSucsessfullPopupOpen}
        isSucsessful={isSucsessfull}
        name="sucsessfull"
        onClose={closeAllPopups}></InfoToolTip>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
