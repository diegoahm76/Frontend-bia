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
  // Otros objetos TipoPQR aquí...
];

export const PantallaPrinciipalConfiguracionPQR: React.FC = () => {
  const navigate = useNavigate();
  const [loading, set_loading] = useState(false);
  const [tipos_pqr, set_tipos_pqr] = useState<any>(null);
  const [PQR_seleccionado, set_PQR_seleccionado] = useState<string>('');
  const [consulta_letra, set_consulta_letra] = useState<TipoPQR[]>(data);

  const [tiempoRespuesta, setTiempoRespuesta] = useState(null); // Nuevo estado para el valor editable

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

  const [tipos_pqer, set_tipos_pqer] = useState<any>(null);
  console.log(tipos_pqer);

  const fetch_data_get_buscar_letraaaa = async (): Promise<void> => {
    try {
      const updatedDataEntidad: TipoPQR = {
        ...primerElementoConsulta,
        tiempo_respuesta_en_dias: tiempoRespuesta,
      };

      const payload = {
        ...updatedDataEntidad,
      };

      const response = await api.put('gestor/pqr/tipos_pqr/update/D/', payload);

      if (response.status === 200) {
        // La solicitud PUT fue exitosa
        const updatedEmail = response.data.tiempo_respuesta_en_dias;
        const updatedDataEntidadWithUpdatedEmail: TipoPQR = {
          ...updatedDataEntidad,
          tiempo_respuesta_en_dias: updatedEmail,
        };
        set_tipos_pqer(updatedDataEntidadWithUpdatedEmail);
        // Hacer algo con updatedDataEntidadWithUpdatedEmail si es necesario
      } else {
        // Manejar el caso en que la respuesta no fue exitosa
        console.error(
          'La solicitud PUT no fue exitosa. Código de estado:',
          response.status
        );
        // Puedes mostrar un mensaje de error al usuario si es apropiado
      }
    } catch (error) {
      // Manejar errores si es necesario
      console.error('Error al actualizar los datos:', error);
    }
  };

  const handleTiempoRespuestaChange = (event: any): void => {
    setTiempoRespuesta(event.target.value); // Actualizar el estado con el nuevo valor ingresado por el usuario
  };

  const handleChangeee = (): void => {
    fetch_data_get_buscar_letraaaa().catch((error) => {
      console.error(error);
    });

    set_loading(true);
  };

  const handleLimpiarCampos = (): void => {
    set_loading(false);
  };
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
          <Title title="Configuracion Tipos PQR" />
        </Grid>

        <Grid item container spacing={1} style={{ margin: 1 }}>
          <Grid item xs={12} sm={4} md={2}>
            <h5>Registrado desde:</h5>
          </Grid>
          <Grid item xs={12} sm={5} md={4.5} lg={3} xl={2}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={PQR_seleccionado}
                label="PQR_seleccionado"
                onChange={(event): any => {
                  set_PQR_seleccionado(event.target.value);
                }}
              >
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
            <h5>Codigo de PQR:</h5>
          </Grid>
          <Grid item sm={3}>
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
            <h5>Tiempo de respuesta:</h5>
            <h1>{tiempoRespuesta}</h1>
          </Grid>
          <Grid item sm={4}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              name="email_sucursal"
              value={tiempoRespuesta} // Usar el estado para el valor editable
              onChange={handleTiempoRespuestaChange} // Manejar cambios en el input
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
                  handleChangeee,
                  '¿Estás seguro de realizar este proceso?'
                );
              }}
              loading={loading} // Set the loading prop
            >
              Guardar
            </LoadingButton>
          </Grid>

          <Grid item xs={12} sm={2}>
            <Button
              startIcon={<CleanIcon />}
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleLimpiarCampos}
            >
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
              }}
            >
              Salir
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
