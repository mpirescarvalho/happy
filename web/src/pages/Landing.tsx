import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logoImg from '../images/logo.svg';

import '../styles/pages/landing.css';

const Landing: React.FC = () => {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <div className="logo-container">
          <img src={logoImg} alt="Happy" />

          <div className="location">
            <strong>Irecê</strong>
            <span>Bahia</span>
          </div>
        </div>

        <Link to="/dashboard/login" className="dashboard-button">
          Acesso restrito
        </Link>

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </div>
  );
};

export default Landing;
