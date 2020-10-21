import React from 'react';

import Sidebar from '../../components/Sidebar';

import useQuery from '../../hooks/useQuery';

import '../../styles/pages/dashboard/dashboard.css';

const Dashboard: React.FC = () => {
  const query = useQuery();
  console.log(query.get('pending'));

  return (
    <div id="page-dashboard">
      <Sidebar navButtons={true} />

      <main>asdasd</main>
    </div>
  );
};

export default Dashboard;
