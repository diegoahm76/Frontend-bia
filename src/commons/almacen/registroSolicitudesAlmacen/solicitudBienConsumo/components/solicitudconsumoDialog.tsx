
import { useForm, Controller } from 'react-hook-form';
import { crear_solicitud_bien_consumo, get_uni_organizacional } from '../store/solicitudBienConsumoThunks';
import "react-datepicker/dist/react-datepicker.css";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import esLocale from 'dayjs/locale/es'; // importar el idioma español
// import { Controller, type FieldValues, type SubmitHandler } from 'react-hook-form';

// import CloseIcon from "@mui/icons-material/Close";
import { Box, Grid, MenuItem, TextField, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
// import { Title } from '../../../../../components/Title';
import { type InfoSolicitud as FormValues } from "../interfaces/solicitudBienConsumo"

import { useEffect, useState } from 'react';
import PersonaResponsable from './componenteBusqueda/PersonaResponsable';
interface IProps {

    action: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SolicitudConsumoDialog = ({
    action,

}:
    IProps) => {


    const navigate = useNavigate();
    const dispatch = useAppDispatch();



    const { solicitud, solicitud_bienes_consumo } = useAppSelector((state) => state.solic_consumo);
    const { unidad_organizacional } = useAppSelector((state) => state.solic_consumo);

    const [fecha_inicial, set_fecha_inicial] = useState<Date | null>(new Date());

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handle_input_change = (date: Date | null) => {
        set_fecha_inicial(date)
    };

    const { control: control_solicitud_consumo, handleSubmit: handle_submit, reset: reset_solicitud_consumo } =
        useForm<FormValues>();

    useEffect(() => {
        reset_solicitud_consumo(solicitud);
    }, [solicitud_bienes_consumo]);

    const on_submit = (data: FormValues): void => {
        const form_data: any = new FormData();
        form_data.append("id_solicitud_consumibles", data.id_solicitud_consumibles);
        form_data.append("es_solicitud_de_conservacion", data.es_solicitud_de_conservacion);
        form_data.append("id_unidad_para_la_que_solicita", data.id_unidad_para_la_que_solicita.toString());
        form_data.append("id_funcionario_responsable_unidad", data.id_funcionario_responsable_unidad);
        form_data.append("motivo", data.motivo);
        form_data.append("observacion", data.observacion);


        void dispatch(crear_solicitud_bien_consumo(form_data, navigate));

    };
    useEffect(() => {


        void dispatch(get_uni_organizacional());

    }, [])


    return (


        <Box
            component="form"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={action === "create" ? handle_submit(on_submit) : handle_submit(on_submit)}
        >
            <Grid container spacing={2} >

                <Grid item xs={12} sm={4} >
                    <Controller
                        name="id_solicitud_consumibles"
                        control={control_solicitud_consumo}
                        defaultValue={0}
                        rules={{ required: true }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                margin="dense"
                                fullWidth

                                size="small"
                                label="Id solicitud consumible"
                                variant="outlined"
                                //  disabled={action !== "create"}
                                value={value}
                                onChange={onChange}
                                error={!(error == null)}>

                            </TextField>

                        )}
                    />
                </Grid>

                <Grid item xs={12} sm={4} >
                    <Controller
                        name="id_unidad_para_la_que_solicita"
                        control={control_solicitud_consumo}
                        defaultValue={0}
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
                                label="Unidad organizacional"
                                variant="outlined"
                                // disabled={action !== "create"}
                                value={value}
                                onChange={onChange}
                                error={!(error == null)}
                                helperText={
                                    error != null
                                        ? 'Es obligatorio ingresar un nombre'
                                        : ''
                                }
                            >
                                {unidad_organizacional.map((option) => (
                                    <MenuItem key={option.id_unidad_organizacional} value={option.id_unidad_organizacional}>
                                        {option.nombre}
                                    </MenuItem>
                                ))}
                            </TextField>

                        )}
                    />
                </Grid>

                <Grid item xs={12} sm={3} >
                    <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
                        <DatePicker
                            label="Fecha"
                            inputFormat="YYYY/MM/DD"
                            openTo="day"
                            views={['year', 'month', 'day']}
                            value={fecha_inicial}
                            disabled={action !== "create"}
                            onChange={handle_input_change}
                            renderInput={(params) => (
                                <TextField
                                    required
                                    fullWidth
                                    size="small"
                                    {...params}
                                />
                            )}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={12} >
                    <Controller
                        name="motivo"
                        control={control_solicitud_consumo}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                margin="dense"
                                fullWidth

                                size="small"
                                label="Motivo"
                                variant="outlined"
                                // disabled={action !== "create"}
                                value={value}
                                onChange={onChange}
                                error={!(error == null)}
                                helperText={
                                    error != null
                                        ? 'Es obligatorio seleccionar una opción'
                                        : ''
                                }
                            >

                            </TextField>

                        )}
                    />
                </Grid>

                <Grid item xs={12} sm={12} >
                    <Controller
                        name="observacion"
                        control={control_solicitud_consumo}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                margin="dense"
                                fullWidth

                                size="small"
                                label="Observación"
                                variant="outlined"
                                // disabled={action !== "create"}
                                value={value}
                                onChange={onChange}
                                error={!(error == null)}
                                helperText={
                                    error != null
                                        ? 'Es obligatorio seleccionar una opción'
                                        : ''
                                }
                            >

                            </TextField>

                        )}
                    />
                </Grid>

                <Grid item xs={12} sm={4} >
                    <Controller
                        name="id_funcionario_responsable_unidad"
                        control={control_solicitud_consumo}
                        defaultValue={0}
                        rules={{ required: true }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                margin="dense"
                                fullWidth

                                size="small"
                                label="Funcionario responsable"
                                variant="outlined"
                                // disabled={action !== "create"}
                                value={value}
                                onChange={onChange}
                                error={!(error == null)}
                                helperText={
                                    error != null
                                        ? 'Es obligatorio ingresar un nombre'
                                        : ''
                                }
                            >
                                {unidad_organizacional.map((option) => (
                                    <MenuItem key={option.id_unidad_organizacional} value={option.id_unidad_organizacional}>
                                        {option.nombre}
                                    </MenuItem>
                                ))}
                            </TextField>

                        )}
                    />
                </Grid>
                <PersonaResponsable />



            </Grid>
        </Box>

    )



};


// eslint-disable-next-line no-restricted-syntax
export default SolicitudConsumoDialog;
