/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Grid,
  IconButton,
} from '@mui/material';
import { Title } from '../../../../../components/Title';
import {
  DataGrid,
  type GridColDef,
  type GridValueFormatterParams,
} from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import EditIcon from '@mui/icons-material/Edit';
import {
  set_current_plan_adquisiciones,
  set_current_mode_planes,
} from '../../../store/slice/indexPlanes';
import { DataContextAdquisiciones } from '../../context/context';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';
import { DialogPaaCodigos } from './DialogPaaCodigos';
import AddIcon from '@mui/icons-material/Add';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarPLanAnualAdquisiciones: React.FC = () => {
  const columns_adquisiciones: GridColDef[] = [
    {
      field: 'nombre_plan',
      headerName: 'NOMBRE PLAN',
      sortable: true,
      width: 250,
    },
    {
      field: 'descripcion',
      headerName: 'DESCRIPCIÓN',
      sortable: true,
      width: 250,
    },
    {
      field: 'mes_inicio',
      headerName: 'MES INICIO',
      sortable: true,
      width: 100,
    },
    {
      field: 'mes_oferta',
      headerName: 'MES OFERTA',
      sortable: true,
      width: 100,
    },
    {
      field: 'duracion',
      headerName: 'DURACIÓN',
      sortable: true,
      width: 100,
    },
    // {
    //   field: 'banco_valor',
    //   headerName: 'BANCO VALOR',
    //   sortable: true,
    //   width: 150,
    //   valueFormatter: (params: GridValueFormatterParams) => {
    //     const inversion = Number(params.value); // Convertir a número
    //     const formattedInversion = inversion.toLocaleString('es-AR', {
    //       style: 'currency',
    //       currency: 'ARS',
    //       minimumFractionDigits: 0,
    //       maximumFractionDigits: 2,
    //     });

    //     return formattedInversion;
    //   },
    // },
    {
      field: 'acciones',
      headerName: 'ACCIONES',
      sortable: true,
      width: 200,
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              dispatch(
                set_current_mode_planes({
                  ver: true,
                  crear: false,
                  editar: true,
                })
              );
              dispatch(set_current_plan_adquisiciones(params.row));
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
              <EditIcon
                titleAccess="Editar Plan Anual De Adquisiciones"
                sx={{
                  color: 'primary.main',
                  width: '18px',
                  height: '18px',
                }}
              />
            </Avatar>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              dispatch(set_current_plan_adquisiciones(params.row));
              handle_click_open();
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
              <AddIcon
                titleAccess="Agregar Códigos UNSPSC"
                sx={{
                  color: 'primary.main',
                  width: '18px',
                  height: '18px',
                }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];

  const { rows_plan_adquisiciones, fetch_data_plan_adquisiciones } = useContext(
    DataContextAdquisiciones
  );

  const [open_dialog, set_open_dialog] = useState<boolean>(false);

  const handle_click_open = (): void => {
    set_open_dialog(true);
  };

  // const {
  //   indicador: { id_indicador },
  // } = useAppSelector((state) => state.planes);s

  const dispatch = useAppDispatch();

  useEffect(() => {
    // if (id_indicador) {
    fetch_data_plan_adquisiciones();
    // }
  }, []);

  return (
    <>
      <Grid
        container
        spacing={2}
        m={2}
        p={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          m: '10px 0 20px 0',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        {/* <Grid item xs={12}>
          <Title title="Listado de planes " />
        </Grid> */}
        <>
          <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
              <>
                <ButtonGroup
                  style={{
                    margin: 7,
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  {download_xls({
                    nurseries: rows_plan_adquisiciones,
                    columns: columns_adquisiciones,
                  })}
                  {download_pdf({
                    nurseries: rows_plan_adquisiciones,
                    columns: columns_adquisiciones,
                    title: 'CREAR',
                  })}
                </ButtonGroup>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_plan_adquisiciones ?? []}
                  columns={columns_adquisiciones  ?? []}
                  pageSize={10}
                  // rowHeight={150}
                  rowsPerPageOptions={[10]}
                  getRowId={(row) => uuidv4()}
                />
              </>
            </Box>
          </Grid>
        </>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              disabled={false}
              onClick={() => {
                dispatch(
                  set_current_mode_planes({
                    ver: true,
                    crear: true,
                    editar: false,
                  })
                );
              }}
            >
              Agregar Plan Anueal De Adquisiciones
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <DialogPaaCodigos
        open_dialog={open_dialog}
        set_open_dialog={set_open_dialog}
      />
    </>
  );
};
