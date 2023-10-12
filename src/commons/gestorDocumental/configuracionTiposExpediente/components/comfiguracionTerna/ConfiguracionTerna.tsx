/* eslint-disable @typescript-eslint/naming-convention */

import { Button, FormControl, Grid, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { useEffect, useState } from 'react';
import { api } from '../../../../../api/axios';
import InfoIcon from '@mui/icons-material/Info';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';


export const ConfiguracionTerna: React.FC = () => {


  // const [form, set_form] = useState({});

  // const handledata = (e: any) => {
  //   set_form({
  //     ...form,
  //     [e.target.name]: e.target.value
  //   })

  // }



  const navigate = useNavigate();
  const [seccionoSubseccion, set_seccionoSubseccion] = useState<any>([]);
  const [get_serie_subserie, set_get_serie_subserie] = useState<any>([]);
console.log(get_serie_subserie)
  const [checked, setChecked] = useState<boolean>(false);
  const [variablex, set_Variablex] = useState<any>(); // Inicializa variablex con un valor inicial en este caso, una cadena vacía.
console.log(variablex);

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
    try {
      const url = `gestor/configuracion-tipos-expendientes/serie-subserie-unidad/get/5126/`;
      const res: any = await api.get(url);
      const numero_consulta: any = res.data.data;
      set_get_serie_subserie(numero_consulta);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch_choise_seccionsubseccion().catch((error) => {
      console.error(error);
    });
  }, []);
  useEffect(() => {
    fetch_dataw_get().catch((error) => {
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
        <Grid item container spacing={1} style={{ margin: 1 }}>
          <Grid item xs={12} sm={3} md={2}>
            <h5>Año de Configuracion:</h5>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              value={123} // Establece el valor del TextField desde el estado

              style={{ marginTop: 9, width: '25%' }}
            />

          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Title title="Seleccionar Archivos" />
        </Grid>
        <Grid item container spacing={1} style={{ margin: 1 }}>
          <Grid item xs={12} sm={4} md={3}>
            <h5>Seccion o Subseccion:</h5>
          </Grid>
          <Grid item xs={12} sm={5} md={4}>
            <FormControl fullWidth>
              <Select
                id="demo-simple-select-2"
                name="otras_tipologias"
                value={seccionoSubseccion}

              >
                {seccionoSubseccion?.map((item: any, index: number) => (
                  <MenuItem key={index} value={item.id_unidad_organizacional}>
                    {item.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          </Grid>
        </Grid>


        <Grid item container spacing={1} style={{ margin: 1 }}>
          <Grid item xs={12} sm={4} md={3}>
            <h5>Serie-Subserie:</h5>
          </Grid>
          <Grid item xs={12} sm={5} md={4}>
            <FormControl fullWidth>
              <Select
                id="demo-simple-select-2"
                name="otras_tipologias"
                value={variablex}
                onChange={(event) => set_Variablex(event.target.value)} // Cuando cambie el valor, actualiza variablex
              >
                {get_serie_subserie?.map((item: any, index: number) => (
                  <MenuItem key={index} value={item.id_catserie_unidadorg}>
                    {item.nombre_serie_doc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          </Grid>
        </Grid>


        <Grid item xs={12} sm={4} md={3} style={{ marginTop: 10 }}>
          <label htmlFor="ingredient4" className="ml-2">
            Estrucctura del Expediente:
          </label>
        </Grid>


        <Grid item xs={12} sm={6} md={6} style={{ marginTop: 10 }}>
          <Grid
            container

          >
            <input
              style={{ marginLeft: 10 }}

              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            /> {checked ? (
              <Typography style={{ marginLeft: 15 }} variant="body2">
                Simple
                <Tooltip
                  title="Formato tipo de medio activo"
                  placement="right"
                >
                  <InfoIcon
                    sx={{ width: '1.2rem', height: '1.2rem', ml: '0.5rem', color: 'green' }}
                  />
                </Tooltip>
              </Typography>
            ) : (
              <Typography style={{ marginLeft: 15 }} variant="body2">
                Complejo
                <Tooltip
                  title="Formato tipo de medio inactivo"
                  placement="right"
                >
                  <InfoIcon
                    sx={{ width: '1.2rem', height: '1.2rem', ml: '0.5rem', color: 'red' }}
                  />
                </Tooltip>
              </Typography>
            )}
          </Grid>
        </Grid>



        <Grid item container spacing={1} style={{ margin: 1 }}>
          <Grid item xs={12} sm={3} md={2}>
            <h5>Valor Inicial:</h5>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              value={123} // Establece el valor del TextField desde el estado

              style={{ marginTop: 9, width: '95%' }}
            />

          </Grid>
        </Grid>

        <Grid item container spacing={1} style={{ margin: 1 }}>
          <Grid item xs={12} sm={3} md={2}>
            <h5>Cantidad de Digitos:</h5>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              value={123} // Establece el valor del TextField desde el estado

              style={{ marginTop: 9, width: '95%' }}
            />

          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <TextField
            style={{ marginTop: 20, width: "80%" }}
            variant="outlined"
            label="Persona ultima Configuracion"
            fullWidth
            name="nombre"
            value={32}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <TextField
            style={{ marginTop: 20, width: "80%" }}
            variant="outlined"
            label="Fecha ultima Configuracion"
            fullWidth
            name="nombre"
            value={64}
          />
        </Grid>

        <Grid style={{ marginTop: 20 }} item xs={12}>
          <Title
            title="Seleccionar Archivos" />
        </Grid>

        <Grid container item xs={12} alignItems="center" justifyContent="center">
          <TextField
            style={{ marginTop: 20, width: "60%" }}
            variant="outlined"
            label="Ultimo Consecutivo"
            fullWidth
            name="nombre"
            value={64}
          />
        </Grid>
        <Grid style={{ marginTop: 20 }} container spacing={2} justifyContent="flex-end">
          <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
            <Button
              startIcon={<SaveIcon />}
              color='success'
              fullWidth
              variant="contained"
            >
              Guardar
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
      </Grid>
    </>
  );
};
