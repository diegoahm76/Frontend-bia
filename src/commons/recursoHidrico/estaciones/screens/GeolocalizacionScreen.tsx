import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const GeolocalizacionScreen: React.FC = () => {
  return (
    <div>
      <MapContainer
        center={[4.258179477894017, -73.60700306515551]}
        zoom={8}
        style={{ height: '100vh' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
};
