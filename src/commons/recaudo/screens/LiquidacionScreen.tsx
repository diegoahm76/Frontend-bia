/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type SyntheticEvent, useEffect, useState } from "react";
import type { OpcionLiquidacion } from "../interfaces/liquidacion";
import { DataGrid, GridToolbar, type GridColDef } from "@mui/x-data-grid";
import { api } from "../../../api/axios";
import { Avatar, Box, Button, ButtonGroup, Chip, Grid, IconButton, Stack, Tab, Tooltip } from "@mui/material";
import { Title } from "../../../components";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { AgregarEditarOpciones } from "../components/constructorLiquidador/AgregarEditarOpciones";
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Divider, TextField, MenuItem } from '@mui/material';
import { control_error, control_success } from "../alertas/store/thunks/alertas";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ClearIcon from '@mui/icons-material/Clear'; // Importar el icono de limpieza
import CancelIcon from '@mui/icons-material/Cancel';
import { download_xls } from "../../../documentos-descargar/XLS_descargar";
import { download_pdf } from "../../../documentos-descargar/PDF_descargar";
// Interfaces para tipos de datos
interface TipoCobro {
  id_tipo_cobro: number;
  nombre_tipo_cobro: string;
  tipo_renta_asociado: any;
}

interface TipoRenta {
  id_tipo_renta: number;
  nombre_tipo_renta: string;
  tipo_cobro_asociado: any;
  tipo_renta_asociado: any;
}

interface ConfiguracionBasica {
  id_variables: any;
  nombre: any;
  tipo_cobro: any;
  tipo_renta: any;
}

