import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Grid } from '@mui/material';
import FormButton from '../../../../../components/partials/form/FormButton';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { type IObjSolicitud } from '../../solicitudBienConsumo/interfaces/solicitudBienConsumo';
import { type AuthSlice } from '../../../../auth/interfaces';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import {
  get_uni_organizacional,
  get_person_id_service,
  get_funcionario_id_service,
  get_bienes_solicitud,
} from '../../solicitudBienConsumo/store/solicitudBienConsumoThunks';
import SeleccionarSolicitudDespacho from '../../solicitudBienConsumo/components/DespachoRechazoSolicitud/SeleccionarSolicitudesDespacho';
import { set_current_solicitud } from '../../solicitudBienConsumo/store/slices/indexSolicitudBienesConsumo';
import FuncionarioRechazo from '../../solicitudBienConsumo/components/DespachoRechazoSolicitud/PersonaRechazoSolicitud';
import SeleccionarBodega from '../components/SeleccionarBodega';
import { type IObjDespacho } from '../interfaces/despacho';
import {
  set_current_despacho,
  set_persona_despacha,
} from '../store/slices/indexDespacho';
import {
  get_bienes_despacho,
  get_num_despacho,
  get_person_id_despacho,
  get_solicitud_by_id,
} from '../store/thunks/despachoThunks';
import SeleccionarDespacho from '../components/SeleccionarDespacho';
import ListadoBienesSolicitud from '../components/ListadoBienesSolicitud';
import SeleccionarBienDespacho from '../components/SeleccionarBienDespacho';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DespachoBienesConsumoScreen = () => {
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const {
    control: control_solicitud_despacho,
    reset: reset_solicitud_aprobacion,
  } = useForm<IObjSolicitud>();
  const {
    control: control_despacho,
    // handleSubmit: handle_submit,
    reset: reset_despacho,
    getValues: get_values,
    // watch: watch_despacho,
  } = useForm<IObjDespacho>();

  const [action, set_action] = useState<string>('Crear');
  const { current_solicitud, persona_solicita, current_funcionario } =
    useAppSelector((state: { solic_consumo: any }) => state.solic_consumo);
  const { persona_despacha, current_despacho, nro_despacho } = useAppSelector(
    (state) => state.despacho
  );
  // const { bodega_seleccionada } = useAppSelector(
  //   (state: { bodegas: any }) => state.bodegas
  // );
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(get_uni_organizacional());
    void dispatch(get_num_despacho());
    dispatch(
      set_persona_despacha({
        nombre_completo: userinfo.nombre,
        id_persona: userinfo.id_persona,
      })
    );
  }, []);
  useEffect(() => {
    dispatch(
      set_current_despacho({
        ...current_despacho,
        id_persona_despacha: persona_despacha.id_persona,
        persona_crea: persona_despacha.nombre_completo ?? '',
      })
    );
  }, [persona_despacha]);

  useEffect(() => {
    dispatch(
      set_current_despacho({
        ...current_despacho,
        numero_despacho_consumo: nro_despacho,
        id_persona_despacha: persona_despacha.id_persona,
        persona_crea: persona_despacha.nombre_completo ?? '',
      })
    );
  }, [nro_despacho]);

  useEffect(() => {
    reset_solicitud_aprobacion(current_solicitud);
    if ('persona_solicita' in current_solicitud) {
      reset_solicitud_aprobacion(current_solicitud);
    } else {
      if (
        current_solicitud.id_persona_solicita !== null &&
        current_solicitud.id_persona_solicita !== undefined
      ) {
        void dispatch(
          get_person_id_service(current_solicitud.id_persona_solicita)
        );
      }
    }
    if (
      current_solicitud.id_solicitud_consumibles !== null &&
      current_solicitud.id_solicitud_consumibles !== undefined
    ) {
      void dispatch(
        get_bienes_solicitud(current_solicitud.id_solicitud_consumibles)
      );

      if (current_solicitud.id_solicitud_consumibles !== null) {
        if (
          current_solicitud.id_funcionario_responsable_unidad !==
          current_funcionario.id_persona
        ) {
          void dispatch(
            get_funcionario_id_service(
              current_solicitud.id_funcionario_responsable_unidad
            )
          );
          console.log('ok');
        }
      }
    }
  }, [current_solicitud]);

  useEffect(() => {
    // console.log(current_solicitud)
    console.log(current_despacho);
    reset_despacho(current_despacho);
    if ('persona_crea' in current_despacho) {
      reset_despacho(current_despacho);
    } else {
      if (
        current_despacho.id_persona_despacha !== null &&
        current_despacho.id_persona_despacha !== undefined
      )
        void dispatch(
          get_person_id_despacho(current_despacho.id_persona_despacha)
        ); // get persona despacho
    }
    if (
      current_despacho.id_despacho_consumo !== null &&
      current_despacho.id_despacho_consumo !== undefined
    ) {
      set_action('editar');
      void dispatch(get_bienes_despacho(current_despacho.id_despacho_consumo)); // get bienes despacho
      void dispatch(
        get_solicitud_by_id(current_despacho.id_solicitud_consumo ?? 0)
      );
    }
  }, [current_despacho]);

  useEffect(() => {
    dispatch(
      set_current_solicitud({
        ...current_solicitud,
        id_persona_solicita: persona_solicita.id_persona,
        persona_solicita: persona_solicita.nombre,
        nombre_unidad_organizacional: persona_solicita.unidad_organizacional,
      })
    );
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
        <SeleccionarDespacho
          control_despacho={control_despacho}
          get_values={get_values}
        />
        <SeleccionarSolicitudDespacho
          title={'INFORMACIÓN DE LA SOLICITUD'}
          control_solicitud_despacho={control_solicitud_despacho}
          get_values={get_values}
        />

        <FuncionarioRechazo
          title={'Persona responsable'}
          get_values_solicitud={get_values}
        />
        <SeleccionarBodega />
        <ListadoBienesSolicitud />
        <SeleccionarBienDespacho />
      </Grid>

      <>
        <Grid item xs={6} md={2}>
          <FormButton
            variant_button="contained"
            on_click_function={action}
            label="Guardar"
            type_button="button"
            icon_class={<SendIcon />}
          />
        </Grid>

        <Grid item xs={6} md={2}>
          <FormButton
            variant_button="contained"
            on_click_function={reset_solicitud_aprobacion}
            icon_class={<CloseIcon />}
            label="Cerrar"
            type_button="button"
          />
        </Grid>
      </>
    </Grid>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default DespachoBienesConsumoScreen;
