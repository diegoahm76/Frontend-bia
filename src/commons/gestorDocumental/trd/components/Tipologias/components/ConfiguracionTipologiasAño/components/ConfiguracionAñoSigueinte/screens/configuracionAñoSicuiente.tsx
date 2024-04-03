/* eslint-disable @typescript-eslint/naming-convention */
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../../../../../../../../../../api/axios";
import { Title } from "../../../../../../../../../../components/Title";
import { Persona } from "../../../../../../../../WorkFlowPQRSDF/interface/IwordFlow";
import { control_error, control_success } from "../../../../../../../../../../helpers";
import SaveIcon from "@mui/icons-material/Save";
import { useSelector } from "react-redux";
import { AuthSlice } from "../../../../../../../../../auth/interfaces/authModels";
import { BotonInfo } from "../utils/BotonInfo";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useNavigate } from "react-router-dom";

export const AñoConfiguracionAñoSiguiente = () => {


    const navigate = useNavigate();

    const [tipologia_documental, setTipologiaDocumental] = useState<any>(null);
    const { userinfo: { id_persona } } = useSelector((state: AuthSlice) => state.auth);

    const initialFormValues = {
        id_tipologia_documental: "",
    };

    const [Formulario_Empresa, setFormularioEmpresa] = useState(initialFormValues);


    const handleCompletarDatos = (field: string, value: string) => {
        setFormularioEmpresa({
            ...Formulario_Empresa,
            [field]: value,
        });
    };

    const fetchTipologiaDocumental = async (): Promise<void> => {
        try {
            const url = `/gestor/plantillas/tipos_tipologia/get/`;
            const res: any = await api.get(url);
            const numero_consulta: any = res.data.data;
            setTipologiaDocumental(numero_consulta);
        } catch (error) {
            console.error(error);
        }
    };


    const getCurrentDate = () => {
        return new Date().toISOString().split('T')[0];
    };

    const handlePostRequest = async () => {
        try {
            const url = '/gestor/trd/configuracion-tipologia/administrador-numeros-tipologias/';
            const requestBody = {
                id_tipologia_documental: +Formulario_Empresa.id_tipologia_documental,
                fecha_actual: getCurrentDate(),  // Obtiene la fecha actual en formato YYYY-MM-DD
            };

            const response = await api.post(url, requestBody);
            control_success(response.data.detail);  // Puedes manejar la respuesta según tus necesidades
        } catch (error: any) {
            control_error(error.response.data.detail);  // Ajusta según la estructura del error
        }
    };







    useEffect(() => {
        fetchTipologiaDocumental().catch((error) => {
            console.error(error);
        });
    }, []);



    return (
        <>
            <Grid
                container
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >
                <Grid item xs={12}>
                    <Title title="Configuracion de Tipologias para Año Siguiente" />
                </Grid>


                <Grid item xs={12}>
                    <Grid container justifyContent="flex-end" alignItems="center">
                        <Grid item xs={1} >

                            <BotonInfo />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container spacing={1} style={{ margin: 1 }}>
                    <Grid item xs={12} sm={7}>
                        <FormControl fullWidth>
                            <InputLabel id="choise-label">Selecciona tipología documental</InputLabel>
                            <Select
                                id="demo-simple-select-2"
                                name="id_tipologia_documental"
                                style={{ width: "95%", marginTop: 0 }}
                                label="Selecciona tipología documental"
                                value={Formulario_Empresa.id_tipologia_documental || ""}
                                onChange={(e) => handleCompletarDatos("id_tipologia_documental", e.target.value)}
                            >
                                {tipologia_documental?.map((item: any, index: number) => (
                                    <MenuItem key={index} value={item.id_tipologia_documental}>
                                        {item.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>



                    <Grid item xs={12} sm={5}>
                        <TextField
                            variant="outlined"
                            size="medium"
                            fullWidth
                            disabled
                            label="Fecha Actual"
                            value={getCurrentDate()}
                            style={{ marginTop: 0, width: '95%' }}
                        />
                    </Grid>



                    <Grid container justifyContent="flex-end" alignItems="center">

                        <Grid item xs={12} md={3}>
                            <Button
                                style={{ marginTop: 25 ,width:"90%"}}
                                color="error"
                                variant="contained"
                                startIcon={<ArrowOutwardIcon />}
                                onClick={() => {
                                    navigate(
                                        "/app/gestor_documental/configuracion_datos_basicos/configuracion/tipologuia_actual"
                                    );
                                }}
                            >
                                Configuracion de Tipologias   Año Actual
                            </Button>
                        </Grid>




                        <Grid item xs={12} sm={4} md={2.4} >
                            <Button
                                startIcon={<SaveIcon />}
                                style={{ width: "90%", marginTop: 25 }}
                                color="success" // Cambia el color según si es una actualización o creación
                                fullWidth
                                variant="contained"
                                onClick={handlePostRequest} >
                                Guardar Configuración
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </>
    );
};
