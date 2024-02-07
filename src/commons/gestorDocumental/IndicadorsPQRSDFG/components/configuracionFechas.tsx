/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, TextField } from "@mui/material";
import { PorcentajeContext } from "../context/porcentasjesGraficas";
import { useContext } from "react";
import { TuModalInformatico } from "./ModalInfo";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfiguracionFechas = () => {
  // Obtener el contexto
  const { porcentaje, setPorcentaje } = useContext(PorcentajeContext);

  // Manejar cambios en los campos de fecha
  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setPorcentaje((prevPorcentaje) => ({
      ...prevPorcentaje,
      [field]: event.target.value,
    }));
  };

  return (
    <Grid container justifyContent="flex-start" alignItems="center" spacing={3}>
    <Grid item xs={2}>
      <TuModalInformatico />
    </Grid>
  
    <Grid item xs={4}>
      <TextField
        fullWidth
        type="date"
        size="small"
        variant="outlined"
        value={porcentaje.fecha_radicado_desde}
        label="Fecha de Inicio"
        style={{ marginTop: 15, width: "90%" }}
        InputLabelProps={{ shrink: true }}
        onChange={handleChange("fecha_radicado_desde")}
      />
    </Grid>
    <Grid item xs={4}>
      <TextField
        fullWidth
        type="date"
        size="small"
        variant="outlined"
        value={porcentaje.fecha_radicado_hasta}
        label="Fecha de Fin"
        style={{ marginTop: 15, width: "90%" }}
        InputLabelProps={{ shrink: true }}
        onChange={handleChange("fecha_radicado_hasta")}
      />
    </Grid>
  </Grid>
  
  );
};
