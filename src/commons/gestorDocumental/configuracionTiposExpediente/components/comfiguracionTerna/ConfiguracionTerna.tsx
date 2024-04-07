/* eslint-disable @typescript-eslint/naming-convention */
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { useEffect, useState } from 'react';
import { api } from '../../../../../api/axios';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import { control_error, control_success } from '../../../../seguridad/components/SucursalEntidad/utils/control_error_or_success';
import { ModalConfiguracionTiposExpedientes } from '../modalTiposExpedientes/ModalConfiguracionTiposExpedientes';
import { confirmarAccion } from '../../../deposito/utils/function';
import CleanIcon from '@mui/icons-material/CleaningServices';
interface AgnoExpediente {
  agno_expediente: number;
  cantidad_digitos: number;
  cod_tipo_expediente: string;
  cod_tipo_expediente_display: string;
  consecutivo_inicial: number;
  id_cat_serie_undorg_ccd: number;
  consecutivo_actual: number;
  id_config_tipo_expediente_agno: number;

}



const inicial_datos_form: AgnoExpediente = {
  cantidad_digitos: 0,
  consecutivo_inicial: 0,
  cod_tipo_expediente: '',
  cod_tipo_expediente_display: '',
  agno_expediente: 0, // Agrega un valor inicial para agno_expediente
  id_cat_serie_undorg_ccd: 0,
  consecutivo_actual: 0,
  id_config_tipo_expediente_agno: 0,

};




