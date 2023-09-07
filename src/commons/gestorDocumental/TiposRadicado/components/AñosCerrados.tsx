/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { Title } from '../../../../components/Title';
import { useContext, useEffect } from 'react';
import { DataContext } from '../context/context/context';
import { useRadicadosHook } from '../hooks/useRadicadosHook';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';

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
      field: 'prefijo_consecutivo',
      headerName: 'PREFIJO CONSECUTIVO',
      width: 200,
    },
    {
      field: 'consecutivo_inicial',
      headerName: 'CONSECUTIVO INICIAL',
      width: 200,
    },
    { field: 'cantidad_digitos', headerName: 'CANTIDAD DIGITOS', width: 200 },
  ];

  const rows = [
    {
      id: 1,
      agno_radicado: 2021,
      cod_tipo_radicado: 'TIPO1',
      prefijo_consecutivo: 'PREF1',
      consecutivo_inicial: 1,
      cantidad_digitos: 4,
    },
    {
      id: 2,
      agno_radicado: 2022,
      cod_tipo_radicado: 'TIPO2',
      prefijo_consecutivo: 'PREF2',
      consecutivo_inicial: 10,
      cantidad_digitos: 5,
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
    fetch_data_consecutivo,
    fetch_data_tipos_radicado_selected,
  } = useContext(DataContext);

  const maxDate = dayjs().add(1, 'year').startOf('year');

  useEffect(() => {
    void fetch_data_tipos_radicado_selected();
  }, []);

  console.log(data_watch_radicados, 'data_watch_radicados');
  console.log(
    dayjs(data_watch_radicados?.agno_radicado).format('YYYY') as any,
    'dayjs(data_watch_radicados?.agno_radicado).format(YYYY) as any'
  );

  useEffect(() => {
    if (!data_watch_radicados?.cod_tipo_radicado) return;
    if (
      data_watch_radicados?.agno_radicado === 0 &&
      data_watch_radicados.cod_tipo_radicado === ''
    )
      return;
    void fetch_data_consecutivo(
      data_watch_radicados?.cod_tipo_radicado as any,
      dayjs(data_watch_radicados?.agno_radicado).format('YYYY') as any
    );
  }, [data_watch_radicados]);

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
                      //   set_tipos_radicado(e.target.value);
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
                      onChange={onChange}
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
            {rows.length > 0 && (
              <>
                <Grid item xs={12}>
                  <Title title="Resultados de la búsqueda" />
                  {/* <Typography>Resultados de la búsqueda</Typography> */}
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ width: '100%' }}>
                    <>
                      <DataGrid
                        density="compact"
                        autoHeight
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={(row) => uuidv4()}
                      />
                    </>
                  </Box>
                </Grid>
              </>
            )}
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
