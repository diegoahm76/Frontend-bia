/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import { miEstilo } from '../../Encuesta/interfaces/types';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { DownloadButton } from '../../../../utils/DownloadButton/DownLoadButton';
import { Button, ButtonGroup, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, } from '@mui/material';
import { control_error, control_success } from '../../../../helpers';
import { api } from '../../../../api/axios';
import { showAlert } from '../../../../utils/showAlert/ShowAlert';


export interface organigrama {
    id_unidad_organizacional: number;
    nombre: string;
    item_ya_usado: boolean;
};
export interface AsignacionEncuesta {
    Id_PQRSDF: any;
    tipo_pqrsdf: any;
    Titular: any;
    Radicado: any;
    Estado: any;
    fecha_radicado: any;
    persona_recibe: any;
    fecha_solicitud: any;
};

export interface Pqr {
    value: string;
    label: string;
};
export interface estado {
    id_estado_solicitud: number;
    nombre: string;
    aplica_para_pqrsdf: boolean;
    aplica_para_tramites: boolean;
    aplica_para_otros: boolean;
};
export interface TipoPQRSDF {
    codigo: string;
    descripcion: string;
};

export interface FormData {
    tutular: any;
    fecha_solicitud: any;
    nombre_opa: any;
    n_anexos: any;
};


export const SolicitudOpas: React.FC = () => {
    const [asignaciones, setAsignaciones] = useState<AsignacionEncuesta[]>([]);

    const initialFormData: FormData = {
        tutular: "",
        fecha_solicitud: "",
        nombre_opa: "",
        n_anexos: "",

    };
    const [formData, setFormData] = useState(initialFormData);
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const columns = [
        // { field: 'Id_PQRSDF', headerName: 'Id_PQRSDF  ', width: 220, flex: 1, },
        { field: 'Tipo de Solicitud', headerName: 'Tipo de Solicitud', width: 220, flex: 1, },
        { field: 'tipo_pqrsdf_descripcion', headerName: 'Tipo de PQRSDF', width: 220, flex: 1, },
        { field: 'Titular', headerName: 'Titular', width: 220, flex: 1, },
        { field: 'Asunto', headerName: 'Asunto', width: 220, flex: 1, },
        { field: 'Radicado', headerName: 'Radicado', width: 220, flex: 1, },
        {
            field: 'Fecha de Radicado', headerName: 'Fecha de Radicado', width: 220, flex: 1, valueFormatter: (params: { value: string | number | Date; }) => {
                const date = new Date(params.value);
                const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
                return formattedDate;
            },
        },
        { field: 'Persona Que Radicó', headerName: 'Persona Que Radicó  ', minWidth: 300, flex: 1, },
        { field: 'Tiempo Para Respuesta', headerName: 'Tiempo Para Respuesta', width: 220, flex: 1, },
        { field: 'Estado', headerName: 'Estado', width: 220, flex: 1, },
        {
            field: 'ruta_archivo',
            headerName: 'Archivo',
            width: 200,
            flex: 1,
            renderCell: (params: any) => (
                <DownloadButton
                    condition={params.row.URL_Documento === null}
                    fileUrl={params.row.Archivo.ruta_archivo}
                    fileName={params?.value?.Id_PQRSDF}
                />
            )
        },
    ];




    const cargarAsignaciones = async ({
        setAsignaciones,
        formData
    }: {
        setAsignaciones: any,
        formData: any,
    }): Promise<any> => {
        try {
            const response = await api.get(`/gestor/pqr/consulta-estado-pqrsdf/?tipo_solicitud=&tipo_pqrsdf=&tutular=&fecha_radicado_desde=&fecha_radicado_hasta=&estado_solicitud=`);
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
        cargarAsignaciones({
            setAsignaciones: setAsignaciones,
            formData: formData,
        });
    }, []);

    // Efecto para cargar los datos del pqrs

    return (
        <>

            <Grid container
                item xs={12} marginLeft={2} marginRight={2} marginTop={3} spacing={2}
                sx={miEstilo}
            >
                <Grid item xs={12} sm={12}>
                    <Title title="Digitalización de solicitud de OPAS - Radicado OPAS    " />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="tutular"
                        name="tutular"
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={handleInputChange}
                        value={formData.tutular}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="fecha_solicitud"
                        name="fecha_solicitud"
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={handleInputChange}
                        value={formData.fecha_solicitud}
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField
                        label="n_anexos"
                        name="n_anexos"
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={handleInputChange}
                        value={formData.n_anexos}
                    />
                </Grid>


                <Grid item xs={12} sm={3}>
                    <TextField
                        label="nombre_opa"
                        name="nombre_opa"
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={handleInputChange}
                        value={formData.nombre_opa}
                    />
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
                        getRowId={(row) => row.Id_PQRSDF}
                    />
                </Grid>



                <Grid item xs={12} sm={12}>
                    <TextField
                        rows={3}
                        fullWidth
                        multiline
                        size="small"
                        label="Observaciones"
                        variant="outlined"
                    />
                </Grid>



                <Grid item xs={12} sm={4}>
                    <Button
                        color='success'
                        variant='contained'
                    >
                        Digitalizacion incompleta 
                    </Button>
                </Grid>

                <Grid item xs={12} sm={4}>

                    <Button
                        color='success'
                        variant='contained'
                    >
                        Responder digitalizacion 
                    </Button>
                </Grid>

                <Grid item xs={12} sm={4}>

                    <Button
                        color='success'
                        variant='contained'
                    >
                        Responder digitalizacion incompleta 
                    </Button>
                </Grid>

                <Grid item xs={12} sm={4}>

                    <Button
                        color='error'
                        variant='contained'


                    >
                        Salir 
                    </Button>
                </Grid>

            </Grid>
        </>
    );
};
