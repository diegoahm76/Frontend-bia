/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Checkbox, FormControlLabel, Grid, MenuItem, TextField, Tooltip, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Title } from '../../../../components/Title';
import { set_current_mode_planes } from '../../../seguimirntoPlanes/store/slice/indexPlanes';
import { format } from 'date-fns';
import InfoIcon from '@mui/icons-material/Info';
import { post_accion_correctiva, put_accion_correctiva } from '../services/services';
import { control_error, control_success } from '../../../../helpers';
import { DataContextAccionesCorrectivas } from '../context/context';


interface form_tramite {
  id_tramite: string;
  nombre_tramite: string;
  numero_expediente: string;
  numero_radicado: string;
  cedula_solicitante: string;
  cedula_catastral: string;
  grupo_funcional: string;
  tipo_tramite: string;
}

interface form_accion_correlativa {
  id_accion?: string;
  id_tramite?: any;
  id_expediente?: any;
  nombre_accion: string;
  descripcion: string;
  observacion_accion: string;
  fecha_creacion?: any;
  fecha_cumplimiento?: any;
  cumplida: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarAccionCorrectiva: React.FC = () => {

  const [form_accion_correctiva, set_form_accion_correctiva] = useState<form_accion_correlativa>({
    id_accion: '',
    id_tramite: '',
    id_expediente: '',
    nombre_accion: '',
    descripcion: '',
    observacion_accion: '',
    fecha_creacion: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
    fecha_cumplimiento: dayjs().format('YYYY-MM-DD'),
    cumplida: false,
  });

  const [form_tramite, set_form_tramite] = useState<form_tramite>({
    id_tramite: '',
    nombre_tramite: '',
    numero_expediente: '',
    numero_radicado: '',
    cedula_solicitante: '',
    cedula_catastral: '',
    grupo_funcional: '',
    tipo_tramite: '',
  });

  const limpiar_form_accion_correctiva = () => {
    set_form_accion_correctiva({
      id_accion: '',
      nombre_accion: '',
      descripcion: '',
      observacion_accion: '',
      cumplida: false,
    });
  };

  const handle_change_nombre_accion = (e: any) => {
    set_form_accion_correctiva({
      ...form_accion_correctiva,
      nombre_accion: e.target.value,
    });
  };

  const handle_change_descripcion_accion = (e: any) => {
    set_form_accion_correctiva({
      ...form_accion_correctiva,
      descripcion: e.target.value,
    });
  };

  const handle_change_observacion_accion_accion = (e: any) => {
    set_form_accion_correctiva({
      ...form_accion_correctiva,
      observacion_accion: e.target.value,
    });
  };

  const [is_saving_accion_correctiva, set_is_saving_accion_correctiva] = useState(false);
  const { id_tramite, id_expediente, fetch_data_acciones_correctivas } = useContext(
    DataContextAccionesCorrectivas
  );

  const handle_change_fecha_creacion = (date: Date | null) => {
    set_form_accion_correctiva({
      ...form_accion_correctiva,
      fecha_creacion: dayjs(date).format('YYYY-MM-DD'),
    });
  };

  const handle_change_fecha_cumplimiento = (date: Date | null) => {
    set_form_accion_correctiva({
      ...form_accion_correctiva,
      fecha_cumplimiento: dayjs(date).format('YYYY-MM-DD'),
    });
  };

  const handleCheckboxChange = (event: any) => {
    set_form_accion_correctiva({
      ...form_accion_correctiva,
      cumplida: event.target.checked,
    });
  };

  const onsubmit_accion = async () => {
    try{
      set_is_saving_accion_correctiva(true);
      await post_accion_correctiva(form_accion_correctiva);
      control_success('Se creó correctamente');
      limpiar_form_accion_correctiva();
      await fetch_data_acciones_correctivas();
    }catch(error: any){
      control_error(error.response?.data.detail ?? 'Error al guardar la acción');
    }finally{
      set_is_saving_accion_correctiva(false);
    }
  }

  const onsubmit_editar = async () => {
    try{
      set_is_saving_accion_correctiva(true);
      await put_accion_correctiva(Number(form_accion_correctiva.id_accion), form_accion_correctiva);
      control_success('Se actualizó correctamente');
      limpiar_form_accion_correctiva();
      await fetch_data_acciones_correctivas();
    }catch(error: any){
      control_error(error.response?.data.detail ?? 'Error al guardar la acción');
    }finally{
      set_is_saving_accion_correctiva(false);
    }
  }

  const dispatch = useAppDispatch();

  const { mode, accion_correctiva, tramite } = useAppSelector((state) => state.planes);

  useEffect(() => {
    if (tramite) {
      set_form_tramite({
        id_tramite: tramite.id_solicitud_tramite,
        nombre_tramite: tramite.nombre_proyecto,
        numero_expediente: tramite.numero_expediente,
        numero_radicado: tramite.radicado,
        cedula_solicitante: tramite.numero_documento,
        cedula_catastral: tramite.cedula_catastral,
        grupo_funcional: tramite.grupo_funcional,
        tipo_tramite: tramite.tipo_tramite,
      });
    }
  }, []);

  useEffect(() => {
    if (mode.crear) {
      set_form_accion_correctiva({
        ...form_accion_correctiva,
        id_tramite: id_tramite,
        id_expediente: id_expediente,
      });
    }
    if (mode.editar) {
      set_form_accion_correctiva({
        ...form_accion_correctiva,
        id_accion: accion_correctiva.id_accion,
        id_tramite: accion_correctiva.id_tramite,
        id_expediente: accion_correctiva.id_expediente,
        nombre_accion: accion_correctiva.nombre_accion,
        descripcion: accion_correctiva.descripcion,
        observacion_accion: accion_correctiva.observacion_accion,
        fecha_creacion: accion_correctiva.fecha_creacion,
        fecha_cumplimiento: accion_correctiva.fecha_cumplimiento,
        cumplida: accion_correctiva.cumplida,
      });
      console.log(accion_correctiva, form_accion_correctiva)
    }
  }, [mode, accion_correctiva]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (mode.crear) {
            onsubmit_accion();
          }
          if (mode.editar) {
            onsubmit_editar();
          }
        }}
      >
        <Grid
          container
          spacing={2}
          m={2}
          p={2}
          sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            m: '10px 0 20px 0',
            mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26',
          }}
        >
          <Grid item xs={12}>
            <Title title="Registro de eje estrategico" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              size="small"
              label="Tipo de Trámite"
              variant="outlined"
              value={form_tramite.tipo_tramite}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              size="small"
              label="Nombre del Trámite"
              variant="outlined"
              value={form_tramite.nombre_tramite}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Número de Expediente"
              variant="outlined"
              value={form_tramite.numero_expediente}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Número de Radicado"
              variant="outlined"
              value={form_tramite.numero_radicado}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Cédula o NIT"
              variant="outlined"
              value={form_tramite.cedula_solicitante}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Cédula Catastral"
              variant="outlined"
              value={form_tramite.cedula_catastral}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              size="small"
              label="Grupo Funcional"
              variant="outlined"
              value={form_tramite.grupo_funcional}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Nombre Acción"
              variant="outlined"
              multiline
              value={form_accion_correctiva.nombre_accion}
              required
              onChange={handle_change_nombre_accion}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Descripción de la Acción"
              variant="outlined"
              multiline
              value={form_accion_correctiva.descripcion}
              required
              onChange={handle_change_descripcion_accion}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Observaciones de Seguimiento"
              rows={4}
              variant="outlined"
              multiline
              value={form_accion_correctiva.observacion_accion}
              required
              onChange={handle_change_observacion_accion_accion}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de creación"
                value={form_accion_correctiva.fecha_creacion}
                onChange={(value) => {
                  handle_change_fecha_creacion(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    fullWidth
                    size="small"
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={3} style={{ display: 'flex', justifyContent: 'center' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form_accion_correctiva.cumplida}
                  onChange={handleCheckboxChange}
                  color="primary"
                />
              }
              label={
                <Tooltip title={form_accion_correctiva.cumplida ? "SI" : "NO"} placement="right">
                  <Typography component="span" variant="body2" style={{ display: 'flex', alignItems: 'center' }}>
                    <strong>{form_accion_correctiva.cumplida ? 'Acción cumplida' : 'Acción no cumplida'}</strong>
                    <InfoIcon
                      sx={{
                        width: '1.2rem',
                        height: '1.2rem',
                        ml: '0.5rem',
                        color: form_accion_correctiva.cumplida ? 'green' : 'orange',
                      }}
                    />
                  </Typography>
                </Tooltip>
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de cumplimiento"
                value={form_accion_correctiva.fecha_cumplimiento}
                onChange={handle_change_fecha_cumplimiento}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    fullWidth
                    size="small"
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid container spacing={2} my={2} justifyContent="flex-end">
            <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  disabled={false}
                  onClick={() => {
                    limpiar_form_accion_correctiva();
                    dispatch(
                      set_current_mode_planes({
                        ver: true,
                        crear: false,
                        editar: false,
                      })
                    );
                  }}
                >
                  Cerrar
                </Button>
              </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="warning"
                disabled={false}
                onClick={() => {
                  limpiar_form_accion_correctiva();
                  dispatch(
                    set_current_mode_planes({
                      ver: true,
                      crear: true,
                      editar: false,
                    })
                  );
                }}
              >
                Limpiar
              </Button>
            </Grid>
            <Grid item>
              <LoadingButton
                variant="contained"
                color="success"
                type="submit"
                disabled={is_saving_accion_correctiva}
                startIcon={<SaveIcon />}
                loading={is_saving_accion_correctiva}
              >
                {mode.editar ? 'Actualizar' : 'Guardar'}
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
