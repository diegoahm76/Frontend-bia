/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from 'react-hook-form';
import {
  Grid,
  TextField,
  MenuItem,
  Dialog,
  // DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  Divider,
  Typography,
  FormControlLabel,
  Switch,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Title } from './Title';
import { useState } from 'react';
import type { Direccion, keys_direccion } from '../interfaces/globalModels';
import { Geolocalizacion } from '../commons/gestorDocumental/TramitesOServicios/screens/geolocalizacionScreen';

interface Props {

  open: boolean;
  openDialog: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (value: string, type: string) => void;
  type: string;
}

const ubicacion_options = [
  { label: 'Urbano', value: 'URB' },
  { label: 'Rural', value: 'RUR' },
];

const via_principal_options = [
  { label: 'Autopista', value: 'AUTOPISTA' },
  { label: 'Avenida', value: 'AVENIDA' },
  { label: 'Boulevar', value: 'BOULEVAR' },
  { label: 'Calle', value: 'CALLE' },
  { label: 'Carrera', value: 'CARRERA' },
  { label: 'Circunvalar', value: 'CIRCUNVALAR' },
  { label: 'Diagonal', value: 'DIAGONAL' },
  { label: 'Kilómetro', value: 'KILOMETRO' },
  { label: 'Sector', value: 'SECTOR' },
  { label: 'Transversal', value: 'TRANSVERSAL' },
];

