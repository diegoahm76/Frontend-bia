/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormControl, Grid, InputLabel, MenuItem, Select, type SelectChangeEvent, TextField, Box, Button, Stack, Autocomplete, Checkbox, type AutocompleteChangeReason, type AutocompleteChangeDetails, FormControlLabel, Paper, Divider, FormHelperText, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CleanIcon from '@mui/icons-material/CleaningServices';
import dayjs from "dayjs";
import { useAppDispatch } from "../../../../../hooks";
import { obtener_tipos_bien, obtener_viveros } from "../../../dashBoardViveros/thunks/DashBoardViveros";
import { Title } from "../../../../../components/Title";
import BuscarPlantas from "../BuscarPlantas";
import { DialogNoticacionesComponent } from "../../../../../components/DialogNotificaciones";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { AnaliticaChart } from "./AnaliticaChart";
import { analitica_bajas, analitica_cuarentena, analitica_despachos, analitica_mortalidad, analitica_solicitudes } from "../../thunks/AnaliticaChart";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checked_icon = <CheckBoxIcon fontSize="small" />;

const lista_reporte = [
    { name: 'Mortalidad a través del tiempo', value: 'MT' },
    { name: 'Bajas de Bienes a Través del Tiempo', value: 'BT' },
    { name: 'Cuarentena a través del tiempo', value: 'CT' },
    { name: 'Despacho de Material Vegetal a través del tiempo', value: 'DMT' },
    { name: 'Solicitudes de Material Vegetal a través del tiempo', value: 'SMT' }
];
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AnaliticaSubsistemaScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Variables globales
    const [axis, set_axis] = useState<any[]>([]);
    const [reporte, set_reporte] = useState<any[]>([]);
    const [tipo_axis, set_tipo_axis] = useState<string>("");
    const [titulo, set_titulo] = useState<string>("");
    const [seleccion_vivero, set_seleccion_vivero] = useState<any[]>([]);
    const [seleccion_vivero_string, set_seleccion_vivero_string] = useState<string>("");
    const [seleccion_tipo_elemento_string, set_seleccion_tipo_elemento_string] = useState<string>("");
    const [seleccion_tipo_elemento, set_seleccion_tipo_elemento] = useState<any[]>([]);
    const [lista_viveros, set_lista_viveros] = useState<any[]>([]);
    const [lista_tipo_bien, set_lista_tipo_bien] = useState<any[]>([]);
    const [seleccion_reporte, set_seleccion_reporte] = useState<string>("");
    const [seleccion_planta, set_seleccion_planta] = useState<any>(0);
    const [fecha_desde, set_fecha_desde] = useState<Date | null>(null);
    const [fecha_hasta, set_fecha_hasta] = useState<Date | null>(null);
    const [abrir_modal_bien, set_abrir_modal_bien] = useState<boolean>(false);
    // Errors
    const mensaje_error = "El campo es obligatorio.";
    const [error_reporte, set_error_reporte] = useState<boolean>(false);
    const [error_vivero, set_error_vivero] = useState<boolean>(false);
    const [error_fecha_desde, set_error_fecha_desde] = useState<boolean>(false);
    const [error_fecha_hasta, set_error_fecha_hasta] = useState<boolean>(false);
    // Notificaciones
    const [titulo_notificacion, set_titulo_notificacion] = useState<string>("");
    const [mensaje_notificacion, set_mensaje_notificacion] = useState<string>("");
    const [tipo_notificacion, set_tipo_notificacion] = useState<string>("");
    const [abrir_modal, set_abrir_modal] = useState<boolean>(false);
    const [dialog_notificaciones_is_active, set_dialog_notificaciones_is_active] = useState<boolean>(false);
    useEffect(() => {
        obtener_viveros_fc();
        obtener_tipos_bien_fc();
    }, []);

    const obtener_tipos_bien_fc: () => void = () => {
        dispatch(obtener_tipos_bien()).then((response: any) => {
            set_lista_tipo_bien(response);
        })
    }

    const analitica_mortalidad_fc: () => void = () => {
        dispatch(analitica_mortalidad({ seleccion_vivero: seleccion_vivero_string, seleccion_planta, fecha_desde: dayjs(fecha_desde).format('YYYY-MM-DD'), fecha_hasta: dayjs(fecha_hasta).format('YYYY-MM-DD') })).then((response: any) => {
            set_reporte(response.data);
            if (response.data.length === 0)
                generar_notificación_reporte('Notificación', 'info', 'No se encontró información con los filtros seleccionados.', true);
        })
    }
    const analitica_bajas_fc: () => void = () => {
        dispatch(analitica_bajas({ seleccion_vivero: seleccion_vivero_string, seleccion_tipo_elemento: seleccion_tipo_elemento_string, fecha_desde: dayjs(fecha_desde).format('YYYY-MM-DD'), fecha_hasta: dayjs(fecha_hasta).format('YYYY-MM-DD') })).then((response: any) => {
            set_reporte(response.data);
            if (response.data.length === 0)
                generar_notificación_reporte('Notificación', 'info', 'No se encontró información con los filtros seleccionados.', true);
        })
    }
    const analitica_cuarentena_fc: () => void = () => {
        dispatch(analitica_cuarentena({ seleccion_vivero: seleccion_vivero_string, seleccion_planta, fecha_desde: dayjs(fecha_desde).format('YYYY-MM-DD'), fecha_hasta: dayjs(fecha_hasta).format('YYYY-MM-DD') })).then((response: any) => {
            set_reporte(response.data);
            if (response.data.length === 0)
                generar_notificación_reporte('Notificación', 'info', 'No se encontró información con los filtros seleccionados.', true);
        })
    }
    const analitica_despachos_fc: () => void = () => {
        dispatch(analitica_despachos({ seleccion_vivero: seleccion_vivero_string, seleccion_planta, fecha_desde: dayjs(fecha_desde).format('YYYY-MM-DD'), fecha_hasta: dayjs(fecha_hasta).format('YYYY-MM-DD') })).then((response: any) => {
            set_reporte(response.data);
            if (response.data.length === 0)
                generar_notificación_reporte('Notificación', 'info', 'No se encontró información con los filtros seleccionados.', true);
        })
    }
    const analitica_solicitudes_fc: () => void = () => {
        dispatch(analitica_solicitudes({ seleccion_vivero: seleccion_vivero_string, seleccion_planta, fecha_desde: dayjs(fecha_desde).format('YYYY-MM-DD'), fecha_hasta: dayjs(fecha_hasta).format('YYYY-MM-DD') })).then((response: any) => {
            set_reporte(response.data);
            if (response.data.length === 0)
                generar_notificación_reporte('Notificación', 'info', 'No se encontró información con los filtros seleccionados.', true);
        })
    }

    const visualizar_analitica: () => void = () => {
        set_reporte([]);
        if (seleccion_reporte === 'MT') {
            analitica_mortalidad_fc();
            set_titulo('Mortalidad a través del tiempo');
        }
        if (seleccion_reporte === 'BT') {
            analitica_bajas_fc();
            set_titulo('Bajas de Bienes a Través del Tiempo');
        }
        if (seleccion_reporte === 'CT') {
            analitica_cuarentena_fc();
            set_titulo('Cuarentena a través del tiempo');
        }
        if (seleccion_reporte === 'DMT') {
            analitica_despachos_fc();
            set_titulo('Despacho de Material Vegetal a través del tiempo');
        }
        if (seleccion_reporte === 'SMT') {
            analitica_solicitudes_fc();
            set_titulo('Solicitudes de Material Vegetal a través del tiempo');
        }
    }

    const validar_formulario: () => void = () => {
        set_error_reporte(seleccion_reporte === "");
        set_error_fecha_desde(fecha_desde === null);
        set_error_fecha_hasta(fecha_hasta === null);
        set_error_vivero(seleccion_vivero.length === 0);
        if (seleccion_reporte !== "" && fecha_desde !== null && fecha_hasta !== null && seleccion_vivero.length > 0)
            visualizar_analitica();
    }

    useEffect(() => {
        const axis: any = [];
        if (fecha_desde !== null && fecha_hasta !== null) {
            let local_fecha_desde = dayjs(fecha_desde);
            const local_fecha_hasta = dayjs(fecha_hasta);
            const two_weeks_from_today = dayjs(fecha_desde).add(2, 'w');
            const two_months_from_today = dayjs(fecha_desde).add(2, 'months');
            const two_years_from_today = dayjs(fecha_desde).add(2, 'y');
            if (local_fecha_hasta.diff() <= two_weeks_from_today.diff()) {
                while (local_fecha_desde.diff() <= local_fecha_hasta.diff()) {
                    axis.push(local_fecha_desde.format('DD/MMM/YYYY'));
                    local_fecha_desde = local_fecha_desde.add(1, 'd');
                }
                set_tipo_axis('dias');
            }
            if (local_fecha_hasta.diff() > two_weeks_from_today.diff() && local_fecha_hasta.diff() <= two_months_from_today.diff()) {
                while (local_fecha_desde.diff() <= local_fecha_hasta.diff()) {
                    const fecha_proxima = local_fecha_desde.add(1, 'w');
                    const fecha_axis = fecha_proxima.diff() > local_fecha_hasta.diff() ? local_fecha_hasta : fecha_proxima.subtract(1, 'd');
                    axis.push(local_fecha_desde.format('DD/MMM/YYYY') + ' - ' + fecha_axis.format('DD/MMM/YYYY'));
                    local_fecha_desde = local_fecha_desde.add(1, 'w');
                }
                set_tipo_axis('rango_dias');
            }
            if (local_fecha_hasta.diff() > two_months_from_today.diff() && local_fecha_hasta.diff() <= two_years_from_today.diff()) {
                while (local_fecha_desde.diff() <= local_fecha_hasta.diff()) {
                    axis.push(local_fecha_desde.format('MMM-YYYY'));
                    local_fecha_desde = local_fecha_desde.add(1, 'months');
                }
                set_tipo_axis('mes_año');
            }
            if (local_fecha_hasta.diff() > two_years_from_today.diff()) {
                while (local_fecha_desde.diff() <= local_fecha_hasta.diff()) {
                    axis.push(local_fecha_desde.format('YYYY'));
                    local_fecha_desde = local_fecha_desde.add(1, 'y');
                }
                set_tipo_axis('año');
            }
            set_axis(axis);
        }
    }, [fecha_desde, fecha_hasta]);

    const obtener_viveros_fc: () => void = () => {
        dispatch(obtener_viveros()).then((response: any) => {
            const viveros_activos = response.data.filter((resp: { activo: boolean; }) => resp.activo);
            set_lista_viveros(viveros_activos);
        })
    }

    const generar_notificación_reporte = (titulo: string, tipo: string, mensaje: string, active: boolean) => {
        set_titulo_notificacion(titulo);
        set_tipo_notificacion(tipo);
        set_mensaje_notificacion(mensaje)
        set_dialog_notificaciones_is_active(active);
        set_abrir_modal(active);
    }

    const handle_change_autocomplete = (e: React.SyntheticEvent<Element, Event>, value: any[], r: AutocompleteChangeReason, d?: AutocompleteChangeDetails<any>): void => {
        set_error_vivero(value.length === 0);
        set_seleccion_vivero(value.map((e: any) => { return { id_vivero: e.id_vivero, nombre: e.nombre } }));
        let return_string = '';
        if (value.length === 0) {
            set_seleccion_vivero_string('');
            return
        }
        value.forEach(vivero => { return_string = return_string + vivero.id_vivero + ',' });
        set_seleccion_vivero_string(return_string.substring(0, return_string.length - 1));
    };

    const cambio_seleccion_tipo = (e: React.SyntheticEvent<Element, Event>, value: any[], r: AutocompleteChangeReason, d?: AutocompleteChangeDetails<any>): void => {
        set_seleccion_tipo_elemento(value.map((e: any) => { return { 0: e[0], 1: e[1] } }));
        let return_string = '';
        if (value.length === 0) {
            set_seleccion_tipo_elemento_string('');
            return
        }
        value.forEach(tipos => { return_string = return_string + tipos[0] + ',' });
        set_seleccion_tipo_elemento_string(return_string.substring(0, return_string.length - 1));
    };

    const cambio_reporte: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_seleccion_reporte(e.target.value);
        set_error_reporte(e.target.value === "");
    }

    const handle_change_fecha_desde = (date: Date | null): void => {
        set_fecha_desde(date);
        set_error_fecha_desde(date === null);
    };

    const handle_change_fecha_hasta = (date: Date | null): void => {
        set_fecha_hasta(date);
        set_error_fecha_hasta(date === null);
    };

    const limpiar: () => void = () => {
       set_seleccion_planta(0);
       set_seleccion_reporte('');
       set_reporte([]);
       set_seleccion_tipo_elemento([]);
       set_seleccion_vivero([]);
       set_seleccion_vivero_string('');
       set_seleccion_tipo_elemento_string('');
    }

    const salir_entrada: () => void = () => {
        navigate('/home');
    }

    useEffect(() => {

    }, []);

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
                    <Title title="Filtros de búsqueda" />
                    <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                    spacing={2}
                                >
                                    <Grid item xs={12} sm={6}>
                                        <FormControl required size='small' fullWidth>
                                            <InputLabel>Reporte</InputLabel>
                                            <Select
                                                value={seleccion_reporte}
                                                label="Tipo de bien"
                                                onChange={cambio_reporte}
                                                error={error_reporte}
                                            >
                                                {lista_reporte.map((lr: any) => (
                                                    <MenuItem key={lr.value} value={lr.value}>
                                                        {lr.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        {error_reporte && (<FormHelperText error >{mensaje_error}</FormHelperText>)}
                                    </Grid>
                                    {seleccion_reporte !== 'BT' && <Grid item xs={12} sm={4}>
                                        <Stack
                                            direction="row"
                                            justifyContent="flex-end"
                                            spacing={2}
                                        >
                                            <Grid item xs={12} sm={12}>
                                                <TextField
                                                    label="Planta"
                                                    type={'text'}
                                                    size="small"
                                                    fullWidth
                                                    value={seleccion_planta.nombre ?? ""}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    disabled
                                                />

                                            </Grid>
                                        </Stack>
                                    </Grid>}
                                    {seleccion_reporte !== 'BT' && <Grid item xs={12} sm={2}>
                                        <Stack
                                            direction="row"
                                            justifyContent="flex-start"
                                            spacing={2}
                                        >
                                            <Button
                                                color='primary'
                                                variant='contained'
                                                startIcon={<SearchIcon />}
                                                onClick={() => { set_abrir_modal_bien(true); }}
                                            >
                                                Buscar planta
                                            </Button>
                                            {abrir_modal_bien && (
                                                <BuscarPlantas
                                                    is_modal_active={abrir_modal_bien}
                                                    set_is_modal_active={set_abrir_modal_bien}
                                                    title={"Busqueda de plantas"}
                                                    seleccion_planta={set_seleccion_planta}
                                                    vivero={seleccion_vivero}
                                                    reporte={seleccion_reporte} />
                                            )}
                                        </Stack>
                                    </Grid>}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                    spacing={2}
                                >
                                    {seleccion_reporte === 'BT' && <Grid item xs={12} sm={6}>
                                        <Autocomplete
                                            multiple
                                            id="checkboxes-tags-demo"
                                            options={lista_tipo_bien}
                                            disableCloseOnSelect
                                            limitTags={4}
                                            size="small"
                                            getOptionLabel={(option) => option[1]}
                                            renderOption={(props, option, { selected }) => (
                                                <li {...props}>
                                                    <Checkbox
                                                        icon={icon}
                                                        checkedIcon={checked_icon}
                                                        style={{ marginRight: 8 }}
                                                        checked={selected}
                                                    />
                                                    {option[1]}
                                                </li>
                                            )}
                                            onChange={cambio_seleccion_tipo}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Tipo de bien" />
                                            )}
                                        />
                                    </Grid>}
                                    <Grid item xs={12} sm={6}>
                                        <Autocomplete
                                            multiple
                                            id="checkboxes-tags-demo"
                                            options={lista_viveros}
                                            disableCloseOnSelect
                                            limitTags={2}
                                            size="small"
                                            getOptionLabel={(option) => option.nombre}
                                            renderOption={(props, option, { selected }) => (
                                                <li {...props}>
                                                    <Checkbox
                                                        icon={icon}
                                                        checkedIcon={checked_icon}
                                                        style={{ marginRight: 8 }}
                                                        checked={selected}
                                                    />
                                                    {option.nombre}
                                                </li>
                                            )}
                                            onChange={handle_change_autocomplete}
                                            renderInput={(params) => (
                                                <TextField required {...params} label="Viveros" error={error_vivero} />
                                            )}
                                        />
                                        {error_vivero && (<FormHelperText error >{mensaje_error}</FormHelperText>)}
                                    </Grid>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Stack
                                    direction="row"
                                    justifyContent="flex-end"
                                    spacing={2}
                                >
                                    <Grid item xs={12} sm={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Fecha desde"
                                                value={fecha_desde}
                                                onChange={(newValue) => {
                                                    handle_change_fecha_desde(newValue);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField required fullWidth size="small" {...params} error={error_fecha_desde} />
                                                )}
                                                maxDate={fecha_hasta}
                                            />
                                            {error_fecha_desde && (<FormHelperText error >{mensaje_error}</FormHelperText>)}
                                        </LocalizationProvider>
                                    </Grid>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack
                                    direction="row"
                                    justifyContent="flex-start"
                                    spacing={2}
                                >
                                    <Grid item xs={12} sm={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Fecha hasta"
                                                value={fecha_hasta}
                                                onChange={(newValue) => {
                                                    handle_change_fecha_hasta(newValue);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField required fullWidth size="small" {...params} error={error_fecha_hasta} />
                                                )}
                                                minDate={fecha_desde}
                                                disabled={fecha_desde == null}
                                            />
                                            {error_fecha_hasta && (<FormHelperText error >{mensaje_error}</FormHelperText>)}
                                        </LocalizationProvider>
                                    </Grid>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                    spacing={2}>
                                    <Button
                                        color='primary'
                                        variant='contained'
                                        onClick={validar_formulario}
                                    >
                                        Visualizar datos
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            {reporte.length !== 0 && <Grid
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
                    <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Stack
                                            direction="row"
                                            justifyContent="center"
                                        >
                                            <Typography variant="h5">
                                                {titulo}
                                            </Typography>
                                        </Stack>
                                        <AnaliticaChart reporte={reporte} axis={axis} tipo_axis={tipo_axis} />

                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>}
            <Grid container justifyContent="flex-end">
                <Grid item xs={7}>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={2}
                        sx={{ mt: '20px', mr: '60px' }}
                    >
                        <Button
                            color='warning'
                            variant='outlined'
                            startIcon={<CleanIcon />}
                            onClick={limpiar}
                        >
                            Limpiar
                        </Button>
                        <Button
                            color='error'
                            variant='contained'
                            startIcon={<ClearIcon />}
                            onClick={salir_entrada}
                        >
                            Salir
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
            {dialog_notificaciones_is_active && (
                <DialogNoticacionesComponent
                    titulo_notificacion={titulo_notificacion}
                    abrir_modal={abrir_modal}
                    tipo_notificacion={tipo_notificacion}
                    mensaje_notificacion={mensaje_notificacion}
                    abrir_dialog={set_abrir_modal} />
            )}
        </>
    );
}
