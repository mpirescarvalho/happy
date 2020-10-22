import React, { useState, useEffect, useMemo } from 'react';

import Sidebar from '../../components/Sidebar';
import OrphanageListItem, {
  Orphanage,
} from '../../components/OrphanageListItem';

import useQuery from '../../hooks/useQuery';
import api from '../../services/api';

import logoGrayImg from '../../images/logo-gray.svg';

import '../../styles/pages/dashboard/dashboard.css';

const Dashboard: React.FC = () => {
  const [orphanagesComplete, setOrphanagesComplete] = useState<Orphanage[]>([]);
  const [orphanagesPending, setOrphanagesPending] = useState<Orphanage[]>([]);

  const query = useQuery();
  const pending = query.get('pending') === 'true';

  const orphanages = useMemo(
    () => (pending ? orphanagesPending : orphanagesComplete),
    [orphanagesPending, orphanagesComplete, pending]
  );

  useEffect(() => {
    api.get(`orphanages`).then(res => setOrphanagesComplete(res.data));

    api
      .get(`orphanages?pending=true`)
      .then(res => setOrphanagesPending(res.data));
  }, [pending]);

  return (
    <div id="page-dashboard">
      <Sidebar navButtons={true} pendingBadge={orphanagesPending.length > 0} />

      <main>
        <header>
          <h1>{pending ? 'Cadastros pendentes' : 'Orfanatos Cadastrados'}</h1>
          <span>{orphanages.length} orfanatos</span>
        </header>

        {orphanages.length > 0 ? (
          <ul className="orphanages-list">
            {orphanages.map(orphanage => (
              <OrphanageListItem key={orphanage.id} orphanage={orphanage} />
            ))}
          </ul>
        ) : (
          <div className="no-orphanages">
            <img src={logoGrayImg} alt="Oops" />
            <span>Nenhum no momento</span>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
