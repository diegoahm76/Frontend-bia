/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid, Box, IconButton, Avatar, Tooltip, Checkbox, TextField, Stack, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import ArticleIcon from '@mui/icons-material/Article';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obligaciones_seleccionadas } from '../slices/ObligacionesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { type Obligacion, type ObligacionesUsuario } from '../interfaces/interfaces';

interface RootState {
  obligaciones: {
    obligaciones: ObligacionesUsuario;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaObligacionesUsuario: React.FC = () => {
  const [selected, set_selected] = useState<readonly string[]>([]);
  const [capital, set_capital] = useState(0);
  const [intereses, set_intereses] = useState(0);
  const [total, set_total] = useState(0);
  const { obligaciones } = useSelector((state: RootState) => state.obligaciones);
  const [lista_obligaciones, set_lista_obligaciones] = useState(Array<Obligacion>)
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();

  useEffect(() => {
    set_lista_obligaciones(obligaciones.obligaciones)
  }, [obligaciones.obligaciones])

  const handle_submit = async () => {
    const arr_registro = []
    for(let i=0; i<lista_obligaciones.length; i++){
      for(let j=0; j<selected.length; j++){
        if(lista_obligaciones[i].nombre === selected[j]){
          arr_registro.push(lista_obligaciones[i])
        }
      }
    }
    try {
      dispatch(obligaciones_seleccionadas(arr_registro));
    } catch (error: any) {
      throw new Error(error);
    }
  };

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
      field: 'id_expediente',
      headerName: 'Expediente',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nroResolucion',
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
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'valor_intereses',
      headerName: 'Valor Intereses',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
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
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Ver">
                <IconButton
                  onClick={() => {}}
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
                    <ArticleIcon
                      sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                    />

                  </Avatar>
                </IconButton>
              </Tooltip>
            </>
        )
      },
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

  useEffect(() => {
    let sub_capital = 0
    let sub_intereses = 0
    for(let i=0; i< lista_obligaciones.length; i++){
      for(let j=0; j< selected.length; j++){
        if(lista_obligaciones[i].nombre === selected[j]){
          sub_capital = sub_capital + parseFloat(lista_obligaciones[i].monto_inicial)
          sub_intereses = sub_intereses + parseFloat(lista_obligaciones[i].valor_intereses)
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
                rows={lista_obligaciones}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.id_expediente}
              />
            </Box>
          </Grid>
          <Stack
            direction="row"
            display='flex'
            justifyContent='flex-end'
          >
            <Grid item xs={12} sm={2} mt='30px' mr='10px'>
              <TextField
                label="Total Capital"
                size="small"
                fullWidth
                value={capital}
              />
            </Grid>
            <Grid item xs={12} sm={2} mt='30px' mr='10px'>
              <TextField
                label="Total Intereses"
                size="small"
                fullWidth
                value={intereses}
              />
            </Grid>
            <Grid item xs={12} sm={2} mt='30px'>
              <TextField
                label={<strong>Gran Total a Deber</strong>}
                size="small"
                fullWidth
                value={total}
              />
            </Grid>
        </Stack>
        <Stack
          direction="row"
          justifyContent="right"
          spacing={2}
          sx={{ mb: '20px' }}
        >
          <Button
            color='primary'
            variant='contained'
            startIcon={<Add />}
            sx={{ marginTop: '30px' }}
            onClick={() => {
              navigate('../registro')
              void handle_submit()
            }}
          >
          Crear Facilidad de Pago
          </Button>
        </Stack>
        </Grid>
      </Grid>
    </>
  );
}
