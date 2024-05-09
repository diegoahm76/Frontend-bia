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


// eslint-disable-next-line @typescript-eslint/naming-convention
export const ProcesoPagoCoactivo: React.FC<any> = ({
  datos
}: {datos: any}) => {

  const columns: GridColDef[] = [
    { field: 'id', headerName: '#', minWidth: 100, flex: 1, valueGetter: (params) => params.row.id + 1},
    { field: 'expediente', headerName: 'Expediente', minWidth: 200, flex: 6 }
  ];

  const subetapas = [{ id: '1', nombre: 'Mandamiento de Pago' }, { id: '2', nombre: 'Seguir Adelante' }];

  const [position_tab, set_position_tab] = useState('1');
  const [is_generate_resolucion, set_is_generate_resolucion] = useState(true);
  const [is_generate_cobro, set_is_generate_cobro] = useState(true);
  const [resolucion_url, set_resolucion_url] = useState(null);
  const [cobro_url, set_cobro_url] = useState(null);
  const [expedientes_deudor, set_expedientes_deudor] = useState<any[]>([]);
  const [current_deudor, set_current_deudor] = useState<any>({});
  const [data_clean, set_data_clean] = useState<any>([]);
  const [id_subetapa, set_id_subetapa] = useState<string>('1');

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
        <Title title="Proceso Cobro Coactivo"></Title>
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
        <Typography variant="subtitle1" sx={{fontWeight: 'bold'}} mt={5} mb={2}>Cargue o Generación de Documentos</Typography>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={6} lg={5} sx={{margin: 'auto'}}>
            <Button
              variant="outlined"
              fullWidth
              size='medium'
              component="label"
              startIcon={<CloudUpload />}
            >
              CARGAR MANDAMIENTO DE PAGO
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
          <Grid item xs={12} md={6} lg={5} sx={{margin: 'auto'}}>
            <Button
              variant="outlined"
              fullWidth
              size='medium'
              component="label"
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
                onClick={handle_click_generate_mandamiento}
              >
                GENERAR MANDAMIENTO DE PAGO
              </Button>
          </Grid>
          <Grid item xs={12} md={6} lg={5} sx={{margin: 'auto'}}>
            <Button
                variant="outlined"
                fullWidth
                size='medium'
                component="label"
                startIcon={<DescriptionIcon />}
                onClick={handle_click_generate_cobro}
              >
                GENERAR DOCUMENTO DE COBRO
              </Button>
          </Grid>
        </Grid>
      </Grid>
        {/* {(is_generate_cobro || is_generate_resolucion || resolucion_url || cobro_url) && <TabContext value={position_tab}> */}
        {(is_generate_cobro || is_generate_resolucion || resolucion_url || cobro_url) && (datos || obligaciones_from_liquidacion.length) &&
        <TabContext value={position_tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handle_tablist_change}>
              {(is_generate_resolucion || resolucion_url) && (id_subetapa == '1') && <Tab label={is_generate_resolucion ? 'MANDAMIENTO DE PAGO GENERADO' : 'MANDAMIENTO DE PAGO CARGADO'} value="1" />}
              {(is_generate_cobro || cobro_url) && (id_subetapa == '1') && <Tab label={is_generate_cobro ? 'COBRO GENERADO' : 'COBRO CARGADO'} value="2" />}
              {(is_generate_cobro || cobro_url) && (id_subetapa == '2') && <Tab label={is_generate_resolucion ? 'DOCUMENTO SEGUIR ADELANTE GENERADO' : 'DOCUMENTO SEGUIR ADELANTE CARGADO'} value="1" />}
              {(is_generate_cobro || cobro_url) && (id_subetapa == '2') && <Tab label={is_generate_cobro ? 'COBRO GENERADO' : 'COBRO CARGADO'} value="2" />}
            </TabList>
          </Box>

          <TabPanel value="1" sx={{ p: '20px 0' }}>
            {id_subetapa == '1'
            // ? <MandamientoPagoDoc
            //     datos={datos}
            //   />
            ? <LiquidacionCredito
                datos={datos}
              />
            : <SeguirAdelanteDoc
                datos={datos}
              />
            }
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
