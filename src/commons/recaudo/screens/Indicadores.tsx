

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
import IconButton from '@mui/material/IconButton';
import { AuthSlice } from '../../auth/interfaces';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { control_error } from '../alertas/store/thunks/alertas';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { BuscadorPersona } from '../../../components/BuscadorPersona';
import { control_success } from '../../recursoHidrico/requets/Request';
import { DialogGeneradorDeDirecciones } from '../../../components/DialogGeneradorDeDirecciones';
import { FormControl, Grid, TextField, InputLabel, MenuItem, Select, SelectChangeEvent, Button } from '@mui/material';
import { RenderDataGrid } from '../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import Paper from '@mui/material/Paper';
import { Knob } from 'primereact/knob';
import RemoveIcon from '@mui/icons-material/Remove';



interface Historico {
    proceso: any;
    nombre_indicador: string;
    frecuencia_medicion: string;
    variable_1: string;
    variable_2: string;
    formula_indicador: string;
    vigencia_reporta: string;
    dependencia_grupo_regional: string;
    objetivo_indicador: string;
    unidad_medicion_reporte: string;
    descripcion_variable_1: string;
    descripcion_variable_2: string;
    origen_datos: string;
    responsable_creacion: string;
    tipo_indicador: string;
    enero: number | null;
    febrero: number | null;
    marzo: number | null;
    abril: number | null;
    mayo: number | null;
    junio: number | null;
    julio: number | null;
    agosto: number | null;
    septiembre: number | null;
    octubre: number | null;
    noviembre: number | null;
    diciembre: number | null;
}

interface ReporteTiposUsuario {
    success: boolean;
    detail: string;
    data: {
        registros: {
            nombre: string;
            total: number;
        }[];
        total: number;
    };
}

