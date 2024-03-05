import { Button, FormLabel, Grid, OutlinedInput, Radio, TextField } from "@mui/material";
import { Title } from "../../../../components";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ElementosInspeccionar from "../components/ElementosInspeccionar";
import { cambio_input_radio } from "../thunks/cambio_input_radio";
import { useAppDispatch } from "../../../../hooks";
import { obtener_nombres_conductor, obtener_vehiculo_logueado } from "../thunks/inspeccion_vehiculos";
import { control_error } from "../../../../helpers";
import { create_inspeccion_vehiculo, data_busqueda_vehiculos, response_conductor_logueado, response_vehiculo_logueado } from "../interfaces/types";
import BusquedaVehiculos from "./BusquedaVehiculos";


// eslint-disable-next-line @typescript-eslint/naming-convention
const InspeccionVehiculos = () => {
  const dispatch = useAppDispatch();
  const [fecha_inspeccion, set_fecha_inspeccion] = useState<Dayjs>(dayjs());
  const [msj_error_fecha_inspeccion, set_msj_error_fecha_inspeccion] = useState<string>("");
  const [vehiculo_agendable, set_vehiculo_agendable] = useState<string>('true');
  const [kilometraje, set_kilometraje] = useState<number>(0);
  const [mensaje_error_kilometraje, set_mensaje_error_kilometraje] = useState<string>("");
  const [nombres_conductor, set_nombres_conductor] = useState<string>('');
  const [id_conductor_logueado, set_id_conductor_logueado] = useState<number>(0);
  const [id_hoja_vida_vehiculo, set_id_hoja_vida_vehiculo] = useState<number>(0);
  const [refrescar_input_vehiculo_buscado, set_refrescar_input_vehiculo_buscado] = useState<boolean>(false);

  const [vehiculo_arrendado_encontrado, set_vehiculo_arrendado_encontrado] = useState<data_busqueda_vehiculos>(Object);

  const [vehiculo_seleccionado, set_vehiculo_seleccionado] = useState<string>('');
  const [vehiculo_buscado, set_vehiculo_buscado] = useState<string>('');

  const [mostrar_busqueda_vehiculo, set_mostrar_busqueda_vehiculo] = useState<boolean>(false);

  const [data_inspeccion_vehiculo, set_data_inspeccion_vehiculo] = useState<create_inspeccion_vehiculo>(Object);

  /**
   * Función para obtener el vehículo logueado.
   */
  const obtener_vehiculo_logueado_fc: () => void = () => {
    dispatch(obtener_vehiculo_logueado())
      .then((response: response_vehiculo_logueado) => {
        if (!response?.success) {
          control_error('No se encontraron los nombres del conductor');
          set_vehiculo_seleccionado('');
        } else {
          if (response?.data && response?.data[0] && response?.data[0][0]) {
            set_vehiculo_seleccionado(response.data[0][0]?.placa + ' - ' + response.data[0][0]?.marca);
            set_id_hoja_vida_vehiculo(response.data[0][0]?.id_hoja_vida_vehiculo);
          }
        }
      })
  }

  /**
   * Función para obtener los nombres del conductor.
   */
  const obtener_nombres_conductor_fc: () => void = () => {
    dispatch(obtener_nombres_conductor())
      .then((response: response_conductor_logueado) => {
        if (!response.success) {
          control_error('No se encontraron los nombres del conductor');
          set_nombres_conductor('');
        } else {  
          set_nombres_conductor(response.data.nombre_completo);
          set_id_conductor_logueado(response.data.id_persona_logueada);
        }
      })
  }

  useEffect(()=>{
    set_vehiculo_buscado(
      Object.keys(vehiculo_arrendado_encontrado).length !== 0 ?
      vehiculo_arrendado_encontrado.placa + ' - ' + vehiculo_arrendado_encontrado.nombre_marca
      : ''
    )
  },[vehiculo_arrendado_encontrado,refrescar_input_vehiculo_buscado]);

  useEffect(() => {
    obtener_vehiculo_logueado_fc();
    obtener_nombres_conductor_fc();
  }, [])

  useEffect(() => {
    console.log(vehiculo_arrendado_encontrado);    
  }, [vehiculo_arrendado_encontrado])


  /**
   * Función para cambiar la fecha de inspección.
   * 
   * @param {Dayjs | null} date - La fecha de inspección seleccionada.
   * @returns {void}
   */
  const cambio_fecha_inspeccion = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_inspeccion(date);
      set_msj_error_fecha_inspeccion("");
    } else {
      set_msj_error_fecha_inspeccion("El campo Fecha inicio es obligatorio.");
    }
  };

  /**
   * Función que se ejecuta cuando se produce un cambio en el campo de kilómetraje.
   * Actualiza el estado de kilómetraje y verifica si se debe mostrar un mensaje de error.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - El evento de cambio del campo de entrada.
   * @returns {void}
   */
  const cambio_kilometraje = (e: React.ChangeEvent<HTMLInputElement>): void => {
    set_kilometraje(Number(e.target.value)); 
    if (e.target.value !== null && e.target.value !== "")
      set_mensaje_error_kilometraje("");
  };

  /**
   * Restablece el vehículo logueado.
   */
  const restablecer_vehiculo_logueado = () => {
    obtener_vehiculo_logueado_fc();
  }

  /**
   * Función que se encarga de asignar el vehículo seleccionado y sus detalles.
   * 
   * @returns {void}
   */
  const pasar_a_seleccionado = () => {
    set_id_hoja_vida_vehiculo(vehiculo_arrendado_encontrado.id_hoja_de_vida);
    set_vehiculo_seleccionado(Object.keys(vehiculo_arrendado_encontrado).length !== 0 ?
      vehiculo_arrendado_encontrado.placa + ' - ' + vehiculo_arrendado_encontrado.nombre_marca
      : '');
    set_vehiculo_buscado('');
  }

  useEffect(()=>{
    set_data_inspeccion_vehiculo((prev)=>({
      ...prev,
      id_hoja_vida_vehiculo: id_hoja_vida_vehiculo,
      kilometraje: kilometraje,
      es_agendable: vehiculo_agendable === 'true' ? true : false,
    }))
  },[kilometraje,id_hoja_vida_vehiculo,vehiculo_seleccionado]);


  return (
    <>
      <BusquedaVehiculos
        refrescar_input_vehiculo_buscado={refrescar_input_vehiculo_buscado} 
        set_refrescar_input_vehiculo_buscado={set_refrescar_input_vehiculo_buscado}
        set_vehiculo_arrendado_encontrado={set_vehiculo_arrendado_encontrado}
        set_mostrar_busqueda_vehiculo={set_mostrar_busqueda_vehiculo}
        mostrar_busqueda_vehiculo={mostrar_busqueda_vehiculo}
      />

      <Grid container item spacing={1} rowSpacing={4} xs={12} sx={{
        display:'flex',
        justifyContent:'space-between',
        borderRadius: '15px',
        mx:'10px auto',
        my:'20px',
        backgroundColor: '#FAFAFA',
        boxShadow: '0px 3px 6px #042F4A26',
        p: '40px',
      }}>
        <Title title="Datos básicos del conductor" />

        <Grid item xs={12} md={7}>
          <TextField
            fullWidth
            label='Nombres del conductor:'
            value={nombres_conductor}
            id="nombres_conductor"
            required
            disabled
            size="small"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disabled
              label='Fecha de inspeccion:'
              value={fecha_inspeccion}
              onChange={(newValue) => {
                cambio_fecha_inspeccion(newValue);
              }}
              renderInput={(params) => (
                <TextField  required fullWidth size="small" {...params} />
              )}
              minDate={dayjs()}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>


      <Grid container item xs={12} spacing={1} rowSpacing={4} sx={{
        display:'flex',
        justifyContent:'center',
        alignItems:'start',
        borderRadius: '15px',
        mx:'10px auto',
        my:'20px',
        px: '40px',
        py: '30px',
        backgroundColor: '#FAFAFA',
        boxShadow: '0px 3px 6px #042F4A26',
      }}>
        <Title title="Seleccionar vehículo" />

        <Grid item container xs={12} md={4.5} sx={{
          display:'flex',
          flexDirection:'column',
          alignItems:'start'
        }}>
          <b>Vehículo Seleccionado</b>
          <TextField
            fullWidth
            label='Placa y nombre:'
            required
            disabled
            value={vehiculo_seleccionado}
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_vehiculo_seleccionado(e.target.value)}
            size="small"
          />
          <Button
            fullWidth
            sx={{marginTop:'10px'}}
            color='primary'
            variant='contained'
            startIcon={<RestartAltIcon/>}
            onClick={restablecer_vehiculo_logueado}
            >
              Seleccionar vehículo asignado
          </Button>
        </Grid>
        
        <ArrowCircleLeftIcon 
          onClick={vehiculo_buscado !== '' ? pasar_a_seleccionado : ()=>{}}
          sx={{fontSize:'40px', cursor:'pointer', alignSelf:'center'}}
        />

        <Grid item container xs={12} md={4.5} sx={{
          width:'100%',
          display:'flex',
          flexDirection:'column',
          alignItems:'start'
        }}>
          <b>Vehículo Buscado</b>

            <TextField
              fullWidth
              label='Placa y nombre:'
              required
              disabled
              value={vehiculo_buscado}
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_vehiculo_buscado(e.target.value)}
              size="small"
            />
            <Button
              fullWidth
              color='primary'
              variant='contained'
              sx={{marginTop:'10px'}}
              startIcon={<SearchIcon />}
              onClick={()=>set_mostrar_busqueda_vehiculo(true)}
              >
                Buscar
            </Button>
        </Grid>
      </Grid>
      

      <Grid item container rowSpacing={3} xs={12} sx={{
          display:'flex',
          justifyContent:'space-between',
          alignItems:'center',
          borderRadius: '15px',
          mx:'10px auto',
          my:'20px',
          px: '40px',
          py: '30px',
          backgroundColor: '#FAFAFA',
          boxShadow: '0px 3px 6px #042F4A26',
        }}>

        <Title title="Realizar inspección" />

        <Grid item xs={12} lg={2} sx={{
          display:'flex',
          alignItems:'center',
          justifyContent:'center'
          }}>
          <TextField
            fullWidth
            id="kilometraje"
            label='Kilometraje*:'
            type={"number"}
            value={kilometraje}
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={cambio_kilometraje}
          />
          <FormLabel sx={{ marginLeft: "10px" }} htmlFor="kilometraje">
            KM
          </FormLabel>
        </Grid>


        <Grid item xs={12} lg={10} sx={{display:'flex',alignItems:'center',justifyContent:'end'}}>
          <b>¿El vehículo es agendable?: </b>
          <Grid item sx={{
            display:'flex',
            alignItems:'start'
          }}>
            <FormLabel sx={{cursor:'pointer'}}>
              <Radio
                {...cambio_input_radio('true',vehiculo_agendable,set_vehiculo_agendable)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    fontSize: 34,
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
                    fontSize: 34,
                  },
                }}
                />
              No
            </FormLabel>
          </Grid>
        </Grid>

        <ElementosInspeccionar
          set_kilometraje={set_kilometraje}
          set_id_hoja_vida_vehiculo={set_id_hoja_vida_vehiculo}
          data_inspeccion_vehiculo={data_inspeccion_vehiculo}
          set_data_inspeccion_vehiculo={set_data_inspeccion_vehiculo}
        />
      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default InspeccionVehiculos;