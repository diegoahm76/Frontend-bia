
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { api } from '../../../../api/axios';
import { useState } from 'react';


const position: L.LatLngExpression = [4.258179477894017, -73.60700306515551];
const [datas, set_datos]=useState(null);
const datos = async () => {
  let { data } = await api.get("estaciones/datos/consultar-datos/");
  console.log(data);
  set_datos(data);
}
// eslint-disable-next-line @typescript-eslint/no-var-requires
const icono: string = require("../assets/icons/locate.svg").default;

const icon_locate = new L.Icon({
  iconUrl: icono,
  iconSize: [45,45]
});

useEffect (() => {
  datos();
},[]);


// eslint-disable-next-line @typescript-eslint/naming-convention
export const GeolocalizacionScreen: React.FC = () => {

  return (
    <div>
      <MapContainer
        center={position}
        zoom={8}
        style={{ height: '400px' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={icon_locate}>
        {/* <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup> */}
      </Marker>
      </MapContainer>

    </div>
  );
};
