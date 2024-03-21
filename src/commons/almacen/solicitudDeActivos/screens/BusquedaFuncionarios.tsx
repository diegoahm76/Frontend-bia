import { Button, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import ModalBusquedaResponsable from '../manners/ModalBusquedaResponsable';
import ModalBusquedaOperario from '../manners/ModalBusquedaOperario';
import { interface_busqueda_operario, interface_busqueda_responsable, response_busqueda_responsable } from '../interfaces/types';
import { useDispatch } from 'react-redux';
import { get_obtener_operarios, get_obtener_responsables } from '../thunks/solicitud_activos';
import { control_error, control_success } from '../../../../helpers';


interface props {
  accion: string;
  switch_solicitud_prestamo: boolean;
  set_switch_solicitud_prestamo: React.Dispatch<React.SetStateAction<boolean>>;
  tipo_documento_responsable: string;
  set_tipo_documento_responsable: React.Dispatch<React.SetStateAction<string>>;
  documento_responsable: string;
  set_documento_responsable: React.Dispatch<React.SetStateAction<string>>;
  nombres_responsable: string;
  set_nombres_responsable: React.Dispatch<React.SetStateAction<string>>;
  apellidos_responsable: string;
  set_apellidos_responsable: React.Dispatch<React.SetStateAction<string>>;
  tipo_documento_operario: string;
  set_tipo_documento_operario: React.Dispatch<React.SetStateAction<string>>;
  documento_operario: string;
  set_documento_operario: React.Dispatch<React.SetStateAction<string>>;
  nombres_operario: string;
  set_nombres_operario: React.Dispatch<React.SetStateAction<string>>;
  apellidos_operario: string;
  set_apellidos_operario: React.Dispatch<React.SetStateAction<string>>;
  motivo: string;
  set_motivo: React.Dispatch<React.SetStateAction<string>>;
  observaciones: string;
  set_observaciones: React.Dispatch<React.SetStateAction<string>>;
  set_funcionario_responsable_seleccionado: React.Dispatch<React.SetStateAction<interface_busqueda_responsable>>;
  funcionario_responsable_seleccionado: interface_busqueda_responsable;
  set_funcionario_operario_seleccionado: React.Dispatch<React.SetStateAction<interface_busqueda_operario>>;
  funcionario_operario_seleccionado: interface_busqueda_operario;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const BusquedaFuncionarios: React.FC<props> = ({
  accion,
  switch_solicitud_prestamo,
  set_switch_solicitud_prestamo,
  tipo_documento_responsable,
  set_tipo_documento_responsable,
  documento_responsable,
  set_documento_responsable,
  nombres_responsable,
  set_nombres_responsable,
  apellidos_responsable,
  set_apellidos_responsable,
  tipo_documento_operario,
  set_tipo_documento_operario,
  documento_operario,
  set_documento_operario,
  nombres_operario,
  set_nombres_operario,
  apellidos_operario,
  set_apellidos_operario,
  motivo,
  set_motivo,
  observaciones,
  set_observaciones,
  set_funcionario_responsable_seleccionado,
  funcionario_responsable_seleccionado,
  set_funcionario_operario_seleccionado,
  funcionario_operario_seleccionado,
}) => {

  const dispatch = useDispatch();

  const [mostrar_busqueda_responsable, set_mostrar_busqueda_responsable] = useState<boolean>(false);
  const [mostrar_busqueda_operario, set_mostrar_busqueda_operario] = useState<boolean>(false);

  useEffect(() => {
    if (Object.keys(funcionario_responsable_seleccionado).length !== 0){
      set_tipo_documento_responsable(funcionario_responsable_seleccionado.tipo_documento);
      set_documento_responsable(funcionario_responsable_seleccionado.numero_documento);
      set_nombres_responsable(funcionario_responsable_seleccionado.primer_nombre ?? '');
      set_apellidos_responsable(funcionario_responsable_seleccionado.primer_apellido ?? '');
    }
  }, [funcionario_responsable_seleccionado]);

  useEffect(() => {
    if (Object.keys(funcionario_operario_seleccionado).length !== 0){
      set_tipo_documento_operario(funcionario_operario_seleccionado.tipo_documento);
      set_documento_operario(funcionario_operario_seleccionado.numero_documento);
      set_nombres_operario(funcionario_operario_seleccionado.primer_nombre ?? '');
      set_apellidos_operario(funcionario_operario_seleccionado.primer_apellido ?? '');
    }
  }, [funcionario_operario_seleccionado]);

  const get_obtener_responsables_fc = () => {
    dispatch(get_obtener_responsables(
      tipo_documento_responsable,
      documento_responsable,
      '',
      '',
      '',
      '',
    )).then((response: response_busqueda_responsable) => {
      if(Object.keys(response).length !== 0) {
        if (response.data.length !== 0) {
          set_funcionario_responsable_seleccionado(response.data[0]);
          control_success('Funcionario encontrado');
        } else {
          set_funcionario_responsable_seleccionado({} as interface_busqueda_responsable);
          control_error('No se encontraro el funcionario, pruebe con el botón de búsqueda avanzada');
        }
      } else {
        control_error('Error en el servidor al obtener los responsables de la solicitud de activos');
      }
    });
  }

  const get_obtener_operarios_fc = () => {
    dispatch(get_obtener_operarios(
      tipo_documento_operario,
      documento_operario,
      '',
      '',
      '',
      '',
    )).then((response: response_busqueda_responsable) => {
      if(Object.keys(response).length !== 0) {
        if (response.data.length !== 0) {
          set_funcionario_operario_seleccionado(response.data[0]);
          control_success('Funcionario encontrado');
        } else {
          set_funcionario_operario_seleccionado({} as interface_busqueda_operario);
          control_error('No se encontraro el funcionario, pruebe con el botón de búsqueda avanzada');
        }
      } else {
        control_error('Error en el servidor al obtener los responsables de la solicitud de activos');
      }
    });
  }

  const busqueda_responsable = () => {
    if(tipo_documento_responsable === ''){
      control_error('Debe seleccionar el tipo de documento');
      return;
    } else if (documento_responsable.trim() === ''){
      control_error('Debe ingresar el número de documento');
      return;
    }
    get_obtener_responsables_fc();
  }

  const busqueda_operario = () => {
    if(tipo_documento_operario === ''){
      control_error('Debe seleccionar el tipo de documento');
      return;
    } else if (documento_operario.trim() === ''){
      control_error('Debe ingresar el número de documento');
      return;
    }
    get_obtener_operarios_fc();
  }

  return (
    <>
      <ModalBusquedaResponsable
        set_mostrar_busqueda_responsable={set_mostrar_busqueda_responsable}
        mostrar_busqueda_responsable={mostrar_busqueda_responsable}
        set_funcionario_responsable_seleccionado={set_funcionario_responsable_seleccionado}
      />
      <ModalBusquedaOperario
        set_mostrar_busqueda_operario={set_mostrar_busqueda_operario}
        mostrar_busqueda_operario={mostrar_busqueda_operario}
        set_funcionario_operario_seleccionado={set_funcionario_operario_seleccionado}
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
              <MenuItem value="RC" >Registro civil</MenuItem>
              <MenuItem value="TI" >Tarjeta de identidad</MenuItem>
              <MenuItem value="CE" >Cédula de extranjería</MenuItem>
              <MenuItem value="PA" >Pasaporte</MenuItem>
              <MenuItem value="PE" >Permiso especial de permanencia</MenuItem>
              <MenuItem value="NT" >NIT</MenuItem>
              <MenuItem value="NU" >NUIP</MenuItem>
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
              <MenuItem value="RC" >Registro civil</MenuItem>
              <MenuItem value="TI" >Tarjeta de identidad</MenuItem>
              <MenuItem value="CE" >Cédula de extranjería</MenuItem>
              <MenuItem value="PA" >Pasaporte</MenuItem>
              <MenuItem value="PE" >Permiso especial de permanencia</MenuItem>
              <MenuItem value="NT" >NIT</MenuItem>
              <MenuItem value="NU" >NUIP</MenuItem>
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
            onClick={busqueda_operario}
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
            onClick={()=>set_mostrar_busqueda_operario(true)}
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