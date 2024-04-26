/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  TextField,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
// import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuidv4 } from 'uuid';

import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
// import {
//   set_current_mode_planes,
//   set_current_objetivo,
//   set_current_programa,
// } from '../../../../store/slice/indexPlanes';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { useAppDispatch } from '../../../../hooks';
import { DataContextAccionesCorrectivas } from '../context/context';
import { set_current_mode_planes, set_current_tramite } from '../../../seguimirntoPlanes/store/slice/indexPlanes';
import { control_error } from '../../../../helpers';
import { Title } from '../../../../components/Title';
import { form_values } from '../../../seguridad/screens/AuditoriaScreen/types/types';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { get_busqueda_tramites } from '../services/services';

interface form_values {
  numero_expediente: string;
  numero_radicado: string;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaTramiteExpediente: React.FC = () => {
  const columns: GridColDef[] = [
    {
      field: 'nombre_proyecto',
      headerName: 'NOMBRE DEL TRAMITE',
      sortable: true,
      minWidth: 300,
      flex:2
    },
    {
      field: 'tipo_tramite',
      headerName: 'TIPO TRAMITE',
      sortable: true,
      minWidth: 250,
      flex:1
    },
    {
      field: 'numero_auto_inicio',
      headerName: 'NÚMERO AUTO INICIO',
      sortable: true,
      minWidth: 250,
      flex:1,
      valueGetter: (params) => params.row.numero_auto_inicio ?? 'Sin datos',
    },
    {
      field: 'numero_expediente',
      headerName: 'NÚMERO EXPEDIENTE',
      sortable: true,
      minWidth: 250,
      flex:1
    },
    {
      field: 'acciones',
      headerName: 'ACCIONES',
      sortable: true,
      minWidth: 120,
      flex:1,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              // set_id_plan(params.row.id_plan);
              set_is_proyecto(false)
              set_id_expediente(params.row.id_expediente);
              set_id_tramite(params.row.id_solicitud_tramite);
              dispatch(
                set_current_mode_planes({
                  ver: true,
                  crear: false,
                  editar: false,
                })
              );
              dispatch(set_current_tramite(params.row));
              set_form_values({
                numero_expediente: params.row.numero_expediente,
                numero_radicado: params.row.radicado,
              });
              handle_close();
            }}
          >
            <Avatar
              sx={{
                width: 24,
                height: 24,
                background: '#fff',
                border: '2px solid',
              }}
              variant="rounded"
            >
              <ChecklistOutlinedIcon
                titleAccess="Editar objetivo"
                sx={{
                  color: 'primary.main',
                  width: '18px',
                  height: '18px',
                }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];

  const [form_values, set_form_values] = useState<form_values>({
    numero_expediente: '',
    numero_radicado: '',
  })
  const [is_search, set_is_search] = useState(false);
  const [open_dialog, set_open_dialog] = useState(false);
  const [rows, set_rows] = useState<any[]>([]);
  const [page, set_page] = useState(1);
  const [count, set_count] = useState(0);


  const handle_click_open = (): void => {
    set_open_dialog(true);
  };

  const handle_close = (): void => {
    set_open_dialog(false);
  };

  const handle_numero_change = (event: any): void => {
    set_form_values({
      ...form_values,
      numero_expediente: event.target.value,
    });
  };

  const clean_form_search = (): void => {
    set_form_values({
      numero_expediente: '',
      numero_radicado: '',
    });
    set_rows([]);
    set_page(1);
  }

  const dispatch = useAppDispatch();
  const { is_expediente, is_proyecto, set_is_expediente, set_is_proyecto, set_id_expediente, set_id_tramite } =
  useContext(DataContextAccionesCorrectivas);

  const onsubmit_search =  async () => {
    try {
      set_is_search(true);
      set_is_expediente(true)
      set_rows([]);
      const data = await get_busqueda_tramites(page, '', form_values.numero_expediente);
      set_count(data.count);
      if (data.results.data.length) {
        set_rows(data.results.data);
      }
    } catch (error: any) {
      control_error(error.response?.data.detail ?? 'Error en la búsqueda');
    } finally {
      set_is_search(false);
    }
  };


  useEffect(() => {
    if(is_expediente && !is_proyecto){
      onsubmit_search();
    }
  }, [page, is_expediente]);

  useEffect(() => {
    if(!is_expediente) clean_form_search();
  }, [is_expediente]);

  return (
    <>
      <Grid
        container
        spacing={2}
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
          <Title title="Busqueda de Trámite por Expediente" />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Número de Expediente"
            value={form_values.numero_expediente}
            onChange={handle_numero_change}
            size="small"
            margin="dense"
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Número de Radicado"
            value={form_values.numero_radicado}
            onChange={handle_numero_change}
            size="small"
            margin="dense"
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
            onClick={() => {
              handle_click_open();
            }}
          >
            Buscar
          </Button>
        </Grid>
      </Grid>
      <Dialog open={open_dialog} onClose={handle_close} fullWidth maxWidth="lg">
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
            <Title title="Búsqueda avanzada de Trámites por Proyecto" />
            <Grid container spacing={2} sx={{ mt: '10px', mb: '20px' }}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Número de Expediente"
                  value={form_values.numero_expediente}
                  onChange={handle_numero_change}
                  size="small"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Número de Radicado"
                  value={form_values.numero_radicado}
                  onChange={handle_numero_change}
                  size="small"
                  margin="dense"
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} sm={6} md sx={{display: 'flex', gap: '1rem'}}>
                <LoadingButton
                  size="medium"
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SearchIcon />}
                  loading={is_search}
                  disabled={is_search}
                  onClick={() => {
                    onsubmit_search();
                  }}
                >
                  Buscar
                </LoadingButton>
                <Button
                  size="medium"
                  color="inherit"
                  variant="outlined"
                  startIcon={<CleanIcon />}
                  onClick={clean_form_search}
                >
                  Limpiar
                </Button>
              </Grid>
              {rows.length > 0 && (
                <>
                  <Grid item xs={12}>
                    <Title title="Resultados de la búsqueda" />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ width: '100%' }}>
                      <ButtonGroup
                        style={{
                          margin: 7,
                          display: 'flex',
                          justifyContent: 'flex-end',
                        }}
                      >
                        {download_xls({ nurseries: rows, columns })}
                        {download_pdf({
                          nurseries: rows,
                          columns,
                          title: 'Resultados de la búsqueda',
                        })}
                      </ButtonGroup>
                      <DataGrid
                        // density="compact"
                        autoHeight
                        rows={rows}
                        pagination
                        page={page - 1}
                        columns={columns}
                        getRowId={(row) => row.id_solicitud_tramite}
                        rowCount={count}
                        pageSize={10}
                        paginationMode="server"
                        rowsPerPageOptions={[10]}
                        onPageChange={async (newPage: number) => {
                          set_page(newPage + 1);
                        }}
                        getRowHeight={() => 'auto'}
                      />
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
            {/* </form> */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={() => {
              handle_close();
              // reset();
            }}
          >
            Cerrar
          </Button>{' '}
        </DialogActions>
      </Dialog>
    </>
  );
};
