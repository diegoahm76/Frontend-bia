/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingButton } from '@mui/lab';
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogContent,
    Grid,
    MenuItem,
    TextField,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Title } from '../../../../../components/Title';
import { Controller, useForm } from 'react-hook-form';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { crear_archivo_soporte, get_archivos_id_expediente, get_tipologias, get_trd } from '../../cierreExpediente/store/thunks/cierreExpedientesthunks';
import FormDatePickerController from '../../../../../components/partials/form/FormDatePickerController';
import { IList } from '../../../../../interfaces/globalModels';
import { api } from '../../../../../api/axios';
import FormInputFileController from '../../../../../components/partials/form/FormInputFileController';
import { set_current_archivo_expediente, } from '../../cierreExpediente/store/slice/indexCierreExpedientes';
import { type IObjArchivoExpediente as FormValues } from '../../cierreExpediente/interfaces/cierreExpedientes';
import { IDeposito } from '../../../deposito/interfaces/deposito';
interface IProps {

    control_archivo_expediente: any;
    open: any;
    handle_close_adjuntar_archivo: any;
    get_values_archivo: any;
    handle_submit_archivo: any;
    selected_expediente: any;
    set_selected_expediente: any;

}



const ArchivoSoporteReapertura = ({ control_archivo_expediente, open, handle_close_adjuntar_archivo, get_values_archivo, handle_submit_archivo, selected_expediente, set_selected_expediente }: IProps) => {

    const { trd, tipologias, expedientes, current_archivo_expediente } = useAppSelector((state) => state.cierre_expedientes);
    const dispatch = useAppDispatch();
    const [tipo_origen, set_tipo_origen] = useState<IList[]>([]);
    const [tipo_archivo, set_tipo_archivo] = useState<IList[]>([]);
    const [mostrar_campos_consecutivo, set_mostrar_campos_consecutivo] = useState(true);
    const [file, set_file] = useState<any>(null);
    const [file_name, set_file_name] = useState<string>('');



    const text_choise_adapter: any = (dataArray: string[]) => {
        const data_new_format: IList[] = dataArray.map((dataOld) => ({
            label: dataOld[1],
            value: dataOld[0],
        }));
        return data_new_format;
    };

    const handle_tiene_consecutivo = (event: { target: { value: string; }; }) => {
        const tieneConsecutivo = event.target.value === "true";
        set_mostrar_campos_consecutivo(tieneConsecutivo);
    };

    useEffect(() => {
        if (file !== null) {

            if ('name' in file) {
                set_file_name(file.name);
                console.log(file)

                dispatch(
                    set_current_archivo_expediente({
                        ...current_archivo_expediente,
                        nombre_asignado_documento: get_values_archivo('nombre_asignado_documento'),
                        nro_folios_del_doc: get_values_archivo('nro_folios_del_doc'),
                        fecha_creacion_doc: get_values_archivo('fecha_creacion_doc'),
                        tiene_consecutivo_documento: get_values_archivo('tiene_consecutivo_documento'),
                        id_tipologia_documental: get_values_archivo('id_tipologia_documental'),
                        cod_origen_archivo: get_values_archivo('cod_origen_archivo'),
                        codigo_tipologia_doc_prefijo: get_values_archivo('codigo_tipologia_doc_prefijo'),
                        codigo_tipologia_doc_agno: get_values_archivo('codigo_tipologia_doc_agno'),
                        codigo_tipologia_doc_consecutivo: get_values_archivo('codigo_tipologia_doc_consecutivo'),
                        cod_categoria_archivo: get_values_archivo('cod_categoria_archivo'),
                        tiene_replica_fisica: get_values_archivo('tiene_replica_fisica'),
                        asunto: get_values_archivo('asunto'),
                        descripcion: get_values_archivo('descripcion'),
                        palabras_clave_documento: get_values_archivo('palabras_clave_documento'),
                        file: file,
                    })
                );
            }
        }
    }, [file]);
    useEffect(() => {


        if (current_archivo_expediente.file !== null) {
            if (typeof current_archivo_expediente.file === 'string') {
                const name =
                    current_archivo_expediente.file?.split('/').pop() ?? '';
                set_file_name(name);
            }
        } else {
            set_file_name('');
        }

    }, [current_archivo_expediente]);




    useEffect(() => {
        const get_selects_options: any = async () => {
            try {
                const { data: tipo_origen_no_format } = await api.get(
                    'gestor/choices/tipo-origen-doc/'
                );

                const tipo_origen_format: IList[] = text_choise_adapter(
                    tipo_origen_no_format
                );

                set_tipo_origen(tipo_origen_format);
            } catch (err) {
                console.log(err);
            }
        };

        void get_selects_options();
    }, []);



    useEffect(() => {
        const get_selects_options: any = async () => {
            try {
                const { data: tipo_archivo_no_format } = await api.get(
                    'gestor/choices/categoria-archivo/'
                );

                const tipo_archivo_format: IList[] = text_choise_adapter(
                    tipo_archivo_no_format
                );

                set_tipo_archivo(tipo_archivo_format);
            } catch (err) {
                console.log(err);
            }
        };

        void get_selects_options();
    }, []);



    useEffect(() => {
        void dispatch(get_tipologias())
    }, [])

    const on_submit = (data: FormValues): void => {
        console.log(data.fecha_creacion_doc)
        const form_data: any = new FormData();
        form_data.append('nombre_asignado_documento', data.nombre_asignado_documento);
        form_data.append('nro_folios_del_doc', data.nro_folios_del_doc);
        form_data.append('tiene_consecutivo_documento', data.tiene_consecutivo_documento);
        form_data.append('cod_origen_archivo', data.cod_origen_archivo);
        form_data.append('codigo_tipologia_doc_prefijo', data.codigo_tipologia_doc_prefijo);
        form_data.append('fecha_creacion_doc', data.fecha_creacion_doc);
        form_data.append('codigo_tipologia_doc_agno', data.codigo_tipologia_doc_agno);
        form_data.append('codigo_tipologia_doc_consecutivo', data.codigo_tipologia_doc_consecutivo);
        form_data.append('cod_categoria_archivo', data.cod_categoria_archivo);
        form_data.append('tiene_replica_fisica', data.tiene_replica_fisica);
        form_data.append('asunto', data.asunto);
        form_data.append('descripcion', data.descripcion);
        form_data.append('palabras_clave_documento', data.palabras_clave_documento);
        form_data.append('file', file === null ? '' : file);
        form_data.append('id_expediente_documental', selected_expediente.id_expediente_documental)

        void dispatch(crear_archivo_soporte(form_data));
        console.log('crear')
        void dispatch(get_archivos_id_expediente(selected_expediente.id_expediente_documental));
        //  set_selected_expediente(initial_state_current_archivo_expediente)



    };





    return (
        <>
            <Grid item>
                <Button
                    variant="contained"
                    color="primary"

                >
                    Buscar
                </Button>
            </Grid>
            <Dialog fullWidth maxWidth="lg" open={open} onClose={handle_close_adjuntar_archivo} >
                <DialogContent>
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            position: 'relative',
                            background: '#FAFAFA',
                            borderRadius: '15px',
                            p: '20px',
                            mb: '20px',
                            boxShadow: '0px 3px 6px #042F4A26',
                            marginTop: '20px',
                            marginLeft: '-5px',
                        }}
                    >
                        <Title title="AGREGAR ARCHIVO DE SOPORTE" />
                        <Grid container sx={{ mt: '10px', mb: '20px' }}>

                            <Grid container justifyContent="center">
                                <Grid item xs={12} sm={3.5} marginTop={2} >
                                    <Controller
                                        name="nombre_asignado_documento"
                                        control={control_archivo_expediente}
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
                                                label="Nombre del Documento"
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


                                <FormDatePickerController
                                    xs={12}
                                    md={3.5}
                                    margin={2}
                                    control_form={control_archivo_expediente}
                                    control_name={'fecha_creacion_doc'}
                                    default_value={''}
                                    rules={{}}
                                    label={'Fecha de creación Documento'}
                                    disabled={false}
                                    format={'YYYY-MM-DD'}
                                    helper_text={''}
                                />


                                <Grid item xs={12} sm={3.5} marginTop={2}  >
                                    <Controller
                                        name="id_tipologia_documental"
                                        control={control_archivo_expediente}
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
                                                label="Típologia"
                                                variant="outlined"
                                                disabled={false}
                                                defaultValue={value}
                                                value={value}
                                                onChange={onChange}
                                                error={!(error == null)}
                                            >
                                                {tipologias.map((option) => (
                                                    <MenuItem key={option.id_tipologia_documental} value={option.nombre ?? ''}>
                                                        {option.nombre}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        )}
                                    />

                                </Grid>

                            </Grid>
                            <Grid container justifyContent="center">
                                <Grid item xs={12} sm={3.5} marginTop={2}  >
                                    <Controller
                                        name="nro_folios_del_doc"
                                        control={control_archivo_expediente}
                                        defaultValue={''}
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
                                                label="Número de Folios"
                                                variant="outlined"
                                                disabled={false}
                                                defaultValue={value}
                                                value={value}
                                                onChange={(e) => {
                                                    const inputValue = e.target.value;
                                                    // Filtra solo caracteres numéricos utilizando una expresión regular
                                                    const numericValue = inputValue.replace(/\D/g, ''); // Solo deja los dígitos
                                                    onChange(numericValue);
                                                }}
                                                error={!(error == null)}
                                            >

                                            </TextField>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3.5} marginTop={2} margin={2} >
                                    <Controller
                                        name="tiene_consecutivo_documento"
                                        control={control_archivo_expediente}
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
                                                label="Tiene consecutivo de Documento"
                                                variant="outlined"
                                                disabled={false}
                                                defaultValue={value}
                                                value={value}
                                                onChange={(e) => {
                                                    onChange(e);
                                                    handle_tiene_consecutivo(e);
                                                }}
                                                error={!(error == null)}
                                            >
                                                <MenuItem value="true">SI</MenuItem>
                                                <MenuItem value="false">NO</MenuItem>
                                            </TextField>
                                        )}
                                    />
                                </Grid>


                                <Grid item xs={12} sm={3.5} marginTop={2} >
                                    <Controller
                                        name="cod_origen_archivo"
                                        control={control_archivo_expediente}
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
                                                label="Tipo de Archivo"
                                                variant="outlined"
                                                disabled={false}
                                                defaultValue={value}
                                                value={value}
                                                onChange={onChange}
                                                error={!(error == null)}
                                            >
                                                {tipo_origen.map((option) => (
                                                    <MenuItem key={option.label} value={option.value ?? ''}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        )}
                                    />
                                </Grid>
                            </Grid>

                            {mostrar_campos_consecutivo && (
                                <Grid container justifyContent="center">
                                    <Grid item xs={12} sm={3.5} marginTop={2}  >
                                        <Controller
                                            name="codigo_tipologia_doc_prefijo"
                                            control={control_archivo_expediente}
                                            defaultValue={''}
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
                                                    label="Prefijo"
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
                                    <Grid item xs={12} sm={3.5} marginTop={2} margin={2}>
                                        <Controller
                                            name="codigo_tipologia_doc_agno"
                                            control={control_archivo_expediente}
                                            defaultValue=""
                                            rules={{ required: true }}
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <TextField
                                                    margin="dense"
                                                    fullWidth
                                                    size="small"
                                                    label="Año"
                                                    variant="outlined"
                                                    disabled={false}
                                                    defaultValue={value}
                                                    value={value}
                                                    onChange={(e) => {
                                                        const inputValue = e.target.value;
                                                        // Filtra solo caracteres numéricos utilizando una expresión regular
                                                        const numericValue = inputValue.replace(/\D/g, ''); // Solo deja los dígitos
                                                        onChange(numericValue);
                                                    }}
                                                    error={!(error == null)}
                                                >
                                                </TextField>
                                            )}
                                        />
                                    </Grid>


                                    <Grid item xs={12} sm={3.5} marginTop={2} >
                                        <Controller
                                            name="codigo_tipologia_doc_consecutivo"
                                            control={control_archivo_expediente}
                                            defaultValue=""
                                            rules={{ required: true }}
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <TextField
                                                    margin="dense"
                                                    fullWidth
                                                    size="small"
                                                    label="Consecutivo"
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

                                </Grid>
                            )}
                            <Grid container justifyContent="center">
                                <Grid item xs={12} sm={4.5} marginTop={2} margin={2} >
                                    <Controller
                                        name="cod_categoria_archivo"
                                        control={control_archivo_expediente}
                                        defaultValue={''}
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
                                                label="Tipo de Recurso"
                                                variant="outlined"
                                                disabled={false}
                                                defaultValue={value}
                                                value={value}
                                                onChange={onChange}
                                                error={!(error == null)}
                                            >

                                                {tipo_archivo.map((option) => (
                                                    <MenuItem key={option.label} value={option.value ?? ''}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}

                                            </TextField>
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4.5} marginTop={2} >
                                    <Controller
                                        name="tiene_replica_fisica"
                                        control={control_archivo_expediente}
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
                                                label="Tiene replica Física"
                                                variant="outlined"
                                                disabled={false}
                                                defaultValue={value}
                                                value={value}
                                                onChange={(e) => {
                                                    onChange(e);
                                                    handle_tiene_consecutivo(e);
                                                }}
                                                error={!(error == null)}
                                            >
                                                <MenuItem value="true">SI</MenuItem>
                                                <MenuItem value="false">NO</MenuItem>
                                            </TextField>
                                        )}
                                    />
                                </Grid>

                            </Grid>

                            <Grid container justifyContent="center">

                                <Grid item xs={12} sm={6} marginTop={2} margin={2}>
                                    <Controller
                                        name="asunto"
                                        control={control_archivo_expediente}
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
                                                label="Asunto"
                                                multiline
                                                rows={2}
                                                variant="outlined"
                                                disabled={false}
                                                defaultValue={value}
                                                value={value}
                                                onChange={(e) => {
                                                    const inputValue = e.target.value;
                                                    if (inputValue.length <= 50) {
                                                        onChange(inputValue);
                                                    }
                                                }}
                                                error={!(error == null)}
                                                inputProps={{
                                                    maxLength: 50 // Establece el límite máximo de caracteres
                                                }}

                                            >

                                            </TextField>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} marginTop={2} margin={2}>
                                    <Controller
                                        name="descripcion"
                                        control={control_archivo_expediente}
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
                                                multiline
                                                rows={4}
                                                label="Descripción"
                                                variant="outlined"
                                                disabled={false}
                                                defaultValue={value}
                                                value={value} onChange={(e) => {
                                                    const inputValue = e.target.value;
                                                    if (inputValue.length <= 200) {
                                                        onChange(inputValue);
                                                    }
                                                }}
                                                error={!(error == null)}
                                                inputProps={{
                                                    maxLength: 200 // Establece el límite máximo de caracteres
                                                }}


                                            >

                                            </TextField>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} marginTop={2} margin={2}>
                                    <Controller
                                        name="palabras_clave_documento"
                                        control={control_archivo_expediente}
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
                                                label="Palabras Clave"
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


                            </Grid>

                            <Grid container justifyContent="center">
                                <FormInputFileController
                                    xs={12}
                                    md={3.5}
                                    control_form={control_archivo_expediente}
                                    control_name="file"
                                    default_value=""
                                    rules={{
                                        required_rule: { rule: true, message: 'Archivo requerido' },
                                    }}
                                    label="Archivo de soporte"
                                    disabled={false}
                                    helper_text=""
                                    set_value={set_file}
                                    file_name={file_name}
                                    value_file={current_archivo_expediente.file}
                                />
                            </Grid>




                        </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Grid item margin={2}>
                            <Button variant="contained"
                                color="success"
                                onClick={handle_submit_archivo(on_submit)}>
                                Guardar
                            </Button>
                        </Grid>
                        <Grid item margin={2}>
                            <Button variant="outlined"
                                color="error"
                                onClick={handle_close_adjuntar_archivo}>
                                Salir
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ArchivoSoporteReapertura;