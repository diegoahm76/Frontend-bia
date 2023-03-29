import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { type Datos, type Estaciones } from '../interfaces/interfaces';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { consultar_datos_id, consultar_estaciones } from '../../requets/Request';
import { control_error } from '../../../../helpers/controlError';
import { Box, Divider, Typography } from '@mui/material';

// const position: L.LatLngExpression = [5.258179477894017, -73.60700306515551];

// eslint-disable-next-line @typescript-eslint/no-var-requires
const icono: string = require('../assets/icons/locate.svg').default;

const icon_locate = new L.Icon({
  iconUrl: icono,
  iconSize: [30, 30],
});

const map_style = {
  height: "90vh",
  width: "90vw"
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GeolocalizacionScreen: React.FC = () => {
  const [info, set_info] = useState<Estaciones[]>([]);
  const [dato, set_dato] = useState<Datos[]>([]);

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

  const traer_dato = async (data: { estacion: { value: any; }; }): Promise<any> => {
    try {
      set_dato([])
      const estacion_id = data.estacion?.value;
      const estacion = await consultar_datos_id(estacion_id);
      const ultimo_dato = estacion[estacion.length - 1];
      const datos = {
        id_data: ultimo_dato.id_data,
        fecha_registro: ultimo_dato.fecha_registro,
        temperatura_ambiente: ultimo_dato.temperatura_ambiente,
        humedad_ambiente: ultimo_dato.humedad_ambiente,
        presion_barometrica: ultimo_dato.presion_barometrica,
        velocidad_viento: ultimo_dato.velocidad_viento,
        direccion_viento: ultimo_dato.direccion_viento,
        precipitacion: ultimo_dato.precipitacion,
        luminosidad: ultimo_dato.luminosidad,
        nivel_agua: ultimo_dato.nivel_agua,
        velocidad_agua: ultimo_dato.velocidad_agua,
        id_estacion: ultimo_dato.id_estacion,
      };
      console.log("Paso");
      console.log("Datos", [datos]);
      set_dato([datos])
    } catch (err) {
      control_error(err);
    }
  };

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!info.length) return <Grid className="Loading"></Grid>;  

  const markers = info.map((estacion) => (
    <Marker
      key={estacion.id_estacion}
      position={[estacion.longitud, estacion.latitud]}
      icon={icon_locate}
      eventHandlers={{
        click: () => {
          void traer_dato({ estacion: { value: estacion.id_estacion } });
          console.log('marker clicked');
        },
      }}
    >
      <Popup>
        <Typography text-align="center">
          <strong>Estacion: </strong> {estacion.nombre_estacion} 
        </Typography>
        <Divider className="divider2" sx={{ m: '10px 0' }} />

        {dato.length > 0 ? (
          <Box
          >          

          Latitud: {estacion.latitud} <br />
          Longitud: {estacion.longitud} <br /><br />  
            <div>Fecha: {dato[0].fecha_registro}</div>
            <div>Temperatura: {dato[0].temperatura_ambiente}</div>
            <div>Humedad: {dato[0].humedad_ambiente}</div>
            <div>Presión: {dato[0].presion_barometrica}</div>
            <div>Velocidad de viento: {dato[0].velocidad_viento}</div>
            <div>Dirección del viento: {dato[0].direccion_viento}</div>
            <div>Precipitación: {dato[0].precipitacion}</div>
            <div>Luminosidad: {dato[0].luminosidad}</div>
            <div>Nivel de agua: {dato[0].nivel_agua}</div>
            <div>Velocidad del agua: {dato[0].velocidad_agua}</div>

          </Box>
        ) : (
          <div>No hay datos disponibles</div>
        )}
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
    <Grid item>
      <Box sx={{ width: '100%'}}>
        <MapContainer
          center={center}
          zoom={8}
          style={map_style}
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
      </Box>
    </Grid>
  );
};