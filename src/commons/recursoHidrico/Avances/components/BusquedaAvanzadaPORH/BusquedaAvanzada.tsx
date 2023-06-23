/* eslint-disable @typescript-eslint/no-unused-vars */
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
import type { InfoPorh } from '../../Interfaces/interfaces';
import { useForm } from 'react-hook-form';
import { get_empty_info_porh, search_avanzada } from '../../request/request';
import type { AxiosError } from 'axios';
import type { ResponseServer } from '../../../../../interfaces/globalModels';
import { control_error } from '../../../../../helpers';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { DataContext } from '../../context/contextData';

interface PropsBuscador {
  onResult: (data_porh: InfoPorh) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaAvanzada: React.FC<PropsBuscador> = ({
  onResult,
}: PropsBuscador) => {
  const { set_id_proyecto, set_mode } = useContext(DataContext);

  const columns: GridColDef[] = [
    {
      field: 'id_programa',
      headerName: 'ID PROGRAMA',
      sortable: true,
      width: 170,
    },
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
          <Tooltip title="Seleccionar">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<ChecklistOutlinedIcon />}
              onClick={() => {
                if (params.row !== undefined) {
                  set_info(params.row);
                  set_id_proyecto(params.row.id_proyecto);
                  set_mode('select_proyecto');
                  handle_close();
                  onResult(params.row);
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
    formState: { errors },
    setValue: set_value,
  } = useForm();

  const [is_search, set_is_search] = useState(false);
  const [open_dialog, set_open_dialog] = useState(false);
  const [rows, set_rows] = useState<InfoPorh[]>([]);
  const [info, set_info] = useState<InfoPorh>();
  const [search_text, set_search_text] = useState('');

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

  const handle_input_change = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value;
    set_value('nombre_proyecto', value);
    set_search_text(value);

    const matching_row = rows.find((row) => row.nombre === value);
    if (matching_row != null) {
      set_info(matching_row);
      set_mode('select_proyecto');
      onResult(matching_row);
    } else {
      set_info(undefined);
      onResult(get_empty_info_porh());
    }
  };
  useEffect(() => {
    const search_in_real_time = async (): Promise<void> => {
      if (search_text.length > 0) {
        try {
          set_rows([]);
          const {
            data: { data },
          } = await search_avanzada({
            nombre_proyecto: search_text,
            nombre_programa: '',
            nombre_PORH: '',
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
      } else {
        set_rows([]);
      }
    };
    const delay_search = setTimeout(() => {
      void search_in_real_time();
    }, 300); // Añadir un retraso de 300ms para evitar una búsqueda excesiva mientras se escribe

    return () => {
      clearTimeout(delay_search);
    };
  }, [search_text]);

  return (
    <>
      <Grid
        container
        spacing={2}
        m={2}
        p={2}
        sx={{
          p: '0px',
          m: '0 0 0 0',
          mb: '0px',
        }}
      >
        {' '}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Nombre"
            disabled={false}
            fullWidth
            size="small"
            margin="dense"
            value={info?.nombre}
            onInput={handle_input_change}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handle_click_open}
          >
            Búscar
          </Button>
        </Grid>
      </Grid>
      <Dialog open={open_dialog} onClose={handle_close} fullWidth maxWidth="lg">
        <DialogContent>
          <Title title="Búsqueda avanzada" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void on_submit_advance(e);
            }}
          >
            <Grid container spacing={2} sx={{ mt: '10px', mb: '20px' }}>
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
