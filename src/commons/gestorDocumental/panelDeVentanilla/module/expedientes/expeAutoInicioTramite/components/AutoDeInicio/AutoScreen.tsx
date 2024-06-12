/* eslint-disable @typescript-eslint/naming-convention */
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Stack, TextField } from '@mui/material';
import React, { useContext } from 'react'
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';
import { Title } from '../../../../../../../../components';
import { Controller, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import  SaveIcon  from '@mui/icons-material/Save';
import  CloseIcon  from '@mui/icons-material/Close';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AutoScreen = (): JSX.Element => {
  const {openModalOne,  handleOpenModalOne, openModalTwo, handleOpenModalTwo} = useContext(ModalAndLoadingContext);

  const {
    control,
    reset,
    watch,
  } = useForm()


  return (
    <Dialog
    fullWidth
    maxWidth="lg"
    open={openModalOne}
    onClose={() => {
     /* set_is_modal_active(false);
      dispatch(get_ccds([]));
      reset_search_ccd({ nombre_ccd: '', version: '' });*/
    }}
  >
    <DialogTitle>
      <Title title="Crear auto de inicio" />
    </DialogTitle>
    {/*    <Divider /> */}
    <DialogContent sx={{ mb: '0px' }}>
      <Grid item xs={12}>
        <form
          style={{
            marginTop: '20px',
            marginBottom: '20px'
          }}
          onSubmit={(e: any) => {
            e.preventDefault();
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Controller
                name="plantilla"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error }
                }) => (
                  <TextField
                    type="number"
                    fullWidth
                    size="small"
                    label="Versión CCD"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio ingresar una versión'
                        : 'Ingrese versión'
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Stack
                direction="row"
                spacing={2}
                //  sx={{ mr: '15px', mb: '10px', mt: '10px' }}
              >
                <LoadingButton
                  loading={openModalTwo}
                  color="primary"
                  variant="contained"
                  type="submit"
                  startIcon={<SaveIcon/>}
                >
                  crear auto de inicio
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Grid>
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
          /*  set_is_modal_active(false);
            dispatch(get_ccds([]));
            reset_search_ccd({ nombre_ccd: '', version: '' });*/
          }}
          startIcon={<CloseIcon />}
        >
          CERRAR
        </Button>
      </Stack>
    </DialogActions>
  </Dialog>
  )
}
