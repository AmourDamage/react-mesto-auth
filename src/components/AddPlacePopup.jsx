import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setLink(currentUser.link);
  }, [currentUser]);

  function handleInputNameChange(e) {
    setName(e.target.value);
  }

  function handleInputLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="add-place"
      title="Добавить новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Добавить"
      onSubmit={handleSubmit}>
      <input
        id="input-place"
        type="text"
        className="popup__input popup__input_type_name"
        placeholder="Название"
        required=""
        minLength={2}
        maxLength={30}
        name="name"
        onChange={handleInputNameChange}
      />
      <span id="input-place-error" className="popup__input-error" />
      <input
        id="input-link"
        type="url"
        className="popup__input popup__input_type_url"
        placeholder="Ссылка на картинку"
        required=""
        name="link"
        onChange={handleInputLinkChange}
      />
      <span id="input-link-error" className="popup__input-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
