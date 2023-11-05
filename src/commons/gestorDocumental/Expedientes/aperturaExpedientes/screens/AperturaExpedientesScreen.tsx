import { Grid, TextField, Box, Button, Stack, InputLabel, FormControl, Select, MenuItem, type SelectChangeEvent } from "@mui/material";
import { Title } from "../../../../../components/Title";
import { useEffect, useState } from "react";
import { obtener_config_expediente, obtener_serie_subserie, obtener_trd_actual, obtener_unidades_marcadas } from "../thunks/aperturaExpedientes";
import { useAppDispatch } from "../../../../../hooks";


interface IProps {
    set_expediente: any,
    set_serie: any,
    set_seccion: any,
    set_tdr: any,
    set_limpiar: boolean
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AperturaExpedientesScreen: React.FC<IProps> = (props: IProps) => {
    const dispatch = useAppDispatch();
    const [tdr, set_tdr] = useState<any>({});
    const [lt_seccion, set_lt_seccion] = useState<any>([]);
    const [seccion, set_seccion] = useState<string>("");
    const [lt_serie, set_lt_serie] = useState<any>([]);
    const [serie, set_serie] = useState<any>("");
    const [tipo_expediente, set_tipo_expediente] = useState<string>("");


    useEffect(() => {
        obtener_trd_actual_fc();
    }, []);

    useEffect(() => {
        if(props.set_limpiar){
            set_seccion("");
            set_serie("");
            set_tipo_expediente("");
            set_lt_serie([]);
        }
    }, [props.set_limpiar]);

    useEffect(() => {
        if (seccion !== "")
            obtener_serie_subserie_fc();
    }, [seccion]);

    useEffect(() => {
        if (serie !== "")
            obtener_config_expediente_fc();
    }, [serie]);

    const obtener_trd_actual_fc: () => void = () => {
        dispatch(obtener_trd_actual()).then((response: any) => {
            set_tdr(response.data);
            props.set_tdr(response.data);
            dispatch(obtener_unidades_marcadas(response.data.id_organigrama)).then((response: any) => {
                set_lt_seccion(response.data);
            })
        })
    }
    const obtener_serie_subserie_fc: () => void = () => {
        dispatch(obtener_serie_subserie(tdr.id_trd, seccion)).then((response: any) => {
            let lista_con_subseries: { id: any; nombre: string; }[] = [];
            response.data.forEach((series: any) => {
                if(series.codigo_subserie !== null)
                    lista_con_subseries.push({id: series, nombre: series.codigo_serie + ' - '+ series.nombre_serie +'/'+series.codigo_subserie + ' - '+ series.nombre_subserie})
                else    
                    lista_con_subseries.push({id: series, nombre: series.codigo_serie + ' - '+ series.nombre_serie})
            });
            set_lt_serie(lista_con_subseries);
        })
    }

    const obtener_config_expediente_fc: () => void = () => {
        dispatch(obtener_config_expediente(serie.id_catserie_unidadorg)).then((response: any) => {
            set_tipo_expediente(response.data.tipo_expediente);
            props.set_expediente(response.data);
        })
    }

    const cambio_seccion: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_serie("");
        set_seccion(e.target.value);
        props.set_seccion(e.target.value);
    }

    const cambio_serie: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_serie(e.target.value);
        props.set_serie(e.target.value);
    }

    return (
        <>
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
                                        label="TDR - actual"
                                        type={'text'}
                                        size="small"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        fullWidth
                                        value={tdr.nombre ?? ""}
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
                                    {lt_seccion.map((m: any) => (
                                        <MenuItem key={m.id_unidad_organizacional} value={m.id_unidad_organizacional}>
                                            {m.codigo_unidad_org_actual_admin_series + ' - '}{m.nombre}
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
                                    {lt_serie.map((m: any) => (
                                        <MenuItem key={m.id} value={m.id}>
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
                                <Grid item xs={12} sm={3}>
                                <TextField
                                        label="Tipo de expediente"
                                        type={'text'}
                                        size="small"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        fullWidth
                                        value={tipo_expediente}
                                    />
                                </Grid>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </>
    )
}