// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../../../../api/axios";
import { control_error, control_success } from "./utils/control_error_or_success";
import { SucursalDirecciones } from "./SucursalDirecciones";
import { Title } from "../../../../components";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
// import { ISucursalForm } from "./utils/interfac";


interface Props {
  selected_id: number | null;
  siguiente_numeros_sucursal: any | null | boolean | string;
}

export interface ISucursalForm {
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
  telefono_sucursal: number | null | string;
  es_principal: boolean;
  activo: boolean;
  item_ya_usado: boolean;
  id_persona_empresa: number;
  numero_sucursal: number | null;

}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SucursalActuaizar: React.FC<Props> = ({ selected_id, siguiente_numeros_sucursal }: Props) => {
  const isediting = selected_id !== null && selected_id !== undefined;
  const initial_state: ISucursalForm = {
    descripcion_sucursal: "",
    direccion: "",
    direccion_sucursal_georeferenciada: "",
    municipio: null,
    pais_sucursal_exterior: null,
    direccion_notificacion: "",
    direccion_notificacion_referencia: "",
    municipio_notificacion: null,
    email_sucursal: "",
    confirmar_email: "",
    telefono_sucursal: "",
    es_principal: false,
    activo: true,
    item_ya_usado: false,
    id_persona_empresa: 3,
    numero_sucursal: siguiente_numeros_sucursal,
  };

  const [form_values, setform_values] = useState<ISucursalForm>(initial_state);
  const [form_submitted, setform_submitted] = useState(false);
  const [form_updated, setform_updated] = useState(false);

  useEffect(() => {
    if (isediting) {
      setform_updated(false); // Reset the form_updated state when the selected_id prop changes
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
      control_error(" Error ")

    }
  };

  const handleinput_change = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | null>,
    child?: React.ReactNode
  ): void => {
    const { name, value } = event.target as HTMLInputElement | HTMLTextAreaElement;
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
        control_success(isediting ? "Sucursal actualizada exitosamente" : "Sucursal creada exitosamente");
        setform_updated(true); // Set the form_updated state to true after successful update
        setform_values(initial_state);
      })
      .catch((error) => {
        console.error("Error al crear o actualizar la sucursal:", error);
        control_error(isediting ? "Error al actualizada  " : "Error al  guardar ")
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

      <Grid item xs={12} sx={{ marginTop: "-20px" }}     >
        <Title title="Sucursal" />
      </Grid>



      <Grid item xs={12} sm={1.5}>
        <TextField
          variant="outlined"
          size="small"
          label="N sucursal"
          fullWidth
          disabled

          InputLabelProps={{
            shrink: true,
          }}
          name="N sucursal"
          value={form_values.numero_sucursal}
          onChange={handleinput_change}
        />
      </Grid>
      <Grid item xs={12} sm={10}>
        <TextField
          variant="outlined"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          label="Descripción Sucursal"
          fullWidth
          name="descripcion_sucursal"
          value={form_values.descripcion_sucursal}
          onChange={handleinput_change}
        />
      </Grid>

      <SucursalDirecciones form_values={form_values} handleinput_change={handleinput_change} />

      <Grid item xs={12} sm={6}>
        <TextField
          variant="outlined"
          size="small"
          label=" email "
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
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
          InputLabelProps={{
            shrink: true,
          }}
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
          InputLabelProps={{
            shrink: true,
          }}
          name="telefono_sucursal"
          value={form_values.telefono_sucursal}
          onChange={handleinput_change}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <FormControl fullWidth size="small">
          <InputLabel id="demo-simple-select-label">es-principal-select-label</InputLabel>
          <Select
            labelId="es-principal-select-label"
            id="es-principal-select"
            required
            value={form_values.es_principal}
            label="es-principal-select-label"
            onChange={(e) => {
              setform_values((prevValues) => ({
                ...prevValues,
                es_principal: e.target.value === "true",
              }));
            }}
          >
            <MenuItem value="true">Sí</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}>
        <FormControl fullWidth size="small" >
          <InputLabel id="activo">activo</InputLabel>
          <Select
            labelId="activo"
            id="activo"
            required
            value={form_values.activo}
            label="activo"
            onChange={(e) => {
              setform_values((prevValues) => ({
                ...prevValues,
                activo: e.target.value === "true",
              }));
            }}
          >
            <MenuItem value="true">Sí</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={2}>
        <Button variant="contained" color="primary" onClick={handleform_submit}>
          {isediting && !form_updated ? "Actualizar" : "Guardar"}
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
