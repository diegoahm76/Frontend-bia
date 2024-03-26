/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from "react";
import { interface_vehiculo_agendado_conductor } from "../interfaces/types";
import { Title } from "../../../../components";
import ClearIcon from "@mui/icons-material/Clear";
import { Button } from "@mui/material";


interface props {
  fecha_inicio_input: string;
  fecha_fin_input: string;
  id_borrar: string;
  set_vehiculo_agendado_conductor: React.Dispatch<React.SetStateAction<interface_vehiculo_agendado_conductor[]>>;
  vehiculo_agendado_conductor: interface_vehiculo_agendado_conductor[];
  nombre_vehiculo: string;
  vehiculo_placa: string;
  marca_vehiculo: string;
  tipo_vehiculo: string;
  capacidad_pasajeros: number;
  color_vehiculo: string;
  nro_documento: string;
  nombre_conductor: string;
  telefono_conductor: string;
  tipo_conductor: string;
}

const VehiculoAgendadoView: React.FC<props> = ({fecha_inicio_input,
  fecha_fin_input,
  id_borrar,
  set_vehiculo_agendado_conductor,
  vehiculo_agendado_conductor,
  nombre_vehiculo,
  vehiculo_placa,
  marca_vehiculo,
  tipo_vehiculo,
  capacidad_pasajeros,
  color_vehiculo,
  nro_documento,
  nombre_conductor,
  telefono_conductor,
  tipo_conductor,
}) => {

  const [fecha_salida, set_fecha_salida] = useState<Dayjs>(dayjs());
  const [fecha_retorno, set_fecha_retorno] = useState<Dayjs>(dayjs());

  const cambio_fecha_salida = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_salida(date);
    }
  };

  const cambio_fecha_retorno = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_retorno(date);
    }
  };

  const eliminar_asignacion_temp = () => {
    set_vehiculo_agendado_conductor(vehiculo_agendado_conductor.filter(objeto => objeto.id_borrar !== id_borrar));
  }

  useEffect(()=>{
    set_fecha_salida(dayjs(fecha_inicio_input, 'YYYY-MM-DD'));
    set_fecha_retorno(dayjs(fecha_fin_input, 'YYYY-MM-DD'));
  },[fecha_inicio_input, 
    fecha_fin_input,])


  return (
    <>
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
          p: '40px',
          mb: '20px',
          display:'flex',
          justifyContent:'space-between',
          alignItems:'center'
        }}
        >
        <Title title="Vehículo seleccionado" />

        <Grid container item xs={12} spacing={2} my={1}>
          <Grid container item xs={12} lg={4}>
                <TextField
                  fullWidth
                  label="Nombre:"
                  size="small"
                  value={nombre_vehiculo}
                  disabled
                />
          </Grid>

          <Grid container item xs={12} lg={4}>
                <TextField
                  fullWidth
                  label="Placa:"
                  size="small"
                  value={vehiculo_placa}
                  disabled
                />
          </Grid>

          <Grid container item xs={12} lg={4}>
                <TextField
                  fullWidth
                  label="Marca:"
                  size="small"
                  value={marca_vehiculo}
                  disabled
                />
          </Grid>

          <Grid container item xs={12} lg={4}>
                <TextField
                  fullWidth
                  label="Tipo:"
                  size="small"
                  value={tipo_vehiculo}
                  disabled
                />
          </Grid>

          <Grid container item xs={12} lg={4}>
                <TextField
                  fullWidth
                  label="Capacidad:"
                  size="small"
                  value={capacidad_pasajeros}
                  disabled
                />
          </Grid>

          <Grid container item xs={12} lg={4}>
                <TextField
                  fullWidth
                  label="Color:"
                  size="small"
                  value={color_vehiculo}
                  disabled
                />
          </Grid>
        </Grid>

        <Title title="Conductor seleccionado" />

        <Grid container item xs={12} spacing={2} my={1}>
          <Grid container item xs={12} lg={4}>
            <TextField
              fullWidth
              label="Documento:"
              size="small"
              value={nro_documento}
              disabled
            />
          </Grid>

          <Grid container item xs={12} lg={4}>
            <TextField
              fullWidth
              label="Nombre:"
              size="small"
              value={nombre_conductor}
              disabled
            />
          </Grid>

          <Grid container item xs={12} lg={4}>
            <TextField
              fullWidth
              label="Teléfono:"
              size="small"
              value={telefono_conductor}
              disabled
            />
          </Grid>

          <Grid container item xs={12} lg={4}>
            <TextField
              fullWidth
              label="Tipo:"
              size="small"
              value={tipo_conductor}
              disabled
            />
          </Grid>

          <Grid item xs={12} lg={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Fecha de salida*:'
                value={fecha_salida}
                minDate={dayjs()}
                onChange={(newValue) => {
                  cambio_fecha_salida(newValue);
                }}
                renderInput={(params) => (
                  <TextField disabled required fullWidth size="small" {...params} />
                )}
                />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} lg={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Fecha de retorno*:'
                value={fecha_retorno}
                minDate={dayjs()}
                onChange={(newValue) => {
                  cambio_fecha_retorno(newValue);
                }}
                renderInput={(params) => (
                  <TextField disabled required fullWidth size="small" {...params} />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{
          display: 'flex',
          justifyContent: 'end',
        }}>
          <Grid item xs={12} lg={3}>
            <Button
              fullWidth
              color="error"
              variant="contained"
              startIcon={<DeleteForeverIcon />}
              onClick={eliminar_asignacion_temp}
            >
              Quitar seleccion
            </Button>
          </Grid>
        </Grid>
              
      </Grid>
    </>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default VehiculoAgendadoView;