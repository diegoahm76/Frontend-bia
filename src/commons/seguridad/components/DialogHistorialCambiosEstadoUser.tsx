import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Grid,
  Stack,
  IconButton,
  DialogActions,
} from '@mui/material';
import type { HistoricoCambioEstadosUser } from '../interfaces/seguridadModels';
import { useState } from 'react';
import { control_error } from '../../../helpers';
import { user_historico_cambios_estado } from '../request/seguridadRequest';
import CancelIcon from '@mui/icons-material/Cancel';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  id_usuario: number;
}

const columns: GridColDef[] = [
  {
    field: 'id_historico',
    headerName: 'ID',
    sortable: true,
    width: 70,
  },
  {
    field: 'cod_operacion',
    headerName: 'Codigo operación',
    sortable: true,
    width: 170,
  },
  {
    field: 'nombre_operador',
    headerName: 'Nombre operador',
    sortable: true,
    width: 170,
  },
  {
    field: 'id_usuario_afectado',
    headerName: 'Usuario afectado',
    sortable: true,
    width: 170,
  },
  {
    field: 'fecha_operacion',
    headerName: 'Fecha de cambio',
    sortable: true,
    width: 170,
  },
  {
    field: 'justificacion',
    headerName: 'Justificacion',
    sortable: true,
    width: 300,
  },
];

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const DialogHistorialCambiosEstadoUser: React.FC<IProps> = ({
  is_modal_active,
  set_is_modal_active,
  id_usuario,
}: IProps) => {
  const [rows, set_rows] = useState<HistoricoCambioEstadosUser[]>([]);

  const handle_close = (): void => {
    set_is_modal_active(false);
  };

  const historico = async (): Promise<void> => {
    if (id_usuario === null || id_usuario === 0) {
      return;
    }

    try {
      const response = await user_historico_cambios_estado(id_usuario);
      const new_historico = response.data?.map(
        (datos: HistoricoCambioEstadosUser) => ({
          id_historico: datos.id_historico,
          nombre_operador: datos.nombre_operador,
          cod_operacion: datos.cod_operacion,
          fecha_operacion: datos.fecha_operacion,
          justificacion: datos.justificacion,
          id_usuario_afectado: datos.id_usuario_afectado,
          usuario_operador: datos.usuario_operador,
        })
      );

      set_rows(new_historico ?? []);
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
          Historico de cambios de estado
          <IconButton
            aria-label="close"
            onClick={() => {
              set_is_modal_active(false);
            }}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CancelIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Grid container>
            <Grid item xs={12}>
              <DataGrid
                autoHeight
                rows={rows ?? []}
                columns={columns ?? []}
                pageSize={10}
                rowsPerPageOptions={[10]}
                getRowId={(row) => row.id_historico}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Stack
            justifyContent="flex-end"
            sx={{ m: '10px 20px 10px 0' }}
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
        </DialogActions>
      </Dialog>
    </>
  );
};
