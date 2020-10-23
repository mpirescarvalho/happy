import React from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiEdit3, FiArrowRight } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import mapIcon from '../utils/mapIcon';
import '../styles/components/orphanage-list-item.css';

export interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  pending: boolean;
}

interface OrphanageListItemProps {
  orphanage: Orphanage;
}

const OrphanageListItem: React.FC<OrphanageListItemProps> = ({ orphanage }) => {
  return (
    <li className="orphanage-list-item">
      <Map
        center={[orphanage.latitude, orphanage.longitude]}
        zoom={16}
        style={{ width: '100%', flex: '1', borderRadius: '20px' }}
        dragging={false}
        touchZoom={false}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          interactive={false}
          icon={mapIcon}
          position={[orphanage.latitude, orphanage.longitude]}
        />
      </Map>

      <footer>
        <strong>{orphanage.name}</strong>

        <div className="buttons">
          {orphanage.pending ? (
            <Link to={`/dashboard/orphanages/${orphanage.id}`}>
              <FiArrowRight size={24} color="#15C3D6" />
            </Link>
          ) : (
            <>
              <Link to={`/dashboard/orphanages/${orphanage.id}`}>
                <FiEdit3 size={24} color="#15C3D6" />
              </Link>

              <Link to={`/dashboard/orphanages/${orphanage.id}/delete`}>
                <AiOutlineDelete size={24} color="#15C3D6" />
              </Link>
            </>
          )}
        </div>
      </footer>
    </li>
  );
};

export default OrphanageListItem;
