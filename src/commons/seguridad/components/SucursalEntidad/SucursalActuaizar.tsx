/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../../../../api/axios";
import { control_error, control_success } from "./utils/control_error_or_success";
import { SucursalDirecciones } from "./SucursalDirecciones";
import { Title } from "../../../../components";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ISucursalForm, Props } from "./utils/interfac";
import { ButtonSalir } from "../../../../components/Salir/ButtonSalir";
import SaveIcon from '@mui/icons-material/Save';
 import CleanIcon from '@mui/icons-material/CleaningServices';
import { LoadingButton } from '@mui/lab';
import CircularProgress from '@mui/material/CircularProgress';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const SucursalActuaizar: React.FC<Props> = ({setnew_number,fetch_dataget, fetchand_update_data, sucursal, data_entidad, selected_id, setselected_id, new_number, esPrincipalExists }: Props) => {
  const isediting = selected_id !== null && selected_id !== undefined;
  
  const [same_address, setsame_address] = useState(false);
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
    numero_sucursal: null,
    direccion_sucursal_georeferenciada_lon:"",
    direccion_sucursal_georeferenciada_lat:"",
  };
  const [exiting, 
    // set_exiting
  ] = useState(false);
  const [form_values, setform_values] = useState<ISucursalForm>(initial_state);
  const [form_submitted, setform_submitted] = useState(false);
  const [loading, set_loading] = useState(false);
  
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
      void fetch_dataget();
      fetch_dataget();
      
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
    set_loading(true);
    
    
    // Check if the email fields are equal
    if (form_values.email_sucursal !== form_values.confirmar_email) {
      // Display error message or handle the error as per your requirement
      set_loading(false);
      control_error("email diferentes  ")
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
      
      .then(async (response) => {
        //  console.log('')(isediting ? "Sucursal actualizada exitosamente" : "Sucursal creada exitosamente");
        control_success(isediting ? "Sucursal actualizada exitosamente" : "Sucursal creada exitosamente");
        setform_values(initial_state);
        setselected_id(null);
        set_loading(false);
        setsame_address(false);
        void fetch_dataget();
        fetch_dataget();
        
        
        await fetchand_update_data();
        await fetch_dataget();
        
      })

      .catch((error) => {
        control_error(error.response.data.detail);
        // console.error("Error al crear o actualizar la sucursal:", error);
        // control_error(isediting ? "Error al actualizada  " : "Error al  guardar ")
        set_loading(false);
        setsame_address(false);
        void fetch_dataget();
        fetch_dataget();
        // setform_values(initial_state);
      }); 
      
  }; 
  const handle_clear_fields = (): void => {
    // Set all form field values to their i2nitial_state (empty values)
    setform_values(initial_state);
     setselected_id(null);
    setsame_address(false);
    void fetch_dataget();
    fetch_dataget();
    
  }; 
  useEffect(() => {
    if (exiting) { 
      window.history.back();
    }
  }, [exiting]);
  return (
    <Grid container
      spacing={2}
      marginTop={2}
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
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          value={form_values.numero_sucursal ? form_values.numero_sucursal : new_number}
          onChange={handleinput_change}
        />
      </Grid>
      <Grid item xs={12} sm={10.5}>
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
          disabled={selected_id !== null && data_entidad.find((sucursal: { id_sucursal_empresa: number; }) => sucursal.id_sucursal_empresa === selected_id)?.item_ya_usado}
        />
      </Grid>



      <Grid item xs={12} sm={6}>
        <TextField
          variant="outlined"
          size="small"
          label="Email "
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
          label="Confirmar email"
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
          label="teléfono sucursal"
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
          <InputLabel id="demo-simple-select-label">Es principal </InputLabel>
          <Select
            labelId="es-principal-select-label"
            id="es-principal-select"
            required
            value={form_values.es_principal}
            label="es principal "
            onChange={(e) => {
              setform_values((prevValues) => ({
                ...prevValues,
                es_principal: e.target.value === "true",
              }));
            }}
          >
            <MenuItem value="true" disabled={esPrincipalExists}>Sí</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}>
        <FormControl fullWidth size="small" >
          <InputLabel id="activo">Activo</InputLabel>
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
      <SucursalDirecciones same_address={same_address} setsame_address={setsame_address} form_values={form_values} handleinput_change={handleinput_change} /> 
      <Grid  container marginTop={2} spacing={2} direction="row" justifyContent="flex-end" >
        <Grid item xs={12} sm={1.4}>
          {/* <Button startIcon={<SaveIcon />} variant="contained" fullWidth color="primary" onClick={handleform_submit}>
            {isediting ? "Actualizar" : "Guardar"}
          </Button> */}
          <LoadingButton
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
            variant="contained"
            fullWidth
            color='success'
            onClick={handleform_submit}
            loading={loading} // Set the loading prop
          >
            {isediting ? "Actualizar" : "Guardar"}
          </LoadingButton> 
        </Grid>
        <Grid item xs={12} sm={1.2}>
          <Button startIcon={<CleanIcon />} fullWidth variant="outlined"   onClick={handle_clear_fields}>
            limpiar
          </Button>
        </Grid>
        <Grid item xs={12} sm={1}>
          <ButtonSalir/> 
        </Grid>
      </Grid> 
    </Grid>
  );
};