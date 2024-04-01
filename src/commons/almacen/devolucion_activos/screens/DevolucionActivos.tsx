import { Box, Button, Chip, CircularProgress, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Tab, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Title } from '../../../../components';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import CleanIcon from '@mui/icons-material/CleaningServices';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import { Dayjs } from 'dayjs';
import { inputs_almacenista, inputs_funcionario_responsable, interface_busqueda_responsable, response_busqueda_responsable } from '../interfaces/types';
import { control_error, control_success } from '../../../../helpers';
import { useDispatch } from 'react-redux';
import { get_obtener_responsables } from '../thunks/devolucion_activos';
import ModalBusquedaResponsable from '../manners/ModalBusquedaResponsable';



// eslint-disable-next-line @typescript-eslint/naming-convention
const DevolucionActivos: React.FC = () => {

  const dispatch = useDispatch();

  const [mostrar_busqueda_responsable, set_mostrar_busqueda_responsable] = useState<boolean>(false);

  const [accion, set_accion] = useState<string>('null'); // [crear, actualizar, null]
  const [loadding, set_loadding] = useState<boolean>(false);
  const [consecutivo, set_consecutivo] = useState<number | null>(null);
  const [consecutivo_buscar, set_consecutivo_buscar] = useState<number>(0);
  const [loadding_btn_buscar, set_loadding_btn_buscar] = useState<boolean>(false);
  const [fecha_salida, set_fecha_salida] = useState<Dayjs | null>(null);

  const [inputs_almacenista, set_inputs_almacenista] = useState<inputs_almacenista>(Object);
  const [inputs_funcionario_responsable, set_inputs_funcionario_responsable] = useState<inputs_funcionario_responsable>(Object);

  const [funcionario_responsable_seleccionado, set_funcionario_responsable_seleccionado] = useState<interface_busqueda_responsable>(Object);


  const buscar_registro = () => {
    set_loadding_btn_buscar(true);
    // Lógica de búsqueda
    set_loadding_btn_buscar(false);
  };

  const limpiar_formulario = () => {
    set_accion('null');
    set_loadding(false);
    set_consecutivo_buscar(0);
    set_loadding_btn_buscar(false);
    set_inputs_almacenista({} as inputs_almacenista);
    set_inputs_funcionario_responsable({} as inputs_funcionario_responsable);
    set_funcionario_responsable_seleccionado({} as interface_busqueda_responsable);
  };

  const get_obtener_responsables_fc = () => {
    dispatch(get_obtener_responsables(
      inputs_funcionario_responsable.tipo_documento,
      inputs_funcionario_responsable.numero_documento,
      '',
      '',
      '',
      '',
    )).then((response: response_busqueda_responsable) => {
      if(Object.keys(response).length !== 0) {
        if (response.data.length !== 0) {
          set_funcionario_responsable_seleccionado(response.data[0]);
          control_success('Funcionario encontrado');
        } else {
          set_funcionario_responsable_seleccionado({} as interface_busqueda_responsable);
          control_error('No se encontraro el funcionario, pruebe con el botón de búsqueda avanzada');
        }
      } else {
        control_error('Error en el servidor al obtener los responsables de la solicitud de activos');
      }
    });
  }

  const busqueda_responsable = () => {
    if(inputs_funcionario_responsable.tipo_documento === ''){
      control_error('Debe seleccionar el tipo de documento');
      return;
    } else if (inputs_funcionario_responsable.numero_documento.trim() === ''){
      control_error('Debe ingresar el número de documento');
      return;
    }
    get_obtener_responsables_fc();
  }

  const onsubmit_form = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };


  return (
    <>
      <ModalBusquedaResponsable
        set_mostrar_busqueda_responsable={set_mostrar_busqueda_responsable}
        mostrar_busqueda_responsable={mostrar_busqueda_responsable}
        set_funcionario_responsable_seleccionado={set_funcionario_responsable_seleccionado}
        set_inputs_funcionario_responsable={set_inputs_funcionario_responsable}
      />

      <Grid container spacing={2} marginTop={2} sx={{
          position: "relative",
          background: "#FAFAFA",
          borderRadius: "15px",
          p: "40px",
          mb: "20px",
          boxShadow: "0px 3px 6px #042F4A26",
        }}       
        >
        <Grid item xs={12}>
          <Title title="Devolución de activos" />

          <Box
            component={'form'}
            onSubmit={onsubmit_form}
            sx={{ mt: '20px' , width: '100%'}}
          >
            <Grid container spacing={2} item xs={12}>
              <Grid container item xs={12} lg={3}>
                <TextField
                  fullWidth
                  disabled
                  label='Consecutivo creación de baja:'
                  size='small'
                  value={consecutivo === null ? 'Cargando...' : consecutivo_buscar === 0 ? consecutivo : ''}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    set_consecutivo(Number(event.target.value));
                  }}
                />
              </Grid>

              <Grid container item xs={12} lg={3}>
                <TextField
                  type='number'
                  fullWidth
                  disabled={accion === 'crear' || loadding_btn_buscar}
                  label='Consecutivo a buscar:'
                  size='small'
                  value={consecutivo_buscar === 0 ? '' : consecutivo_buscar}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    set_consecutivo_buscar(Number(event.target.value));
                  }}
                />
              </Grid>

              <Grid container item xs={12} lg={2}>
                <Button
                  fullWidth
                  type='button'
                  variant='contained'
                  disabled={accion === 'crear' || loadding_btn_buscar}
                  color='primary'
                  startIcon={loadding_btn_buscar ? <CircularProgress size={25} /> :<SearchIcon />}
                  onClick={buscar_registro}
                >
                  {loadding_btn_buscar ? '' : 'Buscar Registro'}
                </Button>
              </Grid>

              <Grid container item xs={12} lg={4} sx={{
                display: "flex",
                justifyContent: "end",
                }}>
                <Grid item xs={12} lg={8}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disabled
                      label='Fecha de salida: '
                      value={fecha_salida}
                      onChange={() => {}} // Not implemented
                      renderInput={(params) => (
                        <TextField disabled required fullWidth size="small" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>


              <Grid item xs={12} mt={4}>
                <Divider orientation="horizontal" variant="fullWidth" style={{marginBlock: 'auto', width: '100%'}}>
                  <Chip label="INFORMACION DE ALMACENISTA" size="small" />
                </Divider>
              </Grid>

              <Grid container item xs={12} lg={3}>
                <TextField
                  fullWidth
                  disabled
                  label='Tipo de documento: '
                  size='small'
                  value={inputs_almacenista.tipo_documento ?? ''}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    set_inputs_almacenista((prev)=>({...prev, tipo_documento: event.target.value}));
                  }}
                />
              </Grid>

              <Grid container item xs={12} lg={3}>
                <TextField
                  fullWidth
                  disabled
                  label='Número de documento: '
                  size='small'
                  value={inputs_almacenista.numero_documento ?? ''}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    set_inputs_almacenista((prev)=>({...prev, numero_documento: event.target.value}));
                  }}
                />
              </Grid>

              <Grid container item xs={12} lg={6}>
                <TextField
                  fullWidth
                  disabled
                  label='Nombre completo: '
                  size='small'
                  value={inputs_almacenista.nombre_apellido ?? ''}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    set_inputs_almacenista((prev)=>({...prev, nombre: event.target.value}));
                  }}
                />
              </Grid>

              <Grid container spacing={2} my={4} item xs={12}>
                <Grid item xs={12}>
                  <Divider orientation="horizontal" variant="fullWidth" style={{marginBlock: 'auto', width: '100%'}}>
                    <Chip label="FUNCIONARIO RESPONSABLE" size="small" />
                  </Divider>
                </Grid>

                <Grid item xs={12} lg={4.5}>
                  <FormControl required size="small" fullWidth>
                    <InputLabel >Tipo documento responsable</InputLabel>
                    <Select
                      label='Tipo documento responsable'
                      value={inputs_funcionario_responsable.tipo_documento ?? ''}
                      disabled={accion === 'ver'}
                      onChange={(event: any) => {
                        set_inputs_funcionario_responsable((prev)=>({...prev, tipo_documento: event.target.value}));
                      }}
                    >
                      <MenuItem value="CC">Cédula de ciudadanía</MenuItem>
                      <MenuItem value="RC" >Registro civil</MenuItem>
                      <MenuItem value="TI" >Tarjeta de identidad</MenuItem>
                      <MenuItem value="CE" >Cédula de extranjería</MenuItem>
                      <MenuItem value="PA" >Pasaporte</MenuItem>
                      <MenuItem value="PE" >Permiso especial de permanencia</MenuItem>
                      <MenuItem value="NT" >NIT</MenuItem>
                      <MenuItem value="NU" >NUIP</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} lg={4.5}>
                  <TextField
                    fullWidth
                    label='Documento responsable'
                    value={inputs_funcionario_responsable.numero_documento ?? ''}
                    disabled={accion === 'ver'}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        set_inputs_funcionario_responsable((prev)=>({...prev, numero_documento: event.target.value}));
                      }
                    }
                    size='small'
                  />
                </Grid>

                {accion !== 'ver' &&
                    <Grid item xs={12} lg={3}>
                      <Button
                        fullWidth
                        disabled={accion === 'ver'}
                        color="primary"
                        variant="contained"
                        startIcon={<SearchIcon />}
                        onClick={busqueda_responsable}
                      >
                        Buscar
                      </Button>
                    </Grid>
                }

                <Grid item xs={12} lg={9}>
                  <TextField
                    fullWidth
                    disabled
                    label='Nombres responsable'
                    value={funcionario_responsable_seleccionado.nombre_completo ?? ''}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        set_inputs_funcionario_responsable((prev)=>({...prev, nombre_apellido: event.target.value}))
                      }
                    }
                    size='small'
                  />
                </Grid>

                {accion !== 'ver' &&
                  <Grid item xs={12} lg={3}>
                    <Button
                      fullWidth
                      disabled={accion === 'ver'}
                      color="primary"
                      variant="contained"
                      startIcon={<SearchIcon />}
                      onClick={()=>set_mostrar_busqueda_responsable(true)}
                    >
                      Búsqueda avanzada
                    </Button>
                  </Grid>
                }
              </Grid>

            </Grid>

            <Grid item xs={12}  sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                marginTop: "20px",
                gap: 2,
              }}
              >
              <Grid item xs={12} lg={2}>
                <Button
                  fullWidth
                  color="success"
                  variant="contained"
                  disabled={loadding}
                  startIcon={loadding ? <CircularProgress size={25} /> :<SaveIcon />}
                  type='submit'
                >
                  {!loadding ? accion === 'crear' ? "Guardar" : 'Actualizar' : ''}
                </Button>
              </Grid>

              <Grid item xs={12} lg={2}>
                <Button
                  fullWidth
                  color="inherit"
                  variant="outlined"
                  startIcon={<CleanIcon />}
                  onClick={limpiar_formulario}
                >
                  Limpiar
                </Button>
              </Grid>
            </Grid>

          </Box>
        </Grid>
        
      </Grid>
    </>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default DevolucionActivos;