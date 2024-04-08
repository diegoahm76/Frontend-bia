/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import Grid from '@mui/material/Grid';
import { Dialog, } from '@mui/material';
import { api } from '../../../../api/axios';
import { Title } from '../../../../components';
import EditIcon from '@mui/icons-material/Edit';
import { Divider, Button, } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { control_error } from '../../../../helpers';
import { control_success } from '../../requets/Request';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const customStyles = {
    position: 'relative',
    background: '#FAFAFA',
    borderRadius: '15px',
    p: '20px',
    m: '10px 0 20px 0',
    mb: '20px',
    boxShadow: '0px 3px 6px #042F4A26',
};
interface pros {
    fetchZonasHidricas: any;
    selectedMacroCuenca: any;
    selectedSubZonaHidrica: any;
    isActualizarModalActivo: any;
    selectedSubZonaHidricaId: any;
    setIsActualizarModalActivo: any;
}

interface CuencaData {
    id_macro_cuenca: number;
    nombre_macro_cuenca: string;
}

interface TipoAgua {
    id_tipo_agua_zona_hidrica: number;
    nombre_tipo_agua_zona_hidrica: string;
}
interface ZonaHidrica {
    id_macro_cuenca: string;
    id_zona_hidrica: number;
    nombre_zona_hidrica: string;
    id_zona_hidrografica: string;
}
interface TipoRio {
    id_tipo_zona_hidrica: number;
    nombre_tipo_zona_hidrica: string;
}

interface SubZonaHidricaForm {
    codigo_rio: string;
    id_zona_hidrica: number;
    id_tipo_zona_hidrica: number;
    nombre_sub_zona_hidrica: string;
    id_tipo_agua_zona_hidrica: number;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/naming-convention
export const CuencaActualizar: React.FC<pros> = ({ fetchZonasHidricas, selectedMacroCuenca, selectedSubZonaHidrica, selectedSubZonaHidricaId, isActualizarModalActivo, setIsActualizarModalActivo }) => {
    const [selectedCuenca, setSelectedCuenca] = useState<number | "">("");

    const initialState: SubZonaHidricaForm = {
        codigo_rio: "",
        id_zona_hidrica: 0,
        id_tipo_zona_hidrica: 0,
        nombre_sub_zona_hidrica: "",
        id_tipo_agua_zona_hidrica: 0,
    };
    const [formValues, setFormValues] = useState<SubZonaHidricaForm>(initialState);
    useEffect(() => {
        if (selectedSubZonaHidrica) {
            setSelectedCuenca(selectedMacroCuenca)
            setFormValues({
                codigo_rio: selectedSubZonaHidrica.codigo_rio,
                id_zona_hidrica: selectedSubZonaHidrica.id_zona_hidrica,
                id_tipo_zona_hidrica: selectedSubZonaHidrica.id_tipo_zona_hidrica,
                nombre_sub_zona_hidrica: selectedSubZonaHidrica.nombre_sub_zona_hidrica,
                id_tipo_agua_zona_hidrica: selectedSubZonaHidrica.id_tipo_agua_zona_hidrica,
            });
        }
    }, [selectedSubZonaHidrica]);
    const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
    
        let newCodigoRio = formValues.codigo_rio;
        if (name === "id_zona_hidrica") {
            // Actualiza codigo_rio cuando cambia id_zona_hidrica
            newCodigoRio = `${selectedCuenca}${value}`;
        }
        setFormValues({
            ...formValues,
            [name]: value,
            ...(name === "id_zona_hidrica" && { codigo_rio: newCodigoRio })
        });
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

    const handle_close = (): void => {
        setIsActualizarModalActivo(false);
    };
    const handleActualizarSubZonaHidrica = async () => {
        try {
            const url = `/hidrico/zonas-hidricas/sub_zona_hidrica/update/${selectedSubZonaHidricaId}/`;
            const payload = { ...formValues }; // Asegúrate de que formValues contenga los datos que deseas enviar
            const response = await api.put(url, payload);
            //  console.log('')("Sub-zona hídrica actualizada con éxito", response.data);
            control_success("Actulizado ecitozamente");
            fetchZonasHidricas()
            setIsActualizarModalActivo(false);
        } catch (error: any) {
            control_error(error.response.data.detail);
        }
    };


    return (

        <>



            <Dialog open={isActualizarModalActivo} onClose={handle_close} maxWidth="xl">

                <Grid container spacing={2} m={2} p={2} item sx={customStyles}>
                    <Grid item xs={12}>
                        <Title title=" Actualizar  " />
                    </Grid>
                 
                    <Grid container item xs={12} spacing={2} marginTop={2}>

                    <Grid item xs={12} sm={4}>
                            {/* Select para Zona Hidrica */}
                            <FormControl required size="small" fullWidth >
                                <InputLabel id="id_tipo_agua_zona_hidrica"> Tipo agua zona hídrica  </InputLabel>
                                <Select
                                    labelId="select-zonahidrica-label"
                                    id="id_tipo_agua_zona_hidrica"
                                    value={formValues.id_tipo_agua_zona_hidrica}
                                    label="  id_tipo_agua_zona_hidrica"
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
                                <InputLabel id="select-zonahidrica-label">Zona hídrica</InputLabel>
                                <Select
                                    labelId="select-zonahidrica-label"
                                    id="id_zona_hidrica"
                                    value={formValues.id_zona_hidrica}
                                    label="Zona hídrica"
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
                            <TextField
                                required
                                fullWidth
                                size="small"
                                variant="outlined"
                                onChange={handleInputChange}
                                name="nombre_sub_zona_hidrica"
                                label="Nombre subzona hídrica"
                                InputLabelProps={{ shrink: true }}
                                value={formValues.nombre_sub_zona_hidrica}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
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
                        startIcon={<EditIcon />}
                        variant='contained'
                        onClick={handleActualizarSubZonaHidrica}
                    >
                        Actualizar
                    </Button>


                        </Grid>
                    </Grid>

                    {/* <Grid item xs={12}>
                        <h1>ID Sub Zona Hídrica: {selectedSubZonaHidricaId}</h1>
                        {selectedSubZonaHidrica && (
                            <>
                                <h1>Nombre: {selectedSubZonaHidrica.nombre_sub_zona_hidrica}</h1>
                                <h1>Código del Río: {selectedSubZonaHidrica.codigo_rio}</h1>
                                <h1>ID Zona Hídrica: {selectedSubZonaHidrica.id_zona_hidrica}</h1>
                                <h1>ID Tipo Zona Hídrica: {selectedSubZonaHidrica.id_tipo_zona_hidrica}</h1>
                                <h1>ID Tipo Agua Zona Hídrica: {selectedSubZonaHidrica.id_tipo_agua_zona_hidrica}</h1>
                            </>
                        )}
                    </Grid> */}
                </Grid>

            </Dialog>









        </>
    );
};