/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Divider, Grid, Typography } from '@mui/material';
import { Title } from '../../../../components/Title';
import { useAlertaHook } from '../utils/useAlertaHook';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importar la localización en español
import SaveIcon from '@mui/icons-material/Save';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { useContext, useEffect } from 'react';
import { DataContext } from '../context/contextData';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';

export const ProgramacionAlerta: React.FC = () => {
  const colums_alerta_programada: GridColDef[] = [
    {
      field: 'mes_cumplimiento',
      headerName: 'MES',
      width: 150,
      hide: true,
    },
    {
      field: 'dia_cumplimiento',
      headerName: 'DIA',
      width: 150,
    },
  ];

  const {
    control_alertas,
    errors_alertas,
    selectedMonth,
    selectedDay,
    daysArray,
    setSelectedMonth,
    setSelectedDay,
  } = useAlertaHook();

  const { rows_alerta_programada } = useContext(DataContext);

  const isValidDate = (): boolean => {
    if (selectedDay && selectedMonth !== null) {
      return dayjs(`${selectedMonth + 1}-${selectedDay}`).isValid();
    }
    return false;
  };

  useEffect(() => {
    console.log(rows_alerta_programada, 'rows_alerta_programada');
  }, [rows_alerta_programada]);

  return (
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
      )}
      <Grid container item justifyContent="flex-end" spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            color="success"
            startIcon={<SaveIcon />}
            onClick={() => {
              if (isValidDate()) {
                // Procede con la adición de la fecha
              }
            }}
            disabled={!isValidDate()}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
