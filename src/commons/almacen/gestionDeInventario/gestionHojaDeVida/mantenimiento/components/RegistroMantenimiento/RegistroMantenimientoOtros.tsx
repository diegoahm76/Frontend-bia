import { Box, Button, Grid, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import use_previsualizacion from "../mantenimientoGeneral/hooks/usePrevisualizacion";
import { BusquedaProgramacionComponent } from "./RegistroMantenimientoGeneral/BusquedaProgramacion";
import { Title } from "../../../../../../../components";
import { BusquedaArticuloComponent } from "./RegistroMantenimientoGeneral/BusquedaArticulo";
import { MantenimientoComponent } from "./RegistroMantenimientoGeneral/MantenimientoComponent";
import { DetallesComponent } from "./RegistroMantenimientoGeneral/DetallesComponent";
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../../../../hooks";
import { type ejecutar_mantenimiento } from "../../interfaces/IProps";
import dayjs from "dayjs";
import { create_maintenance_record } from "../mantenimientoGeneral/thunks/ExecutionThunks";
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegistroMantenimientoOtrosComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [limpiar_formulario, set_limpiar_formulario] = useState<boolean>(false);
    const [accion_guardar, set_accion_guardar] = useState<boolean>(false);
    const [detalle, set_detalle] = useState<any>(null);
    const [mantenimiento, set_mantenimiento] = useState<any>(null);
    const {
        detalle_seleccionado,
        programacion,
        user_info,
        set_detalle_seleccionado,
        set_tipo_mantenimiento,
        set_user_info,
        set_especificacion,
        set_programacion
    } = use_previsualizacion();

    useEffect(() => {
        const data = localStorage.getItem('persist:macarenia_app');
        if (data !== null) {
            const data_json = JSON.parse(data);
            const data_auth = JSON.parse(data_json.auth);
            set_user_info(data_auth.userinfo);
        }
    }, []);

    const set_details_state = useCallback((val: any) => {
        set_detalle_seleccionado(val);
    }, [set_detalle_seleccionado]);

    const set_detalles = useCallback((val: any) => {
        set_detalle(val);
    }, [set_detalle]);

    const set_mantenimientos = useCallback((val: any) => {
        set_mantenimiento(val);
    }, [set_mantenimiento]);

    const set_prog_seleccionada = useCallback((val: any) => {
        set_programacion(val);
    }, [set_programacion]);

    const set_type_maintenance_state = useCallback((val: string) => {
        set_tipo_mantenimiento(val);
    }, [set_tipo_mantenimiento]);

    const set_esp_maintenance_state = useCallback((val: string) => {
        set_especificacion(val);
    }, [set_especificacion]);

    useEffect(()=>{
        validar_formulario();
    },[detalle])

    const validar_formulario: () => void = () => {
        if(user_info !== null && programacion !== null && detalle_seleccionado !== null && detalle !== null && mantenimiento !== null){
            const formulario: ejecutar_mantenimiento = {
                fecha_registrado: programacion.fecha,
                fecha_ejecutado: dayjs().format("YYYY-MM-DD"),
                cod_tipo_mantenimiento: mantenimiento.tipo,
                dias_empleados:parseInt(detalle.dias_empleados),
                fecha_estado_anterior: null,
                id_articulo: detalle_seleccionado.id_articulo,
                cod_estado_final: detalle.estado,
                id_persona_realiza: user_info.id_persona,
                id_persona_diligencia: user_info.id_persona,
                cod_estado_anterior: null,
                acciones_realizadas: mantenimiento.especificacion,
                observaciones: detalle.observaciones,
                valor_mantenimiento: detalle.valor,
                contrato_mantenimiento: detalle.contrato,
                id_programacion_mtto: programacion.id_programacion_mantenimiento
            };
            registrar_mantenimiento(formulario); 
        }
    }

    const registrar_mantenimiento: any = (formulario: ejecutar_mantenimiento) => {
        dispatch(create_maintenance_record(formulario)).then(() => {
            limpiar();
        });
    }

    const salir_mantenimiento: () => void = () => {
        navigate('/home');
    }

    const limpiar: () => void = () => {
        set_limpiar_formulario(true);
    }
    return (
        <>
            <h1>Registro mantenimiento de otros activos</h1>
            <Grid
                container
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >
                <Grid item xs={12}>
                    <Title title="Búsqueda de programación" />
                    <BusquedaProgramacionComponent set_prog_seleccion={set_prog_seleccionada} parent_details={set_details_state} tipo_articulo={"otros activos"}  limpiar_formulario={limpiar_formulario}/>
                </Grid>
            </Grid>
            <Grid
                container
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >
                <Grid item xs={12}>
                    <Title title="Búsqueda de ostros activos" />
                    <BusquedaArticuloComponent tipo_articulo={"otros activos"} parent_details={set_details_state} limpiar_formulario={limpiar_formulario} detalle_programacion={detalle_seleccionado} />
                </Grid>
            </Grid>
            <Grid container
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}>
                <Grid item xs={12}>
                    <Title title='Mantenimiento'/>
                    <MantenimientoComponent parent_type_maintenance={set_type_maintenance_state} parent_esp_maintenance={set_esp_maintenance_state} limpiar_formulario={limpiar_formulario} programacion={programacion} 
                    mantenimiento={set_mantenimientos} accion_guardar={accion_guardar}/>
                </Grid>
            </Grid>
            <Grid container
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}>
                <Grid item xs={12}>
                    <Title title='Detalles'/>
                    <DetallesComponent parent_type_maintenance={set_type_maintenance_state} parent_esp_maintenance={set_esp_maintenance_state} limpiar_formulario={limpiar_formulario}  
                    user_info={user_info} detalles={set_detalles} accion_guardar={accion_guardar}/>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item md={12} xs={12}>
                    <Box
                        component="form"
                        sx={{ mt: '20px', mb: '20px' }}
                        noValidate
                        autoComplete="off"
                    >
                        <Stack
                            direction="row"
                            justifyContent="flex-end"
                            spacing={2}
                            sx={{ mt: '20px' }}
                        >
                            <Button
                                color='inherit'
                                variant="contained"
                                startIcon={<CleanIcon />}
                                onClick={limpiar}
                            >
                                Limpiar
                            </Button>
                            <Button
                                color='primary'
                                variant='contained'
                                startIcon={<SaveIcon />}
                                onClick={() => {
                                    set_accion_guardar(true)
                                }}
                            >
                                Guardar
                            </Button>
                            <Button
                                color='inherit'
                                variant='contained'
                                startIcon={<ClearIcon />}
                                onClick={salir_mantenimiento}
                            >
                                Salir
                            </Button>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

