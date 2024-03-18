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
import { download_xls } from "../../../../documentos-descargar/XLS_descargar";
import { download_pdf } from "../../../../documentos-descargar/PDF_descargar";

export interface UnidadOrganizaciona {
    nombre: string;
    id_unidad_organizacional: number;
}
interface FormData {
    id_unidad: any;
    implementar: any;
    agno_consecutivo: any;
    cantidad_digitos: any;
    consecutivo_inicial: any;
    id_catalogo_serie_unidad: any;
}
export interface SerieSubserie {
    id_cat_serie_und: number;
    id_serie_doc: number;
    cod_serie_doc: string;
    nombre_serie_doc: string;
    id_subserie_doc: number | null;
    cod_subserie_doc: string | null;
    nombre_subserie_doc: string | null;
}
interface UnidadConfiguracion {
    implementar: any;
    agno_consecutivo: number;
    cantidad_digitos: any;
    nombre_unidad: string;
    persona_configura: any;
    consecutivo_actual: any;
    consecutivo_inicial: any;
    fecha_consecutivo_actual: any;
    id_config_tipo_consec_agno: number;
    fecha_inicial_config_implementacion: any;
};


export const Creacion: React.FC = () => {
    const initialFormData: FormData = {
        id_unidad: "",
        implementar: false,
        agno_consecutivo: "",
        cantidad_digitos: "",
        consecutivo_inicial: "",
        id_catalogo_serie_unidad: "",
    };


    const [formData, setFormData] = useState<FormData>(initialFormData);

    // const handleInputChange = (event: any) => {
    //     const target = event.target as HTMLInputElement;
    //     const { name, value } = target;
    //     const numericFields = ['agno_consecutivo', 'consecutivo_inicial', 'cantidad_digitos'];
    //     const updatedValue = numericFields.includes(name) ? Number(value) : value;


    //     setFormData(prevState => ({ ...prevState, [name]: updatedValue }));
    // };
    const handleInputChange = (event: any) => {
        const target = event.target as HTMLInputElement;
        const { name, value } = target;
        const numericFields = ['agno_consecutivo', 'consecutivo_inicial', 'cantidad_digitos','id_catalogo_serie_unidad'];

        // Verifica si el campo es numérico y si el valor es numérico o vacío
        const isNumericField = numericFields.includes(name);
        const isNumericValue = value === '' || /^[0-9\b]+$/.test(value);

        if (isNumericField && !isNumericValue) {
            // No actualizar el estado si el valor no es numérico
            return;
        }

        // Convertir a número si el campo es numérico, de lo contrario usar el valor como está
        const updatedValue = isNumericField ? Number(value) : value;

        setFormData(prevState => ({ ...prevState, [name]: updatedValue }));
    };


    const crearConfiguracion = async () => {
        try {
            const url = "/gestor/consecutivos-unidades/config_tipo_consec_agno/create/";
            const res = await api.post(url, formData);
            console.log('Formulario creado con éxito', res.data);
            control_success("Formulario creado con éxito")
            setFormData(initialFormData);
        } catch (error: any) {
            console.error('Error al crear el formulario', error);
            control_error(error.response.data.detail);

        }
    };
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


    const [unidadesConfig, setUnidadesConfig] = useState<UnidadConfiguracion[]>([]);

    const fetchUnidadesConfig = async () => {
        try {
            const url = `/gestor/consecutivos-unidades/config_tipo_consec_agno/get/${formData.agno_consecutivo}/${formData.id_unidad}/`;
            const res = await api.get(url);
            const unidadesConfigData = res.data.data;
            setUnidadesConfig([unidadesConfigData]);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        setUnidadesConfig([]);
        fetchUnidadesConfig();
    }, [formData.agno_consecutivo, formData.id_unidad]);

    const [selectedEmail, setSelectedEmail] = useState<UnidadConfiguracion | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handle_close = (): void => {
        setIsModalOpen(false)
    };
    const columns = [
        { field: 'consecutivo_inicial', headerName: 'Consecutivo inicial', width: 200, flex: 1, },
        { field: 'persona_configura', headerName: 'Persona configura', width: 200, flex: 1, },
        { field: 'cantidad_digitos', headerName: 'Cantidad dígitos', width: 200, flex: 1, },
        { field: 'agno_consecutivo', headerName: 'Año consecutivo', width: 200, flex: 1, },
        { field: 'implementar', headerName: 'Implementar', width: 200, flex: 1, },
        { field: 'fecha_inicial_config_implementacion', headerName: 'Fecha inicial de configuración', width: 200, flex: 1, },
        {
            field: 'Editar',
            headerName: 'Editar',
            width: 150,
            renderCell: (params: any) => (
                <IconButton
                    color='default'
                    onClick={() => {
                        setSelectedEmail(params.row);
                        setIsModalOpen(true)

                        setUpdateData({
                            implementar: params.row.implementar,
                            consecutivo_inicial: params.row.consecutivo_inicial,
                            cantidad_digitos: params.row.cantidad_digitos
                        });
                    }}
                >
                    <EditIcon />
                </IconButton>
            )
        },

    ];
    const [updateData, setUpdateData] = useState({
        implementar: false,
        consecutivo_inicial: 1,
        cantidad_digitos: 2,
    });

    // const handleUpdateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = event.target;
    //     setUpdateData(prevState => ({
    //         ...prevState,
    //         [name]: name === 'implementar' ? value === 'true' : Number(value)
    //     }));
    // };

    const handleUpdateChange = (event: React.ChangeEvent<HTMLInputElement>, checked?: boolean) => {
        const { name } = event.target;
        // Para el Switch, usamos el valor de 'checked', para otros inputs usamos 'value'.
        const value = name === 'implementar' ? checked : event.target.value;

        setUpdateData(prevState => ({
            ...prevState,
            [name]: name === 'implementar' ? value : Number(value)
        }));
    };

    const updateUnidadesConfig = async () => {
        try {
            const url = `/gestor/consecutivos-unidades/config_tipo_consec_agno/update/${selectedEmail?.id_config_tipo_consec_agno}/`;
            const res = await api.put(url, updateData);
            console.log('Configuración actualizada con éxito', res.data);
            fetchUnidadesConfig();
        } catch (error: any) {
            console.error('Error al actualizar la configuración', error);
            control_error(error.response.data.detail);
        }
    };

    // const updateUnidadesConfig = async () => {
    //     try {
    //         const url = `/gestor/consecutivos-unidades/config_tipo_consec_agno/update/${selectedEmail?.id_config_tipo_consec_agno}/`;
    //         const data = {
    //             implementar: false,
    //             consecutivo_inicial: 1,
    //             cantidad_digitos: 2,
    //         };
    //         const res = await api.put(url, data);
    //         console.log('Configuración actualizada con éxito', res.data); 
    //         fetchUnidadesConfig();
    //     } catch (error: any) {
    //         console.error('Error al actualizar la configuración', error);
    //         control_error(error.response.data.detail); 
    //     }
    // };
    const getCurrentYearAndNext = () => {
        const currentYear = new Date().getFullYear();
        return [currentYear, currentYear + 1];
    };


    const [seriesSubseries, setSeriesSubseries] = useState<SerieSubserie[]>([]);
    const fetchSeriesSubseries = async () => {
        try {
            const url = `/gestor/consecutivos-unidades/serie_subserio_unidad/get/${formData.id_unidad}/`;
            const res = await api.get(url);
            const data = res.data.data;
            setSeriesSubseries(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSeriesSubseries();
    }, [formData.id_unidad]);

    return (
        <>
            <Grid container
                item xs={12} marginLeft={2} marginRight={2} marginTop={3} spacing={2}
                sx={miEstilo}
            >
                <Title title="Configuración de consecutivo " />



                <Dialog
                    keepMounted
                    aria-describedby="alert-dialog-slide-description"
                    open={isModalOpen}
                    onClose={handle_close}
                    maxWidth="xl"
                >
                    <Grid
                        container spacing={2}
                        sx={{
                            position: 'relative',
                            background: '#FAFAFA',
                            borderRadius: '15px',
                            p: '20px',
                            mb: '20px',
                            boxShadow: '0px 3px 6px #042F4A26'
                        }}
                    >
                        <Grid item xs={12} sm={12}>
                            <Title title="Editar configuración" />
                        </Grid>



                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                name="consecutivo_inicial"
                                label="Consecutivo inicial"
                                onChange={handleUpdateChange}
                                value={updateData.consecutivo_inicial}
                            />
                        </Grid>


                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                name="cantidad_digitos"
                                label="Cantidad de dígitos"
                                onChange={handleUpdateChange}
                                value={updateData.cantidad_digitos}
                            />

                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={updateData.implementar}
                                        onChange={(event, checked) => handleUpdateChange(event, checked)}
                                        name="implementar"
                                    />
                                }
                                label="Implementar"
                            />
                        </Grid>
                        <Grid item >
                            <Button
                                color='success'
                                variant='contained'
                                startIcon={<SaveIcon />}
                                onClick={updateUnidadesConfig}
                            >
                                Actualizar
                            </Button>
                        </Grid>
                    </Grid>
                </Dialog>



                {/* {selectedEmail?.id_config_tipo_consec_agno} */}
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="unidad-organizacional-select-label">Unidad Organizacional</InputLabel>
                        <Select
                            labelId="unidad-organizacional-select-label"
                            id="unidad-organizacional-select"
                            value={formData.id_unidad}
                            name="id_unidad"

                            label="Unidad Organizacional"
                            onChange={handleInputChange}
                        >
                            {unidades.map((unidad) => (
                                <MenuItem key={unidad.id_unidad_organizacional} value={unidad.id_unidad_organizacional}>
                                    {unidad.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="serie-subserie-select-label">Serie/Subserie</InputLabel>
                        <Select
                            labelId="serie-subserie-select-label"
                            name="id_catalogo_serie_unidad"
                            label="Serie/Subserie"
                            value={formData.id_catalogo_serie_unidad}
                            onChange={handleInputChange}

                        >
                            {seriesSubseries.map((item) => (
                                <MenuItem key={item.id_cat_serie_und} value={`${item.id_cat_serie_und}`}>
                                    {item.nombre_serie_doc} {item.nombre_subserie_doc ? `- ${item.nombre_subserie_doc}` : ''}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {/* <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        name="agno_consecutivo"
                        label="Año consecutivo"
                        onChange={handleInputChange}
                        value={formData.agno_consecutivo}

                    />
                </Grid> */}
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small" variant="outlined">
                        <InputLabel>Año consecutivo</InputLabel>
                        <Select
                            label="Año consecutivo"
                            name="agno_consecutivo"
                            value={formData.agno_consecutivo}
                            onChange={handleInputChange}
                        >
                            {getCurrentYearAndNext().map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>


                






                {/* {formData.agno_consecutivo} */}
                {/* <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        name="implementar"
                        label="implementar"
                        value={formData.implementar}
                        onChange={handleInputChange} 
                    />
                </Grid> */}





                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        label="Consecutivo inicial"
                        name="consecutivo_inicial"
                        value={formData.consecutivo_inicial}
                        onChange={handleInputChange}

                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth

                        size="small"
                        variant="outlined"
                        label="Cantidad digitos"
                        name="cantidad_digitos"
                        value={formData.cantidad_digitos}
                        onChange={handleInputChange}

                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={formData.implementar === 'true'} // Asumiendo que formData.implementar es un string que puede ser 'true' o 'false'
                                onChange={(event) => handleInputChange({ target: { name: 'implementar', value: event.target.checked.toString() } })}
                                name="implementar"
                                color="primary"
                            />
                        }
                        label="Implementar"
                    />
                </Grid>
                <Grid container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center" item xs={12} sm={4}>

                    <Grid item >
                        <Button color='success'
                            variant='contained'
                            startIcon={<SaveIcon />} onClick={crearConfiguracion}>
                            Guardar
                        </Button>
                    </Grid>



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
                            {download_xls({ nurseries: unidadesConfig, columns })}
                            {download_pdf({
                                nurseries: unidadesConfig,
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
                        pageSize={10}
                        columns={columns}
                        rowsPerPageOptions={[10]}
                        rows={unidadesConfig}
                        getRowId={(row) => row.id_config_tipo_consec_agno}
                    />
                </Grid>
            </Grid>


        </>
    );
};