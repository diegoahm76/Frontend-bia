/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Box, Grid, Tab } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { GenerarLiquidacion } from '../components/GenerarLiquidacion/GenerarLiquidacion';
import { Title } from '../../../../components/Title';
import { api } from '../../../../api/axios';

export interface Deudor {
  id: number;
  identificacion: string;
  nombres: string;
  apellidos: string;
}

export interface FormLiquidacion {
  id_deudor: string;
  id_expediente: string;
  ciclo_liquidacion: string;
  periodo_liquidacion: string;
  valor?: number;
  estado?: string;
}


export const ProcesoLiquidacionScreen: React.FC = () => {
  const [loading, set_loading] = useState(true);
  const [deudores, set_deudores] = useState<Deudor[]>([]);
  const [position_tab, set_position_tab] = useState('1');





  const columns_deudores: GridColDef[] = [
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
      field: 'Estado',
      headerName: 'Estado',
      minWidth: 210,
      flex: 0.1,
      valueGetter: (params) => {
        return params.value ?? 'Sin tipo estaddo';
      }
    },
    {
      field: 'Periodo',
      headerName: 'Periodo',
      minWidth: 210,
      flex: 0.1,
      valueGetter: (params) => {
        return params.value ?? 'Sin Periodo  ';
      }
    },
    {
      field: 'Tipo de cobro',
      headerName: 'Tipo de cobro',
      minWidth: 210,
      flex: 0.1,
      valueGetter: (params) => {
        return params.value ?? 'Sin Tipo de cobro  ';
      }
    },
  ];




  const handle_position_tab_change = (event: SyntheticEvent, newValue: string): void => {
    set_position_tab(newValue);
    if (newValue === '1') {
    }
  }




  useEffect(() => {
    api.get('recaudo/liquidaciones/deudores')
      .then((response) => {
        set_deudores(response.data.data);
      })
      .catch((error) => {
        //  console.log('')(error);
      }).finally(() => {
        set_loading(false);
      });
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
          boxShadow: '0px 3px 6px #042F4A26'
        }}
      >

        <Grid item xs={12}>
          <Title title="Proceso de Liquidación personal"></Title>
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
                <GenerarLiquidacion />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
