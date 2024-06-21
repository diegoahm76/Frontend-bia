/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  type SelectChangeEvent,
  InputLabel,
  Box,
  Tab,
  FormHelperText,
  Tooltip,
  IconButton,
  Avatar
} from "@mui/material"
import { CloudUpload } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DescriptionIcon from '@mui/icons-material/Description';
import CleanIcon from '@mui/icons-material/CleaningServices';
import type { FlujoProceso } from "../../interfaces/flujoProceso";
import { useContext, useEffect, type Dispatch, type SetStateAction } from "react";
import type { AtributoEtapa } from "../../interfaces/proceso";
import { Title } from "../../../../components/Title";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { SyntheticEvent, useState } from "react";
import { CobroPersuasivo } from "./CobroPersuasivo";
import { DocumentoPersuasivoPago } from "./DocumentoPersuasivoPago";
import { EtapaProcesoConext } from "./Context/EtapaProcesoContext";
import { api } from "../../../../api/axios";
import { control_error } from "../../../../helpers";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { current } from '@reduxjs/toolkit';
import { AprobadoresProps } from "./models/interfaces";
import swal from 'sweetalert2';

interface IProps {
  id_flujo_destino: string;
  selected_proceso: {
    fecha_facturacion: string;
    numero_factura: string;
    codigo_contable: string;
    monto_inicial: string;
    dias_mora: string;
    valor_intereses: string;
    valor_sancion: string;
    etapa: string;

  },
  flujos_destino: FlujoProceso[];
  id_proceso: string;
  id_cartera: string;
  id_subetapa_destino: string;
  subetapas: AtributoEtapa[];
  handle_select_change: (event: SelectChangeEvent) => void;
  set_open_requisitos_modal: Dispatch<SetStateAction<boolean>>;
  set_open_create_proceso_modal: Dispatch<SetStateAction<boolean>>;
  mover_subetapa_actual: () => void;
  datos: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DocumentoPagoPersuasivo: React.FC<any> = ({
  datos,
  set_cobro_coactivo_active,
  set_position_tab_up,
}: {datos: any, set_cobro_coactivo_active: (b: boolean) => void, set_position_tab_up: (str: string) => void}) => {

  const columns: GridColDef[] = [
    { field: 'id', headerName: '#', minWidth: 100, flex: 1, valueGetter: (params) => params.row.id + 1},
    { field: 'expediente', headerName: 'Expediente', minWidth: 200, flex: 6 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title='Ver documentos asociados'>
              <IconButton
                onClick={() => {
                  set_current_expediente(params.row.expediente);
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
                  <VisibilityIcon
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px'
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
          </>
        )
      }
    }
  ];

  const subetapas = [{ id: '1', nombre: 'Primer cobro persuasivo' }, { id: '2', nombre: 'Segundo cobro persuasivo' }];

  const [position_tab, set_position_tab] = useState('1');
  const [is_generate_resolucion, set_is_generate_resolucion] = useState(true);
  const [is_generate_cobro, set_is_generate_cobro] = useState(true);
  const [resolucion_url, set_resolucion_url] = useState(null);
  const [cobro_url, set_cobro_url] = useState(null);
  const [expedientes_deudor, set_expedientes_deudor] = useState<any[]>([]);
  const [current_deudor, set_current_deudor] = useState<any>({});
  const [data_clean, set_data_clean] = useState<any>([]);
  const [rows, set_rows] = useState<any[]>([]);
  const [id_subetapa, set_id_subetapa] = useState<string>('1');
  const [current_expediente, set_current_expediente] = useState<any>(null);
  const [form_table_values, set_form_table_values] = useState<AprobadoresProps>({
    nombre_aprobador: '',
    cargo_aprobador: '',
    nombre_proyector: '',
    cargo_proyector: '',
  });
  const [form_to_send, set_form_to_send] = useState<AprobadoresProps>({
    nombre_aprobador: '',
    cargo_aprobador: '',
    nombre_proyector: '',
    cargo_proyector: '',
    send_data: false
  });

  const { is_from_liquidacion, obligaciones_from_liquidacion, id_deudor, set_etapa_proceso, set_is_from_liquidacion } = useContext(EtapaProcesoConext);

  const handle_tablist_change = (event: SyntheticEvent, newValue: string): void => {
    set_position_tab(newValue);
  };

  const handle_change_resolucion = (event: any) => {
    const file = event.target.files[0];
    const url: any = URL.createObjectURL(file);
    set_resolucion_url(url);
    set_is_generate_resolucion(false);
    set_position_tab('1');
  };

  const handle_change_cobro = (event: any) => {
    const file = event.target.files[0];
    const url: any = URL.createObjectURL(file);
    set_cobro_url(url);
    set_is_generate_cobro(false);
    set_position_tab('2');
  };

  const handle_click_generate_resolucion = () => {
    set_is_generate_resolucion(true);
    set_resolucion_url(null);
    set_position_tab('1');
  }

  const handle_click_generate_cobro = () => {
    set_is_generate_cobro(true);
    set_cobro_url(null);
    set_position_tab('2');
  }

  const handle_click_to_coactivo = () => {
    swal.fire({
      title: '¿Deseas avanzar al proceso coactivo?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        set_cobro_coactivo_active(true)
        set_position_tab_up('4')
      }
    });
  }

