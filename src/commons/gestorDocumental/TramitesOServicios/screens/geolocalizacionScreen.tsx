/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Grid from '@mui/material/Grid';
import { Box, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const icono: string = require('../../../recursoHidrico/estaciones/assets/icons/locate.svg').default;
const icon_locate = new L.Icon({
  iconUrl: icono,
  iconSize: [35, 35],
});
const map_style = {
  height: "400px",
  width: "100%"
};
interface IProps {
  coordenada_x: any,
  coordenada_y: any
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Geolocalizacion: React.FC<IProps> = (props: IProps) => {
  const [position, set_position] = useState<any>([4.142,-73.62664]);
  useEffect(() => {
    if(props.coordenada_x !== "" && props.coordenada_y !== ""){
      set_position([parseFloat(props.coordenada_x),parseFloat(props.coordenada_y)]);
    }
  },[props])

  /*useEffect(() => {
    console.log(props);
      console.log(position);
  },[position]);*/
  
  return (
    <>
        <Grid item xs={12} sx={{ marginTop: '1.8rem' }}>
          <MapContainer
            center={position}
            zoom={10}
            style={map_style}
            scrollWheelZoom={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            />
            <Marker
              position={position}
              icon={icon_locate}
              autoPanOnFocus={true}
            >
              <Popup>
                <Typography text-align="center">
                  <strong>Ubicación</strong>
                </Typography>
                <Divider className="divider2" sx={{ m: '10px 0' }} />
                <Box>
                  Latitud: {position[0]} <br />
                  Longitud: {position[1]} <br /><br />
                </Box>
              </Popup>
            </Marker>
          </MapContainer>
        </Grid>
    </>
  );
};