/* eslint-disable react/jsx-no-undef */
// eslint-disable-next-line @typescript-eslint/no-redeclare

import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Grid } from '@mui/material';
import FormButton from "../../../../components/partials/form/FormButton";
import { useForm } from 'react-hook-form';
import { set_current_solicitud } from '../../solicitudMaterial/store/slices/indexSolicitud';
import { type IObjNursery } from '../../solicitudMaterial/interfaces/solicitudVivero';
import { get_bienes_solicitud, get_funcionario_id_service, get_nurcery, get_person_id_service, get_solicitud_id_service, get_solicitudes_despacho, get_uni_organizacional } from '../../solicitudMaterial/store/thunks/solicitudViveroThunks';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import SeleccionarSolicitudAprobada from '../../solicitudMaterial/components/SeleccionarSolicitudAprobacion';
import DestinoAprobacion from '../../solicitudMaterial/components/DestinoEleAprobacion';
import PersonaResponsableAprobacion from '../../solicitudMaterial/components/PersonaRespoAprobacion';
import ListadoBienesSolicitud from '../../solicitudMaterial/components/ListadoBienesSolicitud';
import { type IObjBienDespacho, type IObjDespacho } from '../interfaces/distribucion';
import SeleccionarDespacho from '../componentes/SeleccionarDespacho';
import SeleccionarBienDespacho from '../componentes/SeleccionarBienDespacho';
import { set_current_despacho, set_transfer_person, set_origin_nursery } from '../store/slice/distribucionSlice';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../auth/interfaces';
import { get_bienes_despacho, get_num_despacho, get_person_id_service as get_person_id_despacho, annul_despacho_service, crear_despacho, editar_despacho } from '../store/thunks/distribucionThunks';
import AnularEliminar from '../../componentes/AnularEliminar';
import Block from '@mui/icons-material/Block';
import SaveIcon from '@mui/icons-material/Save';




// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unused-vars
const DespachoScreen = () => {

  const { control: control_despacho, handleSubmit: handle_submit, reset: reset_despacho, getValues: get_values, watch: watch_despacho } = useForm<IObjDespacho>();
  const { control: control_solicitud_aprobada, reset: reset_solicitud, getValues: get_values_solicitud } = useForm<IObjDespacho>();
  const { current_solicitud, nurseries, persona_solicita, current_funcionario, } = useAppSelector((state) => state.solicitud_vivero);
  const { origin_nursery, transfer_person, current_despacho, nro_despacho, bienes_despacho } = useAppSelector((state) => state.distribucion);

  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const [action, set_action] = useState<string>("Crear")

  useEffect(() => {
    void dispatch(get_uni_organizacional());
    void dispatch(get_num_despacho());
    void dispatch(get_nurcery())
    dispatch(set_transfer_person({ nombre_completo: userinfo.nombre, id_persona: userinfo.id_persona }))

  }, [])


  useEffect(() => {
    console.log(watch_despacho("id_vivero"))
    if (watch_despacho("id_vivero") !== null) {
      const vivero: IObjNursery | undefined = nurseries.find((p: IObjNursery) => p.id_vivero === watch_despacho("id_vivero"))
      if (vivero !== undefined) {
        dispatch(set_origin_nursery(vivero))
      }
    }
  }, [watch_despacho("id_vivero")]);

  useEffect(() => {
    dispatch(set_current_despacho({ 
      ...current_despacho, 
      nro_despachos_viveros: nro_despacho, 
      id_persona_despacha: transfer_person.id_persona, 
      persona_crea: transfer_person.nombre_completo }))

  }, [nro_despacho]);


  useEffect(() => {
    // console.log(current_solicitud)
    reset_solicitud(current_solicitud)
    if ('persona_solicita' in current_solicitud) {
      reset_solicitud(current_solicitud)
    } else {
      if (current_solicitud.id_persona_solicita !== null && current_solicitud.id_persona_solicita !== undefined)
        void dispatch(get_person_id_service(current_solicitud.id_persona_solicita))
    }
    if (current_solicitud.id_solicitud_vivero !== null && current_solicitud.id_solicitud_vivero !== undefined) {
      void dispatch(get_bienes_solicitud(current_solicitud.id_solicitud_vivero))
      if (current_solicitud.id_funcionario_responsable_und_destino !== current_funcionario.id_persona) {
        void dispatch(get_funcionario_id_service(current_solicitud.id_funcionario_responsable_und_destino ?? 0))  
      }
    }

  }, [current_solicitud]);

  useEffect(() => {
    // console.log(current_solicitud)
    console.log(current_despacho)
    reset_despacho(current_despacho)
    if ('persona_crea' in current_despacho) {
      reset_despacho(current_despacho)
    } else {
      if (current_despacho.id_persona_despacha !== null && current_despacho.id_persona_despacha !== undefined)
        void dispatch(get_person_id_despacho(current_despacho.id_persona_despacha)) // get persona despacho
    }
    if (current_despacho.id_despacho_viveros !== null && current_despacho.id_despacho_viveros !== undefined) {
      set_action("editar")
      void dispatch(get_bienes_despacho(current_despacho.id_despacho_viveros)) // get bienes despacho
      void dispatch(get_solicitud_id_service(current_despacho.id_solicitud_a_viveros ?? 0))  
    }

  }, [current_despacho]);

  useEffect(() => {
    dispatch(set_current_solicitud({ ...current_solicitud, id_persona_solicita: persona_solicita.id_persona, persona_solicita: persona_solicita.nombre, nombre_unidad_organizacional: persona_solicita.unidad_organizacional, id_unidad_org_del_responsable: persona_solicita.id_unidad_organizacional_actual }))
  }, [persona_solicita]);

  useEffect(() => {
    console.log(transfer_person)
    dispatch(set_current_despacho({ 
      ...current_despacho,
       id_persona_despacha: transfer_person.id_persona, 
       persona_crea: transfer_person.nombre_completo,
      }))
  }, [transfer_person]);


  const get_solicitudes_filtro: any = (async () => {
    const nro_solicitud = get_values_solicitud("nro_solicitud_a_viveros") ?? ""
    const fecha_despacho = get_values("fecha_despacho") ?? ""
    const format_date =  new Date(fecha_despacho??"").toISOString()
   
    if(origin_nursery.id_vivero !== null){
      console.log(nro_solicitud, format_date)
      void dispatch(get_solicitudes_despacho(origin_nursery.id_vivero, nro_solicitud, format_date.slice(0,10) + " " + format_date.slice(11,19)))
    }
  })

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const on_submit = (data: IObjDespacho): void => {
      const form_data: any = new FormData();
      if (current_despacho.id_despacho_viveros !== null && current_despacho.id_despacho_viveros !== undefined) {
        set_action("editar")
  
       
        const aux_items: IObjBienDespacho[] = []
        bienes_despacho.forEach((element: IObjBienDespacho, index: number) => {
          aux_items.push({ ...element, nro_posicion_en_despacho: index })
        });
  
        form_data.append('info_despacho', JSON.stringify({ ...data }));
        form_data.append('ruta_archivo_con_recibido', data.ruta_archivo_con_recibido);
        form_data.append('items_despacho', JSON.stringify(aux_items));
        void dispatch(editar_despacho(current_despacho.id_despacho_viveros, form_data));
      } else {
        set_action("crear")
        const fecha = new Date(data.fecha_despacho ?? "").toISOString()
  
        const data_edit = {
          ...data, fecha_despacho: fecha.slice(0, 10) + " " + fecha.slice(11, 19), 
        }
        const aux_items: IObjBienDespacho[] = []
        bienes_despacho.forEach((element: IObjBienDespacho, index: number) => {
          aux_items.push({ ...element, nro_posicion_en_despacho: index })
        });
        const aux = {
          info_despacho: { ...data_edit, id_solicitud_a_viveros: current_solicitud.id_solicitud_vivero },
          ruta_archivo_con_recibido: data.ruta_archivo_con_recibido,
          items_despacho: aux_items
        }
        console.log(aux)
        form_data.append('info_despacho', JSON.stringify({ ...data_edit, id_solicitud_a_viveros: current_solicitud.id_solicitud_vivero }));
        form_data.append('ruta_archivo_con_recibido', data.ruta_archivo_con_recibido);
        form_data.append('items_despacho', JSON.stringify(aux_items));
        void dispatch(crear_despacho(form_data));
      }
    }
  
    const on_submit_annul = (data: IObjDespacho): void => {
      const data_annul = {
        justificacion: data.justificacion_anulacion,
      }
      console.log(data_annul)
      if (current_despacho.id_despacho_viveros !== null && current_despacho.id_despacho_viveros !== undefined) {
        void dispatch(annul_despacho_service(current_despacho.id_despacho_viveros, data_annul));
      }
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

      }}
    >
      <SeleccionarDespacho
        control_despacho={control_despacho}
        get_values={get_values}  />

      <SeleccionarSolicitudAprobada
        title={"Solicitud"}
        control_solicitud_aprobada={control_solicitud_aprobada}
        get_values={get_values_solicitud} 
        function_search= {get_solicitudes_filtro}
        despacho= {true} />

      <PersonaResponsableAprobacion
        title={"Funcionario responsable"}
        get_values_solicitud={get_values_solicitud} />


      <DestinoAprobacion
        title={"Destino de los elementos"}
        control_solicitud_aprobada={control_solicitud_aprobada}
        get_values={get_values_solicitud} />

      <ListadoBienesSolicitud />
      <SeleccionarBienDespacho />

      <Grid
        container
        direction="row"
        padding={2}
        spacing={2}
      >
        {!(current_despacho.despacho_anulado === true) &&

            <Grid item xs={12} md={3}>
              <FormButton
                variant_button="contained"
                on_click_function={handle_submit(on_submit)}
                icon_class={<SaveIcon />}
                label={action}
                type_button="button" />
            </Grid>
        }
        <Grid item xs={12} md={3}>
            <AnularEliminar
              action= {current_despacho.despacho_anulado === true ? "Detalle anulación" :"Anular" }
              button_icon_class= {<Block/>}
              button_disabled= {false}
              modal_title= {current_despacho.despacho_anulado === true ? "Detalle anulación" :"Anular despacho"}
              button_submit_label= { "Anular"}
              button_submit_disabled= {current_despacho.despacho_anulado}
              button_submit_icon_class= {<Block/>}
              button_submit_action= {handle_submit(on_submit_annul)}
              modal_inputs= {[
                {
                  datum_type: "input_controller",
                  xs: 12,
                  md: 4,
                  control_form: control_despacho,
                  control_name: "nro_despachos_viveros",
                  default_value: "",
                  rules: {},
                  label: "Numero despacho",
                  type: "number",
                  disabled: true,
                  helper_text: "",
              },
                {
                  datum_type: "input_controller",
                  person: true,
                  xs: 12,
                  md: 4,
                  control_form: control_despacho,
                  control_name: "persona_anula",
                  default_value: "",
                  rules: { required_rule: { rule: true, message: "Debe seleccionar la personas que la creó" } },
                  label: "Anulación realizada por",
                  type: "text",
                  disabled: true,
                  helper_text: ""
              },
                {
                  datum_type: "date_picker_controller",
                  xs: 12,
                  md: 4,
                  control_form: control_despacho,
                  control_name: current_solicitud.solicitud_anulada_solicitante === true ? "fecha_anulacion":"fecha",
                  default_value: (new Date().toString()),
                  rules: { required_rule: { rule: true, message: "requerido" } },
                  label: "Fecha actual",
                  type: "text",
                  disabled: true,
                  helper_text: ""
                },
                {
                  datum_type: "input_controller",
                  xs: 12,
                  md: 12,
                  control_form: control_despacho,
                  control_name: "justificacion_anulacion",
                  default_value: "",
                  rules: { required_rule: { rule: true, message: "Observación requerida" } },
                  label: "Justificacion",
                  type: "text",
                  multiline_text: true,
                  rows_text: 4,
                  disabled: false,
                  helper_text: ""
                },
              ]}
            />
          </Grid>

      </Grid>
    </Grid>

  )



};


// eslint-disable-next-line no-restricted-syntax
export default DespachoScreen;

  