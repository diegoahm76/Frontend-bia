/* eslint-disable @typescript-eslint/naming-convention */
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  ButtonGroup,
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
import { search_avanzada_porh } from '../../Request/request';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { DataContext } from '../../context/contextData';
import type { BusquedaPorhI } from '../../Interfaces/interfaces';
import SearchIcon from '@mui/icons-material/Search';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';

export const BusquedaPorh: React.FC = () => {
  const {
    info_instrumento,
    set_is_general,
    set_is_consulta,
    set_id_instrumento,
    set_info_instrumento,
  } = useContext(DataContext);

  const columns: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'NOMBRE PORH',
      sortable: true,
      width: 400,
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
                  set_is_general(true);
                  set_is_consulta(false);
                  set_id_instrumento(params.row.id_instrumento);
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
  } = useForm();


  const [is_search, set_is_search] = useState(false);
  const [open_dialog, set_open_dialog] = useState(false);
  const [rows, set_rows] = useState<BusquedaPorhI[]>([]);

  const handle_click_open = (): void => {
    set_open_dialog(true);
  };

  const handle_close = (): void => {
    set_open_dialog(false);
  };

  const on_submit_advance = handle_submit(async ({ nombre_PORH }) => {
    set_is_search(true);
    try {
      set_rows([]);
      const {
        data: { data },
      } = await search_avanzada_porh({
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
  });
  useEffect(() => {
    set_is_search(false);
  }, []);

  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          label="Nombre PORH "
          value={info_instrumento?.nombre ?? ''}
          disabled={true}
          fullWidth
          size="small"
          margin="dense"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2} container justifyContent="end">
        <Button    startIcon={<SearchIcon />} variant="contained" color="primary" onClick={handle_click_open}>
          Buscar
        </Button>
      </Grid>
      <Dialog open={open_dialog} onClose={handle_close} fullWidth maxWidth="md">
        <DialogContent>
          <form
            onSubmit={(e) => {
              void on_submit_advance(e);
            }}
          >
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
              //  sx={{ mt: '10px', mb: '20px' }}
            >
              <Title title="Búsqueda PORH" />
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombre PORH"
                  disabled={false}
                  fullWidth
                  size="small"
                  margin="dense"
                  {...register('nombre_PORH')}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2} container justifyContent="end">
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SearchIcon />}
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
                
                  <ButtonGroup
                    style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
                  >
                    {download_xls({ nurseries: rows, columns })}
                    {download_pdf({ nurseries: rows, columns, title: 'Resultados de la búsqueda' })}
                  </ButtonGroup> 
                   </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ height: 400, width: '100%' }}>
                      <>
                        <DataGrid
                          rows={rows}
                          columns={columns}
                          pageSize={10}
                          rowsPerPageOptions={[10]}
                          getRowId={(row) => row.id_instrumento}
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
