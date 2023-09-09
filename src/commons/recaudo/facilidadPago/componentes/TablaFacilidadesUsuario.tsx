import { Grid, Box, IconButton, Avatar, Tooltip } from '@mui/material';
import { Article } from '@mui/icons-material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { type FacilidadPagoUsuario } from '../interfaces/interfaces';
import { get_facilidad_solicitud } from '../slices/SolicitudSlice';
import { get_seguimiento_fac } from '../slices/FacilidadesSlice';
import { get_validacion_plan_pagos } from '../slices/PlanPagosSlice';
import { get_validacion_resolucion } from '../slices/ResolucionSlice';
import { faker } from '@faker-js/faker';

interface RootState {
  facilidades: {
    facilidades: FacilidadPagoUsuario[];
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaFacilidadesUsuario: React.FC = () => {
  const [visible_rows, set_visible_rows] = useState(Array<FacilidadPagoUsuario>);
  const { facilidades } = useSelector((state: RootState) => state.facilidades);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();

  const capitalize = (str: string): string => {
    const str_min = str.toLowerCase();
    return str_min.charAt(0).toUpperCase() + str_min.slice(1);
  };

  useEffect(() => {
    set_visible_rows(facilidades)
  }, [facilidades])

  const columns: GridColDef[] = [
    {
      field: 'numero_radicacion',
      headerName: 'Nro Resolución',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'valor_total',
      headerName: 'Valor Total',
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
      field: 'estado',
      headerName: 'Estado',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {capitalize(params.value)}
        </div>
      ),
    },
    {
      field: 'acciones',
      headerName: 'Acción',
      width: 150,
      renderCell: (params) => {
        return capitalize(params.row.estado) !== 'Sin responder'? (
          <Tooltip title="Ver">
            <IconButton
              onClick={() => {
                try {
                  void dispatch(get_seguimiento_fac(params.row.id));
                  void dispatch(get_facilidad_solicitud(params.row.id));
                  void dispatch(get_validacion_plan_pagos(params.row.id));
                  void dispatch(get_validacion_resolucion(params.row.id));
                  navigate('../seguimiento');
                } catch (error: any) {
                  throw new Error(error);
                }
              }}
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
                <Article
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip disableFocusListener disableHoverListener disableInteractive disableTouchListener title="Ver">
            <IconButton
              disabled
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
                <Article
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        )
      }
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
                rows={visible_rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => faker.database.mongodbObjectId()}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
