import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { type Estaciones } from '../interfaces/interfaces';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { consultar_estaciones } from '../../requets/Request';
import { control_error } from '../../../../helpers/controlError';

// const position: L.LatLngExpression = [5.258179477894017, -73.60700306515551];

// eslint-disable-next-line @typescript-eslint/no-var-requires
const icono: string = require('../assets/icons/locate.svg').default;

const icon_locate = new L.Icon({
  iconUrl: icono,
  iconSize: [30, 30],
});

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GeolocalizacionScreen: React.FC = () => {
  const [info, set_info] = useState<Estaciones[]>([]); 

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const obtener_posicion = async () => {
    try {
      const data = await consultar_estaciones();
      const pos_maped = data.map((estaciones: Estaciones) => ({

        id_estacion: estaciones.id_estacion,
        fecha_modificacion: estaciones.fecha_modificacion,
        nombre_estacion: estaciones.nombre_estacion,
        cod_tipo_estacion: estaciones.cod_tipo_estacion,
        cod_municipio: estaciones.cod_municipio,
        latitud: estaciones.latitud,
        longitud: estaciones.longitud,
        indicaciones_ubicacion: estaciones.indicaciones_ubicacion,
        fecha_modificacion_coordenadas: estaciones.fecha_modificacion_coordenadas,
        id_persona_modifica: estaciones.id_persona_modifica

      }));

      set_info(pos_maped);
      console.log('paso', pos_maped);

    } catch (err) {
      control_error(err);
    }
  };  

  useEffect(() => {
    void obtener_posicion();
  }, []);

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!info.length) return <Grid className="Loading"></Grid>;  

  const markers = info.map((estacion) => {

     return (
      <Marker
        key={estacion.id_estacion}
        position={[estacion.longitud, estacion.latitud]}
        icon={icon_locate}
      >
        <Popup>
          nombre: {estacion.nombre_estacion}
        </Popup>
      </Marker>
    );
  });

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
        {/* <Marker position={position} icon={icon_locate}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </MapContainer>
    </Grid>
  );
};