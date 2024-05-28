import { Grid, Box, Checkbox, TextField, Stack, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import {
  type Obligacion,
  type ObligacionesUsuario,
} from '../../interfaces/interfaces';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { api } from '../../../../../api/axios';
import { obligaciones_seleccionadas } from '../../slices/ObligacionesSlice';
import { DocumentoEstadoCuenta } from '../DocumentoEstadoCuenta';
import ArticleIcon from '@mui/icons-material/Article';
import { get_datos_deudor } from '../../slices/DeudoresSlice';
import { get_datos_contacto_solicitud } from '../../slices/SolicitudSlice';

interface RootState {
  obligaciones: {
    obligaciones: ObligacionesUsuario;
  };
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaObligacionesGralUsuario: React.FC = () => {
  const [show_estado_cuenta, set_show_estado_cuenta] = useState(false);
  const { obligaciones } = useSelector(
    (state: RootState) => state.obligaciones
  );
  const [lista_obligaciones, set_lista_obligaciones] = useState(
    Array<Obligacion>
  );
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();

  const load_obligaciones = async () => {
    try {
      const data = await api.get('/recaudo/pagos/consultar/');
      console.log(data);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  const generate_state = (): void => {
    set_show_estado_cuenta(true);
  }

  useEffect(() => {
    set_lista_obligaciones(obligaciones.obligaciones);
    // load_obligaciones()
  }, [obligaciones.obligaciones]);

  useEffect(() => {
    console.log(lista_obligaciones);
  }, [lista_obligaciones])

  const columns: GridColDef[] = [
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
      field: 'inicio',
      headerName: 'Fecha Inicio',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {dayjs(params.value).format('DD/MM/YYYY')}
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
        const precio_cop = new Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'COP',
        }).format(params.value);
        return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {precio_cop}
          </div>
        );
      },
    },
    {
      field: 'valor_intereses',
      headerName: 'Valor Intereses',
      width: 150,
      renderCell: (params) => {
        const precio_cop = new Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'COP',
        }).format(params.value);
        return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {precio_cop}
          </div>
        );
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
                    rows={lista_obligaciones || []}
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
                sx={{ mb: '20px', mt: '1rem' }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<ArticleIcon />}
                  sx={{ marginTop: '30px' }}
                  onClick={generate_state}
                >
                  Ver Documento
                </Button>
              </Stack>
            </Grid>
          </Grid>
          {show_estado_cuenta && <DocumentoEstadoCuenta
            dataClean={lista_obligaciones}
            obligaciones={obligaciones}
          />}
        </>
  );
};
