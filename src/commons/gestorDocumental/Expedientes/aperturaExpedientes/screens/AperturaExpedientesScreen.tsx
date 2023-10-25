import { Grid, TextField, Box, Button, Stack, FormHelperText, ToggleButton, FormLabel, InputLabel, FormControl, Select, MenuItem, type SelectChangeEvent, Typography } from "@mui/material";
import { Title } from "../../../../../components/Title";
import { useState } from "react";
import { FormularioBuscarPersona } from "./FormularioBuscarPersona";

const class_css = {
    position: 'relative',
    background: '#FAFAFA',
    borderRadius: '15px',
    p: '20px',
    mb: '20px',
    boxShadow: '0px 3px 6px #042F4A26',
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AperturaExpedientesScreen: React.FC = () => {
    const [titulo_accion, set_titulo_accion] = useState<string>("Creación de expdientes");
    const [tdr, set_tdr] = useState<string>("");
    const [seccion, set_seccion] = useState<string>("");
    const [msj_error_seccion, set_msj_error_seccion] = useState<string>("");
    const [serie, set_serie] = useState<string>("");
    const [msj_error_serie, set_msj_error_serie] = useState<string>("");
    const [tipo_expediente, set_tipo_expediente] = useState<string>("");
    const [msj_error_tipo_expediente, set_msj_error_tipo_expediente] = useState<string>("");

    const cambio_seccion: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_seccion(e.target.value);
        if (e.target.value !== null && e.target.value !== "")
            set_msj_error_seccion("");
    }

    const cambio_serie: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_serie(e.target.value);
        if (e.target.value !== null && e.target.value !== "")
            set_msj_error_serie("");
    }
    const cambio_tipo_expediente: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_serie(e.target.value);
        if (e.target.value !== null && e.target.value !== "")
            set_msj_error_tipo_expediente("");
    }

    return (
        <>
            <Grid
                container
                sx={class_css}
            >
                <Grid item md={12} xs={12}>
                    <Title title="Apertura de expedientes electrónicos documentales" />
                    <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                >
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Empresa proveedora"
                                            type={'text'}
                                            size="small"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            fullWidth
                                            value={tdr}
                                        />
                                    </Grid>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl size='small' fullWidth>
                                    <InputLabel>Sección</InputLabel>
                                    <Select
                                        label="Sección"
                                        value={seccion}
                                        onChange={cambio_seccion}
                                    >
                                        {[].map((m: any) => (
                                            <MenuItem key={m.id_marca} value={m.id_marca}>
                                                {m.nombre}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl size='small' fullWidth>
                                    <InputLabel>Serie - subserie</InputLabel>
                                    <Select
                                        label="Serie - subserie"
                                        value={serie}
                                        onChange={cambio_serie}
                                    >
                                        {[].map((m: any) => (
                                            <MenuItem key={m.id_marca} value={m.id_marca}>
                                                {m.nombre}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                >
                                    <Grid item xs={12} sm={6}>
                                        <FormControl size='small' fullWidth>
                                            <InputLabel>Tipo de expedientes</InputLabel>
                                            <Select
                                                label="Tipo de expedientes"
                                                value={tipo_expediente}
                                                onChange={cambio_tipo_expediente}
                                            >
                                                {[].map((m: any) => (
                                                    <MenuItem key={m.id_marca} value={m.id_marca}>
                                                        {m.nombre}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            <Grid
                container
                sx={class_css}
            >
                <Grid item md={12} xs={12}>
                    <Title title={titulo_accion} />
                    <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="flex-end"
                                >
                                    <Grid item xs={12} sm={2}>
                                        <TextField
                                            label="Año de creación"
                                            type={'text'}
                                            size="small"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            fullWidth
                                            value={'2023'}
                                        />
                                    </Grid>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Titulo"
                                    type={'text'}
                                    size="small"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    value={tdr}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Descripción"
                                    type={'text'}
                                    size="small"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    value={tdr}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                >
                                    <Grid item xs={12} sm={10}>
                                        <Title title="Persona titular" />
                                        <FormularioBuscarPersona></FormularioBuscarPersona>
                                    </Grid>
                                </Stack>

                                <Grid item xs={12} sm={6}>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                >
                                    <Grid item xs={12} sm={10}>
                                        <Title title="Responsabilidad del expediente" />
                                        <Stack
                                            direction="row"
                                            justifyContent="center"
                                            spacing={2}
                                            sx={{ mt: '10px' }}
                                        >
                                            <Grid item xs={12} sm={6}>
                                                <FormControl size='small' fullWidth>
                                                    <InputLabel>Unidad organizacional responsable</InputLabel>
                                                    <Select
                                                        label="Unidad organizacional responsable"
                                                        value={tipo_expediente}
                                                        onChange={cambio_tipo_expediente}
                                                    >
                                                        {[].map((m: any) => (
                                                            <MenuItem key={m.id_marca} value={m.id_marca}>
                                                                {m.nombre}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Stack>
                                        <Typography sx={{fontSize:'18px',fontWeight: '500'}}>Persona responsable</Typography>
                                        <FormularioBuscarPersona></FormularioBuscarPersona>
                                    </Grid>
                                </Stack>
                                <Grid item xs={12} sm={6}>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}