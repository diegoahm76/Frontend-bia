import { Button, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import ModalBusquedaResponsable from '../manners/ModalBusquedaResponsable';


interface props {
  accion: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const BusquedaFuncionarios: React.FC<props> = ({
  accion,
}) => {
  const [mostrar_busqueda_responsable, set_mostrar_busqueda_responsable] = useState<boolean>(false);

  const [switch_solicitud_prestamo, set_switch_solicitud_prestamo] = useState<boolean>(false);
  const [msj_error_solicitud_prestamo, set_msj_error_solicitud_prestamo] = useState<string>('');

  const [tipo_documento_responsable, set_tipo_documento_responsable] = useState<string>('');
  const [documento_responsable, set_documento_responsable] = useState<string>('');
  const [nombres_responsable, set_nombres_responsable] = useState<string>('');
  const [apellidos_responsable, set_apellidos_responsable] = useState<string>('');

  const [tipo_documento_operario, set_tipo_documento_operario] = useState<string>('');
  const [documento_operario, set_documento_operario] = useState<string>('');
  const [nombres_operario, set_nombres_operario] = useState<string>('');
  const [apellidos_operario, set_apellidos_operario] = useState<string>('');

  const [motivo, set_motivo] = useState<string>('');
  const [observaciones, set_observaciones] = useState<string>('');


  const busqueda_responsable = () => {
    alert("Se está realizando la búsqueda del responsable");
  }

  return (
    <>
      <ModalBusquedaResponsable
        set_mostrar_busqueda_responsable={set_mostrar_busqueda_responsable}
        mostrar_busqueda_responsable={mostrar_busqueda_responsable}
      /> 
      <Grid item xs={12}>
        <Grid item xs={12} lg={3}>
          <FormLabel htmlFor="solicitud_prestamo">
            ¿Es solicitud de préstamo?
          </FormLabel>
          <Switch
            id="solicitud_prestamo"
            checked={switch_solicitud_prestamo}
            disabled={accion === 'ver'}
            onChange={() =>{
              set_msj_error_solicitud_prestamo('')
              set_switch_solicitud_prestamo(!switch_solicitud_prestamo)
            }}
          />
        </Grid>
      </Grid>
      
      <Grid container spacing={2} item xs={12}>

        <Grid item xs={12}>
          <Divider orientation="horizontal" variant="fullWidth" style={{marginBlock: 'auto', width: '100%'}}>
            <Chip label="BÚSQUEDA RESPONSABLE" size="small" />
          </Divider>
        </Grid>

        <Grid item xs={12} lg={3}>
          <FormControl required size="small" fullWidth>
            <InputLabel >Tipo documento responsable</InputLabel>
            <Select
              label='Tipo documento responsable'
              value={tipo_documento_responsable}
              disabled={accion === 'ver'}
              onChange={(e) => set_tipo_documento_responsable(e.target.value)}
            >
              <MenuItem value="CC">Cédula de ciudadanía</MenuItem>
              <MenuItem value="CE">Cédula de extranjería</MenuItem>
              <MenuItem value="TI">Tarjeta de identidad</MenuItem>
              <MenuItem value="RC">Registro civil</MenuItem>
              <MenuItem value="PA">Pasaporte</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            fullWidth
            label='Documento responsable'
            value={documento_responsable}
            disabled={accion === 'ver'}
            onChange={(e) => set_documento_responsable(e.target.value)}
            size='small'
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={busqueda_responsable}
          >
            Buscar
          </Button>
        </Grid>

        <Grid item xs={12} lg={3}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={()=>set_mostrar_busqueda_responsable(true)}
          >
            Búsqueda avanzada
          </Button>
        </Grid>

        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            disabled
            label='Nombres responsable'
            value={nombres_responsable}
            onChange={(e) => set_nombres_responsable(e.target.value)}
            size='small'
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            disabled
            label='Apellidos responsable'
            value={apellidos_responsable}
            onChange={(e) => set_apellidos_responsable(e.target.value)}
            size='small'
          />
        </Grid>
      </Grid>


      <Grid container spacing={2} item xs={12}>

        <Grid item xs={12}>
          <Divider orientation="horizontal" variant="fullWidth" style={{marginBlock: 'auto', width: '100%'}}>
            <Chip label="BÚSQUEDA OPERARIO" size="small" />
          </Divider>
        </Grid>


        <Grid item xs={12} lg={3}>
          <FormControl required size="small" fullWidth>
            <InputLabel >Tipo documento operario</InputLabel>
            <Select
              label='Tipo documento operario'
              value={tipo_documento_operario}
              disabled={accion === 'ver'}
              onChange={(e) => set_tipo_documento_operario(e.target.value)}
            >
              <MenuItem value="CC">Cédula de ciudadanía</MenuItem>
              <MenuItem value="CE">Cédula de extranjería</MenuItem>
              <MenuItem value="TI">Tarjeta de identidad</MenuItem>
              <MenuItem value="RC">Registro civil</MenuItem>
              <MenuItem value="PA">Pasaporte</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            fullWidth
            label='Documento operario'
            value={documento_operario}
            disabled={accion === 'ver'}
            onChange={(e) => set_documento_operario(e.target.value)}
            size='small'
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={()=>{}}
          >
            Buscar
          </Button>
        </Grid>

        <Grid item xs={12} lg={3}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={()=>{}}
          >
            Búsqueda avanzada
          </Button>
        </Grid>

        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            disabled
            label='Nombres operario'
            value={nombres_operario}
            onChange={(e) => set_nombres_operario(e.target.value)}
            size='small'
          />
        </Grid>
        
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            disabled
            label='Apellidos operario'
            value={apellidos_operario}
            onChange={(e) => set_apellidos_operario(e.target.value)}
            size='small'
          />
        </Grid>
      </Grid>


      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          multiline
          rows={2}
          label='Motivo'
          value={motivo}
          disabled={accion === 'ver'}
          onChange={(e) => set_motivo(e.target.value)}
          size='small'
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          multiline
          rows={2}
          label='Observaciones'
          value={observaciones}
          disabled={accion === 'ver'}
          onChange={(e) => set_observaciones(e.target.value)}
          size='small'
        />
      </Grid>
    </>
  );
}


// eslint-disable-next-line no-restricted-syntax
export default BusquedaFuncionarios;