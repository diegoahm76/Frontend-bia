/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import { api } from '../../../api/axios';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import SaveIcon from '@mui/icons-material/Save';
import { Title } from '../../../components/Title';
import { AuthSlice } from '../../auth/interfaces';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { control_error } from '../alertas/store/thunks/alertas';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { BuscadorPersona } from '../../../components/BuscadorPersona';
import { control_success } from '../../recursoHidrico/requets/Request';
import { DialogGeneradorDeDirecciones } from '../../../components/DialogGeneradorDeDirecciones';
import { FormControl, Grid, Dialog, TextField, InputLabel, MenuItem, Select, SelectChangeEvent, Button, Box, Typography } from '@mui/material';
import { RenderDataGrid } from '../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import Paper from '@mui/material/Paper';
import { Knob } from 'primereact/knob';
import RemoveIcon from '@mui/icons-material/Remove';
import { Avatar, Chip, IconButton, Tooltip } from '@mui/material';

interface Props {
    is_modal_active: any;
    set_is_modal_active: any;
    setindicador:any;
    indicador:any;
}

interface ConfiguracionBasica {
    nombre: string;
}
interface indicador {
     nombre: any,
     id: any,

};
export const CrearIndicador: React.FC<Props> = ({setindicador, indicador, is_modal_active, set_is_modal_active }) => {


    const [formValues, setFormValues] = useState<ConfiguracionBasica>({ nombre: "" });
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };




    //crear 
    const handleSubmitCrear = async () => {
        try {
            const url = "/recaudo/configuracion_baisca/formularios_indicadores/post/";
            const response = await api.post(url, formValues);
            //  console.log('')("Configuración básica creada con éxito", response.data);
            fetchindicador()

            setFormValues({nombre: ""})

            control_success("Guardado exitosamente");
        } catch (error: any) {
            //  console.log('')(error.response.data.detail.detail);
            control_error(error.response.data.detail?.error);
        }
    };

    //get de tabla 

    // const [indicador, setindicador] = useState<indicador[]>([]);
    const fetchindicador = async (): Promise<void> => {
        try {
            const url = "/recaudo/configuracion_baisca/formularios_indicadores/";
            const res = await api.get(url);
            const indicadorData: indicador[] = res.data?.data || [];
            setindicador(indicadorData);
            // control_success("Datos encontrados");
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchindicador()
    }, []);



    const columns = [
        { field: 'nombre', headerName: 'Nombre', flex: 1 },
        {
            field: 'Acciones',
            headerName: 'Acciones',
            flex: 1,
            renderCell: (params: any) => (
                <>
                    <IconButton
                        color="error"
                        onClick={() => handleEliminarConfiguracion(params.row.id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },

    ];
    const handleEliminarConfiguracion = async (id: number) => {
        try {
            const url = `/recaudo/configuracion_baisca/formularios_indicadores/delete/${id}/`;
            const response = await api.delete(url);
            control_error("eliminado exitosamente ");
            fetchindicador()
        } catch (error: any) {
            console.error("Error al eliminar la configuración", error);

        }
    };




    const handle_close = (): void => {
        set_is_modal_active(false);
    };
    return (

        <>
            <Dialog open={is_modal_active} onClose={handle_close} maxWidth="xl"
            >
                <Grid container
                    item
                    xs={12}
                    marginLeft={2}
                    marginRight={2}
                    marginTop={3}
                    sx={{
                        position: 'relative',
                        background: '#FAFAFA',
                        borderRadius: '15px',
                        p: '20px', m: '10px 0 20px 0', mb: '20px',
                        boxShadow: '0px 3px 6px #042F4A26',
                    }}
                >
                    <Title title="Crear indicador" />

                    <Grid container item xs={12} spacing={2} marginTop={2}>


                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                fullWidth
                                size="small"
                                name="nombre"
                                label="Nombre de indicador"
                                variant="outlined"
                                onChange={handleInputChange}
                                value={formValues.nombre}
                            />
                        </Grid>


                        <Grid item  >
                            <Button
                                color="success"
                                variant="contained"
                                startIcon={<SaveIcon />}
                                onClick={() => { handleSubmitCrear(); }}
                            >
                                Guardar
                            </Button>
                        </Grid>

                        <RenderDataGrid
                            title='Listado de indicadores'
                            columns={columns ?? []}
                            rows={indicador ?? []}
                        />



                    </Grid>
                </Grid>
            </Dialog>
        </>
    );
};