import { type SyntheticEvent, useState, useEffect } from 'react';
import { Box, Grid, type SelectChangeEvent, Tab } from "@mui/material"
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { GenerarLiquidacion, DetalleLiquidacion } from "../components/procesoLiquidacion";
import { Title } from "../../../components"
import axios from 'axios';
import type { FormDetalleLiquidacion, FormLiquidacion, Liquidacion, OpcionLiquidacion } from '../interfaces/liquidacion';
import { TablaGeneral } from '../../../components/TablaGeneral/TablaGeneral';

interface Row {
  id: number;
  deudor: string;
  identificacion: string;
  monto_inicial: number;
  fecha_liquidacion: string;
  periodo: string;
}

const columns = [
  {
    field: 'id',
    header: 'ID Liquidación',
    visible: true,
  },
  {
    field: 'deudor',
    header: 'Deudor',
    visible: true,
  },
  {
    field: 'identificacion',
    header: 'Identificación',
    visible: true,
  },
  {
    field: 'monto_inicial',
    header: 'Monto Inicial',
    visible: true,
  },
  {
    field: 'fecha_liquidacion',
    header: 'Fecha Liquidación',
    visible: true,
  },
  {
    field: 'periodo',
    header: 'Periodo',
    visible: true,
  }
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ProcesoLiquidacionScreen: React.FC = () => {
  const [liquidaciones, set_liquidaciones] = useState<Liquidacion[]>([]);
  const [opciones_liquidacion, set_opciones_liquidacion] = useState<OpcionLiquidacion[]>([]);
  const [form_liquidacion, set_form_liquidacion] = useState<FormLiquidacion>({
    cod_deudor: '',
    cod_expediente: '',
    fecha_liquidacion: '',
    vencimiento: '',
    periodo_liquidacion: '',
    estado: 'G',
  });
  const [form_detalle_liquidacion, set_form_detalle_liquidacion] = useState<FormDetalleLiquidacion[]>([]);
  const [total_obligacion, set_total_obligacion] = useState<number>(0);
  const [position_tab, set_position_tab_organigrama] = useState('1');
  const [rows, set_rows] = useState<Row[]>([]);

  useEffect(() => {
    axios.get('http://macarenia.bitpointer.co/api/recaudo/liquidaciones/liquidacion-base')
      .then((response) => {
        set_liquidaciones(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://macarenia.bitpointer.co/api/recaudo/liquidaciones/opciones-liquidacion-base/')
      .then((response) => {
        set_opciones_liquidacion(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const new_rows = liquidaciones.map((liquidacion) => ({
      id: liquidacion.id,
      deudor: liquidacion.cod_deudor.nombres.concat(' ', liquidacion.cod_deudor.apellidos),
      identificacion: liquidacion.cod_deudor.identificacion,
      monto_inicial: liquidacion.valor,
      fecha_liquidacion: liquidacion.fecha_liquidacion,
      periodo: liquidacion.periodo_liquidacion,
    }));
    set_rows(new_rows);
  }, [liquidaciones]);

  const handle_change = (event: SyntheticEvent, newValue: string): void => {
    set_position_tab_organigrama(newValue)
  }

  const handle_input_form_liquidacion_change = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    set_form_liquidacion((prevDetalles) => ({ ...prevDetalles, [name]: value }));
  }

  const handle_select_form_liquidacion_change: (event: SelectChangeEvent) => void = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    set_form_liquidacion((prevDetalles) => ({ ...prevDetalles, [name]: value }));
  }

  const handle_submit_detalles_liquidacion = (id: number): void => {
    form_detalle_liquidacion.forEach((form) => {
      const new_objeto = {
        ...form,
        id_opcion_liq: Number(form.id_opcion_liq),
        id_liquidacion: id
      };
      axios.post('http://macarenia.bitpointer.co/api/recaudo/liquidaciones/detalles-liquidacion-base/', new_objeto)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const handle_submit_liquidacion = (): void => {
    axios.post('http://macarenia.bitpointer.co/api/recaudo/liquidaciones/liquidacion-base/', {
      ...form_liquidacion,
      cod_deudor: Number(form_liquidacion.cod_deudor),
      cod_expediente: Number(form_liquidacion.cod_expediente),
      valor: total_obligacion
    })
      .then((response) => {
        console.log(response);
        handle_submit_detalles_liquidacion(response.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
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
                <TabList onChange={handle_change}>
                  <Tab label="Liquidacion" value="1" />
                  <Tab label="Generar Liquidacion" value="2" />
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ p: '20px 0' }}>
                {/* DATAGRID LIQUIDACION */}
                <TablaGeneral
                  showButtonExport
                  columns={columns}
                  rowsData={rows}
                  tittle='Liquidaciones'
                  staticscroll
                  stylescroll='780px'
                />
              </TabPanel>

              <TabPanel value="2" sx={{ p: '20px 0' }}>
                {/* INPUTS EDITAR LIQUIDACION */}
                <GenerarLiquidacion
                  total_obligacion={total_obligacion}
                  form_liquidacion={form_liquidacion}
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
            opciones_liquidacion={opciones_liquidacion}
            set_total_obligacion={set_total_obligacion}
            set_form_detalle_liquidacion={set_form_detalle_liquidacion}
          />
        </TabPanel>
      </TabContext>
    </>
  )
}