/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';
import { containerStyles } from '../../../../../../../gestorDocumental/tca/screens/utils/constants/constants';
import { Button, Grid, Stack } from '@mui/material';
import { Title } from '../../../../../../../../components';
import CleanIcon from '@mui/icons-material/CleaningServices';

export const CleanData: FC<any> = (): JSX.Element => {
  return (
    <>
      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="Acciones" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log('hello from submit');
            }}
            style={{
              marginTop: '20px'
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={8}
                sx={{
                  zIndex: 2
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  spacing={2}
                  sx={{ m: '20px 0' }}
                >
                  <Button
                    color="primary"
                    variant="outlined"
                    startIcon={<CleanIcon />}
                    onClick={() => {
                      // eslint-disable-next-line no-console
                      console.log('cleaning fields');
                    }}
                  >
                    REINICIAR CAMPOS
                  </Button>

                  <Button
                    color="primary"
                    variant="outlined"
                    startIcon={<CleanIcon />}
                    onClick={() => {
                      // eslint-disable-next-line no-console
                      console.log('cleaning fields');
                    }}
                  >
                    REINICIAR CAMPOS
                  </Button>


                  <Button
                    color="primary"
                    variant="outlined"
                    startIcon={<CleanIcon />}
                    onClick={() => {
                      // eslint-disable-next-line no-console
                      console.log('cleaning fields');
                    }}
                  >
                    REINICIAR CAMPOS
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
