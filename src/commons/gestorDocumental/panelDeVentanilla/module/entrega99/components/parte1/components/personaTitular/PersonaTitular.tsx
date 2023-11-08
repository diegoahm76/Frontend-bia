/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, Stack, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Title } from '../../../../../../../../../components';

export const PersonaTitular = (): JSX.Element => {
  return (
    <Grid item xs={12}
      sx={{
        mt: '2rem',
      }}
    >
      <Title title="Persona titular de la PQRSDF" />
      <form
        style={{
          marginTop: '3rem',
        }}
        onSubmit={(e: any) => {
          console.log('submit');
          // on_submit_create_ccd(e);
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              // margin="dense"
              required
              fullWidth
              disabled={false}
              size="small"
              label="Nombre CCD"
              variant="outlined"
              value={'siuuuu'}
              onChange={(e) => {
                console.log(e);
              }}
              // error={!(error == null)}
              inputProps={{
                maxLength: 50,
              }}
              /*helperText={
                    error != null
                      ? 'Es obligatorio ingresar un nombre'
                      : 'Ingrese nombre*'
                  }*/
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              fullWidth
              disabled={false}
              size="small"
              label="Versión CCD"
              variant="outlined"
              value={'iji siuu'}
              inputProps={{
                maxLength: 10,
              }}
              // error={!(error == null)}
              onChange={(e) => {
                console.log(e);
              }}
              /*  helperText={
                    error != null
                      ? 'Es obligatorio ingresar una versión'
                      : 'Ingrese versión*'
                  }*/
            />
          </Grid>
          {/* new spaces */}
          <Grid item xs={12} sm={3}>
            <TextField
              required
              fullWidth
              size="small"
              label="Valor aumento series CCD"
              /*  style={{
                    color:
                      series_ccd.length > 0 || ccd_current?.fecha_terminado
                        ? 'red'
                        : 'blue',
                  }}*/
              disabled={false}
              variant="outlined"
              value={'hola sss'}
              onChange={() => {}}
              // error={!(error == null)}
              /* helperText={
                    error != null
                      ? 'Es obligatorio ingresar un valor de aumento de serie'
                      : 'Ingrese valor aumento series*'
                  }*/
            />
          </Grid>
          {/* second new space */}
          <Grid item xs={12} sm={3}>
            <TextField
              required
              fullWidth
              size="small"
              label="valor aumento subseries CCD"
              variant="outlined"
              disabled={false}
              value={'hola'}
              onChange={() => {}}
              // error={!(error == null)}
              /* helperText={
                    error != null
                      ? 'Es obligatorio ingresar un valor de aumento de subserie'
                      : 'Ingrese valor aumento subseries*'
                  }*/
            />
          </Grid>
          {/* third new spaces  */}
          {/* fourth new spaces, optional for the support route  */}
          <Grid item xs={12} sm={3}>
            <>
              <Button
                variant="contained"
                component="label"
                style={{
                  marginTop: '.15rem',
                  width: '100%',
                }}
                startIcon={<CloudUploadIcon />}
              >
                Archivo subido
                <input
                  style={{ display: 'none' }}
                  type="file"
                  accept="application/pdf"
                  disabled={false}
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                />
              </Button>
              <label htmlFor="">
                <small
                  style={{
                    color: 'rgba(0, 0, 0, 0.6)',
                    fontWeight: 'thin',
                    fontSize: '0.75rem',
                  }}
                >
                  Seleccione archivo
                </small>
              </label>
            </>
          </Grid>

          <Grid item xs={12} sm={2} sx={{ marginTop: '.15rem' }}>
            {/*<DownloadButton
              fileName="ruta_soporte"
              condition={
                ccd_current === null ||
                ccd_current?.ruta_soporte === null ||
                ccd_current?.ruta_soporte === ''
              }
              fileUrl={ccd_current?.ruta_soporte}
            />*/}
          </Grid>

          {/* end new spaces */}
        </Grid>
        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={2}
          sx={{ mt: '20px' }}
        >
          {/* <Button
            color="primary"
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={() => {
              set_consulta_ccd_is_active(true);
            }}
          >
            BUSCAR CCD
          </Button>*/}

          {/* <LoadingButton
            loading={loadingButton}
            type="submit"
            color="success"
            variant="contained"
            disabled={ccd_current?.actual}
            startIcon={ccd_current != null ? <SyncIcon /> : <SaveIcon />}
          >
            {ccd_current != null ? 'ACTUALIZAR CCD' : 'CREAR CCD'}
          </LoadingButton> */}
          {/* <Button
            color="primary"
            variant="outlined"
            startIcon={<CleanIcon />}
            onClick={() => {
              console.log('clean');
            }}
          >
            LIMPIAR CAMPOS
          </Button>*/}
        </Stack>
      </form>
    </Grid>
  );
};
