import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { v4 as uuidv4 } from 'uuid';

import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import {
  set_current_meta_pgar,
  set_current_mode_planes,
  set_current_planes,
} from '../../store/slice/indexPlanes';
import { useAppDispatch } from '../../../../hooks';
import { control_error } from '../../../../helpers';
import { Title } from '../../../../components/Title';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { DataContextPgar } from '../../SeguimientoPGAR/context/context';
import { search_meta } from '../../SeguimientoPGAR/services/services';
import { IBusquedaMetas } from '../../SeguimientoPGAR/utils/types';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaMetasPgar: React.FC = () => {

    const columns: GridColDef[] = [
      {
        field: 'nombre_eje_estrategico',
        headerName: 'NOMBRE DEL EJE ESTRATÉGICO',
        sortable: true,
        minWidth: 250,
        flex: 1,
      },
      {
        field: 'tipo_eje_estrategico',
        headerName: 'TIPO EJE ESTRATÉGICO',
        sortable: true,
        minWidth: 250,
        flex: 1,
      },
      {
        field: 'nombre_meta_eje',
        headerName: 'NOMBRE META',
        sortable: true,
        minWidth: 250,
        flex: 1
      },
      {
        field: 'numero_meta_eje',
        headerName: 'NÚMERO META',
        sortable: true,
        minWidth: 150,
        flex: 1
      },
      {
        field: 'cumplio',
        headerName: '¿CUMPLIÓ?',
        sortable: true,
        minWidth: 120,
        flex: 1,
        renderCell: (params) => (params.value ? 'Sí' : 'No'),
      },
      {
        field: 'fecha_creacion',
        headerName: 'FECHA DE CREACIÓN',
        sortable: true,
        minWidth: 160,
        flex: 1
      },
      {
        field: 'ACCIONES',
        headerName: 'ACCIONES',
        minWidth: 100,
        flex: 1,
        renderCell: (params) => (
          <>
            <IconButton
              size="small"
              onClick={() => {
                set_id_meta_eje(params.row.id_meta_eje);
                set_id_eje_estrategico(params.row.id_eje_estrategico);
                set_id_plan(params.row.id_plan);
                set_id_objetivo(params.row.id_objetivo);
                dispatch(
                  set_current_mode_planes({
                    ver: true,
                    crear: false,
                    editar: false,
                  })
                );
                dispatch(set_current_meta_pgar(params.row));
                reset({
                  nombre_eje_estrategico: params.row.nombre_eje_estrategico,
                  nombre_meta_eje: params.row.nombre_meta_eje,
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
                  titleAccess="Editar plan"
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

    const {
      reset,
      handleSubmit: handle_submit,
      control,
      watch,
      formState: { errors },
    } = useForm({
      defaultValues: {
          nombre_meta_eje: '',
          nombre_eje_estrategico: '',
      },
    });

    const [is_search, set_is_search] = useState(false);
    const [open_dialog, set_open_dialog] = useState(false);
    const [rows, set_rows] = useState<IBusquedaMetas[]>([]);

    const handle_click_open = (): void => {
      set_open_dialog(true);
    };

    const handle_close = (): void => {
      set_open_dialog(false);
    };

    const clean_form_advance_search = () => {
      reset({
        nombre_meta_eje: '',
        nombre_eje_estrategico: '',
      });
    }

    const dispatch = useAppDispatch();

    const on_submit_advance = handle_submit(async ({ nombre_meta_eje, nombre_eje_estrategico }) => {
      set_is_search(true);
      try {
        set_rows([]);
        console.log(nombre_eje_estrategico, nombre_meta_eje)
        const {
          data: { data },
        } = await search_meta({
          nombre_eje_estrategico,
          nombre_meta_eje,
        });

        if (data?.length > 0) {
          set_rows(data);
        }
      } catch (error: any) {
        control_error(error.response?.data.detail ?? 'Error en la búsqueda');
      } finally {
        set_is_search(false);
      }
    });

      const {
        set_id_meta_eje,
        set_id_eje_estrategico,
        set_id_plan,
        set_id_objetivo
      } = useContext(DataContextPgar);

    useEffect(() => {
      clean_form_advance_search();
      set_is_search(false);
    }, []);

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
            <Title title="Búsqueda de Metas PGAR" />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="nombre_eje_estrategico"
              control={control}
              render={(
                { field: { onChange, value } } // formState: { errors }
              ) => (
                <TextField
                  fullWidth
                  label="Nombre eje estratégico"
                  value={value}
                  onChange={onChange}
                  size="small"
                  margin="dense"
                  disabled={true}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="nombre_meta_eje"
              control={control}
              render={(
                { field: { onChange, value } } // formState: { errors }
              ) => (
                <TextField
                  fullWidth
                  label="Nombre meta"
                  value={value}
                  onChange={onChange}
                  size="small"
                  margin="dense"
                  disabled={true}
                />
              )}
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
              <Title title="Búsqueda avanzada metas PGAR" />
              <Grid container spacing={2} sx={{ mt: '10px', mb: '20px' }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Controller
                    name="nombre_eje_estrategico"
                    control={control}
                    render={(
                        { field: { onChange, value } } // formState: { errors }
                    ) => (
                        <TextField
                        fullWidth
                        label="Nombre eje estratégico"
                        value={value}
                        onChange={onChange}
                        size="small"
                        margin="dense"
                        />
                    )}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Controller
                    name="nombre_meta_eje"
                    control={control}
                    render={(
                        { field: { onChange, value } } // formState: { errors }
                    ) => (
                        <TextField
                        fullWidth
                        label="Nombre meta"
                        value={value}
                        onChange={onChange}
                        size="small"
                        margin="dense"
                        />
                    )}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md sx={{display: 'flex', gap: '1rem'}}>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<SearchIcon />}
                    loading={is_search}
                    disabled={is_search}
                    onClick={(e) => {
                      void on_submit_advance(e);
                    }}
                  >
                    Buscar
                  </LoadingButton>
                  <Button
                    size="medium"
                    color="inherit"
                    variant="outlined"
                    startIcon={<CleanIcon />}
                    onClick={clean_form_advance_search}
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
                          density="compact"
                          autoHeight
                          rows={rows ?? []}
                          columns={columns ?? []}
                          pageSize={10}
                          rowsPerPageOptions={[10]}
                          getRowId={(row) => uuidv4()}
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