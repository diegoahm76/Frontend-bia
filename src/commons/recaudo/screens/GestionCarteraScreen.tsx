import { type SyntheticEvent, useState, useEffect } from 'react';
import { Box, Grid, Tab } from "@mui/material"
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Title } from "../../../components"
import { EditarCartera } from '../components/GestionCartera/EditarCartera';
import { CobroCoactivo } from '../components/GestionCartera/CobroCoactivo';
import type { Liquidacion } from '../interfaces/liquidacion';
import axios from 'axios';
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
export const GestionCarteraScreen: React.FC = () => {
  const [liquidaciones, set_liquidaciones] = useState<Liquidacion[]>([]);
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
                  <Tab label="Gestion Cartera" value="1" />
                  <Tab label="Editar Cartera" value="2" />
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ p: '20px 0' }}>
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
                <EditarCartera />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>

      <TabContext value={position_tab}>
        <TabPanel value="2" sx={{ p: '20px 0' }}>
          <CobroCoactivo />
        </TabPanel>
      </TabContext>
    </>
  )
}