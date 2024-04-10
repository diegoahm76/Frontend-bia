/* eslint-disable @typescript-eslint/naming-convention */

import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { PreciosContext } from "../../context/PersonalContext";
import { DetalleLiquidacion } from "../DetalleLiquidacion/DetalleLiquidacion";

export const GenerarLiquidacion = () => {


  const [form, setForm] = useState({
    id_expediente: '', // Ejemplo de propiedad que se actualizará desde un componente
    deudor: '', // Ejemplo de propiedad que se actualizará desde un componente
    cedula: '', // Ejemplo de propiedad que se actualizará desde un componente
    fecha_liquidacion: '', // Ejemplo de propiedad para la fecha de liquidación
    telefono: '', // Ejemplo de propiedad para el teléfono
    ciclo_liquidacion: '', // Ejemplo de propiedad para el ciclo de liquidación
    periodo_liquidacion: '', // Ejemplo de propiedad para el periodo de liquidación
    direccion: '', // Ejemplo de propiedad para la dirección
    representante_legal: '', // Ejemplo de propiedad para el representante legal
    predio: '', // Ejemplo de propiedad para el predio
    caudalConcesionado: '', // Ejemplo de propiedad para el caudal concesionado
    // Agrega más propiedades según sea necesario para los demás componentes
  });


  const handleSelectChange = (event: any) => {
    setForm({ ...form, [event.target.name || '']: event.target.value as string });
  };

  // Función para manejar el cambio en los componentes de tipo TextField
  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name || '']: event.target.value });
  };






 

  return (
    <>
      {/* Maquetación de los componentes */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <FormControl size="small" fullWidth>
            <InputLabel>Expediente</InputLabel>
            <Select
              label='Expediente'
              name="id_expediente"
              value={form.id_expediente}
              onChange={handleSelectChange}
            >
              <MenuItem value="">Seleccionar expediente</MenuItem>
            </Select>
            <FormHelperText>Seleccione el expediente</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label='Deudor'
            name="deudor"
            value={form.deudor}
            size="small"
            fullWidth
            onChange={handleTextFieldChange}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label='Cedula'
            name="cedula"
            value={form.cedula}
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            onChange={handleTextFieldChange}
          />
        </Grid>


        <Grid item xs={12} sm={4}>
          <TextField
            label='Teléfono'
            name="telefono"
            value={form.telefono}
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            onChange={handleTextFieldChange}
          />
        </Grid>


        <Grid item xs={12} sm={4}>
          <FormControl size="small" fullWidth>
            <InputLabel>Ciclo</InputLabel>
            <Select
              label='Ciclo'
              name="ciclo_liquidacion"
              value={form.ciclo_liquidacion}
              onChange={handleSelectChange}
            >
            </Select>
            <FormHelperText>Seleccione el ciclo</FormHelperText>
          </FormControl>
        </Grid>


        <Grid item xs={12} sm={4}>
          <FormControl size="small" fullWidth>
            <InputLabel>Periodo</InputLabel>
            <Select
              label='Periodo'
              name="periodo_liquidacion"
              value={form.periodo_liquidacion}
              onChange={handleSelectChange}
            >
            </Select>
            <FormHelperText>Seleccione el periodo</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label='Dirección'
            name="direccion"
            value={form.direccion}
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            onChange={handleTextFieldChange}
          />
        </Grid>


        <Grid item xs={12} sm={4}>
          <TextField
            label='Representante legal'
            name="representante_legal"
            value={form.representante_legal}
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            onChange={handleTextFieldChange}
          />
        </Grid>


        <Grid item xs={12} sm={4}>
          <TextField
            label='Predio'
            name="predio"
            value={form.predio}
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            onChange={handleTextFieldChange}
          />
        </Grid>


        <Grid item xs={12} sm={4}>
          <TextField
            label='Caudal Concesionado'
            name="caudalConcesionado"
            value={form.caudalConcesionado}
            size="small"
            fullWidth
            onChange={handleTextFieldChange}
          />
        </Grid>

      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Button variant="contained" color="primary" >
            Actualizar
          </Button>
        </Grid>

      </Grid>



<DetalleLiquidacion/>
    </>
  );
};
