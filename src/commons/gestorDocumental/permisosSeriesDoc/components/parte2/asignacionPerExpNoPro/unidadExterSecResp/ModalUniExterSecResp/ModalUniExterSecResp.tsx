/* eslint-disable @typescript-eslint/naming-convention */
import {
  Button,
  ButtonGroup,
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

export const ModalUniExterSecResp = (params: any): JSX.Element => {
  const { modalUniExt, setmodalUniExt } = params;
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={modalUniExt}
      onClose={() => {
        console.log('cerrando modal');
        setmodalUniExt(false);
      }}
    >
      <DialogTitle>
        <Title title="Unidades organizacionales actuales externas a la sección responsable" />
      </DialogTitle>
      <DialogContent sx={{ mb: '0px' }}>
        <Grid item xs={12}>
          <Grid container spacing={2}></Grid>
        </Grid>
        <RenderDataGrid columns={[]} rows={[]} title="Unidades externas" />
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
              setmodalUniExt(false);
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
