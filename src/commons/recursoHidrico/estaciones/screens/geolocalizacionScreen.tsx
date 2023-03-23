import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { type Estaciones } from '../interfaces/interfaces';
import { useEffect, useState } from 'react';
import { api } from '../../../../api/axios';
import Grid from '@mui/material/Grid';

const position: L.LatLngExpression = [5.258179477894017, -73.60700306515551];

// eslint-disable-next-line @typescript-eslint/no-var-requires
const icono: string = require('../assets/icons/locate.svg').default;

const icon_locate = new L.Icon({
  iconUrl: icono,
  iconSize: [45, 45],
});

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GeolocalizacionScreen: React.FC = () => {
  const [info, set_info] = useState<Estaciones[]>([]);
  useEffect(() => {
    void obtener_posicion();
  }, []);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const obtener_posicion = async () => {
    const { data } = await api.get('/estaciones/consultar-estaciones/');
    delete data.crs;
    const pos_maped = data.data.map((estaciones: Estaciones) => ({
      latitud: estaciones.latitud,
      longitud: estaciones.longitud,
    }));
    set_info(pos_maped);
    console.log(pos_maped);
  };

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!info.length) return <Grid className="Loading"></Grid>;

  const markers = info.map((estacion) => (
    <Marker
      key={estacion.id_estacion}
      position={[estacion.longitud, estacion.latitud]}
      icon={icon_locate}
    >
      <Popup>
        Nombre: {estacion.nombre_estacion}
        
      </Popup>
    </Marker>
  ));

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const firstEstacion = info[0];
  const center: L.LatLngExpression = [
    firstEstacion.longitud,
    firstEstacion.latitud,
  ];

  return (
    <Grid>
      <MapContainer
        center={center}
        zoom={8}
        style={{ height: '500px' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        {markers}
        <Marker position={position} icon={icon_locate}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </Grid>
  );
};
