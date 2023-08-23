import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Grid, } from '@mui/material';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';

import DepositoInfo from '../components/CrearDeposito';
import { useForm } from 'react-hook-form';
import type { IObjDeposito } from '../interfaces/deposito';



import Sucursales from '../components/Sucursal';
import ListadoDeposito from '../components/depositosExistentes';
import { get_depositos } from '../store/thunks/deposito';
import { useAppDispatch } from '../../../../hooks';
import SucursalDirecciones from '../components/generadorDireccion';




// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DepositoScreen = () => {
    const { control: control_deposito, getValues: get_values, } = useForm<IObjDeposito>();
    // const { sucursales, current_deposito } = useAppSelector((state) => state.deposito);
    const dispatch = useAppDispatch();
    const [open_search_modal, set_open_search_modal] = useState<boolean>(false);


    useEffect(() => {
        void dispatch(get_depositos());
    }, []);



    // const on_submit = (data: IObjDeposito): void => {
    //     if (
    //         current_deposito.id_deposito !== null &&
    //         current_deposito.id_deposito !== undefined) 

    // }
    return (

        <Grid
            container
            spacing={2}
            marginTop={3}
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',

            }}
        >
            <Grid item xs={12} marginY={2}>
                <DepositoInfo
                    control_deposito={control_deposito}
                    get_values={get_values}
                    open_modal={open_search_modal}
                    set_open_modal={set_open_search_modal}

                />
            </Grid>
            <Grid item xs={12} marginY={2}>
                <SucursalDirecciones control_deposito={control_deposito}                   // form_values={form_values}
                //  handleinput_change={handleinput_change}

                />
            </Grid>
            <Grid item xs={12} marginY={2}>
                <Sucursales
                    control_deposito={control_deposito}
                    get_values={get_values}
                    open_modal={open_search_modal}
                    set_open_modal={set_open_search_modal}

                />
            </Grid>
            <Grid item xs={12} marginY={2}>
                <ListadoDeposito />
            </Grid>




            <Grid
                container
                direction="row"
                padding={2}
                spacing={2}
            >

                {/* <Grid item xs={12} md={2}>
                    <FormButton
                        variant_button="contained"
                        on_click_function={handle_submit(on_submit)}
                        icon_class={<SaveIcon />}
                        label={action}
                        type_button="button"
                    />
                </Grid> */}
                {/* <Grid item xs={6} md={2}>
                    <FormButton
                        variant_button="contained"
                        on_click_function={handle_open_select_model}
                        icon_class={<SearchIcon />}
                        label={'Buscar entrega'}
                        type_button="button"
                        disabled={false}
                    />
                </Grid> */}

                {/* <Grid item xs={12} md={1}>
                    <Limpiar
                        dispatch={dispatch}
                        reset_state={reset_state}
                        set_initial_values={initial_values}
                        variant_button={'contained'}
                    />
                </Grid> */}
                <Grid item xs={12} md={2}>
                    <ButtonSalir
                    />
                </Grid>


            </Grid>
        </Grid>

    )



};


// eslint-disable-next-line no-restricted-syntax
export default DepositoScreen;


