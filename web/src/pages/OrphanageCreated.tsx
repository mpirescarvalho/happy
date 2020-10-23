import React from 'react';
import { Link } from 'react-router-dom';

import orphanageCreatedImg from '../images/orphanage-created.svg';

import '../styles/pages/orphanage-created.css';

const OrphanageCreated: React.FC = () => {
  return (
    <div id="page-orphanage-created">
      <main>
        <h1>Ebaaa!</h1>
        <p>
          O cadastro deu certo e foi enviado
          <br />
          ao administrador para ser aprovado.
          <br />
          Agora é só esperar :)
        </p>

        <div className="buttons">
          <Link to="/app">Voltar para o mapa</Link>
        </div>
      </main>
      <img src={orphanageCreatedImg} alt="Orphanage created" />
    </div>
  );
};

export default OrphanageCreated;
