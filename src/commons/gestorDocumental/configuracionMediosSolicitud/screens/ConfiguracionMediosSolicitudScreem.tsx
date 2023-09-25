/* eslint-disable @typescript-eslint/naming-convention */
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Tooltip, Typography } from "@mui/material";
import { Title } from "../../../../components/Title";
import ClearIcon from '@mui/icons-material/Clear';
import { useContext, useEffect, useState } from 'react';
import { MostrarModalBuscarMediosSolicitud } from '../components/ModalBusquedaMediosSolicitud/ModalBusquedaMedios';
import { api } from '../../../../api/axios';
import { control_error, control_success } from '../../../conservacion/gestorVivero/store/thunks/gestorViveroThunks';
import { useNavigate } from 'react-router-dom';
import { confirmarAccion } from '../../deposito/utils/function';
import InfoIcon from '@mui/icons-material/Info';
import { ModalBusquedaMediosSolicitudContext } from '../context/pasarDatosEditar';


export const ConfiguracionMediosSolicitudScreem: React.FC = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [checkedtramites, set_checkedtramites] = useState(false);
  const [checkedOtros, set_checkedOtros] = useState<boolean>(false);
  const [activo, set_activo] = useState(false);
  const [dataChoise, setDataChoise] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const { datos_Editar } = useContext(ModalBusquedaMediosSolicitudContext);


  const fetch_crear_medio_solicitud = async () => {
    try {
      const url = '/gestor/pqr/tipos_pqr/crear-medio-solicitud/';
      const postData = {

        "nombre": inputValue,
        "aplica_para_pqrsdf": checked,
        "aplica_para_tramites": checkedtramites,
        "aplica_para_otros": checkedOtros,
        "activo": activo

      };

      const res = await api.post(url, postData);
      const numeroConsulta = res.data.data;
      setDataChoise(numeroConsulta);
      control_success("se creo correctamente");
    } catch (error: any) {
      console.error(error);
      control_error('No se ha creado el medio de solicitud');
    }
  };

  const limpiar_datos = () => {
    setChecked(false);
    setInputValue("");
    set_checkedOtros(false);
    set_activo(false);
    set_checkedtramites(false);

  };

  const handleInputChange = (e: any): void => {
    setInputValue(e.target.value);
  };

/* const [form, setForm] = useState<any>({
  nombre: '',
  activo: '',
})
  const handleChange = (e: any) => {
    setForm({
      [e.target.name]: e.target.value,
    })
  }
 */

  useEffect(() => {
    if (datos_Editar) {
      setInputValue(datos_Editar.nombre)
      set_checkedtramites(datos_Editar.aplica_para_tramites);
      set_checkedOtros(datos_Editar.aplica_para_otros);
      setChecked(datos_Editar.aplica_para_pqrsdf);
      set_activo(datos_Editar.activo === true ? true : false);
    }
  }, [datos_Editar])


  return (

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
        <Title title="Tipos de Medios de Solicitud" />
      </Grid>

      <Grid item container spacing={1} style={{ margin: 1 }}>
        <Grid item xs={12} sm={4} md={3}>
          <h5>Nombre del Medio de Solicitud:</h5>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            value={inputValue} // Establece el valor del TextField desde el estado
            onChange={handleInputChange} // Configura el manejador de eventos onChange
            style={{ marginTop: 9, width: '95%' }}
          />

        </Grid>
      </Grid>



      <Grid item xs={12} sm={6} md={3} style={{ marginTop: 10 }}>
        <label htmlFor="ingredient4" className="ml-2">
          Aplica para PQRSDF :
        </label>
      </Grid>
      <Grid item xs={12} sm={4} md={3} style={{ marginTop: 10 }}>
        <Grid
          container
          style={{ width: 70 }}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          /> {checked ? (
            <Typography variant="body2">
              Si
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
            <Typography variant="body2">
              No
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



      <Grid item xs={12} sm={6} md={3} style={{ marginTop: 10 }}>
        <label htmlFor="ingredient4" className="ml-2">
          Aplica para Tramites :
        </label>
      </Grid>
      <Grid item xs={12} sm={4} md={3} style={{ marginTop: 10 }}>
        <Grid
          container
          style={{ width: 70 }}
        >
          <input
            type="checkbox"
            checked={checkedtramites}
            onChange={(e) => set_checkedtramites(e.target.checked)}
          /> {checkedtramites ? (
            <Typography variant="body2">
              Si
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
            <Typography variant="body2">
              No
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



      <Grid item xs={12} sm={6} md={3} style={{ marginTop: 10 }}>
        <label htmlFor="ingredient4" className="ml-2">
          Aplica para Otros:
        </label>
      </Grid>
      <Grid item xs={12} sm={4} md={3} style={{ marginTop: 10 }}>


        <Grid
          container
          style={{ width: 70 }}
        >
          <input
            type="checkbox"
            checked={checkedOtros}
            onChange={(e) => set_checkedOtros(e.target.checked)}
          /> {checkedOtros ? (
            <Typography variant="body2">
              Si
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
            <Typography variant="body2">
              No
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




      <Grid item xs={6} sm={6} style={{ marginTop: 10 }}>
        <FormControl fullWidth size="small" style={{ width: "70%" }} >
          <InputLabel id="activo">activo</InputLabel>
          <Select
            labelId="activo"
            id="activo"
            required
            value={activo.toString()}
            label="activo"
            onChange={(e) => {
              set_activo(e.target.value === "true");
            }}
          >
            <MenuItem value={"true"}>Sí</MenuItem>
            <MenuItem value={"false"}>No</MenuItem>
          </Select>
        </FormControl>
      </Grid>




      <Grid container spacing={2} justifyContent="flex-end" style={{ marginTop: 20 }}>
        <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
          <Button startIcon={<SaveIcon />} onClick={() => {
            void confirmarAccion(
              fetch_crear_medio_solicitud,
              '¿Estás seguro de crear  este campo?'
            );
          }} color='success' fullWidth variant="contained">
            Guardar
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
          <MostrarModalBuscarMediosSolicitud />
        </Grid>
        <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
          <Button color='primary' variant="outlined" onClick={limpiar_datos} fullWidth startIcon={<CleanIcon />}>
            Limpiar
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



  );
};
