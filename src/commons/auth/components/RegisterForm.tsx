import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { type Dayjs } from 'dayjs';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

import { use_form } from '../../../hooks/useForm';
import { checking_authentication } from '../store';
import { LoadingButton } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { use_register } from '../hooks/registerHooks';
import { type IList } from '../interfaces/authModels';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegisterForm: React.FC = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state: any) => state.auth);
  const is_authenticating = useMemo(() => status === 'checking', [status]);
  const { get_selects_options, tipo_documento_options, tipo_persona_options } =
    use_register();

  const { email, password, on_input_change } = use_form({
    email: '',
    password: '',
  });
  const [age, set_age] = useState('');
  const [value, set_date] = useState<Dayjs | null>(null);

  const handle_change = (event: SelectChangeEvent): void => {
    set_age(event.target.value);
  };

  const on_submit = (event: any): void => {
    event.preventDefault();
    dispatch(checking_authentication(email, password));
  };

  useEffect(() => {
    void get_selects_options();
  }, []);

  return (
    <form onSubmit={on_submit}>
      <Typography variant="h6" textAlign="center" pb={2}>
        Formulario registro
      </Typography>
      <Grid container spacing={3} mt={0.1}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold">
            Datos personales
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">
              Tipo de persona
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={age}
              label="Tipo de persona"
              fullWidth
              onChange={handle_change}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {tipo_persona_options.map((e: IList, k: number) => {
                return (
                  <MenuItem value={e.value} key={k}>
                    {e.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">
              Tipo de documento
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={age}
              label="Tipo de documento"
              fullWidth
              onChange={handle_change}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {tipo_documento_options.map((e: IList, k: number) => {
                return (
                  <MenuItem value={e.value} key={k}>
                    {e.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          container
          justifyContent="center
        "
        >
          <Grid item>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="¿Requiere nombre comercial?"
              />
            </FormGroup>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Número de documento"
            value={email}
            name="email"
            onChange={on_input_change}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Dígito de verificación"
            value={email}
            name="email"
            onChange={on_input_change}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nombre comercial"
            value={email}
            name="email"
            onChange={on_input_change}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Primer nombre"
            value={email}
            name="email"
            onChange={on_input_change}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Segundo nombre"
            value={email}
            name="email"
            onChange={on_input_change}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Primer apellido"
            value={email}
            name="email"
            onChange={on_input_change}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Segundo apellido"
            value={email}
            name="email"
            onChange={on_input_change}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de nacimiento"
              value={value}
              onChange={(newValue) => {
                set_date(newValue);
              }}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold">
            Datos de notificación
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="E-mail"
            value={email}
            name="email"
            onChange={on_input_change}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Confirme su e-mail"
            value={email}
            name="email"
            onChange={on_input_change}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Celular"
            value={email}
            name="email"
            onChange={on_input_change}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Confirme su celular"
            value={email}
            name="email"
            onChange={on_input_change}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold">
            Datos de la cuenta
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nombre de usuario"
            value={email}
            name="email"
            onChange={on_input_change}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Contraseña"
            value={email}
            name="email"
            onChange={on_input_change}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Repita la contraseña"
            value={email}
            name="email"
            onChange={on_input_change}
          />
        </Grid>
        <Grid item justifyContent="center" container>
          <Grid item xs={12} sm={8} md={4}>
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              color="success"
              loading={is_authenticating}
              style={{ fontSize: '.9rem' }}
            >
              Registrarse
            </LoadingButton>
          </Grid>
        </Grid>
        <Grid item justifyContent="center" container>
          <Link to="/auth/login">
            <Typography className="no-decoration">Iniciar sesión</Typography>
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};
