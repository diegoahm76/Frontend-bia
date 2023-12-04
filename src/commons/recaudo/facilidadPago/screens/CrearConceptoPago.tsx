/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { Divider, Button, Dialog, Grid, } from '@mui/material';
import { TextField } from '@mui/material';
import { api } from '../../../../api/axios';
import { Title } from '../../../../components';
import SaveIcon from '@mui/icons-material/Save';
import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { control_error, control_success } from '../../../../helpers';
import { Variable } from '../../interfaces/liquidacion';


interface BuscarProps {
    is_modal_active: any;
    set_is_modal_active: any;
    fetchConfiguraciones: any;
}
interface ConfiguracionBasicaForm {
    Estado: boolean | null;
    TipoRenta: string;
    TipoCobro: string;
    Descripcion: string;
    Variable:any
    Constante:boolean | null;
}
export const CrearConceptoPago: React.FC<BuscarProps> = ({ fetchConfiguraciones, is_modal_active, set_is_modal_active }) => {

    const initialState: ConfiguracionBasicaForm = {
        Estado: null,
        TipoRenta: "",
        TipoCobro: "",
        Descripcion: "",
        Variable: "",
        Constante: null,
    };
    const [formValues, setFormValues] = useState<ConfiguracionBasicaForm>(initialState);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const url = "/recaudo/configuracion_baisca/registrosconfiguracion/post/";
            const response = await api.post(url, formValues);
            console.log("Configuración básica creada con éxito", response.data);
            fetchConfiguraciones()
            control_success("Guardado exitosamente");
            handle_close();
            setFormValues(initialState)
            // Restablecer formulario u otras acciones tras el éxito
        } catch (error: any) {
            // console.error("Error al crear la configuración básica", error);
            console.log(error.response.data.detail.detail);
            control_error(error.response.data.detail?.error);
            // Manejar el error
        }
    };
    const handle_close = (): void => {
        set_is_modal_active(false);
    };
    return (

        <>
            <Dialog open={is_modal_active} onClose={handle_close} maxWidth="xl"
            >
                {/* <button onClick={() => console.log(tipoRio)}>Mostrar zonahidrica en la consola</button> */}

                <Grid container
                    item xs={12} marginLeft={2} marginRight={2} marginTop={3}
                    sx={{

                        width: '900px', // Cambia '700px' por el ancho que desees
                        height: '900px', // Cambia '500px' por el alto que desees
                        position: 'relative',
                        background: '#FAFAFA',
                        borderRadius: '15px',
                        p: '20px', m: '10px 0 20px 0', mb: '20px',
                        boxShadow: '0px 3px 6px #042F4A26',
                    }}
                >
                    <Title title="Crear conceptos de pago " />
                    <Grid container item xs={12} spacing={2} marginTop={2}>


                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                size="small"
                                required
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                label="Tipo de Renta"
                                name="TipoRenta"
                                value={formValues.TipoRenta}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                size="small"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                label="Tipo de Cobro"
                                name="TipoCobro"
                                required
                                value={formValues.TipoCobro}
                                onChange={handleInputChange}
                            />
                        </Grid>
                      
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                size="small"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                label="Tipo de Variable"
                                name="Variable"
                                required
                                value={formValues.Variable}
                                onChange={handleInputChange}
                            />
                        </Grid>



                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth required size="small">
                                <InputLabel>Estado</InputLabel>
                                <Select
                                    labelId="estado-label"
                                    id="estado-select"
                                    inputProps={{ shrink: true }}
                                    value={formValues.Estado }
                                    label="Estado"
                                    onChange={(event) => setFormValues({ ...formValues, Estado: event.target.value === 'true' })}
                                >
                                     <MenuItem value={""}></MenuItem>
                                    <MenuItem value={'true'}>Activo</MenuItem>
                                    <MenuItem value={'false'}>Inactivo</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>


                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth required size="small">
                                <InputLabel>Constante</InputLabel>
                                <Select
                                   
                                    inputProps={{ shrink: true }}
                                    value={formValues.Constante }
                                    label="Constante"
                                    onChange={(event) => setFormValues({ ...formValues, Constante: event.target.value === 'true' })}
                                >
                                     <MenuItem value={""}></MenuItem>
                                    <MenuItem value={'true'}>Constante</MenuItem>
                                    <MenuItem value={'false'}>No Constante</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                size="small"
                                required
                                multiline
                                rows={3}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                label="Descripción"
                                name="Descripcion"
                                value={formValues.Descripcion}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button color='success'
                                variant='contained'
                                startIcon={<SaveIcon />}
                                onClick={handleSubmit}
                            >
                                Guardar
                            </Button>
                        </Grid>


                    </Grid>
                </Grid> 
            </Dialog> 
        </>
    );
};