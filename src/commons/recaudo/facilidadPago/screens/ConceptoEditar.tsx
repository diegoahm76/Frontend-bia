/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { Divider, Button, Dialog, Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { api } from '../../../../api/axios';
import { Title } from '../../../../components';
import SaveIcon from '@mui/icons-material/Save';
import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { control_error, control_success } from '../../../../helpers';
import { control_success_fail } from '../../../recursoHidrico/requets/Request';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

interface BuscarProps {
  isBuscarActivo: any;
  setIsBuscarActivo: any;
  selectedConfiguracion: any;
  fetchConfiguraciones: any;
}

interface TipoRenta {
  id_tipo_renta: any;
  nombre_tipo_renta: any;
  tipo_cobro_asociado: any;
  tipo_renta_asociado: any;
}
interface Variable {
  id_variables: any;
  nombre: any;
  tipo_cobro: any;
  tipo_renta: any;
}
interface ConfiguracionBasica {
  tipo_renta: any;
  fecha_fin: any;
  valor: any;
  variables: any;
  descripccion: any;
  tipo_cobro: any;
  fecha_inicio: any;
}
interface TipoCobro {
  id_tipo_cobro: number;
  nombre_tipo_cobro: string;
  tipo_renta_asociado: any;
}
export const ConceptoEditar: React.FC<BuscarProps> = ({
  fetchConfiguraciones,
  isBuscarActivo,
  setIsBuscarActivo,
  selectedConfiguracion,
}) => {
  const [formValues, setFormValues] = useState<ConfiguracionBasica>({
    fecha_inicio: selectedConfiguracion?.fecha_inicio || '',
    tipo_cobro: selectedConfiguracion?.id_tipo_cobro || '',
    tipo_renta: selectedConfiguracion?.id_tipo_renta || '',
    valor: selectedConfiguracion?.valor || '',
    fecha_fin: selectedConfiguracion?.fecha_fin || '',
    variables: selectedConfiguracion?.variables || "",
    descripccion: selectedConfiguracion?.descripccion || '',
  });

  useEffect(() => {
    if (selectedConfiguracion) {
      setFormValues({
        fecha_inicio: selectedConfiguracion?.fecha_inicio || '',
        tipo_cobro: selectedConfiguracion?.id_tipo_cobro || '',
        tipo_renta: selectedConfiguracion.id_tipo_renta || '',
        valor: selectedConfiguracion.valor || '',
        fecha_fin: selectedConfiguracion.fecha_fin || '',
        variables: selectedConfiguracion?.variables || "",
        descripccion: selectedConfiguracion.descripccion || '',
      });
    }
  }, [selectedConfiguracion]);

  // Código del componente...

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setFormValues({ ...formValues, [name]: value.replace(/[^\d]/g, '') });
  // };
  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
};
  const handleSubmit = async () => {
    try {
      const url = `/recaudo/configuracion_baisca/valoresvariables/put/${selectedConfiguracion?.id_valores_variables}/`;
      await api.put(url, formValues);
      fetchConfiguraciones();
      handle_close();
      control_success('Editaddo exitosamente ');

      // Agregar lógica adicional tras la actualización exitosa
    } catch (error: any) {
      console.error('Error al actualizar la configuración', error);
      control_error(error.response.data.detail);
      // Manejar el error
    }
  };
  const [variables, setVariables] = useState<Variable[]>([]);

  const fetchVariables = async () => {
    try {
      const res = await api.get('/recaudo/configuracion_baisca/variables/get/');
      setVariables(res.data.data);
    } catch (error) {
      console.error('Error al obtener las variables', error);
    }
  };
  useEffect(() => {
    fetchVariables();
  }, []);

  const [fechaFin, setFechaFin] = useState(formValues.fecha_fin);
  const today = dayjs();

  const handle_close = (): void => {
    setIsBuscarActivo(false);
  };
  const con = (): void => {
    console.log(selectedConfiguracion);
  };

  const [tiposRenta, setTiposRenta] = useState<TipoRenta[]>([]);

  const fetchTiposRenta = async () => {
    try {
      const res = await api.get('/recaudo/configuracion_baisca/tiporenta/get/');
      setTiposRenta(res.data.data);
    } catch (error) {
      console.error('Error al obtener los tipos de renta', error);
    }
  };
  useEffect(() => {
    fetchTiposRenta();
  }, []);
  const [tiposCobro, setTiposCobro] = useState<TipoCobro[]>([]);
  const fetchTiposCobro = async () => {
    try {
      const res = await api.get('/recaudo/configuracion_baisca/tipoCobro/get/');
      setTiposCobro(res.data.data);
    } catch (error) {
      console.error('Error al obtener los tipos de cobro', error);
    }
  };
  useEffect(() => {
    fetchTiposCobro();
  }, []);
  const formatCurrency = (value: any) => {
    if (!value) return '';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(Number(value));
  };
  return (
    <>
      <Dialog open={isBuscarActivo} onClose={handle_close} maxWidth="xl">
        {/* <Button fullWidth variant="contained" onClick={con}>
          Tipos de renta
        </Button> */}

        <Grid
          container
          item
          xs={12}
          marginLeft={2}
          marginRight={2}
          marginTop={3}
          sx={{
            width: '900px', // Cambia '700px' por el ancho que desees
            height: '900px', // Cambia '500px' por el alto que desees
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            m: '10px 0 20px 0',
            mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26',
          }}
        >
          <Title title="Editar conceptos de pago " />
          <Grid container item xs={12} spacing={2} marginTop={2}>
            {/* {selectedConfiguracion?.id_tipo_renta} */}
            <Grid item xs={12} sm={4}>
              <TextField
                select
                required
                fullWidth
                size="small"
                variant="outlined"
                label="Tipo de renta"
                name="tipo_renta"
                onChange={handleInputChange}
                value={formValues.tipo_renta}
              >
                {tiposRenta.map((tipo) => (
                  <MenuItem key={tipo.id_tipo_renta} value={tipo.id_tipo_renta}>
                    {tipo.nombre_tipo_renta}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                required
                fullWidth
                size="small"
                variant="outlined"
                label="Tipo cobro"
                name="tipo_cobro"
                onChange={handleInputChange}
                value={formValues.tipo_cobro}
              >
                {tiposCobro
                  .filter(
                    (tipoCobro) =>
                      tipoCobro.tipo_renta_asociado === formValues.tipo_renta
                  ) // Filtrado basado en la selección de tipo_renta
                  .map((tipoCobro) => (
                    <MenuItem
                      key={tipoCobro.id_tipo_cobro}
                      value={tipoCobro.id_tipo_cobro}
                    >
                      {tipoCobro.nombre_tipo_cobro}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>

            {/* <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                size="small"
                variant="outlined"
                label="Variable"
                name="variables"
                onChange={handleInputChange}
                value={formValues.variables}
              />
            </Grid> */}
                <Grid item xs={12} sm={4}>
                                <TextField
                                    select
                                    required
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    label="Variable"
                                    name="variables"
                                    onChange={handleInputChange}
                                    value={formValues.variables}
                                >
                                    {variables.map((variable) => (
                                        <MenuItem key={variable.id_variables} value={variable.id_variables}>
                                            {variable.nombre}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                size="small"
                variant="outlined"
                label="valor"
                name="valor"
                onChange={handleInputChange}
                value={formatCurrency(formValues.valor)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                size="small"
                variant="outlined"
                label="descripccion"
                name="descripccion"
                onChange={handleInputChange}
                value={formValues.descripccion}
              />
            </Grid>
            {/* {formValues.fecha_fin} */}
            {/* --{fechaFin} */}

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="date"
                size="small"
                variant="outlined"
                name="fecha_inicio"
                label="fecha inicio"
                onChange={handleInputChange}
                value={formValues.fecha_inicio}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                type="date"
                                size="small"
                                name="fecha_fin"
                                variant="outlined"
                                label="fecha fin"
                                value={formValues.fecha_fin}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

            {/* <Grid item xs={12} sm={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha fin"
                  value={formValues.fecha_fin}
                  onChange={(newValue) => {
                    setFechaFin(newValue);
                    setFormValues({
                      ...formValues,
                      fecha_fin: newValue?.format('YYYY-MM-DD'),
                    });
                  }}
                  renderInput={(params) => (
                    <TextField required fullWidth size="small" {...params} />
                  )}
                  // Establecer la fecha mínima como la fecha actual
                  minDate={today}
                />
              </LocalizationProvider>
            </Grid> */}

            <Grid item xs={12} sm={4}>
              <Button
                color="success"
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSubmit}
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};
