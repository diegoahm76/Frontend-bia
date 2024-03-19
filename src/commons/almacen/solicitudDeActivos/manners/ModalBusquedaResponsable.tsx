import React, { useState } from 'react';
import { Box, Button, Dialog, DialogContent, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';


interface props {
  set_mostrar_busqueda_responsable: React.Dispatch<React.SetStateAction<boolean>>;
  mostrar_busqueda_responsable: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ModalBusquedaResponsable: React.FC<props> = ({
  set_mostrar_busqueda_responsable,
  mostrar_busqueda_responsable,
}) => {

  const [tipo_documento, set_tipo_documento] = useState<string>('');
  const [documento, set_documento] = useState<string>('');
  const [tipo_persona, set_tipo_persona] = useState<string>('');
  const [primer_nombre, set_primer_nombre] = useState<string>('');
  const [primer_apellido, set_primer_apellido] = useState<string>('');
  const [nombre_comercial, set_nombre_comercial] = useState<string>('');


  const consultar_responsable = () => {
    alert("Se está realizando la búsqueda del responsable");
  }

  const limpiar_form = () => {
    set_tipo_documento('');
    set_documento('');
    set_tipo_persona('');
    set_primer_nombre('');
    set_primer_apellido('');
    set_nombre_comercial('');
  }

  return (
    <>
      <Dialog
        open={mostrar_busqueda_responsable}
        onClose={() => {
          set_mostrar_busqueda_responsable(false);
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
            <Title title='Búsqueda de Responsable' />

            <Box
              component="form"
              onSubmit={consultar_responsable}
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
                      <MenuItem value="CC">Cédula de ciudadanía</MenuItem>
                      <MenuItem value="CE">Cédula de extranjería</MenuItem>
                      <MenuItem value="TI">Tarjeta de identidad</MenuItem>
                      <MenuItem value="RC">Registro civil</MenuItem>
                      <MenuItem value="PA">Pasaporte</MenuItem>
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
                  <FormControl required size="small" fullWidth>
                    <InputLabel >Tipo persona:</InputLabel>
                    <Select
                      label='Tipo persona:'
                      value={tipo_persona}

                      onChange={(e) => set_tipo_persona(e.target.value)}
                    >
                      <MenuItem value="N">Natural</MenuItem>
                      <MenuItem value="J">Juridica</MenuItem>
                    </Select>
                  </FormControl>
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
                      type='submit'
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
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
 

// eslint-disable-next-line no-restricted-syntax
export default ModalBusquedaResponsable;