/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, Button, Stack, Box, Stepper, Step, StepButton, Typography, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { get_departamentos, get_municipios, tipos_tramites, tramites_servicios } from "../thunks/TramitesOServicios";
import { useAppDispatch } from "../../../../hooks";
import { DialogGeneradorDeDirecciones } from "../../../../components/DialogGeneradorDeDirecciones";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Geolocalizacion } from "./geolocalizacionScreen";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TipoTramite: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [type_direction, set_type_direction] = useState('');
    const [lt_tipos_tramites, set_lt_tipos_tramites] = useState<any[]>([]);
    const [lt_tramites_servicios, set_lt_tramites_servicios] = useState<any[]>([]);
    const [lt_departamentos, set_lt_departamentos] = useState<any[]>([]);
    const [lt_municipios, set_lt_municipios] = useState<any[]>([]);
    const [departamento, set_departamento] = useState<any>("");
    const [municipio, set_municipio] = useState<any>("");
    const [tipo_tramite, set_tipo_tramite] = useState<any>("");
    const [tramite_servicio, set_tramite_servicio] = useState<any>("");
    const [direccion, set_direccion] = useState<any>("");
    const [descripcion, set_descripcion] = useState<any>("");
    const [coordenada_x, set_coordenada_x] = useState<any>("");
    const [coordenada_y, set_coordenada_y] = useState<any>("");
    const [abrir_modal, set_abrir_modal] = useState<boolean>(false);
    const [limpiar, set_limpiar] = useState<boolean>(false);

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

    const cambio_departamento: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_departamento(e.target.value);
        get_municipios_fc(parseInt(e.target.value));
    }

    const cambio_municipio: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_municipio(e.target.value);
    }

    const cambio_tipo_tramite: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_tipo_tramite(e.target.value);
    }

    const cambio_tramite_servicio: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_tramite_servicio(e.target.value);
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
        if (limpiar) {
        }
    }, [limpiar]);

    return (
        <>
            <Grid item container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormControl size='small' fullWidth>
                        <InputLabel>Tipo de trámite</InputLabel>
                        <Select
                            label="Tipo de trámite"
                            value={tipo_tramite ?? ""}
                            onChange={cambio_tipo_tramite}
                            readOnly={false}
                        >
                            {lt_tipos_tramites.map((m: any) => (
                                <MenuItem key={m[0]} value={m[0]}>
                                    {m[1]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl size='small' fullWidth>
                        <InputLabel>Trámites o servicios</InputLabel>
                        <Select
                            label="Trámites o servicios"
                            value={tramite_servicio ?? ""}
                            onChange={cambio_tramite_servicio}
                            readOnly={false}
                        >
                            {lt_tramites_servicios.map((m: any) => (
                                <MenuItem key={m.id_permiso_ambiental} value={m.id_permiso_ambiental}>
                                    {m.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl size='small' fullWidth>
                        <InputLabel>Departamento</InputLabel>
                        <Select
                            label="Departamento"
                            value={departamento ?? ""}
                            onChange={cambio_departamento}
                            readOnly={false}
                        >
                            {lt_departamentos.map((m: any) => (
                                <MenuItem key={m.value} value={m.value}>
                                    {m.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl size='small' fullWidth>
                        <InputLabel>Municipios</InputLabel>
                        <Select
                            label="Municipios"
                            value={municipio ?? ""}
                            onChange={cambio_municipio}
                            disabled={departamento === ""}
                        >
                            {lt_municipios.map((m: any) => (
                                <MenuItem key={m.value} value={m.value}>
                                    {m.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        size="small"
                        label="Direccion"
                        required
                        disabled
                        fullWidth
                        value={direccion}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Button
                        variant="contained"
                        //   startIcon={<SearchIcon />}
                        onClick={() => { set_abrir_modal(true); }}
                    >
                        Generar
                    </Button>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField
                        autoFocus
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
                        autoFocus
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
                        autoFocus
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