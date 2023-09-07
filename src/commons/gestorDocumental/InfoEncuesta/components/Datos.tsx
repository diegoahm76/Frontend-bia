/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormControl, Grid, Button } from "@mui/material";
import { Title } from "../../../../components";
import { InputLabel, MenuItem, Select, } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Line } from 'react-chartjs-2';
import { GraficaBar } from "./GraficaBar";
import { Graficapie } from "./Graficapie";
import { GraficaArea } from "./GraficaArea";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Datos: React.FC = () => {

  const rows = [
    { id: 1, pregunta_Nro: '1', texto_pregunta: "pregunta 1", opcion_respuesta: " R 1 ", cantidad_respuestas: "1 %" },
    { id: 2, pregunta_Nro: '2', texto_pregunta: "pregunta 2", opcion_respuesta: " R 2 ", cantidad_respuestas: "2 %" },
    { id: 3, pregunta_Nro: '3', texto_pregunta: "pregunta 3", opcion_respuesta: " R 3 ", cantidad_respuestas: "3 %" },
    { id: 4, pregunta_Nro: '4', texto_pregunta: "pregunta 4", opcion_respuesta: " R 4 ", cantidad_respuestas: "4 %" },
    { id: 5, pregunta_Nro: '5', texto_pregunta: "pregunta 5", opcion_respuesta: " R 5 ", cantidad_respuestas: "5 %" },
    { id: 6, pregunta_Nro: '6', texto_pregunta: "pregunta 6", opcion_respuesta: " R 6 ", cantidad_respuestas: "6 %" },
    // Agrega más filas según tus datos
  ];

  // Columnas de la datagrid
  const columns = [
    { field: 'pregunta_Nro', headerName: 'pregunta_Nro', width: 200, flex: 1, },
    { field: 'texto_pregunta', headerName: 'texto_pregunta', width: 200, flex: 1, },
    { field: 'opcion_respuesta', headerName: 'opcion_respuesta', width: 200, flex: 1, },
    { field: 'cantidad_respuestas', headerName: 'cantidad_respuestas', width: 200, flex: 1, },

  ];

  const chartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [10, 40, 37, 50, 27, 60], // Reemplaza estos valores con tus datos reales
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [5, 35, 55, 25, 45, 0], // Reemplaza estos valores con tus datos reales
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };


  return (
    <>







      <Grid container
        spacing={2} m={2} p={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px', m: '10px 0 20px 0', mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}  >

          <Title title="Informe de encuesta" />
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel  >selecione encuesta </InputLabel>
            <Select
              id="es-principal-select"
              required
              label="selecione encuesta "

            >
              <MenuItem value="encuesta 1" >encuesta 1</MenuItem>
              <MenuItem value="encuesta 2">encuesta 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>


      </Grid>
      <Grid container
        spacing={2} m={2} p={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px', m: '10px 0 20px 0', mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}  >
          <Title title="Datos generales  " />
        </Grid>



        <Grid item xs={12}  >
          <DataGrid
            density="compact"
            autoHeight
            rows={rows}
            columns={columns}
            rowsPerPageOptions={[5]}
            pageSize={5} // Cantidad de filas por página
            disableSelectionOnClick // Desactiva la selección al hacer clic en una fila
          />
        </Grid>
      </Grid>
      <Grid container
        spacing={2} m={2} p={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px', m: '10px 0 20px 0', mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >






        <Grid item xs={12} marginTop={2} sm={6}>
          <Line data={chartData} /> {/* Renderiza la gráfica liena */}
        </Grid>
        <Grid item xs={12} marginTop={2} sm={6}>
          <GraficaBar />            {/* Renderiza la gráfica barras */}
        </Grid>
        <Grid item xs={12} marginTop={4} sm={6}>
          <Graficapie />            {/* Renderiza la gráfica torta */}
        </Grid>
        <Grid item xs={12} marginTop={4} sm={6}>
          <GraficaArea />           {/* Renderiza la gráfica area */}
        </Grid>





      </Grid>
      <Grid container
        spacing={2} m={2} p={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px', m: '10px 0 20px 0', mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >

        <Grid item xs={12} sm={1.2}>
          <Button fullWidth variant="outlined"    >
            imprimir
          </Button>
        </Grid>
        <Grid item xs={12} sm={1.2}>
          <Button fullWidth variant="contained"    >
            descargar
          </Button>
        </Grid>
        <Grid item xs={12} sm={1.2}>
          <Button color='error' fullWidth variant="contained"    >
            salir
          </Button>
        </Grid>

      </Grid>


    </>
  );
};