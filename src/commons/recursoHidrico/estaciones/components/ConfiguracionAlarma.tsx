/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Avatar, CircularProgress, Grid, IconButton } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import type { conf_alarma } from '../interfaces/interfaces';
import {
  consultar_conf_alerta_persona, control_success, eliminar_conf_alerta_persona,
  // llamar_alertas 
} from '../../requets/Request';
import { control_error } from '../../../../helpers/controlError';
import { CrearConfiAlertaDialog } from './CrearConfiAlertaDialog';
import { EditarAlertaDialog } from './EditarAlertaDialog';
import Swal from 'sweetalert2';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { Title } from '../../../../components';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfiguracionAlarma: React.FC = () => {

  const [conf_alert_person, set_conf_alert_person] = useState<conf_alarma[]>([]);
  const [crear_alerta_is_active, set_crear_alerta_is_active] = useState<boolean>(false);
  const [editar_alerta_is_active, set_editar_alerta_is_active] = useState<boolean>(false);
  const [alerta_editado, set_alerta_editado] = useState(null);


  const handle_open_crear_alerta = (): void => {
    set_crear_alerta_is_active(true);
  }

  const columns: GridColDef[] = [
    { field: 'id_confi_alerta_persona', headerName: 'NÚMERO ALERTA', width: 140 },
    { field: 'nombre_variable_alarma', headerName: 'NOMBRE VARIABLE', width: 170 },
    { field: 'mensaje_alarma_minimo', headerName: 'MENSAJE MÍNIMO', width: 170 },
    { field: 'mensaje_no_alarma', headerName: 'MENSAJE MÁXIMO', width: 170 },
    { field: 'frecuencia_alarma', headerName: 'FRECUENCIA ALARMA', width: 170 },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
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
                onClick={() => {
                  set_alerta_editado(params.row);
                  set_editar_alerta_is_active(!editar_alerta_is_active);
                }}
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
              onClick={() => {
                confirmar_eliminar_alarma(params.row.id_confi_alerta_persona);
              }}
            >
              <DeleteIcon
                sx={{ color: 'red', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];

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
    } catch (err: any) {
      control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
    }
  };

  useEffect(() => {
    void confi_alerta_persona();
  }, []);

  const confirmar_eliminar_alarma = (idPersona: number): void => {
    void Swal.fire({
      // title: "Estas seguro?",
      customClass: {
        confirmButton: "square-btn",
        cancelButton: "square-btn",
      },
      width: 350,
      text: "¿Estás seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8BC34A",
      cancelButtonColor: "#B71C1C",
      confirmButtonText: "Si, elminar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminar_conf_alerta_persona(idPersona);
        control_success('La alerta se eliminó correctamente')
        void confi_alerta_persona()
      }
    });
  };

  return (
    <Grid container sx={{
      position: 'relative',
      background: '#FAFAFA',
      borderRadius: '15px',
      p: '20px', mb: '20px',
      boxShadow: '0px 3px 6px #042F4A26',
      marginTop: '20px',
      marginLeft: '-5px',
    }}>
      <Grid item xs={12} sx={{ marginTop: "-20px" }}     >
        <Title title="Configuracion alarma " />
      </Grid>
      <style>
        {`
          .square-btn {
            border-radius: 0 !important;
          }

          .swal2-icon.swal2-warning {
            font-size: 14px !important;
          }
        `}
      </style>

      <Grid container sx={{ marginTop: "20px" }}>

        <Grid item xs={6}>
          <Button
            sx={{ mb: '20px' }}
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => {
              handle_open_crear_alerta()
            }}
          >
            CREAR ALARMA
          </Button>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        
          <ButtonGroup style={{ margin: 7 }}>

            {download_xls({ nurseries: conf_alert_person, columns })}
           

          </ButtonGroup>




        </Grid>
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
      <CrearConfiAlertaDialog
        is_modal_active={crear_alerta_is_active}
        set_is_modal_active={set_crear_alerta_is_active}
        confi_alerta_persona={confi_alerta_persona}
      />
      <EditarAlertaDialog
        is_modal_active={editar_alerta_is_active}
        set_is_modal_active={set_editar_alerta_is_active}
        alerta_editado={alerta_editado}
        set_alerta_editado={set_alerta_editado}
        confi_alerta_persona={confi_alerta_persona}
      />
    </Grid>
  );
};