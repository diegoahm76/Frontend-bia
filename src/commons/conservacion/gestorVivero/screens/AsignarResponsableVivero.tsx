import { Autocomplete, Grid, TextField } from "@mui/material";
import ViveristaActual from "../componentes/ViveristaActual";
import { Title } from "../../../../components/Title";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { type IObjNursery } from "../interfaces/vivero";
import { useEffect, useState } from "react";
import SeleccionarNuevoViverista from "../componentes/SeleccionarNuevoViverista";
import FormSelectController from "../../../../components/partials/form/FormSelectController";
import { useForm } from "react-hook-form";
import FormInputController from "../../../../components/partials/form/FormInputController";
import FormButton from "../../../../components/partials/form/FormButton";
import SaveIcon from '@mui/icons-material/Save';
import { asignar_viverista_service, get_viverista_id_service, get_viveros_viverista_service, remover_viverista_service } from "../store/thunks/gestorViveroThunks";
import { initial_state_current_viverista_nuevo, set_current_nuevo_viverista, set_current_nursery } from "../store/slice/viveroSlice";

interface Iasignar {
  accion_realizar: string | null;
  observaciones: string | null;
}
const initial_state_asignar: Iasignar = {
  accion_realizar: "reemplazar",
  observaciones: ""
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function AsignarResponsableViveroScreen(): JSX.Element {

  const dispatch= useAppDispatch()

  const { control: control_asignar, handleSubmit:handle_submit, reset:reset_asignar, getValues: get_values, watch } = useForm<Iasignar>();

  const { nurseries, current_nursery, current_viverista, current_nuevo_viverista } = useAppSelector((state) => state.nursery);

  const [nursery, set_nursery] = useState<IObjNursery>(current_nursery);
  const [action, set_action] = useState<string>("Reemplazar viverista");
  
  useEffect(() => {
    reset_asignar(initial_state_asignar)
    void dispatch(get_viveros_viverista_service())
  }, []);

  useEffect(() => {
    if (watch("accion_realizar") !== null) {
      if(get_values("accion_realizar") === "reemplazar"){
        if(current_viverista.id_viverista_actual === null){
          set_action("Asignar viverista")
        } else{
          set_action("Reemplazar viverista")
        }
      } else{
        set_action("Remover viverista")
      }
    }
  }, [watch("accion_realizar")]);

  useEffect(() => {
    console.log(nursery)
    dispatch(set_current_nursery(nursery));
  }, [nursery]);

  useEffect(() => {
    if (current_nursery.id_vivero !== null) { 
        void dispatch(get_viverista_id_service(Number(current_nursery.id_vivero ?? 0))) 
    }
    dispatch(set_current_nuevo_viverista(initial_state_current_viverista_nuevo))
}, [current_nursery]);
  useEffect(() => {
      if(current_viverista.id_viverista_actual === null){
        reset_asignar({
          accion_realizar: "reemplazar",
          observaciones: ""
        })
        set_action("Asignar viverista")
      } else{
        reset_asignar({
          accion_realizar: "reemplazar",
          observaciones: ""
        })
        set_action("Reemplazar viverista")
      }
}, [current_viverista]);

  const nurseries_quarantine = {
    options: nurseries,
    getOptionLabel: (option: IObjNursery) => option.nombre,
  };

  const on_submit = (data: Iasignar): void => {
    const id_vivero = current_nursery.id_vivero
          if (id_vivero !== null && id_vivero !== undefined) {
            if(data.accion_realizar === "reemplazar"){
              const data_aux={
                id_persona: current_nuevo_viverista.id_persona,
                observaciones: data.observaciones
              }  
              void dispatch(asignar_viverista_service(id_vivero, data_aux));
            } else{
              const data_aux={
                observaciones: data.observaciones
              }  
              void dispatch(remover_viverista_service(id_vivero, data_aux));

            }
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
              <Title title="Responsable de vivero"></Title>
            </Grid>
            <Grid item xs={12} md={12} margin={2}>
              <Autocomplete
                {...nurseries_quarantine}
                id="controlled-demo"
                value={nursery}
                onChange={(event: any, newValue: any) => {
                  set_nursery(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Seleccione vivero" variant="standard" />
                )}
              />
            </Grid>
            {current_viverista.id_viverista_actual !== null &&
              <>
                <ViveristaActual/>
                <FormSelectController
                  xs= {12}
                  md= {12}
                  control_form= {control_asignar}
                  control_name= "accion_realizar"
                  default_value= "reemplazar"
                  rules= {{ required_rule: { rule: true, message: "Seleccione vivero" } }}
                  label= "Accion a realizar"
                  disabled= {current_nursery.id_vivero === null}
                  helper_text= "debe seleccionar campo"
                  select_options= {[{label: "Remover viverista", value: "remover"}, {label: "Reemplazar viverista", value: "reemplazar"}]}
                  option_label= "label"
                  option_key= "value"
                />
              </>
            }
            {watch("accion_realizar") !== "remover" &&
              <SeleccionarNuevoViverista/>
            }
            <FormInputController
            xs= {12}
            md= {12}
            control_form= {control_asignar}
            control_name= "observaciones"
            default_value= ""
            rules= {{required_rule: { rule: true, message: "Observación requerida" }}}
            label= "Observaciones"
            type= "text"
            disabled= {false}
            multiline_text= {true}
            rows_text={4}
            helper_text= ""
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
                      disabled= {(current_nursery.id_vivero === null) || (get_values("accion_realizar") === "remover")? false : current_nuevo_viverista.id_persona === null}
                  />
              </Grid>
            </Grid>
          </Grid>
        </>
    );
}
