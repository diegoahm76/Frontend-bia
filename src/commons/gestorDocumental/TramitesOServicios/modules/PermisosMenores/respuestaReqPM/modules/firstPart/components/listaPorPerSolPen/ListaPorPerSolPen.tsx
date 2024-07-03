/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import {
  getOpasPerPerson,
  getRelatedRequirements,
} from '../../services/getOpas.service';
import {
  columnsOpas,
  columnsRequerimientosPendientes,
} from './columnsOpas/columnsOpas';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ForwardIcon from '@mui/icons-material/Forward';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../../../../../hooks';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import { setCurrentPersonaRespuestaUsuario } from '../../../../../../../respuestaRequerimientoOpa/toolkit/slice/ResRequerimientoOpaSlice';
import { AvatarStyles } from '../../../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { containerStyles } from './../../../../../../../../tca/screens/utils/constants/constants';
import { Loader } from '../../../../../../../../../../utils/Loader/Loader';
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';

export const ListaPorPersonaSolPendientes = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* states redux declaration
  const { currentPersonaRespuestaUsuario } = useAppSelector(
    (state) => state.ResRequerimientoOpaSlice
  );

  //* navigate declaration
  const navigate = useNavigate();

  //* context declaration
  const { sevenLoading, handleSevenLoading, eigthLoading, handleEigthLoading } =
    useContext(ModalAndLoadingContext);

  //? states declarations
  const [listaOpas, setlistaOpas] = useState({
    opasSinResponder: [],
    reqOSolSinResponderRelacionadasAUnaOpa: [],
  });

  useEffect(() => {
    (async () => {
      if (!currentPersonaRespuestaUsuario) return;
      const id_persona =
        currentPersonaRespuestaUsuario.id_persona ||
        currentPersonaRespuestaUsuario.titular.id_persona;
      try {
        const data = await getOpasPerPerson(id_persona, handleSevenLoading);
        setlistaOpas({
          opasSinResponder: data || [],
          reqOSolSinResponderRelacionadasAUnaOpa: [],
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [currentPersonaRespuestaUsuario?.id_persona || currentPersonaRespuestaUsuario?.titular.id_persona]);

  // ! columns

  const columnsMain = [
    ...columnsOpas,
    {
      headerName: 'Acción',
      field: 'accion',
      width: 80,
      renderCell: (params: any) => (
        <>
          <Tooltip title="Seleccionar Permiso menor (búsqueda de requerimientos pendientes de respuesta)">
            <IconButton
              onClick={async () => {
                try {
                  const data = await getRelatedRequirements(
                    params.row.id_solicitud_tramite,
                    handleEigthLoading
                  );
                  setlistaOpas({
                    ...listaOpas,
                    reqOSolSinResponderRelacionadasAUnaOpa: data || [],
                  });
                  dispatch(
                    setCurrentPersonaRespuestaUsuario({
                      ...currentPersonaRespuestaUsuario,
                     id_solicitud_tramite: params.row.id_solicitud_tramite,
                    })
                  );
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <KeyboardDoubleArrowDownIcon
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const columnsReq = [
    ...columnsRequerimientosPendientes,
    {
      headerName: 'Acción',
      field: 'accion',
      width: 80,
      renderCell: (params: any) => (
        <>
          <Tooltip title="Responder requerimiento del PM seleccionado">
            <IconButton
              onClick={async () => {
                console.log('siuuuu bor nos fuimos');

                navigate(
                  `/app/gestor_documental/tramites/respuesta_requerimiento_permiso_menor/formulario_usuario/`
                );
                dispatch(
                  setCurrentPersonaRespuestaUsuario({
                    ...currentPersonaRespuestaUsuario,
                    estado: params.row.estado ?? 'N/A',
                    fecha_radicado: params.row.fecha_radicado ?? 'N/A',
                    id_requerimiento: params.row.id_requerimiento ?? 'N/A',
                    numero_radicado: params.row.numero_radicado ?? 'N/A',
                    tipo_tramite: params.row.tipo_tramite ?? 'N/A',
                  })
                );
              }}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <ForwardIcon
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
    <>
      {sevenLoading ? (
        <Grid
          container
          sx={{
            ...containerStyles,
            position: 'static',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Loader altura={270} />
        </Grid>
      ) : /*listaOpas?.opasSinResponder.length*/ !listaOpas?.opasSinResponder.length ? (
        <RenderDataGrid
          title="Solicitudes de opas presentadas por persona - Existentes"
          rows={/*listaOpas?.opasSinResponder ||*/ [
            {
              "tipo_solicitud": "OPA",
              "nombre_proyecto": "Proyecto de Reforestación",
              "nombre_opa": "Reforestación de áreas degradadas",
              "nombre_completo_titular": "Juan Pérez García",
              "costo_proyecto": 50000,
              "pagado": true,
              "cantidad_predios": 2,
              "cantidad_anexos": 5,
              "radicado": "UNICO-2023-00567",
              "fecha_radicado": "2023-05-15T10:30:00.000Z",
              "sede": "Norte",
              "requiere_digitalizacion": false,
              "estado_actual": "REVISIÓN TÉCNICA",
              "estado_asignacion_grupo": "Grupo de Evaluación 1",
              "persona_asignada": "Ana Martínez",
              "unidad_asignada": "Unidad de Gestión Ambiental"
            },
            {
              "tipo_solicitud": "OPA",
              "nombre_proyecto": "Instalación de Paneles Solares",
              "nombre_opa": "Implementación de energías renovables",
              "nombre_completo_titular": "Laura Jiménez Rodríguez",
              "costo_proyecto": 75000,
              "pagado": false,
              "cantidad_predios": 1,
              "cantidad_anexos": 3,
              "radicado": "UNICO-2023-00892",
              "fecha_radicado": "2023-08-22T14:20:00.000Z",
              "sede": "Sur",
              "requiere_digitalizacion": true,
              "estado_actual": "PENDIENTE DE PAGO",
              "estado_asignacion_grupo": "Grupo de Evaluación 2",
              "persona_asignada": "Carlos Sánchez",
              "unidad_asignada": "Unidad de Proyectos Especiales"
            }
          ]}
          columns={columnsMain ?? []}
        />
      ) : !currentPersonaRespuestaUsuario ? (
        <></>
      ) : (
        <Grid
          container
          sx={{
            ...containerStyles,
            position: 'static',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2" color="textSecondary">
            Este usuario no ha presentado permisos menores y / o no se ha realizado la
            búsqueda
          </Typography>
        </Grid>
      )}

      {/*el loading numero ocho carga tras la busqueda del elemento, el 7 carga en la entrada de la busqueda del elemento*/}
      {eigthLoading ? (
        <Grid
          container
          sx={{
            ...containerStyles,
            position: 'static',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Loader altura={270} />
        </Grid>
      ) : /*listaOpas?.reqOSolSinResponderRelacionadasAUnaOpa.length*/ !listaOpas?.reqOSolSinResponderRelacionadasAUnaOpa.length ? (
        <RenderDataGrid
          title="Solicitudes de requerimiento por persona - Existentes sin responder"
          rows={/*listaOpas?.reqOSolSinResponderRelacionadasAUnaOpa ??*/ [
            {
              "tipo_tramite": "Permiso de construcción",
              "fecha_radicado": "2023-04-15",
              "numero_radicado": "RAD-20230415-123",
              "estado": "En revisión"
            },
            {
              "tipo_tramite": "Licencia ambiental",
              "fecha_radicado": "2023-03-22",
              "numero_radicado": "RAD-20230322-456",
              "estado": "Aprobado"
            },
            {
              "tipo_tramite": "Renovación de permiso",
              "fecha_radicado": "2023-05-05",
              "numero_radicado": "RAD-20230505-789",
              "estado": "Pendiente de pago"
            }
          ]}
          columns={columnsReq ?? []}
        />
      ) : !currentPersonaRespuestaUsuario ||
        !listaOpas?.opasSinResponder.length ? (
        <></>
      ) : (
        <Grid
          container
          sx={{
            ...containerStyles,
            position: 'static',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2" color="textSecondary">
            Este usuario no tiene pendientes realizar respuestas a un
            requerimiento para el permiso menor seleccionado y / o no se ha realizado la
            búsqueda búsqueda
          </Typography>
        </Grid>
      )}
    </>
  );
};
