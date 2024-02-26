

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



interface Historico {
    id_documento: any;
    nombre_completo: any;
    radicado: any;
    ruta_archivo: {
        ruta_archivo: string;
        fecha_creacion_doc: any;
        formato: any;
    };
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
export const Indicadores: React.FC = () => {

    const [Historico, setHistorico] = useState<Historico[]>([]);

    const fetchHistorico = async (): Promise<void> => {
        try {
            const url = "/recaudo/formulario/documento_formulario_recuado_get/";
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


    const columns = [
        // { field: 'id_documento', headerName: ' Numero ', width: 130, flex: 1 },
        { field: 'Mes', headerName: 'Mes ', width: 130, flex: 1 },
        { field: 'Variable 1', headerName: 'Variable 1 ', width: 130, flex: 1 },
        { field: 'Variable 2', headerName: 'Variable 2 ', width: 130, flex: 1 },
        { field: 'Logro', headerName: 'Logro ', width: 130, flex: 1 },
        { field: 'Meta', headerName: 'Meta ', width: 130, flex: 1 },
        { field: 'Semaforicacion', headerName: 'Semaforicacion ', width: 130, flex: 1 },
        { field: 'Mess', headerName: 'Mess ', width: 130, flex: 1 },
        { field: 'Descripcion', headerName: 'Descripcion ', width: 130, flex: 1 },


        {
            field: 'formato',
            headerName: 'Formato',
            width: 180,
            flex: 1,
            valueGetter: (params: any) => (params.row.ruta_archivo.formato),
        },

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
    return (
        <>

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

                <Grid item xs={12} sm={3}>
                    <TextField
                        disabled
                        id="outlined-error-helper-text"
                        label="Fecha creación indicador"
                        helperText='Fecha creación indicador'
                        size="small"
                        fullWidth

                    />
                </Grid>


                <Grid item xs={12} sm={3}>
                    <TextField
                        disabled
                        id="outlined-error-helper-text"
                        label="Vigencia de reporte"
                        helperText='Vigencia de reporte'
                        size="small"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        disabled
                        id="outlined-error-helper-text"
                        label="Procesos"
                        helperText='Procesos'
                        size="small"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        disabled
                        id="outlined-error-helper-text"
                        label="Dependencia,Grupo"
                        helperText='Dependencia,Grupo'
                        size="small"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        disabled
                        id="outlined-error-helper-text"
                        label="Nombre de inicador"
                        helperText='Nombre de indicador'
                        size="small"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        disabled
                        id="outlined-error-helper-text"
                        label=" Objetivo del indicador"
                        helperText='Objetivo del indicador'
                        size="small"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        disabled
                        id="outlined-error-helper-text"
                        label="Tipo de indicador"
                        helperText=' Tipo de indicador'
                        size="small"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        disabled
                        id="outlined-error-helper-text"
                        label="Unidad de medición"
                        helperText='Unidad de medición'
                        size="small"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField
                        disabled
                        id="outlined-error-helper-text"
                        label=" Frecuencia de medicón  "
                        helperText='Frecuencia de medicón     '
                        size="small"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField
                        disabled
                        id="outlined-error-helper-text"
                        label="Responsable de la medición  y reporte"
                        helperText='Responsable de la medición  y reporte'
                        size="small"
                        fullWidth
                    />
                </Grid>





                <Grid item xs={12} sm={3}>
                    <TextField
                        disabled
                        id="outlined-error-helper-text"
                        label="Variable 1"
                        helperText='Variable 1'
                        size="small"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        disabled
                        id="outlined-error-helper-text"
                        label="Variable 2"
                        helperText='Variable 2'
                        size="small"
                        fullWidth
                    />
                </Grid>


                <Grid item xs={12} sm={3}>
                    <TextField
                        disabled
                        id="outlined-error-helper-text"
                        label="Descripción  de la variable 1"
                        helperText='Descripción  de la variable 1'
                        size="small"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField
                        disabled
                        id="outlined-error-helper-text"
                        label="Descripción  de la variable 2"
                        helperText='Descripción  de la variable 2'
                        size="small"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField
                        disabled
                        id="outlined-error-helper-text"
                        label="Fórmula de indicador "
                        helperText='Fórmula de indicador '
                        size="small"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        disabled
                        id="outlined-error-helper-text"
                        label="Origen o fuente de los datos "
                        helperText='Origen o fuente de los datos '
                        size="small"
                        fullWidth
                    />
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
                <Title title="Grafica de indicadores " />


                <Grid item xs={12} marginTop={2} sm={12}>
                    < ReactApexChart options={chartDataTiposUsuario} series={seriesTiposUsuario} type="bar" height={330} />
                </Grid>


            </Grid>
        </>
    );
};
