/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';

export const BuscadorSolicitudes = (props: any): JSX.Element => {
  const { setRadicado, radicado, onChange, onSubmit } = props;

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
        <Grid
          item
          xs={12}
          sx={{
            justifyContent: 'center',
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            style={{
              marginTop: '20px',
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                justifyContent: 'center',
              }}
            >
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  label="Radicado"
                  size="small"
                  variant="outlined"
                  value={radicado}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    onChange(e);
                  }}
                  inputProps={{ maxLength: 200 }}
                />
              </Grid>
            </Grid>

            <Stack
              direction="row"
              justifyContent="center"
              spacing={2}
              sx={{ mb: '20px', mt: '20px' }}
            >
              <Button
                type="submit"
                color="primary"
                variant="contained"
                startIcon={<SearchIcon />}
              >
                BUSCAR RADICADO
              </Button>

              <Button
                color="primary"
                variant="outlined"
                startIcon={<CleanIcon />}
                onClick={() => {
                  setRadicado('');
                }}
              >
                LIMPIAR CAMPOS
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </>
  );
};