import { useEffect, } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Grid } from '@mui/material';
import FormButton from "../../../../../components/partials/form/FormButton";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import type { AuthSlice } from '../../../../auth/interfaces';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { set_current_entrega, set_persona_entrega, } from '../store/slice/indexEntrega';
import { get_bienes_entrada, get_num_entrega, get_person_id_entrega, get_tipo_entrada } from '../store/thunks/entregaThunks';
import { get_uni_organizacional } from '../../../registroSolicitudesAlmacen/solicitudBienConsumo/store/solicitudBienConsumoThunks';
import { type IObjEntrega } from '../interfaces/entregas';
import SeleccionarEntrega from '../components/SeleccionarEntrega';
import SeleccionarBodega from '../components/SeleccionarBodega';
import ListadoBienesEntrega from '../components/ListadoBienesEntrega';
import Seccion from '../components/SeccionPrimera';
// import Seccion from '../components/SeccionPrimera';



// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const EntregaScreen = () => {
    const { userinfo } = useSelector((state: AuthSlice) => state.auth); const { control: control_entrega, reset: reset_despacho, getValues: get_values } = useForm<IObjEntrega>();
    const { nro_entrega, current_entrega, persona_entrega } = useAppSelector((state) => state.entrega_otros);

    const dispatch = useAppDispatch();

    useEffect(() => {
        // console.log(current_solicitud)
        console.log(current_entrega);
        reset_despacho(current_entrega);
        if ('persona_crea' in current_entrega) {
            reset_despacho(current_entrega);
        } else {
            if (
                current_entrega.id_persona_despacha !== null &&
                current_entrega.id_persona_despacha !== undefined
            )
                void dispatch(
                    get_person_id_entrega(current_entrega.id_persona_despacha)
                ); // get persona despacho
        }
    }, [current_entrega]);

    useEffect(() => {
        if (current_entrega.id_entrada_almacen !== null && current_entrega.id_entrada_almacen !== undefined) {
            void dispatch(get_bienes_entrada(current_entrega.id_entrada_almacen));
        }
    }, [current_entrega.id_entrada_almacen]);

    useEffect(() => {
        void dispatch(get_uni_organizacional());
        void dispatch(get_num_entrega())
        void dispatch(get_tipo_entrada());
        dispatch(
            set_persona_entrega({
                nombre_completo: userinfo.nombre,
                id_persona: userinfo.id_persona,
            })
        );
    }, []);
    useEffect(() => {
        dispatch(
            set_current_entrega({
                ...current_entrega,
                id_persona_despacha: persona_entrega.id_persona,
                persona_crea: persona_entrega.nombre_completo ?? '',
            })
        );
    }, [persona_entrega]);
    useEffect(() => {
        dispatch(
            set_current_entrega({
                ...current_entrega,
                numero_despacho_consumo: nro_entrega,
                id_persona_despacha: persona_entrega.id_persona,
                persona_crea: persona_entrega.nombre_completo ?? '',
            })
        );
        console.log(nro_entrega)
    }, [nro_entrega]);


    return (

        <Grid
            container
            spacing={2}
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
                <Seccion
                    control_entrega={control_entrega}
                    get_values={get_values}

                />
            </Grid>
            <Grid item xs={12} marginY={2}>
                <SeleccionarEntrega
                    control_entrega={control_entrega}
                    get_values={get_values}

                />
            </Grid>
            <Grid item xs={12} marginY={2}>
                <SeleccionarBodega
                />
            </Grid>
            <Grid item xs={12} marginY={2}>

                <ListadoBienesEntrega />
            </Grid>
            <Grid
                container
                direction="row"
                padding={2}
                spacing={2}
            >
                <Grid item xs={6} md={3}>

                    <FormButton
                        variant_button="outlined"
                        on_click_function={reset_despacho}
                        icon_class={<CleaningServicesIcon />}
                        label={"Limpiar"}
                        type_button="button"
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <FormButton
                        variant_button="contained"
                        //   on_click_function={handle_submit(null)}
                        icon_class={<SaveIcon />}
                        // label={null}
                        type_button="button" on_click_function={undefined} label={''} />
                </Grid>


                <Grid item xs={6} md={3}>

                    {/* <Button
                        variant="outlined"
                        onClick={() => {
                            set_anular("Anular")
                            set_anular_solicitud(true);
                        }}


                    >
                        ANULACIÓN DE SOLICITUDES DE CONSUMO
                    </Button> */}


                </Grid>
                {/* <AnularSolicitudModal
                    is_modal_active={anular_solicitud}
                    set_is_modal_active={set_anular_solicitud}
                    action={anular}
                    control_solicitud={control_solicitud}
                    get_values={get_values}
                    on_submit={handle_submit(on_submit_anular)}
                /> */}
            </Grid>
        </Grid>

    )



};


// eslint-disable-next-line no-restricted-syntax
export default EntregaScreen;

