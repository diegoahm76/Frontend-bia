import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Button, Grid, } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import type { IObjDeposito } from '../../interfaces/deposito';
import { crear_deposito, editar_deposito, eliminar_deposito, get_depositos } from '../../store/thunks/deposito';
import { useAppDispatch, } from '../../../../../hooks';
import FormButton from '../../../../../components/partials/form/FormButton';
import { initial_state_deposito } from '../../store/slice/indexDeposito';
import { useForm } from 'react-hook-form';


// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const AdministrarBandejaScreen = () => {
    const { reset, handleSubmit: handle_submit } = useForm<IObjDeposito>();
    const [selected_deposito, set_selected_deposito] = useState<IObjDeposito>(initial_state_deposito);


    const [action, set_action] = useState<string>("Guardar");

    const [direccion, set_direccion] = useState('');


    // const { current_deposito } = useAppSelector((state) => state.deposito);
    const dispatch = useAppDispatch();




    useEffect(() => {
        reset(selected_deposito)
        set_direccion(selected_deposito.direccion_deposito ?? '')
    }, [selected_deposito])




    const on_submit = (data: IObjDeposito): void => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (action === "Editar" && selected_deposito) {
            const data_edit = {
                ...selected_deposito,
                ...data,

            };
            void dispatch(editar_deposito(selected_deposito.id_deposito, data_edit));
        } else {
            const data_aux = {
                ...data,
                direccion_deposito: direccion
            };
            void dispatch(crear_deposito(data_aux));
        }

        set_selected_deposito(initial_state_deposito);
        set_action("Guardar");

    };
    void dispatch(get_depositos())

    const on_submit_eliminar = (data: IObjDeposito): void => {

        if (
            selected_deposito.id_deposito !== null &&
            selected_deposito.id_deposito !== undefined
        ) {
            void dispatch(
                eliminar_deposito(
                    selected_deposito.id_deposito)
            );
        }
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











            <Grid
                container
                direction="row"
                padding={2}
                spacing={2}
            >




                <Grid item xs={12} md={2}>
                    <FormButton
                        variant_button="contained"
                        on_click_function={handle_submit(on_submit)}
                        icon_class={<SaveIcon />}
                        label={action}
                        type_button="button"
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => { on_submit_eliminar(selected_deposito); }}
                    >
                        Eliminar
                    </Button>
                </Grid>

                <Grid item xs={12} md={2}>
                    <ButtonSalir
                    />
                </Grid>


            </Grid>
        </Grid>

    )



};


// eslint-disable-next-line no-restricted-syntax
export default AdministrarBandejaScreen;


