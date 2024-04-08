

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// eslint-disable-next-line @typescript-eslint/naming-convention
// eslint-disable-next-line @typescript-eslint/no-var-requires
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unused-vars */
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import { api } from '../../../api/axios';
import { DataGrid } from '@mui/x-data-grid';
import { SetStateAction, useEffect, } from 'react';
import AddIcon from '@mui/icons-material/Add';
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
import { FormControl, Grid, TextField, InputLabel, MenuItem, Select, SelectChangeEvent, Button, IconButton, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';


export interface FormData {

  edad: any,
  fecha_hasta: any;
  fecha_desde: any;
  deuda: any;
  top: any;
};

export const Reportetop2: React.FC = () => {

  const [chartData] = useState<{
    series: ApexAxisChartSeries | ApexNonAxisChartSeries,
    options: ApexOptions
  }>({
    series: [{
      name: '0 A 180',
      data: [44, 55, 41, 67, 22,]
    }, {
      name: '181 A 360',
      data: [13, 23, 20, 8, 13,]
    }, {
      name: 'MAS DE 360',
      data: [11, 17, 15, 15, 21,]
    },

    ],
    options: {
      chart: {
        type: 'bar', // Asegúrese de que este valor es un tipo específico permitido.
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom', // Verifique que estos valores coincidan exactamente con los tipos permitidos.
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          dataLabels: {
            position: 'top', // Esta propiedad necesita ser revisada si es parte de sus definiciones originales.
          }
        },
      },
      xaxis: {
        // type: 'datetime', // Asegúrese de que este valor es permitido para 'type'.
        categories: [
          ['MULTAS COACTIVO', 'DIFICIL RECAUDO '],
          ['TASA RETRIBUTIVA ', 'COACTIVO', 'DIFICIL RECAUDO'],
          ['PORCENTAJE AMBIENTAL', 'ACTUAL'],
          ['TASA USO DE AGUA', 'COACTIVO', 'DIFICIL RECAUDO'],
          ['VISTAS TECNNICAS DE EVALUACION', 'SEGIMIENTO Y CONTROL', 'ACTUAL']


        ],
      },
      legend: {
        position: 'right', // Asegúrese de que este valor es un tipo específico permitido.
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    },
  });

  const initialFormData: FormData = {

    fecha_desde: '',
    fecha_hasta: '',
    edad: '',
    deuda: '',
    top: "",
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
          <Title title="Reporte General de Cartera Por Deuda y Edad –Top 2" />
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
            label="Consepto edad"
            name="edad"
            disabled
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleInputChange}
            value={formData.edad}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Consepto deuda"
            name="deuda"
            disabled
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleInputChange}
            value={formData.deuda}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Consepto top 5"
            name="top"
            disabled
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleInputChange}
            value={formData.deuda}
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
          <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />

        </Grid>


      </Grid>
    </>
  );
};





