import { Button, FormLabel, Grid, OutlinedInput, Radio, TextField } from "@mui/material";
import { Title } from "../../../../components";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import TarjetaInspeccion from "../components/TarjetaInspeccion";
import ElementosInspeccionar from "../components/ElementosInspeccionar";
import { cambio_input_radio } from "../thunsk/cambio_input_radio";


// eslint-disable-next-line @typescript-eslint/naming-convention
const InspeccionVehiculos = () => {
  const [fecha_inspeccion, set_fecha_inspeccion] = useState<Dayjs>(dayjs());
  const [msj_error_fecha_inspeccion, set_msj_error_fecha_inspeccion] = useState<string>("");
  const [vehiculo_agendable, set_vehiculo_agendable] = useState<string>('true');
  const [kilometraje, set_kilometraje] = useState<string>("");
  const [mensaje_error_kilometraje, set_mensaje_error_kilometraje] = useState<string>("");


  const cambio_fecha_inspeccion = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_inspeccion(date);
      set_msj_error_fecha_inspeccion("");
    } else {
      set_msj_error_fecha_inspeccion("El campo Fecha inicio es obligatorio.");
    }
  };


  const cambio_kilometraje: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_kilometraje(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_mensaje_error_kilometraje("");
  };
  

  return (
    <Grid
      container
      spacing={2}
      marginTop={2}
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        mb: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
      >
      <Title title="Inspección de vehículos" />

      <Grid item container xs={11.8} sx={{
        padding:'0',
        display:'flex',
        justifyContent:'center',
        marginX:'auto',
      }}>
        <Title title="Datos básicos del conductor" />
        <Grid item xs={7} sx={{
          display:'flex',
          alignItems:'center',
          marginTop:'20px'
        }}>
          <FormLabel htmlFor="nombres_conductor" sx={{marginRight:'10px'}}>
            Nombres del conductor:
          </FormLabel>
          <Grid item xs={8}>
            <TextField
              fullWidth
              id="nombres_conductor"
              required
              disabled
              defaultValue="Juan Felipe Rodriguez"
              size="small"
            />
          </Grid>
        </Grid>

        <Grid
          item
          xs={5}
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <FormLabel style={{ marginRight: "10px" }}>Fecha de inspeccion:</FormLabel>
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled
                value={fecha_inspeccion}
                onChange={(newValue) => {
                  cambio_fecha_inspeccion(newValue);
                }}
                renderInput={(params) => (
                  <TextField required fullWidth size="small" {...params} />
                )}
                minDate={dayjs()}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Grid>

      <Grid item container xs={11.8} sx={{
        padding:'0',
        display:'flex',
        justifyContent:'center',
        marginX:'auto',
      }}>
        <Title title="Seleccionar vehículo" />

        <Grid item container xs={12} sx={{
          display:'flex',
          justifyContent:'center',
          alignItems:'start',
          gap:'90px',
          marginY:'20px'
          }}>
          <Grid item container xs={2.4} md={3.7} sx={{
            display:'flex',
            flexDirection:'column',
            alignItems:'start'
          }}>
            <b>Vehículo Seleccionado</b>
            <FormLabel htmlFor="nombres_conductor" sx={{marginRight:'10px'}}>
            Placa y nombre:
            </FormLabel>
            <TextField
              id="nombres_conductor"
              required
              placeholder="HFC 458 - HILUX"
              size="small"
            />
            <Button
              sx={{marginTop:'10px'}}
              color='primary'
              variant='contained'
              startIcon={<RestartAltIcon/>}
              onClick={() => {}}
              >
                Seleccionar vehículo asignado
            </Button>
          </Grid>
          
          <ArrowCircleLeftIcon sx={{fontSize:'40px', cursor:'pointer', alignSelf:'center'}}/>

          <Grid item container xs={3.5} sx={{
            width:'100%',
            display:'flex',
            flexDirection:'column',
            alignItems:'start'
          }}>
            <b>Vehículo Buscado</b>
            <FormLabel htmlFor="nombres_conductor" sx={{marginRight:'10px'}}>
            Placa y nombre:
            </FormLabel>
            <Grid item sx={{
              display:'flex',
              justifyContent:'space-between',
              gap:2
            }}>
              <TextField
                id="nombres_conductor"
                required
                placeholder=""
                size="small"
              />
              <Button
                color='primary'
                variant='contained'
                startIcon={<SearchIcon />}
                onClick={() => {}}
                >
                  Buscar
              </Button>
            </Grid>
          </Grid>
        </Grid>
        
        <Grid item container xs={12} sx={{
          display:'flex',
          justifyContent:'start',
          alignItems:'start',
          }}>
          <Grid item>
            <b>¿El vehículo es agendable?</b>
            <Grid item sx={{
              display:'flex',
              flexDirection:'column',
              alignItems:'start'
            }}>
              <FormLabel sx={{cursor:'pointer'}}>
                <Radio
                  {...cambio_input_radio('true',vehiculo_agendable,set_vehiculo_agendable)}
                  sx={{
                    '& .MuiSvgIcon-root': {
                      fontSize: 28,
                    },
                  }}
                  />
                Si
              </FormLabel>
              <FormLabel sx={{cursor:'pointer'}}>
                <Radio
                  {...cambio_input_radio('false',vehiculo_agendable,set_vehiculo_agendable)}
                  sx={{
                    '& .MuiSvgIcon-root': {
                      fontSize: 28,
                    },
                  }}
                  />
                No
              </FormLabel>
            </Grid>
          </Grid>
        </Grid>

        <Grid item container xs={11.8} sx={{
          display:'flex',
          justifyContent:'start',
          alignItems:'center',
          }}>
          <Title title="Realizar inspección" />
          <Grid item sx={{margin:'20px 0px'}}>
              <FormLabel sx={{ marginRight: "10px" }} htmlFor="kilometraje">
                Kilometraje *:
              </FormLabel>
              <OutlinedInput
                id="kilometraje"
                type={"number"}
                value={kilometraje}
                size="small"
                onChange={cambio_kilometraje}
                error={mensaje_error_kilometraje !== ""}
                placeholder={"0"}
              />
              <FormLabel sx={{ marginLeft: "10px" }} htmlFor="kilometraje">
                KM
              </FormLabel>
          </Grid>
        </Grid>

        <ElementosInspeccionar />
      </Grid>
    </Grid>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default InspeccionVehiculos;