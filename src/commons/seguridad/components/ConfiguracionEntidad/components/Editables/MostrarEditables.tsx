import { useEffect, useState } from "react";
import { Box, Grid, TextField } from "@mui/material";
import { ModalEditarCargo } from "./ModalEditable/MotdalEditable";
import { InputText } from 'primereact/inputtext';
import { Title } from "../../../../../../components/Title";
import { api } from "../../../../../../api/axios";
import type { IconfiguracionEntidad } from "../../interfaces/interfacesConEntidad"; // <-- Use import type here
import { MostrrModalHistorico } from "./ModalHistorico/ModalHistroico";
import { ModificadorFormatoFecha } from "../../utils/modificadorForematoFecha";

const initial_state: IconfiguracionEntidad = {
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
export const MostrarEditables: React.FC = () => {
    const [data_entidad, setdata_entidad] = useState<IconfiguracionEntidad>(initial_state);
    const [data_nombre, setdata_nombre] = useState<string[]>([]);



    // Fetch data for the entity configuration
    const fetch_data_get = async (): Promise<void> => {
        try {
            const url = "/transversal/configuracion/configuracionEntidad/3/";
            const res = await api.get(url);
            const facilidad_pago_data = res.data.data;
            setdata_entidad(facilidad_pago_data[0]);
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch data for a specific person by ID
    const fetch_data = async (personaId: number): Promise<string> => {
        try {
            const url = `personas/get-by-id/${personaId}/`;
            const res = await api.get(url);
            const datos = res.data.data;
            const { primer_nombre, primer_apellido } = datos;
            const full_name = `${String(primer_nombre)} ${String(primer_apellido)}`;
            return full_name;
        } catch (error) {
            console.error(error);
            return "";
        }
    };

    // Fetch data for all the persons and update data_nombre
    const traer_personas_por_id = async (): Promise<void> => {
        try {
            const persona_ids = [
                data_entidad.id_persona_director_actual,
                data_entidad.id_persona_coord_almacen_actual,
                data_entidad.id_persona_respon_transporte_actual,
                data_entidad.id_persona_coord_viveros_actual,
                data_entidad.id_persona_almacenista,
            ];

            const promises = persona_ids.map(async (id) => {
                if (id !== 0 && id !== null) {
                    return await fetch_data(id);
                } else {
                    return '';
                }
            });
            const results = await Promise.all(promises);
            setdata_nombre(results);
        } catch (error) {
            console.error(error);
        }
    };


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
    } = data_entidad;

    // Extract the values for each role from data_nombre
    const director = data_nombre[0] !== undefined ? data_nombre[0] : "";
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const Coordinadoalmacen = data_nombre[1] !== undefined ? data_nombre[1] : "";
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const Coordinadorviveros = data_nombre[2] !== undefined ? data_nombre[2] : "";
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const Coordinadortransporte = data_nombre[3] !== undefined ? data_nombre[3] : "";
    const almacenista = data_nombre[4] !== undefined ? data_nombre[4] : "";

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [variable, setvariable] = useState<boolean>(false);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const handleButtonClick = (): void => setvariable(true);

    useEffect(() => {
        void traer_personas_por_id();
    }, [variable]);

    useEffect(() => {
        fetch_data_get().catch(console.error);
        setvariable(false);
    }, [variable]);

    // Fetch entity configuration data on component mount
    useEffect(() => {
        fetch_data_get().catch(console.error);
    }, []);

    // Update data_nombre whenever data_entidad changes
    useEffect(() => {
        void traer_personas_por_id();
    }, [data_entidad]);



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
                <Title title="Agregar perfiles" />
            </Grid>
            <Box component="form" sx={{ mt: "5px", padding: 3 }} noValidate autoComplete="off">
                <Grid item container spacing={7}>
                    <Grid item xs={12} sm={6}>
                        {/* TextField for the Director */}
                        <TextField
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            label="Director"
                            value={director}
                            onClick={(): void => { fetch_data(id_persona_director_actual) }}
                        />

                        <Box style={{ display: 'flex' }}>
                            <ModalEditarCargo name={data_nombre[0]} fecha={fecha_inicio_dir_actual} titlee={"Director"} cod={1} onClick={handleButtonClick} />
                            <MostrrModalHistorico cargo={"Director"} codig={1} />
                        </Box>

                        <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <label>Registrado desde </label>
                            <InputText
                                type="text"
                                disabled
                                className="p-inputtext-sm"
                                placeholder={ModificadorFormatoFecha(fecha_inicio_dir_actual)}
                                style={{ margin: 0, height: 15, width: 90 }}
                            />
                        </Box>
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
                            onClick={(): void => { fetch_data(id_persona_coord_almacen_actual)}}
                        />

                        <Box style={{ display: 'flex' }}>
                            <ModalEditarCargo name={data_nombre[1]} fecha={fecha_inicio_coord_alm_actual} titlee={"Coordinador de Almacen"} cod={2} onClick={handleButtonClick} />
                            <MostrrModalHistorico cargo={"Coordinador de Almacen"} codig={2} />
                        </Box>



                        <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <label>Registrado desde</label>
                            <InputText
                                type="text"
                                disabled
                                className="p-inputtext-sm"
                                placeholder={ModificadorFormatoFecha(fecha_inicio_coord_alm_actual)}
                                style={{ margin: 0, height: 15, width: 90 }}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        {/* TextField para el Coordinador de Viveros */}
                        <TextField
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            label="Coordinador de Transporte"
                            value={Coordinadorviveros}
                            onClick={(): void => { fetch_data(id_persona_coord_viveros_actual) }}
                        />


                        <Box style={{ display: 'flex' }}>
                            <ModalEditarCargo name={data_nombre[2]} fecha={fecha_inicio_coord_viv_actual} titlee={"Coordinador de Transporte"} cod={3} onClick={handleButtonClick} />
                            <MostrrModalHistorico cargo={"Coordinador de Transporte"} codig={3} />
                        </Box>



                        <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <label>Registrado desde</label>
                            <InputText
                                type="text"
                                disabled
                                className="p-inputtext-sm"
                                placeholder={ModificadorFormatoFecha(fecha_inicio_coord_viv_actual)}
                                style={{ margin: 0, height: 15, width: 90 }}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        {/* TextField para el Coordinador de Transporte */}
                        <TextField
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            label="Coordinador de Viveros"
                            value={Coordinadortransporte}
                            onClick={(): void => { fetch_data(id_persona_respon_transporte_actual)}} />


                        <Box style={{ display: 'flex' }}>
                            <ModalEditarCargo name={data_nombre[3]} fecha={fecha_inicio_respon_trans_actual} titlee={"Coordinador de Viveros"} cod={4} onClick={handleButtonClick} />
                            <MostrrModalHistorico cargo={"Coordinador de Viveros"} codig={4} />
                        </Box>




                        <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <label>Registrado desde</label>
                            <InputText
                                type="text"
                                className="p-inputtext-sm"
                                disabled
                                placeholder={ModificadorFormatoFecha(fecha_inicio_respon_trans_actual)}
                                style={{ margin: 0, height: 15, width: 90 }}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        {/* TextField para el Almacenista */}
                        <TextField
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            label="Almacenista"
                            value={almacenista}
                            onClick={(): void => { fetch_data(id_persona_almacenista)}} />

                        <Box style={{ display: 'flex' }}>
                            <ModalEditarCargo name={data_nombre[4]} fecha={fecha_inicio_almacenista} titlee={"Almacenista"} cod={5} onClick={handleButtonClick} />
                            <MostrrModalHistorico cargo={"Almacenista"} codig={5} />
                        </Box>

                        <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <label>Registrado desde</label>
                            <InputText
                                type="text"
                                className="p-inputtext-sm"
                                disabled
                                placeholder={ModificadorFormatoFecha(fecha_inicio_almacenista)}
                                style={{ margin: 0, height: 15, width: 90 }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
};


