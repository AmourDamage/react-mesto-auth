import React from 'react';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      link: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText={props.buttonText}
      onSubmit={handleSubmit}>
      <input
        id="input-avatar"
        type="url"
        className="popup__input"
        name="link"
        required=""
        placeholder="Введите ссылку"
        ref={inputRef}
      />
      <span id="input-avatar-error" className="popup__input-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
