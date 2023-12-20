/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogContent,
    Grid,
    MenuItem,
    TextField,
  } from '@mui/material';
  import { useEffect, useState } from 'react';
  import { useForm } from 'react-hook-form';
  import { DataGrid, type GridColDef } from '@mui/x-data-grid';
  import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
  import { Title } from '../../../../components';
  import { useAppDispatch, useAppSelector } from '../../../../hooks';
  import {
    IObjBandejas,

  } from '../interface/archivoFisico';
  import { IList } from '../../configuracionMetadatos/interfaces/Metadatos';
  import { api } from '../../../../api/axios';
  import {

    avanzada_caja,

  } from '../store/thunks/thunksArchivoFisico';

  import { initial_state_carpeta } from '../../deposito/store/slice/indexDeposito';
  import { ButtonAdminCarpetas } from './BotonCarpetas';
  interface IProps {
    open: any;
    handle_close_buscar: any;
 
  }
  
  const VerExpediente = ({
    open,
    handle_close_buscar,
   
  }: IProps) => {
   
    
    const {
      control: control_bandeja,
      handleSubmit: handle_submit_bandeja,
      getValues: get_values_bandeja,
      reset: reset_bandeja,
    } = useForm<IObjBandejas>();
   
    
    const dispatch = useAppDispatch();
    const [tipo_elemento, set_tipo_elemnto] = useState<IList[]>([]);
    
    const { depositos, estantes, bandejas, cajas, carpetas, depositos_tabla } =
      useAppSelector((state) => state.archivo_fisico);
  

  

  
    // const mostrar_caja: any = async () => {
    //   const identificacion_estante =
    //     get_values_caja('identificacion_estante') ?? '';
    //   const identificacion_bandeja =
    //     get_values_caja('identificacion_bandeja') ?? '';
    //   const identificacion_caja =
    //     get_values_caja('identificacion_por_bandeja') ?? '';
    //   const nombreDeposito = deposito_seleccionado?.nombre_deposito || null;
    //   void dispatch(
    //     avanzada_caja(
    //       identificacion_estante,
    //       nombreDeposito,
    //       identificacion_bandeja,
    //       identificacion_caja
    //     )
    //   );
    //   set_selected_items((prevItems: any) => ({
    //     ...prevItems,
    //     tipoElemento: tipo_elemento_seleccionado,
    //   }));
    // };

  
    return (
      <>
        <Dialog fullWidth maxWidth="lg" open={open} onClose={handle_close_buscar}>
          <DialogContent>
            <Grid
              container
              spacing={2}
              sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
                marginLeft: '-5px',
              }}
            >
              <Title title="INFORMACIÓN DEL EXPEDIENTE" />
  
              <Grid container justifyContent={'center'}>
            
  
  
  
  
              </Grid>
            </Grid>
  

            
          </DialogContent>
        </Dialog>
      </>
    );
  };
  
  export default VerExpediente;
  