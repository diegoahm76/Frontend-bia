/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { Button, Dialog, Grid, } from '@mui/material';
import { api } from '../../../../api/axios';
import { Title } from '../../../../components';
import SaveIcon from '@mui/icons-material/Save';
import React, { useEffect, useState } from 'react';
import { MenuItem } from '@mui/material';
import { control_error, control_success } from '../../../../helpers';
import dayjs from 'dayjs';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';

interface BuscarProps {
    is_modal_active: any;
    set_is_modal_active: any;
    fetchConfiguraciones: any;
}


export interface Variable {
    id_variables: number;
    nombre: string;
    tipo_cobro: number;
    tipo_renta: number;
}
interface ConfiguracionBasica {
    fecha_fin: any;
    valor: any;
    variables: any;
    descripccion: any;
    fecha_inicio: any
}
export const CrearConceptoPago: React.FC<BuscarProps> = ({ fetchConfiguraciones, is_modal_active, set_is_modal_active }) => {
    const [selectedConfiguracion, setSelectedConfiguracion] = useState<ConfiguracionBasica | null>(null);


    useEffect(() => {
        void fetchConfiguraciones();
    }, []);

    //// editar tipos de cobro 
    const [formValues, setFormValues] = useState<ConfiguracionBasica>({
        valor: selectedConfiguracion?.valor || "",
        fecha_fin: selectedConfiguracion?.fecha_fin || "",
        fecha_inicio: selectedConfiguracion?.fecha_inicio || "",
        variables: selectedConfiguracion?.variables || "",
        descripccion: selectedConfiguracion?.descripccion || "",
    });


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };


    useEffect(() => {
        if (selectedConfiguracion) {
            setFormValues(selectedConfiguracion);
        }
    }, [selectedConfiguracion]);
    //crear 
    const handleSubmitCrear = async () => {
        try {
            const url = "/recaudo/configuracion_baisca/valoresvariables/post/";
            const response = await api.post(url, formValues);
            //  console.log('')("Configuración básica creada con éxito", response.data);
            fetchConfiguraciones()
            control_success("Guardado exitosamente");
        } catch (error: any) {
            //  console.log('')(error.response.data.detail.detail);
            control_error(error.response.data.detail?.error);
        }
    };
    //////
    const [variables, setVariables] = useState<Variable[]>([]);

    const fetchVariables = async () => {
        try {
            const res = await api.get("/recaudo/configuracion_baisca/variables/get/");
            setVariables(res.data.data);
        } catch (error) {
            console.error("Error al obtener las variables", error);
        }
    };

    useEffect(() => {
        fetchVariables();
    }, []);

    useEffect(() => {
        if (is_modal_active) {
            fetchVariables();
        }
    }, [is_modal_active]);

    // fecha de finalizacion 
    const [fechaFin, setFechaFin] = useState((formValues.fecha_fin));
    const today = dayjs();

    const handle_close = (): void => {
        set_is_modal_active(false);
    };

    return (

        <>
            <Dialog open={is_modal_active} onClose={handle_close} maxWidth="xl"
            >
                {/* <button onClick={() => //  console.log('')(tiposCobro)}>Mostrar zonahidrica en la consola</button> */}
                <Grid container
                    item
                    xs={12}
                    marginLeft={2}
                    marginRight={2}
                    marginTop={3}
                    sx={{
                        position: 'relative',
                        background: '#FAFAFA',
                        borderRadius: '15px',
                        p: '20px', m: '10px 0 20px 0', mb: '20px',
                        boxShadow: '0px 3px 6px #042F4A26',
                    }}
                >
                    <Title title="Crear" />
                    <Grid container item xs={12} spacing={2} marginTop={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                select
                                required
                                fullWidth
                                size="small"
                                label="Variable"
                                name="variables"
                                variant="outlined"
                                onChange={handleInputChange}
                                value={formValues.variables}
                            >
                                {variables.map((variable) => (
                                    <MenuItem key={variable.id_variables} value={variable.id_variables}>
                                        {variable.nombre}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                fullWidth
                                size="small"
                                name="valor"
                                label="valor"
                                variant="outlined"
                                onChange={handleInputChange}
                                value={formValues.valor}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                fullWidth
                                size="small"
                                variant="outlined"
                                name="descripccion"
                                label="descripccion"
                                onChange={handleInputChange}
                                value={formValues.descripccion}
                            />
                        </Grid>
                        {/* 
                        <Grid item xs={12} sm={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Fecha fin"
                                    value={fechaFin}
                                    onChange={(newValue) => {
                                        setFechaFin(newValue);
                                        setFormValues({ ...formValues, fecha_fin: newValue?.format('YYYY-MM-DD') });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            required
                                            fullWidth
                                            size="small"
                                            {...params}
                                        />
                                    )}
                                    // Establecer la fecha mínima como la fecha actual
                                    minDate={today}
                                />
                            </LocalizationProvider>
                        </Grid> */}

                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                type="date"
                                size="small"
                                variant="outlined"
                                name="fecha_inicio"
                                label="fecha inicio"
                                onChange={handleInputChange}
                                value={formValues.fecha_inicio}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>


                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                type="date"
                                size="small"
                                name="fecha_fin"
                                variant="outlined"
                                label="fecha fin"
                                value={formValues.fecha_fin}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid
                            item
                            xs={7}
                            container
                            direction="row"
                            alignItems="center"
                            justifyContent="flex-end"
                        >
                            <Grid item  >
                                <Button
                                    color="success"
                                    variant="contained"
                                    startIcon={<SaveIcon />}
                                    onClick={() => { handleSubmitCrear(); }}
                                >
                                    Guardar
                                </Button>
                            </Grid>

                        </Grid>




                    </Grid>
                </Grid>
            </Dialog>
        </>
    );
};