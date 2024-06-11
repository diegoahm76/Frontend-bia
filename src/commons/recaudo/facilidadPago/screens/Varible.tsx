/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

// Importación de estilos y librerías necesarias
import 'leaflet/dist/leaflet.css';
import { api } from '../../../../api/axios';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { Title } from '../../../../components';
import { Divider, Button, Grid, TextField, MenuItem, } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { control_error, control_success } from '../../../../helpers';

// Definición de interfaces para tipar los datos
interface ConfiguracionBasica {
    id_variables: any;
    nombre: any;
    tipo_cobro: any;
    tipo_renta: any;
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

// Componente principal
export const Varible: React.FC = () => {
    // Estados para almacenar configuraciones y la configuración seleccionada
    const [configuraciones, setConfiguraciones] = useState<ConfiguracionBasica[]>([]);
    const [selectedConfiguracion, setSelectedConfiguracion] = useState<ConfiguracionBasica | null>(null);

    // Función para obtener las configuraciones básicas desde la API
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

    // Función para abrir el modal de edición
    const handleAbrirEditar = (configuracion: ConfiguracionBasica) => {
        setSelectedConfiguracion(configuracion);
    };

    // Obtener configuraciones al montar el componente
    useEffect(() => {
        void fetchConfiguraciones();
    }, []);

    // Función para eliminar una configuración
    const handleEliminarConfiguracion = async (id_variables: number) => {
        try {
            const url = `/recaudo/configuracion_baisca/variables/delete/${id_variables}/`;
            await api.delete(url);
            fetchConfiguraciones();
            control_error("Eliminado exitosamente");
        } catch (error: any) {
            console.error("Error al eliminar la configuración", error);
            control_error("Error al eliminar la configuración");
        }
    };

    // Definición de columnas para el DataGrid
    const columns = [
        { field: 'id_variables', headerName: 'Numero', width: 130, flex: 1 },
        { field: 'nombre', headerName: 'Nombre', width: 130, flex: 1 },
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
        }
    ];

    // Estado y función para manejar los valores del formulario
    const [formValues, setFormValues] = useState<ConfiguracionBasica>({
        id_variables: "",
        nombre: "",
        tipo_cobro: "",
        tipo_renta: ""
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    // Actualizar los valores del formulario cuando se selecciona una configuración
    useEffect(() => {
        if (selectedConfiguracion) {
            setFormValues(selectedConfiguracion);
        }
    }, [selectedConfiguracion]);

    // Función para editar una configuración
    const handleSubmit = async () => {
        try {
            const url = `/recaudo/configuracion_baisca/variables/put/${formValues.id_variables}/`;
            const dataToUpdate = {
                nombre: formValues.nombre,
                tipo_cobro: formValues.tipo_cobro,
                tipo_renta: formValues.tipo_renta,
            };
            await api.put(url, dataToUpdate);
            fetchConfiguraciones();
            setFormValues({
                id_variables: "",
                nombre: "",
                tipo_cobro: "",
                tipo_renta: ""
            });
            control_success("Editado exitosamente");
        } catch (error: any) {
            console.error("Error al actualizar la configuración", error);
            control_error("Error al actualizar la configuración");
        }
    };

    // Función para crear una nueva configuración
    const handleSubmitCrear = async () => {
        try {
            const url = "/recaudo/configuracion_baisca/variables/post/";
            await api.post(url, formValues);
            fetchConfiguraciones();
            control_success("Guardado exitosamente");
            setFormValues({
                id_variables: "",
                nombre: "",
                tipo_cobro: "",
                tipo_renta: ""
            });
        } catch (error: any) {
            console.error("Error al crear la configuración básica", error);
            control_error("Error al crear la configuración básica");
        }
    };

    // Estado y función para manejar los tipos de renta
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

    // Estado y función para manejar los tipos de cobro
    const [tiposCobro, setTiposCobro] = useState<TipoCobro[]>([]);
    const fetchTiposCobro = async () => {
        try {
            const res = await api.get("/recaudo/configuracion_baisca/tipoCobro/get/");
            setTiposCobro(res.data.data);
        } catch (error) {
            console.error("Error al obtener los tipos de cobro", error);
        }
    };

    useEffect(() => {
        fetchTiposCobro();
    }, []);

    return (
        <Grid
            container
            item
            xs={12}
            marginLeft={2}
            marginRight={2}
            marginTop={3}
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                m: '10px 0 20px 0',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
            }}
        >
            <Title title="Variable" />
            <Grid container item xs={12} spacing={2} marginTop={2}>
                {/* Campo de selección de tipo de renta */}
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

                {/* Campo de selección de tipo de cobro */}
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

                {/* Campo para el nombre de la variable */}
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

                {/* Botón para guardar o editar la configuración */}
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

                {/* Divisor */}
                <Divider
                    style={{
                        width: '98%',
                        marginTop: '8px',
                        marginLeft: 'auto',
                        marginBottom: '8px',
                    }}
                />

                {/* Tabla con las configuraciones */}
                <Grid item xs={12} sm={12} marginTop={2}>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            autoHeight
                            pageSize={5}
                            columns={columns}
                            rows={configuraciones.filter(config => config.tipo_cobro === formValues.tipo_cobro)} // Filtrado adicional basado en tipo_cobro
                            getRowId={(row) => row.id_variables}
                        />
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
};
