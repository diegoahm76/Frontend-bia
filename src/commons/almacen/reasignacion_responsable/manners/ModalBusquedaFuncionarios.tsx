import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Dialog, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { useAppDispatch } from '../../../../hooks';
import { control_error } from '../../../../helpers';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import { interface_busqueda_operario, interface_busqueda_responsable, interface_tipos_documentos, response_busqueda_operario, response_busqueda_responsable, response_tipos_documentos } from '../interfaces/types';
import { get_obtener_operarios, get_obtener_responsables, get_obtener_tipos_documentos } from '../thunks/reasignacion_responsable';
import TablaModalBusquedaFuncionarios from '../tables/TablaModalBusquedaFuncionarios';




interface props {
  tipo_funcionario: string;
  set_mostrar_modal_busqueda_funcionarios: React.Dispatch<React.SetStateAction<boolean>>;
  mostrar_modal_busqueda_funcionarios: boolean;
  set_funcionario_operario_seleccionado: React.Dispatch<React.SetStateAction<interface_busqueda_operario>>;
  set_funcionario_responsable_actual_seleccionado: React.Dispatch<React.SetStateAction<interface_busqueda_responsable>>;
  set_funcionario_responsable_reasignado_seleccionado: React.Dispatch<React.SetStateAction<interface_busqueda_responsable>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ModalBusquedaFuncionarios: React.FC<props> = ({
  tipo_funcionario,
  set_mostrar_modal_busqueda_funcionarios,
  mostrar_modal_busqueda_funcionarios,
  set_funcionario_operario_seleccionado,
  set_funcionario_responsable_actual_seleccionado,
  set_funcionario_responsable_reasignado_seleccionado,
}) => {

  const dispatch = useAppDispatch();

  const [tipo_documento, set_tipo_documento] = useState<string>('');
  const [documento, set_documento] = useState<string>('');
  const [razon_social, set_razon_social] = useState<string>('');
  const [primer_nombre, set_primer_nombre] = useState<string>('');
  const [primer_apellido, set_primer_apellido] = useState<string>('');
  const [nombre_comercial, set_nombre_comercial] = useState<string>('');
  const [loadding_tabla, set_loadding_tabla] = useState<boolean>(false);

  // Estado disabled del botón seleccionar
  const [disabled_btn_seleccionar, set_disabled_btn_seleccionar] = useState<boolean>(true);

  // Data de funcionarios seleccionados para enviar a la pantalla principal
  const [funcionario_responsable_reasignado_temp, set_funcionario_responsable_reasignado_temp] = useState<interface_busqueda_responsable>(Object);
  const [funcionario_responsable_actual_temp, set_funcionario_responsable_actual_temp] = useState<interface_busqueda_responsable>(Object);
  const [funcionario_operario_temp, set_funcionario_operario_temp] = useState<interface_busqueda_operario>(Object);

  // Data de funcionarios para alimentar la tabla de búsqueda
  const [data_funcionarios_responsables, set_data_funcionarios_responsables] = useState<interface_busqueda_responsable[]>([]);
  const [data_funcionarios_operarios, set_data_funcionarios_operarios] = useState<interface_busqueda_operario[]>([]);

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
      if (Object.keys(response).length !== 0) {
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
      if (Object.keys(response).length !== 0) {
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
        if (Object.keys(response).length !== 0) {
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

  /**
   * Obtener los tipos de documentos solo una vez
   */
  const tipos_documentos_obtenidos = useRef(false);
  useEffect(() => {
    if (!tipos_documentos_obtenidos.current && mostrar_modal_busqueda_funcionarios) {
      get_obtener_tipos_documentos_fc();
      tipos_documentos_obtenidos.current = true;
    }
  }, [mostrar_modal_busqueda_funcionarios])


  /**
   * Obtener los responsables u operarios según el tipo de funcionario solo una vez
   * asi se evita que se haga la petición cada vez que se abre el modal
   */
  const busqueda_responsable_obtenida = useRef(false);
  const busqueda_operario_obtenida = useRef(false);
  useEffect(() => {
    if (!busqueda_responsable_obtenida.current && mostrar_modal_busqueda_funcionarios) {
      if (tipo_funcionario === 'actual' || tipo_funcionario === 'reasignado') {
        get_obtener_responsables_fc();
        busqueda_responsable_obtenida.current = true;
      }
    }
    if (!busqueda_operario_obtenida.current && mostrar_modal_busqueda_funcionarios) {
      if (tipo_funcionario === 'operario') {
        get_obtener_operarios_fc();
        busqueda_operario_obtenida.current = true;
      }
    }
  }, [mostrar_modal_busqueda_funcionarios, tipo_funcionario])


  const consultar_responsable = () => {
    if (tipo_funcionario === 'operario') {
      get_obtener_operarios_fc();
    } else if (tipo_funcionario === 'actual' || tipo_funcionario === 'reasignado') {
      get_obtener_responsables_fc();
    }
  }

  const limpiar_form = () => {
    set_tipo_documento('');
    set_documento('');
    set_razon_social('');
    set_primer_nombre('');
    set_primer_apellido('');
    set_nombre_comercial('');
  }

  const enviar_funcionario_seleccionado = () => {
    if (tipo_funcionario === 'reasignado') {
      if (Object.keys(funcionario_responsable_reasignado_temp).length !== 0) {
        set_mostrar_modal_busqueda_funcionarios(false);
        set_funcionario_responsable_reasignado_seleccionado(funcionario_responsable_reasignado_temp);
        set_funcionario_responsable_reasignado_temp({} as interface_busqueda_responsable);
      } else {
        control_error('Haga clic en una fila de la tabla para seleccionar el responsable');
      }
    }

    if(tipo_funcionario === 'actual'){
      if (Object.keys(funcionario_responsable_actual_temp).length !== 0) {
        set_mostrar_modal_busqueda_funcionarios(false);
        set_funcionario_responsable_actual_seleccionado(funcionario_responsable_actual_temp);
        set_funcionario_responsable_actual_temp({} as interface_busqueda_responsable);
      } else {
        control_error('Haga clic en una fila de la tabla para seleccionar el responsable');
      }
    }
    
    if (tipo_funcionario === 'operario') {
      if (Object.keys(funcionario_operario_temp).length !== 0) {
        set_mostrar_modal_busqueda_funcionarios(false);
        set_funcionario_operario_seleccionado(funcionario_operario_temp);
        set_funcionario_operario_temp({} as interface_busqueda_operario);
      } else {
        control_error('Haga clic en una fila de la tabla para seleccionar el operario');
      }
    }
  }

  /**
   * Función para deshabilitar el botón seleccionar
   */
  const disabled_btn_seleccionar_fc = () => {
    if (tipo_funcionario === 'reasignado') {
      if(Object.keys(funcionario_responsable_reasignado_temp).length !== 0){
        set_disabled_btn_seleccionar(false);
      } else {
        set_disabled_btn_seleccionar(true);
      }
    }
    if(tipo_funcionario === 'actual'){
      if(Object.keys(funcionario_responsable_actual_temp).length !== 0){
        set_disabled_btn_seleccionar(false);
      } else {
        set_disabled_btn_seleccionar(true);
      }
    }
    if (tipo_funcionario === 'operario') {
      if(Object.keys(funcionario_operario_temp).length !== 0){
        set_disabled_btn_seleccionar(false);
      } else {
        set_disabled_btn_seleccionar(true);
      }
    }
  }

  /**
   * Efecto para deshabilitar el botón seleccionar
   */
  useEffect(() => {
    disabled_btn_seleccionar_fc();
  }, [funcionario_responsable_reasignado_temp, funcionario_operario_temp, funcionario_responsable_actual_temp])

  return (
    <>
      <Dialog
        open={mostrar_modal_busqueda_funcionarios}
        onClose={() => {
          set_mostrar_modal_busqueda_funcionarios(false);
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
            <Title title={tipo_funcionario === 'actual' ?
              'Búsqueda de funcionario responsable' :
              'Búsqueda de funcionario operario'}
            />

            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ width: '100%', mt: '20px' }}
            >
              <Grid item container spacing={2} xs={12}>

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

                <Grid item container spacing={2} xs={12} sx={{
                  display: 'flex',
                  justifyContent: 'end',
                }}>
                  <Grid item xs={12} lg={4} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
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
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
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
              display: 'flex',
              justifyContent: 'center'
            }}>
              <TablaModalBusquedaFuncionarios
                tipo_funcionario={tipo_funcionario}
                data_funcionarios_responsables={data_funcionarios_responsables}
                data_funcionarios_operarios={data_funcionarios_operarios}
                set_funcionario_responsable_reasignado_temp={set_funcionario_responsable_reasignado_temp}
                set_funcionario_responsable_actual_temp={set_funcionario_responsable_actual_temp}
                set_funcionario_operario_temp={set_funcionario_operario_temp}
                loadding_tabla={loadding_tabla}
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
                  disabled={disabled_btn_seleccionar}
                  onClick={enviar_funcionario_seleccionado}
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
                  onClick={() => set_mostrar_modal_busqueda_funcionarios(false)}
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
export default ModalBusquedaFuncionarios;