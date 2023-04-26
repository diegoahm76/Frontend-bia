
import { 
  // useEffect, 
  useState } from "react";
import { BuscadorPersona } from "../../../components/BuscadorPersona";
import type { InfoPersona } from "../../../interfaces/globalModels";
import { Button, CircularProgress, Grid, Input, InputLabel, MenuItem, Stack, TextField } from "@mui/material";
import { Title } from "../../../components/Title";
import { control_error } from "../../../helpers/controlError";
import { control_success } from "../../../helpers/controlSuccess";
import { editar_datos_restringidos_juridica, editar_datos_restringidos_persona } from "../request/Request";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CancelIcon from '@mui/icons-material/Cancel';
import { DialogHistorialDatosRestringidos } from "../components/DialogHistorialDatosRestringidos";
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ActualizacionDatosRestringidosScreen: React.FC = () => {
  const [historico, set_historico] = useState<boolean>(false);
  const [persona, set_persona] = useState<InfoPersona>();
  const [loading_natural, set_loading_natural] = useState(false)
  const [loading_juridica, set_loading_juridica] = useState(false)
  const [datos_historico, set_datos_historico] = useState<InfoPersona>({
    id: 0,
    id_persona: 0,
    tipo_persona: "",
    tipo_documento: "",
    numero_documento: "",
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    nombre_completo: "",
    razon_social: "",
    nombre_comercial: "",
    tiene_usuario: false,
    digito_verificacion: "",
    cod_naturaleza_empresa: "",
  });

  const handle_open_historico = (): void => {
    set_historico(true);
  }
  const {
    register,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    handleSubmit,
    formState: { errors },
    reset,
    // watch
  } = useForm();

  const on_result = (info_persona: InfoPersona): void => {
    reset();
    set_persona(info_persona);
  };
  const cancelar = (): void => {
    set_persona(undefined);
  };

  const on_submit_persona: SubmitHandler<FieldValues> = async (data) => {
    try {
      set_loading_natural(true)
      const datos_persona = new FormData

      datos_persona.append("tipo_documento", data.tipo_documento);
      datos_persona.append("numero_documento", data.numero_documento);
      datos_persona.append("primer_nombre", data.primer_nombre);
      datos_persona.append("segundo_nombre", data.segundo_nombre);
      datos_persona.append("primer_apellido", data.primer_apellido);
      datos_persona.append("segundo_apellido", data.segundo_apellido);
      datos_persona.append("ruta_archivo_soporte", data.ruta_archivo_soporte[0]);
      datos_persona.append("justificacion", data.justificacion);

      const id_persona: number | undefined = persona?.id_persona;
      await editar_datos_restringidos_persona(id_persona, datos_persona);
      set_loading_natural(false)
      control_success('Se actualizaron los datos correctamente')
    } catch (error) {
      set_loading_natural(false)
      control_error(error);
    }
  };
  const on_submit_persona_juridica: SubmitHandler<FieldValues> = async (data) => {
    try {
      
      set_loading_juridica(true);
      const datos_persona = new FormData();

      datos_persona.append("numero_documento", data.numero_documento);
      datos_persona.append("razon_social", data.razon_social);
      datos_persona.append("nombre_comercial", data.nombre_comercial);
      datos_persona.append("cod_naturaleza_empresa", data.cod_naturaleza_empresa);
      datos_persona.append("ruta_archivo_soporte", data.ruta_archivo_soporte[0]);
      datos_persona.append("justificacion", data.justificacion);
      
      const id_persona: number | undefined = persona?.id_persona;
      await editar_datos_restringidos_juridica(id_persona, datos_persona);
      set_loading_juridica(false);
      control_success('Se actualizaron los datos correctamente');
    } catch (error) {
      control_error(error);
      set_loading_juridica(false);
    }
  };

  const tipos_doc_comercial = [
    {
      value: 'NT',
      label: 'NIT',
    },
  ];
  const tipos_doc = [
    {
      value: 'CC',
      label: 'Cédula de ciudadanía'
    },
    {
      value: 'CE',
      label: 'Cédula extranjería',
    },
    {
      value: 'TI',
      label: 'Tarjeta de identidad',
    },
    {
      value: 'RC',
      label: 'Registro civil',
    },
    {
      value: 'NU',
      label: 'NUIP'
    },
    {
      value: 'PA',
      label: 'Pasaporte',
    },
    {
      value: 'PE',
      label: 'Permiso especial de permanencia',
    },
  ];
  const tipo_persona = [
    {
      value: 'N',
      label: 'Natural'
    },
    {
      value: 'J',
      label: 'Juridica',
    },
  ];
  const tipo_empresa = [
    {
      value: 'PU',
      label: 'Pública'
    },
    {
      value: 'PR',
      label: 'Privada',
    },
    {
      value: 'MI',
      label: 'Mixta',
    },
  ];
  // useEffect(() => {
  //   const data = watch('ruta_archivo_soporte')
  //   console.log(data[0])
  // }, [watch('ruta_archivo_soporte')])

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
        <Grid item xs={12} spacing={2}>
          <Title title="ACTUALIZACIÓN DE DATOS RESTRINGIDOS" />
          <BuscadorPersona onResult={on_result} />
          {(persona?.tipo_persona === "N") && (
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            <form onSubmit={handleSubmit(on_submit_persona)} noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Title title="DATOS DE IDENTIFICACIÓN" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Tipo de Persona"
                    select
                    fullWidth
                    size="small"
                    margin="dense"
                    required
                    autoFocus
                    defaultValue={persona?.tipo_persona}
                    disabled
                  >
                    {tipo_persona.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="tipo_doc_natural"
                    label="Tipo de Documento"
                    select
                    fullWidth
                    size="small"
                    margin="dense"
                    required
                    autoFocus
                    defaultValue={persona?.tipo_documento}
                    {...register("tipo_documento", { required: true })}
                    error={Boolean(errors.tipo_documento)}
                    helperText={(errors.tipo_documento != null) ? "Este campo es obligatorio" : ""}
                  >
                    {tipos_doc.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Número Identificación"
                    id="documento_natural"
                    type="number"
                    fullWidth
                    size="small"
                    margin="dense"
                    required
                    defaultValue={persona?.numero_documento}
                    {...register("numero_documento", {
                      required: "Este campo es obligatorio",
                    })}
                    error={Boolean(errors.numero_documento)}
                    helperText={(errors.numero_documento?.type === "required") ? "Este campo es obligatorio" : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Title title="DATOS PERSONALES" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Primer Nombre"
                    type="text"
                    fullWidth
                    size="small"
                    margin="dense"
                    required
                    autoFocus
                    defaultValue={persona?.primer_nombre}
                    {...register("primer_nombre", {
                      required: "Este campo es obligatorio",
                    })}
                    error={Boolean(errors.primer_nombre)}
                    helperText={(errors.primer_nombre?.type === "required") ? "Este campo es obligatorio" : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Segundo Nombre"
                    type="text"
                    fullWidth
                    size="small"
                    margin="dense"
                    autoFocus
                    defaultValue={persona?.segundo_nombre}
                    {...register("segundo_nombre")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Primer Apeliido"
                    type="text"
                    fullWidth
                    size="small"
                    margin="dense"
                    required
                    autoFocus
                    defaultValue={persona?.primer_apellido}
                    {...register("primer_apellido", {
                      required: "Este campo es obligatorio",
                    })}
                    error={Boolean(errors.primer_apellido)}
                    helperText={(errors.primer_apellido?.type === "required") ? "Este campo es obligatorio" : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Segundo Apeliido"
                    type="text"
                    fullWidth
                    size="small"
                    margin="dense"
                    autoFocus
                    defaultValue={persona?.segundo_apellido}
                    {...register("segundo_apellido")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel htmlFor="archivo-de-soporte">Cargar Archivo de soporte</InputLabel>
                  <Input
                    id="archivo-de-soporte"
                    type="file"
                    required
                    autoFocus
                    {...register("ruta_archivo_soporte", {
                      required: "Este campo es obligatorio",
                    })}
                    error={Boolean(errors.ruta_archivo_soporte)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Justificación"
                    fullWidth
                    size="small"
                    margin="dense"
                    multiline
                    required
                    autoFocus
                    {...register("justificacion", {
                      required: "Este campo es obligatorio",
                    })}
                    error={Boolean(errors.justificacion)}
                    helperText={(errors.justificacion?.type === "required") ? "Este campo es obligatorio" : ""}
                  />
                </Grid>
                <Grid item xs={12} >
                  <Stack justifyContent="flex-end" sx={{ m: '10px 0 20px 0' }} direction="row" spacing={2}>
                    <Button
                      variant="outlined"
                      startIcon={<CancelIcon />}
                      onClick={() => {
                        cancelar();
                      }}>Cancelar
                    </Button>
                    <Button
                      id="actualiza-natural"
                      variant="contained"
                      color="primary"
                      type="submit"
                      startIcon={
                        loading_natural
                          ? <CircularProgress size={20} key={1} className="align-middle ml-1" />
                          : ""
                      }
                      aria-label="Actualizar"
                      disabled={loading_natural}
                      size="large"
                    >
                      Actualizar</Button>
                    <Button
                      variant="outlined"
                      startIcon={<RemoveRedEyeIcon />}
                      onClick={() => {
                        set_datos_historico(persona)
                        handle_open_historico();
                      }}>Historico
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </form>
          )}
          {(persona?.tipo_persona === "J") && (
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            <form onSubmit={handleSubmit(on_submit_persona_juridica)} noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Title title="DATOS DE IDENTIFICACIÓN" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="tipo_doc_comercial"
                    label="Tipo de Persona"
                    select
                    fullWidth
                    size="small"
                    margin="dense"
                    required
                    autoFocus
                    defaultValue={persona?.tipo_persona}
                    disabled
                  >
                    {tipo_persona.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Tipo de Documento"
                    select
                    fullWidth
                    size="small"
                    margin="dense"
                    required
                    autoFocus
                    disabled
                    defaultValue={persona?.tipo_documento}
                  >
                    {tipos_doc_comercial.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Número Identificación"
                    id="documento_juridico"
                    type="number"
                    fullWidth
                    size="small"
                    margin="dense"
                    required
                    defaultValue={persona?.numero_documento}
                    {...register("numero_documento", {
                      required: "Este campo es obligatorio",
                    })}
                    error={Boolean(errors.numero_documento)}
                    helperText={(errors.numero_documento?.type === "required") ? "Este campo es obligatorio" : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Digito de verificación:"
                    type="number"
                    fullWidth
                    size="small"
                    margin="dense"
                    required
                    autoFocus
                    defaultValue={persona?.digito_verificacion}
                    {...register("digito_verificacion", {
                      required: "Este campo es obligatorio",
                    })}
                    error={Boolean(errors.digito_verificacion)}
                    helperText={(errors.digito_verificacion?.type === "required") ? "Este campo es obligatorio" : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Title title="DATOS EMPRESARIALES" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Razón social"
                    type="text"
                    fullWidth
                    size="small"
                    margin="dense"
                    required
                    autoFocus
                    defaultValue={persona?.razon_social}
                    {...register("razon_social", {
                      required: "Este campo es obligatorio",
                    })}
                    error={Boolean(errors.razon_social)}
                    helperText={(errors.razon_social?.type === "required") ? "Este campo es obligatorio" : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nombre comercial"
                    type="text"
                    fullWidth
                    size="small"
                    margin="dense"
                    required
                    autoFocus
                    defaultValue={persona?.nombre_comercial}
                    {...register("nombre_comercial", {
                      required: "Este campo es obligatorio",
                    })}
                    error={Boolean(errors.nombre_comercial)}
                    helperText={(errors.nombre_comercial?.type === "required") ? "Este campo es obligatorio" : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Naturaleza de la empresa"
                    select
                    fullWidth
                    size="small"
                    margin="dense"
                    required
                    autoFocus
                    defaultValue={persona?.cod_naturaleza_empresa}
                    {...register("cod_naturaleza_empresa", {
                      required: "Este campo es obligatorio",
                    })}
                    error={Boolean(errors.cod_naturaleza_empresa)}
                    helperText={(errors.cod_naturaleza_empresa?.type === "required") ? "Este campo es obligatorio" : ""}
                  >
                    {tipo_empresa.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel htmlFor="archivo-de-soporte">Cargar Archivo de soporte</InputLabel>
                  <Input
                    id="archivo-de-soporte"
                    type="file"
                    required
                    autoFocus
                    {...register("ruta_archivo_soporte", {
                      required: "Este campo es obligatorio",
                    })}
                    error={Boolean(errors.ruta_archivo_soporte)}
                  />|
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Justificación"
                    fullWidth
                    size="small"
                    margin="dense"
                    multiline
                    required
                    autoFocus
                    {...register("justificacion", {
                      required: "Este campo es obligatorio",
                    })}
                    error={Boolean(errors.justificacion)}
                    helperText={(errors.justificacion?.type === "required") ? "Este campo es obligatorio" : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Stack justifyContent="flex-end" sx={{ m: '10px 0 20px 0' }} direction="row" spacing={2}>
                    <Button
                      variant="outlined"
                      startIcon={<CancelIcon />}
                      onClick={() => {
                        cancelar();
                      }}>Cancelar
                    </Button>
                    <Button
                      id="actualiza-juridica"
                      type="submit"
                      variant="contained"
                      color="primary"
                      startIcon={
                        loading_juridica
                          ? <CircularProgress size={20} key={1} className="align-middle ml-1" />
                          : ""
                      }
                      aria-label="Actualizar"
                      disabled={loading_juridica}
                      size="large"
                    >Actualizar</Button>
                    <Button
                      variant="outlined"
                      startIcon={<RemoveRedEyeIcon />}
                      onClick={() => {
                        set_datos_historico(persona)
                        handle_open_historico();
                      }}>Historico
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </form>
          )}
        </Grid>
        <DialogHistorialDatosRestringidos
          is_modal_active={historico}
          set_is_modal_active={set_historico}
          datos_historico={datos_historico}
          set_datos_historico={set_datos_historico}
        />
      </Grid >
    </>
  );
};