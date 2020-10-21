import React, { FormEvent, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import dashboardLogoImg from '../../images/dashboard-logo.svg';
import checkmarkImg from '../../images/checkmark.svg';

import api from '../../services/api';

import '../../styles/pages/dashboard/login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [errors, setErrors] = useState({ email: false, password: false });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErrors({ email: false, password: false });

    const data = {
      email,
      password,
    };

    try {
      const response = await api.post('/session', data, {});

      console.log(response);

      alert('success');
    } catch (err) {
      setErrors(err.response.data.errors);
      console.error(err.response.status, err.response.data);
    }
  }

  return (
    <div id="page-login">
      <aside className="logo-container">
        <img src={dashboardLogoImg} alt="Happy" />

        <div className="location">
          <strong>Irecê</strong>
          <span>Bahia</span>
        </div>
      </aside>

      <main className="login-container">
        <Link to="/" className="landing-button">
          <FiArrowLeft size={24} color="#15c3d6" />
        </Link>

        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Fazer login</h1>

          <div className="input-block">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              value={email}
              className={`${errors.email && 'error'}`}
              onChange={event => setEmail(event.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              value={password}
              type="password"
              className={`${errors.password && 'error'}`}
              onChange={event => setPassword(event.target.value)}
            />
          </div>

          <div className="bottom-options">
            <label className="checkbox" htmlFor="stay-logged-in">
              <input
                id="stay-logged-in"
                type="checkbox"
                checked={stayLoggedIn}
                onChange={event => setStayLoggedIn(event.target.checked)}
              />
              <div className="checkmark">
                <img src={checkmarkImg} alt="checkmark" />
              </div>
              Lembrar-me
            </label>

            <Link to="/dashboard/forgot-password" className="forgot-password">
              Esqueci minha senha
            </Link>
          </div>

          <button className="submit-button" type="submit">
            Entrar
          </button>
        </form>
      </main>
    </div>
  );
}
