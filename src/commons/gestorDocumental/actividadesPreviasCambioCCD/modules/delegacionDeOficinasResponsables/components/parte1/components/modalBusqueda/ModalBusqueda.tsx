/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
//* libraries or main dependencies
import { useContext } from 'react';
import {
  Avatar,
  Button,
  ButtonGroup,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';

//* icons

import ChecklistIcon from '@mui/icons-material/Checklist';
import CloseIcon from '@mui/icons-material/Close';
import { ModalContextPSD } from '../../../../../../../permisosSeriesDoc/context/ModalContextPSD';
import { columnnsSelCCDPSD } from '../../../../../../../permisosSeriesDoc/components/parte1/ModalSeleccionCCDPSD/columns/columnsSelCCDPSD';
import { Title } from '../../../../../../../../../components';
import { download_xls } from '../../../../../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../../../../../documentos-descargar/PDF_descargar';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../hooks';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';
import { containerStyles } from './../../../../../../../tca/screens/utils/constants/constants';
import { setCcdOrganigramaCurrentAsiOfiResp } from '../../../../toolkit/slice/DelOfiResSlice';
import { validacionInicialDataPendientePorPersistir } from '../../../../toolkit/thunks/validacionInicial.service';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

interface Row {
  id: number;
  nombre: string;
  version: string;
  nombre_organigrama: string;
  version_organigrama: string;
  id_ccd: number;
}

interface Params {
  row: Row;
}
//* services (redux (slice and thunks))
// ! modal seleccion y busqueda de ccd - para inicio del proceso de permisos sobre series documentales
export const ModalBusquedaCcdOrganigrama = (params: any): JSX.Element => {
  //* navigate declaration
  const navigate = useNavigate();
  const { ccdList, setccdList } = params;
  //* --- dispatch declaration ----
  const dispatch = useAppDispatch();
  // ? ---- context declaration ----
  const { modalSeleccionCCD_PSD, handleSeleccionCCD_PSD, loadingButtonPSD } =
    useContext(ModalContextPSD);


  const handleSeleccionCcdOficinasResponsables = async (params: Params) => {
    const { id, nombre, version } = params.row;

    const validacionSeccionesPendientes = await validacionInicialDataPendientePorPersistir(params.row.id_ccd);

    if (validacionSeccionesPendientes?.data.length) {
      const array = Array.from({ length: 0 }, (_, i) => ({
        codigo: 'CCD' + i,
        nombre: `nombre${i}`
      }));

      const htmlText = `
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <p>asigne un responsable a ésta(s) unidad(es) de tipo de sección / subsección para continuar en este módulo.</p>
          <p><b>CCD seleccionado :</b> Nombre: ${nombre} - Versión: ${version}</p>
          <ul style = "padding:0">
            ${[...validacionSeccionesPendientes.data, ...array]
              .map((el: any) => `<li style="list-style: none; margin-top:5px;">Unidad: <b>${el.codigo}</b> - ${el.nombre}</li>`)
              .join('')}
          </ul>
        `;

      const swalOptions = {
        title: 'No puede seleccionar este CCD',
        html: htmlText,
        icon: 'warning',
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: 'Ir a módulo de asignación de unidades responsables',
        cancelButtonText: 'Ir al módulo de homologación de secciones persistentes',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      } as any;

      
      await Swal.fire(swalOptions).then(async (result) => {
        const navigateTo = result.isConfirmed
        ? '/app/gestor_documental/ccd/actividades_previas_cambio_ccd/asignaciones_unidades_responsables'
        : '/app/gestor_documental/ccd/actividades_previas_cambio_ccd/homologacion_secciones_persistentes';
        navigate(navigateTo);
      });

      return;
    }

    dispatch(setCcdOrganigramaCurrentAsiOfiResp(params.row));
  };

  const columns_ccds: GridColDef[] = [
    ...columnnsSelCCDPSD,
    {
      headerName: 'Usado',
      field: 'usado',
      width: 100,
      renderCell: (params: { row: { usado: boolean } }) => {
        return params.row.usado ? (
          <Chip size="small" label="SI" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="NO" color="info" variant="outlined" />
        );
      },
    },
    {
      headerName: 'Actual',
      field: 'is_actual',
      width: 100,
      renderCell: (params: { row: { actual: boolean } }) => {
        return params.row.actual ? (
          <Chip size="small" label="Si" color="info" variant="outlined" />
        ) : (
          <Chip size="small" label="No" color="warning" variant="outlined" />
        );
      },
    },
    {
      headerName: 'Fecha terminado',
      field: 'fecha_terminado',
      width: 170,
      renderCell: (params: { row: { fecha_terminado: string } }) => {
        const date = new Date(params.row.fecha_terminado);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      },
    },
    {
      headerName: 'Seleccionar',
      field: 'accion',
      renderCell: (params: any) => (
        <>
          <Tooltip title="Seleccionar ccd" arrow>
            <IconButton
              onClick={() => {
                handleSeleccionCcdOficinasResponsables(params);
                handleSeleccionCCD_PSD(false);
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
                <ChecklistIcon
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={modalSeleccionCCD_PSD}
      onClose={() => {
        setccdList([]);
        handleSeleccionCCD_PSD(false);
      }}
    >
      <DialogTitle>
        <Title title="Consultar delegación de oficinas responsables de expedientes del CCD" />
      </DialogTitle>
      <DialogContent sx={{ mb: '0px' }}>
        <ButtonGroup
          style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
        >
          {download_xls({ nurseries: ccdList ?? [], columns: columns_ccds })}
          {download_pdf({
            nurseries: ccdList ?? [],
            columns: columns_ccds,
            title: 'Selección de CCD persmisos sobre series documentales',
          })}
        </ButtonGroup>
        {loadingButtonPSD ? (
          <Grid
            container
            sx={{
              ...containerStyles,
              boxShadow: 'none',
              background: 'none',
              position: 'static',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Loader altura={50} />
          </Grid>
        ) : (
          <DataGrid
            density="compact"
            autoHeight
            rows={ccdList ?? []}
            columns={columns_ccds ?? []}
            pageSize={10}
            rowsPerPageOptions={[10]}
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={() => uuidv4()}
          />
        )}
      </DialogContent>
      <Divider />
      <DialogActions>
        <Stack
          direction="row"
          spacing={2}
          sx={{ mr: '15px', mb: '10px', mt: '10px' }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleSeleccionCCD_PSD(false);
              setccdList([]);
            }}
            startIcon={<CloseIcon />}
          >
            CERRAR
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
