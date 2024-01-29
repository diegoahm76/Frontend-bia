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

export const AñoConfiguracionAñoSiguiente = () => {
    const [tipologia_documental, setTipologiaDocumental] = useState<any>(null);
    const { userinfo: { id_persona } } = useSelector((state: AuthSlice) => state.auth);

    const initialFormValues = {
        id_tipologia_documental: "8",
        id_unidad_organizacional: "820",
    };

    const [Formulario_Empresa, setFormularioEmpresa] = useState(initialFormValues);
    const [persona, set_persona] = useState<Persona | undefined>();


    // const {
    //     id_persona,
    //     primer_nombre,
    //     segundo_nombre,
    //     primer_apellido,
    //     segundo_apellido,
    // } = persona ?? {};
    // const nombre_completo = `${primer_nombre ?? ''} ${segundo_nombre ?? ''} ${primer_apellido ?? ''} ${segundo_apellido ?? ''}`;
    // const nombre = nombre_completo ?? '';





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
                id_unidad_organizacional: +Formulario_Empresa.id_unidad_organizacional,
                id_persona: id_persona,  // Ajusta según tu sistema
                fecha_actual: getCurrentDate(),  // Obtiene la fecha actual en formato YYYY-MM-DD
            };

            const response = await api.post(url, requestBody);
        control_success(response.data.detail);  // Puedes manejar la respuesta según tus necesidades
        } catch (error: any) {
            control_error(error.response.data.detail);  // Ajusta según la estructura del error
        }
    };





    // const on_result = async (info_persona: Persona): Promise<void> => {
    //     set_persona(info_persona);
    // };


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
                    <Title title="Configuracion de Tipologias" />
                </Grid>


                {/* <Grid item xs={9} style={{ marginTop: 0 }}>
                    <BuscadorPersona
                        onResult={(data) => {
                            void on_result(data);
                        }}
                    />
                </Grid> */}


                <Grid item container spacing={1} style={{ margin: 1 }}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="choise-label">Selecciona tipología documental</InputLabel>
                            <Select
                                id="demo-simple-select-2"
                                name="id_tipologia_documental"
                                style={{ width: "95%", marginTop: 15 }}
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

                    <Grid item xs={12} sm={3}>
                        <TextField
                            variant="outlined"
                            size="medium"
                            fullWidth
                            label="id_unidad_organizacional"
                            value={Formulario_Empresa.id_unidad_organizacional}
                            onChange={(e) => handleCompletarDatos("id_unidad_organizacional", e.target.value)}
                            style={{ marginTop: 15, width: '90%' }}
                        />
                    </Grid>

                <Grid item xs={12} sm={3}>
                        <TextField
                            variant="outlined"
                            size="medium"
                            fullWidth
                            disabled
                            label="Fecha Actual"
                            value={getCurrentDate()}
                            style={{ marginTop: 15, width: '90%' }}
                        />
                    </Grid>
           

                <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                    <Button
                        startIcon={<SaveIcon />}
                        style={{ width: "90%", marginTop: 15 }}
                        color="success" // Cambia el color según si es una actualización o creación
                        fullWidth
                        variant="contained"
                        onClick={handlePostRequest} >
                        Guardar Configuración
                    </Button>
                </Grid>
            </Grid>                </Grid>

        </>
    );
};
