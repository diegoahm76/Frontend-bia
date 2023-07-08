/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  Stack,
  TextField,
  Tooltip,
  //   Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { AxiosError } from 'axios';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { type ResponseServer } from '../../../../interfaces/globalModels';
import { control_error } from '../../../../helpers';
import { Title } from '../../../../components/Title';
import { v4 as uuidv4 } from 'uuid';
import { DataContext } from '../context/contextData';
import { search_instrumento } from '../request/request';
import SearchIcon from '@mui/icons-material/Search';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaInstrumentosBasica: React.FC = (): JSX.Element => {
  const {
    set_info_instrumento,
    set_id_instrumento,
    info_subseccion,
    info_seccion,
  } = useContext(DataContext);

  const columns: GridColDef[] = [
    {
      field: 'nombre_instrumento',
      headerName: 'NOMBRE INSTRUMENTO',
      sortable: true,
      width: 170,
    },
    {
      field: 'cuencas',
      headerName: 'CUENCAS ASOCIADAS',
      sortable: true,
      width: 170,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 80,
      renderCell: (params) => (
        <>
          <Tooltip title="Seleccionar">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<ChecklistOutlinedIcon />}
              onClick={() => {
                if (params.row !== undefined) {
                  set_id_instrumento(params.row.id_instumento);
                  set_info_instrumento(params.row);
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
    setValue: set_value,
    formState: { errors },
  } = useForm();

  const [is_search, set_is_search] = useState(false);
  const [open_dialog, set_open_dialog] = useState(false);
  const [rows, set_rows] = useState<any[]>([]);

  const handle_click_open = (): void => {
    set_open_dialog(true);
  };

  const handle_close = (): void => {
    set_open_dialog(false);
  };

  const on_submit_advance = handle_submit(
    async ({ nombre_seccion, nombre_subseccion }) => {
      set_is_search(true);
      try {
        set_rows([]);
        const {
          data: { data },
        } = await search_instrumento({
          nombre_seccion,
          nombre_subseccion,
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
    if (open_dialog) {
      void on_submit_advance();
    }
  }, [open_dialog]);

  useEffect(() => {
    set_is_search(false);
  }, []);

  useEffect(() => {
    if (info_subseccion) {
      console.log(info_subseccion, 'info_subseccion');
      set_value('nombre_subseccion', info_subseccion.nombre);
    }
  }, [info_subseccion]);

  useEffect(() => {
    if (info_seccion) {
      console.log(info_seccion, 'info_seccion');
      set_value('nombre_seccion', info_seccion.nombre);
    }
  }, [info_seccion]);

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="flex-end"
        sx={{ mt: '10px' }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          onClick={() => {
            handle_click_open();
          }}
        >
          VER INSTRUMENTOS
        </Button>
      </Stack>
      <Dialog open={open_dialog} onClose={handle_close} fullWidth maxWidth="md">
        <DialogContent>
          <Grid
            container
            spacing={2}
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '20px',
              mb: '20px',
              boxShadow: '0px 3px 6px #042F4A26',
              marginTop: '20px',
              marginLeft: '-5px',
            }}
          >
            <Title title="Instrumentos biblioteca" />
            <form
              onSubmit={(e) => {
                void on_submit_advance(e);
              }}
            >
              <Grid container spacing={2} sx={{ mt: '10px', mb: '20px' }}>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    label="Nombre sección"
                    fullWidth
                    disabled={true}
                    size="small"
                    margin="dense"
                    {...register('nombre_seccion')}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    label="Nombre subsección"
                    disabled={true}
                    fullWidth
                    size="small"
                    margin="dense"
                    {...register('nombre_subseccion')}
                  />
                </Grid>
                {rows.length > 0 && (
                  <>
                    <Grid item xs={12}>
                      <Title title="Resultados de la búsqueda" />
                      {/* <Typography>Resultados de la búsqueda</Typography> */}
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ height: 400, width: '100%' }}>
                        <>
                          <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            getRowId={(row) => uuidv4()}
                          />
                        </>
                      </Box>
                    </Grid>
                  </>
                )}
              </Grid>
            </form>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};
