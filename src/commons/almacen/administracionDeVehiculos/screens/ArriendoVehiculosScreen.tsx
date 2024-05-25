import { Grid, TextField, Box, Button, Stack, FormHelperText, ToggleButton, FormLabel, InputLabel, FormControl, Select, MenuItem, type SelectChangeEvent } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { type Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { Title } from "../../../../components";
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAppDispatch } from "../../../../hooks";
import { useNavigate } from "react-router-dom";
import { crear_arriendo_veh, eliminar_arriendo_veh, obtener_marcas } from "../thunks/Arriendo";
import { type crear_arriendo } from "./../interfaces/ArriendoVehiculo"
import BuscarArriendoComponent from "./BuscarArriendo";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ArriendoVehiculosScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [arriendo, set_arriendo] = useState<any | null>(null);
  const [lista_marcas, set_lista_marcas] = useState<any[]>([]);
  const [nombre_vehiculo, set_nombre_vehiculo] = useState<string>("");
  const [msj_error_nom_veh, set_msj_error_nom_veh] = useState<string>("");
  const [empresa_proveedora, set_empresa_proveedora] = useState<string>("");
  const [msj_error_emp_prov, set_msj_error_emp_prov] = useState<string>("");
  const [placa, set_placa] = useState<string>("");
  const [msj_error_placa, set_msj_error_placa] = useState<string>("");
  const [marca, set_marca] = useState<string>("");
  const [msj_error_marca, set_msj_error_marca] = useState<string>("");
  const [descripcion, set_descripcion] = useState<string>("");
  const [msj_error_descripcion, set_msj_error_descripcion] = useState<string>("");
  const [fecha_inicio, set_fecha_inicio] = useState<Dayjs>(dayjs());
  const [fecha_fin, set_fecha_fin] = useState<Dayjs>(dayjs());
  const [msj_error_fecha_inicio, set_msj_error_fecha_inicio] = useState<string>("");
  const [msj_error_fecha_fin, set_msj_error_fecha_fin] = useState<string>("");
  const [abrir_hdv, set_abrir_hdv] = useState<boolean>(false);
  const [es_agendable, set_es_agendable] = useState<boolean>(false);
  const [buscar_arriendo, set_buscar_arriendo] = useState<boolean>(false);
  const [actualiza, set_actualiza] = useState<boolean>(false);

  useEffect(() => {
    obtener_marcas_fc();
  }, []);

  useEffect(() => {
    if (!abrir_hdv)
      set_es_agendable(false);
  }, [abrir_hdv]);

  useEffect(() => {
    if (arriendo !== null) {
      set_nombre_vehiculo(arriendo.nombre);
      set_placa(arriendo.placa);
      set_marca(arriendo.id_marca);
      set_empresa_proveedora(arriendo.empresa_contratista);
      set_descripcion(arriendo.descripcion);
      set_abrir_hdv(arriendo.tiene_hoja_de_vida);
      set_actualiza(true);
    }
  }, [arriendo]);

  const obtener_marcas_fc: () => void = () => {
    dispatch(obtener_marcas()).then((response: any) => {
      const filter_marcas = response.filter((r: any) => r.activo);
      set_lista_marcas(filter_marcas);
    })
  }

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
      set_msj_error_fecha_fin("El campo Fecha fin es obligatorio.");
    }
  };

  const cambio_nombre_vh: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_nombre_vehiculo(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_nom_veh("");
  };

  const cambio_empresa_proveedora: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_empresa_proveedora(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_emp_prov("");
  };

  const cambio_placa: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_placa(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_placa("");
  };

  const cambio_marca: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_marca(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_marca("");
  }

  const cambio_descripcion: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_descripcion(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_descripcion("");
  };

  const validar_formulario = (): boolean => {
    let validar = true;
    if (nombre_vehiculo === "") {
      set_msj_error_nom_veh("El campo Nombre es obligatorio.");
      validar = false;
    }
    if (placa === "") {
      set_msj_error_placa("El campo Placa es obligatorio.");
      validar = false;
    }
    if (marca === "") {
      set_msj_error_marca("El campo Marca es obligatorio.");
      validar = false;
    }
    if (empresa_proveedora === "") {
      set_msj_error_emp_prov("El campo Empresa proveedora es obligatorio.");
      validar = false;
    }
    if (descripcion === "") {
      set_msj_error_descripcion("El campo Descripción es obligatorio.");
      validar = false;
    }
    if (fecha_inicio === null || fecha_inicio === undefined) {
      set_msj_error_fecha_inicio("El campo Fecha inicio es obligatorio.");
      validar = false;
    }
    if (fecha_fin === null || fecha_fin === undefined) {
      set_msj_error_fecha_fin("El campo Fecha fin es obligatorio.");
      validar = false;
    }
    return validar;
  }

  const guardar_formulario = (): void => {
    if (validar_formulario()) {
      const formulario: crear_arriendo = {
        nombre: nombre_vehiculo,
        placa,
        id_marca: parseInt(marca),
        empresa_contratista: empresa_proveedora,
        descripcion,
        asignar_hoja_de_vida: abrir_hdv,
        es_agendable,
        fecha_inicio: fecha_inicio.format("YYYY-MM-DD"),
        fecha_fin: fecha_fin.format("YYYY-MM-DD")
      };
      actualiza ? actualiza_arriendo(formulario) : crear_arriendo(formulario);
    }
  }

  const crear_arriendo = (formulario: crear_arriendo): void => {
    dispatch(crear_arriendo_veh(formulario)).then((response: { success: boolean, detail: string, data: any }) => {
      if (response.success) {
        limpiar_formulario();
        if (formulario.asignar_hoja_de_vida) {
          // //  console.log('')('Redirecciona a hoja de vida');
        }
      }
    })
  }

  const actualiza_arriendo = (formulario: crear_arriendo): void => {
    dispatch(crear_arriendo_veh(formulario)).then((response: { success: boolean, detail: string, data: any }) => {
      if (response.success) {
        limpiar_formulario();
      }
    })
  }

  const elimina_arriendo = (): void => {
    dispatch(eliminar_arriendo_veh(arriendo.id_vehiculo_arrendado)).then((response: { success: boolean, detail: string, data: any }) => {
      if (response.success) {
        limpiar_formulario();
      }
    })
  }

  const limpiar_formulario = (): void => {
    set_nombre_vehiculo("");
    set_placa("");
    set_marca("");
    set_empresa_proveedora("");
    set_descripcion("");
    set_fecha_inicio(dayjs());
    set_fecha_fin(dayjs());
    set_abrir_hdv(false);
    set_es_agendable(false);
    set_msj_error_nom_veh("");
    set_msj_error_placa("");
    set_msj_error_marca("");
    set_msj_error_emp_prov("");
    set_msj_error_descripcion("");
    set_msj_error_fecha_inicio("");
    set_msj_error_fecha_fin("");
  }

  const salir_entrada: () => void = () => {
    navigate('/home');
  }

  return (
    <>
       <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item md={12} xs={12}>
          <Title title="Administrar vehículo arrendado" />
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Nombre"
                  type={'text'}
                  size="small"
                  required
                  fullWidth
                  value={nombre_vehiculo}
                  onChange={cambio_nombre_vh}
                  error={msj_error_nom_veh !== ""}
                  InputProps={{
                    readOnly: actualiza,
                  }}
                />
                {(msj_error_nom_veh !== "") && (<FormHelperText error >{msj_error_nom_veh}</FormHelperText>)}
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Placa"
                  type={'text'}
                  size="small"
                  required
                  fullWidth
                  value={placa}
                  onChange={cambio_placa}
                  error={msj_error_placa !== ""}
                  InputProps={{
                    readOnly: actualiza,
                  }}
                />
                {(msj_error_placa !== "") && (<FormHelperText error >{msj_error_placa}</FormHelperText>)}
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl required size='small' fullWidth>
                  <InputLabel>Marca</InputLabel>
                  <Select
                    label="Marca"
                    value={marca}
                    required
                    onChange={cambio_marca}
                    error={msj_error_marca !== ""}
                  >
                    {lista_marcas.map((m: any) => (
                      <MenuItem key={m.id_marca} value={m.id_marca}>
                        {m.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {(msj_error_marca !== "") && (<FormHelperText error >{msj_error_marca}</FormHelperText>)}
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Empresa proveedora"
                  type={'text'}
                  size="small"
                  required
                  fullWidth
                  value={empresa_proveedora}
                  onChange={cambio_empresa_proveedora}
                  error={msj_error_emp_prov !== ""}
                />
                {(msj_error_emp_prov !== "") && (<FormHelperText error >{msj_error_emp_prov}</FormHelperText>)}
              </Grid>
            </Grid>
          </Box>
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  multiline
                  rows={2}
                  value={descripcion}
                  label="Descripción"
                  size="small"
                  required
                  fullWidth
                  onChange={cambio_descripcion}
                  error={msj_error_descripcion !== ""} />
                {(msj_error_descripcion !== "") && (<FormHelperText error >{msj_error_descripcion}</FormHelperText>)}
              </Grid>
            </Grid>
          </Box>
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Fecha inicio"
                    value={fecha_inicio}
                    onChange={(newValue) => { cambio_fecha_inicio(newValue); }}
                    renderInput={(params) => (
                      <TextField
                        required
                        fullWidth
                        size="small"
                        {...params}
                        error={msj_error_fecha_inicio !== ""}
                      />
                    )}
                    minDate={dayjs()}
                    maxDate={fecha_fin}
                  />
                </LocalizationProvider>
                {(msj_error_fecha_inicio !== "") && (<FormHelperText error >{msj_error_fecha_inicio}</FormHelperText>)}
              </Grid>

              <Grid item xs={12} sm={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Fecha fin"
                    value={fecha_fin}
                    onChange={(newValue) => { cambio_fecha_fin(newValue); }}
                    renderInput={(params) => (
                      <TextField
                        required
                        fullWidth
                        size="small"
                        {...params}
                        error={msj_error_fecha_fin !== ""}
                      />
                    )}
                    minDate={fecha_inicio}
                  />
                </LocalizationProvider>
                {(msj_error_fecha_fin !== "") && (<FormHelperText error >{msj_error_fecha_fin}</FormHelperText>)}
              </Grid>


              
              <Grid item xs={12} sm={3}>
                <Stack
                  direction="row"
                  justifyContent="center"
                >
                  <FormLabel sx={{ mt: '9px' }}>Desea asignarle hoja de vida: </FormLabel>
                  <ToggleButton
                    value="check"
                    selected={abrir_hdv}
                    onChange={() => { set_abrir_hdv(!abrir_hdv); }}
                    size='small'
                  >
                    <CheckIcon /> {abrir_hdv ? "Si" : "No"}
                  </ToggleButton>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormLabel sx={{ mt: '9px' }}>Es agendable: </FormLabel>
                <ToggleButton
                  value="check"
                  selected={es_agendable}
                  onChange={() => {
                    set_es_agendable(!es_agendable);
                  }}
                  size='small'
                  disabled={!abrir_hdv}
                >
                  <CheckIcon /> {es_agendable ? "Si" : "No"}
                </ToggleButton>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item xs={6}>
                  <Box
                    component="form"
                    sx={{ mt: '20px', mb: '20px' }}
                    noValidate
                    autoComplete="off"
                  >
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      spacing={2}
                      sx={{ mt: '20px' }}
                    >
                      <Button
                        color='primary'
                        variant='contained'
                        startIcon={<SearchIcon />}
                        onClick={() => { set_buscar_arriendo(true) }}
                      >
                        Buscar
                      </Button>
                      {buscar_arriendo && (<BuscarArriendoComponent is_modal_active={buscar_arriendo} set_is_modal_active={set_buscar_arriendo}
                        title={"Buscar arriendo"} lista_marcas={lista_marcas} arriendo_veh={set_arriendo}></BuscarArriendoComponent>)}
                      <Button
                        color='success'
                        variant='contained'
                        startIcon={<SaveIcon />}
                        onClick={guardar_formulario}
                      >
                        {actualiza ? 'Actualizar' : 'Guardar'}
                      </Button>
                      <Button
                        color='error'
                        variant='contained'
                        startIcon={<ClearIcon />}
                        onClick={salir_entrada}
                      >
                        Salir
                      </Button>
                      <Button
                        color='error'
                        variant='contained'
                        startIcon={<DeleteForeverIcon />}
                        onClick={elimina_arriendo}
                        disabled={!actualiza}
                      >
                        Borrar
                      </Button>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
