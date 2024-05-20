/* eslint-disable @typescript-eslint/naming-convention */
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { FormCreacionContext } from '../../context/CreaccionPlantillaContex';
import { api } from '../../../../../api/axios';
import { control_error } from '../../../ccd/componentes/crearSeriesCcdDialog/utils/success_errors';





export const FormatoCalidadAsociado: React.FC = () => {

  const { form, set_form } = useContext(FormCreacionContext);

  const [Tipos_acceso_consulta, set_Tipos_acceso_consulta] = useState<any>(null);

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
      set_Tipos_acceso_consulta(numero_consulta);
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
        spacing={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          margin: '10px 0 20px 0',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            variant="outlined"
            size="small"
            margin="dense"
            label="Formato de calidad asociado"
            value={form.codigo_formato_calidad_asociado}
            fullWidth
            name="codigo_formato_calidad_asociado"
            onChange={HandleCompletarDatos}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            variant="outlined"
            size="small"
            margin="dense"
            label="Version de formato de calidad asociado"
            value={form.version_formato_calidad_asociado}
            fullWidth
            name="version_formato_calidad_asociado"
            onChange={HandleCompletarDatos}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            fullWidth
            size="small"
            id="demo-simple-select"
            label="Seleccionar tipo de acceso"
            name="cod_tipo_acceso"
            value={form.cod_tipo_acceso}
            onChange={HandleCompletarDatos}
          >
            <MenuItem value="">
              <em>Seleccione una opción</em>
            </MenuItem>
            {Tipos_acceso_consulta?.map((item: any, index: number) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </>
  );
};
