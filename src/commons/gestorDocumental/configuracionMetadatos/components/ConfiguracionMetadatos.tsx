import { Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, TextField, Tooltip, Typography } from '@mui/material';
import { Title } from '../../../../components/Title';
import FormInputController from '../../../../components/partials/form/FormInputController';
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from '@mui/icons-material/Add';
import type { IMetadatos, IObjValoresMetadatos, } from '../interfaces/Metadatos';
import { Controller, useForm } from 'react-hook-form';
import FormSelectController from '../../../../components/partials/form/FormSelectController';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect, useState } from 'react';
import { api } from '../../../../api/axios';
import { v4 as uuidv4 } from 'uuid';
import { IList } from '../../../../interfaces/globalModels';
import { crear_metadato, crear_valor_metadato, editar_metadato, eliminar_metadato, get_metadatos, get_valores_metadato, get_valores_metadatos } from '../store/thunks/metadatos';
import { initial_state_metadato, initial_state_valor_metadato, set_current_valor_metadato } from '../store/slice/indexMetadatos';
import ListadoMetadatos from './ListarMetadatos';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';
import FormButton from '../../../../components/partials/form/FormButton';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ValoresMetadatos from './ListaValores';




// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const ConfiguracionMetadatos = () => {
    const { control: control_metadatos, reset, handleSubmit: handle_submit, watch } = useForm<IMetadatos>();

    const { control: control_valores, reset: reset_valores, handleSubmit: handle_submit_valores, } = useForm<IObjValoresMetadatos>();

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const { valores_metadatos, current_valor_metadato, } = useAppSelector((state) => state.metadatos);
    const [tipos_datos, set_tipos_datos] = useState<IList[]>([]);
    const [agregar_valor, set_agregar_valor] = useState(false);
    const [action, set_action] = useState<string>("Guardar");
    const [valores_metadatos_loaded, set_valores_metadatos_loaded] = useState(false);
    const [selected_metadato, set_selected_metadato] = useState<IMetadatos>(initial_state_metadato);
    const [selected_valor, set_selected_valor] = useState<IObjValoresMetadatos>(initial_state_valor_metadato);
    let orden_dentro_de_lista = 0;
    const dispatch = useAppDispatch();
    const text_choise_adapter: any = (dataArray: string[]) => {
        const data_new_format: IList[] = dataArray.map((dataOld) => ({
            label: dataOld[1],
            value: dataOld[0],
        }));
        return data_new_format;
    };
    const selected_tipo_dato = watch('cod_tipo_dato_alojar');



    // editar desde la tabla
    const handle_edit_click = (metadato: IMetadatos) => {
        set_selected_metadato(metadato);
        set_action("Editar");
    };

    // editar desde la tabla
    const handle_edit_valores_click = (valores: IObjValoresMetadatos) => {
        set_selected_valor(valores);
        // set_action("Editar");
    };

    // asignar valor 
    useEffect(() => {
        reset_valores(selected_valor);
    }, [selected_valor]);


    // asignar metadatos de la tabla al formulario
    useEffect(() => {
        //  console.log('')(selected_metadato)
        reset(selected_metadato);
    }, [selected_metadato]);

    useEffect(() => {
        if (!valores_metadatos_loaded) {
            void dispatch(get_valores_metadato()).then(() => {
                set_valores_metadatos_loaded(true);
            });
        }
    }, [valores_metadatos_loaded, dispatch]);


    useEffect(() => {
        void dispatch(get_metadatos());
        void dispatch(get_valores_metadatos())


    }, [])

   


    useEffect(() => {
        const get_selects_options: any = async () => {
            try {
                const { data: tipos_datos_no_format } = await api.get(
                    'gestor/choices/tipo-dato-alojar/'
                );

                const tipos_datos_format: IList[] = text_choise_adapter(
                    tipos_datos_no_format
                );

                set_tipos_datos(tipos_datos_format);
            } catch (err) {
                //  console.log('')(err);
            }
        };

        void get_selects_options();
    }, []);


    const handle_valor = () => {
        set_agregar_valor(true)
    }


    const colums_valores_metadatos: GridColDef[] = [
        {
            field: 'orden_dentro_de_lista',
            width: 100,
            headerName: 'ÓRDEN',


        },

        {
            field: 'valor_a_mostrar',
            width: 300,
            headerName: 'LISTA DE VALORES',


        },
        {
            field: '',
            width: 300,
            headerName: 'ACCIONES',
            renderCell: (params) => (
                <Button
                    onClick={() => handle_edit_valores_click(params.row)}
                    startIcon={<ChecklistIcon />}
                >

                </Button>
            ),


        },


    ]


    const on_submit = (data: IMetadatos): void => {


        if (action === "Editar" && selected_metadato) {
            const data_edit = {
                ...selected_metadato,
                ...data,
            }
            //  console.log('')(data_edit)
            void dispatch(editar_metadato(selected_metadato.id_metadato_personalizado, data_edit))

        } else {

            const data_aux = {
                ...data,
                longitud_dato_alojar: data.longitud_dato_alojar ? Number(data.longitud_dato_alojar) : undefined,
                valor_minimo: data.valor_minimo ? Number(data.valor_minimo) : undefined,
                valor_maximo: data.valor_maximo ? Number(data.valor_maximo) : undefined,
                orden_aparicion: data.orden_aparicion ? Number(data.orden_aparicion) : undefined,
            };
            void dispatch(crear_metadato(data_aux));
        }
        set_action("Guardar");
        set_selected_metadato(initial_state_metadato);

        void dispatch(get_metadatos());
    }


    const on_submit_elimnar = (data: IMetadatos): void => {

        if (
            selected_metadato.id_metadato_personalizado !== null &&
            selected_metadato.id_metadato_personalizado !== undefined

        ) {
            void dispatch(
                eliminar_metadato(selected_metadato.id_metadato_personalizado)
            );
            void dispatch(get_metadatos());
        }

        //  console.log('')(selected_metadato)

    }
 
    return (
        <>
            <Grid container spacing={2} justifyContent={'center'}>
                <Title title="CONFIGURACIÓN DE METADATOS" />

                <FormInputController
                    xs={12}
                    md={6}
                    margin={0}
                    control_form={control_metadatos}
                    control_name="nombre_metadato"
                    default_value=''
                    rules={{}}
                    type="text"
                    disabled={false}
                    helper_text=""
                    hidden_text={null}
                    label={"Nombre"}
                />
                <FormInputController
                    xs={12}
                    md={6}
                    margin={0}
                    control_form={control_metadatos}
                    control_name="nombre_a_mostrar"
                    default_value=''
                    rules={{}}
                    type="text"
                    disabled={false}
                    helper_text=""
                    hidden_text={null}
                    label={"Nombre para mostrar al usuario"}
                />
                <FormInputController
                    xs={12}
                    md={12}
                    margin={0}
                    control_form={control_metadatos}
                    control_name="descripcion"
                    default_value=''
                    rules={{}}
                    type="text"
                    multiline_text={true}
                    rows_text={3}
                    disabled={false}
                    helper_text=""
                    hidden_text={null}
                    label={"Descripción"} />

                <FormSelectController
                    xs={12}
                    md={3}
                    marginTop={2}
                    control_form={control_metadatos}
                    control_name={'cod_tipo_dato_alojar'}
                    default_value=''
                    rules={{}}
                    label='Tipo de dato'
                    disabled={false}
                    helper_text=''
                    select_options={tipos_datos}
                    option_label='label'
                    option_key='value'
                    multiple={false}
                    hidden_text={false}
                    auto_focus={false}
                />
                <FormInputController
                    xs={12}
                    md={3}
                    margin={0}
                    marginTop={2}
                    control_form={control_metadatos}
                    control_name="longitud_dato_alojar"
                    default_value=''
                    rules={{}}
                    type='number'
                    disabled={false}
                    hidden_text={null}
                    label={"Longitud de dato"}
                    helper_text={''} />
                <FormInputController
                    xs={12}
                    md={3}
                    margin={0}
                    marginTop={2}
                    control_form={control_metadatos}
                    control_name="valor_minimo"
                    default_value=''
                    rules={{}}
                    type='number'
                    disabled={selected_tipo_dato === 'Tx' || selected_tipo_dato === 'Fe'}
                    hidden_text={null}
                    label={"Valor minimo"}
                    helper_text={''} />
                <FormInputController
                    xs={12}
                    md={3}
                    margin={0}
                    marginTop={2}
                    control_form={control_metadatos}
                    control_name="valor_maximo"
                    default_value=''
                    rules={{}}
                    type='number'
                    disabled={selected_tipo_dato === 'Tx' || selected_tipo_dato === 'Fe'}
                    helper_text=""
                    hidden_text={null}
                    label={"Valor máximo"}
                />


            </Grid>

            <Grid container spacing={2} >

                <Grid item xs={12} sm={3} marginTop={2}>
                    <Controller
                        name="orden_aparicion"
                        control={control_metadatos}
                        rules={{ required: true }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                size="small"
                                label="Órden"
                                variant="outlined"
                                disabled={false}
                                defaultValue={value}
                                value={value}
                                onChange={onChange}
                                error={!(error == null)}

                            >

                            </TextField>
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={3} marginTop={2}>
                    <Controller
                        name="esObligatorio"
                        control={control_metadatos}
                        defaultValue={true}
                        rules={{ required: true }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                select
                                size="small"
                                label="¿Es Obligatorio?"
                                variant="outlined"
                                disabled={false}
                                defaultValue={value}
                                value={value}
                                onChange={onChange}
                                error={!(error == null)}
                            >
                                <MenuItem value="true">SI</MenuItem>
                                <MenuItem value="false">NO</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={3} marginTop={2}>
                    <Controller
                        name="aplica_para_documento"
                        control={control_metadatos}
                        defaultValue={true}
                        rules={{ required: true }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                select
                                size="small"
                                label="¿Aplica para documento?"
                                variant="outlined"
                                disabled={false}
                                defaultValue={value}
                                value={value}
                                onChange={onChange}
                                error={!(error == null)}
                            >
                                <MenuItem value="true">SI</MenuItem>
                                <MenuItem value="false">NO</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={1.5} marginTop={2}>
                    <Controller
                        name="aplica_para_expediente"
                        control={control_metadatos}
                        defaultValue={true}
                        rules={{ required: true }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                select
                                size="small"
                                label="¿Aplica para expediente?"
                                variant="outlined"
                                disabled={false}
                                defaultValue={value}
                                value={value}
                                onChange={onChange}
                                error={!(error == null)}
                            >
                                <MenuItem value="true">SI</MenuItem>
                                <MenuItem value="false">NO</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>
                {selected_metadato.id_metadato_personalizado !== null &&
                    <Grid item xs={12} sm={1.5} marginTop={2} container alignItems="center" justifyContent="flex-end">
                        <Controller
                            name="activo"
                            control={control_metadatos}
                            defaultValue={true}
                            rules={{ required: true }}
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    fullWidth
                                    select
                                    size="small"
                                    label="Estado"
                                    variant="outlined"
                                    disabled={false}
                                    defaultValue={value}
                                    value={value}
                                    onChange={onChange}
                                    error={!(error == null)}
                                >
                                    <MenuItem value="true">ACTIVO</MenuItem>
                                    <MenuItem value="false">INACTIVO</MenuItem>
                                </TextField>
                            )}
                        />
                    </Grid>
                }

            </Grid>
            <Grid container spacing={4} alignItems="center" marginTop={4}>

                <Grid item xs={12} sm={4} marginTop={2}>
                    <Button variant="contained"
                        startIcon={<AddIcon />}
                        color="success"
                        onClick={handle_valor}>
                        Añadir lista de Valores
                    </Button>
                </Grid>
            </Grid>
            {agregar_valor && (
                <ValoresMetadatos selected_metadato={selected_metadato}
                />
            )}





            <ListadoMetadatos
                handle_edit_click={handle_edit_click} />
            <Grid
                container
                direction="row"
                padding={2}
                spacing={2}
            >
                <Grid container justifyContent="flex-end" marginTop={2} spacing={2}>

                    <Grid item xs={12} md={1}>
                        <FormButton
                            variant_button="contained"
                            on_click_function={handle_submit(on_submit)}
                            icon_class={<SaveIcon />}
                            label={action}
                            type_button="button"
                        />
                    </Grid>

                    {(selected_metadato && selected_metadato.id_metadato_personalizado) !== null && (
                        <Grid item xs={12} md={2} >
                            <Button
                                variant="outlined"
                                startIcon={<DeleteIcon />}
                                color="error"
                                onClick={() => { on_submit_elimnar(selected_metadato); }}
                            >
                                Eliminar
                            </Button>
                        </Grid>
                    )}
                    <Grid item xs={12} md={2}>
                        <ButtonSalir />
                    </Grid>
                </Grid>



            </Grid>


        </>


    );
};

// eslint-disable-next-line no-restricted-syntax
export default ConfiguracionMetadatos;
