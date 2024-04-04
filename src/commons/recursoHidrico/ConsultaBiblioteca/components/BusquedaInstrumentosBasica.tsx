/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { control_error } from '../../../../helpers';
import { Title } from '../../../../components/Title';
import { v4 as uuidv4 } from 'uuid';
import { DataContext } from '../context/contextData';
import SearchIcon from '@mui/icons-material/Search';
import type { BusquedaBasica } from '../interfaces/interfaces';
import { get_busqueda_basica } from '../request/request';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaInstrumentosBasica: React.FC = (): JSX.Element => {
  const {
    set_id_instrumento,
    nombre_subseccion,
    nombre_seccion,
    id_seccion,
    id_subseccion,
  } = useContext(DataContext);

  const columns: GridColDef[] = [
    {
      field: 'instrumento',
      headerName: 'NOMBRE INSTRUMENTO',
      sortable: true,
      width: 300,
    },
    {
      field: 'cuenca',
      headerName: 'CUENCAS ASOCIADAS',
      sortable: true,
      width: 300,
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
                set_id_instrumento(params.row.id_instrumento);
                //  console.log('')(params.row, 'params.row');
                handle_close();
              }}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  const {
    register,
    setValue: set_value,
    formState: { errors },
  } = useForm();

  const [open_dialog, set_open_dialog] = useState(false);
  const [rows, set_rows] = useState<BusquedaBasica[]>([]);

  const handle_click_open = (): void => {
    set_open_dialog(true);
  };

  const handle_close = (): void => {
    set_open_dialog(false);
  };
  const fetch_busqueda_basica = async (): Promise<void> => {
    try {
      if (id_seccion && id_subseccion) {
        const response = await get_busqueda_basica(id_seccion, id_subseccion);
        if (response.length === 0) {
          control_error(
            'No se encontraron resultados, recuerda que aqui puedes ver los instrumentos que se encuentran en la biblioteca y tengan cuencas asociadas '
          );
        }
        set_rows(response);
      }
    } catch (err: any) {
      // const temp = err as AxiosError;
      // if (temp.response?.status !== 404 && temp.response?.status !== 400) {
      //   control_error(err.response.data.detail);
      // }
      control_error(err.response.data.detail);
    }
  };

  useEffect(() => {
    if (open_dialog) {
      void fetch_busqueda_basica();
    }
  }, [open_dialog, id_seccion, id_subseccion]);

  useEffect(() => {
    if (nombre_subseccion) {
      set_value('nombre_subseccion', nombre_subseccion);
    }
  }, [nombre_subseccion]);

  useEffect(() => {
    if (nombre_seccion) {
      set_value('nombre_seccion', nombre_seccion);
    }
  }, [nombre_seccion]);

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
                        <ButtonGroup
                          style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
                        >
                          {download_xls({ nurseries: rows, columns })}
                          {download_pdf({ nurseries: rows, columns, title: 'Resultados de la búsqueda' })}
                        </ButtonGroup>
                        <DataGrid
                          rows={rows}
                          columns={columns}
                          pageSize={10}
                          rowsPerPageOptions={[10]}
                          getRowId={(row) => uuidv4()}
                        />
                      </>
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handle_close();
            }}
          >
            CERRAR
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
