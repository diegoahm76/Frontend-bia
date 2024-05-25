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
import { ModalContextPSD } from '../../../../../../../permisosSeriesDoc/context/ModalContextPSD';
import { columnnsSelCCDPSD } from '../../../../../../../permisosSeriesDoc/components/parte1/ModalSeleccionCCDPSD/columns/columnsSelCCDPSD';
import { Title } from '../../../../../../../../../components';
import { download_xls } from '../../../../../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../../../../../documentos-descargar/PDF_descargar';
import { useAppDispatch } from '../../../../../../../../../hooks';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';
import { containerStyles } from './../../../../../../../tca/screens/utils/constants/constants';
import {
  setAgrupacionesPersistentesSerieSubserie,
  setAllElements,
  setCcdOrganigramaCurrent,
  setCurrentPersistenciaSeccionSubseccion,
  setHomologacionAgrupacionesSerieSubserie,
  setHomologacionUnidades,
  setUnidadesPersistentes,
  reset_states,
} from '../../../../toolkit/slice/HomologacionesSeriesSlice';
import {
  fnGetHomologacionUnidades,
  fnGetUnidadesPersistentes,
} from '../../../../toolkit/thunks/seccionesPersistentes.service';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import Swal from 'sweetalert2';

//* services (redux (slice and thunks))
// ! modal seleccion y busqueda de ccd - para inicio del proceso de permisos sobre series documentales
export const ModalBusquedaCcdOrganigrama = (params: any): JSX.Element => {
  const { ccdList, setccdList } = params;
  //* --- dispatch declaration ----
  const dispatch = useAppDispatch();
  // ? ---- context declaration ----
  const { modalSeleccionCCD_PSD, handleSeleccionCCD_PSD, loadingButtonPSD } =
    useContext(ModalContextPSD);
  const { handleGeneralLoading } = useContext(ModalAndLoadingContext);

  const handleHomologacionUnidades = async (params: GridValueGetterParams) => {
    //* se limpian todos los estados que se relacionan con la homologación de unidades
    dispatch(setHomologacionAgrupacionesSerieSubserie([]));
    dispatch(setAgrupacionesPersistentesSerieSubserie([]));
    dispatch(setCurrentPersistenciaSeccionSubseccion(null));
    dispatch(setAllElements({}));

    try {
      const resHomologacionesUnidades = await fnGetHomologacionUnidades(
        params.row.id_ccd,
        handleGeneralLoading,
        () => dispatch(reset_states())
      );
      // ! se mezcla la información necesaria para poder tener todos los datos disponibles
      const resUnidadesPersistentes = await fnGetUnidadesPersistentes(
        params.row.id_ccd,
        handleGeneralLoading
      );

      if (
        resHomologacionesUnidades?.coincidencias.length === 0 &&
        resUnidadesPersistentes?.unidades_persistentes.length === 0
      ) {
        await Swal.fire({
          icon: 'warning',
          title: '¡ATENCIÓN!',
          text: 'No hay unidades coincidentes y/o persistentes para este CCD, seleccione un CCD diferente para continuar',
          showCloseButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        dispatch(reset_states());
        return;
      }

      const infoToReturn =
        resHomologacionesUnidades?.coincidencias.map((item: any) => {
          return {
            ...item,
            mismo_organigrama: resHomologacionesUnidades?.mismo_organigrama,
            id_ccd_actual: resHomologacionesUnidades?.id_ccd_actual,
            id_ccd_nuevo: params.row.id_ccd,
          };
        }) || [];

      if (resHomologacionesUnidades?.mismo_organigrama) {
        dispatch(
          setUnidadesPersistentes(
            infoToReturn.length > 0
              ? infoToReturn
              : resUnidadesPersistentes?.unidades_persistentes.map(
                  (seccionPersistente: any) => ({
                    ...seccionPersistente,
                    mismo_organigrama:
                      resHomologacionesUnidades?.mismo_organigrama,
                    id_ccd_actual: resHomologacionesUnidades?.id_ccd_actual,
                    id_ccd_nuevo: params.row.id_ccd,
                  })
                )
          )
        );
      } else {
        dispatch(setHomologacionUnidades(infoToReturn));

        //  console.log('')(resUnidadesPersistentes);
        //* se le asigna el valor de las UNIDADES A HOMOLOGAR al estado de unidades persistentes
        /*
          - tiene prop id_ccd_nuevo
          - array unidades persistentes
        */

        dispatch(
          setUnidadesPersistentes(
            resUnidadesPersistentes?.unidades_persistentes.map(
              (seccionPersistente: any) => ({
                ...seccionPersistente,
                mismo_organigrama: resHomologacionesUnidades?.mismo_organigrama,
                id_ccd_actual: resHomologacionesUnidades?.id_ccd_actual,
                id_ccd_nuevo: params.row.id_ccd,
              })
            )
          )
        );
      }
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
                //  console.log('')(params.row);
                //* si limpia el estado local que almacenaba valores
                dispatch(setHomologacionUnidades([]));
                dispatch(setUnidadesPersistentes([]));
                // ? asignación de valores "actuales" según la búsqueda de los ccd's y organigramas
                dispatch(setCcdOrganigramaCurrent(params.row));

                //* se hace la petición de los siguientes servicios
                // ? 1. homologación de unidades
                // ? 2. unidades persistentes

                /* tomar en cuenta lo siguiente, si la propiedad mismo organigrama del servicio homologacion de unidades está en true, el estado que actualiza la homologacón de unidades no debe llenarse, por el contrario se llenará el estado de unidades persistentes pero con la información que traía el servicio de HOMOLOGACIÓN DE UNIDADES  */

                handleHomologacionUnidades(params);

                // ! se cierra el modal
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
      maxWidth="lg"
      open={modalSeleccionCCD_PSD}
      onClose={() => {
        setccdList([]);
        handleSeleccionCCD_PSD(false);
      }}
    >
      <DialogTitle>
        <Title title="Consultar CCD's para homologación de secciones persistentes" />
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
