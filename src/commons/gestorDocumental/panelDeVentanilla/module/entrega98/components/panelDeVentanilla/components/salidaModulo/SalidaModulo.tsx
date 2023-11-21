/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, Stack } from '@mui/material';
import React from 'react';
import { Title } from '../../../../../../../../../components';
import { containerStyles } from '../../../../../../../tca/screens/utils/constants/constants';
import CleanIcon from '@mui/icons-material/CleaningServices';
import CloseIcon from '@mui/icons-material/Close';
import {
  getOutModule,
  reset_all,
} from '../../../../../../../../../utils/functions/getOutOfModule';
import { useNavigate } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../hooks';
import { usePanelVentanilla } from '../../../../../../hook/usePanelVentanilla';
import { resetPanelVentanillaFull } from '../../../../../../toolkit/store/PanelVentanillaStore';

export const SalidaModulo = (): JSX.Element => {
  //* navigate declaration
  const navigate = useNavigate();
  //* dispatch declaration
  const dispatch = useAppDispatch();

  // ? redux states

  const { currentElementPqrsdComplementoTramitesYotros } = useAppSelector(
    (state) => state.PanelVentanillaSlice
  );

  return (
    <>
      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="Acciones" />
          <section
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
                    color="error"
                    variant="contained"
                    startIcon={<CloseIcon />}
                    onClick={() => {
                      getOutModule(navigate, [
                        () => console.log('haz salido del módulo'),
                      ]);
                    }}
                  >
                    SALIR DEL MÓDULO
                  </Button>

                  {currentElementPqrsdComplementoTramitesYotros && (
                    <Button
                      color="primary"
                      variant="outlined"
                      startIcon={<CleanIcon />}
                      onClick={() => {
                        reset_all([() => dispatch(resetPanelVentanillaFull())]);
                      }}
                    >
                      REINICIAR MÓDULO
                    </Button>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </section>
        </Grid>
      </Grid>
    </>
  );
};
