/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// ? neccesary icon for the pqrsdf actions
import ContactPageIcon from '@mui/icons-material/ContactPage';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SendIcon from '@mui/icons-material/Send';
import PreviewIcon from '@mui/icons-material/Preview';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { Action } from '../types/toolkit.types';
// Update import paths in ParteInicial, AccionesFinales, StepperRequerimientoUsuario, FormParte2, RequerimientoUsuarioScreen, FormParte1, ElementosPqrsdf, and FormParte3
//* todos inicialmente deben tener el disabled en true ya que sobre todos los elementos no se puede permitir ciertas acciones dependiendo lo que incluye el elemento

const actionsTareasPQRSDF: Action[] = [
  {
    id: 'InfoSolictud',
    icon: <ContactPageIcon />,
    name: 'Ver información de la solicitud',
    path: '',
    disabled: false,
  },
  {
    id: 'RespondeSolicitud',
    icon: <ReplyAllIcon />,
    name: 'Responder solicitud',
    path: '',
    disabled: false,
  },
  {
    id: 'Reasignar',
    icon: <PersonAddAlt1Icon />,
    name: 'Reasignar',
    path: '',
    disabled: false,
  },
  {
    id: 'RequerimientoUsuario',
    icon: <SendIcon />,
    name: 'Enviar requerimiento al usuario',
    path: '',
    disabled: false,
  },
  {
    id: 'VerRespuestasRequerimientosOSolicitudesAlUsuario',
    icon: <PreviewIcon />,
    name: 'Ver respuestas a requerimientos o solicitudes al usuario',
    path: '',
    disabled: false,
  },
  {
    id: 'SeguimientoARespuesta',
    icon: <QueryStatsIcon />,
    name: 'Seguimiento a respuesta de la tarea',
    path: '',
    disabled: false,
  },
];

const actionsTramitesYServicios: Action[] = [
  {
    id: '--',
    icon: <></>,
    name: '---',
    path: '',
    disabled: false,
  },
];

const initialState: any = {
  // ? valores para los botones (acciones) que se ejercen dentro de panel de ventanilla
  //* acciones de los botones (tambien se deberán configurar los botones para pqrsdf, trámites y servicios y otros)
  actionsTareasPQRSDF,
  actionsTramitesYServicios,

  currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas: null,
  listaTareasPqrsdfTramitesUotrosUopas: [],
};

export const BandejaTareasSlice = createSlice({
  name: 'BandejaTareasSlice',
  initialState,
  reducers: {
    // ! ------ STATES PARA PANEL DE VENTANILLA EN EL USO DE PQRSDF, TRÁMITES Y SERVICIOS Y OTROS, NO DE LOS MÓDULOS QUE DEPENDEN DE ESO ------
    //* este es editor de actions inicial de los botones, se deberá también definir los de tramites y servicios y otros
    setActionssTareasPQRSDF: (state, action: PayloadAction<any>) => {
      state.actionsTareasPQRSDF = action.payload;
    },

    setActionsTareasTramites: (state, action: PayloadAction<any>) => {
      state.Tramites = action.payload;
    },

    //* realizar en su momento las funciones para los otros y para las OPAS

    // ? ------------------------
    // ? ------------------------

    setListaTareasPqrsdfTramitesUotrosUopas: (
      state,
      action: PayloadAction<any>
    ) => {
      state.listaTareasPqrsdfTramitesUotrosUopas = action.payload;
    },

    // ? ------------------------
    // ? ------------------------
    setCurrentTareaPqrsdfTramitesUotrosUopas: (
      state,
      action: PayloadAction<any>
    ) => {
      state.currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas =
        action.payload;
    },

    // ? -- función para limpiar todos los estados que se encuentran en el slice y que se usan en el módulo
    resetBandejaDeTareasFull: (state) => {
      state.actionsTareasPQRSDF = [];
      // state.actions = [];
      // state.actionsTramitesYServicios = [];
      // state.actionsComplementos = [];
      state.currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas = null;
      state.listaTareasPqrsdfTramitesUotrosUopas = [];
    },
  },
});

export const {
  setActionssTareasPQRSDF,
  // setActionsTareasTramites,

  // ? lista de las tareas tras la busqueda
  setListaTareasPqrsdfTramitesUotrosUopas,
  // ? elemento actual de la tarea
  setCurrentTareaPqrsdfTramitesUotrosUopas,
  // ? reset de todos los estados del slice
  resetBandejaDeTareasFull,
} = BandejaTareasSlice.actions;
