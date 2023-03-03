// import { ToastContainer } from "react-toastify";
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
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { type Dispatch, type SetStateAction } from 'react';
// import { add_organigrams_service } from '../store/thunks/organigramThunks';
// import { useNavigate } from 'react-router-dom';
// import { useAppDispatch } from '../store/hooks/hooks';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// interface FormValues {
//   nombre: string;
//   version: string;
//   descripcion: string;
// }

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const CrearSeriesCcdDialog = ({
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
  // const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  // const [organigrama_data, set_organigrama_data] = React.useState<FormValues>({
  //   nombre: '',
  //   version: '',
  //   descripcion: '',
  // });

  // const handle_data_organigram = (e: {
  //   target: { name: any; value: any };
  // }): void => {
  //   set_organigrama_data({
  //     ...organigrama_data,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handle_submit = (e: { preventDefault: () => void }): void => {
  //   e.preventDefault();
  //   void dispatch(add_organigrams_service(organigrama_data, navigate));
  //   console.log(organigrama_data);
  // };

  const handle_close_crear_organigrama = (): void => {
    set_is_modal_active(false);
  };

  return (
    <Dialog
      maxWidth="md"
      open={is_modal_active}
      onClose={handle_close_crear_organigrama}
    >
      <Box component="form">
        <DialogTitle>Crear series</DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Box
            component="form"
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="version"
                  label="Versión"
                  helperText="Ingrese versión"
                  size="small"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="version"
                  label="Versión"
                  helperText="Ingrese versión"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button>CREAR</Button>
                <Button>CLONAR</Button>
              </Grid>
            </Grid>
          </Box>
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
              onClick={handle_close_crear_organigrama}
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
export default CrearSeriesCcdDialog;
