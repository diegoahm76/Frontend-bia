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
import { setCurrentElementPqrsdComplementoTramitesYotros } from '../../../../../../../toolkit/store/PanelVentanillaStore';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';

export const ListaElementosPqrsdf = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* context declaration
  const { setRadicado, setValue } = useContext(PanelVentanillaContext);

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
      minWidth: 250,
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
      minWidth: 250,
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
            <Tooltip title="Ver info pqrsdf">
              <IconButton
                onClick={() => {
                  console.log(params.row);
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

            {/*segundo elemento definición*/}

            <Tooltip
              title={`Ver complementos relacionados a pqrsdf con asunto ${params?.row?.asunto}`}
            >
              <IconButton
                onClick={() => {
                  console.log(params.row);
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
                  console.log(params.row);
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

  const rows = [
    {
      id_PQRSDF: 10,
      tipo_solicitud: 'PQRSDF',
      nombre_completo_titular: 'SUPERUSUARIO 1er NOMBRE SUPERUSUARIO 1er APELL',
      asunto: 'SIN IDENTIFICAR',
      cantidad_anexos: 3,
      radicado: 'XYZ789-2023-R67890',
      fecha_radicado: '2023-11-07T12:00:00',
      requiere_digitalizacion: true,
      estado_solicitud: 'GUARDADO',
      estado_asignacion_grupo: 'Pendiente',
      nombre_sucursal: null,
      numero_solicitudes_digitalizacion: 0,
      numero_solicitudes_usuario: 0,
    },
    {
      id_PQRSDF: 9,
      tipo_solicitud: 'PQRSDF',
      nombre_completo_titular: 'SUPERUSUARIO 1er NOMBRE SUPERUSUARIO 1er APELL',
      asunto: 'SIN IDENTIFICAR',
      cantidad_anexos: 5,
      radicado: 'ABC123-2023-R12345',
      fecha_radicado: '2023-11-07T12:00:00',
      requiere_digitalizacion: true,
      estado_solicitud: 'EN VENTANILLA CON PENDIENTES',
      estado_asignacion_grupo: 'Pendiente',
      nombre_sucursal: null,
      numero_solicitudes_digitalizacion: 11,
      numero_solicitudes_usuario: 0,
    },
    {
      id_PQRSDF: 27,
      tipo_solicitud: 'PQRSDF',
      nombre_completo_titular: 'prueba  user ',
      asunto: 'Solicitud de PQRSDF',
      cantidad_anexos: 4,
      radicado: 'RE-2023-00000002',
      fecha_radicado: '2023-11-16T05:32:00',
      requiere_digitalizacion: false,
      estado_solicitud: 'EN VENTANILLA SIN PENDIENTES',
      estado_asignacion_grupo: 'Pendiente',
      nombre_sucursal: null,
      numero_solicitudes_digitalizacion: 0,
      numero_solicitudes_usuario: 0,
    },
    {
      id_PQRSDF: 28,
      tipo_solicitud: 'PQRSDF',
      nombre_completo_titular: 'prueba  user ',
      asunto: 'Solicitud de PQRSDF',
      cantidad_anexos: 5,
      radicado: 'RE-2023-00000002',
      fecha_radicado: null,
      requiere_digitalizacion: false,
      estado_solicitud: 'EN VENTANILLA CON PENDIENTES',
      estado_asignacion_grupo: 'Pendiente',
      nombre_sucursal: null,
      numero_solicitudes_digitalizacion: 0,
      numero_solicitudes_usuario: 0,
    },
  ];

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          setValue(1);
          setRadicado('panel8');
        }}
      >
        Se debe usar para el cambio a la otra pestaña
      </Button>
      <Link
        //* estos ids se van a manejar a traves de los params.row
        to="/app/gestor_documental/panel_ventanilla/pqr_info/1"
      >
        <Button
          color="warning"
          sx={{
            marginLeft: '1rem',
          }}
          variant="contained"
          onClick={() => {
            console.log('cambiando a ver pqrsdf');
          }}
        >
          Ver pqrsdf
        </Button>
      </Link>

      <Link
        //* estos ids se van a manejar a traves de los params.row
        to="/app/gestor_documental/panel_ventanilla/complemento_info/1"
      >
        <Button
          color="error"
          sx={{
            marginLeft: '1rem',
          }}
          variant="contained"
          onClick={() => {
            console.log('cambiando a ver complemento');
          }}
        >
          Ver complemento de pqrsdf
        </Button>
      </Link>
      <RenderDataGrid
        rows={listaElementosPqrsfTramitesUotros ?? []}
        columns={columns ?? []}
        title={`Lista de solicitudes de ${rows[0]?.tipo_solicitud}`}
      />
    </>
  );
};
