import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import * as register from '../utils/Auth';

function Register({ title, name, buttonText, isOpen, isSucsessfull }) {
  const navigate = useNavigate();

  const [formValue, setFormValue] = React.useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { email, password } = formValue;

    register
      .register(email, password)
      .then((res) => {
        isOpen(true);
        isSucsessfull(true);
        navigate('/sign-in');
      })
      .catch((err) => {
        isOpen(true);
        isSucsessfull(false);
        console.log(err);
      });
  }
  return (
    <div className="auth">
      <h2 className="auth__title">{`${title}`}</h2>
      <form className="auth__form" name={`${name}`} onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          className="auth__input"
          value={formValue.email}
          onChange={handleChange}
          required
          type="email"
          minLength="3"
          autoComplete="username"
          name="email"></input>
        <input
          placeholder="Пароль"
          className="auth__input"
          value={formValue.password}
          onChange={handleChange}
          required
          type="password"
          autoComplete="current-password"
          minLength="3"
          name="password"></input>
        <button className="auth__button button" type="submit">
          {buttonText}
        </button>
      </form>

      <Link className="auth__link" href="!">
        Уже зарегистрированы ? Войти
      </Link>
    </div>
  );
}

export default Register;
