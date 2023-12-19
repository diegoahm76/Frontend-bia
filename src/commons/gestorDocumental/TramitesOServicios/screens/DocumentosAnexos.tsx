/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, Button, Stack, Box, Stepper, Step, StepButton, Typography, TextField, Alert, Tooltip, IconButton, Avatar } from "@mui/material";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { CloudUpload } from '@mui/icons-material';
import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
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
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DocumentosAnexos: React.FC<IProps> = (props: IProps) => {
    const [descripcion, set_descripcion] = useState<any>("");
    const [error_descripcion, set_error_descripcion] = useState<any>("");
    const [error_file_name, set_error_file_name] = useState<any>("");
    const [tamaño, set_tamaño] = useState('');
    const [file, set_file] = useState<any>('');
    const [file_name, set_file_name] = useState('');
    const [archivos, set_archivos] = useState<any>([]);
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
            archivos_grid = [...archivos_grid, {id: uuidv4(), nombre_archivo:file_name, descripcion: descripcion, tamaño: tamaño, data_json: file }];
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
        set_error_file_name(file_name === '');
        set_error_descripcion(descripcion === '');
        return !(file_name === '' || descripcion === '');
    }

    const cambio_descripcion: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_descripcion(e.target.value);
    };

    useEffect(() => {
        if (limpiar) {
            set_descripcion("");
            set_error_descripcion("");
            set_file_name("");
            set_error_file_name("");
            set_tamaño("");
        }
    }, [limpiar]);

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
                        autoFocus
                        margin="dense"
                        fullWidth
                        size="small"
                        label="Descripción de archivo"
                        type="text"
                        variant="outlined"
                        value={descripcion}
                        onChange={cambio_descripcion}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Alert severity="info">Adjunte los documentos requeridos para la solicitud, puede agregar los que necesite.</Alert>
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
            </Grid>
        </>
    )
}