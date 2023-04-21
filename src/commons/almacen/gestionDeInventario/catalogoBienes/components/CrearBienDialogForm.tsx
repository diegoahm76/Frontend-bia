import { useState, useEffect } from "react";
import { type Dispatch, type SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Button,
  Box,
  Divider,
  MenuItem, Grid
} from '@mui/material';
import { Title } from '../../../../../components/Title';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { add_bien_service, get_code_bien_service, get_marca_service, get_medida_service, get_porcentaje_service } from '../store/thunks/catalogoBienesThunks';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { type IList, type IObjBien as FormValues } from "../interfaces/catalogodebienes";
import { api } from "../../../../../api/axios";
interface IProps {
  action: string,
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}




// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const CrearBienDialogForm = ({
  action,
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
  const initial_options: IList[] = [{
    label: "",
    value: "",
  }]
  const dispatch = useAppDispatch();

  const [activo_types, set_activo_types] = useState<IList[]>(initial_options);
  const [tipo_bien, set_tipo_bien] = useState<IList[]>(initial_options);
  const [metodo_valoracion, set_metodo_valoracion] = useState<IList[]>(initial_options);
  const [depreciacion_types, set_depreciacion_types] = useState<IList[]>(initial_options);
  const { marca, unidad_medida, porcentaje_iva, current_nodo, code_bien } = useAppSelector((state) => state.bien);

  const [tipo_bien_selected, set_tipo_bien_selected] = useState<string | null | undefined>("A");
  const { control: control_bien, handleSubmit: handle_submit, reset: reset_bien } =
    useForm<FormValues>();
  const handle_close_add_bien = (): void => {
    set_is_modal_active(false);
  };


  //   const [nursery_types, set_nursery_types] = useState(initial_options);
  //   const [source_resources, set_source_resources] = useState(initial_options);
  //   const [file, set_file] = useState<any>("");


  //   // eslint-disable-next-line @typescript-eslint/naming-convention
  //   const { control: control_vivero, handleSubmit: handle_submit } =
  //     useForm<FormValues>();

  //   const handle_close_add_nursery = (): void => {
  //     set_is_modal_active(false);
  //   };

  //   const on_submit = (data: FormValues): void => {
  //     data.ruta_archivo_creacion = file
  //     console.log(data)
  //     void dispatch(add_nursery_service(data, navigate));
  //     handle_close_add_nursery();
  //   };

  const text_choise_adapter: any = (dataArray: string[]) => {
    const data_new_format: IList[] = dataArray.map((dataOld) => ({
      label: dataOld[1],
      value: dataOld[0],
    }));
    return data_new_format;
  };
  const on_change_tipo_bien: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_tipo_bien_selected(e.target.value)
  };

  const on_submit = (data: FormValues): void => {
    if (action === "create_sub") {
      data.id_bien = null;
      data.nivel_jerarquico = current_nodo.data.bien?.nivel_jerarquico != null ? Number(current_nodo.data.bien.nivel_jerarquico) + 1 : 1;
      data.id_bien_padre = current_nodo.data.bien?.id_bien != null ? current_nodo.data.bien.id_bien : null
      data.nombre_padre = current_nodo.data.bien?.nombre != null ? current_nodo.data.bien.nombre : null
      data.solicitable_vivero = true
    } else if (action === "create") {
      data.nivel_jerarquico = 1
    }
    data.cod_tipo_bien = tipo_bien_selected

    console.log(data)
    void dispatch(add_bien_service(data));
    handle_close_add_bien();
  };
  useEffect(() => {
    const get_selects_options: any = async () => {
      try {
        const { data: tipo_bien_no_format } = await api.get("almacen/choices/tipo-bien/");
        const tipo_bien_format: IList[] = text_choise_adapter(tipo_bien_no_format);
        set_tipo_bien(tipo_bien_format);
        const { data: activo_types_no_format } = await api.get("almacen/choices/tipo-activo/");
        const activo_types_format: IList[] = text_choise_adapter(activo_types_no_format);
        set_activo_types(activo_types_format);
        const { data: metodo_valoracion_no_format } = await api.get("almacen/choices/metodo-valoracion-articulo/");
        const metodo_valoracion_format: IList[] = text_choise_adapter(metodo_valoracion_no_format);
        set_metodo_valoracion(metodo_valoracion_format);
        const { data: depreciacion_types_no_format } = await api.get("almacen/choices/metodo-valoracion-articulo/");
        const depreciacion_types_format: IList[] = text_choise_adapter(depreciacion_types_no_format);
        set_depreciacion_types(depreciacion_types_format);

      } catch (err) {
        console.log(err);
      }
    };
    void get_selects_options();
    void dispatch(get_marca_service());
    void dispatch(get_porcentaje_service());
    void dispatch(get_medida_service());
  }, []);
  useEffect(() => {

    if (action === "create_sub") {
      void dispatch(get_code_bien_service(current_nodo.data.bien?.codigo_bien))

      set_tipo_bien_selected(current_nodo.data.bien?.cod_tipo_bien)

      reset_bien(current_nodo.data.bien);

    } else if (action === "create") {
      console.log("create")
      void dispatch(get_code_bien_service(null))
      set_tipo_bien_selected("A")
      console.log(current_nodo.data.bien)
    }
  }, [current_nodo]);

  useEffect(() => {
    reset_bien({ ...current_nodo.data.bien, codigo_bien: code_bien });

  }, [code_bien]);


  return (
    <Dialog
      maxWidth="xl"
      open={is_modal_active}
      onClose={handle_close_add_bien}
      fullWidth
    >
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handle_submit(on_submit)}
      >
        <DialogTitle>Crear bien</DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Grid container >
            <Title title="Seleccione tipo de bien"></Title>
            <Grid item xs={12} md={12} margin={1}>
              <TextField
                margin="dense"
                select
                size="small"
                label="Tipo de bien"
                variant="outlined"
                value={tipo_bien_selected}
                onChange={on_change_tipo_bien}

              >
                {tipo_bien.map((option: IList) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

            </Grid>
            <Title title="INFORMACION DEL BIEN"></Title>

            <Grid item xs={11} md={2} margin={1}>
              <Controller
                name="codigo_bien"
                control={control_bien}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    size="small"
                    label="Codigo"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    disabled
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio ingresar un codigo'
                        : 'Ingrese codigo'
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={11} md={3} margin={1}>
              <Controller
                name="nombre"
                control={control_bien}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    size="small"
                    label="Nombre"
                    variant="outlined"
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
            {(tipo_bien_selected) === "A" ?
              <Grid item xs={11} md={3} margin={1}>
                <Controller
                  name="cod_tipo_activo"
                  control={control_bien}
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
                      label="Tipo activo"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio seleccionar tipo de activo'
                          : 'seleccione tipo activo'
                      }
                    >
                      {activo_types.map((option: IList) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              :
              <Grid item xs={11} md={3} margin={1}>
                <Controller
                  name="cod_metodo_valoracion"
                  control={control_bien}
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
                      label="Metodo valoración"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio seleccionar metodo valoración'
                          : 'seleccione metodo valoración'
                      }
                    >
                      {metodo_valoracion.map((option: IList) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
            }
            <Grid item xs={11} md={3} margin={1}>

              <TextField
                margin="dense"
                fullWidth
                size="small"
                label="Carpeta padre"
                variant="outlined"
                value={action === "create_sub" ? current_nodo.data.bien?.nombre : ""}
                disabled


              />

            </Grid>
            <Grid item xs={11} md={2} margin={1}>
              <Controller
                name="id_unidad_medida"
                control={control_bien}
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
                    label="Unidad de medida"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio seleccionar unidad de medida'
                        : 'seleccione unidad de media'
                    }
                  >
                    {unidad_medida.map((option) => (
                      <MenuItem key={option.id_unidad_medida} value={option.id_unidad_medida}>
                        {option.nombre}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={11} md={2} margin={1}>
              <Controller
                name="id_porcentaje_iva"
                control={control_bien}
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
                    label="Porcentaje IVA"
                    variant="outlined"
                    defaultValue={value}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio seleccionar porcentaje de iva'
                        : 'seleccione porcentaje de iva'
                    }
                  >
                    {porcentaje_iva.map((option) => (
                      <MenuItem key={option.id_porcentaje_iva} value={option.id_porcentaje_iva}>
                        {option.porcentaje}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>


            {(tipo_bien_selected) === "A" ?
              <>

                <Grid item xs={11} md={2} margin={1}>
                  <Controller
                    name="cod_tipo_depreciacion"
                    control={control_bien}
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
                        label="Tipo depreciación"
                        variant="outlined"
                        defaultValue={value}
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}
                        helperText={
                          error != null
                            ? 'Es obligatorio seleccionar tipo de depreciación'
                            : 'seleccione tipo depreciación'
                        }
                      >
                        {depreciacion_types.map((option: IList) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid item xs={11} md={2} margin={1}>
                  <Controller
                    name="id_unidad_medida_vida_util"
                    control={control_bien}
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
                        label="Unidad de medida vida util"
                        variant="outlined"
                        defaultValue={value}
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}
                        helperText={
                          error != null
                            ? 'Es obligatorio seleccionar unidad de medida vida util'
                            : 'seleccione unidad de media vida util'
                        }
                      >
                        {unidad_medida.map((option) => (
                          <MenuItem key={option.id_unidad_medida} value={option.id_unidad_medida}>
                            {option.nombre}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid item xs={11} md={2} margin={1}>
                  <Controller
                    name="cantidad_vida_util"
                    control={control_bien}
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
                        type="number"
                        label="Cantidad vida util"
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}
                        helperText={
                          error != null
                            ? 'Es obligatorio ingresar cantidad vida util'
                            : 'Ingrese cantidad vida util'
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={11} md={2} margin={1}>
                  <Controller
                    name="valor_residual"
                    control={control_bien}
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
                        type="number"
                        label="Valor residual"
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}
                        helperText={
                          error != null
                            ? 'Es obligatorio ingresar valor residual'
                            : 'Ingrese cantidad valor residual'
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={11} md={2} margin={1}>
                  <Controller
                    name="id_marca"
                    control={control_bien}
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
                        defaultValue={value}
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}
                        helperText={
                          error != null
                            ? 'Es obligatorio seleccionar marca'
                            : 'seleccione marca'
                        }
                      >
                        {marca.map((option) => (
                          <MenuItem key={option.id_marca} value={option.id_marca}>
                            {option.nombre}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
              </>
              :
              <>
                <Grid item xs={11} md={2} margin={1}>
                  <Controller
                    name="stock_minimo"
                    control={control_bien}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        margin="dense"
                        fullWidth
                        size="small"
                        type="number"
                        label="Stock minimo"
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}
                        helperText={
                          error != null
                            ? 'Es obligatorio ingresar stock minimo'
                            : 'Ingrese stock minimo'
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={11} md={2} margin={1}>
                  <Controller
                    name="stock_maximo"
                    control={control_bien}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        margin="dense"
                        fullWidth
                        size="small"
                        type="number"
                        label="Stock maximo"
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}
                        helperText={
                          error != null
                            ? 'Es obligatorio ingresar stock maximo'
                            : 'Ingrese stock maximo'
                        }
                      />
                    )}
                  />
                </Grid>
              </>
            }


            <Grid item xs={11} md={2} margin={1}>
              <Controller
                name="visible_solicitudes"
                control={control_bien}
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
                    label="¿Visible en solicitudes?"
                    variant="outlined"
                    defaultValue={value}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio seleccionar una opción'
                        : 'Seleccionar opción'
                    }
                  >
                    <MenuItem value="true">SI</MenuItem>
                    <MenuItem value="false">NO</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={11} md={2} margin={1}>
              <Controller
                name="maneja_hoja_vida"
                control={control_bien}
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
                    label="¿Hoja de vida?"
                    variant="outlined"
                    defaultValue={value}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio seleccionar una opción'
                        : 'Seleccionar opción'
                    }
                  >
                    <MenuItem value="true">SI</MenuItem>
                    <MenuItem value="false">NO</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={11} md={12} margin={1}>
              <Controller
                name="descripcion"
                control={control_bien}
                defaultValue=""
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    multiline
                    rows={4}
                    size="small"
                    label="Descripcion"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio ingresar descripción'
                        : 'Ingrese descripción'
                    }
                  />
                )}
              />
            </Grid>





          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Stack
            direction="row"
            spacing={2}
            sx={{ mr: '15px', mb: '10px', mt: '10px' }}
          >
            <Button
              variant="outlined"
              onClick={handle_close_add_bien}
              startIcon={<CloseIcon />}
            >
              CERRAR
            </Button>
            <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
              GUARDAR
            </Button>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default CrearBienDialogForm;
