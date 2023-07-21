import { Box, Grid, TextField } from "@mui/material";
import { Title } from "../../../../../../components/Title";
import { api } from "../../../../../../api/axios";
import { useEffect, useState } from "react";

interface IDataentidad {
    id_persona: number;
    tipo_documento: string;
    numero_documento: string;
    digito_verificacion: string;
    razon_social: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MostrarEntidad: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const initialStateArray: IDataentidad = {
        id_persona: 0,
        tipo_documento: "",
        numero_documento: "",
        digito_verificacion: "",
        razon_social: "",
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [dataEntidad, setdataEntidad] = useState(initialStateArray);

    const { numero_documento, digito_verificacion, tipo_documento, razon_social } = dataEntidad;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const fetchData = async (): Promise<void> => {
        const url = "transversal/configuracion/entidad/get/";
        try {
            const res = await api.get(url);
            setdataEntidad(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData().catch((error) => {
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
                <Title title="Entidad" />
                <Box component="form" sx={{ mt: "20px" }} noValidate autoComplete="off">
                    <Grid item container spacing={5}>
                        <Grid item xs={12} sm={6} md={3}>
                           
                            <TextField
                                label="   Tipo Documento ID"
                                variant="outlined"
                                size="small"
                                disabled
                                fullWidth
                                value={tipo_documento.toString()}
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
                        <Grid item xs={12} sm={6} md={3}>
                            
                            <TextField
                                label="DV"
                                variant="outlined"
                                size="small"
                                disabled
                                fullWidth
                                value={digito_verificacion.toString()}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          
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
