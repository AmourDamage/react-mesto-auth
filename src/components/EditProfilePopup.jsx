import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  function handleInputNameChange(e) {
    setName(e.target.value);
  }

  function handleInputDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText={props.buttonText}
      onSubmit={handleSubmit}>
      <input
        id="input-name"
        type="text"
        className="popup__input popup__input_type_name"
        placeholder="Жак Ив-Кусто"
        minLength={2}
        maxLength={40}
        required=""
        name="name"
        value={name || ''}
        onChange={handleInputNameChange}
      />
      <span id="input-name-error" className="popup__input-error" />
      <input
        id="input-job"
        type="text"
        className="popup__input popup__input_type_job"
        placeholder="Исследователь океана"
        minLength={2}
        maxLength={200}
        required=""
        name="about"
        value={description || ''}
        onChange={handleInputDescriptionChange}
      />
      <span id="input-job-error" className="popup__input-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
