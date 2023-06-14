import { Grid } from "@mui/material";
import { Title } from "../../../../components/Title";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../../../hooks';

// import { add_siembra_service, edit_siembra_service,  get_germination_beds_id_service,  get_germination_beds_service, get_items_mortalidad_service } from "../store/thunks/produccionThunks";
import FormButton from "../../../../components/partials/form/FormButton";
import SaveIcon from '@mui/icons-material/Save';
import SeleccionarIncidencia from "../componentes/SeleccionarIncidencia";
import SeleccionarLoteCuarentena from "../componentes/SeleccionarLoteCuarentena";
import SeleccionarBienPreparacion from "../componentes/SeleccionarBienPreparacion";
import { type IObjNursery, type IObjPreparacionBienes, type IObjIncidencia } from "../interfaces/produccion";
import { initial_state_current_material_vegetal, set_current_siembra_material_vegetal, set_current_nursery, initial_state_current_bien, set_current_bien, set_preparacion_bienes, set_current_incidencia } from "../store/slice/produccionSlice";
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../auth/interfaces';
import { add_incidencia_service, annul_incidencia_service, edit_incidencia_service, get_bien_incidencia_id_service, get_person_id_service } from "../store/thunks/produccionThunks";
import { useForm } from "react-hook-form";
import AnularEliminar from "../../componentes/AnularEliminar";
import Block from '@mui/icons-material/Block';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function RegistroIncidenciaScreen(): JSX.Element {
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);

  const { current_incidencia, changing_person, nurseries, current_nursery, preparacion_bienes, current_siembra_material_vegetal } = useAppSelector((state) => state.produccion);
  
  const { control: control_incidencia, handleSubmit: handle_submit, reset: reset_incidencia, getValues: get_values, watch } = useForm<IObjIncidencia>();
  
 
  const [action, set_action] = useState<string>("Crear")
  const dispatch = useAppDispatch()

  useEffect(() => {
    reset_incidencia({ 
        ...current_incidencia, 
        id_persona_crea: changing_person?.id_persona, 
        persona_crea: changing_person.nombre_completo
      })
    
  }, [changing_person]);

  useEffect(() => {
    void dispatch(get_person_id_service(userinfo.id_persona))
  }, []);

  
  useEffect(() => {
    if(current_incidencia.id_incidencia !== null && current_incidencia.id_incidencia !== undefined){
      set_action("editar")   
      void dispatch(get_bien_incidencia_id_service(current_incidencia.id_incidencia)); 
      if(current_incidencia.id_persona_crea !== null ){
        void dispatch(get_person_id_service(current_incidencia.id_persona_crea?? 0))
      }
    } 
    reset_incidencia(current_incidencia)
  }, [current_incidencia]);

  useEffect(() => {
    dispatch(set_current_siembra_material_vegetal(initial_state_current_material_vegetal))
    dispatch(set_preparacion_bienes([]))
    dispatch(set_current_bien(initial_state_current_bien))
  }, [current_nursery]);

  useEffect(() => {
    if(current_siembra_material_vegetal.id_bien !== null && current_siembra_material_vegetal.id_bien !== undefined){
        dispatch(set_current_incidencia({
            ...current_incidencia,
            id_bien: current_siembra_material_vegetal.id_bien,
            agno_lote: current_siembra_material_vegetal.agno_lote,
            nro_lote: current_siembra_material_vegetal.nro_lote,
            cod_etapa_lote: current_siembra_material_vegetal.cod_etapa_lote,
            id_persona_crea: changing_person?.id_persona, 
            persona_crea: changing_person.nombre_completo,
            id_vivero: get_values("id_vivero"), 
            fecha_incidencia: get_values("fecha_incidencia"), 
            cod_tipo_incidencia: get_values("cod_tipo_incidencia"), 
            altura_lote_en_cms: get_values("altura_lote_en_cms"), 
            nombre_incidencia: get_values("nombre_incidencia"), 
            descripcion: get_values("descripcion"),
        }))
    }
}, [current_siembra_material_vegetal]);
  
  useEffect(() => {
    if (watch("id_vivero") !== null) {
      const vivero: IObjNursery | undefined = nurseries.find((p: IObjNursery) => p.id_vivero === watch("id_vivero"))
      if (vivero !== undefined) {
        dispatch(set_current_nursery(vivero))
      }
    }
  }, [watch("id_vivero")]);

  const on_submit = (data: IObjIncidencia): void => {
    const form_data: any = new FormData();

    if (current_incidencia.id_incidencia !== null && current_incidencia.id_incidencia !== undefined) {
      set_action("editar")
      const aux_items : IObjPreparacionBienes[] = []
      preparacion_bienes.forEach((element: IObjPreparacionBienes, index: number) => {
        aux_items.push({...element, nro_posicion: index})
      });
      
      form_data.append('data_incidencia', JSON.stringify({ ...data }));
      form_data.append('ruta_archivo_soporte', data.ruta_archivo_soporte);
      form_data.append('items_detalle', JSON.stringify(aux_items));

      void dispatch(edit_incidencia_service(current_incidencia.id_incidencia, form_data));
    } else {
      set_action("crear")
      const fecha = new Date(data.fecha_incidencia??"").toISOString()

      const data_edit = {
        ...data, fecha_incidencia: fecha.slice(0,10) + " " + fecha.slice(11,19)
      }
      const aux_items : IObjPreparacionBienes[] = []
      preparacion_bienes.forEach((element: IObjPreparacionBienes, index: number) => {
        aux_items.push({...element, nro_posicion: index, id_bien_usado: element.id_item_preparacion_mezcla})
      });
     
      form_data.append('data_incidencia', JSON.stringify({ ...data_edit }));
      form_data.append('ruta_archivo_soporte', data.ruta_archivo_soporte);
      form_data.append('items_detalle', JSON.stringify(aux_items));
      void dispatch(add_incidencia_service(form_data));
    }
  };
  
  const on_submit_annul = (data: IObjIncidencia): void => {
    if (current_incidencia.id_incidencia !== null && current_incidencia.id_incidencia !== undefined) {
      void dispatch(annul_incidencia_service(current_incidencia.id_incidencia, data));
    }
  };
 

    return (
      <>
      <Grid
      container
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
        <Title title="Registro de incidencias"></Title>
      </Grid>
      <SeleccionarIncidencia
        control_incidencia={control_incidencia}
        get_values={get_values}
          />
      {current_nursery.id_vivero !== null &&
      <>
        <SeleccionarLoteCuarentena/>
        <SeleccionarBienPreparacion/>
      </>
      }
      <Grid
        container
        direction="row"
        padding={2}
        spacing={2}
      >
        {!(current_incidencia.incidencia_anulado === true) &&

          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="contained"
              on_click_function={handle_submit(on_submit)}
              icon_class={<SaveIcon />}
              label={action}
              type_button="button"
            />
          </Grid>
        }
       
        <Grid item xs={12} md={3}>
            <AnularEliminar
              action= {current_incidencia.incidencia_anulado === true ? "Detalle anulación" :"Anular" }
              button_icon_class= {<Block/>}
              button_disabled= {false}
              modal_title= {current_incidencia.incidencia_anulado === true ? "Detalle anulación" :"Anular mortalidad"}
              button_submit_label= { "Anular"}
              button_submit_disabled= {current_incidencia.incidencia_anulado}
              button_submit_icon_class= {<Block/>}
              button_submit_action= {handle_submit(on_submit_annul)}
              modal_inputs= {[
                {
                  datum_type: "input_controller",
                  person: true,
                  xs: 12,
                  md: 6,
                  control_form: control_incidencia,
                  control_name: current_incidencia.incidencia_anulado === true ? "persona_anula":"persona",
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
                  md: 6,
                  control_form: control_incidencia,
                  control_name: current_incidencia.incidencia_anulado === true ? "fecha_anulacion":"fecha",
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
                  control_form: control_incidencia,
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
    
      </>
    );
  }
  