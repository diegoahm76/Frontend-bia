/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, Button, Stack, Box, Stepper, Step, StepButton, Typography, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, IconButton, Tooltip, Checkbox, FormHelperText } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { create_tramite_servicio, get_departamentos, get_municipios, tipos_tramites, tramites_servicios } from "../thunks/TramitesOServicios";
import { useAppDispatch } from "../../../../hooks";
import { DialogGeneradorDeDirecciones } from "../../../../components/DialogGeneradorDeDirecciones";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import { Geolocalizacion } from "./geolocalizacionScreen";
interface IProps {
    usuario: any,
    crear_tramite: any,
    set_formulario_paso_uno: any,
    set_crear_tramite: any
    set_crear_tramite_error: any,
    set_tramite_servicio: any,
    limpiar: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const TipoTramite: React.FC<IProps> = (props: IProps) => {
    const dispatch = useAppDispatch();
    const [type_direction, set_type_direction] = useState('');
    const [lt_tipos_tramites, set_lt_tipos_tramites] = useState<any[]>([]);
    const [lt_tramites_servicios, set_lt_tramites_servicios] = useState<any[]>([]);
    const [lt_departamentos, set_lt_departamentos] = useState<any[]>([]);
    const [lt_municipios, set_lt_municipios] = useState<any[]>([]);
    const [departamento, set_departamento] = useState<any>("");
    const [error_departamento, set_error_departamento] = useState<boolean>(false);
    const [error_municipio, set_error_municipio] = useState<boolean>(false);
    const [error_tipo_tramite, set_error_tipo_tramite] = useState<boolean>(false);
    const [error_tramite_servicio, set_error_tramite_servicio] = useState<boolean>(false);
    const [error_direccion, set_error_direccion] = useState<boolean>(false);
    const [municipio, set_municipio] = useState<any>("");
    const [tipo_tramite, set_tipo_tramite] = useState<any>("");
    const [tramite_servicio, set_tramite_servicio] = useState<any>("");
    const [direccion, set_direccion] = useState<any>("");
    const [descripcion, set_descripcion] = useState<any>("");
    const [coordenada_x, set_coordenada_x] = useState<any>("");
    const [coordenada_y, set_coordenada_y] = useState<any>("");
    const [abrir_modal, set_abrir_modal] = useState<boolean>(false);
    const [usar_direccion, set_usar_direccion] = useState<boolean>(false);
    const [limpiar, set_limpiar] = useState<boolean>(false);
    const msj_error = 'El campo es obligatorio.';
    useEffect(() => {
        tipos_tramites_fc();
        tramites_servicios_fc();
        get_departamentos_fc();
    }, []);

    const get_departamentos_fc: () => void = () => {
        dispatch(get_departamentos()).then((response: any) => {
            set_lt_departamentos(response.data);
        })
    }

    const get_municipios_fc: (value: number) => void = (value: number) => {
        dispatch(get_municipios(value)).then((response: any) => {
            set_lt_municipios(response.data);
        })
    }
    const tipos_tramites_fc: () => void = () => {
        dispatch(tipos_tramites()).then((response: any) => {
            set_lt_tipos_tramites(response);
        })
    }

    const tramites_servicios_fc: () => void = () => {
        dispatch(tramites_servicios()).then((response: any) => {
            set_lt_tramites_servicios(response.data);
        })
    }

    const cambio_usar_direccion = (e: React.ChangeEvent<HTMLInputElement>): void => {
        set_usar_direccion(e.target.checked);
        set_error_direccion(false);
    };

    useEffect(() => {
        if (usar_direccion) {
            set_departamento(props.usuario.cod_departamento_notificacion);
            get_municipios_fc(parseInt(props.usuario.cod_departamento_notificacion));
            set_municipio(props.usuario.cod_municipio_notificacion_nal);
            set_direccion(props.usuario.direccion_notificaciones);
            set_descripcion(props.usuario.direccion_notificacion_referencia);
            if (props.usuario.ubicacion_georeferenciada !== null)
                set_coordenada_x(props.usuario.ubicacion_georeferenciada);
            if (props.usuario.ubicacion_georeferenciada_lon !== null)
                set_coordenada_y(props.usuario.ubicacion_georeferenciada_lon);
        } else {
            set_departamento("");
            set_municipio("");
            set_direccion("");
            set_descripcion("");
            set_coordenada_x("");
            set_coordenada_y("");
        }
    }, [usar_direccion]);

    const cambio_departamento: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_departamento(e.target.value);
        get_municipios_fc(parseInt(e.target.value));
        set_error_departamento(false);
    }

