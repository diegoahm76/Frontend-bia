import { Box, Button, Dialog, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import { interface_busqueda_articulo, response_busqueda_articulos } from '../interfaces/types';
import { control_error } from '../../../../helpers';
import { useAppDispatch } from '../../../../hooks';
import TablaModalBuscarArticulo from '../tables/TablaModalBuscarArticulo';
import { get_obtener_articulos } from '../thunks/solicitud_activos';


interface props {
  set_mostrar_busqueda_articulo: React.Dispatch<React.SetStateAction<boolean>>;
  mostrar_busqueda_articulo: boolean;
  set_articulo_encontrado: React.Dispatch<React.SetStateAction<interface_busqueda_articulo>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ModalBuscarArticulo: React.FC<props> = ({set_mostrar_busqueda_articulo,mostrar_busqueda_articulo,set_articulo_encontrado}) => {
  const dispatch = useAppDispatch();
  
  const [cod_tipo_activo, set_cod_tipo_activo] = useState<string>('');
  const [nombre, set_nombre] = useState<string>('');
  const [doc_identificador_nro, set_doc_identificador_nro] = useState<string>('');
  const [loadding_tabla, set_loadding_tabla] = useState<boolean>(false);

  const [data_articulos, set_data_articulos] = useState<interface_busqueda_articulo[]>([
    undefined as unknown as interface_busqueda_articulo,
    undefined as unknown as interface_busqueda_articulo,
    undefined as unknown as interface_busqueda_articulo,
    undefined as unknown as interface_busqueda_articulo,
    undefined as unknown as interface_busqueda_articulo,
  ]);

  const [fila_seleccionada_temp, set_fila_seleccionada_temp] = useState<interface_busqueda_articulo>(Object);


  const get_obtener_articulos_fc = async() => {
    set_loadding_tabla(true);
    await dispatch(get_obtener_articulos(
      cod_tipo_activo,
      nombre,
      doc_identificador_nro,
      ))
      .then((response: response_busqueda_articulos) => {
        if(Object.keys(response).length !== 0 && response.success === true) {
          if(response.data.length === 0){
            control_error('No se encontraron articulos');
            set_loadding_tabla(false);
          } else {
            set_data_articulos(response.data);
            set_loadding_tabla(false);
          }
        } else {
          set_data_articulos([]);
          set_loadding_tabla(false);
        }
      }
    )
  }

  const articulos_obtenidos = useRef<boolean>(false);
  useEffect(() => {
    if(!articulos_obtenidos.current && mostrar_busqueda_articulo) {
      get_obtener_articulos_fc();
      articulos_obtenidos.current = true;
    }
  },[mostrar_busqueda_articulo]);


  const consultar_articulos = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    get_obtener_articulos_fc();
  }

  const limpiar_filtros = () => {
    set_cod_tipo_activo('');
    set_nombre('');
    set_doc_identificador_nro('');
  }

  const enviar_articulo_encontrado = () => {
    if(Object.keys(fila_seleccionada_temp).length === 0){
      control_error('Debe seleccionar un articulo');
      return;
    } else {
      set_articulo_encontrado(fila_seleccionada_temp);
      set_mostrar_busqueda_articulo(false);
    }
  }

  return (
    <>
      <Dialog
	    	open={mostrar_busqueda_articulo}
	    	onClose={() => {
	    		set_mostrar_busqueda_articulo(false);
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
            <Title title='Buscar articulos' />
            <Box
              component="form"
              onSubmit={consultar_articulos}
              noValidate
              autoComplete="off"
              sx={{width:'100%', mt:'20px'}}
              >
              <Grid container item xs={12} spacing={2}>

                <Grid item xs={12} lg={4}>
                  <FormControl required size="small" fullWidth>
                    <InputLabel >Tipo de activo: </InputLabel>
                    <Select
                      label='Tipo de activo: '
                      value={cod_tipo_activo}
                      onChange={(e) => set_cod_tipo_activo(e.target.value)}
                    >
                      <MenuItem value="Com">Computador</MenuItem>
                      <MenuItem value="Veh">Vehículo</MenuItem>
                      <MenuItem value="OAc">Otros articulos</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} lg={4}>
                  <TextField
                    label="Nombre"
                    fullWidth
                    size='small'
                    value={nombre}
                    onChange={(e) => set_nombre(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <TextField
                    label="Identificador: "
                    fullWidth
                    size='small'
                    value={doc_identificador_nro}
                    onChange={(e) => set_doc_identificador_nro(e.target.value)}
                  />
                </Grid>

                <Grid container item xs={12} spacing={2} sx={{display:'flex', justifyContent:'end'}}>
                  <Grid container item xs={12} lg={4}>
                    <Button
                      fullWidth
                      variant='contained'
                      color='primary'
                      startIcon={<SearchIcon />}
                      onClick={consultar_articulos}
                    >
                      Buscar
                    </Button>
                  </Grid>

                  <Grid container item xs={12} lg={4}>
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


              </Grid>

              <Grid container item xs={12} my={4}>
                <TablaModalBuscarArticulo
                  data_articulos={data_articulos}
                  set_fila_seleccionada_temp={set_fila_seleccionada_temp}
                  loadding_tabla={loadding_tabla}
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
                  onClick={enviar_articulo_encontrado}
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
                  onClick={()=>set_mostrar_busqueda_articulo(false)}
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
export default ModalBuscarArticulo;