import {
    Box,
    Button,
    Grid,
    Stack,
    TextField
} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import BuscarArticuloComponent from './BuscarArticulo';
import use_buscar_articulo from './hooks/useBuscarArticulo';
import use_previsualizacion from "./hooks/usePrevisualizacion";
import { useCallback, useEffect, useState } from "react";
import { get_cv_vehicle_service } from "../../../hojaDeVidaVehiculo/store/thunks/cvVehiclesThunks";
import { get_cv_computer_service } from "../../../hojaDeVidaComputo/store/thunks/cvComputoThunks";
import { get_cv_others_service } from "../../../hojaDeVidaOtrosActivos/store/thunks/cvOtrosActivosThunks";
import { useAppDispatch } from "../../../../../../../hooks";

// const tipo_articulo = [{ value: 'Com', label: 'Computo' }, { value: 'Veh', label: 'Vehiculo' }, { value: 'OAc', label: 'Otro' }]
interface IProps {
    tipo_articulo: string,
    parent_details: any,
    user_info_prop: any,
    limpiar_formulario: boolean,
    detalle_seleccionado_prop: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ArticuloComponent: React.FC<IProps> = ({ tipo_articulo, parent_details, user_info_prop, limpiar_formulario,detalle_seleccionado_prop}: IProps) => {
  const dispatch = useAppDispatch();

    const {        // States
        title,
        consulta_buscar_articulo_is_active,
        // Edita States
        set_title,
        set_buscar_articulo_is_active } = use_buscar_articulo();

    const {
        detalle_seleccionado,
        user_info,
        set_detalle_seleccionado,
        set_user_info
    } = use_previsualizacion();

    const [codigo_bien, set_codigo_bien] = useState<string | null>("");
    const [nombre, set_nombre] = useState<string | null>("");

    const busqueda_articulo: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value !== null && e.target.value !== undefined && e.target.value !== ''){
            if(tipo_articulo ==='vehículos'){
                dispatch(get_cv_vehicle_service(e.target.value)).then((response: any) => {
                  set_detalle_seleccionado(response);
                })
            }else if(tipo_articulo ==='computadores'){
                dispatch(get_cv_computer_service(e.target.value)).then((response: any) => {
                    set_detalle_seleccionado(response.data);
                })
            }else{
                dispatch(get_cv_others_service(e.target.value)).then((response: any) => {
                    set_detalle_seleccionado(response);
                })
            }
        }
    }
    const set_form: any = (data: any) => {
        set_nombre(data.nombre);
        set_codigo_bien(data.codigo_bien);
    }
    useEffect(() => {
        if (detalle_seleccionado_prop !== undefined && detalle_seleccionado_prop !== null) {
            set_form(detalle_seleccionado_prop);
        }
    }, [detalle_seleccionado_prop]);

    const set_details_state = useCallback((val: any) => {
        set_detalle_seleccionado(val);
    }, [set_detalle_seleccionado]);

    useEffect(() => {
        set_detalle_seleccionado(detalle_seleccionado);
    }, [set_detalle_seleccionado]);

    useEffect(() => {
        parent_details(detalle_seleccionado);
    }, [parent_details, detalle_seleccionado]);

    useEffect(() => {
        const data = localStorage.getItem('persist:macarenia_app');
        if (data !== null) {
            const data_json = JSON.parse(data);
            const data_auth = JSON.parse(data_json.auth);
            set_user_info(data_auth.userinfo);
        }
    }, []);

    useEffect(() => {
        user_info_prop(user_info);
    }, [user_info]);

    useEffect(() => {
        if (limpiar_formulario) {
            set_codigo_bien('');
            set_nombre('');
        }
    }, [limpiar_formulario]);

    useEffect(() => {
        if (detalle_seleccionado !== undefined && detalle_seleccionado !== null) {
            set_form(detalle_seleccionado);
        }
    }, [detalle_seleccionado]);

    return (
        <>
            <Box
                component="form"
                sx={{ mt: '20px' }}
                noValidate
                autoComplete="off"
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Código"
                            helperText="Ingresar Código"
                            size="small"
                            required
                            value={codigo_bien}
                            onBlur={busqueda_articulo}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Nombre"
                            helperText="Nombre"
                            size="small"
                            value={nombre}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Stack
                            direction="row"
                            justifyContent="flex-end"
                            spacing={2}
                            sx={{ mb: '20px' }}
                        >
                            <Button
                                color='primary'
                                variant='contained'
                                startIcon={<SearchIcon />}
                                onClick={() => {
                                    set_buscar_articulo_is_active(true);
                                    set_title(tipo_articulo);
                                }}
                            >
                                Buscar {tipo_articulo}
                            </Button>
                            {consulta_buscar_articulo_is_active && (
                                <BuscarArticuloComponent
                                    is_modal_active={consulta_buscar_articulo_is_active}
                                    set_is_modal_active={set_buscar_articulo_is_active}
                                    title={title} parent_details={set_details_state} />
                            )}
                        </Stack>
                    </Grid>
                </Grid>
            </Box>

        </>
    )
}