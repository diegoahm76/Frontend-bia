

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// eslint-disable-next-line @typescript-eslint/naming-convention
// eslint-disable-next-line @typescript-eslint/no-var-requires
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unused-vars */
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
import { FormControl, Grid, TextField, InputLabel, MenuItem, Select, SelectChangeEvent, Button, Box, Typography } from '@mui/material';
import { RenderDataGrid } from '../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import Paper from '@mui/material/Paper';
import { Knob } from 'primereact/knob';
import RemoveIcon from '@mui/icons-material/Remove';
import { Avatar, Chip, IconButton, Tooltip } from '@mui/material';


interface IndicadorValor {
    mes_id: any;
    valor: any;
    variable_1: any;
    variable_2: any;
}
interface Historico {
    proceso: string;
    nombre_indicador: string;
    frecuencia_medicion: string;
    formula_indicador: string;
    vigencia_reporta: any;
    dependencia_grupo_regional: any;
    objetivo_indicador: string;
    unidad_medicion_reporte: string;
    descripcion_variable_1: string;
    descripcion_variable_2: string;
    origen_datos: string;
    responsable_creacion: string;
    tipo_indicador: string;
    formulario: string;
    id_indicador: any;
    indicadorvalor_set: IndicadorValor[];
}


interface Serie {
    name: any;
    data: any[];
};


interface Options {
    chart: { type: any; height: any; };
    xaxis: { type: any; categories: any[]; };
    title: { text: any; };
    yaxis: { title: { text: any; }; };
};
interface FormData {
    proceso: string;
    nombre_indicador: string;
    frecuencia_medicion: string;
    formula_indicador: string;
    vigencia_reporta: any;
    dependencia_grupo_regional: any;
    objetivo_indicador: string;
    unidad_medicion_reporte: string;
    descripcion_variable_1: string;
    descripcion_variable_2: string;
    origen_datos: string;
    responsable_creacion: string;
    tipo_indicador: string;
    formulario: string;

