import { Grid, Box, Button, Stack, TextField, Typography, Fab, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import FolderIcon from '@mui/icons-material/Folder';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Title } from "../../../../../components/Title";
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import ConcederAccesoExpediente from "../../ConcesionAcceso/screens/ConcederAccesoExpediente";
import { useAppDispatch } from "../../../../../hooks";
import { descargar_expediente, permiso_acceso_expediente } from "../thunks/ConsultaExpedientes";
dayjs.extend(dayOfYear);
interface IProps {
    expediente: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InformacionExpediente: React.FC<IProps> = (props: IProps) => {
    const dispatch = useAppDispatch();
    const [abrir_modal_conceder, set_abrir_modal_conceder] = useState<boolean>(false);
    const [expandir_estante, set_expandir_estante] = useState<string | false>(false);
    const [expandir_bandeja, set_expandir_bandeja] = useState<string | false>(false);
    const [expandir_cajas, set_expandir_cajas] = useState<string | false>(false);
    const [expandir_carpetas_caja, set_expandir_carpetas_caja] = useState<string | false>(false);

    const validar_permiso_acceso: () => void = () => {
        dispatch(permiso_acceso_expediente(props.expediente?.id_expediente_documental)).then((response: any) => {
            if(response.success)
                set_abrir_modal_conceder(true);
        })
    }

    const descargar_expediente_id: () => void = () => {
        dispatch(descargar_expediente(props.expediente?.id_expediente_documental)).then((response: any) => {

        })
    }
    const handle_change_carpetas_caja = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        set_expandir_carpetas_caja(newExpanded ? panel : false);
    };
    const handle_change_estante = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        set_expandir_estante(newExpanded ? panel : false);
    };
    const handle_change_bandeja = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        set_expandir_bandeja(newExpanded ? panel : false);
    };
    const handle_change_cajas = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        set_expandir_cajas(newExpanded ? panel : false);
    };


    return (
        <>
            <Grid item md={12} xs={12}>
                <Title title="Información de expedientes" />
                <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Título"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={props.expediente?.titulo_expediente ?? ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Código"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={props.expediente?.codigo_exp_und_serie_subserie ?? ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Sección / Subsección propietaria"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={props.expediente?.nombre_und_org_oficina_respon_actual ?? ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Serie"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={props.expediente?.nombre_serie_origen ?? ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Subserie"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={props.expediente?.nombre_subserie_origen ?? 'N/A'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="TDR"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={props.expediente?.nombre_trd_origen ?? ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Tipo de expediente"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={props.expediente?.tipo_expediente ?? ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Año de apertura"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={props.expediente !== null ? dayjs(props.expediente?.fecha_apertura_expediente).format('YYYY') : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Titular"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={props.expediente?.nombre_persona_titular_exp_complejo ?? 'N/A'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Etapa actual"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={props.expediente?.etapa_de_archivo_actual_exped ?? ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Fecha folio inicial"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={props.expediente?.fecha_folio_inicial ?? ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Fecha folio final"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={props.expediente?.fecha_folio_final ?? 'N/A'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Unidad organizacional creadora"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={props.expediente?.nombre_unidad_org_oficina_respon_original ?? ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Unidad organizacional responsable actual"
                                type={'text'}
                                size="small"
                                disabled={true}
                                fullWidth
                                value={props.expediente?.nombre_und_org_oficina_respon_actual ?? ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Stack
                                direction="row"
                                justifyContent="flex-end"
                                spacing={2}
                                sx={{ mt: '5px' }}

                            >
                                <Grid item xs={12} sm={2}>
                                    <Typography sx={{ fontSize: '18px', fontWeight: '420' }}> Estado </Typography>
                                </Grid>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                            >
                                <Grid item xs={12} sm={4} sx={{ pointerEvents: 'none' }}>
                                    <Fab size="small" variant="extended" sx={true ? { marginX: '2px', marginY: '1px', backgroundColor: 'green', color: 'white', px: '20px' } : { marginX: '2px', marginY: '1px', backgroundColor: '#ff9800', color: 'black', px: '20px' }}>
                                        {props.expediente?.estado === 'A' ? 'Abierto' : 'Cerrado'}
                                    </Fab>
                                </Grid>
                            </Stack>
                        </Grid>
                    </Grid>
                    {props.expediente.carpetas_caja.length > 0 && <Grid container spacing={1}>
                        <Grid item xs={12} sm={12}>
                            <Title title="Ubicación física" />
                        </Grid>
                        {props.expediente.carpetas_caja.map((c: any, index: number) => (
                            <Grid item xs={12} sm={12} key={index}>
                                <Accordion expanded={expandir_carpetas_caja === 'panelCc' + (index + 1)} onChange={handle_change_carpetas_caja('panelCc' + (index + 1))}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panelCc-content" id="panelCc-header">
                                        <FolderOutlinedIcon sx={{ marginTop: '5px', marginRight: '10px', color: 'gray' }} />
                                        <Typography sx={{ fontSize: '15px', fontWeight: '420', display: 'inline-flex', flexDirection: 'row', marginTop: '7px' }}>
                                            {c.deposito}
                                        </Typography>
                                    </AccordionSummary>
                                    {c.estantes.map((e: any, sub_index: number) => (
                                        <Grid item xs={12} sm={12} key={sub_index} sx={{ marginLeft: '50px' }}>
                                            <Accordion expanded={expandir_estante === 'panelE' + (index + 1)} onChange={handle_change_estante('panelE' + (index + 1))}>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panelE-content" id="panelE-header">
                                                    <FolderOutlinedIcon sx={{ marginTop: '5px', marginRight: '10px', color: 'gray' }} />
                                                    <Typography sx={{ fontSize: '15px', fontWeight: '420', display: 'inline-flex', flexDirection: 'row', marginTop: '7px' }}>
                                                        {e.estante}
                                                    </Typography>
                                                </AccordionSummary>
                                                {e.bandejas.map((b: any, sub_index: number) => (
                                                    <Grid item xs={12} sm={12} key={sub_index} sx={{ marginLeft: '50px' }}>
                                                        <Accordion expanded={expandir_bandeja === 'panelB' + (index + 1)} onChange={handle_change_bandeja('panelB' + (index + 1))}>
                                                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panelB-content" id="panelB-header">
                                                                <FolderOutlinedIcon sx={{ marginTop: '5px', marginRight: '10px', color: 'gray' }} />
                                                                <Typography sx={{ fontSize: '15px', fontWeight: '420', display: 'inline-flex', flexDirection: 'row', marginTop: '7px' }}>
                                                                    {b.bandeja}
                                                                </Typography>
                                                            </AccordionSummary>
                                                            {b.cajas.map((cj: any, sub_index: number) => (
                                                                <Grid item xs={12} sm={12} key={sub_index} sx={{ marginLeft: '50px' }}>
                                                                    <Accordion expanded={expandir_cajas === 'panelCj' + (index + 1)} onChange={handle_change_cajas('panelCj' + (index + 1))}>
                                                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panelCj-content" id="panelCj-header">
                                                                            <FolderOutlinedIcon sx={{ marginTop: '5px', marginRight: '10px', color: 'gray' }} />
                                                                            <Typography sx={{ fontSize: '15px', fontWeight: '420', display: 'inline-flex', flexDirection: 'row', marginTop: '7px' }}>
                                                                                {cj.caja}
                                                                            </Typography>
                                                                        </AccordionSummary>
                                                                        <AccordionDetails sx={{ marginLeft: '50px' }}>
                                                                            {cj.carpetas.map((cp: any, sub_index: number) => (
                                                                                <Grid item xs={12} sm={12} key={sub_index}>
                                                                                    <Grid item xs={12} sm={12}>
                                                                                        <Typography sx={{ fontSize: '16px', fontWeight: '410', color: 'gray', display: 'inline-flex', flexDirection: 'row', cursor: 'pointer' }}>
                                                                                            <FolderOutlinedIcon sx={{ marginRight: '10px', color: 'gray' }} />
                                                                                            {cp.carpeta}
                                                                                        </Typography>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            ))}
                                                                        </AccordionDetails>
                                                                    </Accordion>
                                                                </Grid>
                                                            ))}
                                                        </Accordion>
                                                    </Grid>
                                                ))}
                                            </Accordion>
                                        </Grid>
                                    ))}
                                </Accordion>
                            </Grid>))}
                    </Grid>}
                    <Grid container>
                        <Grid item xs={12} sm={4}>
                            <Box component="form" noValidate autoComplete="off" sx={{ mt: '20px' }}>
                                <Stack direction="row" justifyContent="flex-start" spacing={2}>
                                    <Button
                                        color='primary'
                                        variant='outlined'
                                        startIcon={<ListOutlinedIcon />}
                                        onClick={() => { validar_permiso_acceso() }}
                                    >
                                        Conceder acceso a expediente
                                    </Button>
                                    {abrir_modal_conceder && <ConcederAccesoExpediente is_modal_active={abrir_modal_conceder} set_is_modal_active={set_abrir_modal_conceder} expediente={props.expediente} ></ConcederAccesoExpediente>}
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Box component="form" noValidate autoComplete="off" sx={{ mt: '20px' }}>
                                <Stack direction="row" justifyContent="flex-end" spacing={2}>
                                    <Button
                                        color="primary"
                                        variant="outlined"
                                        startIcon={<CloudDownloadOutlinedIcon />}
                                        onClick={() => { descargar_expediente_id() }}
                                    >
                                        Descargar expediente
                                    </Button>
                                    <Button
                                        color="primary"
                                        variant='outlined'
                                        startIcon={<ListOutlinedIcon />}
                                        onClick={() => { }}
                                    >
                                        Ver índice electrónico
                                    </Button>
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </>
    )
}