  const handle_change_subetapa = (event: any) => {
    set_id_subetapa(event.target.value);
  }

  const handle_nombre_aprobador = (event: any) => {
    set_form_table_values({
      ...form_table_values,
      nombre_aprobador: event.target.value
    });
  }

  const handle_cargo_aprobador = (event: any) => {
    set_form_table_values({
      ...form_table_values,
      cargo_aprobador: event.target.value
    });
  }

  const handle_nombre_proyector = (event: any) => {
    set_form_table_values({
      ...form_table_values,
      nombre_proyector: event.target.value
    });
  }

  const handle_cargo_proyector = (event: any) => {
    set_form_table_values({
      ...form_table_values,
      cargo_proyector: event.target.value
    });
  }

  const handle_click_update = () => {
    set_form_to_send({
      nombre_aprobador: form_table_values.nombre_aprobador,
      cargo_aprobador: form_table_values.cargo_aprobador,
      nombre_proyector: form_table_values.nombre_proyector,
      cargo_proyector: form_table_values.cargo_proyector,
      send_data: true
    });
  }

  const clean_form = () => {
    set_form_table_values({
      nombre_aprobador: '',
      cargo_aprobador: '',
      nombre_proyector: '',
      cargo_proyector: '',
    });
  }

  useEffect(() => {
    if (!is_from_liquidacion) {
      set_rows([]);
      console.log(rows)
    }
  }, [is_from_liquidacion]);

  useEffect(() => {
    if (id_deudor) {
      api
        .get(
          `recaudo/liquidaciones/expedientes-deudor/get/${id_deudor}/`
        )
        .then((response) => {
          set_expedientes_deudor(response.data.data);
        })
        .catch((error) => {
          control_error(error.response.data.message)
        });
    }
  }, [id_deudor]);

  useEffect(() => {
    if(obligaciones_from_liquidacion.length && id_deudor && is_from_liquidacion){
      const deudor = obligaciones_from_liquidacion.find((item: any) => item.id_deudor === id_deudor);
      if (deudor) {
        set_current_deudor(deudor);
      }
      let filtered_data = obligaciones_from_liquidacion.filter((item: any) => item.id_deudor === id_deudor);
      const unique_nro_expediente = [...new Set(filtered_data.map(item => item.nro_expediente))];
      const rows = unique_nro_expediente.map((expediente, index) => ({
        id: index,
        expediente
      }));
      set_rows(rows);
      if(rows.length == 1) set_data_clean(filtered_data);
      //Code para filtrar por expediente
      if (current_expediente !== null) {
        filtered_data = filtered_data.filter((item: any) => item.nro_expediente === current_expediente);
        set_data_clean(filtered_data);
      }
    }


  }, [obligaciones_from_liquidacion, id_deudor, current_expediente]);

  const show_documentos = (): boolean => {
    if(rows.length > 1 && current_expediente === null){
      return false;
    }else{
      return true;
    }
  }

  useEffect(() => console.log(current_deudor), [current_deudor]);
  useEffect(() => console.log(expedientes_deudor), [expedientes_deudor]);
  useEffect(() => console.log(data_clean), [data_clean]);


