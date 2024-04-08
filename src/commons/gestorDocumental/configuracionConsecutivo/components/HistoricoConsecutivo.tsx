/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { api } from "../../../../api/axios";
import { Title } from "../../../../components";
import SaveIcon from '@mui/icons-material/Save';
import { miEstilo } from "../../Encuesta/interfaces/types";
import { control_error, control_success } from "../../../../helpers";
import { Button, ButtonGroup, Dialog, Divider, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SearchIcon from '@mui/icons-material/Search';
import { download_xls } from "../../../../documentos-descargar/XLS_descargar";
import { download_pdf } from "../../../../documentos-descargar/PDF_descargar";
import { DownloadButton } from "../../../../utils/DownloadButton/DownLoadButton";


interface ConsecutivoData {
    id_unidad: number;
    ruta_archivo:any;
    id_catalogo: number;
    consecutivo: string;
    id_serie_doc: number;
    nombre_unidad: string;
    cod_serie_doc: string;
    id_consecutivo: number;
    nro_consecutivo: string;
    id_subserie_doc: number;
    nombre_serie_doc: string;
    agno_consecutivo: number;
    cod_subserie_doc: string;
    fecha_consecutivo: string;
    nombre_subserie_doc: string;
    id_persona_solicita: number;
}

export interface UnidadOrganizaciona {
    nombre: string;
    id_unidad_organizacional: number;
}
export interface FormData {
    unidad: any;
    fecha_fin: any;
    fecha_inicio: any;
    id_persona: any;
    consecutivo: any;
};
export const HistoricoConsecutivo: React.FC = () => {

    const initialFormData: FormData = {
        unidad: "",
        fecha_inicio: "",
        fecha_fin: "",
        id_persona: "",
        consecutivo: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [rows, setRows] = useState<ConsecutivoData[]>([]);
    const fetchData = async () => {
        try {
            const response = await api.get(`/gestor/consecutivos-unidades/consecutivo/get/?unidad=${formData.unidad}&consecutivo=${formData.consecutivo}&fecha_inicio=${formData.fecha_inicio}&fecha_fin=${formData.fecha_fin}&id_persona`);
            if (response.data.succes) {
                setRows(response.data.data);
            } else {
                // Manejar el caso de éxito falso
                console.error('Error al obtener datos: ', response.data.detail);
            }
        } catch (error: any) {
            console.error('Error al realizar la solicitud API: ', error);
            control_error(error.response.data.detail);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [

        { field: 'consecutivo', headerName: 'Consecutivo', width: 180, flex: 1 },
        { field: 'nombre_unidad', headerName: 'Nombre unidad', width: 200, flex: 1 },
        { field: 'agno_consecutivo', headerName: 'Año de consecutivo   ', width: 200, flex: 1 },
        { field: 'nombre_serie_doc', headerName: 'Nombre serie', width: 200, flex: 1 },
        { field: 'nombre_subserie_doc', headerName: 'Nombre subserie', width: 200, flex: 1 },
        { field: 'fecha_consecutivo', headerName: 'Fecha consecutivo  ', width: 200, flex: 1 },
        // { field: 'ruta_archivo', headerName: '  ruta_archivo  ', width: 200, flex: 1 },

        {
            field: 'ruta_archivo',
            headerName: 'ruta_archivo',
            width: 200,
            flex: 1,
            renderCell: (params: any) => (
                <DownloadButton
                    condition={false}
                    fileUrl={params.row.ruta_archivo}
                    fileName={params.row.id_consecutivo}
                />
            )
        }, 

    ];






    const [unidades, setUnidades] = useState<UnidadOrganizaciona[]>([]);
    const fetchUnidades = async () => {
        try {
            const url = "/gestor/consecutivos-unidades/unidades_organigrama_actual/get/";
            const res = await api.get(url);
            const unidadesData = res.data.data;
            setUnidades(unidadesData);
            control_success("Configuraciones encotradas  ")

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUnidades();
    }, []);


    const eliminar = () => {
        setFormData(initialFormData);
        fetchUnidades();
 
    }

    const buscar = () => {
        fetchData()
        setRows([])
 
    }

    return (
        <>
            <Grid container
                item xs={12} marginLeft={2} marginRight={2} marginTop={3} spacing={2}
                sx={miEstilo}
            >

                <Title title="Historial   de consecutivos " />
 

                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        label="Consecutivo "
                        name="consecutivo"
                        value={formData.consecutivo}
                        onChange={handleInputChange}

                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label="Fecha desde  "
                        type="date"
                        size="small"
                        name="fecha_fin"
                        variant="outlined"
                        value={formData.fecha_fin}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => {
                            handleInputChange(e);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        type="date"
                        size="small"
                        variant="outlined"
                        name="fecha_inicio"
                        label="Fecha desde"
                        value={formData.fecha_inicio}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => {
                            handleInputChange(e);
                        }}
                    />
                </Grid>
                <Grid item >
                    <Button
                        color='primary'
                        variant='contained'
                        startIcon={<SearchIcon />}
                        onClick={buscar}
                    >
                        Buscar
                    </Button>
                </Grid>

                <Grid item >
                    <Button
                        variant="outlined"
                        startIcon={<CleanIcon />}
                        onClick={eliminar}
                    >
                        Eliminar
                    </Button>

                </Grid>


                <Divider
                    style={{
                        width: '98%',
                        marginTop: '8px',
                        marginBottom: '8px',
                        marginLeft: 'auto',
                    }}
                />
                <Grid container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center" item xs={12} sm={12} >
                    <Grid item  >
                        <ButtonGroup style={{ margin: 5, }}>
                            {download_xls({ nurseries: rows, columns })}
                            {download_pdf({
                                nurseries: rows,
                                columns,
                                title: 'consecutivo',
                            })}
                        </ButtonGroup>
                    </Grid>


                </Grid>


                <Grid item xs={12} marginTop={2}>
                    <DataGrid
                        autoHeight
                        density="compact"
                        rows={rows}
                        pageSize={5}
                        columns={columns}
                        rowsPerPageOptions={[10]}
                        getRowId={(row) => row.id_consecutivo}
                    />
                </Grid>


            </Grid>


        </>
    );
};