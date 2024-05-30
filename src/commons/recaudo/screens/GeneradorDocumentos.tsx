/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Button,
  Chip,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { SetStateAction, useEffect, useState } from 'react';
import { Title } from '../../../components';
import { useSelector } from 'react-redux';
import { api, baseURL } from '../../../api/axios';
import { control_error, control_success } from '../../../helpers';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import FeedIcon from '@mui/icons-material/Feed';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import UploadIcon from '@mui/icons-material/Upload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FormularioGenerador } from '../components/generadorDocs/FormularioGenerador';
import { VisorDocumentos } from '../components/GeneradorDocumentos/VisorDocumentos';
import { resetBandejaDeTareas } from '../../gestorDocumental/bandejaDeTareas/toolkit/store/BandejaDeTareasStore';
import { useAppDispatch } from '../../../hooks';
import { BusquedaPersonasGenerador } from '../components/GeneradorDocumentos/BusquedaPersonas';
import swal from 'sweetalert2';
import { LoadingButton } from '@mui/lab';
export interface UnidadOrganizacional {
  codigo: any;
  nombre: string;
  tiene_configuracion: any;
  id_unidad_organizacional: number;
}
interface TipoRadicado {
  value: string;
  label: string;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const GeneradorDocumentos: React.FC = () => {

  const [lideresUnidad, setLideresUnidad] = useState<string[]>([]); // Asumiendo que es un string
  const [file, setFile] = useState(''); //Archivo desde el server (plantilla)
  const [urlFile, setUrlFile] = useState<any>(null); //Archivo cargado desde local
  const [updateBorrador, setUpdateBorrador] = useState(false); //Se utiliza cuando se actualiza el borrador
  const [updateDocument, setUpdateDocument] = useState(false);
  const [sendTemplate, setSendTemplate] = useState(false);
  const [uplockFirma, setUplockFirma] = useState(false);
  const [isNewData, setIsNewData] = useState(false);
  const [isUploadDocument, setIsUploadDocument] = useState(false); //Se utiliza cuando se sube un documento
  const [hasConsecutivo, setHasConsecutivo] = useState(false);
  const [hasRadicado, setHasRadicado] = useState(false);
  const [cleanFields, setCleanFields] = useState(false);

  const [checked, setChecked] = useState(false);
  const [localChecked, setLocalChecked] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [contentData, setContentData] = useState<any>({}); // Datos para llenar el documento
  const [matchingData, setMatchingData] = useState<any>({}); // Datos para llenar el documento

  const [personaSelected, setpersona] = useState<any[]>([]);
  const urlBase = baseURL.replace("/api/", "");

  const [radicado_selected, set_radicado_selected] = useState('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetBandejaDeTareas());
    };
  }, []);


  const currentElement = useSelector((state: any) => state.BandejaTareasSlice.currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas);

  useEffect(() => {
    if(currentElement){
      removeFile()
      if(currentElement.documento?.id_consecutivo_tipologia){
          setCurrentBorrador(currentElement.documento);
          setHasConsecutivo(true);
          setUplockFirma(true);
          if(!currentElement.asignaciones?.firma || currentElement.asignaciones?.persona_firmo){
            setUplockFirma(false);
          }
        setFile(`${urlBase}${currentElement.documento.archivos_digitales.ruta_archivo}`)
      }

      if(currentElement.id_pqrsdf){
        search_pqrt(currentElement.id_pqrsdf);
      }

      if(currentElement.id_tramite && !currentElement?.id_pqrsdf && !currentElement?.documento){
        search_opa(currentElement.id_tramite);
      }
    }
    // console.log(currentElement);
  }, [currentElement])

  const search_pqrt = async (id: string) => {
    try {
      const url = `gestor/pqr/get_pqrsdf-panel/${id}/`;
      const response = await api.get(url);
      console.log(response.data);
      if(response?.data?.data){
        control_success('Datos cargados correctamente, elige la plantalla correspondiente');
        setContentData(response.data.data);
      }
    } catch (error: any) {
      control_error(error?.response?.data?.detail || 'No se encontraron datos');
    }
  }

  const search_opa = async (id: string) => {
    try {
      const url = `gestor/bandeja-tareas/opa/tramite/detalle/get/${id}/`;
      const response = await api.get(url);
      console.log(response);
      if(response?.data?.data){
        control_success('Datos cargados correctamente, elige la plantalla correspondiente');
        setContentData(response.data.data);
      }
    } catch (error: any) {
      control_error(error?.response?.data?.detail || 'No se encontraron datos');
    }
  }

  // Función para manejar el cambio en el select
  const handleradicado = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    set_radicado_selected(event.target.value);
  };
  const [tiposRadicado, setTiposRadicado] = useState<TipoRadicado[]>([]);

  const fetchTiposRadicado = async () => {
    try {
      const response = await api.get('/gestor/choices/tipo-radicado/');

      // Aseguramos que cada elemento mapeado cumpla con la interfaz TipoRadicado
      const tipos: TipoRadicado[] = response.data.map(
        ([value, label]: [string, string]) => ({ value, label })
      );
      setTiposRadicado(tipos);
    } catch (error: any) {
      control_error(error?.response?.data?.detail || 'No se encontraron tipos de radicado');
    }
  };

  useEffect(() => {
    fetchTiposRadicado();
  }, []);

  const [idPlantilla, setIdPlantilla] = useState('');
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState<any>(null);

  // Función para manejar el cambio en el select
  const handlePlantillaChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    const id_plantilla = event.target.value;
    cleanTemplate();
    setUpdateBorrador(false)
    setSendTemplate(false)
    setHasConsecutivo(false);
    setShowVariables(false);
    set_radicado_selected('');
    setUplockFirma(false);
    setIdPlantilla(id_plantilla)
    const currentPlantilla = plantillas.find(plantilla => plantilla.id_plantilla_doc === id_plantilla);
    if(currentPlantilla){
      setPlantillaSeleccionada(currentPlantilla);
    }

    if(!id_plantilla){
      setFile('');
      setPlantillaSeleccionada(null);
    }
  };

  const [idUnidadSeleccionada, setIdUnidadSeleccionada] = useState('');

  const [unidadSeleccionada, setUnidadSeleccionada] = useState('');

  const [unidades, setUnidades] = useState<UnidadOrganizacional[]>([]);
  const [plantillas, setPlantillas] = useState<any[]>([]);
  const [showVariables, setShowVariables] = useState(false);
  const [variablesPlantilla, setVariablesPlantilla] = useState<any[]>([]);
  const [currentBorrador, setCurrentBorrador] = useState<any>(null);

  const fetch_data_plantillas = async (): Promise<void> => {
    try {
      const url = `/gestor/plantillas/plantillas_documentos/get/`;
      const res: any = await api.get(url);
      let data: any = res.data.data;
      if(data.length === 0) control_error('No se encontraron plantillas disponibles');
      setPlantillas(data);
    } catch (error: any) {
      control_error(error?.response?.data?.detail || 'No se encontraron plantillas disponibles');
    }
  };

  const generateDocument = async (data: any) => {
    try {
      const url = `/gestor/trd/consecutivo-tipologia-doc/`;
      const resp: any = await api.post(url, data);
      if(resp.data.data){
        removeFile()
        if(sendTemplate) setHasConsecutivo(true);
        if(radicado_selected && sendTemplate && !hasConsecutivo) setHasRadicado(true);
        if(updateDocument && !hasRadicado && radicado_selected) setHasRadicado(true);
        if(isUploadDocument) setChecked(false);
        if(isUploadDocument && !hasRadicado && radicado_selected) setHasRadicado(true);
        if(updateBorrador || updateDocument || sendTemplate || isUploadDocument) setCurrentBorrador(resp.data.data)
        if(resp.data.data.archivos_digitales_copia){
          setFile(`${urlBase}${resp.data.data.archivos_digitales_copia.ruta_archivo}`)
        }else{
          setFile(`${urlBase}${resp.data.data.archivos_digitales.ruta_archivo}`)
        }
      }
    } catch (error: any) {
      if(!hasConsecutivo) setSendTemplate(false);
      control_error(error?.response?.data?.detail || 'Error al generar el documento');
    }
  };

  const uploadDocument = async (data: any) => {
    try {
      const url = `/gestor/trd/crear-documento-cargado/`;
      const resp: any = await api.post(url, data);
      if(resp.data.data){
        processPlantilla(resp.data.data, true);
        setCurrentBorrador(resp.data.data)
        setIsUploadDocument(true);
        if(!checked) setHasConsecutivo(true);
        control_success('Documento cargado correctamente');
      }
    } catch (error: any) {
      control_error(error?.response?.data?.detail || 'Error al cargar el documento');
    }
  };

  useEffect(() => {
    if(isUploadDocument && !checked){
      setHasConsecutivo(true);
    }
  }, [checked])

  const createAsignacionDocumento = async (body: any) => {
    try {
      const url = '/gestor/bandeja-tareas/asginacion/documentos/create/';
      const res = await api.post(url, body);
      return true;
    } catch (error: any) {
      return false;
    }
  };

  const fetchUnidades = async () => {
    try {
      const url =
        '/gestor/consecutivos-unidades/unidades_organigrama_actual/get/';
      const res = await api.get(url);
      const unidadesData = res.data.data;
      setUnidades(unidadesData);
    } catch (error: any) {
      control_error(error?.response?.data?.detail || 'No se encontraron unidades organizacionales');
    }
  };

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    setUrlFile(file);
    event.target.value = null;
  };

  const handleUpload = () => {
    const data = { plantilla: idPlantilla };

    const formData = new FormData();
    formData.append('archivo', urlFile);
    formData.append('data', JSON.stringify(data));

    uploadDocument(formData);
  };

  const handleChangeCheck = (event: any) => {
    setChecked(event.target.checked);
    setLocalChecked(event.target.checked)
  };

  const handleDelete = () => {
    if(isUploadDocument){
      swal.fire({
        title: '¿Estás seguro?',
        text: 'Al eliminar el archivo se perderá el progreso actual',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          cleanTemplate();
        }
      });
    }
    if(!isUploadDocument){
      setUrlFile(null);
    }
  };

  const removeFile = () => {
    setFile('');
  };

  useEffect(() => {
    fetchUnidades();
    fetch_data_plantillas();
  }, []);

  const processPlantilla = (plantilla: any, isUpload?: boolean) => {
    if(plantilla?.archivos_digitales){
      removeFile()
      setFile(`${urlBase}${plantilla.archivos_digitales.ruta_archivo}`)
      if(Object.keys(plantilla.variables).length){
        let variablesFiltradas = plantilla.variables.filter((variable: string) => variable !== 'consecutivo' && variable !== 'radicado' && variable !== 'fecha_radicado' && variable !== 'fecha_consecutivo');
        let newMatchingData: any = {};
        if (contentData?.id_PQRSDF || contentData?.id_persona_registra) {
          const keyscontentData = Object.keys(contentData.info_persona_titular);
          variablesFiltradas = variablesFiltradas.filter((variable: string) => {
            if (keyscontentData.includes(variable) && contentData.info_persona_titular[variable]) {
              newMatchingData[variable] = contentData.info_persona_titular[variable];
              return false;
            }
            return true;
          });
        }

        setMatchingData(newMatchingData);
        setVariablesPlantilla(variablesFiltradas);
      }
    }
  }

  useEffect(() => {
    processPlantilla(plantillaSeleccionada, false);
  }, [plantillaSeleccionada, contentData]);

  useEffect(() => {
    if (plantillaSeleccionada?.archivos_digitales && hasValue(matchingData)) {
      generateBorrador();
    }
  }, [matchingData])

  const hasValue = (obj: any) => {
    return Object.values(obj).some(valor => valor !== null && valor !== undefined && valor !== '');
  }

  const handleEdicion = () => {
    setShowVariables(true);
  }

  const cleanForm = () => {
    setCleanFields(true);
  }

  const saveData = (data: any) => {
    let sendData: any = {
      plantilla: idPlantilla,
      payload: {...data, ...matchingData},
    };
    if(hasValue(data) || hasValue(matchingData)){

      if(updateBorrador && !isUploadDocument){
        sendData.variable = 'B'
      }

      if(sendTemplate && !hasConsecutivo && !radicado_selected && !isUploadDocument){
        sendData.variable = 'DC'
      }

      if(radicado_selected && sendTemplate && !hasConsecutivo && !isUploadDocument){
        sendData.cod_tipo_radicado = radicado_selected;
        sendData.variable = 'DCR'
      }

      if(updateDocument && !isUploadDocument){
        if(!hasRadicado) {
          sendData.cod_tipo_radicado = radicado_selected;
        }
        sendData.variable = 'A'
        sendData.id_consecutivo = currentBorrador?.id_consecutivo_tipologia;
        setHasConsecutivo(true);
      }

      if(isUploadDocument){
        if(radicado_selected && !hasRadicado) {
          sendData.cod_tipo_radicado = radicado_selected;
        }
        sendData.variable = 'AC'
        sendData.consecutivo = checked;
        sendData.id_consecutivo = currentBorrador?.id_consecutivo_tipologia;
      }

      generateDocument(sendData);
    }else{
      control_error('No se han ingresado datos para actualizar el documento');
      if(!hasConsecutivo) setSendTemplate(false);
      if(isUploadDocument && !variablesPlantilla.length){
        if(radicado_selected && !hasRadicado) {
          sendData.cod_tipo_radicado = radicado_selected;
        }
        sendData.variable = 'AC'
        sendData.consecutivo = checked;
        sendData.id_consecutivo = currentBorrador?.id_consecutivo_tipologia;
        generateDocument(sendData);
      }
    }
  }

  const generateConsecutivo = () => {
    setUpdateBorrador(false);
    setIsNewData(true);
    setSendTemplate(true);
  }

  const generateBorrador = () => {
    if(sendTemplate){
      setUpdateDocument(true);
    }else{
      // set_radicado_selected('');
      setSendTemplate(false);
      setUpdateBorrador(true);
    }
    setIsNewData(true);
  }

  const updateUploadDoc = () => {
    setIsUploadDocument(true);
    setUpdateDocument(false);
    setSendTemplate(false);
    setUpdateBorrador(false);
    setIsNewData(true);
  }

  const sendDocument = async () => {
    if(personaSelected.length){
      setIsSending(true);
      let allSuccess = true;
      for (const persona of personaSelected) {
        const body = {
            id_consecutivo: currentBorrador?.id_consecutivo_tipologia,
            id_persona_asignada: persona.id,
            firma: persona.require_firma
        }
        const success = await createAsignacionDocumento(body);
        if (!success) allSuccess = false;
      }
      if (allSuccess) {
        if(personaSelected[0].require_firma) setUplockFirma(true);
        setVariablesPlantilla([]);
        setShowVariables(false);
        setSendTemplate(false);
        setUpdateBorrador(false);
        setHasConsecutivo(false);
        setHasRadicado(false);
        setpersona([]);
        setLideresUnidad([]);
        setCleanFields(true);
        setIsUploadDocument(false);
        set_radicado_selected('');

        setIsSending(false);
        if (personaSelected.length == 1) control_success('El documento se envió correctamente');
        if (personaSelected.length > 1) control_success('Todos los documentos se enviaron correctamente');

      } else {
        setIsSending(false);
        if (personaSelected.length == 1) control_error('Ocurrio un error al enviar el documento');
        if (personaSelected.length > 1) control_error('Hubo un error al enviar algunos documentos');
      }
    }
  }

  const alertCleanTemplate = () => {
    swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará todo el progreso actual',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        cleanTemplate();
      }
    });
  }

  const handleUploadAlert = () => {
    swal.fire({
      title: '¿Estás seguro?',
      text: 'Al subir un archivo se eliminará el progreso en la plantilla actual',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpload();
      }
    });
  };

  const cleanTemplate = () => {
    setIdPlantilla('');
    setPlantillaSeleccionada('');
    setVariablesPlantilla([]);
    setFile('');
    setUrlFile(null);
    setShowVariables(false);
    setSendTemplate(false);
    setUpdateBorrador(false);
    setHasConsecutivo(false);
    setHasRadicado(false);
    setpersona([]);
    setLideresUnidad([]);
    setCleanFields(true);
    setUplockFirma(false);
    setIsUploadDocument(false);
    dispatch(resetBandejaDeTareas());
  }

  return (
    <>
      <Grid
        container
        spacing={2}
        m={2}
        p={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          m: '10px 0 20px 0',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Title title="Generación de documento" />
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <TextField
              select
              size="small"
              value={idPlantilla}
              label="Plantilla"
              disabled={!plantillas.length}
              onChange={handlePlantillaChange}
              helperText={"Elige una plantilla"}
            >
              <MenuItem value=""><em>Seleccione una opción</em></MenuItem>
              {plantillas.map((plantilla) => (
              <MenuItem key={plantilla.id_plantilla_doc} value={plantilla.id_plantilla_doc}>
                {plantilla.nombre}
              </MenuItem>
            ))}

            </TextField>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <TextField
              select
              size="small"
              value={radicado_selected}
              label="Radicado"
              onChange={handleradicado}
              disabled={!idPlantilla || hasRadicado}
              helperText={"Elige un tipo de radicado"}
            >
              <MenuItem value="">Sin radicado</MenuItem>
              {tiposRadicado.map((tipo) => (
                <MenuItem key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Grid>
        {/* <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <TextField
              select
              size="small"
              id="unidad-organizacional-select"
              value={unidadSeleccionada}
              label="Unidad Organizacional"
              onChange={handleChange}
            >
              {unidades.map((unidad) => (
                <MenuItem
                  key={unidad.id_unidad_organizacional}
                  value={unidad.id_unidad_organizacional}
                  disabled={!unidad.tiene_configuracion} // Deshabilita el MenuItem si tiene_configuracion es false
                >
                  {unidad.nombre}
                </MenuItem>
                ))}
              </TextField>
              </FormControl>
          </Grid> */}
            {urlFile &&
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={urlFile.name}
                    fullWidth
                    size="small"
                    label="Documento local"
                    disabled
                  />
                </Grid>
                <Grid item>
                  <Button
                    onClick={handleDelete}
                    variant='outlined'
                    startIcon={<DeleteIcon />}
                  >
                    Borrar
                  </Button>
                </Grid>
                <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleChangeCheck}
                      color="primary"
                      disabled={isUploadDocument}
                    />
                  }
                  label={localChecked ? 'Requiere consecutivo' : 'No requiere consecutivo'}
                />
                </Grid>
                <Grid item>
                  <Button
                    variant='contained'
                    startIcon={<UploadIcon />}
                    onClick={handleUploadAlert}
                    disabled={isUploadDocument}
                  >
                    Cargar
                  </Button>
                </Grid>
              </>
            }
            <FormularioGenerador
              exCallback={saveData}
              isNewData={isNewData}
              setIsNewData={setIsNewData}
              variablesPlantilla={variablesPlantilla}
              showVariables={showVariables}
              cleanFields={cleanFields}
              setCleanFields={setCleanFields}
            ></FormularioGenerador>
            <Grid
              container
              spacing={2}
              my={2}
              mx={1}
              sx={{ display: 'flex', justifyContent: 'end' }}
            >
              {!showVariables && <Grid item>
                <Button
                  startIcon={<EditIcon />}
                  variant="contained"
                  onClick={handleEdicion}
                  disabled={!plantillaSeleccionada || variablesPlantilla.length === 0 || showVariables}
                >
                  Habilitar edición campos
                </Button>
              </Grid>}
              {/* {showVariables && plantillaSeleccionada && <Grid item>
                <Button
                  startIcon={<CleaningServicesIcon />}
                  variant="outlined"
                  onClick={cleanForm}
                >
                  Limpiar campos
                </Button>
              </Grid>} */}
              <Grid item>
                <Button
                  startIcon={<FeedIcon />}
                  variant="contained"
                  onClick={generateConsecutivo}
                  disabled={!plantillaSeleccionada || variablesPlantilla.length === 0 || sendTemplate || isUploadDocument}
                >
                  {radicado_selected ? 'Generar Consecutivo y Radicado' : 'Generar Consecutivo'}
                </Button>
              </Grid>
              {!isUploadDocument && <Grid item>
                <Button
                startIcon={sendTemplate ? <UpdateIcon /> : <VisibilityIcon />}
                variant="contained"
                onClick={generateBorrador}
                disabled={!plantillaSeleccionada || variablesPlantilla.length === 0}
                >
                  {sendTemplate ? 'Actualizar Documento' : 'Ver borrador'}
                </Button>
              </Grid>}
              {isUploadDocument && <Grid item>
                <Button
                startIcon={sendTemplate ? <UpdateIcon /> : <VisibilityIcon />}
                variant="contained"
                onClick={updateUploadDoc}
                disabled={!plantillaSeleccionada || variablesPlantilla.length === 0}
                >
                  Actualizar Documento
                </Button>
              </Grid>}
              <Grid item>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  disabled={!plantillaSeleccionada || isUploadDocument}
                >
                  Cargar Documento
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                    accept=".doc, .docx"
                  />
                </Button>
              </Grid>
              <Grid item>
                <LoadingButton
                  startIcon={<SaveIcon />}
                  color="success"
                  variant="contained"
                  onClick={sendDocument}
                  disabled={!plantillaSeleccionada || !hasConsecutivo || isSending}
                  loading={isSending}
                >
                  Enviar Documento
                </LoadingButton>
              </Grid>
            </Grid>
      </Grid>
      <BusquedaPersonasGenerador
        personaSelected={personaSelected}
        setPersona={setpersona}
        plantillaSeleccionada={plantillaSeleccionada}
      />
      {file && <Grid
        container
        spacing={2}
        m={2}
        p={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          m: '10px 0 20px 0',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <VisorDocumentos
          clean_template={alertCleanTemplate}
          file={file}
          current_borrador={currentBorrador}
          uplock_firma={uplockFirma}
          set_uplock_firma={setUplockFirma}
        />

      </Grid>}
    </>
  );
};