    indicadorvalor_set: IndicadorValor[];
}
export const Indicadores: React.FC = () => {


    const initialFormData: FormData = {
        proceso: "",
        nombre_indicador: "",
        frecuencia_medicion: "",
        formula_indicador: "",
        vigencia_reporta: "",
        dependencia_grupo_regional: "",
        objetivo_indicador: "",
        unidad_medicion_reporte: "",
        descripcion_variable_1: "",
        descripcion_variable_2: "",
        origen_datos: "",
        responsable_creacion: "",
        tipo_indicador: "",
        formulario: "",
        indicadorvalor_set: []
    };


    const [formData, setFormData] = useState(initialFormData);
    // const handleInputChange = (event: any) => {
    //     const { name, value } = event.target;
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         [name]: value,
    //     }));
    // };

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Si el cambio es en la frecuencia de medición, resetea la selección de mes
        if (name === 'frecuencia_medicion') {
            setSelectedMonth('');
            setMesId(0); // Reset también el ID del mes
            // Aquí podrías también ajustar el filtro de meses si necesario
        }
    };
    const [knobValue, setKnobValue] = useState<number>(2023);

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            vigencia_reporta: knobValue,
        }))
        fetchHistorico()
    }, [knobValue]);

    //crear 
    const handleSubmitCrear = async () => {
        try {
            setFormData((prevData) => ({
                ...prevData,
                vigencia_reporta: knobValue,
            }))
            const url = "recaudo/configuracion_baisca/indicadores/post/";
            const response = await api.post(url, formData)
            fetchHistorico()
            control_success("Guardado exitosamente")

        } catch (error: any) {
            control_error(error.response.data.detail?.error);
        }
    };



    //editar 
    const handleSubmiteditar = async () => {
        try {
            setFormData((prevData) => ({
                ...prevData,
                vigencia_reporta: knobValue,
            }))
            const url = `recaudo/configuracion_baisca/indicadores/put/${tipo_id}/`;
            const response = await api.put(url, formData)
            fetchHistorico()
            control_success("Editado exitosamente")

        } catch (error: any) {
            control_error(error.response.data.detail?.error);
        }
    };


    const [Historico, setHistorico] = useState<Historico[]>([]);


    const fetchHistorico = async (): Promise<void> => {
        try {
            setFormData((prevData) => ({
                ...prevData,
                vigencia_reporta: knobValue,
            }))
            const url = `/recaudo/configuracion_baisca/indicadores/${formData.vigencia_reporta}/${formData.formulario}/`;

            // 2024/1/
            const res = await api.get(url);
            const HistoricoData: Historico[] = res.data?.data || [];
            setHistorico(HistoricoData);
            control_success("Datos encontrados")

        } catch (error: any) {
            // console.error(error);
            // control_error(error.response.data.detail);
        }
    };

    useEffect(() => {
        void fetchHistorico();
    }, []);
    useEffect(() => {
        void fetchHistorico();
    }, [formData.formulario]);

  
    useEffect(() => {
        updateget()
    }, []);

    useEffect(() => {
        void fetchHistorico();
    }, [formData.vigencia_reporta]);

    const getMonthRange = (mesId: number, frecuenciaMedicion: string) => {
        switch (frecuenciaMedicion) {
            case 'mensual':
                return meses[mesId - 1]; // Retorna el mes específico
            case 'semestral':
                return mesId <= 6 ? 'enero-junio' : 'julio-diciembre';
            case 'trimestral':
                if (mesId <= 3) return 'enero-marzo';
                if (mesId <= 6) return 'abril-junio';
                if (mesId <= 9) return 'julio-septiembre';
                return 'octubre-diciembre';
            case 'anual':
                return 'enero-diciembre';
            default:
                return ''; // Manejar casos no definidos o por defecto
        }
    };

    const columns = [
        {
            field: 'mes_id',
            headerName: 'Meses',
            width: 250,
            valueGetter: (params: { row: { mes_id: any; }; }) => getMonthRange(params.row.mes_id, formData.frecuencia_medicion)
        }, { field: 'variable_1', headerName: 'Variable 1', width: 350 },
        { field: 'variable_2', headerName: 'Variable 2', width: 350 },
        {
            field: 'logro',
            headerName: 'Logro (%)',
            width: 400,
            valueGetter: (params: any) => ((parseFloat(params.row.variable_1) / parseFloat(params.row.variable_2)) * 100).toFixed(2) + '%'
        },
        {
            field: 'semaforo',
            headerName: 'Semáforo',
            width: 400,
            renderCell: (params: any) => {
                const logro = parseFloat(params.getValue(params.id, 'logro'));
                let label = 'Estado actual';

                let color = 'grey'; // Por defecto, botón negro
                if (logro === 100) {
                    color = 'blue';
                    label = 'Meta 100%';
                } else if (logro === 75) {
                    color = 'red';
                    label = 'Insatisfactorio 75%';
                } else if (logro >= 75 && logro <= 79) {
                    color = 'yellow';
                    label = 'Aceptable 75-79%';
                } else if (logro >= 80) {
                    color = 'green';
                    label = 'Satisfactorio >=80%';
                }

                // Suponiendo que tienes un componente Button o un estilo para estos colores
                return <Chip style={{ backgroundColor: color }} label={label}></Chip>;
            }
        }
    ];

    const handleClick = () => {
        console.log(indicadorvalor);
        console.log("2222222");
    };


    const [value, setValue] = useState<number>(2023);

    const handleDecrement = () => {
        setKnobValue(knobValue - 1);
        setValue(value - 1);
    };
    const handleIncrement = () => {
        setFormData(initialFormData)

        setKnobValue(knobValue + 1);
        setValue(value + 1);
    };





    const [selectedMonth, setSelectedMonth] = useState('');
    const [mesId, setMesId] = useState(0); // Para manejar el ID numérico del mes seleccionado
    const [variable1, setVariable1] = useState('');
    const [variable2, setVariable2] = useState('');

    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    // Función para manejar el cambio en el select de meses
    const handleChangeMonth = (event: { target: { value: any; }; }) => {
        const monthRange = event.target.value; // Esto podría ser, por ejemplo, "enero-junio"
        const [startMonth] = monthRange.split('-'); // Extrae el mes de inicio del rango
        setSelectedMonth(monthRange);
        setMesId(meses.indexOf(startMonth) + 1); // Actualiza el ID del mes basado en el mes de inicio
    };


    // Función para manejar el cambio en los inputs de variable1 y variable2
    const handleVariableChange = (event: any) => {
        const { name, value } = event.target;
        if (name === 'variable1') {
            setVariable1(value);
        } else if (name === 'variable2') {
            setVariable2(value);
        }
    };

    // Función para actualizar formData cuando se selecciona un mes y se ingresan las variables
    const updateFormData = () => {
        control_success("Variables agregadas")

        const existingIndex = formData.indicadorvalor_set.findIndex(indicador => indicador.mes_id === mesId);
        const newIndicadorValor = {
            mes_id: mesId,
            valor: '0',
            variable_1: variable1,
            variable_2: variable2
        };

        if (existingIndex > -1) {
            const updatedIndicadorValorSet = [...formData.indicadorvalor_set];
            updatedIndicadorValorSet[existingIndex] = newIndicadorValor;
            setFormData((prevData) => ({
                ...prevData,
                indicadorvalor_set: updatedIndicadorValorSet
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                indicadorvalor_set: [...prevData.indicadorvalor_set, newIndicadorValor]
            }));
        }
    };

    const getFilteredMonths = () => {
        switch (formData.frecuencia_medicion) {
            case 'mensual':
                return meses; // Retorna todos los meses
            case 'semestral':
                // Retorna los rangos de meses para semestral
                return ['enero-junio', 'julio-diciembre'];
            case 'trimestral':
                // Ejemplo para trimestral, ajusta según corresponda
                return ['enero-marzo', 'abril-junio', 'julio-septiembre', 'octubre-diciembre'];
            case 'anual':
                // Para anual, podrías elegir un mes o simplemente dejar seleccionar cualquier
                return ['enero-diciembre']; // Ajusta según necesites
            default:
                return meses; // Por defecto retorna todos los meses
        }
    };














    const nombre_indicador = Historico.length > 0 ? Historico[0].nombre_indicador : '';
    const proceso = Historico.length > 0 ? Historico[0].proceso : '';
    const frecuencia_medicion = Historico.length > 0 ? Historico[0].frecuencia_medicion : '';
    const formula_indicador = Historico.length > 0 ? Historico[0].formula_indicador : '';
    const vigencia_reporta = Historico.length > 0 ? Historico[0].vigencia_reporta : '';
    const dependencia_grupo_regional = Historico.length > 0 ? Historico[0].dependencia_grupo_regional : '';
    const objetivo_indicador = Historico.length > 0 ? Historico[0].objetivo_indicador : '';
    const unidad_medicion_reporte = Historico.length > 0 ? Historico[0].unidad_medicion_reporte : '';
    const descripcion_variable_1 = Historico.length > 0 ? Historico[0].descripcion_variable_1 : '';
    const descripcion_variable_2 = Historico.length > 0 ? Historico[0].descripcion_variable_2 : '';
    const origen_datos = Historico.length > 0 ? Historico[0].origen_datos : '';
    const responsable_creacion = Historico.length > 0 ? Historico[0].responsable_creacion : '';
    const tipo_indicador = Historico.length > 0 ? Historico[0].tipo_indicador : '';
    const tipo_id = Historico.length > 0 ? Historico[0].id_indicador : '';
    const formularioo = Historico.length > 0 ? Historico[0].formulario : '';
    const indicadorvalor = Historico.length > 0 ? Historico[0].indicadorvalor_set : [];




    useEffect(() => {
        updateget()
    }, [nombre_indicador, proceso, frecuencia_medicion, formula_indicador, vigencia_reporta, dependencia_grupo_regional, objetivo_indicador, unidad_medicion_reporte, descripcion_variable_1, descripcion_variable_2, origen_datos, responsable_creacion, tipo_indicador]);




    const updateget = () => {
        setFormData((prevData) => ({
            ...prevData,
            nombre_indicador: nombre_indicador,
            proceso: proceso,
            frecuencia_medicion: frecuencia_medicion,
            formula_indicador: formula_indicador,
            vigencia_reporta: vigencia_reporta,
            dependencia_grupo_regional: dependencia_grupo_regional,
            objetivo_indicador: objetivo_indicador,
            unidad_medicion_reporte: unidad_medicion_reporte,
            descripcion_variable_1: descripcion_variable_1,
            descripcion_variable_2: descripcion_variable_2,
            origen_datos: origen_datos,
            responsable_creacion: responsable_creacion,
            tipo_indicador: tipo_indicador,
            formulario: formularioo,
            indicadorvalor_set: indicadorvalor
        }));
    };










    const [series, setSeries] = useState<Serie[]>([{ name: "Logro", data: [] }]);
    const [options, setOptions] = useState<Options>({
        chart: { type: 'line', height: 350 },
        xaxis: { type: 'category', categories: [] },
        title: { text: 'Logro por Mes' },
        yaxis: { title: { text: 'Logro (%)' } }
    });

    const datos = indicadorvalor;


    useEffect(() => {
        const actualizaDatos = () => {
            const logros = datos.map(dato => parseFloat(((parseFloat(dato.variable_1) / parseFloat(dato.variable_2)) * 100).toFixed(2)));
            const nombresMeses = datos.map(dato => meses[dato.mes_id - 1]);

            setSeries([{ name: "Logro", data: logros }]);
            setOptions(prevOptions => ({
                ...prevOptions,
                xaxis: { ...prevOptions.xaxis, categories: nombresMeses }
            }));
        };

        actualizaDatos();
    }, [indicadorvalor]);
    const textoSeleccionado = (() => {
        switch (formData.formulario) {
            case "1":
                return "recaudo tua";
            case "2":
                return "recaudo tr";
            case "3":
                return "costo recaudo tua";
            case "4":
                return "costo recaudo tr";
            default:
                return "";
        }
    })();

    return (
        <>
            {/* <div>
                <button onClick={handleClick}>consola  </button>
            </div> */}
            <Grid container
                item xs={12} marginLeft={2} marginRight={2} spacing={2} marginTop={3}
                sx={{
                    position: 'relative',
                    borderRadius: '15px',
                    background: '#FAFAFA',
                    boxShadow: '0px 3px 6px #042F4A26',
                    p: '20px', m: '10px 0 20px 0', mb: '20px',
                }}
            >
                <Title title={` Datos del indicador ${textoSeleccionado}`} />


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


                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="opcion-select-label">Formulario</InputLabel>
                        <Select
                            fullWidth
                            size="small"
                            name="formulario"
                            label="formulario"
                            value={formData.formulario}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="1">RECAUDO TUA</MenuItem>
                            <MenuItem value="2">RECAUDO TR</MenuItem>
                            <MenuItem value="3">COSTO RECAUDO TUA</MenuItem>
                            <MenuItem value="4">COSTO RECAUDO TR</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
             

                <Grid item xs={12} sm={3}>
                    <TextField

                        label="Nombre indicador"
                        helperText='Nombre indicador'
                        size="small"
                        fullWidth
                        name="nombre_indicador"
                        value={formData.nombre_indicador}
                        onChange={handleInputChange}
                    />
                </Grid>




                {/* 
                <Grid item xs={12} sm={3}>
                    <TextField

                        label="formulario"
                        helperText='formulario'
                        size="small"
                        fullWidth
                        name="formulario"
                        value={formData.formulario}
                        onChange={handleInputChange}
                    />
                </Grid> */}



                <Grid item xs={12} sm={3}>
                    <TextField

                        label="proceso"
                        helperText='proceso'
                        size="small"
                        fullWidth
                        name="proceso"
                        value={formData.proceso}
                        onChange={handleInputChange}
                    />
                </Grid>



                {/* <Grid item xs={12} sm={3}>
                    <TextField

                        label="Frecuencia de medicion"
                        helperText='Frecuencia de medicion'
                        size="small"
                        fullWidth
                        name="frecuencia_medicion"
                        value={formData.frecuencia_medicion}
                        onChange={handleInputChange}
                    />
                </Grid> */}









                <Grid item xs={12} sm={3}>
                    <TextField

                        label="Formula indicador"
                        helperText='Formula indicador'
                        size="small"
                        fullWidth
                        name="formula_indicador"
                        value={formData.formula_indicador}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField

                        label="Dependencia grupo regional"
                        helperText='Dependencia grupo regional'
                        size="small"
                        fullWidth
                        name="dependencia_grupo_regional"
                        value={formData.dependencia_grupo_regional}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField

                        label="Objetivo indicador"
                        helperText='Objetivo indicador'
                        size="small"
                        fullWidth
                        name="objetivo_indicador"
                        value={formData.objetivo_indicador}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Unidad de medicion reporte"
                        helperText='Unidad de medicion reporte'
                        size="small"
                        fullWidth
                        name="unidad_medicion_reporte"
                        value={formData.unidad_medicion_reporte}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Tipo indicador"
                        helperText='Tipo indicador'
                        size="small"
                        fullWidth
                        name="tipo_indicador"
                        value={formData.tipo_indicador}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Responsable de  creacion"
                        helperText='Responsable de creacion'
                        size="small"
                        fullWidth
                        name="responsable_creacion"
                        value={formData.responsable_creacion}
                        onChange={handleInputChange}
                    />
                </Grid>



                <Grid item xs={12} sm={3}>
                    <TextField

                        label="Descripcion de variable 1"
                        helperText='Descripcion de variable 1'
                        size="small"
                        fullWidth
                        name="descripcion_variable_1"
                        value={formData.descripcion_variable_1}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Descripcion variable 2"
                        helperText='Descripcion variable 2'
                        size="small"
                        fullWidth
                        name="descripcion_variable_2"
                        value={formData.descripcion_variable_2}
                        onChange={handleInputChange}
                    />
                </Grid>


                <Grid item xs={12} sm={3}>
                    <TextField

                        label="Origen de datos"
                        helperText='Origen de datos'
                        size="small"
                        fullWidth
                        name="origen_datos"
                        value={formData.origen_datos}
                        onChange={handleInputChange}
                    />
                </Grid>



                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="opcion-select-label">Frecuencia de medicion</InputLabel>
                        <Select
                            fullWidth
                            size="small"
                            disabled={!!frecuencia_medicion}
                            name="frecuencia_medicion"
                            onChange={handleInputChange}
                            label="Frecuencia de medicion"
                            value={formData.frecuencia_medicion}
                        >
                            <MenuItem value="mensual">Mensual</MenuItem>
                            <MenuItem value="semestral">Semestral</MenuItem>
                            <MenuItem value="trimestral">Trimestral</MenuItem>
                            <MenuItem value="anual">Anual</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="mes-select-label">Mes</InputLabel>
                        <Select
                            labelId="mes-select-label"
                            value={selectedMonth}
                            label="Mes"
                            onChange={handleChangeMonth}
                        >
                            {getFilteredMonths().map((mes, index) => (
                                <MenuItem key={index} value={mes}>{mes}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>





                {selectedMonth && (
                    <>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="Variable 1"
                                size="small"
                                fullWidth
                                name="variable1"
                                onChange={handleVariableChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="Variable 2"
                                size="small"
                                fullWidth
                                name="variable2"
                                onChange={handleVariableChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Button startIcon={<AddIcon />} variant="contained" onClick={updateFormData}>Agregar</Button>
                        </Grid>

                    </>
                )}





                <Grid item >
                    <Button
                        color="success"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={() => {
                            if (tipo_id) {
                                handleSubmiteditar();
                            } else {
                                handleSubmitCrear();
                            }
                        }}
                    >
                        {tipo_id ? 'Editar' : 'Guardar'}
                    </Button>

                </Grid>
            </Grid>


            <Grid container
                item xs={12} marginLeft={2} marginRight={2} spacing={2} marginTop={3}
                sx={{
                    position: 'relative',
                    borderRadius: '15px',
                    background: '#FAFAFA',
                    boxShadow: '0px 3px 6px #042F4A26',
                    p: '20px', m: '10px 0 20px 0', mb: '20px',
                }}
            >
                
                <Title title={`Semáforo ${textoSeleccionado}`} />
                <Grid item xs={2.4}  >
                    <Box
                        className={`border px-4 text-white fs-5 p-1`}
                        sx={{
                            display: 'grid',
                            background: '#FF0000',
                            width: '100%',
                            margin: '0 auto',
                            height: '40px',
                            color: '#fff',
                            borderRadius: '10px',
                            pl: '10px',
                            pr: '10px',
                            fontSize: '17px',
                            fontWeight: '900',
                            alignContent: 'center',
                            marginTop: '10px',
                            justifyContent: "center"

                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '17px',
                            }}
                        >
                            Insatisfactorio 75%
                        </Typography>
                    </Box>
                </Grid>


                <Grid item xs={2.4} >
                    <Box
                        className={`border px-4 text-white fs-5 p-1`}
                        sx={{
                            display: 'grid',
                            background: '#808080',
                            width: '100%',
                            margin: '0 auto',
                            height: '40px',
                            color: '#fff',
                            borderRadius: '10px',
                            pl: '10px',
                            pr: '10px',
                            fontSize: '17px',
                            fontWeight: '900',
                            alignContent: 'center',
                            marginTop: '10px',
                            justifyContent: "center"
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '17px',
                            }}
                        >
                            Estado actual
                        </Typography>
                    </Box>
                </Grid>


                <Grid item xs={2.4}>
                    <Box
                        className={`border px-4 text-white fs-5 p-1`}
                        sx={{
                            display: 'grid',
                            background: '#0000FF',
                            width: '100%',
                            margin: '0 auto',
                            height: '40px',
                            color: '#fff',
                            borderRadius: '10px',
                            pl: '10px',
                            pr: '10px',
                            fontSize: '17px',
                            fontWeight: '900',
                            alignContent: 'center',
                            marginTop: '10px',
                            justifyContent: "center"

                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '17px',
                            }}
                        >
                            Meta 100%
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={2.4}>
                    <Box
                        className={`border px-4 text-white fs-5 p-1`}
                        sx={{
                            display: 'grid',
                            background: '#FFFF00',
                            width: '100%',
                            margin: '0 auto',
                            height: '40px',
                            color: '#fff',
                            borderRadius: '10px',
                            pl: '10px',
                            pr: '10px',
                            fontSize: '17px',
                            fontWeight: '900',
                            alignContent: 'center',
                            marginTop: '10px',
                            justifyContent: "center"

                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '17px',
                            }}
                        >
                            Aceptable 75-79%
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={2.4}>
                    <Box
                        className={`border px-4 text-white fs-5 p-1`}
                        sx={{
                            display: 'grid',
                            background: '#008000',
                            width: '100%',
                            margin: '0 auto',
                            height: '40px',
                            color: '#fff',
                            borderRadius: '10px',
                            pl: '10px',
                            pr: '10px',
                            fontSize: '17px',
                            fontWeight: '900',
                            alignContent: 'center',
                            marginTop: '10px',
                            justifyContent: "center"

                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '17px',
                            }}
                        >
                            Satisfactorio  + =80%
                        </Typography>
                    </Box>
                </Grid>

            </Grid>
            <RenderDataGrid
                title={`Cálculo de metas ${textoSeleccionado}`}
                columns={columns ?? []}
                rows={indicadorvalor ?? []}
            />

            <Grid container
                item xs={12} marginLeft={2} marginRight={2} spacing={2} marginTop={3}
                sx={{
                    position: 'relative',
                    borderRadius: '15px',
                    background: '#FAFAFA',
                    boxShadow: '0px 3px 6px #042F4A26',
                    p: '20px', m: '10px 0 20px 0', mb: '20px',
                }}
            >
                <Title title={`Gráfica  de indicadores ${textoSeleccionado}`} />


                <Grid item xs={12} marginTop={2} sm={12}>
                    <ReactApexChart options={options} series={series} type="line" height={350} />
                </Grid>


            </Grid>
        </>
    );
};
