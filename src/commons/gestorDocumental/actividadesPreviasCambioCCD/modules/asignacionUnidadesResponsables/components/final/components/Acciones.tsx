/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC, useState, useEffect, useContext } from 'react';
import { Button, Grid, Stack } from '@mui/material';
import CleanIcon from '@mui/icons-material/CleaningServices';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { Title } from '../../../../../../../../components';
import { containerStyles } from '../../../../../../tca/screens/utils/constants/constants';
import {
  getOutModule,
  reset_all,
} from '../../../../../../../../utils/functions/getOutOfModule';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks';
import {
  resetStateUniResp,
  setCurrentSeccionSeleccionadaSinResponsable,
  setCurrentUnidadAsociada,
  setListadoDeAsignaciones,
  setSeccionesSinResponsable,
  setSeriesSeccionSeleccionadaSinResponsable,
  setUnidadeCcdAsociado,
} from '../../../toolkit/slice/types/AsignacionUniResp';
import { postUnidadesResp } from '../../../toolkit/thunks/postUnidadesResp.service';
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';
import { GET_LISTADO_ASIGNACIONES } from '../../../toolkit/thunks/listadoDeAsignaciones.service';
import {
  GET_UNIDADES_NO_RESPONSABLE_PERSISTENTE,
  GET_UNIDADES_ORGNAIZACIONALES_UNIDADES_RESP,
} from '../../../toolkit/thunks/seccPendientesAndCat.service';

export const Acciones: FC<any> = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* navigate declaration
  const navigate = useNavigate();
  // ? loading  para los botones guardar y proceder respectivamente
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  // ! states from redux
  const { ccdOrganigramaCurrentBusqueda, listadoDeAsignaciones } =
    useAppSelector((state) => state.AsigUniRespSlice);

  // ? ---- context declaration ----
  const { handleSecondLoading } = useContext(ModalAndLoadingContext);

  const handleSubmit = async () => {
    const dataToSend = {
      id_ccd_nuevo: ccdOrganigramaCurrentBusqueda?.id_ccd,
      unidades_responsables: listadoDeAsignaciones?.map((element: any) => {
        return {
          id_unidad_actual: element?.id_unidad_seccion_actual,
          id_unidad_nueva: element.id_unidad_seccion_nueva,
        };
      }),
    };
    await postUnidadesResp(dataToSend, setLoadingButton).then(async (res) => {
      //* se proceder a llamar 4 servicios para traer los datos de regreso

      //*lleva id ccd nuevo
      await GET_LISTADO_ASIGNACIONES(
        ccdOrganigramaCurrentBusqueda?.id_ccd
      ).then((res) => {
        dispatch(setListadoDeAsignaciones(res));
        
      });

      //* lleva id_ccd_nuevo y setLoading
      await GET_UNIDADES_NO_RESPONSABLE_PERSISTENTE(
        ccdOrganigramaCurrentBusqueda?.id_ccd,
        handleSecondLoading,
        navigate,
        dispatch,
        () => resetStateUniResp()
      ).then((res) => {
        dispatch(setSeccionesSinResponsable(res));
      });
    });
  };

  if (!ccdOrganigramaCurrentBusqueda) return <></>;

  return (
    <>
      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="Acciones" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit().then(() => {
                //* de igual manera de reinician los campos de las series y el select desde 0 para limpiar todo
                dispatch(setSeriesSeccionSeleccionadaSinResponsable({}));
                dispatch(setCurrentSeccionSeleccionadaSinResponsable(null));
                dispatch(setUnidadeCcdAsociado([]));
                dispatch(setCurrentUnidadAsociada(null));
              });
            }}
            style={{
              textAlign: 'center',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <Grid
              container
              sx={{
                justifyContent: 'center',
              }}
              spacing={2}
            >
              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                  // zIndex: 2,
                  justifyContent: 'center',
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}
                  sx={{ m: '20px 0' }}
                >
                  <Button
                    color="primary"
                    variant="outlined"
                    startIcon={<CleanIcon />}
                    onClick={() => {
                      reset_all([() => dispatch(resetStateUniResp())]);
                    }}
                  >
                    LIMPIAR CAMPOS
                  </Button>

                  <LoadingButton
                    loading={loadingButton}
                    color="success"
                    variant="contained"
                    type="submit"
                    startIcon={<SaveIcon />}
                  >
                    GUARDAR
                  </LoadingButton>

                  <Button
                    color="error"
                    variant="contained"
                    startIcon={<CloseIcon />}
                    onClick={() => {
                      getOutModule(navigate, [
                        () => dispatch(resetStateUniResp()),
                      ]);
                    }}
                  >
                    SALIR DEL MÓDULO
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
