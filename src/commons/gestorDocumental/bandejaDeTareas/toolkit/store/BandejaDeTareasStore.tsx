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
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import ArchiveIcon from '@mui/icons-material/Archive';

// Update import paths in ParteInicial, AccionesFinales, StepperRequerimientoUsuario, FormParte2, RequerimientoUsuarioScreen, FormParte1, ElementosPqrsdf, and FormParte3
//* todos inicialmente deben tener el disabled en true ya que sobre todos los elementos no se puede permitir ciertas acciones dependiendo lo que incluye el elemento

const actionsTareasPQRSDF: Action[] = [
  {
    id: 'InfoSolictud',
    icon: <ContactPageIcon />,
    name: 'Ver información resumida de la tarea',
    path: '',
    disabled: false,
  },
  {
    id: 'RespondeSolicitud',
    icon: <ReplyAllIcon />,
    name: 'Responder solicitud',
    path: '/app/gestor_documental/Pqrsdf/Respuesta_pqrsdf',
    disabled: false,
  },

  {
    id: 'Archivado_PQR',
    icon: <DriveFileMoveIcon />,
    name: 'archivado',
    path: '/app/gestor_documental/archivado',
    disabled: false,
  },


  {
    id: 'Reasignar',
    icon: <PersonAddAlt1Icon />,
    name: 'Reasignar',
    path: '/app/gestor_documental/bandeja_tareas/reasignacion_tarea/',
    disabled: false,
  },
  {
    id: 'RequerimientoUsuario',
    icon: <SendIcon />,
    name: 'Enviar requerimiento al usuario',
    path: '/app/gestor_documental/bandeja_tareas/requerimiento_a_usuario',
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
    path: '/app/gestor_documental/bandeja_tareas/seguimiento_tarea',
    disabled: false,
  },
];

const actionsTramitesYServicios: Action[] = [
  {
    id: 'InfoSolictud',
    icon: <ContactPageIcon />,
    name: 'Ver información resumida de la tarea (trámite o servicio)',
    path: '',
    disabled: false,
  },
  {
    id: 'Reasignar',
    icon: <PersonAddAlt1Icon />,
    name: 'Reasignar tarea',
    //* posiblememenet sea la misma ruta que la de pqrsdf
    path: '/app/gestor_documental/bandeja_tareas/reasignacion_tarea/',
    disabled: false,
  },
  /* {
     id: 'RequerimientoUsuario',
     icon: <SendIcon />,
     name: 'Enviar requerimiento al usuario',
     path: '',
     disabled: false,
   },*/
  {
    id: 'VerRespuestasRequerimientosOSolicitudesAlUsuario',
    icon: <PreviewIcon />,
    name: 'Ver respuestas de requerimientos al usuario',
    path: '',
    disabled: false,
  },
];

const actionsOtros: Action[] = [
  {
    id: 'InfoSolictud',
    icon: <ContactPageIcon />,
    name: 'Ver información resumida de la tarea',
    path: '',
    disabled: false,
  },


  {
    id: 'Reasignar',
    icon: <PersonAddAlt1Icon />,
    name: 'Reasignar',
    //* posiblememenet sea la misma ruta que la de pqrsdf
    path: '/app/gestor_documental/bandeja_tareas/reasignacion_tarea/',
    disabled: false,
  },
  {
    id: 'Archivado_OTROS',
    icon: <ArchiveIcon />,
    name: 'archivado',
    path: '/app/gestor_documental/archivado',
    disabled: false,
  },
];

const newActions = [
  {
    id: 'RespondeSolicitud',
    icon: <ReplyAllIcon />,
    name: 'Responder OPA',
    path: '/app/gestor_documental/bandeja_tareas/respuesta_opas/',
    disabled: false,
  },
  {
    id: 'RequerimientoUsuario',
    icon: <SendIcon />,
    name: 'Enviar requerimiento al usuario sobre OPA',
    path: '/app/gestor_documental/bandeja_tareas/requerimiento_a_usuario_opas/',
    disabled: false,
  },
  {
    id: 'Archivado_OPAS',
    icon: <ArchiveIcon />,
    name: 'archivado',
    path: '/app/gestor_documental/archivado',
    disabled: false,
  },
];

const actionsOpas: Action[] = [

  
  ...actionsTareasPQRSDF.filter(
    (action) => !newActions.find((newAction) => newAction.id === action.id)
  ),
  ...newActions,
];

const initialState: any = {
  // ? valores para los botones (acciones) que se ejercen dentro de panel de ventanilla
  //* acciones de los botones (tambien se deberán configurar los botones para pqrsdf, trámites y servicios y otros)
  actionsTareasPQRSDF,
  actionsTramitesYServicios,
  actionsOtros,
  actionsOpas,

  currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas: null,
  listaTareasPqrsdfTramitesUotrosUopas: [],

  //* informacion de tarea
  infoTarea: null,
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
      state.actionsTramitesYServicios = action.payload;
    },

    setActionsTareasOtros: (state, action: PayloadAction<any>) => {
      state.actionsOtros = action.payload;
    },

    setActionsTareasOpas: (state, action: PayloadAction<any>) => {
      state.actionsOpas = action.payload;
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

    // ? ------------------------
    // ? ------------------------
    // set info tarea
    setInfoTarea: (state, action: PayloadAction<any>) => {
      state.infoTarea = action.payload;
    },

    // ? -- función para limpiar todos los estados que se encuentran en el slice y que se usan en el módulo
    resetBandejaDeTareasFull: (state) => {
      // state.actionsTareasPQRSDF = [];
      // state.actions = [];
      // state.actionsTramitesYServicios = [];
      // state.actionsComplementos = [];
      state.currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas = null;
      state.listaTareasPqrsdfTramitesUotrosUopas = [];

      state.infoTarea = null;
    },
    resetBandejaDeTareas: (state) => {
     
      state.currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas = null;
     
    },



  },
});

export const {
  setActionssTareasPQRSDF,
  setActionsTareasOtros,
  setActionsTareasTramites,
  setActionsTareasOpas,
  resetBandejaDeTareas,
  // ? lista de las tareas tras la busqueda
  setListaTareasPqrsdfTramitesUotrosUopas,
  // ? elemento actual de la tarea
  setCurrentTareaPqrsdfTramitesUotrosUopas,
  // ? reset de todos los estados del slice
  // ? set info tarea
  setInfoTarea,
  resetBandejaDeTareasFull,
} = BandejaTareasSlice.actions;
