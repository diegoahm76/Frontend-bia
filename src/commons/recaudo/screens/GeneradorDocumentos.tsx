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
import CloseIcon from '@mui/icons-material/Close';
import UpdateIcon from '@mui/icons-material/Update';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { FormularioGenerador } from '../components/generadorDocs/FormularioGenerador';
import { VisorDocumentos } from '../components/GeneradorDocumentos/VisorDocumentos';
import { resetBandejaDeTareas } from '../../gestorDocumental/bandejaDeTareas/toolkit/store/BandejaDeTareasStore';
import { useAppDispatch } from '../../../hooks';
import { BusquedaPersonasGenerador } from '../components/GeneradorDocumentos/BusquedaPersonas';
import swal from 'sweetalert2';
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
  const [updateBorrador, setUpdateBorrador] = useState(false);
  const [updateDocument, setUpdateDocument] = useState(false);
  const [sendTemplate, setSendTemplate] = useState(false);
  const [uplockFirma, setUplockFirma] = useState(false);
  const [isNewData, setIsNewData] = useState(false);
  const [hasConsecutivo, setHasConsecutivo] = useState(false);
  const [hasRadicado, setHasRadicado] = useState(false);
  const [cleanFields, setCleanFields] = useState(false);

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
          if(!currentElement.asignaciones?.firma){
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
      control_error(error.response.data.detail);
    }
  }

  const search_opa = async (id: string) => {
    try {
      const url = `gestor/pqr/get_opa-panel/${id}/`;
      const response = await api.get(url);
      if(response?.data?.data){
        control_success('Datos cargados correctamente, elige la plantalla correspondiente');
        setContentData(response.data.data);
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
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
      control_error(error.response.data.detail);
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
      control_error(error.response.data.detail);
    }
  };

  const generateDocument = async (data: any) => {
    try {
      const url = `/gestor/trd/consecutivo-tipologia-doc/`;
      const resp: any = await api.post(url, data);
      if(resp.data.data){
        removeFile()
        if(updateBorrador || updateDocument || sendTemplate) setCurrentBorrador(resp.data.data)
        setFile(`${urlBase}${resp.data.data.archivos_digitales.ruta_archivo}`)
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };

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
      control_error(error.response.data.detail);
    }
  };

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setUrlFile({ name: file.name, url });
  };

  const removeFile = () => {
    setUrlFile(null);
  };

  useEffect(() => {
    fetchUnidades();
    fetch_data_plantillas();
  }, []);

  useEffect(() => {
    if(plantillaSeleccionada?.archivos_digitales){
      removeFile()
      const url = baseURL.replace("/api/", "");
      setFile(`${url}${plantillaSeleccionada.archivos_digitales.ruta_archivo}`)
      let variablesFiltradas = plantillaSeleccionada.variables.filter((variable: string) => variable !== 'consecutivo' && variable !== 'radicado' && variable !== 'fecha_radicado');
      let newMatchingData: any = {};
      if (contentData?.id_PQRSDF) {
        const keyscontentData = Object.keys(contentData.info_persona_titular);
        variablesFiltradas = variablesFiltradas.filter((variable: string) => {
          if (keyscontentData.includes(variable) && contentData.info_persona_titular[variable]) {
            newMatchingData[variable] = contentData.info_persona_titular[variable];
            return false;
          }
          return true;
        });
      }

      if(contentData?.id_tramite && !contentData?.id_PQRSDF){
        const keyscontentData = Object.keys(contentData.info_persona_titular);
        console.log(keyscontentData);
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
  }, [plantillaSeleccionada, contentData]);

  useEffect(() => {
    if (plantillaSeleccionada?.archivos_digitales && hasValue(matchingData)) {
      generateBorrador();
      console.log('matchingData', matchingData);
    }
  }, [matchingData])

  const hasValue = (obj: any) => {
    return Object.values(obj).some(valor => valor !== null && valor !== undefined && valor !== '');
  }

  // const handleChange = (event: any) => {
  //   setUnidadSeleccionada(event.target.value as string);
  //   const selectedId = event.target.value;
  //   setIdUnidadSeleccionada(selectedId);
  // };

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

      if(updateBorrador){
        sendData.variable = 'B'
      }

      if(sendTemplate && !hasConsecutivo && !radicado_selected){
        sendData.variable = 'DC'
        setHasConsecutivo(true);
      }

      if(radicado_selected && sendTemplate && !hasConsecutivo){
        sendData.cod_tipo_radicado = radicado_selected;
        sendData.variable = 'DCR'
        setHasConsecutivo(true);
        setHasRadicado(true);
      }

      if(updateDocument){
        if(!hasRadicado) {
          sendData.cod_tipo_radicado = radicado_selected;
          setHasRadicado(true);
        }
        sendData.variable = 'A'
        sendData.id_consecutivo = currentBorrador?.id_consecutivo_tipologia;
        setHasConsecutivo(true);
      }

      generateDocument(sendData);
    }else{
      control_error('No se han ingresado datos para actualizar el documento');
      setSendTemplate(false);
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
      set_radicado_selected('');
      setSendTemplate(false);
      setUpdateBorrador(true);
    }
    setIsNewData(true);
  }

  const sendDocument = async () => {
    if(personaSelected.length){
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
        setUplockFirma(true);
        setHasConsecutivo(false);
        if (personaSelected.length == 1) control_success('El documento se envió correctamente');
        if (personaSelected.length > 1) control_success('Todos los documentos se enviaron correctamente');

      } else {
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
      confirmButtonText: 'Sí, limpiar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        cleanTemplate();
      }
    });
  }

  const cleanTemplate = () => {
    setIdPlantilla('');
    setPlantillaSeleccionada('');
    setVariablesPlantilla([]);
    setFile('');
    setShowVariables(false);
    setSendTemplate(false);
    setUpdateBorrador(false);
    setHasConsecutivo(false);
    setpersona([]);
    setLideresUnidad([]);
    setCleanFields(true);
    setUplockFirma(false);
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
              disabled={!idPlantilla}
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
            <FormularioGenerador
              exCallback={saveData}
              isNewData={isNewData}
              setIsNewData={setIsNewData}
              variablesPlantilla={variablesPlantilla}
              showVariables={showVariables}
              cleanFields={cleanFields}
              setCleanFields={setCleanFields}
            ></FormularioGenerador>
            <Grid item xs={12}>
              {urlFile && (
                <Chip
                  label={urlFile.name}
                  onDelete={removeFile}
                  deleteIcon={<CloseIcon />}
                />
              )}
            </Grid>
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
              {showVariables && plantillaSeleccionada && <Grid item>
                <Button
                  startIcon={<CleaningServicesIcon />}
                  variant="outlined"
                  onClick={cleanForm}
                >
                  Limpiar campos
                </Button>
              </Grid>}
              <Grid item>
                <Button
                  startIcon={<FeedIcon />}
                  variant="contained"
                  onClick={generateConsecutivo}
                  disabled={!plantillaSeleccionada || variablesPlantilla.length === 0 || sendTemplate}
                >
                  {radicado_selected ? 'Generar Consecutivo y Radicado' : 'Generar Consecutivo'}
                </Button>
              </Grid>
              <Grid item>
                <Button
                startIcon={sendTemplate ? <UpdateIcon /> : <VisibilityIcon />}
                variant="contained"
                onClick={generateBorrador}
                disabled={!plantillaSeleccionada || variablesPlantilla.length === 0}
                >
                  {sendTemplate ? 'Actualizar Documento' : 'Ver borrador'}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  disabled={!plantillaSeleccionada}
                >
                  Cargar Plantilla
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                    accept=".doc, .docx"
                  />
                </Button>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<SaveIcon />}
                  color="success"
                  variant="contained"
                  onClick={sendDocument}
                  disabled={!plantillaSeleccionada || !hasConsecutivo}
                >
                  Enviar Documento
                </Button>
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
