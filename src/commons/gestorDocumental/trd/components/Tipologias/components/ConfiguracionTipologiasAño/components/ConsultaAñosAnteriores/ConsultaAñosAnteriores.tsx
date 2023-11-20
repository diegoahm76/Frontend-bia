/* eslint-disable @typescript-eslint/naming-convention */

import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material"
import { Title } from "../../../../../../../../../components/Title"
import { useEffect, useState } from "react"
import { api } from "../../../../../../../../../api/axios";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import CleanIcon from '@mui/icons-material/CleaningServices';
import RemoveIcon from '@mui/icons-material/Remove';
import { Knob } from "primereact/knob";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from "@mui/x-data-grid";
import { v4 as uuidv4 } from 'uuid';

interface ConfiguracionAnoTipologia {
    id_config_tipologia_doc_agno: number;
    consecutivo_inicial: number;
    cantidad_digitos: number;
    Persona_ult_config_implemen: string;
    T247fechaUltConfigImplemen: string;
    consecutivo_final: string;
    fecha_consecutivo_final: string;
}



export const ConsultaAñosAnteriores = () => {

    const year = new Date().getFullYear();
    const navigate = useNavigate();
    const [tipologia_documental, set_tipologia_documental] = useState<any>([]);
    const [id_seleccionado, set_id_seleccionado] = useState<any>();
    const [value_año, set_Value_año] = useState(year);

    const fetch_data_desplegable_no = async (): Promise<void> => {
        try {
            const url = `/gestor/plantillas/tipos_tipologia/get/`;
            const res: any = await api.get(url);
            const numero_consulta: any = res.data.data;
            set_tipologia_documental(numero_consulta);
            // console.log(numero_consulta);

        } catch (error) {
            console.error(error);
        }
    };

    // Inicialización de las variables
    const defaultConfiguracionAnoTipologia: ConfiguracionAnoTipologia = {
        id_config_tipologia_doc_agno: 0,  // O el valor por defecto que desees
        consecutivo_inicial: 0,
        cantidad_digitos: 0,
        Persona_ult_config_implemen: "",
        T247fechaUltConfigImplemen: "",
        consecutivo_final: "",
        fecha_consecutivo_final: "",
    };


    const [consulta_año_configuracion, set_consulta_año_configuracion] = useState<ConfiguracionAnoTipologia[]>([defaultConfiguracionAnoTipologia]);
    const busqueda_avanzadaAño_configuracion = async (): Promise<void> => {
        try {
            let url = "/gestor/trd/configuracion-tipologia/consulta-años-anteriores/?";

            if (value_año) {
                url += `agno_tipologia=${value_año}`;
            }

            if (id_seleccionado) {
                url += `${year ? '&' : ''}id_tipologia_doc=${id_seleccionado}`;
            }


            const res: any = await api.get(url);
            const numero_consulta: any = res.data.data;
            set_consulta_año_configuracion(numero_consulta)

        } catch (error) {
            console.error(error);
        }
    };

    // const columna_numero_2 = [
    //     { attribute: "Tipo Configuración ", value: consulta_año_configuracion[0].id_config_tipologia_doc_agno || "" },
    // ];
    const formatDate = (dateString: string | null): string => {
        return dateString ? new Date(dateString).toISOString().split('T')[0] : "";
    };

    const columna_numero_1 = [
        { attribute: "Tipo Configuración", value: consulta_año_configuracion[0]?.id_config_tipologia_doc_agno || "" },
        { attribute: "Consecutivo Inicial", value: consulta_año_configuracion[0]?.consecutivo_inicial?.toString() || "" },
        { attribute: "Cantidad Digitos", value: consulta_año_configuracion[0]?.cantidad_digitos?.toString() || "" },
        { attribute: "Persona Ultima Configuración", value: consulta_año_configuracion[0]?.Persona_ult_config_implemen || "" },
        { attribute: "Fecha Ultima Configuración", value: formatDate(consulta_año_configuracion[0]?.T247fechaUltConfigImplemen) },
        { attribute: "Consecutivo Final", value: consulta_año_configuracion[0]?.consecutivo_final || "" },
        { attribute: "Fecha Consecutivo Final", value: formatDate(consulta_año_configuracion[0]?.fecha_consecutivo_final) },
    ];


    const limpiar_formulario_busqueda = () => {
        set_Value_año(year),
            set_id_seleccionado([])

    }


    const incrementValue = () => {
        if (value_año < year) {
            set_Value_año(value_año + 1);
        }
    };

    const decrementValue = () => {
        if (value_año > 1000) {
            set_Value_año(value_año - 1);
        }
    };

    useEffect(() => {
        fetch_data_desplegable_no().catch((error) => {
            console.error(error);
        });
    }, []);

    return (

        <>
            <Grid
                container
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >
                <Grid item xs={12}>
                    <Title title="Consultar Años Anterires" />
                </Grid>

                <Grid container style={{ marginTop: 10 }} alignItems="center" justifyContent="center">
                    <Grid item xs={1.7} >
                        <Button onClick={decrementValue}
                            startIcon={<RemoveIcon />}
                            style={{ width: "100%" }}
                            variant="contained"
                            color="error"
                            disabled={value_año === 1000}>menos</Button>
                    </Grid>

                    <Grid item style={{ margin: 8 }} >
                        <Knob
                            value={value_año}
                            size={100}
                            min={year - 100}
                            max={year}
                            step={1}
                            readOnly={true}
                        />
                    </Grid>


                    <Grid item xs={2} >
                        <Button startIcon={<AddIcon />}
                            variant="contained"
                            style={{ width: "80%" }}
                            fullWidth
                            color="success"
                            onClick={incrementValue}
                            disabled={value_año === 3000} >mas</Button>
                    </Grid>
                </Grid>



                <Grid container alignItems="center" justifyContent="center">



                    <Grid item xs={8} >
                        <FormControl fullWidth>
                            <InputLabel id="choise-label">Selecciona tipología documental</InputLabel>
                            <Select
                                id="demo-simple-select-2"
                                // name="id_tipologia_documental"
                                style={{ width: "95%" }}
                                label="Selecciona tipología documentall"
                                value={id_seleccionado || ""}
                                onChange={(e) => set_id_seleccionado(e.target.value)}
                            >
                                {tipologia_documental?.map((item: any, index: number) => (
                                    <MenuItem key={index} value={item.id_tipologia_documental}>
                                        {item.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid item xs={8} container justifyContent="center">
                        <Button
                            startIcon={<AddIcon />}
                            variant="contained"
                            style={{ width: "20%",marginTop:15 }}
                            onClick={busqueda_avanzadaAño_configuracion}
                        >
                            Buscar
                        </Button>
                    </Grid>







                    <Grid item xs={10} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                        {consulta_año_configuracion?.length !== 0 ? (
                            <DataGrid
                                density="compact"
                                style={{ marginTop: 15, width: "100%" }}
                                autoHeight
                                rows={columna_numero_1 || ""}
                                columns={[
                                    { field: "attribute", headerName: "Atributo", flex: 1, align: "center", headerAlign: "center" },
                                    { field: "value", headerName: "Valor", flex: 1, align: "center", headerAlign: "center" },
                                ]}

                                getRowId={(row) => uuidv4()} />) :
                            (<h3>No hay datos para mostrar</h3>)}

                    </Grid>
                </Grid>
            </Grid>



            <Grid
                container

                justifyContent="flex-end"
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >


                <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                    <Button color='primary' onClick={limpiar_formulario_busqueda} style={{ width: "90%", marginTop: 15 }} variant="outlined" fullWidth startIcon={<CleanIcon />}>
                        Limpiar
                    </Button>
                </Grid>

                <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                    <Button
                        startIcon={<ClearIcon />}
                        fullWidth
                        style={{ width: "90%", marginTop: 15 }}
                        variant="contained"
                        color="error"
                        onClick={() => {
                            navigate('/app/home');
                        }}
                    >
                        Salir
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
