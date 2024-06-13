/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import { FC, useContext, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { AuthSlice } from '../../../auth/interfaces';
import { control_error, control_success } from '../../../../helpers';
import { api } from '../../../../api/axios';
import { Title } from '../../../../components';
import ExportDocs from '../../controlDeInventario/screens/ExportDocs';
import { control_warning } from '../../configuracion/store/thunks/BodegaThunks';

interface props {
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  currentBien: any;
}

export const DialogMAFI: React.FC<props> = ({showDialog, setShowDialog, currentBien}) => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* redux states

  const {
    userinfo: { id_persona },
  } = useAppSelector((state: AuthSlice) => state.auth);

  const [movimientos, setMovimientos] = useState<any[]>([]);



  //* useState

   const getHistorialMovimientos = async () => {
    try {
      const url = `almacen/reportes/reporte-historial-moviminetos/get/?id_bien=${currentBien?.id_bien}`;
      const { data } = await api.get(url);
      setMovimientos(data?.data);
      if (data && data?.data?.length) {
        return data.data;
      }else{
        control_warning('No se encontraron movimientos');
      }
    } catch (error) {
      control_error('Ha ocurrido un error al buscar las movimientos');
    }
  }

  useEffect(() => {
    if(showDialog){
      getHistorialMovimientos();
    }
  }, [showDialog]);

  // const alert_cancelacion = (id: string) => {
  //   swal.fire({
  //     title: '¿Deseas cancelar la asignación?',
  //     text: 'Al cancelar la asignación, la persona asignada no podrá realizar ninguna acción sobre el documento',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Continuar',
  //     cancelButtonText: 'Cancelar',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //     }
  //   });
  // }

  const columns: GridColDef[] = [

    {
      field: 'codigo_bien',
      headerName: 'Código bien',
      minWidth: 120,
      flex: 1,
    },
    {
      field: 'nombre_bien',
      headerName: 'Nombre bien',
      minWidth: 180,
      flex: 1,
    },
    {
      field: 'serial',
      headerName: 'Serial / Placa',
      minWidth: 160,
      flex: 1,
    },
    {
      field: 'nombre_marca',
      headerName: 'Marca',
      minWidth: 160,
      flex: 1,
    },
    {
      field: 'fecha_ultimo_movimiento',
      headerName: 'Fecha último movimiento',
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.row.fecha_ultimo_movimiento?.split('T')[0]}
        </div>
      ),
    },
    {
      field: 'categoria',
      headerName: 'Categoría',
      minWidth: 160,
      flex: 1,
    },
    {
      field: 'nombre_tipo_entrada',
      headerName: 'Tipo entrada',
      minWidth: 160,
      flex: 1,
    },
    {
      field: 'responsable_actual',
      headerName: 'Responsable actual',
      minWidth: 160,
      flex: 1,
    },
    {
      field: 'estado_activo',
      headerName: 'Estado activo',
      minWidth: 160,
      flex: 1,
    },
    {
      field: 'ubicacion',
      headerName: 'Ubicación',
      minWidth: 160,
      flex: 1,
    },
  ];

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={showDialog}
        onClose={() => {
          setShowDialog(false);
        }}
      >
        <Box component="form">
          <DialogTitle>
            <Title title="Histórico movimientos del bien" />
          </DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              mb: '0px',
              justifyContent: 'center',
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={12}
                lg={12}
                md={12}
                sx={{
                  marginY: '1.5rem',
                }}
              >
                <ExportDocs cols={columns} resultado_busqueda={movimientos} filtros={null} title={'Histórico movimientos del bien'} nombre_archivo={'Histórico movimientos del bien'} filtros_pdf={null}></ExportDocs>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={movimientos ?? []}
                  columns={columns ?? []}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  getRowId={(row: any) => row.id_movimiento}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Stack
              direction="row"
              spacing={2}
              sx={{ mr: '15px', mb: '10px', mt: '10px' }}
            >
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  // dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(null));
                  setShowDialog(false);
                }}
                startIcon={<CloseIcon />}
              >
                CERRAR
              </Button>
            </Stack>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};
