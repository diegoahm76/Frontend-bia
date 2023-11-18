
import { Box, Button, Dialog, DialogContent, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Title } from '../../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch } from '../../../../../hooks';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { BuscadorPersonaConcesiones } from './BuscadorPersonaConcesiones';
import { control_error } from '../../../../../helpers';
import { get_tipo_documento } from '../../../../../request';
import { obtener_persona } from '../../../../seguridad/screens/vinculacionColaboradores/Thunks/VinculacionColaboradores';

interface IProps {
    expediente: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeleccionPersona: React.FC<IProps> = (props: IProps) => {
    const dispatch = useAppDispatch();
    const msj_error = "El campo es obligatorio."
    const [abrir_modal_persona, set_abrir_modal_persona] = useState<boolean>(false);
    const [acceso_desde, set_acceso_desde] = useState<Dayjs>(dayjs());
    const [acceso_hasta, set_acceso_hasta] = useState<Dayjs>(dayjs());
    const [error_acceso_desde, set_error_acceso_desde] = useState<boolean>(false);
    const [error_acceso_hasta, set_error_acceso_hasta] = useState<boolean>(false);
    const [persona, set_persona] = useState<any>(null);
    const [nombre_completo, set_nombre_completo] = useState<string>("");
    const [tipos_documentos, set_tipos_documentos] = useState<any>([]);
    const [tipo_documento, set_tipo_documento] = useState<string>("");
    const [msj_error_tdoc, set_msj_error_tdoc] = useState<string>("");
    const [nro_documento, set_nro_documento] = useState<string>("");
    const [msj_error_nro_documento, set_msj_error_nro_documento] = useState<string>("");

    useEffect(() => {
        void get_list_tipo_doc();
    }, []);

    useEffect(() => {
        if (tipo_documento !== "" && nro_documento !== "") {
            buscar_persona(tipo_documento, nro_documento);
        }
    }, [tipo_documento, nro_documento]);

    useEffect(() => {
        if (persona !== null && persona !== undefined) {
            set_tipo_documento(persona.tipo_documento);
            set_nro_documento(persona.numero_documento);
            set_nombre_completo(persona.nombre_completo);
        } else {
            set_nombre_completo("");
        }
    }, [persona]);

    const get_list_tipo_doc = async (): Promise<void> => {
        try {
            const { data: { data: res_tipo_documento } } = await get_tipo_documento();
            set_tipos_documentos(res_tipo_documento ?? []);
        } catch (err) {
            control_error(err);
        }
    };

    const cambio_acceso_desde = (date: Dayjs | null): void => {
        if (date !== null)
            set_acceso_desde(date);
        set_error_acceso_desde(!(date !== null));
    }
    const cambio_acceso_hasta = (date: Dayjs | null): void => {
        if (date !== null)
            set_acceso_desde(date);
        set_error_acceso_desde(!(date !== null));
    }

    const cambio_tipo_documento: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_tipo_documento(e.target.value);
        if (e.target.value !== null && e.target.value !== "")
            set_msj_error_tdoc("");
    }

    const cambio_nro_documento: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== null && e.target.value !== undefined && e.target.value !== "") {
            set_nro_documento(e.target.value);
            set_msj_error_nro_documento("");
        }
    };

    const buscar_persona = (tipo_doc: string, nro_doc: string): void => {
        dispatch(obtener_persona(tipo_doc, nro_doc)).then((response: { success: boolean, detail: string, data: any }) => {
            if (response.success && response.data !== undefined) {
                set_persona(response.data);
            } else {
                set_persona(null);
            }
        });
    }

    return (
        <>
            <Grid item md={12} xs={12}>
                <Title title="Información de expedientes" />
                <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                    <Grid item container spacing={2}>
                        <Grid item container spacing={3} sx={{ mt: '1px' }}>
                            <Grid item xs={12} sm={3}>
                            <FormControl required size='small' fullWidth>
                                    <InputLabel>Tipo de documento</InputLabel>
                                    <Select
                                        value={tipo_documento}
                                        label="Tipo de documento"
                                        onChange={cambio_tipo_documento}
                                        error={msj_error_tdoc !== ""}
                                    >
                                        {tipos_documentos.map((tipos: any) => (
                                            <MenuItem key={tipos.value} value={tipos.value}>
                                                {tipos.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    label="Numero documento"
                                    type={'number'}
                                    size="small"
                                    fullWidth
                                    value={nro_documento}
                                    onChange={cambio_nro_documento}
                                    error={msj_error_nro_documento !== ""}
                                />
                                {(msj_error_nro_documento !== "") && (<FormHelperText error >{msj_error_nro_documento}</FormHelperText>)}
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Nombre"
                                    type={'text'}
                                    size="small"
                                    fullWidth
                                    value={nombre_completo ?? ""}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Button
                                    color='primary'
                                    variant='contained'
                                    startIcon={<SearchIcon />}
                                    onClick={() => { set_abrir_modal_persona(true); }}
                                >
                                    Buscar persona
                                </Button>
                                {abrir_modal_persona && (
                    <BuscadorPersonaConcesiones
                        is_modal_active={abrir_modal_persona}
                        set_is_modal_active={set_abrir_modal_persona}
                        title={"Busqueda de persona titular"}
                        set_persona={set_persona} />
                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Conceder acceso desde"
                                        value={acceso_desde}
                                        onChange={(newValue) => { cambio_acceso_desde(newValue); }}
                                        renderInput={(params) => (
                                            <TextField
                                                required
                                                fullWidth
                                                size="small"
                                                {...params}
                                                error={error_acceso_desde}
                                            />
                                        )}
                                        maxDate={acceso_hasta}
                                    />
                                </LocalizationProvider>
                                {error_acceso_desde && (<FormHelperText error id="desde-error">{msj_error}</FormHelperText>)}

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Conceder acceso hasta"
                                        value={acceso_hasta}
                                        onChange={(newValue) => { cambio_acceso_hasta(newValue); }}
                                        renderInput={(params) => (
                                            <TextField
                                                required
                                                fullWidth
                                                size="small"
                                                {...params}
                                                error={error_acceso_hasta}
                                            />
                                        )}
                                        minDate={acceso_desde}
                                    />
                                </LocalizationProvider>
                                {error_acceso_hasta && (<FormHelperText error id="desde-error">{msj_error}</FormHelperText>)}

                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <Stack
                                    direction="row"
                                    justifyContent="flex-end"
                                    spacing={2}
                                    sx={{ mt: '5px' }}

                                >
                                    <Grid item xs={12} sm={8}>
                                        <Typography sx={{ fontSize: '18px', fontWeight: '420' }}> Permitirle ver documentos de tipologías reservadas </Typography>
                                    </Grid>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Stack
                                    direction="row"
                                    justifyContent="flex-start"
                                >
                                    <Grid item xs={12} sm={4} sx={{ pointerEvents: 'none' }}>

                                    </Grid>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label="Observaciones"
                                    type={'text'}
                                    multiline
                                    rows={2}
                                    size="small"
                                    fullWidth
                                    value={'Texto de prueba'}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </>
    );
};