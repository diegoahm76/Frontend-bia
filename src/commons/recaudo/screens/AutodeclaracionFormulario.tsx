/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { Grid, TextField, } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { api } from '../../../api/axios';
import { control_error, control_success } from '../../../helpers';
import { Title } from '../../../components/Title';
import { useSelector } from 'react-redux';
import { AuthSlice } from '../../auth/interfaces';


interface ConfiguracionBasica {
    id: any;
    orden: any
    categoria: any;
}



// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AutodeclaracionFormulario: React.FC = () => {
    const [configuraciones, setConfiguraciones] = useState<ConfiguracionBasica[]>([]);
    const { userinfo: { nombre_de_usuario, telefono_celular, email, nombre_unidad_organizacional } } = useSelector((state: AuthSlice) => state.auth);
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
        { field: 'id', headerName: ' Numero ', width: 130, flex: 1 },
        { field: 'categoria', headerName: 'categoria', width: 130, flex: 1 },
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


    //// editar tipos de cobro 
    const [formValues, setFormValues] = useState<ConfiguracionBasica>({
        categoria: selectedConfiguracion?.categoria || "",
        orden: selectedConfiguracion?.orden || "",
        id: selectedConfiguracion?.id || "",

    });

    useEffect(() => {
        if (selectedConfiguracion) {
            setFormValues(selectedConfiguracion);
        }
    }, [selectedConfiguracion]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };
    // Editar  
    const handleSubmit = async () => {
        try {
            const url = `/recaudo/procesos/categoria-atributos/${formValues.id}/`;
            const dataToUpdate = {
                categoria: formValues.categoria,
                orden: formValues.orden,
            };
            await api.put(url, dataToUpdate);
            fetchConfiguraciones();
            setFormValues({
                ...formValues,
                id: "",
                categoria: "",
                orden: "",
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
                categoria: "",
                orden: "",
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
                <Title title="Formulario auto declaración  " />
                <Grid container item xs={12} spacing={2} marginTop={2}>


                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            disabled
                            fullWidth
                            size="small"
                            variant="standard"
                            label=" Nombre de usuario    "
                            name="Nombre de usuario "
                            value={nombre_de_usuario}

                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            disabled
                            fullWidth
                            size="small"
                            variant="standard"
                            label="telefono_celular"
                            name="telefono_celular"
                            value={telefono_celular}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            disabled
                            fullWidth
                            size="small"
                            variant="standard"
                            label="email"
                            name="email"
                            value={email}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            disabled
                            fullWidth
                            size="small"
                            variant="standard"
                            label="nombre_unidad_organizacional"
                            name="nombre_unidad_organizacional"
                            value={nombre_unidad_organizacional}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required

                            fullWidth
                            size="small"
                            variant="standard"
                            label="Reprecentante legal"
                            name="Reprecentante legal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            fullWidth
                            size="small"
                            variant="standard"
                            label="Dilegenciado por "
                            name="Dilegenciado por "
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            fullWidth
                            size="small"
                            variant="standard"
                            label="Cargo"
                            name="Cargo"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    </Grid>
                </Grid>





            </Grid>
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
                <Grid item xs={12} sm={7}>
                    <TextField
                        required
                        fullWidth
                        size="small"
                        variant="standard"
                        label="Cuerpo de agua en la que hace la capacitacion"
                        name="Cuerpo de agua en la que hace la capacitacion"
                    />
                </Grid>

                <Grid item xs={12} marginLeft={3}  sm={3}>
                    <TextField
                        required
                        fullWidth
                        size="small"
                        variant="standard"
                        label="Municipio"
                        name="Municipio"
                    />
                </Grid>



                <Grid item xs={12} sm={7}>
                    <TextField
                        required
                        fullWidth
                        size="small"
                        variant="standard"
                        label="Cuerpo de agua en la que hace el vertimiento "
                        name="Cuerpo de agua en la que hace el vertimiento "
                    />
                </Grid>

                <Grid item xs={12} marginLeft={3}  sm={3}>
                    <TextField
                        required
                        fullWidth
                        size="small"
                        variant="standard"
                        label="Municipio"
                        name="Municipio"
                    />
                </Grid>




            </Grid>


        </>
    );
};