/* eslint-disable @typescript-eslint/naming-convention */
import { FormControl, Grid, MenuItem, Select, TextField } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { useEffect, useState } from 'react';
import { api } from '../../../../../api/axios';

export const TipologiaDocumental: React.FC = () => {
  const [tipos_pqr, set_tipos_pqr] = useState<any>(null);
  const [PQR_seleccionado, set_PQR_seleccionado] = useState<string>('');
  const [otro_seleccionado, set_otro_seleccionado] = useState<string>('');
  const [tercero_seleccionado, set_tercero_seleccionado] = useState<string>('');

  const fetch_data_get = async (): Promise<void> => {
    try {
      const url = `/gestor/choices/cod-tipo-pqrs/`;
      const res: any = await api.get(url);
      const numero_consulta: any = res.data.data;
      set_tipos_pqr(numero_consulta);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch_data_get().catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <>
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
          <Title title="Tipologia Documental" />
        </Grid>
        <Grid item container spacing={1} style={{ margin: 1 }}>
          <Grid item xs={12} sm={6} md={3}>
            <h5>¿Plantilla asociada a tipologia documental del TRD?</h5>
          </Grid>
          <Grid item xs={12} sm={5} md={4}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={PQR_seleccionado}
                label="PQR_seleccionado"
                onChange={(event): any => {
                  set_PQR_seleccionado(event.target.value);
                }}
              >
                {tipos_pqr?.map((item: any, index: number) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Desplegable adicional 1 */}
        <Grid item container spacing={1} style={{ margin: 1 }}>
          <Grid item xs={12} sm={6} md={3}>
            <h5>Selecciona tipologia documental:</h5>
          </Grid>
          <Grid item xs={12} sm={5} md={4}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label-2"
                id="demo-simple-select-2"
                value={otro_seleccionado}
                label="Otro_seleccionado"
                onChange={(event): any => {
                  set_otro_seleccionado(event.target.value);
                }}
              >
                {tipos_pqr?.map((item: any, index: number) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Desplegable adicional 2 */}
        <Grid item container spacing={1} style={{ margin: 1 }}>
          <Grid item xs={12} sm={1} >
            <h5>¿Cual?</h5>
          </Grid>
          <Grid item xs={12} sm={5} md={3}>
            <TextField id="outlined-basic" variant="outlined" />
          </Grid>
          <Grid item sm={5}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label-3"
                id="demo-simple-select-3"
                value={tercero_seleccionado}
                label="Tercero_seleccionado"
                onChange={(event): any => {
                  set_tercero_seleccionado(event.target.value);
                }}
              >
                {tipos_pqr?.map((item: any, index: number) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
