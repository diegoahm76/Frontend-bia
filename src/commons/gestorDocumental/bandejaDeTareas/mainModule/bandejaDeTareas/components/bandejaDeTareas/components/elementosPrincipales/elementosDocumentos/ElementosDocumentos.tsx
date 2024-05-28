/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext } from 'react';
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import { AuthSlice } from '../../../../../../../../../auth/interfaces';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Chip, IconButton, Tooltip } from '@mui/material';
import {
  setActionsTareasOtros,
  setCurrentTareaPqrsdfTramitesUotrosUopas,
  setInfoTarea,
  setListaTareasPqrsdfTramitesUotrosUopas,
} from '../../../../../../../toolkit/store/BandejaDeTareasStore';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import ClearIcon from '@mui/icons-material/Clear';
import CommentIcon from '@mui/icons-material/Comment';
import { iconStyles } from './../elementosPqrsdf/ElementosPqrsdf';
import { showAlert } from '../../../../../../../../../../utils/showAlert/ShowAlert';
import Swal from 'sweetalert2';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import { BandejaTareasContext } from '../../../../../../context/BandejaTareasContext';

import { GridCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TaskIcon from '@mui/icons-material/Task';
import { getListadoTareaasOtrosByPerson } from '../../../../../../../toolkit/thunks/otros/getListadoTareasOtros.service';
import { ModalRejectTask } from '../../../utils/tareaPqrsdf/ModalRejectTask';
import { putAceptarTareaOtros } from '../../../../../../../toolkit/thunks/otros/putAceptarTareaOtros.service';
import { ModalSeeRejectedTask } from '../../../utils/tareaPqrsdf/ModalSeeRejectedTask';
import { getDetalleDeTareaOtro } from '../../../../../services/servicesStates/otros/detalleTareasOtros/getInfoTareaOtro.service';
import { getAnexosOtros } from '../../../../../services/servicesStates/otros/anexos/getAnexosTareaOtros.service';
import { columnsDocumentos } from './columnsDocumentos/ColumnsDocumentos';
import { DownloadButton } from '../../../../../../../../../../utils/DownloadButton/DownLoadButton';
import CallMadeIcon from '@mui/icons-material/CallMade';

export const ElementosDocumentos = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* redux states
  const {
    currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas,
    listaTareasPqrsdfTramitesUotrosUopas,
  } = useAppSelector((state) => state.BandejaTareasSlice);
  const {
    userinfo: { id_persona },
  } = useAppSelector((state: AuthSlice) => state.auth);

  //* navigate declaration
  const navigate = useNavigate();
  //* context declaration
  const { setAnexos } = useContext(BandejaTareasContext);
  const {
    handleOpenModalOne: handleOpenInfoAnexos,
    handleOpenModalTwo: handleOpenInfoMetadatos,
    handleSecondLoading,
    handleOpenModalNuevo,
    handleOpenModalNuevoNumero2,
  } = useContext(ModalAndLoadingContext);


  // ? FUNCIONES PARA EL COMPONENTE


  // ? FUNCIONES PARA EL COMPONENTE ---------------

  //* columnas necesarias para la interacción
  const columns = [
    ...columnsDocumentos,
    {
      headerName: "¿Documento Finalizado?",
      field: "finalizado",
      width: 250,
      renderCell: (params: GridCellParams | GridValueGetterParams) => {
        return (
          <Chip
            size="small"
            label={params?.row?.documento?.finalizado ? 'Finalizado' : 'En proceso'}
            color={params?.row?.documento?.finalizado ? 'success' : 'warning'}
          />
        );
      },
      // renderCell: (params: any) => params?.value?.documento?.finalizado ? 'Finalizado' : 'Sin Finalizar',
    },
    {
      headerName: "¿Documento Firmado?",
      field: "firma",
      width: 250,
      renderCell: (params: GridCellParams | GridValueGetterParams) => {
        console.log(params);
        return (
          <Chip
            size="small"
            label={params?.row?.asignaciones?.firma ? (params?.row?.asignaciones?.persona_firmo ? 'Firmado' : 'Sin Firmar') : 'N/A'}
            color={params?.row?.asignaciones?.firma ? (params?.row?.asignaciones?.persona_firmo ? 'success' : 'error'): 'warning'}
          />
        );
      },
    },
    {
      headerName: 'Acciones',
      field: 'Acciones',
      minWidth: 200,
      renderCell: (params: GridCellParams | GridValueGetterParams) => {
        return (
          <>
              <>
                <DownloadButton
                fileName={params.row?.documento?.archivos_digitales?.nombre_de_Guardado ?? 'Nombre-Bia'}
                fileUrl={params?.row?.documento?.archivos_digitales?.ruta_archivo ?? ''}
                condition={false}
                  />
              </>
            {/* </Link>*/}

            <Tooltip title="Ir a módulo de generador de documentos">
              <IconButton
                sx={{
                  marginLeft: '20px',
                }}
                onClick={() => {
                  console.log(params.row)
                  navigate('/app/gestor_documental/documentos')
                  dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(params.row));
                }}
              >
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    background: '#fff',
                    border: '2px solid',
                  }}
                  variant="rounded"
                >
                  <CallMadeIcon
                    sx={{
                      color: 'warning.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <>
      <RenderDataGrid
        rows={
          listaTareasPqrsdfTramitesUotrosUopas /*.filter(
            (el: { radicado: string }) => el.radicado
          )*/ ?? []
        }
        columns={columns ?? []}
        title={`Listado de documentos`}
        /*aditionalElement={
          currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.tipo_tarea ? (
            <Button
              endIcon={<ClearAllIcon />}
              onClick={() => {
                dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(null));
              }}
              variant="contained"
              color="primary"
            >
              Quitar selección de Tarea solicitud de otros
            </Button>
          ) : null
        }*/
      />
    </>
  );
};
