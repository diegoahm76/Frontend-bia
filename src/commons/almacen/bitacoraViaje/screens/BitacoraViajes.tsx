import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Title } from "../../../../components";
import SearchIcon from "@mui/icons-material/Search";
import TableBitacoraViajes from "../tables/TableBitacoraViajes";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import GenerarBitacora from "./GenerarBitacora";
import { useAppDispatch } from "../../../../hooks";
import { interface_agendamientos_bitacora, response_agendamientos_bitacora } from "../interfaces/types";
import { control_error } from "../../../../helpers";
import { buscar_agendamientos } from "../thunks/bitacora_viajes";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';


// eslint-disable-next-line @typescript-eslint/naming-convention
const BitacoraViajes: React.FC = () => {
  const dispatch = useAppDispatch();
  const [mostrar_generar_bitacora, set_mostrar_generar_bitacora] = useState<boolean>(false);

  const [fecha_inicio, set_fecha_inicio] = useState<Dayjs | null>(null);
  const [fecha_fin, set_fecha_fin] = useState<Dayjs | null>(null);
  const [estado, set_estado] = useState<string>("");
  const [msj_error_estado, set_msj_error_estado] = useState<string>("");
  const [data_table_bitacora, set_data_table_bitacora] = useState<interface_agendamientos_bitacora[]>(Object);
   
  const [data_solicitud_agendada, set_data_solicitud_agendada] = useState<interface_agendamientos_bitacora>(Object);

  const [refrescar_tabla, set_refrescar_tabla] = useState<boolean>(false);

  /**
   * Funcion para buscar los agendamientos y listarlos en la tabla
   * @returns void
   */
  const buscar_agendamientos_fc: () => void = () => {
    dispatch(buscar_agendamientos(
      fecha_inicio?.format('YYYY-MM-DD') ?? '',
      fecha_fin?.format('YYYY-MM-DD')  ?? '',
      estado
      ))
      .then((response: response_agendamientos_bitacora) => {
        if (response.data.length !== 0) {
          set_data_table_bitacora(response.data);
        } else {
          control_error('No se encontraron agendamientos');
          set_data_table_bitacora([]);
        }
      })
      .catch((error: any) => {
        console.error(error);
      })
  }


  /**
   * useEffect para buscar los agendamientos al cargar la pantalla solo una vez onc useRef
   * @returns void
   */
  const agenmientos_bitacora_obtenidos = useRef(false);
  useEffect(()=>{
    if (!agenmientos_bitacora_obtenidos.current) {
      buscar_agendamientos_fc();
      agenmientos_bitacora_obtenidos.current = true;
    }
  },[refrescar_tabla])

  const cambio_fecha_inicio = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_inicio(date);
    }
  };

  const cambio_fecha_fin = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_fin(date);
    }
  };

  const cambio_estado: (event: SelectChangeEvent) => void = (
    e: SelectChangeEvent
  ) => {
    set_estado(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_estado("");
  };

  const limpiar_filtros = () => {
    set_fecha_inicio(null)
    set_fecha_fin(null)
    set_estado('')
  }

  const consultar_solicitudes = () => {
    buscar_agendamientos_fc();
  }

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
          p: "40px",
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
          <Grid item xs={12} md={2}>
            <FormControl required size="small" fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                fullWidth
                label="Estado"
                value={estado}
                onChange={cambio_estado}
                error={msj_error_estado !== ""}
              >
                <MenuItem value={"AC"}>Activo</MenuItem>
                <MenuItem value={"FI"}>Finalizado</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
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
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={2}>
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
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={consultar_solicitudes}
            >
              Buscar
            </Button>
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              startIcon={<CleaningServicesIcon />}
              onClick={limpiar_filtros}
            >
              Limpiar
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
              set_data_solicitud_agendada={set_data_solicitud_agendada}
              data_table_bitacora={data_table_bitacora}
              set_mostrar_generar_bitacora={set_mostrar_generar_bitacora}/>
          </Grid>
        </Grid>

        {mostrar_generar_bitacora &&
          <GenerarBitacora
            refrescar_tabla={refrescar_tabla }
            set_refrescar_tabla={set_refrescar_tabla}
            data_solicitud_agendada={data_solicitud_agendada}
            set_mostrar_generar_bitacora={set_mostrar_generar_bitacora}
          />
        }

      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default BitacoraViajes;
