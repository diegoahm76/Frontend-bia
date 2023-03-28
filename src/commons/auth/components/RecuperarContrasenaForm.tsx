import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecuperarContrasena: React.FC = () => {
  return (
    <>
      <Grid item>
        <Typography
          textAlign="center"
          variant={'body2'}
          sx={{ mb: '10px' }}
          paragraph
        >
          Escriba su correo electrónico para recuperar su contraseña
        </Typography>
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <InputLabel htmlFor="recuperar_contrasena">E-mail</InputLabel>
          <OutlinedInput
            required
            id="recuperar_contrasena"
            label="E-mail"
            type="email"
            startAdornment={
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <Grid item justifyContent="center" container>
          <Button
            type="submit"
            variant="contained"
            size="small"
            color="success"
            disableElevation
            // loading={}
            // disabled={disable}
            style={{ fontSize: '.9rem' }}
          >
            Enviar
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
