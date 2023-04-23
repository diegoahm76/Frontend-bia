// eslint-disable @typescript-eslint/no-non-null-assertion
import { useState } from "react";
import { type IcvVehicles } from "../../../../hojaDeVidaVehiculo/interfaces/CvVehiculo";
import { type crear_mantenimiennto } from "../../../interfaces/IProps";
const data_veh: IcvVehicles = {
  id_hoja_de_vida: 0,
  cod_tipo_vehiculo: "",
  tiene_platon: false,
  capacidad_pasajeros: 0,
  color: "",
  linea: "",
  tipo_combustible: "",
  es_arrendado: false,
  ultimo_kilometraje: 0,
  fecha_ultimo_kilometraje: 0,
  fecha_adquisicion: 0,
  fecha_vigencia_garantia: 0,
  numero_motor: "",
  numero_chasis: "",
  cilindraje: 0,
  transmision: "",
  dimension_llantas: 0,
  capacidad_extintor: 0,
  tarjeta_operacion: "",
  observaciones_adicionales: "",
  es_agendable: false,
  en_circulacion: false,
  fecha_circulacion: 0,
  ruta_imagen_foto: "",
  id_vehiculo_arrendado: null,
  id_proveedor: null,
  codigo_bien: "",
  nombre: "",
  doc_identificador_nro: "",
  id_marca: 0,
  marca: "",
  estado: "",
  tipo_vehiculo: "",
  id_articulo: 0
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const use_previsualizacion = () => {
    const [rows, set_rows] = useState<crear_mantenimiennto[]>([]);
    const [tipo_mantenimiento, set_tipo_mantenimiento] = useState<string>("");
    const [especificacion, set_especificacion] = useState<string>("");
    // const [modelo, set_modelo] = useState<string>("");
    // const [kilometraje, set_kilometraje] = useState<string>("");
    const [detalle_vehiculo, set_detalle_vehiculo] = useState<IcvVehicles>(data_veh);

    return {
        // States
        rows,
        detalle_vehiculo,
        tipo_mantenimiento,
        especificacion,
        // Edita States
        set_rows,
        set_detalle_vehiculo,
        set_tipo_mantenimiento,
        set_especificacion
      };
}
// eslint-disable-next-line no-restricted-syntax
export default use_previsualizacion;