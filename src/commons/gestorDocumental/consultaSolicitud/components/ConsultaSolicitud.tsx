/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type React from 'react';
import { useState, useEffect } from 'react';
import { api } from '../../../../api/axios';
import { DataGrid } from '@mui/x-data-grid';
import { Title } from '../../../../components';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { miEstilo } from '../../Encuesta/interfaces/types';
import { Persona } from '../../alertasgestor/interfaces/types';
import { control_error, control_success } from '../../../../helpers';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { Button, ButtonGroup, Divider, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DownloadButton } from '../../../../utils/DownloadButton/DownLoadButton';

export interface Encuesta {
    id_encabezado_encuesta: number;
    nombre_encuesta: string;
    item_ya_usado: boolean;
};
interface AsignacionEncuesta {
    id_persona: number;
    id_encuesta: number;
    nombre_encuesta: string;
    nombre_completo: string;
    id_alerta_generada: number;
    id_encabezado_encuesta: number;
};
interface FormData {
    id_persona_alertar: any;
    id_encabezado_encuesta: any;
    fecha_desde: any;
    fecha_hasta: any;
    radicado: any;
    estado_solicitud: any
}
export const ConsultaSolucitud: React.FC = () => {
    const [asignaciones, setAsignaciones] = useState<AsignacionEncuesta[]>([]);

    const initialFormData: FormData = {
        id_persona_alertar: null,
        id_encabezado_encuesta: null,
        fecha_desde: null,
        fecha_hasta: null,
        radicado: null,
        estado_solicitud: null,
    };
    const [formData, setFormData] = useState(initialFormData);
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,

        }));
    };
    const cargarAsignaciones = async () => {
        try {
            const response = await api.get(`/gestor/encuestas/encabezado_encuesta/get/`);
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
    }, []);
    const columns = [
        { field: 'nombre_encuesta', headerName: 'nombre_encuesta', width: 150, felx: 1, },
        { field: 'Tipos de solicitud', headerName: 'Tipos de solicitud', width: 150, felx: 1, },
        { field: ' tipo de PQRSDF', headerName: 'tipo de PQRSDF ', width: 150, felx: 1, },
        { field: 'Titular', headerName: 'Titular', width: 150, felx: 1, },
        { field: 'Asunto', headerName: 'Asunto', width: 150, felx: 1, },
        { field: 'Radicado', headerName: 'Radicado', width: 150, felx: 1, },
        { field: 'Fecha radicado', headerName: 'Fecha radicado', width: 150, felx: 1, },
        { field: 'Persona que radico', headerName: 'Persona que radico', width: 150, felx: 1, },
        { field: 'Tiempo respuesta', headerName: 'Tiempo respuesta', width: 150, felx: 1, },
        { field: 'Estado', headerName: 'Estado', width: 120, felx: 1, },
        { field: 'Ubicación', headerName: 'Ubicación', width: 150, felx: 1, },
        // {
        //     field: 'Documento',
        //     headerName: 'Archivo',
        //     width: 200,
        //     flex: 1,
        //     renderCell: (params: any) => (
        //         <DownloadButton
        //             condition={false}
        //             fileUrl={params.value.ruta_archivo}
        //             fileName={params.value.id_documento}
        //         />
        //     )
        // },

       
    ];

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
        cargarEncuestas();
    }, []);
    return (
        <>
            <Grid container
                item xs={12} marginLeft={2} marginRight={2} marginTop={3} spacing={2}
                sx={miEstilo}
            >
                <Grid item xs={12} sm={12}>
                    <Title title="Consulta estado de una solicitud" />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField
                        required
                        fullWidth
                        size="small"
                        name="radicado"
                        label="radicado"
                        variant="outlined"
                        value={formData.radicado}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha Desde"
                            value={formData.fecha_desde}
                            onChange={(newValue) => {
                                setFormData((prevData) => ({
                                    ...prevData,
                                    fecha_desde: newValue?.toISOString('YYYY-MM-DD'), // Ajusta el formato según lo necesites
                                }));
                            }}
                            // onChange={handleInputChange}
                            renderInput={(params) => (
                                <TextField
                                    required
                                    fullWidth
                                    size="small"
                                    {...params}
                                />
                            )}

                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha hasta"
                            value={formData.fecha_hasta}
                            onChange={(newValue) => {
                                setFormData((prevData) => ({
                                    ...prevData,
                                    fecha_hasta: newValue?.toISOString('YYYY-MM-DD'), // Ajusta el formato según lo necesites
                                }));
                            }}
                            // onChange={handleInputChange}
                            renderInput={(params) => (
                                <TextField
                                    required
                                    fullWidth
                                    size="small"
                                    {...params}
                                />
                            )}

                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={2}>
                    <FormControl required size="small" fullWidth>
                        <InputLabel   >Tipo de Encuesta</InputLabel>
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
                        getRowId={(row) => row.id_encabezado_encuesta}
                    />
                </Grid>
            </Grid>
        </>
    );
};