const letras_options = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
  { label: 'D', value: 'D' },
  { label: 'E', value: 'E' },
  { label: 'F', value: 'F' },
  { label: 'G', value: 'G' },
  { label: 'H', value: 'H' },
  { label: 'I', value: 'I' },
  { label: 'J', value: 'J' },
  { label: 'K', value: 'K' },
  { label: 'L', value: 'L' },
  { label: 'M', value: 'M' },
  { label: 'N', value: 'N' },
  { label: 'O', value: 'O' },
  { label: 'P', value: 'P' },
  { label: 'Q', value: 'Q' },
  { label: 'R', value: 'R' },
  { label: 'S', value: 'S' },
  { label: 'T', value: 'T' },
  { label: 'U', value: 'U' },
  { label: 'V', value: 'V' },
  { label: 'W', value: 'W' },
  { label: 'X', value: 'X' },
  { label: 'Y', value: 'Y' },
  { label: 'Z', value: 'Z' },
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DialogGeneradorDeDirecciones: React.FC<Props> = ({
  open,
  openDialog,
  onChange,
  type,
}: Props) => {
  const {
    handleSubmit: handle_submit,
    register,
    setValue: set_value,
    getValues: get_values,
    formState: { errors },
  } = useForm<Direccion>({
    defaultValues: {
      ubicacion: '',
      via_principal: '',
      numero_o_nombre_via: '',
      letras_via_principal: '',
      prefijo_bis: '',
      letra_prefijo: '',
      cuadrante: '',
      Cordenada: '',
      via_secundaria: '',
      numero_o_nombre_via_secundaria: '',
      numero_referencia: '',
      letras_via_secundaria: '',
      sufijo_bis: '',
      letra_sufijo: '',
      cuadrante_secundaria: '',
      Informacion_Adicional:'',
      coordenada_x:'',
      coordenada_y:'',
      barrio: '',
      nombre: '',
      direccion_estandarizada: '',
    },
  });
  const [data_direction, set_data_direction] = useState<Direccion>({
    prefijo_bis: '',
    letra_prefijo: '',
    cuadrante: '',
    Cordenada: '',
    via_secundaria: '',
    numero_o_nombre_via_secundaria: '',
    numero_referencia: '',
    letras_via_secundaria: '',
    sufijo_bis: '',
    letra_sufijo: '',
    cuadrante_secundaria: '',
    Informacion_Adicional:'',
    coordenada_x:'',
    coordenada_y:'',
    barrio: '',
    nombre: '',
    direccion_estandarizada: '',
    ubicacion: '',
    numero_o_nombre_via: '',
    letras_via_principal: '',
    via_principal: ''
  });
  const [direccion_estandarizada, set_direccion_estandariazada] = useState('');

  const set_value_form = (name: string, value: string): void => {
    set_data_direction({
      ...data_direction,
      [name]: value.toUpperCase(),
    });
    set_value(name as keys_direccion, value.toUpperCase());

    set_data_direction({
      ...data_direction,
      direccion_estandarizada: Object.values(data_direction)
        .join(' ')
        .toUpperCase(),
    });
    if (name !== 'direccion_estandarizada') {
      set_direccion_estandariazada(
        Object.values(get_values()).join(' ').toUpperCase()
      );
      set_value(
        'direccion_estandarizada',
        Object.values(data_direction).join(' ').toUpperCase()
      );
    }
  };

  // Cambio inputs
  const handle_change = (e: React.ChangeEvent<HTMLInputElement>): void => {
    set_value_form(e.target.name, e.target.value);
  };

  const clear_data_form = (): void => {
    set_data_direction({
      ubicacion: '',
      numero_o_nombre_via: '',
      letras_via_principal: '',
      prefijo_bis: '',
      letra_prefijo: '',
      cuadrante: '',
      Cordenada: '',
      via_secundaria: '',
      via_principal: '',
      numero_o_nombre_via_secundaria: '',
      numero_referencia: '',
      letras_via_secundaria: '',
      sufijo_bis: '',
      letra_sufijo: '',
      cuadrante_secundaria: '',
      Informacion_Adicional:'',
      coordenada_x: '',
      coordenada_y: '',
      barrio: '',
      nombre: '',
      direccion_estandarizada: '',
    });
    set_value('ubicacion', '');
    set_value('numero_o_nombre_via', '');
    set_value('letras_via_principal', '');
    set_value('prefijo_bis', '');
    set_value('letra_prefijo', '');
    set_value('cuadrante', '');
    set_value('Cordenada', '');
    set_value('via_secundaria', '');
    set_value('numero_o_nombre_via_secundaria', '');
    set_value('numero_referencia', '');
    set_value('letras_via_secundaria', '');
    set_value('sufijo_bis', '');
    set_value('letra_sufijo', '');
    set_value('letra_sufijo', '');
    set_value('Informacion_Adicional', '');
    set_value('coordenada_x', '');
    set_value('coordenada_y', '');
    set_value('barrio', '');
    set_value('nombre', '');
    set_value('direccion_estandarizada', '');
    set_value('via_principal', '');
    openDialog(false);
  };

  const on_submit = handle_submit(() => {
    onChange(direccion_estandarizada, type);
    clear_data_form();
  });


  const opciones_cordenadas = [
    { value: 'sur', label: 'Sur' },
    { value: 'norte', label: 'Norte' },
    { value: 'este', label: 'Este' },
    { value: 'oeste', label: 'Oeste' },
  ];


  // const coordenada_x = 4.142;
  // const coordenada_y = -73.62664;

  const [mostrarGeolocalizacion, setMostrarGeolocalizacion] = useState(false);

  const toggleMostrarGeolocalizacion = () => {
    setMostrarGeolocalizacion(!mostrarGeolocalizacion);
  };


  return (
    <Dialog maxWidth="lg" open={open} onClose={clear_data_form}>
      <form
        onSubmit={(e) => {
          //  console.log('')(errors, 'errors')
          void on_submit(e);
        }}
      >
        <DialogTitle>
          <Grid
            container
            spacing={2}
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '20px', mb: '20px',
              boxShadow: '0px 3px 6px #042F4A26',
              marginTop: '20px',
              marginLeft: '-5px',
            }}
          >
            <Grid item xs={12} sx={{ marginTop: "-20px" }}     >
              < Title title=" Generador de direcciones" />
            </Grid>
          </Grid>
          <IconButton
            aria-label="close"
            onClick={() => {
              openDialog(false);
            }}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          {/* DIRECCION PRINCIPAL */}
          <Grid
            container
            spacing={2}
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '20px', mb: '20px',
              boxShadow: '0px 3px 6px #042F4A26',
              marginTop: '6px',
              marginLeft: '-5px',
            }}
          >
            <Grid container spacing={2} sx={{ mb: '20px' }}>
              <Grid item xs={12} sm={4} md={3}>
                <TextField
                  {...register('ubicacion', { required: true })}
                  error={errors.ubicacion?.type === 'required'}
                  helperText={
                    errors.ubicacion?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : ''
                  }
                  onChange={handle_change}
                  select
                  defaultValue={''}
                  label="Ubicación"
                  size="small"
                  fullWidth
                >
                  {ubicacion_options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Title title="Datos de dirección principal" />
              </Grid>


              <Grid container style={{ margin: 15 }}>



                <Grid item xs={12} sm={4} md={3}>
                  <TextField
                    {...register('via_principal', { required: true })}
                    error={errors.via_principal?.type === 'required'}
                    helperText={
                      errors.via_principal?.type === 'required'
                        ? 'Este campo es obligatorio'
                        : ''
                    }
                    onChange={handle_change}
                    select
                    defaultValue={''}
                    label="Vía principal"
                    size="small"
                    fullWidth
                  >
                    {via_principal_options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

              </Grid>


              <Grid item xs={12} sm={3} md={3}>
                <TextField
                  {...register('numero_o_nombre_via', { required: true })}
                  error={errors.numero_o_nombre_via?.type === 'required'}
                  helperText={
                    errors.numero_o_nombre_via?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : ''
                  }
                  onChange={handle_change}
                  label="Nombre o número de la vía *"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3} md={2}>
                <TextField
                  {...register('letras_via_principal')}
                  onChange={handle_change}
                  select
                  defaultValue={''}
                  label="Letra"
                  size="small"
                  fullWidth
                >
                  {letras_options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={3} md={2}>
                <TextField
                  {...register('prefijo_bis')}
                  onChange={handle_change}
                  label="Prefijo bis"
                  size="small"
                  fullWidth
                />
              </Grid>


              <Grid item xs={12} sm={3} md={2}>
                <TextField
                  {...register('cuadrante')}
                  onChange={handle_change}
                  select
                  defaultValue={''}
                  label="Letra"
                  size="small"
                  fullWidth
                >
                  {letras_options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>



              <Grid item xs={12} sm={3} md={2}>
                <TextField
                  {...register('Cordenada')}
                  onChange={handle_change}
                  select
                  defaultValue={''}
                  label="Cordenada"
                  size="small"
                  fullWidth
                >
                  {opciones_cordenadas.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>






              <Grid item xs={1}>
                <Grid container alignItems="center" justifyContent="center">
                  <Typography style={{ height: 0, marginTop: 0 }} variant="h6">
                    #
                  </Typography>
                </Grid>
              </Grid>








              {/* <Grid item xs={12} sm={3} md={3}>
                <TextField
                  {...register('via_secundaria', { required: true })}
                  error={errors.via_secundaria?.type === 'required'}
                  helperText={
                    errors.via_secundaria?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : ''
                  }
                  onChange={handle_change}
                  select
                  defaultValue={''}
                  label="Vía secundaria"
                  size="small"
                  fullWidth
                >
                  {via_principal_options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid> */}




              <Grid item xs={12} sm={4} md={3}>
                <TextField
                  {...register('numero_o_nombre_via_secundaria', {
                    required: true,
                  })}
                  error={
                    errors.numero_o_nombre_via_secundaria?.type === 'required'
                  }
                  helperText={
                    errors.numero_o_nombre_via_secundaria?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : ''
                  }
                  onChange={handle_change}
                  label="Nombre o número de la vía *"
                  size="small"
                  fullWidth
                />
              </Grid>

              
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  {...register('numero_referencia')}
                  onChange={handle_change}
                  select
                  defaultValue={''}
                  label="Letra"
                  size="small"
                  fullWidth
                >
                  {letras_options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>



              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  {...register('letras_via_secundaria')}
                  onChange={handle_change}
                  label="Sufijo bis"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  {...register('sufijo_bis')}
                  onChange={handle_change}
                  select
                  defaultValue={''}
                  label="Letra"
                  size="small"
                  fullWidth
                >
                  {letras_options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

              </Grid>



              <Grid item xs={1}>
                <Grid container alignItems="center" justifyContent="center">
                  <Typography style={{ height: 0, marginTop: 0 }} variant="h4">
                    -
                  </Typography>
                </Grid>
              </Grid>


              <Grid item xs={12} sm={4} md={3}>
                <TextField
                  {...register('letra_sufijo', {
                    required: true,
                  })}
                  error={
                    errors.letra_sufijo?.type === 'required'
                  }
                  helperText={
                    errors.letra_sufijo?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : ''
                  }
                  onChange={handle_change}
                  label="Nombre o numero de la via*"
                  size="small"
                  fullWidth
                />
              </Grid>



              <Grid item xs={12} sm={3}>
                <TextField
                  {...register('cuadrante_secundaria')}
                  onChange={handle_change}
                  select
                  defaultValue={''}
                  label="Cordenada"
                  size="small"
                  fullWidth
                >
                  {opciones_cordenadas.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>


              <Grid item xs={6} >
                <TextField
                  {...register('Informacion_Adicional')}
                  onChange={handle_change}
                  label="Informacion Adicional"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} >
              <Grid container alignItems="center" justifyContent="center">

                <FormControlLabel
                  control={
                    <Switch
                    checked={mostrarGeolocalizacion}
                    onChange={toggleMostrarGeolocalizacion}
                    color="primary"
                    />
                  }
                  label="Mostrar Geolocalización"
                  />
                  </Grid>
              </Grid>


              {mostrarGeolocalizacion && <>


                <Grid item xs={6} >
                  <TextField
                    {...register('coordenada_x')}
                    onChange={handle_change}
                    label="Cordenada x"
                    size="small"
                    style={{width:"95%"}}
                    fullWidth
                  />
                </Grid>


                <Grid item xs={6} >
                  <TextField
                    {...register('coordenada_y')}
                    onChange={handle_change}
                    label="Cordenada y"
                    style={{width:"95%"}}
                    size="small"
                    fullWidth
                  />
                </Grid>


                <Grid item xs={12}>
                  <Geolocalizacion coordenada_x={222} coordenada_y={data_direction.coordenada_y} />

                </Grid>
              </>}



              <Grid item xs={12}>
                <TextField
                  {...register('direccion_estandarizada', { required: true })}
                  error={errors.direccion_estandarizada?.type === 'required'}
                  helperText={
                    errors.direccion_estandarizada?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : ''
                  }
                  value={direccion_estandarizada}
                  label="Dirección generada *"
                  fullWidth
                  multiline
                  maxRows={4}
                  disabled
                />
              </Grid>





            </Grid>

            {/* <DialogActions> */}
            <Grid container spacing={2} padding={2} justifyContent="flex-end">
              <Grid item xs={12} sm={2} md={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  fullWidth
                  startIcon={<SaveIcon />}
                >
                  Guardar
                </Button>
              </Grid>
            </Grid>
            {/* </DialogActions> */}
          </Grid>
        </DialogContent>
      </form>
    </Dialog>
  );
};