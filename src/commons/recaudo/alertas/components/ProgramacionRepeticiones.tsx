/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Button, Grid, } from '@mui/material';
import { Title } from '../../../../components/Title';
import FormSelectController from '../../../../components/partials/form/FormSelectController';
import type { IObjConfiguracionAlerta } from '../interfaces/alerta';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { programar_repeticion } from '../store/thunks/alertas';
import { useForm } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/naming-convention
const ProgramacionRepeticiones = () => {
    const { control: control_programacion, handleSubmit: handle_submit } = useForm<IObjConfiguracionAlerta>();
    const { current_configuracion } = useAppSelector((state) => state.alerta);
    const dia_inicio_previo = Array.from({ length: 15 }, (_, index) => ({
        value: (index + 1).toString(),
        label: (index + 1).toString(),
    }));


    const cantidad_repeticiones = Array.from({ length: 10 }, (_, index) => ({
        value: (index + 1).toString(),
        label: (index + 1).toString(),
    }));

    const dispatch = useAppDispatch();

    const on_submit_programar = (data: IObjConfiguracionAlerta): void => {
        //  console.log('')(data)
        const data_programar = {
            ...data
        };

        void dispatch(programar_repeticion(current_configuracion.cod_clase_alerta, data_programar));

    }


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
                <Title title="Programación de Repeticiones" />
            </Grid>

            <FormSelectController
                xs={12}
                md={2}
                control_form={control_programacion}
                control_name={'cant_dias_previas'}
                default_value=''
                rules={{}}
                disabled={false}
                helper_text=''
                select_options={dia_inicio_previo}
                option_label='label'
                option_key='value'
                multiple={false}
                hidden_text={false}
                auto_focus={false} label={'Días de inicio de alerta previa'} />

            <FormSelectController
                xs={12}
                md={2}
                control_form={control_programacion}
                control_name={'frecuencia_previas'}
                default_value=''
                rules={{}}
                disabled={false}
                helper_text=''
                select_options={cantidad_repeticiones}
                option_label='label'
                option_key='value'
                multiple={false}
                hidden_text={false}
                auto_focus={false} label={'Frecuencia de Alertas previas'} />

            <FormSelectController
                xs={12}
                md={2}
                control_form={control_programacion}
                control_name={'cant_dias_post'}
                default_value=''
                rules={{}}
                disabled={false}
                helper_text=''
                select_options={cantidad_repeticiones}
                option_label='label'
                option_key='value'
                multiple={false}
                hidden_text={false}
                auto_focus={false} label={'Cantidad Repeticiones posteriores'} />

            <FormSelectController
                xs={12}
                md={2}
                control_form={control_programacion}
                control_name={'frecuencia_post'}
                default_value=''
                rules={{}}
                disabled={false}
                helper_text=''
                select_options={dia_inicio_previo}
                option_label='label'
                option_key='value'
                multiple={false}
                hidden_text={false}
                auto_focus={false} label={' Frecuencia entre Repeticiones'} />

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
export default ProgramacionRepeticiones;