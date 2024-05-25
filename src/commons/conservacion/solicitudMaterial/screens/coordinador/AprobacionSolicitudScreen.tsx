/* eslint-disable react/jsx-no-undef */
// eslint-disable-next-line @typescript-eslint/no-redeclare

import { useEffect, useState } from 'react';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import 'react-datepicker/dist/react-datepicker.css';
import { Grid } from '@mui/material';
import FormButton from '../../../../../components/partials/form/FormButton';
import { useForm } from 'react-hook-form';
import {
  reset_state,
  set_current_nursery,
  set_current_solicitud,
} from '../../store/slices/indexSolicitud';
import {
  type IObjNursery,
  type IObjSolicitudVivero,
} from '../../interfaces/solicitudVivero';
import {
  aprobacion_solicitud_coordinador,
  get_bienes_solicitud,
  get_funcionario_id_service,
  get_nurcery,
  get_person_id_service,
  get_solicitud_aprobacion_coordinador,
  get_uni_organizacional,
} from '../../store/thunks/solicitudViveroThunks';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import SeleccionarSolicitudAprobada from '../../components/SeleccionarSolicitudAprobacion';
import DestinoAprobacion from '../../components/DestinoEleAprobacion';
import PersonaResponsableAprobacion from '../../components/PersonaRespoAprobacion';
import SeleccionBienAprobacion from '../../components/SeleccionBienAprobacion';
import Aprobacion from '../../components/Aprobacion';
import Limpiar from '../../../componentes/Limpiar';
import SearchIcon from '@mui/icons-material/Search';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unused-vars
const AprobacionSolicitudCoordinadorScreen = () => {
  const {
    control: control_solicitud_aprobada,
    handleSubmit: handle_submit,
    reset: reset_solicitud,
    getValues: get_values,
    watch,
  } = useForm<IObjSolicitudVivero>();
  const {
    current_solicitud,
    nurseries,
    persona_solicita,
    current_funcionario,
  } = useAppSelector((state) => state.solicitud_vivero);

  const dispatch = useAppDispatch();
  const [open_search_modal, set_open_search_modal] = useState<boolean>(false);
  const handle_open_select_model = (): void => {
    set_open_search_modal(true);
  };
  const initial_values = (): void => {
    void dispatch(get_uni_organizacional());
    void dispatch(get_nurcery());
    void dispatch(get_solicitud_aprobacion_coordinador());
  };
  useEffect(() => {
    void dispatch(get_uni_organizacional());
    void dispatch(get_nurcery());
    void dispatch(get_solicitud_aprobacion_coordinador());
  }, []);

  useEffect(() => {
    //  console.log('')(watch('id_vivero_solicitud'));
    if (watch('id_vivero_solicitud') !== null) {
      const vivero: IObjNursery | undefined = nurseries.find(
        (p: IObjNursery) => p.id_vivero === watch('id_vivero_solicitud')
      );
      if (vivero !== undefined) {
        dispatch(set_current_nursery(vivero));
      }
    }
  }, [watch('id_vivero_solicitud')]);

  useEffect(() => {
    // //  console.log('')(current_solicitud)
    reset_solicitud(current_solicitud);
    if ('persona_solicita' in current_solicitud) {
      reset_solicitud(current_solicitud);
    } else {
      if (
        current_solicitud.id_persona_solicita !== null &&
        current_solicitud.id_persona_solicita !== undefined
      )
        void dispatch(
          get_person_id_service(current_solicitud.id_persona_solicita)
        );
    }
    if (
      current_solicitud.id_solicitud_vivero !== null &&
      current_solicitud.id_solicitud_vivero !== undefined
    ) {
      void dispatch(
        get_bienes_solicitud(current_solicitud.id_solicitud_vivero)
      );
      if (
        current_solicitud.id_funcionario_responsable_und_destino !==
        current_funcionario.id_persona
      ) {
        void dispatch(
          get_funcionario_id_service(
            current_solicitud.id_funcionario_responsable_und_destino ?? 0
          )
        );
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
        id_unidad_org_del_responsable:
          persona_solicita.id_unidad_organizacional_actual,
      })
    );
  }, [persona_solicita]);

  useEffect(() => {
    const id_vivero_solicitud = get_values('id_vivero_solicitud');
    const nro_info_tecnico = get_values('nro_info_tecnico');
    const observaciones = get_values('observaciones');
    const motivo = get_values('motivo');
    const id_unidad_para_la_que_solicita = get_values(
      'id_unidad_para_la_que_solicita'
    );
    if (
      current_funcionario.id_persona !==
      current_solicitud.id_funcionario_responsable_und_destino
    ) {
      dispatch(
        set_current_solicitud({
          ...current_solicitud,
          id_funcionario_responsable_und_destino:
            current_funcionario.id_persona,
          observaciones,
          motivo,
          id_vivero_solicitud,
          nro_info_tecnico,
          id_unidad_para_la_que_solicita,
        })
      );
    }
  }, [current_funcionario]);
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  // const on_submit = (data: IObjSolicitudVivero): void => {
  //   //  console.log('')(data)
  //   const form_data: any = new FormData();
  //   const fecha = new Date(data.fecha_solicitud ?? "").toISOString()
  //   const fecha_retiro = new Date(data.fecha_retiro_material ?? "").toISOString()

  //   const data_edit = {
  //     ...data, fecha_solicitud: fecha.slice(0, 10) + " " + fecha.slice(11, 19), fecha_retiro_material: fecha_retiro.slice(0, 10)
  //   }
  //   const aux_items: IObjBienesSolicitud[] = []
  //   bienes_solicitud.forEach((element: IObjBienesSolicitud, index: number) => {
  //     aux_items.push({ ...element, nro_posicion: index })
  //   });
  //   form_data.append('data_solicitud', JSON.stringify({ ...data_edit }));
  //   form_data.append('ruta_arcruta_archivo_tecnico', data.ruta_archivo_info_tecnico);
  //   form_data.append('data_items_solicitados', JSON.stringify(aux_items));
  //   void dispatch(crear_solicitud(form_data));
  // }

  const on_submit_aprobacion = (data: IObjSolicitudVivero): void => {
    //  console.log('')('aprobación...');
    const form_data = {
      estado_aprobacion_coord_viveros: data.estado_aprobacion_responsable,
      justificacion_aprobacion_coord_viveros:
        data.justificacion_aprobacion_responsable,
      fecha_aprobacion_coord_viv: null,
      revisada_coord_viveros: null,
      solicitud_abierta: null,
      fecha_cierra_solicitud: null,
    };

    void dispatch(
      aprobacion_solicitud_coordinador(form_data, data.id_solicitud_vivero)
    );
  };

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
        marginTop: '20px',
      }}
    >
      <SeleccionarSolicitudAprobada
        title={'Aprobación de solicitudes'}
        control_solicitud_aprobada={control_solicitud_aprobada}
        get_values={get_values}
        open_modal={open_search_modal}
        set_open_modal={set_open_search_modal}
      />

      <PersonaResponsableAprobacion
        title={'Funcionario responsable'}
        get_values_solicitud={get_values}
      />

      <DestinoAprobacion
        title={'Destino de los elementos'}
        control_solicitud_aprobada={control_solicitud_aprobada}
        get_values={get_values}
      />

      <SeleccionBienAprobacion />

      <Aprobacion
        cordinador={true}
        control_solicitud_aprobada={control_solicitud_aprobada}
        get_values={get_values}
      />

      <Grid container direction="row" padding={2} spacing={2}>
        <Grid item xs={12} md={3}>
          <FormButton
            variant_button="contained"
            on_click_function={handle_submit(on_submit_aprobacion)}
            icon_class={<LibraryAddCheckIcon />}
            label={'Aprobar solicitud'}
            type_button="button"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormButton
            variant_button="contained"
            on_click_function={handle_open_select_model}
            icon_class={<SearchIcon />}
            label={'Buscar solicitud'}
            type_button="button"
            disabled={false}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Limpiar
            dispatch={dispatch}
            reset_state={reset_state}
            set_initial_values={initial_values}
            variant_button={'outlined'}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default AprobacionSolicitudCoordinadorScreen;
