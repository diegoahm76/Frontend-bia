/* eslint-disable react/jsx-no-undef */
// eslint-disable-next-line @typescript-eslint/no-redeclare

import { useEffect } from 'react';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import "react-datepicker/dist/react-datepicker.css";
import { Grid } from '@mui/material';
import FormButton from "../../../../components/partials/form/FormButton";
import { useForm } from 'react-hook-form';
import { set_current_solicitud } from '../../solicitudMaterial/store/slices/indexSolicitud';
import { type IObjNursery, type IObjSolicitudVivero } from '../../solicitudMaterial/interfaces/solicitudVivero';
import { aprobacion_solicitud_funcionacio, get_bienes_solicitud, get_funcionario_id_service, get_nurcery, get_person_id_service, get_solicitud_id_service, get_solicitudes_despacho, get_uni_organizacional } from '../../solicitudMaterial/store/thunks/solicitudViveroThunks';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import SeleccionarSolicitudAprobada from '../../solicitudMaterial/components/SeleccionarSolicitudAprobacion';
import DestinoAprobacion from '../../solicitudMaterial/components/DestinoEleAprobacion';
import PersonaResponsableAprobacion from '../../solicitudMaterial/components/PersonaRespoAprobacion';
import SeleccionBienAprobacion from '../../solicitudMaterial/components/SeleccionBienAprobacion';
import { type IObjDespacho } from '../interfaces/distribucion';
import SeleccionarDespacho from '../componentes/SeleccionarDespacho';
import { set_current_despacho, set_transfer_person, set_origin_nursery } from '../store/slice/distribucionSlice';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../auth/interfaces';
import { get_bienes_despacho, get_num_despacho, get_person_id_service as get_person_id_despacho } from '../store/thunks/distribucionThunks';




// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unused-vars
const DespachoScreen = () => {

  const { control: control_despacho, handleSubmit: handle_submit, reset: reset_despacho, getValues: get_values, watch: watch_despacho } = useForm<IObjDespacho>();
  const { control: control_solicitud_aprobada, reset: reset_solicitud, getValues: get_values_solicitud } = useForm<IObjSolicitudVivero>();
  const { current_solicitud, nurseries, persona_solicita, current_funcionario, } = useAppSelector((state) => state.solicitud_vivero);
  const { origin_nursery, transfer_person, current_despacho, nro_despacho } = useAppSelector((state) => state.distribucion);

  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);

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
    reset_despacho(current_solicitud)
    if ('persona_crea' in current_despacho) {
      reset_despacho(current_despacho)
    } else {
      if (current_despacho.id_persona_despacha !== null && current_despacho.id_persona_despacha !== undefined)
        void dispatch(get_person_id_despacho(current_despacho.id_persona_despacha)) // get persona despacho
    }
    if (current_despacho.id_despacho_viveros !== null && current_despacho.id_despacho_viveros !== undefined) {
      void dispatch(get_bienes_despacho(current_despacho.id_despacho_viveros)) // get bienes despacho
      void dispatch(get_solicitud_id_service(current_despacho.id_solicitud_a_viveros ?? 0))  
    }

  }, [current_despacho]);

  useEffect(() => {
    dispatch(set_current_solicitud({ ...current_solicitud, id_persona_solicita: persona_solicita.id_persona, persona_solicita: persona_solicita.nombre, nombre_unidad_organizacional: persona_solicita.unidad_organizacional, id_unidad_org_del_responsable: persona_solicita.id_unidad_organizacional_actual }))
  }, [persona_solicita]);

  useEffect(() => {
    dispatch(set_current_despacho({ 
      ...current_despacho,
       id_persona_despacha: transfer_person.id_persona, 
       persona_crea: persona_solicita.nombre,
       nro_despachos_viveros: nro_despacho, 
      }))
  }, [transfer_person]);


  const get_solicitudes_filtro: any = (async () => {
    const nro_solicitud = get_values_solicitud("nro_solicitud") ?? ""
    const fecha_despacho = get_values("fecha_despacho") ?? ""
    const format_date =  new Date(fecha_despacho??"").toISOString()
   
    if(origin_nursery.id_vivero !== null){
      console.log(nro_solicitud, format_date)
      void dispatch(get_solicitudes_despacho(origin_nursery.id_vivero, nro_solicitud, format_date.slice(0,10) + " " + format_date.slice(11,19)))
    }
  })

  const on_submit_aprobacion = (data: IObjSolicitudVivero): void => {
    const form_data = {
      estado_aprobacion_responsable: data.estado_aprobacion_responsable,
      justificacion_aprobacion_responsable: data.justificacion_aprobacion_responsable,
      fecha_aprobacion_responsable: null,
      revisada_responsable: null,
      solicitud_abierta: null,
      fecha_cierra_solicitud: null
    }

    void dispatch(aprobacion_solicitud_funcionacio(form_data, data.id_solicitud_vivero))
  }





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

      <SeleccionBienAprobacion />

      <Grid
        container
        direction="row"
        padding={2}
        spacing={2}
      >
        <Grid item xs={12} md={3}>
          <FormButton
            variant_button="contained"
            on_click_function={handle_submit(on_submit_aprobacion)}
            icon_class={< LibraryAddCheckIcon />}
            label={"Aprobar solicitud"}
            type_button="button" />
        </Grid>

      

      </Grid>
    </Grid>

  )



};


// eslint-disable-next-line no-restricted-syntax
export default DespachoScreen;

  