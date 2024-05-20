/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Chip,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { Title } from '../../../../components/Title';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { set_current_accion_correctiva, set_current_mode_planes } from '../../../seguimirntoPlanes/store/slice/indexPlanes';
import { DataContextAccionesCorrectivas } from '../context/context';
// import { DataContextEjeEstrategico } from '../../context/context';
// import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import EditIcon from '@mui/icons-material/Edit';
import { get_tipo_acciones } from '../services/services';
import { control_error } from '../../../../helpers';
// import {
//   set_current_eje_estrategico,
//   set_current_mode_planes,
// } from '../../../store/slice/indexPlanes';
// import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';
// import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarAccionesCorrectivas: React.FC = () => {

  const { tramite } = useAppSelector((state) => state.planes);
  const [acciones_correctivas, set_acciones_correctivas] = useState<any[]>([]);
  const [data_tramite, set_data_tramite] = useState({
    numero_documento: '',
    nombre_solicitante: '',
    cedula_catastral: '',
    grupo_funcional: '',
  });

  const dispatch = useAppDispatch();
  const { id_tramite, rows_acciones, set_id_expediente, set_id_tramite, set_id_accion, fetch_data_acciones_correctivas } = useContext(DataContextAccionesCorrectivas);

  const get_traer_acciones = async (): Promise<void> => {
    try {
      const response = await get_tipo_acciones();
      set_acciones_correctivas(response);
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    }
  };

  useEffect(() => {
    if (tramite) {
      set_data_tramite({
        numero_documento: tramite.numero_documento,
        nombre_solicitante: tramite.nombre_solicitante,
        cedula_catastral: tramite.cedula_catastral,
        grupo_funcional: tramite.grupo_funcional,
      });
    }
    get_traer_acciones();
  }, []);

  const columns_eje: GridColDef[] = [
    {
      field: 'nombre_accion',
      headerName: 'NOMBRE DE LA ACCIÓN',
      sortable: true,
      minWidth: 300,
      flex: 1,
      valueGetter: (params) => {
        if(params.row.id_tipo_accion && acciones_correctivas.length){
          const accion = acciones_correctivas.find((item) => item.id_tipo_accion === params.row.id_tipo_accion);
          return accion.nombre_tipo_accion || 'Sin nombre';
        }
      }
    },
    {
      field: 'descripcion',
      headerName: 'DESCRIPCIÓN ACCIÓN',
      sortable: true,
      minWidth: 300,
      flex: 1,
      valueGetter: (params) => {
        if(params.row.id_tipo_accion && acciones_correctivas.length){
          const accion = acciones_correctivas.find((item) => item.id_tipo_accion === params.row.id_tipo_accion);
          return accion.descripcion || 'Sin nombre';
        }
      }
    },
    {
      field: 'observacion_accion',
      headerName: 'OBSERVACIONES DE LA ACCIÓN',
      sortable: true,
      minWidth: 300,
      flex: 1
    },
    {
      field: 'fecha_creacion',
      headerName: 'FECHA CREACIÓN',
      sortable: true,
      minWidth: 180,
      flex: 1,
      valueGetter: (params) => dayjs(params.row.fecha_creacion).format('YYYY-MM-DD')
    },
    {
      field: 'fecha_cumplimiento',
      headerName: 'FECHA CUMPLIDA',
      sortable: true,
      minWidth: 180,
      flex: 1
    },
    {
      field: 'cumplida',
      headerName: '¿CUMPLIDA?',
      sortable: true,
      minWidth: 250,
      flex: 1,
      renderCell: (params) => (params.value ? 'Sí' : 'No'),
    },
    {
      field: 'nombre_tramite',
      headerName: 'NOMBRE TRÁMITE',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'tipo_tramite',
      headerName: 'TIPO DE TRÁMITE',
      sortable: true,
      minWidth: 200,
      flex: 1
    },
    {
      field: 'acciones',
      headerName: 'ACCIONES',
      sortable: true,
      minWidth: 120,
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              set_id_expediente(params.row.id_expediente);
              set_id_tramite(params.row.id_tramite);
              set_id_accion(params.row.id_accion);
              dispatch(
                set_current_mode_planes({
                  ver: true,
                  crear: false,
                  editar: true,
                })
              );
              dispatch(set_current_accion_correctiva(params.row));
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
                titleAccess="Editar Acción Correctiva"
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

  useEffect(() => {
    if (id_tramite) {
      fetch_data_acciones_correctivas();
    }
  }, [id_tramite]);

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
        <Grid item xs={12}>
          <Title title="Información del Trámite " />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            label="Cédula o NIT"
            value={data_tramite.numero_documento}
            size="small"
            margin="dense"
            disabled
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <TextField
            fullWidth
            label="Nombre del Solicitante"
            value={data_tramite.nombre_solicitante}
            size="small"
            margin="dense"
            disabled
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            label="Cédula Catastral"
            value={data_tramite.cedula_catastral}
            size="small"
            margin="dense"
            disabled
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <TextField
            fullWidth
            label="Grupo Funcional"
            value={data_tramite.grupo_funcional}
            size="small"
            margin="dense"
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <Title title="Listado de Acciones Correctivas " />
        </Grid>
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
                    nurseries: rows_acciones,
                    columns: columns_eje,
                  })}
                  {download_pdf({
                    nurseries: rows_acciones,
                    columns: columns_eje,
                    title: 'CREAR ACCIÓN CORRECTIVA',
                  })}
                </ButtonGroup>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_acciones ?? []}
                  columns={columns_eje ?? []}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  getRowId={(row) => uuidv4()}
                  getRowHeight={() => 'auto'}
                />
              </>
            </Box>
          </Grid>
        </>
        <Grid container spacing={2} my={2} justifyContent="flex-end">
          <Grid item>
            <Button
              variant="contained"
              color="error"
              disabled={false}
              onClick={() => {
                dispatch(
                  set_current_mode_planes({
                    ver: false,
                    crear: false,
                    editar: false,
                  })
                );
              }}
            >
              Cerrar
            </Button>
          </Grid>
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
              Agregar Acción Correctiva
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
