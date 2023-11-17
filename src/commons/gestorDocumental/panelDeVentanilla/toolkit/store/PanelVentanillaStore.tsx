/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '../../../../../hooks';

//? icons necesario para un estado inicial
import DevicesIcon from '@mui/icons-material/Devices';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';

//* todos inicialmente deben tener el disabled en true ya que sobre todos los elementos no se puede permitir ciertas acciones dependiendo lo que incluye el elemento
const actions: any[] = [
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
    name: 'Asignar al grupo',
    path: '/app/gestor_documental/panel_ventanilla/asignar_a_grupo',
    disabled: true,
  },
  {
    id: 'ContinuarAsigGrup',
    icon: <ReduceCapacityIcon />,
    name: 'Continuar con asignación de grupo',
    path: '',
    disabled: true,
  },
];

const initialState: any = {
  // ? valores para los botones (acciones) que se ejercen dentro de panel de ventanilla
  actions,
  currentElementPqrsdComplemento: null,
  pqrsdf: [],
};

export const PanelVentanillaSlice = createSlice({
  name: 'PanelVentanillaSlice',
  initialState,
  reducers: {
    setActionssToManagePermissions: (state, action: PayloadAction<any>) => {
      state.actions = action.payload;
    },

    // ? set pqrsdf tras búsqueda
    setPqrsdfBusqueda: (state, action: PayloadAction<any>) => {
      state.pqrsdf = action.payload;
    },

    // ? actualizador del elemento actual de pqrsd complemento
    setCurrentElementPqrsdComplemento: (state, action: PayloadAction<any>) => {
      state.currentElementPqrsdComplemento = action.payload;
    },
    // ? -- función para limpiar todos los estados que se encuentran en el slice y que se usan en el módulo
    resetPanelVentanillaFull: (state) => {
      state.currentElementPqrsdComplemento = null;
    },
  },
});

export const {
  // ? acciones sobre lo botones del panel de ventanilla
  setActionssToManagePermissions,

  // ? acciones sobre pqrsdf
  setPqrsdfBusqueda,

  // ? acciones sobre la visualización de los elementos de pqrsd complemento
  setCurrentElementPqrsdComplemento,

  // ? reset de todos los estados del slice
  resetPanelVentanillaFull,
} = PanelVentanillaSlice.actions;
