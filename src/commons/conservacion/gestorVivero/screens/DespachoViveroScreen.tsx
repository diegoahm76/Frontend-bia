import { Grid, Stack } from "@mui/material";
import SeleccionarDespacho from "../componentes/SeleccionarDespacho";
import { Title } from '../../../../components/Title';
import FormButton from '../../../../components/partials/form/FormButton';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { get_items_despacho_service } from '../store/thunks/gestorViveroThunks';
import { useAppDispatch, useAppSelector } from '../../../../hooks';


// eslint-disable-next-line @typescript-eslint/naming-convention
export function DespachoViveroScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const { current_despacho } = useAppSelector((state) => state.nursery);

  const [add_distribucion_is_active, set_add_distribucion_is_active] = useState<boolean>(false);
  
  const handle_open_add_distribucion = (): void => {
    set_add_distribucion_is_active(true);
};

useEffect(() => {
  const id_despacho = current_despacho.id_despacho_entrante
  if( id_despacho !== null && id_despacho !== undefined){
  void dispatch(get_items_despacho_service(id_despacho));
  }
}, [current_despacho]);
  
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
          <Title title="Distribucion de despachos entrantes"></Title>
        </Grid>
        <SeleccionarDespacho />
        <Stack
            direction="row"
            spacing={2}
            sx={{ mr: '15px', mb: '10px', mt: '10px' }}
          >
            <FormButton
              variant_button="contained"
              on_click_function={handle_open_add_distribucion}
              icon_class={<CloseIcon />}
              type_button= {"button"}
              label={"Realizar distribucion"}
            />
            
          </Stack>
      </Grid>
    </>
  );
}
