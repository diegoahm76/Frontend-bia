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
import { useSelector } from 'react-redux';
import { AuthSlice } from '../../../../auth/interfaces';
import { api, baseURL } from '../../../../../api/axios';
import { control_error, control_success } from '../../../../../helpers';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import FeedIcon from '@mui/icons-material/Feed';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UpdateIcon from '@mui/icons-material/Update';
//import { AlertaDocumento } from './AlertaDocumento';
import { FormularioGenerador } from '../componentes/generadorDocs/FormularioGenerador';
import { VisorDocumentos } from '../componentes/GeneradorDocumentos/VisorDocumentos';
import { Title } from '../../../../../components';
import { get_filed_id_service } from '../../../../gestorDocumental/PQRSDF/store/thunks/pqrsdfThunks';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import {
  initial_state_filed,
  set_filed,
} from '../../../../gestorDocumental/PQRSDF/store/slice/pqrsdfSlice';
import { ImpresionRadicadoScreen } from '../../../../gestorDocumental/PQRSDF/screens/ImpresionRadicadoScreen';

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
  const {
    userinfo: { id_persona },
  } = useSelector((state: AuthSlice) => state.auth);
  const dispatch = useAppDispatch();
  const { notification_request, notification_per_request } = useAppSelector(
    (state) => state.notificaciones_slice
  );
  const [lideresUnidad, setLideresUnidad] = useState<string[]>([]); // Asumiendo que es un string
  const [file, setFile] = useState(''); //Archivo desde el server (plantilla)
  const [urlFile, setUrlFile] = useState<any>(null); //Archivo cargado desde local
  const [updateBorrador, setUpdateBorrador] = useState(false);
  const [updateDocument, setUpdateDocument] = useState(false);
  const [sendTemplate, setSendTemplate] = useState(false);
  const [isNewData, setIsNewData] = useState(false);
  const [hasConsecutivo, setHasConsecutivo] = useState(false);
  const [hasRadicado, setHasRadicado] = useState(false);
  const [hasPersona, setHasPersona] = useState(false);

  const [dataPQRS, setDataPQRS] = useState<any>({}); // Datos para llenar el documento
  const [matchingData, setMatchingData] = useState<any>({}); // Datos para llenar el documento

  const [personaSelected, setpersona] = useState<string[]>([]);
  const [perfilselet, setperfilselet] = useState<string[]>([]); // Asumiendo que es un string
  const urlBase = baseURL.replace('/api/', '');

  const { filed } = useAppSelector((state) => state.pqrsdf_slice);

  useEffect(() => {
    if (personaSelected.length > 0) {
      setHasPersona(true);
      console.log(personaSelected);
    }
  }, [personaSelected]);

  const currentElement = useSelector(
    (state: any) =>
      state.BandejaTareasSlice
        .currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas
  );

  useEffect(() => {
    if (currentElement && currentElement.documento) {
      removeFile();
      setFile(
        `${urlBase}${currentElement.documento.archivos_digitales.ruta_archivo}`
      );
    }

    if (currentElement && currentElement.id_pqrsdf) {
      removeFile();
      search_pqrt(currentElement.id_pqrsdf);
    }
    console.log(currentElement);
  }, [currentElement]);

  const search_pqrt = async (id: string) => {
    try {
      const url = `gestor/pqr/get_pqrsdf-panel/${id}/`;
      const response = await api.get(url);
      console.log(response.data);
      if (response?.data?.data) {
        setDataPQRS(response.data.data);
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };

  const [radicado_selected, set_radicado_selected] = useState('');

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
      // console.error('Error al obtener los tipos de radicado:', error);
      control_error(error.response.data.detail);
    }
  };

  useEffect(() => console.log(urlFile), [urlFile]);

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
    setIdPlantilla(id_plantilla);
    const currentPlantilla = plantillas.find(
      (plantilla) => plantilla.id_plantilla_doc === id_plantilla
    );
    if (currentPlantilla) {
      setPlantillaSeleccionada(currentPlantilla);
    }

    if (!id_plantilla) {
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
      if (data.length === 0)
        control_error('No se encontraron plantillas disponibles');
      setPlantillas(data);
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };

  const generateDocument = async (data: any) => {
    console.log(data);
    try {
      const url = `/gestor/trd/consecutivo-tipologia-doc/`;
      const resp: any = await api.post(url, data);
      if (resp.data.data) {
        void dispatch(get_filed_id_service(resp.data.data.id_radicado ?? 0));
        removeFile();
        if (updateBorrador || updateDocument || sendTemplate)
          setCurrentBorrador(resp.data.data);
        setFile(`${urlBase}${resp.data.data.archivos_digitales.ruta_archivo}`);
      }
    } catch (error: any) {
      console.log(error);
      control_error('fallo generacion de documento');
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
    dispatch(set_filed(initial_state_filed));
    fetchUnidades();
    fetch_data_plantillas();
  }, []);

  useEffect(() => {
    if (plantillaSeleccionada?.archivos_digitales) {
      removeFile();
      setUpdateBorrador(false);
      setSendTemplate(false);
      const url = baseURL.replace('/api/', '');
      setFile(`${url}${plantillaSeleccionada.archivos_digitales.ruta_archivo}`);
      let variablesFiltradas = plantillaSeleccionada.variables.filter(
        (variable: string) =>
          variable !== 'consecutivo' &&
          variable !== 'radicado' &&
          variable !== 'fecha_radicado'
      );
      let newMatchingData: any = {};
      if (dataPQRS?.id_PQRSDF) {
        const keysdataPQRS = Object.keys(dataPQRS);
        variablesFiltradas = variablesFiltradas.filter((variable: string) => {
          if (keysdataPQRS.includes(variable)) {
            newMatchingData[variable] = dataPQRS[variable];
            return false;
          }
          return true;
        });
      }
      setMatchingData(newMatchingData);
      setVariablesPlantilla(variablesFiltradas);
    }
  }, [plantillaSeleccionada, dataPQRS]);

  useEffect(() => {
    if (plantillaSeleccionada?.archivos_digitales && hasValue(matchingData)) {
      generateBorrador();
      saveData({});
    }
  }, [matchingData]);

  const hasValue = (obj: any) => {
    return Object.values(obj).some(
      (valor) => valor !== null && valor !== undefined && valor !== ''
    );
  };

  // const handleChange = (event: any) => {
  //   setUnidadSeleccionada(event.target.value as string);
  //   const selectedId = event.target.value;
  //   setIdUnidadSeleccionada(selectedId);
  // };

  const handleEdicion = () => {
    setShowVariables(!showVariables);
  };

  const saveData = (data: any) => {
    console.log('save');
    let sendData: any = {
      plantilla: idPlantilla,
      payload: { ...data, ...matchingData },
    };
    if (hasValue(data) || hasValue(matchingData)) {
      if (updateBorrador) {
        sendData.variable = 'N';
        sendData.consecutivo = false;
        sendData.radicado = false;
        sendData.id_consecutivo =
          currentBorrador?.id_consecutivo_tipologia ?? null;
      }

      if (sendTemplate && !hasConsecutivo && !radicado_selected) {
        sendData.variable = 'N';
        sendData.consecutivo = true;
        sendData.radicado = false;
        sendData.id_consecutivo =
          currentBorrador?.id_consecutivo_tipologia ?? null;

        setHasConsecutivo(true);
      }

      if (radicado_selected && sendTemplate && !hasConsecutivo) {
        sendData.variable = 'N';
        sendData.id_consecutivo =
          currentBorrador?.id_consecutivo_tipologia ?? null;
        sendData.consecutivo = true;
        sendData.radicado = true;
        setHasConsecutivo(true);
        setHasRadicado(true);
      }

      if (updateDocument) {
        if (!hasRadicado) sendData.cod_tipo_radicado = radicado_selected;
        sendData.variable = 'N';
        sendData.id_consecutivo =
          currentBorrador?.id_consecutivo_tipologia ?? null;
        setHasConsecutivo(true);
        sendData.consecutivo = true;
        sendData.radicado = (radicado_selected ?? '') === '' ? null : true;
      }
      sendData.cod_tipo_radicado =
        (radicado_selected ?? '') === '' ? null : radicado_selected;
      sendData.id_solicitud_notififcacion =
        notification_request?.id_notificacion_correspondencia;
      console.log(sendData);
      generateDocument(sendData);
    } else {
      control_error('No se han ingresado datos para actualizar el documento');
      setSendTemplate(false);
    }
  };

  const generateConsecutivo = () => {
    setUpdateBorrador(false);
    setIsNewData(true);
    setSendTemplate(true);
    console.log('consecutivo');
  };

  const generateBorrador = () => {
    if (sendTemplate) {
      setUpdateDocument(true);
    } else {
      set_radicado_selected('');
      setSendTemplate(false);
      setUpdateBorrador(true);
    }
    setIsNewData(true);
  };

  const sendDocument = async () => {
    if (personaSelected.length) {
      let allSuccess = true;
      for (const id_persona_asignada of personaSelected) {
        const body = {
          id_consecutivo: currentBorrador?.id_consecutivo_tipologia,
          id_persona_asignada,
        };
        const success = await createAsignacionDocumento(body);
        if (!success) allSuccess = false;
      }
      if (allSuccess) {
        if (personaSelected.length == 1)
          control_success('El documento se envió correctamente');
        if (personaSelected.length > 1)
          control_success('Todos los documentos se enviaron correctamente');
        cleanTemplate();
      } else {
        if (personaSelected.length == 1)
          control_error('Ocurrio un error al enviar el documento');
        if (personaSelected.length > 1)
          control_error('Hubo un error al enviar algunos documentos');
      }
    }
  };

  const cleanTemplate = () => {
    setFile('');
    setSendTemplate(false);
    setUpdateBorrador(false);
    setHasConsecutivo(false);
    setHasPersona(false);
    setpersona([]);
    setperfilselet([]);
    setLideresUnidad([]);
  };

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
              helperText={'Elige una plantilla'}
            >
              <MenuItem value="">
                <em>Seleccione una opción</em>
              </MenuItem>
              {plantillas.map((plantilla) => (
                <MenuItem
                  key={plantilla.id_plantilla_doc}
                  value={plantilla.id_plantilla_doc}
                >
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
              helperText={'Elige un tipo de radicado'}
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
          sendBorradorData={updateBorrador}
          sendTemplateData={sendTemplate}
          isNewData={isNewData}
          setIsNewData={setIsNewData}
          variablesPlantilla={variablesPlantilla}
          showVariables={showVariables}
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
          <Grid item>
            <Button
              startIcon={<EditIcon />}
              variant="contained"
              onClick={handleEdicion}
              disabled={
                !plantillaSeleccionada || variablesPlantilla.length === 0
              }
            >
              {showVariables
                ? 'Deshabilitar edición campos'
                : 'Habilitar edición campos'}
            </Button>
          </Grid>
          <Grid item>
            <Button
              startIcon={<FeedIcon />}
              variant="contained"
              onClick={generateConsecutivo}
              disabled={
                !plantillaSeleccionada ||
                variablesPlantilla.length === 0 ||
                sendTemplate
              }
            >
              {radicado_selected
                ? 'Generar Consecutivo y Radicado'
                : 'Generar Consecutivo'}
            </Button>
          </Grid>
          <Grid item>
            <Button
              startIcon={sendTemplate ? <UpdateIcon /> : <VisibilityIcon />}
              variant="contained"
              onClick={generateBorrador}
              disabled={
                !plantillaSeleccionada || variablesPlantilla.length === 0
              }
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
                style={{ display: 'none' }}
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
              disabled={
                !plantillaSeleccionada || !hasConsecutivo || !hasPersona
              }
            >
              Enviar Documento
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {/* <AlertaDocumento
        personaSelected={personaSelected}
        setpersona={setpersona}
        perfilselet={perfilselet}
        setperfilselet={setperfilselet}
        lideresUnidad={lideresUnidad}
        setLideresUnidad={setLideresUnidad}
      /> */}
      {file && (
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
          <VisorDocumentos file={file} />
        </Grid>
      )}
      {filed.numero_radicado_completo !== null && <ImpresionRadicadoScreen />}
    </>
  );
};
