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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BarChartIcon from '@mui/icons-material/BarChart';
import React, { useState } from 'react';
import { api } from "../../../../api/axios";
import { Title } from "../../../../components";
import { control_error, control_success } from "../../../../helpers";



const miEstilo = {
  position: 'relative',
  background: '#FAFAFA',
  borderRadius: '15px',
  p: '20px',
  m: '10px 0 20px 0',
  mb: '20px',
  boxShadow: '0px 3px 6px #042F4A26',
};


export const Encabezado: React.FC = () => {


  interface Pregunta {
    opciones_rta: Array<{ opcion_rta: string }>;
  }

  const handleDeleteOption = (opcionToDelete: string) => {
    const updatedRows = gridRows.filter(row => row.opciones !== opcionToDelete);
    setGridRows(updatedRows);
    setFormData((prevData) => {
      const newFormData = { ...prevData };
      newFormData.preguntas.forEach((pregunta: Pregunta) => {
        pregunta.opciones_rta = pregunta.opciones_rta.filter(
          (opcion) => opcion.opcion_rta !== opcionToDelete
        );
      });
      return newFormData;
    });
  };


  const columns = [
    {
      field: 'opciones',
      headerName: 'Opciones',
      width: 200,
      flex: 1
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 200,
      flex: 1,
      renderCell: (params: any) => (
        <>
          <IconButton
            color="primary"
            aria-label="Eliminar"
            onClick={() => handleDeleteOption(params.row.opciones)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ];
  const [is_buscar, set_is_buscar] = useState<boolean>(false);
  const handle_open_buscar = (): void => {
    set_is_buscar(true);
  };

  const navigate = useNavigate();

  const initialFormData = {
    nombre_encuesta: "",
    descripcion: "",
    activo: true,

    preguntas: [
      {
        redaccion_pregunta: "",
        opciones_rta: []
      }
    ]
  };

  const [loading, setLoading] = useState(false);
  const [tempOption, setTempOption] = useState<string>("");
  const [formData, setFormData] = useState(initialFormData);
  const [hasError, setHasError] = useState(false);

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

            (newFormData.preguntas[qIndex] as any).opciones_rta[opIndex][field] = value;
          } else {
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
      setFormData(initialFormData);
      control_success("encuesta creada exitodamente ")
      setLoading(true);
    } catch (error) {
      console.error('Error al crear la encuesta:', error);
      control_error(`Error al crear la encuesta `,)
    } finally {
      setLoading(false);

      setFormData(initialFormData);
    }
  };

  const addNewOption = (preguntaIndex: number, tempOption: string) => {
    if (!tempOption.trim()) { // Si el campo está vacío
      setHasError(true);
      control_error(`no se puede adicionar un campo vacío`,)
      return; // No añadir la opción
    }

    setHasError(false);
    setFormData((prevData: any) => {
      const newFormData = { ...prevData };
      newFormData.preguntas[preguntaIndex].opciones_rta.push({ opcion_rta: tempOption });
      return newFormData;
    }); setGridRows((prevRows) => [
      ...prevRows,
      { opciones: tempOption, acciones: <IconButton><DeleteIcon /></IconButton> }
    ]);
    setTempOption("");

  };
  const [gridRows, setGridRows] = useState<any[]>([]);

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
            label="Nombre de encuesta"
            fullWidth
            name="nombre_encuesta"
            value={formData.nombre_encuesta}
            onChange={handleInputChange}
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
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            size="small"
            label="Descripción"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            multiline
            rows={3}
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
      <Grid container
        spacing={2} m={2} p={2}
        sx={miEstilo}
      >
        <Title title="Detalle - Pregunta" />
        <Grid item xs={12} >
          {formData.preguntas.map((pregunta, index) => (
            <div key={index}>
              <TextField
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                label={`Texto pregunta   `}
                fullWidth
                name={`preguntas[${index}].redaccion_pregunta`}
                value={pregunta.redaccion_pregunta}
                onChange={(event) =>
                  handleInputChange({
                    target: {
                      name: `preguntas[${index}].redaccion_pregunta`,
                      value: event.target.value,
                    },
                  })}
              /> </div>
          ))}
        </Grid>
        <Grid item spacing={2} container>
          <Grid item xs={12} sm={4}>
            {formData.preguntas.map((pregunta, index) => (
              <div key={index}>
                <TextField
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label={`Nueva opción`}
                  fullWidth
                  value={tempOption}
                  onChange={(event) => setTempOption(event.target.value)}
                  error={hasError} 
                  helperText={hasError ? "no se puede adicionar un campo vacío" : ""}
                />
              </div>
            ))}
          </Grid>
          <Grid item xs={12} sm={1.2}>
            {formData.preguntas.map((pregunta, index) => (
              <div key={index}>
                <Button
                  onClick={() => addNewOption(index, tempOption)}
                  startIcon={<SaveIcon />}
                  color='success'
                  variant="contained"
                >
                  Adicionar
                </Button>
              </div>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button startIcon={<SaveIcon />} color='success' variant="contained"    >
            crear pregunta
          </Button>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            density="compact"
            autoHeight
            rows={gridRows}
            columns={columns}
            rowsPerPageOptions={[5]}
            pageSize={5}
            disableSelectionOnClick
            getRowId={(row) => row.opciones}
          />
        </Grid>

      </Grid>
      <Grid container
        spacing={2} m={2} p={2}
        sx={miEstilo}
      >
        <Grid item xs={12} sm={1.2}>
          <Button onClick={handleSubmit} disabled={loading} startIcon={<SaveIcon />} color='success' fullWidth variant="contained"    >
            guardar
          </Button>
        </Grid>
        <Grid item xs={12} sm={1.2}>
          <Button startIcon={<BarChartIcon />} onClick={() => { navigate("/app/gestor_documental/encuesta_datos/datos") }} fullWidth variant="outlined"    >
            informe
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
          <Button fullWidth variant="outlined"    >
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