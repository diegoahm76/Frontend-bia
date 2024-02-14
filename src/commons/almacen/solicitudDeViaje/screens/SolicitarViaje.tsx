import { Button, FormControl, FormLabel, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Switch, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import SaveIcon from '@mui/icons-material/Save';
import CleanIcon from '@mui/icons-material/CleaningServices';
import ClearIcon from '@mui/icons-material/Clear';
import { props_solicitar_viaje } from '../interfaces/types';
import ViajeAgendado from './ViajeAgendado';


// eslint-disable-next-line @typescript-eslint/naming-convention
const SolicitarViaje: React.FC<props_solicitar_viaje> = ({set_mostrar_solicitud_viaje}) => {
  const [switch_expediente_asociado, set_switch_expediente_asociado] = useState<boolean>(false);
  const [departamento, set_departamento] = useState<string>("");
  const [msj_error_departamento, set_msj_error_departamento] = useState<string>("");
  const [municipio, set_municipio] = useState<string>("");
  const [msj_error_municipio, set_msj_error_municipio] = useState<string>("");
  const [numero_pasajeros, set_numero_pasajeros] = useState<string>("");
  const [mensaje_error_numero_pasajeros, set_mensaje_error_numero_pasajeros] = useState<string>("");
  const [fecha_salida, set_fecha_salida] = useState<Dayjs>(dayjs());
  const [msj_error_fecha_salida, set_msj_error_fecha_salida] = useState<string>("");
  const [fecha_retorno, set_fecha_retorno] = useState<Dayjs>(dayjs());
  const [msj_error_fecha_retorno, set_msj_error_fecha_retorno] = useState<string>("");
  const [hora_salida, set_hora_salida] = useState<Date | null>(new Date());
  const [hora_retorno, set_hora_retorno] = useState<Date | null>(new Date());
  const [switch_requiere_carga, set_switch_requiere_carga] = useState<boolean>(false);
  const [ switch_requiere_acompanamiento_militar, set_switch_requiere_acompanamiento_militar] = useState<boolean>(false);

  const cambio_fecha_salida = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_salida(date);
      set_msj_error_fecha_salida("");
    } else {
      set_msj_error_fecha_salida("El campo Fecha inicio es obligatorio.");
    }
  };

  const cambio_fecha_retorno = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_retorno(date);
      set_msj_error_fecha_retorno("");
    } else {
      set_msj_error_fecha_retorno("El campo Fecha inicio es obligatorio.");
    }
  };

  const cambio_departamento: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_departamento(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_departamento("");
  };

  const cambio_municipio: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_municipio(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_municipio("");
  };

  const cambio_numero_pasajeros: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_numero_pasajeros(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_mensaje_error_numero_pasajeros("");
  };

  const cambio_hora_salida = (newTime: Date | null) => {
    set_hora_salida(newTime);
  };

  const cambio_hora_retorno = (newTime: Date | null) => {
    set_hora_retorno(newTime);
  };

  return (
    <Grid
      container
      spacing={2}
      marginTop={2}
      sx={{
        position: "relative",
        background: "#FAFAFA",
        borderRadius: "15px",
        p: "20px",
        mb: "20px",
        boxShadow: "0px 3px 6px #042F4A26",
      }}
    >
      <Title title="Solicitar viaje" />
      <Grid
        container
        sx={{
          marginTop: "10px",
        }}
        spacing={2}
      >
        <Grid item xs={12} sx={{
          display:'flex',
          flexDirection:'column',
          alignItems:'start'
        }}>
          <FormLabel htmlFor="motivo_viaje">Motivo del viaje*:</FormLabel>
          <TextField
            id="motivo_viaje"
            required
            fullWidth
            placeholder="Escriba aqui el motivo de viaje"
            size="small"
            multiline
            rows={2}
          />
        </Grid>

        <Grid
          item
          container
          xs={12}
          display={"flex"}
          justifyContent={"center"}
          margin={"10px 0px"}
        >
          <Grid item xs={3}>
            <FormLabel htmlFor="expediente_asociado">
              ¿Tiene Expediente asociado?
            </FormLabel>
            <Switch
              id="expediente_asociado"
              checked={switch_expediente_asociado}
              onChange={() =>
                set_switch_expediente_asociado(!switch_expediente_asociado)
              }
            />
          </Grid>

          <Grid
            item
            xs={5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <FormLabel htmlFor="buscar_expediente">
              Buscar expediente:
            </FormLabel>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id="buscar_expediente"
                required
                placeholder="Buscar"
                size="small"
              />
            </Grid>
            <SearchIcon style={{ width: "40px", cursor: "pointer" }} />
          </Grid>

          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <FormLabel htmlFor="buscar_expediente">Dirección*:</FormLabel>
            <Grid item xs={10}>
              <TextField
                fullWidth
                id="buscar_expediente"
                required
                size="small"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControl required size="small" fullWidth>
              <InputLabel>Departamento</InputLabel>
              <Select
                label="Estado"
                value={departamento}
                required
                onChange={cambio_departamento}
                error={msj_error_departamento !== ""}
              >
                <MenuItem value={"En espera"}>Meta</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControl required size="small" fullWidth>
              <InputLabel>Municipio</InputLabel>
              <Select
                label="Estado"
                value={municipio}
                required
                onChange={cambio_municipio}
                error={msj_error_municipio !== ""}
              >
                <MenuItem value={"En espera"}>Villavicencio</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <FormLabel htmlFor="buscar_expediente">
              Idicadores de destino:
            </FormLabel>
            <Grid item xs={6}>
              <TextField fullWidth id="buscar_expediente" size="small" />
            </Grid>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormLabel sx={{ marginRight: "10px" }} htmlFor="numero_pasajeros">
              Número de pasajeros*:
            </FormLabel>
            <OutlinedInput
              sx={{ width: "60px" }}
              id="numero_pasajeros"
              type={"number"}
              value={numero_pasajeros}
              size="small"
              onChange={cambio_numero_pasajeros}
              error={mensaje_error_numero_pasajeros !== ""}
              placeholder={"0"}
            />
          </Grid>
        </Grid>

        <Grid
          item
          container
          xs={11}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
            marginX: "auto",
          }}
        >
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormLabel style={{ width: "70%" }}>Fecha de salida*:</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Desde:"
                value={fecha_salida}
                onChange={(newValue) => {
                  cambio_fecha_salida(newValue);
                }}
                renderInput={(params) => (
                  <TextField required fullWidth size="small" {...params} />
                )}
                minDate={dayjs()}
              />
            </LocalizationProvider>
          </Grid>

          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormLabel style={{ marginRight: "10px" }}>Hora*:</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker
                label="Seleccionar hora"
                openTo="hours"
                value={hora_salida}
                onChange={cambio_hora_salida}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" helperText="" />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid
            item
            xs={3.5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Grid item xs={6} sx={{
              display:'flex',
              justifyContent:'start'
            }}>
              <FormLabel htmlFor="requiere_recarga">¿Requiere Carga?</FormLabel>
            </Grid>
            <Switch
              id="requiere_recarga"
              checked={switch_requiere_carga}
              onChange={() => set_switch_requiere_carga(!switch_requiere_carga)}
            />
          </Grid>
        </Grid>

        <Grid
          item
          container
          xs={11}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
            marginX: "auto",
          }}
        >
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormLabel style={{ width: "70%" }}>Fecha de retorno*:</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Desde:"
                value={fecha_retorno}
                onChange={(newValue) => {
                  cambio_fecha_retorno(newValue);
                }}
                renderInput={(params) => (
                  <TextField required fullWidth size="small" {...params} />
                )}
                minDate={dayjs()}
              />
            </LocalizationProvider>
          </Grid>

          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormLabel style={{ marginRight: "10px" }}>Hora*:</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker
                label="Seleccionar hora"
                openTo="hours"
                value={hora_retorno}
                onChange={cambio_hora_retorno}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" helperText="" />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid
            item
            xs={3.5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Grid item xs={12} sx={{
              display:'flex',
              justifyContent:'start'
            }}>
              <FormLabel style={{textAlign:'start'}} htmlFor="requiere_compania_militar">
                ¿Requiere acompañamiento Militar?
              </FormLabel>
            </Grid>
            <Switch
              id="requiere_compania_militar"
              checked={switch_requiere_acompanamiento_militar}
              onChange={() =>
                set_switch_requiere_acompanamiento_militar(
                  !switch_requiere_acompanamiento_militar
                )
              }
            />
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            gap: 2,
          }}
        >
          <FormLabel htmlFor="consideraciones_adicionales">
            Consideraciones adicionales:
          </FormLabel>
          <Grid item xs={9.5}>
            <TextField
              fullWidth
              id="consideraciones_adicionales"
              size="small"
            />
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            marginTop: "20px",
            gap: 4,
          }}
        >
          <Button
            color="success"
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={() => {}}
          >
            {"Guardar"}
          </Button>
          <Button
            color="error"
            variant="contained"
            startIcon={<ClearIcon />}
            onClick={() => {
              set_mostrar_solicitud_viaje(false);
            }}
          >
            Salir
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            startIcon={<CleanIcon />}
            onClick={() => {}}
          >
            Limpiar
          </Button>
        </Grid>
      </Grid>

      <ViajeAgendado />

      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Button
          color="error"
          variant="contained"
          startIcon={<ClearIcon />}
          onClick={() => {
            set_mostrar_solicitud_viaje(false);
          }}
        >
          Salir
        </Button>
      </Grid>
    </Grid>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SolicitarViaje;
