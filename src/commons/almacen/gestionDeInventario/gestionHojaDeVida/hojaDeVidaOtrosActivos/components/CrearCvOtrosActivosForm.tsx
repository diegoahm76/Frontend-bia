
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
import { type IList, type IcvOthers as FormValues } from '../interfaces/CvOtrosActivos';
// import SaveIcon from '@mui/icons-material/Save';
// import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from "@mui/icons-material/Close";
// import {  useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/hooks";
import { create_cv_others_service, get_marca_service } from "../store/thunks/cvOtrosActivosThunks";
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
const CrearCvOtrosActivosForm = ({
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
  const { marcas } = useAppSelector((state) => state.cvo);
  const { current_other, current_cv_other } = useAppSelector((state) => state.cvo);

  const handle_close_cv_other_is_active = (): void => {
    set_is_modal_active(false);
  };

  // const [file, set_file] = useState<any>(null);


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { control: control_other, handleSubmit: handle_submit, reset: reset_other } =
    useForm<FormValues>();
  useEffect(() => {
    reset_other(current_cv_other);
  }, [current_other]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const on_submit = (data: FormValues): void => {
    const form_data: any = new FormData();
    form_data.append("caracteristicas_fisicas", data.caracteristicas_fisicas);
    form_data.append("doc_identificador_nro", data.doc_identificador_nro);
    form_data.append("especificaciones_tecnicas", data.especificaciones_tecnicas);
    form_data.append("observaciones_acionales", data.observaciones_adicionales);
    form_data.append("id_marca", data.id_marca);
    form_data.append("id_articulo", current_cv_other.id_bien.toString());
    // form_data.append('ruta_imagen_foto', file === null ? '' : file);

    void dispatch(create_cv_others_service(form_data, navigate));
    handle_close_cv_other_is_active();
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
      onClose={handle_close_cv_other_is_active}
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
            <Title title="ESPECIFICACIONES" />


            <Grid item xs={12} sm={3}>
              <Controller
                name="id_marca"
                control={control_other}
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
                control={control_other}
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
                control={control_other}
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



            <DialogContent sx={{ mb: '0px' }}>
              <Grid container spacing={2} >
                <Title title="" />


                <Grid item xs={11} sm={3} >
                  <Controller
                    name="caracteristicas_fisicas"
                    control={control_other}
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
                        label="Caracteristicas Fisícas"
                        variant="outlined"
                        disabled={action !== "create"}
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}
                        helperText={
                          error != null
                            ? 'Es obligatorio ingresar la caracteristica fisíca'
                            : ''
                        }
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={11} sm={3} >
                  <Controller
                    name="especificaciones_tecnicas"
                    control={control_other}
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
                        label="Especificaciones técnicas"
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
                    name="observaciones_adicionales"
                    control={control_other}
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
                        label="Observaciones adicioanles"
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
              onClick={handle_close_cv_other_is_active}
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

// eslint-disable-next-line no-restricted-syntax
export default CrearCvOtrosActivosForm;
