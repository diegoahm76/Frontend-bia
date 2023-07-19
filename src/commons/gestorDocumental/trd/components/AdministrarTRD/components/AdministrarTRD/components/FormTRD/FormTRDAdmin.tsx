/* eslint-disable @typescript-eslint/naming-convention */

import { Box, Grid } from '@mui/material';
import { Title } from '../../../../../../../../../components';
import { useContext } from 'react';
import { ModalContextTRD } from '../../../../../../context/ModalsContextTrd';

export const FormTRDAdmin = (): JSX.Element => {
  //* define show or no show component

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { closeModalAdministracionTRD } = useContext(ModalContextTRD);

  return (
    <>
      <Grid xs={12} md={12}>
        <Box sx={{ width: '100%' }}>
          <Title title="Agregrar Características" />
        </Box>
      </Grid>
    </>
  );
};
