

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// eslint-disable-next-line @typescript-eslint/naming-convention
// eslint-disable-next-line @typescript-eslint/no-var-requires
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unused-vars */
import 'leaflet/dist/leaflet.css';
import { Title } from '../../../../components/Title';
import { Grid, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import SearchIcon from '@mui/icons-material/Search';

const IndicadoresRecaudo = () => {
  // Estado inicial para series y opciones
  const [estado] = useState<{
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;
    options: ApexOptions;
  }>({
    series: [{
      name: '0 a 180',
      data: [1, 2, 3, 6, 2, 4, 7, 8, 9, 1, 7, 2, 7, 4, 5, 3, 6, 8, 13, 5, 6, 7, 8, 2, 3, 4, 10, 8, 9, 4, 2]
    }, {
      name: '181 a 360',
      data: [7, 9, 2, 7, 9, 7, 7, 4, 2, 5, 6, 3, 4, 8, 9, 3, 7, 10, 5, 7, 1, 6, 3, 4, 1, 5, 7, 3, 5, 1, 4]
    }, {
      name: 'Mas de 360',
      data: [6, 5, 3, 6, 3, 2, 2, 2, 7, 10, 8, 8, 7, 7, 5, 5, 3, 8, 7, 4, 8, 1, 3, 8, 5, 8, 3, 6, 2, 6, 2]
    }, 

    // {
    //   name: 'Bucket Slope',
    //   data: [2, 9, 3, 3, 5, 9, 4, 5, 6, 7, 4, 5, 3, 6, 7, 6, 5, 8, 2, 5, 4, 2, 7, 4, 7, 6, 2, 7, 6, 4, 2]
    // }, {
    //   name: 'Reborn Kid',
    //   data: [7, 5, 3, 3, 8, 5, 7, 6, 3, 8, 1, 8, 5, 14, 9, 3, 6, 2, 10, 5, 7, 4, 6, 8, 4, 8, 2, 8, 8, 5, 2]
    // }
  
  ],
    options: {
      chart: {
        type: 'bar' as const, // Especifica el tipo de manera explícita y segura para TypeScript
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: '13px',
                fontWeight: 900,
              },
            },
          },
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      title: {
        text: 'Reporte General de Cartera Por Deuda y Edad',
      },
      xaxis: {
        categories: [
          ['APROVECHAMIENTO', 'FORESTAL COACTIVO', ' DIFICIL RECAUDO'],
          ['VISITAS TECNICAS', 'POR COBRAR COACTIVO', ' DIFICIL RECAUDO'],
          ['PORCENTAJE Y SOBRETASA', 'AMBIENTAL VIGENCIA', 'DIFICIL RECAUDO'],
          ['MULTAS PERSUASIVO', 'DIFICIL RECAUDO',],
          ['MULTAS COACTIVO', 'DIFICIL RECAUDO',],
          ['TASA RETRIBUTIVA', 'COACTIVO', ' DIFICIL RECAUDO'],
          ['TASA USO DE', 'AGUA COACTIVO', 'DIFICIL RECAUDO'],
          ['TASA USO DE', 'AGUA PERSUASIVO', 'DIFICIL RECAUDO'],
          ['PORCENTAJE', 'AMBIENTAL ANTERIOR',],
          ['PORCENTAJE', 'AMBIENTAL ACTUAL',],
          ['SOBRETASA AMBIENTAL', 'VIGENCIA ANTERIOR',],
          ['VISITAS TECNICAS ', 'DE EVALUACION, SEGUMIENTO', 'Y CONTROL ACTUAL'],
          ['INTERESES VISITAS', 'TECNICAS POR COBRAR',],
          ['INTERESES', 'SOBRETASA AMBIENTAL', ''],
          ['INTERESES PORCENTAJE'],
          ['INTERESES', 'TASA RETRIBUTIVA',],
          ['INTERESES DEUDORES ', 'TASA USO DE AGUA'],
          ['INTERESES MULTAS ', 'Y SANCIONES'],
          ['MULTAS ANTERIOR',],
          ['MULTAS ACTUAL'],
          ['TRANSFERENCIA DEL', 'SECTOR ELECTRICO ', 'ANTERIOR TIYAVA'],
          ['TRANSFERENCIA DEL', 'SECTOR ELECTRICO ', 'ACTUAL GUAYURIBA'],
          ['TRANSFERENCIA DEL', 'SECTOR ELECTRICO', ' ACTUAL APIAY'],
          ['TRANSFERENCIA DEL', 'SECTOR ELECTRICO ', 'ACTUAL GUATIQUIA'],
          ['TRANSFERENCIA DEL', 'SECTOR ELECTRICO ', 'ACTUAL RIO META'],
          ['TRANSFERENCIA DEL', 'SECTOR ELECTRICO ', 'ACTUAL GUARROJO'],
          ['TRANSFERENCIA DEL ', 'SECTOR ELECTRICO ', 'ACTUAL TILLAVA'],
          ['TASA RETRIBUTIVA  ', 'VIGENCIAS ANTERIORES'],
          ['TASA RETRIBUTIVA ACTUAL '],
          ['TASA USO DE AGUA  ', 'VIGENCIA ANTERIOR'],
          ['TASA USO DE AGUA ACTUAL ',],

        ],
        labels: {
          formatter: function (val: string) {
            return val + "K";
          },
        },
      },
      // yaxis: {
      //   title: {
      //     text: undefined,
      //   },
      // },
      yaxis: {
        labels: {
          style: {
            fontSize: '9px',
          },
          // rotate: -45,
          // offsetX: -10, // Ajusta según necesidad
          // offsetY: 5,  // Ajusta según necesidad
        },
      },

      tooltip: {
        y: {
          formatter: function (val: any) {
            return val + "K";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40,
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={estado.options} series={estado.series} type="bar" height={1500} />
      </div>
    </div>
  );
};




export interface FormData {

  edad: any,
  fecha_hasta: any;
  fecha_desde: any;
  deuda: any,
};


export const ReporteCartera4: React.FC = () => {

  const initialFormData: FormData = {

    fecha_desde: '',
    fecha_hasta: '',
    edad: '',
    deuda: '',
  };
  const [formData, setFormData] = useState(initialFormData);


  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
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
        <Grid item xs={12} sm={12}>
          <Title title="Reporte General de Cartera Por Deuda y Edad" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Fecha desde  "
            type="date"
            size="small"
            name="fecha_desde"
            variant="outlined"
            value={formData.fecha_desde}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label=" Fecha hasta  "
            type="date"
            size="small"
            name="fecha_hasta"
            variant="outlined"
            value={formData.fecha_hasta}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Concepto edad"
            name="edad"
            disabled
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleInputChange}
            // value={formData.edad}
            value={'TODOS'}

          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Concepto deuda"
            name="deuda"
            disabled
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleInputChange}
            // value={formData.deuda}
            value={'TODOS'}

          />
        </Grid>

        <Grid item>
          <Button
            color="primary"
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={() => {

            }}
          >
            buscar
          </Button>
        </Grid>

        <Grid item xs={12} sm={12} sx={{
          background: `url('https://api.gbif.org/v1/image/unsafe/https%3A%2F%2Fraw.githubusercontent.com%2FSIB-Colombia%2Flogos%2Fmain%2Fsocio-SiB-cormacarena.png') no-repeat center center, #FFFFFF `,
        }}  >
          <IndicadoresRecaudo />
        </Grid>


      </Grid>
    </>
  );
};





