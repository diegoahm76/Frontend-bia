import { Box, Button, Dialog, DialogContent, Grid, TextField } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import { control_error } from '../../../../helpers';
import { useAppDispatch } from "../../../../hooks";
import TablaModalActivosDisponibles from '../tables/TablaModalActivosDisponibles';
import { interface_activos_disponibles, interface_busqueda_articulos, response_activos_disponibles } from '../interfeces/types';
import { get_obtener_activos_disponibles } from '../thunks/despacho_solicitudes';


interface props {
  set_mostrar_modal_activos_disponibles: React.Dispatch<React.SetStateAction<boolean>>;
  mostrar_modal_activos_disponibles: boolean;
  data_activos_disponibles: interface_activos_disponibles[];
  loadding_activos_disponibles: boolean;
  set_data_articulos_agregados_padres: React.Dispatch<React.SetStateAction<interface_busqueda_articulos[]>>;
  data_articulos_agregados_padres: interface_busqueda_articulos[];
  id_articulo_seleccionado: number;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ModalActivosDisponibles: React.FC<props> = ({
  set_mostrar_modal_activos_disponibles,
  mostrar_modal_activos_disponibles,
  data_activos_disponibles,
  loadding_activos_disponibles,
  set_data_articulos_agregados_padres,
  data_articulos_agregados_padres,
  id_articulo_seleccionado,
}) => {

  const [filas_seleccionadas_temp, set_filas_seleccionadas_temp] = useState<interface_activos_disponibles[]>([]);



  const enviar_data_bienes_encontrados = () => {
    if (filas_seleccionadas_temp.length === 0) {
      control_error('Debe seleccionar al menos un bien');
      return;
    } else {
      //set_activos_seleccionados((prev: any) => [...prev, ...filas_seleccionadas_temp]);
      // buscamos el articulo seleccionado en data_articulos_agregados_padres y le agregamos los activos seleccionados a propiedad articulos_hijos
      const articulo_seleccionado = data_articulos_agregados_padres.find(articulo => articulo.id_bien === id_articulo_seleccionado);
      if (articulo_seleccionado) {
        articulo_seleccionado.articulos_hijos = filas_seleccionadas_temp;
        set_data_articulos_agregados_padres([...data_articulos_agregados_padres]);
        set_filas_seleccionadas_temp([]);
      }
      set_mostrar_modal_activos_disponibles(false);
    }
  }

  return (
    <>
      <Dialog
        open={mostrar_modal_activos_disponibles}
        onClose={() => {
          set_mostrar_modal_activos_disponibles(false);
        }}
        fullWidth maxWidth="lg" >
        <DialogContent>
          <Grid
            container
            spacing={2}
            rowSpacing={3}
            marginTop={2}
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '30px',
              margin: '10px auto',
              width: '100%',
            }}
          >
            <Title title='Activos disponibles' />
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ width: '100%', mt: '20px' }}
            >
              <TablaModalActivosDisponibles
                loadding_activos_disponibles={loadding_activos_disponibles}
                data={data_activos_disponibles}
                set_filas_seleccionadas_temp={set_filas_seleccionadas_temp}
              />

              <Grid container item xs={12} spacing={1} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Grid item xs={12} md={2} sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }} >
                  <Button
                    fullWidth
                    color='primary'
                    variant='contained'
                    startIcon={<SaveIcon />}
                    disabled={filas_seleccionadas_temp.length === 0}
                    type='button'
                    onClick={enviar_data_bienes_encontrados}
                  >
                    Seleccionar
                  </Button>
                </Grid>
                <Grid item xs={12} md={2} sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }} >
                  <Button
                    fullWidth
                    color="error"
                    variant="contained"
                    startIcon={<ClearIcon />}
                    type='button'
                    onClick={() => set_mostrar_modal_activos_disponibles(false)}
                  >
                    Salir
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default ModalActivosDisponibles;