import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Login = ({ onLogin }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleChange = (evt) => {
    evt.target.name === 'Email' ? setEmail(evt.target.value) : setPassword(evt.target.value);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!email || !password) {
      console.log('Не все поля заполнены');
      return;
    } else {
    onLogin(email, password)
    resetForm();
    }
  };

  return (
    <>
      <Header headerName="Регистрация" />
      <section className="register">
        <form
          className="register__form"
          onSubmit={handleSubmit}
          noValidate>
          <h2
            className="register__header">
            Вход
        </h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            name="Email"
            onChange={handleChange}
            className="register__input">
          </input>
          <input className="register__input"
            type="password"
            placeholder="Password"
            value={password}
            name="Password"
            onChange={handleChange}
          >
          </input>
          <button
            type="submit"
            className="register__button">
            Войти
           </button>
          <div className="register__signin">
            <p className="register__login-text">Еще не зарегистрированы?</p>
            <Link to='/sign-up'
              className="register__login-link">
              Регистрация
            </Link>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
}

export default Login;
