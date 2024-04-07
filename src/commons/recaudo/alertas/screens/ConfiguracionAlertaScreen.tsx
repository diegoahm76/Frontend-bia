/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import { Title } from '../../../../components/Title';
import type { IObjConfiguracionAlerta } from '../interfaces/alerta';
import { Controller, useForm } from 'react-hook-form';
import FormSelectController from '../../../../components/partials/form/FormSelectController';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect } from 'react';
import { get_configuracion_alerta, } from '../store/thunks/alertas';
import FormInputController from '../../../../components/partials/form/FormInputController';
import { set_current_alerta } from '../store/slice/indexAlertas';
import ProgramacionRepeticiones from '../components/ProgramacionRepeticiones';
import Destinatario from '../components/Destinatario';
import Programacion_fechas from '../components/ProgramacionFecha';
import Configuracion from '../components/Configuracion';

// eslint-disable-next-line @typescript-eslint/naming-convention
const ConfiguracionAlertasScreen = () => {
    const { control: control_configuracion, reset, watch } = useForm<IObjConfiguracionAlerta>();

    const dispatch = useAppDispatch();
    const { configuraciones, current_configuracion } = useAppSelector((state) => state.alerta);

    useEffect(() => {
        void dispatch(get_configuracion_alerta());


    }, []);



    useEffect(() => {

        const primera_configuracion = configuraciones.find(elemento => elemento.nombre_clase_alerta === watch('nombre_clase_alerta'));

        if (primera_configuracion !== undefined) {
            dispatch(set_current_alerta(primera_configuracion));
        }

    }, [watch('nombre_clase_alerta')]);

    useEffect(() => {
        reset(current_configuracion);
        //  console.log('')(current_configuracion)
    }, [current_configuracion]);

    return (
        <>
            <Grid
                container
                spacing={2}
                m={2}
                p={2}
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    m: '10px 0 20px 0',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >
                <Grid item xs={12}>
                    <Title title="Configuración de Alertas - Recaudo" />
                </Grid>
                <Grid item xs={12} sm={6}>

                    <Typography variant="body2" color="text.secondary">
                        <strong>Selecciona una alerta</strong>
                    </Typography>
                </Grid>





                <Grid container >
                    <Grid item xs={12} sm={6} margin={2}>
                        <Controller
                            name="nombre_clase_alerta"
                            control={control_configuracion}
                            rules={{ required: true }}
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    margin="dense"
                                    fullWidth
                                    select
                                    size="small"
                                    label="Alerta"
                                    variant="outlined"
                                    disabled={false}
                                    defaultValue={value}
                                    value={value}
                                    onChange={onChange}
                                    inputProps={{
                                        shrink: true,
                                    }}
                                    error={!(error == null)}
                                >
                                    {configuraciones.map((option) => (
                                        <MenuItem key={option.nombre_clase_alerta} value={option.nombre_clase_alerta ?? ''}>
                                            {option.nombre_clase_alerta}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>
                </Grid>

                <Grid container >
                    <Grid item xs={12} sm={6} margin={2}>
                        <Controller
                            name="nombre_clase_alerta"
                            control={control_configuracion}
                            rules={{ required: true }}
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    fullWidth
                                    size="small"
                                    label="Nombre de Alerta"
                                    variant="outlined"
                                    disabled={true}
                                    value={value}
                                    onChange={onChange}
                                    error={!(error == null)}
                                    inputProps={{
                                        shrink: true,
                                    }}
                                >

                                </TextField>
                            )}
                        />
                    </Grid>
                </Grid>



                <FormInputController
                    xs={11}
                    md={12}
                    // margin={2}
                    control_form={control_configuracion}
                    control_name="descripcion_clase_alerta"
                    default_value={""}
                    rules={{}}
                    multiline_text={true}
                    type="text"
                    rows_text={3}
                    disabled={true}
                    helper_text=""
                    hidden_text={null}
                    label={"Descripciónn de la alerta"}
                />
                <FormInputController
                    xs={11}
                    md={12}
                    // margin={2}
                    control_form={control_configuracion}
                    control_name="mensaje_base_dia"
                    default_value={""}
                    rules={{}}
                    multiline_text={true}
                    type="text"
                    rows_text={3}
                    disabled={true}
                    helper_text=""
                    hidden_text={null}
                    label={"Mensaje base predefinido"}
                />
            </Grid>
            {current_configuracion.cod_clase_alerta && (
                <ProgramacionRepeticiones
                />
            )}
            <Destinatario />
            <Programacion_fechas />
            <Configuracion />

        </>
    );
};

// eslint-disable-next-line no-restricted-syntax
export default ConfiguracionAlertasScreen;