/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import Select from 'react-select';
import { Title } from '../../../../components';
import { RenderDataGrid } from '../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { columns } from './../../../seguridad/screens/IndicesElectronicos/utils/colums';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AddIcon from '@mui/icons-material/Add';

export const EjemploResponsive = (): JSX.Element => {

  const columns = [
    {
      headerName: "Nombre",
      field: "nombre",
      width: 200,
    },
    {
      headerName: "Apellido",
      field: "apellido",
      width: 200,
    },
    {
      headerName: "Edad",
      field: "edad",
      width: 200,
    },
    {
      headerName: "Acciones",
      field: "acciones",
      width: 200,
      renderCell: () => {
        return (
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
          >
            Editar
          </Button>
        )
      }
    }
  ]

  const rows = [
    {
      id: 1,
      nombre: "Juan",
      apellido: "Perez",
      edad: 30
    },
    {
      id: 2,
      nombre: "Maria",
      apellido: "Lopez",
      edad: 25
    },
    {
      id: 3,
      nombre: "Pedro",
      apellido: "Gonzalez",
      edad: 40
    }
  ]



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

        <Grid
          container
          sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            mb: '20px',
            mt: '20px',
            boxShadow: '0px 3px 6px #042F4A26',
          }}
        >
          <Grid item xs={12}>
            <Title title="Solicitud de viajes" />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // handleSubmit();
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
                      options={[] || []}
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
      </Grid>

      <RenderDataGrid title="Listado de solicitudes" rows={rows} columns={columns} />

      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          mt: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            my: '.2rem',
          }}
        >
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            onClick={() => {
              // set_crear_organigrama_is_active(true);
            }}
            fullWidth
          >
            CREAR ORGANIGRAMA
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            my: '.2rem',
          }}
        >
          <Button
            variant="outlined"
            startIcon={<AssignmentTurnedInIcon />}
            fullWidth
          >
            ELEGIR ORGANIGRAMA
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            my: '.2rem',
          }}
        >
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
