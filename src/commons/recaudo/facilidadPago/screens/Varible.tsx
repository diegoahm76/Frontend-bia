/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { api } from '../../../../api/axios';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { Title } from '../../../../components';
import { Divider, Button, Grid, TextField, MenuItem, } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { control_error, control_success } from '../../../../helpers';
import SaveIcon from '@mui/icons-material/Save';
import { data } from '../../../almacen/gestionDeInventario/catalogoBienes/interfaces/Nodo';


interface ConfiguracionBasica {
    id_variables: any;
    nombre: any;
    tipo_cobro: any;
    tipo_renta: any;
    // valor_varaible: any
}

interface TipoRenta {
    id_tipo_renta: number;
    nombre_tipo_renta: string;
    tipo_cobro_asociado: any;
    tipo_renta_asociado: any
}
interface TipoCobro {
    id_tipo_cobro: number;
    nombre_tipo_cobro: string;
    tipo_renta_asociado: any;
}


// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Varible: React.FC = () => {
    const [configuraciones, setConfiguraciones] = useState<ConfiguracionBasica[]>([]);
    const [selectedConfiguracion, setSelectedConfiguracion] = useState<ConfiguracionBasica | null>(null);
    const fetchConfiguraciones = async (): Promise<void> => {
        try {
            const url = "/recaudo/configuracion_baisca/variables/get/";
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

    const handleEliminarConfiguracion = async (id_variables: number) => {
        try {
            const url = `/recaudo/configuracion_baisca/variables/delete/${id_variables}/`;
            const response = await api.delete(url);
            //  console.log('')("Configuración eliminada con éxito", response.data);
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
        { field: 'id_variables', headerName: ' Numero', width: 130, flex: 1 },
        { field: 'nombre', headerName: 'nombre', width: 130, flex: 1 },


        // { field: 'nombre', headerName: 'nombre', width: 130, flex: 1 },

        // { field: 'valor_varaible', headerName: 'Valor varaible', width: 130, flex: 1 },

        {
            field: 'Acciones',
            headerName: 'Acciones',
            width: 200,
            flex: 1,
            renderCell: (params: any) => (
                <>
                    <IconButton
                        color="error"
                        onClick={() => handleEliminarConfiguracion(params.row.id_variables)}
                    >
                        <DeleteIcon />
                    </IconButton>

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


    //// editar tipos de cobro 
    const [formValues, setFormValues] = useState<ConfiguracionBasica>({
        nombre: selectedConfiguracion?.nombre || "",

        // valor_varaible: selectedConfiguracion?.valor_varaible || "",


        id_variables: selectedConfiguracion?.id_variables || "",
        tipo_cobro: selectedConfiguracion?.tipo_cobro || "",
        tipo_renta: selectedConfiguracion?.tipo_renta || "",
    });
    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = event.target;
    //     setFormValues({ ...formValues, [name]: value });
    // };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };


    useEffect(() => {
        if (selectedConfiguracion) {
            setFormValues(selectedConfiguracion);
        }
    }, [selectedConfiguracion]);


    // Editar  
    const handleSubmit = async () => {
        try {
            const url = `/recaudo/configuracion_baisca/variables/put/${formValues.id_variables}/`;
            const dataToUpdate = {
                nombre: formValues.nombre,
                tipo_cobro: formValues.tipo_cobro,
                tipo_renta: formValues.tipo_renta,
                // valor_varaible: formValues.valor_varaible,


            };
            await api.put(url, dataToUpdate);
            fetchConfiguraciones();
            setFormValues({
                ...formValues,
                id_variables: "",
                nombre: "",
                tipo_cobro: "",
                tipo_renta: "",
                // valor_varaible: "",

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
            const url = "/recaudo/configuracion_baisca/variables/post/";
            const response = await api.post(url, formValues);
            //  console.log('')("Configuración básica creada con éxito", response.data);
            fetchConfiguraciones()
            control_success("Guardado exitosamente");
            setFormValues({
                ...formValues,
                id_variables: "",
                nombre: "",
                // valor_varaible: "",
            });
        } catch (error: any) {
            // console.error("Error al crear la configuración básica", error);
            //  console.log('')(error.response.data.detail.detail);
            control_error(error.response.data.detail?.error);
        }
    };

    const [tiposRenta, setTiposRenta] = useState<TipoRenta[]>([]);

    const fetchTiposRenta = async () => {
        try {
            const res = await api.get("/recaudo/configuracion_baisca/tiporenta/get/");
            setTiposRenta(res.data.data);
        } catch (error) {
            console.error("Error al obtener los tipos de renta", error);
        }
    };

    useEffect(() => {
        fetchTiposRenta();
    }, []);
    //////
    const [tiposCobro, setTiposCobro] = useState<TipoCobro[]>([]);

    const fetchTiposCobro = async () => {
        try {
            const res = await api.get("/recaudo/configuracion_baisca/tipoCobro/get/");
            setTiposCobro(res.data.data);
        } catch (error) {
            console.error("Error al obtener los tipos de renta", error);
        }
    };

    useEffect(() => {
        fetchTiposCobro();
    }, []);


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
                <Title title="Variable" />
                <Grid container item xs={12} spacing={2} marginTop={2}>







                    <Grid item xs={12} sm={4}>
                        <TextField
                            select
                            required
                            fullWidth
                            size="small"
                            variant="outlined"
                            label="Tipo de renta"
                            name="tipo_renta"
                            onChange={handleInputChange}
                            value={formValues.tipo_renta}
                        >
                            {tiposRenta.map((tipo) => (
                                <MenuItem key={tipo.id_tipo_renta} value={tipo.id_tipo_renta}>
                                    {tipo.nombre_tipo_renta}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    {/* <Grid item xs={12} sm={4}>
                        <TextField
                            select
                            required
                            fullWidth
                            size="small"
                            variant="outlined"
                            label="Tipo cobro"
                            name="tipo_cobro"
                            onChange={handleInputChange}
                            value={formValues.tipo_cobro}
                        >
                            {tiposCobro 
                                .map((tipoCobro) => (
                                    <MenuItem key={tipoCobro.id_tipo_cobro} value={tipoCobro.id_tipo_cobro}>
                                        {tipoCobro.nombre_tipo_cobro}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid> */}


                    <Grid item xs={12} sm={4}>
                        <TextField
                            select
                            required
                            fullWidth
                            size="small"
                            variant="outlined"
                            label="Tipo cobro"
                            name="tipo_cobro"
                            onChange={handleInputChange}
                            value={formValues.tipo_cobro}
                        >
                            {tiposCobro
                                .filter(tipoCobro => tipoCobro.tipo_renta_asociado === formValues.tipo_renta) // Filtrado basado en la selección de tipo_renta
                                .map((tipoCobro) => (
                                    <MenuItem key={tipoCobro.id_tipo_cobro} value={tipoCobro.id_tipo_cobro}>
                                        {tipoCobro.nombre_tipo_cobro}
                                    </MenuItem>
                                ))}
                        </TextField> 
                    </Grid>


                    {/* <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            fullWidth
                            size="small"
                            variant="outlined"
                            label="Valor varaible"
                            name="valor_varaible"
                            onChange={handleInputChange}
                            value={formValues.valor_varaible}
                        />
                    </Grid> */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            fullWidth
                            size="small"
                            variant="outlined"
                            label="Variable"
                            name="nombre"
                            onChange={handleInputChange}
                            value={formValues.nombre}
                        />
                    </Grid>




                    <Grid item xs={12} sm={4}>
                        <Button
                            color="success"
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={() => {
                                if (formValues.id_variables === "") {
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
                    <Grid item xs={12} sm={12} marginTop={2}>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                autoHeight
                                pageSize={5}
                                columns={columns}
                                // rows={configuraciones}
                                rows={configuraciones.filter(config => config.tipo_cobro === formValues.tipo_cobro)} // Filtrado adicional basado en tipo_cobro

                                getRowId={(row) => row.id_variables}
                            />
                        </div>
                    </Grid>
                </Grid>

            </Grid>
        </>
    );
};