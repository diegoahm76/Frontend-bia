import EditIcon from '@mui/icons-material/Edit';
import { Avatar, CircularProgress, Grid, IconButton } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { consultar_parametros_referencia } from '../../requets/Request';
import type { Parametros } from '../interfaces/interfaces';
import { EditarParametosReferenciaDialog } from './EditarParametosReferenciaDialog';
import { control_error } from '../../../../helpers/controlError';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ParametrosReferencia: React.FC = () => {
  const [parametro_referencia, set_data_parametro] = useState<Parametros[]>([]);
  const [editar_parametros_is_active, set_editar_parametros_is_active] =
    useState<boolean>(false);
  const [parametro_editado, set_parametro_editado] = useState(null);

  const columns: GridColDef[] = [
    {
      field: 'id_parametro_referencia',
      headerName: 'No. PARAMETRO',
      width: 90,
    },
    { field: 'nombre_estacion', headerName: 'ESTACIÓN', width: 140 },
    {
      field: 'fecha_modificacion',
      headerName: 'FECHA MODIFICACIÓN',
      width: 140,
    },
    {
      field: 'frecuencia_solicitud_datos',
      headerName: 'FRECUENCIA',
      width: 90,
    },

    {
      field: 'temperatura_ambiente_max',
      headerName: 'TEMPERATURA MAX',
      width: 100,
    },
    {
      field: 'temperatura_ambiente_min',
      headerName: 'TEMPERATURA MIN',
      width: 100,
    },
    { field: 'humedad_ambiente_max', headerName: 'HUMEDAD MAX', width: 100 },
    { field: 'humedad_ambiente_min', headerName: 'HUMEDAD MIN', width: 100 },

    { field: 'presion_barometrica_max', headerName: 'PRESIÓN MAX', width: 100 },
    { field: 'presion_barometrica_min', headerName: 'PRESIÓN MIN', width: 100 },
    {
      field: 'velocidad_viento_max',
      headerName: 'VEL. VIENTO MAX',
      width: 100,
    },
    {
      field: 'velocidad_viento_min',
      headerName: 'VEL. VIENTO MIN',
      width: 100,
    },

    {
      field: 'direccion_viento_max',
      headerName: 'DIR. VIENTO MAX',
      width: 100,
    },
    {
      field: 'direccion_viento_min',
      headerName: 'DIR. VIENTO MIN',
      width: 100,
    },
    { field: 'precipitacion_max', headerName: 'PRECIPITACIÓN MAX', width: 100 },
    { field: 'precipitacion_min', headerName: 'PRECIPITACIÓN MIN', width: 100 },

    { field: 'luminosidad_max', headerName: 'LUMINOSIDAD MAX', width: 100 },
    { field: 'luminosidad_min', headerName: 'LUMINOSIDAD MIN', width: 100 },
    { field: 'nivel_agua_max', headerName: 'NIV. AGUA MAX', width: 100 },
    { field: 'nivel_agua_min', headerName: 'NIV. AGUA MIN', width: 100 },

    { field: 'velocidad_agua_max', headerName: 'VEL. AGUA MAX', width: 140 },
    { field: 'velocidad_agua_min', headerName: 'VEL. AGUA MIN', width: 140 },
    {
      field: 'nombre_persona_modifica',
      headerName: 'PERSONA MÓDIFICA',
      width: 200,
    },

    {
      field: 'acciones',
      headerName: 'ACCIONES',
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton>
            <Avatar
              sx={{
                width: 24,
                height: 24,
                background: '#fff',
                border: '2px solid',
              }}
              variant="rounded"
            >
              <EditIcon
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                onClick={() => {
                  set_parametro_editado(params.row);
                  set_editar_parametros_is_active(!editar_parametros_is_active);
                  console.log(
                    'se enviaron los siguientes parametros',
                    params.row
                  );
                }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];
  const parametros = async (): Promise<void> => {
    try {
      const response = await consultar_parametros_referencia();
      const parametros = response.map((parametro: Parametros) => ({
        id_parametro_referencia: parametro.id_parametro_referencia,
        nombre_estacion: parametro.nombre_estacion,
        fecha_modificacion: parametro.fecha_modificacion,
        frecuencia_solicitud_datos: parametro.frecuencia_solicitud_datos,
        temperatura_ambiente_max: parametro.temperatura_ambiente_max,
        temperatura_ambiente_min: parametro.temperatura_ambiente_min,
        humedad_ambiente_max: parametro.humedad_ambiente_max,
        humedad_ambiente_min: parametro.humedad_ambiente_min,
        presion_barometrica_max: parametro.presion_barometrica_max,
        presion_barometrica_min: parametro.presion_barometrica_min,
        velocidad_viento_max: parametro.velocidad_viento_max,
        velocidad_viento_min: parametro.velocidad_viento_min,
        direccion_viento_max: parametro.direccion_viento_max,
        direccion_viento_min: parametro.direccion_viento_min,
        precipitacion_max: parametro.precipitacion_max,
        precipitacion_min: parametro.precipitacion_min,
        luminosidad_max: parametro.luminosidad_max,
        luminosidad_min: parametro.luminosidad_min,
        nivel_agua_max: parametro.nivel_agua_max,
        nivel_agua_min: parametro.nivel_agua_min,
        velocidad_agua_max: parametro.velocidad_agua_max,
        velocidad_agua_min: parametro.velocidad_agua_min,
        nombre_persona_modifica: parametro.nombre_persona_modifica,
      }));

      set_data_parametro(parametros);
    } catch (err) {
      control_error(err);
    }
  };
  useEffect(() => {
    void parametros();
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={12} container justifyContent="center">
          {parametro_referencia.length > 0 ? (
            <DataGrid
              autoHeight
              rows={parametro_referencia}
              columns={columns}
              getRowId={(row) => row.id_parametro_referencia}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          ) : (
            <CircularProgress color="secondary" />
          )}
        </Grid>
        <EditarParametosReferenciaDialog
          is_modal_active={editar_parametros_is_active}
          set_is_modal_active={set_editar_parametros_is_active}
          parametro_editado={parametro_editado}
          set_parametro_editado={set_parametro_editado}
          parametros={parametros}
        />
      </Grid>
    </>
  );
};
