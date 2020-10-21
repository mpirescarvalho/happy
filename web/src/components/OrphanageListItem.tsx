import React from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiEdit3, FiArrowRight } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';

import mapIcon from '../utils/mapIcon';
import '../styles/components/orphanage-list-item.css';

interface OrphanageListItemProps {
  pending?: boolean;
}

const OrphanageListItem: React.FC<OrphanageListItemProps> = ({ pending }) => {
  return (
    <li className="orphanage-list-item">
      <Map
        center={[-11.3024798, -41.8589281]}
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
          position={[-11.3024798, -41.8589281]}
        />
      </Map>

      <footer>
        <strong>Orf. Esperança</strong>

        <div className="buttons">
          {pending ? (
            <button type="button">
              <FiArrowRight size={24} color="#15C3D6" />
            </button>
          ) : (
            <>
              <button type="button">
                <FiEdit3 size={24} color="#15C3D6" />
              </button>

              <button type="button">
                <AiOutlineDelete size={24} color="#15C3D6" />
              </button>
            </>
          )}
        </div>
      </footer>
    </li>
  );
};

export default OrphanageListItem;
