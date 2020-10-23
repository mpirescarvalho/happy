import React, {
  useState,
  FormEvent,
  ChangeEvent,
  useEffect,
  useMemo,
} from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { useHistory, useParams } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { VscError } from 'react-icons/vsc';
import { BiCheck } from 'react-icons/bi';

import Sidebar from '../../components/Sidebar';
import mapIcon from '../../utils/mapIcon';
import api from '../../services/api';

import '../../styles/pages/dashboard/edit-orphanage.css';

interface EditOrphanageParams {
  id: string;
}

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  pending: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

const EditOrphanage: React.FC = () => {
  const [mapCenter, setMapCenter] = useState({
    latitude: -11.3024798,
    longitude: -41.8589281,
  });

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [pending, setPending] = useState(false);

  const previewImages = useMemo(
    () => images.map(image => URL.createObjectURL(image)),
    [images]
  );

  const params = useParams<EditOrphanageParams>();
  const history = useHistory();

  useEffect(() => {
    api.get<Orphanage>(`orphanages/${params.id}`).then(async res => {
      const orphanage = res.data;

      const orphanagePosition = {
        latitude: orphanage.latitude,
        longitude: orphanage.longitude,
      };

      const orphanageImages = await Promise.all(
        orphanage.images.map(async image => {
          const blob = await (await fetch(image.url)).blob();
          const filename = image.url.match(/\/\d+-(.+)$/)?.[1] || 'image';
          return new File([blob], filename);
        })
      );

      setMapCenter(orphanagePosition);
      setPosition(orphanagePosition);
      setName(orphanage.name);
      setAbout(orphanage.about);
      setInstructions(orphanage.instructions);
      setOpeningHours(orphanage.opening_hours);
      setOpenOnWeekends(orphanage.open_on_weekends);
      setImages(orphanageImages);
      setPending(orphanage.pending);
    });
  }, [params.id]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    data.append('pending', 'false');

    images.forEach(image => {
      data.append('images', image);
    });

    await api.put(`orphanages/${params.id}`, data);

    alert('Orfanato atualizado com sucesso');

    history.goBack();
  }

  function handleRefuse() {
    history.push(`/dashboard/orphanages/${params.id}/delete`, {
      from: 'edit-orphanage',
    });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages([...images, ...selectedImages]);
  }

  function handleDeleteImage(imageIndex: number) {
    const newImages = images.filter((image, index) => index !== imageIndex);
    setImages(newImages);
  }

  return (
    <div id="page-edit-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="edit-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[mapCenter.latitude, mapCenter.longitude]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              {/* <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              /> */}

              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="about"
                maxLength={300}
                value={about}
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image, index) => (
                  <div key={index}>
                    <img src={image} alt={name} />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                    >
                      <MdClose size={24} color="#FF669D" />
                    </button>
                  </div>
                ))}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input
                multiple
                onChange={handleSelectImages}
                value={[]}
                type="file"
                id="image[]"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          {!pending && (
            <button className="confirm-button" type="submit">
              Confirmar
            </button>
          )}

          {pending && (
            <div className="pending-buttons">
              <button onClick={handleRefuse} id="refuse" type="button">
                <VscError size={24} color="#fff" /> Recusar
              </button>
              <button onClick={handleSubmit} id="accept" type="button">
                <BiCheck size={24} color="#fff" /> Aceitar
              </button>
            </div>
          )}
        </form>
      </main>
    </div>
  );
};

export default EditOrphanage;
