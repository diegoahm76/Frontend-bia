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
          <Tooltip title="Responder requerimiento de la OPA seleccionada">
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
      ) : listaOpas?.opasSinResponder.length ? (
        <RenderDataGrid
          title="Solicitudes de opas presentadas por persona - Existentes"
          rows={listaOpas?.opasSinResponder ?? []}
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
            Este usuario no ha presentado opas y / o no se ha realizado la
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
      ) : listaOpas?.reqOSolSinResponderRelacionadasAUnaOpa.length ? (
        <RenderDataGrid
          title="Solicitudes de requerimiento por persona - Existentes sin responder"
          rows={listaOpas?.reqOSolSinResponderRelacionadasAUnaOpa ?? []}
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
