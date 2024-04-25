import { FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { interface_inputs_resumen_solicitud } from '../interfaces/types';
import { parseHora } from '../thunks/autorizar_solicitud_viajes';
import TitleDivider from '../../despacho_activos/components/TitleDivider';
import TablaPersonasViajan from '../tables/TablaPersonasViajan';
import { Title } from '../../../../components';
import dayjs from 'dayjs';


interface props {
  inputs_resumen_solicitud: interface_inputs_resumen_solicitud;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ResumenSolicitud: FC<props> = ({
  inputs_resumen_solicitud,
}) => {
  const [municipios, set_municipios] = useState<any>();
  const [departamentos, set_departamentos] = useState<any>();


  return (
    <>

      <TitleDivider title="INFORMACION GENERAL" />

      <Grid item xs={12} lg={3}>
        <TextField
          label='Estado solicitud:'
          disabled
          fullWidth
          size="small"
          value={inputs_resumen_solicitud.estado_solicitud ?? ''}
          onChange={() => { }}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          label='Nro pasajeros:'
          disabled
          fullWidth
          size="small"
          value={inputs_resumen_solicitud.nro_pasajeros ?? 0}
          onChange={() => { }}
        />
      </Grid>

      <Grid item xs={12} lg={3} sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      >
        <Grid item sx={{
          display: 'flex',
          justifyContent: 'start'
        }}>
          <FormLabel htmlFor="requiere_recarga">¿Requiere carga?</FormLabel>
        </Grid>
        <Switch
          id="requiere_recarga"
          checked={inputs_resumen_solicitud.requiere_carga ?? false}
          disabled
          onChange={() => { }}
        />
      </Grid>

      <Grid item xs={12} lg={3} sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      >
        <Grid item sx={{
          display: 'flex',
          justifyContent: 'start'
        }}>
          <FormLabel style={{ textAlign: 'start' }} htmlFor="requiere_compania_militar">
            ¿Requiere acompañamiento militar?
          </FormLabel>
        </Grid>
        <Switch
          id="requiere_compania_militar"
          disabled
          checked={inputs_resumen_solicitud.requiere_compagnia_militar ?? false}
          onChange={() => { }}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Fecha partida:"
            value={dayjs(inputs_resumen_solicitud.fecha_partida ?? null)}
            onChange={() => { }}
            disabled
            renderInput={(params) => (
              <TextField fullWidth size="small" {...params} />
            )}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item xs={12} lg={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileTimePicker
            label="Hora de partida"
            openTo="hours"
            disabled
            value={parseHora(inputs_resumen_solicitud.hora_partida ?? '00:00:00')}
            onChange={() => { }}
            renderInput={(params) => (
              <TextField fullWidth {...params} disabled variant="standard" helperText="" />
            )}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item xs={12} lg={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Fecha retorno:"
            value={dayjs(inputs_resumen_solicitud.fecha_retorno ?? null)}
            onChange={() => { }}
            disabled
            renderInput={(params) => (
              <TextField fullWidth size="small" {...params} />
            )}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item xs={12} lg={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileTimePicker
            label="Hora de retorno"
            openTo="hours"
            disabled
            value={parseHora(inputs_resumen_solicitud.hora_retorno ?? '00:00:00')}
            onChange={() => { }}
            renderInput={(params) => (
              <TextField fullWidth {...params} disabled variant="standard" helperText="" />
            )}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item xs={12} lg={inputs_resumen_solicitud.fecha_rechazo ? 4 : 6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Fecha solicitud:"
            value={dayjs(inputs_resumen_solicitud.fecha_solicitud ?? null)}
            onChange={() => { }}
            disabled
            renderInput={(params) => (
              <TextField fullWidth size="small" {...params} />
            )}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item xs={12} lg={inputs_resumen_solicitud.fecha_rechazo ? 4 : 6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Fecha aprobacion responsable:"
            value={dayjs(inputs_resumen_solicitud.fecha_aprobacion_responsable ?? null)}
            onChange={() => { }}
            disabled
            renderInput={(params) => (
              <TextField fullWidth size="small" {...params} />
            )}
          />
        </LocalizationProvider>
      </Grid>

      {inputs_resumen_solicitud.fecha_rechazo &&
        <Grid item xs={12} lg={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha rechazo:"
              value={dayjs(inputs_resumen_solicitud.fecha_rechazo ?? null)}
              onChange={() => { }}
              disabled
              renderInput={(params) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>
      }

      <Grid item xs={12} lg={6}>
        <TextField
          label='Dirección:'
          disabled
          fullWidth
          size="small"
          value={inputs_resumen_solicitud.direccion ?? ''}
          onChange={() => { }}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <TextField
          label='Indicaciones destino:'
          disabled
          fullWidth
          size="small"
          value={inputs_resumen_solicitud.indicaciones_destino ?? ''}
          onChange={() => { }}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <TextField
          label='Consideraciones adicionales:'
          disabled
          fullWidth
          size="small"
          value={inputs_resumen_solicitud.consideraciones_adicionales ?? ''}
          onChange={() => { }}
        />
      </Grid>

      <Grid item xs={12} lg={3} sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      >
        <FormControl required size="small" fullWidth>
          <InputLabel>Departamento:</InputLabel>
          <Select
            fullWidth
            label="Departamento:"
            disabled
            value={inputs_resumen_solicitud.cod_departamento ?? ''}
            required
            onChange={() => { }}
          >
            {departamentos?.map(([cod_departamento, nombre]: [string, string]) => (
              <MenuItem key={cod_departamento} value={cod_departamento}>
                {nombre}
              </MenuItem>
            ))
            }
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} lg={3} sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      >
        <FormControl required size="small" fullWidth>
          <InputLabel>Municipio:</InputLabel>
          <Select
            fullWidth
            label="Municipio:"
            disabled
            value={inputs_resumen_solicitud.cod_municipio ?? ''}
            required
            onChange={() => { }}
          >
            {municipios?.map(([codigo_municipio, nombre]: [string, string]) => (
              <MenuItem key={codigo_municipio} value={codigo_municipio}>
                {nombre}
              </MenuItem>
            ))
            }
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} lg={12}>
        <TextField
          label='Motivo viaje:'
          disabled
          fullWidth
          size="small"
          value={inputs_resumen_solicitud.motivo_viaje ?? ''}
          onChange={() => { }}
        />
      </Grid>

      {inputs_resumen_solicitud.justificacion_rechazo &&
        <Grid item xs={12} lg={12}>
          <TextField
            label='Justificación de rechazo:'
            disabled
            fullWidth
            size="small"
            value={inputs_resumen_solicitud.justificacion_rechazo ?? ''}
            onChange={() => { }}
          />
        </Grid>
      }

      <TitleDivider title="AGENDAMIENTO - VEHÍCULO - CONDUCTOR" />

      <Grid item xs={12} lg={4}>
        <TextField
          label='Tipo documento:'
          disabled
          fullWidth
          size="small"
          value={inputs_resumen_solicitud.tipo_documento ?? ''}
          onChange={() => { }}
        />
      </Grid>

      <Grid item xs={12} lg={4}>
        <TextField
          label='Numero documento:'
          disabled
          fullWidth
          size="small"
          value={inputs_resumen_solicitud.numero_documento ?? ''}
          onChange={() => { }}
        />
      </Grid>

      <Grid item xs={12} lg={4}>
        <TextField
          label='Telefono celular empresa:'
          disabled
          fullWidth
          size="small"
          value={inputs_resumen_solicitud.telefono_celular_empresa ?? ''}
          onChange={() => { }}
        />
      </Grid>

      <Grid item xs={12} lg={4}>
        <TextField
          label='Nombre conductor:'
          disabled
          fullWidth
          size="small"
          value={inputs_resumen_solicitud.nombre_conductor ?? ''}
          onChange={() => { }}
        />
      </Grid>

      <Grid item xs={12} lg={4}>
        <TextField
          label='Apellido conductor:'
          disabled
          fullWidth
          size="small"
          value={inputs_resumen_solicitud.apellido_conductor ?? ''}
          onChange={() => { }}
        />
      </Grid>

      <Grid item xs={12} lg={4}>
        <TextField
          label='Email empresarial:'
          disabled
          fullWidth
          size="small"
          value={inputs_resumen_solicitud.email_empresarial ?? ''}
          onChange={() => { }}
        />
      </Grid>

      <Grid item xs={12} lg={4}>
        <TextField
          label='Nombre vehículo:'
          disabled
          fullWidth
          size="small"
          value={inputs_resumen_solicitud.nombre_vehiculo ?? ''}
          onChange={() => { }}
        />
      </Grid>

      <Grid item xs={12} lg={4}>
        <TextField
          label='Placa:'
          disabled
          fullWidth
          size="small"
          value={inputs_resumen_solicitud.placa ?? ''}
          onChange={() => { }}
        />
      </Grid>

      <Grid item xs={12} lg={4}>
        <TextField
          label='Marca:'
          disabled
          fullWidth
          size="small"
          value={inputs_resumen_solicitud.marca ?? ''}
          onChange={() => { }}
        />
      </Grid>

      <Grid item xs={12} lg={8}>
        <TextField
          label='Nombre persona autoriza:'
          disabled
          fullWidth
          size="small"
          value={inputs_resumen_solicitud.nombre_persona_autoriza ?? ''}
          onChange={() => { }}
        />
      </Grid>

      <Grid item xs={12} lg={4}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Fecha autorización:"
            value={dayjs(inputs_resumen_solicitud.fecha_autorizacion ?? null)}
            onChange={() => { }}
            disabled
            renderInput={(params) => (
              <TextField fullWidth size="small" {...params} />
            )}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item xs={12} lg={12}>
        <TextField
          label='Observación autorización:'
          disabled
          fullWidth
          size="small"
          value={inputs_resumen_solicitud.observacion_autorizacion ?? ''}
          onChange={() => { }}
        />
      </Grid>

      <Grid item xs={12} lg={2.4}>
        <TextField
          label='Estado agendamiento:'
          disabled
          fullWidth
          size="small"
          value={inputs_resumen_solicitud.estado_agendamieto === 'AC' ? 'Activo' : 'Finalizado'}
          onChange={() => { }}
        />
      </Grid>

      <Grid item xs={12} lg={2.4}>
        <TextField
          label='Viaje autorizado:'
          disabled
          fullWidth
          size="small"
          value={inputs_resumen_solicitud.viaje_autorizado ? 'Si' : 'No'}
          onChange={() => { }}
        />
      </Grid>

      <Grid item xs={12} lg={2.4}>
        <TextField
          label='Ya inicio viaje:'
          disabled
          fullWidth
          size="small"
          value={inputs_resumen_solicitud.ya_inicio ? 'Si' : 'No'}
          onChange={() => { }}
        />
      </Grid>

      <Grid item xs={12} lg={2.4}>
        <TextField
          label='Ya llego viaje:'
          disabled
          fullWidth
          size="small"
          value={inputs_resumen_solicitud.ya_llego ? 'Si' : 'No'}
          onChange={() => { }}
        />
      </Grid>

      <Grid item xs={12} lg={2.4}>
        <TextField
          label='Ya se realizó inspección:'
          disabled
          fullWidth
          size="small"
          value={inputs_resumen_solicitud.realizo_inspeccion ? 'Si' : 'No'}
          onChange={() => { }}
        />
      </Grid>

      {!inputs_resumen_solicitud.viaje_autorizado &&
        <Grid item xs={12} lg={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha no autorizado:"
              value={inputs_resumen_solicitud.fecha_no_autorizado ?? null}
              onChange={() => { }}
              disabled
              renderInput={(params) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>
      }

      <Grid container spacing={2} marginTop={5} sx={{
        boxSizing: "border-box",
        position: "relative",
        background: "#FAFAFA",
        borderRadius: "15px",
        p: "40px",
        mb: "20px",
        boxShadow: "0px 3px 6px #042F4A26",
      }}
      >
        <Title title='Personas que viajan' />

        <TablaPersonasViajan
          data_personas_viajan={inputs_resumen_solicitud.personas_solicitud_viaje}
        />
      </Grid>


    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default ResumenSolicitud;