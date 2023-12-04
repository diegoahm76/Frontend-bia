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
import { control_success_fail } from '../../../recursoHidrico/requets/Request';


interface BuscarProps {
    isBuscarActivo: any;
    setIsBuscarActivo: any;
    selectedConfiguracion: any;
    fetchConfiguraciones: any;
}
interface ConfiguracionBasica {
    id: number;
    Estado: boolean;
    TipoRenta: string;
    TipoCobro: string;
    Descripcion: string;
    Variable:any
    Constante:boolean | null;
}
export const ConceptoEditar: React.FC<BuscarProps> = ({ fetchConfiguraciones, isBuscarActivo, setIsBuscarActivo, selectedConfiguracion }) => {


    const [formValues, setFormValues] = useState<ConfiguracionBasica>({
        id: selectedConfiguracion?.id || 0,
        Estado: selectedConfiguracion?.Estado || false,
        TipoRenta: selectedConfiguracion?.TipoRenta || '',
        TipoCobro: selectedConfiguracion?.TipoCobro || '',
        Descripcion: selectedConfiguracion?.Descripcion || '',
        Variable: selectedConfiguracion?.Variable || '',
        Constante:selectedConfiguracion?.Constante || false,
    });

    useEffect(() => {
        if (selectedConfiguracion) {
            setFormValues(selectedConfiguracion);
        }
    }, [selectedConfiguracion]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const url = `/recaudo/configuracion_baisca/registrosconfiguracion/put/${formValues.id}/`;
            await api.put(url, formValues);
            fetchConfiguraciones();
            handle_close();
            control_success("Editaddo exitosamente ");

            // Agregar lógica adicional tras la actualización exitosa
        } catch (error: any) {
            console.error("Error al actualizar la configuración", error);
            control_error(error.response.data.detail);
            // Manejar el error
        }
    };



    const handle_close = (): void => {
        setIsBuscarActivo(false);
    };
    return (

        <>
            <Dialog open={isBuscarActivo} onClose={handle_close} maxWidth="xl"
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
                    <Title title="Editar conceptos de pago " />

                    <Grid container item xs={12} spacing={2} marginTop={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                size="small"
                                required
                                label="Tipo de Renta"
                                name="TipoRenta"
                                value={formValues.TipoRenta}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <TextField
                                variant="outlined"
                                size="small"
                                required
                                label="Tipo de Cobro"
                                name="TipoCobro"
                                value={formValues.TipoCobro}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth required size="small">
                                <InputLabel id="estado-label">Estado</InputLabel>
                                <Select
                                    labelId="estado-label"
                                    id="estado-select"
                                    value={formValues.Estado ? 'true' : 'false'}
                                    label="Estado"
                                    onChange={(event) => setFormValues({ ...formValues, Estado: event.target.value === 'true' })}
                                >
                                    <MenuItem value={'true'}>Activo</MenuItem>
                                    <MenuItem value={'false'}>Inactivo</MenuItem>
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
                                onClick={handleSubmit}>Guardar</Button>
                        </Grid>

                    </Grid>
                </Grid>
            </Dialog>
        </>
    );
};

