import { useState, useEffect } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { api } from "../../../../api/axios";

interface ISucursalForm {
  descripcion_sucursal: string;
  direccion: string;
  direccion_sucursal_georeferenciada: string | null;
  municipio: string | null;
  pais_sucursal_exterior: string | null;
  direccion_notificacion: string;
  direccion_notificacion_referencia: string | null;
  municipio_notificacion: string | null;
  email_sucursal: string;
  confirmar_email: string;
  telefono_sucursal: number | null;
  es_principal: boolean;
  activo: boolean;
  item_ya_usado: boolean;
  id_persona_empresa: number;
}

interface Props {
  selected_id: number | null;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SucursalActuaizar: React.FC<Props> = ({ selected_id }: Props) => {
  const isediting = selected_id !== null && selected_id !== undefined;
  const initial_state: ISucursalForm = {
    descripcion_sucursal: "",
    direccion: "",
    direccion_sucursal_georeferenciada: null,
    municipio: null,
    pais_sucursal_exterior: null,
    direccion_notificacion: "",
    direccion_notificacion_referencia: null,
    municipio_notificacion: null,
    email_sucursal: "",
    confirmar_email: "",
    telefono_sucursal: null,
    es_principal: false,
    activo: true,
    item_ya_usado: false,
    id_persona_empresa: 3,
  };

  const [form_values, setform_values] = useState<ISucursalForm>(initial_state);
  const [form_submitted, setform_submitted] = useState(false);

  useEffect(() => {
    if (isediting) {
      void fetch_data();
    }
  }, [selected_id]);

  const fetch_data = async (): Promise<void> => {
    try {
      const url = `/transversal/sucursales/sucursal-empresa-id/${String(selected_id)}`;
      const res = await api.get(url);
      setform_values(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleinput_change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setform_values((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleform_submit = (): void => {
    // Set form_submitted to true when the button is clicked
    setform_submitted(true);

    // Check if the email fields are equal
    if (form_values.email_sucursal !== form_values.confirmar_email) {
      // Display error message or handle the error as per your requirement
      return;
    }

    const endpoint = isediting
      ? `/transversal/sucursales/sucursales-empresas-actualizar/${String(selected_id)}/`
      : "/transversal/sucursales/sucursal-empresa-crear/";

    api
      .request({
        method: isediting ? "put" : "post",
        url: endpoint,
        data: form_values,
      })
      .then((response) => {
        console.log(isediting ? "Sucursal actualizada exitosamente" : "Sucursal creada exitosamente");
        setform_values(initial_state);
      })
      .catch((error) => {
        console.error("Error al crear o actualizar la sucursal:", error);
      });
  };

  const handle_clear_fields = (): void => {
    // Set all form field values to their initial_state (empty values)
    setform_values(initial_state);
  };

  return (
    <Grid container
      spacing={2}
    >
      <Grid item xs={12} sm={6}>
        <TextField
          variant="outlined"
          size="small"
          label="Descripción Sucursal"
          fullWidth
          name="descripcion_sucursal"
          value={form_values.descripcion_sucursal}
          onChange={handleinput_change}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          variant="outlined"
          size="small"
          label="direccion  "
          fullWidth
          name="direccion"
          value={form_values.direccion}
          onChange={handleinput_change}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          variant="outlined"
          size="small"
          label="direccion_notificacion  "
          fullWidth
          name="direccion_notificacion"
          value={form_values.direccion_notificacion}
          onChange={handleinput_change}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          variant="outlined"
          size="small"
          label=" email "
          fullWidth
          name="email_sucursal"
          value={form_values.email_sucursal}
          onChange={handleinput_change}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          variant="outlined"
          size="small"
          label="confirmar email"
          fullWidth
          name="confirmar_email"
          value={form_values.confirmar_email}
          onChange={handleinput_change}
          error={
            form_submitted && form_values.email_sucursal !== form_values.confirmar_email
          }
          helperText={
            form_submitted && form_values.email_sucursal !== form_values.confirmar_email
              ? "Emails diferentes"
              : ""
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          variant="outlined"
          size="small"
          label="telefono_sucursal"
          fullWidth
          name="telefono_sucursal"
          value={form_values.telefono_sucursal}
          onChange={handleinput_change}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          variant="outlined"
          size="small"
          label="direccion_sucursal_georeferenciada"
          fullWidth
          name="direccion_sucursal_georeferenciada"
          value={form_values.direccion_sucursal_georeferenciada}
          onChange={handleinput_change}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          variant="outlined"
          size="small"
          label="municipio"
          fullWidth
          name="municipio"
          value={form_values.municipio}
          onChange={handleinput_change}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          variant="outlined"
          size="small"
          label="pais_sucursal_exterior"
          fullWidth
          name="pais_sucursal_exterior"
          value={form_values.pais_sucursal_exterior}
          onChange={handleinput_change}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          variant="outlined"
          size="small"
          label="direccion_notificacion_referencia"
          fullWidth
          name="direccion_notificacion_referencia"
          value={form_values.direccion_notificacion_referencia}
          onChange={handleinput_change}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          variant="outlined"
          size="small"
          label="municipio_notificacion"
          fullWidth
          name="municipio_notificacion"
          value={form_values.municipio_notificacion}
          onChange={handleinput_change}
        />
      </Grid>






      
      <Grid item xs={12} sm={2}>
        <Button variant="contained" color="primary" onClick={handleform_submit}>
          {isediting ? "Actualizar" : "Guardar"}
        </Button>
      </Grid>
      <Grid item xs={12} sm={2}>
        <Button variant="contained" color="secondary" onClick={handle_clear_fields}>
          Borrar
        </Button>
      </Grid>
    </Grid>
  );
};
