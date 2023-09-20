/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC, useState, useEffect } from 'react';
import { Button, Grid, Stack } from '@mui/material';
import CleanIcon from '@mui/icons-material/CleaningServices';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { useAppSelector } from '../../../../../hooks';
import { containerStyles } from '../../../tca/screens/utils/constants/constants';
import { Title } from '../../../../../components';
import { usePSD } from '../../hook/usePSD';
import { putPSD } from '../../toolkit/thunks/thunksPartThree';

export const Acciones: FC<any> = (): JSX.Element | null => {
  // ? loading  para los botones guardar y proceder respectivamente
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  // ! states from redux
  const {
    current_unidad_organizacional,
    currentSeriesSubseries,

    //* info necesaria,
    restriccionesParaTodasLasUnidadesOrganizacionales,
    restriccionesParaUnidadesDiferentesAlaSeccionOsubseccionActualResponsable,


    //* arrays de permisos
    unidadActuales,
    unidadesActualesExternas
  } = useAppSelector((state) => state.PsdSlice);

  //* usePSD
  const { reset_all, getOutModule } = usePSD();

  // ? validaciones de renderizado
  if (!current_unidad_organizacional || !currentSeriesSubseries) return null;

  const handleSubmit = () => {
    try {
      const restricciones = restriccionesParaTodasLasUnidadesOrganizacionales
        .concat(restriccionesParaUnidadesDiferentesAlaSeccionOsubseccionActualResponsable)
        .reduce((obj: any, item: any) => {
          obj[item.id] = item.checked;
          return obj;
        }, {});

      if (Object.values(restricciones).some((checked) => checked)) {
        restricciones.id_cat_serie_und_org_ccd = currentSeriesSubseries.id_cat_serie_und;
      } else {
        restricciones.id_cat_serie_und_org_ccd = null;
      }
          //* se recibe la información de ambos arrays de permisos para mandar un único objeto de información

         const unidades_permisos = [
          ...unidadActuales.map((unidad) => ({
            ...unidad,
            pertenece_seccion_actual_admin_serie: true,
            id_cat_serie_und_org_ccd: +unidad.id_cat_serie_und_org_ccd
          })),
          ...unidadesActualesExternas.map((unidad) => ({
            ...unidad,
            pertenece_seccion_actual_admin_serie: false,
            id_cat_serie_und_org_ccd: +unidad.id_cat_serie_und_org_ccd
          }))
         ]

     const objetoToSend ={
        unidades_permisos,
        restricciones
     }

     void putPSD(
      currentSeriesSubseries.id_cat_serie_und,
      objetoToSend,
      setLoadingButton,
     ).then((res) => {
      console.log(res);
      // reset_all()
      });

      console.log('objetoToSend', objetoToSend);
      console.log(restricciones);
    } catch (error) {
      console.log(error);
    }
  };
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
              marginTop: '20px'
            }}
          >
            <Grid
              container
              sx={{
                justifyContent: 'center'
              }}
              spacing={2}
            >
              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                  // zIndex: 2,
                  justifyContent: 'center'
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
                    onClick={reset_all}
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
                      onClick={getOutModule}
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
