/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { Divider, Button, Dialog, Grid, } from '@mui/material';
import { TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { api } from '../../../../api/axios';
import { Title } from '../../../../components';
import SaveIcon from '@mui/icons-material/Save';
import Accordion from '@mui/material/Accordion';
import { SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { control_success } from '../../requets/Request';
import { control_error } from '../../../../helpers';


interface CuencaData {
    id_macro_cuenca: number;
    nombre_macro_cuenca: string;
}

interface TipoAgua {
    id_tipo_agua_zona_hidrica: number;
    nombre_tipo_agua_zona_hidrica: string;
}
interface ZonaHidrica {
    id_zona_hidrica: number;
    nombre_zona_hidrica: string;
    id_zona_hidrografica: string;
    id_macro_cuenca: string;
}

interface ZonaHidrica2 {
    codigo_rio: string;
    id_zona_hidrica: number;
    id_sub_zona_hidrica: number;
    id_tipo_zona_hidrica: number;
    id_tipo_agua_zona_hidrica: any;
    nombre_sub_zona_hidrica: string;
  }
interface TipoRio {
    id_tipo_zona_hidrica: number;
    nombre_tipo_zona_hidrica: string;
}
interface BuscarProps {
    is_modal_active: any;
    set_is_modal_active: any;
    fetchZonasHidricas:any;
}
interface SubZonaHidricaForm {
    nombre_sub_zona_hidrica: any;
    codigo_rio: any;
    id_zona_hidrica: any;
    id_tipo_zona_hidrica: any;
    id_tipo_agua_zona_hidrica: any;
    rio:any;
}
// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/naming-convention

export const CrearRios: React.FC<BuscarProps> = ({ fetchZonasHidricas,is_modal_active, set_is_modal_active }) => {
    const [selectedCuenca, setSelectedCuenca] = useState<number | "">("");

    const initialState: SubZonaHidricaForm = {
        nombre_sub_zona_hidrica: "",
        codigo_rio: "",
        id_zona_hidrica: 0,
        id_tipo_zona_hidrica: 0,
        id_tipo_agua_zona_hidrica: 0,
        rio:"",
    };
    const [formValues, setFormValues] = useState<SubZonaHidricaForm>(initialState);
    // const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    //     const { name, value } = event.target;
    
    //     let newCodigoRio = formValues.codigo_rio;
    //     if (name === "id_zona_hidrica") {
    //         // Actualiza codigo_rio cuando cambia id_zona_hidrica
    //         newCodigoRio = `${selectedCuenca}${value}${formValues.rio}`;
    //     }
    //     setFormValues({
    //         ...formValues,
    //         [name]: value,
    //         ...(name === "id_zona_hidrica" && { codigo_rio: newCodigoRio })
    //     });
    // };
    const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
    
        let newCodigoRio = formValues.codigo_rio;
    
        if (name === "id_zona_hidrica") {
            newCodigoRio = `${selectedCuenca}${value}${formValues.rio}`;
        } else if (name === "rio") {
            newCodigoRio = `${selectedCuenca}${formValues.id_zona_hidrica}${value}`;
        }
    
        setFormValues({
            ...formValues,
            [name]: value,
            codigo_rio: newCodigoRio,
        });
    };
    const validateForm = (): boolean => {
        if (formValues.id_tipo_zona_hidrica === 0) {
            control_error("Campo obligatorio: Tipo de zona");
            return false;
        }
        if (!formValues.nombre_sub_zona_hidrica) {
            control_error("Campo obligatorio: Nombre Sub Zona Hidrica");
            return false;
        }
        if (!formValues.codigo_rio) {
            control_error("Campo obligatorio: Código Río");
            return false;
        }
        if (formValues.id_zona_hidrica === 0) {
            control_error("Campo obligatorio:Zona Hidrica");
            return false;
        }

        if (formValues.id_tipo_agua_zona_hidrica === 0) {
            control_error("Campo obligatorio:Tipo agua zona hidrica");
            return false;
        }
        return true;
    };





    const [cuencas, setCuencas] = useState<CuencaData[]>([]);
    const fetchCuencas = async (): Promise<void> => {
        try {
            const url = "/hidrico/zonas-hidricas/macro-cuencas/get/";
            const res = await api.get(url);
            const cuencasData: CuencaData[] = res.data?.data || [];
            setCuencas(cuencasData);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        void fetchCuencas();
    }, []);

    const handleChange = (event: SelectChangeEvent<number>) => {
        const newSelectedCuenca = event.target.value as number;
        setSelectedCuenca(newSelectedCuenca);
    
        // Actualiza codigo_rio cuando cambia la cuenca seleccionada
        setFormValues({
            ...formValues,
            codigo_rio: `${newSelectedCuenca}${formValues.id_zona_hidrica}`
        });
    };
    // const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const handleSubmit = async () => {
        if (!validateForm()) {
            return; // Detiene la ejecución si la validación falla
        }

        try {
            const url = "/hidrico/zonas-hidricas/sub_zona_hidrica/list-create/";
            const response = await api.post(url, formValues);
            control_success("Guardado exitosamente");
            setFormValues(initialState);
            setSelectedCuenca("");
            fetchZonasHidricas();
            set_is_modal_active(false);
        } catch (error:any) {
            // console.error(error);
            control_error(error.response.data.detail);
            // Manejar el error
        }
    };

    const [zonahidrica, setZonahidrica] = useState<ZonaHidrica[]>([]);

    const fetchZonahidricas = async (): Promise<void> => {
        try {
            const url = `/hidrico/zonas-hidricas/zona_hidrica/get/${selectedCuenca}/`;
            const res = await api.get(url);
            const zonahidricaData: ZonaHidrica[] = res.data?.data || [];
            setZonahidrica(zonahidricaData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        void fetchZonahidricas();
    }, [selectedCuenca]);



    const [zonasHidricas, setZonasHidricas] = useState<ZonaHidrica2[]>([]);
    const fetchZonasHidricas2 = async (): Promise<void> => {
      try {
        if (formValues.id_zona_hidrica !== null) {
          const url = `/hidrico/zonas-hidricas/subZonahidrica/get/${formValues.id_zona_hidrica}/`;
          const res = await api.get(url);
          const zonasHidricasData: ZonaHidrica2[] = res.data?.data || [];
          setZonasHidricas(zonasHidricasData);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
        fetchZonasHidricas2(); 
    }, [formValues.id_zona_hidrica]);






    const [selectedZonaHidrica, setSelectedZonaHidrica] = useState<number | "">("");

    const handleZonaHidricaChange = (event: SelectChangeEvent<number>) => {
        setSelectedZonaHidrica(event.target.value as number);
    };

    //tipo de rio 
    const [tipoRio, setTipoRio] = useState<TipoRio[]>([]);

    const fetchTiposRio = async (): Promise<void> => {
        try {
            const url = "/hidrico/zonas-hidricas/tipozonahidrica/get/";
            const res = await api.get(url);
            const tipoRioData: TipoRio[] = res.data?.data || [];
            setTipoRio(tipoRioData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        void fetchTiposRio();
    }, []);





    const [tipoAguas, setTipoAguas] = useState<TipoAgua[]>([]);
    const fetchTipoAguas = async (): Promise<void> => {
        try {
            const url = "/hidrico/zonas-hidricas/tipoaguazonahidrica/get/";
            const res = await api.get(url);
            const tipoAguasData: TipoAgua[] = res.data?.data || [];
            setTipoAguas(tipoAguasData);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        void fetchTipoAguas();
    }, []);
    const [selectedTipoRio, setSelectedTipoRio] = useState<number | "">("");
    const handleTipoRioChange = (event: SelectChangeEvent<number>) => {
        setSelectedTipoRio(event.target.value as number);
    };
    const handle_close = (): void => {
        set_is_modal_active(false);
    };
    return (

        <>
            <Dialog open={is_modal_active} onClose={handle_close} maxWidth="xl"
            >
                {/* <button onClick={() => //  console.log('')(tipoRio)}>Mostrar zonahidrica en la consola</button> */}

                <Grid container
                    item xs={12} marginLeft={2} marginRight={2} marginTop={3}
                    sx={{

                        width: '900px', // Cambia '700px' por el ancho que desees
                        height: '900px', // Cambia '500px' por el alto que desees
                        position: 'relative',
                        background: '#FAFAFA',
                        borderRadius: '15px',
                        p: '20px', m: '10px 0 20px 0', mb: '20px',
                        boxShadow: '0px 3px 6px #042F4A26',
                    }}
                >
                    <Title title=" Crear rios  " />
                    {/* {selectedCuenca}
                    y
                    {formValues.id_zona_hidrica} */}
                     <Grid container item xs={12} spacing={2} marginTop={2}>
                    <Grid item xs={12} sm={4}>
                            {/* Select para Zona Hidrica */}
                            <FormControl required size="small" fullWidth >
                                <InputLabel id="id_tipo_agua_zona_hidrica"> Tipo agua zona hídrica  </InputLabel>
                                <Select
                                    labelId="select-zonahidrica-label"
                                    id="id_tipo_agua_zona_hidrica"
                                    value={formValues.id_tipo_agua_zona_hidrica}
                                    label="Tipo agua zona hídrica"
                                    name="id_tipo_agua_zona_hidrica"
                                    onChange={handleInputChange}
                                >
                                    {tipoAguas.map((zona) => (
                                        <MenuItem key={zona.id_tipo_agua_zona_hidrica} value={zona.id_tipo_agua_zona_hidrica}>
                                            {zona.nombre_tipo_agua_zona_hidrica}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            {/* Select para Zona Hidrica */}
                            <FormControl required size="small" fullWidth>
                                <InputLabel id="select-zonahidrica-label">Tipo de zona </InputLabel>
                                <Select
                                    value={formValues.id_tipo_zona_hidrica}
                                    label="Zona Hidrica"
                                    onChange={handleInputChange}
                                    name="id_tipo_zona_hidrica"
                                >
                                    {tipoRio.map((rio) => (
                                        <MenuItem key={rio.id_tipo_zona_hidrica} value={rio.id_tipo_zona_hidrica}>
                                            {rio.nombre_tipo_zona_hidrica}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                
                        <Grid item xs={12} sm={4}>
                            <FormControl required size="small" fullWidth >
                                <InputLabel id="select-cuenca-label">Cuenca</InputLabel>
                                <Select
                                    labelId="select-cuenca-label"
                                    id="select-cuenca"
                                    value={selectedCuenca}
                                    label="Cuenca"

                                    onChange={handleChange}
                                >
                                    {cuencas.map((cuenca) => (
                                        <MenuItem key={cuenca.id_macro_cuenca} value={cuenca.id_macro_cuenca}>
                                            {cuenca.nombre_macro_cuenca}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    
                        


                    

                        <Grid item xs={12} sm={4}>
                            {/* Select para Zona Hidrica */}
                            <FormControl required size="small" fullWidth >
                                <InputLabel id="select-zonahidrica-label">Zona Hídrica</InputLabel>
                                <Select
                                    labelId="select-zonahidrica-label"
                                    id="id_zona_hidrica"
                                    value={formValues.id_zona_hidrica}
                                    label="Zona Hidrica"
                                    name="id_zona_hidrica"
                                    onChange={handleInputChange}
                                >
                                    {zonahidrica.map((zona) => (
                                        <MenuItem key={zona.id_zona_hidrica} value={zona.id_zona_hidrica}>
                                            {zona.nombre_zona_hidrica}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            {/* Select para Zona Hidrica */}
                            <FormControl required size="small" fullWidth >
                                <InputLabel id="select-zonahidrica-label">rios</InputLabel>
                                <Select
                                    labelId="select-zonahidrica-label"
                                    id="id_zona_hidrica"
                                    value={formValues.rio}
                                    label="rio"
                                    name="rio"
                                    onChange={handleInputChange}
                                >
                                    {zonasHidricas.map((zona) => (
                                        <MenuItem key={zona.id_zona_hidrica} value={zona.id_sub_zona_hidrica}>
                                            {zona.nombre_sub_zona_hidrica}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        
                        

                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                size="small"
                                label="Nombre subzona hídrica"
                                fullWidth
                                required
                                InputLabelProps={{ shrink: true }}
                                name="nombre_sub_zona_hidrica"
                                value={formValues.nombre_sub_zona_hidrica}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                // variant="outlined"
                                size="small"
                                label="Código río"
                                fullWidth
                                required
                                InputLabelProps={{ shrink: true }}
                                name="codigo_rio"
                                value={formValues.codigo_rio}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button
                                color='success'
                                variant='contained'
                                startIcon={<SaveIcon />}
                                onClick={handleSubmit}
                            >
                                Guardar
                            </Button>

                        </Grid>
                    </Grid>
                </Grid>




            </Dialog>
        </>
    );
};