    const cambio_municipio: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_municipio(e.target.value);
        set_error_municipio(false);
    }

    const cambio_tipo_tramite: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_tipo_tramite(e.target.value);
        props.set_tramite_servicio(e.target.value);
        set_error_tipo_tramite(false);
    }

    const cambio_tramite_servicio: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_tramite_servicio(e.target.value);
        set_error_tramite_servicio(false);
    }

    const cambio_descripcion: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_descripcion(e.target.value);
    };

    const cambio_coordenada_x: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_coordenada_x(e.target.value);
    };

    const cambio_coordenada_y: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_coordenada_y(e.target.value);
    };

    useEffect(() => {
        if (props.crear_tramite) {
            const crear = validar_paso_uno();
            props.set_crear_tramite(crear);
            if (crear) {
                const obj_create = {
                    "id_persona_titular": props.usuario.id_persona,
                    "id_persona_interpone": props.usuario.id_persona,
                    "id_medio_solicitud": 2,
                    "id_permiso_ambiental": tramite_servicio,
                    "desc_permiso_ambiental": lt_tramites_servicios.find((lt: any) => lt.id_permiso_ambiental === tramite_servicio).nombre,
                    "cod_municipio": municipio,
                    "direccion": direccion,
                    "descripcion_direccion": descripcion,
                    "coordenada_x": coordenada_x,
                    "coordenada_y": coordenada_y
                };
                props.set_formulario_paso_uno(obj_create);
                dispatch(create_tramite_servicio(obj_create)).then((response: any) => {
                    if(response.success){
                        props.set_crear_tramite_error(crear);
                    }
                });
            }
        }
    }, [props.crear_tramite]);

    const validar_paso_uno = (): boolean => {
        set_error_departamento(departamento === '');
        set_error_municipio(municipio === '');
        set_error_tipo_tramite(tipo_tramite === '');
        set_error_tramite_servicio(tramite_servicio === '');
        set_error_direccion(direccion === '');
        return !(departamento === '' || municipio === '' || tipo_tramite === '' || tramite_servicio === '' || direccion === '');
    }

    useEffect(() => {
        set_error_direccion(direccion !== '');
    }, [direccion]);    
    
    useEffect(() => {
        if (limpiar) {
            set_error_departamento(false);
            set_error_municipio(false);
            set_error_tipo_tramite(false);
            set_error_tramite_servicio(false);
            set_error_direccion(false);
            set_direccion('');
            set_coordenada_x('');
            set_coordenada_y('');
        }
    }, [limpiar]);

    return (
        <>
            <Grid item container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormControl required size='small' fullWidth>
                        <InputLabel>Tipo de trámite</InputLabel>
                        <Select
                            label="Tipo de trámite"
                            value={tipo_tramite ?? ""}
                            onChange={cambio_tipo_tramite}
                            readOnly={false}
                            error={error_tipo_tramite}
                        >
                            {lt_tipos_tramites.map((m: any) => (
                                <MenuItem key={m[0]} value={m[0]}>
                                    {m[1]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {error_tipo_tramite && (<FormHelperText error id="desde-error">{msj_error}</FormHelperText>)}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl required size='small' fullWidth>
                        <InputLabel>Trámites o servicios</InputLabel>
                        <Select
                            label="Trámites o servicios"
                            value={tramite_servicio ?? ""}
                            onChange={cambio_tramite_servicio}
                            readOnly={false}
                            error={error_tramite_servicio}
                        >
                            {lt_tramites_servicios.map((m: any) => (
                                <MenuItem key={m.id_permiso_ambiental} value={m.id_permiso_ambiental}>
                                    {m.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {error_tramite_servicio && (<FormHelperText error id="desde-error">{msj_error}</FormHelperText>)}
                </Grid>
                <Grid item xs={12} sm={12}>
                    <span style={{ marginTop: '9px' }} >{"Usar la misma dirección del titular "}</span>
                    <Checkbox checked={usar_direccion} onChange={cambio_usar_direccion} inputProps={{ 'aria-label': 'controlled' }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl required size='small' fullWidth>
                        <InputLabel>Departamento</InputLabel>
                        <Select
                            label="Departamento"
                            value={departamento ?? ""}
                            onChange={cambio_departamento}
                            readOnly={false}
                            error={error_departamento}
                        >
                            {lt_departamentos.map((m: any) => (
                                <MenuItem key={m.value} value={m.value}>
                                    {m.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {error_departamento && (<FormHelperText error id="desde-error">{msj_error}</FormHelperText>)}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl required size='small' fullWidth>
                        <InputLabel>Municipios</InputLabel>
                        <Select
                            label="Municipios"
                            value={municipio ?? ""}
                            onChange={cambio_municipio}
                            disabled={departamento === ""}
                            error={error_municipio}
                        >
                            {lt_municipios.map((m: any) => (
                                <MenuItem key={m.value} value={m.value}>
                                    {m.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {error_municipio && (<FormHelperText error id="desde-error">{msj_error}</FormHelperText>)}
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        size="small"
                        label="Direccion"
                        required
                        disabled
                        fullWidth
                        value={direccion}
                        error={error_direccion}
                    />
                    {error_direccion && (<FormHelperText error id="desde-error">{msj_error}</FormHelperText>)}
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Button
                        variant="contained"
                        startIcon={<SearchOutlined />}
                        onClick={() => { set_abrir_modal(true); }}
                    >
                        Generar
                    </Button>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField
                        margin="dense"
                        fullWidth
                        size="small"
                        label="Descripción"
                        type="text"
                        variant="outlined"
                        value={descripcion}
                        onChange={cambio_descripcion}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField
                        margin="dense"
                        fullWidth
                        size="small"
                        label="Coordenadas X"
                        type="number"
                        variant="outlined"
                        value={coordenada_x}
                        onChange={cambio_coordenada_x}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField
                        margin="dense"
                        fullWidth
                        size="small"
                        label="Coordenadas Y"
                        variant="outlined"
                        type="number"
                        value={coordenada_y}
                        onChange={cambio_coordenada_y}
                    />
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Tooltip title="Ubicar en mapa" placement="bottom">
                        <IconButton color="primary">
                            <LocationOnOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Geolocalizacion coordenada_x={coordenada_x} coordenada_y={coordenada_y}></Geolocalizacion>
                </Grid>
            </Grid>
            <DialogGeneradorDeDirecciones
                open={abrir_modal}
                openDialog={set_abrir_modal}
                onChange={set_direccion}
                type={type_direction}
            />
        </>
    )
}