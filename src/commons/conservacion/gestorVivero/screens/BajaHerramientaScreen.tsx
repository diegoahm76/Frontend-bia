import { Grid } from "@mui/material";
import { Title } from "../../../../components/Title";
import SeleccionarBajasHerramientas from "../componentes/SeleccionarBajasHerramientas";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../../../hooks';

// import { add_siembra_service, edit_siembra_service,  get_germination_beds_id_service,  get_germination_beds_service, get_bienes_bajas_service } from "../store/thunks/produccionThunks";
import FormButton from "../../../../components/partials/form/FormButton";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import SeleccionarBajasBienes from "../componentes/SeleccionarBajasBienes";
import { type IObjNursery, type IObjBienBaja, type IObjGenerarBaja } from "../interfaces/vivero";
import { initial_state_current_insumo, set_current_insumo, set_current_nursery, set_bienes_bajas } from "../store/slice/viveroSlice";
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../auth/interfaces';
import { add_baja_service, edit_baja_service, get_bien_baja_id_service, get_person_id_service } from "../store/thunks/gestorViveroThunks";
import { useForm } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/naming-convention
export function BajaHerramientaScreen(): JSX.Element {
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);

  const { current_genera_baja, persona, nurseries, current_nursery, bienes_bajas } = useAppSelector((state) => state.nursery);
  
  const { control: control_baja, handleSubmit: handle_submit, reset: reset_baja, getValues: get_values, watch } = useForm<IObjGenerarBaja>();
  
 
  const [action, set_action] = useState<string>("Crear")
  const dispatch = useAppDispatch()

  useEffect(() => {
      reset_baja({
        ...current_genera_baja, 
        id_persona_baja: persona?.id_persona, 
        nombre_persona_baja: persona.nombre_completo,
      })
    
  }, [persona]);

  useEffect(() => {
    void dispatch(get_person_id_service(userinfo.id_persona))
  }, []);

  useEffect(() => {
    if(current_genera_baja.id_baja !== null){
      set_action("editar")   
      void dispatch(get_bien_baja_id_service(current_genera_baja.id_baja ?? 0)); 
      if(current_genera_baja.id_persona_baja !== null ){
        void dispatch(get_person_id_service(current_genera_baja.id_persona_baja?? 0))
      }
    }
    reset_baja(current_genera_baja)    
  }, [current_genera_baja]);

  useEffect(() => {
    dispatch(set_bienes_bajas([]))
    dispatch(set_current_insumo(initial_state_current_insumo))
  }, [current_nursery]);
  
  useEffect(() => {
    if (watch("id_vivero") !== null) {
      const vivero: IObjNursery | undefined = nurseries.find((p: IObjNursery) => p.id_vivero === watch("id_vivero"))
      if (vivero !== undefined) {
        dispatch(set_current_nursery(vivero))
      }
    }
  }, [watch("id_vivero")]);

  const on_submit = (data: IObjGenerarBaja): void => {
    const form_data: any = new FormData();
    
    if (current_genera_baja.id_baja !== null && current_genera_baja.id_baja !== undefined) {
      set_action("editar")
      
      const aux_items : IObjBienBaja[] = []
      bienes_bajas.forEach((element: IObjBienBaja, index: number) => {
        aux_items.push({...element, nro_posicion: index})
      });
      form_data.append('info_baja', JSON.stringify({ ...data }));
      form_data.append('ruta_archivo_soporte', data.ruta_archivo_soporte);
      form_data.append('items_baja', JSON.stringify(aux_items));
      void dispatch(edit_baja_service(form_data));
    } else {
      set_action("crear")
      const fecha = new Date(data.fecha_baja??"").toISOString()

      const data_edit = {
        ...data, fecha_baja: fecha.slice(0,10) + " " + fecha.slice(11,19)
      }
      const aux_items : IObjBienBaja[] = []
      bienes_bajas.forEach((element: IObjBienBaja, index: number) => {
        aux_items.push({...element, nro_posicion: index})
      });
      form_data.append('info_baja', JSON.stringify({ ...data_edit }));
      form_data.append('ruta_archivo_soporte', data.ruta_archivo_soporte);
      form_data.append('items_baja', JSON.stringify(aux_items));
      void dispatch(add_baja_service(form_data));
    }
  };
  // const annul_siembra = (): void => {
    
  //   if (current_genera_baja.id_baja !== null && current_genera_baja.id_baja !== undefined) {
  //     void dispatch(annul_preparacion_service(current_genera_baja.id_baja));
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
        <Title title="Baja herramientas, insumos y semillas"></Title>
      </Grid>
      <SeleccionarBajasHerramientas
        control_genera_bajas={control_baja}
        get_values={get_values}
          />
      {current_nursery.id_vivero !== null &&
        <SeleccionarBajasBienes/>
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
  