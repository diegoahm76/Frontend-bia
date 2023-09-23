/* eslint-disable @typescript-eslint/naming-convention */
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Title } from "../../../../components/Title";
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';
import { MostrarModalBuscarMediosSolicitud } from '../components/ModalBusquedaMediosSolicitud/ModalBusquedaMedios';
import { api } from '../../../../api/axios';
import { BasicRating } from '../utils/checkboxMediosConfiguracion';
import { control_error } from '../../../conservacion/gestorVivero/store/thunks/gestorViveroThunks';
import { useNavigate } from 'react-router-dom';
import { confirmarAccion } from '../../deposito/utils/function';

export const ConfiguracionMediosSolicitudScreem: React.FC = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [checkedtramites, set_checkedtramites] = useState(false);
  const [checkedOtros, set_checkedOtros] = useState<boolean>(false);
  const [activo, set_activo] = useState(false);
  const [dataChoise, setDataChoise] = useState(null);
  console.log(dataChoise);
  const [inputValue, setInputValue] = useState('');

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
    } catch (error: any) {
      console.error(error);
      control_error('No se ha seleccionado una encuesta para eliminar');
    }
  };

  const limpiar_datos=()=>{
    setChecked(false);
    setInputValue("");
    set_checkedOtros(false);
    set_checkedOtros(false);
    set_activo(false);

  }


  const handleInputChange = (e: any): void => {
    setInputValue(e.target.value);
  };





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



      <Grid item xs={12} sm={6} md={3} style={{marginTop:10}}>
        <label htmlFor="ingredient4" className="ml-2">
          Aplica para PQRSDF :
        </label>
      </Grid>
      <Grid item xs={12} sm={4} md={3}   style={{marginTop:10}}>
        <BasicRating
          isChecked={checked}
          setIsChecked={setChecked}
        />

      </Grid>



      <Grid item xs={12} sm={6} md={3}   style={{marginTop:10}}>
        <label htmlFor="ingredient4" className="ml-2">
          Aplica para Tramites :
        </label>
      </Grid>
      <Grid item xs={12} sm={4} md={3}  style={{marginTop:10}}>
        <BasicRating
          isChecked={checkedtramites}
          setIsChecked={set_checkedtramites}
        />

      </Grid>



      <Grid item xs={12} sm={6} md={3}  style={{marginTop:10}}>
        <label htmlFor="ingredient4" className="ml-2">
          Aplica para Otros:
        </label>
      </Grid>
      <Grid item xs={12} sm={4} md={3}  style={{marginTop:10}}>
        <BasicRating
          isChecked={checkedOtros}
          setIsChecked={set_checkedOtros}
        />

      </Grid>




      <Grid item xs={6} sm={6}  style={{marginTop:10}}>
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
          <Button startIcon={<SaveIcon />}    onClick={() => {
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
          <Button color='primary' variant="outlined" onClick={limpiar_datos}  fullWidth startIcon={<CleanIcon />}>
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
