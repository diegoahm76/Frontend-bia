/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  MenuItem,
  TextField,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { Title } from '../../../../components/Title';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/context/context';
import { useRadicadosHook } from '../hooks/useRadicadosHook';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import type { IConsecutivos } from '../types/types';
import type { DataPersonas } from '../../../../interfaces/globalModels';
import { consultar_datos_persona } from '../../../seguridad/request/Request';
import { control_error } from '../../../../helpers';
import type { AxiosError } from 'axios';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface IProps {
  open_dialog: boolean;
  set_open_dialog: (value: boolean) => void;
}

export const AñosCerrados: React.FC<IProps> = ({
  open_dialog,
  set_open_dialog,
}: IProps) => {
  const columns: GridColDef[] = [
    { field: 'agno_radicado', headerName: 'AÑO RADICADO', width: 200 },
    {
      field: 'cod_tipo_radicado_legible',
      headerName: 'TIPO RADICADO',
      width: 200,
    },
    {
      field: 'fecha_inicial_config_implementacion',
      headerName: 'FECHA INICIAL CONFIGURACIÓN',
      width: 200,
    },
    {
      field: 'Acciones',
      headerName: 'ACCIONES',
      width: 200,
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={() => {
            set_info_radicado(params.row);
            //  console.log('')(params.row);
          }}
        >
          <Avatar
            sx={{
              width: 24,
              height: 24,
              background: '#fff',
              border: '2px solid',
            }}
            variant="rounded"
          >
            <ChecklistOutlinedIcon
              titleAccess="Seleccionar"
              sx={{
                color: 'primary.main',
                width: '18px',
                height: '18px',
              }}
            />
          </Avatar>
        </IconButton>
      ),
    },
  ];

  const {
    // * useForm
    control_radicados,
    errors_radicados,
    data_watch_radicados,
  } = useRadicadosHook();

  const {
    tipos_radicado_selected,
    rows_radicado,
    fetch_consulta_consecutivo,
    fetch_data_tipos_radicado_selected,
  } = useContext(DataContext);

  const maxDate = dayjs().add(1, 'year').startOf('year');
  const [tipos_radicado, set_tipos_radicado] = useState<string>('');
  const [agno_radicado, set_agno_radicado] = useState<number>(0);
  const [info_radicado, set_info_radicado] = useState<IConsecutivos>();
  const [
    datos_persona_config_implementacion,
    set_datos_persona_config_implementacion,
  ] = useState<DataPersonas>();
  const [
    datos_persona_consecutivo_actual,
    set_datos_persona_consecutivo_actual,
  ] = useState<DataPersonas>();

  const fetch_data_personas = async (): Promise<void> => {
    try {
      const {
        data: { data },
      } = await consultar_datos_persona(
        info_radicado?.id_persona_config_implementacion as number
      );
      if (data) {
        set_datos_persona_config_implementacion(data);
      }

      const response = await consultar_datos_persona(
        info_radicado?.id_persona_consecutivo_actual as number
      );
      if (response.data) {
        set_datos_persona_consecutivo_actual(response.data.data);
      }
    } catch (err: any) {
      control_error(
        err.response.data.datail ||
          'Error al consultar datos de la persona, al parecer no se encuentra quien configuto el consecutivo o quien solicito el ultimo consecutivo'
      );
    }
  };

  useEffect(() => {
    void fetch_data_tipos_radicado_selected();
  }, []);

  useEffect(() => {
    if (!tipos_radicado || !agno_radicado) return;
    void fetch_consulta_consecutivo(agno_radicado, tipos_radicado);
  }, [data_watch_radicados]);

  useEffect(() => {
    if (!info_radicado) return;
    void fetch_data_personas();
  }, [info_radicado]);

  const handle_close = (): void => {
    set_open_dialog(false);
  };
  return (
    <>
      <Dialog open={open_dialog} onClose={handle_close} fullWidth maxWidth="lg">
        <DialogContent>
          <Grid
            container
            spacing={2}
            m={2}
            p={2}
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '20px',
              m: '10px 0 20px 0',
              mb: '20px',
              boxShadow: '0px 3px 6px #042F4A26',
            }}
          >
            <Grid item xs={12}>
              <Title title="Consulta de años cerrados" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="cod_tipo_radicado"
                control={control_radicados}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="Tipo de radicado"
                    select
                    size="small"
                    margin="dense"
                    disabled={false}
                    fullWidth
                    required={true}
                    value={value}
                    onChange={(e) => {
                      onChange(e.target.value);
                      set_tipos_radicado(e.target.value);
                    }}
                    error={!!errors_radicados.cod_tipo_radicado}
                    helperText={
                      errors_radicados.cod_tipo_radicado
                        ? 'Este campo es requerido'
                        : 'Selecciona un tipo de radicado'
                    }
                  >
                    {tipos_radicado_selected.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />{' '}
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="agno_radicado"
                  control={control_radicados}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <DatePicker
                      label="Seleccione año"
                      value={value || null}
                      onChange={(newValue) => {
                        onChange(newValue);
                        const valor = dayjs(newValue).format('YYYY') as any;
                        set_agno_radicado(Number(valor));
                      }}
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          fullWidth
                          size="small"
                          autoComplete="off" // Desactivar el autocompletado
                          error={!!error}
                          helperText={
                            error
                              ? 'Es obligatorio seleccionar una fecha'
                              : 'Seleccione un año'
                          }
                        />
                      )}
                      views={['year']}
                      maxDate={maxDate}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            {rows_radicado.length > 0 && (
              <>
                <Grid item xs={12}>
                  <Title title="Resultados de la búsqueda" />
                  {/* <Typography>Resultados de la búsqueda</Typography> */}
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ width: '100%' }}>
                    <ButtonGroup
                      style={{
                        margin: 7,
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      {download_xls({ nurseries: rows_radicado, columns })}
                      {download_pdf({
                        nurseries: rows_radicado,
                        columns,
                        title: 'Resultados de la búsqueda',
                      })}
                    </ButtonGroup>
                    <>
                      <DataGrid
                        density="compact"
                        autoHeight
                        rows={rows_radicado}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={(row) =>
                          row.id_config_tipo_radicado_agno || uuidv4()
                        }
                      />
                    </>
                  </Box>
                </Grid>
              </>
            )}
            {info_radicado ? (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Año radicado"
                    value={info_radicado.agno_radicado}
                    disabled
                    fullWidth
                    margin="dense"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Tipo de radicado"
                    value={info_radicado.cod_tipo_radicado_legible}
                    disabled
                    fullWidth
                    margin="dense"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Prefijo"
                    value={info_radicado.prefijo_consecutivo}
                    disabled
                    fullWidth
                    margin="dense"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Consecutivo inicial"
                    value={info_radicado.consecutivo_inicial}
                    disabled
                    fullWidth
                    margin="dense"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Cantidad de dígitos"
                    value={info_radicado.cantidad_digitos}
                    disabled
                    fullWidth
                    margin="dense"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Persona que configuró"
                    value={`${
                      datos_persona_config_implementacion?.primer_nombre ?? ''
                    } ${
                      datos_persona_config_implementacion?.segundo_nombre ?? ''
                    } ${
                      datos_persona_config_implementacion?.primer_apellido ?? ''
                    } ${
                      datos_persona_config_implementacion?.segundo_apellido ??
                      ''
                    }`}
                    disabled
                    fullWidth
                    margin="dense"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Fecha inicial configuración"
                    value={info_radicado.fecha_inicial_config_implementacion}
                    disabled
                    fullWidth
                    margin="dense"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Último consecutivo asignado"
                    value={info_radicado.consecutivo_actual}
                    disabled
                    fullWidth
                    margin="dense"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Fecha última asignación"
                    value={info_radicado.fecha_consecutivo_actual}
                    disabled
                    fullWidth
                    margin="dense"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Persona que solicitó último consecutivo"
                    value={`${
                      datos_persona_consecutivo_actual?.primer_nombre ?? ''
                    } ${
                      datos_persona_consecutivo_actual?.segundo_nombre ?? ''
                    } ${
                      datos_persona_consecutivo_actual?.primer_apellido ?? ''
                    } ${
                      datos_persona_consecutivo_actual?.segundo_apellido ?? ''
                    }`}
                    disabled
                    fullWidth
                    margin="dense"
                    size="small"
                  />
                </Grid>
              </>
            ) : null}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={() => {
              handle_close();
              // reset();
            }}
          >
            Cerrar
          </Button>{' '}
        </DialogActions>
      </Dialog>
    </>
  );
};
