/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  useEffect,
  type Dispatch,
  type SetStateAction,
  useContext,
  useState,
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
  ButtonGroup,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { Title } from '../../../../../components/Title';
import { DataContext } from '../../context/contextData';
import '../../css/styles.css';
import type { Evidencia } from '../../Interfaces/interfaces';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

const columns: GridColDef[] = [
  {
    field: 'nombre_archivo',
    headerName: 'NOMBRE ARCHIVO',
    sortable: true,
    width: 400,
  },
];

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const DialogEvidencias: React.FC<IProps> = ({
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
  const { info_avance } = useContext(DataContext);

  const [rows_evidencia, set_rows_evidencia] = useState<Evidencia[]>([]);

  useEffect(() => {
    set_rows_evidencia(info_avance?.evidencias ?? []);
  }, [info_avance]);

  const handle_close = (): void => {
    set_is_modal_active(false);
  };

  return (
    <>
      <Dialog
        open={is_modal_active}
        onClose={handle_close}
        fullWidth
        maxWidth={'sm'}
      >
        <DialogTitle>
          <Title title="Listado de evidencias" />
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
            {rows_evidencia.length > 0 ? (
              <><ButtonGroup
                style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
              >
                {download_xls({ nurseries: rows_evidencia, columns })}
                {download_pdf({ nurseries: rows_evidencia, columns, title: 'Resultados' })}
              </ButtonGroup><DataGrid
                  autoHeight
                  rows={rows_evidencia}
                  columns={columns}
                  getRowId={(row) => row.id_evidencia_avance}
                  pageSize={10}
                  rowsPerPageOptions={[10]} /></>
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
