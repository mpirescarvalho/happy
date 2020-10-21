import React from 'react';

import Sidebar from '../../components/Sidebar';
import OrphanageListItem from '../../components/OrphanageListItem';

import useQuery from '../../hooks/useQuery';

import '../../styles/pages/dashboard/dashboard.css';

const Dashboard: React.FC = () => {
  const query = useQuery();
  const pending = query.get('pending');

  return (
    <div id="page-dashboard">
      <Sidebar navButtons={true} />

      <main>
        <header>
          <h1>{pending ? 'Cadastros pendentes' : 'Orfanatos Cadastrados'}</h1>
          <span>2 orfanatos</span>
        </header>

        <ul className="orphanages-list">
          {pending ? (
            <>
              <OrphanageListItem pending />
              <OrphanageListItem pending />
              <OrphanageListItem pending />
            </>
          ) : (
            <>
              <OrphanageListItem />
              <OrphanageListItem />
              <OrphanageListItem />
              <OrphanageListItem />
              <OrphanageListItem />
            </>
          )}
        </ul>
      </main>
    </div>
  );
};

export default Dashboard;
