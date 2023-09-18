/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC, useState, useEffect } from 'react';
import { Button, Grid, Stack } from '@mui/material';
import CleanIcon from '@mui/icons-material/CleaningServices';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { containerStyles } from '../../../tca/screens/utils/constants/constants';
import { Title } from '../../../../../components';
import { usePSD } from '../../hook/usePSD';

export const Acciones: FC<any> = (): JSX.Element | null => {
  //* dispatch declaration
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useAppDispatch();
  // ? loading  para los botones guardar y proceder respectivamente
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  // ! states from redux
  const {
    current_unidad_organizacional,
    currentSeriesSubseries,

    //* info necesaria,
    restriccionesParaTodasLasUnidadesOrganizacionales,
    restriccionesParaUnidadesDiferentesAlaSeccionOsubseccionActualResponsable
  } = useAppSelector((state) => state.PsdSlice);

  //* usePSD
  const { reset_all } = usePSD();

  // ? validaciones de renderizado
  if (!current_unidad_organizacional || !currentSeriesSubseries) return null;

  const handleSubmit = () => {
    try {
      setLoadingButton(true);
      const restricciones = restriccionesParaTodasLasUnidadesOrganizacionales
        .concat(
          restriccionesParaUnidadesDiferentesAlaSeccionOsubseccionActualResponsable
        )
        .reduce(
          (obj: any, item: any) => {
            obj[item.id] = item.checked;
            return obj;
          },
          { id_cat_serie_und_org_ccd: currentSeriesSubseries.id_cat_serie_und }
        );
      console.log(restricciones);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingButton(false);
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

                  <Link to="/app/home">
                    <Button
                      color="error"
                      variant="contained"
                      startIcon={<CloseIcon />}
                    >
                      SALIR DEL MÓDULO
                    </Button>
                  </Link>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
