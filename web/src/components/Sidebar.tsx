/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { FiPower, FiArrowLeft, FiAlertCircle, FiMapPin } from 'react-icons/fi';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

import mapMarkerImg from '../images/map-marker.svg';

import useAuth from '../contexts/auth';
import useQuery from '../hooks/useQuery';

import '../styles/components/sidebar.css';

interface SidebarProps {
  navButtons?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ navButtons }) => {
  const history = useHistory();
  const auth = useAuth();
  const query = useQuery();
  const { path } = useRouteMatch();

  const pending = !!query.get('pending');
  const dashboard = !pending && path === '/dashboard';

  function handleDashboardFooterButtonClick() {
    if (navButtons) {
      auth.signOut();
    } else {
      history.goBack();
    }
  }

  return (
    <aside className="app-sidebar">
      <img src={mapMarkerImg} alt="Happy" />

      <div className="nav-buttons">
        <Link to="/dashboard" className={`${dashboard && 'active'}`}>
          <FiMapPin size={24} />
        </Link>

        <Link to="/dashboard?pending=true" className={`${pending && 'active'}`}>
          <FiAlertCircle size={24} />
        </Link>
      </div>

      <footer>
        <button type="button" onClick={handleDashboardFooterButtonClick}>
          {navButtons ? <FiPower size={24} /> : <FiArrowLeft size={24} />}
        </button>
      </footer>
    </aside>
  );
};

export default Sidebar;
