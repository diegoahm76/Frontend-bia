/* eslint-disable @typescript-eslint/naming-convention */

import { Button, Grid, TextField } from '@mui/material';
import Select from 'react-select';
import { Title } from '../../../../components';
import { RenderDataGrid } from '../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { columns } from './../../../seguridad/screens/IndicesElectronicos/utils/colums';
import  AddIcon  from '@mui/icons-material/Add';
import  AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

export const Ejemplo = (): JSX.Element => {
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
          <Title title="Agendamiento de vehículos" />
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
          <Title title="Buscar elemento" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              //handleSubmit();
            }}
            style={{
              marginTop: '2.2rem',
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={4}
               sx={{
                  zIndex: 20,
                }}
              >
                <>
                  <Select
                    required
                    options={[
                      {
                        label: "Solicitud de viajes",
                        value: "Solicitud de viajes"
                      },
                      {
                        label: "Solicitud de viajes largos",
                        value: "Solicitud de viajes klargos"
                      },
                      {
                        label: "Solicitud de viajes cortois",
                        value: "Solicitud de viajes corso"
                      }
                    ] || []}
                    placeholder="Seleccionar"
                  />
                  <label>
                    <small
                      style={{
                        color: 'rgba(0, 0, 0, 0.6)',
                        fontWeight: 'thin',
                        fontSize: '0.75rem',
                        marginTop: '0.25rem',
                        marginLeft: '0.25rem',
                      }}
                    >
                      Tipo de solicitud
                    </small>
                  </label>
                </>
              </Grid>
              <Grid item xs={12} sm={4}
              >
                <TextField
                  fullWidth
                  label="Fecha inicio"
                  type="date"
                  size="small"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Fecha inicio"
                  type="date"
                  size="small"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            {/* listado de opciones, render de datos para cada busqueda */}
          </form>
        </Grid>
      </Grid>


      <RenderDataGrid
        rows={[]}
        columns={[]}
      />

<Grid
        container
        spacing={2}
        sx={{ mb: '20px', justifyContent: 'center', alignItems: 'center' }}
      >
        <Grid item xs={12} sm={4}>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            onClick={() => {
              //set_crear_organigrama_is_active(true);
            }}
            fullWidth
          >
            CREAR ORGANIGRAMA
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
         
            <Button
              variant="outlined"
              startIcon={<AssignmentTurnedInIcon />}
              fullWidth
            >
              ELEGIR ORGANIGRAMA
            </Button>

        </Grid>
        <Grid item xs={12} sm={4}>
        
            <Button
              variant="outlined"
              startIcon={<AssignmentTurnedInIcon />}
              fullWidth
            >
              ACTIVAR INSTRUMENTOS
            </Button>
         
        </Grid>
      </Grid>



    </>
  );
};
