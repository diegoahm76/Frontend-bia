import { Box, Button, Dialog, DialogContent, Grid, TextField } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import TablaModalBuscarBien from '../tables/TablaModalBuscarBien';
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import { control_error } from '../../../../helpers';
import { interface_busqueda_avanzada_bienes, response_busqueda_avanzada_bienes } from '../interfaces/types';
import { useAppDispatch } from "../../../../hooks";
import { get_obtener_bienes } from '../thunks/baja_activos';


interface props {
  set_mostrar_buscar_bienes: React.Dispatch<React.SetStateAction<boolean>>;
  mostrar_buscar_bienes: boolean;
  set_bienes_seleccionados: React.Dispatch<React.SetStateAction<any>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ModalBuscarBien: React.FC<props> = ({set_mostrar_buscar_bienes,mostrar_buscar_bienes,set_bienes_seleccionados}) => {
  const dispatch = useAppDispatch();
  
  const [codigo_bien, set_codigo_bien] = useState<string>('');
  const [nombre_bien, set_nombre_bien] = useState<string>('');
  const [marca_bien, set_marca_bien] = useState<string>('');
  const [identificador_bien, set_identificador_bien] = useState<string>('');
  const [valor_unitario, set_valor_unitario] = useState<string>('');

  const [data_bienes_baja, set_data_bienes_baja] = useState<interface_busqueda_avanzada_bienes[]>([
    undefined as unknown as interface_busqueda_avanzada_bienes,
    undefined as unknown as interface_busqueda_avanzada_bienes,
    undefined as unknown as interface_busqueda_avanzada_bienes,
    undefined as unknown as interface_busqueda_avanzada_bienes,
    undefined as unknown as interface_busqueda_avanzada_bienes,
  ]);

  const [filas_seleccionadas_temp, set_filas_seleccionadas_temp] = useState<interface_busqueda_avanzada_bienes[]>([]);


  const get_obetener_bienes_fc = async() => {
    await dispatch(get_obtener_bienes(
      codigo_bien,
      nombre_bien,
      marca_bien,
      identificador_bien,
      valor_unitario
      ))
      .then((response: response_busqueda_avanzada_bienes) => {
        if(Object.keys(response).length !== 0 && response.success === true) {
          if(response.data.length === 0){
            control_error('No se encontraron bienes');
          }
          set_data_bienes_baja(response.data.map((prev) => {
            return {
              ...prev,
              justificacion_baja_activo: '',
            }
          }));
        } else {
          set_data_bienes_baja([]);
        }
      }
    )
  }

  const bienes_obtenidos = useRef<boolean>(false);
  useEffect(() => {
    if(!bienes_obtenidos.current && mostrar_buscar_bienes) {
      get_obetener_bienes_fc();
      bienes_obtenidos.current = true;
    }
  },[mostrar_buscar_bienes]);


  const consultar_bienes = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    get_obetener_bienes_fc();
    console.log('Consultar bien');
  }

  const limpiar_filtros = () => {
    set_codigo_bien('');
    set_nombre_bien('');
    set_marca_bien('');
    set_identificador_bien('');
    set_valor_unitario('');
  }

  const enviar_data_bienes_encontrados = () => {
    if(filas_seleccionadas_temp.length === 0){
      control_error('Debe seleccionar al menos un bien');
      return;
    } else {
      set_bienes_seleccionados((prev: any) => [...prev, ...filas_seleccionadas_temp]);
      set_mostrar_buscar_bienes(false);
    }
  }

  return (
    <>
      <Dialog
	    	open={mostrar_buscar_bienes}
	    	onClose={() => {
	    		set_mostrar_buscar_bienes(false);
	    	}}
	    	fullWidth maxWidth="lg" >
        <DialogContent>
          <Grid
          container
          spacing={2}
          rowSpacing={3}
          marginTop={2}
          sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '30px',
            margin:'10px auto',
            width:'100%',
          }}
          >
            <Title title='Buscar bienes' />
            <Box
              component="form"
              onSubmit={consultar_bienes}
              noValidate
              autoComplete="off"
              sx={{width:'100%', mt:'20px'}}
              >
              <Grid container item xs={12} spacing={2}>
                <Grid item xs={12} lg={4}>
                  <TextField
                    label="Código del bien"
                    fullWidth
                    size='small'
                    value={codigo_bien}
                    onChange={(e) => set_codigo_bien(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <TextField
                    label="Nombre del bien"
                    fullWidth
                    size='small'
                    value={nombre_bien}
                    onChange={(e) => set_nombre_bien(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <TextField
                    label="Marca del bien"
                    fullWidth
                    size='small'
                    value={marca_bien}
                    onChange={(e) => set_marca_bien(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <TextField
                    label="Identificador del bien"
                    fullWidth
                    size='small'
                    value={identificador_bien}
                    onChange={(e) => set_identificador_bien(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <TextField
                    label="Valor unitario"
                    fullWidth
                    size='small'
                    value={valor_unitario}
                    onChange={(e) => set_valor_unitario(e.target.value)}
                  />
                </Grid>

                <Grid container item xs={12} lg={2}>
                  <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    startIcon={<SearchIcon />}
                    onClick={consultar_bienes}
                  >
                    Buscar
                  </Button>
                </Grid>

                <Grid container item xs={12} lg={2}>
                  <Button
                    fullWidth
                    color="inherit"
                    variant="outlined"
                    startIcon={<CleanIcon />}
                    onClick={limpiar_filtros}
                  >
                    Limpiar
                  </Button>
                </Grid>
              </Grid>

              <TablaModalBuscarBien
                data_bienes_baja={data_bienes_baja}
                set_filas_seleccionadas_temp={set_filas_seleccionadas_temp}
              />

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
                  onClick={enviar_data_bienes_encontrados}
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
                  onClick={()=>set_mostrar_buscar_bienes(false)}
                >
                  Salir
                </Button>
              </Grid>
            </Grid>
            </Box>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default ModalBuscarBien;