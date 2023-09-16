/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormControl, Grid, Button, TextField } from "@mui/material";
import { InputLabel, MenuItem, Select, } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Buscar } from "./Buscar";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { ButtonSalir } from "../../../../components/Salir/ButtonSalir";
import PrintIcon from '@mui/icons-material/Print';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BarChartIcon from '@mui/icons-material/BarChart';
import React, { useState } from 'react';
import { api } from "../../../../api/axios";
import { Title } from "../../../../components";
import axios from "axios";






export const SucursalEntidadd: React.FC = () => {
const initialFormData = {
  nombre_encuesta: "Encuenta  123",
  descripcion: "",
  activo: true,

  preguntas: [
    {
      redaccion_pregunta: "",
      opciones_rta: [{ opcion_rta: "" }, { opcion_rta: "" }]
    }
  ]
};
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






  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
  
    if (name.startsWith("preguntas")) {
      const match = name.match(/^preguntas\[(\d+)\](?:\.opciones_rta\[(\d+)\])?\.(\w+)$/);
      if (match) {
        const qIndex = parseInt(match[1]);
        const opIndex = match[2] !== undefined ? parseInt(match[2]) : null;
        const field = match[3];
  
        setFormData(prevData => {
          const newFormData = { ...prevData };
          if (opIndex !== null) {

            // newFormData.preguntas[qIndex].opciones_rta[opIndex][field] = value;
              (newFormData.preguntas[qIndex] as any).opciones_rta[opIndex][field] = value;
          } else {
            // newFormData.preguntas[qIndex][field] = value;
            (newFormData.preguntas[qIndex] as any)[field] = value;
          }
          return newFormData;
        });
        return;
      }
    }
  
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/gestor/encuestas/encabezado_encuesta/create/', formData);

      console.log('Encuesta creada exitosamente:', response.data);
      // Resto de tu lógica después de la creación exitosa
    } catch (error) {
      console.error('Error al crear la encuesta:', error);
      // Manejo de errores
    } finally {
      setLoading(false);
    }
  };




  return (
    <>
      <Grid container
        spacing={2} m={2} p={2}
        sx={miEstilo}
      >

        <>
          <Grid container spacing={2} m={2} p={2}>
            <Title title="Encabezado" />
            <form onSubmit={handleSubmit}>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Nombre de encuesta"
                  fullWidth
                  name="nombre_encuesta"
                  value={formData.nombre_encuesta}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Descripción"
                  fullWidth
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                />
              </Grid>
              {/* Campos de preguntas */}
              {formData.preguntas.map((pregunta, index) => (
                <div key={index}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label={`Pregunta ${index + 1}`}
                      fullWidth
                      name={`preguntas[${index}].redaccion_pregunta`}
                      value={pregunta.redaccion_pregunta}
                      onChange={(event) =>
                        handleInputChange({
                          target: {
                            name: `preguntas[${index}].redaccion_pregunta`,
                            value: event.target.value,
                          },
                        })
                      }
                    />
                  </Grid>
                  {/* Campos de opciones de respuesta */}
                  {pregunta.opciones_rta.map((opcion, opIndex) => (
                    <Grid item xs={12}  key={opIndex}>
                      <TextField
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        label={`Opción ${opIndex + 1}`}
                        fullWidth
                        name={`preguntas[${index}].opciones_rta[${opIndex}].opcion_rta`}
                        value={opcion.opcion_rta}
                        onChange={(event) =>
                          handleInputChange({
                            target: {
                              name: `preguntas[${index}].opciones_rta[${opIndex}].opcion_rta`,
                              value: event.target.value,
                            },
                          })
                        }
                      />
                    </Grid>
                  ))}
                </div>
              ))}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  Crear Encuesta
                </Button>
              </Grid>
            </form>
          </Grid>
        </>

  
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
          <Button startIcon={<BarChartIcon />} onClick={() => { navigate("/app/gestor_documental/encuesta_datos/datos") }} fullWidth variant="outlined"    >
            informe
          </Button>
        </Grid>
        <Grid item xs={12} sm={1.2}>
          <Button startIcon={<SaveIcon />} color='success' fullWidth variant="contained"    >
            guardar
          </Button>
        </Grid>
        <Grid item xs={12} sm={1.2}>

          <Button startIcon={<DeleteForeverIcon />} color='error' fullWidth variant="outlined"    >
            borrar
          </Button>
        </Grid>
        <Grid item xs={12} sm={1.2}>
          <Button startIcon={<SearchIcon />} onClick={handle_open_buscar} fullWidth variant="contained"    >
            buscar
          </Button>
        </Grid>
        <Grid item xs={12} sm={1.2}>
          <Button startIcon={<PrintIcon />} fullWidth variant="outlined"    >
            limpiar
          </Button>
        </Grid>


        <Grid item xs={12} sm={1}>
          <ButtonSalir />
        </Grid>
      </Grid>

      <Buscar is_modal_active={is_buscar} set_is_modal_active={set_is_buscar} />

    </>
  );
};