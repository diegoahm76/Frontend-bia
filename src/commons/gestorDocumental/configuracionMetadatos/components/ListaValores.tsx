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




// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const ValoresMetadatos = () => {
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
        console.log(selected_metadato)
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

        console.log(valores_metadatos)

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
                console.log(err);
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
            console.log(data_edit)
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

        console.log(selected_metadato)

    }
    const on_submit_agregar_valor = (data: IObjValoresMetadatos): void => {

        if (
            selected_metadato.id_metadato_personalizado !== null &&
            selected_metadato.id_metadato_personalizado !== undefined

        ) {
            orden_dentro_de_lista++;

            const data_valor = {
                ...data,
                id_metadato_personalizado: selected_metadato.id_metadato_personalizado,
                orden_dentro_de_lista: orden_dentro_de_lista
            }
            void dispatch(crear_valor_metadato(data_valor))
            void dispatch(get_valores_metadatos())
        }

    }

    return (
        <>




            <Grid
                container
                spacing={2}
                m={2}
                p={2}
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    m: '10px 0 20px 0',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                    display: 'flex',           // Centra los elementos horizontalmente
                    justifyContent: 'center',
                    alignItems: 'center',  // Centra los elementos verticalmente
                    width: '100%'
                }}
            >

                <Grid container spacing={2} marginTop={2} justifyContent="center">
                    <Title title="LISTA DE VALORES" />
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', }}   >
                        <FormInputController
                            xs={12}
                            md={6}
                            margin={0}
                            control_form={control_valores}
                            control_name="valor_a_mostrar"
                            default_value=''
                            rules={{}}
                            type='text'
                            disabled={false}
                            hidden_text={null}
                            label={"Valor"}
                            helper_text={''}

                        />

                        <Button variant="contained"
                            color="success"
                            sx={{ marginLeft: '10px' }}
                            onClick={handle_submit_valores(on_submit_agregar_valor)}>
                            Guardar valor
                        </Button>
                    </div>
                </Grid>

                <Grid item marginTop={2} spacing={2} xs={6}>


                    <DataGrid
                        density="compact"
                        autoHeight
                        columns={colums_valores_metadatos}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        experimentalFeatures={{ newEditingApi: true }}
                        getRowId={(row) => row.id_lista_valor_metadato_pers}
                        rows={valores_metadatos}
                    />

                </Grid>







            </Grid>


        </>


    );
};

// eslint-disable-next-line no-restricted-syntax
export default ValoresMetadatos;
