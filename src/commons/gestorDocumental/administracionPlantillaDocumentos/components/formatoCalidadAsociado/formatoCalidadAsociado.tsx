/* eslint-disable @typescript-eslint/naming-convention */
import { FormControl, Grid, MenuItem, Select, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { FormCreacionContext } from '../../context/CreaccionPlantillaContex';
import { api } from '../../../../../api/axios';
import { control_error } from '../../../ccd/componentes/crearSeriesCcdDialog/utils/success_errors';





export const FormatoCalidadAsociado: React.FC = () => {

  const { form, set_form } = useContext(FormCreacionContext);

  const [tipos_pqr, set_tipos_pqr] = useState<any>(null);
  const [PQR_seleccionado, set_PQR_seleccionado] = useState<string>('');
console.log(PQR_seleccionado);
  const HandleCompletarDatos = (e: any) => {
    set_form({
      ...form,
      [e.target.name]: e.target.value
    });
  }


  const fetch_data_get = async (): Promise<void> => {
    try {
      const url = `/gestor/choices/tipo-acceso/`;
      const res: any = await api.get(url);
      const numero_consulta: any = res.data;
      set_tipos_pqr(numero_consulta);
      // control_success("se creo correctamente");
    } catch (error: any) {
      control_error(error.response.detail)
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
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            style={{ width: '80%', margin: 4 }}
            variant="outlined"
            label="Formato de calidad asociado"
            value={form.codigo_formato_calidad_asociado}
            fullWidth
            name="codigo_formato_calidad_asociado"
            onChange={HandleCompletarDatos}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            style={{ width: '80%', margin: 4 }}
            variant="outlined"
            label="Version de formato de calidad asociado"
            value={form.version_formato_calidad_asociado}
            fullWidth
            name="version_formato_calidad_asociado"
            onChange={HandleCompletarDatos}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <Select
              style={{ width: '80%', margin: 4 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={PQR_seleccionado}
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
    </>
  );
};
