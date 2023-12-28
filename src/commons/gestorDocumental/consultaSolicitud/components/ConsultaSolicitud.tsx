/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type React from 'react';
import { useState, useEffect } from 'react';
import { api } from '../../../../api/axios';
import { DataGrid } from '@mui/x-data-grid';
import { Title } from '../../../../components';
  import { miEstilo } from '../../Encuesta/interfaces/types';
import { control_error, control_success } from '../../../../helpers';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { Button, ButtonGroup, Divider, FormControl, Grid, InputLabel, MenuItem, Select,   TextField, } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
 import { BuscadorPersona } from '../../../../components/BuscadorPersona';
import { organigrama, AsignacionEncuesta, FormData, Sexo, estado, Persona } from '../interfaces/types';


export const ConsultaSolucitud: React.FC = () => {
    const [asignaciones, setAsignaciones] = useState<AsignacionEncuesta[]>([]);

    const initialFormData: FormData = {
        id_persona_alertar: null,
        organigrama: null,
        fecha_desde: null,
        fecha_hasta: null,
        radicado: null,
        estado_solicitud: null,
        pqrs: null,
        estado: null,
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
    ];

    // Efecto para cargar los datos del pqrs
    const [pqrss, setpqrs] = useState<Sexo[]>([]);
    const fetchSpqrs = async (): Promise<void> => {
        try {
            const url = "/gestor/choices/cod-tipo-pqrs/";
            const res = await api.get<{ data: Sexo[] }>(url);
            setpqrs(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSpqrs();
    }, []);

    //Organigrama 
    const [organigrama, setorganigrama] = useState<organigrama[]>([]);
    const cargarorganigrama = async () => {
        try {
            const response = await api.get('/transversal/organigrama/unidades/get-list/organigrama-actual/');
            if (response.data.success) {
                setorganigrama(response.data.data);
            }
        } catch (error: any) {
            console.error('Error al cargar las organigrama', error);
            control_error(error.response.data.detail);
        }
    };
    useEffect(() => {
        cargarorganigrama();
    }, []);

    //Estado 
    const [estado, setestado] = useState<estado[]>([]);
    const cargarestado = async () => {
        try {
            const response = await api.get('/gestor/pqr/get-estado-solicitud/');
            if (response.data.success) {
                setestado(response.data.data);
            }
        } catch (error: any) {
            console.error('Error al cargar las estado', error);
            control_error(error.response.data.detail);
        }
    };
    useEffect(() => {
        cargarestado();
    }, []);
    //Buscar personas 
    const [persona, set_persona] = useState<Persona | undefined>();
    const on_result = async (info_persona: Persona): Promise<void> => { set_persona(info_persona); }
    return (
        <>
            <Grid container
                item xs={12} marginLeft={2} marginRight={2} marginTop={3} spacing={2}
                sx={miEstilo}
            >
                <Grid item xs={12} sm={12}>
                    <Title title="Reportes - PQRSDF" />
                </Grid>
            </Grid>
            <Grid container
                item xs={12} marginLeft={2} marginRight={2} marginTop={3} spacing={2}
                sx={miEstilo}
            >
                <Grid item xs={12} sm={12}>
                    <Title title="Filtro de búsqueda    " />
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
                        <InputLabel >PQRS</InputLabel>
                        <Select
                            onChange={handleInputChange}
                            value={formData.pqrs}
                            name="pqrs"
                            label="PQRS"
                        >
                            {pqrss.map((pqrs) => (
                                <MenuItem key={pqrs.value} value={pqrs.value}>
                                    {pqrs.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormControl required size="small" fullWidth>
                        <InputLabel   >Organigrama</InputLabel>
                        <Select
                            label="Organigrama"
                            onChange={handleInputChange}
                            name="organigrama"
                            value={formData.organigrama}
                        >
                            {organigrama.map(organigrama => (
                                <MenuItem key={organigrama.id_unidad_organizacional} value={organigrama.id_unidad_organizacional}>
                                    {organigrama.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <FormControl required size="small" fullWidth>
                        <InputLabel   >estado</InputLabel>
                        <Select
                            label="estado"
                            onChange={handleInputChange}
                            name="estado"
                            value={formData.estado}
                        >
                            {estado.map(estado => (
                                <MenuItem key={estado.id_estado_solicitud} value={estado.id_estado_solicitud}>
                                    {estado.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={3}>
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
