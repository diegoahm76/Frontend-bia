/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { api } from '../../../../api/axios';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import AddIcon from "@mui/icons-material/Add";
import { Title } from '../../../../components';
import { Divider, Button, Grid, Dialog, TextField, FormControl, InputLabel, MenuItem, Select, } from '@mui/material';
import { CrearConceptoPago } from './CrearConceptoPago';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { control_error, control_success } from '../../../../helpers';
import { ConceptoEditar } from './ConceptoEditar';
import { TiposCobro } from './TiposCobro';
import { TipoRenta } from './TipoRenta';
import { Varible } from './Varible';
import { miEstilo } from '../../../gestorDocumental/Encuesta/interfaces/types';
import SaveIcon from '@mui/icons-material/Save';
import RemoveIcon from '@mui/icons-material/Remove';
import { Knob } from 'primereact/knob';

interface Propstorta {
    value: any,
    is_tasa: any,
    knobValue: any,
    handle_close: any,
    handleDecrement: any,
    handleIncrement: any,
    handle_open_tasa: any,
};

interface ConfiguracionInteres {
    id: number;
    año: number;
    mes: number;
    valor_interes: string;
    estado_editable: boolean;
}
interface FormData {
    año: any,
    mes: any,
    valor_interes: any,

}
export const Tasa: React.FC<Propstorta> = ({ is_tasa, handle_close, handleDecrement, value, knobValue, handleIncrement, handle_open_tasa }) => {
    const [empresa_3, setempresa_3] = useState("");

    const initialFormData: FormData = {
        año: "",
        mes: "",
        valor_interes: "",
    };
    const [formData, setFormData] = useState(initialFormData);
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmitCrear = async () => {
        try {
            const url = "/recaudo/configuracion_baisca/configuracioninterres/post/";
            const response = await api.post(url, formData);
            control_success("Guardado exitosamente");
            handle_close();
        } catch (error: any) {
            control_error(error.response.data.detail?.error);
        }
    };

    const handleSave = () => {
        // Actualizar el valor de "año" para que sea igual a `value`

        handleSubmitCrear()
        fetchConfiguracionInteres()
        setMostrarHola(false)
    };

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            año: value,
            mes: empresa_3, // Aquí actualizas "año" con el valor de la prop `value`
        }));
    }, [value, empresa_3]);

    const Meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const handleChangeSiNo3 = (event: any) => {
        setempresa_3(event.target.value);
    };

    const [mostrarHola, setMostrarHola] = useState(false);




    
const [configuracionInteres, setConfiguracionInteres] = useState<ConfiguracionInteres[]>([]);
const fetchConfiguracionInteres = async (): Promise<void> => {
    try {
        const url = `/recaudo/configuracion_baisca/configuracioninterres/get/${value}/`;
        const res = await api.get(url);
        const configuracionInteresData: ConfiguracionInteres[] = res.data?.data || [];
        setConfiguracionInteres(configuracionInteresData);
    } catch (error: any) {
        control_error(error.response.data.detail);
    }
};

useEffect(() => {
    void fetchConfiguracionInteres(); // Puedes ajustar el año según sea necesario
}, [value]);


useEffect(() => {
    void fetchConfiguracionInteres(); // Puedes ajustar el año según sea necesario
}, []);

