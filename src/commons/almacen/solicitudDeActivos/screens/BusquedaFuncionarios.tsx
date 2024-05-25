import { Button, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import ModalBusquedaResponsable from '../manners/ModalBusquedaResponsable';
import ModalBusquedaOperario from '../manners/ModalBusquedaOperario';
import { interface_articulos_agregados, interface_articulos_despachados, interface_articulos_obtenidos_por_id, interface_busqueda_articulo, interface_busqueda_operario, interface_busqueda_responsable, interface_inputs_persona_alma_rechaza, interface_inputs_persona_cierra_no_dispo_alma, interface_inputs_resumen_despacho, response_busqueda_responsable } from '../interfaces/types';
import { useDispatch } from 'react-redux';
import { get_obtener_operarios, get_obtener_responsables } from '../thunks/solicitud_activos';
import { control_error, control_success } from '../../../../helpers';
import { Dayjs } from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TablaArticulosAgregados from '../tables/TablaArticulosAgregados';
import { Title } from '../../../../components';
import ResumenDespacho from '../../autorizacion_solicitud_activos/screens/ResumenDespacho';


interface props {
  accion: string;
  switch_solicitud_prestamo: boolean;
  set_switch_solicitud_prestamo: React.Dispatch<React.SetStateAction<boolean>>;
  tipo_documento_responsable: string;
  set_tipo_documento_responsable: React.Dispatch<React.SetStateAction<string>>;
  documento_responsable: string;
  set_documento_responsable: React.Dispatch<React.SetStateAction<string>>;
  nombres_responsable: string;
  set_nombres_responsable: React.Dispatch<React.SetStateAction<string>>;
  apellidos_responsable: string;
  set_apellidos_responsable: React.Dispatch<React.SetStateAction<string>>;
  tipo_documento_operario: string;
  set_tipo_documento_operario: React.Dispatch<React.SetStateAction<string>>;
  documento_operario: string;
  set_documento_operario: React.Dispatch<React.SetStateAction<string>>;
  nombres_operario: string;
  set_nombres_operario: React.Dispatch<React.SetStateAction<string>>;
  apellidos_operario: string;
  set_apellidos_operario: React.Dispatch<React.SetStateAction<string>>;
  motivo: string;
  set_motivo: React.Dispatch<React.SetStateAction<string>>;
  observaciones: string;
  set_observaciones: React.Dispatch<React.SetStateAction<string>>;
  set_funcionario_responsable_seleccionado: React.Dispatch<React.SetStateAction<interface_busqueda_responsable>>;
  funcionario_responsable_seleccionado: interface_busqueda_responsable;
  set_funcionario_operario_seleccionado: React.Dispatch<React.SetStateAction<interface_busqueda_operario>>;
  funcionario_operario_seleccionado: interface_busqueda_operario;
  tipo_documento_solicito: string;
  set_tipo_documento_solicito: React.Dispatch<React.SetStateAction<string>>;
  documento_solicito: string;
  set_documento_solicito: React.Dispatch<React.SetStateAction<string>>;
  nombres_solicito: string;
  set_nombres_solicito: React.Dispatch<React.SetStateAction<string>>;
  apellidos_solicito: string;
  set_apellidos_solicito: React.Dispatch<React.SetStateAction<string>>;
  set_fecha_devolucion_ver: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  set_fecha_solicitud: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  set_estado_solicitud: React.Dispatch<React.SetStateAction<string>>;
  fecha_devolucion_ver: Dayjs | null;
  fecha_solicitud: Dayjs | null;
  set_fecha_cierre_solicitud: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  fecha_cierre_solicitud: Dayjs | null;
  estado_solicitud: string;
  data_articulos_agregados: interface_articulos_agregados[] | interface_articulos_obtenidos_por_id[];
  set_data_articulos_agregados: React.Dispatch<React.SetStateAction<interface_articulos_agregados[] | interface_articulos_obtenidos_por_id[]>>;
  set_articulo_encontrado: React.Dispatch<React.SetStateAction<interface_busqueda_articulo>>;
  set_tipo_unidad_medida: React.Dispatch<React.SetStateAction<string>>;
  set_cantidad_articulo: React.Dispatch<React.SetStateAction<number>>;
  set_fecha_devolucion: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  set_observacion: React.Dispatch<React.SetStateAction<string>>;
  inputs_resumen_despacho: interface_inputs_resumen_despacho;
  data_articulos_despachados: interface_articulos_despachados[];
  inputs_persona_alma_no_dispo_alma: interface_inputs_persona_cierra_no_dispo_alma;
  inputs_persona_alma_rechaza: interface_inputs_persona_alma_rechaza;
  unidades_medidas: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const BusquedaFuncionarios: React.FC<props> = ({
  accion,
  switch_solicitud_prestamo,
  set_switch_solicitud_prestamo,
  tipo_documento_responsable,
  set_tipo_documento_responsable,
  documento_responsable,
  set_documento_responsable,
  nombres_responsable,
  set_nombres_responsable,
  apellidos_responsable,
  set_apellidos_responsable,
  tipo_documento_operario,
  set_tipo_documento_operario,
  documento_operario,
  set_documento_operario,
  nombres_operario,
  set_nombres_operario,
  apellidos_operario,
  set_apellidos_operario,
  motivo,
  set_motivo,
  observaciones,
  set_observaciones,
  set_funcionario_responsable_seleccionado,
  funcionario_responsable_seleccionado,
  set_funcionario_operario_seleccionado,
  funcionario_operario_seleccionado,
  tipo_documento_solicito,
  set_tipo_documento_solicito,
  documento_solicito,
  set_documento_solicito,
  nombres_solicito,
  set_nombres_solicito,
  apellidos_solicito,
  set_apellidos_solicito,
  set_fecha_devolucion_ver,
  set_fecha_solicitud,
  set_estado_solicitud,
  fecha_devolucion_ver,
  fecha_solicitud,
  estado_solicitud,
  set_fecha_cierre_solicitud,
  fecha_cierre_solicitud,
  data_articulos_agregados,
  set_data_articulos_agregados,
  set_articulo_encontrado,
  set_tipo_unidad_medida,
  set_cantidad_articulo,
  set_fecha_devolucion,
  set_observacion,
  inputs_resumen_despacho,
  data_articulos_despachados,
  inputs_persona_alma_no_dispo_alma,
  inputs_persona_alma_rechaza,
  unidades_medidas,
}) => {

  const dispatch = useDispatch();

  const [mostrar_busqueda_responsable, set_mostrar_busqueda_responsable] = useState<boolean>(false);
  const [mostrar_busqueda_operario, set_mostrar_busqueda_operario] = useState<boolean>(false);

  useEffect(() => {
    if (Object.keys(funcionario_responsable_seleccionado).length !== 0) {
      set_tipo_documento_responsable(funcionario_responsable_seleccionado.tipo_documento);
      set_documento_responsable(funcionario_responsable_seleccionado.numero_documento);
      set_nombres_responsable(funcionario_responsable_seleccionado.primer_nombre ?? '');
      set_apellidos_responsable(funcionario_responsable_seleccionado.primer_apellido ?? '');
    }
  }, [funcionario_responsable_seleccionado]);

  useEffect(() => {
    if (Object.keys(funcionario_operario_seleccionado).length !== 0) {
      set_tipo_documento_operario(funcionario_operario_seleccionado.tipo_documento);
      set_documento_operario(funcionario_operario_seleccionado.numero_documento);
      set_nombres_operario(funcionario_operario_seleccionado.primer_nombre ?? '');
      set_apellidos_operario(funcionario_operario_seleccionado.primer_apellido ?? '');
    }
  }, [funcionario_operario_seleccionado]);

  const get_obtener_responsables_fc = () => {
    dispatch(get_obtener_responsables(
      tipo_documento_responsable,
      documento_responsable,
      '',
      '',
      '',
      '',
    )).then((response: response_busqueda_responsable) => {
      if (Object.keys(response).length !== 0) {
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

  const get_obtener_operarios_fc = () => {
    dispatch(get_obtener_operarios(
      tipo_documento_operario,
      documento_operario,
      '',
      '',
      '',
      '',
    )).then((response: response_busqueda_responsable) => {
      if (Object.keys(response).length !== 0) {
        if (response.data.length !== 0) {
          set_funcionario_operario_seleccionado(response.data[0]);
          control_success('Funcionario encontrado');
        } else {
          set_funcionario_operario_seleccionado({} as interface_busqueda_operario);
          control_error('No se encontraro el funcionario, pruebe con el botón de búsqueda avanzada');
        }
      } else {
        control_error('Error en el servidor al obtener los responsables de la solicitud de activos');
      }
    });
  }

  const busqueda_responsable = () => {
    if (tipo_documento_responsable === '') {
      control_error('Debe seleccionar el tipo de documento');
      return;
    } else if (documento_responsable.trim() === '') {
      control_error('Debe ingresar el número de documento');
      return;
    }
    get_obtener_responsables_fc();
  }

  const busqueda_operario = () => {
    if (tipo_documento_operario === '') {
      control_error('Debe seleccionar el tipo de documento');
      return;
    } else if (documento_operario.trim() === '') {
      control_error('Debe ingresar el número de documento');
      return;
    }
    get_obtener_operarios_fc();
  }

  return (
    <>
      <ModalBusquedaResponsable
        set_mostrar_busqueda_responsable={set_mostrar_busqueda_responsable}
        mostrar_busqueda_responsable={mostrar_busqueda_responsable}
        set_funcionario_responsable_seleccionado={set_funcionario_responsable_seleccionado}
      />
      <ModalBusquedaOperario
        set_mostrar_busqueda_operario={set_mostrar_busqueda_operario}
        mostrar_busqueda_operario={mostrar_busqueda_operario}
        set_funcionario_operario_seleccionado={set_funcionario_operario_seleccionado}
      />

      <Grid item xs={12}>
        <FormLabel sx={{ fontWeight: '700' }} htmlFor="solicitud_prestamo">
          ¿Es solicitud de préstamo?
        </FormLabel>
        <Switch
          id="solicitud_prestamo"
          checked={switch_solicitud_prestamo}
          disabled={accion === 'ver'}
          onChange={() => {
            set_switch_solicitud_prestamo(!switch_solicitud_prestamo)
          }}
        />
      </Grid>

      {accion === 'ver' &&
        <>
          <Grid item xs={12} lg={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled
                label="Fecha de solicitud:"
                value={fecha_solicitud}
                onChange={(newValue) => {
                  set_fecha_solicitud(newValue);
                }}
                renderInput={(params) => (
                  <TextField fullWidth size="small" {...params} />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} lg={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled
                label="Fecha de cierre solicitud"
                value={fecha_cierre_solicitud}
                onChange={(newValue) => {
                  set_fecha_cierre_solicitud(newValue);
                }}
                renderInput={(params) => (
                  <TextField fullWidth size="small" {...params} />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} lg={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled
                label="Fecha de devolución"
                value={fecha_devolucion_ver ?? null}
                onChange={(newValue) => {
                  set_fecha_devolucion_ver(newValue);
                }}
                renderInput={(params) => (
                  <TextField fullWidth size="small" {...params} />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} lg={3}>
            <TextField
              fullWidth
              label='Estado de la solicitud'
              value={estado_solicitud}
              disabled
              onChange={(e) => set_estado_solicitud(e.target.value)}
              size='small'
            />
          </Grid>
        </>
      }

      {accion === 'ver' &&
        <Grid container spacing={2} item xs={12}>
          <Grid item xs={12}>
            <Divider orientation="horizontal" variant="fullWidth" style={{ marginBlock: 'auto', width: '100%' }}>
              <Chip label="FUNCIONARIO QUIEN SOLICITÓ" size="small" />
            </Divider>
          </Grid>

          <Grid item xs={12} lg={3}>
            <FormControl required size="small" fullWidth>
              <InputLabel >Tipo documento de quien solicitó</InputLabel>
              <Select
                label='Tipo documento de quien solicitó'
                value={tipo_documento_solicito}
                disabled={accion === 'ver'}
                onChange={(e) => set_tipo_documento_solicito(e.target.value)}
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

          <Grid item xs={12} lg={3}>
            <TextField
              fullWidth
              label='Documento de quien solicitó'
              value={documento_solicito}
              disabled={accion === 'ver'}
              onChange={(e) => set_documento_solicito(e.target.value)}
              size='small'
            />
          </Grid>

          {accion !== 'ver' &&
            <>
              <Grid item xs={12} lg={3}>
                <Button
                  fullWidth
                  disabled={accion === 'ver'}
                  color="primary"
                  variant="contained"
                  startIcon={<SearchIcon />}
                >
                  Buscar
                </Button>
              </Grid>

              <Grid item xs={12} lg={3}>
                <Button
                  fullWidth
                  disabled={accion === 'ver'}
                  color="primary"
                  variant="contained"
                  startIcon={<SearchIcon />}
                >
                  Búsqueda avanzada
                </Button>
              </Grid>
            </>
          }

          <Grid item xs={12} lg={accion === 'ver' ? 3 : 6}>
            <TextField
              fullWidth
              disabled
              label='Nombres de quien solicitó'
              value={nombres_solicito}
              onChange={(e) => set_nombres_solicito(e.target.value)}
              size='small'
            />
          </Grid>

          <Grid item xs={12} lg={accion === 'ver' ? 3 : 6}>
            <TextField
              fullWidth
              disabled
              label='Apellidos de quien solicitó'
              value={apellidos_solicito}
              onChange={(e) => set_apellidos_solicito(e.target.value)}
              size='small'
            />
          </Grid>
        </Grid>
      }

      <Grid container spacing={2} item xs={12}>
        <Grid item xs={12}>
          <Divider orientation="horizontal" variant="fullWidth" style={{ marginBlock: 'auto', width: '100%' }}>
            <Chip label="FUNCIONARIO RESPONSABLE" size="small" />
          </Divider>
        </Grid>

        <Grid item xs={12} lg={3}>
          <FormControl required size="small" fullWidth>
            <InputLabel >Tipo documento responsable</InputLabel>
            <Select
              label='Tipo documento responsable'
              value={tipo_documento_responsable}
              disabled={accion === 'ver'}
              onChange={(e) => set_tipo_documento_responsable(e.target.value)}
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

        <Grid item xs={12} lg={3}>
          <TextField
            fullWidth
            label='Documento responsable'
            value={documento_responsable}
            disabled={accion === 'ver'}
            onChange={(e) => set_documento_responsable(e.target.value)}
            size='small'
          />
        </Grid>

        {accion !== 'ver' &&
          <>
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

            <Grid item xs={12} lg={3}>
              <Button
                fullWidth
                disabled={accion === 'ver'}
                color="primary"
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={() => set_mostrar_busqueda_responsable(true)}
              >
                Búsqueda avanzada
              </Button>
            </Grid>
          </>
        }

        <Grid item xs={12} lg={accion === 'ver' ? 3 : 6}>
          <TextField
            fullWidth
            disabled
            label='Nombres responsable'
            value={nombres_responsable}
            onChange={(e) => set_nombres_responsable(e.target.value)}
            size='small'
          />
        </Grid>

        <Grid item xs={12} lg={accion === 'ver' ? 3 : 6}>
          <TextField
            fullWidth
            disabled
            label='Apellidos responsable'
            value={apellidos_responsable}
            onChange={(e) => set_apellidos_responsable(e.target.value)}
            size='small'
          />
        </Grid>
      </Grid>


      <Grid container spacing={2} item xs={12}>
        <Grid item xs={12}>
          <Divider orientation="horizontal" variant="fullWidth" style={{ marginBlock: 'auto', width: '100%' }}>
            <Chip label="FUNCIONARIO OPERARIO" size="small" />
          </Divider>
        </Grid>


        <Grid item xs={12} lg={3}>
          <FormControl required size="small" fullWidth>
            <InputLabel >Tipo documento operario</InputLabel>
            <Select
              label='Tipo documento operario'
              value={tipo_documento_operario}
              disabled={accion === 'ver'}
              onChange={(e) => set_tipo_documento_operario(e.target.value)}
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

        <Grid item xs={12} lg={3}>
          <TextField
            fullWidth
            label='Documento operario'
            value={documento_operario}
            disabled={accion === 'ver'}
            onChange={(e) => set_documento_operario(e.target.value)}
            size='small'
          />
        </Grid>

        {accion !== 'ver' &&
          <>
            <Grid item xs={12} lg={3}>
              <Button
                fullWidth
                disabled={accion === 'ver'}
                color="primary"
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={busqueda_operario}
              >
                Buscar
              </Button>
            </Grid>

            <Grid item xs={12} lg={3}>
              <Button
                fullWidth
                disabled={accion === 'ver'}
                color="primary"
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={() => set_mostrar_busqueda_operario(true)}
              >
                Búsqueda avanzada
              </Button>
            </Grid>
          </>
        }

        <Grid item xs={12} lg={accion === 'ver' ? 3 : 6}>
          <TextField
            fullWidth
            disabled
            label='Nombres operario'
            value={nombres_operario}
            onChange={(e) => set_nombres_operario(e.target.value)}
            size='small'
          />
        </Grid>

        <Grid item xs={12} lg={accion === 'ver' ? 3 : 6}>
          <TextField
            fullWidth
            disabled
            label='Apellidos operario'
            value={apellidos_operario}
            onChange={(e) => set_apellidos_operario(e.target.value)}
            size='small'
          />
        </Grid>
      </Grid>

      {accion === 'ver' &&
        <>
          <Grid container spacing={2} item xs={12}>
            <Grid item xs={12}>
              <Divider orientation="horizontal" variant="fullWidth" style={{ marginBlock: 'auto', width: '100%' }}>
                <Chip label="FUNCIONARIO QUE CIERRA POR NO DISPONIBILIDAD EN ALMACÉN" size="small" />
              </Divider>
            </Grid>

            <Grid item xs={12} lg={3}>
              <FormControl required size="small" fullWidth>
                <InputLabel >Tipo documento</InputLabel>
                <Select
                  label='Tipo documento'
                  value={inputs_persona_alma_no_dispo_alma.tipo_documento_persona_cierra_no_dispo_alma || ''}
                  disabled={accion === 'ver'}
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

            <Grid item xs={12} lg={3}>
              <TextField
                fullWidth
                label='Documento: '
                value={inputs_persona_alma_no_dispo_alma.documento_persona_cierra_no_dispo_alma || ''}
                disabled={accion === 'ver'}
                size='small'
              />
            </Grid>

            <Grid item xs={12} lg={3}>
              <TextField
                fullWidth
                disabled
                label='Nombres: '
                value={inputs_persona_alma_no_dispo_alma.nombres_persona_cierra_no_dispo_alma || ''}
                size='small'
              />
            </Grid>

            <Grid item xs={12} lg={3}>
              <TextField
                fullWidth
                disabled
                label='Apellidos: '
                value={inputs_persona_alma_no_dispo_alma.apellidos_persona_cierra_no_dispo_alma || ''}
                size='small'
              />
            </Grid>

            <Grid item xs={12} lg={10}>
              <TextField
                fullWidth
                multiline
                rows={1}
                label='Observaciones del cierre: '
                value={inputs_persona_alma_no_dispo_alma.obser_cierre_no_dispo_alma || ''}
                disabled={accion === 'ver'}
                size='small'
              />
            </Grid>

            <Grid item xs={12} lg={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disabled
                  label="Fecha de cierre:"
                  value={inputs_persona_alma_no_dispo_alma.fecha_cierre_no_dispo_alma || null}
                  onChange={() => { }} // No hace nada
                  renderInput={(params) => (
                    <TextField fullWidth size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Grid container spacing={2} item xs={12}>
            <Grid item xs={12}>
              <Divider orientation="horizontal" variant="fullWidth" style={{ marginBlock: 'auto', width: '100%' }}>
                <Chip label="FUNCIONARIO DE ALMACÉN QUE RECHAZA LA SOLICITUD" size="small" />
              </Divider>
            </Grid>

            <Grid item xs={12} lg={3}>
              <FormControl required size="small" fullWidth>
                <InputLabel >Tipo documento:</InputLabel>
                <Select
                  label='Tipo documento:'
                  value={inputs_persona_alma_rechaza.tipo_documento_persona_alma_rechaza || ''}
                  disabled={accion === 'ver'}
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

            <Grid item xs={12} lg={3}>
              <TextField
                fullWidth
                label='Documento: '
                value={inputs_persona_alma_rechaza.documento_persona_alma_rechaza || ''}
                disabled={accion === 'ver'}
                size='small'
              />
            </Grid>

            <Grid item xs={12} lg={3}>
              <TextField
                fullWidth
                disabled
                label='Nombres: '
                value={inputs_persona_alma_rechaza.nombres_persona_alma_rechaza || ''}
                size='small'
              />
            </Grid>

            <Grid item xs={12} lg={3}>
              <TextField
                fullWidth
                disabled
                label='Apellidos: '
                value={inputs_persona_alma_rechaza.apellidos_persona_alma_rechaza || ''}
                size='small'
              />
            </Grid>

            <Grid item xs={12} lg={10}>
              <TextField
                fullWidth
                multiline
                rows={1}
                label='Justificación del rechazo'
                value={inputs_persona_alma_rechaza.justificacion_rechazo_almacen || ''}
                disabled={accion === 'ver'}
                size='small'
              />
            </Grid>

            <Grid item xs={12} lg={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disabled
                  label="Fecha de rechazo:"
                  value={inputs_persona_alma_rechaza.fecha_rechazo_almacen || null}
                  onChange={() => { }} // No hace nada
                  renderInput={(params) => (
                    <TextField fullWidth size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </>
      }


      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          multiline
          rows={2}
          label='Motivo'
          value={motivo}
          disabled={accion === 'ver'}
          onChange={(e) => set_motivo(e.target.value)}
          size='small'
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          multiline
          rows={2}
          label='Observaciones'
          value={observaciones}
          disabled={accion === 'ver'}
          onChange={(e) => set_observaciones(e.target.value)}
          size='small'
        />
      </Grid>

      {accion === 'ver' &&
        <>
          <Grid container item xs={12}>
            <Title title="Artículos solicitados" />
            <TablaArticulosAgregados
              accion={accion}
              unidades_medidas={unidades_medidas}
              switch_solicitud_prestamo={switch_solicitud_prestamo}
              data_articulos_agregados={data_articulos_agregados}
              set_data_articulos_agregados={set_data_articulos_agregados}
              set_articulo_encontrado={set_articulo_encontrado}
              set_tipo_unidad_medida={set_tipo_unidad_medida}
              set_cantidad_articulo={set_cantidad_articulo}
              set_fecha_devolucion={set_fecha_devolucion}
              set_observacion={set_observacion}
            />
          </Grid>

          <ResumenDespacho
            inputs_resumen_despacho={inputs_resumen_despacho}
            data_articulos_despachados={data_articulos_despachados}
          />
        </>
      }
    </>
  );
}


// eslint-disable-next-line no-restricted-syntax
export default BusquedaFuncionarios;