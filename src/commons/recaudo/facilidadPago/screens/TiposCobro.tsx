/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { api } from '../../../../api/axios';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { Title } from '../../../../components';
import { Divider, Button, Grid, TextField, FormControl, InputLabel, MenuItem, Select, } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { control_error, control_success } from '../../../../helpers';
import SaveIcon from '@mui/icons-material/Save';


interface ConfiguracionBasica {
    [x: string]: any;
    id_tipo_cobro: any;
    nombre_tipo_cobro: any;
    tipo_renta_asociado: any;
}

interface renta {
    id_tipo_renta: any;
    nombre_tipo_renta: any;
    nombre_cobro: any;
    tipo_cobro_asociado: any;
}
interface BuscarProps {
    fetchTiposCobro: any;
}
// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/naming-convention
export const TiposCobro: React.FC<BuscarProps> = ({  fetchTiposCobro }) => {

    const [selectedConfiguracion, setSelectedConfiguracion] = useState<ConfiguracionBasica | null>(null);


    const [configuraciones, setConfiguraciones] = useState<ConfiguracionBasica[]>([]);
    const fetchConfiguraciones = async (): Promise<void> => {
        try {
            const url = "/recaudo/configuracion_baisca/tipoCobro/get/";
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

    const handleEliminarConfiguracion = async (id_tipo_cobro: number) => {
        try {
            const url = `/recaudo/configuracion_baisca/tipoCobro/delete/${id_tipo_cobro}/`;
            const response = await api.delete(url);
            //  console.log('')("Configuración eliminada con éxito", response.data);
            // Actualizar la lista de configuraciones después de eliminar
            fetchConfiguraciones();
            control_error("eliminado exitosamente ");
            fetchTiposCobro()
        } catch (error: any) {
            console.error("Error al eliminar la configuración", error);
            fetchConfiguraciones();
            // control_error(error.response.data.detail);3

            // Manejar el error
        }
    };

    const columns = [

        { field: 'nombre_renta_asociado', headerName: ' Renta asociado ', width: 130, flex: 1 },
        { field: 'nombre_tipo_cobro', headerName: 'Tipo cobro', width: 130, flex: 1 },
        // { field: 'tipo_renta_asociado', headerName: ' tipo_renta_asociado ', width: 130, flex: 1 },

        {
            field: 'Acciones',
            headerName: 'Acciones',
            width: 200,
            flex: 1,
            renderCell: (params: any) => (
                <>
                    <IconButton
                        color="error"
                        onClick={() => handleEliminarConfiguracion(params.row.id_tipo_cobro)}
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
        nombre_tipo_cobro: selectedConfiguracion?.nombre_tipo_cobro || "",
        id_tipo_cobro: selectedConfiguracion?.id_tipo_cobro || "",
        tipo_renta_asociado: selectedConfiguracion?.tipo_renta_asociado || "",

    });

    useEffect(() => {
        if (selectedConfiguracion) {
            setFormValues(selectedConfiguracion);
        }
    }, [selectedConfiguracion]);

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };
    // Editar  
    const handleSubmit = async () => {
        try {
            const url = `/recaudo/configuracion_baisca/tipoCobro/put/${formValues.id_tipo_cobro}/`;
            const dataToUpdate = {
                nombre_tipo_cobro: formValues.nombre_tipo_cobro,
                tipo_renta_asociado: formValues.tipo_renta_asociado
            };
            await api.put(url, dataToUpdate);
            fetchConfiguraciones();
            fetchTiposCobro()
            setFormValues({
                ...formValues,
                id_tipo_cobro: "",
                nombre_tipo_cobro: "",
                tipo_renta_asociado: "",
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
            const url = "/recaudo/configuracion_baisca/tipoCobro/post/";
            const response = await api.post(url, formValues);
            //  console.log('')("Configuración básica creada con éxito", response.data);
            fetchConfiguraciones()
            control_success("Guardado exitosamente");
            fetchTiposCobro()
            setFormValues({
                ...formValues,
                id_tipo_cobro: "",
                nombre_tipo_cobro: "",
                tipo_renta_asociado: "",
            });
        } catch (error: any) {
            // console.error("Error al crear la configuración básica", error);
            //  console.log('')(error.response.data.detail.detail);
            control_error(error.response.data.detail?.error);
        }
    };



    const [Renta, setRenta] = useState<renta[]>([]);
    const fetchRenta = async (): Promise<void> => {
        try {
            const url = "/recaudo/configuracion_baisca/tiporenta/get/";
            const res = await api.get(url);
            const RentaData: renta[] = res.data?.data || [];
            setRenta(RentaData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        void fetchRenta();
    }, []);


    const getNombreRentaAsociada = (idTipoRentaSeleccionado: any) => {
        const rentaSeleccionada = Renta.find(renta => renta.id_tipo_renta === idTipoRentaSeleccionado);
        return rentaSeleccionada ? rentaSeleccionada.nombre_tipo_renta : null;
    };

    // Modifica cómo renderizas el DataGrid para filtrar las configuraciones basadas en la selección
    // Asegúrate de que este fragmento se re-evalúe cada vez que `formValues` o `configuraciones` cambien. Esto puede implicar colocarlo directamente en el cuerpo del componente o usar un efecto si es necesario.
    const nombreRentaAsociada = getNombreRentaAsociada(formValues.tipo_renta_asociado);

    const configuracionesFiltradas = configuraciones.filter(configuracion => configuracion.nombre_renta_asociado === nombreRentaAsociada);

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
                <Title title="Tipos  de cobro " />
                <Grid container item xs={12} spacing={2} marginTop={2}>



                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth size="small" variant="outlined">
                            <InputLabel id="tipo-renta-asociado-label">Tipo Renta Asociado</InputLabel>
                            <Select
                                name="tipo_renta_asociado"

                                labelId="tipo-renta-asociado-label"
                                value={formValues.tipo_renta_asociado}
                                onChange={handleInputChange}
                                label="Tipo Renta Asociado"
                            >
                                {Renta.map((option) => (
                                    <MenuItem key={option.id_tipo_renta} value={option.id_tipo_renta}>
                                        {option.nombre_tipo_renta}
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
                            variant="outlined"
                            label="Tipo de cobro"
                            name="nombre_tipo_cobro"
                            onChange={handleInputChange}
                            value={formValues.nombre_tipo_cobro}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Button
                            color="success"
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={() => {
                                if (formValues.id_tipo_cobro === "") {
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
                                rows={configuracionesFiltradas}
                                getRowId={(row) => row.id_tipo_cobro}
                            />
                        </div>
                    </Grid>
                </Grid>

            </Grid>
        </>
    );
};