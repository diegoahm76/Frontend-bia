/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  DataGrid,
  GridValueFormatterParams,
  type GridColDef,
} from '@mui/x-data-grid';
// import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuidv4 } from 'uuid';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from '../../../../../../hooks';
import { control_error } from '../../../../../../helpers';
import { Title } from '../../../../../../components/Title';
import { download_xls } from '../../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../../documentos-descargar/PDF_descargar';
import { set_current_mode_planes } from '../../../../store/slice/indexPlanes';
import { search_concepto_poai } from '../../../../DetalleInversionCuentas/services/services';
import { IBusquedaConceptoPOAI } from '../../../../ConceptoPOAI/components/Components/BusquedaAvanzada/types';
import { DataContextFuentesFinanciacion } from '../../../context/context';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { api } from '../../../../../../api/axios';
export interface Planes {
  id_plan: number;
  nombre_plan: string;
  sigla_plan: string;
  tipo_plan: string;
  agno_inicio: number;
  agno_fin: number;
  estado_vigencia: boolean;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaConcepto: React.FC = () => {
  // const { id_deposito, sucusal_selected } = useContext(DataContext);

  const columns: GridColDef[] = [
    {
      field: 'nombre_indicador',
      headerName: 'Nombre del Indicador',
      sortable: true,
      minWidth: 350,
      flex: 2
    },
    {
      field: 'nombre',
      headerName: 'Nombre grupo',
      sortable: true,
      minWidth: 200,
      flex: 1
    },
    {
      field: 'rubro',
      headerName: 'Rubro',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'concepto',
      headerName: 'Concepto',
      sortable: true,
      minWidth: 200,
      flex: 1
    },
    {
      field: 'valor_total',
      headerName: 'Valor total',
      sortable: true,
      minWidth: 300,
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams) => {
        const inversion = Number(params.value); // Convertir a número
        const formattedInversion = inversion.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        });

        return formattedInversion;
      },
    },
    {
      field: 'acciones',
      headerName: 'ACCIONES',
      sortable: true,
      minWidth: 120,
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              set_id_concepto(params.row.id_concepto);
              dispatch(
                set_current_mode_planes({
                  ver: true,
                  crear: false,
                  editar: false,
                })
              );
              reset({
                concepto: params.row.concepto,
                nombre: params.row.nombre,
                nombre_indicador: params.row.nombre_indicador,
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
                titleAccess="Seleccionar concepto"
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
  } = useForm({
    defaultValues: {
      concepto: '',
      nombre: '',
      nombre_indicador: '',
    },
  });

  const [is_search, set_is_search] = useState(false);
  const [open_dialog, set_open_dialog] = useState(false);
  const [rows, set_rows] = useState<IBusquedaConceptoPOAI[]>([]);

  const handle_click_open = (): void => {
    set_open_dialog(true);
  };

  const handle_close = (): void => {
    // reset();
    set_open_dialog(false);
  };

  const dispatch = useAppDispatch();

  const on_submit_advance = handle_submit(
    async ({ concepto, nombre, nombre_indicador }) => {
      set_is_search(true);
      try {
        set_rows([]);
        const {
          data: { data },
        } = await search_concepto_poai({
          concepto,
          nombre,
          nombre_indicador,
        });

        if (data?.length > 0) {
          set_rows(data);
        }
      } catch (error: any) {
        // const temp_error = error as AxiosError;
        // const resp = temp_error.response?.data as ResponseServer<any>;
        control_error(error.response?.data.detail ?? 'Error en la búsqueda');
      } finally {
        set_is_search(false);
      }
    }
  );

  const { set_id_concepto } = useContext(DataContextFuentesFinanciacion);

  useEffect(() => {
    reset();
    set_rows([]);
    set_is_search(false);
  }, []);



  const [planes, setPlanes] = useState<Planes[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null); // Estado para almacenar el ID del plan seleccionado
  const handlePlanChange = (event: any) => {
    const selectedPlan = planes.find(
      (plan) => plan.nombre_plan === event.target.value
    );
    if (selectedPlan) {
      setSelectedPlanId(selectedPlan.id_plan);
    }
  };
  const fetplames = async () => {
    try {
      const url = 'seguimiento/planes/consultar-planes/';
      const res = await api.get(url);
      const unidadesData = res.data.data;
      setPlanes(unidadesData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetplames();
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
          <Title title="Concepto POAI" />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6}  >
                <Controller
                  name="concepto"
                  control={control}
                  disabled
                  render={(
                    { field: { onChange, value } } // formState: { errors }
                  ) => (
                    <Controller
                    name="concepto"
                    control={control}
                    
                    render={(
                      { field: { onChange, value } } // formState: { errors }
                    ) => (
                      <FormControl fullWidth size="small">
                        <InputLabel id="si-no-select-label">
                          {' '}
                          Nombre de plan
                        </InputLabel>
                        <Select
                          name="nombre_plan"
                          label=" Nombre de plan"
                          value={value}
                          // onChange={onChange}
                          onChange={(event) => {
                            onChange(event);
                            handlePlanChange(event);
                          }}
                        >
                          {planes.map((unidad: any) => (
                            <MenuItem
                              key={unidad.id_plan}
                              value={unidad.nombre_plan}
                            >
                              {unidad.nombre_plan}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                  )}
                />
              </Grid>
        {/* <Grid item xs={12} sm={6} md={3}>
          <Controller
            name="nombre"
            control={control}
            render={(
              { field: { onChange, value } } // formState: { errors }
            ) => (
              <TextField
                fullWidth
                label="Nombre grupo"
                value={value}
                onChange={onChange}
                size="small"
                margin="dense"
                disabled={true}
              />
            )}
          />
        </Grid> */}
        {/* <Grid item xs={12} sm={6} md={3}>
          <Controller
            name="nombre_indicador"
            control={control}
            render={(
              { field: { onChange, value } } // formState: { errors }
            ) => (
              <TextField
                fullWidth
                label="Nombre indicador"
                value={value}
                onChange={onChange}
                size="small"
                margin="dense"
                disabled={true}
              />
            )}
          />
        </Grid> */}
        <Grid item xs={12} sm={6} >
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
            <Title title="Búsqueda avanzada concepto POAI" />
            <Grid container spacing={2} sx={{ mt: '10px', mb: '20px' }}>
              <Grid item xs={12} sm={6}  >
                <Controller
                  name="concepto"
                  control={control}
                  render={(
                    { field: { onChange, value } } // formState: { errors }
                  ) => (
                    <Controller
                    name="concepto"
                    control={control}
                    render={(
                      { field: { onChange, value } } // formState: { errors }
                    ) => (
                      <FormControl fullWidth size="small">
                        <InputLabel id="si-no-select-label">
                          {' '}
                          Nombre de plan
                        </InputLabel>
                        <Select
                          name="nombre_plan"
                          label=" Nombre de plan"
                          value={value}
                          // onChange={onChange}
                          onChange={(event) => {
                            onChange(event);
                            handlePlanChange(event);
                          }}
                        >
                          {planes.map((unidad: any) => (
                            <MenuItem
                              key={unidad.id_plan}
                              value={unidad.nombre_plan}
                            >
                              {unidad.nombre_plan}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                  )}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="nombre"
                  control={control}
                  render={(
                    { field: { onChange, value } } // formState: { errors }
                  ) => (
                    <TextField
                      fullWidth
                      label="Nombre grupo"
                      value={value}
                      onChange={onChange}
                      size="small"
                      margin="dense"
                      disabled={false}
                    />
                  )}
                />
              </Grid> */}
              {/* <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="nombre_indicador"
                  control={control}
                  render={(
                    { field: { onChange, value } } // formState: { errors }
                  ) => (
                    <TextField
                      fullWidth
                      label="Nombre indicador"
                      value={value}
                      onChange={onChange}
                      size="small"
                      margin="dense"
                      disabled={false}
                    />
                  )}
                />
              </Grid> */}
              <Grid item xs={12} sm={6}   container justifyContent="end">
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
              </Grid>
              {rows.length > 0 && (
                <>
                  <Grid item xs={12}>
                    <Title title="Resultados de la búsqueda" />
                    {/* <Typography>Resultados de la búsqueda</Typography> */}
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
                        getRowId={() => uuidv4()}
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
