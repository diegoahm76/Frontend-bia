/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, Button, Stack, Box, Stepper, Step, StepButton, Typography, TextField, Alert, Tooltip, IconButton, Avatar, FormHelperText } from "@mui/material";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { CloudUpload } from '@mui/icons-material';
import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch } from "../../../../hooks";
import { cargar_anexos_opas } from "../thunks/TramitesOServicios";
import { ModalMetadatosTramite } from "../../TramitesServicios/components/MetadatosTramite/ModalMetadatosTramite";
const class_css = {
    position: 'relative',
    background: '#FAFAFA',
    borderRadius: '15px',
    p: '20px',
    mb: '20px',
    boxShadow: '0px 3px 6px #042F4A26',
}
interface IProps {
    usuario: any,
    cargar_anexos: any,
    set_cargar_anexos: any,
    response_paso_1: any,
    set_anexar_error: any
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DocumentosAnexos: React.FC<IProps> = (props: IProps) => {
    const dispatch = useAppDispatch();
    const [descripcion, set_descripcion] = useState<string | any>("");
    const [error_descripcion, set_error_descripcion] = useState<string | any>("");
    const [error_file_name, set_error_file_name] = useState<string | any>("");
    const [tamaño, set_tamaño] = useState<string | any>('');
    const [file, set_file] = useState<File | null>(null);
    const [file_name, set_file_name] = useState<string | any>('');
    const [archivos, set_archivos] = useState<any[]>([]);
    const [limpiar, set_limpiar] = useState<boolean>(false);
    const columns: GridColDef[] = [
        {
            field: 'nombre_archivo',
            headerName: 'Nombre del archivo',
            sortable: true,
            width: 420,
        },
        {
            field: 'descripcion',
            headerName: 'Descripción',
            sortable: true,
            width: 350,
        },
        {
            field: 'tamaño',
            headerName: 'Tamaño',
            width: 200,
        },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 250,
            renderCell: (params) => (
                <>
                    <Tooltip title="Selecionar documento">
                        <IconButton
                            onClick={() => {
                                // seleccionar_archivos(params.row);
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 24,
                                    height: 24,
                                    background: '#fff',
                                    border: '2px solid',
                                }}
                                variant="rounded"
                            >
                                <PlaylistAddCheckIcon
                                    sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                                />

                            </Avatar>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <IconButton
                            onClick={() => {
                                eliminar_archivos(params.row);
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 24,
                                    height: 24,
                                    background: '#fff',
                                    border: '2px solid',
                                }}
                                variant="rounded"
                            >
                                <ClearOutlinedIcon
                                    sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                                />
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </>
            ),
        },
    ];
    const handle_file_selected = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const selected_file = event.target.files != null ? event.target.files[0] : null;
        if (selected_file != null) {
            set_file(selected_file);
            set_file_name(selected_file.name);
            set_tamaño(selected_file.size.toString());
        }
    };

    const agregar_archivos: any = () => {
        if (validar_formulario()) {
            let archivos_grid: any[] = [...archivos];
            const data_json = {
                "id_anexo_tramite": null,
                "descripcion": descripcion
            }
            archivos_grid = [...archivos_grid, { id: uuidv4(), nombre_archivo: file_name, descripcion: descripcion, tamaño: tamaño, archivo: file, data_json: data_json }];
            set_archivos([...archivos_grid]);
            set_limpiar(false);
        }
    }

    const eliminar_archivos: any = (archivo: any) => {
        let archivos_grid: any[] = [...archivos];
        const index = archivos_grid.findIndex((a: any) => a.id === archivo.id);
        archivos_grid.splice(index, 1);
        set_archivos([...archivos_grid]);
    }


    const validar_formulario = (): boolean => {
        set_error_descripcion(descripcion === '');
        return !(descripcion === '');
    }

    const cambio_descripcion: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_descripcion(e.target.value);
    };

    useEffect(() => {
        if (props.cargar_anexos) {
            const cargar = (archivos.length > 0);
            props.set_cargar_anexos(cargar);
            if (cargar) {
                const data_anexos: any[] = archivos.map((obj: any) => obj.data_json);
                const data_archivos: File[] = archivos.map((obj: any) => obj.archivo);
                const form_data = new FormData();
                form_data.append('data_anexos', JSON.stringify(data_anexos));
                // form_data.append('archivos', data_archivos[0]);
                data_archivos.forEach((archivo: File) => { form_data.append("archivos", archivo); });
                dispatch(cargar_anexos_opas(props.response_paso_1?.id_solicitud_tramite, form_data)).then((response: any) => {
                    if (response.success)
                        props.set_anexar_error(response.success);
                });
            } else {
                props.set_anexar_error(true);
            }
        }
    }, [props.cargar_anexos]);

    useEffect(() => {
        if (limpiar) {
            set_descripcion("");
            set_error_descripcion("");
            set_file_name("");
            set_error_file_name("");
            set_tamaño("");
        }
    }, [limpiar]);


    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <Typography variant="inherit">Anexos</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Button
                        variant="outlined"
                        fullWidth
                        size='medium'
                        component="label"
                        startIcon={<CloudUpload />}
                    >
                        Seleccionar archivo
                        <input
                            hidden
                            type="file"
                            accept="tipo_doc"
                            required
                            autoFocus
                            style={{ opacity: 0 }}
                            onChange={handle_file_selected}
                        />
                    </Button>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        size="small"
                        label={file_name === "" ? "Ningún archivo seleccionado" : "Archivo seleccionado"}
                        type="text"
                        variant="outlined"
                        value={file_name ?? ''}
                        disabled={true}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        margin="dense"
                        fullWidth
                        size="small"
                        label="Descripción de archivo"
                        type="text"
                        variant="outlined"
                        value={descripcion}
                        onChange={cambio_descripcion}
                        error={error_descripcion}
                    />
                    {error_descripcion && (<FormHelperText error id="desde-error">{'El campo es obligatorio.'}</FormHelperText>)}
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Alert severity="info">Adjunte los documentos requeridos para la solicitud, puede agregar los que necesite.</Alert>
                </Grid>



<Grid container justifyContent="center" >

                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        fullWidth
                        color="warning"
                        size='medium'
                        onClick={handleOpenModal}>AGREGAR MeTADATOS</Button>
                    <ModalMetadatosTramite
                        is_modal_active={isModalOpen}
                        set_is_modal_active={setIsModalOpen}
                    />
                </Grid>
                        </Grid>









                <Grid item xs={12} sm={12} textAlign={'end'}>
                    <Button variant="contained" onClick={() => { agregar_archivos() }} startIcon={<AddCircleOutlinedIcon />}>
                        Agregar
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <DataGrid
                        density="compact"
                        autoHeight
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        rows={archivos}
                        getRowId={(row) => uuidv4()} />
                </Grid>
            </Grid >
        </>
    )
}