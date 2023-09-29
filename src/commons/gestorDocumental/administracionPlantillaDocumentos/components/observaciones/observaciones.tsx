/* eslint-disable @typescript-eslint/naming-convention */
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

import { Title } from '../../../../../components/Title';
import { useEffect, useState } from 'react';
import { api } from '../../../../../api/axios';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import { MostrarModalBuscarPlantilla } from '../modalBuscarPlantilla/BuscarPlantilla';

export const ObservacionesAdministradorPlantillas: React.FC = () => {
  const [tipos_pqr, set_tipos_pqr] = useState<any>(null);
  const [PQR_seleccionado, set_PQR_seleccionado] = useState<string>('');
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
          <Title title="Obsevaciones" />
        </Grid>

        <Grid item xs={12}>
          <TextField
            style={{ width: '100%', marginTop: 20 }}
            label={`Observacion`}
            id="description"
            value={12345648}

            // error={emailMismatch}
            // helperText={emailMismatch ? "El campo de observaciones esta vacio " : ""}
          />
        </Grid>

        <Grid item container spacing={1} style={{ margin: 1 }}>
          <Grid item  xs={2} >
            <h5>Activo</h5>
          </Grid>
          <Grid item xs={10} sm={4}>
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

        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item xs={12} sm={1.5}>
            <Button color="success" fullWidth variant="contained">
              guardar
            </Button>
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <Button color="error" fullWidth variant="outlined">
              borrar
            </Button>
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <Button fullWidth variant="outlined">
              limpiar
            </Button>
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <MostrarModalBuscarPlantilla />
          </Grid>

          <Grid item xs={12} sm={2}>
            <ButtonSalir />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
