import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Dialog, DialogContent, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { interface_busqueda_responsable, interface_tipos_documentos, response_busqueda_responsable, response_tipos_documentos } from '../interfaces/types';
import TablaModalBusquedaResponsable from '../tables/TablaModalBusquedaResponsable';
import { useAppDispatch } from '../../../../hooks';
import { get_obtener_responsables, get_obtener_tipos_documentos } from '../thunks/solicitud_activos';
import { control_error } from '../../../../helpers';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';



interface props {
  set_mostrar_busqueda_responsable: React.Dispatch<React.SetStateAction<boolean>>;
  mostrar_busqueda_responsable: boolean;
  set_funcionario_responsable_seleccionado: React.Dispatch<React.SetStateAction<interface_busqueda_responsable>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ModalBusquedaResponsable: React.FC<props> = ({
  set_mostrar_busqueda_responsable,
  mostrar_busqueda_responsable,
  set_funcionario_responsable_seleccionado,
}) => {

  const dispatch = useAppDispatch();

  const [tipo_documento, set_tipo_documento] = useState<string>('');
  const [documento, set_documento] = useState<string>('');
  const [razon_social, set_razon_social] = useState<string>('');
  const [primer_nombre, set_primer_nombre] = useState<string>('');
  const [primer_apellido, set_primer_apellido] = useState<string>('');
  const [nombre_comercial, set_nombre_comercial] = useState<string>('');
  const [loadding_tabla, set_loadding_tabla] = useState<boolean>(false);

  const [funcionario_responsable_temp, set_funcionario_responsable_temp] = useState<interface_busqueda_responsable>(Object);
  const [data_funcionarios_responsables, set_data_funcionarios_responsables] = useState<interface_busqueda_responsable[]>([
    undefined as unknown as interface_busqueda_responsable,
    undefined as unknown as interface_busqueda_responsable,
    undefined as unknown as interface_busqueda_responsable,
    undefined as unknown as interface_busqueda_responsable,
    undefined as unknown as interface_busqueda_responsable,
  ]);

  const [tipos_documentos, set_tipos_documentos] = useState<interface_tipos_documentos[]>([]);

  const get_obtener_responsables_fc = () => {
    set_loadding_tabla(true);
    dispatch(get_obtener_responsables(
      tipo_documento,
      documento,
      primer_nombre,
      primer_apellido,
      razon_social,
      nombre_comercial,
    )).then((response: response_busqueda_responsable) => {
      if(Object.keys(response).length !== 0) {
        if (response.data.length !== 0) {
          set_data_funcionarios_responsables(response.data);
          set_loadding_tabla(false);
        } else {
          set_data_funcionarios_responsables([]);
          control_error('No se encontraron funcionarios');
          set_loadding_tabla(false);
        }
      } else {
        control_error('Error en el servidor al obtener los responsables de la solicitud de activos');
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



  const responsables_tp_documentos_obtenidos = useRef(false);
  useEffect(()=>{
    if(!responsables_tp_documentos_obtenidos.current && mostrar_busqueda_responsable){
      get_obtener_responsables_fc();
      get_obtener_tipos_documentos_fc();
      responsables_tp_documentos_obtenidos.current = true;
    }
  },[mostrar_busqueda_responsable])

  const consultar_responsable = () => {
    get_obtener_responsables_fc();
  }

  const limpiar_form = () => {
    set_tipo_documento('');
    set_documento('');
    set_razon_social('');
    set_primer_nombre('');
    set_primer_apellido('');
    set_nombre_comercial('');
  }

  const enviar_responsable_seleccionado = () => {
    if(Object.keys(funcionario_responsable_temp).length !== 0){
      set_mostrar_busqueda_responsable(false);
      set_funcionario_responsable_seleccionado(funcionario_responsable_temp);
      set_funcionario_responsable_temp({} as interface_busqueda_responsable);
    } else {
      control_error('Haga clic en una fila de la tabla para seleccionar el responsable');
    }
  }

  return (
    <>
      <Dialog
        open={mostrar_busqueda_responsable}
        onClose={() => {
          set_mostrar_busqueda_responsable(false);
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
            <Title title='Búsqueda de Responsable' />

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
                      {
                        tipos_documentos.length !== 0 ?
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
                  <TextField
                    fullWidth
                    label='Razón social:'
                    value={razon_social}
                    onChange={(e) => set_razon_social(e.target.value)}
                    size='small'
                  />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <TextField
                    fullWidth
                    label='Primer nombre:'
                    value={primer_nombre}
                    onChange={(e) => set_primer_nombre(e.target.value)}
                    size='small'
                  />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <TextField
                    fullWidth
                    label='Primer apellido:'
                    value={primer_apellido}
                    onChange={(e) => set_primer_apellido(e.target.value)}
                    size='small'
                  />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <TextField
                    fullWidth
                    label='Nombre comercial:'
                    value={nombre_comercial}
                    onChange={(e) => set_nombre_comercial(e.target.value)}
                    size='small'
                  />
                </Grid>

                <Grid item container spacing={2}  xs={12} sx={{
                    display:'flex',
                    justifyContent: 'end',
                  }}>
                  <Grid item xs={12} lg={4} sx={{
                    display:'flex',
                    justifyContent: 'center',
                    alignItems:'center',
                    }} >
                    <Button
                      fullWidth
                      color='primary'
                      variant='contained'
                      startIcon={<SearchIcon />}
                      onClick={consultar_responsable}
                    >
                      Buscar
                    </Button>
                  </Grid>

                  <Grid item xs={12} lg={4} sx={{
                    display:'flex',
                    justifyContent: 'center',
                    alignItems:'center',
                    }} >
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
                display:'flex',
                justifyContent:'center'
              }}>
              <TablaModalBusquedaResponsable
                data_funcionarios_responsables={data_funcionarios_responsables}
                set_funcionario_responsable_temp={set_funcionario_responsable_temp}
                loadding_tabla={loadding_tabla}
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
                  disabled={Object.keys(funcionario_responsable_temp).length === 0}
                  onClick={enviar_responsable_seleccionado}
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
                  onClick={()=>set_mostrar_busqueda_responsable(false)}
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
export default ModalBusquedaResponsable;