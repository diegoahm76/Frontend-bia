import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useState } from 'react';
import { type Dayjs } from 'dayjs';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';

import { use_form } from '../../../hooks/useForm';
import { checking_authentication, change_tab } from '../store';
import { LoadingButton } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// import logo_bia from '.../../../assets/logos/logo_bia.png';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegisterForm: React.FC = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state: any) => state.auth);
  const is_authenticating = useMemo(() => status === 'checking', [status]);
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

  return (
    <form onSubmit={on_submit}>
      <Typography variant="h6" textAlign="center" pb={2}>
        Formulario registro
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={age}
              label="Age"
              fullWidth
              onChange={handle_change}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
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
        <Grid item justifyContent="center" container>
          <Grid xs={12} sm={8} md={4}>
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
          <Button
            fullWidth
            sx={{ textTransform: 'none', textAlign: 'center' }}
            onClick={() => {
              dispatch(change_tab('1'));
            }}
          >
            <Typography sx={{ color: 'black' }}>Iniciar sesión</Typography>
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
