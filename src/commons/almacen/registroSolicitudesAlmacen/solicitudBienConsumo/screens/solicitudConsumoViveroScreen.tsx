import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Grid } from '@mui/material';
import FormButton from '../../../../../components/partials/form/FormButton';
import SaveIcon from '@mui/icons-material/Save';
import { type IObjSolicitudVivero } from '../interfaces/solicitudBienConsumo';
import type { AuthSlice } from '../../../../../commons/auth/interfaces';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import SearchIcon from '@mui/icons-material/Search';
import {
  get_num_solicitud_vivero, get_uni_organizacional, get_medida_service, anular_solicitud_service,
  crear_solicitud_bien_consumo_vivero, get_person_id_service, get_funcionario_id_service, get_bienes_solicitud, editar_solicitud, get_coordinador_actual,
} from '../store/solicitudBienConsumoThunks';
import PrintIcon from '@mui/icons-material/Print';

import {
  reset_state,
  set_current_solicitud_vivero,
  set_persona_solicita,
} from '../store/slices/indexSolicitudBienesConsumo';
import AnularSolicitudModal from '../components/DespachoRechazoSolicitud/AnularSolicitudVivero';
import SeleccionarSolicitudVivero from '../components/componenteBusqueda/SeleccionarSolicitudVivero';
import PersonaResponsable from '../components/componenteBusqueda/PersonaResponsable';
import SeleccionarBienConsumoVivero from '../components/componenteBusqueda/SeleccionarBienesVivero';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import Limpiar from '../../../../conservacion/componentes/Limpiar';
import FormInputController from '../../../../../components/partials/form/FormInputController';
import { Title } from '../../../../../components/Title';
import FuncionarioResponsableCoordinador from '../components/componenteBusqueda/ResponsableVivero';
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SolicitudConsumoViveroScreen = () => {
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const { control: control_solicitud_vivero, handleSubmit: handle_submit, reset: reset_solicitud, getValues: get_values, } = useForm<IObjSolicitudVivero>();
  const { nro_solicitud_vivero, current_solicitud_vivero, persona_solicita, bienes_solicitud, current_funcionario, coordinador_vivero } = useAppSelector((state: { solic_consumo: any; }) => state.solic_consumo);
  const [action, set_action] = useState<string>('Guardar');
  const [anular, set_anular] = useState<string>('Anular');
  const [anular_solicitud, set_anular_solicitud] = useState<boolean>(false);
  const [open_search_modal, set_open_search_modal] = useState<boolean>(false);
  const handle_open_select_model = (): void => { set_open_search_modal(true); };
  const dispatch = useAppDispatch();


  const initial_values = (): void => {
    void dispatch(get_uni_organizacional());
    void dispatch(get_num_solicitud_vivero());
    void dispatch(get_medida_service());
    dispatch(set_persona_solicita({
      nombre: userinfo.nombre,
      id_persona: userinfo.id_persona,
      unidad_organizacional: userinfo.nombre_unidad_organizacional,
      id_unidad_organizacional_actual: userinfo.id_unidad_organizacional_actual
    }))
    set_action('crear');
  }


  useEffect(() => {
    void dispatch(get_uni_organizacional());
    void dispatch(get_num_solicitud_vivero());
    void dispatch(get_medida_service());
    void dispatch(get_coordinador_actual());
    dispatch(set_persona_solicita({
      nombre: userinfo.nombre,
      id_persona: userinfo.id_persona,
      unidad_organizacional: userinfo.nombre_unidad_organizacional,
      id_unidad_organizacional_actual: userinfo.id_unidad_organizacional_actual
    }))
  }, []);


  useEffect(() => {
    dispatch(
      set_current_solicitud_vivero({
        ...current_solicitud_vivero,
        nro_solicitud_por_tipo: nro_solicitud_vivero,
        id_persona_solicita: persona_solicita.id_persona,
        persona_solicita: persona_solicita.nombre,
        nombre_unidad_organizacional: persona_solicita.unidad_organizacional,
      })
    );
  }, [nro_solicitud_vivero]);


  useEffect(() => {
    //  console.log('')(current_solicitud_vivero);
    reset_solicitud(current_solicitud_vivero);
    if ('persona_solicita' in current_solicitud_vivero) {
      reset_solicitud(current_solicitud_vivero);
    } else {
      if (
        current_solicitud_vivero.id_persona_solicita !== null &&
        current_solicitud_vivero.id_persona_solicita !== undefined
      )
        void dispatch(
          get_person_id_service(current_solicitud_vivero.id_persona_solicita)
        );
    }
    if (
      current_solicitud_vivero.id_solicitud_consumibles !== null &&
      current_solicitud_vivero.id_solicitud_consumibles !== undefined
    ) {
      set_action('editar');
      void dispatch(
        get_bienes_solicitud(current_solicitud_vivero.id_solicitud_consumibles)
      );

      if (
        current_solicitud_vivero.id_funcionario_responsable_unidad !==
        current_funcionario.id_persona
      ) {
        void dispatch(
          get_funcionario_id_service(
            current_solicitud_vivero.id_funcionario_responsable_unidad
          )
        );
      }
    }
  }, [current_solicitud_vivero]);

  useEffect(() => {
    dispatch(
      set_current_solicitud_vivero({
        ...current_solicitud_vivero,
        id_persona_solicita: persona_solicita.id_persona,
        persona_solicita: persona_solicita.nombre,
        nombre_unidad_organizacional: persona_solicita.unidad_organizacional,
        nombre_unidad_organizacional_solicita: persona_solicita.unidad_organizacional,
        id_unidad_para_la_que_solicita: persona_solicita.id_unidad_organizacional_actual
      })
    );
  }, [persona_solicita]);

  useEffect(() => {
    const observacion = get_values('observacion');
    const motivo = get_values('motivo');
    const id_unidad_para_la_que_solicita = get_values(
      'id_unidad_para_la_que_solicita'
    );
    if (
      coordinador_vivero.id_persona !==
      current_solicitud_vivero.id_funcionario_responsable_unidad
    ) {
      dispatch(
        set_current_solicitud_vivero({
          ...current_solicitud_vivero,
          id_funcionario_responsable_unidad: coordinador_vivero.id_persona,
          observacion,
          motivo,

        })
      );
    }
  }, [coordinador_vivero]);

  useEffect(() => {
    const observacion = get_values('observacion');
    const motivo = get_values('motivo');
    const id_unidad_para_la_que_solicita = get_values(
      'id_unidad_para_la_que_solicita'
    );
    if (
      current_funcionario.id_persona !==
      current_solicitud_vivero.id_funcionario_responsable_unidad
    ) {
      dispatch(
        set_current_solicitud_vivero({
          ...current_solicitud_vivero,
          id_funcionario_responsable_unidad: current_funcionario.id_persona,
          observacion,
          motivo,
          id_unidad_para_la_que_solicita
        })
      );
    }
  }, [current_funcionario]);
  //  console.log('')(coordinador_vivero)

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unused-vars
  const on_submit = (data: IObjSolicitudVivero) => {
    if (
      current_solicitud_vivero.id_solicitud_consumibles !== null &&
      current_solicitud_vivero.id_solicitud_consumibles !== undefined
    ) {
      set_action('editar');

      const data_aux = {
        info_solicitud: { ...data, fecha_anulacion_solicitante: null },
        items_solicitud: bienes_solicitud.map((item: any, index: any) => ({
          ...item,
          nro_posicion: index,
        })),
      };

      void dispatch(editar_solicitud(data_aux));
    } else {
      set_action('crear');
      const data_aux = {
        info_solicitud: { ...data, fecha_anulacion_solicitante: null },
        items_solicitud: bienes_solicitud.map((item: any, index: any) => ({
          ...item,
          nro_posicion: index,
        })),
      };
      void dispatch(crear_solicitud_bien_consumo_vivero(data_aux));
    }
  };
  const on_submit_anular = (data: IObjSolicitudVivero): void => {
    const form_data = {
      solicitud_anulada_solicitante: true,
      justificacion_anulacion_solicitante:
        data.justificacion_anulacion_solicitante,
    };

    void dispatch(
      anular_solicitud_service(form_data, data.id_solicitud_consumibles)
    );
  };

  return (
    <Grid
      container
      spacing={1}
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        mb: '20px',
        top: '30px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >
      <Grid item xs={12} marginY={2}>
        <SeleccionarSolicitudVivero
          reset_values={reset_solicitud}
          control_solicitud_vivero={control_solicitud_vivero}
          get_values={get_values}
          title={'Solicitudes a vivero'}
          open_modal={open_search_modal}
          set_open_modal={set_open_search_modal}
        />

        <>
          <PersonaResponsable
            title={"Funcionario responsable"}
            get_values_solicitud={get_values} />

          {/* <FuncionarioResponsableCoordinador get_values_solicitud={get_values} /> */}

          <SeleccionarBienConsumoVivero />
        </>
      </Grid>

      <Grid container direction="row" justifyContent="flex-end" padding={2} spacing={2}>
        <Grid item xs={12} md={2.5}>
          <FormButton
            variant_button="contained"
            on_click_function={handle_open_select_model}
            icon_class={<SearchIcon />}
            label={'Buscar solicitud'}
            type_button="button"
            disabled={false}
          />
        </Grid>
        <Grid item xs={12} md={1.5}>
          <FormButton
            variant_button="contained"
            on_click_function={handle_submit(on_submit)}
            icon_class={<SaveIcon />}
            label={action}
            type_button="button"
          />
        </Grid>

        <Grid item xs={12} md={1.5}>
          <FormButton

            variant_button='outlined'
            icon_class={<PrintIcon />}
            on_click_function={() => { window.print(); }}
            label={'Imprimir'}
            type_button="button" />

        </Grid>



        <Grid item xs={6} md={1.5}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              set_anular('Anular');
              set_anular_solicitud(true);
            }}
          >
            ANULAR
          </Button>

        </Grid>
        <Grid item xs={12} md={1.5}>
          <Limpiar
            dispatch={dispatch}
            reset_state={reset_state}
            set_initial_values={initial_values}
            variant_button={'outlined'}
          />
        </Grid>

        <Grid item xs={12} md={1.3}>
          <ButtonSalir
          />

        </Grid>


      </Grid>
      <AnularSolicitudModal
        is_modal_active={anular_solicitud}
        set_is_modal_active={set_anular_solicitud}
        action={anular}
        control_solicitud_vivero={control_solicitud_vivero}
        get_values={get_values}
        on_submit={handle_submit(on_submit_anular)}
      />
    </Grid>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SolicitudConsumoViveroScreen;
