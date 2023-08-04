import { Grid } from '@mui/material';
import BuscarModelo from '../../../../../components/partials/getModels/BuscarModelo';
import { useAppDispatch, useAppSelector, } from '../../../../../hooks';
import { set_current_entrega, set_entregas } from '../store/slice/indexEntrega';
import { type IEntrega } from '../interfaces/entregas';
import { useEffect, useState } from 'react';
import type { GridColDef } from '@mui/x-data-grid';
import { get_entregas_services } from '../store/thunks/entregaThunks';

interface IProps {
    control_entrega: any;
    get_values: any;
    open_modal: boolean;
    set_open_modal: any;
}


// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const Seccion = ({ control_entrega, get_values, open_modal, set_open_modal }: IProps) => {
    const dispatch = useAppDispatch();
    const { entregas, current_entrega, persona_entrega } = useAppSelector((state: { entrega_otros: IEntrega; }) => state.entrega_otros)
    const [file, set_file] = useState<any>(null);
    const [file_name, set_file_name] = useState<any>('');
    useEffect(() => {
        if (file !== null) {
            if ('name' in file) {
                set_file_name(file.name);
                dispatch(
                    set_current_entrega({
                        ...current_entrega,
                        fecha_despacho: get_values('fecha_despacho'),
                        motivo: get_values('motivo'),
                        id_persona_despacha: persona_entrega.id_persona,
                        persona_crea: persona_entrega.nombre_completo ?? '',
                        ruta_archivo_doc_con_recibido: file,
                    })
                );
            }
        }
    }, [file]);
    useEffect(() => {
        if (current_entrega.id_entrada_almacen !== null) {
            if (
                current_entrega.ruta_archivo_doc_con_recibido !== null &&
                current_entrega.ruta_archivo_doc_con_recibido !== undefined
            ) {
                set_file_name(String(current_entrega.ruta_archivo_doc_con_recibido));
            }
        }
    }, [current_entrega]);
    const columns_despacho: GridColDef[] = [
        { field: 'numero_despacho_consumo', headerName: 'Número de despacho', width: 100 },
        {
            field: 'fecha_despacho',
            headerName: 'Fecha de despacho',
            width: 400,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },

        {
            field: 'motivo',
            headerName: 'Motivo',
            width: 400,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },

    ];
    const get_entregas: any = async () => {
        console.log("buscar...");
        void dispatch(get_entregas_services()
        );

    };

    return (
        <>
            <Grid container direction="row" padding={2} borderRadius={2}>
                <BuscarModelo
                    set_current_model={set_current_entrega}
                    row_id={'id_despacho_consumo'}
                    models={entregas}
                    columns_model={columns_despacho}
                    get_filters_models={get_entregas}
                    set_models={set_entregas}
                    show_search_button={false}
                    open_search_modal={open_modal}
                    set_open_search_modal={set_open_modal}
                    button_submit_label="Buscar entregas"
                    form_inputs={[
                        {
                            datum_type: 'title',
                            title_label: 'Entrega de bienes de consumo a vivero',
                        },
                        {
                            datum_type: 'input_controller',
                            xs: 12,
                            md: 4,
                            control_form: control_entrega,
                            control_name: 'numero_despacho_consumo',
                            default_value: '',
                            rules: {},
                            label: 'Número entrega',
                            type: 'number',
                            disabled: true,
                            helper_text: '',
                        },
                        {
                            datum_type: 'input_file_controller',
                            xs: 12,
                            md: 4,
                            control_form: control_entrega,
                            control_name: 'ruta_archivo_doc_con_recibido',
                            default_value: '',
                            rules: {
                                required_rule: { rule: false, message: 'Archivo requerido' },
                            },
                            label: 'Archivo soporte',
                            disabled: false,
                            helper_text: '',
                            set_value: set_file,
                            file_name,
                        },


                        {
                            datum_type: 'date_picker_controller',
                            xs: 12,
                            md: 4,
                            control_form: control_entrega,
                            control_name: 'fecha_despacho',
                            default_value: '',
                            rules: {

                            },
                            label: 'Fecha de entrega',
                            disabled: false,
                            helper_text: '',
                            format: 'YYYY-MM-DD',
                        },
                        {
                            datum_type: 'input_controller',
                            xs: 12,
                            md: 12,
                            control_form: control_entrega,
                            control_name: 'motivo',
                            default_value: '',
                            rules: { required_rule: { rule: false, message: 'requerido' } },
                            label: 'Motivo',
                            type: 'text',
                            multiline_text: true,
                            rows_text: 4,
                            disabled: false,
                            helper_text: '',
                        },

                        {
                            datum_type: 'input_controller',
                            xs: 12,
                            md: 12,
                            control_form: control_entrega,
                            control_name: 'persona_crea',
                            default_value: '',
                            rules: {},
                            label: 'Entrega realizada por',
                            type: 'text',
                            disabled: true,
                            helper_text: '',
                        },
                    ]}
                    modal_select_model_title="Buscar despacho"
                    modal_form_filters={[]} />
            </Grid>
        </>
    );
};

// eslint-disable-next-line no-restricted-syntax
export default Seccion;




