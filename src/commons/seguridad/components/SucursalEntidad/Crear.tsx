import { useState } from "react";
import { TextField, Button, Grid, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { api } from "../../../../api/axios";
import type { SelectChangeEvent } from "@mui/material/Select";

interface ISucursalCrear {
  descripcion_sucursal: string;
  direccion: string;
  direccion_sucursal_georeferenciada: string | null;
  municipio: string | null;
  pais_sucursal_exterior: string | null;
  direccion_notificacion: string;
  direccion_notificacion_referencia: string | null;
  municipio_notificacion: string | null; 
  email_sucursal: string;
  telefono_sucursal: string;
  es_principal: boolean;
  activo: boolean;
  item_ya_usado: boolean;
  id_persona_empresa: number;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Crear: React.FC = () => {
  const initial_state: ISucursalCrear = {
    descripcion_sucursal: "",
    direccion: "",
    direccion_sucursal_georeferenciada: null,
    municipio: null,
    pais_sucursal_exterior: null,
    direccion_notificacion: "",
    direccion_notificacion_referencia: null,
    municipio_notificacion: null,
    email_sucursal: "",
    telefono_sucursal: "",
    es_principal: false,
    activo: true,
    item_ya_usado: false,
    id_persona_empresa: 3,
    
  };

  const [form_values, setform_values] = useState<ISucursalCrear>(initial_state);

  const handle_input_change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setform_values((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handle_select_change = (e: SelectChangeEvent<string>): void => {
    const { name, value } = e.target;
    setform_values((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handle_sucursal_create = (): void => {
    api
      .post("/transversal/sucursales/sucursal-empresa-crear/", form_values)
      .then((response) => {
        //  console.log('')("Sucursal creada exitosamente");
        setform_values(initial_state);
      })
      .catch((error) => {
        console.error("Error al crear la sucursal:", error);
      });
  };

  return (
    <Grid item xs={12}>
      <Grid container spacing={7}>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            size="small"
            style={{ marginBottom: "10px" }}
            label="Descripción Sucursal"
            fullWidth
            name="descripcion_sucursal"
            value={form_values.descripcion_sucursal}
            onChange={handle_input_change}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            size="small"
            style={{ marginBottom: "10px" }}
            label="Dirección"
            fullWidth
            name="direccion"
            value={form_values.direccion}
            onChange={handle_input_change}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            size="small"
            style={{ marginBottom: "10px" }}
            label="Dirección de Notificación"
            fullWidth
            name="direccion_notificacion"
            value={form_values.direccion_notificacion}
            onChange={handle_input_change}
          />
        </Grid>
       
       
        
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth>
            <InputLabel>Principal</InputLabel>
            <Select
              label="Principal"
              name="es_principal"
              value={form_values.es_principal ? "si" : "no"}
              onChange={handle_select_change}
            >
              <MenuItem value="si">Sí</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth>
            <InputLabel>Activo</InputLabel>
            <Select
              label="Activo"
              name="activo"
              value={form_values.activo ? "si" : "no"}
              onChange={handle_select_change}
            >
              <MenuItem value="si">Sí</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            size="small"
            style={{ marginBottom: "10px" }}
            label="Email"
            fullWidth
            name="email_sucursal"
            value={form_values.email_sucursal}
            onChange={handle_input_change}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            size="small"
            style={{ marginBottom: "10px" }}
            label="Teléfono Sucursal"
            fullWidth
            name="telefono_sucursal"
            value={form_values.telefono_sucursal}
            onChange={handle_input_change}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth>
            <InputLabel>Item Ya Usado</InputLabel>
            <Select
              label="Item Ya Usado"
              name="item_ya_usado"
              value={form_values.item_ya_usado ? "si" : "no"}
              onChange={handle_select_change}
            >
              <MenuItem value="si">Sí</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            size="small"
            style={{ marginBottom: "10px" }}
            label="ID de Persona Empresa"
            fullWidth
            name="id_persona_empresa"
            value={form_values.id_persona_empresa}
            onChange={handle_input_change}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button onClick={handle_sucursal_create}>Crear</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
