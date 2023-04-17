import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Button,
    Box,
    Divider,
    Grid,
    MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { add_bodega_service, edit_bodega_service } from '../../store/thunks/BodegaThunks';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/';
import { type IList } from '../../interfaces/MarcaMedidaPorcentaje';
import { api } from '../../../../../api/axios';


// import { type IList } from "../interfaces/marca";

interface IProps {
    action: string,
    is_modal_active: boolean;
    set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

interface FormValues {
    id_bodega: number;
    nombre: string;
    cod_municipio: string;
    direccion: string;
    id_responsable: {
        id_persona: number;
        tipo_documento: {
            cod_tipo_documento: string;
            nombre: string;
            precargado: boolean;
            activo: boolean;
            item_ya_usado: boolean;
        }
    },
    es_principal: boolean;


}
const initial_options: IList[] = [
    {
        label: '',
        value: '',
    },
];
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const CrearBodegaModal = ({
    action,
    is_modal_active,
    set_is_modal_active,
}: IProps) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { bodega_seleccionada } = useAppSelector((state) => state.bodegas);
    const [municipios, set_municipios] = useState<IList[]>(initial_options);
    // const { id_responsable } = useAppSelector((state) => state.bodegas);

    const { control: control_bodega, handleSubmit: handle_submit } = useForm<FormValues>();

    // eslint-disable-next-line @typescript-eslint/naming-convention

    const handle_close_add_bodega = (): void => {
        set_is_modal_active(false);
    };


    useEffect(() => {
        //  reset_bodega(bodega_seleccionada);
        console.log(bodega_seleccionada);
    }, [bodega_seleccionada]);

    const on_submit = (data: FormValues): void => {
        const form_data: any = new FormData();
        form_data.append('id_bodega', data.id_bodega);
        form_data.append('nombre', data.nombre);
        form_data.append('direccion', data.direccion);
        form_data.append('cod_municipio', data.cod_municipio);
        form_data.append('es_principal', data.es_principal);
        //  form_data.append('id_persona', data.id_persona);
        // form_data.append('tipo_documento', data.tipo_documento);

        void dispatch(add_bodega_service(form_data, navigate));
        handle_close_add_bodega();
    };
    const on_submit_edit = (data: FormValues): void => {
        const form_data: any = new FormData();
        form_data.append('nombre', data.nombre);
        form_data.append('direccion', data.direccion);
        form_data.append('cod_municipio', data.cod_municipio);

        void dispatch(edit_bodega_service(data, bodega_seleccionada.id_bodega, navigate));
        handle_close_add_bodega();
    }
    const text_choise_adapter: any = (dataArray: string[]) => {
        const data_new_format: IList[] = dataArray.map((dataOld) => ({
            label: dataOld[1],
            value: dataOld[0],
        }));
        return data_new_format;
    }

    useEffect(() => {
        const get_selects_options: any = async () => {
            try {
                const { data: municipio_no_format } = await api.get(
                    'choices/municipios/'
                );

                const municipio_format = text_choise_adapter(
                    municipio_no_format
                );
                set_municipios(municipio_format);

            } catch (err) {
                console.log(err);
            }
        };
        void get_selects_options();
        // void dispatch(get_id_responsable_service());
    }, []);



    return (
        <Dialog
            maxWidth="xl"
            open={is_modal_active}
            onClose={handle_close_add_bodega}
        >
            <Box
                component="form"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={action === "create" ? handle_submit(on_submit) : handle_submit(on_submit_edit)}
            >
                <DialogTitle>{action === "create" ? "Crear bodega" : action === "detail" ? "Detalle Medida" : "Editar Medida"}</DialogTitle>
                <Divider />
                <DialogContent sx={{ mb: '0px' }}>

                    <Grid container >

                        <Grid xs={11} md={11} margin={1}>
                            <Controller
                                name="nombre"
                                control={control_bodega}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        margin="dense"
                                        fullWidth
                                        size="small"
                                        label="Bodega"
                                        variant="outlined"
                                        value={value}
                                        onChange={onChange}
                                        error={!(error == null)}
                                        helperText={
                                            error != null
                                                ? 'Es obligatorio ingresar una unidad de medida'
                                                : 'Ingrese unidad de medida'
                                        }
                                    />
                                )}
                            />
                        </Grid>

                        <Grid xs={11} md={11} margin={1}>
                            <Controller
                                name="direccion"
                                control={control_bodega}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        margin="dense"
                                        fullWidth
                                        size="small"
                                        label="Direccion"
                                        variant="outlined"
                                        value={value}
                                        onChange={onChange}
                                        error={!(error == null)}

                                    />
                                )}
                            />
                        </Grid>
                        <Grid xs={11} md={11} margin={1}>

                            <Controller
                                name="cod_municipio"
                                control={control_bodega}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        margin="dense"
                                        fullWidth
                                        select
                                        size="small"
                                        label="Municipio"
                                        variant="outlined"
                                        defaultValue={value}
                                        value={value}
                                        onChange={onChange}
                                        error={!(error == null)}
                                        helperText={
                                            error != null
                                                ? 'Es obligatorio seleccionar una Magnitud'
                                                : 'Seleccione magnitud'
                                        }
                                    >
                                        {municipios.map((option: IList) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />

                        </Grid>
                        <Grid item xs={11} md={5} margin={1}>
                            <Controller
                                name="es_principal"
                                control={control_bodega}
                                defaultValue={true}
                                rules={{ required: true }}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        margin="dense"
                                        fullWidth
                                        select
                                        size="small"
                                        label="Es bodega principal"
                                        variant="outlined"
                                        disabled={action === "detail"}
                                        defaultValue={value}
                                        value={value}
                                        onChange={onChange}
                                        error={!(error == null)}
                                        helperText={
                                            error != null
                                                ? 'Es obligatorio seleccionar una opción'
                                                : 'Seleccionar opción'
                                        }
                                    >
                                        <MenuItem value="true">SI</MenuItem>
                                        <MenuItem value="false">NO</MenuItem>
                                    </TextField>
                                )}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ mr: '15px', mb: '10px', mt: '10px' }}
                    >
                        <Button
                            variant="outlined"
                            onClick={handle_close_add_bodega}
                            startIcon={<CloseIcon />}
                        >
                            CERRAR
                        </Button>
                        {action === "create" ?
                            <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
                                GUARDAR
                            </Button> :
                            action === "edit" ?
                                <Button type="submit" variant="contained" startIcon={<EditIcon />}>
                                    EDITAR
                                </Button> :
                                null
                        }
                    </Stack>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

// eslint-disable-next-line no-restricted-syntax
export default CrearBodegaModal;
