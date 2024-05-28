import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { inputs_persona_seleccionada, interface_busqueda_persona_solicita, interface_tipos_documentos, response_tipos_documentos } from '../interfaces/types';
import { SearchOutlined } from '@mui/icons-material';
import TablaPersonasViajan from '../tables/TablaPersonasViajan';
import { Title } from '../../../../components';
import ModalBusquedaPersona from '../manners/ModalBusquedaPersona';
import { useDispatch } from 'react-redux';
import { get_obtener_tipos_documentos } from '../thunks/viajes';
import { control_error } from '../../../../helpers';
import AddIcon from '@mui/icons-material/Add';


interface props {
  inputs_persona_seleccionada: inputs_persona_seleccionada;
  set_inputs_persona_seleccionada: Dispatch<SetStateAction<inputs_persona_seleccionada>>;
  data_personas_viajan: interface_busqueda_persona_solicita[];
  set_data_personas_viajan: React.Dispatch<React.SetStateAction<interface_busqueda_persona_solicita[]>>;
  accion: string;
}


// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const PersonasViajan: FC<props> = ({
  inputs_persona_seleccionada,
  set_inputs_persona_seleccionada,
  data_personas_viajan,
  set_data_personas_viajan,
  accion
}) => {
  const dispatch = useDispatch();

  // Estados para busqueda de personas
  const [mostrar_modal_buscar_persona, set_mostrar_modal_buscar_persona] = useState<boolean>(false);

  const [data_persona_seleccionada, set_data_persona_seleccionada] = useState<interface_busqueda_persona_solicita>(Object);

  const [tipos_documentos, set_tipos_documentos] = useState<interface_tipos_documentos[]>([]);

  useEffect(() => {
    console.log(data_personas_viajan);
  }, [data_personas_viajan]);

  useEffect(()=>{
    // si hay datos en data_persona_seleccionada entonces se rellenan los campos de inputs_persona_seleccionada
    if(Object.keys(data_persona_seleccionada).length !== 0){
      set_inputs_persona_seleccionada({
        tp_documento: data_persona_seleccionada.tipo_documento,
        documento: data_persona_seleccionada.numero_documento,
        nombres: data_persona_seleccionada.nombre_completo ?? '',
        razon_social: data_persona_seleccionada.razon_social ?? '',
        nombre_comercial: data_persona_seleccionada.nombre_comercial ?? '',
      });
    }
  },[data_persona_seleccionada])


  const get_obtener_tipos_documentos_fc = () => {
    dispatch(get_obtener_tipos_documentos())
      .then((response: response_tipos_documentos) => {
        if (Object.keys(response).length !== 0) {
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
  useEffect(() => {
    if (!ejecutar_servicios.current) {
      get_obtener_tipos_documentos_fc();
      ejecutar_servicios.current = true;
    }
  }, [])

  const valida_campos: ()=> Promise<boolean> = async() => {
    if(Object.keys(data_persona_seleccionada).length === 0){
      control_error('Debe seleccionar una persona para agregar');
      return false;
    }
    // validamos que el id_persona no exista en el array de personas que viajan
    const existe = data_personas_viajan.find((item) => item.id_persona === data_persona_seleccionada.id_persona);
    if(existe){
      control_error('La persona ya fue agregada');
      return false;
    }
    return true;
  }

  const handle_agregar_articulo = async() => {
    const validacion = await valida_campos();

    if(validacion){
      set_data_personas_viajan([...data_personas_viajan, data_persona_seleccionada]);
      set_inputs_persona_seleccionada({} as inputs_persona_seleccionada);
    }
  }

  return (
    <>
      <ModalBusquedaPersona
        set_mostrar_modal_buscar_persona={set_mostrar_modal_buscar_persona}
        mostrar_modal_buscar_persona={mostrar_modal_buscar_persona}
        set_data_persona_seleccionada={set_data_persona_seleccionada}
      />
      <Grid container spacing={2} rowSpacing={3} my={5} item xs={12} sx={{
        position: "relative",
        background: "#FAFAFA",
        borderRadius: "15px",
        p: "40px",
        mb: "20px",
        boxShadow: "0px 3px 6px #042F4A26",
      }}
      >
        <Title title="Agregar personas que viajan" />

        {accion === 'crear' &&
          <>
            <Grid item xs={12} lg={4}>
              <FormControl required size="small" fullWidth>
                <InputLabel >Tipo documento:</InputLabel>
                <Select
                  label='Tipo documento:'
                  disabled
                  value={inputs_persona_seleccionada.tp_documento ?? ''}
                  onChange={(e: SelectChangeEvent) => {
                    set_inputs_persona_seleccionada({ ...inputs_persona_seleccionada, tp_documento: e.target.value });
                  }
                  }
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
                label='Documento: '
                value={inputs_persona_seleccionada.documento ?? ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  set_inputs_persona_seleccionada({ ...inputs_persona_seleccionada, documento: e.target.value })
                }}
                disabled
                fullWidth
                size="small" />
            </Grid>

            <Grid item xs={12} lg={4}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<SearchOutlined />}
                onClick={() => {
                  set_mostrar_modal_buscar_persona(true);
                }}
              >
                Busqueda Avanzada
              </Button>
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField
                label='Nombres: '
                value={inputs_persona_seleccionada.nombres ?? ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  set_inputs_persona_seleccionada({ ...inputs_persona_seleccionada, nombres: e.target.value })
                }}
                disabled
                fullWidth
                size="small" />
            </Grid>

            <Grid item xs={12} lg={3}>
              <TextField
                label='Razón social: '
                value={inputs_persona_seleccionada.razon_social ?? ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  set_inputs_persona_seleccionada({ ...inputs_persona_seleccionada, razon_social: e.target.value })
                }}
                disabled
                fullWidth
                size="small" />
            </Grid>

            <Grid item xs={12} lg={3}>
              <TextField
                label='Nombre comercial: '
                value={inputs_persona_seleccionada.nombre_comercial ?? ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  set_inputs_persona_seleccionada({ ...inputs_persona_seleccionada, nombre_comercial: e.target.value })
                }}
                disabled
                fullWidth
                size="small" />
            </Grid>


            <Grid container item my={2} xs={12} sx={{
              display: "flex",
              justifyContent: "end",
            }}>
              <Grid item xs={12} lg={3}>
                <Button
                  fullWidth
                  disabled={Object.keys(data_persona_seleccionada).length === 0}
                  type='button'
                  onClick={handle_agregar_articulo}
                  variant='contained'
                  color='success'
                  startIcon={<AddIcon />}
                >
                  Agregar
                </Button>
              </Grid>
            </Grid>
          </>
        }


        <Grid item xs={12}>
          <TablaPersonasViajan
            accion={accion}
            data_personas_viajan={data_personas_viajan}
            set_data_personas_viajan={set_data_personas_viajan}
          />
        </Grid>
      </Grid>

    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default PersonasViajan;