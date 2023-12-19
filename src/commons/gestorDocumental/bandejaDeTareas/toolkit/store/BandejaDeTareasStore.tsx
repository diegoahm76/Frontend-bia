/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

//? icons necesario para los botones de acciones de pqrsdf
import DevicesIcon from '@mui/icons-material/Devices';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import GroupsIcon from '@mui/icons-material/Groups';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';

// ? icons necesarios para los botones de acciones de tramites y servicios
// import BalanceIcon from '@mui/icons-material/Balance';

//* todos inicialmente deben tener el disabled en true ya que sobre todos los elementos no se puede permitir ciertas acciones dependiendo lo que incluye el elemento
/*const actionsPQRSDF: any[] = [
  {
    id: 'Dig',
    icon: <DevicesIcon />,
    name: 'Enviar solicitud de digitalización',
    path: '',
    disabled: false,
  },
  {
    id: 'AsigPer',
    icon: <PersonAddIcon />,
    name: 'Enviar solicitud al usuario',
    path: '/app/gestor_documental/panel_ventanilla/asignar_a_usario',
    disabled: false,
  },
  {
    id: 'AsigGrup',
    icon: <GroupsIcon />,
    name: 'Asignar a unidad organizacional',
    path: '/app/gestor_documental/panel_ventanilla/asignar_a_grupo',
    disabled: false,
  },
];*/

/*const actionsTramitesYServicios: any[] = [
  {
    id: 'Jurídica',
    icon: <BalanceIcon />,
    name: 'Revisión jurídica',
    path: '',
    disabled: false,
  },
  {
    id: 'AsigGrup',
    icon: <GroupsIcon />,
    name: 'Asignar al grupo y generación de expediente',
    path: '',
    disabled: false,
  },
  {
    id: 'Dig',
    icon: <DevicesIcon />,
    name: 'Enviar solicitud de digitalización',
    path: '',
    disabled: false,
  },
];*/

/*const actionsComplements: any[] = [
  {
    id: 'Dig',
    icon: <DevicesIcon />,
    name: 'Enviar solicitud de digitalización',
    path: '',
    disabled: false,
  },
  {
    id: 'ContinuarAsigGrup',
    icon: <ReduceCapacityIcon />,
    name: 'Continuar con asignación de grupo',
    path: '',
    disabled: false,
  },
];
*/
const initialState: any = {
  // ? valores para los botones (acciones) que se ejercen dentro de panel de ventanilla
  //* acciones de los botones (tambien se deberán configurar los botones para pqrsdf, trámites y servicios y otros)
  // actions: actionsPQRSDF,
  // actionsTramitesYServicios,
  // actionsComplementos: actionsComplements,

  currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas: null,
  listaTareasPqrsdfTramitesUotrosUopas: [],
};

export const BandejaTareasSlice = createSlice({
  name: 'BandejaTareasSlice',
  initialState,
  reducers: {
    // ! ------ STATES PARA PANEL DE VENTANILLA EN EL USO DE PQRSDF, TRÁMITES Y SERVICIOS Y OTROS, NO DE LOS MÓDULOS QUE DEPENDEN DE ESO ------
    //* este es editor de actions inicial de los botones, se deberá también definir los de tramites y servicios y otros
    /*setActionssTareasPQRSDF: (state, action: PayloadAction<any>) => {
      state.actionsPQRSDF = action.payload;
    },*/

   /* setActionsTareasTramites: (
      state,
      action: PayloadAction<any>
    ) => {
      state.Tramites = action.payload;
    },
*/
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
      // state.actions = [];
     // state.actionsTramitesYServicios = [];
     // state.actionsComplementos = [];
      state.currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas = null;
      state.listaTareasPqrsdfTramitesUotrosUopas = [];
    },
  },
});

export const {
  // setActionssTareasPQRSDF,
  // setActionsTareasTramites,

  // ? lista de las tareas tras la busqueda
  setListaTareasPqrsdfTramitesUotrosUopas,
  // ? elemento actual de la tarea
  setCurrentTareaPqrsdfTramitesUotrosUopas,
  // ? reset de todos los estados del slice
  resetBandejaDeTareasFull,
} = BandejaTareasSlice.actions;
