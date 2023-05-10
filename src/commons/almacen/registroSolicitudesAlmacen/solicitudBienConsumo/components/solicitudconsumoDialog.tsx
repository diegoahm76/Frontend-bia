import { useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Grid, } from '@mui/material';
// import { Title } from '../../../../../components/Title';
// import PersonaResponsable from './componenteBusqueda/PersonaResponsable';
import SeleccionarSolicitud from './componenteBusqueda/SeleccionarSolicitud';
import FormButton from "../../../../../components/partials/form/FormButton";
import CheckIcon from '@mui/icons-material/Check';
import SeleccionarBienConsumo from "./componenteBusqueda/SeleccionarBienConsumo";
import { type IObjSolicitud } from "../interfaces/solicitudBienConsumo";
import type { AuthSlice } from '../../../../../commons/auth/interfaces';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { get_num_solicitud, get_uni_organizacional, get_medida_service, get_person_id_service } from '../store/solicitudBienConsumoThunks';

import { set_current_solicitud, set_persona_solicita } from '../store/slices/indexSolicitudBienesConsumo';
import PersonaResponsable from '../../../configuracion/components/PersonaResponsable';


// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SolicitudConsumoDialog = () => {
    const { userinfo } = useSelector((state: AuthSlice) => state.auth);
    const { control: control_solicitud, reset: reset_solicitud, getValues: get_values } = useForm<IObjSolicitud>();
    const { nro_solicitud, current_solicitud, persona_solicita } = useAppSelector((state) => state.solic_consumo);

    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(get_uni_organizacional());
        void dispatch(get_num_solicitud());
        void dispatch(get_medida_service());
        dispatch(set_persona_solicita({ nombre: userinfo.nombre, id_persona: userinfo.id_persona, unidad_organizacional: userinfo.nombre_unidad_organizacional }))
    }, [])

    useEffect(() => {
        dispatch(set_current_solicitud({ ...current_solicitud, id_solicitud_consumibles: nro_solicitud, id_persona_solicita: persona_solicita.id_persona, persona_solicita: persona_solicita.nombre, nombre_unidad_organizacional: persona_solicita.unidad_organizacional, }))
    }, [nro_solicitud,]);

    useEffect(() => {
        console.log(current_solicitud)
        if ('persona_solicita' in current_solicitud) {
            reset_solicitud(current_solicitud)
        } else {
            if (current_solicitud.id_persona_solicita !== null && current_solicitud.id_persona_solicita !== undefined)
                void dispatch(get_person_id_service(current_solicitud.id_persona_solicita))
        }

    }, [current_solicitud]);

    useEffect(() => {
        dispatch(set_current_solicitud({ ...current_solicitud, id_persona_solicita: persona_solicita.id_persona, persona_solicita: persona_solicita.nombre, nombre_unidad_organizacional: persona_solicita.unidad_organizacional }))
    }, [persona_solicita]);


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
                <SeleccionarSolicitud
                    control_solicitud={control_solicitud}
                    get_values={get_values}

                />
                <PersonaResponsable
                    title={"Funcionario responsable"} />

                <SeleccionarBienConsumo />


            </Grid>
            <Grid item xs={12} md={4}>
                <FormButton
                    variant_button="contained"
                    on_click_function={null}
                    icon_class={<CheckIcon />}
                    label={"Confirmar creación de solicitud"}
                    type_button="button"
                />
            </Grid>
        </Grid>

    )



};


// eslint-disable-next-line no-restricted-syntax
export default SolicitudConsumoDialog;
