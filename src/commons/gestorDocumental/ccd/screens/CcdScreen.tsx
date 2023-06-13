// Components Material UI
import { Grid, Box, Stack, ButtonGroup, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import SyncIcon from '@mui/icons-material/Sync';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { Title } from '../../../../components/Title';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CcdScreen: React.FC = () => {
  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Cuadro de clasificación documental" />
          <Box
            component="form"
            sx={{ mt: '20px' }}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}></Grid>
              <Grid item xs={12} sm={3}></Grid>
              <Grid item xs={12} sm={3}></Grid>
              <Grid item xs={12} sm={3}></Grid>
            </Grid>
            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mt: '20px' }}
            >
              <Button
                color="primary"
                variant="outlined"
                startIcon={<SearchIcon />}
              >
                BUSCAR
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                startIcon={<SyncIcon />}
              >
                ACTUALIZAR
              </Button>
              <Button
                color="success"
                variant="contained"
                startIcon={<CleanIcon />}
              >
                LIMPIAR
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      {/* {save_ccd && ( */}
      <>
        <Grid
          container
          sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26',
          }}
        >
          <Grid item xs={12}>
            <Title title="Registro de series y subseries" />
            <Box
              component="form"
              sx={{ mt: '20px' }}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              autoComplete="off"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2}></Grid>
                <Grid item xs={12} sm={4}>
                  <ButtonGroup
                    variant="contained"
                    aria-label=" primary button group"
                  >
                    <Button>CREAR</Button>
                    <Button disabled>CLONAR</Button>
                    <Button disabled>PREVISUALIZAR</Button>
                  </ButtonGroup>
                </Grid>
                <Grid item xs={12} sm={2}>
                  {/* <Controller
                    name="subserie"
                    control={control}
                    render={() => (
                      <Select
                        options={list_subsries}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                  {errors.subserie !== null && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )} */}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <ButtonGroup
                    variant="contained"
                    aria-label=" primary button group"
                  >
                    <Button>CREAR</Button>
                    <Button disabled>CLONAR</Button>
                    <Button disabled>PREVISUALIZAR</Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26',
          }}
        >
          <Grid item xs={12}>
            <Title title="Asignaciones" />
            <Box
              component="form"
              sx={{ mt: '20px', mb: '20px' }}
              noValidate
              autoComplete="off"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <label className="text-terciary">
                    {' '}
                    Unidades
                    <samp className="text-danger">*</samp>
                  </label>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <label className="text-terciary">
                    Series
                    <samp className="text-danger">*</samp>
                  </label>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <label className="text-terciary">
                    Subseries
                    <samp className="text-danger">*</samp>
                  </label>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    startIcon={<SaveIcon />}
                  >
                    EXPLORE TITS
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Grid item>
              <Box sx={{ width: '100%' }}>
                {/* <DataGrid
                  density="compact"
                  autoHeight
                  rows={assignments_ccd}
                  columns={columns_asignacion}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  experimentalFeatures={{ newEditingApi: true }}
                /> */}
              </Box>
            </Grid>
            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mt: '20px' }}
            >
              <Button
                color="success"
                variant="contained"
                startIcon={<SaveIcon />}
              >
                REANUDAR
              </Button>

              <Button
                color="success"
                variant="contained"
                startIcon={<SaveIcon />}
              >
                TERMINAR
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </>
    </>
  );
};
