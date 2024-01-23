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
import { organigrama, AsignacionEncuesta, FormData, Pqr, estado, TipoPQRSDF } from '../interface/types';
import { Button, ButtonGroup, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, } from '@mui/material';
import { cargarAsignaciones, cargarestado, cargarorganigrama, fetchSpqrs, fetchTipoPQRSDF } from '../services/consultaExterno.service';

export const ConsultaExternoPQR: React.FC = () => {
    const [asignaciones, setAsignaciones] = useState<AsignacionEncuesta[]>([]);
  
    const initialFormData: FormData = {
        id_persona_alertar: null,
        pqrs: "",
        estado: "",
        radicado: "",
        organigrama: "",
        fecha_desde: "",
        fecha_hasta: "",
        tipo_solicitud: "",
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
    useEffect(() => {
        cargarAsignaciones({
            setAsignaciones: setAsignaciones,
            formData: formData,
        });
    }, []);
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
        { field: 'Persona Que Radicó', headerName: 'Persona Que Radicó  ', width: 220, flex: 1, },
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
    // Efecto para cargar los datos del pqrs
    const [pqrss, setpqrs] = useState<Pqr[]>([]);
    useEffect(() => {
        fetchSpqrs({ setpqrs });
    }, []);
    //Organigrama 
    const [organigrama, setorganigrama] = useState<organigrama[]>([]);

    useEffect(() => {
        cargarorganigrama({ setorganigrama });
    }, []);
    //
    const [tipoPQRSDF, setTipoPQRSDF] = useState<TipoPQRSDF[]>([]);
    useEffect(() => {
        fetchTipoPQRSDF({ setTipoPQRSDF });
    }, []);
    //Estado 
    const [estado, setestado] = useState<estado[]>([]);
    useEffect(() => {
        cargarestado({ setestado });
    }, []);
    //eliminar 
    const handleResetForm = () => {
        setFormData(initialFormData);
        cargarAsignaciones({
            setAsignaciones: setAsignaciones,
            formData: formData,
        });

    };
    return (
        <>
            <Grid container
                item xs={12} marginLeft={2} marginRight={2} marginTop={3} spacing={2}
                sx={miEstilo}
            >
                <Grid item xs={12} sm={12}>
                    <Title title="externo Consultar estado de una solicitud - PQRSDF " />
                </Grid>

            </Grid>
            <Grid container
                item xs={12} marginLeft={2} marginRight={2} marginTop={3} spacing={2}
                sx={miEstilo}
            >
                <Grid item xs={12} sm={12}>
                    <Title title="Filtro de búsqueda    " />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <FormControl size="small" fullWidth>
                        <InputLabel >Tipos de solicitud</InputLabel>
                        <Select
                            onChange={handleInputChange}
                            value={formData.tipo_solicitud}
                            name="tipo_solicitud"
                            label="tipo_solicitud"
                        >
                            {tipoPQRSDF.map((tipo_solicitud) => (
                                <MenuItem key={tipo_solicitud.codigo} value={tipo_solicitud.codigo}>
                                    {tipo_solicitud.descripcion}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>


                <Grid item xs={12} sm={3}>
                    <FormControl size="small" fullWidth>
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
                    <FormControl size="small" fullWidth>
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
                    <TextField
                        label="radicado"
                        name="radicado"
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={handleInputChange}
                        value={formData.radicado}
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <FormControl size="small" fullWidth>
                        <InputLabel   >estado</InputLabel>
                        <Select
                            label="estado"
                            onChange={handleInputChange}
                            name="estado"
                            value={formData.estado}
                        >
                            {estado.map(estado => (
                                <MenuItem key={estado.id_estado_solicitud} value={estado.nombre}>
                                    {estado.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
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
                            cargarAsignaciones({
                                setAsignaciones: setAsignaciones,
                                formData: formData,
                            });
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
                        getRowId={(row) => row.Id_PQRSDF}
                    />
                </Grid>
            </Grid>
        </>
    );
};
