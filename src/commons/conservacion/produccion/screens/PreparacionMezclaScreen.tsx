import { Grid } from "@mui/material";
import { Title } from "../../../../components/Title";
import SeleccionarMezcla from "../componentes/SeleccionarMezcla";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../../../hooks';

// import { add_siembra_service, edit_siembra_service,  get_germination_beds_id_service,  get_germination_beds_service, get_preparacion_bienes_service } from "../store/thunks/produccionThunks";
import FormButton from "../../../../components/partials/form/FormButton";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import SeleccionarBienPreparacion from "../componentes/SeleccionarBienPreparacion";
import { type IObjMezcla, type IObjNursery, type IObjPreparacionBienes, type IObjPreparacionMezcla } from "../interfaces/produccion";
import { initial_state_current_bien, set_current_bien, set_current_nursery, set_preparacion_bienes } from "../store/slice/produccionSlice";
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../auth/interfaces';
import { add_preparacion_service, edit_preparacion_service, get_bien_preparacion_id_service, get_person_id_service } from "../store/thunks/produccionThunks";
import { useForm } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/naming-convention
export function PreparacionMezclaScreen(): JSX.Element {
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);

  const { current_preparacion, changing_person, nurseries, current_nursery, preparacion_bienes, mezclas } = useAppSelector((state) => state.produccion);
  
  const { control: control_preparacion, handleSubmit: handle_submit, reset: reset_preparacion, getValues: get_values, watch } = useForm<IObjPreparacionMezcla>();
  
 
  const [action, set_action] = useState<string>("Crear")
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(current_preparacion.id_mezcla !== null ){
      const mezcla: IObjMezcla | undefined = mezclas.find((p: IObjMezcla) => p.id_mezcla === current_preparacion.id_mezcla)
      reset_preparacion({
        ...current_preparacion, 
        id_persona_prepara: changing_person?.id_persona, 
        nombre_persona_prepara: changing_person.nombre_completo,
        unidad_medida: mezcla?.unidad_medida
      })
    } else {
      reset_preparacion({ 
        ...current_preparacion, 
        id_persona_prepara: changing_person?.id_persona, 
        nombre_persona_prepara: changing_person.nombre_completo
      })
    }
  }, [changing_person]);

  useEffect(() => {
    void dispatch(get_person_id_service(userinfo.id_persona))
  }, []);

  useEffect(() => {
    if(current_preparacion.id_preparacion_mezcla !== null){
      set_action("editar")   
      void dispatch(get_bien_preparacion_id_service(current_preparacion.id_preparacion_mezcla)); 
      if(current_preparacion.id_persona_prepara !== null ){
        void dispatch(get_person_id_service(current_preparacion.id_persona_prepara?? 0))
      }
    } 
    if(current_preparacion.id_mezcla !== null ){
      const mezcla: IObjMezcla | undefined = mezclas.find((p: IObjMezcla) => p.id_mezcla === current_preparacion.id_mezcla)
      reset_preparacion({...current_preparacion, unidad_medida: mezcla?.unidad_medida})
    } else{
      reset_preparacion(current_preparacion)
    }
    
  }, [current_preparacion]);

  useEffect(() => {
    dispatch(set_preparacion_bienes([]))
    dispatch(set_current_bien(initial_state_current_bien))
  }, [current_nursery]);
  
  useEffect(() => {
    if (watch("id_vivero") !== null) {
      const vivero: IObjNursery | undefined = nurseries.find((p: IObjNursery) => p.id_vivero === watch("id_vivero"))
      if (vivero !== undefined) {
        dispatch(set_current_nursery(vivero))
      }
    }
  }, [watch("id_vivero")]);

  useEffect(() => {
    if (watch("id_mezcla") !== null) {
      const mezcla: IObjMezcla | undefined = mezclas.find((p: IObjMezcla) => p.id_mezcla === watch("id_mezcla"))
      if (mezcla !== undefined) {
        reset_preparacion({
          ...current_preparacion, 
          unidad_medida: mezcla.unidad_medida,
          id_mezcla: mezcla.id_mezcla,
          id_vivero: get_values("id_vivero"),
          cantidad_creada: get_values("cantidad_creada"),
          observaciones: get_values("observaciones"),
          id_persona_prepara: get_values("id_persona_prepara"),
          nombre_persona_prepara: get_values("nombre_persona_prepara"),
          fecha_preparacion: get_values("fecha_preparacion"),
        })
      }
    }
  }, [watch("id_mezcla")]);

  const on_submit = (data: IObjPreparacionMezcla): void => {
    if (current_preparacion.id_preparacion_mezcla !== null && current_preparacion.id_preparacion_mezcla !== undefined) {
      set_action("editar")
      const data_edit = {
        ...data, cantidad_creada: Number(data.cantidad_creada)
      }
      const aux_items : IObjPreparacionBienes[] = []
      preparacion_bienes.forEach((element: IObjPreparacionBienes, index: number) => {
        aux_items.push({...element, nro_posicion: index})
      });
      const data_update = {
        info_preparacion: data_edit,
        items_preparacion: aux_items
      }
      console.log(data_update)
        void dispatch(edit_preparacion_service(data_update));
    } else {
      set_action("crear")
      const fecha = new Date(data.fecha_preparacion??"").toISOString()

      const data_edit = {
        ...data, fecha_preparacion: fecha.slice(0,10) + " " + fecha.slice(11,19), cantidad_creada: Number(data.cantidad_creada)
      }
      const aux_items : IObjPreparacionBienes[] = []
      preparacion_bienes.forEach((element: IObjPreparacionBienes, index: number) => {
        aux_items.push({...element, nro_posicion: index, id_bien_usado: element.id_item_preparacion_mezcla})
      });
      const data_update = {
        info_preparacion: data_edit,
        items_preparacion: aux_items
      }
      console.log(data_update)
        void dispatch(add_preparacion_service(data_update));
    }
  };
  // const annul_siembra = (): void => {
    
  //   if (current_preparacion.id_preparacion_mezcla !== null && current_preparacion.id_preparacion_mezcla !== undefined) {
  //     void dispatch(annul_preparacion_service(current_preparacion.id_preparacion_mezcla));
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
      <SeleccionarMezcla
        control_preparacion={control_preparacion}
        get_values={get_values}
          />
      {current_nursery.id_vivero !== null &&
        <SeleccionarBienPreparacion/>
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
  