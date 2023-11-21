/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useEffect, useState } from 'react';
import { PanelVentanillaContext } from '../../../../../../../context/PanelVentanillaContext';
import { Avatar, Button, IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { columnsPqrsdf } from './columnsPqrsdf/columnsPqrsdf';
import { control_warning } from '../../../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { LoadingButton } from '@mui/lab';
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import TaskIcon from '@mui/icons-material/Task';
import {
  setCurrentElementPqrsdComplementoTramitesYotros,
  setListaElementosComplementosRequerimientosOtros,
} from '../../../../../../../toolkit/store/PanelVentanillaStore';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import Swal from 'sweetalert2';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import { getComplementosAsociadosPqrsdf } from '../../../../../../../toolkit/thunks/Pqrsdf/getComplementos.service';

export const ListaElementosPqrsdf = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* context declaration
  const { setRadicado, setValue } = useContext(PanelVentanillaContext);
  const { handleThirdLoading } = useContext(ModalAndLoadingContext);

  //* loader button simulacion
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  //* redux states
  const { listaElementosPqrsfTramitesUotros } = useAppSelector(
    (state) => state.PanelVentanillaSlice
  );

  //* espacio para la definición de las columnas
  const columns = [
    ...columnsPqrsdf,
    {
      headerName: 'Número de solicitudes de digitalización',
      field: 'numero_solicitudes_digitalizacion',
      minWidth: 300,
      renderCell: (params: any) => {
        return (
          <LoadingButton
            loading={loadingStates[params.row.id_PQRSDF]}
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
                  [params.row.id_PQRSDF]: true,
                }));
                // Simulate an async operation
                setTimeout(() => {
                  setValue(1);
                  //* se debe reemplazar por el radicado real que viene dentro del elemento que se va a buscar
                  setRadicado('panel8');
                  setLoadingStates((prev) => ({
                    ...prev,
                    [params.row.id_PQRSDF]: false,
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
      headerName: 'Número de solicitudes de usuario',
      field: 'numero_solicitudes_usuario',
      minWidth: 300,
      renderCell: (params: any) => {
        return (
          <Button
            color="warning"
            variant="outlined"
            onClick={() => {
              console.log('cambiando a ver pqrsdf');
            }}
          >
            {`Solicitud al  usuario: ${params.value}`}
          </Button>
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
              //* estos ids se van a manejar a traves de los params.row
              to={`/app/gestor_documental/panel_ventanilla/pqr_info/${params.row.id_PQRSDF}`}
            >
              <Tooltip title="Ver info pqrsdf">
                <IconButton
                  onClick={() => {
                    dispatch(
                      setCurrentElementPqrsdComplementoTramitesYotros(
                        params?.row
                      )
                    );
                    void Swal.fire({
                      icon: 'success',
                      title: 'Elemento seleccionado',
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

            
            <Tooltip
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
            </Tooltip>

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
                    text: 'Has seleccionado un elemento que se utilizará en los procesos de este módulo. Se mantendrá seleccionado hasta que elijas uno diferente, realices otra búsqueda o reinicies el módulo.',
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
        rows={listaElementosPqrsfTramitesUotros ?? []}
        columns={columns ?? []}
        title={`Lista de solicitudes de ${listaElementosPqrsfTramitesUotros[0]?.tipo_solicitud}`}
      />
    </>
  );
};
