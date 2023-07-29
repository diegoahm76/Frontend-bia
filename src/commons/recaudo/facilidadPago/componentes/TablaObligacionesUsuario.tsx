/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid, Box, Checkbox, TextField, Stack, Button, DialogActions, Dialog, DialogTitle } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obligaciones_seleccionadas } from '../slices/ObligacionesSlice';
import { get_datos_deudor } from '../slices/DeudoresSlice';
import { useDispatch, useSelector } from 'react-redux';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { type Obligacion, type ObligacionesUsuario } from '../interfaces/interfaces';
import { faker } from '@faker-js/faker';

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
  const [modal, set_modal] = useState(false);
  const [modal_opcion, set_modal_opcion] = useState(0);
  const { obligaciones } = useSelector((state: RootState) => state.obligaciones);
  const [lista_obligaciones, set_lista_obligaciones] = useState(Array<Obligacion>)
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();

  const handle_open = (opcion: number) => {
    set_modal(true)
    set_modal_opcion(opcion)
  }
  const handle_close = () => { set_modal(false) }

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
      void dispatch(get_datos_deudor(obligaciones.id_deudor));
    } catch (error: any) {
      throw new Error(error);
    }
  };

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

  const intereses_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(intereses)

  const capital_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(capital)

  useEffect(() => {
    set_lista_obligaciones(obligaciones.obligaciones)
  }, [obligaciones.obligaciones])

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
      field: 'numero_resolucion',
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
            <Grid item xs={12} sm={2.5}>
              <TextField
                label={<strong>Gran Total a Deber</strong>}
                size="small"
                fullWidth
                value={total_cop}
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
              if(obligaciones.tiene_facilidad){
                handle_open(1);
              } else if(selected.length === 0){
                handle_open(2);
              } else {
                navigate('../registro');
                void handle_submit();
              }
            }}
          >
            Crear Facilidad de Pago
          </Button>
        </Stack>
        </Grid>
      </Grid>
      <Dialog
        open={modal}
        onClose={handle_close}
        maxWidth="xs"
      >
        <Box component="form">
          {
            modal_opcion === 1 ?
              <DialogTitle>{`El usuario ${obligaciones.nombre_completo} ya cuenta con una Facilidad de Pago`}</DialogTitle> :
            modal_opcion === 2 ?
              <DialogTitle>Para continuar a la página de registro seleccione al menos una de las obligaciones</DialogTitle> : null
          }
          <DialogActions>
            <Button
              variant='outlined'
              color="primary"
              startIcon={<Close />}
              onClick={handle_close}
            >
              Cerrar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
