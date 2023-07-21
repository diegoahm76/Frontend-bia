import { Box, Grid, TextField } from "@mui/material";
import { ModalEditarCargo } from "./ModalEditable/MotadlEditable";
import { InputText } from "primereact/inputtext";
import { Title } from "../../../../../../components/Title";
import { useEffect, useState } from "react";
import { api } from "../../../../../../api/axios";

interface ISucursalEmpresa {
    email_corporativo_sistema: string;
    fecha_inicio_dir_actual: string;
    fecha_inicio_coord_alm_actual: string;
    fecha_inicio_respon_trans_actual: string;
    fecha_inicio_coord_viv_actual: string;
    fecha_inicio_almacenista: string;
    id_persona_director_actual: number;
    id_persona_coord_almacen_actual: number;
    id_persona_respon_transporte_actual: number;
    id_persona_coord_viveros_actual: number;
    id_persona_almacenista: number;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MostrarEditables: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const initialState: ISucursalEmpresa = {
        email_corporativo_sistema: "",
        fecha_inicio_dir_actual: "",
        fecha_inicio_coord_alm_actual: "",
        fecha_inicio_respon_trans_actual: "",
        fecha_inicio_coord_viv_actual: "",
        fecha_inicio_almacenista: "",
        id_persona_director_actual: 0,
        id_persona_coord_almacen_actual: 0,
        id_persona_respon_transporte_actual: 0,
        id_persona_coord_viveros_actual: 0,
        id_persona_almacenista: 0,
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [dataEntidad, setDataEntidad] = useState<ISucursalEmpresa>(initialState);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [dataNombre, setDataNombre] = useState<string[]>([]);
    // console.log(dataNombre);

    const {
        fecha_inicio_dir_actual,
        fecha_inicio_coord_alm_actual,
        fecha_inicio_respon_trans_actual,
        fecha_inicio_coord_viv_actual,
        fecha_inicio_almacenista,
        id_persona_director_actual,
        id_persona_coord_almacen_actual,
        id_persona_respon_transporte_actual,
        id_persona_coord_viveros_actual,
        id_persona_almacenista,
    } = dataEntidad;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const fetchDataGet = async (): Promise<any> => {
        try {
            const url = "/transversal/configuracion/configuracionEntidad/3/";
            const res = await api.get(url);
            const facilidad_pago_data = res.data.data;
            setDataEntidad(facilidad_pago_data[0]);
        } catch (error) {
            console.error(error);
        }
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const fetchData = async (personaId: number): Promise<any> => {
        try {
            const url = `personas/get-by-id/${personaId}/`;
            const res = await api.get(url);
            const datos = res.data.data;
            const { primer_nombre, primer_apellido } = datos;
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const fullName = `${String(primer_nombre)} ${String(primer_apellido)}`;
            return fullName;
        } catch (error) {
            console.error(error);
            return "";
        }
    };

    useEffect(() => {
        fetchDataGet().catch(console.error);
    }, []);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const fetchDataAndUpdateDataNombre = async (): Promise<any> => {
        try {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const personaIds = [
                id_persona_director_actual,
                id_persona_coord_almacen_actual,
                id_persona_respon_transporte_actual,
                id_persona_coord_viveros_actual,
                id_persona_almacenista,
            ];

            const promises = personaIds.map(async (id) => await fetchData(id));
            const results = await Promise.all(promises);
            // console.log(results); // Mostrar el resultado en la consola
            setDataNombre(results);
        } catch (error) {
            console.error(error);
            return "";
        }
    };
    useEffect(() => {
        void fetchDataAndUpdateDataNombre();
    }, [dataEntidad]);


    // eslint-disable-next-line @typescript-eslint/naming-convention
    const director = dataNombre[0] !== undefined ? dataNombre[0] : "";
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const Coordinadoalmacen = dataNombre[1] !== undefined ? dataNombre[1] : "";
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const Coordinadorviveros = dataNombre[2] !== undefined ? dataNombre[2] : "";
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const Coordinadortransporte = dataNombre[3] !== undefined ? dataNombre[3] : "";
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const Almacenista = dataNombre[4] !== undefined ? dataNombre[4] : "";

    return (
        <Grid
            container
            sx={{
                position: "relative",
                background: "#FAFAFA",
                borderRadius: "15px",
                p: "20px",
                mb: "20px",
                boxShadow: "0px 3px 6px #042F4A26",
            }}
        >
            <Grid item md={12} xs={12}>
                {/* Título */}
                <Title title="Editar Cargos" />
            </Grid>
            <Box component="form" sx={{ mt: "5px", padding: 3 }} noValidate autoComplete="off">
                <Grid item container spacing={7}>
                    <Grid item xs={12} sm={6}>
                        {/* TextField para el Director */}
                        <TextField
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            label="Director"
                            value={director}
                            onClick={(): void => { fetchData(id_persona_director_actual).then(console.log).catch(console.error) }}
                        />
                        <ModalEditarCargo name={dataNombre[0]} fecha={fecha_inicio_dir_actual} titlee={"Director"} />
                        <label>Registrado desde</label>
                        <InputText
                            type="text"
                            className="p-inputtext-sm"
                            placeholder={fecha_inicio_dir_actual}
                            style={{ margin: 3, height: 10, width: "30%" }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        {/* TextField para el Coordinador de Almacen */}
                        <TextField
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            label="Coordinador de Almacen"
                            value={Coordinadoalmacen}
                            onClick={(): void => { fetchData(id_persona_coord_almacen_actual).then(console.log).catch(console.error) }}
                        />
                        <ModalEditarCargo name={dataNombre[1]} fecha={fecha_inicio_coord_alm_actual} titlee={"Coordinador de Almacen"} />
                        <label>Registrado desde</label>
                        <InputText
                            type="text"
                            className="p-inputtext-sm"
                            placeholder={fecha_inicio_coord_alm_actual}
                            style={{ margin: 3, height: 10, width: "30%" }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        {/* TextField para el Coordinador de Viveros */}
                        <TextField
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            label="Coordinador de Viveros"
                            value={Coordinadorviveros}
                            onClick={(): void => { fetchData(id_persona_coord_viveros_actual).then(console.log).catch(console.error) }}
                        />
                        <ModalEditarCargo name={dataNombre[2]} fecha={fecha_inicio_coord_viv_actual} titlee={"Coordinador de Viveros"} />
                        <label>Registrado desde</label>
                        <InputText
                            type="text"
                            className="p-inputtext-sm"
                            placeholder={fecha_inicio_coord_viv_actual}
                            style={{ margin: 3, height: 10, width: "30%" }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        {/* TextField para el Coordinador de Transporte */}
                        <TextField
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            label="Coordinador de Transporte"
                            value={Coordinadortransporte}
                            onClick={(): void => { fetchData(id_persona_respon_transporte_actual).then(console.log).catch(console.error) }} />
                        <ModalEditarCargo name={dataNombre[3]} fecha={fecha_inicio_respon_trans_actual} titlee={"Coordinador de Transporte"} />
                        <label>Registrado desde</label>
                        <InputText
                            type="text"
                            className="p-inputtext-sm"
                            placeholder={fecha_inicio_respon_trans_actual}
                            style={{ margin: 3, height: 10, width: "30%" }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        {/* TextField para el Almacenista */}
                        <TextField
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            label="Almacenista"
                            value={Almacenista}
                            onClick={(): void => { fetchData(id_persona_almacenista).then(console.log).catch(console.error) }} />
                        <ModalEditarCargo name={dataNombre[4]} fecha={fecha_inicio_almacenista} titlee={"Almacenista"} />
                        <label>Registrado desde</label>
                        <InputText
                            type="text"
                            className="p-inputtext-sm"
                            placeholder={fecha_inicio_almacenista}
                            style={{ margin: 3, height: 10, width: "30%" }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
};
