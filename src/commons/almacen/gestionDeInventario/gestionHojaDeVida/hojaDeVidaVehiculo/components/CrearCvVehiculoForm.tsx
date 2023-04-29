import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, MenuItem, Stack, TextField, } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, type Dispatch, type SetStateAction, useState } from "react";
import { Title } from "../../../../../../components/Title";
import { type IcvVehicles as FormValues, type IList } from '../interfaces/CvVehiculo';
// import SaveIcon from '@mui/icons-material/Save';
// import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from "@mui/icons-material/Close";
// import {  useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/hooks";
// import { create_cv_computers_service, get_marca_service } from "../store/thunks/cvComputoThunks";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../../../../../api/axios";
import { text_choise_adapter } from "../../../../../auth/adapters/textChoices.adapter";
import { get_marca_service } from "../store/thunks/cvVehiclesThunks";


interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  action: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const CrearCvVehiculoForm = ({
  action,
  is_modal_active,
  set_is_modal_active,
}:
  IProps) => {

  const initial_options: IList[] = [{
    label: "",
    value: "",
  }]


  const dispatch = useAppDispatch();
  const [tipo_combustible, set_tipo_combustible] = useState(initial_options);
  const [tipo_vehiculo, set_tipo_vehiculo] = useState(initial_options);
  const { marcas } = useAppSelector((state) => state.cve);
  const { current_vehicle, current_cv_vehicle } = useAppSelector((state) => state.cve);

  const handle_close_cv_veh_is_active = (): void => {
    set_is_modal_active(false);
  };

  // const [file, set_file] = useState<any>(null);

  const { control: control_vehiculo, handleSubmit: handle_submit, reset: reset_vehicle } =
    useForm<FormValues>();
  useEffect(() => {
    reset_vehicle(current_cv_vehicle);
  }, [current_vehicle]);

  const on_submit = (data: FormValues): void => {
    const formdata = new FormData();
    formdata.append("cod_tipo_vehiculo", data.cod_tipo_vehiculo);
    formdata.append("tiene_platon", data.tiene_platon.toString());
    formdata.append("capacidad_pasajeros", data.capacidad_pasajeros.toString());
    formdata.append("color", data.color);
    formdata.append("es_arrendado", data.es_arrendado.toString());
    formdata.append("linea", data.linea);
    formdata.append("tipo_combustible", data.tipo_combustible.toString());
    formdata.append("es_arrendado", data.es_arrendado.toString());
    formdata.append("ultimo_kilometraje", data.ultimo_kilometraje.toString());
    formdata.append("fecha_adquisicion", data.fecha_adquisicion.toString());
    formdata.append("numero_motor", data.numero_motor);
    formdata.append("numero_chasis", data.numero_chasis);
    formdata.append("ultimo_kilometraje", data.ultimo_kilometraje.toString());
    formdata.append("cilindraje", data.cilindraje.toString());
    formdata.append("transmision", data.transmision);
    formdata.append("dimension_llantas", data.dimension_llantas.toString());
    formdata.append("capacidad_extintor", data.capacidad_extintor.toString());
    formdata.append("tarjeta_operacion", data.tarjeta_operacion);
    formdata.append("observaciones_adicionales", data.observaciones_adicionales);
    formdata.append("es_agendable", data.es_agendable.toString());
    formdata.append("fecha_circulacion", data.fecha_circulacion.toString());
    formdata.append("id_articulo", data.id_articulo.toString());
    formdata.append("doc_identificador_nro", data.doc_identificador_nro.toString())
    formdata.append("codigo_bien", data.codigo_bien);
    // formdata.append("modelo", data.modelo);
    formdata.append("tipo_vehiculo", data.tipo_vehiculo);
    formdata.append("id_marca", data.id_marca.toString());
    // formdata.append("id_articulo", current_computer.id_bien.toString());
    // formdata.append('ruta_imagen_foto', file === null ? '' : file);

    // dispatch(create_cv_computers_service(formdata));
  };
  useEffect(() => {
    const get_selects_options: any = async () => {
      try {
        const { data: tipo_combustible_no_format } = await api.get('almacen/choices/tipo-combustible');
        const tipo_combustible_format = text_choise_adapter(tipo_combustible_no_format);
        set_tipo_combustible(tipo_combustible_format)

        const { data: tipo_vehiculo_no_format } = await api.get('almacen/choices/tipo-vehiculo/');
        const tipo_vehiculo_format = text_choise_adapter(tipo_vehiculo_no_format);
        set_tipo_vehiculo(tipo_vehiculo_format)
      } catch (err) {
        console.log(err)
      }

    };
    void get_selects_options();
    void dispatch(get_marca_service());

  }, [])

  // const on_change_file: any = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   set_file(e.target.files!=null?e.target.files[0]:"")
  // };

  return (
    <Dialog
      maxWidth="md"
      open={is_modal_active}
      onClose={handle_close_cv_veh_is_active}
    >
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={action === "create" ? handle_submit(on_submit) : handle_submit(on_submit)}
      >
        <DialogTitle>
          {action === "create"
            ? "Crear hoja de vida"
            : action === "detail"
              ? "Detalle  Hoja de vida"
              : "Editar hoja de vida"}
        </DialogTitle>

        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3} >
              <Controller
                name="doc_identificador_nro"
                control={control_vehiculo}
                defaultValue=""
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    size="small"
                    label="Placa vehículo"
                    variant="outlined"
                    disabled={action !== "create"}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}>

                  </TextField>

                )}
              />
            </Grid>

            <Grid item xs={5} md={5}>
              <Controller
                name="codigo_bien"
                control={control_vehiculo}
                defaultValue="{0}"
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    size="small"
                    label="Código"
                    variant="outlined"
                    disabled={action !== "create"}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}>

                  </TextField>

                )}
              />
            </Grid>
            <Grid item xs={12} sm={3} >
              <Controller
                name="tipo_vehiculo"
                control={control_vehiculo}
                defaultValue=""
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="dense"
                    select
                    fullWidth
                    size="small"
                    label="Tipo vehículo"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio ingresar un nombre'
                        : 'Ingrese nombre'
                    }
                  >
                    {tipo_vehiculo.map((option: IList) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3} >
              <Controller
                name="es_arrendado"
                control={control_vehiculo}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="dense"
                    select
                    fullWidth
                    size="small"
                    label="Es arrendado"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio ingresar un nombre'
                        : 'Ingrese nombre'
                    }
                  >
                    <MenuItem value="true">SI</MenuItem>
                    <MenuItem value="false">NO</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3} >
              <Controller
                name="es_arrendado"
                control={control_vehiculo}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="dense"
                    select
                    fullWidth
                    size="small"
                    label="Es arrendado"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio ingresar un nombre'
                        : 'Ingrese nombre'
                    }
                  >
                    <MenuItem value="true">SI</MenuItem>
                    <MenuItem value="false">NO</MenuItem>
                  </TextField>
                )}
              />
            </Grid>





            <Title title="ESPECIFICACIONES" />
            <Grid item xs={12} sm={3} >
              <Controller
                name="id_marca"
                control={control_vehiculo}
                defaultValue={0}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    select
                    size="small"
                    label="Marca"
                    variant="outlined"
                    disabled={action !== "create"}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio ingresar un nombre'
                        : 'Ingrese nombre'
                    }
                  >
                    {marcas.map((option) => (
                      <MenuItem key={option.id_marca} value={option.id_marca}>
                        {option.nombre}
                      </MenuItem>
                    ))}
                  </TextField>

                )}
              />
            </Grid>
            <Grid item xs={12} sm={3} >
              <Controller
                name="tipo_combustible"
                control={control_vehiculo}
                defaultValue=""
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    select
                    size="small"
                    label="Tipo de combustible"
                    variant="outlined"
                    disabled={action !== "create"}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio ingresar un nombre'
                        : 'Ingrese nombre'
                    }
                  >
                    {tipo_combustible.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                )}
              />
            </Grid>


            <Grid item xs={12} sm={3} >
              <Controller
                name="color"
                control={control_vehiculo}
                defaultValue=""
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    size="small"
                    label="Color"
                    variant="outlined"
                    disabled={action !== "create"}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio ingresar un nombre'
                        : 'Ingrese nombre'
                    }
                  />
                )}
              />
            </Grid>


            <Title title="INFORMACIÓN ADICIONAL" />
            <Grid item xs={12} sm={3} >
              <Controller
                name="numero_motor"
                control={control_vehiculo}
                defaultValue=""
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    size="small"
                    label="Número del motor"
                    variant="outlined"
                    disabled={action !== "create"}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio ingresar un nombre'
                        : 'Ingrese nombre'
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3} >
              <Controller
                name="ultimo_kilometraje"
                control={control_vehiculo}
                defaultValue={0}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    size="small"
                    label="Ultimo kilometraje"
                    variant="outlined"
                    disabled={action !== "create"}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio este campo'
                        : 'Ingrese ultimo kilometraje'
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3} >
              <Controller
                name="cilindraje"
                control={control_vehiculo}
                defaultValue={0}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    size="small"
                    label="Cilindraje"
                    variant="outlined"
                    disabled={action !== "create"}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio ingresar un nombre'
                        : 'Ingrese nombre'
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3} >
              <Controller
                name="dimension_llantas"
                control={control_vehiculo}
                defaultValue={0}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    size="small"
                    label=" Dimensiones de las llantas"
                    variant="outlined"
                    disabled={action !== "create"}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}

                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Controller
                name="capacidad_extintor"
                control={control_vehiculo}
                defaultValue={0}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    size="small"
                    label="Capacidad del extintor"
                    variant="outlined"
                    disabled={action !== "create"}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}

                  />
                )}
              />
            </Grid>

            <Title title="CONTROL DE DOCUMENTACIÓN" />
            <Grid item xs={11} md={5} spacing={2}>
              <Controller
                name="tarjeta_operacion"
                control={control_vehiculo}
                defaultValue=""
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    size="small"
                    label="Tarjeta de operación"
                    variant="outlined"
                    disabled={action !== "create"}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio ingresar un nombre'
                        : 'Ingrese nombre'
                    }
                  />
                )}
              />

            </Grid>

            <Grid item xs={11} md={10} spacing={2}>
              <Controller
                name="observaciones_adicionales"
                control={control_vehiculo}
                defaultValue=""
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    size="small"
                    label="Observaciones adicionales"
                    variant="outlined"
                    disabled={action !== "create"}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio ingresar un nombre'
                        : 'Ingrese nombre'
                    }
                  />
                )}
              />

            </Grid>



          </Grid>

          <DialogActions>
            <Stack
              direction="row"
              spacing={2}
              sx={{ mr: '15px', mb: '10px', mt: '10px' }}
            >
              <Button
                variant="outlined"
                onClick={handle_close_cv_veh_is_active}
                startIcon={<CloseIcon />}
              >
                CERRAR
              </Button>
              {action === "create" ?
                <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
                  GUARDAR
                </Button> :
                action === "edit" ?
                  <Button type="submit" variant="contained" startIcon={<EditIcon />}>
                    EDITAR
                  </Button> :
                  null
              }
            </Stack>
          </DialogActions>


        </DialogContent>
      </Box>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default CrearCvVehiculoForm;