export const ConfiguracionTerna: React.FC = () => {


  const year = new Date().getFullYear();

  const [form_data, set_form_data] = useState<AgnoExpediente>(inicial_datos_form);
  const [variable_choise_seccion, set_variable_choise_seccion] = useState<string>("");
  const [variable_serie_subserie, set_variable_serie_subserie] = useState<any>(); // Inicializa variablex con un valor inicial en este caso, una cadena vacía.

  const [seccionoSubseccion, set_seccionoSubseccion] = useState<any>([]);
  const [get_serie_subserie, set_get_serie_subserie] = useState<any>([]);
  const [choise_estructura_expediente, set_choise_estructura_expediente] = useState<any>([]);
  const [existendatos, set_existen_datos] = useState<boolean>(false);



  const handle_creacion_form = (e: any) => {
    set_form_data({
      ...form_data,
      [e.target.name]: e.target.value,
    });
  }

  const navigate = useNavigate();


  const limpiar_datos = () => {
    set_form_data(inicial_datos_form),
      set_existen_datos(false)
  }
  const fetch_choise_seccionsubseccion = async (): Promise<void> => {
    try {
      const url = `/gestor/configuracion-tipos-expendientes/seccion-subseccion/get/`;
      const res: any = await api.get(url);
      const numero_consulta: any = res.data.data;
      set_seccionoSubseccion(numero_consulta);
    } catch (error) {
      console.error(error);
    }
  };

  const fetch_dataw_get = async (): Promise<void> => {
    if (variable_choise_seccion === '') {
      return;
    }
    try {
      const url = `gestor/configuracion-tipos-expendientes/serie-subserie-unidad/get/${variable_choise_seccion}/`;
      const res: any = await api.get(url);
      const numero_consulta: any = res.data.data;
      set_get_serie_subserie(numero_consulta);
    } catch (error) {
      console.error(error);
    }
  };

  const fetch_EstructuraExpediente = async (): Promise<void> => {
    try {
      const url = `gestor/choices/estructura-tipo-expendiente/`;
      const res: any = await api.get(url);
      const consulta_EstructuraExpediente: any = res.data.data;
      set_choise_estructura_expediente(consulta_EstructuraExpediente);
    } catch (error: any) {
      console.error(error.response.data.detail);
    }
  };

  const consultar_datos_existentes = async (): Promise<void> => {
    if (variable_serie_subserie === '') {
      return;
    }
    try {
      const url = `gestor/configuracion-tipos-expendientes/configuracion-tipo-expediente-agno/get-serie-unidad/${variable_serie_subserie}/act/`;
      const res: any = await api.get(url);
      const datos_consultados: any = res.data.data;
      const { id_config_tipo_expediente_agno, id_cat_serie_undorg_ccd, cantidad_digitos, cod_tipo_expediente, consecutivo_inicial, consecutivo_actual, agno_expediente } = datos_consultados[0];
      set_form_data({
        ...form_data,
        id_cat_serie_undorg_ccd,
        cantidad_digitos,
        consecutivo_inicial,
        consecutivo_actual,
        agno_expediente,
        cod_tipo_expediente,
        id_config_tipo_expediente_agno,
      });
      set_existen_datos(true);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        set_existen_datos(false);
        limpiar_datos();
      } else {
        control_error(error.response.data.detail);
      }
    }
  };

  const actualizar_datos_existentes = async () => {
    try {
      const url = `/gestor/configuracion-tipos-expendientes/configuracion-tipo-expediente-agno/update/${form_data.id_config_tipo_expediente_agno}/`;
      const putData = {
        "cod_tipo_expediente": form_data.cod_tipo_expediente,
        "consecutivo_inicial": +form_data.consecutivo_inicial,
        "cantidad_digitos": +form_data.cantidad_digitos,
      };

      const res = await api.put(url, putData);
      control_success("se actualizo exitosamente")
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };

  const crear_configuracion_expediente = async () => {
    try {
      const url = '/gestor/configuracion-tipos-expendientes/configuracion-tipo-expediente-agno/create/';
      const postData = {
        "id_cat_serie_undorg_ccd": variable_serie_subserie,
        "agno_expediente": year,
        "cod_tipo_expediente": form_data.cod_tipo_expediente,
        "consecutivo_inicial": +form_data.consecutivo_inicial,
        "cantidad_digitos": +form_data.cantidad_digitos

      };
      const res = await api.post(url, postData);
      const numeroConsulta = res.data.data;

      control_success("se creo correctamente");
    } catch (error: any) {

      control_error(error.response.data.detail);
    }
  };


  useEffect(() => {
    fetch_choise_seccionsubseccion().catch((error) => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    fetch_EstructuraExpediente().catch((error) => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    fetch_dataw_get().catch((error) => {
      console.error(error);
    });
  }, [variable_choise_seccion]);

  useEffect(() => {
    consultar_datos_existentes().catch((error) => {
      console.error(error);
    });
  }, [variable_serie_subserie]);

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
        <Grid item container style={{ margin: 1, display: "flex", justifyContent: "flex-end" }}>


          <TextField
            variant="outlined"
            size="small"
            fullWidth
            label="Año Actual"
            value={year}
            style={{ width: 100, marginRight: 40 }}
            InputProps={{
              readOnly: true,
            }}
          />

        </Grid>

        <Grid item xs={12}>
          <Title title="Configuración del Año Fiscal Actual" />
        </Grid>

        <Grid container style={{ marginTop: 10 }}>


          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="choise-label">Seccion o Subseccion</InputLabel>
              <Select
                id="demo-simple-select-2"
                label="Seccion o Subseccion"
                style={{ width: "95%" }}
                name="otras_tipologias"
                value={variable_choise_seccion || ""}
                onChange={(event) => set_variable_choise_seccion(event.target.value)}
              >
                {seccionoSubseccion?.map((item: any, index: number) => (
                  <MenuItem key={index} value={item.id_unidad_organizacional}>
                    {item.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="choise-label">Serie-Subserie</InputLabel>
              <Select
                id="demo-simple-select-2"
                style={{ width: "95%" }}
                label="Serie-Subserie"
                name="otras_tipologias"
                value={variable_serie_subserie || ""}
                onChange={(event) => set_variable_serie_subserie(event.target.value)}
              >
                {get_serie_subserie?.map((item: any, index: number) => (
                  <MenuItem key={item.id_catserie_unidadorg} value={item.id_catserie_unidadorg}>
                    {`${item.cod_serie_doc || ''}${item.cod_serie_doc && item.nombre_serie_doc ? '-' : ''}${item.nombre_serie_doc || ''}/${item.cod_subserie_doc || ''
                      }${item.cod_subserie_doc && item.nombre_subserie_doc ? '-' : ''}${item.nombre_subserie_doc || ''}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>


        <Grid container item xs={12} alignItems="center" justifyContent="center">

          <Grid item xs={12} sm={5} md={4} style={{ margin: 10 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="choise-label">Estructura del Expediente</InputLabel>
              <Select
                label="Estructura del Expediente"
                id="demo-simple-select-2"

                name="cod_tipo_expediente"
                value={form_data.cod_tipo_expediente || ""}
                onChange={handle_creacion_form} // Cuando cambie el valor, actualiza variablex
              >
                {choise_estructura_expediente?.map((item: any, index: number) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>






        {form_data.cod_tipo_expediente === "S" ? null : (
  <>
    <Grid item xs={12} sm={6}>
      <TextField
        style={{ width: '95%', marginTop: 10 }}
        label={`Cantidad de Dígitos`}
        variant="outlined"
        size="small"
        fullWidth
        name="cantidad_digitos"
        value={form_data.cantidad_digitos || ""}
        onChange={handle_creacion_form}
      />
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField
        style={{ width: '95%', marginTop: 10 }}
        label={`Consecutivo Inicial`}
        variant="outlined"
        size="small"
        fullWidth
        name="consecutivo_inicial"
        value={form_data.consecutivo_inicial || ""}
        onChange={handle_creacion_form}
      />
    </Grid>
  </>
)}




        <Grid style={{ marginTop: 20 }} item xs={12}>
          <Title
            title="Consecutivo Actual" />
        </Grid>

        <Grid container item xs={12} alignItems="center" justifyContent="center">
          <TextField
            style={{ marginTop: 20, width: "60%" }}
            variant="outlined"
            label="Ultimo Consecutivo"
            disabled
            size="small"
            fullWidth
            name="consecutivo_actual"
            value={form_data.consecutivo_actual || ""}
          />
        </Grid>
        <Grid style={{ marginTop: 20 }} container spacing={2} justifyContent="flex-end">
          <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
            <Button
              startIcon={<SaveIcon />}
              color='success'
              fullWidth
              variant="contained"

              onClick={() => {
                if (existendatos === true) {
                  void confirmarAccion(
                    actualizar_datos_existentes,
                    '¿Estás seguro de realizar este proceso?'
                  );
                } else {
                  void confirmarAccion(
                    crear_configuracion_expediente,
                    '¿Estás seguro de realizar este proceso?'
                  );
                }
              }}
            >
              {existendatos === true ? 'Actualizar' : "Guardar"}
            </Button>

          </Grid>
          <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
            <ModalConfiguracionTiposExpedientes />
          </Grid>
          <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
            <Button fullWidth variant="outlined"
              startIcon={<CleanIcon />}

              onClick={() => {
                set_form_data(inicial_datos_form),
                  set_variable_choise_seccion(""),
                  set_variable_serie_subserie(""),
                  set_existen_datos(false)
              }} >
              limpiar
            </Button>
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

      </Grid >
    </>
  );
};
