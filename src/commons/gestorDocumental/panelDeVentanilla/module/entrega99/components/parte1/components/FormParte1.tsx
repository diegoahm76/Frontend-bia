/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { RenderDataGrid } from '../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';

export const FormParte1 = (): JSX.Element => {
  return (
    <form
      style={{
        marginTop: '3rem',
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          mb: '2rem',
        }}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            disabled
            size="small"
            label="Tipo de PQRSDF"
            variant="outlined"
            value={'Definición nueva pqrsdf'}
            inputProps={{
              maxLength: 50,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            disabled
            size="small"
            label="Estado"
            variant="outlined"
            value={'En espera de respuesta'}
            inputProps={{
              maxLength: 10,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Número de radicado de entrada"
            disabled
            variant="outlined"
            value={'#8'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Fecha de radicado de entrada"
            variant="outlined"
            disabled
            value={'1006877856'}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            multiline
            sx={{
              textAlign: 'center',
            }}
            rows={2}
            size="small"
            label="Fecha de radicado de entrada"
            variant="outlined"
            disabled
            value={'1006877856'}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            multiline
            sx={{
              textAlign: 'center',
              mt: '1.5rem',
              mb: '1.5rem',
            }}
            rows={5}
            size="small"
            label="Descripción de la PQRSDF"
            variant="outlined"
            disabled
            value={
              'Se describe una nueva pqrsdf dentro del módulo de gestor documental'
            }
          />
        </Grid>

        {/* tabla de elementos a mostrar */}
        <RenderDataGrid
          title="Tabla de elementos a mostrar"
          columns={[]}
          rows={[]}
        />
      </Grid>

      <Grid
        item
        xs={12}
        sm={12}
        sx={{
          width: '100%',
          maxWidth: '100%',
          mt: '2rem',
          textAlign: 'center',
          paddingBottom: '2rem',
        }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            console.log('click siuuu');
          }}
          sx={{
            width: '60%',
          }}
        >
          Crear solicitud
        </Button>
      </Grid>
    </form>
  );
};
