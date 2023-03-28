/* eslint-disable no-restricted-syntax */
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
// import { useEffect, type Dispatch, type SetStateAction } from "react";
import { Title } from "../../../../../../components/Title";
//  import { type IComputers, type ICvcomputers as FormValues } from '../interfaces/CvComputo';
// import SaveIcon from '@mui/icons-material/Save';
// import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from "@mui/icons-material/Close";
// import {  useNavigate } from "react-router";
// import { useAppDispatch, useAppSelector } from "../../../../../../hooks/hooks";
// import { create_cv_computers_service } from "../store/thunks/cvComputoThunks";
// import { Controller, useForm } from "react-hook-form";

interface IProps {
  is_modal_active: boolean;
  // set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  action: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const CrearCvComputoForm = ({
  action,
  is_modal_active,
}: // set_is_modal_active,
IProps) => {
  // const { current_computer } = useAppSelector((state) => state.cv);

  const handle_close_cv_com_is_active = (): void => {
    // set_is_modal_active(false);
  };

  // const [file, set_file] = useState<any>(null);
  // const dispatch = useAppDispatch();

  // const { control: control_computo, handleSubmit: handle_submit, reset: reset_computer } =
  //  useForm<IComputers>();
  // useEffect(() => {
  //   reset_computer(current_computer);
  // }, [current_computer]);

  // const on_submit = (data: FormValues): void => {
  //   const formdata = new FormData();
  //   formdata.append("sistema_operativo", data.sistema_operativo);
  //   formdata.append("suite_ofimatica", data.suite_ofimatica);
  //   formdata.append("antivirus", data.antivirus);
  //   formdata.append("color", data.color);
  //   formdata.append("tipo_de_equipo", data.tipo_de_equipo);
  //   formdata.append("tipo_almacenamiento", data.tipo_almacenamiento);
  //   formdata.append("capacidad_almacenamiento", data.capacidad_almacenamiento);
  //   formdata.append("procesador", data.procesador);
  //   formdata.append("memoria_ram", data.memoria_ram);
  //   formdata.append(
  //     "observaciones_adicionales",
  //     data.observaciones_adicionales
  //   );
  //   formdata.append("otras_aplicaciones", data.otras_aplicaciones);
  //   formdata.append("id_articulo", current_computer.id_bien.toString());
  //   // formdata.append('ruta_imagen_foto', file === null ? '' : file);

  //   dispatch(create_cv_computers_service(formdata));
  // };

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
        // onSubmit={action==="create"? handle_submit(on_submit):handle_submit(on_submit_edit)}
      >
        <DialogTitle>
          {action === "create"
            ? "Crear hoja de vida"
            : action === "detail"
            ? "Detalle  Hoja de vida"
            : "Editar vivero"}
        </DialogTitle>

        <Divider />

        <Grid item xs={12}>
          <Title title="Especificaciones físicas" />
          <Grid container spacing={2}>
            <Grid item xs={3} sm={4} margin={1} sx={{ mt: "20px" }}>
              <TextField
                label="Marca"
                helperText="Seleccione Marca"
                size="small"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={3} sm={4} margin={1}>
              <TextField
                label="Estado"
                helperText="Seleccione el estado"
                size="small"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={3} sm={4}>
              <TextField
                label="Color"
                helperText="Seleccione el color"
                size="small"
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Tipo de equipo"
                helperText="Portatil, Tablet, All-in-on"
                size="small"
                required
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Title title="Características" />
          <Grid container spacing={2} sx={{ mt: "20px" }}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Sistema operativo"
                // helperText="Seleccione Marca"
                size="small"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Suite ofimática"
                // helperText="Seleccione el estado"
                size="small"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Antivirus"
                //   helperText="Seleccione el color"
                size="small"
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Aplicativos"
                helperText="Observaciones"
                size="small"
                required
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid>
          <Grid item xs={12}>
            <Title title="Especificaciones técnicas" />
            <Grid container spacing={2} sx={{ mt: "20px" }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Tipo de almacenamiento"
                  helperText="Disco duro, SSD, NVME"
                  size="small"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Capacidad de almacenamiento"
                  // helperText="Disco duro, SSD, NVME"
                  size="small"
                  required
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Procesador"
                  // helperText="Disco duro, SSD, NVME"
                  size="small"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Memoria RAM"
                  // helperText="Disco duro, SSD, NVME"
                  size="small"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Observaciones"
                  helperText="Observaciones"
                  size="small"
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>

          <Button
            variant="outlined"
            onClick={handle_close_cv_com_is_active}
            startIcon={<CloseIcon />}
          >
            CERRAR
          </Button>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default CrearCvComputoForm;
