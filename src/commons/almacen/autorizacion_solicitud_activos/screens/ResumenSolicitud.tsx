import { Button, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, Switch, Tab, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { interface_articulos_despachados, interface_estado_autorizacion_solicitud_activos, interface_inputs_resumen_despacho, interface_solicitud_por_id } from '../interfaces/types';
import { useDispatch } from 'react-redux';
import { control_error, control_success } from '../../../../helpers';
import { convertir_cod_estado } from '../../solicitudDeActivos/validations/validations';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Title } from '../../../../components';
import ResumenDespacho from './ResumenDespacho';
import { useAppDispatch } from '../../../../hooks';
import TablaArticulosSolicitados from '../tables/TablaArticulosSolicitados';


interface props {
  accion: string;
  data_form_resumen_solicitud: interface_estado_autorizacion_solicitud_activos;
  inputs_resumen_despacho: interface_inputs_resumen_despacho;
  data_articulos_despachados: interface_articulos_despachados[];
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ResumenSolicitud: React.FC<props> = ({
  accion,
  data_form_resumen_solicitud,
  inputs_resumen_despacho,
  data_articulos_despachados,
}) => {

  return (
    <>
      <Grid item xs={12}>
        <Grid item xs={12} lg={3}>
          <FormLabel htmlFor="solicitud_prestamo">
            ¿Es solicitud de préstamo?
          </FormLabel>
          <Switch
            id="solicitud_prestamo"
            checked={data_form_resumen_solicitud.es_solicitud_prestamo || false}
            disabled={accion === 'ver'}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          fullWidth
          label='Estado solicitud'
          value={convertir_cod_estado(data_form_resumen_solicitud?.estado_solicitud) || ''}
          disabled={accion === 'ver'}
          size='small'
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disabled
            label="Fecha de solicitud:"
            value={data_form_resumen_solicitud.fecha_solictud || null}
            onChange={() => { }} // No hace nada
            renderInput={(params) => (
              <TextField fullWidth size="small" {...params} />
            )}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item xs={12} lg={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disabled
            label="Fecha de cierre de solicitud:"
            value={data_form_resumen_solicitud.fecha_cierre_solicitud || null}
            onChange={() => { }} // No hace nada
            renderInput={(params) => (
              <TextField fullWidth size="small" {...params} />
            )}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item xs={12} lg={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disabled
            label="Fecha de devolución"
            value={data_form_resumen_solicitud.fecha_devolucion || null}
            onChange={() => { }} // No hace nada
            renderInput={(params) => (
              <TextField fullWidth size="small" {...params} />
            )}
          />
        </LocalizationProvider>
      </Grid>

      <Grid container spacing={2} item xs={12}>
        <Grid item xs={12}>
          <Divider orientation="horizontal" variant="fullWidth" style={{ marginBlock: 'auto', width: '100%' }}>
            <Chip label="FUNCIONARIO QUIEN SOLICITÓ" size="small" />
          </Divider>
        </Grid>

        <Grid item xs={12} lg={3}>
          <FormControl required size="small" fullWidth>
            <InputLabel >Tipo documento de quien solicitó</InputLabel>
            <Select
              label='Tipo documento de quien solicitó'
              value={data_form_resumen_solicitud.tipo_documento_solictante || ''}
              disabled={accion === 'ver'}
            >
              <MenuItem value="CC">Cédula de ciudadanía</MenuItem>
              <MenuItem value="RC" >Registro civil</MenuItem>
              <MenuItem value="TI" >Tarjeta de identidad</MenuItem>
              <MenuItem value="CE" >Cédula de extranjería</MenuItem>
              <MenuItem value="PA" >Pasaporte</MenuItem>
              <MenuItem value="PE" >Permiso especial de permanencia</MenuItem>
              <MenuItem value="NT" >NIT</MenuItem>
              <MenuItem value="NU" >NUIP</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            fullWidth
            label='Documento de quien solicitó'
            value={data_form_resumen_solicitud.documento_solictante || ''}
            disabled={accion === 'ver'}
            size='small'
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            fullWidth
            disabled
            label='Nombres de quien solicitó'
            value={data_form_resumen_solicitud.nombres_solictante || ''}
            size='small'
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            fullWidth
            disabled
            label='Apellidos de quien solicitó'
            value={data_form_resumen_solicitud.apellidos_solictante || ''}
            size='small'
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} item xs={12}>
        <Grid item xs={12}>
          <Divider orientation="horizontal" variant="fullWidth" style={{ marginBlock: 'auto', width: '100%' }}>
            <Chip label="FUNCIONARIO RESPONSABLE" size="small" />
          </Divider>
        </Grid>

        <Grid item xs={12} lg={3}>
          <FormControl required size="small" fullWidth>
            <InputLabel >Tipo documento responsable</InputLabel>
            <Select
              label='Tipo documento responsable'
              value={data_form_resumen_solicitud.tipo_documento_responsable || ''}
              disabled={accion === 'ver'}
            >
              <MenuItem value="CC">Cédula de ciudadanía</MenuItem>
              <MenuItem value="RC" >Registro civil</MenuItem>
              <MenuItem value="TI" >Tarjeta de identidad</MenuItem>
              <MenuItem value="CE" >Cédula de extranjería</MenuItem>
              <MenuItem value="PA" >Pasaporte</MenuItem>
              <MenuItem value="PE" >Permiso especial de permanencia</MenuItem>
              <MenuItem value="NT" >NIT</MenuItem>
              <MenuItem value="NU" >NUIP</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            fullWidth
            label='Documento responsable'
            value={data_form_resumen_solicitud.documento_responsable || ''}
            disabled={accion === 'ver'}
            size='small'
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            fullWidth
            disabled
            label='Nombres responsable'
            value={data_form_resumen_solicitud.nombres_responsable || ''}
            size='small'
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            fullWidth
            disabled
            label='Apellidos responsable'
            value={data_form_resumen_solicitud.apellidos_responsable || ''}
            size='small'
          />
        </Grid>

        <Grid item xs={12} lg={10}>
          <TextField
            fullWidth
            multiline
            rows={1}
            label='Justificación del rechazo'
            value={data_form_resumen_solicitud.justificacion_rechazo_resp || ''}
            disabled={accion === 'ver'}
            size='small'
          />
        </Grid>

        <Grid item xs={12} lg={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disabled
              label="Fecha de aprobación"
              value={data_form_resumen_solicitud.fecha_aprobacion_resp || null}
              onChange={() => { }} // No hace nada
              renderInput={(params) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>


      <Grid container spacing={2} item xs={12}>
        <Grid item xs={12}>
          <Divider orientation="horizontal" variant="fullWidth" style={{ marginBlock: 'auto', width: '100%' }}>
            <Chip label="FUNCIONARIO OPERARIO" size="small" />
          </Divider>
        </Grid>


        <Grid item xs={12} lg={3}>
          <FormControl required size="small" fullWidth>
            <InputLabel >Tipo documento operario</InputLabel>
            <Select
              label='Tipo documento operario'
              value={data_form_resumen_solicitud.tipo_documento_operario || ''}
              disabled={accion === 'ver'}
            >
              <MenuItem value="CC">Cédula de ciudadanía</MenuItem>
              <MenuItem value="RC" >Registro civil</MenuItem>
              <MenuItem value="TI" >Tarjeta de identidad</MenuItem>
              <MenuItem value="CE" >Cédula de extranjería</MenuItem>
              <MenuItem value="PA" >Pasaporte</MenuItem>
              <MenuItem value="PE" >Permiso especial de permanencia</MenuItem>
              <MenuItem value="NT" >NIT</MenuItem>
              <MenuItem value="NU" >NUIP</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            fullWidth
            label='Documento operario'
            value={data_form_resumen_solicitud.documento_operario || ''}
            disabled={accion === 'ver'}
            size='small'
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            fullWidth
            disabled
            label='Nombres operario'
            value={data_form_resumen_solicitud.nombres_operario || ''}
            size='small'
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            fullWidth
            disabled
            label='Apellidos operario'
            value={data_form_resumen_solicitud.apellidos_operario || ''}
            size='small'
          />
        </Grid>
      </Grid>


      <Grid container spacing={2} item xs={12}>
        <Grid item xs={12}>
          <Divider orientation="horizontal" variant="fullWidth" style={{ marginBlock: 'auto', width: '100%' }}>
            <Chip label="FUNCIONARIO QUE CIERRA POR NO DISPONIBILIDAD EN ALMACÉN" size="small" />
          </Divider>
        </Grid>

        <Grid item xs={12} lg={3}>
          <FormControl required size="small" fullWidth>
            <InputLabel >Tipo documento</InputLabel>
            <Select
              label='Tipo documento'
              value={data_form_resumen_solicitud.tipo_documento_persona_cierra_no_dispo_alma || ''}
              disabled={accion === 'ver'}
            >
              <MenuItem value="CC">Cédula de ciudadanía</MenuItem>
              <MenuItem value="RC" >Registro civil</MenuItem>
              <MenuItem value="TI" >Tarjeta de identidad</MenuItem>
              <MenuItem value="CE" >Cédula de extranjería</MenuItem>
              <MenuItem value="PA" >Pasaporte</MenuItem>
              <MenuItem value="PE" >Permiso especial de permanencia</MenuItem>
              <MenuItem value="NT" >NIT</MenuItem>
              <MenuItem value="NU" >NUIP</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            fullWidth
            label='Documento: '
            value={data_form_resumen_solicitud.documento_persona_cierra_no_dispo_alma || ''}
            disabled={accion === 'ver'}
            size='small'
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            fullWidth
            disabled
            label='Nombres: '
            value={data_form_resumen_solicitud.nombres_persona_cierra_no_dispo_alma || ''}
            size='small'
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            fullWidth
            disabled
            label='Apellidos: '
            value={data_form_resumen_solicitud.apellidos_persona_cierra_no_dispo_alma || ''}
            size='small'
          />
        </Grid>

        <Grid item xs={12} lg={10}>
          <TextField
            fullWidth
            multiline
            rows={1}
            label='Observaciones del cierre: '
            value={data_form_resumen_solicitud.obser_cierre_no_dispo_alma || ''}
            disabled={accion === 'ver'}
            size='small'
          />
        </Grid>

        <Grid item xs={12} lg={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disabled
              label="Fecha de cierre:"
              value={data_form_resumen_solicitud.fecha_cierre_no_dispo_alma || null}
              onChange={() => { }} // No hace nada
              renderInput={(params) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      <Grid container spacing={2} item xs={12}>
        <Grid item xs={12}>
          <Divider orientation="horizontal" variant="fullWidth" style={{ marginBlock: 'auto', width: '100%' }}>
            <Chip label="FUNCIONARIO DE ALMACÉN QUE RECHAZA LA SOLICITUD" size="small" />
          </Divider>
        </Grid>

        <Grid item xs={12} lg={3}>
          <FormControl required size="small" fullWidth>
            <InputLabel >Tipo documento:</InputLabel>
            <Select
              label='Tipo documento:'
              value={data_form_resumen_solicitud.tipo_documento_persona_alma_rechaza || ''}
              disabled={accion === 'ver'}
            >
              <MenuItem value="CC">Cédula de ciudadanía</MenuItem>
              <MenuItem value="RC" >Registro civil</MenuItem>
              <MenuItem value="TI" >Tarjeta de identidad</MenuItem>
              <MenuItem value="CE" >Cédula de extranjería</MenuItem>
              <MenuItem value="PA" >Pasaporte</MenuItem>
              <MenuItem value="PE" >Permiso especial de permanencia</MenuItem>
              <MenuItem value="NT" >NIT</MenuItem>
              <MenuItem value="NU" >NUIP</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            fullWidth
            label='Documento: '
            value={data_form_resumen_solicitud.documento_persona_alma_rechaza || ''}
            disabled={accion === 'ver'}
            size='small'
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            fullWidth
            disabled
            label='Nombres: '
            value={data_form_resumen_solicitud.nombres_persona_alma_rechaza || ''}
            size='small'
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            fullWidth
            disabled
            label='Apellidos: '
            value={data_form_resumen_solicitud.apellidos_persona_alma_rechaza || ''}
            size='small'
          />
        </Grid>

        <Grid item xs={12} lg={10}>
          <TextField
            fullWidth
            multiline
            rows={1}
            label='Justificación del rechazo'
            value={data_form_resumen_solicitud.justificacion_rechazo_almacen || ''}
            disabled={accion === 'ver'}
            size='small'
          />
        </Grid>

        <Grid item xs={12} lg={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disabled
              label="Fecha de rechazo:"
              value={data_form_resumen_solicitud.fecha_rechazo_almacen || null}
              onChange={() => { }} // No hace nada
              renderInput={(params) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>


      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          multiline
          rows={2}
          label='Motivo'
          value={data_form_resumen_solicitud.motivo || ''}
          disabled={accion === 'ver'}
          size='small'
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          multiline
          rows={2}
          label='Observaciones'
          value={data_form_resumen_solicitud.observacion || ''}
          disabled={accion === 'ver'}
          size='small'
        />
      </Grid>

      <Grid container item xs={12} sx={{
        position: "relative",
        background: "#FAFAFA",
        borderRadius: "15px",
        p: "40px",
        my: "20px",
        boxShadow: "0px 3px 6px #042F4A26",
      }}>
        <Title title="Artículos solicitados" />
        <TablaArticulosSolicitados
          articulos_solicitados={data_form_resumen_solicitud.items_solicitud}
        />
      </Grid>

      <ResumenDespacho
        inputs_resumen_despacho={inputs_resumen_despacho}
        data_articulos_despachados={data_articulos_despachados}
      />
    </>
  );
}


// eslint-disable-next-line no-restricted-syntax
export default ResumenSolicitud;