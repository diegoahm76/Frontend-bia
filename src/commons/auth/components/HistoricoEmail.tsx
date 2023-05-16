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
  LinearProgress,
  Typography,
} from '@mui/material';
import { Title } from '../../../components/Title';
import type {
  HistoricoEmail,
  InfoPersona,
} from '../../../interfaces/globalModels';
import { useState } from 'react';
import { control_error } from '../../../helpers';
import CancelIcon from '@mui/icons-material/Cancel';
import { consultar_historico_email } from '../../seguridad/request/Request';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  datos_historico: InfoPersona;
}

const columns: GridColDef[] = [
  {
    field: 'id_histo_email',
    headerName: '#',
    sortable: true,
    width: 70,
  },
  {
    field: 'email_notificacion',
    headerName: 'E-MAIL NOTIFICACIÓN',
    sortable: true,
    width: 250,
  },
  {
    field: 'fecha_cambio',
    headerName: 'FECHA DE CAMBIO',
    sortable: true,
    width: 250,
  },
  {
    field: 'nombre_completo',
    headerName: 'NOMBRE',
    sortable: true,
    width: 300,
  },
];
const columns_juridica: GridColDef[] = [
  {
    field: 'id_histo_email',
    headerName: '#',
    sortable: true,
    width: 70,
  },
  {
    field: 'email_notificacion',
    headerName: 'E-MAIL NOTIFICACIÓN',
    sortable: true,
    width: 250,
  },
  {
    field: 'fecha_cambio',
    headerName: 'FECHA DE CAMBIO',
    sortable: true,
    width: 250,
  },
];
// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const DialogHistorialEmail: React.FC<IProps> = ({
  is_modal_active,
  set_is_modal_active,
  datos_historico,
}: IProps) => {
  const [rows, set_rows] = useState<HistoricoEmail[]>([]);

  const handle_close = (): void => {
    set_is_modal_active(false);
  };

  const historico = async (): Promise<void> => {
    try {
      const response = await consultar_historico_email(
        datos_historico.id_persona
      );
      const new_historico = response.map(
        (datos: HistoricoEmail) => ({
          id_histo_email: datos.id_histo_email,
          email_notificacion: datos.email_notificacion,
          fecha_cambio: datos.fecha_cambio,
          id_persona: datos.id_persona,
          nombre_completo: datos.nombre_completo,
        }
        )
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
        maxWidth={'md'}
      >
        <DialogTitle>
          <Title title="HISTORICO DE CAMBIOS E-MAIL" />
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
              <>
                {datos_historico.tipo_persona === 'J' && (
                  <>
                    <DataGrid
                      autoHeight
                      rows={rows}
                      columns={columns_juridica}
                      getRowId={(row) => row.id_histo_email}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                    />
                  </>
                )}
                {datos_historico.tipo_persona === 'N' && (
                  <>
                    <DataGrid
                      autoHeight
                      rows={rows}
                      columns={columns}
                      getRowId={(row) => row.id_historico_direccion}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                    />
                  </>
                )}
              </>
            ) : (
              <Grid item xs={12}>
                <Grid container justifyContent="center" textAlign="center">
                  <Alert icon={false} severity="info">
                    <LinearProgress />
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
