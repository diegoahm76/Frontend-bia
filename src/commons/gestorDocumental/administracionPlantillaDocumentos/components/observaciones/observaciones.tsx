/* eslint-disable @typescript-eslint/naming-convention */
import {
  Button,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import { Title } from '../../../../../components/Title';
import { useContext } from 'react';
import { api } from '../../../../../api/axios';
import { MostrarModalBuscarPlantilla } from '../modalBuscarPlantilla/BuscarPlantilla';
import { useNavigate } from 'react-router-dom';
import { control_error, control_success } from '../../../ccd/componentes/crearSeriesCcdDialog/utils/success_errors';
import { FormCreacionContext, valores_defecto } from '../../context/CreaccionPlantillaContex';

export const ObservacionesAdministradorPlantillas: React.FC = () => {

  const { form, set_form } = useContext(FormCreacionContext);

  const HandleCompletarDatos = (e: any) => {
    set_form({
      ...form,
      [e.target.name]: e.target.value
    });
  }




  const navigate = useNavigate();




  const fetch_Crear_archivo_digital = async () => {
    try {
      const url = `/gestor/plantillas/plantilla_documento/create/`;

      // Crear un objeto FormData
      const formData = new FormData();

      // Agregar los campos del formulario al objeto FormData
      formData.append('nombre', form.nombre);
      formData.append('descripcion', form.descripcion);

      if (form.asociada_a_tipologia_doc_trd === "True") {
        formData.append('id_tipologia_doc_trd', form.id_tipologia_doc_trd.toString());
      } else {
        formData.append('otras_tipologias', form.otras_tipologias.toString());
      }
      formData.append('asociada_a_tipologia_doc_trd', form.asociada_a_tipologia_doc_trd.toString());

      formData.append('cod_tipo_acceso', form.cod_tipo_acceso);
      formData.append('codigo_formato_calidad_asociado', form.codigo_formato_calidad_asociado.toString());
      formData.append('version_formato_calidad_asociado', form.version_formato_calidad_asociado.toString());
      // formData.append('otras_tipologias', form.otras_tipologias.toString());
      formData.append('acceso_unidades', JSON.stringify(form.acceso_unidades_dos.map((id: any) => ({ id_unidad_organizacional: id.id_unidad_organizacional })),));
      formData.append('observacion', form.observacion.toString());
      formData.append('archivo', form.archivo);
      formData.append('activa', form.activa.toString());

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

  const fetch_Actualizar_archivo_digital = async () => {
    try {
      const url = `/gestor/plantillas/plantilla_documento/update/${form.id_actualizar}/`;

      // Crear un objeto FormData
      const formData = new FormData();


      if (form.asociada_a_tipologia_doc_trd === "True") {
        formData.append('id_tipologia_doc_trd', form.id_tipologia_doc_trd.toString());
      } else {
        formData.append('otras_tipologias', form.otras_tipologias.toString());
      }
      // Agregar los campos del formulario al objeto FormData
      formData.append('nombre', form.nombre);
      formData.append('descripcion', form.descripcion);
      formData.append('id_formato_tipo_medio', form.id_formato_tipo_medio);
      formData.append('asociada_a_tipologia_doc_trd', form.asociada_a_tipologia_doc_trd.toString());
      formData.append('cod_tipo_acceso', form.cod_tipo_acceso);
      formData.append('codigo_formato_calidad_asociado', form.codigo_formato_calidad_asociado.toString());
      formData.append('version_formato_calidad_asociado', form.version_formato_calidad_asociado.toString());
      // formData.append('otras_tipologias', form.otras_tipologias.toString());
      formData.append('acceso_unidades', JSON.stringify(form.acceso_unidades_dos.map((id: any) => ({ id_unidad_organizacional: id.id_unidad_organizacional })),));
      formData.append('observacion', form.observacion.toString());
      formData.append('activa', form.activa.toString());

      if (form.archivo) {
        formData.append('archivo', form.archivo);
      }

      const res = await api.put(url, formData, {
        // Configura las cabeceras adecuadamente si es necesario
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res && res.data) {
        // La solicitud fue exitosa
        control_success("se actualizó correctamente");
      } else {
        // La solicitud falló
        console.error('Error en la solicitud:', res ? res.statusText : 'Response undefined');
      }
    } catch (error: any) {
      // Manejar la excepción aquí
      control_error(error.response?.data?.detail || 'Error desconocido,revisa que estes enviadno todos los campos');
    }
  };




  const limpiar = () => {
    set_form(valores_defecto);

  }
  const getSwitchColors = (activa: boolean) => {
    return activa
      ? { color: 'success', background: 'green', label: 'Si' }
      : { color: 'error', background: 'red', label: 'No' };
  };



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
            value={form.observacion}
            onChange={HandleCompletarDatos}
            name="observacion"
            multiline
            rows={2}

          // error={emailMismatch}
          // helperText={emailMismatch ? "El campo de observaciones esta vacio " : ""}
          />
        </Grid>

        <Grid item container spacing={1} style={{ marginLeft: 15 }}>
         
            <h5>Activo</h5>
    
          <Grid item xs={10} sm={4} >


            <FormControlLabel
              control={
                <Switch
                  checked={form.activa === true}
                  onChange={(event) => {
                    HandleCompletarDatos({
                      target: {
                        name: 'activa',
                        value: event.target.checked,
                      },
                    });
                  }}
                  color={getSwitchColors(form.activa).color as "success" | "warning"}
                />
              }
              label={getSwitchColors(form.activa).label}
              sx={{
                '& .Mui-checked': {
                  color: 'white',
                },
                [`& .Mui-checked.Mui-${getSwitchColors(form.activa).color}`]: {
                  backgroundColor: getSwitchColors(form.activa).background,
                },
              }}
            />

          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
            <Button
              startIcon={<SaveIcon />}
              color={form.id_actualizar ? 'success' : 'success'} // Cambia el color según si es una actualización o creación
              fullWidth
              variant="contained"
              onClick={form.id_actualizar ? fetch_Actualizar_archivo_digital : fetch_Crear_archivo_digital}
            >
              {form.id_actualizar ? 'Actualizar' : 'Guardar'}
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
            <Button color='primary' variant="outlined" onClick={limpiar} fullWidth startIcon={<CleanIcon />}>
              Limpiar
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
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