interface FormData {
    proceso: any;
    nombre_indicador: string;
    frecuencia_medicion: string;
    variable_1: string;
    variable_2: string;
    formula_indicador: string;
    vigencia_reporta: any;
    dependencia_grupo_regional: string;
    objetivo_indicador: string;
    unidad_medicion_reporte: string;
    descripcion_variable_1: string;
    descripcion_variable_2: string;
    origen_datos: string;
    responsable_creacion: string;
    tipo_indicador: string;
    enero: any | null;
    febrero: any | null;
    marzo: any | null;
    abril: any | null;
    mayo: any | null;
    junio: any | null;
    julio: any | null;
    agosto: any | null;
    septiembre: any | null;
    octubre: any | null;
    noviembre: any | null;
    diciembre: any | null;

}
export const Indicadores: React.FC = () => {


    const initialFormData: FormData = {
        proceso: "",
        nombre_indicador: " ",
        frecuencia_medicion: "",
        variable_1: "",
        variable_2: "",
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
        enero: "",
        febrero: "",
        marzo: "",
        abril: "",
        mayo: "",
        junio: "",
        julio: "",
        agosto: "",
        septiembre: "",
        octubre: "",
        noviembre: "",
        diciembre: ""
    };
    const [formData, setFormData] = useState(initialFormData);
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };



    //crear 
    const handleSubmitCrear = async () => {
        try {
            const url = "recaudo/configuracion_baisca/indicadores/post/";
            const response = await api.post(url, formData)
            //  console.log('')("Configuración básica creada con éxito", response.data);
            fetchHistorico()
            control_success("Guardado exitosamente")

        } catch (error: any) {
            // console.error("Error al crear la configuración básica", error);
            //  console.log('')(error.response.data.detail.detail);
            control_error(error.response.data.detail?.error);
        }
    };




    // const fetchHistorico = async (): Promise<void> => {
    //     try {
    //         const url = "/recaudo/configuracion_baisca/indicadores/2024/";
    //         const res = await api.get(url);
    //         const HistoricoData: Historico[] = res.data?.data || [];
    //         setHistorico(HistoricoData);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };




    const [Historico, setHistorico] = useState<Historico[]>([]);


    const fetchHistorico = async (): Promise<void> => {
        try {
            const url = `/recaudo/configuracion_baisca/indicadores/${formData.vigencia_reporta}/`;
            const res = await api.get(url);
            const HistoricoData: Historico[] = res.data?.data || [];
            setHistorico(HistoricoData);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        void fetchHistorico();
    }, []);


    useEffect(() => {
        void fetchHistorico();
    }, [formData.vigencia_reporta]);

    const columns = [

        { field: 'nombre_indicador', headerName: 'Nombre indicador', width: 200 },

        { field: 'enero', headerName: 'Enero', width: 130 },
        { field: 'febrero', headerName: 'Febrero', width: 130 },
        { field: 'marzo', headerName: 'Marzo', width: 130 },
        { field: 'abril', headerName: 'Abril', width: 130 },
        { field: 'mayo', headerName: 'Mayo', width: 130 },
        { field: 'junio', headerName: 'Junio', width: 130 },
        { field: 'julio', headerName: 'Julio', width: 130 },
        { field: 'agosto', headerName: 'Agosto', width: 130 },
        { field: 'septiembre', headerName: 'Septiembre', width: 130 },
        { field: 'octubre', headerName: 'Octubre', width: 130 },
        { field: 'noviembre', headerName: 'Noviembre', width: 130 },
        { field: 'diciembre', headerName: 'Diciembre', width: 130 },
    ];
    const [reporteTiposUsuario, setReporteTiposUsuario] = useState<ReporteTiposUsuario | null>(null);
    const fetchReporteTiposUsuario = async (): Promise<void> => {
        try {
            const url = `/gestor/encuestas/reporte_tipos_usuario/get/104/`;
            const res = await api.get<ReporteTiposUsuario>(url);
            setReporteTiposUsuario(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchReporteTiposUsuario();
    }, []);

    const categoriesTiposUsuario = reporteTiposUsuario?.data.registros.map(registro => registro.nombre) || [];
    const dataTotalsTiposUsuario = reporteTiposUsuario?.data.registros.map(registro => registro.total) || [];

    const chartDataTiposUsuario: ApexOptions = {
        chart: {
            type: 'bar',
            height: 430
        },
        plotOptions: {
            bar: {
                horizontal: false,  // Hazlo vertical
                dataLabels: {
                    position: 'top',
                },
            }
        },
        dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
                fontSize: '14px',
                colors: ['#fff']
            }
        },
        stroke: {
            show: true,
            colors: ['#fff']
        },
        tooltip: {
            shared: true,
            intersect: false
        },
        xaxis: {
            categories: categoriesTiposUsuario,
        }
    };
    const seriesTiposUsuario = [
        {
            name: 'Total por Tipo de Usuario',
            data: dataTotalsTiposUsuario,

        }
    ];
    const DemoPaper = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 60,
        lineHeight: '60px',
    }));

    const handleClick = () => {
        console.log(Historico);
        console.log("2222222");
    };


    const [knobValue, setKnobValue] = useState<number>(2023);
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

    const nombre_indicador = Historico.length > 0 ? Historico[0].nombre_indicador : '';
    const proceso = Historico.length > 0 ? Historico[0].proceso : '';
    const frecuencia_medicion = Historico.length > 0 ? Historico[0].frecuencia_medicion : '';
    const variable_1 = Historico.length > 0 ? Historico[0].variable_1 : '';
    const variable_2 = Historico.length > 0 ? Historico[0].variable_2 : '';
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
    const enero = Historico.length > 0 ? Historico[0].enero : '';
    const febrero = Historico.length > 0 ? Historico[0].febrero : '';
    const marzo = Historico.length > 0 ? Historico[0].marzo : '';
    const abril = Historico.length > 0 ? Historico[0].abril : '';
    const mayo = Historico.length > 0 ? Historico[0].mayo : '';
    const junio = Historico.length > 0 ? Historico[0].junio : '';
    const julio = Historico.length > 0 ? Historico[0].julio : '';
    const agosto = Historico.length > 0 ? Historico[0].agosto : '';
    const septiembre = Historico.length > 0 ? Historico[0].septiembre : '';
    const octubre = Historico.length > 0 ? Historico[0].octubre : '';
    const noviembre = Historico.length > 0 ? Historico[0].noviembre : '';
    const diciembre = Historico.length > 0 ? Historico[0].diciembre : '';


    useEffect(() => {

        setFormData((prevData) => ({
            ...prevData,
            vigencia_reporta: knobValue,
            // enero:eneroValue, 
        }))
        fetchHistorico()
    }, [knobValue]);

    useEffect(() => {
        setFormData(initialFormData)
        setFormData((prevData) => ({
            ...prevData,
            enero: enero,
            nombre_indicador: nombre_indicador,
            proceso: proceso,
            frecuencia_medicion: frecuencia_medicion,
            variable_1: variable_1,
            variable_2: variable_2,
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
            julio: julio,
            agosto: agosto,
            septiembre: septiembre,
            octubre: octubre,
            noviembre: noviembre,
            diciembre: diciembre,
            febrero: febrero,
            marzo: marzo,
            abril: abril,
            mayo: mayo,
            junio: junio
        }));
    }, [enero, nombre_indicador, proceso, frecuencia_medicion, variable_1, variable_2, formula_indicador, vigencia_reporta, dependencia_grupo_regional, objetivo_indicador, unidad_medicion_reporte, descripcion_variable_1, descripcion_variable_2, origen_datos, responsable_creacion, tipo_indicador, julio, agosto, septiembre, octubre, noviembre, diciembre]);

    const [empresa_3, setempresa_3] = useState("Si");
    const handleChangeSiNo3 = (event: any) => {
        setempresa_3(event.target.value);
    };




    return (
        <>
            <div>
                <button onClick={handleClick}>consola  </button>
            </div>
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
                <Title title=" Datos del indicador " />
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

                {/* <Grid item xs={12} sm={3}>
                    <TextField

                        label="vigencia_reporta"
                        helperText='vigencia_reporta'
                        size="small"
                        fullWidth
                        name="vigencia_reporta"
                        value={formData.vigencia_reporta}
                        onChange={handleInputChange}
                    />
                </Grid> */}




                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="si-no-select-label">Mes</InputLabel>
                        <Select
                            labelId="Mes"
                            value={empresa_3}
                            label="Mes"
                            onChange={handleChangeSiNo3}
                        >
                            <MenuItem value="enero">enero</MenuItem>
                            <MenuItem value="febrero">febrero</MenuItem>
                            <MenuItem value="marzo">marzo</MenuItem>
                            <MenuItem value="abril">abril</MenuItem>
                            <MenuItem value="mayo">mayo</MenuItem>
                            <MenuItem value="junio">junio</MenuItem>
                            <MenuItem value="julio">julio</MenuItem>
                            <MenuItem value="agosto">agosto</MenuItem>
                            <MenuItem value="septiembre">septiembre</MenuItem>
                            <MenuItem value="octubre">octubre</MenuItem>
                            <MenuItem value="noviembre">noviembre</MenuItem>
                            <MenuItem value="diciembre">diciembre</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <>
                    {empresa_3 === "enero" && (
                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="Enero"
                                helperText="Enero"
                                size="small"
                                fullWidth
                                name="enero"
                                value={formData.enero}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    )}

                    {empresa_3 === "febrero" && (
                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="Febrero"
                                helperText="Febrero"
                                size="small"
                                fullWidth
                                name="febrero"
                                value={formData.febrero}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    )}

                    {empresa_3 === "marzo" && (
                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="Marzo"
                                helperText="Marzo"
                                size="small"
                                fullWidth
                                name="marzo"
                                value={formData.marzo}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    )}
                </>
                {empresa_3 === "abril" && (
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Abril"
                            helperText="Abril"
                            size="small"
                            fullWidth
                            name="abril"
                            value={formData.abril}
                            onChange={handleInputChange}
                        />
                    </Grid>
                )}

                {empresa_3 === "mayo" && (
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Mayo"
                            helperText="Mayo"
                            size="small"
                            fullWidth
                            name="mayo"
                            value={formData.mayo}
                            onChange={handleInputChange}
                        />
                    </Grid>
                )}

                {empresa_3 === "junio" && (
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Junio"
                            helperText="Junio"
                            size="small"
                            fullWidth
                            name="junio"
                            value={formData.junio}
                            onChange={handleInputChange}
                        />
                    </Grid>
                )}

                {empresa_3 === "julio" && (
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Julio"
                            helperText="Julio"
                            size="small"
                            fullWidth
                            name="julio"
                            value={formData.julio}
                            onChange={handleInputChange}
                        />
                    </Grid>
                )}

                {empresa_3 === "agosto" && (
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Agosto"
                            helperText="Agosto"
                            size="small"
                            fullWidth
                            name="agosto"
                            value={formData.agosto}
                            onChange={handleInputChange}
                        />
                    </Grid>
                )}

                {empresa_3 === "septiembre" && (
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Septiembre"
                            helperText="Septiembre"
                            size="small"
                            fullWidth
                            name="septiembre"
                            value={formData.septiembre}
                            onChange={handleInputChange}
                        />
                    </Grid>
                )}
                {empresa_3 === "octubre" && (
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Octubre"
                            helperText="Octubre"
                            size="small"
                            fullWidth
                            name="octubre"
                            value={formData.octubre}
                            onChange={handleInputChange}
                        />
                    </Grid>
                )}

                {empresa_3 === "noviembre" && (
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Noviembre"
                            helperText="Noviembre"
                            size="small"
                            fullWidth
                            name="noviembre"
                            value={formData.noviembre}
                            onChange={handleInputChange}
                        />
                    </Grid>
                )}

                {empresa_3 === "diciembre" && (
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Diciembre"
                            helperText="Diciembre"
                            size="small"
                            fullWidth
                            name="diciembre"
                            value={formData.diciembre}
                            onChange={handleInputChange}
                        />
                    </Grid>
                )}

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
                <Grid item xs={12} sm={3}>
                    <TextField

                        label="Frecuencia de medicion"
                        helperText='Frecuencia de medicion'
                        size="small"
                        fullWidth
                        name="frecuencia_medicion"
                        value={formData.frecuencia_medicion}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Variable 1"
                        helperText='Variable 1'
                        size="small"
                        fullWidth
                        name="variable_1"
                        value={formData.variable_1}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Variable 2"
                        helperText='Variable 2'
                        size="small"
                        fullWidth
                        name="variable_2"
                        value={formData.variable_2}
                        onChange={handleInputChange}
                    />
                </Grid>
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







                {/* ////////////////////////////////////7 */}

                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Descripción  de la variable 2"
                        helperText='Descripción  de la variable 2'
                        size="small"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Fórmula de indicador "
                        helperText='Fórmula de indicador '
                        size="small"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Origen o fuente de los datos "
                        helperText='Origen o fuente de los datos '
                        size="small"
                        fullWidth
                    />
                </Grid>
                <Grid item >
                    <Button
                        color="success"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={() => {
                            handleSubmitCrear();
                        }}
                    >
                        Guardar
                    </Button>
                </Grid>
            </Grid>


            {/* <Grid container
                item xs={12} marginLeft={2} marginRight={2} spacing={2} marginTop={3}
                sx={{
                    position: 'relative',
                    borderRadius: '15px',
                    background: '#FAFAFA',
                    boxShadow: '0px 3px 6px #042F4A26',
                    p: '20px', m: '10px 0 20px 0', mb: '20px',
                }}
            >
                <Title title=" Metas de indicadores      " />

                <DemoPaper variant="elevation">default variant</DemoPaper>

            </Grid>
 */}

            <RenderDataGrid
                title='Calculo de metas'
                columns={columns ?? []}
                rows={Historico ?? []}
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
                <Title title="Gráfica  de indicadores " />


                <Grid item xs={12} marginTop={2} sm={12}>
                    < ReactApexChart options={chartDataTiposUsuario} series={seriesTiposUsuario} type="bar" height={330} />
                </Grid>


            </Grid>
        </>
    );
};
