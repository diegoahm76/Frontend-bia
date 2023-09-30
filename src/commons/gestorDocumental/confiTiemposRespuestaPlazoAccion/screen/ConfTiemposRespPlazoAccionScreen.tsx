/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Button, Grid, MenuItem, Select, TextField, Typography, } from '@mui/material';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';
import { useForm } from 'react-hook-form';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FormSelectController from '../../../../components/partials/form/FormSelectController';
import { IObjConfiTiemposPlazoAccion } from '../interface/ConfiTiemposPlazoAccion';
import { actualizar, get_configuraciones } from '../store/thunks/ConfTiemposRespThunks';
import SaveIcon from "@mui/icons-material/Save";
import { Title } from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import FormInputController from '../../../../components/partials/form/FormInputController';
import FormButton from '../../../../components/partials/form/FormButton';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const ConfiguracionTiemposRespScreen = () => {
    const { control: control_configuracion, getValues: get_values, handleSubmit: handle_submit } = useForm<IObjConfiTiemposPlazoAccion>();

    const { configuraciones_tiempos } = useAppSelector((state) => state.confi_tiempo_respuesta);
    const dispatch = useAppDispatch();
    const [selectedOptionInfo, setSelectedOptionInfo] = useState<IObjConfiTiemposPlazoAccion | null>(null);

    const [selected_option, set_selected_option] = useState<string>('');
    useEffect(() => {
        void dispatch(get_configuraciones())
    }, []);


    console.log(selected_option)

    const on_submit = (data: IObjConfiTiemposPlazoAccion): void => {
        console.log(data);
        const data_programar = {
            ...data,

        };

        void dispatch(actualizar(selected_option, data));

    };


    return (

        <Grid
            container
            spacing={2}
            marginTop={2}
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',

            }}
        >   <Title title="CONFIGURACIÓN DE TIEMPOS DE RESPUESTA Y ACCIÓN" />

            <Grid
                container
                spacing={2}
                marginTop={2}
                justifyContent="center"
                alignItems="center"


            >
                <Grid item>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: '15px' }}>
                        {"Acción a configurar: "}
                    </Typography>
                </Grid>
                <Select
                    value={selected_option}
                    onChange={(event) => set_selected_option(event.target.value as string)} sx={{ minWidth: '600px' }}
                >
                    {configuraciones_tiempos.map((configuracion) => (
                        // Verifica que configuracion y id_configuracion_tiempo_respuesta no sean nulos o indefinidos
                        configuracion && configuracion.id_configuracion_tiempo_respuesta && (
                            <MenuItem
                                key={configuracion.id_configuracion_tiempo_respuesta}
                                value={configuracion.id_configuracion_tiempo_respuesta.toString()}
                            >
                                {configuracion.nombre_configuracion}
                            </MenuItem>
                        )
                    ))}
                </Select>



            </Grid>
            <Grid
                container
                spacing={2}
                marginTop={2}
                justifyContent="center"
                alignItems="center"


            >
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{"Días: "}  </Typography>
                <FormInputController
                    xs={12}
                    md={1}
                    margin={0}
                    control_form={control_configuracion}
                    control_name="tiempo_respuesta_en_dias"
                    default_value=''
                    rules={{}}
                    type="text"
                    disabled={false}
                    helper_text=""
                    hidden_text={null}
                    label={""}
                />


            </Grid>

            <Grid
                container
                spacing={2}
                marginTop={2}
                justifyContent="center"
                alignItems="center"


            >
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{"Observación de la configuración: "}  </Typography>
                <FormInputController
                    xs={12}
                    md={8}
                    margin={0}
                    control_form={control_configuracion}
                    control_name="observacion_ultimo_cambio"
                    default_value=''
                    rules={{}}
                    type="text"
                    disabled={false}
                    helper_text=""
                    rows_text={4}
                    multiline_text={true}
                    hidden_text={null}
                    label={""}
                />


            </Grid>
            <Grid container justifyContent="flex-end" marginTop={2} >
                <Grid item >
                    <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        color="success"
                        onClick={handle_submit(on_submit)}
                        sx={{ marginRight: '8px' }}>

                        Guardar
                    </Button>
                </Grid>
                <Grid item xs={12} md={1.2}>
                    <ButtonSalir
                    />
                </Grid>

            </Grid>


        </Grid>


    )



};


// eslint-disable-next-line no-restricted-syntax
export default ConfiguracionTiemposRespScreen;


