import { Grid } from "@mui/material";
import { Title } from "../../../../components/Title";
import SeleccionarCambio from "../componentes/SeleccionarCambio";
import SeleccionarMaterialVegetal from "../componentes/SeleccionarMaterialVegetal";
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { set_current_stage_change, set_current_nursery} from '../store/slice/produccionSlice';
import { useEffect, useState } from "react";
// import { add_siembra_service, edit_siembra_service,  get_germination_beds_id_service,  get_germination_beds_service, get_planting_goods_service } from "../store/thunks/produccionThunks";
import { type IObjNursery, type IObjChange } from "../interfaces/produccion";
import { useForm } from "react-hook-form";
import FormButton from "../../../../components/partials/form/FormButton";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import PersonaCambia from "../componentes/PersonaCambia";
import { add_stage_change_service } from "../store/thunks/produccionThunks";

// eslint-disable-next-line @typescript-eslint/naming-convention
export function CambioEtapaScreen(): JSX.Element {

  const { current_stage_change, changing_person, nurseries, current_nursery, current_vegetal_material} = useAppSelector((state) => state.produccion);
  const { control: control_cambio, handleSubmit: handle_submit, reset: reset_cambio, getValues: get_values_cambio, watch: watch_cambio } = useForm<IObjChange>();
  const { control: control_material, reset: reset_material_vegetal, getValues: get_values_material } = useForm<IObjChange>();
  const [action, set_action] = useState<string>("Crear")
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(set_current_stage_change({ ...current_stage_change, id_persona_cambia: changing_person?.id_persona, id_vivero: get_values_cambio("id_vivero"), id_bien: get_values_cambio("id_bien"), fecha_cambio: get_values_cambio("fecha_cambio"), cantidad_movida: get_values_cambio("cantidad_movida"), altura_lote_en_cms: get_values_cambio("altura_lote_en_cms"), observaciones: get_values_cambio("observaciones") }))
  }, [changing_person]);

  useEffect(() => {
    reset_cambio(current_stage_change)
  }, [current_stage_change]);

  useEffect(() => {
    reset_material_vegetal(current_vegetal_material)
    dispatch(set_current_stage_change({ ...current_stage_change, id_bien: current_vegetal_material.id_bien, agno_lote: current_vegetal_material.agno_lote, nro_lote: current_vegetal_material.nro_lote, cod_etapa_lote_origen: current_vegetal_material.cod_etapa_lote, cantidad_disponible_al_crear: current_vegetal_material.cantidad_disponible, fecha_cambio: get_values_cambio("fecha_cambio"), cantidad_movida: get_values_cambio("cantidad_movida"), altura_lote_en_cms: get_values_cambio("altura_lote_en_cms"), observaciones: get_values_cambio("observaciones") }))
  }, [current_vegetal_material]);

  useEffect(() => {
    if (watch_cambio("id_vivero") !== null) {
      const vivero: IObjNursery | undefined = nurseries.find((p: IObjNursery) => p.id_vivero === watch_cambio("id_vivero"))
      if (vivero !== undefined) {
        dispatch(set_current_stage_change({...current_stage_change, id_vivero: vivero.id_vivero}))
        dispatch(set_current_nursery(vivero))
      }
    }
  }, [watch_cambio("id_vivero")]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const on_submit = (data: IObjChange) => {
    const form_data:any = new FormData();
   
    // if (current_stage_change.id_siembra !== null && current_stage_change.id_siembra !== undefined) {
    //   set_action("editar")
    //   const data_edit = {
    //     ...data, distancia_entre_semillas: Number(data.distancia_entre_semillas)
    //   }
    //   const data_update = {
    //     data_siembra: data_edit,
    //     data_bienes_consumidos: planting_goods
    //   }
    //   console.log("editar")
    //   console.log(data_update)
    //     void dispatch(edit_siembra_service(data_update, current_stage_change.id_siembra));
    // } else {
      set_action("crear")
      console.log(data)
      const fecha = new Date(data.fecha_cambio??"").toISOString()

      form_data.append('id_bien', data.id_bien);
      form_data.append('id_vivero', data.id_vivero);
      form_data.append('agno_lote', data.agno_lote);
      form_data.append('nro_lote', data.nro_lote);
      form_data.append('cod_etapa_lote_origen', data.cod_etapa_lote_origen);
      form_data.append('fecha_cambio', fecha.slice(0,10) + " " + fecha.slice(11,19));
      form_data.append('cantidad_disponible_al_crear', data.cantidad_disponible_al_crear);
      form_data.append('cantidad_movida', Number(data.cantidad_movida));
      form_data.append('altura_lote_en_cms', Number(data.altura_lote_en_cms));
      form_data.append('observaciones', data.observaciones);
      form_data.append('id_persona_cambia', data.id_persona_cambia);
      form_data.append('ruta_archivo_soporte', data.ruta_archivo_soporte);
      void dispatch(add_stage_change_service(form_data));
    // }
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
          <Title title="Cambios de etapa material vegetal"></Title>
        </Grid>

        <SeleccionarCambio
          control_cambio={control_cambio}
          get_values={get_values_cambio}
        />
        {current_nursery.id_vivero !== null &&
          <SeleccionarMaterialVegetal 
          control_material_vegetal={control_material}
          get_values={get_values_material}/>
        } 
        <PersonaCambia
          title={"Persona que realiza el cambio"}
        />
        <Grid
          container
          direction="row"
          padding={2}
          spacing={2}
        >
          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="contained"
              on_click_function={handle_submit(on_submit)}
              icon_class={<SaveIcon />}
              label={action}
              type_button="button"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormButton
              variant_button="contained"
              on_click_function={null}
              icon_class={<CheckIcon />}
              label={"Confirmar distribucion"}
              type_button="button"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="outlined"
              on_click_function={null}
              icon_class={<CloseIcon />}
              label={"Cancelar"}
              type_button="button"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
