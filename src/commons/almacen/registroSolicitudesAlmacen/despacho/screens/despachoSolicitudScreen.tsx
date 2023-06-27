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
import {
  set_current_solicitud,
  set_persona_solicita,
} from '../../solicitudBienConsumo/store/slices/indexSolicitudBienesConsumo';
import FuncionarioRechazo from '../../solicitudBienConsumo/components/DespachoRechazoSolicitud/PersonaRechazoSolicitud';
import BienRechazado from '../../solicitudBienConsumo/components/DespachoRechazoSolicitud/BienesRechazo';
import SeleccionarBodega from '../components/SeleccionarBodega';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DespachoBienesConsumoScreen = () => {
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const {
    control: control_solicitud_despacho,
    reset: reset_solicitud_aprobacion,
    getValues: get_values,
  } = useForm<IObjSolicitud>();

  const [action] = useState<string>('Despachar');
  const { current_solicitud, persona_solicita, current_funcionario } =
    useAppSelector((state: { solic_consumo: any }) => state.solic_consumo);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(get_uni_organizacional());
    dispatch(
      set_persona_solicita({
        nombre: userinfo.nombre,
        id_persona: userinfo.id_persona,
        unidad_organizacional: userinfo.nombre_unidad_organizacional,
      })
    );
  }, []);

  // useEffect(() => {
  //     dispatch(set_current_solicitud({ ...current_solicitud, nro_solicitud_por_tipo: nro_solicitud, id_persona_solicita: persona_solicita.id_persona, persona_solicita: persona_solicita.nombre, nombre_unidad_organizacional: persona_solicita.unidad_organizacional, id_funcionario_responsable_unidad: persona_solicita.id_persona }));
  // }, [nro_solicitud]);

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
        <SeleccionarSolicitudDespacho
          title={'INFORMACIÓN DE LA SOLICITUD'}
          control_solicitud_despacho={control_solicitud_despacho}
          get_values={get_values}
        />

        <FuncionarioRechazo
          title={'Persona responsable'}
          get_values_solicitud={get_values}
        />
        <BienRechazado />
        <SeleccionarBodega />
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
