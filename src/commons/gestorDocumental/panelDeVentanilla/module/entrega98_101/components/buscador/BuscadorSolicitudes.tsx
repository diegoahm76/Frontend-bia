/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { useContext } from 'react';
import { PanelVentanillaContext } from '../../../../context/PanelVentanillaContext';
interface BuscadorSolicitudesProps {
  setRadicado: (radicado: string) => void;
  radicado: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export const BuscadorSolicitudes = ({ setRadicado, radicado, onChange, onSubmit }: BuscadorSolicitudesProps): JSX.Element => {
  const { setExpanded } = useContext(PanelVentanillaContext);

  const handleClearFields = () => {
    setRadicado('');
    setExpanded(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
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
          mt: '20px',
        }}
      >
        <form onSubmit={handleSubmit}>
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
                onChange={onChange}
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
              onClick={handleClearFields}
            >
              LIMPIAR CAMPOS
            </Button>
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
};