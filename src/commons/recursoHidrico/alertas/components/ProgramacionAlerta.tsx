/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Divider, Grid, IconButton, Typography } from '@mui/material';
import { Title } from '../../../../components/Title';
import { useAlertaHook } from '../utils/useAlertaHook';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importar la localización en español
import SaveIcon from '@mui/icons-material/Save';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { useContext } from 'react';
import { DataContext } from '../context/contextData';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';

export const ProgramacionAlerta: React.FC = () => {
  const mesesEnEspanol: any = {
    1: 'Enero',
    2: 'Febrero',
    3: 'Marzo',
    4: 'Abril',
    5: 'Mayo',
    6: 'Junio',
    7: 'Julio',
    8: 'Agosto',
    9: 'Septiembre',
    10: 'Octubre',
    11: 'Noviembre',
    12: 'Diciembre',
  };
  const colums_alerta_programada: GridColDef[] = [
    {
      field: 'mes_cumplimiento',
      headerName: 'MES',
      width: 150,
      renderCell: (params) => mesesEnEspanol[params.value] || params.value,
    },
    {
      field: 'dia_cumplimiento',
      headerName: 'DIA',
      width: 150,
    },
    {
      field: 'Action',
      headerName: 'ACCIONES',
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                confirmar_eliminar_fecha_alerta(params.row.id_fecha);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const {
    control_alertas,
    errors_alertas,
    selectedMonth,
    selectedDay,
    daysArray,
    is_loading_alerta,
    setSelectedMonth,
    setSelectedDay,
    confirmar_eliminar_fecha_alerta,
    onSubmit_alertas,
    setValue_alertas,
  } = useAlertaHook();

  const { rows_alerta_programada } = useContext(DataContext);

  const isValidDate = (): boolean => {
    if (selectedDay && selectedMonth !== null) {
      return dayjs(`${selectedMonth + 1}-${selectedDay}`).isValid();
    }
    return false;
  };

  return (
    <form
      onSubmit={(data) => {
        void onSubmit_alertas(data);
      }}
      style={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
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
          <Title title="Programación" />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary">
            <strong>
              Se enviará un recordatorio para realizar el registro de avance de
              proyectos:
            </strong>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body2" color="text.secondary">
            <strong>Selecciona un mes</strong>
          </Typography>
          <Controller
            name="mes_cumplimiento"
            control={control_alertas}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={Array.from({ length: 12 }, (_, i) => ({
                  value: i,
                  label: dayjs().locale('es').month(i).format('MMMM'),
                }))}
                placeholder="Selecciona un mes"
                isClearable
                onChange={(
                  selectedOption: { value: number; label: string } | null
                ) => {
                  if (selectedOption) {
                    const month = selectedOption.value;
                    setSelectedMonth(month);
                    setValue_alertas('mes_cumplimiento', month + 1);
                  } else {
                    setSelectedMonth(null); // Puedes setear a null si es "clearable"
                  }
                }}
                value={
                  selectedMonth !== null
                    ? {
                        value: selectedMonth,
                        label: dayjs()
                          .locale('es')
                          .month(selectedMonth)
                          .format('MMMM'),
                      }
                    : null
                }
              />
            )}
          />
          {errors_alertas.mes_cumplimiento && (
            <Typography variant="caption" color="error">
              Este campo es requerido
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body2" color="text.secondary">
            <strong>Selecciona un día</strong>
          </Typography>
          <Controller
            name="dia_cumplimiento"
            control={control_alertas}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={daysArray.map((day) => ({
                  value: day,
                  label: day.toString(),
                }))}
                placeholder="Selecciona un día"
                isClearable
                isDisabled={!selectedMonth && selectedMonth !== 0}
                onChange={(
                  selectedOption: { value: number; label: string } | null
                ) => {
                  if (selectedOption) {
                    const day = selectedOption.value;
                    setSelectedDay(day); // Aquí deberías actualizar el día seleccionado en lugar del mes
                    setValue_alertas('dia_cumplimiento', day);
                  } else {
                    setSelectedDay(null); // Aquí deberías actualizar el día seleccionado
                  }
                }}
                value={
                  selectedDay !== null
                    ? { value: selectedDay, label: selectedDay.toString() }
                    : null
                } // Añade esta línea
              />
            )}
          />
          {errors_alertas.dia_cumplimiento && (
            <Typography variant="caption" color="error">
              Este campo es requerido
            </Typography>
          )}
        </Grid>
        {rows_alerta_programada.length > 0 && (
          <>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                <strong>Alertas programadas</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DataGrid
                autoHeight
                rows={rows_alerta_programada}
                columns={colums_alerta_programada}
                getRowId={(row) => uuidv4()}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </Grid>
          </>
        )}
        <Grid container item justifyContent="flex-end" spacing={2}>
          <Grid item>
            <LoadingButton
              variant="contained"
              color="success"
              fullWidth
              startIcon={<SaveIcon />}
              type="submit"
              disabled={is_loading_alerta || !isValidDate()}
              loading={is_loading_alerta}
            >
              Guardar
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
