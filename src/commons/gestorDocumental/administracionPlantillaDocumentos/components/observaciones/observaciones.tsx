/* eslint-disable @typescript-eslint/naming-convention */
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import { Title } from '../../../../../components/Title';
import { useContext, useEffect, useState } from 'react';
import { api } from '../../../../../api/axios';
import { MostrarModalBuscarPlantilla } from '../modalBuscarPlantilla/BuscarPlantilla';
import { useNavigate } from 'react-router-dom';
import { control_error, control_success } from '../../../ccd/componentes/crearSeriesCcdDialog/utils/success_errors';
import { FormCreacionContext } from '../../context/CreaccionPlantillaContex';

export const ObservacionesAdministradorPlantillas: React.FC = () => {

  const { form } = useContext(FormCreacionContext);
  const navigate = useNavigate();

  const [tipos_pqr, set_tipos_pqr] = useState<any>(null);
  const [PQR_seleccionado, set_PQR_seleccionado] = useState<string>('');
  const fetch_data_get = async (): Promise<void> => {
    try {
      const url = `/gestor/choices/cod-tipo-pqrs/`;
      const res: any = await api.get(url);
      const numero_consulta: any = res.data.data;
      set_tipos_pqr(numero_consulta);
      // control_success("se creo correctamente");
    } catch (error:any) {
      control_error(error.response.detail)
    }
  };




  // const fetch_Crear_archivo_digital = async () => {
  //   try {
  //     const url = `/gestor/plantillas/plantilla_documento/create/`;
  //     const putData = 
  //      form
  //     ;

  //     const res = await api.post(url, putData);

  //   } catch (error:any) {
  //     control_error(error.response.data.detail);
  //   }otro_seleccionado
  // };


  const fetch_Crear_archivo_digital = async () => {
    try {
      const url = `/gestor/plantillas/plantilla_documento/create/`;

      // Crear un objeto FormData
      const formData = new FormData();

      // Agregar los campos del formulario al objeto FormData
      formData.append('nombre', form.nombre);
      formData.append('descripcion', form.descripcion);
      formData.append('id_formato_tipo_medio', form.id_formato_tipo_medio);
      formData.append('asociada_a_tipologia_doc_trd', form.asociada_a_tipologia_doc_trd.toString());
      formData.append('cod_tipo_acceso', form.cod_tipo_acceso);
      formData.append('codigo_formato_calidad_asociado', form.codigo_formato_calidad_asociado.toString());
      formData.append('version_formato_calidad_asociado', form.version_formato_calidad_asociado.toString());

      // Agregar el archivo al objeto FormData
      if (form.archivo) {
        formData.append('archivo', form.archivo);
      }

      const res = await api.post(url, formData, {
        // Configura las cabeceras adecuadamente si es necesario
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data) {
        // La solicitud fue exitosa
        control_success("se creo correctamente");
      } else {
        // La solicitud falló
        console.error('Error en la solicitud:', res.statusText);
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };




  useEffect(() => {
    fetch_data_get().catch((error) => {
      console.error(error);
    });
  }, []);

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
          <Title title="Obsevaciones" />
        </Grid>

        <Grid item xs={12}>
          <TextField
            style={{ width: '100%', marginTop: 20 }}
            label={`Observacion`}
            id="description"
            value={12345648}

          // error={emailMismatch}
          // helperText={emailMismatch ? "El campo de observaciones esta vacio " : ""}
          />
        </Grid>

        <Grid item container spacing={1} style={{ margin: 1 }}>
          <Grid item xs={2} >
            <h5>Activo</h5>
          </Grid>
          <Grid item xs={10} sm={4}>
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

        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
            <Button
              startIcon={<SaveIcon />}
              color='success' // Cambia el color según si es una actualización o creación
              fullWidth
              variant="contained"
              onClick={fetch_Crear_archivo_digital}
            >
              Guardar
            </Button>
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <Button color="error" fullWidth variant="outlined">
              borrar
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
            <Button color='primary' variant="outlined" fullWidth startIcon={<CleanIcon />}>
              Limpiar
            </Button>
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <MostrarModalBuscarPlantilla />
          </Grid>

          <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
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
