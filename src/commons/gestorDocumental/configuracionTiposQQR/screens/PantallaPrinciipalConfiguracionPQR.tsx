/* eslint-disable @typescript-eslint/naming-convention */
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Title } from '../../../../components/Title';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import CleanIcon from '@mui/icons-material/CleaningServices';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../../api/axios';
import { confirmarAccion } from '../../deposito/utils/function';
import { control_error, control_success } from '../../../seguridad/components/SucursalEntidad/utils/control_error_or_success';


interface TipoPQR {
  cod_tipo_pqr: string;
  cod_tipo_pqr_legible: string;
  nombre: string;
  tiempo_respuesta_en_dias: number | null;
}

const data: TipoPQR[] = [
  {
    cod_tipo_pqr: '',
    cod_tipo_pqr_legible: '',
    nombre: '',
    tiempo_respuesta_en_dias: null,
  },
];

export const PantallaPrinciipalConfiguracionPQR: React.FC = () => {
  const navigate = useNavigate();
  const [loading, set_loading] = useState(false);
  const [tipos_pqr, set_tipos_pqr] = useState<any>(null);
  const [PQR_seleccionado, set_PQR_seleccionado] = useState<string>('');
  const [consulta_letra, set_consulta_letra] = useState<TipoPQR[]>(data);
  const [tiempoRespuesta, setTiempoRespuesta] = useState<number | null>(null); // Nuevo estado para el valor editable
  const [activador, set_activador] = useState(false);
  const [tipos_pqer, set_tipos_pqer] = useState<any>(null);

  const fetch_data_get = async (): Promise<void> => {
    try {
      const url = `/gestor/choices/cod-tipo-pqrs/`;
      const res: any = await api.get(url);
      const numero_consulta: any = res.data.data;
      set_tipos_pqr(numero_consulta);
    } catch (error) {
      console.error(error);
    }
  };

  const fetch_data_get_buscar_letra = async (): Promise<void> => {
    try {
      // Verificar si PQR_seleccionado es un string vacío
      if (PQR_seleccionado.trim() === '') {
        set_loading(false);
        // PQR_seleccionado es un string vacío, no ejecutar el fetch
        return;
      }

      const url = `/gestor/pqr/tipos_pqr/get/${PQR_seleccionado}/`;
      const res: any = await api.get(url);
      const dato_consulta_letra: any = res.data.data;
      set_consulta_letra(dato_consulta_letra);
      const primerElementoConsulta = dato_consulta_letra[0];
      const { tiempo_respuesta_en_dias } = primerElementoConsulta;
      setTiempoRespuesta(
        tiempo_respuesta_en_dias !== null ? tiempo_respuesta_en_dias : 0
      );
    } catch (error) {
      console.error(error);
    }
  };

  const primerElementoConsulta = consulta_letra[0];
  const { cod_tipo_pqr } = primerElementoConsulta;

  const fetch_data_get_buscar_letraaaa = async (): Promise<void> => {
    try {
      set_loading(true);

      if (tiempoRespuesta === null || tiempoRespuesta <= 0) {
        // tiempoRespuesta no cumple con las condiciones, mostrar un mensaje de error o manejarlo según tus necesidades 

        set_loading(false);
        control_error('El valor de tiempo de respuesta no es válido');


        return; // Salir de la función sin hacer la solicitud PUT
      }

      const updatedDataEntidad: TipoPQR = {
        ...primerElementoConsulta,
        tiempo_respuesta_en_dias: tiempoRespuesta,
      };

      const payload = {
        ...updatedDataEntidad,
      };

      const response = await api.put(
        `gestor/pqr/tipos_pqr/update/${PQR_seleccionado}/`,
        payload
      );

      const updatedEmail = response.data.tiempo_respuesta_en_dias;
      const updatedDataEntidadWithUpdatedEmail: TipoPQR = {
        ...updatedDataEntidad,
        tiempo_respuesta_en_dias: updatedEmail,
      };
      set_tipos_pqer(updatedDataEntidadWithUpdatedEmail);
      control_success('Tiempo de respuesta actualizado correctamente');

      set_loading(false);
    } catch (error:any) {
      control_error(error.response.data.detail);
    }finally{
      set_loading(false);
    }
    set_loading(false);
    set_activador(true);
  };


  const handleTiempoRespuestaChange = (event: any): void => {
    setTiempoRespuesta(event.target.value); // Actualizar el estado con el nuevo valor ingresado por el usuario
  };

  const handleChange_guardar = (): void => {
    fetch_data_get_buscar_letraaaa().catch((error) => {
      console.error(error);
    });
  };

  const handleLimpiarCampos = (): void => {
    set_consulta_letra(data);
    setTiempoRespuesta(null);
    set_PQR_seleccionado('');
    set_loading(false);
    handleLimpiarCamposss();
  };

  const handleLimpiarCamposss = (): void => {

    setTiempoRespuesta(0); // Actualizar el estado con el nuevo valor ingresado por el usuario
  };

  useEffect(() => {
    fetch_data_get().catch((error) => {
      console.error(error);
    });
  }, [activador]);

  useEffect(() => {
    fetch_data_get_buscar_letra().catch((error) => {
      console.error(error);
    });
  }, [activador]);

  useEffect(() => {
    fetch_data_get_buscar_letra().catch((error) => {
      console.error(error);
    });
  }, [PQR_seleccionado]);

  useEffect(() => {
    fetch_data_get().catch((error) => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    fetch_data_get().catch((error) => {
      console.error(error);
    });
  }, [tipos_pqer]);

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
          <Title title="Configuracion Tipos PQRSDF" />
        </Grid>

        <Grid item container spacing={1} style={{ margin: 1 }}>
          <Grid item xs={12} sm={4} md={2}>
            <h5>Registrado Desde:</h5>
          </Grid>
          <Grid item xs={12} sm={5}>
            <FormControl fullWidth>
              <Select
                value={PQR_seleccionado}
                onChange={(event): any => {
                  set_PQR_seleccionado(event.target.value);
                }} >
                {tipos_pqr?.map((item: any, index: number) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid item container spacing={1} style={{ margin: 1 }}>
          <Grid item xs={12} sm={4} md={2}>
            <h5>Codigo de PQRSDF:</h5>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              name="email_sucursal"
              value={cod_tipo_pqr}
              style={{ marginTop: 9, width: '95%' }}
            />
          </Grid>
        </Grid>

        <Grid item container spacing={1} style={{ margin: 1 }}>
          <Grid item xs={12} sm={4} md={2}>
            <h5>Tiempo de Respuesta:</h5>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              value={
                tiempoRespuesta !== null && tiempoRespuesta !== 0
                  ? tiempoRespuesta
                  : ''
              }
              onChange={handleTiempoRespuestaChange}
              style={{ marginTop: 9, width: '95%' }}
            />
          </Grid>
        </Grid>

        <Grid
          container
          marginTop={2}
          spacing={2}
          direction="row"
          justifyContent="flex-end"
        >
          <Grid item xs={12} sm={2.2}>
            <LoadingButton
              startIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <SaveIcon />
                )
              }
              variant="contained"
              fullWidth
              color="success"
              onClick={() => {
                void confirmarAccion(
                  handleChange_guardar,
                  '¿Estás seguro de realizar este proceso?'
                );
              }}
              loading={loading}  >
              Guardar
            </LoadingButton>
          </Grid>

          <Grid item xs={12} sm={2}>
            <Button
              startIcon={<CleanIcon />}
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleLimpiarCampos}>
              limpiar
            </Button>
          </Grid>

          <Grid item xs={12} sm={2}>
            <Button
              startIcon={<ClearIcon />}
              fullWidth
              variant="contained"
              color="error"
              onClick={() => {
                navigate('/app/home');
              }}   >
              Salir
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
