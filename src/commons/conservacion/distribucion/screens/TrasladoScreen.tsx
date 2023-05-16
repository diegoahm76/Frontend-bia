import { Grid } from "@mui/material";
import { Title } from "../../../../components/Title";
import FormButton from "../../../../components/partials/form/FormButton";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { type IObjNursery, type IObjTransfer } from "../interfaces/distribucion";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { get_person_id_service, get_transfer_goods_service } from "../store/thunks/distribucionThunks";
import SeleccionarTraslado from "../componentes/SeleccionarTraslado";
import SeleccionarBienTraslado from "../componentes/SeleccionarBienTraslado";
import { set_destination_nursery, set_origin_nursery } from "../store/slice/distribucionSlice";


// eslint-disable-next-line @typescript-eslint/naming-convention
export function TrasladoScreen(): JSX.Element {

  const { current_transfer, transfer_person, nurseries, origin_nursery } = useAppSelector((state) => state.distribucion);
  const { control: control_traslado, handleSubmit: handle_submit, reset: reset_traslado, getValues: get_values, setValue: set_values, watch } = useForm<IObjTransfer>();
  const dispatch = useAppDispatch()
  const [action, set_action] = useState<string>("Crear")
  const [aux_nurseries_origin, set_aux_nurseries_origin] = useState<IObjNursery[]>([])
  const [aux_nurseries_destination, set_aux_nurseries_destination] = useState<IObjNursery[]>([])

  useEffect(() => {
    reset_traslado({ ...current_transfer, id_persona_traslada: transfer_person?.id_persona, persona_traslada: transfer_person?.nombre_completo})
  }, [transfer_person]);

  useEffect(() => {
    set_aux_nurseries_origin(nurseries)
    set_aux_nurseries_destination(nurseries)
  }, [nurseries]);

  useEffect(() => {
    if(current_transfer.id_traslado !== null){
      void dispatch(get_transfer_goods_service(Number(current_transfer.id_traslado)));  
      void dispatch(get_person_id_service( Number(current_transfer.id_persona_anula?? 0))); 
      set_action("editar")
    }
    reset_traslado(current_transfer)
  }, [current_transfer]);

  useEffect(() => {
    if (watch("id_vivero_origen") !== null) {
      const vivero: IObjNursery | undefined = nurseries.find((p: IObjNursery) => p.id_vivero === watch("id_vivero_origen"))
      if (vivero !== undefined) {
        dispatch(set_origin_nursery(vivero))
        if(vivero.id_vivero === get_values("id_vivero_destino")){
          set_values("id_vivero_destino", null)
        }
        const indice = nurseries.findIndex(function(objeto) {
          return objeto.id_vivero === vivero.id_vivero;
        });
        if (indice !== -1) {
          const aux_items: IObjNursery[] = [...nurseries]
          aux_items.splice(indice, 1);
          set_aux_nurseries_destination(aux_items)
        }
      }
    }
  }, [watch("id_vivero_origen")]);

  useEffect(() => {
    if (watch("id_vivero_destino") !== null) {
      const vivero: IObjNursery | undefined = nurseries.find((p: IObjNursery) => p.id_vivero === watch("id_vivero_destino"))
      if (vivero !== undefined) {
        dispatch(set_destination_nursery(vivero))
        if(vivero.id_vivero === get_values("id_vivero_origen")){
          set_values("id_vivero_origen", null)
        }
        const indice = nurseries.findIndex(function(objeto) {
          return objeto.id_vivero === vivero.id_vivero;
        });
        if (indice !== -1) {
          const aux_items: IObjNursery[] = [...nurseries]
          aux_items.splice(indice, 1);
          set_aux_nurseries_origin(aux_items)
        }
      }
    }
  }, [watch("id_vivero_destino")]);



 

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
          <Title title="Traslado entre viveros"></Title>
        </Grid>

        <SeleccionarTraslado
          control_traslado={control_traslado}
          get_values={get_values}
          origin_nursery_list={aux_nurseries_origin}
          destination_nursery_list={aux_nurseries_destination}
        />
       <SeleccionarBienTraslado />
        
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
              label={action}
              type_button="button"
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="outlined"
              on_click_function={null}
              icon_class={<CloseIcon />}
              label={"Eliminar"}
              type_button="button"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
  }
  