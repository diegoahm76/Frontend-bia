import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, CircularProgress, Grid, IconButton } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { type conf_alarma } from '../interfaces/interfaces';
import { consultar_conf_alerta_persona } from '../../requets/getRequest';
import { control_error } from '../../../../helpers/controlError';

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

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfiguracionAlarma: React.FC = () => {
  const [conf_alert_person, set_conf_alert_person] = useState<conf_alarma[]>([]);

  const confi_alerta_persona = async (): Promise<void> => {
    try {
      const response = await consultar_conf_alerta_persona();
      const conf = response.map((con_alerta: conf_alarma) => ({
        id_confi_alerta_persona: con_alerta.id_confi_alerta_persona,
        nombre_variable_alarma: con_alerta.nombre_variable_alarma,
        mensaje_alarma_maximo: con_alerta.mensaje_alarma_maximo,
        mensaje_alarma_minimo: con_alerta.mensaje_alarma_minimo,
        mensaje_no_alarma: con_alerta.mensaje_no_alarma,
        frecuencia_alarma: con_alerta.frecuencia_alarma,

      }))

      set_conf_alert_person(conf);
    } catch (err) {
      control_error(err)
    }
  };

  useEffect(() => {
    void confi_alerta_persona()
  }, []);


  return (
    <Grid container>
      <Grid item xs={12}>
        <Button
          sx={{ mb: '20px' }}
          variant="outlined"
          // onClick={handle_click_open}
          startIcon={<AddIcon />}
        >
          CREAR ALARMA
        </Button>
      </Grid>
      <Grid item xs={12} container justifyContent='center'>
        {conf_alert_person.length > 0 ? (
          <DataGrid
            autoHeight
            rows={conf_alert_person}
            columns={columns}
            getRowId={(row) => row.id_confi_alerta_persona}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        ) : (
          <CircularProgress color="secondary" />
        )}
      </Grid>
    </Grid>
  );
};