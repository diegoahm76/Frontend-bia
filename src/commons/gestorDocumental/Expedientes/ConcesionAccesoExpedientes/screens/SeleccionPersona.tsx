
import { Box, Button, Dialog, DialogContent, FormHelperText, Grid, Stack, TextField, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Title } from '../../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch } from '../../../../../hooks';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { BuscadorPersonaConcesiones } from './BuscadorPersonaConcesiones';

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

    useEffect(() => {
    }, []);

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

    const seleccionar_expediente: any = (expediente: any) => {

    }

    const mostrar_busqueda_expediente: any = async () => {

    }

    return (
        <>
            <Grid item md={12} xs={12}>
                <Title title="Información de expedientes" />
                <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                    <Grid item container spacing={2}>
                        <Grid item container spacing={3} sx={{ mt: '1px' }}>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    label="Tipo de documento"
                                    type={'text'}
                                    size="small"
                                    fullWidth
                                    value={""}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    label="Número documento"
                                    type={'text'}
                                    size="small"
                                    fullWidth
                                    value={""}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    label="Nombre"
                                    type={'text'}
                                    size="small"
                                    fullWidth
                                    value={""}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
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