  return (
    <>
    <Grid
      container
    >
      <Title title="Proceso Cobro Persuasivo"></Title>
      {(current_deudor?.id_deudor || datos?.id_deudor) && <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={6} lg={4} sx={{margin: 'auto'}}>
          <TextField
            fullWidth
            size="small"
            name="documento"
            label="Documento"
            helperText="Documento"
            value={current_deudor?.numero_identificacion || datos.id_deudor.identificacion}
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4} sx={{margin: 'auto'}}>
          <TextField
            fullWidth
            size="small"
            name="nombreDeudor"
            label="Nombre deudor"
            helperText="Nombre deudor"
            value={current_deudor?.nombre_completo || datos.id_deudor.nombres + ' ' + datos.id_deudor.apellidos}
            disabled
          />
        </Grid>
        {/* <Grid item xs={12} md={6} lg={4}>
          <TextField
            fullWidth
            size="small"
            name="montoTotal"
            label="Monto Total"
            helperText="Valor monto total obligaciones sin intereses"
            disabled
          />
        </Grid> */}
        {(rows.length == 1) && <Grid item xs={12} md={6} lg={4}>
          <TextField
            fullWidth
            size="small"
            name="codigoExpediente"
            label="Expediente"
            helperText="Expediente relacionado"
            value={rows[0].expediente}
            disabled
          />
        </Grid>}
        <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              disabled={false}
              select
              size="small"
              value={id_subetapa || ''}
              label="Subetapa Proceso Persuasivo"
              onChange={handle_change_subetapa}
            >
              <MenuItem value="">
                <em>Seleccione una opción</em>
              </MenuItem>
              {subetapas.map((subetapa: any) => (
                <MenuItem key={subetapa.id} value={subetapa.id}>
                  {subetapa.nombre}
                </MenuItem>
              ))}
            </TextField>
            <FormHelperText>Seleccione una subetapa</FormHelperText>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            fullWidth
            size="small"
            label="Aprobó y Revisó"
            helperText="Nombre encargado"
            onChange={handle_nombre_aprobador}
            value={form_table_values.nombre_aprobador}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            fullWidth
            size="small"
            label="Cargo"
            helperText="Cargo del aprobador y revisor"
            onChange={handle_cargo_aprobador}
            value={form_table_values.cargo_aprobador}
          />
        </Grid>
          <Grid item xs={12} md={6} lg={4}>
          <TextField
            fullWidth
            size="small"
            name="nombreDeudor"
            label="Proyectó"
            helperText="Nombre encargado"
            onChange={handle_nombre_proyector}
            value={form_table_values.nombre_proyector}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            fullWidth
            size="small"
            label="Cargo"
            helperText="Cargo del proyector"
            onChange={handle_cargo_proyector}
            value={form_table_values.cargo_proyector}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            size="medium"
            variant="contained"
            color="primary"
            onClick={handle_click_update}
            // endIcon={<CloudDownloadIcon />}
          >
            Actualizar
          </Button>
          <Button
            sx={{ml: 2}}
            size="medium"
            variant="outlined"
            startIcon={<CleanIcon />}
            onClick={clean_form}
          >
            Limpiar
          </Button>
        </Grid>
        {/* <Grid item xs={12} md={6} lg={4}>
          <TextField
            fullWidth
            size="small"
            name="estadiExpediente"
            label="Estado Expediente"
            helperText="Estado Expediente"
            disabled
          />
        </Grid> */}
        {(rows.length > 1) && <Grid item xs={12} lg={8} sx={{margin: 'auto'}}>
          <DataGrid
            density="compact"
            autoHeight
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(row) => row.id}
            getRowHeight={() => 'auto'}
          />
          </Grid>}
      </Grid>}
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{fontWeight: 'bold', textAlign: 'center'}} mt={5} mb={2}>Cargue o Generación de Documentos</Typography>
      </Grid>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={6} lg={5} sx={{margin: 'auto'}}>
          <Button
            variant="outlined"
            fullWidth
            size='medium'
            component="label"
            startIcon={<CloudUpload />}
            disabled={!is_generate_resolucion}
          >
            CARGAR RESOLUCIÓN
            <input
              hidden
              type="file"
              accept=".pdf"
              multiple
              required
              autoFocus
              style={{ opacity: 0 }}
              name="anexos"
              onChange={handle_change_resolucion}
            />
          </Button>
        </Grid>
        <Grid item xs={12} md={6} lg={5} sx={{margin: 'auto'}}>
          <Button
            variant="outlined"
            fullWidth
            size='medium'
            component="label"
            disabled={!is_generate_resolucion}
            startIcon={<CloudUpload />}
          >
            CARGAR DOCUMENTO DE COBRO
            <input
              hidden
              type="file"
              accept=".pdf"
              multiple
              required
              autoFocus
              style={{ opacity: 0 }}
              name="anexos"
              onChange={handle_change_cobro}
            />
          </Button>
        </Grid>
        <Grid item xs={12} md={6} lg={5} sx={{margin: 'auto'}}>
          <Button
              variant="outlined"
              fullWidth
              size='medium'
              component="label"
              startIcon={<DescriptionIcon />}
              disabled={is_generate_resolucion}
              onClick={handle_click_generate_resolucion}
            >
              GENERAR RESOLUCIÓN
            </Button>
        </Grid>
        <Grid item xs={12} md={6} lg={5} sx={{margin: 'auto'}}>
          <Button
            variant="outlined"
            fullWidth
            size='medium'
            component="label"
            startIcon={<DescriptionIcon />}
            disabled={is_generate_resolucion}
            onClick={handle_click_generate_cobro}
          >
            GENERAR DOCUMENTO DE COBRO
          </Button>
        </Grid>
      </Grid>
      <Grid container sx={{display: 'flex', justifyContent: 'end', mt: '1rem'}}>
        <Grid item>
          <Button
            variant="outlined"
            fullWidth
            size='medium'
            component="label"
            onClick={handle_click_to_coactivo}
          >
            AVANZAR AL PROCESO COACTIVO
          </Button>
        </Grid>
      </Grid>
    </Grid>
        {/* {(is_generate_cobro || is_generate_resolucion || resolucion_url || cobro_url) && <TabContext value={position_tab}> */}
        {(is_generate_cobro || is_generate_resolucion || resolucion_url || cobro_url) && show_documentos() && (datos || obligaciones_from_liquidacion.length) &&
        <TabContext value={position_tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handle_tablist_change}>
              {(is_generate_resolucion || resolucion_url) && (id_subetapa == '1') && <Tab label={is_generate_resolucion ? 'RESOLUCIÓN GENERADA' : 'RESOLUCIÓN CARGADA'} value="1" />}
              {(is_generate_cobro || cobro_url) && (id_subetapa == '1') && <Tab label={is_generate_cobro ? 'COBRO GENERADO' : 'COBRO CARGADO'} value="2" />}
              {(is_generate_cobro || cobro_url) && (id_subetapa == '2') && <Tab label={is_generate_resolucion ? 'RESOLUCIÓN GENERADA SEGUNDO CONRO' : 'RESOLUCIÓN CARGADA SEGUNDO COBRO'} value="1" />}
              {(is_generate_cobro || cobro_url) && (id_subetapa == '2') && <Tab label={is_generate_cobro ? 'SEGUNDO COBRO GENERADO' : 'SEGUNDO COBRO CARGADO'} value="2" />}
            </TabList>
          </Box>

          <TabPanel value="1" sx={{ p: '20px 0' }}>
            <CobroPersuasivo
              datos={datos}
              currentDeudor={current_deudor}
              dataClean={data_clean}
              id_deudor={id_deudor}
              is_generate_resolucion={is_generate_resolucion}
              resolucion_url={resolucion_url}
              id_subetapa={id_subetapa}
              aprobadores_data={form_to_send}
              set_form_table_values={set_form_table_values}
            />
          </TabPanel>

          <TabPanel value="2" sx={{ p: '20px 0' }}>
            <DocumentoPersuasivoPago
              datos={datos}
              data_clean={data_clean}
              current_deudor={current_deudor}
              is_generate_cobro={is_generate_cobro}
              cobro_url={cobro_url}
              id_subetapa={id_subetapa}
            />
          </TabPanel>
        </TabContext>}
    </>
  )
}
