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
import {
  DataGrid,
  type GridValueGetterParams,
  type GridColDef,
} from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';

//* icons

import ChecklistIcon from '@mui/icons-material/Checklist';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from '../../../../../../../../hooks';
import { ModalContextPSD } from '../../../../../../permisosSeriesDoc/context/ModalContextPSD';
import { columnnsSelCCDPSD } from '../../../../../../permisosSeriesDoc/components/parte1/ModalSeleccionCCDPSD/columns/columnsSelCCDPSD';
import { Title } from '../../../../../../../../components';
import { download_xls } from '../../../../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../../../../documentos-descargar/PDF_descargar';
import { containerStyles } from './../../../../../../tca/screens/utils/constants/constants';
import { Loader } from '../../../../../../../../utils/Loader/Loader';
import { getCcdActual } from '../../../toolkit/thunks/busquedaOrgCcd.service';
import { useNavigate } from 'react-router-dom';
import { setCcdOrganigramaCurrent, setSeccionesPersistentes } from '../../../toolkit/slice/types/AsignacionUniResp';
import { getSeccionesPersistentesCcdNuevo } from '../../../toolkit/thunks/seccPersistentesCcdNuevo.service';

//* services (redux (slice and thunks))
// ! modal seleccion y busqueda de ccd - para inicio del proceso de permisos sobre series documentales
export const ModalBusquedaCcdOrganigrama = (params: any): JSX.Element => {
  const { ccdList, setccdList } = params;
  //* navigate declaration
  const navigate = useNavigate();
  //* --- dispatch declaration ----
  const dispatch = useAppDispatch();
  // ? ---- context declaration ----
  const { modalSeleccionCCD_PSD, handleSeleccionCCD_PSD, loadingButtonPSD } =
    useContext(ModalContextPSD);

  const handleCcdConincidenteConIdOrganigrama = async (
    params: GridValueGetterParams
  ) => {
    try {
      const resHomologacionesUnidades = await getCcdActual(params, navigate);
      if (resHomologacionesUnidades) {
        console.log(' no se puede continuar con la ejecución del módulo');
        return;
      }

      //* seleccionar los parametros con ccd organigrma current para usar dentro del módulo
      dispatch(setCcdOrganigramaCurrent(params.row));
      // ? traer las secciones persistentes por el id del ccd nuevo (seleccionado)
      const seccionesPersistentes = await getSeccionesPersistentesCcdNuevo(
        params.row.id_ccd
      );

      //* asignar las secciones persistentes al estado de redux
      dispatch(setSeccionesPersistentes(seccionesPersistentes));

      console.log('siuuuuu bitch');
    } catch (error) {
      console.error(error);
    }
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
                console.log(params.row);
                handleCcdConincidenteConIdOrganigrama(params).then(() => {
                  // ? se limpian las opciones del modal y se cierra el modal
                  setccdList([]);
                  handleSeleccionCCD_PSD(false);
                });
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
        <Title title="Consulta para asignación secciones responsables del CCD" />
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
