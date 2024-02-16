import { Button, FormLabel, Grid, Switch, TextField } from "@mui/material";
import { Title } from "../../../../components";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";
import CleanIcon from "@mui/icons-material/CleaningServices";
import ClearIcon from "@mui/icons-material/Clear";
import { interface_data_bitacora } from "../interfaces/types";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Props {
  set_mostrar_generar_bitacora: (value: boolean)=>void;
  dato_fila_tabla: interface_data_bitacora;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const GenerarBitacora: React.FC<Props> = ({set_mostrar_generar_bitacora,dato_fila_tabla}) => {
  const [es_conductor_asignado, set_es_conductor_asignado] = useState<boolean>(false);
  const [conductor, set_conductor] = useState<string>('');
  const [fecha_inicio, set_fecha_inicio] = useState<Dayjs>(dayjs());
  const [msj_error_fecha_inicio, set_msj_error_fecha_inicio] = useState<string>("");

  const cambio_fecha_inicio = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_inicio(date);
      set_msj_error_fecha_inicio("");
    } else {
      set_msj_error_fecha_inicio("El campo Fecha inicio es obligatorio.");
    }
  };

  useEffect(()=>{
    set_conductor(dato_fila_tabla.conductorAsignado);
  },[dato_fila_tabla]);

  console.log(dato_fila_tabla);

  return (
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
      <Title title="Generar bitácora" />

      <Grid
        item
        container
        xs={12}
        display={"flex"}
        justifyContent={"center"}
        margin={"10px 0px"}
      >
        <Grid item xs={6}>
          <FormLabel htmlFor="es_conductor_asignado">
            ¿El conductor que sale es el asignado?
          </FormLabel>
          <Switch
            id="es_conductor_asignado"
            checked={es_conductor_asignado}
            onChange={() =>
              set_es_conductor_asignado(!es_conductor_asignado)
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
          <FormLabel htmlFor="conductor">
            Conductor:
          </FormLabel>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="conductor"
              value={conductor}
              onChange={(e)=>set_conductor(e.target.value)}
              required
              placeholder="Juan Pablo"
              size="small"
            />
          </Grid>
          <SearchIcon style={{ width: "40px", cursor: "pointer" }} />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid item container xs={12} sx={{
          display:'flex',
          alignItems:'center',
          gap:'10px'
        }}>
          <FormLabel htmlFor="novedad_salida">Fecha de salida:</FormLabel>
          <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
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
        </Grid>

        <Grid xs={12} sx={{display:'flex',flexDirection:'column', marginTop:'10px', marginBottom:'20px'}}>
          <FormLabel htmlFor="novedad_salida">Novedad de salida:</FormLabel>
          <TextField
            id="novedad_salida"
            required
            fullWidth
            placeholder="Escriba si presenta alguna novedad"
            size="small"
            multiline
            rows={3}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid item container xs={12} sx={{
          display:'flex',
          alignItems:'center',
          gap:'10px'
        }}>
          <FormLabel htmlFor="novedad_salida">Fecha de llegada:</FormLabel>
          <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
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
        </Grid>

        <Grid xs={12} sx={{display:'flex',flexDirection:'column', marginTop:'10px', marginBottom:'20px'}}>
          <FormLabel htmlFor="novedad_llegada">Novedad de llegada:</FormLabel>
          <TextField
            id="novedad_llegada"
            required
            fullWidth
            placeholder="Escriba si presenta alguna novedad"
            size="small"
            multiline
            rows={3}
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
            set_mostrar_generar_bitacora(false);
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
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default GenerarBitacora;