/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid, Box, Stack, TextField } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { type CarteraEdad } from '../interfaces/interfaces';
import { useSelector } from 'react-redux';
import { faker } from '@faker-js/faker';
import { Title } from '../../../../components/Title';

interface RootState {
  reportes_recaudo: {
    reportes_recaudo: CarteraEdad[];
  }
}

interface Filtro {
  filtro: string;
}

export const TablaCarteraEdad: React.FC<Filtro> = (props: Filtro) => {
  const [visible_rows, set_visible_rows] = useState(Array<CarteraEdad>);
  const [total, set_total] = useState(0);
  const { reportes_recaudo } = useSelector((state: RootState) => state.reportes_recaudo);

  const total_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(total)

  useEffect(() => {
    if(visible_rows.length !== 0) {
      let total = 0
      for(let i=0; i< visible_rows.length; i++){
        total = total + parseFloat(visible_rows[i].valor_sancion)
        set_total(total)
      }
    }
  }, [visible_rows])

  const columns: GridColDef[] = [
    {
      field: 'identificacion',
      headerName: 'NIT',
      width: 170,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nombre_deudor',
      headerName: 'Nombre Deudor',
      width: 300,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'expediente',
      headerName: 'Expediente',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'resolucion',
      headerName: 'Resolución',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'id_rango',
      headerName: 'Edad',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'valor_sancion',
      headerName: 'Total',
      width: 170,
      renderCell: (params) => {
        const precio_cop = new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "COP",
        }).format(params.value)
        return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {precio_cop}
          </div>
        )
      },
    },
  ];

  useEffect(() => {
    set_visible_rows(reportes_recaudo)
  }, [reportes_recaudo])

  return (
    <Box sx={{ width: '100%' }}>
      {
        visible_rows.length !== 0 ? (
          <Grid
            container
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '20px',
              mb: '20px',
              boxShadow: '0px 3px 6px #042F4A26',
            }}
          >
            <Title title={`${props.filtro}`} />
            <Grid item xs={12}>
              <Grid item>
                <Box sx={{ width: '100%' }}>
                  <DataGrid
                    autoHeight
                    disableSelectionOnClick
                    rows={visible_rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => faker.database.mongodbObjectId()}
                  />
                </Box>
              </Grid>
              <Stack
                direction="row"
                display='flex'
                justifyContent='flex-end'
              >
                <Grid item xs={12} sm={3} mt='30px'>
                  <TextField
                    label={<strong>Total General</strong>}
                    size="small"
                    fullWidth
                    value={total_cop}
                  />
                </Grid>
            </Stack>
            </Grid>
          </Grid>
        ) : null
      }
    </Box>
  );
}

interface RangoEdad {
  id_rango: number;
}

export const TablaCarteraEdadProps: React.FC<RangoEdad> = (props: RangoEdad) => {
  const [visible_rows, set_visible_rows] = useState(Array<CarteraEdad>);
  const [total, set_total] = useState(0);
  const { reportes_recaudo } = useSelector((state: RootState) => state.reportes_recaudo);

  const total_precio_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(total)

  useEffect(() => {
    const data = []
    for(let i=0; i<reportes_recaudo.length; i++){
      if(reportes_recaudo[i].id_rango === props.id_rango){
        data.push(reportes_recaudo[i])
      }
    }
    set_visible_rows(data)
  }, [reportes_recaudo, props.id_rango])

  useEffect(() => {
    if(visible_rows.length !== 0) {
      let total = 0
      for(let i=0; i< visible_rows.length; i++){
        total = total + parseFloat(visible_rows[i].valor_sancion)
        set_total(total)
      }
    }
  }, [visible_rows])

  const columns: GridColDef[] = [
    {
      field: 'identificacion',
      headerName: 'NIT',
      width: 170,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nombre_deudor',
      headerName: 'Nombre Deudor',
      width: 300,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'expediente',
      headerName: 'Expediente',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'resolucion',
      headerName: 'Resolución',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'id_rango',
      headerName: 'Edad',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'valor_sancion',
      headerName: 'Total',
      width: 170,
      renderCell: (params) => {
        const precio_cop = new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "COP",
        }).format(params.value)
        return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {precio_cop}
          </div>
        )
      },
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      {
        visible_rows.length !== 0 ? (
          <Grid
            container
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '20px',
              mb: '20px',
              boxShadow: '0px 3px 6px #042F4A26',
            }}
          >
            {
              props.id_rango === 1 ? <Title title='0 a 180 días' /> :
              props.id_rango === 2 ? <Title title='181 a 360 días' /> :
              props.id_rango === 3 ? <Title title='Mayor a 361 días' /> :
              null
            }
            <Grid item xs={12}>
              <Grid item>
                <Box sx={{ width: '100%' }}>
                  <DataGrid
                    autoHeight
                    disableSelectionOnClick
                    rows={visible_rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => faker.database.mongodbObjectId()}
                  />
                </Box>
              </Grid>
              <Stack
                direction="row"
                display='flex'
                justifyContent='flex-end'
              >
                <Grid item xs={12} sm={2.5} mt='30px'>
                  <TextField
                    label={<strong>Total General</strong>}
                    size="small"
                    fullWidth
                    value={total_precio_cop}
                  />
                </Grid>
            </Stack>
            </Grid>
          </Grid>
        ) : null
      }
    </Box>
  );
}
