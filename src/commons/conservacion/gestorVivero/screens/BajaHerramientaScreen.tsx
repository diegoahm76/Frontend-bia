import { Grid } from "@mui/material";
import { Title } from "../../../../components/Title";
import { useEffect, useState } from "react";
// import { add_siembra_service, edit_siembra_service,  get_germination_beds_id_service,  get_germination_beds_service, get_planting_goods_service } from "../store/thunks/produccionThunks";
import FormButton from "../../../../components/partials/form/FormButton";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { IObjViveristaActual } from "../interfaces/vivero";
import { useForm } from "react-hook-form";
import BajasHerramientas from "../componentes/SeleccionarBajasHerramientas";
import BajasBienes from "../componentes/SeleccionarBajasBienes";

// eslint-disable-next-line @typescript-eslint/naming-convention
export function BajaHerramientaScreen(): JSX.Element {
  const { control: control_bienes_bajas, handleSubmit:handle_submit, reset: reset_viverista, getValues: get_values} = useForm<IObjViveristaActual>();  

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
      <Title title="Baja de Herramientas"></Title>
      </Grid>
      <BajasHerramientas
      control_genera_bajas={control_bienes_bajas}
      get_values={get_values}/>
      <BajasBienes
      control_bienes_bajas={control_bienes_bajas}
      get_values={get_values}/>
      <Grid
        container
        direction="row"
        padding={2}
        spacing={2}
      >
        <Grid item xs={12} md={3}>
          <FormButton
            variant_button="contained"
            on_click_function={null}
            icon_class={<SaveIcon />}
            label={""}
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
