/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid, Box, Checkbox, TextField, Stack } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { type Obligacion } from '../interfaces/interfaces';
import { faker } from '@faker-js/faker';

interface RootState {
  obligaciones: {
    obligaciones: Obligacion[];
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaObligacionesUsuarioInterno: React.FC = () => {
  const [selected, set_selected] = useState<readonly string[]>([]);
  const [capital, set_capital] = useState(0);
  const [intereses, set_intereses] = useState(0);
  const [total, set_total] = useState(0);
  const { obligaciones } = useSelector((state: RootState) => state.obligaciones);

  const columns: GridColDef[] = [
    {
      field: 'checkbox',
      headerName: 'Solicitar Fac. Pago',
      width: 150,
      renderCell: (params) => {
        return (
          <Checkbox
            onClick={(event) => {
              handle_click(event, params.row.nombre)
            }}
          />
        )
      },
    },
    {
      field: 'nombre',
      headerName: 'Nombre Obligación',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'fecha_inicio',
      headerName: 'Fecha Inicio',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nro_expediente',
      headerName: 'Expediente',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nro_resolucion',
      headerName: 'Nro Resolución',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'monto_inicial',
      headerName: 'Valor Capital',
      width: 150,
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
    {
      field: 'valor_intereses',
      headerName: 'Valor Intereses',
      width: 150,
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
    {
      field: 'dias_mora',
      headerName: 'Días Mora',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];

  const handle_click = (event: React.MouseEvent<unknown>, name: string) => {
    const selected_index = selected.indexOf(name);
    let new_selected: readonly string[] = [];

    if (selected_index === -1) {
      new_selected = new_selected.concat(selected, name);
    } else if (selected_index === 0) {
      new_selected = new_selected.concat(selected.slice(1));
    } else if (selected_index === selected.length - 1) {
      new_selected = new_selected.concat(selected.slice(0, -1));
    } else if (selected_index > 0) {
      new_selected = new_selected.concat(
        selected.slice(0, selected_index),
        selected.slice(selected_index + 1),
      );
    }
    set_selected(new_selected);
  };

  const total_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(total)

  const capital_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(capital)

  const intereses_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(intereses)

  useEffect(() => {
    let sub_capital = 0
    let sub_intereses = 0
    for(let i=0; i< obligaciones.length; i++){
      for(let j=0; j< selected.length; j++){
        if(obligaciones[i].nombre === selected[j]){
          sub_capital = sub_capital + parseFloat(obligaciones[i].monto_inicial)
          sub_intereses = sub_intereses + parseFloat(obligaciones[i].valor_intereses)
          set_capital(sub_capital)
          set_intereses(sub_intereses)
        }
      }
    }
    if(selected.length === 0){
      set_capital(0)
      set_intereses(0)
    }
    set_total(capital + intereses)
  }, [selected, capital, intereses])

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
        }}
      >
        <Grid item xs={12}>
          <Grid item>
            <Box sx={{ width: '100%' }}>
              <DataGrid
                autoHeight
                disableSelectionOnClick
                rows={obligaciones}
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
            justifyContent="right"
            spacing={2}
            sx={{ mt: '30px' }}
          >
            <Grid item xs={12} sm={2.5}>
              <TextField
                label="Total Capital"
                size="small"
                fullWidth
                value={capital_cop}
              />
            </Grid>
            <Grid item xs={12} sm={2.5}>
              <TextField
                label="Total Intereses"
                size="small"
                fullWidth
                value={intereses_cop}
              />
            </Grid>
            <Grid item xs={12}  sm={2.5}>
              <TextField
                label={<strong>Gran Total a Deber</strong>}
                size="small"
                fullWidth
                value={total_cop}
              />
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
