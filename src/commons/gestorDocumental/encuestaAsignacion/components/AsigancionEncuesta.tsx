/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type React from 'react';
import { useState, useEffect } from 'react';
import { api } from '../../../../api/axios';
import { DataGrid } from '@mui/x-data-grid';
import { Title } from '../../../../components';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { control_error, control_success } from '../../../../helpers';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { BuscadorPersona } from '../../../../components/BuscadorPersona';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { AsignacionEncuesta, Persona, Encuesta, miEstilo } from '../interfaces/types';
import { Button, ButtonGroup, Divider, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, } from '@mui/material';




export const AsigancionEncuesta: React.FC = () => {
    const [asignaciones, setAsignaciones] = useState<AsignacionEncuesta[]>([]);
    const [formData, setFormData] = useState({ id_encabezado_encuesta: '' });
    const [persona, set_persona] = useState<Persona | undefined>();
    const on_result = async (info_persona: Persona): Promise<void> => { set_persona(info_persona); }
    const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

    const cargarAsignaciones = async () => {
        try {
            const response = await api.get(`/gestor/encuestas/asignacion_encuesta/get/${formData.id_encabezado_encuesta}/`);
            if (response.data.success) {
                setAsignaciones(response.data.data);
            }
        } catch (error: any) {
            console.error('Error al cargar las asignaciones de encuesta', error);
            // control_error(error.response.data.detail);
        }
    };

    useEffect(() => {
        cargarAsignaciones();
    }, [formData.id_encabezado_encuesta]);



    const columns = [
        { field: 'nombre_completo', headerName: 'Nombre Completo', width: 350, felx: 1, },
        { field: 'nombre_encuesta', headerName: 'Nombre Encuesta', width: 350, felx: 1, },
        { field: 'usuario', headerName: 'Usuario', width: 350, felx: 1, },

        // { field: 'acciones', headerName: 'Acciones', width: 200, felx: 1, },usuario
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 200, flex: 1,

            renderCell: (params: any) => (
                <>

                    <IconButton
                        // color="secondary"
                        aria-label="Eliminar"
                        onClick={() => {

                            // setSelectedRowId(params.row.id_asignar_encuesta);
                            eliminarAsignacion(params);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>

                </>
            ),
        },

    ];

    const eliminarAsignacion = async (params: any): Promise<void> => {
        try {
            const response = await api.delete(`/gestor/encuestas/asignacion_encuesta/delete/${params.row.id_asignar_encuesta}/`);
            if (response.data.success) {
                //  console.log('')('Asignación eliminada exitosamente.');
                control_success("Encuesta asignada eliminada exitosamente");
                cargarAsignaciones();
            }
        } catch (error: any) {
            console.error('Error al eliminar la asignación', error);
            control_error(error.response.data.detail || "Error al eliminar la asignación");
            // control_error(error.response.data.detail);
        }
    };


    const [encuestas, setEncuestas] = useState<Encuesta[]>([]);

    const cargarEncuestas = async () => {
        try {
            const response = await api.get('/gestor/encuestas/encuesta_disponibles/get/');
            if (response.data.success) {
                setEncuestas(response.data.data);
            }
        } catch (error: any) {
            console.error('Error al cargar las encuestas', error);
            control_error(error.response.data.detail);
        }
    };
    
    useEffect(() => {
        setAsignaciones([])
        cargarEncuestas();
    }, [formData.id_encabezado_encuesta]);

    const handleInputChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };
    const guardarAsignacion = async () => {
        if (!persona || !persona.id_persona) {
            control_error("Seleccione una Persona, campo obligatorio.");
            return;
        }
        if (!formData.id_encabezado_encuesta) {
            control_error("Seleccione una Encuesta, campo obligatorio.");
            return;
        }
        const dataToSend = {
            id_encuesta: formData.id_encabezado_encuesta,
            id_persona: persona.id_persona
        };

        try {
            const response = await api.post('/gestor/encuestas/asignacion_encuesta/create/', dataToSend);
            if (response.data.success) {
                //  console.log('')('Asignación creada exitosamente.');
                cargarAsignaciones();
                control_success("Encuesta asignada exitosamente ");

                // Aquí puedes agregar lógica adicional, por ejemplo, mostrar un mensaje al usuario o recargar la lista.
            }
        } catch (error: any) {
            console.error('Error al crear la asignación', error);
            control_error(error.response.data.detail);
        }
    };

    return (
        <>

            <Grid container
                item xs={12} marginLeft={2} marginRight={2} marginTop={3} spacing={2}
                sx={miEstilo}
            >
                <Grid item xs={12} sm={12}>
                    <Title title="Asignación  de encuesta " />

                    
                </Grid>

                <Grid item xs={12}>
                    <BuscadorPersona
                        onResult={(data) => {
                            void on_result(data);
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField
                        label="tipo usuario"
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                        disabled
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={persona?.tipo_usuario}
                    />
                </Grid>

                {/* {persona?.tipo_usuario} */}
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Primer Nombre"
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                        disabled
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={persona?.primer_nombre}
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <FormControl required size="small" fullWidth>
                        <InputLabel shrink={true} >Tipo de Encuesta</InputLabel>
                        <Select
                            label="Tipo de Encuesta"
                            onChange={handleInputChange}
                            name="id_encabezado_encuesta"
                            value={formData.id_encabezado_encuesta}
                        >
                            {encuestas.map(encuesta => (
                                <MenuItem key={encuesta.id_encabezado_encuesta} value={encuesta.id_encabezado_encuesta}>
                                    {encuesta.nombre_encuesta}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>


                <Grid item xs={2}  >
                    <Button onClick={guardarAsignacion} color='success' variant='contained' startIcon={<SaveIcon />}>
                        Guardar
                    </Button>
                </Grid>
                {/* {persona?.id_persona}
                /
                <>{formData.id_encabezado_encuesta}</> */}
            </Grid>
            <Grid container
                item xs={12} marginLeft={2} marginRight={2} marginTop={3} spacing={2}
                sx={miEstilo}
            >
                <Grid item xs={12} sm={12}>
                    <Title title="Encuestas asignadas " />
                </Grid>
                <Grid item xs={12} sm={10} ></Grid>
                <Grid item xs={12} sm={2} >
                    <ButtonGroup style={{ margin: 5, }}>
                        {download_xls({ nurseries: asignaciones, columns })}
                        {download_pdf({
                            nurseries: asignaciones,
                            columns,
                            title: 'Mis alertas',
                        })}
                    </ButtonGroup>
                </Grid>

                <Divider
                    style={{
                        width: '98%',
                        marginTop: '8px',
                        marginBottom: '8px',
                        marginLeft: 'auto',
                    }}
                />

                <Grid item xs={12} sm={12}>
                    <DataGrid
                        autoHeight
                        pageSize={5}
                        columns={columns}
                        density="compact"
                        rowsPerPageOptions={[5]}
                        rows={asignaciones || []}
                        getRowId={(row) => row.id_asignar_encuesta}
                    />
                </Grid>
            </Grid>




        </>
    );
};
