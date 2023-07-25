import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Title } from '../../../../../components/Title';
import { useForm } from 'react-hook-form';
import type { AxiosError } from 'axios';
import type { ResponseServer } from '../../../../../interfaces/globalModels';
import { control_error } from '../../../../../helpers';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { InfoPorh } from '../../Interfaces/interfaces';
import { search_avanzada } from '../../Request/request';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { DataContext } from '../../context/contextData';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaAvanzada: React.FC = () => {
  const {
    set_info_programa,
    set_is_general,
    set_is_consulta,
    set_id_programa,
    set_id_proyecto,
    set_mode,
  } = useContext(DataContext);

  const columns: GridColDef[] = [
    {
      field: 'nombre_PORH',
      headerName: 'NOMBRE PORH',
      sortable: true,
      width: 170,
    },
    {
      field: 'nombre_programa',
      headerName: 'NOMBRE PROGRAMA',
      sortable: true,
      width: 170,
    },
    {
      field: 'nombre',
      headerName: 'NOMBRE PROYECTO',
      sortable: true,
      width: 170,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 80,
      renderCell: (params) => (
        <>
          <Tooltip title="Ver detalle">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<ChecklistOutlinedIcon />}
              onClick={() => {
                if (params.row !== undefined) {
                  set_info_programa(params.row);
                  set_id_programa(params.row.id_programa);
                  set_id_proyecto(params.row.id_proyecto);
                  set_is_general(false);
                  set_is_consulta(true);
                  handle_close();
                }
              }}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  const {
    register,
    handleSubmit: handle_submit,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
  } = useForm();

  const [is_search, set_is_search] = useState(false);
  const [open_dialog, set_open_dialog] = useState(false);
  const [rows, set_rows] = useState<InfoPorh[]>([]);

  const handle_click_open = (): void => {
    set_open_dialog(true);
  };

  const handle_close = (): void => {
    set_open_dialog(false);
  };

  const on_submit_advance = handle_submit(
    async ({ nombre_proyecto, nombre_programa, nombre_PORH }) => {
      set_is_search(true);
      try {
        set_rows([]);
        const {
          data: { data },
        } = await search_avanzada({
          nombre_proyecto,
          nombre_programa,
          nombre_PORH,
        });

        if (data?.length > 0) {
          set_rows(data);
        }
      } catch (error) {
        const temp_error = error as AxiosError;
        const resp = temp_error.response?.data as ResponseServer<any>;
        control_error(resp.detail);
      } finally {
        set_is_search(false);
      }
    }
  );
  useEffect(() => {
    set_is_search(false);
  }, []);

  return (
    <>
      <Grid item>
        <Button variant="outlined" color="primary" onClick={() => {
          handle_click_open();
          set_mode('set_is_general');
          }}>
          Buscar
        </Button>
      </Grid>
      <Dialog open={open_dialog} onClose={handle_close} fullWidth maxWidth="lg">
        <DialogContent>
         
          <form
            onSubmit={(e) => {
              void on_submit_advance(e);
            }}
          >
            <Grid container spacing={2}
             sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '20px', mb: '20px',
              boxShadow: '0px 3px 6px #042F4A26',
              marginTop: '20px',
              marginLeft: '-5px',
          }}
            //  sx={{ mt: '10px', mb: '20px' }}
             >
               <Title title="Búsqueda avanzada" />
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Nombre PORH"
                  disabled={false}
                  fullWidth
                  size="small"
                  margin="dense"
                  {...register('nombre_PORH')}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Nombre proyecto"
                  disabled={false}
                  fullWidth
                  size="small"
                  margin="dense"
                  {...register('nombre_proyecto')}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Nombre Programa"
                  disabled={false}
                  fullWidth
                  size="small"
                  margin="dense"
                  {...register('nombre_programa')}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2} container justifyContent="end">
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  loading={is_search}
                  disabled={is_search}
                >
                  Buscar
                </LoadingButton>
              </Grid>
              {rows.length > 0 && (
                <>
                  <Grid item xs={12}>
                    <Typography>Resultados de la búsqueda</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ height: 400, width: '100%' }}>
                      <>
                        <DataGrid
                          rows={rows}
                          columns={columns}
                          pageSize={5}
                          rowsPerPageOptions={[5]}
                          getRowId={(row) => row.id_programa}
                        />
                      </>
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
