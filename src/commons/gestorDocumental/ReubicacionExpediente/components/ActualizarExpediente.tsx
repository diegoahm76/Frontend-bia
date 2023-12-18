/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import { miEstilo } from '../interfaces/types';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';
import { Title } from '../../../../components';
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Stack, Typography, } from '@mui/material';
import FolderIcon from "@mui/icons-material/Folder";
import MoverCarpeta from '../../deposito/Carpetas/components/MoverCarpeta';
import { IObjCarpeta } from '../../deposito/interfaces/deposito';
import { useForm } from "react-hook-form";
import { eliminar_carpeta } from '../../deposito/store/thunks/deposito';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { control_error, control_success } from '../../../../helpers';


export const ActualizarExpediente: React.FC = () => {
    const [carpetas, set_carpetas] = useState<any>([]);
    const [open_modal, set_open_modal] = useState(false); 1
    const [expanded, set_expanded] = useState<string | false>('panel1');
    const { control: control_carpeta_destino, reset: reset_carpeta_destino, getValues: get_values_carpeta_destino, handleSubmit: handle_submit_carpeta_destino } = useForm<IObjCarpeta>();
    
    const handle_close_buscar = () => {
        set_open_modal(false);
    };

    const handle_mover_carpeta = (carpeta_mover: any) => {
        reset_carpeta_destino(carpeta_mover);
        let carpetas_new = carpetas;
        carpetas_new.push({ ruta: carpeta_mover.identificacion_caja + ' > ' + carpeta_mover.identificacion_bandeja + ' > ' + carpeta_mover.identificacion_estante + ' > ' + carpeta_mover.identificacion_deposito, carpetas: [{ id_carpeta_caja: carpeta_mover.id_carpeta, carpeta: carpeta_mover.identificacion_carpeta }] });
        set_carpetas([...carpetas_new]);
        control_success("Carpeta agregada exitosamente");
    };
    const handle_change = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        set_expanded(newExpanded ? panel : false);
    };

    const eliminar_carpeta = (index: number, sub_index: number): void => {
        let carpetas_local = [...carpetas];
        carpetas_local[index].carpetas.splice(sub_index, 1);
        if (carpetas_local[index].carpetas.length === 0)
            carpetas_local.splice(index, 1);
        control_error("Carpeta eliminada exitosamente");
        set_carpetas([...carpetas_local]);
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



    return (
        <>
            <Grid container
                item xs={12} spacing={2} marginLeft={2} marginRight={2} marginTop={3}
                sx={miEstilo}
            >
                <Grid item xs={12} >

                    <Title title="Actualización de ubicación física " />
                </Grid>


                <Grid item xs={12} sm={6}>
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={() => { set_open_modal(true) }}
                    >
                        Agregar
                    </Button>
                    {open_modal && (
                        <Grid item xs={12} marginY={1}>
                            <MoverCarpeta
                                control_carpeta_destino={control_carpeta_destino}
                                open={open_modal}
                                handle_close_buscar={handle_close_buscar}
                                get_values={get_values_carpeta_destino}
                                handle_mover_carpeta={handle_mover_carpeta}
                            />
                        </Grid>
                    )}
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
                                                        <Stack
                                                            direction="row"
                                                            justifyContent="flex-end"
                                                        >
                                                            <ClearOutlinedIcon onClick={() => { eliminar_carpeta(index, sub_index) }} sx={{ color: 'red', cursor: 'pointer' }} />
                                                        </Stack>
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                        ))}
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                        </Stack>
                    </Grid>))}




































                <Grid item xs={12} sm={7.8}>
                    
                </Grid>
                {/* <Grid item xs={12} sm={1}>
                    <ButtonSalir />



                </Grid> */}
                <Grid item xs={12} sm={1.6}>
                    <Button startIcon={<SaveIcon />} color='success' fullWidth variant="contained">
                        Guardar
                    </Button>
                </Grid>
                <Grid item xs={12} sm={1.6}>
                    <Button
                        color='primary' variant="outlined" fullWidth startIcon={<CleanIcon />}
                    >
                        Limpiar
                    </Button>
                </Grid>
            </Grid>

        </>
    );
};
