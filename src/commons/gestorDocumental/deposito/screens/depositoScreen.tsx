/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Button, Grid, TextField, } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';
import DepositoInfo from '../components/CrearDeposito';
import { useForm } from 'react-hook-form';
import type { IObjDeposito } from '../interfaces/deposito';
import Sucursales from '../components/Sucursal';
import ListadoDeposito from '../components/depositosExistentes';
import { crear_deposito, editar_deposito, eliminar_deposito, get_depositos } from '../store/thunks/deposito';
import { useAppDispatch, } from '../../../../hooks';
import SucursalDirecciones from '../components/generadorDireccion';
import FormButton from '../../../../components/partials/form/FormButton';
import { DialogGeneradorDeDirecciones } from '../../../../components/DialogGeneradorDeDirecciones';
import { initial_state_deposito, set_current_deposito } from '../store/slice/indexDeposito';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DepositoScreen = () => {
    const { control: control_deposito, reset, getValues: get_values, handleSubmit: handle_submit } = useForm<IObjDeposito>();
    const [selected_deposito, set_selected_deposito] = useState<IObjDeposito>(initial_state_deposito);


    const [action, set_action] = useState<string>("Guardar");
    const [modal, set_modal] = useState(false);
    const [direccion, set_direccion] = useState('');
    const handle_close = () => { set_modal(false) }
    const handle_open = () => { set_modal(true) }
    const dispatch = useAppDispatch();
    const [open_search_modal, set_open_search_modal] = useState<boolean>(false);
    const get_direccion_modal = (value: string): void => {
        set_direccion(value.trim());
    };

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handle_edit_click = (deposito: IObjDeposito) => {
        set_selected_deposito(deposito);
        set_action("Editar");
    };

    useEffect(() => {
        reset(selected_deposito)
        dispatch(set_current_deposito(selected_deposito))
        set_direccion(selected_deposito.direccion_deposito ?? '')
    }, [selected_deposito])




    const on_submit = (data: IObjDeposito): void => {
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
            <Grid item xs={12} marginY={1}>
                <DepositoInfo
                    control_deposito={control_deposito}
                    get_values={get_values}
                    open_modal={open_search_modal}
                    set_open_modal={set_open_search_modal}

                />
            </Grid>
            <Grid item xs={12} marginY={1}>
                <SucursalDirecciones control_deposito={control_deposito}

                />
            </Grid>

            <Grid item xs={12} marginY={1}>
                <DialogGeneradorDeDirecciones
                    open={modal}
                    openDialog={handle_close}
                    onChange={get_direccion_modal}
                    type={'direccion_deposito'} />
            </Grid>



            <Grid item xs={6} md={6} marginY={1} >
                <TextField
                    required
                    size="small"
                    label="Dirección"
                    disabled
                    fullWidth
                    value={direccion}
                />
            </Grid>

            <Grid item xs={6} md={6} marginY={1}>
                <Button
                    variant="contained"
                    onClick={handle_open}
                >
                    Generar Dirección
                </Button>
            </Grid>


            <Grid item xs={12} marginY={1}>
                <Sucursales
                    control_deposito={control_deposito}
                    get_values={get_values}
                    open_modal={open_search_modal}
                    set_open_modal={set_open_search_modal}
                />
            </Grid>

            <Grid item xs={12} marginY={1}>
                <ListadoDeposito
                    handle_edit_click={handle_edit_click} />
            </Grid>




            <Grid
                container
                direction="row"
                padding={2}
                spacing={2}
            >




                <Grid item xs={12} md={1.2}>
                    <FormButton
                        variant_button="contained"
                        on_click_function={handle_submit(on_submit)}
                        icon_class={<SaveIcon />}
                        label={action}
                        type_button="button"

                    />
                </Grid>
                {selected_deposito.id_deposito !== null &&
                    <Grid item xs={12} md={1.3}>
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteForeverIcon />}
                            onClick={() => { on_submit_eliminar(selected_deposito); }}
                        >
                            Eliminar
                        </Button>
                    </Grid>
                }
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


