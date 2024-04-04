/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState, useEffect } from 'react';
import { Button, Checkbox, FormControl, FormControlLabel, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { Title } from '../../../../components/Title';
import FormSelectController from '../../../../components/partials/form/FormSelectController';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import type { IFechaProgramada, IObjConfiguracionAlerta } from '../interfaces/alerta';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { get_clase_alerta, get_fecha, programar_fecha, programar_repeticion, } from '../store/thunks/alertas';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { containerStyles } from '../../../gestorDocumental/tca/screens/utils/constants/constants';



// eslint-disable-next-line @typescript-eslint/naming-convention
const Configuracion = () => {
    const { control: control_configuracion_alerta, handleSubmit: handle_submit } = useForm<IObjConfiguracionAlerta>();
    const { clase_alerta, current_configuracion } = useAppSelector((state) => state.alerta);







    const dispatch = useAppDispatch();


    const on_submit_programar = (data: IObjConfiguracionAlerta): void => {
        //  console.log('')(data)
        const data_programar = {
            ...data
        };

        void dispatch(programar_repeticion(current_configuracion.cod_clase_alerta, data_programar));

    }

    useEffect(() => {
        void dispatch(get_clase_alerta())
    }, [])




    return (
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
                <Title title="Configuración de Alerta" />
            </Grid>
            <Grid item xs={12}>
                <FormSelectController
                    xs={12}
                    md={6}
                    control_form={control_configuracion_alerta}
                    control_name={'nivel_prioridad'}
                    default_value=''
                    rules={{}}
                    disabled={false}
                    helper_text=''
                    select_options={clase_alerta}
                    option_label='label'
                    option_key='value'
                    multiple={false}
                    hidden_text={false}
                    auto_focus={false}
                    label={'Prioridad de la Alerta'} />
            </Grid>

            <Grid item xs={12}>

                <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                        marginTop: '25px',
                        marginBottom: '10px',
                    }}
                >

                </Grid>
                <Grid
                    sx={{
                        marginBottom: '10px',
                        width: 'auto',
                    }}
                    item
                    xs={12}
                    sm={6}
                >
                    <Controller
                        name="envios_email"
                        control={control_configuracion_alerta}
                        // defaultValue=""
                        // rules={{ required: false }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <FormControl>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={value}
                                            onChange={(e) => {
                                                onChange(e.target.checked);
                                            }}
                                            // name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        value ? (
                                            <Typography variant="body2">
                                                <strong>
                                                    Notificar por correo electrónico a los
                                                    destinatarios
                                                </strong>
                                                <Tooltip
                                                    title="SI notifiación por correo electrónico"
                                                    placement="right"
                                                >
                                                    <InfoIcon
                                                        sx={{
                                                            width: '1.2rem',
                                                            height: '1.2rem',
                                                            ml: '0.5rem',
                                                            color: 'green',
                                                        }}
                                                    />
                                                </Tooltip>
                                            </Typography>
                                        ) : (
                                            <Typography variant="body2">
                                                <strong>
                                                    No Notificar por correo electrónico a los
                                                    destinatarios
                                                </strong>
                                                <Tooltip
                                                    title="NO Notificación por correo electrónico"
                                                    placement="right"
                                                >
                                                    <InfoIcon
                                                        sx={{
                                                            width: '1.2rem',
                                                            height: '1.2rem',
                                                            ml: '0.5rem',
                                                            color: 'orange',
                                                        }}
                                                    />
                                                </Tooltip>
                                            </Typography>
                                        )
                                    }
                                />
                            </FormControl>
                        )}
                    />
                </Grid>

                {/* estado actual de la alerta */}

                <Grid
                    sx={{
                        marginBottom: '10px',
                    }}
                    item
                    xs={12}
                    sm={6}
                >
                    <Controller
                        name="activa"
                        control={control_configuracion_alerta}
                        // defaultValue=""
                        // rules={{ required: false }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <FormControl>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={value}
                                            onChange={(e) => {
                                                onChange(e.target.checked);
                                            }}
                                            // name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        value ? (
                                            <Typography variant="body2">
                                                <strong>Alerta activa</strong>
                                                <Tooltip title="Alerta activa" placement="right">
                                                    <InfoIcon
                                                        sx={{
                                                            width: '1.2rem',
                                                            height: '1.2rem',
                                                            ml: '0.5rem',
                                                            color: 'green',
                                                        }}
                                                    />
                                                </Tooltip>
                                            </Typography>
                                        ) : (
                                            <Typography variant="body2">
                                                <strong>Alerta inactiva</strong>
                                                <Tooltip title="Alerta inactiva" placement="right">
                                                    <InfoIcon
                                                        sx={{
                                                            width: '1.2rem',
                                                            height: '1.2rem',
                                                            ml: '0.5rem',
                                                            color: 'orange',
                                                        }}
                                                    />
                                                </Tooltip>
                                            </Typography>
                                        )
                                    }
                                />
                            </FormControl>
                        )}
                    />
                </Grid>


                {/* </Box> */}
            </Grid>


            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Button variant="contained"
                        color="success"
                        onClick={handle_submit(on_submit_programar)}>
                        Guardar
                    </Button>
                </Grid>
            </Grid>


        </Grid>





    );
};

// eslint-disable-next-line no-restricted-syntax
export default Configuracion;
