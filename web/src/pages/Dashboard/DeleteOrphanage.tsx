import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import api from '../../services/api';

import deleteOrphanageImage from '../../images/delete-orphanage.svg';

import '../../styles/pages/dashboard/delete-orphanage.css';

interface DeleteOrphanageParams {
  id: string;
}

const DeleteOrphanage: React.FC = () => {
  const params = useParams<DeleteOrphanageParams>();
  const history = useHistory();

  async function handleConfirm() {
    const res = await api.delete(`orphanages/${params.id}`);
    if (res.status === 200) {
      history.goBack();
    } else {
      alert('Erro ao excluir orfanato');
      console.error(res.data);
    }
  }

  return (
    <div id="page-delete-orphanage">
      <main>
        <h1>Excluir!</h1>
        <p>
          Você tem certeza que quer <br />
          excluir Orf. Esperança?
        </p>

        <div className="buttons">
          <button onClick={history.goBack} id="cancel" type="button">
            Cancelar
          </button>
          <button onClick={handleConfirm} id="confirm" type="button">
            Excluir
          </button>
        </div>
      </main>
      <img src={deleteOrphanageImage} alt="Delete orphanage" />
    </div>
  );
};

export default DeleteOrphanage;
