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
import { Avatar, IconButton, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import { setCurrentElementPqrsdComplementoTramitesYotros } from '../../../../../../../toolkit/store/PanelVentanillaStore';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TaskIcon from '@mui/icons-material/Task';

export const ComplementosPqrsdf: React.FC = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* states from redux store
  const { listaComplementosRequerimientosOtros } = useAppSelector(
    (state) => state.PanelVentanillaSlice
  );

  //* context declaration
  const { setRadicado, setValue } = useContext(PanelVentanillaContext);

  // ? states
  //* loader button simulacion
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  //* columns definition
  const columns = [
    ...columnsComplementoPqrsdf,
    {
      headerName: 'Número de solicitudes de digitalización',
      field: 'numero_solicitudes',
      minWidth: 300,
      renderCell: (params: any) => {
        return (
          <LoadingButton
            loading={loadingStates[params.row.idComplementoUsu_PQR]}
            color="primary"
            variant="contained"
            onClick={() => {
              if (params.value === 0) {
                control_warning(
                  'No hay solicitudes de digitalización para este radicado, por lo tanto no se podrá ver historial de solicitudes de digitalización'
                );
                return;
              } else {
                setLoadingStates((prev) => ({
                  ...prev,
                  [params.row.idComplementoUsu_PQR]: true,
                }));
                // Simulate an async operation
                setTimeout(() => {
                  setValue(1);
                  //* se debe reemplazar por el radicado real que viene dentro del elemento que se va a buscar
                  setRadicado('panel8');
                  setLoadingStates((prev) => ({
                    ...prev,
                    [params.row.idComplementoUsu_PQR]: false,
                  }));
                }, 1000);
              }
            }}
          >
            {`Solicitud de digitalización: ${params.value}`}
          </LoadingButton>
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
            <Link
              to={`/app/gestor_documental/panel_ventanilla/complemento_info/${params.row.idComplementoUsu_PQR}`}
            >
              <Tooltip title="Ver info complemento asociado">
                <IconButton
                  onClick={() => {
                    dispatch(
                      setCurrentElementPqrsdComplementoTramitesYotros(
                        params?.row
                      )
                    );
                    void Swal.fire({
                      icon: 'success',
                      title: 'Complmento seleccionado',
                      text: 'Has seleccionado un elemento que se utilizará en los procesos de este módulo. Se mantendrá seleccionado hasta que elijas uno diferente o reinicies el módulo.',
                      showConfirmButton: true,
                      // timer: 1500,
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
            </Link>

            {/*segundo elemento definición*/}

            {/* <Link
              estos ids se van a manejar a traves de los params.row
              to={`/app/gestor_documental/panel_ventanilla/pqrsdf_complemento/${params.row.id_PQRSDF}`}
            >*/}
            {/* <Tooltip
              title={`Ver complementos relacionados a pqrsdf con asunto ${params?.row?.asunto}`}
            >
              <IconButton
                sx={{
                  color: !params?.row?.tiene_complementos
                    ? 'disabled'
                    : 'info.main',
                }}
                onClick={() => {
                  if (!params.row.tiene_complementos) {
                    void Swal.fire({
                      title: 'Opps...',
                      icon: 'error',
                      text: `Esta PQRSDF no tiene complementos asociados`,
                      showConfirmButton: true,
                    });
                    dispatch(
                      setListaElementosComplementosRequerimientosOtros([])
                    );
                  } else {
                    void getComplementosAsociadosPqrsdf(
                      params.row.id_PQRSDF,
                      handleThirdLoading
                    ).then((res) => {
                      dispatch(
                        setListaElementosComplementosRequerimientosOtros(res)
                      );
                    });
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
                  <KeyboardDoubleArrowDownIcon
                    sx={{
                      color: 'info.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>*/}
            {/*</Link>*/}

            <Tooltip title="Seleccionar elemento para procesos">
              <IconButton
                onClick={() => {
                  //* se debe actualizar el array de acciones ya que de esa manera se va a determinar a que módulos va a tener acceso el elemento selccionado

                  // ? en consecuencia se debe manejar segun los estados que se deban ejecutar por cada pqr se´gún los documentos de modelado
                  /*dispatch(setActionssToManagePermissions())*/
                  dispatch(
                    setCurrentElementPqrsdComplementoTramitesYotros(params?.row)
                  );
                  void Swal.fire({
                    icon: 'success',
                    title: 'Elemento seleccionado',
                    text: 'Has seleccionado un complemento que se utilizará en los procesos de este módulo. Se mantendrá seleccionado hasta que elijas uno diferente, realices otra búsqueda o reinicies el módulo.',
                    showConfirmButton: true,
                    // timer: 1500,
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
      rows={listaComplementosRequerimientosOtros ?? []}
      columns={columns ?? []}
      title="Complementos del elemento seleccionado"
    />
  );
};
