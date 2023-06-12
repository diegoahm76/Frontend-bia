import { Grid } from "@mui/material";
import { Title } from "../../../../components/Title";
import SeleccionarMortalidad from "../componentes/SeleccionarMortalidad";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../../../hooks';

// import { add_siembra_service, edit_siembra_service,  get_germination_beds_id_service,  get_germination_beds_service, get_items_mortalidad_service } from "../store/thunks/produccionThunks";
import FormButton from "../../../../components/partials/form/FormButton";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import SeleccionarLoteSiembra from "../componentes/SeleccionarLoteSiembra";
import { type IObjNursery, type IObjItemMortalidad, type IObjMortalidad } from "../interfaces/produccion";
import { initial_state_current_material_vegetal, set_current_siembra_material_vegetal, set_current_nursery, set_items_mortalidad } from "../store/slice/produccionSlice";
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../auth/interfaces';
import { add_mortalidad_service, edit_mortalidad_service, get_bien_mortalidad_id_service, get_person_id_service } from "../store/thunks/produccionThunks";
import { useForm } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/naming-convention
export function MortalidadPlantasScreen(): JSX.Element {
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);

  const { current_mortalidad, changing_person, nurseries, current_nursery, items_mortalidad, nro_mortalidad } = useAppSelector((state) => state.produccion);
  
  const { control: control_mortalidad, handleSubmit: handle_submit, reset: reset_mortalidad, getValues: get_values, watch } = useForm<IObjMortalidad>();
  
 
  const [action, set_action] = useState<string>("Crear")
  const dispatch = useAppDispatch()

  useEffect(() => {
    reset_mortalidad({ 
        ...current_mortalidad, 
        id_persona_baja: changing_person?.id_persona, 
        persona_baja: changing_person.nombre_completo
      })
    
  }, [changing_person]);

  useEffect(() => {
    void dispatch(get_person_id_service(userinfo.id_persona))
  }, []);

  useEffect(() => {
    if(current_mortalidad.id_baja !== null){
      set_action("editar")   
      void dispatch(get_bien_mortalidad_id_service(current_mortalidad.id_baja)); 
      if(current_mortalidad.id_persona_baja !== null ){
        void dispatch(get_person_id_service(current_mortalidad.id_persona_baja?? 0))
      }
    } 
    reset_mortalidad(current_mortalidad)
  }, [current_mortalidad]);

  useEffect(() => {
    dispatch(set_items_mortalidad([]))
    dispatch(set_current_siembra_material_vegetal(initial_state_current_material_vegetal))
  }, [current_nursery]);
  
  useEffect(() => {
    if (watch("id_vivero") !== null) {
      const vivero: IObjNursery | undefined = nurseries.find((p: IObjNursery) => p.id_vivero === watch("id_vivero"))
      if (vivero !== undefined) {
        dispatch(set_current_nursery(vivero))
      }
    }
  }, [watch("id_vivero")]);

  const on_submit = (data: IObjMortalidad): void => {
    const form_data: any = new FormData();

    if (current_mortalidad.id_baja !== null && current_mortalidad.id_baja !== undefined) {
      set_action("editar")
      const aux_items : IObjItemMortalidad[] = []
      items_mortalidad.forEach((element: IObjItemMortalidad, index: number) => {
        aux_items.push({...element, nro_posicion: index})
      });
      form_data.append('data_mortalidad', JSON.stringify({ ...data }));
      form_data.append('ruta_archivo_soporte', data.ruta_archivo_soporte);
      form_data.append('data_items_mortalidad', JSON.stringify(aux_items));
        void dispatch(edit_mortalidad_service(current_mortalidad.id_baja, form_data));
    } else {
      set_action("crear")
      const fecha = new Date(data.fecha_baja??"").toISOString()

      const data_edit = {
        ...data, fecha_baja: fecha.slice(0,10) + " " + fecha.slice(11,19)
      }
      const aux_items : IObjItemMortalidad[] = []
      items_mortalidad.forEach((element: IObjItemMortalidad, index: number) => {
        aux_items.push({...element, nro_posicion: index})
      });
      form_data.append('data_mortalidad', JSON.stringify({ ...data_edit }));
      form_data.append('ruta_archivo_soporte', data.ruta_archivo_soporte);
      form_data.append('data_items_mortalidad', JSON.stringify(aux_items));
        void dispatch(add_mortalidad_service(form_data));
    }
  };
  // const annul_siembra = (): void => {
    
  //   if (current_mortalidad.id_baja !== null && current_mortalidad.id_baja !== undefined) {
  //     void dispatch(annul_preparacion_service(current_mortalidad.id_baja));
  //   } 
  // };
 

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
        <Title title="Preparación Mezclas"></Title>
      </Grid>
      <SeleccionarMortalidad
        control_mortalidad={control_mortalidad}
        get_values={get_values}
          />
      {current_nursery.id_vivero !== null &&
        <SeleccionarLoteSiembra/>
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
  