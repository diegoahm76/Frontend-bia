/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button, Dialog, FormControl, Grid, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, RadioGroup } from "@mui/material";
import { control_warning } from "../../../almacen/configuracion/store/thunks/BodegaThunks";
import { Pregunta, initialFormData, miEstilo } from "../interfaces/types";
import { control_error, control_success } from "../../../../helpers";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FormControlLabel from '@mui/material/FormControlLabel';
import CleanIcon from '@mui/icons-material/CleaningServices';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BarChartIcon from '@mui/icons-material/BarChart';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ReplyIcon from '@mui/icons-material/Reply';
import ClearIcon from '@mui/icons-material/Clear';
import { TablaEncuesta } from "./TablaEncuesta";
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { Title } from "../../../../components";
import { api } from "../../../../api/axios";
import Radio from '@mui/material/Radio';
import { Buscar } from "./Buscar";


export const Encabezado: React.FC = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [gridRows, setGridRows] = useState<any[]>([]);
  const [tempOption, setTempOption] = useState<string>("");
  const [formData, setFormData] = useState(initialFormData);
  const [tempQuestions, setTempQuestions] = useState<any[]>([]);
  const [itemYaUsado, setItemYaUsado] = useState<boolean>(false);
  const [questionGridRows, setQuestionGridRows] = useState<any[]>([]);
  const [isVerModalAbierto, setIsVerModalAbierto] = useState<boolean>(false);
  const [selectedEncuestaId, setSelectedEncuestaId] = useState<number | null>(null);
  const [opcionesActuales, setOpcionesActuales] = useState<Array<{ opcion_rta: string }>>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);


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
          <IconButton
            color="primary"
            aria-label="Editar"
            disabled={itemYaUsado}
            onClick={() => {
              setSelectedOption(params.row.opciones);
              setTempOption(params.row.opciones);
            }}
          >
            <EditIcon />
          </IconButton>


        </>
      )
    }
  ];
  const [is_buscar, set_is_buscar] = useState<boolean>(false);
  const handle_open_buscar = (): void => {
    set_is_buscar(true);
  };

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


  const addNewOption = (preguntaIndex: number, tempOption: string) => {
    if (!tempOption.trim()) { // Si el campo está vacío
      setHasError(true);
      control_error(`no se puede adicionar un campo vacío`,)
      return; // No añadir la opción
    }
    // const existeOpcion = formData.preguntas[preguntaIndex].opciones_rta.some(opcion => opcion.opcion_rta === tempOption);
    const existeOpcion = formData.preguntas[preguntaIndex]?.opciones_rta?.some((opcion: { opcion_rta: string }) => opcion.opcion_rta === tempOption);

    if (existeOpcion) {
      control_error(`La opción "${tempOption}" ya existe para esta pregunta.`);
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

  const abrirVerModal = (opciones: Array<{ opcion_rta: string }>) => {
    setOpcionesActuales(opciones);
    setIsVerModalAbierto(true);
  };

  const cerrarVerModal = (): void => {
    setIsVerModalAbierto(false);
  };


  const [editMode, setEditMode] = useState<boolean>(false);
  const startEditQuestion = (id: string) => {
    const questionToEdit = tempQuestions.find(q => q.redaccion_pregunta === id);
    if (questionToEdit) {
      setFormData({
        ...formData,
        preguntas: [questionToEdit]
      });
      setGridRows(questionToEdit.opciones_rta.map((opt: { opcion_rta: any; }) => ({ opciones: opt.opcion_rta })));
      handleDeleteQuestion(id); // Elimina la pregunta original de la lista temporal
      setEditMode(true); // Cambia al modo de edición
    }
  };

  const questionColumns: GridColDef[] = [
    {
      field: 'pregunta',
      headerName: 'Pregunta',
      width: 200,
      flex: 1
    },
    {
      field: 'ver_opciones',
      headerName: 'Ver opciones',
      width: 200,
      flex: 1,
      renderCell: (params: any) => (
        <>
          <IconButton
            color="primary"
            aria-label="Ver"
            onClick={() => {
              const pregunta = params.row.id;
              const opciones = tempQuestions.find(q => q.redaccion_pregunta === pregunta)?.opciones_rta || [];
              abrirVerModal(opciones);
            }}
          >
            <VisibilityIcon />
          </IconButton>


        </>

      )
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
            disabled={itemYaUsado}
            onClick={() => handleDeleteQuestion(params.row.id)} // Añadir un manejador para eliminar preguntas
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="Editar"
            disabled={itemYaUsado}
            onClick={() => startEditQuestion(params.row.id)}
          >
            <EditIcon />
          </IconButton>

        </>
      )
    }
  ];
  const handleDeleteQuestion = (id: any) => {
    const updatedTempQuestions = tempQuestions.filter(question => question.redaccion_pregunta !== id);
    const updatedRows = questionGridRows.filter(row => row.id !== id);
    setTempQuestions(updatedTempQuestions);
    setQuestionGridRows(updatedRows);
  };
  const addNewQuestion = () => {

    const newQuestion = formData.preguntas[0]
    if (editMode) {
      // setTempQuestions([...tempQuestions, newQuestion]); // Actualiza la lista temporal de preguntas
      setEditMode(false); // Sal del modo de edición
      setTempQuestions([...tempQuestions, newQuestion]);
      setQuestionGridRows([...questionGridRows, { id: newQuestion.redaccion_pregunta, pregunta: newQuestion.redaccion_pregunta }]);
    }
    // else {
    //   setTempQuestions([...tempQuestions, newQuestion]);
    //   setQuestionGridRows([...questionGridRows, { id: newQuestion.redaccion_pregunta, pregunta: newQuestion.redaccion_pregunta }]);
    // }
    if (!newQuestion.redaccion_pregunta.trim()) {
      control_error('El campo de texto de la pregunta no puede estar vacío.');
      return;
    }
    // Validación 2: Debe haber al menos una opción agregada
    if (newQuestion.opciones_rta.length === 0) {
      control_error('Debe agregar al menos una opción para la pregunta.');
      return;
    }
    const existingQuestion = tempQuestions.find(q => q.redaccion_pregunta === newQuestion.redaccion_pregunta);
    if (existingQuestion) {
      control_error('Ya existe una pregunta con el mismo texto. Por favor ingrese una pregunta diferente.');
      return;
    }
    setTempQuestions([...tempQuestions, newQuestion]);
    setQuestionGridRows([...questionGridRows, { id: newQuestion.redaccion_pregunta, pregunta: newQuestion.redaccion_pregunta }]);
    setFormData({
      ...formData,
      preguntas: [
        {
          redaccion_pregunta: "",
          opciones_rta: []
        }
      ]
    });
    setGridRows([]);
  };
  useEffect(() => {
    const fetchEncuestaDetalle = async () => {
      if (selectedEncuestaId) {  // Solo haz la llamada si selectedEncuestaId tiene un valor válido
        try {
          const res = await api.get(`/gestor/encuestas/encabezado_encuesta/get/detalle/${selectedEncuestaId}/`);
          if (res.data.success) {
            const { preguntas, nombre_encuesta, descripcion, activo } = res.data.data;
            setItemYaUsado(res.data.data.item_ya_usado);
            // Prepara los datos para ser mostrados en el DataGrid
            const newGridRows = (preguntas || []).map((pregunta: { redaccion_pregunta: any; }) => ({
              id: pregunta.redaccion_pregunta,
              pregunta: pregunta.redaccion_pregunta
            }));
            setQuestionGridRows(newGridRows); // Setea las filas del grid de preguntas
            setTempQuestions(preguntas || []); // Actualiza tempQuestions con las preguntas obtenidas
            // Aquí establecemos los campos en el estado para que se muestren en los TextField
            setFormData((prevData) => ({
              ...prevData,
              nombre_encuesta,
              descripcion,
              activo
            }));
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    void fetchEncuestaDetalle();
  }, [selectedEncuestaId]);  // El useEffect se ejecutará cada vez que selectedEncuestaId cambie
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (!formData.nombre_encuesta.trim()) {
      control_error('Campo obligatorio: Nombre de encuesta');
      return;
    }
    if (!formData.activo.toString().trim()) {
      control_error('Campo obligatorio: Activo');
      return;
    }
    if (!formData.descripcion.trim()) {
      control_error('Campo obligatorio: Descripción');
      return;
    }
    if (tempQuestions.length === 0) {
      control_error('Debe agregar al menos una pregunta.');
      return;
    }

    setLoading(true);
    try {
      if (selectedEncuestaId) { // Si hay un selectedEncuestaId, actualizamos
        const response = await api.put(`/gestor/encuestas/encabezado_encuesta/update/${selectedEncuestaId}/`, {
          ...formData,
          preguntas: tempQuestions
        });



        //  console.log('')('Encuesta actualizada exitosamente:', response.data);
        control_success("Encuesta actualizada con éxito");
        setItemYaUsado(false);
        handleClear();
        setSelectedEncuestaId(null);
      }
      else { // De lo contrario, creamos una nueva
        const response = await api.post('/gestor/encuestas/encabezado_encuesta/create/', {
          ...formData,
          preguntas: tempQuestions
        });
        //  console.log('')('Encuesta creada exitosamente:', response.data);
        control_success("Encuesta creada con éxito");
        setItemYaUsado(false)
        handleClear();
      }
      setFormData(initialFormData);
      setTempQuestions([]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      control_error(error);
      setLoading(false);
    }
  };
  const handleClear = () => {
    setFormData(initialFormData);
    setTempQuestions([]);
    setGridRows([]);
    setQuestionGridRows([]);
    setSelectedOption(null);
    setItemYaUsado(false);
    // setSelectedEncuestaId(null);
    setTempOption("");
    setEditMode(false);
    setFormData({
      ...formData,
      // nombre_encuesta: "",
      descripcion: "",
      activo: "",
      preguntas: [
        {
          redaccion_pregunta: "",
          opciones_rta: []
        }
      ]
    });
    setFormData((prevData) => ({
      ...prevData,
      preguntas: prevData.preguntas.map((pregunta) => ({
        ...pregunta,
        redaccion_pregunta: "", // Establece el texto de pregunta como una cadena vacía
      })),
    }));
  };
  useEffect(() => {
    if (itemYaUsado) {
      control_warning('El ítem ha sido usado, no se podra actualizar ni eliminar ');
    }
  }, [itemYaUsado]);
  const deleteEncuesta = async () => {
    if (selectedEncuestaId) {
      try {
        const res = await api.delete(`/gestor/encuestas/encabezado_encuesta/delete/${selectedEncuestaId}/`);
        if (res.data.success) {
          control_success('Encuesta eliminada con éxito ');
          handleClear();
        } else {
          console.error('Error al eliminar la encuesta:', res.data.message || 'Error desconocido');
        }
      } catch (error) {
        console.error('Error al eliminar la encuesta:', error);
        control_error('Error al eliminar la encuesta:');

      }
    } else {
      console.error('No se ha seleccionado una encuesta para eliminar');
      control_error('No se ha seleccionado una encuesta para eliminar');
    }
  };
  const [showContent, setShowContent] = useState(false);

  const handleUpdateOption = (oldOption: string, newOption: string) => {
    setGridRows(prevRows => {
      return prevRows.map(row => row.opciones === oldOption ? { ...row, opciones: newOption } : row);
    });
    setFormData(prevData => {
      const newFormData = { ...prevData };
      newFormData.preguntas.forEach((pregunta: { opciones_rta: { opcion_rta: string, id_opcion_rta?: number }[] }) => {
        pregunta.opciones_rta = pregunta.opciones_rta.map(
          opcion => opcion.opcion_rta === oldOption ? { ...opcion, opcion_rta: newOption } : opcion  // Mantener el id_opcion_rta
        );
      });
      return newFormData;
    });
    setSelectedOption(null);
    setTempOption("");
  };


  const [valorSeleccionado, setValorSeleccionado] = useState('');

  const handleSeleccion = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setValorSeleccionado(event.target.value);
  };

  return (
    <>
      <>
        {showContent || selectedEncuestaId ? (
          // Si selectedEncuestaId tiene un valor, muestra todo el código a continuación:
          <>
            <Grid container
              spacing={2} m={2} p={2}
              sx={miEstilo}
            >
              <Title title="Encabezado" />
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  size="small"
                  disabled={itemYaUsado || selectedEncuestaId !== null}
                  required fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Nombre de encuesta"
                  name="nombre_encuesta"
                  value={formData.nombre_encuesta}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel shrink>Activo</InputLabel>
                  <Select
                    labelId="activo-label"
                    required name="activo"
                    disabled={itemYaUsado}
                    value={formData.activo.toString()} // Convierte el valor booleano a cadena
                    onChange={handleInputChange}
                  >
                    <MenuItem value="true">Sí</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  size="small"
                  required rows={3}
                  disabled={itemYaUsado}
                  label="Descripción"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth multiline
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
                      label={`Texto de pregunta`}
                      fullWidth
                      disabled={itemYaUsado}
                      name={`preguntas[${index}].redaccion_pregunta`}
                      value={pregunta.redaccion_pregunta}
                      onChange={(event) =>
                        handleInputChange({
                          target: {
                            name: `preguntas[${index}].redaccion_pregunta`,
                            value: event.target.value,
                          },
                        })} /> </div>
                ))}
              </Grid>

              <Grid item spacing={2} container>
                <Grid item xs={12} sm={3}></Grid>
                <Grid item xs={12} sm={3}>
                  {formData.preguntas.map((pregunta, index) => (
                    <div key={index}>
                      <TextField
                        variant="outlined"
                        size="small" fullWidth
                        disabled={itemYaUsado}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        label={`Nueva opción`}
                        value={tempOption}
                        onChange={(event) => {
                          const inputValue = event.target.value;
                          if (inputValue.length <= 10) {
                            setTempOption(inputValue);
                            setHasError(false); // Si la longitud es válida, elimina el error
                          } else {
                            setHasError(true); // Si la longitud es superior a 10, muestra un error
                          }
                        }}
                        error={hasError}
                        helperText={hasError ? "Máximo 10 caracteres" : ""}
                      />
                    </div>
                  ))}
                </Grid>
                <Grid item xs={12} sm={1.2}>
                  {formData.preguntas.map((pregunta, index) => (
                    <div key={index}>

                      <Button
                        onClick={() => {
                          if (selectedOption) {
                            // Código para actualizar el ítem
                            handleUpdateOption(selectedOption, tempOption);
                          } else {
                            addNewOption(index, tempOption);
                          }
                        }}
                        startIcon={<SaveIcon />}
                        color='success'
                        disabled={itemYaUsado}
                        variant="contained"
                      >
                        {selectedOption ? "Actualizar" : "Adicionar"}
                      </Button>

                    </div>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <Button
                  onClick={addNewQuestion}
                  startIcon={<SaveIcon />}
                  color='success'
                  disabled={itemYaUsado}
                  variant="contained"
                >
                  {editMode ? 'Actualizar Pregunta' : 'Crear Pregunta'}
                </Button>

              </Grid>
              {/* <h1> {selectedEncuestaId}</h1> */}
              <Grid item xs={12}>
                <DataGrid
                  autoHeight
                  pageSize={5}
                  rows={gridRows ?? []}
                  columns={columns ?? []}
                  density="compact"
                  disableSelectionOnClick
                  rowsPerPageOptions={[5]}
                  getRowId={(row) => row.opciones}
                />
              </Grid>

            </Grid>
            <Grid container
              spacing={2} m={2} p={2} sx={miEstilo} >
              <Grid item xs={12}>
                <Title title={` Opciones`} />
              </Grid>
              <Dialog open={isVerModalAbierto} onClose={cerrarVerModal} maxWidth="xl" >
                <Grid container sx={miEstilo}  >
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <Grid item xs={12} marginLeft={2} marginRight={2} marginTop={-1}>
                            <Title title={` Opciones de respuesta `} />
                          </Grid>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <RadioGroup
                          aria-label="Opciones de respuesta"
                          name="opciones-respuesta"
                          value={valorSeleccionado}
                          onChange={handleSeleccion}
                        >
                          {opcionesActuales.map((opcion, index) => (
                            <TableRow key={index}>
                              <TableCell> <FormControlLabel value={opcion.opcion_rta} control={<Radio />} label={opcion.opcion_rta} /> </TableCell>
                            </TableRow>
                          ))}
                        </RadioGroup>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Grid container spacing={2} justifyContent="flex-end" >
                    <Grid marginTop={4} >
                      <Button onClick={cerrarVerModal} color='error' variant="contained" fullWidth startIcon={<ClearIcon />}  >
                        Salir
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Dialog>
              <Grid item xs={12}>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={questionGridRows ?? []}
                  columns={questionColumns}
                  rowsPerPageOptions={[5]}
                  pageSize={5}
                  disableSelectionOnClick
                  getRowId={(row) => row.id}
                />
              </Grid>
            </Grid>
            <Grid container
              spacing={2} m={2} p={2} sx={miEstilo} >
              <Grid item xs={12} sm={1.4}>
                <Button startIcon={<BarChartIcon />} onClick={() => { navigate("/app/gestor_documental/encuesta_datos/datos") }} fullWidth variant="outlined"    >
                  informe
                </Button>
              </Grid>
              <Grid item xs={12} sm={1.4}>
                <Button disabled={itemYaUsado} onClick={handleSubmit} startIcon={<SaveIcon />} color='success' fullWidth variant="contained">
                  {selectedEncuestaId ? "Actualizar" : "Guardar"}
                </Button>
              </Grid>
              <Grid item xs={12} sm={1.4}>
                <Button disabled={itemYaUsado} startIcon={<DeleteForeverIcon />} color='error' onClick={deleteEncuesta} fullWidth variant="outlined"    >
                  eliminar
                </Button>
              </Grid>
              <Grid item xs={12} sm={1.4}>
                <Button startIcon={<SearchIcon />} onClick={handle_open_buscar} fullWidth variant="contained"    >
                  buscar
                </Button>
              </Grid>
              <Grid item xs={12} sm={1.4}>
                <Button disabled={itemYaUsado}
                  onClick={handleClear} color='primary' variant="outlined" fullWidth startIcon={<CleanIcon />}
                >
                  Limpiar
                </Button>
              </Grid>
              <Grid item xs={12} sm={1.4}>
                <Button variant="contained" color='error' onClick={() => {
                  setShowContent(false); handleClear(); setSelectedEncuestaId(null); setFormData({
                    ...formData,
                    nombre_encuesta: "",
                    descripcion: "",
                    activo: "",
                    preguntas: [
                      {
                        redaccion_pregunta: "",
                        opciones_rta: []
                      }
                    ]
                  });
                }} startIcon={<ReplyIcon />}>
                  Regresar
                </Button>
              </Grid>
            </Grid>
            <Buscar handleClear={handleClear} setSelectedEncuestaId={setSelectedEncuestaId} is_modal_active={is_buscar} set_is_modal_active={set_is_buscar} />
          </>
        ) : (
          <>
            <TablaEncuesta setShowContent={setShowContent} handleClear={handleClear} setSelectedEncuestaId={setSelectedEncuestaId} is_modal_active={is_buscar} />
          </>
        )}
      </>
    </>
  );
};

