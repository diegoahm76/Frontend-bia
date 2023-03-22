import { Popup } from "react-leaflet";
import { useNavigate } from "react-router";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MarkerPopup = (props) => {
  const navigate = useNavigate();
  const RedirectLink = (data) => {
    debugger
    navigate('/dashboard/recurso-hidrico/estaciones/DashboardEstaciones/'+ data.OBJECTID)
  }
  return (
    <Popup>
      <div className="row">
        <div><strong>Dirección viento: </strong>{props.data.Dirección_Viento}</div>
        <div><strong>Estado: </strong>{props.data.Estado}</div>
        <div><strong>Humedad: </strong>{props.data.Humedad}</div>
        <div><strong>Luminosidad: </strong>{props.data.Luminosidad}</div>
        <div><strong>Nivel agua: </strong>{props.data.Nivel_Agua}</div>
        <div><strong>Precipitación: </strong>{props.data.Precipitación}</div>
        <div><strong>Presión: </strong>{props.data.Presión}</div>
        <div><strong>Temperatura: </strong>{props.data.Temperatura}</div>
        <div><strong>Velocidad agua: </strong>{props.data.Velocidad_Agua}</div>
        <div><strong>Velocidad viento: </strong>{props.data.Velocidad_Viento}</div>
        <div><strong>Fecha: </strong>{props.data.fecha}</div>
      </div>
      <div className="row">
      <button className="btn btn-primary" type="button" title="Más información" onClick={() => RedirectLink(props.data)}> Más información </button>
      </div>
    </Popup>
  );
};
