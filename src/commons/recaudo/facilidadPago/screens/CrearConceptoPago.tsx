/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { Button, Dialog, Grid, } from '@mui/material';
import { api } from '../../../../api/axios';
import { Title } from '../../../../components';
import SaveIcon from '@mui/icons-material/Save';
import React, { useEffect, useState } from 'react';
import { MenuItem } from '@mui/material';
import { control_error, control_success } from '../../../../helpers';
import TextField from '@mui/material/TextField';

interface BuscarProps {
    is_modal_active: any;
    set_is_modal_active: any;
    fetchConfiguraciones: any;
}

interface TipoCobro {
    id_tipo_cobro: number;
    nombre_tipo_cobro: string;
    tipo_renta_asociado: any;
}


interface TipoRenta {
    id_tipo_renta: number;
    nombre_tipo_renta: string;
    tipo_cobro_asociado: any;
    tipo_renta_asociado: any
}
export interface Variable {
    id_variables: number;
    nombre: string;
    tipo_cobro: number;
    tipo_renta: number;
}
interface ConfiguracionBasica {
    fecha_fin: any;
    valor: any;
    variables: any;
    descripccion: any;
    fecha_inicio: any
}

interface ConfiguracionBasicados {
    id_variables: any;
    nombre: any;
    tipo_cobro: any;
    tipo_renta: any;

}

export const CrearConceptoPago: React.FC<BuscarProps> = ({ fetchConfiguraciones, is_modal_active, set_is_modal_active }) => {

    const [selectedConfiguracion, setSelectedConfiguracion] = useState<ConfiguracionBasica | null>(null);
    const [tiposCobro, setTiposCobro] = useState<TipoCobro[]>([]);
    const [PreformValues, PresetFormValues] = useState<ConfiguracionBasicados>({
        id_variables: "",
        nombre: "",
        tipo_cobro: "",
        tipo_renta: ""
    });
    const [activador, set_activador] = useState<boolean>(false);
    const [tiposRenta, setTiposRenta] = useState<TipoRenta[]>([]);


    const [formValues, setFormValues] = useState<ConfiguracionBasica>({
        valor: selectedConfiguracion?.valor || "",
        fecha_fin: selectedConfiguracion?.fecha_fin || "",
        fecha_inicio: selectedConfiguracion?.fecha_inicio || "",
        variables: selectedConfiguracion?.variables || "",
        descripccion: selectedConfiguracion?.descripccion || "",
    });


    const handleInputChange = (event:any) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };
    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = event.target;
    //     setFormValues({ ...formValues, [name]: value.replace(/[^\d]/g, '') });
    //   };
    

    const handleSubmitCrear = async () => {
        try {
            const url = "/recaudo/configuracion_baisca/valoresvariables/post/";
            const response = await api.post(url, formValues);
            //  console.log('')("Configuración básica creada con éxito", response.data);
            fetchConfiguraciones()
            control_success("Guardado exitosamente");

        } catch (error: any) {

            control_error(error.response.data.detail?.error);
        }
    };



    const CrearVariablePrecargada = async () => {
        try {
            const url = "/recaudo/configuracion_baisca/variables/post/";
            const response = await api.post(url, PreformValues);
            const id_enviar = response.data.data.id_variables; // Asegúrate de acceder a la propiedad correcta
            // setCreatedVariableId(id_enviar);  // Guardar el ID en el estado
               setFormValues((prevValues) => ({
            ...prevValues,
            variables: id_enviar
        }));
            console.log(id_enviar);
            control_success("Guardado exitosamente");
        } catch (error: any) {
            control_error(error.response.data.detail?.error);
        } finally {
            set_activador(!activador)
        }
    };
    

    const fetchTiposRenta = async () => {
        try {
            const res = await api.get("/recaudo/configuracion_baisca/tiporenta/get/");
            setTiposRenta(res.data.data);
        } catch (error) {
            console.error("Error al obtener los tipos de renta", error);
        }
    };


    const fetchTiposCobro = async () => {
        try {
            const res = await api.get("/recaudo/configuracion_baisca/tipoCobro/get/");
            setTiposCobro(res.data.data);
        } catch (error) {
            console.error("Error al obtener los tipos de cobro", error);
        }
    };

 
    const PrehandleInputChange = (event: any ) => {
        const { name, value } = event.target;
        PresetFormValues({ ...PreformValues, [name]: value });
    };


    const handle_close = (): void => {
        set_is_modal_active(false);
    };


    useEffect(() => {
        fetchTiposCobro();
    }, []);

    useEffect(() => {
        if (activador) {
            handleSubmitCrear();
            set_activador(false);
        }
    }, [activador]);

    useEffect(() => {
        if (selectedConfiguracion) {
            setFormValues(selectedConfiguracion);
        }
    }, [selectedConfiguracion]);

    useEffect(() => {
        void fetchConfiguraciones();
    }, []);


    useEffect(() => {
        fetchTiposRenta();
    }, []);


    const formatCurrency = (value: string) => {
        if (!value) return '';
        return new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0,
        }).format(Number(value));
      };
    return (

        <>
            <Dialog open={is_modal_active} onClose={handle_close} maxWidth="xl" >
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
                    <Title title="Crear" />
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
                                onChange={PrehandleInputChange}
                                value={PreformValues.tipo_renta}
                            >
                                {tiposRenta.map((tipo) => (
                                    <MenuItem key={tipo.id_tipo_renta} value={tipo.id_tipo_renta}>
                                        {tipo.nombre_tipo_renta}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>


                        <Grid item xs={12} sm={4}>
                            <TextField
                                select
                                required
                                fullWidth
                                size="small"
                                variant="outlined"
                                label="Tipo cobro"
                                name="tipo_cobro"
                                onChange={PrehandleInputChange}
                                value={PreformValues.tipo_cobro}
                            >
                                {tiposCobro
                                    .filter(tipoCobro => tipoCobro.tipo_renta_asociado === PreformValues.tipo_renta) // Filtrado basado en la selección de tipo_renta
                                    .map((tipoCobro) => (
                                        <MenuItem key={tipoCobro.id_tipo_cobro} value={tipoCobro.id_tipo_cobro}>
                                            {tipoCobro.nombre_tipo_cobro}
                                        </MenuItem>
                                    ))}
                            </TextField>
                        </Grid>



                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                fullWidth
                                size="small"
                                variant="outlined"
                                label="Variable"
                                name="nombre"
                                onChange={PrehandleInputChange}
                                value={PreformValues.nombre}
                            />
                        </Grid>


                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                fullWidth
                                size="small"
                                name="valor"
                                label="valor"
                                variant="outlined"
                                onChange={handleInputChange}
                                value={formatCurrency(formValues.valor)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                fullWidth
                                size="small"
                                variant="outlined"
                                name="descripccion"
                                label="descripccion"
                                onChange={handleInputChange}
                                value={formValues.descripccion}
                            />
                        </Grid>
                        
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                type="date"
                                size="small"
                                variant="outlined"
                                name="fecha_inicio"
                                label="fecha inicio"
                                onChange={handleInputChange}
                                value={formValues.fecha_inicio}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>


                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                type="date"
                                size="small"
                                name="fecha_fin"
                                variant="outlined"
                                label="fecha fin"
                                value={formValues.fecha_fin}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid
                            item
                            xs={7}
                            container
                            direction="row"
                            alignItems="center"
                            justifyContent="flex-end"
                        >
                            <Grid item  >
                                <Button
                                    color="success"
                                    variant="contained"
                                    startIcon={<SaveIcon />}
                                    onClick={() => { CrearVariablePrecargada(); }}
                                >
                                    Guardar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    );
};