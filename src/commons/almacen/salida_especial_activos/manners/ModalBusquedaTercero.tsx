import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Dialog, DialogContent, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { useAppDispatch } from '../../../../hooks';
import { control_error } from '../../../../helpers';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import { interface_inf_tercero, interface_tipos_documentos, interface_tipos_terceros, response_inf_tercero, response_tipos_documentos, response_tipos_terceros } from '../interfaces/types';
import { get_obtener_inf_terceros, get_obtener_tipos_documentos, get_obtener_tipos_terceros } from '../thunks/salida_especial_activos';
import TablaModalBusquedaTercero from '../tables/TablaModalBusquedaTercero';


interface props {
  set_mostrar_modal_tercero: React.Dispatch<React.SetStateAction<boolean>>;
  mostrar_modal_tercero: boolean;
  set_data_inf_tercero_seleccionado: React.Dispatch<React.SetStateAction<interface_inf_tercero>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ModalBusquedaTercero: React.FC<props> = ({
  set_mostrar_modal_tercero,
  mostrar_modal_tercero,
  set_data_inf_tercero_seleccionado,
}) => {

  const dispatch = useAppDispatch();

  const [tipo_documento, set_tipo_documento] = useState<string>('');
  const [tipo_clase_tercero, set_tipo_clase_tercero] = useState<string>('');
  const [documento, set_documento] = useState<string>('');
  const [primer_nombre, set_primer_nombre] = useState<string>('');
  const [primer_apellido, set_primer_apellido] = useState<string>('');
  const [loadding_tabla, set_loadding_tabla] = useState<boolean>(false);

  const [tipos_documentos, set_tipos_documentos] = useState<interface_tipos_documentos[]>([]);
  const [tipos_clases_terceros, set_tipos_clases_terceros] = useState<interface_tipos_terceros[]>([]);

  const [funcionario_tercero_temp, set_funcionario_tercero_temp] = useState<interface_inf_tercero>(Object);

  const [data_funcionarios_terceros, set_data_funcionarios_terceros] = useState<interface_inf_tercero[]>([
    undefined as unknown as interface_inf_tercero,
    undefined as unknown as interface_inf_tercero,
    undefined as unknown as interface_inf_tercero,
    undefined as unknown as interface_inf_tercero,
    undefined as unknown as interface_inf_tercero,
  ]);

  const get_obtener_inf_terceros_fc = () => {
    set_loadding_tabla(true);
    dispatch(get_obtener_inf_terceros(
      tipo_documento,
      documento,
      primer_nombre,
      primer_apellido,
      tipo_clase_tercero,
    )).then((response: response_inf_tercero) => {
      if(Object.keys(response).length !== 0) {
        if (response.data.length !== 0) {
          set_data_funcionarios_terceros(response.data);
          set_loadding_tabla(false);
        } else {
          set_data_funcionarios_terceros([]);
          control_error('No se encontraron funcionarios');
          set_loadding_tabla(false);
        }
      } else {
        control_error('Error en el servidor al obtener funcionarios');
      }
    });
  }

  const get_obtener_tipos_documentos_fc = () => {
    dispatch(get_obtener_tipos_documentos())
    .then((response: response_tipos_documentos) => {
      if(Object.keys(response).length !== 0) {
        if (response.data.length !== 0) {
          set_tipos_documentos(response.data);
        } else {
          set_tipos_documentos([]);
          control_error('No se encontraron tipos de documentos');
        }
      } else {
        control_error('Error en el servidor al obtener tipos de documentos');
      }
    });
  }

  const get_obtener_tipos_terceros_fc = () => {
    dispatch(get_obtener_tipos_terceros())
    .then((response: response_tipos_terceros) => {
      if(Object.keys(response).length !== 0) {
        if (response.data.length !== 0) {
          set_tipos_clases_terceros(response.data);
        } else {
          set_tipos_clases_terceros([]);
          control_error('No se encontraron tipos de clases de terceros');
        }
      } else {
        control_error('Error en el servidor al obtener tipos de clases de terceros');
      }
    });
  }

  const obtener_data = useRef(false);
  useEffect(()=>{
    if(!obtener_data.current && mostrar_modal_tercero){
      get_obtener_tipos_documentos_fc();
      get_obtener_inf_terceros_fc();
      get_obtener_tipos_terceros_fc();
      obtener_data.current = true;
    }
  },[mostrar_modal_tercero])

  const consultar_tercero = () => {
    get_obtener_inf_terceros_fc();
  }

  const limpiar_form = () => {
    set_tipo_documento('');
    set_documento('');
    set_primer_nombre('');
    set_primer_apellido('');
    set_tipo_clase_tercero('');
  }

  const enviar_tercero_seleccionado = () => {
    if(Object.keys(funcionario_tercero_temp).length !== 0){
      set_mostrar_modal_tercero(false);
      set_data_inf_tercero_seleccionado(funcionario_tercero_temp);
      set_funcionario_tercero_temp({} as interface_inf_tercero);
    } else {
      control_error('Haga clic en una fila de la tabla para seleccionar el operario');
    }
  }

  return (
    <>
      <Dialog
        open={mostrar_modal_tercero}
        onClose={() => {
          set_mostrar_modal_tercero(false);
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
            <Title title='Búsqueda de operario' />

            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{width:'100%', mt:'20px'}}
              >
              <Grid item container spacing={2}  xs={12}>

                <Grid item xs={12} lg={4}>
                  <FormControl required size="small" fullWidth>
                    <InputLabel >Tipo documento:</InputLabel>
                    <Select
                      label='Tipo documento:'
                      value={tipo_documento}
                      onChange={(e) => set_tipo_documento(e.target.value)}
                    >
                      {tipos_documentos.length !== 0 ?
                        tipos_documentos.map((item: interface_tipos_documentos) => (
                          <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                        ))
                        :
                        <MenuItem value=''>Cargando...</MenuItem>
                      }
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} lg={4}>
                  <TextField
                    fullWidth
                    label='Documento:'
                    value={documento}
                    onChange={(e) => set_documento(e.target.value)}
                    size='small'
                  />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <FormControl required size="small" fullWidth>
                    <InputLabel >Tipo clase tercero:</InputLabel>
                    <Select
                      label='Tipo clase tercero:'
                      value={tipo_clase_tercero}
                      onChange={(e) => set_tipo_clase_tercero(e.target.value)}
                    >
                      {tipos_clases_terceros.length !== 0 ?
                        tipos_clases_terceros.map((item: interface_tipos_terceros) => (
                          <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                        ))
                        :
                        <MenuItem value=''>Cargando...</MenuItem>
                      }
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} lg={3}>
                  <TextField
                    fullWidth
                    label='Primer nombre:'
                    value={primer_nombre}
                    onChange={(e) => set_primer_nombre(e.target.value)}
                    size='small'
                  />
                </Grid>

                <Grid item xs={12} lg={3}>
                  <TextField
                    fullWidth
                    label='Primer apellido:'
                    value={primer_apellido}
                    onChange={(e) => set_primer_apellido(e.target.value)}
                    size='small'
                  />
                </Grid>

                <Grid item xs={12} lg={3}>
                  <Button
                    fullWidth
                    color='primary'
                    variant='contained'
                    startIcon={<SearchIcon />}
                    onClick={consultar_tercero}
                  >
                    Buscar
                  </Button>
                </Grid>

                <Grid item xs={12} lg={3}>
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
            </Box>

            <Grid item my={2} container xs={12} sx={{
                display:'flex',
                justifyContent:'center'
              }}>
              <TablaModalBusquedaTercero
                loadding_tabla={loadding_tabla}
                data_funcionarios_terceros={data_funcionarios_terceros}
                set_funcionario_tercero_temp={set_funcionario_tercero_temp}
              />
            </Grid>

            <Grid container item xs={12} spacing={1} sx={{display:'flex', justifyContent:'end'}}>
              <Grid item xs={12} md={2} sx={{
                display:'flex',
                justifyContent: 'center',
                alignItems:'center'
                }} >
                <Button
                  fullWidth
                  color='primary'
                  variant='contained'
                  startIcon={<SaveIcon />}
                  disabled={Object.keys(funcionario_tercero_temp).length === 0}
                  onClick={enviar_tercero_seleccionado}
                >
                  Seleccionar
                </Button>
              </Grid>
              <Grid item xs={12} md={2} sx={{
                display:'flex',
                justifyContent: 'center',
                alignItems:'center',
                }} >
                <Button
                  fullWidth
                  color="error"
                  variant="contained"
                  startIcon={<ClearIcon />}
                  onClick={()=>set_mostrar_modal_tercero(false)}
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
export default ModalBusquedaTercero;