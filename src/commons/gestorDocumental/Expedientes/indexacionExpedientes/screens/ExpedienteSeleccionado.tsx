import { Grid, TextField, Box, Stack, Accordion, AccordionSummary, Typography, AccordionDetails } from "@mui/material";
import { Title } from "../../../../../components/Title";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import { useEffect, useState } from "react";

interface IProps {
    expediente: any,
    configuracion: any,
    limpiar: boolean
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ExpedienteSeleccionado: React.FC<IProps> = (props: IProps) => {
    const [expanded, set_expanded] = useState<string | false>('panel1');
    const [carpetas, set_carpetas] = useState<any>([]);

    useEffect(() => {
        if (props.expediente !== null) {
            if (props.expediente.carpetas_caja.length > 0)
                crear_obj_carpetas(props.expediente);
        }
    }, [props.expediente]);

    const handle_change = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        set_expanded(newExpanded ? panel : false);
    };

    const crear_obj_carpetas: any = (expediente: any) => {
        let obj_carpetas: { ruta: string; carpetas: any; }[] = [];
        expediente?.carpetas_caja.forEach((dp: any) => {
            dp.estantes?.forEach((st: any) => {
                st.bandejas?.forEach((bj: any) => {
                    bj.cajas?.forEach((cj: any) => {
                        obj_carpetas.push({ ruta: dp.deposito + ' > ' + st.estante + ' > ' + bj.bandeja + ' > ' + cj.caja, carpetas: cj.carpetas })
                    });
                });
            });
        });
        set_carpetas(obj_carpetas);
    }

    useEffect(() => {
        if (props.limpiar) {
            set_carpetas([]);
        }
    }, [props.limpiar]);

    return (
        <>
            {/*{props.expediente !== null &&*/} 
            <Grid item md={12} xs={12}>
                <Title title="Expediente seleccionado" />
                <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <Stack
                                direction="row"
                                justifyContent="center"
                                spacing={2}
                            >
                                <Grid item xs={12} sm={props.configuracion?.cod_tipo_expediente === 'C' ? 6 : 8}>
                                    <TextField
                                        label="Titulo"
                                        type={'text'}
                                        size="small"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        fullWidth
                                        value={props.expediente?.titulo_expediente ?? ''}
                                    />
                                </Grid>
                                {props.configuracion?.cod_tipo_expediente === 'C' && <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Consecutivo"
                                        type={'text'}
                                        size="small"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        fullWidth
                                        value={props.expediente?.codigo_exp_consec_por_agno}
                                    />
                                </Grid>}
                            </Stack>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <Stack
                                direction="row"
                                justifyContent="center"
                            >
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        label="Descripción"
                                        multiline
                                        rows={3}
                                        type={'text'}
                                        size="small"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        fullWidth
                                        value={props.expediente?.descripcion_expediente}
                                    />
                                </Grid>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Stack
                                direction="row"
                                justifyContent="center"
                                spacing={2}
                                sx={{ mt: '10px' }}
                            >
                                <Grid item xs={12} sm={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Fecha creación expediente"
                                            value={dayjs(props.expediente?.fecha_apertura_expediente)}
                                            inputFormat='DD/MM/YYYY'
                                            onChange={(newValue) => { }}
                                            readOnly={true}
                                            renderInput={(params) => (
                                                <TextField
                                                    required
                                                    fullWidth
                                                    size="small"
                                                    {...params}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Stack>
                        </Grid>
                        {carpetas.map((c: any, index: number) => (
                            <Grid item xs={12} sm={12} key={index}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                    spacing={2}
                                >
                                    <Grid item xs={12} sm={6}>
                                        <Accordion expanded={expanded === 'panel' + index} onChange={handle_change('panel' + index)} sx={{ padding: '0px' }}>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1d-content" id="panel1d-header">
                                                <FolderOutlinedIcon sx={{ marginTop: '5px', marginRight: '10px' }} />
                                                <Typography sx={{ fontSize: '16px', fontWeight: '420', display: 'inline-flex', flexDirection: 'row', marginTop: '7px' }}>
                                                    {c.ruta}
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {c.carpetas.map((carp: any, sub_index: number) => (
                                                    <Grid item xs={12} sm={12} key={sub_index}>
                                                        <Grid item xs={12} sm={6}>
                                                            <Typography sx={{ fontSize: '16px', fontWeight: '410', color: 'gray', display: 'inline-flex', flexDirection: 'row' }}>
                                                                <FolderIcon sx={{ marginRight: '10px', color: 'gray' }} />
                                                                {carp.carpeta}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>

                                                ))}
                                            </AccordionDetails>
                                        </Accordion>
                                    </Grid>
                                </Stack>
                            </Grid>))}
                    </Grid>
                </Box>
            </Grid>
            
         {/*  } */}
        </>
    )
}