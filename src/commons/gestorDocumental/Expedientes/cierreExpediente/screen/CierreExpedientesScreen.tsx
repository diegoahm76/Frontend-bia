import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Button, Grid, TextField, } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Title } from '../../../../../components/Title';
import FormDatePickerController from '../../../../../components/partials/form/FormDatePickerController';
import { useForm } from 'react-hook-form';
import { IObjCierreExpediente } from '../interfaces/cierreExpedientes';
import FormInputController from '../../../../../components/partials/form/FormInputController';
import { LoadingButton } from '@mui/lab';
import BuscarExpediente from '../components/buscarExpediente';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';


// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const CierreExpedientesScreen = () => {


    const { control: control_cierre_expediente, getValues: get_values } = useForm<IObjCierreExpediente>();
    const [open_modal, set_open_modal] = useState(false);

    const dispatch = useAppDispatch();
    const handle_buscar = () => {
        set_open_modal(true);
    };
    const handle_close_buscar = () => {
        set_open_modal(false);
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
        >


            <Grid container spacing={2}>
                <Title title="CIERRE DE EXPEDIENTES" />
                <FormInputController
                    xs={12}
                    md={4}
                    margin={0}
                    control_form={control_cierre_expediente}
                    control_name="nombre_metadato"
                    default_value=''
                    rules={{}}
                    type="text"
                    disabled={false}
                    helper_text=""
                    hidden_text={null}
                    label={"Nombre"}
                />
                <Grid item xs={12} sm={4}>
                    <LoadingButton
                        variant="contained"
                        onClick={handle_buscar}
                        disabled={false}
                    >
                        Buscar
                    </LoadingButton>
                </Grid>

                <FormDatePickerController
                    xs={12}
                    md={3}
                    margin={0}
                    control_form={control_cierre_expediente}
                    control_name={'fecha_actual'}
                    default_value={''}
                    rules={{}}
                    label={'Fecha'}
                    disabled={true}
                    format={'YYYY-MM-DD'}
                    helper_text={''}
                />
                {open_modal && (
                    <Grid item xs={12} marginY={1}>
                        <BuscarExpediente
                            control_cierre_expediente={control_cierre_expediente}
                            open={open_modal}
                            handle_close_buscar={handle_close_buscar}
                            get_values={get_values}
                        //    handle_mover_carpeta={undefined} 
                        />
                    </Grid>
                )}
            </Grid>
        </Grid>
    )



};


// eslint-disable-next-line no-restricted-syntax
export default CierreExpedientesScreen;


