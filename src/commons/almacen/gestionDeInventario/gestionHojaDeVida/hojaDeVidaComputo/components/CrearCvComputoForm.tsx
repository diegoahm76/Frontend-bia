/* eslint-disable no-restricted-syntax */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, type Dispatch, type SetStateAction, useState } from "react";
import { Title } from "../../../../../../components/Title";
import { type IList, type ICvcomputers as FormValues } from '../interfaces/CvComputo';
// import SaveIcon from '@mui/icons-material/Save';
// import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from "@mui/icons-material/Close";
// import {  useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/hooks";
import { create_cv_computers_service, get_marca_service } from "../store/thunks/cvComputoThunks";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../../../../../api/axios";
import { text_choise_adapter } from "../../../../../auth/adapters/textChoices.adapter";
import { useNavigate } from "react-router-dom";

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  action: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const CrearCvComputoForm = ({
  action,
  is_modal_active,
  set_is_modal_active,
}:
  IProps) => {

  const initial_options: IList[] = [{
    label: "",
    value: "",
  }]
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [state, set_state] = useState(initial_options);
  const { marcas } = useAppSelector((state) => state.cv);
  const { current_computer, current_cv_computer } = useAppSelector((state) => state.cv);

  const handle_close_cv_com_is_active = (): void => {
    set_is_modal_active(false);
  };

  // const [file, set_file] = useState<any>(null);


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { control: control_computo, handleSubmit: handle_submit, reset: reset_computer } =
    useForm<FormValues>();
  useEffect(() => {
    reset_computer(current_cv_computer);
  }, [current_computer]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const on_submit = (data: FormValues): void => {
    const form_data: any = new FormData();
    form_data.append("sistema_operativo", data.sistema_operativo);
    form_data.append("suite_ofimatica", data.suite_ofimatica);
    form_data.append("antivirus", data.antivirus);
    form_data.append("color", data.color);
    form_data.append("tipo_de_equipo", data.tipo_de_equipo);
    form_data.append("tipo_almacenamiento", data.tipo_almacenamiento);
    form_data.append("capacidad_almacenamiento", data.capacidad_almacenamiento);
    form_data.append("procesador", data.procesador);
    form_data.append("memoria_ram", data.memoria_ram);
    form_data.append("estado", data.estado);
    form_data.append("doc_identificador_nro", data.doc_identificador_nro)
    form_data.append("observaciones_adicionales", data.observaciones_adicionales);
    form_data.append("otras_aplicaciones", data.otras_aplicaciones);
    form_data.append("id_marca", data.id_marca.toString());
    form_data.append("id_articulo", current_computer.id_bien.toString());
    // form_data.append('ruta_imagen_foto', file === null ? '' : file);

    void dispatch(create_cv_computers_service(form_data, navigate));
    handle_close_cv_com_is_active();
  };
  useEffect(() => {
    const get_selects_options: any = async () => {
      try {
        const { data: state_no_format } = await api.get(
          'almacen/choices/estados-articulo/'
        );
        const state_format = text_choise_adapter(
          state_no_format
        );
        set_state(state_format)
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
      onClose={handle_close_cv_com_is_active}
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
              : "Editar hoja de "}
        </DialogTitle>

        <Divider />
        <DialogContent sx={{ mb: '0px' }}>

          <Grid container spacing={2}>
            <Title title="ESPECIFICACIONES FÍSICAS" />


            <Grid item xs={12} sm={3}>
              <Controller
                name="id_marca"
                control={control_computo}
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
                        ? 'Es obligatorio ingresar la marca'
                        : 'Ingrese marca'
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
            <Grid item xs={12} sm={3}>
              <Controller
                name="doc_identificador_nro"
                control={control_computo}
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
                    label="Serie"
                    variant="outlined"
                    disabled={action !== "create"}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio ingresar la serie'
                        : 'Ingrese serie'
                    }
                  >

                  </TextField>

                )}
              />
            </Grid>

            <Grid item xs={12} sm={3} >
              <Controller
                name="estado"
                control={control_computo}
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
                    label="Estado"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio ingresar el estado del equipo'
                        : 'Ingrese el estado'
                    }
                  >
                    {state.map((option: IList) => (
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
                control={control_computo}
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
                        ? 'Es obligatorio ingresar el color'
                        : 'Ingrese color'
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3} >
              <Controller
                name="tipo_de_equipo"
                control={control_computo}
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
                    label="Tipo de equipo"
                    helperText="Portatil, Tablet, All-in-on"
                    variant="outlined"
                    disabled={action !== "create"}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                  />
                )}
              />
            </Grid>

            <DialogContent sx={{ mb: '0px' }}>
              <Grid container spacing={2} >
                <Title title="ESPECIFICACIONES TÉCNICAS" />


                <Grid item xs={11} sm={3} >
                  <Controller
                    name="capacidad_almacenamiento"
                    control={control_computo}
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
                        label="Capacidad de almacenamiento"
                        variant="outlined"
                        disabled={action !== "create"}
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}
                        helperText={
                          error != null
                            ? 'Es obligatorio ingresar la capacidad de almacenamiento'
                            : ''
                        }
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={11} sm={3} >
                  <Controller
                    name="procesador"
                    control={control_computo}
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
                        label="Procesador"
                        variant="outlined"
                        disabled={action !== "create"}
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}
                        helperText={
                          error != null
                            ? ''
                            : ''
                        }
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={11} sm={3} >
                  <Controller
                    name="memoria_ram"
                    control={control_computo}
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
                        label="Memoria RAM"
                        variant="outlined"
                        disabled={action !== "create"}
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}
                        helperText={
                          error != null
                            ? ''
                            : ''
                        }
                      />
                    )}
                  />
                </Grid>


                <Grid item xs={11} sm={3} >
                  <Controller
                    name="tipo_almacenamiento"
                    control={control_computo}
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
                        label=" Tipo de almacenamiento"
                        helperText="PDisco Duro, SSD, NVME"
                        variant="outlined"
                        disabled={action !== "create"}
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}

                      />
                    )}
                  />
                </Grid>



              </Grid>

            </DialogContent>
            <DialogContent sx={{ mb: '0px' }}>
              <Grid container spacing={2} >
                <Title title="CARACTERÍSTICAS" />

                <Grid item xs={11} sm={3}>
                  <Controller
                    name="suite_ofimatica"
                    control={control_computo}
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
                        label="Suit ofimatica"
                        variant="outlined"
                        disabled={action !== "create"}
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}
                        helperText={
                          error != null
                            ? ''
                            : ''
                        }
                      />
                    )}
                  />

                </Grid>

                <Grid item xs={11} sm={3} >
                  <Controller
                    name="antivirus"
                    control={control_computo}
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
                        label="Antivirus"
                        variant="outlined"
                        disabled={action !== "create"}
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}
                        helperText={
                          error != null
                            ? ''
                            : ''
                        }
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={11} sm={3} >
                  <Controller
                    name="otras_aplicaciones"
                    control={control_computo}
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
                        label="Otras aplicaciones"
                        variant="outlined"
                        disabled={action !== "create"}
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}
                        helperText={
                          error != null
                            ? ''
                            : ''
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </DialogContent>


          </Grid>

        </DialogContent>

        <DialogActions>
          <Stack
            direction="row"
            spacing={2}
            sx={{ mr: '15px', mb: '10px', mt: '10px' }}
          >
            <Button
              variant="outlined"
              onClick={handle_close_cv_com_is_active}
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




      </Box>
    </Dialog>
  );
};

export default CrearCvComputoForm;
