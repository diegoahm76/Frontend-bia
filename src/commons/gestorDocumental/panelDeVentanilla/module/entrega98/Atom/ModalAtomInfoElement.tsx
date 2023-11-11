/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, Stack, TextField } from '@mui/material';

// ? icons
import CloseIcon from '@mui/icons-material/Close';

// ? components
import { Title } from '../../../../../../components';
import { RenderDataGrid } from '../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { useNavigate } from 'react-router-dom';

export const ModalAtomInfoElement = (props: any): JSX.Element => {
  // ! debe recibir una cantidad de props aprox de 10

  //* navigate declaration
  const navigate = useNavigate();

  const { infoTitle } = props;
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
          <Title title={infoTitle || 'Información'} />
          <Grid
            container
            spacing={2}
            sx={{
              mt: '1.5rem',
              mb: '2rem',
            }}
          >
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Radicado"
                size="small"
                variant="outlined"
                // value={value}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => {
                  // onChange(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Títular"
                size="small"
                variant="outlined"
                // value={value}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => {
                  // onChange(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Cantidad de anexos"
                size="small"
                variant="outlined"
                // value={value}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => {
                  // onChange(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Asunto"
                size="small"
                variant="outlined"
                // value={value}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => {
                  // onChange(e.target.value);
                  console.log(e.target.value);
                  // console.log(e.target.value);
                }}
              />
            </Grid>
          </Grid>

          {/* renderDataGrid - se debe adaptar */}
          <RenderDataGrid
            rows={[]}
            columns={[]}
            title="Listado de anexos"
            // ? se debe reemplazar ese button por el ojito que aparecere dentro de las columnas de la tabla para así ver los anexos
            aditionalElement={
              <>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    console.log('cambiando a ver pqrsdf');
                  }}
                >
                  Ver anexo numero 1
                </Button>
              </>
            }
          />

          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ mb: '20px', mt: '20px' }}
          >
            <Button
              color="error"
              variant="contained"
              // ? ---  numero 2 -----
              onClick={() => {
                navigate('/app/gestor_documental/panel_ventanilla/');

                //* se debe también limpiar el estado para que al salir de dicha vista todo vaya en 0
              }}
              startIcon={<CloseIcon />}
            >
              CERRAR - Volver
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
