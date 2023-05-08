import { Chip, Grid} from "@mui/material";
import SeleccionarDespacho from "../componentes/SeleccionarDespacho";
import SeleccionarBienDistribuir from "../componentes/SeleccionarBienDistribuir";
import { Title } from '../../../../components/Title';
import { useAppSelector } from "../../../../hooks";
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { AuthSlice } from '../../../../commons/auth/interfaces';
import {  useSelector } from 'react-redux';
import { get_person_id_service } from '../../produccion/store/thunks/produccionThunks';
import { set_current_despacho } from '../store/slice/viveroSlice';
import {  useAppDispatch } from '../../../../hooks';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function DespachoViveroScreen(): JSX.Element {
  const { control: control_despacho, reset: reset_despacho, getValues: get_values} = useForm<IDespacho>();

  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const { current_despacho } = useAppSelector((state) => state.nursery);
  const { changing_person } = useAppSelector((state) => state.produccion);
  const dispatch= useAppDispatch()
  
  useEffect(() => {
    console.log(userinfo, current_despacho)
    set_current_despacho({...current_despacho, persona_distribuye: userinfo.nombre, id_persona_distribuye: userinfo.id_persona})
  }, []);

  useEffect(() => {

    if(current_despacho.id_despacho_entrante === null){
    reset_despacho({...current_despacho, persona_distribuye: userinfo.nombre, id_persona_distribuye: userinfo.id_persona})
  } else {
    if((current_despacho.id_persona_distribuye !== null) && (current_despacho.id_persona_distribuye !== undefined) ){
      void dispatch(get_person_id_service(current_despacho.id_persona_distribuye))
    } else{
      reset_despacho({...current_despacho, persona_distribuye: userinfo.nombre, id_persona_distribuye: userinfo.id_persona})
    }
  }
  }, [current_despacho]);

  useEffect(() => {

    if(changing_person.id_persona !== null){
    reset_despacho({...current_despacho, persona_distribuye:changing_person.nombre_completo, id_persona_distribuye: changing_person.id_persona})
  } 
  }, [changing_person]);
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
        {current_despacho.id_despacho_entrante !== null &&
        <Grid item xs={12} marginY={2}>
          
            {current_despacho.distribucion_confirmada?
              <Chip label={"Items distribuidos el dia " + (String(current_despacho.fecha_confirmacion_distribucion)).slice(0, 10)
            } color="success" variant="outlined" />
              :
              <Chip label="Los items de este despacho no han sido distribuidos" color="warning" variant="outlined" />
          }
         
        </Grid>
         }
        <SeleccionarDespacho 
        control_despacho={control_despacho}
        get_values={get_values}/>
        {/* <SeleccionarBienDistribuir/> */}
        {current_despacho.id_despacho_entrante !== null &&
          <SeleccionarBienDistribuir/>
        }
        
      </Grid>
    </>
  );
}
