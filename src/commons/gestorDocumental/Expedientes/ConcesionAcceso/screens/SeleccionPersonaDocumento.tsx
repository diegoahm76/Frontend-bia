
import { Box, Button, Checkbox, Dialog, DialogContent, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Title } from '../../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch } from '../../../../../hooks';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { control_error } from '../../../../../helpers';
import { get_tipo_documento } from '../../../../../request';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { obtener_persona_cc_nro } from '../thunks/ConcesionAcceso';
import { v4 as uuidv4 } from 'uuid';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { BuscadorPersonaExpDoc } from '../../ConsultaExpedientesDocumentales/screens/BuscadorPersonaExpDoc';

interface IProps {
    documento: any,
    set_concesion: any,
    editar_concesion: any
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeleccionPersonaDocumento: React.FC<IProps> = (props: IProps) => {
    const dispatch = useAppDispatch();
    const msj_error = "El campo es obligatorio."
    const [abrir_modal_persona, set_abrir_modal_persona] = useState<boolean>(false);
    const [acceso_desde, set_acceso_desde] = useState<Dayjs>(dayjs());
    const [acceso_hasta, set_acceso_hasta] = useState<Dayjs>(dayjs());
    const [error_acceso_desde, set_error_acceso_desde] = useState<boolean>(false);
    const [error_acceso_hasta, set_error_acceso_hasta] = useState<boolean>(false);
    const [observaciones, set_observaciones] = useState<string>("");
    const [persona, set_persona] = useState<any>(null);
    const [id_concesion_acc, set_id_concesion_acc] = useState<any>(null);
    const [nombre_completo, set_nombre_completo] = useState<string>("");
    const [tipos_documentos, set_tipos_documentos] = useState<any>([]);
    const [tipo_documento, set_tipo_documento] = useState<string>("");
    const [msj_error_tdoc, set_msj_error_tdoc] = useState<boolean>(false);
    const [nro_documento, set_nro_documento] = useState<string>("");
    const [msj_error_nro_documento, set_msj_error_nro_documento] = useState<boolean>(false);
    const [error_observacion, set_error_observacion] = useState<boolean>(false);

    useEffect(() => {
        void get_list_tipo_doc();
    }, []);

    useEffect(() => {
        if (props.editar_concesion !== null) {
            set_id_concesion_acc(props.editar_concesion.id_concesion_acc)
            buscar_persona(props.editar_concesion.tipo_documento_persona_recibe_acceso, props.editar_concesion.numero_documento_persona_recibe_acceso);
            set_acceso_desde(props.editar_concesion.fecha_acceso_inicia);
            set_acceso_hasta(props.editar_concesion.fecha_acceso_termina);
            set_observaciones(props.editar_concesion.observacion);
        }
    }, [props.editar_concesion]);

    useEffect(() => {
        if (tipo_documento !== "" && nro_documento !== "" && nro_documento !== persona?.numero_documento) {
            buscar_persona(tipo_documento, nro_documento);
        }
    }, [tipo_documento, nro_documento]);

    useEffect(() => {
        if (persona !== null && persona !== undefined) {
            set_tipo_documento(persona.tipo_documento);
            set_nro_documento(persona.numero_documento);
            set_nombre_completo(persona.nombre_completo);
            set_msj_error_nro_documento(false);
            set_msj_error_tdoc(false);
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
            set_acceso_hasta(date);
        set_error_acceso_hasta(!(date !== null));

    }

    const cambio_observaciones: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_observaciones(e.target.value);
        set_error_observacion(e.target.value === null && e.target.value === "")
    };

    const cambio_tipo_documento: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_tipo_documento(e.target.value);
        set_msj_error_tdoc(e.target.value === null && e.target.value === "");
    }

    const cambio_nro_documento: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_nro_documento(e.target.value);
        set_msj_error_nro_documento(e.target.value === null && e.target.value === "");
    };

    const buscar_persona = (tipo_doc: string, nro_doc: string): void => {
        dispatch(obtener_persona_cc_nro(tipo_doc, nro_doc)).then((response: { success: boolean, detail: string, data: any }) => {
            if (response.success && response.data !== undefined) {
                set_persona(response.data[0]);
            } else {
                set_persona(null);
            }
        });
    }

    const limpiar = (): void => {
        set_acceso_desde(dayjs());
        set_acceso_hasta(dayjs());
        set_tipo_documento('');
        set_nro_documento('');
        set_nombre_completo('');
        set_observaciones('');
        set_persona(null);
        set_id_concesion_acc(null);
    }

    const agregar_concesion = (): void => {
        if(valida_formulario()){
            props.set_concesion({
                "id_concesion_acc": id_concesion_acc ?? uuidv4(),
                "id_persona_recibe_acceso": persona.id_persona,
                "nombre_persona_recibe_acceso": persona.nombre_completo,
                "tipo_documento_persona_recibe_acceso": persona.tipo_documento,
                "numero_documento_persona_recibe_acceso": persona.numero_documento,
                "nombre_unidad_org_destinatario_conceder": persona.nombre_unidad_organizacional_actual,
                "id_unidad_org_destinatario_conceder": persona.id_unidad_organizacional_actual,
                "id_documento_exp": 1,
                "fecha_acceso_inicia": acceso_desde,
                "fecha_acceso_termina": acceso_hasta,
                "observacion": observaciones
            });
            limpiar();
        }
    }
    const valida_formulario = (): boolean => {
        if(persona === null){
            set_msj_error_nro_documento(true);
            set_msj_error_tdoc(true);
        }
        set_error_acceso_desde(acceso_desde === null);
        set_error_acceso_hasta(acceso_hasta === null);
        set_error_observacion(observaciones === '');
        return (persona !== null && acceso_desde !== null && acceso_hasta !== null && observaciones !== '');
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
                                        error={msj_error_tdoc}
                                    >
                                        {tipos_documentos.map((tipos: any) => (
                                            <MenuItem key={tipos.value} value={tipos.value}>
                                                {tipos.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {msj_error_tdoc && (<FormHelperText error >{msj_error}</FormHelperText>)}
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    label="Numero documento"
                                    type={'number'}
                                    size="small"
                                    fullWidth
                                    value={nro_documento}
                                    onChange={cambio_nro_documento}
                                    error={msj_error_nro_documento}
                                />
                                {msj_error_nro_documento && (<FormHelperText error >{msj_error}</FormHelperText>)}
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
                                    <BuscadorPersonaExpDoc
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
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label="Observaciones"
                                    type={'text'}
                                    multiline
                                    rows={2}
                                    size="small"
                                    fullWidth
                                    error={error_observacion}
                                    value={observaciones}
                                    onChange={cambio_observaciones}
                                />
                                {error_observacion && (<FormHelperText error id="desde-error">{msj_error}</FormHelperText>)}

                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={12}>
                            <Stack
                                direction="row"
                                justifyContent="flex-end"
                                spacing={2}
                                sx={{ mt: '10px' }}
                            >
                                <Button
                                    color="primary"
                                    variant='contained'
                                    startIcon={props.editar_concesion !== null ?<EditOutlinedIcon />:<AddCircleOutlinedIcon />}
                                    onClick={() => { agregar_concesion() }}
                                >
                                    {props.editar_concesion !== null ? 'Editar':'Agregar'}
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </>
    );
};