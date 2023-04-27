import { Grid } from "@mui/material";
import { Title } from "../../../../components/Title";
import SeleccionarSiembra from "../componentes/SeleccionarSiembra";
import SeleccionarBienSiembra from "../componentes/SeleccionarBienSiembra";
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { set_current_planting, set_current_nursery } from '../store/slice/materialvegetalSlice';
import { useEffect, useState } from "react";
import { add_siembra_service, edit_siembra_service,  get_germination_beds_id_service,  get_germination_beds_service, get_planting_goods_service } from "../store/thunks/materialvegetalThunks";
import { type IObjNursery, type IObjPlanting } from "../interfaces/materialvegetal";
import { useForm } from "react-hook-form";
import FormButton from "../../../../components/partials/form/FormButton";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import PersonaSiembra from "../componentes/PersonaSiembra";

// eslint-disable-next-line @typescript-eslint/naming-convention
export function SiembraSemillasScreen(): JSX.Element {

  const { current_planting, planting_person, nurseries, current_nursery, planting_goods} = useAppSelector((state) => state.material_vegetal);
  const { control: control_siembra, handleSubmit: handle_submit, reset: reset_siembra, getValues: get_values, watch } = useForm<IObjPlanting>();
  const [action, set_action] = useState<string>("Crear")
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(set_current_planting({ ...current_planting, id_persona_siembra: planting_person?.id_persona, id_vivero: get_values("id_vivero"), id_bien_sembrado: get_values("id_bien_sembrado"), cama_germinacion: get_values("cama_germinacion"), distancia_entre_semillas: get_values("distancia_entre_semillas"), observaciones: get_values("observaciones") }))
  }, [planting_person]);

  useEffect(() => {
    if(current_planting.id_siembra !== null){
      console.log(current_planting)
      const vivero: IObjNursery | undefined = nurseries.find((p: IObjNursery) => p.id_vivero === current_planting.id_vivero)
      if (vivero !== undefined) dispatch(set_current_nursery(vivero))
      void dispatch(get_planting_goods_service(current_planting.id_siembra))
      
    }
    reset_siembra(current_planting)
  }, [current_planting]);

  useEffect(() => {
    if(current_nursery.id_vivero !== null){
      void dispatch(get_germination_beds_service(Number(current_nursery.id_vivero)));
      // void dispatch(get_germination_beds_id_service([10]));
    }
  }, [current_nursery]);

  useEffect(() => {
    if (watch("id_vivero") !== null) {
      const vivero: IObjNursery | undefined = nurseries.find((p: IObjNursery) => p.id_vivero === watch("id_vivero"))

      if (vivero !== undefined) dispatch(set_current_nursery(vivero))
      set_action("editar")
    }
  }, [watch("id_vivero")]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const on_submit = (data: IObjPlanting) => {
    const form_data:any = new FormData();
    console.log("editar")
     
    if (current_planting.id_siembra !== null && current_planting.id_siembra !== undefined) {
      set_action("editar")
      const data_edit = {
        ...data, distancia_entre_semillas: Number(data.distancia_entre_semillas)
      }
      console.log("editar")
        form_data.append('data_siembra', JSON.stringify({...data_edit}));
        form_data.append('data_bienes_consumidos', JSON.stringify(planting_goods));
        void dispatch(edit_siembra_service(form_data, current_planting.id_siembra));
    } else {
      set_action("crear")
      const fecha = new Date(data.fecha_siembra??"").toISOString()

      const data_edit = {
        ...data, fecha_siembra: fecha.slice(0,10) + " " + fecha.slice(11,19), distancia_entre_semillas: Number(data.distancia_entre_semillas)
      }
        form_data.append('data_siembra', JSON.stringify({...data_edit}));
        form_data.append('data_bienes_consumidos', JSON.stringify(planting_goods));
        form_data.append('ruta_archivo_soporte', data.ruta_archivo_soporte);
        void dispatch(add_siembra_service(form_data));
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
          <Title title="Siembras"></Title>
        </Grid>

        <SeleccionarSiembra
          control_siembra={control_siembra}
          get_values={get_values}
        />
        <PersonaSiembra
          title={"Persona que siembra"}
        />
        {current_nursery.id_vivero !== null &&
          <SeleccionarBienSiembra />
        }
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
