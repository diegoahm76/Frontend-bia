/* eslint-disable @typescript-eslint/naming-convention */
import SaveIcon from '@mui/icons-material/Save';
import CleanIcon from '@mui/icons-material/CleaningServices';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, Checkbox, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Title } from "../../../../components/Title";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MostrarModalBuscarMediosSolicitud } from '../components/ModalBusquedaMediosSolicitud/ModalBusquedaMedios';

export const ConfiguracionMediosSolicitudScreem: React.FC = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [checkedtramites, set_checkedtramites] = useState(false);
  const [checkedOtros, set_checkedOtros] = useState(false);
  const [activo, set_activo] = useState("");
  console.log(activo);
  console.log(checked);


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
        <Grid item xs={12} sm={4} md={2}>
          <h5>Tiempo de respuesta:</h5>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            value={1}

            style={{ marginTop: 9, width: '95%' }}
          />

        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Checkbox
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
          checked={checked}
        ></Checkbox>
        <label htmlFor="ingredient4" className="ml-2">
          Mostrat Todas Las Plantillas
        </label>
      </Grid>

      <Grid item xs={6}>
        <Checkbox
          onChange={(e) => {
            set_checkedtramites(e.target.checked);
          }}
          checked={checkedtramites}
        ></Checkbox>
        <label htmlFor="ingredient4" className="ml-2">
          Mostrat Todas Las Plantillas
        </label>
      </Grid>


      <Grid item xs={6}>
        <Checkbox
          onChange={(e) => {
            set_checkedOtros(e.target.checked);
          }}
          checked={checkedOtros}
        ></Checkbox>
        <label htmlFor="ingredient4" className="ml-2">
          Mostrat Todas Las Plantillas
        </label>
      </Grid>




      <Grid item xs={6} sm={6}>
        <FormControl fullWidth size="small" style={{ width: "70%" }} >
          <InputLabel id="activo">activo</InputLabel>
          <Select
            labelId="activo"
            id="activo"
            required
            value={activo}
            label="activo"


            onChange={(e) => {
              set_activo(e.target.value);
            }}

          >
            <MenuItem value="true">Sí</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>
















      <Grid
        container
        marginTop={2}
        spacing={2}
        direction="row"
        justifyContent="flex-end"
      >

        <Grid item xs={12} sm={2}>
          <MostrarModalBuscarMediosSolicitud />
        </Grid>

        <Grid item xs={12} sm={2}>
          <Button
            startIcon={<CleanIcon />}
            fullWidth
            variant="contained"
            color="secondary"
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
            }}   >
            Salir
          </Button>
        </Grid>
      </Grid>
    </Grid>


  );
};
