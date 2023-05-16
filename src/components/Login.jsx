import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as login from '../utils/Auth';

function Login({ title, name, buttonText, handleLogin, isOpen, isSucsessfull }) {
  const navigate = useNavigate();
  const [formValue, setFormValue] = React.useState({
    username: '',
    password: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formValue.username || !formValue.password) {
      return;
    }

    login
      .login(formValue.username, formValue.password)
      .then((data) => {
        if (data.token) {
          setFormValue({ username: '', password: '' });
          handleLogin();
          navigate('/');
        }
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
          value={formValue.username}
          name="username"
          required
          type="email"
          minLength="3"
          autoComplete="username"
          onChange={handleChange}></input>
        <input
          placeholder="Пароль"
          className="auth__input"
          value={formValue.password}
          name="password"
          required
          type="password"
          autoComplete="current-password"
          minLength="3"
          onChange={handleChange}></input>
        <button className="auth__button button" type="submit">
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default Login;