const enero = configuracionInteres.find(config => config.mes === 1);
const febrero = configuracionInteres.find(config => config.mes === 2);
const marzo = configuracionInteres.find(config => config.mes === 3);
const abril = configuracionInteres.find(config => config.mes === 4);
const mayo = configuracionInteres.find(config => config.mes === 5);
const junio = configuracionInteres.find(config => config.mes === 6);
const julio = configuracionInteres.find(config => config.mes === 7);
const agosto = configuracionInteres.find(config => config.mes === 8);
const septiembre = configuracionInteres.find(config => config.mes === 9);
const octubre = configuracionInteres.find(config => config.mes === 10);
const noviembre = configuracionInteres.find(config => config.mes === 11);
const diciembre = configuracionInteres.find(config => config.mes === 12);

    return (
        <>
            <Dialog open={is_tasa} onClose={handle_close} maxWidth="sm" >
                <Grid container xs={12} spacing={2}    >
                    <Grid container
                        spacing={2} m={2} p={2}
                        sx={miEstilo}
                    >


{/* {value} */}
                        <Grid item xs={12}>
                            <Title title="configuracion de interes " />
                        </Grid> 
                        <Grid container
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                            alignItems="center" item xs={12} sm={12} >
                            <Grid item >
                                <Button
                                    startIcon={<RemoveIcon />}
                                    color="error"
                                    variant="contained"
                                    onClick={handleDecrement}
                                    disabled={value === 2023}
                                >
                                    Menos
                                </Button>
                            </Grid>
                            <Grid item >
                                <Knob value={knobValue} />
                            </Grid>
                            <Grid item  >
                                <Button
                                    startIcon={<AddIcon />}
                                    color="success"
                                    variant="contained"
                                    onClick={handleIncrement}
                                    disabled={value === 2040}
                                >
                                    Más
                                </Button>
                            </Grid>
                        </Grid>






                        {!mostrarHola ? (<>


                            <Grid container
                                direction="row"
                                justifyContent="center"
                                alignItems="center" item xs={12} sm={12} >
                                <Grid item xs={3} sm={2} marginTop={2} >
                                    <Button
                                        color='success'
                                        variant='contained'
                                        onClick={() => setMostrarHola(true)}
                                    >
                                        Añadir
                                    </Button>
                                </Grid>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="Enero"
                                    name="Enero"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={enero ? enero.valor_interes:""} 
                                    required
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Febrero"
                                    name="Febrero"
                                    value={febrero ? febrero.valor_interes:""} 

                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    required
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Marzo"
                                    name="Marzo"
                                    value={marzo ? marzo.valor_interes:""} 

                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    required
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Abril"
                                    name="Abril"
                                    value={abril ? abril.valor_interes:""} 

                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    required
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Mayo"
                                    name="Mayo"
                                    value={mayo ? mayo.valor_interes:""} 

                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    required
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Junio"
                                    name="Junio"
                                    value={junio ? junio.valor_interes:""} 

                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    required
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Julio"
                                    name="Julio"
                                    value={julio ? julio.valor_interes:""} 

                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    required
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Agosto"
                                    name="Agosto"
                                    value={agosto ? agosto.valor_interes:""} 

                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    required
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Septiembre"
                                    name="Septiembre"
                                    variant="outlined"
                                    value={septiembre ? septiembre.valor_interes:""} 

                                    size="small"
                                    fullWidth
                                    required
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Octubre"
                                    name="Octubre"
                                    value={octubre ? octubre.valor_interes:""} 

                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    required
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Noviembre"
                                    name="Noviembre"
                                    value={noviembre ? noviembre.valor_interes:""} 

                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    required
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Diciembre"
                                    name="Diciembre"
                                    value={diciembre ? diciembre.valor_interes:""} 

                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    required
                                    disabled
                                />
                            </Grid>


                        </>

                        ) : (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="si-no-select-label">Mes</InputLabel>
                                        <Select
                                            labelId="Mes"
                                            value={empresa_3}
                                            label="Mes"
                                            onChange={handleChangeSiNo3}
                                        >
                                            {Meses.map((mes, index) => (
                                                <MenuItem key={index} value={index + 1}>{mes}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                             
                                <Grid item xs={6}>
                                    <TextField
                                        label={`valor interes`}
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        required
                                        name="valor_interes"
                                        value={formData.valor_interes}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid container
                                    direction="row"
                                    spacing={2}
                                    justifyContent="center"
                                    alignItems="center" item xs={12} sm={12} >
                                    <Grid item marginTop={2} >
                                        <Button
                                            color='success'
                                            variant='contained'
                                            startIcon={<SaveIcon />} onClick={handleSave}    >
                                            guardar
                                        </Button>
                                    </Grid>
                                    <Grid item marginTop={2} >

                                        <Button
                                            color='error'
                                            variant='contained'
                                            onClick={() => setMostrarHola(false)}
                                        >
                                            Cerrar
                                        </Button>
                                    </Grid>


                                </Grid>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Dialog>
        </>
    );
};







