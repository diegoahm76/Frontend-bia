import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { DatosMigracion, Datos, Estaciones } from '../interfaces/interfaces';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { consultar_datos_id, consultar_datos_id_migracion, consultar_estaciones } from '../../requets/Request'
import { control_error } from '../../../../helpers/controlError';
import { Box, Divider, Typography } from '@mui/material';
import type { AxiosError } from 'axios';

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
  const [dato_migracion, set_dato_migracion] = useState<DatosMigracion[]>([]);

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
        nombre_persona_modifica: estaciones.nombre_persona_modifica

      }));

      set_info(pos_maped);
      console.log('paso', pos_maped);

    } catch (err: unknown) {
      const temp_error = err as AxiosError
      console.log("Error", temp_error)
      if (temp_error.response?.status === 404) {
        control_error("No se encontraron estaciones");
        console.log("No hay datos");
        set_dato([]);
      } else {
        // Otro error, mostrar mensaje de error genérico
        control_error("Ha ocurrido un error, por favor intente de nuevo más tarde.");
      }
    };
  }
  useEffect(() => {
    void obtener_posicion();
  }, []);

  const traer_dato = async (data: { estacion: { value: any; }; }): Promise<any> => {
    try {
      set_dato([])
      const estacion_id = data.estacion?.value;
      const estacion = await consultar_datos_id(estacion_id);
      const datos_ordenados = estacion.sort((a, b) => new Date(b.fecha_registro).getTime() - new Date(a.fecha_registro).getTime());
      const ultimo_dato = datos_ordenados[0];
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
    } catch (err: unknown) {
      const temp_error = err as AxiosError
      console.log("Error", temp_error.response?.status)
      if (temp_error.response?.status === 404) {
        control_error("No se encontraron datos para esta estación");
        console.log("No hay datos");
        set_dato([]);
      } else {
        // Otro error, mostrar mensaje de error genérico
        control_error("Ha ocurrido un error, por favor intente de nuevo más tarde.");
      }
    };
  };
  const traer_dato_migracion = async (data: { estacion: { value: any; }; }): Promise<any> => {
    try {
      set_dato([])
      const estacion_id = data.estacion?.value;
      const estacion = await consultar_datos_id_migracion(estacion_id);
      const datos_ordenados = estacion.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
      const ultimo_dato = datos_ordenados[0];
      const datos = {
        id_migracion_estacion: ultimo_dato.id_migracion_estacion,
        id_estacion: ultimo_dato.id_estacion,
        nombre: ultimo_dato.nombre,
        fecha: ultimo_dato.fecha,
        temperatura: ultimo_dato.temperatura,
        temperatura_max: ultimo_dato.temperatura_max,
        temperatura_min: ultimo_dato.temperatura_min,
        humedad_relativa: ultimo_dato.humedad_relativa,
        punto_de_rocio: ultimo_dato.punto_de_rocio,
        presion_atm_abs: ultimo_dato.presion_atm_abs,
        presion_atm_rel: ultimo_dato.presion_atm_rel,
        intensidad: ultimo_dato.intensidad,
        precipitacion: ultimo_dato.precipitacion,
        nivel_agua: ultimo_dato.nivel_agua,
        nivel_agua_max: ultimo_dato.nivel_agua_max,
        nivel_agua_min: ultimo_dato.nivel_agua_min,
        velocidad_rio: ultimo_dato.velocidad_rio,
        caudal: ultimo_dato.caudal,
        voltaje: ultimo_dato.voltaje
      };
      console.log("Paso");
      console.log("Datos", [datos]);
      set_dato_migracion([datos]);
    } catch (err: unknown) {
      const temp_error = err as AxiosError
      console.log("Error", temp_error.response?.status)
      if (temp_error.response?.status === 404) {
        control_error("No se encontraron datos para esta estación");
        console.log("No hay datos");
        set_dato([]);
      } else {
        // Otro error, mostrar mensaje de error genérico
        control_error("Ha ocurrido un error, por favor intente de nuevo más tarde.");
      }
    };
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
          set_dato([]);
          set_dato_migracion([]);
          const id_estacion_saleccionada = { estacion: { value: estacion.id_estacion } }
          console.log("Id Estacion", id_estacion_saleccionada.estacion.value)
          if (id_estacion_saleccionada.estacion.value === 1 || id_estacion_saleccionada.estacion.value === 2 || id_estacion_saleccionada.estacion.value === 3 || id_estacion_saleccionada.estacion.value === 4) {
            void traer_dato({ estacion: { value: estacion.id_estacion } });
            return
          }
          void traer_dato_migracion({ estacion: { value: estacion.id_estacion } });

          console.log('marker clicked');
        },
      }}
    >
      <Popup>
        <Typography text-align="center">
          <strong>Estación: {estacion.nombre_estacion}</strong>
        </Typography>
        <Divider className="divider2" sx={{ m: '10px 0' }} />

        {dato.length > 0 ? (
          <Box
          >
            Tipo: {estacion.cod_tipo_estacion} <br />
            Latitud: {estacion.latitud} <br />
            Longitud: {estacion.longitud} <br /><br />
            <div>Fecha: {dato[0].fecha_registro}</div>
            <div>Temperatura: {dato[0].temperatura_ambiente} °C </div>
            <div>Humedad: {dato[0].humedad_ambiente} %RH</div>
            <div>Presión atmosferica: {dato[0].presion_barometrica} hPa</div>
            <div>Velocidad de viento: {dato[0].velocidad_viento} m/s</div>
            <div>Dirección del viento: {dato[0].direccion_viento} °</div>
            <div>Precipitación: {dato[0].precipitacion} mm</div>
            <div>Luminosidad: {dato[0].luminosidad} kLux </div>
            <div>Nivel de agua: {dato[0].nivel_agua} m</div>
            <div>Velocidad del agua: {dato[0].velocidad_agua} m/s</div>

          </Box>
        ) : (
          ''
        )}
        {dato_migracion.length > 0 ? (
          <Box
          >
            Tipo: {estacion.cod_tipo_estacion} <br />
            Latitud: {estacion.latitud} <br />
            Longitud: {estacion.longitud} <br /><br />
            <div>Temperatura: {dato_migracion[0].temperatura} °C</div>
            <div>Fecha: {dato_migracion[0].fecha}</div>
            <div>Humedad: {dato_migracion[0].humedad_relativa} %</div>
            <div>Punto de Rocio: {dato_migracion[0].punto_de_rocio} °C</div>
            <div>Presión ABS: {dato_migracion[0].presion_atm_abs} Hpa</div>
            <div>Presión rel: {dato_migracion[0].presion_atm_rel} Hpa</div>
            <div>Intensidad: {dato_migracion[0].intensidad} mm</div>
            <div>Precipitación: {dato_migracion[0].precipitacion} mm</div>
            <div>Nivel de agua: {dato_migracion[0].nivel_agua} m</div>
            <div>Velocidad del rio: {dato_migracion[0].velocidad_rio} m/s</div>
            <div>Caudal: {dato_migracion[0].caudal} m3/s</div>
            <div>Voltaje: {dato_migracion[0].voltaje} V</div>
          </Box>
        ) : (
          ''
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
      <Box sx={{ width: '100%' }}>
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
        </MapContainer>
      </Box>
    </Grid>
  );
};