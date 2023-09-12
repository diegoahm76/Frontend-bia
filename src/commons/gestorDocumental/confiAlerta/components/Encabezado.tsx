/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormControl, Grid, Button, TextField } from "@mui/material";
import { Title } from "../../../../components";
import { InputLabel, MenuItem, Select, } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { Buscar } from "./Buscar";
import { useNavigate } from "react-router-dom";
import { ButtonSalir } from "../../../../components/Salir/ButtonSalir";
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SucursalEntidadd: React.FC = () => {

  const rows = [
    { id: 1, opciones: 'Opción 1', acciones: <IconButton><DeleteIcon /></IconButton> },
    { id: 2, opciones: 'Opción 2', acciones: <IconButton><DeleteIcon /></IconButton> },
    { id: 3, opciones: 'Opción 3', acciones: <IconButton><DeleteIcon /></IconButton> },
    { id: 4, opciones: 'Opción 4', acciones: <IconButton><DeleteIcon /></IconButton> },
    { id: 5, opciones: 'Opción 5', acciones: <IconButton><DeleteIcon /></IconButton> },
    { id: 6, opciones: 'Opción 6', acciones: <IconButton><DeleteIcon /></IconButton> },
    // Agrega más filas según tus datos
  ];

  // Columnas de la datagrid
  const columns = [
    { field: 'opciones', headerName: 'Opciones', width: 200, flex: 1, },
    {
      field: 'acciones', headerName: 'Acciones', width: 200, flex: 1, renderCell: (params: any) => (
        <>

          <IconButton
            color="primary"
            aria-label="Eliminar"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];


  const [newData, setNewData] = useState([
    { id: 1, pregunta: 'Pregunta 1', texto: 'Texto 1', opcion: 'Opción 1' },
    { id: 2, pregunta: 'Pregunta 2', texto: 'Texto 2', opcion: 'Opción 2' },
    // Agrega más datos según tus necesidades
  ]);

  // ...

  // Columnas de la nueva DataGrid
  const newColumns = [
    { field: 'pregunta', headerName: 'Pregunta', width: 200, flex: 1 },
    { field: 'texto', headerName: 'Texto', width: 200, flex: 1 },
    { field: 'opcion', headerName: 'Opción', width: 200, flex: 1 },
  ];

  const [is_buscar, set_is_buscar] = useState<boolean>(false);
  const handle_open_buscar = (): void => {
    set_is_buscar(true);
  };
  const navigate = useNavigate();
  const miEstilo = {
    position: 'relative',
    background: '#FAFAFA',
    borderRadius: '15px',
    p: '20px',
    m: '10px 0 20px 0',
    mb: '20px',
    boxShadow: '0px 3px 6px #042F4A26',
};
  return (
    <>
      <Grid container
        spacing={2} m={2} p={2}
        sx={miEstilo}
      >
        <Title title="Encabezado" />

        <Grid item xs={12} sm={4}>
          <TextField
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            label="Nombre de encuesta "
            fullWidth
            name="Nombre de encuesta "
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">es principal </InputLabel>
            <Select
              labelId="es-principal-select-label"
              id="es-principal-select"
              required

              label="es principal "

            >
              <MenuItem value="true" >Sí</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            variant="outlined"
            size="small"
            label="Descripción"
            fullWidth
            multiline
            rows={3}
            InputLabelProps={{
              shrink: true,
            }}
            name="Descripción"

          />
        </Grid>



      </Grid>
      <Grid container
        spacing={2} m={2} p={2}
        sx={miEstilo}
      >

        <Title title="Detalle - Pregunta" />


        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            label="Texto pregunta "
            fullWidth
            name="Texto pregunta "
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button startIcon={<SaveIcon />} color='success' variant="contained"    >
            crear pregunta
          </Button>
        </Grid>


        <Grid item xs={12} sm={4}>
          <TextField
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            label="Adicionar opciones"
            fullWidth
            name="Adicionar opciones"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button startIcon={<SaveIcon />} color='success' variant="contained"    >
            Adicionar
          </Button>
        </Grid>
        {/* <div style={{ height: 300, width: '40%',marginTop:"20px", }}> */}
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
          {/* </div> */}
        </Grid>
      </Grid>
      <Grid container
        spacing={2} m={2} p={2}
        sx={miEstilo}
      >
        <Title title="Preguntas asociadas " />
        <Grid item xs={12}>
          <DataGrid
            density="compact"
            autoHeight
            rows={newData}
            columns={newColumns}
            rowsPerPageOptions={[5]}
            pageSize={5}
            disableSelectionOnClick
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



        <Grid item xs={12} sm={1.2}>
          <Button onClick={() => { navigate("/app/gestor_documental/encuesta_datos/datos") }} fullWidth variant="outlined"    >
            informe
          </Button>
        </Grid>
        <Grid item xs={12} sm={1.2}>
          <Button color='success' fullWidth variant="contained"    >
            guardar
          </Button>
        </Grid>
        <Grid item xs={12} sm={1.2}>
          <Button color='error' fullWidth variant="outlined"    >
            borrar
          </Button>
        </Grid>
        <Grid item xs={12} sm={1.2}>
          <Button fullWidth variant="outlined"    >
            limpiar
          </Button>
        </Grid>
        <Grid item xs={12} sm={1.2}>
          <Button onClick={handle_open_buscar} fullWidth variant="contained"    >
            buscar
          </Button>
        </Grid>
        
        <Grid item xs={12} sm={1}>
          <ButtonSalir/> 
        </Grid> 
      </Grid>

      <Buscar is_modal_active={is_buscar} set_is_modal_active={set_is_buscar} />

    </>
  );
};