import {
    Box,
    Grid,
    TextField
} from "@mui/material"
import { useEffect } from "react";
import { type IcvVehicles } from "../../../hojaDeVidaVehiculo/interfaces/CvVehiculo";
import use_previsualizacion from "./hooks/usePrevisualizacion";
interface IProps {
    parent_details_veh: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const DetallesComponent: React.FC<IProps> = ({ parent_details_veh }) => {
    const {
        detalle_vehiculo,
        set_detalle_vehiculo
    } = use_previsualizacion();

    useEffect(() => {
        const data_veh: IcvVehicles = {
            id_hoja_de_vida: 10,
            codigo_bien: "110100100002",
            nombre: "prueba vehículo",
            doc_identificador_nro: "bbb111",
            id_marca: 0,
            marca: "HYUNDAI",
            cod_tipo_vehiculo: "",
            tiene_platon: true,
            capacidad_pasajeros: 4,
            color: "",
            linea: "",
            tipo_combustible: "",
            es_arrendado: false,
            ultimo_kilometraje: 35000,
            fecha_ultimo_kilometraje: 0,
            fecha_adquisicion: 0,
            fecha_vigencia_garantia: 0,
            numero_motor: "MO55543EE4444RRRR555TO56R",
            numero_chasis: "ERTY45Y67Y8UU9990",
            cilindraje: 4600,
            transmision: "",
            capacidad_extintor: 100,
            tarjeta_operacion: "",
            observaciones_adicionales: "",
            es_agendable: false,
            en_circulacion: true,
            fecha_circulacion: 0,
            ruta_imagen_foto: "",
            id_articulo: 170,
            id_vehiculo_arrendado: null,
            id_proveedor: null,
            estado: "Óptimo",
            dimension_llantas: 0,
            tipo_vehiculo: ""
        }
        set_detalle_vehiculo(data_veh);
    },[set_detalle_vehiculo]);
    
    useEffect(() => {
        parent_details_veh(detalle_vehiculo);
      }, [parent_details_veh, detalle_vehiculo]);


    return (
        <>
            <Box
                component="form"
                sx={{ mt: '20px' }}
                noValidate
                autoComplete="off"
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Marca"
                            helperText="Seleccione Marca"
                            size="small"
                            required
                            fullWidth
                            value={detalle_vehiculo.marca}
                            disabled={true}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Serial/Placa"
                            helperText="Seleccione Serial/Placa"
                            size="small"
                            required
                            fullWidth
                            value={detalle_vehiculo.numero_chasis}
                            disabled={true}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Modelo"
                            helperText="Seleccione Modelo"
                            size="small"
                            required
                            fullWidth
                            value={detalle_vehiculo.numero_motor}
                            disabled={true}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Kilometraje"
                            helperText="Seleccione Kilometraje"
                            size="small"
                            required
                            fullWidth
                            value={detalle_vehiculo.ultimo_kilometraje}
                            disabled={true}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
