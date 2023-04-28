import { 
    Box, 
    Button, 
    FormControl,
    FormHelperText,
    Grid,
    InputAdornment,
    OutlinedInput,
    Stack,
} from "@mui/material"
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { type crear_mantenimiento } from "../../interfaces/IProps";
import use_previsualizacion from "../mantenimientoGeneral/hooks/usePrevisualizacion";
interface IProps {
    parent_state_setter: any,
    detalle_seleccionado: any,
    tipo_matenimiento: string,
    especificacion: string,
    limpiar_formulario: boolean

}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const KilometrajeComponent:React.FC<IProps> = ({ parent_state_setter, detalle_seleccionado, tipo_matenimiento, especificacion, limpiar_formulario }: IProps) => {
    // Hooks
    const {
        rows,
        set_rows,
        set_detalle_seleccionado,
        set_tipo_mantenimiento,
        set_especificacion,
    } = use_previsualizacion();

    useEffect(() => {
        parent_state_setter(rows);
    }, [parent_state_setter, rows]);

    useEffect(() => {
        set_tipo_mantenimiento(tipo_matenimiento);
    }, [tipo_matenimiento]);

    useEffect(() => {
        set_especificacion(especificacion);
    }, [especificacion]);

    useEffect(() => {
        set_detalle_seleccionado(detalle_seleccionado);
    }, [detalle_seleccionado]);

    useEffect(() => {
        set_cada("");
        set_cada_desde("");
        set_cada_hasta("");
    }, [limpiar_formulario]);

    const [cada, set_cada] = useState("");
    const [cada_desde, set_cada_desde] = useState("");
    const [cada_hasta, set_cada_hasta] = useState("");

    const handle_change_cada: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_cada(e.target.value);
    };
    const handle_change_cada_desde: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_cada_desde(e.target.value);
    };
    const handle_change_cada_hasta: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_cada_hasta(e.target.value);
    };

    const emit_news_mantenimientos = (): void => {
        if(cada !== "" && cada_desde !== "" && cada_hasta !== ""){
            void calcular_kilometros(cada,cada_desde,cada_hasta,[]).then(response => {
                set_rows(response)
            })
        }
    }

    const calcular_kilometros = async (cada: any, cada_desde: any, cada_hasta: any, rows_emit: crear_mantenimiento[]): Promise<crear_mantenimiento[]> => {
        const cada_int = parseInt(cada);
        const cada_desde_int = parseInt(cada_desde);
        const cada_hasta_int = parseInt(cada_hasta);
        rows_emit.push({
                    tipo_programacion: "Por Kilometros",
                    cod_tipo_mantenimiento: tipo_matenimiento,
                    kilometraje_programado: cada_desde,
                    fecha_programada: "",
                    motivo_mantenimiento: especificacion,
                    observaciones: especificacion,
                    fecha_solicitud: dayjs().format("DD-MM-YYYY"),
                    fecha_anulacion: "",
                    justificacion_anulacion: "",
                    ejecutado: false,
                    id_articulo: 170,
                    id_persona_solicita: 1,
                    id_persona_anula: 0
                })
        const cada_proximo = (cada_int + cada_desde_int);
        if(cada_proximo <= cada_hasta_int)    
            void calcular_kilometros(cada,cada_proximo,cada_hasta,rows_emit);   

        return rows_emit;
    }

    useEffect(() => {
        console.log(cada)
        console.log(cada_desde)
        console.log(cada_hasta)
    },[cada,cada_desde,cada_hasta]);
    
  return (
    <>
        <Box
            component="form"
            sx={{ mt: '20px'}}
            noValidate
            autoComplete="off"
        >
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <OutlinedInput
                        endAdornment={<InputAdornment position="end">km</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                        size='small'
                        onChange={handle_change_cada}
                    />
                    <FormHelperText>1) Cada:</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <OutlinedInput
                        endAdornment={<InputAdornment position="end">km</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                        size='small'
                        onChange={handle_change_cada_desde}
                    />
                    <FormHelperText>2) Desde:</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <OutlinedInput
                        endAdornment={<InputAdornment position="end">km</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                        size='small'
                        onChange={handle_change_cada_hasta}
                    />
                    <FormHelperText>Hasta:</FormHelperText>
                </FormControl>
            </Grid>
        </Grid>
        </Box>
        <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ mb: '20px' }}
        >
            <Button
                color='primary'
                variant='contained'
                onClick={emit_news_mantenimientos}
            >
                Agregar
            </Button>
        </Stack>
    </>
  )
}
