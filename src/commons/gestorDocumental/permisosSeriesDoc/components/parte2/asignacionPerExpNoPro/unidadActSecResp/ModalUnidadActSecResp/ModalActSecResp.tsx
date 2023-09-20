/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack
} from '@mui/material';
import { Title } from '../../../../../../../../components';
import { RenderDataGrid } from '../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector } from '../../../../../../../../hooks';

export const ModalActSecResp = (params: any): JSX.Element => {
  const { modalUniProp, setmodalUniProp } = params;

  //* redux states
  const { unidadActuales } = useAppSelector((state) => state.PsdSlice);


  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={modalUniProp}
      onClose={() => {
        console.log('cerrando modal');
        setmodalUniProp(false);
      }}
    >
      <DialogTitle>
        <Title title="Unidades organizacionales actuales de la sección responsable" />
      </DialogTitle>
      <DialogContent sx={{ mb: '0px' }}>
        <Grid item xs={12}>
          <Grid container spacing={2}></Grid>
        </Grid>
        <RenderDataGrid columns={[]} rows={unidadActuales.filter((el) => !el.mostrar)} title="Unidades propias" />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Stack
          direction="row"
          spacing={2}
          sx={{ mr: '15px', mb: '10px', mt: '10px' }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              console.log('cerrando modal');
              setmodalUniProp(false);
            }}
            startIcon={<CloseIcon />}
          >
            CERRAR
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
