/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { Divider, Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem, ButtonGroup, } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { api } from '../../../api/axios';
import { control_error, control_success } from '../../../helpers';
import { Title } from '../../../components/Title';
import { download_xls } from '../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../documentos-descargar/PDF_descargar';


interface ConfiguracionBasica {
    id: any;
    orden: any
    categoria: any;
    id_etapa: any;
}
interface Etapa {
    id: number;
    etapa: string;
    descripcion: string;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SupEtapasProceso: React.FC = () => {
    const [configuraciones, setConfiguraciones] = useState<ConfiguracionBasica[]>([]);
    const [selectedConfiguracion, setSelectedConfiguracion] = useState<ConfiguracionBasica | null>(null);
    const fetchConfiguraciones = async (): Promise<void> => {
        try {
            const url = "/recaudo/procesos/categoria-atributos/";
            const res = await api.get(url);
            const configuracionesData: ConfiguracionBasica[] = res.data?.data || [];
            setConfiguraciones(configuracionesData);
        } catch (error) {
            console.error(error);
        }
    };
    const handleAbrirEditar = (configuracion: ConfiguracionBasica) => {
        setSelectedConfiguracion(configuracion);
        // setIsBuscarActivo(true);
    };
    useEffect(() => {
        void fetchConfiguraciones();
    }, []);

    const handleEliminarConfiguracion = async (id: number) => {
        try {
            const url = `/recaudo/configuracion_baisca/tipoCobro/delete/${id}/`;
            const response = await api.delete(url);
            console.log("Configuración eliminada con éxito", response.data);
            // Actualizar la lista de configuraciones después de eliminar
            fetchConfiguraciones();
            control_error("eliminado exitosamente ");

        } catch (error: any) {
            console.error("Error al eliminar la configuración", error);
            fetchConfiguraciones();
            // control_error(error.response.data.detail);3

            // Manejar el error
        }
    };

    const columns = [
        // { field: 'id', headerName: ' Numero ', width: 130, flex: 1 },
        { field: 'categoria', headerName: 'categoria', width: 130, flex: 1 },
        { field: 'nombre_etapa', headerName: 'Nombre etapa', width: 130, flex: 1 },

        { field: 'orden', headerName: 'orden', width: 130, flex: 1 },

        {
            field: 'Acciones',
            headerName: 'Acciones',
            width: 200,
            flex: 1,
            renderCell: (params: any) => (
                <>
                    {/* <IconButton
                        color="error"
                        onClick={() => handleEliminarConfiguracion(params.row.id)}
                    >
                        <DeleteIcon />
                    </IconButton> */}

                    <IconButton
                        color="primary"
                        onClick={() => handleAbrirEditar(params.row)}
                    >
                        <EditIcon />
                    </IconButton>
                </>
            )
        },

    ];
    const [etapas, setEtapas] = useState<Etapa[]>([]);

    const fetchEtapas = async () => {
        try {
            const url = "/recaudo/procesos/etapas/";
            const res = await api.get(url);
            const etapasData: Etapa[] = res.data.data;
            setEtapas(etapasData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchEtapas();
    }, []);

    //// editar tipos de cobro 
    const [formValues, setFormValues] = useState<ConfiguracionBasica>({
        id: selectedConfiguracion?.id || "",
        orden: selectedConfiguracion?.orden || "",
        id_etapa: selectedConfiguracion?.id_etapa || "",
        categoria: selectedConfiguracion?.categoria || "",
    });

    useEffect(() => {
        if (selectedConfiguracion) {
            setFormValues(selectedConfiguracion);
        }
    }, [selectedConfiguracion]);

    const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };
    // Editar  
    const handleSubmit = async () => {
        try {
            const url = `/recaudo/procesos/categoria-atributos/${formValues.id}/`;
            const dataToUpdate = {
                orden: formValues.orden,
                id_etapa: formValues.id_etapa,
                categoria: formValues.categoria,
            };
            await api.put(url, dataToUpdate);
            fetchConfiguraciones();
            setFormValues({
                ...formValues,
                id: "",
                orden: "",
                id_etapa: "",
                categoria: "",
            });
            control_success("Editado  exitosamente");
        } catch (error: any) {
            console.error("Error al actualizar la configuración", error);
            control_error(error.response.data.detail);
        }
    };
    //crear 
    const handleSubmitCrear = async () => {
        try {
            const url = "/recaudo/procesos/categoria-atributos/";
            const response = await api.post(url, formValues);
            console.log("Configuración básica creada con éxito", response.data);
            fetchConfiguraciones()
            control_success("Guardado exitosamente");
            setFormValues({
                ...formValues,
                // id: "",
                orden: "",
                id_etapa: "",
                categoria: "",
            });
        } catch (error: any) {
            // console.error("Error al crear la configuración básica", error);
            console.log(error.response.data.detail.detail);
            control_error(error.response.data.detail?.error);
        }
    };


    return (
        <>


            <Grid container
                item xs={12} marginLeft={2} marginRight={2} marginTop={3}
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px', m: '10px 0 20px 0', mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >
                <Title title="Subetapas de procesos " />
                <Grid container item xs={12} spacing={2} marginTop={2}>

                    <Grid item xs={12} sm={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="etapa-select-label">Etapa</InputLabel>
                            <Select
                                labelId="etapa-select-label"
                                id="etapa-select"
                                value={formValues.id_etapa}
                                label="Etapa"
                                onChange={handleInputChange}
                                name="id_etapa"
                            >
                                {etapas.map((etapa) => (
                                    <MenuItem key={etapa.id} value={etapa.id}>
                                        {etapa.etapa}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            fullWidth
                            size="small"
                            name="categoria"
                            label="categoria"
                            variant="outlined"
                            onChange={handleInputChange}
                            value={formValues.categoria}
                        />
                    </Grid>


                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            fullWidth
                            name="orden"
                            size="small"
                            label="orden"
                            variant="outlined"
                            value={formValues.orden}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button
                            color="success"
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={() => {
                                if (formValues.id === "") {
                                    handleSubmitCrear();
                                } else {
                                    handleSubmit();
                                }
                            }}
                        >
                            Guardar
                        </Button>

                    </Grid>
                    <Divider
                        style={{
                            width: '98%',
                            marginTop: '8px',
                            marginLeft: 'auto',
                            marginBottom: '8px',
                        }}
                    />

                    <Grid item xs={12} sm={10} ></Grid>

                    <Grid item >
                        <ButtonGroup style={{ margin: 5, }}>
                            {download_xls({ nurseries: configuraciones, columns })}
                            {download_pdf({
                                nurseries: configuraciones,
                                columns,
                                title: 'Mis alertas',
                            })}
                        </ButtonGroup>
                    </Grid>

                    <Grid item xs={12} sm={12} marginTop={2}>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                autoHeight
                                pageSize={5}
                                columns={columns}
                                rows={configuraciones}
                                getRowId={(row) => row.id}
                            />
                        </div>
                    </Grid>
                </Grid>

            </Grid>
        </>
    );
};