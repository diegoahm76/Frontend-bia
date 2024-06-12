/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type SyntheticEvent, useEffect, useState } from "react";
import type { OpcionLiquidacion } from "../interfaces/liquidacion";
import { DataGrid, GridToolbar, type GridColDef } from "@mui/x-data-grid";
import { api } from "../../../api/axios";
import { Avatar, Box, Button, Chip, Grid, IconButton, Stack, Tab, Tooltip } from "@mui/material";
import { Title } from "../../../components";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { AgregarEditarOpciones } from "../components/constructorLiquidador/AgregarEditarOpciones";
import { NotificationModal } from "../components/NotificationModal";
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Divider, TextField, MenuItem, } from '@mui/material';

import { control_error, control_success } from "../alertas/store/thunks/alertas";
interface TipoCobro {
  id_tipo_cobro: number;
  nombre_tipo_cobro: string;
  tipo_renta_asociado: any;
}
interface TipoRenta {
  id_tipo_renta: number;
  nombre_tipo_renta: string;
  tipo_cobro_asociado: any;
  tipo_renta_asociado: any
}
interface ConfiguracionBasica {
  id_variables: any;
  nombre: any;
  tipo_cobro: any;
  tipo_renta: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LiquidacionScreen = (): JSX.Element => {
  const [position_tab, set_position_tab] = useState('1');
  const [tab_name, set_tab_name] = useState('Agregar opciones');
  const [opciones_liquidaciones, set_opciones_liquidaciones] = useState<OpcionLiquidacion[]>([]);
  const [form_data, set_form_data] = useState({ variable: '', nombre_opcion_liquidacion: '', estado: '' });
  const [id_opcion_liquidacion, set_id_opcion_liquidacion] = useState('');
  const [select_variable, set_select_variable] = useState('');

  const [refresh_page, set_refresh_page] = useState<boolean>(false);
  const [open_notification_modal, set_open_notification_modal] = useState<boolean>(false);
  const [notification_info, set_notification_info] = useState({ type: '', message: '' });
  const [edit_opcion, set_edit_opcion] = useState<boolean>(false);
  const [borar, set_borar] = useState<boolean>(false);


  useEffect(() => {
    api.get('recaudo/liquidaciones/opciones-liquidacion-base')
      .then((response) => {
        set_opciones_liquidaciones(response.data.data);
      })
      .catch((error) => {
        //  console.log('')(error);
      })
      .finally(() => {
        set_refresh_page(false);
      });
  }, [refresh_page]);

  const clone_opcion_liquidacion = (id: string): void => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    api.get(`recaudo/liquidaciones/clonar-opcion-liquidacion-base/${id}`)
      .then((response) => {
        const cloned_opcion: OpcionLiquidacion = response.data.data;
        add_cloned_opcion(cloned_opcion);
        // set_notification_info({ type: 'success', message: `Se ha clonado correctamente la opción de liquidación "${cloned_opcion.nombre}" al final de la tabla.` });
        control_success(`Se ha clonado correctamente la opción de liquidación "${cloned_opcion.nombre}" al final de la tabla `)

        set_open_notification_modal(true);
      })
      .catch((error: any) => {
        //  console.log('')(error);
        // set_notification_info({ type: 'error', message: `Hubo un error.` });
        control_error(error.response.data.detail);
        set_open_notification_modal(true);
      });
  };

  const delete_opcion_liquidacion = (id: string): void => {
    api.get(`recaudo/liquidaciones/eliminar-opciones-liquidacion-base/${id}`)
      .then((response) => {
        set_opciones_liquidaciones(opciones_liquidaciones.filter((opcion) => { return opcion.id !== Number(id) }));
        // set_notification_info({ type: 'success', message: response.data.detail });
        control_success(` ${response.data.detail}  `)

        set_open_notification_modal(true);
      })
      .catch((error: any) => {
        //  console.log('')(error);
        // set_notification_info({ type: 'error', message: `Hubo un error.` });
        control_error(error.response.data.detail);
        set_open_notification_modal(true);

      });
  };

  const handle_tablist_change = (event: SyntheticEvent, newValue: string): void => {
    set_position_tab(newValue)
  };

  const add_cloned_opcion = (opcion_liquidacion: OpcionLiquidacion): void => {
    set_opciones_liquidaciones(previousState => ([
      ...previousState,
      opcion_liquidacion
    ]));
  };

  const opciones_liquidacion_columns: GridColDef[] = [
    // {
    //   field: 'id',
    //   headerName: 'ID',
    //   minWidth: 40,
    //   flex: 1,
    // },
    {
      field: 'nombre',
      headerName: 'Nombre',
      // minWidth: 180,
      flex: 1,
    },
    // {
    //   field: 'tipo_cobro',
    //   headerName: 'tipo_cobro',
    //   // minWidth: 180,
    //   flex: 1,
    // },
    {
      field: 'estado',
      headerName: 'Estado',
      // minWidth: 100,
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
      // minWidth: 200,
      flex: 1,
      valueGetter: (params) => {
        if (!params.value) {
          return params.value;
        }
        return Object.keys(params.value).toString().replace(/,/g, ', ');
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
                  set_borar(params.row.usada)

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
                  set_borar(params.row.usada)
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
                disabled={params.row.usada}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      }
    }
  ];
  const [formValues, setFormValues] = useState<ConfiguracionBasica>({
    id_variables: "",
    nombre: "",
    tipo_cobro: "",
    tipo_renta: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const [tiposRenta, setTiposRenta] = useState<TipoRenta[]>([]);

  const fetchTiposRenta = async () => {
    try {
      const res = await api.get("/recaudo/configuracion_baisca/tiporenta/get/");
      setTiposRenta(res.data.data);
    } catch (error) {
      console.error("Error al obtener los tipos de renta", error);
    }
  };

  useEffect(() => {
    fetchTiposRenta();
  }, []);


  const [tiposCobro, setTiposCobro] = useState<TipoCobro[]>([]);

  const fetchTiposCobro = async () => {
    try {
      const res = await api.get("/recaudo/configuracion_baisca/tipoCobro/get/");
      setTiposCobro(res.data.data);
    } catch (error) {
      console.error("Error al obtener los tipos de renta", error);
    }
  };

  useEffect(() => {
    fetchTiposCobro();
  }, []);



  const tiposCobrof = `${formValues.tipo_cobro}`;  // Ejemplo de nombre que quieres filtrar

  const opcionesFiltradas = opciones_liquidaciones.filter(opcion =>
    opcion.tipo_cobro === tiposCobrof
  );

  const handleClick = () => {
    console.log(opcionesFiltradas);
    console.log("2222222");
    console.log(formValues.tipo_cobro);


  };
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
          <Title title="Liquidaciónn" />
          {/* <Button color='success'
          variant='contained'
          onClick={handleClick}>CONSOLE </Button> */}
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

                  <Grid item xs={12} sm={12}>
                    <DataGrid
                      density='compact'
                      autoHeight
                      // rows={opciones_liquidaciones}
                      rows={opcionesFiltradas}


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
      {/* <NotificationModal
        open_notification_modal={open_notification_modal}
        set_open_notification_modal={set_open_notification_modal}
        // notification_info={notification_info}
      /> */}
    </>
  );
};