// Componente principal
export const LiquidacionScreen = (): JSX.Element => {
  // useState hooks
  const initial_form={
    id_variables: "",
    nombre: "",
    tipo_cobro: "",
    tipo_renta: "",
  }
  const [position_tab, set_position_tab] = useState('1');
  const [tab_name, set_tab_name] = useState('Agregar opciones');
  const [opciones_liquidaciones, set_opciones_liquidaciones] = useState<OpcionLiquidacion[]>([]);
  const [form_data, set_form_data] = useState({ variable: '', nombre_opcion_liquidacion: '', estado: '', nombre_variable: "" });
  const [id_opcion_liquidacion, set_id_opcion_liquidacion] = useState('');
  const [select_variable, set_select_variable] = useState('');
  const [refresh_page, set_refresh_page] = useState<boolean>(false);
  const [open_notification_modal, set_open_notification_modal] = useState<boolean>(false);
  const [notification_info, set_notification_info] = useState({ type: '', message: '' });
  const [edit_opcion, set_edit_opcion] = useState<boolean>(false);
  const [borar, set_borar] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<ConfiguracionBasica>(initial_form);
  const [tiposRenta, setTiposRenta] = useState<TipoRenta[]>([]);
  const [tiposCobro, setTiposCobro] = useState<TipoCobro[]>([]);


  // Función para obtener los tipos de renta
  const fetchTiposRenta = async () => {
    try {
      const res = await api.get("/recaudo/configuracion_baisca/tiporenta/get/");
      setTiposRenta(res.data.data);
    } catch (error) {
      console.error("Error al obtener los tipos de renta", error);
    }
  };

  // Función para obtener los tipos de cobro
  const fetchTiposCobro = async () => {
    try {
      const res = await api.get("/recaudo/configuracion_baisca/tipoCobro/get/");
      setTiposCobro(res.data.data);
    } catch (error) {
      console.error("Error al obtener los tipos de cobro", error);
    }
  };

  // Clonar una opción de liquidación
  const clone_opcion_liquidacion = (id: string): void => {
    api.get(`recaudo/liquidaciones/clonar-opcion-liquidacion-base/${id}`)
      .then((response) => {
        const cloned_opcion: OpcionLiquidacion = response.data.data;
        add_cloned_opcion(cloned_opcion);
        control_success(`Se ha clonado correctamente la opción de liquidación "${cloned_opcion.nombre}" al final de la tabla`);
        set_open_notification_modal(true);
      })
      .catch((error: any) => {
        control_error(error.response.data.detail);
        set_open_notification_modal(true);
      });
  };

  // Eliminar una opción de liquidación
  const delete_opcion_liquidacion = (id: string): void => {
    api.get(`recaudo/liquidaciones/eliminar-opciones-liquidacion-base/${id}`)
      .then((response) => {
        set_opciones_liquidaciones(opciones_liquidaciones.filter((opcion) => opcion.id !== Number(id)));
        control_success(response.data.detail);
        set_open_notification_modal(true);
      })
      .catch((error: any) => {
        control_error(error.response.data.detail);
        set_open_notification_modal(true);
      });
  };

  // Manejar el cambio de la lista de tabs
  const handle_tablist_change = (event: SyntheticEvent, newValue: string): void => {
    set_position_tab(newValue);
  };

  // Agregar una opción de liquidación clonada
  const add_cloned_opcion = (opcion_liquidacion: OpcionLiquidacion): void => {
    set_opciones_liquidaciones(previousState => ([
      ...previousState,
      opcion_liquidacion
    ]));
  };

  // Manejar cambios en los inputs del formulario
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };


  const filteredOpcionesLiquidaciones = opciones_liquidaciones.filter(opcion => {
    const matchTipoRenta = formValues.tipo_renta ? Number(opcion.tipo_renta) === Number(formValues.tipo_renta) : true;
    const matchTipoCobro = formValues.tipo_cobro ? Number(opcion.tipo_cobro) === Number(formValues.tipo_cobro) : true;
    return matchTipoRenta && matchTipoCobro;
  });


  const opciones_liquidacion_columns: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 1,
    },
    {
      field: 'estado',
      headerName: 'Estado',
      flex: 1,
      renderCell: (params) => {
        if (params.value === 0) {
          return <Chip size="small" label='En construcción' color="warning" variant="outlined" />;
        }
        if (params.value === 1) {
          return <Chip size="small" label='Activo' color="success" variant="outlined" />;
        }
        if (params.value === 2) {
          return <Chip size="small" label='Inactivo' color="error" variant="outlined" />;
        }
        return <></>;
      }
    },
    {
      field: 'variables',
      headerName: 'Variables',
      flex: 1,
      valueGetter: (params) => {
        if (!params.value) {
          return params.value;
        }
        return Object.keys(params.value).toString().replace(/,/g, ', ');
      }
    },
    {
      field: 'usada',
      headerName: 'Usada',
      flex: 1,
      renderCell: (params) => {
        const isUsada = params.value;
        return (
          <Chip
            icon={isUsada ? <CheckCircleIcon /> : <CancelIcon />}
            label={isUsada ? 'Sí' : 'No'}
            color={isUsada ? 'success' : 'error'}
            variant="outlined"
          />
        );
      }
    },
    {
      field: 'tipo_cobro',
      headerName: 'Tipo de Cobro',
      flex: 1,
      renderCell: (params) => {
        const tipoCobro = tiposCobro.find(item => item.id_tipo_cobro === Number(params.value));
        const label = tipoCobro ? tipoCobro.nombre_tipo_cobro : 'No disponible';
        const color = tipoCobro ? 'success' : 'default';
        return (
          <Chip
            label={label}
            color={color}
            variant="outlined"
          />
        );
      }
    },
    {
      field: 'tipo_renta',
      headerName: 'Tipo de Renta',
      flex: 1,
      renderCell: (params) => {
        const tipoRenta = tiposRenta.find(item => item.id_tipo_renta === Number(params.value));
        const label = tipoRenta ? tipoRenta.nombre_tipo_renta : 'No disponible';
        const color = tipoRenta ? 'success' : 'default';
        return (
          <Chip
            label={label}
            color={color}
            variant="outlined"
          />
        );
      }
    },

    {
      field: 'acciones',
      headerName: 'Acciones',
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Editar">
              <IconButton
                onClick={() => {
                  set_select_variable(params.row.variables);
                  set_edit_opcion(true);
                  set_id_opcion_liquidacion(params.row.id);
                  set_form_data((previousState) => ({ ...previousState, nombre_opcion_liquidacion: params.row.nombre, estado: params.row.estado }));
                  set_tab_name('Editar opciones');
                  set_position_tab('2');
                  set_borar(params.row.usada);
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
                  <EditIcon
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px'
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Tooltip title="Clonar">
              <IconButton
                onClick={() => {
                  clone_opcion_liquidacion(params.row.id);
                  set_borar(params.row.usada);
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
                  <ContentCopyIcon
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px'
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton
                color="error"
                onClick={() => {
                  delete_opcion_liquidacion(params.row.id);
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
                  <DeleteIcon
                    sx={{
                      color: 'error.main',
                      width: '18px',
                      height: '18px'
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
          </>
        );
      }
    }
  ];


  // useEffect hooks
  useEffect(() => {
    api.get('recaudo/liquidaciones/opciones-liquidacion-base')
      .then((response) => {
        set_opciones_liquidaciones(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        set_refresh_page(false);
      });
  }, [refresh_page]);

  useEffect(() => {
    fetchTiposRenta();
  }, []);

  useEffect(() => {
    fetchTiposCobro();
  }, []);

  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
          overflow: 'auto'
        }}
      >
        <Grid item xs={12}>
          <Title title="Liquidación" />

          <Box
            component='form'
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <TabContext value={position_tab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handle_tablist_change}>
                  <Tab label="Opciones Liquidaciones" value="1" />
                  <Tab label={tab_name} value="2" />
                </TabList>
              </Box>
              <TabPanel value="1" sx={{ p: '20px 0' }}>
                <Stack direction='row' spacing={2} sx={{ mb: '20px' }}>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      set_edit_opcion(false);
                      set_id_opcion_liquidacion('');
                      set_form_data((previousState) => ({ ...previousState, nombre_opcion_liquidacion: '', estado: '' }));
                      set_tab_name('Agregar opciones');
                      set_position_tab('2');
                    }}
                  >
                    Agregar opción liquidación
                  </Button>
                </Stack>
                <Grid
                  container
                  spacing={2}
                >
                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      required
                      fullWidth
                      size="small"
                      variant="outlined"
                      label="Tipo de renta"
                      name="tipo_renta"
                      onChange={handleInputChange}
                      value={formValues.tipo_renta}
                    >
                      {tiposRenta.map((tipo) => (
                        <MenuItem key={tipo.id_tipo_renta} value={tipo.id_tipo_renta}>
                          {tipo.nombre_tipo_renta}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      required
                      fullWidth
                      size="small"
                      variant="outlined"
                      label="Tipo cobro"
                      name="tipo_cobro"
                      onChange={handleInputChange}
                      value={formValues.tipo_cobro}
                    >
                      {tiposCobro
                        .filter(tipoCobro => tipoCobro.tipo_renta_asociado === formValues.tipo_renta) // Filtrado basado en la selección de tipo_renta
                        .map((tipoCobro) => (
                          <MenuItem key={tipoCobro.id_tipo_cobro} value={tipoCobro.id_tipo_cobro}>
                            {tipoCobro.nombre_tipo_cobro}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={4}>

                  <Button
                    variant="outlined"
                    startIcon={<ClearIcon />}
                    onClick={() => {setFormValues(initial_form)}}
                  >
                    Limpiar
                  </Button>
                      </Grid>

                  
                  <Grid item xs={12} sm={12}>
                  <ButtonGroup style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}>
                      {download_xls({
                        nurseries: filteredOpcionesLiquidaciones,
                        columns:opciones_liquidacion_columns,
                      })}
                      {download_pdf({
                        nurseries: filteredOpcionesLiquidaciones,
                        columns:opciones_liquidacion_columns,
                        title: 'Resultados',
                      })}
                    </ButtonGroup>
                    <DataGrid
                      density='compact'
                      autoHeight
                      // rows={opciones_liquidaciones}
                      rows={filteredOpcionesLiquidaciones}


                      columns={opciones_liquidacion_columns}
                      pageSize={10}
                      rowsPerPageOptions={[10]}
                      experimentalFeatures={{ newEditingApi: true }}
                      getRowId={(row) => row.id}
                      components={{ Toolbar: GridToolbar }}
                    />
                  </Grid>
                </Grid>





              </TabPanel>
              <TabPanel value="2" sx={{ p: '20px 0' }}>
                <AgregarEditarOpciones
                  borar={borar}
                  select_variable={select_variable}
                  opciones_liquidaciones={opciones_liquidaciones}
                  id_opcion_liquidacion={id_opcion_liquidacion}
                  form_data={form_data}
                  edit_opcion={edit_opcion}
                  set_id_opcion_liquidacion={set_id_opcion_liquidacion}
                  set_refresh_page={set_refresh_page}
                  set_form_data={set_form_data}
                />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>

    </>
  );
};
