/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  useEffect,
  type Dispatch,
  type SetStateAction,
  useContext,
} from 'react';
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
import CancelIcon from '@mui/icons-material/Cancel';
import { Title } from '../../../../../components/Title';
import { DataContext } from '../../context/contextData';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

const columns: GridColDef[] = [
  {
    field: 'nombre',
    headerName: 'NOMBRE ACTIVIDAD',
    sortable: true,
    width: 200,
  },
  {
    field: 'fecha_registro',
    headerName: 'FECHA DE REGISTRO',
    sortable: true,
    width: 170,
  },
  {
    field: 'id_proyecto',
    headerName: 'No PROYECTO',
    sortable: true,
    width: 170,
  },
];

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const DialogActividades: React.FC<IProps> = ({
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
  const { id_proyecto, rows_actividades, fetch_data_actividades } =
    useContext(DataContext);

  const handle_close = (): void => {
    set_is_modal_active(false);
  };

  useEffect(() => {
    if (is_modal_active && id_proyecto) {
      void fetch_data_actividades();
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
          <Title title="ACTIVIDADES DEL PROYECTO" />
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
            {rows_actividades.length > 0 ? (
              <DataGrid
                autoHeight
                rows={rows_actividades}
                columns={columns}
                getRowId={(row) => row.id_proyecto}
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
