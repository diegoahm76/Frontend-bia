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
import CleanIcon from '@mui/icons-material/CleaningServices';
import { control_error, control_success } from '../../../../helpers';
import { BuscadorPersona } from '../../../../components/BuscadorPersona';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { organigrama, AsignacionEncuesta, FormData, Sexo, estado, Persona } from '../interfaces/types';
import { Button, ButtonGroup, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, } from '@mui/material';
import { showAlert } from '../../../../utils/showAlert/ShowAlert';
import SearchIcon from '@mui/icons-material/Search';

export const ConsultaSolucitud: React.FC = () => {
    const [asignaciones, setAsignaciones] = useState<AsignacionEncuesta[]>([]);
    const personainicial: Persona = {
        id_persona: "",
        tipo_usuario: "",
        primer_nombre: "",
        segundo_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
    };
    const [persona, set_persona] = useState(personainicial);

    const initialFormData: FormData = {
        id_persona_alertar: null,
        pqrs: "",
        estado: "",
        radicado: "",
        organigrama: "",
        fecha_desde: "",
        fecha_hasta: "",
        estado_solicitud: "",
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
            const response = await api.get(`/gestor/pqr/busqueda-avanzada-reportes/?id_persona_titular=${persona?.id_persona}&cod_tipo_PQRSDF=${formData.pqrs}&id_und_org_seccion_asignada=${formData.organigrama}&fecha_desde=${formData.fecha_desde}&fecha_hasta=${formData.fecha_hasta}`);
            if (response.data.success) {
                setAsignaciones(response?.data?.data);

                control_success("Datos encontrados")
            }
        } catch (error: any) {
            console.error('Error al cargar las asignaciones de encuesta', error);
            // control_error(error.response.data.detail);
            showAlert("Opss", `${error?.response?.data?.detail}`, "error")
        }
    };

    useEffect(() => {
        cargarAsignaciones();
    }, []);
    const columns = [
        { field: 'tipo_pqrsdf_descripcion', headerName: 'Tipo de PQESDF', width: 220, flex: 1, },
        { field: 'medio_solicitud', headerName: 'Medio de solicitud', width: 220, flex: 1, },
        { field: 'sucursal_recepcion', headerName: 'Sucursal de recepción', width: 220, flex: 1, },
        { field: 'numero_radicado', headerName: 'Número radicado', width: 220, flex: 1, },
        {
            field: 'fecha_radicado', headerName: 'Fecha radicado', width: 220, flex: 1, valueFormatter: (params: { value: string | number | Date; }) => {
                const date = new Date(params.value);
                const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
                return formattedDate;
            },
        },
        { field: 'persona_recibe', headerName: 'Persona que recibe', width: 220, flex: 1, },
        {
            field: 'fecha_solicitud', headerName: 'Fecha de solicitud  ', width: 220, flex: 1, valueFormatter: (params: { value: string | number | Date; }) => {
                const date = new Date(params.value);
                const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
                return formattedDate;
            },
        },
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

    //eliminar 

    const handleResetForm = () => {
        setFormData(initialFormData);
        cargarAsignaciones();
        set_persona(personainicial);
    };
    //Buscar personas 

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
                {/* <Grid item xs={12} sm={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            key={key}
                            label="Fecha Desde"
                            value={formData.fecha_desde}
                            onChange={(newValue) => {
                                setFormData((prevData) => ({
                                    ...prevData,
                                    fecha_desde: newValue?.format('YYYY-MM-DD'),  
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
                </Grid> */}



                <Grid item xs={12} sm={3}>
                    <TextField
                        fullWidth
                        label="Fecha desde  "
                        type="date"
                        size="small"
                        name="fecha_desde"
                        variant="outlined"
                        value={formData.fecha_desde}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => {
                            handleInputChange(e);
                        }}
                    />

                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        fullWidth
                        label=" Fecha hasta  "
                        type="date"
                        size="small"
                        name="fecha_hasta"
                        variant="outlined"
                        value={formData.fecha_hasta}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => {
                            handleInputChange(e);
                        }}
                    />

                </Grid>






                {/* <Grid item xs={12} sm={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            key={key}
                            label="Fecha hasta"
                            value={formData.fecha_hasta}
                            onChange={(newValue) => {
                                setFormData((prevData) => ({
                                    ...prevData,
                                    fecha_hasta: newValue?.format('YYYY-MM-DD'), 
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
                </Grid> */}
                <Grid item  >
                    <Button
                        variant="outlined"
                        startIcon={<CleanIcon />}
                        onClick={() => {
                            handleResetForm();
                        }}
                    >
                        Limpiar
                    </Button>
                </Grid>
                <Grid item  >
                    <Button
                        color='primary'
                        variant='contained'
                        startIcon={<SearchIcon />}
                        onClick={() => {
                            cargarAsignaciones();
                        }}
                    >
                        buscar
                    </Button>
                </Grid>


                <Grid item xs={12} sm={11} ></Grid>
                <Grid item  >
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
                        pageSize={10}
                        columns={columns}
                        density="compact"
                        rowsPerPageOptions={[10]}
                        rows={asignaciones || []}
                        getRowId={(row) => row.id_pqrsdf}
                    />
                </Grid>
            </Grid>
        </>
    );
};
