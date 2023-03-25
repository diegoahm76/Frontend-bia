/* eslint-disable no-restricted-syntax */
import { Button, Dialog, Grid, TextField } from "@mui/material";
import { type Dispatch, type SetStateAction } from "react";
import { Title } from "../../../../../../components/Title";
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  title: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
 const CrearCvComputoForm = ({
  is_modal_active,
  set_is_modal_active,

}: IProps) => {

  const handle_close_cv_com_is_active = (): void => {
    set_is_modal_active(false);
  };
  return (
      
     <Dialog
      maxWidth="md"
      open={is_modal_active}
      onClose={() => {
        set_is_modal_active(false);
      }}
      >
      
    
      <Grid
        container
        sx={{
          position: "relative",
          background: "#FAFAFA",
          borderRadius: "15px",
          p: "20px",
          mb: "20px",
          boxShadow: "0px 3px 6px #042F4A26",
        }}
      >
        <Grid item xs={12}>
          <Title title="Especificaciones físicas" />
          <Grid container spacing={2}>
            <Grid item xs={3} sm={4} margin={1}  sx={{mt: '20px'}}>
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
            <Grid item xs={3} sm={4} >
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

        <Grid
                  >
          <Grid item xs={12}>
            <Title title="Características" />
            <Grid container spacing={2}   sx={{mt: '20px'}}>
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
          </Grid>

          <Grid
          
          >
            <Grid item xs={12}>
              <Title title="Especificaciones técnicas" />
              <Grid container spacing={2} sx={{mt: '20px'}}>
              <Grid item xs={12} sm={4} >
                <TextField           
                  label="Tipo de almacenamiento"
                  helperText="Disco duro, SSD, NVME"
                  size="small"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}  >
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
        </Grid>
        <Button
              variant="outlined"
              onClick={handle_close_cv_com_is_active}
              startIcon={<CloseIcon />}
            >
              CERRAR
            </Button>
      </Grid>
      
      </Dialog>
  );
};

export default CrearCvComputoForm; 

