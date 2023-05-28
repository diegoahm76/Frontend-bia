import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import {
  Button,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Alert,
  Typography,
} from '@mui/material';
import { Title } from '../../../components/Title';
import type {
  HistoricoDatosRestringidos,
} from '../../../interfaces/globalModels';
import { useState } from 'react';
import { control_error } from '../../../helpers';
import { consultar_historico_restringido } from '../request/Request';
import CancelIcon from '@mui/icons-material/Cancel';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  id_persona: number | undefined;
}

const columns: GridColDef[] = [
  {
    field: 'historico_cambio_id_persona',
    headerName: 'ID',
    sortable: true,
    width: 70,
  },
  {
    field: 'nombre_campo_cambiado',
    headerName: 'NOMBRE CAMPO CAMBIADO',
    sortable: true,
    width: 170,
  },
  {
    field: 'valor_campo_cambiado',
    headerName: 'VALOR CAMPO CAMBIADO',
    sortable: true,
    width: 170,
  },
  {
    field: 'ruta_archivo_soporte',
    headerName: 'ARCHIVO',
    sortable: true,
    width: 170,
  },
  {
    field: 'fecha_cambio',
    headerName: 'FECHA DE CAMBIO',
    sortable: true,
    width: 170,
  },
  {
    field: 'justificacion_cambio',
    headerName: 'JUSTIFICACIÓN',
    sortable: true,
    width: 170,
  },
];

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const DialogHistorialDatosRestringidos: React.FC<IProps> = ({
  is_modal_active,
  set_is_modal_active,
  id_persona,
}: IProps) => {
  const [rows, set_rows] = useState<HistoricoDatosRestringidos[]>([]);

  const handle_close = (): void => {
    set_is_modal_active(false);
  };

  const historico = async (): Promise<void> => {
    try {
      const response = await consultar_historico_restringido(
        id_persona ?? 0
      );
      const new_historico = response.map(
        (datos: HistoricoDatosRestringidos) => ({
          id: datos.id,
          historico_cambio_id_persona: datos.historico_cambio_id_persona,
          nombre_campo_cambiado: datos.nombre_campo_cambiado,
          valor_campo_cambiado: datos.valor_campo_cambiado,
          ruta_archivo_soporte: datos.ruta_archivo_soporte,
          fecha_cambio: datos.fecha_cambio,
          justificacion_cambio: datos.justificacion_cambio,
          id_persona: datos.id_persona,
        })
      );
      set_rows(new_historico);
    } catch (err) {
      control_error(err);
    }
  };

  useEffect(() => {
    if (is_modal_active) {
      void historico();
    }
  }, [is_modal_active]);
  return (
    <>
      <Dialog
        open={is_modal_active}
        onClose={handle_close}
        fullWidth
        maxWidth={'lg'}
      >
        <DialogTitle>
          <Title title="HISTORICO DE CAMBIOS" />
        </DialogTitle>
        <Divider />
        <Grid
          container
          spacing={1}
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
            {rows.length > 0 ? (
              <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                getRowId={(row) => row.historico_cambio_id_persona}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            ) : (
              <Grid item xs={12}>
                <Grid container justifyContent="center" textAlign="center">
                  <Alert icon={false} severity="info">
                    <Typography>No se encontraron resultados...</Typography>
                  </Alert>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12}>
            <Stack
              justifyContent="flex-end"
              sx={{ m: '10px 0 20px 0' }}
              direction="row"
              spacing={1}
            >
              <Button
                variant="outlined"
                // eslint-disable-next-line react/jsx-no-undef
                startIcon={<CancelIcon />}
                onClick={() => {
                  handle_close();
                }}
              >
                Cerrar
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};
