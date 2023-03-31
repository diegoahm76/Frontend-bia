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
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { Title } from "../../../../../../components/Title";
 import {  type ICvcomputers as FormValues } from '../interfaces/CvComputo';
// import SaveIcon from '@mui/icons-material/Save';
// import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from "@mui/icons-material/Close";
// import {  useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/hooks";
import { create_cv_computers_service } from "../store/thunks/cvComputoThunks";
import {  Controller, useForm } from "react-hook-form";

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
  const { current_computer, current_cv_computer } = useAppSelector((state) => state.cv);

  const handle_close_cv_com_is_active = (): void => {
   set_is_modal_active(false);
  };

  // const [file, set_file] = useState<any>(null);
  const dispatch = useAppDispatch();

  const { control: control_computo, handleSubmit: handle_submit, reset: reset_computer } =
   useForm<FormValues>();
  useEffect(() => {
    reset_computer(current_cv_computer);
  }, [current_computer]);

  const on_submit = (data: FormValues): void => {
    const formdata = new FormData();
    formdata.append("sistema_operativo", data.sistema_operativo);
    formdata.append("suite_ofimatica", data.suite_ofimatica);
    formdata.append("antivirus", data.antivirus);
    formdata.append("color", data.color);
    formdata.append("tipo_de_equipo", data.tipo_de_equipo);
    formdata.append("tipo_almacenamiento", data.tipo_almacenamiento);
    formdata.append("capacidad_almacenamiento", data.capacidad_almacenamiento);
    formdata.append("procesador", data.procesador);
    formdata.append("memoria_ram", data.memoria_ram);
    formdata.append("estado", data.estado);
    formdata.append("observaciones_adicionales", data.observaciones_adicionales );
    formdata.append("otras_aplicaciones", data.otras_aplicaciones);
    formdata.append("id_marca", data.id_marca.toString());
    formdata.append("id_articulo", current_computer.id_bien.toString());
    // formdata.append('ruta_imagen_foto', file === null ? '' : file);

    dispatch(create_cv_computers_service(formdata));
  };

  

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
      onSubmit={action==="create"? handle_submit(on_submit):handle_submit(on_submit)}
      >
        <DialogTitle>
          {action === "create"
            ? "Crear hoja de vida"
            : action === "detail"
            ? "Detalle  Hoja de vida"
            : "Editar vivero"}
        </DialogTitle>

        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
        <Grid item xs={12}>
          <Title title="Especificaciones físicas" />
          <Grid container spacing={2}>
            
          <Grid item xs={11} md={5} margin={1}>
              <Controller
                name="id_marca"
                control={control_computo}
                defaultValue= {0}
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
                    disabled = {action !== "create"}
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
            
            <Grid item xs={11} md={5} margin={1}>
              <Controller
                name="estado"
                control={control_computo}
                defaultValue= ""
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
                    disabled = {action !== "create"}
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
            <Grid item xs={11} md={5} margin={1}>
              <Controller
                name="color"
                control={control_computo}
                defaultValue= ""
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
                    disabled = {action !== "create"}
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
            <Grid item xs={11} md={5} margin={1}>
              <Controller
                name="tipo_de_equipo"
                control={control_computo}
                defaultValue= ""
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
                    disabled = {action !== "create"}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                                      />
                )}
              />
            </Grid>
          </Grid>
        </Grid>

        </DialogContent>
        <Grid>
        <DialogContent sx={{ mb: '0px' }}>
          <Grid item xs={12}>
            <Title title="Especificaciones técnicas" />
            <Grid container spacing={2} sx={{ mt: "20px" }}>
            
            <Grid item xs={11} md={5} margin={1}>
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
                    disabled = {action !== "create"}
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
            
            <Grid item xs={11} md={5} margin={1}>
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
                    disabled = {action !== "create"}
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

            <Grid item xs={11} md={5} margin={1}>
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
                    disabled = {action !== "create"}
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
              
                 
            <Grid item xs={11} md={5} margin={1}>
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
                    disabled = {action !== "create"}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    
                  />
                )}
              />
            </Grid>
             
            </Grid>
          </Grid>
          </DialogContent>
          <DialogContent sx={{ mb: '0px' }}>
          <Grid item xs={12}>
            <Title title="Caracteristicas" />
            <Grid container spacing={2} sx={{ mt: "20px" }}>
            <Grid item xs={11} md={5} margin={1}>
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
                    disabled = {action !== "create"}
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

            <Grid item xs={11} md={5} margin={1}>
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
                    disabled = {action !== "create"}
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
            
            <Grid item xs={11} md={5} margin={1}>
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
                    disabled = {action !== "create"}
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
            {/* {action === "create"?
            <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
              GUARDAR
            </Button>:
            action === "edit"?
            <Button type="submit" variant="contained" startIcon={<EditIcon />}>
              EDITAR
            </Button>:
            null
            } */}
          </Stack>
        </DialogActions>


        
        </Grid>
      </Box>
    </Dialog>
  );
};

export default CrearCvComputoForm;
