/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import type React from 'react';
import { useState, } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import { miEstilo } from '../../Encuesta/interfaces/types';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { FormData, AsignacionEncuesta } from '../interfaces/types';
import { cargarAsignaciones } from '../services/consultAnonimo.service';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { Button, ButtonGroup, Divider, Grid, TextField, } from '@mui/material';
import { DownloadButton } from '../../../../utils/DownloadButton/DownLoadButton';

export const ConsultaAnonimoPQR: React.FC = () => {
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
    const handleResetForm = () => {
        setFormData(initialFormData);
    };
    return (
        <>
            <Grid container
                item xs={12} marginLeft={2} marginRight={2} marginTop={3} spacing={2}
                sx={miEstilo}
            >
                <Grid item xs={12} sm={12}>
                    <Title title="Anónimo - Consultar estado de una solicitud - PQRSDF " />
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
                    <TextField
                        label="radicado"
                        name="radicado"
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                        onChange={handleInputChange}
                        value={formData.radicado}
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
                        disabled={!formData.radicado}
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
