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
import { resetStateUniResp } from '../../../toolkit/slice/types/AsignacionUniResp';

export const Acciones: FC<any> = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* navigate declaration
  const navigate = useNavigate();
  // ? loading  para los botones guardar y proceder respectivamente
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  // ! states from redux
  const {
    ccdOrganigramaCurrentBusqueda,
    listadoDeAsignaciones,
    seriesSeccionSeleccionadaSinResponsable,
  } = useAppSelector((state) => state.AsigUniRespSlice);

  /* "id_ccd_nuevo": 176,
    "unidades_responsables":[
        {
        "id_unidad_actual":5384,
        "id_unidad_nueva":5388
        }
    ] */
  const handleSubmit = () => {
    setLoadingButton(true);
    const dataToSend = {
      id_ccd_nuevo: ccdOrganigramaCurrentBusqueda?.id_ccd,
      unidades_responsables: listadoDeAsignaciones?.map((element: any) => {
        return {
          id_unidad_actual:
            seriesSeccionSeleccionadaSinResponsable?.seccionSeleccionada
              ?.id_unidad_organizacional,
          id_unidad_nueva: element.id_unidad_seccion_nueva,
        };
      }),
    };
    console.log(dataToSend);
    setLoadingButton(false);
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
