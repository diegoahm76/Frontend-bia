/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC, useState, useEffect } from 'react';
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
  reset_states,
  setAgrupacionesPersistentesSerieSubserie,
  setHomologacionAgrupacionesSerieSubserie,
} from '../../../toolkit/slice/HomologacionesSeriesSlice';
import { postPersistenciasConfirmadas } from '../../../toolkit/thunks/createHomologacion.service';
import {
  fnGetHomologacionUnidades,
  fnGetUnidadesPersistentes,
} from '../../../toolkit/thunks/seccionesPersistentes.service';

export const Acciones: FC<any> = (): JSX.Element | null => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* navigate declaration
  const navigate = useNavigate();
  // ? loading  para los botones guardar y proceder respectivamente
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  // ! states from redux
  const {
    ccdOrganigramaCurrentBusqueda,
    unidadesPersistentes,
    agrupacionesPersistentesSerieSubserie,
    relacionesAlmacenamientoLocal,
    P,
  } = useAppSelector((state) => state.HomologacionesSlice);

  const handleSubmit = () => {
    if (Object.keys(relacionesAlmacenamientoLocal).length > 0) {
      const agrupaciones: any = Object.values(
        relacionesAlmacenamientoLocal
      ).reduce(
        (acc: any, curr: any) => [
          ...acc,
          ...(curr?.agrupacionesPersistentesSerieSubserie || []),
        ],
        []
      );

      const objectToSend = {
        id_ccd_nuevo: ccdOrganigramaCurrentBusqueda?.id_ccd,
        unidades_persistentes: unidadesPersistentes.map((el: any) => ({
          id_unidad_actual: el.id_unidad_actual,
          id_unidad_nueva: el.id_unidad_nueva,
        })),
        catalagos_persistentes: agrupaciones?.map((el: any) => ({
          id_catalogo_serie_actual: el.id_catalogo_serie_actual,
          id_catalogo_serie_nueva: el.id_catalogo_serie_nueva,
        })),
      };

      console.log(objectToSend);
    }

    const dataToSend = {
      id_ccd_nuevo: ccdOrganigramaCurrentBusqueda?.id_ccd,
      unidades_persistentes: unidadesPersistentes.map((el: any) => ({
        id_unidad_actual: el.id_unidad_actual,
        id_unidad_nueva: el.id_unidad_nueva,
      })),
      catalagos_persistentes: agrupacionesPersistentesSerieSubserie.map(
        (el: any) => ({
          id_catalogo_serie_actual: el.id_catalogo_serie_actual,
          id_catalogo_serie_nueva: el.id_catalogo_serie_nueva,
        })
      ),
    };

    // console.log(dataToSend);

    // ! funcion de envío de datos
    void postPersistenciasConfirmadas({
      setLoading: setLoadingButton,
      dataToPost: dataToSend,
    }).then((res) => {
      //* se hace el llamado de nuevo a todos los servicios para actualizar los datos
      void fnGetHomologacionUnidades(ccdOrganigramaCurrentBusqueda?.id_ccd);
      void fnGetUnidadesPersistentes(ccdOrganigramaCurrentBusqueda?.id_ccd);

      dispatch(setHomologacionAgrupacionesSerieSubserie([]));
      dispatch(setAgrupacionesPersistentesSerieSubserie([]));

      /* if (res) {
        getOutModule(navigate, [() => dispatch(reset_states())]);
      } */
    });
  };

  if (!ccdOrganigramaCurrentBusqueda) return null;

  return (
    <>
      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="Acciones" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
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
                      reset_all([() => dispatch(reset_states())]);
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
                      getOutModule(navigate, [() => dispatch(reset_states())]);
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
