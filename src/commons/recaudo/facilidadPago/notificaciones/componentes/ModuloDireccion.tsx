/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { type IList } from '../../../../../interfaces/globalModels';
import { type event } from '../../interfaces/interfaces';
import { get_paises, get_departamentos, get_ciudades } from '../../../../../request/getRequest';
import { DialogGeneradorDeDirecciones } from '../../../../../components/DialogGeneradorDeDirecciones';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ModuloDireccion: React.FC = () => {
  const [paises_options, set_paises_options] = useState<IList[]>([]);
  const [departamentos_options, set_departamentos_options] = useState<IList[]>([]);
  const [ciudades_options, set_ciudades_options] = useState<IList[]>([]);
  const [pais_selected, set_pais_selected] = useState('');
  const [departamento_selected, set_departamento_selected] = useState('');
  const [ciudad_selected, set_ciudad_selected] = useState('');
  const [direccion, set_direccion] = useState('');
  const [complemento, set_complemento] = useState('');
  const [modal, set_modal] = useState(false);

  const handle_close = () => { set_modal(false) }
  const handle_open = () => { set_modal(true) }

  const get_lista_paises = async (): Promise<void> => {
    try {
      const { data: { data: res_paises } } = await get_paises();
      set_paises_options(res_paises ?? []);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  const get_lista_departamentos = async (pais: string): Promise<void> => {
    try {
      const { data: { data } } = await get_departamentos(pais);
      set_departamentos_options(data ?? []);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  const get_lista_ciudades = async (departamento: string): Promise<void> => {
    try {
      const { data: { data } } = await get_ciudades(departamento);
      set_ciudades_options(data ?? []);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  const get_direccion_modal = (value: string): void => {
    set_direccion(value);
  };

  useEffect(() => {
    void get_lista_paises();
  }, [])

  useEffect(() => {
    void get_lista_departamentos(pais_selected);
  }, [pais_selected])

  useEffect(() => {
    void get_lista_ciudades(departamento_selected);
  }, [departamento_selected])

  return (
    <Grid
      container
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        mb: '20px',
        mt: '20px',
        p: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >
      <Grid item xs={12}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <h3>Dirección de Entrega</h3>
          <Grid container spacing={2} mb='20px'>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl required fullWidth size='small'>
                <InputLabel>País de Residencia</InputLabel>
                <Select
                  size='small'
                  label="País de residencia"
                  defaultValue={''}
                  onChange={(event: event) => {
                    const { value } = event.target
                    set_pais_selected(value)
                  }}
                >
                  {
                    paises_options.map((pais) => (
                      <MenuItem key={pais.value} value={pais.value}>{pais.label}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            {
              pais_selected === 'CO' ? (
                <>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl required fullWidth size='small'>
                      <InputLabel>Departamento</InputLabel>
                      <Select
                        size='small'
                        label="Departamento"
                        defaultValue={''}
                        onChange={(event: event) => {
                          const { value } = event.target
                          set_departamento_selected(value)
                        }}
                      >
                        {
                          departamentos_options.map((departamento) => (
                            <MenuItem key={departamento.value} value={departamento.value}>{departamento.label}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl required fullWidth size='small'>
                      <InputLabel>Ciudad</InputLabel>
                      <Select
                        size='small'
                        label="Ciudad"
                        defaultValue={''}
                        disabled={departamento_selected === ''}
                        onChange={(event: event) => {
                          const { value } = event.target
                          set_ciudad_selected(value)
                        }}
                      >
                        {
                          ciudades_options.map((ciudad) => (
                            <MenuItem key={ciudad.value} value={ciudad.value}>{ciudad.label}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      required
                      size="small"
                      label="Dirección"
                      disabled
                      fullWidth
                      value={direccion}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Button
                      variant="contained"
                      onClick={handle_open}
                    >
                      Generar Dirección
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      type="textarea"
                      rows="3"
                      label="Complemento Dirección"
                      onChange={(event: event) => {
                        const { value } = event.target
                        set_complemento(value)
                      }}
                    />
                  </Grid>
                </>
              ) : null
            }
          </Grid>
        </Box>
      </Grid>
      <DialogGeneradorDeDirecciones
        open={modal}
        openDialog={handle_close}
        onChange={get_direccion_modal}
        type='residencia'
      />
    </Grid>
  )
}
