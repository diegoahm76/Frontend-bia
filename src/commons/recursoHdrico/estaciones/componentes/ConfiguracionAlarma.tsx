/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Divider, Grid, IconButton, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { api } from '../../../../api/axios';

const columns: GridColDef[] = [
  { field: 'id_confi_alerta_persona', headerName: 'NÚMERO', width: 140 },
  { field: 'nombre_variable_alarma', headerName: 'NOMBRE VARIABLE', width: 170 },
  { field: 'mensaje_alarma_minimo', headerName: 'MENSAJE MINIMO', width: 170 },
  { field: 'mensaje_no_alarma', headerName: 'MENSAJE MAXIMO', width: 170 },
  { field: 'frecuencia_alarma', headerName: 'DREACUENCIA ALARMA', width: 170 },
  {
    field: 'ACCIONES',
    headerName: 'Aciones',
    width: 200,
    renderCell: (params) => (
      <>
        <IconButton>
          <Avatar
            sx={{
              width: 24,
              height: 24,
              background: '#fff',
              border: '2px solid',
            }}
            variant="rounded"
          >
            <EditIcon
              sx={{ color: 'primary.main', width: '18px', height: '18px' }}
            />
          </Avatar>
        </IconButton>
        <IconButton>
          <Avatar
            sx={{
              width: 24,
              height: 24,
              background: '#fff',
              border: '2px solid',
            }}
            variant="rounded"
          >
            <DeleteIcon
              sx={{ color: 'primary.main', width: '18px', height: '18px' }}
            />
          </Avatar>
        </IconButton>
      </>
    ),
  },
];
interface conf_alarma {
  id_confi_alerta_persona: number,
  nombre_variable_alarma: string,
  mensaje_alarma_maximo: string,
  mensaje_alarma_minimo: string,
  mensaje_no_alarma: string,
  frecuencia_alarma: number,
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfiguracionAlarma: React.FC = () => {
  const [open, set_open] = useState(false);

  const handle_click_open = (): void => {
    set_open(true);
  };
  const handle_close = (): void => {
    set_open(false);
  };

  const [conf_alert_person, set_conf_alert_person] = useState(null);

  const cpnfi_alerta_persona = async () => {
    try {
      const url = `estaciones/configuracion/alertas/consultar-configuracion-alerta/`
      const response = await api.get(url);
      console.log('Alertas en el sistema',response.data.data)
      const conf = response.data.data.map((con_alerta: conf_alarma) => ({
        id_confi_alerta_persona: con_alerta.id_confi_alerta_persona,
        nombre_variable_alarma: con_alerta.nombre_variable_alarma,
        mensaje_alarma_maximo: con_alerta.mensaje_alarma_maximo,
        mensaje_alarma_minimo: con_alerta.mensaje_alarma_minimo,
        mensaje_no_alarma: con_alerta.mensaje_no_alarma,
        frecuencia_alarma: con_alerta.frecuencia_alarma,

      }))

      set_conf_alert_person(conf);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    void cpnfi_alerta_persona()
  }, []);


  return (
    <Grid container>
      <Grid item xs={12}>
        <Button
          sx={{ mb: '20px' }}
          variant="outlined"
          onClick={handle_click_open}
          startIcon={<AddIcon />}
        >
          CREAR ALARMA
        </Button>
        <Dialog open={open} onClose={handle_close}>
          <DialogTitle>CREAR ALARMA</DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText>
              Ingrese Alarma
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Alarma"
              type="Any"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button variant="outlined" onClick={handle_close}>
              Cerrar
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handle_close}
            >
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <Grid item xs={12}>

        {conf_alert_person ? (
          <DataGrid
            autoHeight
            rows={conf_alert_person}
            columns={columns}
            getRowId={(row) => row.id_confi_alerta_persona}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        ) : (
          <Typography>Cargando...</Typography>
        )}
      </Grid>
    </Grid>
  );
};