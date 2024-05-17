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
  Stack,
  InputLabel,
  Box,
  Tab,
  FormHelperText
} from "@mui/material"
import { CloudUpload } from '@mui/icons-material';
import CleanIcon from '@mui/icons-material/CleaningServices';
import DescriptionIcon from '@mui/icons-material/Description';
import { useContext, useEffect} from "react";
import { Title } from "../../../../components/Title";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { SyntheticEvent, useState } from "react";
import { CobroPersuasivo } from "./CobroPersuasivo";
import { DocumentoPersuasivoPago } from "./DocumentoPersuasivoPago";
import { EtapaProcesoConext } from "./Context/EtapaProcesoContext";
import { api } from "../../../../api/axios";
import { control_error } from "../../../../helpers";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IncumplimientoFacilidadPagoDoc } from "./IncumplimientoFacilidadPago";
import { SeguirAdelanteDoc } from "./SeguirAdelanteDoc";
import { MandamientoPagoDoc } from "./MandamientoPagoDoc";
import { FormatoRecursoReposicion } from "./FormatoRecursoReposicion";
import { FormatoResolverExcepciones } from "./FormatoResolverExcepciones";
import { LiquidacionCredito } from "./LiquidacionCredito";
import { AprobadoresProps } from "./models/interfaces";
import { OficiosEmbargos } from "./OficiosEmbargos";


