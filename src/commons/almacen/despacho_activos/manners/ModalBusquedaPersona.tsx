import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Dialog, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { useAppDispatch } from '../../../../hooks';
import { control_error } from '../../../../helpers';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import { interface_busqueda_persona_responsable, interface_busqueda_persona_solicita, interface_tipos_documentos, response_busqueda_persona_responsable, response_busqueda_persona_solicita, response_tipos_documentos } from '../interfeces/types';
import { get_obtener_persona_responsable, get_obtener_persona_solicita, get_obtener_tipos_documentos, get_obtener_tipos_estados } from '../thunks/despacho_solicitudes';
import TablaModalBusquedaPersona from '../tables/TablaModalBusquedaPersona';



interface props {
  set_mostrar_modal_buscar_persona: React.Dispatch<React.SetStateAction<boolean>>;
  mostrar_modal_buscar_persona: boolean;
  set_data_persona_solicita: React.Dispatch<React.SetStateAction<interface_busqueda_persona_solicita>>;
  set_data_persona_responsable: React.Dispatch<React.SetStateAction<interface_busqueda_persona_responsable>>;
  despacho_sin_solicitud: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ModalBusquedaPersona: React.FC<props> = ({
  set_mostrar_modal_buscar_persona,
  mostrar_modal_buscar_persona,
  set_data_persona_solicita,
  set_data_persona_responsable,
  despacho_sin_solicitud,
}) => {

  const dispatch = useAppDispatch();

  const [tipo_documento, set_tipo_documento] = useState<string>('');
  const [documento, set_documento] = useState<string>('');
  const [razon_social, set_razon_social] = useState<string>('');
  const [primer_nombre, set_primer_nombre] = useState<string>('');
  const [primer_apellido, set_primer_apellido] = useState<string>('');
  const [nombre_comercial, set_nombre_comercial] = useState<string>('');
  const [loadding_tabla, set_loadding_tabla] = useState<boolean>(false);

  const [tipos_documentos, set_tipos_documentos] = useState<interface_tipos_documentos[]>([]);

  const [data_persona_solicita_temp, set_data_persona_solicita_temp] = useState<interface_busqueda_persona_solicita>(Object);
  // Data de la tabla de personas que solicitan
  const [data_personas_solicitan, set_data_personas_solicitan] = useState<interface_busqueda_persona_solicita[]>([]);
  // Data de la tabla de personas responsables
  const [data_personas_responsables, set_data_personas_responsables] = useState<interface_busqueda_persona_responsable[]>([]);

  const get_obtener_persona_solicita_fc = () => {
    set_loadding_tabla(true);
    dispatch(get_obtener_persona_solicita(
      tipo_documento,
      documento,
      primer_nombre,
      primer_apellido,
      razon_social,
      nombre_comercial,
    )).then((response: response_busqueda_persona_solicita) => {
      if(Object.keys(response).length !== 0) {
        if (response.data.length !== 0) {
          set_data_personas_solicitan(response.data);
          set_loadding_tabla(false);
        } else {
          set_data_personas_solicitan([]);
          control_error('No se encontraron funcionarios');
          set_loadding_tabla(false);
        }
      } else {
        control_error('Error en el servidor al obtener funcionarios');
      }
    });
  }

  const get_obtener_persona_responsable_fc = () => {
    set_loadding_tabla(true);
    dispatch(get_obtener_persona_responsable(
      tipo_documento,
      documento,
      primer_nombre,
      primer_apellido,
      razon_social,
      nombre_comercial,
    )).then((response: response_busqueda_persona_responsable) => {
      if(Object.keys(response).length !== 0) {
        if (response.data.length !== 0) {
          set_data_personas_responsables(response.data);
          set_loadding_tabla(false);
        } else {
          set_data_personas_responsables([]);
          control_error('No se encontraron funcionarios');
          set_loadding_tabla(false);
        }
      } else {
        control_error('Error en el servidor al obtener funcionarios');
      }
    });
  }

  const get_obtener_tipos_documentos_fc = () => {
    dispatch(get_obtener_tipos_documentos())
    .then((response: response_tipos_documentos) => {
      if(Object.keys(response).length !== 0) {
        if (response.data.length !== 0) {
          set_tipos_documentos(response.data);
        } else {
          set_tipos_documentos([]);
          control_error('No se encontraron tipos de documentos');
        }
      } else {
        control_error('Error en el servidor al obtener tipos de documentos');
      }
    });
  }



  const ejecutar_servicios = useRef(false);
  useEffect(()=>{
    if(!ejecutar_servicios.current && mostrar_modal_buscar_persona){
      get_obtener_tipos_documentos_fc();
      if(despacho_sin_solicitud){
        get_obtener_persona_responsable_fc();
      } else {
        get_obtener_persona_solicita_fc();
      }
      ejecutar_servicios.current = true;
    }
  },[mostrar_modal_buscar_persona, despacho_sin_solicitud])

  const consultar_funcionarios = () => {
    if(despacho_sin_solicitud){
      get_obtener_persona_responsable_fc();
    } else {
      get_obtener_persona_solicita_fc();
    }
  }

  const limpiar_form = () => {
    set_tipo_documento('');
    set_documento('');
    set_razon_social('');
    set_primer_nombre('');
    set_primer_apellido('');
    set_nombre_comercial('');
  }

  const enviar_persona_solicita_seleccionado = () => {
    if(Object.keys(data_persona_solicita_temp).length !== 0){
      set_mostrar_modal_buscar_persona(false);
      set_data_persona_solicita(data_persona_solicita_temp);
      set_data_persona_solicita_temp({} as interface_busqueda_persona_solicita);
    } else {
      control_error('Haga clic en una fila de la tabla para seleccionar un funcionario');
    }
  }

  return (
    <>
      <Dialog
        open={mostrar_modal_buscar_persona}
        onClose={() => {
          set_mostrar_modal_buscar_persona(false);
        }}
        fullWidth maxWidth="lg" >
        <DialogContent>
          <Grid
            container
            marginTop={2}
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '30px',
              mb: '10px',
              boxShadow: '0px 3px 6px #042F4A26',
            }}
            >
            <Title title={despacho_sin_solicitud ? 'Búsqueda de persona responsable' : 'Búsqueda de persona solicitante'} />
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{width:'100%', mt:'20px'}}
              >
              <Grid item container spacing={2}  xs={12}>

                <Grid item xs={12} lg={4}>
                  <FormControl required size="small" fullWidth>
                    <InputLabel >Tipo documento:</InputLabel>
                    <Select
                      label='Tipo documento:'
                      value={tipo_documento}
                      onChange={(e) => set_tipo_documento(e.target.value)}
                    >
                      {tipos_documentos.length !== 0 ?
                        tipos_documentos.map((item: interface_tipos_documentos) => (
                          <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                        ))
                        :
                        <MenuItem value=''>Cargando...</MenuItem>
                      }
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} lg={4}>
                  <TextField
                    fullWidth
                    label='Documento:'
                    value={documento}
                    onChange={(e) => set_documento(e.target.value)}
                    size='small'
                  />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <TextField
                    fullWidth
                    label='Razón social:'
                    value={razon_social}
                    onChange={(e) => set_razon_social(e.target.value)}
                    size='small'
                  />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <TextField
                    fullWidth
                    label='Primer nombre:'
                    value={primer_nombre}
                    onChange={(e) => set_primer_nombre(e.target.value)}
                    size='small'
                  />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <TextField
                    fullWidth
                    label='Primer apellido:'
                    value={primer_apellido}
                    onChange={(e) => set_primer_apellido(e.target.value)}
                    size='small'
                  />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <TextField
                    fullWidth
                    label='Nombre comercial:'
                    value={nombre_comercial}
                    onChange={(e) => set_nombre_comercial(e.target.value)}
                    size='small'
                  />
                </Grid>

                <Grid item container spacing={2}  xs={12} sx={{
                    display:'flex',
                    justifyContent: 'end',
                  }}>
                  <Grid item xs={12} lg={4} sx={{
                    display:'flex',
                    justifyContent: 'center',
                    alignItems:'center',
                    }} >
                    <Button
                      fullWidth
                      color='primary'
                      variant='contained'
                      startIcon={<SearchIcon />}
                      onClick={consultar_funcionarios}
                    >
                      Buscar
                    </Button>
                  </Grid>

                  <Grid item xs={12} lg={4} sx={{
                    display:'flex',
                    justifyContent: 'center',
                    alignItems:'center',
                    }} >
                    <Button
                      fullWidth
                      color="inherit"
                      variant="outlined"
                      startIcon={<CleanIcon />}
                      onClick={limpiar_form}
                    >
                      Limpiar
                    </Button>
                  </Grid>
                </Grid>

              </Grid>
            </Box>

            <Grid item container xs={12} sx={{
                display:'flex',
                justifyContent:'center'
              }}>
              <TablaModalBusquedaPersona
                loadding_tabla={loadding_tabla}
                data_personas_solicitan={data_personas_solicitan}
                data_personas_responsables={data_personas_responsables}
                set_data_persona_solicita_temp={set_data_persona_solicita_temp}
                despacho_sin_solicitud={despacho_sin_solicitud}
              />
            </Grid>

            <Grid container item xs={12} spacing={1} sx={{display:'flex', justifyContent:'end'}}>
              <Grid item xs={12} md={2} sx={{
                display:'flex',
                justifyContent: 'center',
                alignItems:'center'
                }} >
                <Button
                  fullWidth
                  color='primary'
                  variant='contained'
                  startIcon={<SaveIcon />}
                  disabled={Object.keys(data_persona_solicita_temp).length === 0}
                  onClick={enviar_persona_solicita_seleccionado}
                >
                  Seleccionar
                </Button>
              </Grid>
              <Grid item xs={12} md={2} sx={{
                display:'flex',
                justifyContent: 'center',
                alignItems:'center',
                }} >
                <Button
                  fullWidth
                  color="error"
                  variant="contained"
                  startIcon={<ClearIcon />}
                  onClick={()=>set_mostrar_modal_buscar_persona(false)}
                >
                  Salir
                </Button>
              </Grid>
            </Grid>

          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
 

// eslint-disable-next-line no-restricted-syntax
export default ModalBusquedaPersona;