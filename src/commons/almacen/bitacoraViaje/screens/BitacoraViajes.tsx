import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  InputLabel,
  FormLabel,
  Switch
} from "@mui/material";
import React, { useState } from "react";
import { Title } from "../../../../components";
import SearchIcon from "@mui/icons-material/Search";
import TableBitacoraViajes from "../tables/TableBitacoraViajes";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import GenerarBitacora from "./GenerarBitacora";
import { interface_data_bitacora } from "../interfaces/types";


// eslint-disable-next-line @typescript-eslint/naming-convention
const BitacoraViajes: React.FC = () => {
  const [mostrar_generar_bitacora, set_mostrar_generar_bitacora] = useState<boolean>(false);
  const [mostrar_busqueda_vehiculos, set_mostrar_busqueda_vehiculos] = useState<boolean>(false);
  const [fecha_inicio, set_fecha_inicio] = useState<Dayjs>(dayjs());
  const [msj_error_fecha_inicio, set_msj_error_fecha_inicio] = useState<string>("");
  const [fecha_fin, set_fecha_fin] = useState<Dayjs>(dayjs());
  const [msj_error_fecha_fin, set_msj_error_fecha_fin] = useState<string>("");
  const [estado, set_estado] = useState<string>("");
  const [msj_error_estado, set_msj_error_estado] = useState<string>("");
  const [es_conductor_asignado, set_es_conductor_asignado] = useState<boolean>(false);
  const [dato_fila_tabla, set_dato_fila_tabla] = useState<interface_data_bitacora>({
    municipioDestino: '',
    conductorAsignado: '',
    fechaSalida: '',
    horaSalida: '',
    fechaRetorno: '',
    horaRetorno: ''
  });

  //Podemos formatear la fecha guardada en el estado de esta manera
  //let fecha_formateada = fecha_inicio.format("YYYY-MM-DD");

  const cambio_fecha_inicio = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_inicio(date);
      set_msj_error_fecha_inicio("");
    } else {
      set_msj_error_fecha_inicio("El campo Fecha inicio es obligatorio.");
    }
  };

  const cambio_fecha_fin = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_fin(date);
      set_msj_error_fecha_fin("");
    } else {
      set_msj_error_fecha_fin("El campo Fecha inicio es obligatorio.");
    }
  };

  const cambio_estado: (event: SelectChangeEvent) => void = (
    e: SelectChangeEvent
  ) => {
    set_estado(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_estado("");
  };


  return (
    <>
      <Grid
        container
        spacing={2}
        marginTop={2}
        width={"100%"}
        sx={{
          position: "relative",
          background: "#FAFAFA",
          boxShadow: "0px 3px 6px #042F4A26",
          borderRadius: "15px",
          margin: "auto",
          p: "20px",
          mb: "20px",
        }}
      >
        <Title title="Bitácora de viajes" />

        <Grid
          container
          sx={{
            marginTop: "10px",
          }}
          spacing={1}
        >
          <Grid item xs={2}>
            <FormControl required size="small" fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                label="Estado"
                value={estado}
                onChange={cambio_estado}
                error={msj_error_estado !== ""}
              >
                <MenuItem value={"activo"}>Activo</MenuItem>
                <MenuItem value={"finalizado"}>Finalizado</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Desde:"
                value={fecha_inicio}
                onChange={(newValue) => {
                  cambio_fecha_inicio(newValue);
                }}
                renderInput={(params) => (
                  <TextField fullWidth size="small" {...params} />
                )}
                minDate={dayjs()}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Hasta:"
                value={fecha_fin}
                onChange={(newValue) => {
                  cambio_fecha_fin(newValue);
                }}
                renderInput={(params) => (
                  <TextField fullWidth size="small" {...params} />
                )}
                minDate={dayjs()}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={2}>
            <Button
              color="primary"
              variant="contained"
              startIcon={<SearchIcon />}
            >
              Buscar
            </Button>
          </Grid>

          <Grid
            item
            container
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TableBitacoraViajes 
              set_dato_fila_tabla={set_dato_fila_tabla}
              set_mostrar_generar_bitacora={set_mostrar_generar_bitacora}/>
          </Grid>
        </Grid>

        {mostrar_generar_bitacora &&
          <GenerarBitacora dato_fila_tabla={dato_fila_tabla} set_mostrar_generar_bitacora={set_mostrar_generar_bitacora} />
        }

      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default BitacoraViajes;
