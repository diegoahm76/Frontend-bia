/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, TextField } from "@mui/material";
import { Title } from "../../../../components";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from "react";

interface props {
  vehiculo_placa: string;
  nro_documento: string;
}

const VehiculoAgendadoView: React.FC<props> = ({vehiculo_placa, nro_documento}) => {
  const [fecha_salida, set_fecha_salida] = useState<Dayjs>(dayjs());
  const [msj_error_fecha_salida, set_msj_error_fecha_salida] = useState<string>("");
  const [fecha_retorno, set_fecha_retorno] = useState<Dayjs>(dayjs());
  const [msj_error_fecha_retorno, set_msj_error_fecha_retorno] = useState<string>("");

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

  return (
    <>
      <Grid
        container
        spacing={2}
        marginTop={2}
        width={'100%'}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          boxShadow: '0px 3px 6px #042F4A26',
          borderRadius: '15px',
          margin: 'auto',
          p: '20px',
          mb: '20px',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          gap:'20px'
        }}
      > 
        <Title title="Vehículos y conductores asignados" />
        <Grid
          container
          spacing={1}
          marginTop={2}
          sx={{
            position: 'relative',
            background: '#FAFAFA',
            boxShadow: '0px 3px 6px #042F4A26',
            borderRadius: '10px',
            margin: 'auto',
            p: '20px',
            mb: '20px',
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center'
          }}
          >
            <Grid xs={12} md={2}>
              <b>Vehículo:</b>
              <p>{vehiculo_placa}</p>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              sx={{
              display: "flex",
              justifyContent: "center",
                alignItems: "center",
              }}
              >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Fecha de salida*:'
                  value={fecha_salida}
                  minDate={dayjs()}
                  onChange={(newValue) => {
                    cambio_fecha_salida(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField required fullWidth size="small" {...params} />
                  )}
                  />
              </LocalizationProvider>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Fecha de retorno*:'
                  value={fecha_retorno}
                  minDate={dayjs()}
                  onChange={(newValue) => {
                    cambio_fecha_retorno(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField required fullWidth size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid xs={12} md={2}>
              <b>Conductor:</b>
              <p>{nro_documento}</p>
            </Grid>
                                
            <DeleteForeverIcon sx={{fontSize:'40px', color:'#d32f2f', cursor:'pointer'}}/>                                         
        </Grid>
      </Grid>
    </>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default VehiculoAgendadoView;