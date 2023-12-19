/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { api } from '../../../../api/axios';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { Title } from '../../../../components';
import { Divider, Button, Grid, TextField, } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { control_error, control_success } from '../../../../helpers';
import SaveIcon from '@mui/icons-material/Save';


interface ConfiguracionBasica {
    id_tipo_renta: any;
    nombre_tipo_renta: any;
}



// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/naming-convention
export const TipoRenta: React.FC = () => {
    const [Renta, setRenta] = useState<ConfiguracionBasica[]>([]);
    const [selectedConfiguracion, setSelectedConfiguracion] = useState<ConfiguracionBasica | null>(null);
    const fetchRenta = async (): Promise<void> => {
        try {
            const url = "/recaudo/configuracion_baisca/tiporenta/get/";
            const res = await api.get(url);
            const RentaData: ConfiguracionBasica[] = res.data?.data || [];
            setRenta(RentaData);
        } catch (error) {
            console.error(error);
        }
    };
    const handleAbrirEditar = (configuracion: ConfiguracionBasica) => {
        setSelectedConfiguracion(configuracion);
        // setIsBuscarActivo(true);
    };
    useEffect(() => {
        void fetchRenta();
    }, []);

    const handleEliminarConfiguracion = async (id_tipo_renta: number) => {
        try {
            const url = `/recaudo/configuracion_baisca/tiporenta/delete/${id_tipo_renta}/`;
            const response = await api.delete(url);
            //  console.log('')("Configuración eliminada con éxito", response.data);
            // Actualizar la lista de Renta después de eliminar
            fetchRenta();
            control_error("eliminado exitosamente ");

        } catch (error: any) {
            console.error("Error al eliminar la configuración", error);
            fetchRenta();
            // control_error(error.response.data.detail);3

            // Manejar el error
        }
    };

    const columns = [
        { field: 'id_tipo_renta', headerName: ' Numero ', width: 130, flex: 1 },
        { field: 'nombre_tipo_renta', headerName: 'Tipo renta', width: 130, flex: 1 },
        {
            field: 'Acciones',
            headerName: 'Acciones',
            width: 200,
            flex: 1,
            renderCell: (params: any) => (
                <>
                    <IconButton
                        color="error"
                        onClick={() => handleEliminarConfiguracion(params.row.id_tipo_renta)}
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
        nombre_tipo_renta: selectedConfiguracion?.nombre_tipo_renta || "",
        id_tipo_renta: selectedConfiguracion?.id_tipo_renta || "",
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
            const url = `/recaudo/configuracion_baisca/tiporenta/put/${formValues.id_tipo_renta}/`;
            const dataToUpdate = {
                nombre_tipo_renta: formValues.nombre_tipo_renta,
            };
            await api.put(url, dataToUpdate);
            fetchRenta();
            setFormValues({
                ...formValues,
                id_tipo_renta: "",
                nombre_tipo_renta: "",
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
            const url = "recaudo/configuracion_baisca/tiporenta/post/";
            const response = await api.post(url, formValues);
            //  console.log('')("Configuración básica creada con éxito", response.data);
            fetchRenta()
            control_success("Guardado exitosamente");
            setFormValues({
                ...formValues,
                id_tipo_renta: "",
                nombre_tipo_renta: "",
            });
        } catch (error: any) {
            // console.error("Error al crear la configuración básica", error);
            //  console.log('')(error.response.data.detail.detail);
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
                <Title title="Tipos  de renta " />
                <Grid container item xs={12} spacing={2} marginTop={2}>



                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            fullWidth
                            size="small"
                            variant="outlined"
                            label="Tipo de renta"
                            name="nombre_tipo_renta"
                            onChange={handleInputChange}
                            value={formValues.nombre_tipo_renta}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button
                            color="success"
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={() => {
                                if (formValues.id_tipo_renta === "") {
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
                                rows={Renta}
                                getRowId={(row) => row.id_tipo_renta}
                            />
                        </div>
                    </Grid>
                </Grid>

            </Grid>
        </>
    );
};