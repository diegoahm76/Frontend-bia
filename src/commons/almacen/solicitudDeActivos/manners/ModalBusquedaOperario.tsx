import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Dialog, DialogContent, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { interface_busqueda_operario, interface_tipos_documentos, response_busqueda_operario, response_tipos_documentos } from '../interfaces/types';
import TablaModalBusquedaOperario from '../tables/TablaModalBusquedaOperario';
import { useAppDispatch } from '../../../../hooks';
import { get_obtener_operarios, get_obtener_tipos_documentos } from '../thunks/solicitud_activos';
import { control_error } from '../../../../helpers';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';



interface props {
  set_mostrar_busqueda_operario: React.Dispatch<React.SetStateAction<boolean>>;
  mostrar_busqueda_operario: boolean;
  set_funcionario_operario_seleccionado: React.Dispatch<React.SetStateAction<interface_busqueda_operario>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ModalBusquedaOperario: React.FC<props> = ({
  set_mostrar_busqueda_operario,
  mostrar_busqueda_operario,
  set_funcionario_operario_seleccionado,
}) => {

  const dispatch = useAppDispatch();

  const [tipo_documento, set_tipo_documento] = useState<string>('');
  const [documento, set_documento] = useState<string>('');
  const [razon_social, set_razon_social] = useState<string>('');
  const [primer_nombre, set_primer_nombre] = useState<string>('');
  const [primer_apellido, set_primer_apellido] = useState<string>('');
  const [nombre_comercial, set_nombre_comercial] = useState<string>('');
  const [loadding_tabla, set_loadding_tabla] = useState<boolean>(false);

  const [tipos_documentos, set_tipos_documentos] = useState<interface_tipos_documentos[]>([]);

  const [funcionario_operario_temp, set_funcionario_operario_temp] = useState<interface_busqueda_operario>(Object);
  const [data_funcionarios_operarios, set_data_funcionarios_operarios] = useState<interface_busqueda_operario[]>([
    undefined as unknown as interface_busqueda_operario,
    undefined as unknown as interface_busqueda_operario,
    undefined as unknown as interface_busqueda_operario,
    undefined as unknown as interface_busqueda_operario,
    undefined as unknown as interface_busqueda_operario,
  ]);

  const get_obtener_operarios_fc = () => {
    set_loadding_tabla(true);
    dispatch(get_obtener_operarios(
      tipo_documento,
      documento,
      primer_nombre,
      primer_apellido,
      razon_social,
      nombre_comercial,
    )).then((response: response_busqueda_operario) => {
      if(Object.keys(response).length !== 0) {
        if (response.data.length !== 0) {
          set_data_funcionarios_operarios(response.data);
          set_loadding_tabla(false);
        } else {
          set_data_funcionarios_operarios([]);
          control_error('No se encontraron funcionarios');
          set_loadding_tabla(false);
        }
      } else {
        control_error('Error en el servidor al obtener los operarios de la solicitud de activos');
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

  const operarios_tp_documentos_obtenidos = useRef(false);
  useEffect(()=>{
    if(!operarios_tp_documentos_obtenidos.current && mostrar_busqueda_operario){
      get_obtener_tipos_documentos_fc();
      get_obtener_operarios_fc();
      operarios_tp_documentos_obtenidos.current = true;
    }
  },[mostrar_busqueda_operario])

  const consultar_operario = () => {
    get_obtener_operarios_fc();
  }

  const limpiar_form = () => {
    set_tipo_documento('');
    set_documento('');
    set_razon_social('');
    set_primer_nombre('');
    set_primer_apellido('');
    set_nombre_comercial('');
  }

  const enviar_operario_seleccionado = () => {
    if(Object.keys(funcionario_operario_temp).length !== 0){
      set_mostrar_busqueda_operario(false);
      set_funcionario_operario_seleccionado(funcionario_operario_temp);
      set_funcionario_operario_temp({} as interface_busqueda_operario);
    } else {
      control_error('Haga clic en una fila de la tabla para seleccionar el operario');
    }
  }

  return (
    <>
      <Dialog
        open={mostrar_busqueda_operario}
        onClose={() => {
          set_mostrar_busqueda_operario(false);
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
              onSubmit={consultar_operario}
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
                      onClick={consultar_operario}
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
              <TablaModalBusquedaOperario
                loadding_tabla={loadding_tabla}
                data_funcionarios_operarios={data_funcionarios_operarios}
                set_funcionario_operario_temp={set_funcionario_operario_temp}
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
                  disabled={Object.keys(funcionario_operario_temp).length === 0}
                  onClick={enviar_operario_seleccionado}
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
                  onClick={()=>set_mostrar_busqueda_operario(false)}
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
export default ModalBusquedaOperario;