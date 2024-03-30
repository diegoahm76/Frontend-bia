import { Box, Grid, TextField } from "@mui/material";
import { Title } from "../../../../../../components/Title";
import { api } from "../../../../../../api/axios";
import { useEffect, useState } from "react";
import { control_error } from "../../../SucursalEntidad/utils/control_error_or_success";
import type { IDataentidad } from "../../interfaces/interfacesConEntidad";



// eslint-disable-next-line @typescript-eslint/naming-convention
export const MostrarEntidad: React.FC = () => {
    const initial_state_array: IDataentidad = {
        id_persona: 0,
        nombre_tipo_documento: "",
        numero_documento: "",
        digito_verificacion: "",
        razon_social: "",
    };

    const [data_entidad, setdata_entidad] = useState(initial_state_array);

    const { numero_documento, digito_verificacion, razon_social, nombre_tipo_documento } = data_entidad;

    const fetch_data = async (): Promise<void> => {
        const url = "transversal/configuracion/entidad/get/";
        try {
            const res = await api.get(url);
            setdata_entidad(res.data.data);
          
        } catch (error: any) {
            control_error(error.response.data.detail);
        }
    };

    useEffect(() => {
        fetch_data().catch((error) => {
            console.error(error);
        });
    }, []);

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
                <Title title="Configuración de la Entidad" />
                <Box component="form" sx={{ mt: "20px" }} noValidate autoComplete="off">
                    <Grid item container spacing={5}>
                        <Grid item xs={12} sm={6} md={2}>

                            <TextField
                                label="   Tipo Documento ID"
                                variant="outlined"
                                size="small"
                                disabled
                                fullWidth
                                value={nombre_tipo_documento.toString()}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>

                            <TextField
                                label=" Num Documento ID"
                                variant="outlined"
                                size="small"
                                disabled
                                fullWidth
                                value={numero_documento.toString()}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={1}>

                            <TextField
                                label="DV"
                                variant="outlined"
                                size="small"
                                disabled
                                fullWidth
                                value={digito_verificacion.toString()}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>

                            <TextField
                                label="Nombre"
                                variant="outlined"
                                size="small"
                                disabled
                                fullWidth
                                value={razon_social.toString()}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};
