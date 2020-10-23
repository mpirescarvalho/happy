import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';

import api from '../../services/api';

import deleteOrphanageImage from '../../images/delete-orphanage.svg';

import '../../styles/pages/dashboard/delete-orphanage.css';

interface DeleteOrphanageParams {
  id: string;
}

interface DeleteOrphanageState {
  from?: string;
}

interface Orphanage {
  name: string;
}

const DeleteOrphanage: React.FC = () => {
  const [orphanage, setOrphanage] = useState<Orphanage | undefined>();
  const params = useParams<DeleteOrphanageParams>();
  const location = useLocation<DeleteOrphanageState>();
  const history = useHistory();

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then(res => setOrphanage(res.data));
  }, [params.id]);

  async function handleConfirm() {
    const res = await api.delete(`orphanages/${params.id}`);
    if (res.status === 200) {
      if (location.state && location.state.from === 'edit-orphanage') {
        history.go(-2);
      } else {
        history.goBack();
      }
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
          excluir {orphanage?.name || 'o orfanato'}?
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
