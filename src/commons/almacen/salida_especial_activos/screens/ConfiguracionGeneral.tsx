import React, { useState, useEffect, useRef } from 'react';
import { Button, Chip, CircularProgress, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import { interface_anexo_opcional, interface_entradas_relacionadas, interface_form_inf_tercero, interface_inf_tercero, response_interface_registro_por_consecutivo, response_obtener_consecutivo } from '../interfaces/types';
import dayjs, { Dayjs } from 'dayjs';
import { useDispatch } from 'react-redux';
import { get_obtener_consecutivo, get_obtener_data_registro_por_consecutivo } from '../thunks/salida_especial_activos';
import { control_error, control_success } from '../../../../helpers';
import ModalBusquedaTercero from '../manners/ModalBusquedaTercero';
import AnexosOpcionales from './AnexosOpcionales';
import { Title } from '../../../../components';
import TablaEntradasRelacionadas from '../tables/TablaEntradasRelacionadas';
import { set } from 'date-fns';

interface props {
  form_data: FormData;
  set_consecutivo: React.Dispatch<React.SetStateAction<number | null>>;
  consecutivo: number | null;
  set_consecutivo_buscar: React.Dispatch<React.SetStateAction<number>>;
  consecutivo_buscar: number;
  fecha_salida: Dayjs | null;
  concepto: string;
  set_concepto: React.Dispatch<React.SetStateAction<string>>;
  loadding_registro_baja: boolean;
  accion: string;
  set_accion: React.Dispatch<React.SetStateAction<string>>;
  set_referencia_salida: React.Dispatch<React.SetStateAction<string>>;
  referencia_salida: string;
  set_form_inf_tercero: React.Dispatch<React.SetStateAction<interface_form_inf_tercero>>;
  form_inf_tercero: interface_form_inf_tercero;
  set_loadding_registro_baja: React.Dispatch<React.SetStateAction<boolean>>;
  set_data_inf_tercero_seleccionado: React.Dispatch<React.SetStateAction<interface_inf_tercero>>;
  data_anexos_opcionales: interface_anexo_opcional[];
  set_data_anexos_opcionales: React.Dispatch<React.SetStateAction<interface_anexo_opcional[]>>;
  data_entradas_relacionadas: interface_entradas_relacionadas[];
  data_anexos_agregados: File[];
  set_data_anexos_agregados: React.Dispatch<React.SetStateAction<File[]>>;
  ordenar_data_anexos: () => void;
  set_data_registro_por_consecutivo: React.Dispatch<React.SetStateAction<response_interface_registro_por_consecutivo>>;
  data_registro_por_consecutivo: response_interface_registro_por_consecutivo;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ConfiguracionGeneral: React.FC<props> = ({
  form_data,
  set_consecutivo,
  consecutivo,
  set_consecutivo_buscar,
  consecutivo_buscar,
  set_loadding_registro_baja,
  fecha_salida,
  concepto,
  set_concepto,
  loadding_registro_baja,
  accion,
  set_referencia_salida,
  referencia_salida,
  set_form_inf_tercero,
  form_inf_tercero,
  set_accion,
  set_data_inf_tercero_seleccionado,
  data_anexos_opcionales,
  set_data_anexos_opcionales,
  data_entradas_relacionadas,
  data_anexos_agregados,
  set_data_anexos_agregados,
  ordenar_data_anexos,
  set_data_registro_por_consecutivo,
  data_registro_por_consecutivo
}) => {

  const dispatch = useDispatch();

  const [mostrar_modal_tercero, set_mostrar_modal_tercero] = useState<boolean>(false);

  const get_obtener_consecutivo_fc = async () => {
    await dispatch(get_obtener_consecutivo())
      .then((response: response_obtener_consecutivo) => {
        if (Object.keys(response).length !== 0) {
          if (response.success) {
            set_consecutivo(response.ultimo_consecutivo);
          } else {
            set_consecutivo(null);
            control_error(response.detail);
          }
        } else {
          set_consecutivo(null);
          control_error('No se pudo obtener el consecutivo de la salida especial de activos');
        }
      });
  }

  const get_obtener_data_registro_por_consecutivo_fc = async () => {
    set_loadding_registro_baja(true);
    await dispatch(get_obtener_data_registro_por_consecutivo(consecutivo_buscar))
      .then((response: response_interface_registro_por_consecutivo) => {
        if (Object.keys(response).length !== 0) {
          set_data_registro_por_consecutivo(response);
          control_success('Registro de salida espacial encontrado con éxito');
          set_loadding_registro_baja(false);
        } else {
          set_data_registro_por_consecutivo({} as response_interface_registro_por_consecutivo);
          control_error('No se pudo obtener el registro por consecutivo de la salida especial de activos');
          set_loadding_registro_baja(false);
          set_accion('null');
        }
      });
  }

  const consecutivo_obtenido = useRef(false);
  useEffect(() => {
    if (!consecutivo_obtenido.current) {
      get_obtener_consecutivo_fc();
      consecutivo_obtenido.current = true;
    }
  }, [consecutivo_obtenido]);

  const busqueda_tercero = async () => {
    //await get_obtener_operario_fc();
  }

  const buscar_registro = async () => {
    set_accion('ver');
    if(consecutivo_buscar !== 0){
      get_obtener_data_registro_por_consecutivo_fc();
    } else {
      control_error('Digite un consecutivo en el campo de búsqueda');
    }
  }

  return (
    <>
      <ModalBusquedaTercero
        set_mostrar_modal_tercero={set_mostrar_modal_tercero}
        mostrar_modal_tercero={mostrar_modal_tercero}
        set_data_inf_tercero_seleccionado={set_data_inf_tercero_seleccionado}
      />

      <Grid container item xs={12} rowSpacing={4} columnSpacing={2}>
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
            disabled={accion === 'crear' || loadding_registro_baja}
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
            disabled={accion === 'crear' || loadding_registro_baja}
            color='primary'
            startIcon={loadding_registro_baja ? <CircularProgress size={25} /> : <SearchIcon />}
            onClick={buscar_registro}
          >
            {loadding_registro_baja ? '' : 'Buscar Registro'}
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
                onChange={() => { }} // Not implemented
                renderInput={(params) => (
                  <TextField disabled required fullWidth size="small" {...params} />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid container spacing={2} my={5} item xs={12}>
          <Grid item xs={12}>
            <Divider orientation="horizontal" variant="fullWidth" style={{ marginBlock: 'auto', width: '100%' }}>
              <Chip label="INFORMACION DE TERCERO" size="small" />
            </Divider>
          </Grid>


          <Grid item xs={12} lg={3}>
            <FormControl required size="small" fullWidth>
              <InputLabel >Tipo documento </InputLabel>
              <Select
                label='Tipo documento '
                value={form_inf_tercero.tipo_documento ?? ''}
                disabled={accion === 'ver'}
                onChange={
                  (e) => set_form_inf_tercero({ ...form_inf_tercero, tipo_documento: e.target.value })
                }
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
              label='Documento '
              value={form_inf_tercero.documento ?? ''}
              disabled={accion === 'ver'}
              onChange={
                (e) => set_form_inf_tercero({ ...form_inf_tercero, documento: e.target.value })
              }
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
                  onClick={busqueda_tercero}
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
                  onClick={() => set_mostrar_modal_tercero(true)}
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
              label='Nombres '
              value={form_inf_tercero.nombres ?? ''}
              onChange={
                (e) => set_form_inf_tercero({ ...form_inf_tercero, nombres: e.target.value })
              }
              size='small'
            />
          </Grid>

          <Grid item xs={12} lg={accion === 'ver' ? 3 : 6}>
            <TextField
              fullWidth
              disabled
              label='Apellidos '
              value={form_inf_tercero.apellidos ?? ''}
              onChange={
                (e) => set_form_inf_tercero({ ...form_inf_tercero, apellidos: e.target.value })
              }
              size='small'
            />
          </Grid>
        </Grid>

        {data_entradas_relacionadas.length > 0 &&
          <Grid container item xs={12} rowSpacing={4} columnSpacing={1} sx={{
            position: "relative",
            background: "#FAFAFA",
            borderRadius: "15px",
            p: "40px",
            my: "20px",
            boxShadow: "0px 3px 6px #042F4A26",
          }}>
            <Title title="Entradas relacionadas" />
            <TablaEntradasRelacionadas
              data_entradas_relacionadas={data_entradas_relacionadas}
            />
          </Grid>
        }

        <Grid container item xs={12} lg={3}>
          <TextField
            fullWidth
            required
            disabled={accion === 'ver'}
            label='Referencia de salida: '
            size='small'
            value={referencia_salida}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              set_referencia_salida(event.target.value);
            }}
          />
        </Grid>

        <Grid container item xs={12}>
          <TextField
            fullWidth
            required
            disabled={accion === 'ver'}
            label='Concepto: '
            rows={4}
            multiline
            size='small'
            value={concepto}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              set_concepto(event.target.value);
            }}
          />
        </Grid>

        <AnexosOpcionales
          accion={accion}
          form_data={form_data}
          id_baja_activo={null}
          data_anexos_opcionales={data_anexos_opcionales}
          set_data_anexos_opcionales={set_data_anexos_opcionales}
          data_anexos_agregados={data_anexos_agregados}
          set_data_anexos_agregados={set_data_anexos_agregados}
          ordenar_data_anexos={ordenar_data_anexos}
        />

      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default ConfiguracionGeneral;