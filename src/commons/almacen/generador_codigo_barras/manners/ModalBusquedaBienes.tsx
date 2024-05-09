import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Dialog, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { useAppDispatch } from '../../../../hooks';
import { control_error } from '../../../../helpers';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { interface_busqueda_bienes, response_busqueda_bienes } from '../interfaces/types';
import { get_obtener_bienes } from '../thunks/generador_codigo_barras';
import TablaModalBusquedaBienes from '../tables/TablaModalBusquedaBienes';



interface props {
  set_mostrar_modal_buscar_bien: React.Dispatch<React.SetStateAction<boolean>>;
  mostrar_modal_buscar_bien: boolean;
  set_data_bien_seleccionado: React.Dispatch<React.SetStateAction<interface_busqueda_bienes>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ModalBusquedaBienes: React.FC<props> = ({
  set_mostrar_modal_buscar_bien,
  mostrar_modal_buscar_bien,
  set_data_bien_seleccionado,
}) => {

  const dispatch = useAppDispatch();

  const [nombre_bien, set_nombre_bien] = useState<string>('');
  const [doc_identificador_nro, set_doc_identificador_nro] = useState<string>('');
  const [codigo_bien, set_codigo_bien] = useState<string>('');
  const [fecha_desde, set_fecha_desde] = useState<Dayjs | null>(null);
  const [fecha_hasta, set_fecha_hasta] = useState<Dayjs | null>(null);

  const [loadding_tabla, set_loadding_tabla] = useState<boolean>(false);

  // Data para persona responsable seleccionada
  const [data_bien_temp, set_data_bien_temp] = useState<interface_busqueda_bienes>(Object);
  // Data de la tabla de personas responsables
  const [data_bienes, set_data_bienes] = useState<interface_busqueda_bienes[]>([]);


  const get_obtener_operarios_fc = () => {
    set_loadding_tabla(true);
    dispatch(get_obtener_bienes(
      nombre_bien,
      doc_identificador_nro,
      codigo_bien,
      fecha_desde === null ? '' : dayjs(fecha_desde).format('YYYY-MM-DD') ?? '',
      fecha_hasta === null ? '' : dayjs(fecha_hasta).format('YYYY-MM-DD') ?? '',
    )).then((response: response_busqueda_bienes) => {
      if (Object.keys(response).length !== 0) {
        if (response.data.length !== 0) {
          set_data_bienes(response.data);
          set_loadding_tabla(false);
        } else {
          set_data_bienes([]);
          control_error('No se encontraron funcionarios');
          set_loadding_tabla(false);
        }
      } else {
        control_error('Error en el servidor al obtener funcionarios');
      }
    });
  }


  const ejecutar_servicios = useRef(false);
  useEffect(() => {
    if (!ejecutar_servicios.current && mostrar_modal_buscar_bien) {
      get_obtener_operarios_fc();
      ejecutar_servicios.current = true;
    }
  }, [mostrar_modal_buscar_bien])

  const consultar_funcionarios = () => {
    get_obtener_operarios_fc();
  }

  const limpiar_form = () => {
    set_nombre_bien('');
    set_codigo_bien('');
    set_doc_identificador_nro('');
    set_fecha_desde(null);
    set_fecha_hasta(null);
  }

  const enviar_bien_seleccionado = () => {
    if (Object.keys(data_bien_temp).length !== 0) {
      set_mostrar_modal_buscar_bien(false);
      set_data_bien_seleccionado(data_bien_temp);
      set_data_bien_temp({} as interface_busqueda_bienes);
    } else {
      control_error('Haga clic en una fila de la tabla para seleccionar un funcionario');
    }
  }

  return (
    <>
      <Dialog
        open={mostrar_modal_buscar_bien}
        onClose={() => {
          set_mostrar_modal_buscar_bien(false);
        }}
        fullWidth maxWidth="lg" >
        <DialogContent>
          <Grid
            container
            marginTop={2}
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '30px',
              mb: '10px',
              boxShadow: '0px 3px 6px #042F4A26',
            }}
          >
            <Title title='Búsqueda de bienes' />
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ width: '100%', mt: '20px' }}
            >
              <Grid item container spacing={2} xs={12}>
                <Grid item xs={12} lg={4}>
                  <TextField
                    fullWidth
                    label='Nombre del bien:'
                    value={nombre_bien}
                    onChange={(e) => set_nombre_bien(e.target.value)}
                    size='small'
                  />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <TextField
                    fullWidth
                    label='Código del bien:'
                    value={codigo_bien}
                    onChange={(e) => set_codigo_bien(e.target.value)}
                    size='small'
                  />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <TextField
                    fullWidth
                    label='N° Identificador unico:'
                    value={doc_identificador_nro}
                    onChange={(e) => set_doc_identificador_nro(e.target.value)}
                    size='small'
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label='Fecha desde: '
                      value={fecha_desde}
                      onChange={
                        (newValue) => {
                          if(newValue !== null){
                            set_fecha_desde(newValue);
                          }
                        }
                      }
                      renderInput={(params) => (
                        <TextField required fullWidth size="small" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} lg={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label='Fecha hasta: '
                      value={fecha_hasta}
                      onChange={
                        (newValue) => {
                          if(newValue !== null){
                            set_fecha_hasta(newValue);
                          }
                        }
                      }
                      renderInput={(params) => (
                        <TextField required fullWidth size="small" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item container spacing={2} xs={12} sx={{
                  display: 'flex',
                  justifyContent: 'end',
                }}>
                  <Grid item xs={12} lg={4}>
                    <Button
                      fullWidth
                      color='primary'
                      variant='contained'
                      startIcon={<SearchIcon />}
                      onClick={consultar_funcionarios}
                    >
                      Buscar
                    </Button>
                  </Grid>

                  <Grid item xs={12} lg={4}>
                    <Button
                      fullWidth
                      color="inherit"
                      variant="outlined"
                      startIcon={<CleanIcon />}
                      onClick={limpiar_form}
                    >
                      Limpiar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

            </Box>

            <Grid item container xs={12} sx={{
              display: 'flex',
              justifyContent: 'center'
            }}>
              <TablaModalBusquedaBienes
                loadding_tabla={loadding_tabla}
                data_bienes={data_bienes}
                set_data_bien_temp={set_data_bien_temp}
              />
            </Grid>

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
                  disabled={Object.keys(data_bien_temp).length === 0}
                  onClick={enviar_bien_seleccionado}
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
                  onClick={() => set_mostrar_modal_buscar_bien(false)}
                >
                  Salir
                </Button>
              </Grid>
            </Grid>

          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}


// eslint-disable-next-line no-restricted-syntax
export default ModalBusquedaBienes;