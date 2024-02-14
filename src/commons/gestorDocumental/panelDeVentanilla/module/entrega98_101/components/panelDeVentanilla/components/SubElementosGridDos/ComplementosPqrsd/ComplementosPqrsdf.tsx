/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useState } from 'react';
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import { columnsComplementoPqrsdf } from './columnsComplementoPqrsd/colComplePqrsdf';
import { PanelVentanillaContext } from '../../../../../../../context/PanelVentanillaContext';
import { Avatar, Button, Chip, IconButton, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import {
  setActionssToManagePermissionsComplementos,
  setCurrentElementPqrsdComplementoTramitesYotros,
} from '../../../../../../../toolkit/store/PanelVentanillaStore';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TaskIcon from '@mui/icons-material/Task';
import { control_info } from '../../../../../../../../alertasgestor/utils/control_error_or_success';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import { getAnexosComplemento } from '../../../../../../../toolkit/thunks/PqrsdfyComplementos/anexos/getAnexosComplementos.service';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';

export const ComplementosPqrsdf: React.FC = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* naviagte declaration
  const navigate = useNavigate();
  //* states from redux store
  const {
    listaComplementosRequerimientosOtros,
    actionsComplementos,
    currentElementPqrsdComplementoTramitesYotros,
  } = useAppSelector((state) => state.PanelVentanillaSlice);

  //* context declaration
  const { setAnexos } = useContext(PanelVentanillaContext);

  const {
    handleOpenModalOne: handleOpenInfoAnexos,
    handleOpenModalTwo: handleOpenInfoMetadatos,
  } = useContext(ModalAndLoadingContext);

  // ? se va a tener que modificar esta función con la nueva propiedad que se agrega. si la pqr ya fue asignada a grupo, no se puede volver a asignar (constinuar asig grup)
  const shouldDisable = (actionId: string, complemento: any) => {
    const requiresDigitalization = complemento.requiere_digitalizacion;
    const isComplementoAsignadoUnidad = complemento.complemento_asignado_unidad;

    if (requiresDigitalization) {
      return !(actionId === 'Dig');
    }

    if (!requiresDigitalization && !isComplementoAsignadoUnidad) {
      return !(actionId === 'Dig' || actionId === 'ContinuarAsigGrup');
    }

    if (!requiresDigitalization && isComplementoAsignadoUnidad) {
      return !(actionId === 'Dig');
    }
  };
  const setActionsComplementos = (complemento: any) => {
    dispatch(setCurrentElementPqrsdComplementoTramitesYotros(complemento));
    void Swal.fire({
      icon: 'success',
      title: 'Elemento seleccionado',
      text: 'Seleccionaste un elemento que se utilizará en los procesos de este módulo. Se mantendrá seleccionado hasta que elijas uno diferente, realices otra búsqueda o reinicies el módulo.',
      showConfirmButton: true,
    });

    const actionsComplementosPermissions = actionsComplementos.map(
      (action: any) => ({
        ...action,
        disabled: shouldDisable(action.id, complemento),
      })
    );
    dispatch(
      setActionssToManagePermissionsComplementos(actionsComplementosPermissions)
    );
  };

  //* columns definition
  const columns = [
    ...columnsComplementoPqrsdf,
    {
      headerName: 'Requiere digitalización',
      field: 'requiere_digitalizacion',
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <Chip
            label={params.value ? 'Si' : 'No'}
            color={params.value ? 'success' : 'error'}
            clickable
            onClick={() => {
              control_info(
                `Este complemento ${
                  params.value ? 'requiere' : 'no requiere'
                } digitalización`
              );
            }}
          />
        );
      },
    },
    {
      headerName: 'Complememto asignado a unidad',
      field: 'complemento_asignado_unidad',
      minWidth: 250,
      renderCell: (params: any) => {
        return (
          <Chip
            label={params.value ? 'Si' : 'No'}
            color={params.value ? 'success' : 'error'}
          />
        );
      },
    },
    {
      headerName: 'Número de solicitudes de digitalización',
      field: 'numero_solicitudes',
      minWidth: 300,
      renderCell: (params: any) => {
        return (
          <Chip
            label={`Solicitudes de digitalización: ${params.value}`}
            clickable
            color="info"
            onClick={() => {
              control_info(
                `Actualmente tienes ${params.value} solicitudes de digitalización para este radicado`
              );
            }}
          />
        );
      },
    },
    {
      headerName: 'Acciones',
      field: 'Acciones',
      minWidth: 250,
      renderCell: (params: any) => {
        return (
          <>
            <Tooltip title="Ver info complemento asociado">
              <IconButton
                onClick={() => {
                  void getAnexosComplemento(
                    params?.row?.idComplementoUsu_PQR
                  ).then((res) => {
                    //  console.log('')(res);

                    if (res.length > 0) {
                      setAnexos(res);
                      handleOpenInfoMetadatos(false); //* cierre de la parte de los metadatos
                      handleOpenInfoAnexos(false); //* cierra la parte de la información del archivo realacionaod a la pqesdf que se consulta con el id del anexo
                      setActionsComplementos(params?.row);
                      navigate(
                        `/app/gestor_documental/panel_ventanilla/complemento_info/${params.row.idComplementoUsu_PQR}`
                      );
                      return;
                    }

                    return;
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
                  <VisibilityIcon
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Tooltip title="Seleccionar elemento para procesos">
              <IconButton
                onClick={() => {
                  setActionsComplementos(params?.row);
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
                  <TaskIcon
                    sx={{
                      color: 'green',
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
    <RenderDataGrid
      rows={[...listaComplementosRequerimientosOtros] ?? []}
      columns={columns ?? []}
      title="Complementos del elemento seleccionado"
      aditionalElement={
        currentElementPqrsdComplementoTramitesYotros?.tipo ? (
          <Button
            onClick={() => {
              dispatch(setCurrentElementPqrsdComplementoTramitesYotros(null));
            }}
            variant="contained"
            color="primary"
            endIcon={<RemoveDoneIcon />}
          >
            Quitar selección de complemento
          </Button>
        ) : null
      }
    />
  );
};
