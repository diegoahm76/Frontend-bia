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
import { AuthSlice } from '../../auth/interfaces';
import { api, baseURL } from '../../../api/axios';
import { control_error, control_success } from '../../../helpers';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { AlertaDocumento } from './AlertaDocumento';
import { FormularioGenerador } from '../components/generadorDocs/FormularioGenerador';
import { VisorDocumentos } from '../components/GeneradorDocumentos/VisorDocumentos';
export interface UnidadOrganizaciona {
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
    userinfo: { nombre_unidad_organizacional, nombre, id_persona },
  } = useSelector((state: AuthSlice) => state.auth);

  const [lideresUnidad, setLideresUnidad] = useState<string[]>([]); // Asumiendo que es un string

  const [radicadof, setradicadof] = useState<number | null>(null);
  const [file, setFile] = useState('');
  const [urlFile, setUrlFile] = useState<any>(null);
  const [updateBorrador, setUpdateBorrador] = useState(false);

  const [personaselet, setpersona] = useState<string[]>([]);
  const [perfilselet, setperfilselet] = useState<string[]>([]); // Asumiendo que es un string

  const handleSubmitRadicado = async () => {
    try {
      const url = '/gestor/adminitrador_radicados/crear-radicado/';
      const fecha_actual = new Date().toISOString(); // Formato de fecha ISO

      const payload = {
        id_persona: id_persona,
        tipo_radicado: tipos_radicado,
        fecha_actual: fecha_actual,
        modulo_radica: 'Generador de Documento',
      };
      const response = await api.post(url, payload);
      setradicadof(response.data?.data?.radicado_nuevo);

      const numeroRadicado = response.data.nro_radicado;

      control_success('Numero de radicado creado');
    } catch (error: any) {
      // control_error(error.response.data.detail?.error);
      control_error(error.response.data.detail);
    }
  };

  const [tipos_radicado, settipos_radicado] = useState('');

  // Función para manejar el cambio en el select
  const handleradicado = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    settipos_radicado(event.target.value);
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

  useEffect(() => console.log(urlFile), [urlFile])

  // useEffect(() => {
  //   fetchTiposRadicado();
  // }, []);


  const [idPlantilla, setIdPlantilla] = useState('');
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState<any>(null);

  // Función para manejar el cambio en el select
  const handlePlantillaChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    const id_plantilla = event.target.value;
    setIdPlantilla(id_plantilla)
    const currentPlantilla = plantillas.find(plantilla => plantilla.id_plantilla_doc === id_plantilla);
    if(currentPlantilla){
      setPlantillaSeleccionada(currentPlantilla);
    }
  };

  const [idUnidadSeleccionada, setIdUnidadSeleccionada] = useState('');

  const [unidadSeleccionada, setUnidadSeleccionada] = useState('');

  const [unidades, setUnidades] = useState<UnidadOrganizaciona[]>([]);
  const [plantillas, setPlantillas] = useState<any[]>([]);
  const [showVariables, setShowVariables] = useState(false);
  const [variablesPlantilla, setVariablesPlantilla] = useState<any[]>([]);

  const fetch_data_plantillas = async (): Promise<void> => {
    try {
      const url = `/gestor/plantillas/plantillas_documentos/get/`;
      const res: any = await api.get(url);
      let data: any = res.data.data;
      if(data.length === 0) control_error('No se encontraron plantillas disponibles');
      setPlantillas(data);
    } catch (error: any) {
      console.error(error);
      control_error(error.response.data.detail);
    }
  };

  const generateDocument = async (data: any) => {
    try {
      const url = `/gestor/trd/consecutivo-tipologia-doc/`;
      const resp: any = await api.post(url, data);
      console.log(resp);
      if(resp.data.data){
        removeFile()
        const url = baseURL.replace("/api/", "");
        setFile(`${url}${resp.data.data.archivos_digitales.ruta_archivo}`)
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
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
      setVariablesPlantilla(plantillaSeleccionada.variables)
    }
  }, [plantillaSeleccionada]);

  const handleChange = (event: any) => {
    setUnidadSeleccionada(event.target.value as string);
    const selectedId = event.target.value;
    setIdUnidadSeleccionada(selectedId);
  };

  const handleEdicion = () => {
    setShowVariables(!showVariables);
  }

  const saveData = (data: any) => {
    const sendData = {
      plantilla: idPlantilla,
      variable: 'B',
      payload: data,
    }
    generateDocument(sendData);
    console.log(data);
  }

  const generateBorrador = () => {
    setUpdateBorrador(true);
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
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <TextField
              select
              size="small"
              value={idPlantilla}
              label="Plantilla"
              disabled={!plantillas.length}
              onChange={handlePlantillaChange}
            >
              <MenuItem value="">Seleccione una opción</MenuItem>
              {plantillas.map((plantilla) => (
              <MenuItem key={plantilla.id_plantilla_doc} value={plantilla.id_plantilla_doc}>
                {plantilla.nombre}
              </MenuItem>
            ))}

            </TextField>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <TextField
              select
              size="small"
              value={tipos_radicado}
              label="Radicado"
              onChange={handleradicado}
            >
              <MenuItem value="NA">Sin radicado</MenuItem>
              {tiposRadicado.map((tipo) => (
                <MenuItem key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
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
            </Grid>
            <Grid item xs={12}>
              <TextField
              rows={3}
              fullWidth
              multiline
              size="small"
              label="Observaciones"
              variant="outlined"
              />
            </Grid>
            <FormularioGenerador
              exCallback={saveData}
              sendData={updateBorrador}
              setSendData={setUpdateBorrador}
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
                  startIcon={<VisibilityIcon />}
                  variant="contained"
                  onClick={handleEdicion}
                  disabled={!plantillaSeleccionada}
                >
                  {showVariables ? 'Deshabilitar edición campos' : 'Habilitar edición campos'}
                </Button>
              </Grid>
              <Grid item sx={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
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
                startIcon={<VisibilityIcon />}
                variant="contained"
                onClick={generateBorrador}
                >
                  Ver borrador
                </Button>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<SaveIcon />}
                  color="success"
                  variant="contained"
                  // onClick={handle_open_buscar}
                  // disabled={isButtonDisabled}
                >
                  Enviar Documento
                </Button>
              </Grid>
            </Grid>
      </Grid>
      <AlertaDocumento
        personaselet={personaselet}
        setpersona={setpersona}
        perfilselet={perfilselet}
        setperfilselet={setperfilselet}
        lideresUnidad={lideresUnidad}
        setLideresUnidad={setLideresUnidad}
      />
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
    </>
  );
};