// eslint-disable-next-line @typescript-eslint/naming-convention
export const ProcesoPagoCoactivo: React.FC<any> = ({
  datos
}: {datos: any}) => {

  const columns: GridColDef[] = [
    { field: 'id', headerName: '#', minWidth: 100, flex: 1, valueGetter: (params) => params.row.id + 1},
    { field: 'expediente', headerName: 'Expediente', minWidth: 200, flex: 6 }
  ];

  const subetapas = [
    { id: '1', nombre: 'Mandamiento de Pago' },
    { id: '2', nombre: 'Formato Recurso de Reposición' },
    { id: '3', nombre: 'Formato Resolver Excepciones' },
    { id: '4', nombre: 'Ordenar Seguir Adelante' },
    { id: '5', nombre: 'Liquidación de Crédito' },
    { id: '6', nombre: 'Aprueba Liquidación de Crédito' },
    { id: '7', nombre: 'Medida Cautelar' },
    { id: '8', nombre: 'Terminación de proceso Coactivo' },
  ];

  const [position_tab, set_position_tab] = useState('1');
  const [is_generate_resolucion, set_is_generate_resolucion] = useState(true);
  const [is_generate_cobro, set_is_generate_cobro] = useState(true);
  const [resolucion_url, set_resolucion_url] = useState(null);
  const [cobro_url, set_cobro_url] = useState(null);
  const [expedientes_deudor, set_expedientes_deudor] = useState<any[]>([]);
  const [current_deudor, set_current_deudor] = useState<any>({});
  const [data_clean, set_data_clean] = useState<any>([]);
  const [id_subetapa, set_id_subetapa] = useState<string>('1');
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

  const handle_change_mandamiento = (event: any) => {
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

  const handle_click_generate_mandamiento = () => {
    set_is_generate_resolucion(true);
    set_resolucion_url(null);
    set_position_tab('1');
  }

  const handle_click_generate_cobro = () => {
    set_is_generate_cobro(true);
    set_cobro_url(null);
    set_position_tab('2');
  }

  const handle_change_subetapa = (event: any) => {
    set_id_subetapa(event.target.value);
  }

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
    if(obligaciones_from_liquidacion.length && id_deudor){
      const deudor = obligaciones_from_liquidacion.find((item: any) => item.id_deudor === id_deudor);
      if (deudor) {
        set_current_deudor(deudor);
      }
    }

    const filtered_data = obligaciones_from_liquidacion.filter((item: any) => item.id_deudor === id_deudor);
    set_data_clean(filtered_data);
  }, [obligaciones_from_liquidacion, id_deudor]);

  useEffect(() => console.log(current_deudor), [current_deudor]);
  useEffect(() => console.log(expedientes_deudor), [expedientes_deudor]);
  useEffect(() => console.log(data_clean), [data_clean]);

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


  return (
    <>
    <Grid
      container
    >
      <Title title="Proceso Cobro Coactivo"></Title>
      {!current_deudor?.id_deudor && <Grid container spacing={2} mt={2}>
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
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            fullWidth
            size="small"
            disabled={false}
            select
            value={id_subetapa || ''}
            label="Subetapa Proceso Coactivo"
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
      </Grid>
      }
      {current_deudor?.id_deudor && <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={6} lg={4} sx={{margin: 'auto'}}>
          <TextField
            fullWidth
            size="small"
            name="documento"
            label="Documento"
            helperText="Documento"
            value={current_deudor.numero_identificacion || ''}
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
            value={current_deudor.nombre_completo || ''}
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
        <Grid item xs={12} md={6} lg={4}>
            <FormControl required size='small' fullWidth>
              <InputLabel>Subetapa Proceso Coactivo</InputLabel>
              <Select
                disabled={false}
                multiline
                value={id_subetapa || ''}
                label="Subetapa Proceso Coactivo"
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
              </Select>
              <FormHelperText>Seleccione una subetapa</FormHelperText>
            </FormControl>
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
      </Grid>}
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{fontWeight: 'bold', textAlign: 'center'}} mt={2} mb={2}>Cargue o Generación de Documentos</Typography>
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
            {id_subetapa == '1' && 'CARGAR MANDAMIENTO DE PAGO'}
            {id_subetapa == '2' && 'CARGAR FORMATO RECURSO DE REPOSICIÓN'}
            {id_subetapa == '3' && 'CARGAR DOCUMENTO RESOLVER EXCEPCIONES'}
            {id_subetapa == '4' && 'CARGAR DOCUMENTO SEGUIR ADELANTE'}
            {id_subetapa == '5' && 'CARGAR LIQUIDACIÓN DE CRÉDITO'}
            {id_subetapa == '6' && 'CARGAR APROBACIÓN LIQUIDACIÓN DE CRÉDITO'}
            {id_subetapa == '7' && 'CARGAR MEDIDA CAUTELAR'}
            {id_subetapa == '8' && 'CARGAR TERMINACIÓN DE PROCESO COACTIVO'}
            <input
              hidden
              type="file"
              accept=".pdf"
              multiple
              required
              autoFocus
              style={{ opacity: 0 }}
              name="anexos"
              onChange={handle_change_mandamiento}
            />
          </Button>
        </Grid>
        {/* <Grid item xs={12} md={6} lg={5} sx={{margin: 'auto'}}>
          <Button
            variant="outlined"
            fullWidth
            size='medium'
            component="label"
            startIcon={<CloudUpload />}
            disabled={!is_generate_resolucion}
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
        </Grid> */}
        <Grid item xs={12} md={6} lg={5} sx={{margin: 'auto'}}>
          <Button
              variant="outlined"
              fullWidth
              size='medium'
              component="label"
              startIcon={<DescriptionIcon />}
              onClick={handle_click_generate_mandamiento}
              disabled={is_generate_resolucion}
            >
            {id_subetapa == '1' && 'GENERAR MANDAMIENTO DE PAGO'}
            {id_subetapa == '2' && 'GENERAR FORMATO RECURSO DE REPOSICIÓN'}
            {id_subetapa == '3' && 'GENERAR DOCUMENTO RESOLVER EXCEPCIONES'}
            {id_subetapa == '4' && 'GENERAR DOCUMENTO SEGUIR ADELANTE'}
            {id_subetapa == '5' && 'GENERAR LIQUIDACIÓN DE CRÉDITO'}
            {id_subetapa == '6' && 'GENERAR APROBACIÓN LIQUIDACIÓN DE CRÉDITO'}
            {id_subetapa == '7' && 'GENERAR MEDIDA CAUTELAR'}
            {id_subetapa == '8' && 'GENERAR TERMINACIÓN DE PROCESO COACTIVO'}
            </Button>
        </Grid>
        {/* <Grid item xs={12} md={6} lg={5} sx={{margin: 'auto'}}>
          <Button
              variant="outlined"
              fullWidth
              size='medium'
              component="label"
              startIcon={<DescriptionIcon />}
              onClick={handle_click_generate_cobro}
              disabled={is_generate_resolucion}
            >
              GENERAR DOCUMENTO DE COBRO
            </Button>
        </Grid> */}
      </Grid>
    </Grid>
        {/* {(is_generate_cobro || is_generate_resolucion || resolucion_url || cobro_url) && <TabContext value={position_tab}> */}
        {(is_generate_cobro || is_generate_resolucion || resolucion_url || cobro_url) && (datos || obligaciones_from_liquidacion.length) &&
        <TabContext value={position_tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handle_tablist_change}>
              {(is_generate_resolucion || resolucion_url) && (id_subetapa == '1') && <Tab label={is_generate_resolucion ? 'MANDAMIENTO DE PAGO GENERADO' : 'MANDAMIENTO DE PAGO CARGADO'} value="1" />}
              {(is_generate_resolucion || resolucion_url) && (id_subetapa == '2') && <Tab label={is_generate_resolucion ? 'FORMATO RECURSO DE REPOSICIÓN GENERADO' : 'FORMATO RECURSO DE REPOSICIÓN CARGADO'} value="1" />}
              {(is_generate_resolucion || resolucion_url) && (id_subetapa == '3') && <Tab label={is_generate_resolucion ? 'DOCUMENTO RESOLVER EXCEPCIONES GENERADO' : 'DOCUMENTO RESOLVER EXCEPCIONES CARGADO'} value="1" />}
              {/* {(is_generate_cobro || cobro_url) && (id_subetapa == '1') && <Tab label={is_generate_cobro ? 'COBRO GENERADO' : 'COBRO CARGADO'} value="2" />} */}
              {(is_generate_cobro || cobro_url) && (id_subetapa == '4') && <Tab label={is_generate_resolucion ? 'DOCUMENTO SEGUIR ADELANTE GENERADO' : 'DOCUMENTO SEGUIR ADELANTE CARGADO'} value="1" />}
              {(is_generate_cobro || cobro_url) && (id_subetapa == '5') && <Tab label={is_generate_resolucion ? 'LIQUIDACIÓN DE CRÉDITO GENERADO' : 'LIQUIDACIÓN DE CRÉDITO CARGADO'} value="1" />}
              {(is_generate_cobro || cobro_url) && (id_subetapa == '6') && <Tab label={is_generate_resolucion ? 'APROBACIÓN LIQUIDACIÓN DE CRÉDITO GENERADO' : 'APROBACIÓN LIQUIDACIÓN DE CRÉDITO CARGADO'} value="1" />}
              {(is_generate_cobro || cobro_url) && (id_subetapa == '7') && <Tab label={is_generate_resolucion ? 'MEDIDA CAUTELAR GENERADA' : 'MEDIDA CAUTELAR CARGADA'} value="1" />}
              {(is_generate_cobro || cobro_url) && (id_subetapa == '8') && <Tab label={is_generate_resolucion ? 'TERMINACIÓN DE PROCESO COACTIVO GENERADO' : 'TERMINACIÓN DE PROCESO COACTIVO CARGADO'} value="1" />}
              {/* {(is_generate_cobro || cobro_url) && (id_subetapa == '2') && <Tab label={is_generate_cobro ? 'COBRO GENERADO' : 'COBRO CARGADO'} value="2" />} */}

            </TabList>
          </Box>

          <TabPanel value="1" sx={{ p: '20px 0' }}>
            {id_subetapa == '1'
              &&  <MandamientoPagoDoc
                    datos={datos}
                  />
            }
            {id_subetapa == '2'
              &&  <FormatoRecursoReposicion
                    datos={datos}
                  />
            }
            {id_subetapa == '3'
              &&  <FormatoResolverExcepciones
                    datos={datos}
                  />
            }
            {id_subetapa == '4'
              &&  <SeguirAdelanteDoc
                    datos={datos}
                  />
            }
            {(id_subetapa == '5' || id_subetapa == '6' || id_subetapa == '8')
              &&  <LiquidacionCredito
                    id_subetapa={id_subetapa}
                    datos={datos}
                  />
            }
            {id_subetapa == '7'
              &&  <OficiosEmbargos
                    id_subetapa={id_subetapa}
                    datos={datos}
                  />}
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
