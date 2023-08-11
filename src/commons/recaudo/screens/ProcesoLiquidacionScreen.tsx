/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type SyntheticEvent, useState, useEffect } from 'react';
import { Box, Grid, type SelectChangeEvent, Tab, Tooltip, IconButton, Avatar } from "@mui/material"
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { GenerarLiquidacion, DetalleLiquidacion } from "../components/procesoLiquidacion";
import { Title } from "../../../components"
import type { Deudor, FormDetalleLiquidacion, FormLiquidacion } from '../interfaces/liquidacion';
import { DataGrid, type GridColDef, GridToolbar } from '@mui/x-data-grid';
import { api } from '../../../api/axios';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { NotificationModal } from '../components/NotificationModal';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ProcesoLiquidacionScreen: React.FC = () => {
  const [deudores, set_deudores] = useState<Deudor[]>([]);
  const [nombre_deudor, set_nombre_deudor] = useState('');
  const [form_liquidacion, set_form_liquidacion] = useState<FormLiquidacion>({
    id_deudor: '',
    id_expediente: '',
    fecha_liquidacion: '',
    vencimiento: '',
    periodo_liquidacion: '',
    valor: 0,
  });
  const [form_detalle_liquidacion, set_form_detalle_liquidacion] = useState<FormDetalleLiquidacion[]>([]);
  const [position_tab, set_position_tab] = useState('1');
  const [open_notification_modal, set_open_notification_modal] = useState<boolean>(false);
  const [notification_info, set_notification_info] = useState({ type: '', message: '' });
  const [loading, set_loading] = useState(true);

  useEffect(() => {
    api.get('recaudo/liquidaciones/deudores')
      .then((response) => {
        set_deudores(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => {
        set_loading(false);
      });
  }, []);

  const handle_position_tab_change = (event: SyntheticEvent, newValue: string): void => {
    set_position_tab(newValue);
    if (newValue === '1') {
      set_form_liquidacion(previousState => ({ ...previousState, id_expediente: '' }));
    }
  }

  const handle_input_form_liquidacion_change = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    set_form_liquidacion((prevDetalles) => ({ ...prevDetalles, [name]: value }));
  }

  const handle_select_form_liquidacion_change: (event: SelectChangeEvent) => void = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    set_form_liquidacion((prevDetalles) => ({ ...prevDetalles, [name]: value }));
  }

  const handle_submit_detalles_liquidacion = (id_liquidacion: number): void => {
    form_detalle_liquidacion.forEach((form) => {
      const new_objeto = {
        ...form,
        id_opcion_liq: Number(form.id_opcion_liq),
        id_liquidacion,
      };
      api.post('recaudo/liquidaciones/detalles-liquidacion-base/', new_objeto)
        .then((response) => {
          console.log(response);
          set_position_tab('1');
          set_form_liquidacion({
            id_deudor: '',
            id_expediente: '',
            fecha_liquidacion: '',
            vencimiento: '',
            periodo_liquidacion: '',
            valor: 0,
          });
          set_form_detalle_liquidacion([]);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const handle_submit_liquidacion = (): void => {
    api.post('recaudo/liquidaciones/liquidacion-base/', {
      ...form_liquidacion,
      id_deudor: Number(form_liquidacion.id_deudor),
      id_expediente: Number(form_liquidacion.id_expediente),
    })
      .then((response) => {
        console.log(response);
        handle_submit_detalles_liquidacion(response.data.id);
        set_notification_info({ type: 'success', message: `Se ha guardado correctamente la liquidacion.` });
        set_open_notification_modal(true);
      })
      .catch((error) => {
        console.log(error);
        set_notification_info({ type: 'error', message: 'Hubo un error.' });
        set_open_notification_modal(true);
      });
  };

  const columns_deudores: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      minWidth: 110,
      flex: 0.1,
    },
    {
      field: 'identificacion',
      headerName: 'Identificación',
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: 'nombres',
      headerName: 'Nombres',
      minWidth: 110,
      flex: 0.1,
    },
    {
      field: 'apellidos',
      headerName: 'Apellidos',
      minWidth: 110,
      flex: 0.1,
    },
    {
      field: 'deudor',
      headerName: 'Deudor',
      minWidth: 160,
      flex: 1,
      valueGetter: (params) => {
        return `${params.row.nombres as string ?? ''} ${params.row.apellidos as string ?? ''}`;
      }
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      minWidth: 100,
      flex: 0.2,
      renderCell: (params) => {
        return (
          <Tooltip title='Liquidar'>
            <IconButton
              onClick={() => {
                set_form_liquidacion((previousData) => ({ ...previousData, id_deudor: params.row.id }));
                set_nombre_deudor(`${params.row.nombres as string ?? ''} ${params.row.apellidos as string ?? ''}`);
                set_position_tab('2');
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
                <RequestQuoteIcon
                  sx={{
                    color: 'primary.main',
                    width: '18px',
                    height: '18px'
                  }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        );
      }
    }
  ];

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
          boxShadow: '0px 3px 6px #042F4A26'
        }}
      >
        <Grid item xs={12}>
          <Title title="Proceso de Liquidación"></Title>
          <Box
            component='form'
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <TabContext value={position_tab}>

              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handle_position_tab_change}>
                  <Tab label="Deudores" value="1" />
                  <Tab label="Generar Liquidación" value="2" />
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ p: '20px 0' }}>
                {/* DATAGRID LIQUIDACION */}
                <DataGrid
                  density='compact'
                  autoHeight
                  rows={deudores}
                  columns={columns_deudores}
                  pageSize={100}
                  rowsPerPageOptions={[100]}
                  experimentalFeatures={{ newEditingApi: true }}
                  getRowId={(row) => row.id}
                  components={{ Toolbar: GridToolbar }}
                  loading={loading}
                  initialState={{
                    columns: {
                      columnVisibilityModel: {
                        nombres: false,
                        apellidos: false,
                      }
                    }
                  }}
                />
              </TabPanel>

              <TabPanel value="2" sx={{ p: '20px 0' }}>
                {/* INPUTS EDITAR LIQUIDACION */}
                <GenerarLiquidacion
                  form_liquidacion={form_liquidacion}
                  nombre_deudor={nombre_deudor}
                  form_detalle_liquidacion={form_detalle_liquidacion}
                  handle_input_form_liquidacion_change={handle_input_form_liquidacion_change}
                  handle_select_form_liquidacion_change={handle_select_form_liquidacion_change}
                  handle_submit_liquidacion={handle_submit_liquidacion}
                />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>

      <TabContext value={position_tab}>
        <TabPanel value="2" sx={{ p: '20px 0' }}>
          {/* GRID DETALLE LIQUIDACION */}
          <DetalleLiquidacion
            set_form_liquidacion={set_form_liquidacion}
            set_form_detalle_liquidacion={set_form_detalle_liquidacion}
          />
        </TabPanel>
      </TabContext>
      <NotificationModal
        open_notification_modal={open_notification_modal}
        set_open_notification_modal={set_open_notification_modal}
        notification_info={notification_info}
      />
    </>
  )
}