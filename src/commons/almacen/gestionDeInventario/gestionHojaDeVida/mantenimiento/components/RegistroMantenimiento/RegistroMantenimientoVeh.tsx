import { Box, Button, Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
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
import { type ejecutar_mantenimiento } from "../../interfaces/IProps";
import { useAppDispatch } from "../../../../../../../hooks";
import dayjs from "dayjs";
import { create_maintenance_record } from "../mantenimientoGeneral/thunks/ExecutionThunks";
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegistroMantenimientoVehComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [limpiar_formulario, set_limpiar_formulario] = useState<boolean>(false);
    const [accion_guardar, set_accion_guardar] = useState<boolean>(false);
    const [detalle, set_detalle] = useState<any>(null);
    const [mantenimiento, set_mantenimiento] = useState<any>(null);
    const [fecha_dias, set_dias_posibles] = useState<any>({});
    const {
        programacion,
        detalle_seleccionado,
        user_info,
        set_detalle_seleccionado,
        set_user_info,
        set_programacion
    } = use_previsualizacion();

    useEffect(() => {
        const data = sessionStorage.getItem('persist:macarenia_app');
        if (data !== null) {
            const data_json = JSON.parse(data);
            const data_auth = JSON.parse(data_json.auth);
            set_user_info(data_auth.userinfo);
        }
    }, []);

    useEffect(() => {
        if(accion_guardar){
            validar_formulario();
            set_accion_guardar(false);
        }
    }, [detalle, accion_guardar])

    useEffect(() => console.log(detalle_seleccionado), [detalle_seleccionado])

    const validar_formulario: () => void = () => {
        if (user_info !== null && programacion !== null && (detalle_seleccionado !== null) && detalle !== null && mantenimiento !== null && accion_guardar) {
            const formulario: ejecutar_mantenimiento = {
                fecha_registrado: dayjs().format("YYYY-MM-DD"),
                // fecha_ejecutado: fecha_dias.fecha_mantenimiento.format("YYYY-MM-DD"),
                fecha_ejecutado: dayjs().subtract(parseInt(detalle.dias_empleados), 'days').format("YYYY-MM-DD"),
                cod_tipo_mantenimiento: mantenimiento.tipo,
                dias_empleados: parseInt(detalle.dias_empleados),
                fecha_estado_anterior: null,
                id_articulo: detalle_seleccionado?.id_articulo || detalle_seleccionado?.articulo,
                cod_estado_final: detalle.estado,
                id_persona_realiza: detalle?.realizado?.id_persona,
                id_persona_diligencia: user_info.id_persona,
                cod_estado_anterior: null,
                acciones_realizadas: mantenimiento.acciones,
                observaciones: detalle.observaciones,
                valor_mantenimiento: detalle.valor,
                contrato_mantenimiento: detalle.contrato,
                id_programacion_mtto: programacion !== null ? programacion.id_programacion_mantenimiento : null
            };
            console.log(formulario);
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
        set_accion_guardar(false);
        set_detalle(null);
        set_mantenimiento(null);
        set_detalle(null);
        set_detalle_seleccionado(null);
        set_programacion(null);
        set_dias_posibles(1);
        setTimeout(() => { set_limpiar_formulario(false); }, 500);
    }

    return (
        <>
            {/* <h1>Registro mantenimiento de vehículos</h1> */}
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
                    <Title title="Ejecución mantenimiento de vehículos" />
                    <BusquedaProgramacionComponent set_prog_seleccion={set_programacion} parent_details={set_detalle_seleccionado} tipo_articulo={"vehículos"} limpiar_formulario={limpiar_formulario} emit_dias_posibles={set_dias_posibles} accion_guardar={accion_guardar}/>
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
                    <Title title="Búsqueda de vehículos" />
                    <BusquedaArticuloComponent tipo_articulo={"vehículos"} parent_details={set_detalle_seleccionado} limpiar_formulario={limpiar_formulario} detalle_programacion={detalle_seleccionado} accion_guardar={accion_guardar}/>
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
                    <Title title='Mantenimiento' />
                    <MantenimientoComponent limpiar_formulario={limpiar_formulario} programacion={programacion} mantenimiento={set_mantenimiento} accion_guardar={accion_guardar} />
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
                    <Title title='Detalles' />
                    <DetallesComponent limpiar_formulario={limpiar_formulario} user_info={user_info} detalles={set_detalle} accion_guardar={accion_guardar} fecha_dias={fecha_dias}/>
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
                                // color='inherit'
                                variant="outlined"
                                startIcon={<CleanIcon />}
                                onClick={limpiar}
                            >
                                Limpiar
                            </Button>
                            <Button
                                color='success'
                                variant='contained'
                                startIcon={<SaveIcon />}
                                onClick={() => {
                                    set_accion_guardar(true)
                                }}
                            >
                                Guardar
                            </Button>
                            <Button
                                color='error'
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
            </Grid>

        </>
    )
}

