import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, Grid, Skeleton, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import { type BaseSyntheticEvent, useState } from 'react';
import {
  type FieldValues,
  type UseFormRegister,
  type FieldErrors,
  useForm,
} from 'react-hook-form';
import { CustomSelect, Title } from '../../../components';
import { type IList } from '.';
import { RegisterForm } from '../../auth/components/RegisterForm';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const TabPanel: (props: TabPanelProps) => JSX.Element = (
  props: TabPanelProps
) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11y_props = (
  index: number
): {
  id: string;
  'aria-controls': string;
} => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
};

interface Row {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

const create_data = (
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
): Row => {
  return { name, calories, fat, carbs, protein };
};

const rows = [
  create_data('Frozen yoghurt', 159, 6.0, 24, 4.0),
  create_data('Ice cream sandwich', 237, 9.0, 37, 4.3),
  create_data('Eclair', 262, 16.0, 24, 6.0),
  create_data('Cupcake', 305, 3.7, 67, 4.3),
  create_data('Gingerbread', 356, 16.0, 49, 3.9),
];

interface PropsBuscador {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  loading: boolean;
  tipo_documento_opt: IList[];
  tipo_persona_opt: IList[];
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Buscador: (props: PropsBuscador) => JSX.Element = ({
  register,
  errors,
  onSubmit,
  loading,
  tipo_documento_opt,
  tipo_persona_opt,
}: PropsBuscador) => {
  const [loading_button] = useState(false);
  const [tipo_documento] = useState('');
  const [tipo_persona] = useState('');
  const handle_change = (): void => {
    console.log('first');
  };
  const handle_change_select = (): void => {
    console.log('first');
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          void onSubmit(e);
        }}
      >
        <Grid container spacing={2} sx={{ mt: '10px', mb: '20px' }}>
          <Grid item xs={12} sm={6} md={3}>
            <CustomSelect
              onChange={handle_change_select}
              label="Tipo de persona *"
              name="tipo_persona"
              value={tipo_persona}
              options={tipo_persona_opt}
              loading={loading}
              disabled={false}
              required={true}
              errors={errors}
              register={register}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomSelect
              onChange={handle_change_select}
              label="Tipo de documento *"
              name="tipo_documento"
              value={tipo_documento}
              options={tipo_documento_opt}
              loading={loading}
              disabled={loading}
              required={true}
              errors={errors}
              register={register}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={45} />
            ) : (
              <TextField
                fullWidth
                label="Número de documento *"
                type="number"
                size="small"
                disabled={tipo_persona === ''}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                error={errors.numero_documento?.type === 'required'}
                helperText={
                  errors.numero_documento?.type === 'required'
                    ? 'Este campo es obligatorio'
                    : ''
                }
                {...register('numero_documento', {
                  required: true,
                })}
                onChange={handle_change}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={45} />
            ) : (
              <LoadingButton
                type="submit"
                loading={loading_button}
                loadingPosition="start"
                startIcon={<SearchIcon />}
                variant="contained"
              >
                {loading_button ? 'BUSCANDO' : 'BUSCAR'}
              </LoadingButton>
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
};

const tipo_documento_opt: IList[] = [{ label: 'Test', value: '1' }];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdministracionPersonas: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit: handle_submit,
  } = useForm();
  const theme = useTheme();
  const [value, set_value] = useState(0);

  const handle_change = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    set_value(newValue);
  };

  const handle_change_index = (index: number): void => {
    set_value(index);
  };

  const [loading, set_loading] = useState(false);

  const on_submit = handle_submit((data) => {
    console.log('first');
    set_loading(true);
  });

  return (
    <Grid container>
      <Grid item xs={12}>
        <Card variant="outlined" sx={{ borderRadius: 5, padding: '20px' }}>
          <Title title="Administrar Personas" />
          <Tabs
            value={value}
            onChange={handle_change}
            indicatorColor="secondary"
            textColor="inherit"
            aria-label="full width tabs example"
            sx={{ mt: '10px' }}
          >
            <Tab label="Personas" {...a11y_props(0)} />
            <Tab label="Usuarios" {...a11y_props(1)} />
            <Tab label="Ventanilla" {...a11y_props(2)} />
            <Tab label="Empleados" {...a11y_props(3)} />
          </Tabs>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handle_change_index}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <TableContainer component={Paper}>
                <Buscador
                  errors={errors}
                  register={register}
                  loading={loading}
                  onSubmit={on_submit}
                  tipo_documento_opt={tipo_documento_opt}
                  tipo_persona_opt={tipo_documento_opt}
                />
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Dessert (100g serving)</TableCell>
                      <TableCell align="right">Calories</TableCell>
                      <TableCell align="right">Fat&nbsp;(g)</TableCell>
                      <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                      <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <RegisterForm uso_interno={false} />
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
              Item Four
            </TabPanel>
          </SwipeableViews>
        </Card>
      </Grid>
    </Grid>
  );
};
