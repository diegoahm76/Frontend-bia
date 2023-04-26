import { Grid } from "@mui/material";
import { Title } from "../../../../components/Title";
import SeleccionarSiembra from "../componentes/SeleccionarSiembra";
import SeleccionarBienSiembra from "../componentes/SeleccionarBienSiembra";
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {  set_current_planting, set_current_nursery } from '../store/slice/materialvegetalSlice';
import { useEffect } from "react";
import { get_germination_beds_service } from "../store/thunks/materialvegetalThunks";
import { type IObjNursery, type IObjPlanting } from "../interfaces/materialvegetal";
import { useForm } from "react-hook-form";
import FormButton from "../../../../components/partials/form/FormButton";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import PersonaSiembra from "../componentes/PersonaSiembra";

// eslint-disable-next-line @typescript-eslint/naming-convention
export function SiembraSemillasScreen(): JSX.Element {


  const { current_planting, planting_person, nurseries, current_nursery, planting_goods } = useAppSelector((state) => state.material_vegetal);
  const { control: control_siembra, handleSubmit: handle_submit, reset: reset_siembra, getValues: get_values, watch} = useForm<IObjPlanting>();
  const dispatch= useAppDispatch()

  useEffect(() => {
    dispatch(set_current_planting({ ...current_planting, id_persona_siembra: planting_person?.id_persona, id_vivero: get_values("id_vivero"), id_bien_sembrado: get_values("id_bien_sembrado"), cama_germinacion: get_values("cama_germinacion"), distancia_entre_semillas: get_values("distancia_entre_semillas"), observaciones: get_values("observaciones") }))
  }, [planting_person]);

 useEffect(() => {
    reset_siembra(current_planting)
  }, [current_planting]);

  useEffect(() => {
    if(watch("id_vivero") !== null){
      void dispatch(get_germination_beds_service(Number(watch("id_vivero"))));
      const vivero: IObjNursery | undefined = nurseries.find((p) => p.id_vivero === watch("id_vivero"))
      
      if(vivero !== undefined) dispatch (set_current_nursery(vivero))
  }
  }, [watch("id_vivero")]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const on_submit = (data: IObjPlanting) => {
    console.log(data)
    if (current_planting.id_siembra !== null && current_planting.id_siembra !== undefined) {
      console.log("editar")
      // void dispatch(edit_bodega_service(data))
    } else {
      console.log("agregar")
      const siembra = [{
        data_siembra: {
          ...data
        },
        ruta_archivo_soporte: "",
        data_bienes_consumidos: {
          ...planting_goods
        }
      }]
      console.log(siembra)
      // void dispatch(add_bodega_service(data));
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
                            label={"guardar"}
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
  