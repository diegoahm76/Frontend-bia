/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, Stack } from '@mui/material';
import { Title } from '../../../components';
import { containerStyles } from '../../../commons/gestorDocumental/tca/screens/utils/constants/constants';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';
import { getOutModule, reset_all } from '../../functions/getOutOfModule';
import { AccionesFinalModuloProps } from '../types/acciones.types';

// ? átomo módulo de acciones finales
export const AccionesFinalModulo = (
  props: AccionesFinalModuloProps
): JSX.Element => {
  const { loadingButton, handleSubmit, reset_states, textGuardar = 'GUARDAR' } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
                      reset_all([
                        () => {
                          try {
                            dispatch(reset_states());
                          } catch (error) {
                            reset_states();
                          }
                        },
                      ]);
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
                    {textGuardar}
                  </LoadingButton>

                  <Button
                    color="error"
                    variant="contained"
                    startIcon={<CloseIcon />}
                    onClick={() => {
                      getOutModule(navigate, [() => {
                        try {
                          dispatch(reset_states());
                        } catch (error) {
                          reset_states();
                        }
                      }]);
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
