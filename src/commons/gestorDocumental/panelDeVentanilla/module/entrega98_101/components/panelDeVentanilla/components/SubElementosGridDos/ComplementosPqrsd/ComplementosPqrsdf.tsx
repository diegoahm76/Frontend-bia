/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useState } from 'react';
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import { columnsComplementoPqrsdf } from './columnsComplementoPqrsd/colComplePqrsdf';
import { LoadingButton } from '@mui/lab';
import { PanelVentanillaContext } from '../../../../../../../context/PanelVentanillaContext';
import { control_warning } from '../../../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { Avatar, Button, Chip, IconButton, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import {
  setActionssToManagePermissions,
  setCurrentElementPqrsdComplementoTramitesYotros,
} from '../../../../../../../toolkit/store/PanelVentanillaStore';
import { Link, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TaskIcon from '@mui/icons-material/Task';
import { control_info } from '../../../../../../../../alertasgestor/utils/control_error_or_success';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import { getAnexosComplemento } from '../../../../../../../toolkit/thunks/PqrsdfyComplementos/anexos/getAnexosComplementos.service';

export const ComplementosPqrsdf: React.FC = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* naviagte declaration
  const navigate = useNavigate();
  //* states from redux store
  const {
    listaComplementosRequerimientosOtros,
    actions,
    currentElementPqrsdComplementoTramitesYotros,
  } = useAppSelector((state) => state.PanelVentanillaSlice);

  //* context declaration
  const {
    setRadicado,
    setValue,

    anexos,
    metadatos,
    setAnexos,
    setMetadatos,
  } = useContext(PanelVentanillaContext);

  const {
    handleGeneralLoading,
    handleThirdLoading,

    openModalOne: infoAnexos,
    openModalTwo: infoMetadatos,
    handleOpenModalOne: handleOpenInfoAnexos,
    handleOpenModalTwo: handleOpenInfoMetadatos,
  } = useContext(ModalAndLoadingContext);

  // ? states
  //* loader button simulacion
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  //* se va a tener que revisar luego está funciónP
  const shouldDisable = (actionId: string, complemento: any) => {
    const isEnviarSolicitud = actionId === 'EnviarSolicitud';
    const isAsigGrup = actionId === 'AsigGrup';
    const isAsigUser = actionId === 'AsigUser';
    const hasAnexos = complemento.cantidad_anexos > 0;
    const requiresDigitalization = complemento.requiere_digitalizacion;

    // Primer caso: Complemento requiere digitalización
    if (requiresDigitalization) {
      return !(isEnviarSolicitud && hasAnexos) || isAsigGrup || isAsigUser;
    }

    // Segundo caso: Complemento NO requiere digitalización
    if (!requiresDigitalization) {
      return isAsigUser;
    }
  };

  const setActionsPQRSDF = (complemento: any) => {
    console.log(complemento);
    dispatch(setCurrentElementPqrsdComplementoTramitesYotros(complemento));
    void Swal.fire({
      icon: 'success',
      title: 'Elemento seleccionado',
      text: 'Has seleccionado un elemento que se utilizará en los procesos de este módulo. Se mantendrá seleccionado hasta que elijas uno diferente, realices otra búsqueda o reinicies el módulo.',
      showConfirmButton: true,
    });

    const actionsPQRSDF = actions.map((action: any) => ({
      ...action,
      disabled: shouldDisable(action.id, complemento),
    }));

    console.log(actionsPQRSDF);
    dispatch(setActionssToManagePermissions(actionsPQRSDF));
  };

  //* columns definition
  const columns = [
    ...columnsComplementoPqrsdf,
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
            {/*<Link
              to={`/app/gestor_documental/panel_ventanilla/complemento_info/${params.row.idComplementoUsu_PQR}`}
            >*/}
            <Tooltip title="Ver info complemento asociado">
              <IconButton
                onClick={() => {
                  void getAnexosComplemento(
                    params?.row?.idComplementoUsu_PQR
                  ).then((res) => {
                    console.log(res);

                    if (res.length > 0) {
                      setAnexos(res);
                      handleOpenInfoMetadatos(false); //* cierre de la parte de los metadatos
                      handleOpenInfoAnexos(false); //* cierra la parte de la información del archivo realacionaod a la pqesdf que se consulta con el id del anexo
                      setActionsPQRSDF(params?.row);
                      navigate(
                        `/app/gestor_documental/panel_ventanilla/complemento_info/${params.row.idComplementoUsu_PQR}`
                      );
                      return;
                    }

                    return;
                  });

                  /* setActionsPQRSDF(params.row);

                    handleOpenInfoMetadatos(false);
                    handleOpenInfoAnexos(false);
                    setMetadatos([]);*/
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
            {/*</Link>*/}
            <Tooltip title="Seleccionar elemento para procesos">
              <IconButton
                onClick={() => {
                  //* se debe actualizar el array de acciones ya que de esa manera se va a determinar a que módulos va a tener acceso el elemento selccionado

                  // ? en consecuencia se debe manejar segun los estados que se deban ejecutar por cada pqr se´gún los documentos de modelado
                  /*dispatch(setActionssToManagePermissions())*/
                  setActionsPQRSDF(params.row);
                  /* dispatch(
                    setCurrentElementPqrsdComplementoTramitesYotros(params?.row)
                  );
                  void Swal.fire({
                    icon: 'success',
                    title: 'Elemento seleccionado',
                    text: 'Has seleccionado un complemento que se utilizará en los procesos de este módulo. Se mantendrá seleccionado hasta que elijas uno diferente, realices otra búsqueda o reinicies el módulo.',
                    showConfirmButton: true,
                    // timer: 1500,
                  });*/
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

  /* [
    ...listaComplementosRequerimientosOtros,
    ...listaComplementosRequerimientosOtros,
    ...listaComplementosRequerimientosOtros,
    ...listaComplementosRequerimientosOtros,
  ];
*/
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
          >
            Quitar selección de complemento
          </Button>
        ) : null
      }
    />
  );
};
