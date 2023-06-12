import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Grid } from '@mui/material';
import FormButton from "../../../../components/partials/form/FormButton";
import SaveIcon from '@mui/icons-material/Save';
import type { AuthSlice } from '../../../../commons/auth/interfaces';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

import { Title } from '../../../../components/Title';
import PersonaResponsable from '../components/PersonaResponsable'
import { set_current_solicitud, set_persona_solicita } from '../slices/indexSolicitud';
import { type IObjSolicitudVivero } from '../interfaces/solicitudVivero';
import { get_funcionario_id_service, get_num_solicitud, get_nurcery, get_person_id_service, get_uni_organizacional } from '../slices/solicitudViveroThunks';
import SeleccionarSolicitud from '../components/SeleccionarSolicitud';
import DestinoSolicitud from '../components/DestinoElementos';



// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SolicitudViveroScreen = () => {
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const { control: control_solicitud, reset: reset_solicitud, getValues: get_values } = useForm<IObjSolicitudVivero>();
  const { nro_solicitud, current_solicitud, persona_solicita, current_funcionario } = useAppSelector((state) => state.solicitud_vivero);
  const [action] = useState<string>("Crear solicitud de consumo");
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(get_uni_organizacional());
    void dispatch(get_num_solicitud());
    void dispatch(get_nurcery())
    console.log(get_nurcery)
    dispatch(set_persona_solicita({ nombre: userinfo.nombre, id_persona: userinfo.id_persona, unidad_organizacional: userinfo.nombre_unidad_organizacional }))

  }, [])

  useEffect(() => {
    dispatch(set_current_solicitud({ ...current_solicitud, nro_solicitud_por_tipo: nro_solicitud, id_persona_solicita: persona_solicita.id_persona, persona_solicita: persona_solicita.nombre, nombre_unidad_organizacional: persona_solicita.unidad_organizacional, }))
  }, [nro_solicitud]);

  useEffect(() => {
    // console.log(current_solicitud)
    reset_solicitud(current_solicitud)
    if ('persona_solicita' in current_solicitud) {
      reset_solicitud(current_solicitud)
    } else {
      if (current_solicitud.id_persona_solicita !== null && current_solicitud.id_persona_solicita !== undefined)
        void dispatch(get_person_id_service(current_solicitud.id_persona_solicita))

    }
    if (current_solicitud.id_vivero_solicitud !== null) {
      if (current_solicitud.id_funcionario_responsable_und_destino !== current_funcionario.id_persona) {
        console.log("jgjkglg")
        void dispatch(get_funcionario_id_service(current_solicitud.id_funcionario_responsable_und_destino))
        console.log("ok")
      }
    }

  }, [current_solicitud]);

  useEffect(() => {
    dispatch(set_current_solicitud({ ...current_solicitud, id_persona_solicita: persona_solicita.id_persona, persona_solicita: persona_solicita.nombre, nombre_unidad_organizacional: persona_solicita.unidad_organizacional }))
  }, [persona_solicita]);

  useEffect(() => {
    const observacion = get_values("observaciones")
    const motivo = get_values("motivo")
    const id_unidad_para_la_que_solicita = get_values("id_unidad_para_la_que_solicita")
    if (current_funcionario.id_persona !== current_solicitud.id_funcionario_responsable_und_destino) {
      dispatch(set_current_solicitud({ ...current_solicitud, id_funcionario_responsable_und_destino: current_funcionario.id_persona, observacion, motivo, id_unidad_para_la_que_solicita }))
    }

  }, [current_funcionario]);
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  // const on_submit = (data: IObjSolicitudVivero) => {

  //   const data_aux = {
  //     info_solicitud: { ...data, fecha_anulacion_solicitante: null },
  //     items_solicitud: bienes_solicitud.map((item: any, index: any) => ({
  //       ...item,
  //       nro_posicion: index,
  //     })),
  //   }

  //   void dispatch(crear_solicitud_bien_consumo(data_aux));
  // };





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
        <Title title="Solicitud de consumo "></Title>
      </Grid>
      <SeleccionarSolicitud
        control_solicitud={control_solicitud}
        get_values={get_values} />

      <PersonaResponsable
        title={"Funcionario responsable"}
        get_values_solicitud={get_values} />


      <DestinoSolicitud

        control_solicitud={control_solicitud}
        get_values={get_values} />




      <Grid
        container
        direction="row"
        padding={2}
        spacing={2}
      >
        <Grid item xs={12} md={3}>
          <FormButton
            variant_button="contained"
            // on_click_function={handle_submit(on_submit)}
            icon_class={<SaveIcon />}
            label={action}
            type_button="button" on_click_function={undefined} />
        </Grid>

        <Grid item xs={12} md={10}>



        </Grid>

      </Grid>
    </Grid>

  )



};


// eslint-disable-next-line no-restricted-syntax
export default SolicitudViveroScreen;
